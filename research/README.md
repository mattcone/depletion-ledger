# Research

The working research project behind the [Depletion Ledger](https://oil-report.me-fce.workers.dev/).
Day 1 of the project was the Jun 30, 2026 model of US/Europe oil inventory
depletion under the Hormuz closure.

## Files

| File | What it is |
|---|---|
| [SUMMARY.md](SUMMARY.md) | **Start here.** Living summary — ~2-minute read of where things stand. Updated at the end of every research pass. |
| [Oil-Depletion-Report.md](Oil-Depletion-Report.md) | The main report — full analysis, stacked update banners (newest first), depletion timelines, sources & caveats. The working canonical document. |
| [MODEL.md](MODEL.md) | The public model card, written for a general audience: what the model answers, the data feeds, the three futures and odds, the reserve's four floors, how odds change, limitations, update cadence. Synced to the site's [`/model/`](https://oil-report.me-fce.workers.dev/model/) at build time. |
| [MODEL-internal.md](MODEL-internal.md) | Technical model specification + working instructions (inputs, formulas, branch weights, floors, breaking points, calibration, update procedure). Source of record for the public card. |
| [Oil-Crisis-Plain-Summary.md](Oil-Crisis-Plain-Summary.md) | Plain-language summary for non-readers. |
| [Oil-Report-Index.md](Oil-Report-Index.md) | Old hub/index page, kept in case a hub is wanted again. |
| [API-RECIPES.md](API-RECIPES.md) | Verified copy-paste recipes for the EIA + BLS data APIs and the AAA retail pull (keys as git-ignored `.eia_api_key` / `.bls_api_key` at the repo root, series IDs, gotchas). Every command was executed before landing here. |
| [model/](model/) | Stdlib-only Python 3 helpers that formalize the hand math: price-triggered SPR draw rate + runway, elasticity-driven demand destruction, Bayesian branch reweighting + Brier-score calibration ledger (`calibration.csv`). See [model/README.md](model/README.md). |
| [logs/](logs/) | Dated research logs, one per pass (`YYYY-MM-DD.md`). New data points land here first, with sources; unverified items are flagged and never promoted to SUMMARY until verified. `2026-09-09_literature.md` is the literature/algorithm survey for model improvement. |

## How a research pass works

1. Pull data (EIA WPSR weekly, traffic counts, prices, strikes/bans, prediction
   markets — see MODEL.md).
2. Log everything new in `logs/<today>.md` with sources.
3. Update SUMMARY.md. Regime changes also get a banner in the main report.
4. Branch reweighting only on regime events, not weekly noise.
5. Update `../site/src/data/crisis.ts` with the new chart data, then
   `npm run deploy` in `../site/` — the model card page re-syncs from this
   directory automatically.

## Timeline (retrospective — distilled from the report's banners)

Dated research logs formally begin Sep 9, 2026. Everything before that was worked
up directly into the report and backfilled Sep 9 into dated `logs/` files (Jun 30
original model · Aug 19–Sep 2 deep dive · Aug 29 · Aug 30 · Sep 2 · Sep 6 · Sep 7 ·
Sep 8). The banners below are the compressed history.

| Date | Day | Event |
|---|---|---|
| Jun 30 | 1 | Original model: US/Europe depletion under Hormuz closure. Key call: ~3 weeks to the SPR cavern floor. |
| Aug 29 | 181 | SPR inside the ~300M cavern floor (289.7M, lowest since Dec 1982). Base case shifts from "deal and recovery" to "standoff"; Europe's winter cliff becomes the central scenario. Brent $88 identified as a false signal — product, not crude, is scarce. |
| Aug 30 | 182 | **Dual chokepoint + refinery front:** Red Sea/Bab el-Mandeb flow 2.4M→64K bpd; Russian refineries at record strike pace with ban cascade dated (Sep 30 / Nov 30 / Jan 31). Asia identified as the most exposed region; Australia loses excise relief. |
| Aug 19 – Sep 2 | — | 14-day deep dive: product-record inventories, war-risk insurance breakdown (LMA toll clause), Russian domestic rationing, GEF/EIA/IEA/OPEC contradictions, the corridor deal's structural fragility. |
| Sep 2 | 184 | **Corridor claims don't survive AIS data** (PortWatch: 6 transits = 7% of normal vs claimed 8.6–10M bpd); "tanker for tanker" US policy begins. §11 added: the status quo is a path of ten dated breaking points, all inside 12 months. §11B: the food/fertiliser second-order shock lands 12–18 months later, on top of the terminal state. The Russia→Europe hybrid front enters as the undated 11th breaking point. |
| Sep 7 | 189/191 | **Tanker war begins** (US destroys/disables Iranian tankers; IRGC missiles hit a US carrier and destroyer); OPEC+ pauses four consecutive hikes (Oct flat 31.01M bpd); US retail diesel all-time record ($5.90). Base case hardens; escalation tail widens. |
| Sep 8 | 192 | **Red Sea front moves from shipping to processing:** Houthi strikes put Aramco's Jazan refinery (~400 kb/d) off line + Abha, Najran, King Khalid Air Base. OPEC August output −900K bpd to 19.91M. Iran's "exclusion zone" announced-but-not-in-force. Escalation changes the pace, not the sequence — breaking points compressed ~2–6 weeks earlier. |
| Sep 9 | 193 | Dated research logs begin. **Regime event:** 10 Iranian tankers gone in a week (US published exchange rate: 3 tankers per 2 warships targeted); 20 Iranian missiles on a US base in Jordan (first third-country strike); exclusion zone enforced before declared; Oman safe-corridor talks at "final stage" (IMO filing unverified); Jazan re-hit (offline since at least late July); Novorossiysk export terminal hit. **Brent >$100 (first since Jul 24)**. **STEO: 2H26 ~$90, 2027 $74 (from $69), ME < pre-conflict until 2Q27** (inputs froze Sep 3 — the ~Oct 7 STEO is the next real signal). Branch weights: holds 15→10%, standoff ~50%, lapses 30→40%. |
