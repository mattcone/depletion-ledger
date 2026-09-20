#!/usr/bin/env python3
"""Standoff recovery definition — the issued redefinition A and
sensitivity B (offline; writes only its own output).
The previously issued standoff path (v2026-09-18) described its 2027
production rise ("flat-then-slow, +~6.5 mb/d over 2027") as a chosen
path shape. The reader question it failed: "what physically returns
that production while the standoff continues?" Two explicit answers
were constructed and the baseline adjustments derived from them; A was
then ISSUED as the redefined scenario (v2026-09-19; new dated record
+ assumptions snapshot; the v2026-09-18 record is preserved for
scoring). This script now: loads the ISSUED standoff record
(v2026-09-19) verbatim, independently recomputes A and asserts it
matches the record exactly, recomputes the unissued sensitivity B, and
writes both (plus the superseded v2026-09-18 path, carried verbatim
from its preserved record) for the research page. Nothing published is
modified by this script.

CANDIDATE A — the redefinition of "standoff" (ISSUED as v2026-09-19):
  "Gulf supply does not materially improve while the standoff persists.
  No recovery from reopened routes or restored disrupted facilities is
  assumed. Production outside the Gulf can grow under an explicit
  assumption. Consumption follows the issued demand convention."
  - Gulf: HELD at the comparison's ASSUMED STARTING LEVEL (world
    100.5 mb/d, flat through end-2026; documented assumption: the
    workaround ramp offsets the Sep 11 pipeline suspension and Sep 16
    Yanbu loadings halt, so nothing new returns in 2026). The anchor
    is NOT the EIA baseline's Sep-Nov 2026 values — those are the
    baseline's FORECAST for months not yet passed (today is 19 Sep
    2026) and cannot establish the current production level.
  - Non-Gulf: explicit growth assumption, +0.5 mb/d per quarter of
    2027 (+2.0 total by Dec 2027). The chosen growth rate is simply
    ours; the pre-war world level (~108 mb/d, H2 2025) is context,
    not the rate.
  - "No net Gulf recovery" is a SCENARIO CHOICE, not an established
    fact — labeled as such on the page.

SENSITIVITY B — "slower-recovery variant" (NOT issued; research-page
sensitivity only): the same story
with one mechanism added, so readers can see what the Gulf ramp is
worth: a partial Gulf restoration via the EIA's stated workaround
routes (increased Suez shipments, ship-to-ship, alternative routes) at
about HALF the baseline's own 2027 Gulf restoration rate (+2.5 total by
Dec 2027; the baseline's ~6.9 mb/d 2027 rise, computed from the
workbook, is split as judgment ~2.0 growth / ~4.9 Gulf — the split and
the half-rate are choices, not published estimates).

THE PHYSICAL STORY BEHIND B (all recovery amounts are documented
judgment — the sources cited support the mechanisms, not the
magnitudes):

  What returns, when, why:
    1. Non-Gulf normal growth: +0.5 mb/d per quarter of 2027
       (+2.0 total by Dec 2027). US, Brazil, Guyana, Canada, and
       non-Gulf OPEC additions continue.
       (Same explicit assumption as candidate A.)
    2. Gulf partial restoration via alternative routes: +0.5, +1.0, +2.0,
       +2.5 mb/d cumulative by each 2027 quarter (+2.5 total by Dec).
       The EIA's own stated workaround mechanisms (increased Suez
       shipments, ship-to-ship transfers, alternative routes out of the
       region) keep maturing, but at about HALF the baseline's own
       2027 Gulf restoration rate: the baseline's production rises
       ~+4.9 mb/d of Gulf restoration in 2027 (its total 2027 rise of
       ~+6.9 mb/d, computed from the workbook, split ~+2.0 non-Gulf
       growth / ~+4.9 Gulf restoration — the split is judgment).
       Attacks persist and the bypass is offline, so only half returns
       inside the horizon.
  What does NOT return:
    3. The East-West (Petroline) pipeline's ~4 mb/d flow (Rystad via
       CNBC, 11 Sep 2026): the scenario definition carries no restart
       date, and the 16 Sep halt of loadings at Yanbu means the bypass
       cannot move barrels even when partially repaired.
    4. Attack-maintenance shut-ins continue for the duration (the
       war continues at current intensity).
  Net result: scenario production runs ~6.8 mb/d below the EIA
  baseline in Dec 2027 (Petroline ~4 + attack maintenance ~2.8),
  versus ~4.3 on the issued path.

THE INTENDED PRODUCTION PATH (the story, made absolute):
  2026-09 .. 2026-12: 100.5 mb/d flat — the current level. The
  workaround ramp offsets the incremental Sep 11 (Petroline
  suspension) and Sep 16 (Yanbu loadings halt) losses; nothing new
  returns in 2026.
  2027 quarter-END levels: Q1 101.5, Q2 102.5, Q3 104.0, Q4 105.0 —
  100.5 + (growth_qend + gulf_qend) per the mechanism tables above;
  the mechanism contributions are cumulative by quarter END, so the
  Dec-2027 level (105.0) is exactly 100.5 + 4.5, where 4.5 = +2.0
  growth + +2.5 Gulf restoration (asserted below). Monthly values are
  linear between consecutive quarter-end levels (Dec 2026 level
  100.5 -> Mar 101.5 -> Jun 102.5 -> Sep 104.0 -> Dec 105.0).

ASSUMPTION HONESTY (labeled in the output too): the +0.5/quarter
non-Gulf growth pace and the "half the baseline's Gulf restoration"
rate are CHOSEN ASSUMPTIONS. The frozen workbook shows the baseline's
6.9 mb/d 2027 rise; the ~2.0 / ~4.9 split of it, the growth pace, and
the half-rate are this test's choices, not published estimates.

DEMAND CLAUSE (stated, per the review): both paths use the ISSUED
standoff's own demand convention verbatim (read from the record's
frozen assumptions snapshot: -0.5 through 2026, -1.0 in H1 2027,
-0.5 in H2 2027 vs the baseline). It ASSUMES consumption below the
EIA baseline with the reduction easing in late 2027; it does NOT model
demand destruction progressively deepening as inventories draw down.
Keeping it identical across the paths means the differences shown are
purely supply assumptions — that limitation is stated on the page.

DERIVATION (the point of this test): the monthly production
adjustment is DERIVED, not chosen:
    delta_p(m) = intended_production(m) - baseline_production(m)
A and B differ only in the Gulf mechanism (+2.5 by Dec 2027), so the
endpoint gap between them is the value of the assumed Gulf recovery.

Cumulatives start from the issued record's stored anchor (2026-08,
-507 mb, IEA OMR 11 Sep 2026 web) — identical to the issued path —
so the endpoints are directly comparable.

Guarantees:
  - Reads the frozen workbook through the SAME loader as the
    published pipeline (regen-scenarios.load_baseline), at full
    workbook precision.
  - The issued record
    (scenario-standoff-2026-09-19-global-observed) and all published
    artifacts are NOT modified; the issued path is carried verbatim
    from the record's stored anchor + targets, and the independent
    recomputation of A is asserted to match the record exactly
    (cumulatives and monthlies, 1e-9).
  - Drift guards fail loudly if the frozen inputs change.
  - Writes exactly two files with identical content; this script is
    the only writer of both (the site copy exists because Vite cannot
    import from outside site/):
      research/stress-test/standoff-recovery-results.json (canonical)
      site/src/data/standoff-recovery.json (site import copy)
    Run: python3 research/stress-test/standoff-recovery.py
"""
import importlib.util
import json
import os
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/mcone/depletion-ledger"
WORKBOOK = f"{REPO}/research/sources/eia-steo-2026-09-17.xlsx"
DATA = f"{REPO}/site/src/data/world-stocks.json"
OUTS = [f"{HERE}/standoff-recovery-results.json",
        f"{REPO}/site/src/data/standoff-recovery.json"]

# --- reuse the published pipeline's baseline loader (exact same workbook read)
spec = importlib.util.spec_from_file_location(
    "regen_scenarios", f"{REPO}/research/scoring/regen-scenarios.py")
rs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rs)

MONTHS = [f"2026-{m:02d}" for m in range(9, 13)] + \
         [f"2027-{m:02d}" for m in range(1, 13)]  # 2026-09 .. 2027-12

# --- the intended absolute production path (mb/d) ---
LEVEL_2026 = 100.5
# Mechanism contributions CUMULATIVE BY QUARTER END (chosen assumptions;
# docstring). A quarter-end level = LEVEL_2026 + growth + gulf at that
# quarter's end, so the Dec-2027 level equals the full mechanism sum.
GROWTH_QEND = {"2027-Q1": 0.5, "2027-Q2": 1.0, "2027-Q3": 1.5, "2027-Q4": 2.0}
GULF_QEND = {"2027-Q1": 0.5, "2027-Q2": 1.0, "2027-Q3": 2.0, "2027-Q4": 2.5}
Q_END = {q: LEVEL_2026 + GROWTH_QEND[q] + GULF_QEND[q] for q in GROWTH_QEND}
assert Q_END == {"2027-Q1": 101.5, "2027-Q2": 102.5,
                 "2027-Q3": 104.0, "2027-Q4": 105.0}, Q_END
# The Dec-2027 rise must equal the two mechanisms summed (no gap between
# the story and the path — the fix for the quarter-end/quarter-mean mixup).
assert abs((Q_END["2027-Q4"] - LEVEL_2026)
           - (GROWTH_QEND["2027-Q4"] + GULF_QEND["2027-Q4"])) < 1e-9

def _path_from_qend(qend_levels):
    """Monthly path: flat LEVEL_2026 through 2026-12, then linear between
    consecutive quarter-end levels in 2027."""
    p = {f"2026-{m:02d}": LEVEL_2026 for m in range(9, 13)}
    prev = LEVEL_2026  # Dec-2026 level
    for q, mids in [("2027-Q1", (1, 2, 3)), ("2027-Q2", (4, 5, 6)),
                    ("2027-Q3", (7, 8, 9)), ("2027-Q4", (10, 11, 12))]:
        end = qend_levels[q]
        for k, m in enumerate(mids, start=1):
            p[f"2027-{m:02d}"] = round(prev + (end - prev) * k / 3, 4)
        prev = end
    return p

# B: growth + Gulf half-rate restoration
INTENDED_P = _path_from_qend(Q_END)
assert abs(INTENDED_P["2027-12"] - (LEVEL_2026
                                    + GROWTH_QEND["2027-Q4"]
                                    + GULF_QEND["2027-Q4"])) < 1e-9

# A: growth only (Gulf held at the 2026 scenario level)
GROWTH_QEND_A = GROWTH_QEND
Q_END_A = {q: LEVEL_2026 + GROWTH_QEND_A[q] for q in GROWTH_QEND_A}
assert Q_END_A == {"2027-Q1": 101.0, "2027-Q2": 101.5,
                   "2027-Q3": 102.0, "2027-Q4": 102.5}, Q_END_A
INTENDED_A = _path_from_qend(Q_END_A)
assert abs(INTENDED_A["2027-12"] - (LEVEL_2026 + GROWTH_QEND_A["2027-Q4"])) < 1e-9
# A and B must differ only by the Gulf mechanism, every month
GULF_BY_MONTH = {m: round(INTENDED_P[m] - INTENDED_A[m], 4) for m in MONTHS}
assert all(GULF_BY_MONTH[m] == 0.0 for m in MONTHS if m.startswith("2026"))
assert GULF_BY_MONTH["2027-12"] == 2.5, GULF_BY_MONTH

# --- drift guards: fail loudly if the frozen inputs changed ---
EXPECTED_WORKBOOK_SHA = "c06a15243b0d972045ecc59cf9376885f68c7c306c581de5d01e6b8ac1a236c5"
EXPECTED_RECORD_ID = "scenario-standoff-2026-09-19-global-observed"
EXPECTED_SNAPSHOT_SHA = "b64759d796e0396fbad5012d8fd822059acf2b3b19499a4f2cefd3ca1f3c4ca2"
EXPECTED_ANCHOR = ("2026-08", -507.0)
EXPECTED_ISSUED_ENDPOINT_MB = -1832.6315168699984
# Superseded by the v2026-09-19 issuance; preserved in the data file for
# scoring and carried verbatim on the research page.
SUPERSEDED_RECORD_ID = "scenario-standoff-2026-09-18-global-observed"


def main():
    baseline = rs.load_baseline(WORKBOOK)
    data = json.load(open(DATA))
    rec = next(r for r in data["forecast_records"]
               if r["record_id"] == EXPECTED_RECORD_ID)

    assert rs.sha256(WORKBOOK) == EXPECTED_WORKBOOK_SHA, (
        "workbook sha256 changed — re-review the frozen inputs before re-running")
    assert rec["record_id"] == EXPECTED_RECORD_ID
    assert (rec["anchor"]["period"], float(rec["anchor"]["value_mb"])) == EXPECTED_ANCHOR, (
        "record anchor changed — issued record must not be modified")
    snap_path = f"{REPO}/{rec['assumptions_ref']['path']}"
    assert rs.sha256(snap_path) == rec["assumptions_ref"]["sha256"] == EXPECTED_SNAPSHOT_SHA, (
        "assumptions snapshot no longer matches the record's frozen hash")
    assert abs(float(rec["endpoint"]["cumulative_mb"])
               - EXPECTED_ISSUED_ENDPOINT_MB) < 1e-6, (
        "stored Dec-2027 target changed — issued record must not be modified")

    anchor = rec["anchor"]
    start_cum = float(anchor["value_mb"])
    assert [t["period"] for t in rec["targets"]] == MONTHS

    def verbatim(record):
        """Anchor + stored targets, incl. monthly balance."""
        pts = [{"period": record["anchor"]["period"],
                "cumulative_mb": float(record["anchor"]["value_mb"]),
                "monthly_mb": None}]
        for t in record["targets"]:
            pts.append({"period": t["period"],
                        "cumulative_mb": float(t["target_cumulative_mb"]),
                        "monthly_mb": float(t["target_monthly_mb"])})
        return pts

    # Issued path (v2026-09-19 = candidate A), verbatim from the record.
    issued = verbatim(rec)
    # Superseded path (v2026-09-18), verbatim from its preserved record.
    sup_rec = next(r for r in data["forecast_records"]
                   if r["record_id"] == SUPERSEDED_RECORD_ID)
    assert (sup_rec["anchor"]["period"], float(sup_rec["anchor"]["value_mb"])) == EXPECTED_ANCHOR
    superseded = verbatim(sup_rec)

    # Issued demand convention, read from the record's frozen snapshot.
    snap = json.load(open(snap_path))
    standoff = next(s for s in snap["scenarios"] if s["id"] == "standoff")
    issued_dc = {k: float(v) for k, v in
                 standoff["consumption_adjustment_mb_d"].items()}
    assert set(issued_dc) == set(MONTHS)

    def rows_for(intended):
        """Derive monthly rows from an intended absolute production path."""
        cum = start_cum
        rows = []
        for m in MONTHS:
            b = baseline[m]
            dp = intended[m] - b["prod"]
            dc = issued_dc[m]
            p = b["prod"] + dp   # == intended[m], exact by construction
            c = b["cons"] + dc
            d = (p - c) * b["days"]
            cum += d
            rows.append({
                "period": m,
                "intended_prod_mb_d": intended[m],
                "baseline_prod_mb_d": b["prod"],
                "delta_p_mb_d": dp,
                "baseline_cons_mb_d": b["cons"],
                "delta_c_mb_d": dc,
                "scenario_cons_mb_d": c,
                "monthly_mb": d,
                "cumulative_mb": cum,
            })
        return rows

    # A (redefinition; now the ISSUED path) and B (recovery sensitivity).
    candidate = rows_for(INTENDED_A)
    variant = rows_for(INTENDED_P)

    # A is the issued record: the independent recomputation must match the
    # record exactly (this is what the page's "issued" line shows).
    assert len(candidate) == len(rec["targets"])
    for row, t in zip(candidate, rec["targets"]):
        assert abs(row["cumulative_mb"] - float(t["target_cumulative_mb"])) < 1e-9, (
            row["period"], row["cumulative_mb"], t["target_cumulative_mb"])
        assert abs(row["monthly_mb"] - float(t["target_monthly_mb"])) < 1e-9, row["period"]

    cand_end = candidate[-1]["cumulative_mb"]
    variant_end = variant[-1]["cumulative_mb"]
    # A and B share the baseline and demand, so their endpoint gap is the
    # value of the Gulf mechanism: sum of (gulf_m x days).
    gulf_value = sum(GULF_BY_MONTH[m] * baseline[m]["days"] for m in MONTHS)
    assert abs((variant_end - cand_end) - gulf_value) < 1e-6

    # EIA baseline's own balance from the same anchor (reference line).
    base_cum = start_cum
    base_ref = [{"period": anchor["period"], "cumulative_mb": start_cum}]
    for m in MONTHS:
        b = baseline[m]
        base_cum += (b["prod"] - b["cons"]) * b["days"]
        base_ref.append({"period": m, "cumulative_mb": base_cum})

    # Baseline's own 2027 production rise (for the mechanism split copy).
    base_rise_2027 = baseline["2027-12"]["prod"] - baseline["2027-01"]["prod"]
    base_p_dec = baseline["2027-12"]["prod"]
    gap_dec_a = base_p_dec - INTENDED_A["2027-12"]
    gap_dec_b = base_p_dec - INTENDED_P["2027-12"]
    # Issued Dec-2027 gap vs baseline = -(issued production adjustment).
    issued_dp_dec = float(standoff["production_adjustment_mb_d"]["2027-12"])
    issued_gap_dec = -issued_dp_dec

    out = {
        "meta": {
            "title": "Standoff redefinition (issued v2026-09-19) and sensitivity B",
            "kind": ("A is the issued standoff scenario (v2026-09-19); B is "
                     "NOT issued — research-page sensitivity only. The "
                     "superseded v2026-09-18 record is preserved for "
                     "scoring."),
            "generated_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "workbook": {"path": "research/sources/eia-steo-2026-09-17.xlsx",
                         "sha256": rs.sha256(WORKBOOK)},
            "assumptions_snapshot": {"path": rec["assumptions_ref"]["path"],
                                     "sha256": rec["assumptions_ref"]["sha256"]},
            "issued_record": {"record_id": rec["record_id"],
                              "issued": rec["issued"],
                              "endpoint_cumulative_mb": float(
                                  rec["endpoint"]["cumulative_mb"])},
            "superseded_record": {"record_id": sup_rec["record_id"],
                                  "issued": sup_rec["issued"],
                                  "endpoint_cumulative_mb": float(
                                      sup_rec["endpoint"]["cumulative_mb"]),
                                  "note": ("Superseded by the v2026-09-19 "
                                           "issuance; preserved unchanged "
                                           "for scoring.")},
            "anchor": {"period": anchor["period"], "value_mb": start_cum,
                       "note": ("The Gulf level in A and B is anchored to the "
                                "comparison's assumed starting level (100.5 "
                                "mb/d world, flat through end-2026) — a "
                                "documented assumption (workaround ramp "
                                "offsets the September events), not an "
                                "observation. The EIA baseline's Sep-Nov "
                                "2026 values are forecasts for months not "
                                "yet passed (today is 19 Sep 2026) and do "
                                "not anchor the level.")},
            "candidate_endpoint_cumulative_mb": cand_end,
            "variant_endpoint_cumulative_mb": variant_end,
            "gulf_sensitivity_value_mb": gulf_value,
            "demand_clause_note": ("A and B use the issued standoff's own "
                                   "demand convention verbatim: consumption "
                                   "below the EIA baseline, -0.5 mb/d through "
                                   "2026, -1.0 in H1 2027, easing to -0.5 in "
                                   "H2 2027. It does not model demand "
                                   "destruction deepening as inventories draw "
                                   "down; identical demand keeps the A/B "
                                   "differences purely supply assumptions."),
            "scenario_choice_note": ("'No net Gulf recovery' (A) is a scenario "
                                     "choice, not an established fact; B shows "
                                     "what an explicit half-rate workaround "
                                     "recovery would be worth."),
            "mechanism": {
                "level_2026_mb_d": LEVEL_2026,
                "quarter_end_levels_mb_d": Q_END,
                "non_gulf_growth_cum_by_quarter_end_mb_d": GROWTH_QEND,
                "gulf_half_rate_restoration_cum_by_quarter_end_mb_d": GULF_QEND,
                "assumption_note": ("The +0.5/quarter non-Gulf growth pace and the "
                                    "~half-rate Gulf restoration are chosen "
                                    "assumptions, not published estimates; the "
                                    "~2.0/~4.9 split of the baseline's 2027 rise is "
                                    "this test's choice."),
                "baseline_2027_rise_mb_d": base_rise_2027,
                "baseline_2027_rise_split_judgment_mb_d": {"non_gulf": 2.0,
                                                           "gulf_restoration": round(base_rise_2027 - 2.0, 2)},
                "never_returns": ("East-West (Petroline) pipeline ~4 mb/d flow "
                                  "(no restart date; Yanbu loadings halted 16 Sep) "
                                  "+ attack-maintenance shut-ins"),
                "dec_2027_level_mb_d": INTENDED_P["2027-12"],
                "dec_2027_rise_mb_d": INTENDED_P["2027-12"] - LEVEL_2026,
                "dec_2027_gap_vs_baseline_mb_d": gap_dec_b,
                "issued_dec_2027_gap_vs_baseline_mb_d": issued_gap_dec,
            },
            "candidate_a": {
                "definition": ("Gulf supply held at the assumed starting level "
                               "(100.5 mb/d world, flat through end-2026; no "
                               "net Gulf recovery); non-Gulf growth +2.0 mb/d "
                               "over 2027 (chosen assumption); issued demand "
                               "convention."),
                "level_2026_mb_d": LEVEL_2026,
                "quarter_end_levels_mb_d": Q_END_A,
                "dec_2027_level_mb_d": INTENDED_A["2027-12"],
                "dec_2027_gap_vs_baseline_mb_d": gap_dec_a,
            },
        },
        "months": MONTHS,
        "issued": issued,
        "candidate": candidate,
        "variant": variant,
        "superseded": superseded,
        "baseline_balance": base_ref,
    }

    for path in OUTS:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            json.dump(out, f, indent=2)
            f.write("\n")
    print(f"wrote {len(OUTS)} files")
    print(f"issued (=A) endpoint:   {issued[-1]['cumulative_mb']:.1f} mb")
    print(f"candidate A endpoint:   {cand_end:.1f} mb (recomputed; asserted == issued)")
    print(f"superseded v09-18:      {superseded[-1]['cumulative_mb']:.1f} mb")
    print(f"sensitivity B endpoint: {variant_end:.1f} mb")
    print(f"Gulf sensitivity value: {gulf_value:.1f} mb")
    print(f"baseline balance:       {base_ref[-1]['cumulative_mb']:.1f} mb")
    print(f"baseline 2027 rise: {base_rise_2027:.2f} mb/d; Dec-2027 gap vs "
          f"baseline: {gap_dec_a:.2f} (A), {gap_dec_b:.2f} (B), "
          f"{issued_gap_dec:.2f} (issued)")
    for row in candidate:
        b = next(r for r in variant if r["period"] == row["period"])
        print(f"  {row['period']}  A P {row['intended_prod_mb_d']:.1f} cum {row['cumulative_mb']:.1f}   "
              f"B P {b['intended_prod_mb_d']:.1f} cum {b['cumulative_mb']:.1f}")


if __name__ == "__main__":
    main()
