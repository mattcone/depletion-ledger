---
title: "Model Card"
description: "How the depletion model works, in plain language: what question it answers, where every number comes from, the three possible futures and their odds, the reserve's four floors, and what the model can't do."
---

## It answers one question, every week: how long does the oil last?

This is a stress test, not a crystal ball. The model doesn't try to predict what happens next. It asks a different question: *if each possible future keeps going, how long do the world's oil buffers — the Strategic Petroleum Reserve (SPR) and the commercial stocks in the US, Europe, and Asia — last?* Every week, when the new official data lands, the question gets re-answered with fresh numbers.

A word on units: amounts are in **barrels** (one barrel is about 42 US gallons, 159 liters), and "M b/d" means millions of barrels per day. The SPR held about 415 million barrels before the war; it holds 287 million in the latest report.

## Six official data feeds — no crystal balls

Everything that goes into the model is a published, checkable number:

| What it tells us | Who publishes it | How often |
|---|---|---|
| How much oil is in the SPR | the US Energy Information Administration (EIA) | every Wednesday |
| Commercial oil stocks in the US and Europe | the EIA, and the reserve's operating agency (GEF) | weekly |
| How many tankers actually get through the Strait of Hormuz | PortWatch / Kpler (satellite ship-tracking data) | weekly |
| What OPEC's countries are actually producing | OPEC | monthly |
| Refinery strikes and export bans (Russia, Saudi Arabia) | government statements, military announcements, news reports | daily |
| Oil and fuel prices | the exchanges; AAA at US pumps | daily |

Rumours, anonymous sources, and private estimates are logged as unverified and never enter the math.

## Three futures, one most likely: the corridor lapses

The possible futures are compressed into three paths, each with an odds figure. The dashboard's "Likely outcomes" section shows how the odds have moved over time.

| Future | Odds (Sep 11) | What it looks like | What it does to the reserve |
|---|---|---|---|
| The corridor holds | 10% | the tanker-corridor deal works, traffic through the strait normalizes | drains slowly: 0.45M b/d |
| The standoff | 40% | the status quo: the corridor barely works, attacks continue on both sides, the Saudi bypass pipeline is struck but restarts | drains at 0.70M b/d — the 250M floor around Oct 19 |
| **The corridor lapses (most likely)** | **50%** | the deal breaks or is attacked, the strait is effectively closed, the bypass stays shut | drains at ~1.35M b/d — the 250M floor around Sep 24, the 180M floor by mid-November |

*The odds moved Sep 9 → Sep 11 (10/50/40 → 10/40/50) when Saudi Arabia suspended the East–West pipeline after attacks on it: the bypass was the element keeping the "degraded, not closed" state alive. The move carries an explicit reversion — an official restart sends the odds back.*

## The reserve has four floors — and we're already below the first

The SPR is not a normal tank. It is a system of salt caverns with engineering limits: levels below which the oil simply cannot be pumped out, or cannot be pumped reliably. Think of them as a series of thresholds rather than one bottom:

| Floor | Level | What it means | When, on the most likely path |
|---|---|---|---|
| 1 | ~300M bbl | some caverns below this level can no longer pump | **already breached (Aug 14)** |
| 2 | 250M bbl | the operational minimum the reserve's operators cite | around Sep 24, 2026 |
| 3 | 180M bbl | the hard operable limit | around Nov 14, 2026 |
| 4 | 70M bbl | the absolute safe minimum set by the US Department of Energy | early January 2027 — the draw pins at the floor there |

When the reserve reaches a floor, it stops being a source of supply. The shortfall doesn't disappear — it moves onto consumers, as higher prices and tighter fuel.

## The odds only move on pre-decided events

Odds are the most subjective part of any model, so this one has a hard rule: **the three probabilities change only when a pre-decided, structural event happens** — not when the news cycle heats up. Recent events that did move the odds: the corridor deal was announced (and the ship-tracking data showed it wasn't working), the first missile strike on a base in a third country (Sep 9: 15/55/30 → 10/50/40), and on Sep 11 the suspension of Saudi Arabia's East–West pipeline after attacks on it — the bypass was the load-bearing element of the standoff path, so its going dark moved the odds from 10/50/40 to 10/40/50, with a pre-declared reversion to the old weights if the line restarts. Weekly wobbles in prices or traffic move the *dates*, not the *odds*.

The pre-decided triggers, as of Sep 11:

| If this happens | Weight moves |
|---|---|
| A verified corridor re-opening (IMO filing, sustained transits ≥40% of the 85/day baseline for two consecutive weeks), or a durable ceasefire | toward *holds* |
| An official ESPO restart, or a damage assessment finding the line repairable in days | back to *standoff* — the reversion clause on the Sep 11 move |
| Tanker losses above ~15/week · a Jazan or Abqaiq restart slipping · the ESPO suspension persisting past the Sep 16 print · a damage assessment calling for weeks · the Russia product-ban expiry on Sep 30 · a widening EIA–market spread · an adverse Polymarket settlement on Sep 14 or 30 | toward *lapses* |

The slowest trigger is the EIA–market spread: the EIA's own outlook still sees ~$90 for late 2026 while spot Brent settled at $104.61 on Sep 11. A gap beyond ~$10–15 means the market is pricing lapse above 40%; the gap is now ~$15 — at the edge of the band.

Between regime events, the weights hold — a quiet week is not evidence.

And to remove any doubt about where the numbers come from: **the three probabilities are judgment weights, set and updated by the rule above — no program produces them.** The statistical machinery (Poisson for tanker transits, normal distributions for demand) computes *dates and levels from rates* — days to a floor, barrels drawn by a date — it never outputs a probability. A statistical cross-check (the odds filter below) runs alongside the judgment on the same public data and is published with each update as a check on the process — never as the source of the numbers.

The model also keeps a scorecard: every prediction is written down with a date and a probability, and when the date passes the prediction is graded against what actually happened. That is how we find out whether the odds are getting better or worse. The first batch is due at the end of September — Russia's diesel export ban, a prediction market that had priced the same outcome, and the Fed's Sep 16 decision, which futures priced at ~86% for a 25bp hike against 62% on Polymarket (Sep 11).

## The hand math runs through four small programs

The calculations are done by four small, auditable programs (plain Python, no libraries):

| Program | What it does | When it runs |
|---|---|---|
| The runway calculator | recomputes the days to each floor at the current draw rate | every Wednesday, with the EIA report |
| The price-and-demand check | estimates how much high prices shrink demand, so the draw is never double-counted | monthly, with each price print |
| The odds cross-check | a three-state filter on transit counts, tanker losses, and Brent outputs horizon weights as a check on the judgment, never the source of it | every daily pass, with the transit data |
| The scorecard | grades the model's past predictions against what actually happened | whenever a prediction comes due |

The programs don't make the judgment calls. They make the hand math checkable, repeatable, and visibly wrong when it is wrong.

## What this model can't do

- **It's a stress test, not a forecast.** It answers "how long under future X", not "which future happens".
- **It was built by a coding agent, not an energy analyst.** Every figure on the public page cites its source; for anything load-bearing, check the underlying reports (EIA, IEA, OPEC, IMO).
- **It lags the news.** The core data is weekly, so a fast-moving week can outrun the model by up to two weeks.
- **It assumes the buffer is the reserve and commercial stocks.** If governments start rationing early, consumers will feel it before the dates above.
- **Three futures are the three main paths.** The world can always do a fourth thing.

## It updates when the official data does

- **Every Wednesday** — the EIA weekly report (SPR level, US stocks). The dashboard and the dates on this page are updated in the same pass.
- **Monthly** — OPEC output, and the EIA's price outlook.
- **Daily** — tanker traffic, strikes, and bans are logged every day; the *odds* only move on the pre-decided events above.

That's the model: six official data feeds, three futures with odds that only move on pre-decided events, four floors marking the reserve's exhaustion, and a scorecard that grades its own calls.
