# Beta odds spec evaluation — 2026-10-21

Filed with the beta forecast build (research/beta-forecast-v3-2026-10-21.md,
section 2). Identical-input comparisons only; the published model, the
published odds and the issued paths are untouched. Inputs: refreshed
(transits 10 / tankers 1 / volume 7.894, Kpler data to Oct 17) and the
identical old pair (transits 12 / volume 7.6).

## A. Counts+volume vs volume-only (identical inputs)

### refreshed inputs (transits 10, vol 7.894, data to Oct 17)

| configuration | STATE (holds/standoff/lapse) | HORIZON |
|---|---|---|
| volume only (w_t=0) | 2.6  97.4  0.0 | 16.2  49.5  34.4 |
| counts+volume, w_t=0.5 (BETA SPEC) | 0.6  99.4  0.0 | 15.3  49.9  34.9 |
| counts+volume, w_t=1.0 (v2.4b channel mix, brent removed) | 0.1  99.9  0.0 | 15.1  50.0  35.0 |
| published v2.4b (with brent 108.79) [reference] | 0.0  100.0  0.0 | 15.0  50.0  35.0 |

### identical old inputs (transits 12, vol 7.6)

| configuration | STATE (holds/standoff/lapse) | HORIZON |
|---|---|---|
| volume only (w_t=0) | 2.2  97.8  0.0 | 16.0  49.6  34.5 |
| counts+volume, w_t=0.5 (BETA SPEC) | 1.0  99.0  0.0 | 15.4  49.8  34.8 |
| counts+volume, w_t=1.0 (v2.4b channel mix, brent removed) | 0.4  99.6  0.0 | 15.2  49.9  34.9 |
| published v2.4b (with brent 108.79) [reference] | 0.0  100.0  0.0 | 15.0  50.0  35.0 |

Read: at the CURRENT inputs all four configurations land in the same
regime (standoff-dominated STATE, 15/50/35-class HORIZON) — the
configuration choice does not change today's answer. It changes the
REGIME-CHANGE answer: volume-only cannot see a count collapse (a
routing/shuttle shift that moves barrels but not crossings), and
w_t=1.0 double-counts the same corridor quantity twice (the documented
hypothesis behind the 0.5 demotion). The count keeps cross-check force:
it can still DISAGREE with the barrels (section B, vol 15 / t 10).

## B. Transits-count weight sensitivity (w_t sweep)

HORIZON per configuration. The four (transits, volume) points span
the current regime (10, 7.894), a partial recovery (12, 12.0) and
(15, 15.0), and the pre-war volume with pre-war counts (20, 17.267)
— the last two are the operating points the Oct 21 recheck flagged
as count-dependent.

| (transits, vol) | w_t=0 (volume only) | w_t=0.25 | w_t=0.5 (BETA) | w_t=0.75 | w_t=1.0 |
|---|---|---|---|---|---|
| (10, 7.894) | 16.2  49.5  34.4 | 15.5  49.8  34.7 | 15.3  49.9  34.9 | 15.1  49.9  34.9 | 15.1  50.0  35.0 |
| (12, 12.0) | 22.0  46.9  31.1 | 19.9  47.8  32.3 | 18.3  48.5  33.1 | 17.2  49.0  33.8 | 16.5  49.3  34.2 |
| (15, 15.0) | 30.4  43.1  26.4 | 31.5  42.7  25.9 | 32.5  42.2  25.3 | 33.6  41.7  24.7 | 34.7  41.3  24.1 |
| (20, 17.267) | 37.5  40.0  22.5 | 47.6  35.5  16.9 | 54.3  32.5  13.2 | 57.7  31.0  11.3 | 59.1  30.4  10.5 |

Read: the HORIZON response to recovering barrels is STEEPER at w_t=0
(counts cannot drag) and FLATTER at w_t=1.0 (the stale count keeps
pulling standoff). w_t=0.5 sits between, by construction — it is the
documented hypothesis, not a calibrated optimum; the sweep shows the
choice matters (at vol 17.267 / t 20 the holds share spans 54.3% at
w_t=0.5 vs 62.2% at w_t=0 and 30.4% at t 10), so the parameter is
load-bearing and must be revisited as dated counts accumulate (first
clean test: November 2026 prints).

## C. Crude-anchored volume medians vs the total-oil input

The volume medians (15.0 / 8.5 / 2.0) are anchored on Kpler
crude-labeled observations; the current input is a TOTAL-OIL
strait measure (pre-war 17.267). Effect at pre-war total-oil
volume, varying the count (w_t=0.5, the beta spec):

| transits | volume 15.0 (median) | volume 17.267 (pre-war total oil) |
|---|---|---|
| 10 | 10.1  89.9  0.0 / 19.6  48.0  32.5 | 17.8  82.2  0.0 / 23.0  46.4  30.6 |
| 20 | 78.3  21.7  0.0 / 50.2  34.3  15.4 | 87.4  12.6  0.0 / 54.3  32.5  13.2 |

Read: at the pre-war count (t=20) the total-oil volume is already
holds-dominant in the STATE posterior; at the CURRENT count (t=10) the
count drags the HORIZON back toward standoff (23.0% holds) even at
full pre-war volume — the barrels-vs-counts tension the recheck
flagged. The median anchor mismatch (15.0 vs 17.267) shifts the holds/
standoff dominance boundary but does not change any regime call in
this range; it is carried as a documented uncalibrated parameter
(refitting the medians to a same-definition total-oil series is a
November recheck item, not a beta change).

## D. Price's role (the brent channel at 108.79)

Normalized brent-channel contribution at 108.79 (before prior): holds 0.0% / standoff 36.2% / lapse 63.8%.

Role in the beta: price is NOT a current-state observation (the
candidate's removal stands — at 108.79 the channel puts 64.1% of its
pull on LAPSE while throughput is at 45.7% of pre-war, the exact
contamination the Oct 21 review flagged: freight, insurance and the
risk premium are price, not corridor state). It keeps its two
documented roles — the draw-rate band (elasticity, reference
calculation only) and the judgment's EIA-spread future-risk trigger —
i.e. it is FUTURE-RISK CONTEXT. A high price with recovered throughput
therefore moves the beta odds only through the throughput channels
(section B of the chain tests), never through the price channel.

## E. Dated replay (identical to candidate_validation section D)

Every observation is the one the dated log recorded at that date.
`doc` is the HORIZON the log records as published (the model
version as it then existed); `beta spec` re-runs the selected spec
at those same logged observations. No scored accuracy comparison
(6-7 week record; the Nov 15 binary is unresolved).

| date | inputs | published (documented) | beta spec (re-run) | note |
|---|---|---|---|---|
| 2026-09-09 | transits 10, tankers 10, brent 100.71 | 14.9/49.8/35.3 | 11.8/37.2/51.0 | v1, no volume channel |
| 2026-09-16 | transits 4, tankers 1, brent 108.75, corridor_flow absent | 5.4/11.8/82.8 | 6.5/16.0/77.5 | v2.x; documented run reproduced exactly by the v2.4b re-run |
| 2026-09-23 | transits 5, tankers 1, brent 99.25, corridor_flow degraded | 14.3/47.4/38.3 | 14.0/45.6/40.4 | v2.x; documented |
| 2026-09-30 | transits 5, tankers 1, brent 102.59, volume 7.4 | 14.4/47.6/38.0 | 15.0/50.0/35.0 | v2.3 threshold-volume channel; a v2.4b re-run at the same inputs is pinned at 15/50/35 — the documented and re-run rows differ because the code changed after Sep 30 |
| 2026-10-07 | transits 5, tankers 1, brent 100.58, volume 10.3 | 15.0/50.0/35.0 | 15.2/49.9/34.9 | v2.4b; documented, re-run reproduces exactly |
| 2026-10-14 | transits 12, tankers 1, brent 105.69, volume 10.1 | 15.0/50.0/35.0 | 16.6/49.3/34.1 | v2.4b; documented, re-run reproduces exactly |
| 2026-10-21 | transits 12, tankers 1, brent 108.79, volume 7.6 | 15.0/50.0/35.0 | 15.4/49.8/34.8 | v2.4b; documented this morning, re-run reproduces exactly |

The replay confirms the spec tracks the documented history (the
Sep 30 row is a v2.3-vs-v2.4b version difference, recorded in
the source table) and responds where the evidence moved.

## Selected beta odds spec (v3)

The beta odds spec IS the reviewed candidate filter, unchanged:

- prior 0.10 / 0.50 / 0.40 (the published judgment; the beta changes
  the POSTERIOR, never the prior)
- volume channel: lognormal location family, medians 15.0 / 8.5 / 2.0,
  shared sigma 0.35, weight 1.0, vol==0 closure limit — the structural
  channel (Kpler strait transits, total oil, freshest same-definition
  print; staleness reported via --volume-date)
- transits channel: Poisson (20 / 10 / 2), weight 0.5 — a HYPOTHESIS
  (the barrels-and-counts are one quantity measured two ways); the
  sweep in section B shows the weight is load-bearing and the first
  dated recheck is the November prints
- tankers channel: Poisson (0.2 / 1.5 / 4.0), weight 0.5 — confirmed
  tanker LOSSES in window (danger/loss, coexists with high exports)
- brent: NOT a state observation (section D); future-risk context only
- state->horizon: the documented judgment transition table
  (holds 60/30/10, standoff 15/50/35, lapse 5/10/85) — future-
  deterioration risk lives there, applied ONCE (no time-varying
  re-transition in the storage weighting — that would double-count)

Uncalibrated parameters (documented, not hidden): the 0.5 transits
weight; the crude-anchored volume medians vs the total-oil input;
the Poisson lambdas (judgment, never fitted); the transition table
(judgment). Greater responsiveness of this spec is NOT claimed as
greater accuracy.

