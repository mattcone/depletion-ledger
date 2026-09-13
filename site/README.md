# site

The Depletion Ledger dashboard — [live at depletion.org](https://www.depletion.org/).

**Stack:** Astro 7 (static) · Tailwind CSS 4 (via `@tailwindcss/vite`) · Chart.js 4 ·
deployed as a Cloudflare Worker (static assets).

## Single source of truth

All dashboard numbers live in **`src/data/crisis.ts`** — price series, SPR
levels/scenarios, branch weights, watch list, cascade. After each research pass,
update that file and redeploy. Nothing else on the page carries data.

## Commands

```sh
npm install
npm run dev        # local dev server
npm run build      # syncs content, then static build -> dist/
npm run deploy     # build + share-card render + wrangler deploy (needs CLOUDFLARE_API_TOKEN)
```

## Domain

Live at **https://www.depletion.org/**. `depletion.org` 301-redirects to www;
the redirect lives in `src/worker.js`, and both hostnames are registered as
custom domains in `wrangler.jsonc`. The `oil-report.me-fce.workers.dev`
subdomain stays enabled as an alias for old shared links.

Every build first runs **`scripts/sync-content.mjs`** (prebuild): it copies
`../research/MODEL.md` into `src/content/` (gitignored — always generated, never
hand-edited) and injects frontmatter. The research project remains the single
source of truth for the model card. After editing `MODEL.md` in `../research/`,
rebuild + redeploy.

Deploy: any Cloudflare API token with Workers:Write works —
`CLOUDFLARE_API_TOKEN=... npm run deploy`. The Worker name is `oil-report` (see
`wrangler.jsonc`); renaming the Worker publishes to a NEW URL, the old one keeps
running.

## Share card (og:image)

Every deploy re-renders **`og-supply.png`** — the supply/SPR chart as a 1200×630
share card (2x for high-DPI previews). Source: `src/pages/og/supply.astro` (a
render-only route, excluded from the sitemap and robots); renderer:
`scripts/make-og.mjs` (headless Chrome — set `CHROME_BIN` if yours lives
elsewhere). The card's data comes from `src/data/crisis.ts`, so it updates with
the daily cadence; the PNG is committed to `public/` so a bare `npm run build`
keeps the last good card. Both pages' Open Graph / Twitter tags live in
`src/components/SiteMeta.astro`.

## Pages

- `/` — dashboard: stat strip, Brent + retail fuel charts, crack spread, SPR
  actuals + scenario paths + floor lines (HTML hover messages on the floors),
  likely outcomes, the reserve flip, refinery sections (US + Russia), second-order
  effects (rates, CPI, food), watch list, breaking-points cascade.
- `/model/` — the model card, written for a general audience. Source:
  `../research/MODEL.md`; the technical spec behind it is
  `../research/MODEL-internal.md`.
- `/og/supply/` — NOT a page: the share-card render source (see above).

Search/social plumbing: `@astrojs/sitemap` (sitemap at `/sitemap-index.xml`,
`/og/` filtered out), `public/robots.txt`, canonical + Open Graph + Twitter
card tags on every page via `src/components/SiteMeta.astro`.

## Conventions

- **Verified numbers only** on the site. Unverified items stay in
  `../research/logs/` and are never promoted here.
- The day counter is computed client-side (crisis Day 1 = 2026-02-28, the war's
  start; model Day 1 = 2026-06-30).
- Charts show only verified data points; no interpolation. Computed values are
  disclosed in the array comments.
- U+2212 (−) for negative numbers, not ASCII hyphen-minus.
