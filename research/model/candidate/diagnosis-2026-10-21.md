# Branch filter diagnosis — why the shipping evidence barely moves the display

Date: 2026-10-21 (revised after the external review at research/logs/review-model-candidate-2026-10-21.md: attribution now uses channel ablations on the full filter, not single-channel ratios). Read-only diagnosis of `branch_filter.py` (v2.4b).

Current logged inputs: transits=12, tankers=1, brent=108.79, volume=7.6, prior [0.1, 0.5, 0.4].

## 1. Volume sweep, all other inputs fixed (current model)

| volume (mb/d) | STATE holds / standoff / lapse (unrounded) | HORIZON (rounded, as displayed) |
|---|---|---|
| 7.6 | 2.998e-08 / 100.000% / 5.884e-09 | 15.0 / 50.0 / 35.0 |
| 8.0 | 3.803e-08 / 100.000% / 3.210e-09 | 15.0 / 50.0 / 35.0 |
| 9.0 | 6.565e-08 / 100.000% / 7.986e-10 | 15.0 / 50.0 / 35.0 |
| 10.0 | 1.070e-07 / 100.000% / 2.301e-10 | 15.0 / 50.0 / 35.0 |
| 11.0 | 1.665e-07 / 100.000% / 7.464e-11 | 15.0 / 50.0 / 35.0 |
| 13.0 | 3.612e-07 / 100.000% / 1.038e-11 | 15.0 / 50.0 / 35.0 |
| 15.0 | 7.013e-07 / 100.000% / 1.914e-12 | 15.0 / 50.0 / 35.0 |
| 17.3 | 1.359e-06 / 100.000% / 3.550e-13 | 15.0 / 50.0 / 35.0 |

The holds-state share rises 2.998e-08 -> 1.359e-06 (45x) across the full sweep — but the displayed HORIZON rounds to the same 15.0 / 50.0 / 35.0 at every point, and the displayed STATE is 0.0 / 100.0 / 0.0 at both ends.

## 2. Channel ablations on the full filter (at the current inputs)

Each row is the state posterior and HORIZON of the full filter with one channel removed (or with only that channel present). This is the attribution the review required: a channel's pull depends on the other channels present, so single-channel densities alone do not rank the forces.

| configuration | STATE holds / standoff / lapse (unrounded) | HORIZON |
|---|---|---|
| full filter (all four channels) | 2.998e-08 / 100.000% / 5.884e-09 | 15.0 / 50.0 / 35.0 |
| full minus Brent | 0.413% / 99.587% / 3.320e-09 | 15.2 / 49.9 / 34.9 |
| full minus transits | 1.611e-07 / 99.952% / 0.048% | 15.0 / 50.0 / 35.0 |
| full minus volume | 1.879e-07 / 99.999% / 8.066e-06 | 15.0 / 50.0 / 35.0 |
| full minus tanker losses | 4.286e-08 / 100.000% / 1.258e-08 | 15.0 / 50.0 / 35.0 |
| Brent only | 5.990e-07 / 41.458% / 58.542% | 9.1 / 26.6 / 64.3 |
| transits only | 3.586% / 96.413% / 9.418e-06 | 16.6 / 49.3 / 34.1 |
| volume only | 3.090% / 96.854% / 0.057% | 16.4 / 49.4 / 34.3 |
| tanker losses only | 9.239% / 66.042% / 24.719% | 16.7 / 38.3 / 45.0 |

Reading (rows are posteriors at prior 10/50/40): 

- Removing **Brent** is the only single removal that moves the state by orders of magnitude (holds-share 3.0e-08 -> 0.413%): the price channel is the dominant force against 'holds' in the full filter. Removing transits, volume or losses leaves the state essentially pinned (the count and volume channels jointly point at standoff at the current values, as does the prior).
- **Brent only** is the cleanest statement of the price channel's direction: by itself, at 108.79, it puts 41.5% of the state at standoff and **58.5% at LAPSE** (HORIZON 9.1/26.6/64.3). Its normalized pull is 64% lapse / 36% standoff — the only one of the four channels that pulls mostly at closure at the current data.
- **Transits only** by itself does NOT pin the state at 100% standoff: the count likelihood normalizes to ~15.7% holds / ~84.3% standoff / ~0.001% lapse (review-verified, before the prior); with the 10/50/40 prior the posterior is the table's 3.6/96.4/0.0000009. The near-pinned full-filter state is the product of the count, price, volume and loss channels together.
## 3. The Brent channel at the current price

Raw normal densities at Brent 108.79: holds 1.358e-07, standoff 1.879e-02, lapse 3.317e-02 (raw holds/standoff ratio ~138,417:1 — a density ratio, not a posterior share). The ablation table quantifies the consequence: with the price channel present the state is pinned at ~100% standoff with a 3.0e-08 holds share; without it the holds share is 0.413% — a ~1.4e7 difference, the largest single-channel effect in the filter. And the price channel's pull at this level points mostly at LAPSE (its N(108,12) density peaks at 108.79; normalized pull 64% lapse / 36% standoff): the dominant force in the posterior is a *price* observation reading 'expensive ≈ closing'. The level is contaminated as a current-state observation — it embeds freight (~half the premium per Kpler), war-risk insurance, gasoil crack tightness ($80-90) and the risk premium, not only corridor state — and its parameters (N(88,4)/N(97,9)/N(108,12)) are judgment, never fitted.

## 4. The transition matrix compresses the residual

HORIZON = STATE x the fixed judgment transition rows:

| from \ to | holds | standoff | lapse |
|---|---|---|---|
| corridor-holds | 60% | 30% | 10% |
| standoff | 15% | 50% | 35% |
| corridor-lapsed | 5% | 10% | 85% |

With the state ~100% standoff, the HORIZON is ~the standoff row (15/50/35) regardless of the tiny holds/lapse residual. A 45x change in the holds-state share (section 1) maps to <1 pt on the displayed HORIZON. The matrix is the judgment's documented table — it is the right place for *future-deterioration* risk, but it also means the display cannot reflect current-state movement smaller than ~the prior mass on the non-dominant states.

## 5. Stale and overlapping inputs

- volume 7.6 mb/d is the Oct 14 briefing's 7-day average (data to Oct 12). The same-definition successor (Oct 19 briefing, data to Oct 17) is 7.894 — the input is 9 days stale as of the Oct 21 pass. The input history is mixed-basis: 7.4 / 10.3 / 10.1 were Kpler Hormuz CRUDE throughput prints (Sep 28 – Oct 14 logs); 7.6 onward is the briefing's TOTAL-oil strait transits — the shared volume medians (15.0/8.5/2.0) were anchored on the crude series, so the total-oil input inherits a crude-anchored calibration (a known limitation of the current code too, not a candidate change).
- transits 12/day is a 3-day average of Kpler daily tanker crossings (Oct 5/6/7: 20+/7/10, the documented model window convention). The Oct 19 briefing's 7-day average is 10/day; the Oct 17 daily count is 6. Using the 7-day average (10) instead of the 3-day average (12) is a window-convention change that has not been tested separately — it is carried in the input-refresh comparison, not isolated.
- transits and volume are the same underlying quantity (corridor function) measured two ways (vessel counts vs barrels). The briefing counts 34 of 43 Oct 14-17 crossings as dark/unknown-route — those movements are INCLUDED in the count (Kpler's dark-transit methodology confirms them via satellite imagery + human intelligence against a binary standard), so 79% is a route-coverage statistic, NOT a miss rate: the count series is not an AIS-only floor. Counts and barrels can still diverge for reasons unrelated to AIS (cargo sizes, load factors, shuttle geometry), so multiplying both at weight 1.0 is a plausible double-count — but the 0.5 demotion in the candidate is a HYPOTHESIS (the Sep 21 refactor proposal's intent), not a calibrated joint likelihood.
- brent 108.79 as a *current-state* observation is contaminated (see section 3); as a *future-risk* observation it is the EIA-spread trigger that already lives in the judgment, not in the filter.

## 6. Preview: same inputs, price removed from the state filter, transits at 0.5

Not a model change — a counterfactual computed from the existing channel functions (one different weight, one channel omitted), to show the residual shipping information is not absent, only swamped. The volume input is updated to the same-definition Oct 19 print (7.894). (This is what the candidate module now implements; the module is the authoritative source.)

| volume (mb/d) | STATE (no price; transits w=0.5) | HORIZON |
|---|---|---|
| 7.894 | 1.134% / 98.866% / 6.024e-07 | 15.5 / 49.8 / 34.7 |
| 10.0 | 3.321% / 96.679% / 3.607e-08 | 16.5 / 49.3 / 34.2 |
| 15.0 | 18.373% / 81.627% / 2.533e-10 | 23.3 / 46.3 / 30.4 |
| 17.3 | 30.369% / 69.631% / 4.007e-11 | 28.7 / 43.9 / 27.4 |

The volume channel now moves the displayed HORIZON monotonically (holds up, lapse down as volume rises): the corridor-function information was present; the channel mix hid it.
