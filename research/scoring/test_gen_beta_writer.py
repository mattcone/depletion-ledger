#!/usr/bin/env python3
"""test_gen_beta_writer.py — writer invariants for gen-beta-v3.py (2026-10-21).

The second external review of the beta build (research/logs/review-beta-v3-
2026-10-21.md) found two writer bugs after the first fixes landed:

  1. NEW-VINTAGE CRASH: a fresh-date run raised KeyError — the supersession
     code dereferenced an entry that only exists on a re-issue.
  2. FAILED VALIDATION OVERWROTE FILES: a deliberately broken endpoint check
     made the generator report failure — AFTER it had already replaced both
     beta files.

A third, narrower defect was found in the same review's independent
recheck: if the SECOND file's write fails after the first has been
replaced, the pair is left mismatched (P2 — round 3). The writer now
wraps both writes in one pair-wide rollback handler; the round-3
reproduction (second rename raises an ordinary I/O error) is pinned by
case 5b (re-issue: the already-replaced first file is restored) and 6b
(fresh issue: both new outputs are removed).

All reproductions plus the vintage-safety guards are run in an isolated
temp data dir (--data-dir; the published + v2 references always come
from site/src/data). Exit non-zero on any failure.
"""
import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
GEN = HERE / "gen-beta-v3.py"
SHIPPED_DATA = REPO / "site" / "src" / "data" / "world-stocks-beta-v3-2026-10-21.json"
SHIPPED_ASSUM = REPO / "site" / "src" / "data" / "world-stocks-assumptions-beta-v3-2026-10-21.json"

FAILS = []


def run(args):
    p = subprocess.run([sys.executable, str(GEN), *args], capture_output=True, text=True)
    return p.returncode, p.stdout + p.stderr


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def check(label, cond, detail=""):
    print(f"  [{'PASS' if cond else 'FAIL'}] {label}" + (f" — {detail[:300]}" if detail and not cond else ""))
    if not cond:
        FAILS.append(label)


def main():
    with tempfile.TemporaryDirectory() as td:
        d = Path(td)

        # ── 1. NEW VINTAGE (fresh date, empty dir) — must succeed (bug 1) ──
        rc, out = run(["--version", "beta-v3-2026-10-22", "--issued", "2026-10-22",
                       "--data-cutoff", "2026-10-20", "--data-dir", str(d)])
        f_assum = d / "world-stocks-assumptions-beta-v3-2026-10-22.json"
        f_data = d / "world-stocks-beta-v3-2026-10-22.json"
        check("1 new vintage writes both files (no KeyError)",
              rc == 0 and f_assum.exists() and f_data.exists(), out)
        if f_assum.exists():
            a1 = json.loads(f_assum.read_text())
            d1 = json.loads(f_data.read_text())
            check("1 new vintage carries NO supersession metadata",
                  a1.get("supersession_chain") is None and a1.get("supersedes_sha256") is None
                  and a1.get("issue_note") is None and d1.get("supersession_chain") is None)
            check("1 new vintage self-checks all pass on the fresh bytes",
                  all(v for k, v in d1.get("checks", {}).items() if k != "endpoints_dec2027_feb2026_basis_mb"))

        # ── 2. same version, no --reissue: refuse, bytes unchanged ──
        h_a, h_d = sha(f_assum), sha(f_data)
        rc, out = run(["--version", "beta-v3-2026-10-22", "--issued", "2026-10-22",
                       "--data-cutoff", "2026-10-20", "--data-dir", str(d)])
        check("2 same-version without --reissue is refused",
              rc != 0 and "--reissue" in out, out)
        check("2 ... both files byte-identical", sha(f_assum) == h_a and sha(f_data) == h_d)

        # ── 3. stored-version mismatch: refuse (earlier vintage is frozen) ──
        rogue = d / "world-stocks-beta-v3-2026-10-22.json"
        rogue.read_text()  # exists from case 1
        (d / "world-stocks-beta-v3-2026-10-24.json").write_text(
            json.dumps({"version": "beta-v3-2026-10-01"}, indent=2) + "\n")
        rc, out = run(["--version", "beta-v3-2026-10-24", "--issued", "2026-10-24",
                       "--data-cutoff", "2026-10-21", "--data-dir", str(d)])
        check("3 name/version mismatch (stored version differs) is refused",
              rc != 0 and "EARLIER VINTAGE" in out, out)
        check("3 ... the mismatched file is untouched",
              json.loads((d / "world-stocks-beta-v3-2026-10-24.json").read_text())["version"]
              == "beta-v3-2026-10-01")

        # ── 4. BUG 2 REPRODUCTION: a failed validation must replace NOTHING ──
        h_a, h_d = sha(f_assum), sha(f_data)
        rc, out = run(["--version", "beta-v3-2026-10-22", "--issued", "2026-10-22",
                       "--data-cutoff", "2026-10-20", "--data-dir", str(d),
                       "--reissue", "--failure-injection", "pre"])
        check("4 failed validation exits non-zero and says nothing was written",
              rc != 0 and "no files written" in out, out)
        check("4 ... BOTH files byte-identical after the failed run",
              sha(f_assum) == h_a and sha(f_data) == h_d)
        check("4 ... no .tmp left behind", not list(d.glob("*.tmp")))

        # ── 5. temp-byte corruption (first file): the replace is aborted ──
        rc, out = run(["--version", "beta-v3-2026-10-22", "--issued", "2026-10-22",
                       "--data-cutoff", "2026-10-20", "--data-dir", str(d),
                       "--reissue", "--failure-injection", "post"])
        check("5 temp-byte failure aborts the replace",
              rc != 0 and "TEMP-BYTE" in out, out)
        check("5 ... BOTH files byte-identical, no .tmp left",
              sha(f_assum) == h_a and sha(f_data) == h_d and not list(d.glob("*.tmp")))

        # ── 5b. ROUND-3 REPRO: the second rename raises an ordinary I/O
        #      error after the first file has been replaced — the pair-wide
        #      rollback must restore the first file (re-issue case) ──
        rc, out = run(["--version", "beta-v3-2026-10-22", "--issued", "2026-10-22",
                       "--data-cutoff", "2026-10-20", "--data-dir", str(d),
                       "--reissue", "--failure-injection", "second"])
        check("5b second-write I/O failure exits non-zero",
              rc != 0 and "simulated I/O failure" in out, out)
        check("5b ... BOTH files byte-identical (the already-replaced first "
              "file was rolled back), no .tmp left",
              sha(f_assum) == h_a and sha(f_data) == h_d and not list(d.glob("*.tmp")))

        # ── 6. failed NEW-vintage run creates nothing ──
        d2 = d / "empty"
        d2.mkdir()
        rc, out = run(["--version", "beta-v3-2026-10-24", "--issued", "2026-10-24",
                       "--data-cutoff", "2026-10-21", "--data-dir", str(d2),
                       "--failure-injection", "pre"])
        check("6 failed new-vintage run creates nothing (bug 1 + bug 2 combined)",
              rc != 0 and not any(d2.iterdir()), out)

        # ── 6b. round-3 repro on a FRESH issue: the first file gets created,
        #      the second fails — BOTH new outputs must be removed ──
        d3 = d / "empty2"
        d3.mkdir()
        rc, out = run(["--version", "beta-v3-2026-10-25", "--issued", "2026-10-25",
                       "--data-cutoff", "2026-10-21", "--data-dir", str(d3),
                       "--failure-injection", "second"])
        check("6b fresh-issue second-write failure leaves NO files behind",
              rc != 0 and not any(d3.iterdir()), out)

        # ── 7. the fixed writer reproduces the FROZEN v3 numbers ──
        # (a fresh v3-defaults run into an isolated dir: the numeric core must
        #  be identical to the shipped artifact; only the re-issue metadata
        #  keys differ, which a fresh vintage rightly does not carry)
        rc, out = run(["--data-dir", str(d)])
        v_assum = d / "world-stocks-assumptions-beta-v3-2026-10-21.json"
        v_data = d / "world-stocks-beta-v3-2026-10-21.json"
        check("7 fresh v3-defaults run succeeds", rc == 0, out)
        if rc == 0:
            s_data = json.loads(SHIPPED_DATA.read_text())
            f_data = json.loads(v_data.read_text())
            s_assum = json.loads(SHIPPED_ASSUM.read_text())
            f_assum = json.loads(v_assum.read_text())
            check("7 series block byte-identical to the shipped artifact",
                  f_data["series"] == s_data["series"])
            check("7 odds block identical to the shipped artifact",
                  f_data["odds"] == s_data["odds"])
            check("7 all checks identical to the shipped artifact (same 10 keys, all true)",
                  f_data["checks"] == s_data["checks"])
            # and the pair-checks actually ran as gates (12 = 9 pre + 3 pair)
            check("7 run summary reports all 12 self-checks passed",
                  "all self-checks PASS (12 checks)" in out)
            rec_same = all(
                {k: fr[k] for k in ("record_id", "scenario", "issued", "model_version",
                                    "anchor", "rebase_start", "targets")}
                == {k: sr[k] for k in ("record_id", "scenario", "issued", "model_version",
                                       "anchor", "rebase_start", "targets")}
                for fr, sr in zip(f_data["records"], s_data["records"]))
            check("7 all four records' identity + targets identical to the shipped artifact",
                  rec_same and len(f_data["records"]) == len(s_data["records"]))
            # assumptions: identical except the re-issue metadata keys
            f_pop = {k: v for k, v in f_assum.items()}
            s_pop = {k: v for k, v in s_assum.items()
                     if k not in ("supersession_chain", "supersedes_sha256", "issue_note")}
            check("7 assumptions identical to the shipped artifact modulo re-issue metadata",
                  f_pop == s_pop)

    print()
    if FAILS:
        print(f"WRITER TESTS: {len(FAILS)} FAILURE(S)")
        for f in FAILS:
            print(f"  FAIL: {f}")
        sys.exit(1)
    print("WRITER TESTS: all PASS")


if __name__ == "__main__":
    main()
