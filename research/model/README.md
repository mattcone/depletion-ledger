# model/ — scripts for the oil depletion model

Three small, stdlib-only Python 3 scripts (plus a regression test file) that
formalize the hand math in `../MODEL.md`. They compute; the research log
records. Outputs get pasted into `../logs/<date>.md` and the model files —
the log stays the audit trail.

Built Sep 9, 2026 (Day 193), per the literature survey in
`../logs/2026-09-09_literature.md` (adoption items #1–#3).

## draw_rate.py — price-triggered SPR draw rate + runway table

Replaces the flat 0.45M b/d assumption. Step function calibrated on the two
WPSR regimes actually observed (pre-escalation ~0.44M; early-war ~0.81M).

```
python3 draw_rate.py --brent 100.71 --spr 286.6 --spr-date 2026-08-28 \
                     --asof 2026-09-09 --padd1-days 12        # current regime
python3 draw_rate.py --brent 110 --spr 286.6 --spr-date 2026-08-28 --lapse
```

**v2.1 (Sep 16): `--reported-pace`.** The band-pace runway is a *scenario*
(DOE drawing with the price), not a forecast — since Sep the reported DOE pace
has run at ~1/12 of the band. Pass the actual weekly pace (M b/d, e.g.
`--reported-pace 0.058`) to print a second runway table at the reported pace.
The spread between the tables is the size of DOE's discretion — the number to
quote when discussing floor dates (see research/logs/2026-09-16.md).

**Sep 9 output:** 0.70M b/d band ($100–120) → 250M floor in ~40 days (~Oct 19),
180M in ~140 days (~Jan 27). Lapse pace (1.35M) → 250M in ~15 days (~Sep 24).

## elasticity.py — elasticity-driven demand destruction

Replaces the contested static agency figures (IEA −1.6 / EIA −1.2 / OPEC +0.58)
with a band from literature short-run elasticities (ε = 0.05/0.10/0.15).
Reports a LEVEL view (vs pre-war base) and a MARGINAL view (per +$5/week) —
**use the marginal view in the weekly log.**

```
python3 elasticity.py --price 100.71 --base 70 --last-week-price 97.13
```

**Sep 9 output (v1.0, linear form — historical):** level band −2.25 to
−6.75 mb/d; marginal per +$5: −0.26 to −0.79 mb/d.

**Formula change (v2.0, Sep 11):** LEVEL now uses the standard log-difference
form −D0·ε·ln(P/P0) — the linear first-order form overstates by ~20% at the
current +44% move. Re-run of the Sep 9 example: level band −1.86 to −5.59
mb/d; marginal unchanged (small step, linear is exact to first order). The
v1.0 numbers above stay as the dated record; logs after Sep 11 carry the
v2.0 values.

## branch_filter.py — Bayesian branch reweighting + calibration ledger

`update`: state filter over {holds, standoff, lapsed} (weekly transit count,
shipping losses, Brent) → posterior state → transition matrix → **horizon**
branch weights. Use the horizon row in MODEL.md/SUMMARY.

```
python3 branch_filter.py update --prior 0.15,0.50,0.35 \
        --transits 10 --tankers 10 --brent 100.71
```

**v2.2 (Sep 16): transit input is now the 3-day average of verified daily
counts** (rounded), not a single day — single days get revised after the fact
(Sep 14: 4 → 7). KNOWN LIMITATION (quantified Sep 16): the Poisson likelihoods
(λ=2/10/20) act as a hard classifier at small counts — feeding 4 vs 6
transits swings the 60-day lapse weight by ~25 pts (82.8 → 58.3 on identical
other inputs). The window choice is a declared convention, not a fit; the
AIS-dark question (UKMTO ~3:1 reported-vs-observed; UAE ships dark per Axios,
Sep 16) means the counts may systematically undercount. Do not re-tune λ until
the AIS-dark question resolves.

**Sep 9 output:** state ≈ 0 / 99.4 / 0.6 → horizon **14.9 / 49.8 / 35.3**,
vs the published judgment of 10 / 50 / 40. The gap was the documented v1
limitation (see below); keep both numbers in the research log — the judgment
carries the trend, the filter carries the data.

**Structural signal (v2.0, Sep 11):** `--corridor-flow {functioning,degraded,
absent}` — a documented judgment likelihood that encodes *contested, not
closed*, so a single bad transit week can't swing the lapse weight alone
(v1 underweighted lapse on Sep 9, overweighted it by Sep 10 — same gap,
opposite sign). Worked example, the logged Sep 10 inputs (prior 10/50/40,
transits 7/d, 10 losses, Brent 108.03):

```
python3 branch_filter.py update --prior 0.10,0.50,0.40 --transits 7 \
        --tankers 10 --brent 108.03 --corridor-flow degraded
```

v1 (no signal): horizon **8.5 / 23.9 / 67.6** — 28 pts more lapse-leaning
than judgment. v2.0 (`degraded`): **12.1 / 38.5 / 49.3** — the lapse gap
narrows to 9 pts and standoff approaches judgment. The judgment still governs
publication; the signal makes the filter's disagreement auditable instead of
invisible.

`score` also reports a **base-rate comparator** (Brier of always predicting
the settled items' base rate) next to the running score — a bare Brier number
says nothing until it's compared to something.

Calibration ledger (`calibration.csv`, same directory):

```
python3 branch_filter.py add "Hormuz normal by Sep 30" 0.038 2026-09-30
python3 branch_filter.py resolve 2026-09-30 0 --match "Hormuz"
python3 branch_filter.py score                     # running Brier + open items
```

**`resolve` requires `--match` when several predictions share a settle date**
(v2.1, Sep 16). The Sep 30 settlement has three DIFFERENT predictions (Hormuz
normal, ceasefire, Russia diesel ban) with likely different outcomes; the
command refuses to stamp one outcome onto all of them. Match on a unique
substring of the description.

**A `--match` that hits SEVERAL rows is also refused by default** (Sep 16
fix): a substring like `"Sep 30"` appears in all three Sep 30 descriptions —
different events sharing text, not one event with two predictions. The
command lists the matched rows and stops. Pass `--force` to resolve every
matched row with the same outcome — legitimate only for several predictions
of the SAME event (e.g. the Nov 15 filter row and the judgment row):
`resolve 2026-11-15 1 --match "Corridor lapses" --force`.

Seeded Sep 9 with 4 items (3 Polymarket lines + our Russia diesel-ban
estimate); first settlement is Sep 30. After ~10 resolved items the Brier
score tells us if our priors are overconfident — the one number that says
whether the model is improving.

## Calibrating the scripts themselves (v2.0 → v2.1)

Every constant is a documented judgment, not a measurement:
- draw-rate band thresholds & rates — recalibrate each time WPSR shows a new
  (price regime, actual draw) pair.
- elasticity ε band — revisit when EIA publishes updated elasticities.
- filter Poisson/Normal parameters — fit to the accumulated weekly data once
  we have ~8 weeks of logged (transits, losses, brent, branch) tuples.
- corridor-flow likelihood vectors — recalibrate when the structural
  assessment changes or the Brier ledger says a branch was systematically
  mis-weighted.
- transition matrix — the judgment table; review when a horizon prediction
  settles (Brier ledger) or a regime event reopens the question.
- v2.1 inputs: news-frequency escalation index (GPR method), STEO revision
  direction — the remaining trend signals the state filter lacks.
  Also (log-level check, not a filter input): measured-vs-implied destruction —
  compare the EIA world-consumption YoY gap to the elasticity LEVEL band each
  monthly print. Above the band → physical loss materializing (lapse lean);
  far below → stockpiles/substitution absorbing (standoff support). Sep 11:
  Jul −3.6 → Aug −0.8 YoY vs implied −2.2…−6.7 → standoff-leaning.
  (Implemented Sep 11: log-difference elasticity, the corridor-flow
  structural signal, base-rate Brier comparator, log-space Poisson, matrix
  validation, input guards.)

## Tests

`python3 test_model.py` (stdlib `unittest`) — 14 tests pinning the documented
Sep 9/Sep 10 worked examples, the band boundaries, and the v2.0 fixes. Run it
after any edit to the scripts; a changed published number fails loudly
instead of drifting into the logs.
