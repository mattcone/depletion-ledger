# Model refactor proposal: condition the branch filter on throughput (MMB/d), not ship counts

**Status:** PROPOSAL — not adopted. Filter and judgment unchanged.
**Filed:** Sep 21, 2026 (evening pass, after the transit-revision flip). See
`logs/2026-09-21.md` (shipping-data entry) for the full evidence record.
**Decision gate:** do not implement before the Sep 23 WPSR + the week of
Sep 23–30 transit counts (the pre-committed review point). The published
judgment (10/35/55) and its reversion clauses are NOT touched by this refactor
— it is filter-side only.

---

## 1. Problem: the transit-count signal is a high-variance, biased proxy

The state filter's main flow signal is `--transits`, a Poisson likelihood with
branch means holds=20 / standoff=10 / lapse=2 (v2.2: 3-day average of verified
Kpler counts). Two properties surfaced on Sep 21:

**Steep sensitivity.** Same inputs as the Sep 21 run, only the count varied:

| Transits/day | Holds | Standoff | Lapse |
|---|---|---|---|
| 4 | 5.9 | 13.6 | **80.5** |
| 5 | 8.3 | 23.1 | 68.6 |
| 6 | 12.1 | 38.4 | 49.5 |
| 7 | 14.2 | 47.0 | **38.8** |
| 8 | 14.8 | 49.4 | 35.8 |
| 10 | 15.0 | 50.0 | 35.0 |

A 45-point lapse range across the 4–10 band; the steep ridge (4→7, ~42 pts) is
exactly where real data lands. A ±1-vessel difference at current levels is
worth ~10 pts of HORIZON. Cause: at 5–7 transits/day the observation sits
almost exactly between the standoff (λ=10) and lapse (λ=2) Poisson
distributions, so each vessel is near-decisive.

**Noisy, revised, dark-fleet-biased input.** Counts are provisional, arrive
low and revise up (Sep 14: 4→7, Sep 15: 4→12, Sep 16: 3→6; weekend cut
12/35 → final 17/37 on the same story). They measure only the AIS-visible
floor while the dark fleet carries most of the volume (UKMTO's ~3:1
reported-vs-AIS ratio; Windward's ~72h satellite gap over the lanes on Sep
20–21). The model currently treats ±2-vessel counting noise as regime signal:
on Sep 21 the filter's lapse weight moved 68.6 → 38.8 in one evening purely
on a count revision.

**The datasets cannot agree on ships, but they agree on barrels.**
- Ship counts: Kpler 4–10/day visible vs Windward 12–14 (AIS+satellite) vs the
  US official claim of 40 ships/day — a 10× spread.
- Barrel estimates: Kpler week of Sep 13 = 42M bbl (≈ 6.0 MMB/d crude);
  Vortexa = Saudi Gulf loadings 3.7 MMB/d since Sep 12; JPM = 2.9 MMB/d Saudi
  slice over six days; TankerTrackers = 14M bbl on seven VLCCs Sunday. All
  within ~50% of each other.

The official "40 ships/day, ~14M b/d" claim also fails a volume test: 40
ships × 2M bbl (VLCC) = 80M b/d, four× the strait's pre-war total; to carry
14M b/d the average ship would be ~350k bbl — product-ship size, implausible
for a crude-dominated flow. Throughput data adjudicates disputes that ship
counts cannot.

## 2. Proposal: add a throughput signal (`--mmbd`), demote counts to cross-check

**New observation:** strait throughput in MMB/d (crude + products), best
available proxy = **Gulf export-terminal loadings** (Ras Tanura/Juaymah +
Basra + Kuwait + UAE), since the ends of the strait are observable by
satellite berth-level while the middle is where the dark fleet hides.

**Likelihood:** Normal per state (candidate values, to be calibrated in §5):

| State | Mean (MMB/d) | SD | Rationale |
|---|---|---|---|
| holds | 18 | 2 | near pre-war total (~20–21 MMB/d oil through Hormuz) |
| standoff | 9 | 3 | current observed regime: ~6 MMB/d crude (42M-bbl week) + products |
| lapse | 2.5 | 1.5 | strait effectively closed; residual dark trickle only |

**Weights:** throughput 1.0 (primary flow signal); transits demoted 1.0 →
0.5 (floor + cross-check, still logged in the record); tankers 0.5, brent
1.0, corridor-flow 1.0 unchanged.

**Data sources (in priority order):**
1. Kpler transit *volumes* (weekly, via Reuters — "22 tankers, 42M bbl, week
   of Sep 13" format). Most direct strait-throughput number.
2. Vortexa / TankerTrackers terminal loadings (near-daily, Saudi + Iraq
   slices; add the two slices + a fixed share assumption for the rest).
3. JPM / bank notes quoting satellite flow averages (secondary).
Cadence consequence: the signal updates weekly-to-near-daily, not daily.
That is acceptable — the v2.2 3-day window was chasing daily data that
arrives provisionally and gets revised; a weekly volume number that is
stable is a better input than a daily number that moves.

**Record discipline:** every filter run logs both the MMB/d input (with
source + as-of date) and the transit count (with the same caveats as today).
The log line format extends, e.g.:
`--prior 0.10,0.35,0.55 --mmbd 6.0 (Kpler wk/13, crude) --transits 7 --tankers 1 --brent 100.34 --corridor-flow absent`

## 3. Alternatives considered

- **(a) Widen the transit window 3→7 days.** Reduces noise, adds lag; the
  revision pattern means day-7 data is still stale (counts keep arriving low
  then revising up). Does not fix the dark-fleet bias at all.
- **(b) Over-dispersed count likelihood (negative binomial).** Dampens the
  noise, not the bias — a systematically undercounted floor still pins the
  filter lapse-leaning.
- **(c) Dataset-averaging (Kpler/Windward/official with reliability
  weights).** Requires specifying inter-dataset reliability we do not have;
  over-engineered for a three-state filter.
- **(d) Status quo + logged gap.** The Sep 21 flip is exactly the failure
  mode this leaves unaddressed.

Throughput is preferred because it changes the *variable* to one that is
(a) dark-fleet-aware by construction (cargo must load and land somewhere),
(b) agreed on across sources within ~50%, and (c) able to adjudicate
official claims (the 40-ships/day test in §1).

## 4. Test plan

1. **Unit tests:** extend `model/test_model.py` (currently 14 tests, green)
   — Normal likelihood sanity, weight demotion, backward compatibility
   (`--mmbd` optional; runs without it must be bit-identical to v2.2).
2. **Sensitivity target:** a ±20% throughput wobble around the current
   observation (e.g. 6.0 → 7.2 MMB/d crude) must move the lapse weight by
   ≤5 pts — versus ~10 pts for ±1 vessel today. Steepness is allowed at the
   regime boundaries (holds↔standoff, standoff↔lapse), not in the middle.
3. **Backtest on the Sep 12–21 record:**
   - August: Saudi ~0.7 MMB/d (JPM) → strait total est. 4–5 MMB/d.
   - Week of Sep 13: 42M bbl ≈ 6.0 MMB/d crude.
   - Sep 20–21: seven VLCCs Sunday (14M bbl) + Vortexa 3.7 MMB/d Saudi Gulf
     loadings → total est. 6–8 MMB/d.
   Check: week-over-week HORIZON moves on data noise alone stay ≤10 pts, and
   the Sep 21 flip (lapse 68.6 → 38.8) does not reproduce — the count
   revision should move the filter a few points, not 30.
4. **Reproduction of the current call:** with the Sep 21 inputs the new
   filter should land in the same neighborhood as judgment (lapse 40–55),
   i.e. it refines the current reading rather than contradicting it.

## 5. Calibration (to be done at adoption, with the Sep 23–30 data in hand)

- Fit the three branch means/SDs against: pre-war ~20–21 MMB/d; August dark
  floor (Saudi 0.7 MMB/d slice; strait total est.); the week-of-Sep-13
  observation; and the current Vortexa/TankerTrackers loading run-rate.
- The standoff mean is the one that matters most (we are presumably in it):
  anchor it to the *volume-implied* ship count (42M bbl/wk ≈ 3 VLCC-equiv/day
  of crude → ~5–15 ships total), which cross-checks against the Kpler visible
  floor (4–10/day) — the two agreeing is the sanity test for the whole
  refactor.
- Do not re-tune until the AIS-dark question is resolved by a week of
  counts (same standing caution as the v2.2 note in `branch_filter.py`).

## 6. Risks / downsides

- Weekly cadence: slower response to a sudden closure than the daily counts.
  Mitigation: the corridor-flow structural signal (v2.0) and the tanker-loss
  signal still respond daily; a sudden closure is also a regime event for the
  judgment's clauses, which this refactor does not touch.
- Loadings ≠ throughput exactly: some Gulf-loaded cargo is domestic/STS
  (the Sohar STS volume is loaded at Ras Tanura but "exits" off Oman);
  destination-side discharges lag. The signal is an estimate with a stated
  as-of date — the same epistemic status as today's counts, just a better
  anchor.
- Model complexity: one more documented table. Acceptable — the framework's
  value is that the judgment lives in documented tables.

## 7. Adoption procedure (per the model's own rules)

1. Wait for the decision gate (Sep 23 WPSR + week of counts).
2. Update `MODEL-internal.md` FIRST (spec of record): new signal table,
   weights, calibration, and the demoted-transits note.
3. Implement in `branch_filter.py` + `test_model.py`; run the test suite;
   run the backtest in §4.
4. Log the adoption in the daily log with the calibrated parameters and the
   before/after HORIZON on the same inputs.
5. If the Sep 23–30 counts hold ≥7/day, handle the pre-committed judgment
   review (possible 10/35/55 → 10/40/50) as a SEPARATE decision — the filter
   refactor and the judgment reweight must not be bundled.
