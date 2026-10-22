#!/usr/bin/env python3
"""Generate the CANDIDATE recovery-path assumptions for the world-stocks
storage model (2026-10-21). CANDIDATE ONLY: this file is NOT referenced by
any issued scenario record, is not in site/src/data (the dashboard path),
and is never scored. It frames the forward production question the
shipping evidence now raises about the issued v2 standoff path with
illustrative scenario endpoints.

What the evidence says (see the deliverable, section on the storage-path
connection):
  - the issued v2 standoff path (2026-10-15) holds WORLD production flat at
    the September reported level (101.30 mb/d) through 2026: "no net Gulf
    recovery".
  - the same-definition Kpler regional measure has recovered from -28%
    (Oct 14 edition, 16,894 kbd 7-day avg) to -19% (Oct 19 edition, 19,041
    kbd) vs its ~23,306 baseline, with the bypass (East-West pipeline) at
    ~5.8 mbd and Fujairah/Oman +34% / Red Sea +54% above baseline.
  - a later syndicated print (Bloomberg, Oct 20) puts total Middle East
    oil flows at 24.0M b/d for the week e/Oct 18 — ABOVE the prewar 23.3M —
    but with no definition/window: unreconciled, flagged, not applied.
  - all Kpler figures are preliminary floors that typically settle 1.5-2x
    higher.

So the honest deliverable is a set of ILLUSTRATIVE SCENARIO ENDPOINTS, not
a new central path and not an interval:
  (a) endpoint A = the issued v2 standoff (no net Gulf recovery) — unchanged;
  (b) endpoint B = the month-by-month MIDPOINT between the two issued
                world-production levels (standoff and EIA baseline), at
                identical consumption — a point on the existing sensitivity
                line, NOT a measured "half-rate Gulf recovery" (there is no
                Gulf/non-Gulf decomposition here);
  (c) endpoint C = the EIA baseline itself (the corridor-holds adjustment
                of 0).
The endpoints are scenarios (two of them references to issued paths), not
physical bounds, and no supported interval for the eventual outcome is
asserted. No barrels-exported-to-world-production conversion is invented.
The artifact carries an ILLUSTRATIVE condition that would argue for
re-examining the storage path; it is not an automatic promotion — any new
scenario version requires an explicit, dated, human decision recorded in
the log.

Write: research/model/candidate/recovery-path-2026-10-21-candidate.json
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
ISSUED = os.path.join(REPO, "site", "src", "data",
                      "world-stocks-assumptions-v2026-10-15.json")
OUT = os.path.join(HERE, "candidate", "recovery-path-2026-10-21-candidate.json")


def main():
    issued = json.load(open(ISSUED))
    sc = {s["id"]: s for s in issued["scenarios"]}
    standoff = sc["standoff"]["production_adjustment_mb_d"]
    months = sorted(standoff.keys())

    # (b) mid path: standoff + 0.5 * (baseline - standoff) = standoff/2,
    # because the corridor-holds (baseline) adjustment is 0 across the
    # horizon in v2.
    mid = {m: round(standoff[m] / 2.0, 4) for m in months}

    doc = {
        "version": "v2026-10-21-candidate",
        "status": "CANDIDATE — not issued, not scored, not referenced by any "
                  "scenario record, not in the dashboard path. The issued v2 "
                  "records (2026-10-15) are untouched.",
        "issued": None,
        "drafted_at": "2026-10-21 (morning pass, post-external-review)",
        "description": "Illustrative scenario endpoints for the forward "
                       "production question the shipping evidence raises "
                       "about the issued v2 standoff path ('no net Gulf "
                       "recovery', world production flat at the September "
                       "reported 101.30 mb/d through 2026). The same-"
                       "definition Kpler regional measure recovered from -28% "
                       "(Oct 14 edition) to -19% (Oct 19 edition, 19,041 kbd "
                       "7-day avg vs ~23,306 baseline) with the East-West "
                       "bypass at ~5.8 mbd; a syndicated print (Bloomberg, "
                       "Oct 20) claims total Middle East oil flows of 24.0M "
                       "b/d for week e/Oct 18 — above the prewar 23.3M — but "
                       "is unreconciled (no definition/window). The "
                       "endpoints: (a) A = issued v2 standoff (unchanged); "
                       "(b) B = the month-by-month midpoint between the two "
                       "issued world-production levels at identical "
                       "consumption (monthly gap halved — a point on the "
                       "existing sensitivity line, NOT a measured Gulf "
                       "recovery rate and NOT a barrels-exported-to-"
                       "production conversion); (c) C = the EIA baseline (v2 "
                       "corridor-holds, adjustment 0). The endpoints are "
                       "scenarios, not physical bounds: no supported "
                       "interval for the eventual outcome is asserted.",
        "baseline_ref": {
            "path": "site/src/data/world-stocks-assumptions-v2026-10-15.json",
            "note": "same frozen EIA STEO Oct 6 baseline, frozen August "
                    "anchor (-507), rebase_start (2026-09, -509) as the "
                    "issued v2 record — referenced, not copied or modified"
        },
        "evidence": [
            {"measure": "Kpler regional 7-day avg (Total Hormuz Clearance [= strait + GoO STS] + Fujairah/Oman loadings + Red Sea)",
             "value": "19,041 kbd (Oct 19 edition, data to Oct 17)",
             "baseline": "~23,306 kbd (Mar 2025 - Feb 2026 avg)",
             "vintage": "preliminary (last-7-day tier); the briefing's own caveat: preliminary figures have typically settled 1.5-2x higher — recorded as Kpler's statement, NOT assumed here",
             "trend": "up from 16,894 kbd (-28%) in the Oct 14 edition"},
            {"measure": "Kpler strait transits 7-day avg (same definition as the model's volume input)",
             "value": "7,894 kbd (Oct 19 edition)", "baseline": "17,267 kbd",
             "vintage": "preliminary floor"},
            {"measure": "East-West pipeline (Petroline)",
             "value": "~5.8 mbd (Oct 12, industry sources via Kpler)",
             "note": "42 mb west-coast loadings Sep 17 - Oct 4; Saudi plans 7 -> 10 mbd, up to 3 years (outside horizon); Houthi strikes on Saudi sites keep the Red Sea leg exposed (Oct 16 Yanbu-directed missile interception)"},
            {"measure": "Fujairah/Oman terminal loadings 7-day avg",
             "value": "4,563 kbd (+34% vs baseline 3,416)"},
            {"measure": "Red Sea volumes 7-day avg",
             "value": "4,304 kbd (+54% vs baseline 2,803); preliminary (unconfirmed load terminals)"},
            {"measure": "Total Middle East oil flows (syndicated, UNRECONCILED)",
             "value": "24.0M b/d week e/Oct 18 — ABOVE prewar 23.3M (Bloomberg via Indian Opinion, Oct 20)",
             "note": "no definition/window printed; if confirmed on a comparable basis it would sit at or above endpoint C of this illustration; NOT applied"},
            {"measure": "Asian crude imports H1 October",
             "value": "26 mbd, within 1% of pre-war (Kpler Oct 19 — earlier cargoes arriving, a lag measure)"}
        ],
        "scenarios": [
            {
                "id": "standoff-endpoint",
                "name": "No net Gulf recovery (issued v2 standoff — endpoint A)",
                "definition": "The issued v2 standoff path, unchanged: world production flat at the September reported level through 2026, non-Gulf growth only across 2027.",
                "production_adjustment_mb_d": standoff,
                "consumption_adjustment_mb_d": {m: 0.0 for m in months},
                "status": "reference to the issued v2 standoff (site/src/data/world-stocks-assumptions-v2026-10-15.json) — not modified"
            },
            {
                "id": "world-production-midpoint-illustration",
                "name": "Month-by-month midpoint between the two issued world-production levels (endpoint B — ILLUSTRATION)",
                "definition": "The month-by-month midpoint between the two issued world-production levels (standoff and EIA baseline), at identical consumption: monthly production adjustment = half the issued standoff adjustment (the corridor-holds adjustment is 0, so this is the midpoint of the monthly gap). This is a point on the existing sensitivity line — a midpoint of TWO WORLD PRODUCTION LEVELS, not a measured 'half-rate Gulf recovery'; there is no Gulf/non-Gulf decomposition here, and shipment recovery does not identify world production, inventories, domestic use or a 2027 recovery rate.",
                "production_adjustment_mb_d": mid,
                "consumption_adjustment_mb_d": {m: 0.0 for m in months},
                "assumptions": [
                    "(illustrative, stated not calibrated) the Kpler regional 7-day avg holds at or above 19 mb/d in the next two briefings (the -19% reading does not deteriorate)",
                    "(illustrative, stated not calibrated) the East-West bypass holds at or above ~5.8 mbd (no new confirmed damage; the Red Sea leg not closed)",
                    "(illustrative, stated not calibrated) no confirmed production damage at Ghawar/Abqaiq/Shedgum or the Eastern Province complex",
                    "no assumption is made about where the preliminary prints will settle: the briefing's 'typically settled 1.5-2x' is Kpler's statement about the Kpler series, recorded as provenance and NOT used to position this midpoint"
                ],
                "uncertainty": "An illustration, not an interval: the three endpoints are scenarios (two of them references to issued paths), not physical bounds, and no supported interval for the eventual outcome is asserted. The shipping evidence is directional only — regional recovery (-28% -> -19%) and the bypass flows argue against 'no net recovery', while the strait measure (-54%) and the attack rate (18 vessels in 2 weeks) argue against 'full recovery' — and exports are not world production (consumption, stock draws and on-water effects sit in between)."
            },
            {
                "id": "eia-baseline-endpoint",
                "name": "Full EIA baseline recovery (endpoint C)",
                "definition": "The EIA STEO Oct 6 baseline itself (the v2 corridor-holds path, adjustment 0).",
                "production_adjustment_mb_d": {m: 0.0 for m in months},
                "consumption_adjustment_mb_d": {m: 0.0 for m in months},
                "status": "reference to the issued v2 corridor-holds path — not modified"
            }
        ],
        "illustrative_reexamination_condition": {
            "status": "ILLUSTRATION, not an automatic promotion: this artifact does not promote the issued v2 path on its own, and no code or condition issues a new forecast from it.",
            "condition": "(illustrative) two consecutive Kpler briefings with the regional 7-day avg at or above 19 mb/d (data dates at least 7 days apart) AND a comparable-basis confirmation of the 'total Middle East flows at/above prewar' print (definition + window printed).",
            "if_met": "It would argue for re-examining the storage path. Issuing a new dated scenario version (regen-scenarios.py --emit-records) requires an explicit, dated human decision logged in the pass log — the v2026-10-15 records stay frozen and authoritative until then, and the published dashboard is unchanged meanwhile.",
            "moot_condition": "Confirmed production damage at a named Gulf field/terminal makes the corridor-holds premise of the EIA baseline itself questionable, so endpoint C (and this illustration built on it) is no longer a sensible reference: the issued v2 standoff path stands as published, and the question becomes the damage itself (the damage would be assessed on its own merits — it does not by itself restore any prior fixed production level)."
        },
        "missing_inputs": [
            "the definition/window of the 24.0M 'above prewar' syndicated print (unreconciled)",
            "a same-definition regional series at the current vintage (the Kpler briefing is the only full-basis print; wire prints are relative)",
            "the crude/product split on the same basis (the DPA 82%/44% print is crude-only vs products-only, relative)",
            "bypass sustainability beyond the single 5.8 mbd point (one industry-source date; the Red Sea leg is exposed to Houthi strikes)"
        ]
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(doc, f, indent=2)
    print(f"[written] {OUT}")
    print("\nMid-path monthly production adjustments (mb/d vs the EIA baseline):")
    for m in months:
        print(f"  {m}: standoff {standoff[m]:8.4f}  ->  mid {mid[m]:8.4f}")


if __name__ == "__main__":
    main()
