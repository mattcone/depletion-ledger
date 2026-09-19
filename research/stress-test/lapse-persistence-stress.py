#!/usr/bin/env python3
"""Corridor-lapses persistence stress test (offline; writes only its own output).

Extends the published corridor-lapses path (v2026-09-17, which ends at its
stated 2027-02 validity horizon) through December 2027 under three
production-persistence variants, crossed with two consumption regimes.

These are ACCUMULATED-DEFICIT STRESS TESTS, not feasible inventory forecasts:
they answer "how large does the accumulated deficit get if these FLOWS
continue?" They do not assert that an indefinitely sustained withdrawal is
physically achievable (accessible starting inventory is unknown; the issued
record's feasibility note already flags the ~1,544 mb through Feb 2027).

Guarantees:
  - Reads the frozen workbook through the SAME loader as the published
    pipeline (regen-scenarios.load_baseline), at full workbook precision.
  - The common stem uses the ISSUED record's stored anchor and stored
    targets verbatim (scenario-corridor-lapses-2026-09-17-global-observed).
    The issued record and all published artifacts are NOT modified.
  - Writes exactly two files, identical content, this script is the only
    writer of both (the site copy exists because Vite cannot import from
    outside site/): research/stress-test/lapse-persistence-results.json
    (canonical) and site/src/data/lapse-stress.json (site import copy).
    Run: python3 research/stress-test/lapse-persistence-stress.py

Variant definitions (extension months 2027-03 .. 2027-12):

  P1  Fixed adjustment      keep the Feb-2027 production adjustment (-13.5 mb/d)
                            against the recovering EIA baseline. Scenario
                            production therefore RECOVERS with the baseline;
                            total shut-in falls from ~16.2 to 13.5 mb/d as the
                            baseline heals. A "permanent partial loss" world,
                            not a sustained closure.
  P2  Fixed total disruption keep the assumed TOTAL shut-in constant at
                            16.217 mb/d = 13.5 (scenario incremental) + 2.717
                            (EIA's published 1Q27 average baseline shut-in).
                            The monthly adjustment is DERIVED:
                            deltaP_m = baseline_shutin_m - 16.217, so it
                            deepens to -16.217 once the baseline shut-in is 0.
                            LABEL: 16.217 is an ASSUMPTION derived from a
                            quarter average, not a measured Feb-2027
                            disruption. Production formula: reference
                            production = EIA baseline production (STEO Table
                            3a, EIA's central outlook incl. its own disruption
                            and recovery assumptions) + assumed baseline
                            shut-in; scenario production = reference - 16.217.
                            So the implied cut from EIA production is 13.5
                            while the assumed shut-in is 2.717 (Mar-Jun 2027
                            under the primary schedule) and 16.217 once it is
                            0 (from Jul 2027).
  P3  Fixed production      scenario production held flat at its Feb-2027
                            level (baseline P Feb 2027 - 13.5). As the
                            baseline recovers, the implied incremental
                            shut-in deepens past 13.5; scenario production
                            falls further behind EIA's own production path
                            each month.

Baseline shut-in beyond 1Q27 (STRESS-TEST ASSUMPTIONS, labeled in the
output): EIA publishes no shut-in volumes past 1Q27 (2,717 kb/d average);
its narrative says most shut-in production "will be largely restored in
2H27". The public narrative does NOT specify this monthly schedule, and does
not establish a flat 2Q or a July-1 restoration. For this test the PRIMARY
schedule (a simplification, not source-derived) holds 2.717 through June
2027 and zeroes it from July 2027; the SENSITIVITY (p2_aprilzero_*) moves
the assumed restoration to April 2027, increasing the accumulated deficit by
~247 mb (2.717 mb/d x 91 days) — more than the C0/C1 consumption gap. Both
schedules are test choices; only the 1Q27 average is source-derived.

NOTE ON THE BASELINE: the EIA STEO baseline is NOT a no-war counterfactual.
It is EIA's central outlook, which already includes EIA's own assumptions
about the disruption and its recovery (stated assumptions:
https://www.eia.gov/outlooks/steo/). The scenario adjustments here are
incremental relative to EIA's schedule.

Consumption regimes (applied identically to all three variants):

  C0  Fixed adjustment      the published convention extended: demand stays
                            5 mb/d BELOW the EIA baseline, so actual
                            consumption recovers with the baseline.
  C1  Fixed actual demand   actual consumption held flat at its Feb-2027
                            level (baseline C Feb 2027 - 5 = 99.66). NOTE THE
                            CROSSING: C1 is NOT uniformly lower or higher
                            demand than C0. The EIA baseline's own
                            consumption dips below its Feb-2027 level (104.66)
                            in Mar-May 2027 (103.48/104.36/104.52), so C0
                            demand (baseline - 5: 98.48/99.36/99.52) sits
                            BELOW C1's fixed 99.66 — at identical production,
                            C1's HIGHER consumption gives it the LARGER
                            deficits in Mar-May. From June the baseline is
                            above the Feb level (106.12) and C0 demand
                            (101.12) exceeds C1's, so C0 has the larger
                            deficits from June on. NET over the extension, C0
                            adds 188.8 mb MORE to the accumulated deficit,
                            by construction (the cumulative
                            baseline-consumption recovery above the Feb-2027
                            level; identical across all production variants).

Monthly change convention (identical to the published pipeline):
    monthly_mb = (scenario_P - scenario_C) * calendar_days
Cumulatives start from the issued record's stored Feb-2027 target.
"""
import importlib.util
import json
import os
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/mcone/depletion-ledger"
WORKBOOK = f"{REPO}/research/sources/eia-steo-2026-09-17.xlsx"
DATA = f"{REPO}/site/src/data/world-stocks.json"
OUTS = [f"{HERE}/lapse-persistence-results.json",
        f"{REPO}/site/src/data/lapse-stress.json"]

# --- reuse the published pipeline's baseline loader (exact same workbook read)
spec = importlib.util.spec_from_file_location(
    "regen_scenarios", f"{REPO}/research/scoring/regen-scenarios.py")
rs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rs)

EXT_MONTHS = [f"2027-{m:02d}" for m in range(3, 13)]  # 2027-03 .. 2027-12

# Drift guards (added after the 2026-09-18 review): fail loudly if the frozen
# inputs this test hardcodes against have changed.
EXPECTED_WORKBOOK_SHA = "c06a15243b0d972045ecc59cf9376885f68c7c306c581de5d01e6b8ac1a236c5"
EXPECTED_RECORD_ID = "scenario-corridor-lapses-2026-09-17-global-observed"
EXPECTED_FEB_2027_TARGET_MB = -2050.5414468099993

# Frozen, documented inputs (see module docstring for provenance and labels)
ADJ_P_FEB = -13.5          # published Feb-2027 production adjustment (mb/d)
ADJ_C_FEB = -5.0           # published Jan-Feb-2027 consumption adjustment (mb/d)
BASE_SHUTIN_1Q27 = 2.717   # EIA STEO Table 1, 1Q27 average (kb/d 2,717 -> mb/d)
TOTAL_DISRUPTION = ADJ_P_FEB * -1 + BASE_SHUTIN_1Q27  # 16.217 mb/d assumed total
# PRIMARY: shut-in holds through 2Q27, restored during 2H27 (EIA narrative)
BASE_SHUTIN = {"2027-03": BASE_SHUTIN_1Q27, "2027-04": BASE_SHUTIN_1Q27,
               "2027-05": BASE_SHUTIN_1Q27, "2027-06": BASE_SHUTIN_1Q27}
# SENSITIVITY: the more aggressive zeroing from April 2027
BASE_SHUTIN_APRIL_ZERO = {"2027-03": BASE_SHUTIN_1Q27}  # 0.0 from 2027-04


def main():
    baseline = rs.load_baseline(WORKBOOK)
    data = json.load(open(DATA))
    rec = next(r for r in data["forecast_records"]
               if r["record_id"] == "scenario-corridor-lapses-2026-09-17-global-observed")
    anchor = rec["anchor"]
    targets = {t["period"]: t for t in rec["targets"]}
    feb = targets["2027-02"]
    start_cum = float(feb["target_cumulative_mb"])

    # Drift guards: the hardcoded inputs above must match the frozen sources.
    assert rs.sha256(WORKBOOK) == EXPECTED_WORKBOOK_SHA, (
        "workbook sha256 changed — re-review the frozen inputs before re-running")
    assert rec["record_id"] == EXPECTED_RECORD_ID
    assert abs(start_cum - EXPECTED_FEB_2027_TARGET_MB) < 1e-6, (
        "stored Feb-2027 target changed — issued record must not be modified")
    snap_path = f"{REPO}/{rec['assumptions_ref']['path']}"
    assert rs.sha256(snap_path) == rec["assumptions_ref"]["sha256"], (
        "assumptions snapshot no longer matches the record's frozen hash")

    # Common stem: issued anchor + stored targets, verbatim.
    stem = [{"period": anchor["period"], "cumulative_mb": float(anchor["value_mb"])}]
    for t in rec["targets"]:
        stem.append({"period": t["period"],
                     "cumulative_mb": float(t["target_cumulative_mb"])})
    assert [s["period"] for s in stem] == ["2026-08"] + sorted(targets)

    feb_b = baseline["2027-02"]
    scen_p_feb = feb_b["prod"] + ADJ_P_FEB   # P3 reference level
    scen_c_feb = feb_b["cons"] + ADJ_C_FEB   # C1 reference level

    def run(dp_fn, dc_fn, shutin):
        cum = start_cum
        months = []
        for m in EXT_MONTHS:
            b = baseline[m]
            p = b["prod"] + dp_fn(m, b)
            c = b["cons"] + dc_fn(m, b)
            d = (p - c) * b["days"]
            cum += d
            months.append({
                "period": m,
                "scenario_prod_mb_d": p, "scenario_cons_mb_d": c,
                "delta_p_mb_d": dp_fn(m, b), "delta_c_mb_d": dc_fn(m, b),
                "baseline_shutin_mb_d": shutin.get(m, 0.0),
                "monthly_mb": d, "cumulative_mb": cum,
            })
        return months

    # P2's monthly adjustment is DERIVED: baseline_shutin_m - total_disruption
    # (see docstring), so scenario shut-in stays at the assumed 16.217 mb/d.
    dc_c0 = lambda m, b: ADJ_C_FEB
    dc_c1 = lambda m, b: scen_c_feb - b["cons"]
    variants = {
        "p1_fixed_adjustment_c0": run(lambda m, b: ADJ_P_FEB, dc_c0, BASE_SHUTIN),
        "p1_fixed_adjustment_c1": run(lambda m, b: ADJ_P_FEB, dc_c1, BASE_SHUTIN),
        "p2_fixed_total_disruption_c0": run(
            lambda m, b: BASE_SHUTIN.get(m, 0.0) - TOTAL_DISRUPTION, dc_c0, BASE_SHUTIN),
        "p2_fixed_total_disruption_c1": run(
            lambda m, b: BASE_SHUTIN.get(m, 0.0) - TOTAL_DISRUPTION, dc_c1, BASE_SHUTIN),
        "p3_fixed_production_c0": run(lambda m, b: scen_p_feb - b["prod"], dc_c0, BASE_SHUTIN),
        "p3_fixed_production_c1": run(lambda m, b: scen_p_feb - b["prod"], dc_c1, BASE_SHUTIN),
        # Sensitivity: P2 with the baseline shut-in zeroed from April 2027
        "p2_aprilzero_c0": run(
            lambda m, b: BASE_SHUTIN_APRIL_ZERO.get(m, 0.0) - TOTAL_DISRUPTION,
            dc_c0, BASE_SHUTIN_APRIL_ZERO),
        "p2_aprilzero_c1": run(
            lambda m, b: BASE_SHUTIN_APRIL_ZERO.get(m, 0.0) - TOTAL_DISRUPTION,
            dc_c1, BASE_SHUTIN_APRIL_ZERO),
    }

    # Baseline reference: EIA's own balance from the same starting cumulative.
    cum = start_cum
    base_ref = []
    for m in EXT_MONTHS:
        b = baseline[m]
        d = (b["prod"] - b["cons"]) * b["days"]
        cum += d
        base_ref.append({"period": m, "monthly_mb": d, "cumulative_mb": cum})

    names = {
        "p1_fixed_adjustment_c0": "Fixed adjustment (demand -5 vs baseline)",
        "p2_fixed_total_disruption_c0": "Fixed total disruption ~16.2 mb/d (demand -5 vs baseline)",
        "p3_fixed_production_c0": "Fixed production at Feb-2027 level (demand -5 vs baseline)",
        "p1_fixed_adjustment_c1": "Fixed adjustment (demand fixed at Feb level)",
        "p2_fixed_total_disruption_c1": "Fixed total disruption ~16.2 mb/d (demand fixed at Feb level)",
        "p3_fixed_production_c1": "Fixed production at Feb-2027 level (demand fixed at Feb level)",
        "p2_aprilzero_c0": "Sensitivity: P2, baseline shut-in zeroed from Apr 2027 (demand -5 vs baseline)",
        "p2_aprilzero_c1": "Sensitivity: P2, baseline shut-in zeroed from Apr 2027 (demand fixed at Feb level)",
    }

    out = {
        "meta": {
            "title": "Corridor-lapses persistence stress test",
            "kind": "accumulated-deficit stress test — NOT a feasible inventory forecast",
            "generated_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "workbook": {"path": "research/sources/eia-steo-2026-09-17.xlsx",
                         "sha256": rs.sha256(WORKBOOK)},
            "assumptions_snapshot": {"path": rec["assumptions_ref"]["path"],
                                     "sha256": rec["assumptions_ref"]["sha256"]},
            "record_id": rec["record_id"],
            "anchor": {"period": anchor["period"], "value_mb": float(anchor["value_mb"])},
            "extension_start": {"period": "2027-02", "cumulative_mb": start_cum,
                                "source": "issued record's stored Feb-2027 target"},
            "extension_months": EXT_MONTHS,
            "total_disruption_assumption_mb_d": TOTAL_DISRUPTION,
            "total_disruption_label": ("Assumed total shut-in 16.217 mb/d = 13.5 (scenario "
                                       "incremental) + 2.717 (EIA 1Q27 average baseline "
                                       "shut-in). Derived from a quarter average — not a "
                                       "measured Feb-2027 disruption. Production formula: "
                                       "reference = EIA baseline production (STEO Table 3a, "
                                       "EIA central outlook) + assumed baseline shut-in; "
                                       "scenario = reference - 16.217 (i.e. EIA production "
                                       "minus 13.5 Mar-Jun 2027 and minus 16.217 from Jul "
                                       "2027 under the primary schedule)."),
            "baseline_shutin_label": ("EIA publishes no shut-in volumes past 1Q27; narrative: "
                                      "most shut-in 'largely restored in 2H27'. The public "
                                      "narrative does not specify this monthly schedule. For "
                                      "this test (simplification, not source-derived): 2.717 "
                                      "through June 2027, 0.0 from July 2027. SENSITIVITY "
                                      "(p2_aprilzero_*): assumed restoration moved to April "
                                      "2027 — endpoints ~247 mb BELOW the primary (a larger "
                                      "accumulated deficit), more than the C0/C1 gap."),
            "baseline_is_central_outlook": ("The EIA STEO baseline is NOT a no-war "
                                             "counterfactual: it is EIA's central outlook, "
                                             "which already includes EIA's own disruption and "
                                             "recovery assumptions. Stated assumptions: "
                                             "https://www.eia.gov/outlooks/steo/"),
            "names": names,
            "variant_definitions": {
                "p1": "Fixed adjustment: Feb-2027 production adjustment (-13.5 mb/d) retained "
                      "against the recovering EIA baseline; scenario production recovers with "
                      "the baseline (total shut-in falls from ~16.2 to 13.5).",
                "p2": "Fixed total disruption: assumed total shut-in held at 16.217 mb/d. "
                      "Scenario production = (EIA baseline production + assumed baseline "
                      "shut-in) - 16.217, i.e. EIA production minus 13.5 while the assumed "
                      "shut-in is 2.717 and minus 16.217 once it is 0. Primary schedule: "
                      "shut-in 2.717 through June 2027, 0 from July (a test simplification; "
                      "the EIA narrative does not specify the monthly schedule). Sensitivity "
                      "p2_aprilzero_*: assumed restoration moved to April 2027 — endpoints "
                      "~247 mb BELOW the primary (a larger accumulated deficit).",
                "p3": "Fixed production: scenario production held at its Feb-2027 level "
                      "(baseline P Feb 2027 - 13.5); implied incremental shut-in deepens as "
                      "the baseline recovers.",
                "c0": "Fixed adjustment: demand stays 5 mb/d below the recovering EIA "
                      "baseline (published convention extended).",
                "c1": "Fixed actual demand: consumption held at its Feb-2027 level "
                      "(baseline C Feb 2027 - 5). C1 is NOT uniformly lower demand than C0: "
                      "the baseline dips below its Feb level in Mar-May 2027, so C0 demand "
                      "is LOWER then and C1 (higher consumption) has the LARGER deficits in "
                      "Mar-May; from June C0 demand exceeds C1 and C0 has the larger "
                      "deficits. Net over the extension C0 adds 188.8 mb more to the "
                      "accumulated deficit — the cumulative baseline-consumption recovery "
                      "above the Feb level.",
            },
        },
        "stem": stem,
        "variants": {k: v for k, v in variants.items()},
        "baseline_ref": base_ref,
        "endpoints_dec_2027": {k: v[-1]["cumulative_mb"] for k, v in variants.items()}
        | {"baseline_ref": base_ref[-1]["cumulative_mb"],
           "published_feb_2027": start_cum},
    }
    payload = json.dumps(out, indent=1)
    for path in OUTS:
        with open(path, "w") as f:
            f.write(payload)

    # Console summary
    for path in OUTS:
        print(f"Wrote {path}")
    print()
    print(f"Stem end (published, Feb 2027): {start_cum:+,.1f} mb")
    for k, v in out["endpoints_dec_2027"].items():
        print(f"Dec 2027  {k:34s} {v:+,.1f} mb")
    print(f"\nFeb-2027 references: scenario P = {scen_p_feb:.4f} mb/d, "
          f"scenario C = {scen_c_feb:.4f} mb/d")
    print(f"Baseline P Feb-27 = {feb_b['prod']:.4f}, C = {feb_b['cons']:.4f}")
    print(f"Baseline Dec-27: P = {baseline['2027-12']['prod']:.4f}, "
          f"C = {baseline['2027-12']['cons']:.4f}")


if __name__ == "__main__":
    main()
