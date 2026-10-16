#!/usr/bin/env python3
"""Illustrative partial-recovery sensitivity for the v2 standoff
(offline; writes only its own output; NOT issued, NOT published).

The published v2 standoff (v2026-10-15) holds world production flat at
the reported September level (101.30 mb/d) through 2026. The September
audit and the October evidence review (research/logs/2026-10-06.md,
the Oct 15 audit, and the post-merge recheck) established that the
flat level is a judgment — "the recovery stops at the reported
September level" — not a conclusion September established, and that
the published assumptions contain no mechanism from which the level
could be derived (no Gulf production identity: no route split, no
domestic use, no port stocks). This script quantifies how much that
flat-production judgment matters by constructing the SIMPLEST labeled
midpoint: for each month, sensitivity production is exactly halfway
between the published v2 standoff production and the EIA baseline
production. It is a comparison, not a claim: nothing in the evidence
locates the likely outcome halfway between the paths.

FORMULA (per month m, 2026-10 .. 2027-12, at full workbook precision):
    P_standoff(m) = P_EIA(m) + dP_issued(m)     [dP from the frozen
                                                  v2026-10-15 snapshot]
    P_sens(m)     = (P_standoff(m) + P_EIA(m)) / 2
                    = P_EIA(m) + dP_issued(m) / 2
    C_sens(m)     = C_standoff(m) = C_EIA(m) + dC_issued(m)
                    [identical consumption; dC_issued asserted 0 every month]
    balance(m)    = (P_sens(m) - C_sens(m)) * days(m)
    cumulative    starts at the v2 rebase_start (2026-09, -509 mb,
                    observed) and adds the monthly balances — the SAME
                    starting convention as the issued v2 record.

Why the monthly midpoint, not "half the Gulf recovery": the v1-era
sensitivity B (standoff-recovery.py) applied half of the baseline's
Gulf-restoration split, and the non-Gulf growth already inside the
standoff would have to be excluded to avoid double-counting. The
month-by-month midpoint between the two published production levels
needs no split at all: it is defined entirely by numbers that are
already frozen (the issued record's dP and the baseline), and its
endpoint difference from the issued path is exactly half the endpoint
difference between the issued path and the EIA baseline's own balance
from the same starting point.

EVIDENCE FRAMING (carried in the output, per the review):
  - Labeled "illustrative partial recovery" — NOT "half the Gulf
    recovery". The midpoint is a construction for comparison.
  - The East-West bypass figure of 5.8 mb/d (Saudi energy minister,
    6 Oct; Al Arabiya original wording archived in research/logs/
    2026-10-06.md) is treated as a REPORTED OPERATING RATE as of that
    date, with an UNVERIFIED sustained average. It is context for why
    a partial-recovery comparison is worth showing; it is not an
    input to any number in this output.
  - September's rebound does not establish uninterrupted momentum
    (EIA Table 3c: Saudi Jul 2026 9.35 > Sep 2026 9.29), and the
    four-country table excludes the UAE, Bahrain, Qatar and Oman.

Guarantees:
  - Reads the frozen Oct 6 workbook through the SAME loader as the
    published pipeline (regen-scenarios.load_baseline).
  - The issued v2 standoff record (v2026-10-15) and all published
    artifacts are NOT modified. The issued path is recomputed
    independently from the frozen baseline + frozen snapshot and
    asserted to match the record exactly (cumulatives and monthlies,
    1e-9) before the sensitivity is computed from the same inputs.
  - Drift guards fail loudly if any frozen input changes.
  - Writes exactly ONE file (the page stays parked; a site data copy
    and page come only with a publication decision):
      research/stress-test/standoff-partial-recovery-results.json
    This script is the only writer of that file.
  Run: python3 research/stress-test/standoff-partial-recovery.py
"""
import importlib.util
import json
import os
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/mcone/depletion-ledger"
WORKBOOK = f"{REPO}/research/sources/eia-steo-2026-10-06.xlsx"
DATA = f"{REPO}/site/src/data/world-stocks.json"
OUT = f"{HERE}/standoff-partial-recovery-results.json"

# --- reuse the published pipeline's baseline loader (exact same workbook read)
spec = importlib.util.spec_from_file_location(
    "regen_scenarios", f"{REPO}/research/scoring/regen-scenarios.py")
rs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rs)

MONTHS = [f"2026-{m:02d}" for m in range(10, 13)] + \
         [f"2027-{m:02d}" for m in range(1, 13)]  # 2026-10 .. 2027-12

# --- drift guards: fail loudly if the frozen inputs changed ---
EXPECTED_WORKBOOK_SHA = "54989362410da4aff5673580396380c3a8f4f111fa6d01c6d4fab05ef90efbf4"
EXPECTED_RECORD_ID = "scenario-standoff-2026-10-15-global-observed"
EXPECTED_SNAPSHOT_SHA = "8ea801e2776cdd35ae84fc7cb64de1623f265c82a69fb28f9fbc11bf7f6bbf1d"
EXPECTED_ANCHOR = ("2026-08", -507.0)
EXPECTED_REBASE_START = ("2026-09", -509.0)
EXPECTED_ISSUED_ENDPOINT_MB = -1547.79850375
HOLDS_RECORD_ID = "scenario-corridor-holds-2026-10-15-global-observed"


def main():
    baseline = rs.load_baseline(WORKBOOK)
    data = json.load(open(DATA))
    rec = next(r for r in data["forecast_records"]
               if r["record_id"] == EXPECTED_RECORD_ID)
    holds_rec = next(r for r in data["forecast_records"]
                     if r["record_id"] == HOLDS_RECORD_ID)

    assert rs.sha256(WORKBOOK) == EXPECTED_WORKBOOK_SHA, (
        "workbook sha256 changed — re-review the frozen inputs before re-running")
    assert rec["record_id"] == EXPECTED_RECORD_ID
    assert (rec["anchor"]["period"], float(rec["anchor"]["value_mb"])) == EXPECTED_ANCHOR, (
        "record anchor changed — issued record must not be modified")
    assert (rec["rebase_start"]["period"], float(rec["rebase_start"]["value_mb"])) == \
        EXPECTED_REBASE_START, "rebase_start changed — issued record must not be modified"
    snap_path = f"{REPO}/{rec['assumptions_ref']['path']}"
    assert rs.sha256(snap_path) == rec["assumptions_ref"]["sha256"] == EXPECTED_SNAPSHOT_SHA, (
        "assumptions snapshot no longer matches the record's frozen hash")
    assert abs(float(rec["endpoint"]["cumulative_mb"])
               - EXPECTED_ISSUED_ENDPOINT_MB) < 1e-6, (
        "stored Dec-2027 target changed — issued record must not be modified")
    assert [t["period"] for t in rec["targets"]] == MONTHS

    # Issued v2 standoff adjustments, from the record's frozen snapshot.
    snap = json.load(open(snap_path))
    standoff = next(s for s in snap["scenarios"] if s["id"] == "standoff")
    dp = {k: float(v) for k, v in standoff["production_adjustment_mb_d"].items()}
    dc = {k: float(v) for k, v in standoff["consumption_adjustment_mb_d"].items()}
    assert set(dp) >= set(MONTHS) and set(dc) >= set(MONTHS)
    assert all(dc[m] == 0.0 for m in MONTHS), (
        "v2 standoff consumption adjustment is no longer zero — "
        "re-derive the sensitivity's consumption before re-running")

    start_cum = float(rec["rebase_start"]["value_mb"])  # observed September, -509

    def rows_for(prod_adj, cons_adj):
        """Monthly rows from baseline + absolute adjustments, same
        starting convention as the issued v2 record."""
        cum = start_cum
        rows = []
        for m in MONTHS:
            b = baseline[m]
            p = b["prod"] + prod_adj[m]
            c = b["cons"] + cons_adj[m]
            d = (p - c) * b["days"]
            cum += d
            rows.append({
                "period": m,
                "baseline_prod_mb_d": b["prod"],
                "delta_p_mb_d": prod_adj[m],
                "prod_mb_d": p,
                "delta_c_mb_d": cons_adj[m],
                "cons_mb_d": c,
                "days": b["days"],
                "monthly_mb": d,
                "cumulative_mb": cum,
            })
        return rows

    # 1) Independent recomputation of the ISSUED v2 standoff path. It must
    #    match the frozen record exactly before anything else is computed.
    issued = rows_for(dp, dc)
    for row, t in zip(issued, rec["targets"]):
        assert abs(row["cumulative_mb"] - float(t["target_cumulative_mb"])) < 1e-9, (
            row["period"], row["cumulative_mb"], t["target_cumulative_mb"])
        assert abs(row["monthly_mb"] - float(t["target_monthly_mb"])) < 1e-9, row["period"]

    # 2) The sensitivity: monthly midpoint of the issued production and the
    #    baseline production; consumption identical to the issued path.
    sens_dp = {m: dp[m] / 2 for m in MONTHS}
    sens = rows_for(sens_dp, dc)

    # 3) The EIA baseline's own balance from the same starting point
    #    (reference only — the dashboard's EIA overlay uses the EIA's own
    #    starting convention, so it differs slightly from this line).
    base_cum = start_cum
    base_ref = [{"period": EXPECTED_REBASE_START[0], "cumulative_mb": start_cum}]
    for m in MONTHS:
        b = baseline[m]
        base_cum += (b["prod"] - b["cons"]) * b["days"]
        base_ref.append({"period": m, "cumulative_mb": base_cum})

    issued_end = issued[-1]["cumulative_mb"]
    sens_end = sens[-1]["cumulative_mb"]
    base_end = base_ref[-1]["cumulative_mb"]
    # The midpoint's endpoint offset is exactly half the baseline's, by
    # construction (shared starting point and consumption):
    assert abs((sens_end - issued_end) - (base_end - issued_end) / 2) < 1e-6
    holds_end = float(holds_rec["endpoint"]["cumulative_mb"])

    out = {
        "meta": {
            "title": "Illustrative partial-recovery sensitivity (v2 standoff, Oct 6 baseline)",
            "kind": ("NOT issued, NOT published. Comparison line only: for each "
                     "month, production halfway between the published v2 standoff "
                     "production and the EIA baseline production; consumption "
                     "identical to the v2 standoff; same September starting "
                     "observation. Labeled 'illustrative partial recovery' — not "
                     "'half the Gulf recovery'. Nothing in the evidence locates "
                     "the likely outcome halfway between the paths."),
            "generated_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "formula": {
                "prod": "P_sens(m) = (P_standoff(m) + P_EIA(m)) / 2 = P_EIA(m) + dP_issued(m)/2",
                "cons": "C_sens(m) = C_standoff(m) = C_EIA(m) + dC_issued(m), with dC_issued(m) = 0 for all months (asserted)",
                "balance": "balance(m) = (P_sens(m) - C_sens(m)) * days(m)",
                "cumulative": "starts at the v2 rebase_start (2026-09, -509 mb, observed); adds monthly balances, Oct 2026 .. Dec 2027",
            },
            "workbook": {"path": "research/sources/eia-steo-2026-10-06.xlsx",
                         "sha256": rs.sha256(WORKBOOK)},
            "assumptions_snapshot": {"path": rec["assumptions_ref"]["path"],
                                     "sha256": rec["assumptions_ref"]["sha256"]},
            "issued_record": {"record_id": rec["record_id"],
                              "issued": rec["issued"],
                              "endpoint_cumulative_mb": float(rec["endpoint"]["cumulative_mb"])},
            "reference_endpoints_cumulative_mb": {
                "corridor_holds_v2": holds_end,
                "eia_baseline_same_start": base_end,
            },
            "endpoint_cumulative_mb": sens_end,
            "endpoint_diff_vs_issued_standoff_mb": sens_end - issued_end,
            "endpoint_diff_vs_corridor_holds_mb": sens_end - holds_end,
            "endpoint_frames": {
                "convention_note": ("Stored cumulatives are relative to the end-Feb 2026 "
                                    "level (the site's Day 0). The dashboard chart rebases "
                                    "to the frozen Aug 2026 anchor, so displayed values "
                                    "differ from stored values by - anchor value."),
                "august_anchor_mb": float(rec["anchor"]["value_mb"]),
                "sensitivity": {"vs_end_feb_2026_level_mb": sens_end,
                                "vs_august_anchor_mb": sens_end - float(rec["anchor"]["value_mb"])},
                "issued_standoff": {"vs_end_feb_2026_level_mb": issued_end,
                                    "vs_august_anchor_mb": issued_end - float(rec["anchor"]["value_mb"])},
                "corridor_holds": {"vs_end_feb_2026_level_mb": holds_end,
                                   "vs_august_anchor_mb": holds_end - float(rec["anchor"]["value_mb"])},
                "sensitivity_dec_2026_trough_mb": next(
                    r["cumulative_mb"] for r in sens if r["period"] == "2026-12"),
                "interpretation_note": ("The sensitivity line ends 2027 still BELOW the "
                                        "end-Feb 2026 (pre-crisis) level but ABOVE the Aug "
                                        "2026 anchor: inventories rebuild during 2027 (from "
                                        "the Dec 2026 trough) without recovering to the "
                                        "pre-crisis level. Rebuilding during the forecast "
                                        "and recovering to the prewar level are different "
                                        "statements; the midpoint's position halfway "
                                        "between the endpoints is a consequence of the "
                                        "construction (identical consumption and starting "
                                        "point), not independent evidence that a half "
                                        "recovery is likely."),
            },
            "evidence_framing": {
                "bypass_note": ("The 5.8 mb/d East-West figure (Saudi energy minister, "
                                "6 Oct 2026; original wording archived in "
                                "research/logs/2026-10-06.md) is treated as a "
                                "reported operating rate as of that date, with an "
                                "unverified sustained average. Context for why a "
                                "partial-recovery comparison is worth showing — not "
                                "an input to any number in this output."),
                "momentum_note": ("September's rebound does not establish uninterrupted "
                                  "momentum (EIA Table 3c: Saudi Jul 2026 9.35 mb/d > "
                                  "Sep 2026 9.29 mb/d), and the four-country table "
                                  "excludes the UAE, Bahrain, Qatar and Oman."),
                "flat_judgment_note": ("The published v2 standoff's flat level is the "
                                       "judgment 'the recovery stops at the reported "
                                       "September level'. This line measures how much "
                                       "that judgment matters by Dec 2027: it is "
                                       "exactly half the gap between the issued path "
                                       "and the EIA baseline's own balance from the "
                                       "same starting point."),
            },
        },
        "months": MONTHS,
        "issued_standoff": issued,
        "sensitivity": sens,
        "baseline_balance_same_start": base_ref,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(out, f, indent=2)
        f.write("\n")
    print(f"wrote {OUT}")
    print(f"issued v2 standoff endpoint:  {issued_end:.1f} mb (recomputed; asserted == record)")
    print(f"sensitivity endpoint:         {sens_end:.1f} mb")
    print(f"EIA baseline (same start):    {base_end:.1f} mb")
    print(f"corridor holds endpoint:      {holds_end:.1f} mb")
    print(f"sensitivity - standoff:       {sens_end - issued_end:+.1f} mb")
    print(f"sensitivity - holds:          {sens_end - holds_end:+.1f} mb")
    print()
    print(f"{'month':9} {'P stand':>8} {'P EIA':>8} {'P sens':>8} {'C sens':>8} {'monthly':>9} {'cum sens':>10}")
    for row in sens:
        iss = next(r for r in issued if r["period"] == row["period"])
        print(f"{row['period']:9} {iss['prod_mb_d']:8.2f} {row['baseline_prod_mb_d']:8.2f} "
              f"{row['prod_mb_d']:8.2f} {row['cons_mb_d']:8.2f} "
              f"{row['monthly_mb']:9.1f} {row['cumulative_mb']:10.1f}")


if __name__ == "__main__":
    main()
