# Diesel Dashboard — Research Notes ("Why are diesel prices so high?")

**Status: idea, not yet approved to build.** Opened Sep 20, 2026 after the WSJ piece
"Refineries Are Now the Main Chokepoint for Global Energy Supplies" (Matthew Dalton,
updated Sep 20, 2026 6:28 am ET —
https://www.wsj.com/business/energy-oil/refineries-are-now-the-main-chokepoint-for-global-energy-supplies-f923e1ba).
All data sources below were **verified live from this machine on Sep 20, 2026** (values quoted
as of that date; re-verify before publishing).

## The story the dashboard would tell

Two chokepoints, one fuel:

1. **Gulf refineries** — a decade of NOC refinery buildout (Kuwait's Al-Zour, UAE's Ruwais,
   Iraq's Karbala, Aramco's Red Sea pair) more than doubled Middle East diesel exports
   2017–2025; the region overtook North America as the world's #1 diesel exporter (19% of
   global exports). War + Houthi escalation on the Red Sea bypass route have slashed those
   exports (Kuwait, UAE, Iraq forced to cut; Saudi Red Sea route hit).
2. **Russian refineries** — Ukrainian drone strikes (a Moscow-area facility hit the weekend of
   Sep 19–20 per the mayor) have nearly halted Russian diesel exports.

Result: the US became the "producer of last resort" — its diesel exports have surged while US
refineries run at ~97–98% of operable capacity and have shifted slate toward diesel. The
record diesel crack (our Sep 20 value: $172.9 retail−WTI, ~95% above January) is the margin
symptom. Political fallout: Rep. Burchett (R-TN) introduced a diesel export ban bill;
Senate Majority Leader Thune called himself "open to the idea" — a ban would spike the rest
of the world's prices and could push China (already limiting exports) and India (export tax)
to follow. Trump blamed Ukraine/Russia "mostly, not Iran"; the article's IEA-compiled data
says the Gulf diesel blocked is ~3× the Russian shortfall.

The existing site covers the *crude* side (transit, prices, SPR, crack). This dashboard would
cover the *refined-product* side — the refinery/export chokepoint.

### Russia chokepoint — the first concrete, quantified data point (Sep 20)

Reuters wire (Sep 20): the largest Ukrainian drone attack reported on the Moscow region **killed
three** (20 injured) and **damaged a facility at the Moscow Oil Refinery (Gazprom Neft)** — no
damage details, operator silent. 1,600+ drones downed since Saturday (450 aimed at Moscow);
attack timed to the final day of the Duma elections. The plant's capacity (Reuters, 2024 data):
11.6M t crude processed → 2.9M t gasoline + 3.2M t diesel (≈235 kb/d throughput, ≈65 kb/d
diesel — labeled conversion). **It is a repeat target: the same refinery was set on fire in
the Jun 18, 2026 strike** (Guardian — Kyiv's biggest air raid on the city since the invasion
start). Reuters' standing context: Ukrainian strikes have "knocked out a significant part of
Russia's oil refining capacity, triggering oil product shortages, fuel price increases and long
queues at filling stations in many regions." This is the wire confirmation of the WSJ's
"a facility in Moscow was hit this weekend" — the dashboard's Russia panel can anchor on a
named, operated, capacity-quantified refinery in the capital. (No HORIZON tripwire matched —
the model is a Hormuz filter; logged, not reweighted.)

## Verified data sources (Sep 20, 2026)

### 1. EIA weekly US distillate flows — API route `petroleum/move/wkly` (NEW — see API-RECIPES.md)

The long-missing live source for weekly US product trade. Series (all kb/d, week ending
Friday, released Wednesday with the WPSR):

| Series | Measure | w/e Sep 11 | w/e Sep 4 | w/e Aug 28 |
|---|---|---:|---:|---:|
| `WDIEXUS2` | Distillate exports | **1,614** | 1,556 | 1,735 |
| `WDIIMUS2` | Distillate imports | 114 | 185 | 113 |
| `WDIRPUS2` | Refiner & blender net production | 5,227 | 5,348 | 5,126 |
| `WDIUPUS2` | Product supplied | 3,501 | 3,678 | 3,390 |

**Full 2026 export history (WDIEXUS2, kb/d):** Jan 2: 1,527 · Jan 9: 1,425 · Jan 16: 1,299 ·
Jan 23: 956 · Jan 30: 1,494 · Feb 6: 948 · Feb 13: 985 · Feb 20: 1,231 · Feb 27: 1,228 ·
Mar 6: 1,251 · Mar 13: 1,052 · Mar 20: 1,180 · Mar 27: 1,406 · Apr 3: 1,576 · Apr 10: 1,590 ·
Apr 17: 1,601 · Apr 24: 1,595 · May 1: 1,861 · May 8: 1,551 · May 15: 1,573 · May 22: 1,561 ·
May 29: 1,618 · Jun 5: 1,499 · Jun 12: 1,507 · Jun 19: 1,394 · Jun 26: 1,327 · Jul 3: 1,679 ·
Jul 10: 1,546 · Jul 17: 1,604 · Jul 24: 1,786 · Jul 31: 1,884 · **Aug 7: 1,935** · Aug 14: 1,601 ·
Aug 21: 1,790 · Aug 28: 1,735 · Sep 4: 1,556 · Sep 11: 1,614.

**2024–25 baseline (same series, 104 weekly points):** min 851 · max 1,853 · avg 1,281. So the
Aug 7, 2026 value (1,935) is the highest of the 2.5 years pulled — but **do not call it a
record without pulling further history** (pre-2024) first.

Seasonality note: "total distillate" = diesel + heating oil; exports dip in winter
(Jan 23/Feb 6 2026 lows of 956/948 are the heating-season draw, not a market signal). Always
compare against same-weeks-last-year, not the January level.

### 2. EIA US refinery utilization — `petroleum/pnp/wiup`, series `WPULEUS3` (already known)

National % of operable capacity, weekly: **Sep 11: 96.8 · Sep 4: 97.8 · Aug 28: 98.0**.
This is the "Western refineries running near capacity" claim made quantifiable. PADD-level
crude inputs/utilization are in the same-day WPSR CSV `https://ir.eia.gov/wpsr/table2.csv`
("Refiner Inputs and Utilization" — crude inputs, gross inputs, by PADD).

### 3. JODI secondary data — monthly country-level diesel exports (NEW — see API-RECIPES.md)

`https://www.jodidata.org/_resources/files/downloads/oil-data/annual-csv/secondary/secondaryyear2026.csv`
(~11 MB, one row per country×product×flow×month; prior years: `.../secondary/2025.csv` etc.).
Filters: `ENERGY_PRODUCT=GASDIES`, `FLOW_BREAKDOWN=TOTEXPSB` (total seaborne exports),
`UNIT_MEASURE=KBD`, `REF_AREA` ∈ {KW, AE, IQ, SA, RU, US}. Values in kb/d.

**Verified coverage (Jan–Jun 2026):**

| Country | Feb | Mar | Apr | May | Jun | Quality |
|---|---:|---:|---:|---:|---:|---|
| US | 1,123 | 1,362 | 1,592 | 1,623 | 1,466 | ac1 (assessed) |
| Kuwait | 320 | 106 | 83 | 129 | 160 | ac3 (unassessed) |
| Saudi Arabia | 848 | 647 | 596 | 603 | 486 | ac3 (unassessed) |
| UAE / Iraq / Russia | — | — | — | — | — | **do not report** (rows exist, all dashes) |

So JODI gives a 3-country panel: the two Gulf collapses (Kuwait diesel exports −50% Feb→Jun;
Saudi −43%) plus the US pickup (+31% Feb→Jun), but **no UAE, Iraq, or Russia** — Russia does
not report refined products to JODI. Cadence: JODI publishes roughly the 20th for the month
two prior; newest month = June; next publication Sep 22, 2026. `ASSESSMENT_CODE`: 1 =
comparable, 2 = caution, 3 = unassessed, 4 = under verification. Keep missing values missing
(never zero-fill). 2025 baseline for pre-war levels: pull `2025.csv` when building.

### 4. Already ingested by the existing site (reusable)

- **US distillate stocks by PADD** — WPSR `table6.csv` (same-day): total 107.859M bbl
  w/e Sep 11 vs 124.684 a year ago = **−13.5%**; East Coast (PADD 1) 21.583 vs 31.267 =
  **−31.0%**; New England −28.6%, Lower Atlantic −34.3%, Central Atlantic −28.9%. Gulf Coast
  only −6.9% (it's the export hub). This is the "the US is shipping out its buffer" chart —
  and the reason East Coast pump prices are the worst.
- **Diesel price (AAA national, weekly)** — already plotted on the crisis site; the hero
  number ($6.5050, 11th straight record) leads the story.
- **Diesel crack (AAA diesel − WTI)** — record $172.9 (Sep 20, ~95% above January). The crack
  *is* the refining squeeze in one line.
- **Brent/WTI** — the crude backdrop.

## Gaps — what free data CANNOT give us

- **Weekly Gulf/Russian export flows** — that's licensed cargo-tracking data (Kpler, Vortexa).
  The WSJ's "three times as large" Gulf-vs-Russia comparison comes from IEA-compiled data in
  the OMR (reachable via the iea-fetch skill) — quotable with attribution, but an OMR figure,
  not a clean plottable series.
- **UAE / Iraq / Russia monthly exports** — not in JODI; EIA's IES "international distillate
  trade" record is stale/annual (per data.gov catalog); IEA Monthly Oil Statistics covers
  OECD countries only. If the panel matters, options: (a) drop to a 3-country panel and say
  so, (b) quote OMR/Reuters narrative numbers as sourced stat cards, (c) license Kpler.
- **China/India policy moves** (export limits, India's export tax) — news, not a series.

## Chart design (draft — not built)

1. **Hero — "The US is filling the hole."** Weekly US diesel exports (WDIEXUS2),
   Jan 2026 → present, with the 2025 same-weeks line as the seasonality baseline. Stat card:
   exports at ~1.6M b/d vs a 2024–25 average of ~1.3M b/d; the Aug 7 peak (1,935) is the
   highest in 2½ years of pulled data (verify record claim against pre-2024 first).
2. **Supporting — "Where it went missing."** Monthly JODI bars/lines, three series
   (US / Kuwait / Saudi), Jan–Jun 2026, labeled "seaborne exports, JODI self-reported;
   Kuwait and Saudi figures unassessed; UAE, Iraq, Russia do not report."
3. **Stocks — "The buffer is being spent."** US distillate stocks by PADD (weekly, table6):
   East Coast vs Gulf Coast vs national, indexed to Jan 1 or shown as % vs year-ago.
4. **Capacity — "No slack left."** National refinery utilization (WPULEUS3) weekly —
   97–98% vs a normal ~92–94%. Could be a stat card instead of a chart.
5. **Margin — already have it.** The diesel crack chart (record $172.9) — retitle in this
   context: "the price of squeezing the last drops out."
6. **Stat strip:** AAA diesel $6.51 (record) · crack +95% vs January · US diesel exports
   ~1.6M b/d (peak record pace) · East Coast stocks −31% y/y · Kuwait diesel exports halved
   (JODI, Feb→Jun) · US refineries at ~97% of capacity.
7. **Copy spine (two-chokepoint structure):** pre-war trade map (Middle East→Asia/Europe,
   US→Europe, Europe→US gasoline, Russia→Turkey/India/China) → war + drones short-circuit it
   → US picks up the slack at 97% utilization → record margins → export-ban politics
   (Burchett bill, Thune) and why a ban would make the world worse (China/India follow-on
   risk) → why China (the one spare-capacity country) is deliberately not running flat-out
   (Wood Mackenzie: energy security over margin).

## Rules / caveats to bake in before building

- "Total distillate" (EIA) = diesel + heating oil — disclose on the chart, don't imply pure
  road diesel.
- JODI ac3 (Kuwait, Saudi) = self-reported, unassessed — label it; ac1 (US) is clean.
- Monthly lags ~2 months (June is newest as of Sep 20) — use the site's "latest month each
  series carries" convention, never pad.
- Weekly export figures are WPSR estimates; the Wednesday print revises nothing retroactively
  but the level is an estimate.
- The IEA "3×" Gulf-vs-Russia claim: quote with attribution to the article/OMR, or omit —
  don't present it as site-computed.
- Every point sourced, no interpolation — same standard as the crisis site.

## If we build it — open questions

1. New standalone page (e.g. `/diesel`) on the same site, or a separate site? The crisis site
   is the natural home; a `/diesel` subpage reuses the Chart.js setup, the stat-strip pattern,
   and the same ingest pipeline.
2. Pull pre-2024 WDIEXUS2 history to settle the record claim (one API call).
3. Pull JODI `2025.csv` for the pre-war baseline panel.
4. Decide whether to add a Wednesday ingest step for WDIEXUS2/WDIIMUS2/WDIRPUS2/WPULEUS3 +
   table2/table6 (WPSR day) and a monthly JODI refresh (~20th).
5. Codex review pass on data + copy before staging, as with the crisis site.

## Addendum (Sep 20 evening): JODI also carries refinery output + stocks — the "are they running?" answer

JODI secondary has, per country×month (verified today): `REFGROUT` (refinery output), `TOTDEMO`
(domestic demand), `STOCKCH` (stock change), `CLOSTLV` (closing stocks level), `RECEIPTS`,
`STATDIFF` (statistical discrepancy). GASDIES, Jan–Jun 2026:

| Country | Refinery output (kb/d) Jan→Jun | Closing diesel stocks |
|---|---|---|
| Kuwait (ac3) | 1,508 → 1,389 → **754 → 657** → 737 → 864 | **0** every month (stock change negative all spring — they produce to what they can move) |
| Saudi (ac3) | 5,308 → 4,874 → 4,725 → **3,774** → 4,524 → 4,326 | 3,244 → 3,461 → 3,218 → 2,942 → 2,173 → 2,630 (kb, i.e. ~2.6–3.5M bbl, drifting down) |
| US (ac1) | 20,403 → … → 20,897 | 15,294 → … → 10,906 (kb) |

**Read:** the Gulf refineries are NOT sitting full and idling — they are **curtailment-running**:
Kuwait's diesel output halved (Jan→Apr, −57%, partial recovery by June) with zero stocks built;
Saudi cut ~19% (Apr deepest) and is slowly working down a ~3M bbl buffer. They produce to the
export window that still exists. Caveats: ac3 = self-reported, unassessed, balances don't fully
close (Saudi June: output 4,326 vs demand 2,534 + exports 486 implies +1,306 kb/d stock build,
reported −105 — the discrepancy line eats it); June is the newest month; Jul–Sep may differ
(ESPO down, YASREF strike claim Sep 16 unverified, Houthi Red Sea escalation).

**US JODI rows are scope-mismatched — do not use them for US distillate production/stocks:**
JODI US "GASDIES" refinery output (20,897 kb/d) ≈ total US *product* output, and US closing
"stocks" (10,906 kb) don't reconcile with EIA distillate stocks (107,859 kb w/e Sep 11). The US
export row DOES reconcile (JODI 1,466 vs EIA 1,432 June). Use EIA for all US production/stocks.

**Chart opportunity:** a "Gulf diesel refinery output" line (Kuwait + Saudi, JODI monthly,
ac3-labeled) showing the curtailment — the physical confirmation that the export blockage is
already biting at the refinery gate.
