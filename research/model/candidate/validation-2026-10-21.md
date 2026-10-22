# Candidate branch filter — validation results (2026-10-21, REVISED)

Candidate = `branch_filter_candidate.py` (v3-candidate: Brent out of the state filter; transits weight 0.5). Current = `branch_filter.py` v2.4b. Revised after the external review at `research/logs/review-model-candidate-2026-10-21.md`: identical-input code comparison separated from input refresh; uniform units and exact input columns; replay reconstructed from the dated logs; no unscored accuracy claims.

## A. Identical-input code comparison (isolates the code change)

Both models, the SAME inputs, the documented prior of the date. Brent is shown for parity; the candidate does not use it as a state observation. This isolates what the candidate's two changes (Brent out of the state filter; transits weight 0.5) do at fixed data.

| inputs (identical to both models) | current HORIZON | candidate HORIZON |
|---|---|---|
| (a) currently logged (Oct 21) — transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 |
| (b) refreshed same-definition (Kpler Oct 19 briefing) — transits 10, tankers 1, volume 7.894, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.3 / 49.9 / 34.9 |
| (c) late-Sep logged (Sep 30) — transits 5, tankers 1, volume 7.4, brent 102.59, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.0 / 50.0 / 35.0 |
| (d) Sep 16 logged (documented prior of the date) — transits 4, tankers 1, corridor-flow absent, brent 108.75, prior 10/40/50 | 5.4 / 11.8 / 82.8 | 6.5 / 16.0 / 77.5 |

Reading: at the current data the code difference is +0.4 pt holds / −0.2 pt lapse on the displayed row (row a) — the candidate sits on the published row. Row (d) is the one date where the inputs put the state off the pinned row (transits 4, corridor-flow absent): there the candidate's lapse share is 5.3 pts LOWER than the current model's (77.5 vs 82.8), i.e. the channel-mix difference is visible exactly when the state is not pinned. The input-refresh effect (rows a -> b: volume 7.6 -> 7.894, transits 12 -> 10, the latter a 7-day-vs-3-day window-convention change not tested separately) moves the current model 0.0 pt and the candidate −0.1 pt on the displayed row.

### Volume-only comparator (candidate; what the count adds at 0.5)

The review asked for the count's treatment to be reassessed against a volume-only comparator. Candidate, at fixed prior 10/50/40, tankers 1:

| inputs | HORIZON | STATE holds / standoff / lapse |
|---|---|---|
| volume only, 17.3 (no count) | 37.6 / 39.9 / 22.4 | 50.2827% / 49.7173% / 8.188e-07% |
| volume + transits 12, 17.3 | 28.7 / 43.9 / 27.4 | 30.3686% / 69.6314% / 4.007e-09% |
| volume + transits 20, 17.3 | 54.4 / 32.5 / 13.1 | 87.4657% / 12.5343% / 1.154e-12% |
| volume + transits 4, 17.3 (disagreement) | 16.2 / 49.5 / 34.3 | 2.6535% / 97.3465% / 3.502e-06% |

At 17.3 mb/d the count at its demoted weight moves the STATE holds share from the volume-only 50.3% to 30.4% (12/day — the count is closer to the standoff mode λ=10), 87.5% (20/day — the holds mode) and 2.7% (4/day — sharp disagreement with the barrels). The count still has real force at 0.5; note the direction is two-sided (a count above the current value strengthens holds, a low count weakens it). Whether 0.5 is the right weight — vs volume-only, vs a joint model — is NOT calibrated on this record; it is the stated hypothesis, and the comparator is the way to check it as dated counts accumulate.

## B. Controlled single-input sweeps (identical inputs to both models)

Base: the currently logged inputs (transits 12, tankers 1, volume 7.6, Brent 108.79, prior 10/50/40); one input swept at a time in BOTH models. Uniform units: HORIZON as % to 1 dp; candidate STATE as % throughout (shares below 0.001% shown as percent in scientific notation).

| input swept | value | inputs | current HORIZON | candidate HORIZON | candidate STATE holds/standoff/lapse |
|---|---|---|---|---|---|
| volume (mb/d) | 7.6 | transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| volume (mb/d) | 10.0 | transits 12, tankers 1, volume 10.0, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 16.5 / 49.3 / 34.2 | 3.3207% / 96.6793% / 3.607e-06% |
| volume (mb/d) | 13.0 | transits 12, tankers 1, volume 13.0, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 19.7 / 47.9 / 32.4 | 10.3888% / 89.6112% / 1.508e-07% |
| volume (mb/d) | 17.3 | transits 12, tankers 1, volume 17.3, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 28.7 / 43.9 / 27.4 | 30.3686% / 69.6314% / 4.007e-09% |
| transits (/day) | 4 | transits 4, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 49.9 / 35.1 | 15.0 / 50.0 / 35.0 | 0.0601% / 99.8804% / 0.0596% |
| transits (/day) | 6 | transits 6, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.1 / 50.0 / 35.0 | 0.1201% / 99.8680% / 0.0119% |
| transits (/day) | 10 | transits 10, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.2 / 49.9 / 34.9 | 0.4788% / 99.5207% / 4.747e-04% |
| transits (/day) | 12 | transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| transits (/day) | 14 | transits 14, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.8 / 49.6 / 34.5 | 1.8881% / 98.1119% / 1.872e-05% |
| transits (/day) | 20 | transits 20, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 21.0 / 47.3 / 31.7 | 13.3415% / 86.6585% / 1.323e-07% |
| tanker losses | 0 | transits 12, tankers 0, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 16.2 / 49.5 / 34.4 | 2.5675% / 97.4325% / 5.692e-05% |
| tanker losses | 1 | transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| tanker losses | 3 | transits 12, tankers 3, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.1 / 50.0 / 35.0 | 0.1281% / 99.8716% / 2.541e-04% |
| tanker losses | 5 | transits 12, tankers 5, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.0 / 50.0 / 35.0 | 0.0171% / 99.9822% / 6.783e-04% |
| tanker losses | 8 | transits 12, tankers 8, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.0 / 50.0 / 35.0 | 8.328e-04% / 99.9962% / 0.0030% |
| Brent ($) | 90.0 | transits 12, tankers 1, volume 7.6, brent 90.0, prior 10/50/40 | 15.5 / 49.8 / 34.7 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| Brent ($) | 108.79 | transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| Brent ($) | 125.0 | transits 12, tankers 1, volume 7.6, brent 125.0, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |
| Brent ($) | 150.0 | transits 12, tankers 1, volume 7.6, brent 150.0, prior 10/50/40 | 15.0 / 50.0 / 35.0 | 15.4 / 49.8 / 34.8 | 0.9530% / 99.0469% / 9.449e-05% |

Reading: in the current model the shipping-input sweeps leave the displayed row within 15.0/49.9/35.1 of the pinned 15.0/50.0/35.0 (the state stays pinned — see the diagnosis); only the Brent sweep moves it visibly (15.5/49.8/34.7 at 90) — a price input, not a shipping one. In the candidate the volume sweep moves the displayed row monotonically (holds 15.4 -> 28.7, lapse 34.8 -> 27.4 over 7.6 -> 17.3); the transit sweep moves it monotonically too, visibly at 20/day (21.0 holds); the tanker-loss sweep moves the lapse share non-decreasingly (34.4 -> 35.0 on the displayed row; the STATE lapse share is monotone over 0 -> 8: 5.7e-07 -> 3.0e-05); the Brent sweep does nothing (by design — price is context only).

## C. Required scenarios (candidate)

| scenario | inputs | candidate HORIZON | candidate STATE holds/standoff/lapse |
|---|---|---|---|
| (1) high exports, ongoing attacks (2 confirmed losses) | transits 12, tankers 2, volume 17.3, brent n/a, prior 10/50/40 | 21.2 / 47.3 / 31.6 | 13.7376% / 86.2624% / 8.107e-09% |
| (1') same, zero confirmed losses | transits 12, tankers 0, volume 17.3, brent n/a, prior 10/50/40 | 39.5 / 39.1 / 21.4 | 54.4295% / 45.5705% / 1.606e-09% |
| (2) high exports, weak products | not enterable — see note | — | — |
| (3) recovery via bypass, Hormuz restricted (strait measure stays 7.894) | transits 10, tankers 1, volume 7.894, brent n/a, prior 10/50/40 | 15.3 / 49.9 / 34.9 | 0.5704% / 99.4293% / 3.029e-04% |
| (4) confirmed throughput collapse (0.5 mb/d) | transits 2, tankers 2, volume 0.5, brent n/a, prior 10/50/40 | 5.0 / 10.0 / 85.0 | 8.204e-20% / 2.255e-10% / 100.0000% |
| (4') confirmed closure (0) | transits 2, tankers 3, volume 0.0, brent n/a, prior 10/50/40 | 5.0 / 10.0 / 85.0 | 0.000e+00% / 0.000e+00% / 100.0000% |
| (5) high price at recovered throughput (Brent 150) | transits 12, tankers 1, volume 17.3, brent 150.0, prior 10/50/40 | 28.7 / 43.9 / 27.4 | 30.3686% / 69.6314% / 4.007e-09% |
| (6) preliminary floor revises 1.5x higher (7.894 -> 11.84) — ILLUSTRATIVE | transits 10, tankers 1, volume 11.84, brent n/a, prior 10/50/40 | 16.6 / 49.3 / 34.1 | 3.6220% / 96.3780% / 2.445e-06% |
| (7) low crossing counts (4/day) at 17.3 mb/d | transits 4, tankers 1, volume 17.3, brent n/a, prior 10/50/40 | 16.2 / 49.5 / 34.3 | 2.6535% / 97.3465% / 3.502e-06% |
| (7') consistent counts (14/day) at 17.3 mb/d | transits 14, tankers 1, volume 17.3, brent n/a, prior 10/50/40 | 36.0 / 40.7 / 23.4 | 46.5888% / 53.4112% / 6.148e-10% |

Notes: (2) — a crude/product SPLIT is not in any same-definition series yet (the DPA 82%/44% print is crude-only vs products-only, relative, against wire-reported baselines); 'weak products' cannot be entered without a new measure — flagged as a missing input, not modeled. (3) — by design the state is about the CORRIDOR (the strait), so bypass recovery (regional exports up, strait down) does not move the state; its impact is delegated to the storage-path sensitivity (illustrative, not adopted — see the deliverable). (5) — price is context only; a future-risk reading of a $150 price is the judgment's EIA-spread trigger, not a filter channel. (6) — the briefing's '1.5-2x' statement is a historical observation about how preliminary tiers settle; it is used here to ILLUSTRATE a revision size, not to validate the current measurement or forecast its revision. (7)/(7') — low counts at high barrels can reflect cargo sizes, load factors and shuttle geometry as well as AIS coverage (the briefing's count INCLUDES satellite/HUMINT-confirmed dark crossings; 79% dark is a route-coverage statistic, not a miss rate); the pair is a disagreement between two measures of the corridor, and the demoted count channel registers it.

## D. Chronological replay, reconstructed from the dated logs

Supersedes the earlier draft's replay, whose Sep 16 inputs (transits 17, volume 10.14) and Sep 9 volume (7.56) are not present in the record and are withdrawn. Every observation below is the one the dated log recorded; the 'current' column is the DOCUMENTED HORIZON published that date (model version then in use); the candidate column is a re-run of the single candidate version at those same logged observations. Persistence = the previous row's documented HORIZON. The volume inputs before Oct 15 are Kpler Hormuz CRUDE throughput prints (7.4/10.3/10.1); 7.6/7.894 are the briefing's TOTAL-oil strait transits — mixed basis, a known limitation of the shared volume medians.

| date | prior | logged observations | documented HORIZON (version) | candidate re-run | persistence | published judgment |
|---|---|---|---|---|---|---|
| 2026-09-09 | 15/50/35 | transits 10, tankers 10, brent 100.71, prior 15/50/35 | 14.9 / 49.8 / 35.3 (v1, no volume channel) | 11.8 / 37.2 / 51.0 | — | 10/50/40 |
| 2026-09-16 | 10/40/50 | transits 4, tankers 1, corridor-flow absent, brent 108.75, prior 10/40/50 | 5.4 / 11.8 / 82.8 (v2.x; documented run reproduced exactly by the v2.4b re-run) | 6.5 / 16.0 / 77.5 | 14.9 / 49.8 / 35.3 | 10/40/50 |
| 2026-09-23 | 10/40/50 | transits 5, tankers 1, corridor-flow degraded, brent 99.25, prior 10/40/50 | 14.3 / 47.4 / 38.3 (v2.x; documented) | 14.0 / 45.6 / 40.4 | 5.4 / 11.8 / 82.8 | 10/40/50 |
| 2026-09-30 | 10/50/40 | transits 5, tankers 1, volume 7.4, brent 102.59, prior 10/50/40 | 14.4 / 47.6 / 38.0 (v2.3 threshold-volume channel; a v2.4b re-run at the same inputs is pinned at 15/50/35 — the documented and re-run rows differ because the code changed after Sep 30) | 15.0 / 50.0 / 35.0 | 14.3 / 47.4 / 38.3 | 10/50/40 |
| 2026-10-07 | 10/50/40 | transits 5, tankers 1, volume 10.3, brent 100.58, prior 10/50/40 | 15.0 / 50.0 / 35.0 (v2.4b; documented, re-run reproduces exactly) | 15.2 / 49.9 / 34.9 | 14.4 / 47.6 / 38.0 | 10/50/40 |
| 2026-10-14 | 10/50/40 | transits 12, tankers 1, volume 10.1, brent 105.69, prior 10/50/40 | 15.0 / 50.0 / 35.0 (v2.4b; documented, re-run reproduces exactly) | 16.6 / 49.3 / 34.1 | 15.0 / 50.0 / 35.0 | 10/50/40 |
| 2026-10-21 | 10/50/40 | transits 12, tankers 1, volume 7.6, brent 108.79, prior 10/50/40 | 15.0 / 50.0 / 35.0 (v2.4b; documented this morning, re-run reproduces exactly) | 15.4 / 49.8 / 34.8 | 15.0 / 50.0 / 35.0 | 10/50/40 |

Oct 21, refreshed same-definition inputs (NOT the documented run — shown separately, per the review): current 15.0/50.0/35.0; candidate 15.3/49.9/34.9 (transits 10 = the 7-day average, a window-convention change vs the model's 3-day-average 12).

### What the data did next (log-sourced; divergence, not scores)

| date | documented data that arrived after |
|---|---|
| 2026-09-09 | transits fell (Sep 10: 7, zero crude; Sep 14: 7; Sep 15: 4; 10-day avg 18); Brent settled 108.75 (Sep 16) |
| 2026-09-16 | pre-committed >=7/day check FAILED (window Sep 23-30: 14, 9, -, 5, 0); 1 confirmed tanker loss (La Stephanie, Sep 21); Brent settled 99.25 (Sep 23) |
| 2026-09-23 | check continued to fail (5, 0); Kpler volume print 7.4 (7-day crude); Brent close 102.59 (Sep 30) |
| 2026-09-30 | transits 5 (Kpler Oct 1-3 counts unpublished); volume 10.3 (Kpler 7-day, as of Oct 3, published Oct 6); Brent settled 100.58 (Oct 6) |
| 2026-10-07 | transits 12 (3-day avg Oct 5-7: 20+/7/10); volume 10.1 (Kpler Oct 6 print); GFS Pride sank (Oct 14; a second vessel loss, not a tanker-loss input); Brent settled 105.69 (Oct 13) |
| 2026-10-14 | volume basis switch 10.1 -> 7.6 (Oct 14 briefing, data to Oct 12, total-oil strait transits); Bukha + Al Faw tanker hits (Oct 20-21, crews safe, no confirmed losses); Brent settled 108.79 (Oct 20) |
| 2026-10-21 | UNRESOLVED — the Nov 15 'corridor lapses' binary is the scoring target |

### Source notes per row

- **2026-09-09** (v1, no volume channel): log §9: 'prior 15/50/35 + (transits 10/d, 10 losses, Brent $100.71) -> horizon 14.9/49.8/35.3'. The 10-loss input is the 10 Iranian shadow tankers destroyed by the US that week (the documented loss input of that era), ingested through the same loss channel in both models; the candidate's channel mix responds differently — a code-version/input-convention artifact, not a scored difference.
- **2026-09-16** (v2.x; documented run reproduced exactly by the v2.4b re-run): log :143: '--transits 4 --tankers 1 --brent 108.75 --corridor-flow absent -> HORIZON 5.4/11.8/82.8'. No volume print documented at the date (the volume channel was introduced Sep 28).
- **2026-09-23** (v2.x; documented): log :80-83: 'Sep 20/21/22 — tankers 1 [La Stephanie, Sep 21], Brent settled 99.25, corridor-flow degraded: HORIZON 14.3/47.4/38.3'. No volume print at the date; the manual 'degraded' label is the documented missing-input case.
- **2026-09-30** (v2.3 threshold-volume channel; a v2.4b re-run at the same inputs is pinned at 15/50/35 — the documented and re-run rows differ because the code changed after Sep 30): log :105-109: transits 5 (last published daily counts 9/5/0), tankers 1, volume 7.4 (Kpler 7-day crude print), Brent 102.59 (Sep 30 close) -> 'HORIZON 14.4/47.6/38.0'.
- **2026-10-07** (v2.4b; documented, re-run reproduces exactly): log :69-72: '--transits 5 --tankers 1 --brent 100.58 --volume 10.3 -> HORIZON 15.0/50.0/35.0' (transits 5: Kpler's Oct 1-3 daily counts still unpublished).
- **2026-10-14** (v2.4b; documented, re-run reproduces exactly): log :49-52: 'HORIZON 15.0/50.0/35.0 (STATE 0/100/0) — FLAT, identical inputs (transits 12, tanker loss 1, Brent 105.69, volume 10.1)'.
- **2026-10-21** (v2.4b; documented this morning, re-run reproduces exactly): log ~07:20 entry: 'transits 12, tankers 1, volume 7.6, brent 108.79 -> HORIZON 15/50/35 — FLAT'.

**Validation caveat (stated plainly):** the record is 6-7 weeks and the scoring target (the Nov 15 'corridor lapses' binary) is unresolved, so NO scored accuracy comparison is possible here, and none is made. What the corrected replay shows: (i) the current model WAS responsive to the logged inputs — its documented Sep 16 run was 5.4/11.8/82.8 at transits 4 / corridor-flow absent — the earlier draft's 'flat at 15/50/35 across all seven weeks' characterization was an artifact of inputs that could not be sourced from the record and is withdrawn; (ii) at the documented observations the candidate re-runs track the same documented moves (77.5% lapse Sep 16; 40.4% lapse Sep 23; on the published row at the current data); (iii) where the two models differ is a channel-mix difference visible on the unpinned rows (Sep 16: candidate 5.3 pts lower lapse than the current model), not a scored accuracy difference. The first scored discrimination point is the Nov 15 resolution plus the Kpler prints in between.

