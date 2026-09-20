# Accessing IEA / EIA oil data from this machine

Working playbook, verified 2026-09-17. Everything below was tested from this
box on that date. If a route stops working, the notes say why it worked before.

## TL;DR — what is blocked, what is open

| Target | Status | How |
|---|---|---|
| `www.iea.org` pages | **BLOCKED** (Cloudflare JS challenge — 403 for curl, r.jina.ai, Brave content.js, headless/full chromium via playwright) | Use the CLI agent: `~/.local/bin/codex` → `codex exec "<prompt>"` — its web reader passes the challenge |
| `iea.blob.core.windows.net` (IEA file storage) | **OPEN** | Plain `curl -A "Mozilla/5.0"` works. This is where the free OMR PDFs live |
| `www.oecd.org` | **BLOCKED** (same Cloudflare) | Use codex reader |
| `sdmx.oecd.org/public/rest/` (OECD SDMX API) | **OPEN** | Plain curl — but OECD Data Explorer does **not** carry IEA OMR inventory data (checked all 1548 dataflows, 2026-09-17). Dead end for this task |
| `www.eia.gov` + `api.eia.gov` | **OPEN** | Plain curl. EIA republishes IEA OECD stock levels — the main source for Panel A levels |
| `archive.org` (Wayback) | **FLAKY** (429 rate limits / "temporarily offline" on 2026-09-17) | Retry later; don't build workflows on it |
| Brave search (snippets) | **OPEN** | `/home/mcone/.pi/agent/skills/pi-skills/brave-search/search.js` (key in `~/.bashrc`). Great for discovering blob URLs and getting exact figure quotes |
| DuckDuckGo HTML (`html.duckduckgo.com/html/`) | **OPEN** to curl | Backup discovery channel when Brave misses |

## 1. Reading iea.org / oecd.org pages: the codex pattern

```bash
mkdir -p /tmp/iea-fetch
cat > /tmp/iea-fetch/prompt-N.txt <<'EOF'
<prompt — see template below>
EOF
cd /home/mcone/depletion-ledger   # trusted project dir for the agent
timeout 900 codex exec --skip-git-repo-check "$(cat /tmp/iea-fetch/prompt-N.txt)"
```

Rules learned from five runs:
- One topic per invocation (2–3 pages, or one exploration). Bigger runs get
  sloppy.
- The reader gives **text, not raw HTML**. It refuses full verbatim
  reproduction of non-CC text (copyright limits) — but it transcribes exact
  sentences and numbers fine when asked per-section.
- Prompt it to (a) go section by section past the highlights block, (b)
  transcribe numbers EXACTLY (IEA prints "2 795"), (c) write `[not on page]`
  for missing items instead of reconstructing, (d) save structured JSON
  figures with the exact quote per number, (e) never fabricate URLs/GUIDs,
  (f) retry a 403 once, then report failure.
- The "Download PDF" buttons on iea.org report pages are JS-driven; the
  reader cannot see the href. Don't waste a run chasing them.
- Save all outputs under `/tmp/iea-fetch/`; clean up at task end.

## 2. Free OMR PDFs (direct curl)

Filenames: `-<DD><MON><YYYY>_OilMarketReport*.pdf` under
`https://iea.blob.core.windows.net/assets/<guid>/`. GUIDs are not guessable —
discover via Brave/DDG search, then curl.

Downloaded and checksummed (see `sources/fetch-checksums-2026-09-17.txt`):

| Edition (pub date) | URL | Local |
|---|---|---|
| Apr 14 2026 (67 pp "Free_version1" — no stock tables) | `https://iea.blob.core.windows.net/assets/515f3128-df1a-4d6c-beb4-fd91d2434bef/-14APR2026_OilMarketReport_Free_version1.pdf` | `/tmp/iea-fetch/omr-2026-04.pdf` |
| May 13 2026 (100 pp, full tables) | `https://iea.blob.core.windows.net/assets/db7a9af0-7a97-49a5-af56-6732b08d6225/-13MAY2026__OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2026-05.pdf` |
| Jun 17 2026 (97 pp, full tables) | `https://iea.blob.core.windows.net/assets/51c76f0c-a266-4918-9e67-b0705fef95d6/-17JUN2026__OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2026-06.pdf` |
| May 13 2026 (public version) | `https://iea.blob.core.windows.net/assets/2b89a47b-34a2-40e0-90ff-68f7ccd80715/-13MAY2026__OilMarketReport_publicversion.pdf` | — |
| Jan 21 2026 | `https://iea.blob.core.windows.net/assets/b308b876-554c-4339-ab9f-72e96eac6cdd/-21JAN2026_OilMarketReport.pdf` | — |
| Feb 12 2026 | `https://iea.blob.core.windows.net/assets/ad66d805-c797-42cc-803d-f90b58eac472/-12FEB2026_OilMarketReport.pdf` | — |
| Mar 12 2026 | `https://iea.blob.core.windows.net/assets/a25ddf53-cd6c-4910-ac90-16bfd28399e7/-12MAR2026_OilMarketReport.pdf` | — |
| Jul/Aug/Sep 2026 | **NOT FOUND yet** (not indexed by Brave/DDG; download buttons are JS) | — |
| Jul 11 2024 | `https://iea.blob.core.windows.net/assets/2e551e09-0409-4a19-955e-71e75a407c2d/OMR_JULY_2024.pdf` | `/tmp/iea-fetch/omr-2024-07.pdf` (82 pp; Table 5: 2023Q1–2024Q1) |
| Jan 15 2025 | `https://iea.blob.core.windows.net/assets/115a587c-9a83-4914-b437-2b6c47680790/OMR_JANUARY_2025.pdf` | `/tmp/iea-fetch/omr-2025-01.pdf` (82 pp; Table 5: 2023Q3–2024Q3) |
| Feb 13 2025 | `https://iea.blob.core.windows.net/assets/974066b7-5471-44d6-9576-85138a563256/-13FEB2025_OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2025-02.pdf` (89 pp; Table 5: 2023Q4–2024Q4) |
| Aug 13 2025 | `https://iea.blob.core.windows.net/assets/5b83d00c-8d10-4187-8800-3b364362a25f/-13AUG2025__OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2025-08.pdf` (90 pp; Table 5: 2024Q2–2025Q2) |
| Oct 14 2025 | `https://iea.blob.core.windows.net/assets/7665303f-2a12-43a5-a79c-76b0576c88c6/-14OCT2025__OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2025-10.pdf` (89 pp; Table 5: 2024Q2–2025Q2) |
| Jan 18 2024 | `https://iea.blob.core.windows.net/assets/41426881-fad3-496b-9a5c-8e58f45fa45a/-18JAN2024_OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2024-01.pdf` (Table 5: 2022Q3–2023Q3) |
| Jan 19 2022 | `https://iea.blob.core.windows.net/assets/3c169b3b-9a7c-4467-9029-d2b76caddc6c/-19JAN2022_OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2022-01.pdf` (Table 5: 2020Q3–2021Q3) |
| Jul 13 2022 | `https://iea.blob.core.windows.net/assets/d54cfc69-ed0f-44ed-b1fe-ad63b2259456/-13JULY2022_OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2022-07.pdf` (Table 5: 2021Q1–2022Q1) |
| Jan 18 2023 | `https://iea.blob.core.windows.net/assets/6b994ae3-17fe-4a44-8bb8-eb1217cc4604/-18JAN2023_OilMarketReport.pdf` | `/tmp/iea-fetch/omr-2023-01.pdf` (Table 5: 2021Q3–2022Q3) |

Also useful (URLs found, not downloaded): Jan 21 2026, Feb 12 2026, Mar 12 2026
(see table above), Sep 11 2025 (`9912e52f-d73e-4871-b3e2-a5c4779ba511/-11SEPT2025_OilMarketReport.pdf`).

### Inside a full OMR PDF (May 2026 edition as reference, 100 pp)

Parsing: `pip3 install --user pypdf` (no pdftotext on this box).
`from pypdf import PdfReader; r.pages[i].extract_text()`.

- **Table 5 — "Total Stocks on Land in OECD Countries"** (May ed p.81):
  country rows, **5 QUARTER-END columns** (headers like "End March 2025" —
  rotated text that pypdf drops; get them with PyMuPDF: `pip3 install --user
  pymupdf`, then `page.get_text('dict')` spans, regex `^End [A-Z][a-z]+ \d{4}$`),
  each `Stock Level (mb) | Days Fwd Demand`, regional + OECD totals.
  **This is the source of the headline "OECD commercial inventories" chart**
  (industry + government-controlled, on land). Footnote: days of forward
  demand = stock ÷ forward-quarter average daily demand.
  ⚠️ Do NOT assume monthly columns — a 5-month guess produced a wrong
  Dec25/Mar26 mapping; verify against Table 4 (industry + government Total5
  rows must sum to the Table 5 value for the same quarter).
- **Table 4 — "OECD Industry Stocks and Quarterly Stock Changes"** (Jun ed
  p.75): industry-only, by product, 5 recent months (last = estimate) +
  prior-year same month + quarterly changes in mb/d.
- **Table 4a — "Industry Stocks on Land in Selected Countries"**: US/Japan/
  Germany/Italy by product, 5 months.
- p.58 (May ed): "Regional OECD End-of-Month Industry Stocks" charts —
  graphics with 2021-2025 range bands (values only via the tables).
- **Vintages get revised between editions.** Measured (quarter-ends):
  End-Dec-2025 = 4075.3 mb (May 2026 ed) → 4088.3 (Jun 2026 ed);
  End-Mar-2026 = 4035.6 → 4048.9. Always record which edition a number
  came from; never silently reconcile.
- The 67-pp "Free_version1" editions (e.g. April 2026) **omit the stock
  tables** — check page count before relying on one.

### Quarterly "Total OECD" values extracted (mb / days) — latest vintage each

COMPLETE GRID 2020Q3 → 2026Q1 (every quarter, no gaps):

| Quarter | mb | days | Latest-edition source |
|---|---|---|---|
| 2020Q3 | 4730.0 | 111 | Jan 2022 ed |
| 2020Q4 | 4576.8 | 109 | Jan 2022 ed |
| 2021Q1 | 4464.1 | 102 | Jul 2022 ed (rev. of 4467.1) |
| 2021Q2 | 4398.3 | 97 | Jul 2022 ed (rev. of 4402.4) |
| 2021Q3 | 4282.4 | 92 | Jan 2023 ed (rev. of 4272.0 / 4267.8) |
| 2021Q4 | 4134.4 | 90 | Jan 2023 ed (rev. of 4131.4) |
| 2022Q1 | 4055.3 | 90 | Jan 2023 ed (rev. of 4059.7) |
| 2022Q2 | 4008.7 | **86** | Jan 2023 ed — LOWEST DAYS in period |
| 2022Q3 | 3995.6 | 87 | Jan 2024 ed (rev. of 3991.1) |
| 2022Q4 | 3995.0 | 88 | Jan 2024 ed |
| 2023Q1 | 3976.0 | 87 | Jul 2024 ed (rev. of 3975.7) — LOWEST MB |
| 2023Q2 | 3998.7 | 87 | Jul 2024 ed (rev. of 3998.2) |
| 2023Q3 | 4036.8 | 88 | Jul 2024 ed (rev. of 4034.3) |
| 2023Q4 | 3984.5 | 89 | Feb 2025 ed (rev. of 3984.4) |
| 2024Q1 | 3986.9 | 87 | Feb 2025 ed (rev. of 3976.4) |
| 2024Q2 | 4072.4 | 88 | Aug 2025 ed (rev. of 4072.2) |
| 2024Q3 | 4041.6 | 87 | Oct 2025 ed (rev. of 4047.9) |
| 2024Q4 | 3999.6 | 89 | Aug/Oct 2025 ed (rev. of 3980.0) |
| 2025Q1 | 3993.1 | 87 | May 2026 ed (Oct 2025 ed had 3995.9) |
| 2025Q2 | 4029.4 | 87 | May/Jun 2026 ed (Oct 2025 ed had 4030.8) |
| 2025Q3 | 4106.3 | 89 | May/Jun 2026 ed |
| 2025Q4 | 4088.3 | 89 | Jun 2026 ed (rev. of 4075.3) |
| 2026Q1 | 4048.9 | 91 | Jun 2026 ed (rev. of 4035.6) |

Remaining gap: 2026Q2+ (Jul/Aug/Sep 2026 edition PDFs not yet found).
Reference points (label with period searched, NOT "operational minimum"):
lowest days = 86 at end-Jun-2022; lowest mb = 3976.0 at end-Mar-2023
(3975.7 in Jan 2024 ed vintage). They are different quarters — per spec,
minimum barrels and minimum days need not coincide; report each on its own.
Note the pre-war trend: 4730 mb (2020Q3) → ~3976–4000 mb (2022Q3–2025Q4),
so "normal" OECD on-land stock in 2024–2025 was ~4,000 mb / 87–89 days.

## 3. EIA API — OECD stock levels (the workhorse for Panel A)

EIA republishes IEA OECD total on-land stocks (industry + government).
Key: `.eia_api_key` at repo root (NEVER copy into site/ — it deploys public).

Verified query (2026-09-17; 65 rows 2021-01 → 2026-05):

```bash
KEY=$(cat .eia_api_key | tr -d '[:space:]')
curl -sG "https://api.eia.gov/v2/international/data" \
  --data-urlencode "api_key=$KEY" \
  --data-urlencode "frequency=monthly" \
  --data-urlencode "data[0]=value" \
  --data-urlencode "facets[activityId][]=5" \
  --data-urlencode "facets[countryRegionId][]=OECD" \
  --data-urlencode "start=2021-01" \
  --data-urlencode "sort[0][column]=period" \
  --data-urlencode "sort[0][direction]=asc"
```

- `activityId 5` = "Stocks, OECD", unit MBBL, monthly. Regions: `OECD`,
  `OEEU` (OECD-Europe), countries via `countryRegionId` (type `c`).
- **Gotchas that cost time** (all hit on 2026-09-17):
  - `data[0]=value` is REQUIRED — without it rows come back with `value: null`.
  - sort syntax: `sort[0][column]=period&sort[0][direction]=desc` (not `sort[period]`).
  - `length`, not `limit`. Facet values: `facets[x][]=v`.
  - v1 API is dead (404). Dataset root listing: `/v2/international/` works,
    `/v2/petroleum/` lists routes (sum, pri, crd, pnp, move, stoc, cons) —
    the OECD stocks live under `international`, not `petroleum`.
  - Max 5000 rows per JSON response; paginate with `offset`.
- EIA docs: https://www.eia.gov/opendata/documentation.php (curl-able).
- **No days-of-forward-demand in this dataset** (only Production,
  Consumption, Stocks activities for the OECD region).
- EIA vintages differ slightly from IEA vintages (Feb 2026: EIA 4058.6 mb vs
  IEA 4048.9 mb). Same series, different revision rounds — label the source
  per plotted point.
- Archived copy of the 2026-09-17 pull: `sources/eia-oecd-stocks-2026-09-17.json`
  (sha256 in `sources/fetch-checksums-2026-09-17.txt`).
- EIA "featured view" pages (e.g. monthly OECD stocks at
  `eia.gov/international/data/world/featured-view/3`) are SPAs — the API
  above is the direct route.

## 4. What's actually in hand (as of 2026-09-17)

**Monthly GLOBAL OBSERVED stock changes** (each from its own edition's
public summary — release vintages differ, do not rescale):

| Month | Change | Edition (pub date) |
|---|---|---|
| Mar 2026 | −85 mb | Apr ed (14 Apr) |
| Apr 2026 | −117 mb (May ed) / **−74 mb (Jun ed, revised)** | May (13 May), Jun (17 Jun) |
| May 2026 | −143 mb | Jun ed |
| Jun 2026 | +21 mb ("first increase in four months") | Jul ed (10 Jul) |
| Jul 2026 | −69 mb | Aug ed (12 Aug) |
| Aug 2026 | −95 mb | Sep ed (11 Sep) |

**Published cumulative draws** (end-February baseline): end-Apr −250 (May ed
web; its PDF says 246 — keep both), end-Jul −410 (Aug ed), end-Aug **−507**
(Sep ed). Jun ed also: "430 mb since end-Feb **outside the Gulf**" — different
scope, don't mix. The monthly changes do NOT sum to the published cumulative
(−85−74−143+21−69−95 = −345 vs −507) — inter-edition revisions + scope.
Plot published cumulatives as-is; record the residual.

**OECD total on-land stock levels + days of forward demand** (OMR Table 5,
"Total OECD" row, QUARTER-ENDS): 2023Q1 → 2026Q1, see the quarterly table
above (3976.0/87d through 4048.9/91d). NOT monthly.

**OECD total on-land levels, EIA vintage**: 2021-01 → 2026-05 monthly,
see `sources/eia-oecd-stocks-2026-09-17.json`. Spring 2026 drop visible:
4065 (Dec 25) → 4058.6 (Feb 26) → 4025.8 (Mar) → 3905.5 (Apr) → 3854.1 (May).

**End-of-period world observed level**: "slightly under 7.9 billion barrels"
at end-July 2026, first time below since April 2025 (Aug ed).

**Aug 2026 components** (Sep ed): oil on water −65, non-OECD −52, OECD +23
(commercial build exceeded a 19 mb government draw).

## 5. Still missing / open questions

1. **Jul/Aug/Sep 2026 edition PDFs** — not indexed anywhere yet (Brave, DDG,
   codex all failed to surface the blob URLs; download buttons are JS). Retry
   later; Wayback if it recovers. Needed for: 2026Q2 end (Jun 2026) Table 5,
   monthly industry levels Apr–Jul 2026 (Table 4), and to close the mb gap
   after EIA's 2026-05.
2. **DONE (2026-09-17)**: 2020Q3–2022Q4 filled from Jan 2022, Jul 2022,
   Jan 2023, Jan 2024 editions. Grid complete 2020Q3→2026Q1 (see table above).
   "Historical low" labels now cover 2020Q3–2026Q1.
3. **Reconcile crisis.ts's "≈1.3B bbl lost in total since Feb"** with the
   Sep ed's 507 mb "global observed" — different aggregates? Verify what the
   Aug edition actually said, then report (don't change existing data).
4. **MOS (Monthly Oil Statistics) xlsx** — exists ("September 2026 monthly oil
   statistics", data through June 2026) but URL is JS-hidden and not indexed.
   jodi.org is dead (redirects to a junk domain). If MOS xlsx ever surfaces,
   it has monthly country/region stocks.

## 6. Provenance rules (for the research note + site data files)

Every number in `world-stocks.json` / the research note must carry:
source name + release edition, publication date, reference period, value +
unit, exact quote (for prose sources) or API query (for API sources),
retrieval date, and file checksum where a file was saved. Numbers that
disagree across releases are kept as separate points with their vintages —
never averaged or rescaled. Retrieved-but-unverified is not "reported".
