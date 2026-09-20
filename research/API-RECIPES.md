# API Recipes (EIA + BLS + Yahoo)

Copy-paste recipes for the two data APIs this project uses. Every command below was
**executed and verified** on the date noted — if one stops working, the API changed, not
the recipe. Keys live as git-ignored dotfiles at the **repo root** (`.eia_api_key`,
`.bls_api_key`) — run the commands from there, and never reference them from `site/`
(which deploys publicly).

| Key file | Service | Used for |
|---|---|---|
| `.eia_api_key` | EIA Open Data API v2 | Refinery utilization (site chart), petroleum stocks, weekly production, spot prices, trade flows |
| `.bls_api_key` | BLS Public Data API v2 | CPI & PPI YoY (site chart), future monthly pulls (Aug CPI due Sep 11) |

Load a key in any shell: `KEY=$(tr -d '[:space:]' < .bls_api_key)`

---

## BLS API v2

**Docs:** https://www.bls.gov/developers/api_signature_v2.htm
**Base:** `https://api.bls.gov/publicAPI/v2/`

### Shape of a call

Single or multi-series: **POST** JSON. There is **no GET-with-parameters** for calculations
(the v1 `?calculation=1` style is gone). Calculations come back nested when you ask for them:

```sh
KEY=$(tr -d '[:space:]' < .bls_api_key)
curl -s -X POST "https://api.bls.gov/publicAPI/v2/timeseries/data/" \
  -H "Content-Type: application/json" \
  -d '{"seriesid":["CUUR0000SA0","WPUFD4"],
       "startyear":"2025","endyear":"2026",
       "calculations":true,
       "registrationkey":"'"$KEY"'"}'
```

- `calculations:true` → each data row gains `calculations.pct_changes` with keys `"1"` (1-mo),
  `"3"`, `"6"`, `"12"` (12-mo = the YoY we plot). **`"12"` is the number we want.**
- `catalog:true` → per-series metadata (`series_title`, `seasonality`, …) — the only way to
  confirm what a series ID actually is before trusting it.
- `annualaverage`, `aspects` also available (default false).
- Without a key, v2 allows ~50 series/month unauthenticated; with the key, far more.

### Gotchas (all hit in the wild, Sep 10)

1. **Series IDs are exact.** `CUUS0000SA0L` (guessed) → "Series does not exist". The catalog
   flag on a successful call shows the real title — always verify.
2. **Periods are `"M01"`…`"M12"`** (with the M prefix), not `"01"`. Parsing `year + period`
   as `"2026" + "01"` silently yields all-`None`.
3. **Missing values are the string `"-"`** — `float("-")` raises; guard the conversion.
4. **A "requested" series that doesn't exist still appears in the response** (with 0 rows and
   a message entry) — check `d["message"]`, don't assume `series[0]` is what you asked for.
5. **Don't confuse seasonality:** for the dashboard we use the **not-seasonally-adjusted**
   all-items / final-demand series, which is what BLS Table A prints. (The `…SA0L1E` suffix
   on `CUUR0000SA0` is "less food and energy", i.e. **core** — not a seasonal flag.)
6. **The API can lag or freeze relative to the release.** Sep 11, ~1h after the Aug CPI
   release: `CUUR0000SA0` returned data ending **2024 M01** with empty `pct_changes` — no 2026
   data at all. Fallback: parse the release page `https://www.bls.gov/news.release/cpi.nr0.htm`
   (PPI: `ppi.nr0.htm`) — the brave `content.js` works, keyless — the headline and core 12-month
   numbers are in the first two paragraphs, and the release page *is* BLS's published value.
7. **`startyear` without `endyear` → REQUEST_FAILED_INVALID_PARAMETERS.** And
   `Results.series` can come back as a **list**, not an object keyed by seriesid — handle both.

### Series IDs for this project

| ID | What it is | Where it's used |
|---|---|---|
| `CUUR0000SA0` | CPI-U, **all items**, U.S. city average, all urban consumers, **not SA** | `cpiYtd` — the amber line. `pct_changes["12"]` = our chart values. Verified Sep 10: Jan 2.39, Feb 2.41, Mar 3.26, Apr 3.81, May 4.25, Jun 3.53, Jul 3.36 (reproduces every news-reported print; replaced our FRED-computed Jan/Feb 2.39/2.43). |
| `CUUR0000SA0L1E` | CPI-U, **all items less food & energy** (core), not SA | Optional: the "shock is energy, not core" line (Jul 2026: 2.5% vs headline 3.4%). |
| `WPUFD4` | PPI, **final demand**, not seasonally adjusted | `ppiYtd` — the blue line. Verified Sep 10: 3.1 3.4 4.3 5.7 5.9 5.6 4.8 5.4 — a **perfect match** to Table A. This also **settled the PPIACO open question**: FRED's `PPIACO` is a different series, which is why index-computed YoY never reconciled. |

### Pull for a new month (e.g. Aug CPI, due Sep 11 ~8:30 ET)

```sh
KEY=$(tr -d '[:space:]' < .bls_api_key)
curl -s -X POST "https://api.bls.gov/publicAPI/v2/timeseries/data/" \
  -H "Content-Type: application/json" \
  -d '{"seriesid":["CUUR0000SA0","WPUFD4"],
       "startyear":"2026","endyear":"2026",
       "calculations":true,"registrationkey":"'"$KEY"'"}' \
| python3 -c 'import json,sys
for s in json.load(sys.stdin)["Results"]["series"]:
    r = s["data"][0]  # latest first
    print(s["seriesID"], r["periodName"], r["calculations"]["pct_changes"]["12"])'
```

Then append the point to `cpiYtd` / `ppiYtd` in `../site/src/data/crisis.ts`,
rebuild, deploy, verify (see research/2026-09-10.md for the verification recipe).

---

## EIA API v2

**Docs:** https://www.eia.gov/opendata/documentation.php (the `/beta/api/` Swagger URL
redirects to the catalog page — use the docs page; the API is fully OpenAPI-described at
`https://api.eia.gov/v2/` root if you want raw JSON).
**Base:** `https://api.eia.gov/v2/`
**Note:** v1 (retired Mar 13, 2023) series IDs mostly don't map to v2 — discover routes
instead of guessing (`/v2/seriesid/W45ECU` → "not a valid series id").

### Discover → facet → data (the three-step pattern)

```sh
KEY=$(tr -d '[:space:]' < .eia_api_key)

# 1. Routes under a sector:
curl -s "https://api.eia.gov/v2/petroleum/?api_key=$KEY"          # → sum, pri, crd, pnp, move, stoc, cons

# 2. Datasets under a route:
curl -s "https://api.eia.gov/v2/petroleum/pnp/?api_key=$KEY"       # → wiup = "Weekly Inputs & Utilization"

# 3. Facet values (e.g. available series ids):
curl -s "https://api.eia.gov/v2/petroleum/pnp/wiup/facet/series/?api_key=$KEY"

# 4. Data — you MUST name the column(s) you want via data[0]=…:
curl -sG "https://api.eia.gov/v2/petroleum/pnp/wiup/data/" \
  --data-urlencode "api_key=$KEY" \
  --data-urlencode "data[0]=value" \
  --data-urlencode "facets[series][]=WPULEUS3" \
  --data-urlencode "start=2024-12-01" --data-urlencode "end=2026-09-05"
```

### Gotchas (hit Sep 10)

1. **`data[0]=value` is required** — without an explicit `data[0]` the response omits values
   (or 400s, depending on the dataset). Add more `data[N]=` entries for more columns.
2. **Facet params repeat:** `facets[series][]=X` per series (URL-encoded, hence
   `--data-urlencode`).
3. **Facet values are case-sensitive** — copy them verbatim from the facet endpoint.
4. `start`/`end` are `YYYY-MM-DD`; `frequency`, `period`, `offset`, `limit` also supported.
5. **`startyear` requires `endyear`** (v2, hit Sep 20): "endyear: If a startyear is specified then an endyear must be specified too." The landing-check calls above use neither — keep it that way. And the `data[0]=…` query breaks curl's glob parser: always `-sG` + `--data-urlencode` (the form above), never a bare quoted URL.

### Landing checks ("has the report landed?" — verified Sep 15, corrected Sep 15 evening)

**Don't trust the watchlist dates — query the API for the newest period.** (The Sep 15
watchlist said the WPSR printed Sep 16; the report for the week ending Sep 4 had actually
been released Sep 10 and sat un-ingested for five days.)

```bash
# EIA WPSR (weekly): newest period on any wstk series
KEY=$(tr -d '[:space:]' < /home/mcone/depletion-ledger/.eia_api_key)
curl -sG "https://api.eia.gov/v2/petroleum/stoc/wstk/data/" \
  --data-urlencode "api_key=$KEY" --data-urlencode "data[0]=value" \
  --data-urlencode "facets[series][]=WGTSTUS1" --data-urlencode "frequency=weekly" \
  --data-urlencode "sort[0][column]=period" --data-urlencode "sort[0][direction]=desc" --data-urlencode "length=1"
# → newest period = week-ending Friday. VERIFIED CYCLE (Sep 15, from the EIA page + archive
#   folders, which are named by RELEASE date): prints WEDNESDAY 10:30 ET for the week ending
#   the PRECEDING Friday (w/e Aug 28 → Sep 2; w/e Sep 4 → Sep 10, one day late (Thu);
#   w/e Sep 11 → Sep 16 per the page's "Next Release Date"). The Sep 9 log's "12 days earlier"
#   reasoning was wrong — it caused the w/e Sep 4 print to be missed for 5 days. The live
#   report CSVs: https://ir.eia.gov/wpsr/table1.csv (Table 1 incl. the SPR row); archive
#   pages: /petroleum/supply/weekly/archive/2026/<release-date>/ . Newest period past the week
#   in our records ⇒ new print — fetch table1.csv for the SPR level (not in the v2 API).

# BLS CPI and PPI (monthly, released on DIFFERENT days — Aug 2026: PPI Sep 10, CPI Sep 11;
# check each separately). Params are startyear/endyear + registrationkey (verified Sep 15).
# Data comes back NEWEST-FIRST — the latest value is data[0], not data[-1].
KEY=$(tr -d '[:space:]' < /home/mcone/depletion-ledger/.bls_api_key)
curl -s -X POST "https://api.bls.gov/publicAPI/v2/timeseries/data/" -H 'Content-Type: application/json' \
  -d "{\"seriesid\":[\"CUUR0000SA0\"],\"startyear\":\"2026\",\"endyear\":\"2026\",\"registrationkey\":\"$KEY\"}"
# → data[0].period 'M08' ⇒ the Sep CPI print landed. bls.gov/schedule 403s — don't scrape it.
```

Series-ID gotchas (all hit Sep 15): BLS monthly CPI is `CUUR0000SA0` (all items) — `...SAH` is
the HOUSING series (per BLS's series-report page), not an annual average; PPI final demand is `WPUFD4` — `PCUACO`/`PPIACO`/`WPUACO` all 404
(`PPIACO` is FRED's, not BLS's). EIA: data routes must END in `/data/`; explore the tree by
querying a parent WITHOUT `/data/` (returns its `routes`); series IDs are route-specific
(`WPUSTCR1` 404s on wstk — and wstk's crude trio is SPR-dependent: commercial-only is
`WCESTUS1`, total-incl-SPR is `WCRSTUS1`; see the wstk section below, and note the "MBBL"
unit label lies).

### Natural gas (TTF / JKM) — Global LNG Hub / JOGMEC weekly (verified Sep 15)

No key. The primary series for the site's gas charts is the JOGMEC-assessed spot (published
weekly by Global LNG Hub, ~Monday): `./search.js "Natural gas prices weekly update JKM TTF Global LNG Hub" -n 5 --freshness 1w`,
then `./content.js` on the newest. Values are printed as bands ("high-USD 28s/MBtu", "$27.0/MMBtu")
— plot the printed value; TTF is €/MWh, convert at the week's printed EURUSD. TE CFD quotes
(GLNGH's own table) are NOT exchange settlements — never plot them over the JOGMEC-assessed points.

**API survey (Sep 15 — no free API exists for TTF/JKM; don't re-litigate):**
- **EIA: NO.** The Natural Gas Weekly Update (eia.gov/naturalgas/weekly/) prints weekly TTF/JKM
  averages (sourced from Bloomberg) in PROSE only, and in this timeline the page is stale at
  Jan 2026. The API's natural-gas price routes (`natural-gas/pri/sum`, `natural-gas/sum/lsum`)
  support monthly/annual frequencies only (domestic survey data) — no TTF/JKM series, no weekly.
- **TradingEconomics:** daily TTF + JKM CFD quotes on the commodity pages (free, manual — this is
  how the Sep 14 TTF point came in, disclosed in the point note); the API (developer.tradingeconomics.com)
  is paid and CFD-based, not assessments. The JKM CFD (24.89, Sep 11) missed JOGMEC's mid-28s badly.
- **oilpriceapi.com:** has `NATURAL_GAS_EUR` (TTF) / `NATURAL_GAS_ASIA` (JKM) endpoints but
  7-day trial only, then paid.
- **World Bank Pink Sheet:** free, official, MONTHLY TTF (+ Henry Hub) — good cross-check, not a
  weekly source. (JKM presence unconfirmed.)
- **Paid/enterprise if it ever matters:** ICE EOD JQ/NA futures (licensed), Bloomberg/Refinitiv.
- **So the workflow stands:** GLNGH/JOGMEC weekly post (free, assessed, predictable slug) as the
  primary; TE CFD pages only as a same-week spot check with a disclosed note.

### wstk crude-inventory series (verified Sep 16) — the commercial-crude chart

`/v2/petroleum/stoc/wstk/data/` carries three US total crude series (use `start=`/`end=`
date params — NOT `startyear`; the route rejects them):

- **`WCESTUS1`** — US ending stocks **EXCLUDING SPR** (the site's commercial-crude chart,
  `commercialCrude2026` in crisis.ts).
- `WCRSTUS1` — US ending stocks **INCLUDING SPR** (WCESTUS1 + the SPR).
- `WCSSTUS1` — the **SPR itself** (weekly history — a possible cross-check for sprWeekly,
  though the WPSR workbook remains the ingestion source).

**Unit gotcha (hit Sep 16):** the API metadata labels the units "MBBL" but the values are
THOUSANDS of barrels (w/e Sep 11: 423,429 → 423.429M, matches WPSR Table 1 exactly). Divide
by 1000. Series pages: eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=<ID>&f=W.

### WPSR table CSVs (verified Sep 16) — regional data without the workbook

`https://ir.eia.gov/wpsr/tableN.csv` — the WPSR workbook tables as plain CSV.
**Gotchas:** the URL 302-redirects (use `curl -sL`); encoding is **cp1252, not UTF-8**
(0x96 en dashes). `table1.csv` = national supplies (SPR row: "Strategic Petroleum
Reserve (SPR)"). **`table5.csv` = gasoline stocks by PADD, `table6.csv` = distillate
stocks by PADD** — rows like `"East Coast (PADD 1)"` carry the week, prior week,
**and the year-ago value WITH the percent change printed** (e.g. w/e Sep 11:
PADD 1 distillate 21.583 vs 31.267 = −31.0%). Note the API lags the release: wstk
(`WGTSTP11` PADD 1 total gasoline) and wiup (`WPULEUS3` utilization) still show the
prior week on release morning — the CSVs are same-day, so use them for the
PADD/utilization numbers and let the API catch up.

### Al Jazeera RSS (verified Sep 15)

`curl -s -A "Mozilla/5.0" "https://www.aljazeera.com/xml/rss/all.xml"` — the ALL feed works;
per-section feeds (`economy.xml`, `middle-east.xml`) return empty. ~25 items, ~12h window. Scan
titles for oil/shipping/Iran/Russia/Yemen/rates; read any relevant miss with `./content.js`.

### r/oil + r/energy RSS (verified Sep 15)

`curl -s -A "Mozilla/5.0" "https://www.reddit.com/r/oil/.rss"` (and `r/energy/.rss`) — the Atom
feeds return 200 even though the HTML/JSON routes are IP-blocked from this box (403 on every
UA/header variant tested; r.jina.ai and redlib mirrors also blocked/bot-gated). 25 entries,
~24h window. r/oil = industry/data (transit estimates, loadings); r/energy = broader policy/retail. Carries items the
wires miss or lag (it surfaced the Sep 15 Yanbu port/refinery strike and the Yanbu loading
suspension ahead of our sweeps). **LEADS ONLY** — verify every item against a primary source
before logging or site use.

### FOMC calendar (verified Sep 15)

`curl -s -A "Mozilla/5.0" "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"` —
static HTML; month in `<div class="fomc-meeting--shaded...">`, dates in
`<div class="fomc-meeting__date">15-16*</div>` (no year; blocks are ordered by year, newest
2026 section starts with its JANUARY meeting, not the next one — parse year + month + day and
select the current or next meeting by date.

### Series / routes used or queued

| Route → series | What it is | Status |
|---|---|---|
| `petroleum/pnp/wiup` → `WPULEUS3` | **U.S. Percent Utilization of Refinery Operable Capacity** (weekly) | ✅ in the site (the Refining chart). Values are WPSR-reported; definition = gross inputs ÷ latest monthly operable capacity. 60 series exist in `wiup` (other fuels, other geographies). |
| `petroleum/stoc/wstk/data/` | Weekly US petroleum **inventories** (crude / gasoline / distillates / residual). **Verified Sep 15**: query `facets[series][]` = `WCRSTUS1` (crude, 1000 bbl), `WDISTUS1` (distillate fuel oil), `WGTSTUS1` (total gasoline), `WRESTUS1` (residual), `WTTSTUS1` (total crude+products); PADD1 distillates = `WDISTP11`. `frequency=weekly` (PLAIN param — NOT `facets[frequency][]`, that 400s). Week-ending date = `period`. **SPR is NOT in wstk** — SPR level still comes from the WPSR workbook/press page. **Landing check**: sort period desc, length 1 — if the newest `period` advanced past the week in our records, the WPSR is out (the API can load a new period on release day). |
| `petroleum/pri` | Weekly/monthly **prices** (spot & contract) | queued — candidate for reconciling the open Brent/WTI weekly-spot question (FRED `DCOILBRENTEU` vs EIA dnav `RBRTE`, ~$9 gap). |
| `petroleum/move` | **Trade flows** (exports/imports by country, product) | queued — cross-check §7B Russian export volumes. |
| `petroleum/crd` | Weekly **production** (crude & NGLs by region) | queued. |
| `petroleum/sum` | Monthly summary (incl. the STEO-adjacent tables) | — |
| STEO tables | **Not in the API at all** — the monthly workbook `https://www.eia.gov/outlooks/steo/xls/STEO_m.xlsx` (parse with openpyxl, `data_only=True`). 28 sheets; the first row of each data sheet carries the series ID (e.g. `patc_world`), row 3 = year headers (12 cols each: 2022@2 … 2027@62), row 4 = months. **Table 4a (4atab) is US-only** (no world/China/Russia rows — utilization is WPSR-only, hence `wiup`). **Table 3e (3etab) = world + regional petroleum consumption** (`patc_world`, `patc_ch`, `patc_r05` Middle East, `patc_r07` Asia & Oceania, …) — source of the Demand Destruction chart. Jan–Aug of the current year are actuals; the rest is forecast (don't plot). | verified Sep 10 |

### The refinery utilization pull (reproducible)

```sh
KEY=$(tr -d '[:space:]' < .eia_api_key)
curl -sG "https://api.eia.gov/v2/petroleum/pnp/wiup/data/" \
  --data-urlencode "api_key=$KEY" --data-urlencode "data[0]=value" \
  --data-urlencode "facets[series][]=WPULEUS3" \
  --data-urlencode "start=2025-01-01" --data-urlencode "end=2026-09-05" \
| python3 -c 'import json,sys
rows = json.load(sys.stdin)["response"]["data"]
for y in ("2025","2026"):
    pts = [(r["period"], r["value"]) for r in rows if r["period"].startswith(y)]
    print(y, len(pts), "wks, avg", round(sum(v for _,v in pts)/len(pts),1),
          "max", max(v for _,v in pts))'
```

Weekly `period`s are the **Monday of the reference week** (e.g. `2026-09-04`). To refresh the
site chart: pull both years Jan 1 → latest, take the first N complete weeks of each, replace
`usRefineryUtil2026` / `usRefineryUtil2025` in `crisis.ts`, bump the "as of" date in the
footnote, rebuild + deploy + verify.

---

## Yahoo Finance v8 chart API (no key — daily prices, verified Sep 10)

The daily-price gap EIA can't fill (`pri/spt` is **weekly** — RBRTE/RWTC land on Fridays,
~1 wk stale). Yahoo's chart API needs no key, only a User-Agent:

```bash
curl -s -A "Mozilla/5.0" \
  "https://query1.finance.yahoo.com/v8/finance/chart/CL=F?interval=1d&range=10d" | python3 -c "
import json,sys,datetime
r = json.load(sys.stdin)['chart']['result'][0]
print('last trade:', datetime.datetime.fromtimestamp(r['meta']['regularMarketTime'], datetime.timezone.utc))
for ts,c in zip(r['timestamp'], r['indicators']['quote'][0]['close']):
    print(datetime.datetime.fromtimestamp(ts, datetime.timezone.utc).strftime('%Y-%m-%d'), round(c,2))"
```

**Tickers:** `CL=F` (WTI front-month, NYMEX) · `BZ=F` (Brent front-month, ICE) ·
`^TNX` (10-yr Treasury — the API returns the **direct percentage**, e.g. 4.944, not the
old ×10 convention).

**Reconciliation (Sep 10 pass):**
- `CL=F` vs FRED DCOILWTICO: ~$1.2 gap (front-month futures vs Cushing spot — acceptable,
  disclose the point's source in the series comment).
- `BZ=F` vs news settlements: exact (108.03 = Convex). FRED's `DCOILBRENTEU` (= EIA dnav
  RBRTE) is the one to **avoid** — ~$9 off settlements.
- `^TNX` vs FRED DGS10: reconciles to 2dp (4.837 vs 4.83).

**Gotcha — the UTC date label:** the last daily bar's timestamp can be labeled with the
*next* UTC calendar day (the Sep 10 session closed under a `2026-09-11` label). Always check
`meta.regularMarketTime`: if the market has already closed for the day, the last bar **is** the
last completed session; if it's mid-session, the last bar is the live, not-yet-settled price.

**Site convention:** keep the FRED weekly series pure; add the latest day as a single
*disclosed* Yahoo point (`wtiWeekly` Sep 10 = 102.93 front-month close; `treasury10y`
Sep 10 = 4.94). When FRED posts the next morning, the point can be swapped to the FRED value.

**Front-month roll gotcha (hit live, Sep 20):** the `BZ=F`/`CL=F` continuous series
**re-anchors to the new front month at the roll bar** — when the roll happened at the
Sep 18 session, a re-pull on Sep 20 showed the Sep 18 bar at $99.29 (Dec Brent) /
$96.08 (Dec WTI) while Sep 14–17 were unchanged and the news settles for Sep 18 were
Nov $103.87 / Oct $100.30 (CNBC, MarketScreener, oilprice "Brent Nov 2026"). A ~$4
"gap" at the next point is the roll (Nov/Oct–Dec basis in a backwardated curve), NOT a
price move. Before appending any crude point: compare the last bar against the
news-reported settle of that session; on a mismatch, the series rolled — keep the
news settle's contract for continuity, disclose the roll in the series note, and check
the runtime crack (retail × 42 − nearest WTI) for an artifact step. The specific
contract months are NOT in the v8 `meta` (contractType comes back None) — resolve it
against news settles (CNBC/MarketScreener close wires) or oilprice.com/futures/*.

**AAA retail (gas/diesel):** no API — `gasprices.aaa.com` is JS-rendered (curl gets a
bot-filtered page). Use the brave-search skill's `content.js https://gasprices.aaa.com/`:
it prints "Today's AAA National Average $X.XXXX" plus the all-time record table.
AAA's daily newsroom release (newsroom.aaa.com) is a static page with the same numbers.

---

## Site-side rules that go with these feeds

- **Sourced, never interpolated.** Every plotted point must be a value these APIs (or a
  primary release) actually printed. Computed values get `computed: true` and render as
  **hollow** markers — and should be retired to the API value as soon as one exists
  (that's how CPI Jan/Feb got fixed: 2.43 → 2.41).
- **BLS-reported > FRED-index-computed.** (Two separate confirmations now: Jul CPI, and the
  PPIACO mismatch. FRED series are often a different seasonal treatment or item scope.)
- **Never put API keys in `site/`** — the site builds to a public Cloudflare
  Worker. Keys stay at the repo root (git-ignored); the site's `crisis.ts` holds
  values, not calls.
- After any data change: `cd ../site && npm run build`, **grep the built bundle
  for a distinctive new value**, `CLOUDFLARE_API_TOKEN=... npm run deploy`, then the
  headless-console-error check (recipe in logs/2026-09-10.md).
- Remember the site's **two import blocks** in `index.astro` (frontmatter + chart `<script>`):
  any name used by chart code must be in the script's own import or it dies silently.
