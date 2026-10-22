# Shipping input source framework — Strait of Hormuz measures

Maintained across daily passes so the six measures are never conflated.
Each measure gets its own row family: observation date, publication date,
window, coverage/scope, baseline, vintage (preliminary/provisional/
reported), and what (if anything) the model consumes from it.

Filed 2026-10-21 (model-candidate pass). Supersedes nothing; the Oct 14
briefing provenance (kpler-briefing-2026-10-14/provenance.json) and the Oct
19 edition provenance (kpler-briefing-2026-10-19/provenance.json) are the
primary-source records.

## The six measures (keep separate)

### 1. Strait transits — cargo volume (the model's `--volume` input)

Kpler "Strait of Hormuz transits": confirmed floor of oil volumes (Crude/Co,
CPP, DPP, Chem/Bio; excludes NGLs/LNG) transiting the strait,
**Iranian-origin excluded**, dated by transit. 7-day average + daily; T-2
publication; preliminary tier = last 7 days, typically settles 1.5-2x higher.

| obs (data to) | published | 7-day avg | baseline (Mar 25-Feb 26 avg) | vs baseline |
|---|---|---|---|---|
| 2026-10-12 | Oct 14 briefing | 7,627 kbd | 17,145 kbd | −56% |
| 2026-10-17 | Oct 19 briefing | 7,894 kbd (Oct 17 daily 7,363) | 17,267 kbd | −54% (45.7% of baseline) |

Wire echoes: ENB (Oct 20) "transits ~7.9M b/d vs 17.3M pre-war" = the Oct 19
edition. **The model input is the 7,627 print (7.6, data to Oct 12) as of the
Oct 21 pass — the 7,894 same-definition successor (data to Oct 17) is the
documented update candidate; basis decision remains the user's.**

Conflicting/other prints (DO NOT substitute without the same definition):
- BBC (Oct 16): ~12.6M b/d "through the strait" on Oct 13 (vs 15M late Sep,
  ~17M pre-war) — between the strait and Total-Hormuz-Clearance measures;
  unreconciled (no window/scope printed).
- CNBC (Oct 12): crude through Hormuz ~10.3M bpd week ended Oct 3 (vs 13.5M
  pre-war crude, −23%) — **crude-only**, different window, different
  baseline.
- NYT (Oct 15): ~10M bpd "in October" — monthly, crude-labeled.
- TE estimate (Oct 19 log): "7-day avg ~8.5M vs ~20M prior week" — not
  Kpler; the "20M prior week" contradicts every Kpler print (7.6); treat as
  unreliable.

### 2. Total Hormuz Clearance (Kpler cumulative measure, strait + GoO STS)

Composition (fixed Oct 21 after the model-candidate review — the component
sums are the test): strait transits + Gulf of Oman ship-to-ship net
exports. **7,894 + 2,280 = 10,174 ≈ 10,173** reproduces the published 7-day
average; including Fujairah/Oman loadings in this measure would make the
regional total un-reproducible (10,173 + 4,304 = 14,477 ≠ 19,041). Note:
the briefing's own chart caption describes the cumulative measures loosely
("from the strait itself (1) to Gulf of Oman and Fujairah/Oman terminal
loadings (2) and then Red Sea volumes (3)"); the published numbers force
the composition above. Same oil buckets; Iranian exclusion applies to
strait transits only (STS has no origin attribution).

| obs | published | 7-day avg | baseline | vs baseline |
|---|---|---|---|---|
| 2026-10-12 | Oct 14 briefing | 9,275 kbd | 17,145 kbd | −46% |
| 2026-10-17 | Oct 19 briefing | 10,173 kbd (Oct 17 daily 9,867; 4-day range 9,867-13,067) | 17,267 kbd | −41% |

Sub-components (Oct 19 edition): GoO STS net exports 7-day avg 2,280 kbd
(pre-war 0 — a wartime-new flow); Fujairah/Oman loadings 7-day avg 4,563 kbd
(+34% vs 3,416) — these are added at the REGIONAL tier (section 3), not in
the clearance measure.

### 3. Regional exports (Kpler cumulative measure, clearance + Fujairah/Oman + Red Sea)

Total Hormuz Clearance + Fujairah/Oman terminal loadings + Red Sea
volumes. **10,173 + 4,563 + 4,304 = 19,040 ≈ 19,041** reproduces the
published 7-day average. The measure relevant to the **storage path**
(production recovery), NOT the strait state input.

| obs | published | 7-day avg | baseline | vs baseline |
|---|---|---|---|---|
| 2026-10-12 | Oct 14 briefing | 16,894 kbd | 23,306 kbd | −28% |
| 2026-10-17 | Oct 19 briefing | 19,041 kbd | (≈23,306) | −19% |

- Red Sea 7-day avg 4,304 kbd (+54% vs 2,803; preliminary — unconfirmed load
  terminals).
- Secondary prints (Independent/FT/DC, Oct 16-17): regional outflows 15.5M
  bpd Sep (highest since war began) vs 2.9M bpd on Oct 11 (month low) — daily
  prints consistent with the 7-day recovery above.
- **Bloomberg syndicated (Oct 20, via gcaptain): preliminary Kpler 7-day
  Middle East regional exports "fractionally above pre-war"** — no
  definition/window/vintage printed; UNRECONCILED against the Oct 19
  edition (−19%). If confirmed on a comparable basis it would sit at or
  above endpoint C of the candidate storage illustration (not an interval
  bound); NOT applied.
- Asian crude imports 26 mbd H1 October, within 1% of pre-war (Kpler Oct 19)
  — a lag measure (earlier cargoes arriving), not a current-flow measure.

### 4. Crude vs refined products split

- **DPA (Oct 20 11:03 UTC): 7-day average crude through the strait at 82% of
  pre-war "on Sunday"; refined products ~44%.** Relative print, no mb/d,
  crude-only and products-only scopes. Same form as the Oct 6 "76% of
  pre-war" (= 10.3M bpd per the Oct 20 log) print — i.e. a **crude-only
  series against the ~13.5M pre-war crude baseline** (82% × 13.5 ≈ 11.1M).
- **Reconciliation: UNRESOLVED (revised after the model-candidate review;
  an earlier draft declared the two prints consistent — withdrawn).**
  Multiplying the DPA crude-only 82% by the independently wire-reported
  ~13.5M pre-war crude baseline (CNBC Oct 12) and inferring the products
  denominator by subtraction from the 17,267 total-oil baseline gives ~12.7M
  total — which happens to sit inside 1.5-2x the 7,894 kbd preliminary
  floor (11,841-15,788 kbd). That is a CONJECTURE, not an established
  match: scope, origin exclusions, vintage, time window and a compatible
  products baseline are not established between the two prints, and
  Kpler's observation that preliminary figures have *typically* settled
  1.5-2x higher is a historical statement about the Kpler series, not a
  confidence band for this observation and not a conversion between
  definitions. It is suggestive only. Leave unresolved until same-basis,
  dated data exist. What DOES stand: the 82% figure must not be read
  against the 17,267 total-oil baseline (that conflation was corrected in
  the Oct 21 log).
- Model consequence: no crude/product channel exists in the filter (and in
  the candidate) — a "weak products at high crude" state cannot be entered
  until a same-basis split series exists. Flagged missing input.

### 5. Vessel counts (ship crossings — a separate measure, not the volume measure)

- Kpler daily tanker crossings (the series behind the model's `--transits`
  input): pre-war 50/day. Oct 14 ed.: 7-day avg 13/day; daily Oct 9-12:
  17/9/7/3. Oct 19 ed.: 7-day avg **10/day**; Oct 17: 6 (2 entries, 4
  exits); **34 of 43 crossings Oct 14-17 classed dark/unknown-route (79%)**.
  Important: those dark movements are INCLUDED in the count — Kpler's
  dark-transit methodology confirms them via satellite imagery + human
  intelligence against a binary standard. The 79% is a route-coverage
  statistic, NOT a miss rate: the count is not an AIS-only floor.
  Counts and barrels can still diverge for reasons unrelated to AIS
  (cargo sizes, load factors, shuttle geometry) — which is why the
  candidate treats the count-vs-barrels double-weighting as a hypothesis
  (weight 0.5), not a calibrated resolution.
- Model input: `--transits 12` = 3-day average of the Kpler daily counts
  (Oct 5/6/7: 20+/7/10) — ~2 weeks stale as of Oct 21; the freshest same-
  series print is the 7-day avg of 10/day (Oct 19 ed.).
- Other counts (different scopes — do not feed `--transits`): UKMTO weekly
  overview 254 transits week-to-Oct 14 (~70% below pre-war, all-vessels
  log); PortWatch (Oct 18) 4 transits/day (AIS-only, all vessels) vs
  pre-crisis 85/day; US official "40 ships/day" claim (Sep) — failed the
  volume test in the Sep 21 refactor note (40 × VLCC ≈ 80M b/d, 4× the
  strait's pre-war total).
- CENTCOM: ~97% of the strait passable, 138 vessels redirected as of
  Oct 17 — a posture figure, not a flow or attack measure.

### 6. Attacks and losses (danger measures — coexist with high exports)

- UKMTO feed (our archive, 101 entries, coverageEnd 2026-10-21): weekly
  attack count 12 (week to Fri Oct 16) — press-cited "record" claim, primary
  assessment not fetched (403); UKMTO itself reports struggling to get
  accurate reporting (most attacked vessels no longer report) — the count is
  a floor.
- Kpler Insight (Oct 14 and Oct 19 editions): at least 18 vessels reportedly
  attacked over 2 weeks (not attributed). FT (Oct 16-17): 24 ships hit in
  the two weeks to Oct 11. BBC Verify: 12 vessels attacked Oct 5-11 (largest
  weekly UKMTO-reported total of the war).
- Confirmed vessel losses in window: GFS Pride (containership, sank Oct 14),
  Cape Dao (capesize, sank), Petro Dolphin (crude tanker, on fire since
  Oct 11, two crew missing, fate unconfirmed). **The model's tanker-loss
  input counts CONFIRMED TANKER losses: 1 (Petro Dolphin's fate is the
  open item; the Oct 20 Bukha and Al Faw hits are damage, crews safe, not
  losses; CENTCOM denied the IRGC's Oct 20 two-tanker mine claim).**
- These measures feed the `--tankers` channel (danger/loss) only. Attacks
  and high exports are NOT contradictory in the filter: they enter as
  separate multiplicative channels.

## What the model consumes (and its staleness, as of the Oct 21 pass)

| model input | measure | value used | freshest same-definition print | stale? |
|---|---|---|---|---|
| `--volume` | (1) strait transits 7-day avg | 7.6 (data to Oct 12, pub Oct 14) | 7.894 (data to Oct 17, pub Oct 19) | 9 days |
| `--transits` | (5) tanker crossings | 12 (3-day avg Oct 5-7) | 10/day 7-day avg (pub Oct 19); Oct 17 daily 6 | ~2 weeks |
| `--tankers` | (6) confirmed tanker losses | 1 | 1 (Petro Dolphin unresolved) | current |
| `--brent` | (price — not a shipping measure) | 108.79 (Oct 20 settlement) | — | current |

The candidate revision (research/model/branch_filter_candidate.py) uses the
freshest same-definition prints (7.894 / 10 / 1) and reports the staleness
instead of silently carrying the old values.
