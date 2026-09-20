#!/usr/bin/env python3
"""Recompute the scenario paths from the frozen EIA workbook + a dated assumptions
snapshot, and verify the published artifacts against them.

This is the single source of the scenario series, record targets, and the
monthly tables on the model page. Nothing hand-maintained may drift from it.

Versioning model (frozen at issue, versions coexist):
  - Each scenario forecast record carries a structured `assumptions_ref`
    ({path, sha256}) to the dated assumptions snapshot it was issued from, and
    an `anchor_observation` — the observation the anchor was taken from, frozen
    at issue. A record is validated ONLY against its own frozen inputs.
  - New observations (e.g. September publishing) and revisions of old
    observations NEVER invalidate an issued record: anchors are checked against
    the frozen anchor_observation metadata, not against the mutable observation
    series.
  - A new scenario version is issued by appending new dated records (see
    --emit-records); old records and their snapshots are kept for scoring.
  - The currently DISPLAYED version (the series in the data file and the tables
    on the model page) is the newest dated version among the scenario records.

Subcommands:
  --check [--version YYYY-MM-DD]
          Without --version: validate EVERY scenario version against its own
          recorded assumptions snapshot + workbook (hashes verified), plus the
          displayed series and MODEL.md tables against the current (newest)
          version. With --version: validate that one version's records and
          inputs (displayed artifacts are checked only if it is the current
          version). Run before ANY publish.
  --selftest       Prove the check works on temp copies: 5 deliberate
                   corruptions (published table cell, series value, record
                   target, a version's snapshot hash, a record anchor) must
                   each FAIL; and 3 legitimate changes must each PASS (a new
                   observation appended, an old observation revised, two dated
                   versions coexisting — plus corrupting either version's own
                   snapshot must FAIL).
  --tables         Print the three monthly tables of the current version.
  --emit-tables    Rewrite the table blocks in MODEL.md in place (between the
                   SCENARIO_TABLE markers) for the current version.
  --emit-records --assumptions FILE --version YYYY-MM-DD
                   Issuing a NEW scenario version (manual issuance workflow,
                   documented on the model page): prints to stdout the new
                   series + record JSON computed from FILE — new dated record
                   ids (consistent hyphenated scenario identifiers), its own
                   assumptions_ref (path + sha256), and an anchor_observation
                   stamped from the current observation. It NEVER modifies any
                   file: a human reviews the output and appends it to the data
                   file. Existing records and series are never overwritten by
                   this script.

The published records are frozen at issue: this script never mutates a record's
stored targets or anchor. Changed assumptions => a new dated record via
--emit-records.
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import sys
import tempfile
from datetime import datetime, timezone

REPO = "/home/mcone/depletion-ledger"
DATA = f"{REPO}/site/src/data/world-stocks.json"
MODEL_MD = f"{REPO}/research/MODEL.md"
# The currently frozen inputs (for reference / legacy callers). run_check no longer
# takes these: every version resolves its own inputs from its record's assumptions_ref.
SNAPSHOT = f"{REPO}/research/sources/world-stocks-assumptions-v2026-09-17.json"
WORKBOOK = f"{REPO}/research/sources/eia-steo-2026-09-17.xlsx"

SERIES = {
    "corridor-holds": "scenario_corridor_holds_monthly_mb",
    "standoff": "scenario_standoff_monthly_mb",
    "corridor-lapses": "scenario_corridor_lapses_monthly_mb",
}

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Table 3a layout in the frozen workbook (verified 2026-09-18):
# row 6  = Production, World total (mb/d);  row 19 = Consumption, World total (mb/d)
# row 3  = year headers (2026 at col 50);   row 4  = month headers
# Sep 2026 = col 58 ... Dec 2027 = col 73
WB_PROD_ROW = 6
WB_CONS_ROW = 19
WB_COL_START = 58   # 2026-09
WB_COL_END = 73     # 2027-12


def fail(msgs):
    for m in msgs:
        print(f"FAIL: {m}", file=sys.stderr)
    print("DRIFT CHECK FAILED")
    sys.exit(1)


def sha256(path):
    return hashlib.sha256(open(path, "rb").read()).hexdigest()


def repo_path(p):
    return p if os.path.isabs(p) else os.path.join(REPO, p)


def next_month(period):
    y, m = map(int, period.split("-"))
    m += 1
    if m > 12:
        m, y = 1, y + 1
    return f"{y}-{m:02d}"


def month_days(period):
    y, m = map(int, period.split("-"))
    if m in (1, 3, 5, 7, 8, 10, 12):
        return 31
    if m == 2:
        return 28 if y % 4 else 29
    return 30


def load_baseline(path):
    """{period: {prod, cons, days}} at full workbook precision, Sep 2026..Dec 2027."""
    from openpyxl import load_workbook
    wb = load_workbook(path, data_only=True)
    ws = wb["3atab"]
    rows = list(ws.iter_rows(min_row=1, max_row=40, values_only=True))
    prod = rows[WB_PROD_ROW - 1]
    cons = rows[WB_CONS_ROW - 1]
    out = {}
    for i in range(WB_COL_START, WB_COL_END + 1):
        # derive period from header cells (year row = row 3, month row = row 4)
        yr = None
        for j in range(0, i + 1):
            if isinstance(rows[2][j], int) and rows[2][j] >= 2026:
                yr = rows[2][j]
        mo = MONTHS.index(str(rows[3][i]).strip()) + 1
        period = f"{yr}-{mo:02d}"
        out[period] = {"prod": float(prod[i]), "cons": float(cons[i]),
                       "days": month_days(period)}
    return out


def scen_map(assumptions):
    """The assumptions file stores scenarios as a list; key it by id."""
    return {sc["id"]: sc for sc in assumptions["scenarios"]}


def adjust_months(sc):
    ap = sc["production_adjustment_mb_d"]
    ac = sc["consumption_adjustment_mb_d"]
    return sorted(k for k in set(ap) | set(ac) if ap.get(k) or ac.get(k))


def horizon_month(sc):
    h = str(sc.get("validity_horizon", ""))[:7]
    assert re.match(r"^\d{4}-\d{2}$", h), f"unparseable validity_horizon: {h!r}"
    return h


def forecast_months(sc, anchor_period):
    """The forecast month sequence, shared by issuance and validation:
    every month STRICTLY AFTER the saved anchor's month, through the scenario's
    validity horizon (inclusive), keeping baseline-only (zero-adjustment) months.
    A month at or before the anchor is already inside the anchor's observed
    total and must never be counted as a forecast month.
    Raises with a clear message on incompatible input."""
    end = horizon_month(sc)
    first = next_month(anchor_period)
    if first > end:
        raise ValueError(f"anchor {anchor_period} is at or beyond the validity horizon "
                         f"{end} — no forecast months remain; re-issue with a later horizon")
    ap, ac = sc["production_adjustment_mb_d"], sc["consumption_adjustment_mb_d"]
    months = []
    m = first
    while m <= end:
        if m not in ap and m not in ac:
            raise ValueError(f"assumptions do not explicitly cover forecast month {m} "
                             f"(required: every month after the anchor through {end})")
        months.append(m)
        m = next_month(m)
    return months


def compute(baseline, assumptions, anchor):
    """{scen_id: {period: {"monthly_mb","cumulative_mb"}}} at full precision,
    starting strictly after the anchor month (see forecast_months), with
    cumulatives starting from the anchor's stored value. anchor = {"period", "value_mb"}."""
    sm = scen_map(assumptions)
    out = {}
    for sid in SERIES:
        sc = sm[sid]
        months = forecast_months(sc, anchor["period"])
        cum = float(anchor["value_mb"])
        series = {}
        for m in months:
            b = baseline[m]
            d = ((b["prod"] + sc["production_adjustment_mb_d"].get(m, 0.0))
                 - (b["cons"] + sc["consumption_adjustment_mb_d"].get(m, 0.0))) * b["days"]
            cum += d
            series[m] = {"monthly_mb": d, "cumulative_mb": cum}
        out[sid] = series
    return out


def table_block(sc, series, baseline):
    """Exact text of one published table block (no trailing newline)."""
    lines = [
        "| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |",
        "|---|---|---|---|---|---|---|---|---|---|",
    ]
    ap, ac = sc["production_adjustment_mb_d"], sc["consumption_adjustment_mb_d"]
    for p, v in series.items():
        b = baseline[p]
        dp, dc = ap.get(p, 0.0), ac.get(p, 0.0)
        y, m = p.split("-")
        lines.append(
            f"| {MONTHS[int(m)-1]} {y} | {b['prod']:.2f} | {dp:+.2f} | "
            f"{b['prod'] + dp:.2f} | {b['cons']:.2f} | {dc:+.2f} | "
            f"{b['cons'] + dc:.2f} | {v['monthly_mb'] / b['days']:+.2f} | "
            f"{b['days']} | {v['cumulative_mb']:+,.1f} |")
    return "\n".join(lines)


def observed_points(data):
    obs = data["series"].get("global_observed_cumulative_mb")
    if isinstance(obs, dict):          # this series is {"points": [...], ...}
        obs = obs.get("points", [])
    return sorted((p for p in obs if p.get("value") is not None),
                  key=lambda p: p["period"])


def versions_in(data):
    """{assumptions_path: {"version": "YYYY-MM-DD", "sha256": str, "records": [...]}}
    from the scenario records' structured assumptions_ref."""
    out = {}
    for rec in data["forecast_records"]:
        ref = rec.get("assumptions_ref")
        if not ref or "scenario" not in rec["record_id"]:
            continue
        # version date: from the record id (scenario-<sid>-<date>-global-observed),
        # falling back to the snapshot filename
        m = re.search(r"-(\d{4}-\d{2}-\d{2})-global-observed$", rec["record_id"])
        if not m:
            m = re.search(r"v(\d{4}-\d{2}-\d{2})\.json$", ref["path"])
        version = m.group(1) if m else ref["path"]
        out.setdefault(ref["path"], {"version": version,
                                     "sha256": ref["sha256"],
                                     "records": []})["records"].append(rec)
    return out


def current_version(versions):
    if not versions:
        raise SystemExit("no scenario records with an assumptions_ref found")
    best = max(versions.values(), key=lambda v: v["version"])
    ties = [p for p, v in versions.items() if v["version"] == best["version"]]
    if len(ties) > 1:
        raise SystemExit(f"ambiguous current version: {ties}")
    return best["version"]


def load_version_inputs(path, problems, label):
    """Load one version's frozen inputs, verifying the recorded hashes.
    Returns (assumptions_dict, workbook_path, baseline) or None on failure."""
    apath = repo_path(path)
    if not os.path.exists(apath):
        problems.append(f"{label}: assumptions file not found: {apath}")
        return None
    actual = sha256(apath)
    assumptions = json.load(open(apath))
    text = open(apath).read()
    wb_m = re.search(r"((?:research/sources/)[\w./-]+\.xlsx|/[\w./-]+\.xlsx) \(sha256 ([0-9a-f]{64})\)", text)
    if not wb_m:
        problems.append(f"{label}: no workbook path+sha256 recorded in {apath}")
        return None
    wb_path, wb_sha = repo_path(wb_m.group(1)), wb_m.group(2)
    if not os.path.exists(wb_path):
        problems.append(f"{label}: workbook not found: {wb_path}")
        return None
    return assumptions, wb_path, wb_sha, actual


def run_check(data_path, model_path, snapshot_path=None, workbook_path=None, only_version=None):
    """snapshot_path / workbook_path are accepted for backward compatibility with
    callers written before per-version validation; they are IGNORED — each version
    resolves and verifies its own frozen inputs from its records' assumptions_ref."""
    problems = []
    data = json.load(open(data_path))
    versions = versions_in(data)
    if not versions:
        problems.append("no scenario records with an assumptions_ref found")
        return problems
    cur = current_version(versions)
    if only_version and only_version not in [v["version"] for v in versions.values()]:
        problems.append(f"version {only_version} not present in the data file")
        return problems

    obs_periods = {p["period"] for p in observed_points(data)}
    displayed = {}   # sid -> series (for the current version's series/table checks)
    cur_baseline = None

    for path, v in sorted(versions.items()):
        if only_version and v["version"] != only_version:
            continue
        label = f"version {v['version']}"
        loaded = load_version_inputs(path, problems, label)
        if not loaded:
            continue
        assumptions, wb_path, wb_sha, actual = loaded
        if actual != v["sha256"]:
            problems.append(f"{label}: snapshot {path} sha256 {actual} != recorded {v['sha256']}")
        if sha256(wb_path) != wb_sha:
            problems.append(f"{label}: workbook {wb_path} sha256 != recorded {wb_sha}")
        baseline = load_baseline(wb_path)
        if v["version"] == cur and not only_version:
            cur_baseline = baseline
            for sid in SERIES:
                rec_anchor = next(r["anchor"] for r in v["records"] if sid in r["record_id"])
                displayed[sid] = compute(baseline, assumptions, rec_anchor)[sid]

        # per-record: targets against this version's recomputation (months strictly
        # after the record's own anchor), anchor against the FROZEN
        # anchor_observation (never against the mutable observation series)
        for rec in v["records"]:
            sid = next((s for s in SERIES if s in rec["record_id"]), None)
            if sid is None:
                problems.append(f"{label}: cannot determine scenario id from {rec['record_id']}")
                continue
            try:
                series = compute(baseline, assumptions, rec["anchor"])[sid]
            except ValueError as e:
                problems.append(f"{label} {rec['record_id']}: {e}")
                continue
            for t in rec["targets"]:
                if t["period"] <= rec["anchor"]["period"]:
                    problems.append(f"{label} {rec['record_id']}: target {t['period']} is at or "
                                    f"before the anchor month {rec['anchor']['period']} — that month's "
                                    "draw is already inside the anchor total")
            aobs = rec.get("anchor_observation")
            if not aobs:
                problems.append(f"{label} {rec['record_id']}: missing anchor_observation")
            else:
                if not (rec["anchor"].get("period") == aobs["period"]
                        and rec["anchor"].get("value_mb") == aobs["value_mb"]):
                    problems.append(f"{label} {rec['record_id']}: anchor {rec['anchor'].get('period')}/"
                                    f"{rec['anchor'].get('value_mb')} != frozen anchor_observation "
                                    f"{aobs['period']}/{aobs['value_mb']}")
                elif aobs["period"] not in obs_periods:
                    problems.append(f"{label} {rec['record_id']}: anchor period {aobs['period']} "
                                    "no longer present in the observed series")
            if [t["period"] for t in rec["targets"]] != list(series):
                problems.append(f"{label} {rec['record_id']}: target periods "
                                f"{[t['period'] for t in rec['targets']]} != computed {list(series)}")
            for t in rec["targets"]:
                if t["period"] in series and t["period"] > rec["anchor"]["period"]:
                    if abs(t["target_monthly_mb"] - series[t["period"]]["monthly_mb"]) > 1e-9:
                        problems.append(f"{label} {rec['record_id']} {t['period']}: target_monthly "
                                        f"{t['target_monthly_mb']} != {series[t['period']]['monthly_mb']}")
                    if abs(t["target_cumulative_mb"] - series[t["period"]]["cumulative_mb"]) > 1e-9:
                        problems.append(f"{label} {rec['record_id']} {t['period']}: target_cumulative "
                                        f"{t['target_cumulative_mb']} != {series[t['period']]['cumulative_mb']}")

    # displayed artifacts: series + MODEL.md tables, checked against the CURRENT version
    if not only_version:
        for sid, key in SERIES.items():
            stored = {p["period"]: p["value"] for p in data["series"].get(key, [])}
            exp_m = {p: v["monthly_mb"] for p, v in displayed.get(sid, {}).items()}
            if set(stored) != set(exp_m):
                problems.append(f"{key}: stored periods {sorted(stored)} != current-version "
                                f"computed {sorted(exp_m)}")
            for p, v in exp_m.items():
                if p in stored and abs(stored[p] - v) > 1e-9:
                    problems.append(f"{key} {p}: stored {stored[p]} != current-version computed {v}")
        model_text = open(model_path).read()
        cur_assumptions = json.load(open(repo_path(next(p for p, v in versions.items()
                                                        if v["version"] == cur))))
        sm = scen_map(cur_assumptions)
        for sid in SERIES:
            m = re.search(rf"<!-- SCENARIO_TABLE:BEGIN {sid} -->(.*?)<!-- SCENARIO_TABLE:END {sid} -->",
                          model_text, re.S)
            if not m:
                problems.append(f"MODEL.md: missing table block for {sid}")
                continue
            if m.group(1).strip() != table_block(sm[sid], displayed[sid], cur_baseline).strip():
                problems.append(f"MODEL.md: published table block for {sid} does not match the "
                                f"current version's generator output")
    return problems


def selftest():
    tmp = tempfile.mkdtemp(prefix="drift-selftest-")
    try:
        d = json.load(open(DATA))
        versions = versions_in(d)
        # The CURRENT (newest) version's snapshot is the one the displayed artifacts are
        # built from; the selftest stages THAT one into tmp and leaves any older real
        # versions pointing at their (untouched) repo files, so multi-version coexistence
        # is exercised against the real older records.
        snap_path = next(p for p, v in versions.items() if v["version"] == current_version(versions))
        snap_abs = repo_path(snap_path)
        # Synthetic version date, strictly after every real version date in the data file.
        SYN_VER = "2026-10-15"

        def stage():
            """Fresh temp stage: data copy (pointing its snapshot at tmp), MODEL.md, snapshot."""
            for f in ("data.json", "MODEL.md", "snapshot.json"):
                if os.path.exists(f"{tmp}/{f}"):
                    os.remove(f"{tmp}/{f}")
            d2 = json.loads(json.dumps(d))
            for rec in d2["forecast_records"]:
                ref = rec.get("assumptions_ref")
                if ref and ref["path"] == snap_path:
                    ref["path"] = f"{tmp}/snapshot.json"
            json.dump(d2, open(f"{tmp}/data.json", "w"))
            open(f"{tmp}/MODEL.md", "w").write(open(MODEL_MD).read())
            shutil.copy(snap_abs, f"{tmp}/snapshot.json")
            return f"{tmp}/data.json", f"{tmp}/MODEL.md"

        def check(dp, mp, **kw):
            return run_check(dp, mp, **kw)

        dp, mp = stage()
        base = check(dp, mp)
        if base:
            fail(["selftest: the UNCORRUPTED copy already fails:"] + base)
        print("selftest: uncorrupted copy PASSES")

        # --- legitimate changes must PASS -------------------------------------
        def new_observation():
            dd = json.load(open(dp))
            pts = dd["series"]["global_observed_cumulative_mb"]["points"]
            pts.append({"period": "2026-09", "value": -627, "status": "reported",
                        "note": "selftest synthetic"})
            json.dump(dd, open(dp, "w"))
        stage()
        new_observation()
        probs = check(dp, mp)
        if probs:
            fail([f"selftest: appending a NEW observation must not invalidate frozen records: {probs}"])
        print("selftest: new observation appended -> PASSES (anchors frozen at issue)")

        def revise_observation():
            dd = json.load(open(dp))
            for p in dd["series"]["global_observed_cumulative_mb"]["points"]:
                if p["period"] == "2026-08" and p.get("value") is not None:
                    p["value"] = -510
            json.dump(dd, open(dp, "w"))
        stage()
        revise_observation()
        probs = check(dp, mp)
        if probs:
            fail([f"selftest: REVISING an old observation must not invalidate frozen records: {probs}"])
        print("selftest: old observation revised -> PASSES (anchors frozen at issue)")

        def two_versions():
            """The documented issuance workflow: a dated snapshot + appended records,
            issued FROM THE CURRENT VERSION (only that version's records are cloned —
            older real versions stay exactly as they are and keep their own refs)."""
            dd = json.load(open(dp))
            s = json.load(open(f"{tmp}/snapshot.json"))
            s["description"] = "second version (selftest) — same numbers, new date"
            json.dump(s, open(f"{tmp}/snapshot2.json", "w"))
            sha2 = sha256(f"{tmp}/snapshot2.json")
            for rec in list(r for r in dd["forecast_records"]
                            if "scenario" in r["record_id"]
                            and (r.get("assumptions_ref") or {}).get("path") == f"{tmp}/snapshot.json"):
                new = json.loads(json.dumps(rec))
                new["record_id"] = re.sub(r"-(\d{4}-\d{2}-\d{2})-global-observed$", f"-{SYN_VER}-global-observed",
                                          rec["record_id"])
                new["issued"] = SYN_VER
                new["assumptions_ref"] = {"path": f"{tmp}/snapshot2.json", "sha256": sha2}
                dd["forecast_records"].append(new)
            json.dump(dd, open(dp, "w"))
        stage()
        two_versions()
        probs = check(dp, mp)
        if probs:
            fail([f"selftest: two dated versions must coexist and validate: {probs}"])
        print("selftest: two dated versions coexist -> PASSES (each vs its own frozen inputs)")

        def advanced_anchor_issuance():
            """A genuinely advanced anchor: Sep 2026 observed -> the issued record anchors
            at 2026-09 and its first target MUST be 2026-10 (Sep is already inside the
            anchor total). A target at or before the anchor must be rejected."""
            import subprocess
            dd = json.load(open(dp))
            dd["series"]["global_observed_cumulative_mb"]["points"].append(
                {"period": "2026-09", "value": -627, "status": "reported", "published": "selftest"})
            json.dump(dd, open(dp, "w"))
            s = json.load(open(f"{tmp}/snapshot.json"))
            s["description"] += " (advanced-anchor selftest)"
            json.dump(s, open(f"{tmp}/snapshot-adv.json", "w"))
            r = subprocess.run([sys.executable, __file__, "--emit-records",
                                "--assumptions", f"{tmp}/snapshot-adv.json",
                                "--new-version", SYN_VER, "--data", dp],
                               capture_output=True, text=True)
            if r.returncode != 0:
                fail(["selftest: --emit-records failed with an advanced anchor:", r.stdout, r.stderr])
            emitted = json.JSONDecoder().raw_decode(r.stdout)[0]
            dd = json.load(open(dp))
            for e in emitted:
                dd["forecast_records"].append(e["record"])
                dd["series"][e["series_key"]] = e["series"]
            json.dump(dd, open(dp, "w"))
            holds = next(e for e in emitted if "holds" in e["record"]["record_id"])["record"]
            if holds["anchor"]["period"] != "2026-09":
                fail([f"selftest: advanced anchor not stamped: {holds['anchor']}"])
            if holds["targets"][0]["period"] != "2026-10":
                fail([f"selftest: first target must be the month AFTER the anchor, got {holds['targets'][0]['period']}"])
            r = subprocess.run([sys.executable, __file__, "--emit-tables", "--data", dp, "--model", mp],
                               capture_output=True, text=True)
            if r.returncode != 0:
                fail(["selftest: --emit-tables failed after advanced-anchor issuance:", r.stdout, r.stderr])
            probs = check(dp, mp)
            if probs:
                fail([f"selftest: advanced-anchor issuance must validate: {probs}"])
            for rec in dd["forecast_records"]:
                if rec["record_id"] == holds["record_id"]:
                    bad = dict(holds["targets"][0])
                    bad = {**bad, "period": "2026-09", "target_monthly_mb": -133.4,
                           "target_cumulative_mb": -760.4}
                    rec["targets"].insert(0, bad)
            json.dump(dd, open(dp, "w"))
            probs = check(dp, mp)
            if not probs or not any("at or before the anchor" in x for x in probs):
                fail(["selftest: a target at or before the anchor was NOT rejected"])
            print("selftest: advanced anchor -> first target is the month after the anchor; "
                  "target at/before anchor rejected")
        stage()
        advanced_anchor_issuance()

        # --- corruptions must FAIL --------------------------------------------
        def assert_fails(label, mutate):
            stage()
            mutate()
            probs = check(dp, mp)
            if not probs:
                fail([f"selftest: corruption '{label}' was NOT detected"])
            print(f"selftest: corruption '{label}' correctly detected ({len(probs)} problem(s))")

        def corrupt_table():
            t = open(mp).read()
            m = re.search(r"(<!-- SCENARIO_TABLE:BEGIN corridor-holds -->.*?\| )(\d+\.\d\d)( \| \+0\.50 \|)", t, re.S)
            if not m:
                raise SystemExit("selftest: could not locate the corridor-holds Sep 2026 baseline P cell")
            open(mp, "w").write(t[:m.start(2)] + "999.41" + t[m.end(2):])
        assert_fails("published table cell", corrupt_table)

        def corrupt_series_value():
            dd = json.load(open(dp))
            dd["series"]["scenario_standoff_monthly_mb"][0]["value"] += 1.0
            json.dump(dd, open(dp, "w"))
        assert_fails("series value", corrupt_series_value)

        def corrupt_target():
            dd = json.load(open(dp))
            rec = next(r for r in dd["forecast_records"] if "standoff" in r["record_id"])
            rec["targets"][-1]["target_cumulative_mb"] += 5.0
            json.dump(dd, open(dp, "w"))
        assert_fails("record target", corrupt_target)

        def corrupt_snapshot():
            s = json.load(open(f"{tmp}/snapshot.json"))
            s["description"] += " (corrupted for selftest)"
            json.dump(s, open(f"{tmp}/snapshot.json", "w"))
        assert_fails("a version's snapshot (breaks its recorded sha256)", corrupt_snapshot)

        def corrupt_anchor():
            dd = json.load(open(dp))
            rec = next(r for r in dd["forecast_records"] if "standoff" in r["record_id"])
            rec["anchor"]["value_mb"] = -999.0
            json.dump(dd, open(dp, "w"))
        assert_fails("record anchor (vs frozen anchor_observation)", corrupt_anchor)

        def corrupt_v2():
            two_versions()
            s = json.load(open(f"{tmp}/snapshot2.json"))
            s["description"] += " (corrupted for selftest)"
            json.dump(s, open(f"{tmp}/snapshot2.json", "w"))
        assert_fails("the SECOND version's snapshot (v1's inputs untouched)", corrupt_v2)

        print("SELFTEST PASS: corruptions fail; new observations, revisions, and version coexistence pass")
    finally:
        shutil.rmtree(tmp)


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--version", help="scope --check to one version date YYYY-MM-DD")
    ap.add_argument("--selftest", action="store_true")
    ap.add_argument("--tables", action="store_true")
    ap.add_argument("--emit-tables", action="store_true")
    ap.add_argument("--emit-records", action="store_true")
    ap.add_argument("--assumptions", help="assumptions file for --emit-records")
    ap.add_argument("--new-version", help="alias for --version when emitting records")
    ap.add_argument("--data", default=DATA)
    ap.add_argument("--model", default=MODEL_MD)
    args = ap.parse_args()

    if args.selftest:
        selftest()
        return

    data = json.load(open(args.data))
    versions = versions_in(data)
    cur = current_version(versions)
    cur_path = next(p for p, v in versions.items() if v["version"] == cur)
    loaded = load_version_inputs(cur_path, [], f"version {cur}")
    if not loaded:
        fail(["cannot load the current version's inputs"])
    assumptions, wb_path, _, _ = loaded
    baseline = load_baseline(wb_path)

    if args.check:
        probs = run_check(args.data, args.model, only_version=args.version)
        if probs:
            fail(probs)
        scope = f" (version {args.version})" if args.version else " (all versions; displayed artifacts vs current)"
        print(f"DRIFT CHECK PASS{scope}: each version's records validate against its own frozen "
              f"assumptions + workbook (hashes verified), anchors against frozen anchor_observation.")
        return

    def current_series(sid):
        rec = next(r for r in versions[cur_path]["records"] if sid in r["record_id"])
        return compute(baseline, assumptions, rec["anchor"])[sid]

    sm = scen_map(assumptions)

    if args.tables:
        for sid in SERIES:
            print(f"### {sid}\n")
            print(table_block(sm[sid], current_series(sid), baseline))
            print()
        return

    if args.emit_tables:
        text = open(args.model).read()
        for sid in SERIES:
            block = table_block(sm[sid], current_series(sid), baseline)
            pat = rf"(<!-- SCENARIO_TABLE:BEGIN {sid} -->).*?(<!-- SCENARIO_TABLE:END {sid} -->)"
            new, n = re.subn(pat, lambda m: m.group(1) + "\n" + block + "\n" + m.group(2),
                             text, flags=re.S)
            if n != 1:
                fail([f"expected exactly one table block for {sid}, found {n}"])
            text = new
        open(args.model, "w").write(text)
        print("emitted all 3 table blocks (current version) into", args.model)
        return

    if args.emit_records:
        ver = args.new_version or args.version
        if not (args.assumptions and ver):
            fail(["--emit-records requires --assumptions FILE and --version YYYY-MM-DD"])
        apath = args.assumptions if os.path.isabs(args.assumptions) else os.path.join(REPO, args.assumptions)
        if not os.path.exists(apath):
            fail([f"assumptions file not found: {apath}"])
        new_assumptions = json.load(open(apath))
        ntext = open(apath).read()
        nwb = re.search(r"((?:research/sources/)[\w./-]+\.xlsx|/[\w./-]+\.xlsx) \(sha256 ([0-9a-f]{64})\)", ntext)
        if not nwb:
            fail(["no workbook path+sha256 recorded in the new assumptions file"])
        nbaseline = load_baseline(repo_path(nwb.group(1)))
        snap_sha = sha256(apath)
        rel = os.path.relpath(apath, REPO) if apath.startswith(REPO) else apath
        now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        obs = observed_points(json.load(open(args.data)))
        if not obs:
            fail(["no observed cumulative points to stamp the anchor from"])
        last = obs[-1]
        anchor = {"period": last["period"], "value_mb": last["value"]}
        anchor_obs = {"series": "global_observed_cumulative_mb", "period": last["period"],
                      "value_mb": last["value"], "edition": last.get("published", "see data file")}
        # Forecast months start STRICTLY AFTER the anchor month (the anchor's observed
        # total already includes that month's draw); the checker enforces the same rule.
        try:
            ncomputed = compute(nbaseline, new_assumptions, anchor)
        except ValueError as e:
            fail([f"cannot issue from anchor {anchor['period']}: {e}"])
        out = []
        for sid in SERIES:
            series_vals = ncomputed[sid]
            series = [{"period": p, "value": v["monthly_mb"], "status": "model-projection"}
                      for p, v in series_vals.items()]
            last_p, last_v = list(series_vals.items())[-1]
            rec = {
                "record_id": f"scenario-{sid}-{ver}-global-observed",
                "type": "model-projection",
                "scenario": next(sc["name"] for sc in new_assumptions["scenarios"] if sc["id"] == sid),
                "baseline": (f"EIA STEO, released 9 Sep 2026 (workbook generated 3 Sep 2026), world balance + "
                             f"documented scenario adjustments — assumptions version {ver}, "
                             f"sha256 {snap_sha}"),
                "issued": ver,
                "issued_before_outcome": all(t["period"] > anchor["period"] for t in
                                             [{"period": p} for p in series_vals]),
                "model_version": f"world-stocks phase 3 (v{ver})",
                "scope": next(r["scope"] for r in data["forecast_records"] if "scenario" in r["record_id"]),
                "anchor": anchor,
                "anchor_observation": anchor_obs,
                "assumptions_ref": {"path": rel, "sha256": snap_sha,
                                    "note": "frozen at issue — this record validates only against this snapshot"},
                "targets": [{"period": p,
                             "target_monthly_mb": v["monthly_mb"],
                             "target_cumulative_mb": v["cumulative_mb"],
                             "outcome_first_release": {"monthly_mb": None, "monthly_published": None,
                                                       "cumulative_mb": None, "cumulative_published": None},
                             "outcome_latest": {"monthly_mb": None, "monthly_published": None,
                                                "cumulative_mb": None, "cumulative_published": None,
                                                "revisions": 0, "published_date": None}}
                            for p, v in series_vals.items()],
                "outcome_status": "open",
                "outcome_policy": ("score against outcome_first_release only — the figure as first published in the "
                                   "source edition. If a later edition revises the outcome, update outcome_latest "
                                   "(and increment its revisions counter) but leave outcome_first_release frozen, "
                                   "so historical revisions cannot distort the score."),
                "issued_at": now,
                "issued_at_note": ("UTC, taken at issuance. Scenario assumptions are analyst judgment over the EIA "
                                   "baseline; a changed assumption set issues a NEW dated record — this one is frozen."),
                "endpoint": {"period": last_p, "cumulative_mb": last_v["cumulative_mb"]},
            }
            out.append({"series_key": SERIES[sid], "note": f"REPLACE the series only if this version is the newest "
                                                           f"(it becomes the displayed version); otherwise keep the "
                                                           f"existing series and append the record for scoring.",
                        "series": series, "record": rec})
        print(json.dumps(out, indent=1))
        print("\n# MANUAL ISSUANCE (this command changed nothing): review the JSON above, then append each")
        print("# record to forecast_records. If the new version is the newest, also replace the three scenario")
        print("# series (they drive the displayed chart) and run --emit-tables. Published records are never")
        print("# overwritten by any script.")
        return

    fail(["nothing to do: pass --check, --selftest, --tables, --emit-tables, or --emit-records"])


if __name__ == "__main__":
    main()
