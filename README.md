# Depletion Ledger

The [Depletion Ledger](https://www.depletion.org/) is a daily-updated
dashboard and model of the 2026 oil-supply crisis that began when the US–Israel–Iran
war closed the Strait of Hormuz (declared Mar 4, 2026; strikes on Gulf energy
infrastructure from Feb 28). Brent closed March +65% — the largest monthly rise in
oil-market history. The Ledger tracks what the closure is actually doing to
inventories, refining, retail prices, and the wider economy, and keeps a published
probability model over three possible endings.

The site has two pages:

- **`/` — the dashboard.** Price charts (Brent, WTI, AAA gasoline & diesel, TTF),
  the US Strategic Petroleum Reserve against its scenario paths and physical floors,
  the refinery picture (US and Russian), the world-balance flip, and second-order
  effects (rates, CPI, food). Every number on the page is sourced; nothing is
  interpolated.
- **`/model/` — the model card**, in plain language: what question the model
  answers, where every number comes from, the three futures and their odds, the
  reserve's four floors, and what the model can't do.

## Repository layout

```
depletion-ledger/
├── research/           the working research project
│   ├── SUMMARY.md          living summary, ~2-minute read (updated every pass)
│   ├── Oil-Depletion-Report.md   the main report — full analysis, newest-first
│   ├── MODEL.md            public model card (synced to the site's /model/ at build)
│   ├── MODEL-internal.md   technical model spec: inputs, formulas, branch weights,
│   │                       floors, breaking points, calibration, update procedure
│   ├── Oil-Crisis-Plain-Summary.md   plain-language summary
│   ├── Oil-Report-Index.md old hub page, kept for reference
│   ├── API-RECIPES.md      verified copy-paste recipes for the EIA + BLS + AAA data pulls
│   ├── model/              stdlib-only Python helpers (draw rate, elasticity,
│   │                       branch reweighting + calibration ledger)
│   └── logs/               dated research logs, one per pass (YYYY-MM-DD.md)
└── site/               the dashboard (Astro 7 · Tailwind 4 · Chart.js 4)
    └── src/data/crisis.ts   single source of truth for everything on the dashboard
```

## Data policy

- **Sourced, never interpolated.** Every data point traces to a public source
  (EIA, BLS, AAA, FRED, Kpler, IMO/UKMTO, IEA/OPEC/EIA outlooks). Gaps are shown as
  gaps, not filled in.
- **Computed values are marked.** Derived figures (crack spreads, day counters) are
  computed from sourced inputs at build or runtime and disclosed as such.
- **Unverified items stay in `research/logs/`** and are never promoted to the
  dashboard or the model card until verified against a primary source.

## Running the site

```sh
cd site
npm install
npm run dev       # local dev server
npm run build     # static build -> dist/ (prebuild syncs MODEL.md into src/content/)
npm run deploy    # build + `wrangler deploy` (set CLOUDFLARE_API_TOKEN)
```

`src/content/` is generated from `research/MODEL.md` by `scripts/sync-content.mjs`
on every build — edit the research file, never the generated copy.

**Data APIs.** The dashboard pulls from the EIA and BLS public APIs. If you update
the data yourself, get your own keys (free, ~10 minutes) and save them as
`.eia_api_key` and `.bls_api_key` at the repo root — both are git-ignored, and
`research/API-RECIPES.md` has every verified command, series ID, and gotcha.

## A research pass

Each update (daily in active phases, weekly otherwise):

1. Pull the new data (prices daily, EIA WPSR Wednesdays, CPI/PPI monthly).
2. Log everything new in `research/logs/<date>.md` with sources.
3. Update `research/SUMMARY.md`; regime events also get a banner in the main report.
4. Reweight the model's branches only on regime events, not weekly noise.
5. Update `site/src/data/crisis.ts`, rebuild, redeploy.

## License

Research writing and site content: CC BY-SA 4.0 — see [LICENSE](LICENSE).

Code (scripts, model, site): MIT — see [LICENSE-CODE](LICENSE-CODE).
