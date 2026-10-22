#!/usr/bin/env python3
"""Validation of the candidate branch filter (v3, 2026-10-21) vs the current
model (v2.4b). REVISED after the external review at
research/logs/review-model-candidate-2026-10-21.md:

  A. IDENTICAL-INPUT code comparison (isolates the code change; the
     input-refresh effect is shown separately, not mixed in).
  B. controlled single-input sweeps (identical inputs to both models;
     uniform units; exact input columns; no monotonicity claims that the
     numbers don't support).
  C. required scenarios (labels fixed; the 'weak products' case is NOT
     entered — no same-basis split exists).
  D. chronological replay reconstructed from the DATED LOGS only — every
     observation is the one the log recorded at that date (the earlier
     draft used inputs not present in the record; those rows are
     superseded).

Read-only: imports branch_filter.py and branch_filter_candidate.py; writes
research/model/candidate/validation-2026-10-21.md + stdout.

The record is 6-7 weeks and the Nov 15 binary is unresolved: this is a
divergence diagnostic. No scored accuracy comparison is possible or made.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import branch_filter as bf
import branch_filter_candidate as bfc

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "candidate", "validation-2026-10-21.md")


def current(obs, prior):
    post = bf.state_posterior(prior, obs)
    return bf.horizon_weights(post, bf.DEFAULT_TRANSITION), post


def candidate(obs, prior):
    post, _ = bfc.state_posterior_candidate(prior, obs)
    return bf.horizon_weights(post, bf.DEFAULT_TRANSITION), post


def row3(t, dp=1):
    return f"{t[0] * 100:.{dp}f} / {t[1] * 100:.{dp}f} / {t[2] * 100:.{dp}f}"


def pct3(t, dp=1):
    """format a tuple already expressed in percent"""
    return f"{t[0]:.{dp}f} / {t[1]:.{dp}f} / {t[2]:.{dp}f}"


def s_pct(x):
    """percent throughout; shares below 0.001% in percent-scientific."""
    pct = x * 100
    return f"{pct:.3e}%" if pct < 0.001 else f"{pct:.4f}%"


def obs_str(obs, prior):
    parts = []
    if "transits" in obs:
        parts.append(f"transits {obs['transits']}")
    if "tankers" in obs:
        parts.append(f"tankers {obs['tankers']}")
    if "volume" in obs:
        parts.append(f"volume {obs['volume']}")
    if "corridor_flow" in obs:
        parts.append(f"corridor-flow {obs['corridor_flow']}")
    parts.append(f"brent {obs.get('brent', 'n/a')}")
    parts.append("prior " + "/".join(f"{p * 100:.0f}" for p in prior))
    return ", ".join(parts)


# ---------------------------------------------------------------------------
# A. identical-input code comparison
# ---------------------------------------------------------------------------
def identical_input_comparison():
    L = []
    a = L.append
    a("## A. Identical-input code comparison (isolates the code change)")
    a("")
    a("Both models, the SAME inputs, the documented prior of the date. Brent "
      "is shown for parity; the candidate does not use it as a state "
      "observation. This isolates what the candidate's two changes (Brent "
      "out of the state filter; transits weight 0.5) do at fixed data.")
    a("")
    a("| inputs (identical to both models) | current HORIZON | candidate HORIZON |")
    a("|---|---|---|")
    rows = [
        ("(a) currently logged (Oct 21)", [0.10, 0.50, 0.40],
         {"transits": 12, "tankers": 1, "volume": 7.6, "brent": 108.79}),
        ("(b) refreshed same-definition (Kpler Oct 19 briefing)",
         [0.10, 0.50, 0.40],
         {"transits": 10, "tankers": 1, "volume": 7.894, "brent": 108.79}),
        ("(c) late-Sep logged (Sep 30)", [0.10, 0.50, 0.40],
         {"transits": 5, "tankers": 1, "volume": 7.4, "brent": 102.59}),
        ("(d) Sep 16 logged (documented prior of the date)",
         [0.10, 0.40, 0.50],
         {"transits": 4, "tankers": 1, "corridor_flow": "absent",
          "brent": 108.75}),
    ]
    for name, prior, obs in rows:
        hz_c, _ = current(obs, prior)
        hz_k, _ = candidate(obs, prior)
        a(f"| {name} — {obs_str(obs, prior)} | {row3(hz_c)} | {row3(hz_k)} |")
    a("")
    a("Reading: at the current data the code difference is +0.4 pt holds / "
      "−0.2 pt lapse on the displayed row (row a) — the candidate sits on "
      "the published row. Row (d) is the one date where the inputs put the "
      "state off the pinned row (transits 4, corridor-flow absent): there "
      "the candidate's lapse share is 5.3 pts LOWER than the current "
      "model's (77.5 vs 82.8), i.e. the channel-mix difference is visible "
      "exactly when the state is not pinned. The input-refresh effect "
      "(rows a -> b: volume 7.6 -> 7.894, transits 12 -> 10, the latter a "
      "7-day-vs-3-day window-convention change not tested separately) moves "
      "the current model 0.0 pt and the candidate −0.1 pt on the displayed "
      "row.")
    a("")
    a("### Volume-only comparator (candidate; what the count adds at 0.5)")
    a("")
    a("The review asked for the count's treatment to be reassessed against a "
      "volume-only comparator. Candidate, at fixed prior 10/50/40, "
      "tankers 1:")
    a("")
    a("| inputs | HORIZON | STATE holds / standoff / lapse |")
    a("|---|---|---|")
    comp = [
        ("volume only, 17.3 (no count)", {"tankers": 1, "volume": 17.3}),
        ("volume + transits 12, 17.3", {"transits": 12, "tankers": 1, "volume": 17.3}),
        ("volume + transits 20, 17.3", {"transits": 20, "tankers": 1, "volume": 17.3}),
        ("volume + transits 4, 17.3 (disagreement)", {"transits": 4, "tankers": 1, "volume": 17.3}),
    ]
    for name, obs in comp:
        hz, post = candidate(obs, [0.10, 0.50, 0.40])
        a(f"| {name} | {row3(hz)} | {s_pct(post[0])} / {s_pct(post[1])} / "
          f"{s_pct(post[2])} |")
    a("")
    a("At 17.3 mb/d the count at its demoted weight moves the STATE holds "
      "share from the volume-only 50.3% to 30.4% (12/day — the count is "
      "closer to the standoff mode λ=10), 87.5% (20/day — the holds mode) "
      "and 2.7% (4/day — sharp disagreement with the barrels). The count "
      "still has real force at 0.5; note the direction is two-sided (a "
      "count above the current value strengthens holds, a low count "
      "weakens it). Whether 0.5 is the right weight — vs volume-only, vs "
      "a joint model — is NOT calibrated on this record; it is the stated "
      "hypothesis, and the comparator is the way to check it as dated "
      "counts accumulate.")
    a("")
    return L


# ---------------------------------------------------------------------------
# B. controlled sweeps, identical inputs
# ---------------------------------------------------------------------------
def sweeps():
    L = []
    a = L.append
    a("## B. Controlled single-input sweeps (identical inputs to both models)")
    a("")
    a("Base: the currently logged inputs (transits 12, tankers 1, volume "
      "7.6, Brent 108.79, prior 10/50/40); one input swept at a time in "
      "BOTH models. Uniform units: HORIZON as % to 1 dp; candidate STATE "
      "as % throughout (shares below 0.001% shown as percent in "
      "scientific notation).")
    a("")
    a("| input swept | value | inputs | current HORIZON | candidate HORIZON | candidate STATE holds/standoff/lapse |")
    a("|---|---|---|---|---|---|")
    def s(x):
        return s_pct(x)
    sweeps = []
    for v in [7.6, 10.0, 13.0, 17.3]:
        sweeps.append(("volume (mb/d)", v,
                       {"transits": 12, "tankers": 1, "volume": v, "brent": 108.79}))
    for t in [4, 6, 10, 12, 14, 20]:
        sweeps.append(("transits (/day)", t,
                       {"transits": t, "tankers": 1, "volume": 7.6, "brent": 108.79}))
    for k in [0, 1, 3, 5, 8]:
        sweeps.append(("tanker losses", k,
                       {"transits": 12, "tankers": k, "volume": 7.6, "brent": 108.79}))
    for b in [90.0, 108.79, 125.0, 150.0]:
        sweeps.append(("Brent ($)", b,
                       {"transits": 12, "tankers": 1, "volume": 7.6, "brent": b}))
    for name, val, obs in sweeps:
        hz_c, _ = current(obs, [0.10, 0.50, 0.40])
        hz_k, st_k = candidate(obs, [0.10, 0.50, 0.40])

        a(f"| {name} | {val} | {obs_str(obs, [0.10, 0.50, 0.40])} "
          f"| {row3(hz_c)} | {row3(hz_k)} | {s(st_k[0])} / "
          f"{st_k[1] * 100:.4f}% / {s(st_k[2])} |")
    a("")
    a("Reading: in the current model the shipping-input sweeps leave the "
      "displayed row within 15.0/49.9/35.1 of the pinned 15.0/50.0/35.0 "
      "(the state stays pinned — see the diagnosis); only the Brent sweep "
      "moves it visibly (15.5/49.8/34.7 at 90) — a price input, not a "
      "shipping one. In the candidate the volume sweep moves the displayed "
      "row monotonically (holds 15.4 -> 28.7, lapse 34.8 -> 27.4 over "
      "7.6 -> 17.3); the transit sweep moves it monotonically too, visibly "
      "at 20/day (21.0 holds); the tanker-loss sweep moves the lapse share "
      "non-decreasingly (34.4 -> 35.0 on the displayed row; the STATE lapse "
      "share is monotone over 0 -> 8: 5.7e-07 -> 3.0e-05); the Brent sweep "
      "does nothing (by design — price is context only).")
    a("")
    return L


# ---------------------------------------------------------------------------
# C. required scenarios
# ---------------------------------------------------------------------------
def scenarios():
    L = []
    a = L.append
    a("## C. Required scenarios (candidate)")
    a("")
    a("| scenario | inputs | candidate HORIZON | candidate STATE holds/standoff/lapse |")
    a("|---|---|---|---|")
    scen = [
        ("(1) high exports, ongoing attacks (2 confirmed losses)",
         [0.10, 0.50, 0.40], {"transits": 12, "tankers": 2, "volume": 17.3}),
        ("(1') same, zero confirmed losses",
         [0.10, 0.50, 0.40], {"transits": 12, "tankers": 0, "volume": 17.3}),
        ("(2) high exports, weak products",
         None, None),
        ("(3) recovery via bypass, Hormuz restricted (strait measure stays 7.894)",
         [0.10, 0.50, 0.40], {"transits": 10, "tankers": 1, "volume": 7.894}),
        ("(4) confirmed throughput collapse (0.5 mb/d)",
         [0.10, 0.50, 0.40], {"transits": 2, "tankers": 2, "volume": 0.5}),
        ("(4') confirmed closure (0)",
         [0.10, 0.50, 0.40], {"transits": 2, "tankers": 3, "volume": 0.0}),
        ("(5) high price at recovered throughput (Brent 150)",
         [0.10, 0.50, 0.40], {"transits": 12, "tankers": 1, "volume": 17.3,
                              "brent": 150.0}),
        ("(6) preliminary floor revises 1.5x higher (7.894 -> 11.84) — ILLUSTRATIVE",
         [0.10, 0.50, 0.40], {"transits": 10, "tankers": 1, "volume": 11.84}),
        ("(7) low crossing counts (4/day) at 17.3 mb/d",
         [0.10, 0.50, 0.40], {"transits": 4, "tankers": 1, "volume": 17.3}),
        ("(7') consistent counts (14/day) at 17.3 mb/d",
         [0.10, 0.50, 0.40], {"transits": 14, "tankers": 1, "volume": 17.3}),
    ]
    for name, prior, obs in scen:
        if prior is None:
            a(f"| {name} | not enterable — see note | — | — |")
            continue
        hz, post = candidate(obs, prior)
        a(f"| {name} | {obs_str(obs, prior)} | {row3(hz)} "
          f"| {s_pct(post[0])} / {s_pct(post[1])} / {s_pct(post[2])} |")
    a("")
    a("Notes: (2) — a crude/product SPLIT is not in any same-definition "
      "series yet (the DPA 82%/44% print is crude-only vs products-only, "
      "relative, against wire-reported baselines); 'weak products' cannot "
      "be entered without a new measure — flagged as a missing input, not "
      "modeled. (3) — by design the state is about the CORRIDOR (the "
      "strait), so bypass recovery (regional exports up, strait down) does "
      "not move the state; its impact is delegated to the storage-path "
      "sensitivity (illustrative, not adopted — see the deliverable). "
      "(5) — price is context only; a future-risk reading of a $150 price "
      "is the judgment's EIA-spread trigger, not a filter channel. "
      "(6) — the briefing's '1.5-2x' statement is a historical observation "
      "about how preliminary tiers settle; it is used here to ILLUSTRATE a "
      "revision size, not to validate the current measurement or forecast "
      "its revision. (7)/(7') — low counts at high barrels can reflect "
      "cargo sizes, load factors and shuttle geometry as well as AIS "
      "coverage (the briefing's count INCLUDES satellite/HUMINT-confirmed "
      "dark crossings; 79% dark is a route-coverage statistic, not a miss "
      "rate); the pair is a disagreement between two measures of the "
      "corridor, and the demoted count channel registers it.")
    a("")
    return L


# ---------------------------------------------------------------------------
# D. chronological replay, reconstructed from the dated logs
# ---------------------------------------------------------------------------
# Every observation is the one the dated log recorded at that date.
# doc_hz = the HORIZON the log records as published that date (version of
# the model as it then existed); the candidate column is a re-run of the
# single candidate version at those same logged observations.
REPLAY = [
    ("2026-09-09", [0.15, 0.50, 0.35],
     {"transits": 10, "tankers": 10, "brent": 100.71},
     (14.9, 49.8, 35.3), "v1, no volume channel",
     "log §9: 'prior 15/50/35 + (transits 10/d, 10 losses, Brent $100.71) "
     "-> horizon 14.9/49.8/35.3'. The 10-loss input is the 10 Iranian "
     "shadow tankers destroyed by the US that week (the documented loss "
     "input of that era), ingested through the same loss channel in both "
     "models; the candidate's channel mix responds differently — a "
     "code-version/input-convention artifact, not a scored difference."),
    ("2026-09-16", [0.10, 0.40, 0.50],
     {"transits": 4, "tankers": 1, "brent": 108.75,
      "corridor_flow": "absent"},
     (5.4, 11.8, 82.8), "v2.x; documented run reproduced exactly by the v2.4b re-run",
     "log :143: '--transits 4 --tankers 1 --brent 108.75 --corridor-flow "
     "absent -> HORIZON 5.4/11.8/82.8'. No volume print documented at the "
     "date (the volume channel was introduced Sep 28)."),
    ("2026-09-23", [0.10, 0.40, 0.50],
     {"transits": 5, "tankers": 1, "brent": 99.25,
      "corridor_flow": "degraded"},
     (14.3, 47.4, 38.3), "v2.x; documented",
     "log :80-83: 'Sep 20/21/22 — tankers 1 [La Stephanie, Sep 21], Brent "
     "settled 99.25, corridor-flow degraded: HORIZON 14.3/47.4/38.3'. No "
     "volume print at the date; the manual 'degraded' label is the "
     "documented missing-input case."),
    ("2026-09-30", [0.10, 0.50, 0.40],
     {"transits": 5, "tankers": 1, "brent": 102.59, "volume": 7.4},
     (14.4, 47.6, 38.0), "v2.3 threshold-volume channel; a v2.4b re-run at the same inputs is pinned at 15/50/35 — the documented and re-run rows differ because the code changed after Sep 30",
     "log :105-109: transits 5 (last published daily counts 9/5/0), "
     "tankers 1, volume 7.4 (Kpler 7-day crude print), Brent 102.59 (Sep 30 "
     "close) -> 'HORIZON 14.4/47.6/38.0'."),
    ("2026-10-07", [0.10, 0.50, 0.40],
     {"transits": 5, "tankers": 1, "brent": 100.58, "volume": 10.3},
     (15.0, 50.0, 35.0), "v2.4b; documented, re-run reproduces exactly",
     "log :69-72: '--transits 5 --tankers 1 --brent 100.58 --volume 10.3 "
     "-> HORIZON 15.0/50.0/35.0' (transits 5: Kpler's Oct 1-3 daily counts "
     "still unpublished)."),
    ("2026-10-14", [0.10, 0.50, 0.40],
     {"transits": 12, "tankers": 1, "brent": 105.69, "volume": 10.1},
     (15.0, 50.0, 35.0), "v2.4b; documented, re-run reproduces exactly",
     "log :49-52: 'HORIZON 15.0/50.0/35.0 (STATE 0/100/0) — FLAT, identical "
     "inputs (transits 12, tanker loss 1, Brent 105.69, volume 10.1)'."),
    ("2026-10-21", [0.10, 0.50, 0.40],
     {"transits": 12, "tankers": 1, "brent": 108.79, "volume": 7.6},
     (15.0, 50.0, 35.0), "v2.4b; documented this morning, re-run reproduces exactly",
     "log ~07:20 entry: 'transits 12, tankers 1, volume 7.6, brent "
     "108.79 -> HORIZON 15/50/35 — FLAT'."),
]

# documented data that subsequently arrived (log-sourced; NOT inputs)
AFTER = {
    "2026-09-09": "transits fell (Sep 10: 7, zero crude; Sep 14: 7; Sep 15: "
    "4; 10-day avg 18); Brent settled 108.75 (Sep 16)",
    "2026-09-16": "pre-committed >=7/day check FAILED (window Sep 23-30: "
    "14, 9, -, 5, 0); 1 confirmed tanker loss (La Stephanie, Sep 21); "
    "Brent settled 99.25 (Sep 23)",
    "2026-09-23": "check continued to fail (5, 0); Kpler volume print 7.4 "
    "(7-day crude); Brent close 102.59 (Sep 30)",
    "2026-09-30": "transits 5 (Kpler Oct 1-3 counts unpublished); volume "
    "10.3 (Kpler 7-day, as of Oct 3, published Oct 6); Brent settled "
    "100.58 (Oct 6)",
    "2026-10-07": "transits 12 (3-day avg Oct 5-7: 20+/7/10); volume 10.1 "
    "(Kpler Oct 6 print); GFS Pride sank (Oct 14; a second vessel loss, "
    "not a tanker-loss input); Brent settled 105.69 (Oct 13)",
    "2026-10-14": "volume basis switch 10.1 -> 7.6 (Oct 14 briefing, data "
    "to Oct 12, total-oil strait transits); Bukha + Al Faw tanker hits "
    "(Oct 20-21, crews safe, no confirmed losses); Brent settled 108.79 "
    "(Oct 20)",
    "2026-10-21": "UNRESOLVED — the Nov 15 'corridor lapses' binary is the "
    "scoring target",
}


def replay():
    L = []
    a = L.append
    a("## D. Chronological replay, reconstructed from the dated logs")
    a("")
    a("Supersedes the earlier draft's replay, whose Sep 16 inputs "
      "(transits 17, volume 10.14) and Sep 9 volume (7.56) are not present "
      "in the record and are withdrawn. Every observation below is the one "
      "the dated log recorded; the 'current' column is the DOCUMENTED "
      "HORIZON published that date (model version then in use); the "
      "candidate column is a re-run of the single candidate version at "
      "those same logged observations. Persistence = the previous row's "
      "documented HORIZON. The volume inputs before Oct 15 are Kpler "
      "Hormuz CRUDE throughput prints (7.4/10.3/10.1); 7.6/7.894 are the "
      "briefing's TOTAL-oil strait transits — mixed basis, a known "
      "limitation of the shared volume medians.")
    a("")
    a("| date | prior | logged observations | documented HORIZON (version) | candidate re-run | persistence | published judgment |")
    a("|---|---|---|---|---|---|---|")
    judgments = {"2026-09-09": "10/50/40", "2026-09-16": "10/40/50",
                 "2026-09-23": "10/40/50", "2026-09-30": "10/50/40",
                 "2026-10-07": "10/50/40", "2026-10-14": "10/50/40",
                 "2026-10-21": "10/50/40"}
    prev_doc = None
    for date, prior, obs, doc_hz, ver, src in REPLAY:
        hz_k, _ = candidate(obs, prior)
        persist = "—" if prev_doc is None else pct3(prev_doc)
        a(f"| {date} | {'/'.join(f'{p * 100:.0f}' for p in prior)} "
          f"| {obs_str(obs, prior)} | {pct3(doc_hz)} ({ver}) "
          f"| {row3(hz_k)} | {persist} | {judgments[date]} |")
        prev_doc = doc_hz
    a("")
    a("Oct 21, refreshed same-definition inputs (NOT the documented run — "
      "shown separately, per the review): current 15.0/50.0/35.0; "
      "candidate 15.3/49.9/34.9 (transits 10 = the 7-day average, a "
      "window-convention change vs the model's 3-day-average 12).")
    a("")
    a("### What the data did next (log-sourced; divergence, not scores)")
    a("")
    a("| date | documented data that arrived after |")
    a("|---|---|")
    for date, *_ in REPLAY:
        a(f"| {date} | {AFTER[date]} |")
    a("")
    a("### Source notes per row")
    a("")
    for date, prior, obs, doc_hz, ver, src in REPLAY:
        a(f"- **{date}** ({ver}): {src}")
    a("")
    a("**Validation caveat (stated plainly):** the record is 6-7 weeks and "
      "the scoring target (the Nov 15 'corridor lapses' binary) is "
      "unresolved, so NO scored accuracy comparison is possible here, and "
      "none is made. What the corrected replay shows: (i) the current "
      "model WAS responsive to the logged inputs — its documented Sep 16 "
      "run was 5.4/11.8/82.8 at transits 4 / corridor-flow absent — the "
      "earlier draft's 'flat at 15/50/35 across all seven weeks' "
      "characterization was an artifact of inputs that could not be "
      "sourced from the record and is withdrawn; (ii) at the documented "
      "observations the candidate re-runs track the same documented moves "
      "(77.5% lapse Sep 16; 40.4% lapse Sep 23; on the published row at "
      "the current data); (iii) where the two models differ is a "
      "channel-mix difference visible on the unpinned rows (Sep 16: "
      "candidate 5.3 pts lower lapse than the current model), not a scored "
      "accuracy difference. The first scored discrimination point is the "
      "Nov 15 resolution plus the Kpler prints in between.")
    a("")
    return L


def main():
    L = ["# Candidate branch filter — validation results (2026-10-21, REVISED)",
         "",
         "Candidate = `branch_filter_candidate.py` (v3-candidate: Brent out "
         "of the state filter; transits weight 0.5). Current = "
         "`branch_filter.py` v2.4b. Revised after the external review at "
         "`research/logs/review-model-candidate-2026-10-21.md`: identical-"
         "input code comparison separated from input refresh; uniform "
         "units and exact input columns; replay reconstructed from the "
         "dated logs; no unscored accuracy claims.",
         ""]
    L += identical_input_comparison()
    L += sweeps()
    L += scenarios()
    L += replay()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write("\n".join(L) + "\n")
    print("\n".join(L))
    print(f"\n[written] {OUT}")


if __name__ == "__main__":
    main()
