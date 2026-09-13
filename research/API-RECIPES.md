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

### Series / routes used or queued

| Route → series | What it is | Status |
|---|---|---|
| `petroleum/pnp/wiup` → `WPULEUS3` | **U.S. Percent Utilization of Refinery Operable Capacity** (weekly) | ✅ in the site (the Refining chart). Values are WPSR-reported; definition = gross inputs ÷ latest monthly operable capacity. 60 series exist in `wiup` (other fuels, other geographies). |
| `petroleum/stoc` | Weekly US petroleum **inventories** (crude / gasoline / **distillates** / SPR) | queued — the watchlist item "diesel stocks under 100M bbl" should come from here directly instead of the WPSR press page. |
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
