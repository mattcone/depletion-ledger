# World oil stocks — research notes (Phase 1)

Built 2026-09-17. Feeds the two Supply panels below "The world is using more oil than it
produces" (Panel A: OECD on-land stock levels; Panel B: cumulative change in global observed
stocks). All data lives in `site/src/data/world-stocks.json` with per-point provenance.

## What the panels show

- **Panel A** — OECD on-land oil stocks (commercial + government-controlled; the free editions
  publish commercial-only stocks monthly but only a 5-month window per edition — Table 4, so a
  full commercial-only history takes many editions to assemble; the page says so):
  - main line: EIA international dataset (activityId=5), monthly, Jan 2021–May 2026 (65 points)
  - (inset removed 2026-09-19 — reviewer found the "days of forward demand" inset unclear and
    unnecessary: the main chart's "lowest since Jan 2021" message already covers it, and the
    inset's latest point (end-Q1 2026, 91 days, computed from IEA forecast demand) was OLDER
    than the main chart's (May 2026). The `oecd_days_cover_quarterly` series, the
    `days_historical_low` annotation, and the chart code were removed from the data file and
    the page. IEA Table 5 still publishes the days figure — see research/IEA-DATA-ACCESS.md —
    it just isn't plotted.)
  - shaded band: 2021–2025 min–max per calendar month (EIA series), extended across the 2026
    months — it is the same calendar month's historical range, not a claim of seasonal cause.
    April and May 2026 fall below the band's bottom.
  - markers: war start Feb 28 2026; lowest days = 86 at end-Jun-2022 (period searched
    2020Q3–2026Q1); lowest month in the EIA series = 3,854.1 mb, May 2026 (period searched
    Jan 2021–May 2026)
  - also recorded in the data file (not plotted): the industry-only (commercial) quarterly
    series, 2,763 mb at end-2023Q1 → 2,809 mb at end-2026Q1, from the closing-stocks table
    under Table 5 (Jun 2026 ed, single vintage) — so the commercial-only scope is on the record.
  - **Table 4 contents (verified in the Jun 2026 PDF, p.76)**: "OECD Industry Stocks and
    Quarterly Stock Changes" — RECENT MONTHLY STOCKS for the last five months (Dec2025–Apr2026
    in this edition), PRIOR YEARS' STOCKS for the same month (Apr2023/2024/2025), and quarterly
    stock changes; rows = region (OECD total, Americas, Europe, Asia Oceania) × product
    (crude, gasoline, middle distillate, residual, total products). The p.58 page charts the
    same monthly industry data with 2021–2025 ranges. So commercial-only stocks ARE published
    monthly — but each edition covers only five months; a complete 2021–2026 commercial series
    would require stitching many editions (each advances the window by one month). ESTIMATE
    (extrapolating the Jun 2026 edition's 5-month window pattern — the other PDFs' windows
    were not re-checked): the 10 archived PDFs (Jan 2022–Jun 2026) cover roughly 42 of the 65
    months (Aug–Dec 2021, Feb–Jun 2022, Aug–Dec 2022, Aug–Dec 2023, Feb–Jun 2024,
    Sep 2024–Jan 2025, Mar–Sep 2025, Nov 2025–Apr 2026); the remainder (~23 months, 2021 and
    Jan–Jul 2023 especially) needs ~8 more editions. The Apr–Sep 2026 web notes contain the
    narrative but not Table 4's numbers.
- **Panel B** — the stocks covered by the IEA's global inventory estimates (on land + on water,
  across the countries it reports on — the public sources do not establish a complete
  worldwide census, and the page says so):
  - bars: monthly change Mar–Aug 2026, each as published in its edition. The May bar is
    HOLLOW (preliminary): the Jun 2026 ed says "a sizeable draw of 143 mb (−4.6 mb/d) in May,
    according to preliminary data."
  - dots: published cumulative points only — (Apr, −250), (Jul, −410), (Aug, −507), baseline
    end-Feb 2026 — plotted as isolated markers, not a line, because no cumulative observation
    exists for May or June.
  - the bars sum to −445; the latest published cumulative is −507. The monthly points and the
    cumulative totals come from different editions, which revise earlier months; the 62 mb gap
    is recorded, not reconciled (see below)

## Sources (all retrieved 2026-09-17)

### EIA — OECD on-land stocks, monthly
- API: EIA international dataset v2, `activityId=5` ("Stocks, OECD"), `countryRegionId=OECD`,
  monthly, MBBL. 65 rows, 2021-01 → 2026-05. The full reproducible query (all facets, no API
  key) is in the data file under `series.oecd_onland_mb.query`.
- Raw response archived: `research/sources/eia-oecd-stocks-2026-09-17.json`
  (sha256 in `research/sources/fetch-checksums-2026-09-17.txt`).
- The API response carries no release date, so the EIA points' `published` field is null;
  retrieval date (2026-09-17) is recorded separately.
- The EIA republishes the IEA's OECD survey; its monthly values are a *different vintage* from
  the IEA's own quarterly PDFs (e.g. end-Mar-2026: EIA 4,025.8 vs IEA 4,048.9 in the Jun 2026
  edition). Both are "OECD on land" but they are not the same number; the data file records
  which source each plotted point uses.

### IEA — Oil Market Report editions (free PDFs + web report pages)
PDFs (plain curl works on `iea.blob.core.windows.net`; sha256 per file in
`research/sources/fetch-checksums-2026-09-17.txt`):

| Edition | Used for | URL |
|---|---|---|
| Jan 19 2022 | Table 5: 2020Q3–2021Q3 | `https://iea.blob.core.windows.net/assets/3c169b3b-9a7c-4467-9029-d2b76caddc6c/-19JAN2022_OilMarketReport.pdf` |
| Jul 13 2022 | Table 5: 2021Q1–2022Q1 | `https://iea.blob.core.windows.net/assets/d54cfc69-ed0f-44ed-b1fe-ad63b2259456/-13JULY2022_OilMarketReport.pdf` |
| Jan 18 2023 | Table 5: 2021Q3–2022Q3 | `https://iea.blob.core.windows.net/assets/6b994ae3-17fe-4a44-8bb8-eb1217cc4604/-18JAN2023_OilMarketReport.pdf` |
| Jan 18 2024 | Table 5: 2022Q3–2023Q3 | `https://iea.blob.core.windows.net/assets/41426881-fad3-496b-9a5c-8e58f45fa45a/-18JAN2024_OilMarketReport.pdf` |
| Jul 11 2024 | Table 5: 2023Q1–2024Q1 | `https://iea.blob.core.windows.net/assets/2e551e09-0409-4a19-955e-71e75a407c2d/OMR_JULY_2024.pdf` |
| Feb 13 2025 | Table 5: 2023Q4–2024Q4 | `https://iea.blob.core.windows.net/assets/974066b7-5471-44d6-9576-85138a563256/-13FEB2025_OilMarketReport.pdf` |
| Aug 13 2025 | Table 5: 2024Q2–2025Q2 | `https://iea.blob.core.windows.net/assets/5b83d00c-8d10-4187-8800-3b364362a25f/-13AUG2025__OilMarketReport.pdf` |
| Oct 14 2025 | Table 5: 2024Q2–2025Q2 | `https://iea.blob.core.windows.net/assets/7665303f-2a12-43a5-a79c-76b0576c88c6/-14OCT2025__OilMarketReport.pdf` |
| May 13 2026 | Table 5: 2025Q1–2026Q1; Apr/May 2026 changes; cumulative −246 (PDF) | `https://iea.blob.core.windows.net/assets/db7a9af0-7a97-49a5-af56-6732b08d6225/-13MAY2026__OilMarketReport.pdf` |
| Jun 17 2026 | Table 5 (revised); Apr −74, May −143 changes | `https://iea.blob.core.windows.net/assets/51c76f0c-a266-4918-9e67-b0705fef95d6/-17JUN2026__OilMarketReport.pdf` |

Web report pages (fetched via the web reader; extraction notes archived in
`research/sources/iea-web-notes/`, sha256 in the checksums file):

| Edition | Used for | URL |
|---|---|---|
| Apr 14 2026 | Mar change −85 (quoted: "Global observed oil inventories fell by 85 mb in March") | `https://www.iea.org/reports/oil-market-report-april-2026` |
| May 13 2026 | cumulative Mar–Apr −250 (web narrative; the PDF says 246) | `https://www.iea.org/reports/oil-market-report-may-2026` |
| Jul 10 2026 | Jun change +21 | `https://www.iea.org/reports/oil-market-report-july-2026` |
| Aug 12 2026 | Jul change −69; cumulative −410 | `https://www.iea.org/reports/oil-market-report-august-2026` |
| Sep 11 2026 | Aug change −95; cumulative −507; Aug components (on water −65, non-OECD −52, OECD +23) | `https://www.iea.org/reports/oil-market-report-september-2026` |

Note: the Apr 2026 edition's *PDF* is the 67-pp "Free_version1", which **omits the stock
tables** — the −85 for March came from its web page. The Jul–Sep 2026 editions expose no
public PDF URL at all (the "Download PDF" control resolves to the report page); their figures
come from the web report pages.

## Table 5 is quarterly — verification

The five columns of Table 5 ("Total Stocks on Land in OECD Countries") are **quarter-ends**
(headers "End March 2025" etc.), not months. Verified two ways:
1. Column headers are rotated text that pypdf drops; recovered with PyMuPDF
   `page.get_text("dict")` spans + regex `^End [A-Z][a-z]+ \d{4}$`.
2. Arithmetic: Table 4 (industry) Total + government Total = the Table 5 value for the same
   quarter-end (e.g. May 2026 edition: end-Dec-2025 2,826.6 + 1,248.7 = 4,075.3; end-Mar-2026
   2,796.0 + 1,239.6 = 4,035.6).

Full grid 2020Q3 → 2026Q1 (latest vintage per point) is in `research/IEA-DATA-ACCESS.md` §2
and in the data file.

## Discrepancies recorded (not reconciled)

1. **2 mb, cumulative**: −410 (end-Jul, Aug ed) + (−95) (Aug, Sep ed) = −505, but the Sep ed
   publishes −507 for Mar–Aug. Release-version difference. Shown as-is.
2. **246 vs 250, Mar–Apr cumulative**: the May 2026 edition's web narrative says 250 mb; the
   same edition's PDF stocks table prints 246 mb. The web figure (250) is plotted; the PDF
   value is kept in the data file as a non-plotted duplicate-period record.
3. **Bars don't sum to the cumulative**: −85 −74 −143 +21 −69 −95 = −445, but the latest
   published cumulative (Sep ed) is −507 — a 62 mb gap. Each monthly point and each cumulative
   total comes from a different OMR edition, and editions revise earlier months (April was
   reported −117 in the May ed, −74 in the Jun ed). Revisions are a likely contributor to the
   gap, but the full residual is NOT reconciled; Panel B shows both as published and the
   caption says so. (An earlier draft of these notes mis-summed the bars as −345; corrected
   2026-09-17 after external review.)
4. **EIA monthly ≠ IEA quarterly values**: different vintages of the same underlying survey
   (end-Mar-2026: 4,025.8 vs 4,048.9). Not an error; each plotted point names its source.
5. **`crisis.ts` worldBalance comment — UNVERIFIED, reported not changed**: it cites
   "≈1.3B bbl lost in total since Feb (Aug edition figure)". The Aug 2026 edition's public
   copy (fetched and saved) states a cumulative draw of 410 mb and total observed stocks just
   under 7.9 bn bbl; no 1.3B figure appears in the public copy of any Apr–Sep 2026 edition.
   The comment may refer to a broader (non-"observed") aggregate or a subscription-only table.
   Worth a look the next time a subscription source is available.

## Gaps and limits

- **Jun–Aug 2026 OECD levels**: not available in the sources retrieved as of 2026-09-17 (EIA
  series ends May 2026; no public PDF URL was found for the Jul–Sep 2026 editions — absence of
  a discovered URL is not proof that no public PDF exists). Panel A simply ends at May 2026;
  no gap-filling.
- **2026Q2+ quarter-ends**: same PDFs would be needed; the days inset ends at 2026Q1.
- **Pre-2020 history**: the IEA's free PDFs go back to the Jan 2022 edition (covering 2020Q3).
  "Historical low" labels therefore carry the period searched (2020Q3–2026Q1 / Jan 2021–May
  2026) and are presented as reference points, not physical floors.
- **Days of forward demand** exists only quarterly in the free sources; monthly days-of-cover
   would need the IEA statistics browser (subscription).

## Design decisions

- Sign convention throughout: positive = stocks increased; negative = stocks decreased.
- Marker convention (in the data file's `conventions.status`): filled = a direct observation
  published by the source; hollow = published but flagged preliminary by the source (the May
  2026 change) or computed from forecast inputs (the end-Q1 2026 days value). Tooltips name
  the edition date for every IEA point.
- Cumulative totals are plotted as isolated markers, never a line through unobserved months.
- Three distinct concepts kept separate: OECD on-land stocks (Panel A), the stocks covered by
  the IEA's global inventory estimates (Panel B), and balance-implied stock change (the flip
  chart above — EIA STEO, production minus consumption). They are different aggregates and are
  never blended.
- No global operational floor, no "runs out of" dates. The 86-day low is a reference point
  from the searched period only, and it concerns total on-land stocks, not commercial stocks
  alone.

## Open items from external review (2026-09-17)

- **Dark theme**: the site's stylesheet sets a light color scheme explicitly and no dark theme
  implementation exists. The task's "validate both themes" requirement is therefore unmet;
  this is a pre-existing site limitation, flagged rather than fixed in Phase 1.
- **Commercial-only monthly series**: available in the free sources but only a 5-month window
  per edition (Table 4, verified above). A complete 2021–2026 commercial-only line needs ~8
  more editions to fill the 23 uncovered months listed above (2021 and Jan–Jul 2023 especially).
  Current decision: plot the full on-land series (complete from one source) and state the
  substitution; if the user wants the strict commercial scope, fetch the missing editions and
  assemble it.

---

# Phase 2 — agency benchmark, persistence baseline, forecast records (2026-09-17)

## What was added

- `site/src/data/world-stocks.json`: two new series — `eia_steo_world_inv_change_mb`
  (16 points, Sep 2026–Dec 2027, status `agency-projection`) and
  `persistence_baseline_mb` (16 points, status `derived`) — plus a top-level
  `forecast_records` array (2 records, outcomes open; after the Phase 2 review the
  targets carry monthly + cumulative values with first-release and latest outcomes
  kept separate).
- Panel B chart: x-axis extended from 6 to 22 months (Mar 2026–Dec 2027); the six
  reported bars and three published cumulative dots are unchanged; two forecast paths
  (thin gray dashed EIA line, thinner dotted persistence line, hollow markers) grow out of
  the last published cumulative (−507, end-Aug 2026); a dashed vertical divider marks
  the reported/projected boundary; y-range widened to −1,350…+1,050; x-ticks thinned to
  Jan/Apr/Jul/Oct (+ year on January); per-bar value labels are omitted below 560px chart
  width (the six bars compress into the left quarter of the axis and would collide) — the
  caption now lists all six monthly values so nothing is hidden.
- Status vocabulary extended in the data file: `agency-projection`, `model-projection`
  (the latter reserved for Phase 3, not yet in use).

## EIA STEO benchmark (the supported agency benchmark)

- **Release**: EIA Short-Term Energy Outlook, released 9 Sep 2026 (workbook generated
  3 Sep 2026). One recorded version; no substitution.
- **Input**: `https://www.eia.gov/outlooks/steo/xls/STEO_m.xlsx` — a **moving URL**
  (always points at the latest release), so the input is durably archived at
  `research/sources/eia-steo-2026-09-17.xlsx` (retrieved 2026-09-17),
  sha256 `c06a15243b0d972045ecc59cf9376885f68c7c306c581de5d01e6b8ac1a236c5`.
  External review re-downloaded the live URL and confirmed the checksum matches the
  archive.
- **Sheet**: Table 3a (`3atab`), World Total, crude oil and other liquids. Series ids:
  production `papr_world`, consumption `patc_world`, published inventory net withdrawals
  `t3_stchange_world`, OECD commercial EOP `pasc_oecd_t3`.
- **Rule**: monthly inventory change = (world production − world consumption, mb/d) ×
  calendar days in the month, site sign convention (positive = stocks increased).
  **Sign verification**: EIA's own published "net withdrawals" series equals the exact
  negation of production − consumption for every overlapping month (checked 2026-07
  −0.0915, 2026-08 −4.0652, 2026-09 −4.7972 mb/d), so the balance-implied path matches
  EIA's published inventory series — no convention guesswork.
- **Horizon**: Sep 2026–Dec 2027 — the full published forecast horizon of this edition
  for Table 3a, not extended.
- **Precision** (after the second review round): monthly values and cumulative targets
  are stored at **full workbook precision** (production/consumption are 11-dp mb/d in
  the workbook; no intermediate rounding). Cumulative = −507 + Σ of unrounded monthly
  changes. Rounding happens only for display. The first version stored 1-dp monthlies
  and per-step-rounded cumulates; external review re-derived the exact values and
  confirmed the corrected endpoints (e.g. Dec 2026 −808.387, not −808.3).
- **Key values** (cumulative vs end-Feb 2026, after the −507 mb anchor, displayed to
  one decimal): Dec 2026 −808.4 (trough), Jan 2027 −728.1, Jun 2027 −77.6, Jul 2027
  +81.4 (crosses zero), Dec 2027 +978.6. The EIA balance implies the draw slows through 2027 and turns to a build in
  mid-2027 as it sees world production outpacing consumption.
- **Scope caveat (stated in copy, caption, aria, and the record)**: EIA's world balance
  covers a broader pool than the IEA's "global observed stocks" aggregate, and a
  balance-implied path is not a forecast of the IEA series. The paths are anchored to
  −507 for visual comparison only; any score of this record against the IEA series must
  carry the coverage mismatch.

## IEA benchmark — omitted, with reasons

The spec names the IEA OMR balance as a benchmark. The **free** Sep 2026 sources do not
supply enough to construct its quarterly path, and the spec says to omit unsupported
benchmarks rather than fabricate their shape. What the free sources publish (web summary
page, captured 2026-09-17):

- 2026 supply 100.7 mb/d (−5.7 YoY, 1.3 below the Aug edition), 2027 supply +8.
- 2026 demand −2.5 mb/d (940 kb/d steeper than Aug), 2027 demand +2.6.
- Quarterly demand YoY changes: Q2 −5.3, Q3 −3.4, Q4 −2.0.
- Aug production 100.1 mb/d (−1.6 m-o-m); cumulative global observed draw 507 mb since
  end-Feb 2026 at 2.8 mb/d; Aug −95 mb (non-OECD −52, OECD +23).

That is annual levels plus quarterly *demand changes* — no quarterly supply levels, no
balance table, no 2027 quarterly breakdown. A quarterly supply − demand path would have
to be invented from annual figures and YoY deltas. **Backfill**: the full OMR editions
become public three months after release (rolling delay), so the Sep 2026 full edition
is expected around 11 Dec 2026; its Table 4/5 balance material (or the next STEO's
published OECD series) can then add the IEA line. The omission is stated in the caption.

## Persistence baseline

Mean of the last three comparable **reported** monthly changes in global observed stocks
— Jun +21, Jul −69, Aug −95 mb (May excluded: `reported_preliminary`) = **−143/3 =
−47.6667 mb/month**, repeated unchanged through Dec 2027. Dec 2027 cumulative:
**−1,269.7** (= round(−507 − 143·16/3, 1)). Status `derived`; it is a comparison
device, not an agency or model projection. Per the Phase 2 review, the recurring value
is stored at full precision and **rounding happens only for display** — the first
version built the cumulative with per-step rounding, which shifted the endpoint from
−1,269.7 to −1,270.2; corrected.

## Forecast records

`forecast_records` in the data file, two records, both issued 2026-09-17:

1. `steo-2026-09-global-observed` (type `agency-projection`, agency EIA).
2. `persistence-2026-09-global-observed` (type `persistence-baseline`, agency null).

Each target carries **separate monthly and cumulative targets** and **two outcome
slots** (per the Phase 2 review): `outcome_first_release` (frozen at first publication,
never overwritten) and `outcome_latest` (updated as editions revise, with a `revisions`
counter). The `outcome_policy` field states the rule: score against
`outcome_first_release` only, so historical revisions cannot distort the score.

Issue timestamps: `issued` is the calendar date the version shipped (2026-09-17);
`issued_at` is null for this version — the exact finalization time was not captured and
is not invented. Forecast versions finalized after this one must record a
timezone-aware `issued_at` at finalization (see `issued_at_note` in the records).

Both records carry `issued_before_outcome: true`: the first scoreable outcome
(Sep 2026) had not been published as of the issue date. **September accounting,
explicitly**: the IEA's −507 is through end-Aug; the Sep 2026 outcome lands in the
Oct 2026 OMR. When it publishes, fill both outcome slots on the first target (same
value until a revision appears), then proceed month by month. Nothing is backfilled or
pre-filled.

The chart and the frontmatter copy read the cumulative paths from these records
(`target_cumulative_mb`), not from re-accumulated monthly values, so the displayed
paths can never drift from the stored targets.

## MOS Q2 2026 — documented, NOT integrated (removed after review)

External review flagged the MOS-derived point (2,599.4 mb) as an unsupported OECD
estimate: the kmt→mb factor is itself derived by matching one quarter of a different
series (OMR industry 2,809 mb vs MOS 470,897 kmt), which assumes matching coverage
between the two tables and a constant barrel weight across the stock mix — neither
verified from a free source. It was not plotted anywhere, so the point was **removed
from the data file**; the figures are kept here so the quarter is not re-researched:

- **Source**: IEA Monthly Oil Statistics, Sep 2026 ed (pub. 11 Sep 2026), Table 9.1
  "Closing stock levels: Total oil" — OECD total oil closing stocks, commercial scope
  (no government mention anywhere in the 40-page release). Q1 2026: 470,897 kmt;
  Q2 2026: 435,754 kmt; Q2 draw −35,143 kmt.
- **Tentative conversion**: 0.0059652 mb/kmt (2,809 ÷ 470,897, Q1 2026 overlap) →
  Q2 2026 ≈ 2,599 mb. Do not publish until the coverage match and the kmt→mb factor
  are verified (e.g. from an IEA methodology statement or an edition that publishes
  both units).

## OPEC MOMR Sep 2026 (context only, not a spec benchmark)

2026 world demand 105.8 mb/d (+0.4), 2027 108.2 (+2.4); DoC balance 2025 −0.7,
2026Q1 −3.1, 2026Q2 −5.6 mb/d; 2026 quarterly demand Q1 106.3 / Q2 102.9 / Q3 106.3 /
Q4 107.8. Recorded as a cross-check on the direction of the balance (OPEC also sees a
large 2026 draw and a smaller 2027 draw), not used in any chart.

## EIA monthly "Stocks, OECD" vs IEA quarterly (Panel A scope note)

The EIA API series (activityId 5, monthly, through May 2026; archived at
`research/sources/eia-oecd-stocks-2026-09-17.json`) sits roughly 100–150 mb below the
IEA's on-land quarterly totals in the most recent quarters — a coverage/definition
difference between the two agencies, not an error — and shows a 570 mb level break
Feb→Mar 2021 (EIA's own coverage revision). Panel A therefore plots the two as separate
lines and the caption does not claim they are the same series.

## Panel B update-safety (axis built by date, not position)

The Panel B chart no longer assumes "exactly six observed months". The axis is the
sorted, unique union of observed months, published cumulative months, record anchors,
and all forecast target periods; every observation and forecast target is matched to
the axis by period. Forecast paths anchor on the record's *stored* anchor
period/value, so a revised or newly published observation extends the chart without
moving a published forecast. The reported/projected divider and the endpoint labels
are positioned by date. Verified by mutation test: adding a Sep 2026 observation and
revising the Aug cumulative leaves the original forecast's dates and values intact.

## QA method (Phase 2)

Playwright at 1440px and 390px: zero console errors; all 10 charts registered. Label
verification is programmatic: a `fillText` interceptor captures every drawn text item
with its live canvas transform, computes transform-aware bounding boxes, and checks
pairwise overlaps (>2px) and canvas bounds. This caught, in order: a NaN in the bar
labels (object vs number after the `chg.map` refactor), rotated-axis false positives in
the checker itself (transform component mix-up), the Oct/Dec '27 x-tick collision
(mobile), bar-label vs cumulative-dot-label collisions after the y-range widened, the
zero-line label crossing the +21 bar label (mobile), and adjacent bar-label collisions
(mobile) — the last fixed by omitting per-bar labels below 560px and moving the six
values into the caption. Tooltips verified through the chart API for both forecast
datasets; null series entries are filtered out of tooltips.

# Phase 3 — conditional scenario paths (2026-09-17)

## What was added
- `site/src/data/world-stocks-assumptions.json` (v2026-09-17, issued 2026-09-17): the published assumptions table — baseline reference, evidence, accounting rules, and per-scenario monthly production/consumption adjustments with rationale and validity horizons.
- Three scenario series in `world-stocks.json`: `scenario_corridor_holds_monthly_mb`, `scenario_standoff_monthly_mb`, `scenario_corridor_lapses_monthly_mb` (status `model-projection`, monthly change in mb, workbook precision).
- Three forecast records: `scenario-corridor-holds-2026-09-17-global-observed` (16 targets), `scenario-standoff-2026-09-17-global-observed` (16), `scenario-corridor-lapses-2026-09-17-global-observed` (6 targets, validity_horizon 2027-02). Same structure as the EIA record: monthly + cumulative targets, frozen outcomes (first_release / latest), anchor {2026-08, −507}.
- Panel B chart: three thin scenario-colored lines (site colors #3d6b64 / #b4690e / #b3261e, hollow markers, distinguishable patterns solid / [5,3] / [10,4]) over the gray agency paths. Y range extended to (−2200, 1400). Endpoint labels per path; cumulative dot labels staggered (dy 18/38) because the extended axis compressed the Jul/Aug dots to <13 px apart at 390 px.
- Model page: "The scenario paths: what they assume and how they're calculated" — baseline + evidence, arithmetic rules, per-scenario monthly tables (baseline P, ΔP, scenario P, baseline C, ΔC, scenario C, daily balance, days, cumulative), validity horizon, sensitivity, scoring, and the OECD crossing-date omission.
- Dashboard copy: new scenario paragraph (conditional, not a band, scored, SPR zero-contribution rule, lapse horizon); caption + aria extended, all figures derived.

## Baseline choice and evidence
- **Baseline = EIA STEO released 9 Sep 2026** (workbook generated 3 Sep 2026). The only release with a month-by-month world P/C forecast over the full Sep 2026–Dec 2027 horizon plus a quantified disruption schedule. The IEA's free summaries publish no monthly balance path → IEA stays an independent benchmark (backfill ~Dec 11, 2026), not a scenario baseline.
- **STEO narrative (p.3–7 of `research/sources/steo-2026-09.pdf`, 56 pp, cover "September 2026")**: "We forecast oil production in the Middle East will rise in the coming months because of gradually increasing flows through the Strait of Hormuz and the use of alternative routes… we assume some constraints… will persist through the end of the year… below pre-conflict averages until the second quarter of 2027." Price path: Brent $91/b Aug 2026 → $77/b 2Q27 → $67/b 2H27, "most shut-in oil production will be largely restored in 2H27".
- **STEO shut-in table (Table 1, p.5 of the PDF / printed p.4, kb/d)** — the quantitative anchor for the adjustments:
  | | Production (Feb-26) | Mar–Jun-26 avg | Jul-26 | Aug-26 | Fcst 3Q26 | Fcst 4Q26 | Fcst 1Q27 |
  |---|---|---|---|---|---|---|---|
  | Kuwait | 2,560 | 1,648 | 850 | 680 | … |
  | UAE | 3,600 | 925 | 0 | 0 | … |
  | Iran | 3,390 | 455 | 200 | 1,000 | … |
  | Iraq | 4,400 | 2,880 | 1,720 | 1,160 | … |
  | Qatar | 557 | 463 | 150 | 200 | … |
  | Bahrain | 193 | 143 | 110 | 130 | … |
  | Saudi Arabia | 10,500 | 2,923 | 1,950 | 3,550 | … |
  | **Total** | **25,200** | **9,435** | **4,980** | **6,720** | **6,230** | **5,663** | **2,717** |
  **9,435 is the Mar–June-26 AVERAGE shut-in, not a February figure** — the table has no February shut-in column (the "Production" column is the one labeled Feb-26). Verified against the rendered PDF by word x-coordinates: the country Mar–Jun values (1,648 … 2,923) and the total 9,435 all sit in the Mar–Jun header column (x ≈ 250–272 pt), the Jul values in the Jul column (sum 4,980 = narrative "5.0"), the Aug values in the Aug column (sum 6,720 = "6.7"). (An earlier note mislabeled 9,435 as February — corrected after the 2026-09-17/18 review; the scenario arithmetic never used the 9,435 figure, so no targets changed.)
  Derived value used in the scenario rationale: the baseline's September 2026 shut-in ≈ 7.0 mb/d = 3 × 6.2 (3Q26 average) − 5.0 (Jul) − 6.7 (Aug).
  The 25.2 mb/d production column (Feb-26, pre-conflict) is the hard ceiling used to cap the corridor-lapses shut-in.
- **Post-baseline events (NOT double-counted)**: Saudi East–West pipeline (Petroline) suspension (Sep 11, ~4 mb/d per Rystad/CNBC) and Yanbu loading halt (Sep 16) post-date the Sep 9 baseline. Adjustments are incremental vs the baseline's own shut-in path, so an event already inside the baseline is never subtracted twice.
- **Flow evidence** (crisis model, Sep 16): verified transits 3–29/day; claimed 8.6–10 mb/d dark flows unverified (US claim ~40 ships/day ≈ 14 mb/d untested vs AIS). Site discipline: model on the verified floor.

## Scenario design (analyst judgment — documented, not reported facts)
- **Corridor holds (10%)**: +0.5→+2.0 mb/d production through Apr 2027 (recovery ~1 quarter ahead of EIA's own schedule; capped at pre-war trend + growth), +0.25 mb/d demand through Q1 2027 (Brent $70–80 vs baseline $77→67). Endpoint +1,228.6 (vs EIA +978.6).
- **Standoff (35%)**: scenario production held ~99.9–101.0 through 2026, then rose ~6.5 mb/d over 2027 (calendar-weighted quarterly means 101.5 → 103.0 → 105.3 → 107.0) to ~107.5 in Dec 2027, still below the baseline in every month of 2027 (baseline 111.8 in Dec). ΔP from +0.5 (Sep, analyst judgment — baseline's implied Sep shut-in ~7.0 is above the August actual of 6.7) to −7.2 (May 2027), residual −4.3 (analyst judgment: part of the ~4 mb/d East–West flow loss not offset by baseline workarounds, plus attack maintenance — a transport flow converted to a net production loss by judgment, not source-derived). Demand −0.5 (2026) / −1.0 (H1 2027) / −0.5 (H2 2027): documented judgment, set well below the level-elasticity estimate (≈−2 to −3 mb/d at $100–120 vs $67 even at ε=0.05) for lagged pass-through — not an elasticity derivation. Endpoint −869.8.
- **Corridor lapses (55%)**: incremental shut-in +6.0 → +13.5 (total implied Gulf shut-in 13.0 → 16.2, under the 25.2 ceiling; September's ~7.0 baseline shut-in is derived above, not published); demand −3.0 (2026) / −5.0 (Q1 2027) at Brent >$130: judgment within the level-elasticity band (≈−2.5 to −6 mb/d at a $30–60 premium over the baseline's price), ramped with the assumed price path. **Validity horizon 2027-02**: this version's assumptions are carried only that far — a sustained full closure beyond ~6 months is outside the projection's range (no historical precedent at this scale to condition on) and extending would require re-modeling production, demand, and accessible inventory; the path ends there by statement, not because it crosses a historical low. Endpoint −2,050.5. Feasibility: ~1,540 mb beyond the anchor ≈ large share of reported OECD on-land stocks; not clamped, not physically validated (accessible starting inventory unknown).

## Accounting (published in the assumptions file)
scenario P = baseline P + ΔP; scenario C = baseline C + ΔC; daily change = P − C; cumulative = previous + daily × days; sign: positive = stocks increased; anchor = stored record anchor (2026-08, −507, IEA observed). Government releases: zero direct contribution to the combined aggregate — never counted as production or loss.

## Sensitivity (published on the model page)
For the published adjustments, the production term dominates the demand term in magnitude. Standoff: ±2 mb/d across 2027 → ±~730 mb endpoint (±244 over Sep–Dec 2026 alone). Demand ±1 mb/d ≈ ∓180 mb per half-year — a statement about the published sizes, not a general ordering of terms. Lapses: the closure horizon dominates the endpoint level — a variant with the closure ending Nov 2026 and the baseline resuming (adjustments back to zero) lands at ≈ −1,224 by Feb 2027 vs −2,051 for the 6-month closure: an 827 mb gap at the SAME endpoint (the path's own Nov value −1,316 vs Feb −2,050 is a different-elapsed-time comparison, not this one; post-reopening baseline balances Dec −38 / Jan +80 / Feb +51 partly recover).

## Versioning and drift check (research/scoring/regen-scenarios.py)
Each scenario record carries a structured `assumptions_ref` (path + sha256 of its dated snapshot) and a frozen `anchor_observation` (the observation the anchor came from, edition included). A record validates ONLY against its own frozen inputs: a new or revised observation never invalidates an issued record (anchors are checked against the frozen metadata, not the mutable series — verified in the selftest). `--check [--version D]` validates every version's records against their own snapshot + workbook (hashes verified) and the displayed series/tables against the newest version (= the displayed one). `--selftest`: 6 corruptions must fail (table cell, series value, target, v1 snapshot, v2 snapshot, anchor); 4 legitimate changes must pass (new observation, revised observation, two coexisting versions, and an issuance from a genuinely advanced anchor). Chronology rules, shared by issuance and validation: forecast months run STRICTLY AFTER the record's stored anchor through the scenario's validity horizon (the anchor's observed total already includes that month's draw — a target at or before the anchor is rejected); the assumptions file must explicitly cover every forecast month; the emitter fails clearly if the anchor sits at or beyond the horizon. `--emit-records --assumptions F --version D` (or `--new-version D`) prints new dated records (consistent hyphenated ids, own snapshot ref, anchor stamped from the current observation) without touching any file; issuance is manual append + series replacement + `--emit-tables` when the new version becomes the displayed one. The dashboard uses the same active-version rule (newest date among scenario record ids) for its copy, captions, accessibility text, and plotted lines — appending a new version is what moves the chart, never a change to the old records. Scorer: persistence comparisons use the saved persistence record's frozen targets, not a re-created constant.

## Scoring
Frozen at issue like the EIA/persistence records; monthly and cumulative scored separately in absolute mb; first-published outcomes only (outcome_first_release frozen; revisions tracked in outcome_latest). Procedure is checked in: `research/scoring/score-forecasts.py` (+ synthetic fixture `outcomes-fixture.json`; `--apply` writes outcomes into the records). The persistence comparison is a skill-vs-naive-benchmark reference, NOT a test of the scenario assumptions; the scenarios are conditional futures ("if X"), so a scenario that didn't occur is not an unconditional point forecast and its error is not interchangeable with the others'. The comparisons show how closely each published path matched the reported stock change and the persistence baseline; they do NOT identify which production or demand assumption was wrong (production and demand errors offset in the combined balance — different combinations give the same net change), and the best-fitting scenario chosen after seeing the outcome is not evidence of predictive skill. Coverage caveat (EIA world vs IEA observed pool) applies to all.

## OECD historical-reference crossing date — omitted
Considered for Panel A; no supported model allocates the global monthly change to OECD stocks with consistent product coverage and 3 months of forward demand per point (free sources don't publish the split). Guessing the allocation would fabricate the comparison. Revisit when a free source publishes the OECD split.

## Chart notes (Phase 3)
- Dataset order: 0 zero-line, 1 bars, 2 cumulative dots, 3 EIA, 4 persistence, 5 holds, 6 standoff, 7 lapses. Tooltip maps datasetIndex ≥ 5 to the scenario list.
- Endpoint label stack at Dec 2027 (top→bottom): holds +1,229 (dy −14), EIA +979 (dy 16), standoff −870 (dy 18), persistence −1,270 (dy 18 — moved from above to below; above collided with standoff at both viewports). Lapse label: short ("−2,051 — corridor lapses"), above its Feb 2027 point; the long version clipped the left edge at 390 px. The incoming lapse line crosses the label's right edge slightly (same color — reads as an underline).
- Cumulative dot labels: dy 18 + (ci % 2) × 20 — Jul/Aug 2026 dots are 6.5 px apart vertically at 390 px with the extended axis; equal offsets collided.
- Y range (−2200, 1400): bars compress to <15 px; per-bar desktop labels still clear (QA-verified).

## QA (Phase 3)
Playwright @1440 + @390: zero console errors; all 8 datasets with expected non-null counts (lapses 7 = anchor + 6 targets; others 17); per-draw-call fillText box QA (textAlign captured at draw time): zero data-label overlaps, zero data labels outside canvas. Tick-label boxes are a known false positive of the naive interceptor (transform not applied) — the same ticks passed transform-aware QA in Phase 2.

# Phase 3b — corridor-lapses extended to Dec 2027, issued as v2026-09-18 (2026-09-18)

## What was done
The corridor-lapses scenario was extended from its 2027-02 validity horizon (v2026-09-17) through
2027-12 under the fixed-total-disruption persistence reading (P2 in the offline stress test) with
the scenario's existing demand convention (C0: −5 mb/d below the EIA baseline, carried flat).
Issued as new dated records `scenario-*-2026-09-18-global-observed` (all three scenarios, so the
displayed version is a complete one; holds/standoff targets are numerically identical to v2026-09-17).
The v2026-09-17 records and snapshots are untouched — versions coexist, each validates against its
own frozen inputs.

## The extension, precisely
- Sep 2026 – Feb 2027 targets are **verbatim** from the issued v2026-09-17 record (verified
  bit-identical).
- Mar 2027 – Dec 2027: production adjustment = assumed baseline shut-in − 16.217 (−13.5 while the
  assumed baseline shut-in is 2.717, Mar–Jun 2027; −16.217 once it is 0, Jul–Dec 2027); demand
  adjustment −5.0. Verified bit-identical to the stress test's `p2_fixed_total_disruption_c0`
  cumulative series (research/stress-test/lapse-persistence-results.json).
- Endpoint: **−3,495.4 mb by Dec 2027** (−2,050.5 by Feb 2027). Implied withdrawal beyond the
  anchor ≈ 2,990 mb ≈ 1.9× the end-Feb figure — feasibility note updated accordingly.
- The post-1Q27 baseline shut-in schedule (2.717 through Jun 2027, 0 from Jul) is a stated test
  simplification, not source-derived (EIA says "largely restored in 2H27" without a monthly
  schedule). Apr-2027-zero variant: −3,742.6 (247 mb lower). Other readings (P1, P3, C1) remain
  unissued research on /research/lapse-persistence; their spread is a spread of assumptions, not a
  confidence interval — stated in the copy on the supply page, the model page, and the research page.
- The extension is labeled a **conditional scenario** ("if the closure persists"), not a central
  forecast, on the supply page, model page, and research page.

## Files
- `research/sources/world-stocks-assumptions-v2026-09-18.json` (sha256
  eaf3e2524c32d597436e096068df5526be71f664bf771602418f0b804ce744c9) — new dated snapshot;
  holds/standoff unchanged from v2026-09-17; working copy `site/src/data/world-stocks-assumptions.json`
  synced.
- `site/src/data/world-stocks.json` — 3 records appended; the three scenario series replaced with
  the current version's (lapses now 16 points; per-point provenance updated to the v2026-09-18
  snapshot).
- `research/MODEL.md` — lapse table regenerated to 16 rows (`--emit-tables`); corridor-lapses
  narrative rewritten for the conditional extension; sensitivity section extended with the
  restoration-timing variant.
- `site/src/pages/index.astro` — y range (−2200, 1400) → (−3800, 1400); tooltip version now
  derived (`v${activeVersion}`, was hardcoded v2026-09-17); copy/caption/aria carry the
  conditional label, the 16.2 mb/d fixed-total framing, the research-page link, and the
  not-a-confidence-interval wording; endpoint label moved with the record (right edge, Dec 2027).
- `site/src/pages/research/lapse-persistence.astro` — banner + copy now state that the primary
  variant (P2 + C0) underlies the issued v2026-09-18 conditional scenario; v2026-09-17 records
  unchanged; remaining variants unissued.
- `research/scoring/regen-scenarios.py` — selftest updated: the synthetic second-version
  simulation now issues from the CURRENT (newest) version and uses a synthetic version date
  strictly after every real version (the old simulation assumed a single real version). All
  corruptions still fail; all legitimate changes still pass. `--check` and `--selftest` PASS.
- `site/qa-lapse-stress.mjs` — extended: research-page issued-note/not-a-CI/caption checks (banner
  is text-transform:uppercase → case-insensitive compare; innerText wraps → whitespace-normalized);
  public-page checks for the conditional copy, research-page link, dynamic tooltip, 17-point lapse
  line, y min −3800, and the six right-edge endpoint labels (transform-aware, in-canvas, no
  overlaps).

## QA / deploy
Playwright @1440 + @390 on staging: zero console errors on both pages; 56/56 checks PASS; zero
label overlaps; research page still noindex + excluded from sitemap. Staging version
`debe1841` (assets identical to `22b54823`, 2026-09-18). Production NOT touched —
staging-only per the task.
