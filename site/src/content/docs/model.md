---
title: "How the Model Works"
description: "How the Depletion Ledger models changes in global oil storage: three shipping scenarios, their assumptions, and how the predictions are checked."
---

> **Why we changed the model.** Earlier versions projected withdrawals from the US Strategic Petroleum Reserve (SPR) as if it would automatically make up for missing supply. That was our mistake. SPR releases depend on government decisions, contracts, and delivery schedules. We've removed those projections. The model now uses oil production and consumption to calculate how storage could change worldwide. We still track the SPR's reported levels.

## What the model tells you

The model asks how oil in storage could change if shipping recovers, the standoff continues, or the disruption gets worse. For each outcome, we make assumptions about how much oil the world produces and uses. If consumption exceeds production, the difference has to come from storage. If production exceeds consumption, stocks can build.

Each line shows what would happen if that scenario's assumptions held. We start with published data and an agency forecast, which we call the *baseline*, then adjust it for each scenario. We haven't fitted the lines to past changes in storage during this crisis, and we don't yet know how accurate they'll be.

The model covers crude oil and refined fuels around the world. It doesn't tell you how much usable fuel can reach a particular country or when the world would run out. That also depends on whether refineries can process the available crude, whether fuel can be transported, and whether stored oil can be released.

## How to read the chart

On the dashboard, all three lines start at **zero in August 2026**. Values below zero mean less oil in storage than in August; values above zero mean more. A rising line shows stocks rebuilding, even if they're still below the August level. Zero doesn't mean empty tanks.

The detailed tables below count changes since the end of February 2026. They start with the International Energy Agency's (IEA) reported loss of **507 million barrels by the end of August**. The “cumulative” column adds each month's change to that running total. The dashboard removes the loss through August from the displayed figures, so you can see what happens after that month.

The IEA's reported total includes oil held by governments and companies, as well as oil on ships. The projections use production and consumption figures from the US Energy Information Administration (EIA), which cover more than the stocks the IEA tracks. We use the same starting point to compare the lines, but the agencies' figures still measure different things.

Oil is measured in **barrels**. One barrel holds about 42 US gallons, or 159 liters. **M b/d** means millions of barrels per day.

## How the paths are calculated

The baseline is the EIA's **Short-Term Energy Outlook (STEO), released September 9, 2026**. It forecasts monthly world production and consumption through December 2027. For each scenario, we adjust those figures using the assumptions explained below.

For each month:

1. Add the scenario's production adjustment to EIA production.
2. Add the scenario's consumption adjustment to EIA consumption.
3. Subtract consumption from production and multiply by the number of days in the month. Add that change to the previous month's total.

The EIA forecast already assumes some Gulf production resumes. Each scenario's adjustments need to account for that recovery. We also avoid subtracting a production loss that's already included in the EIA forecast.

Moving oil from a government reserve to commercial storage leaves the combined amount unchanged. We don't count that transfer as new production or as a loss from global storage.

<details>
<summary>What the EIA baseline assumes</summary>

The September outlook expects Middle East production to rise as more oil passes through Hormuz and alternative routes. It estimates that disruptions prevented production of 6.7 million barrels a day in August. It expects that lost production to average 6.2 million in the third quarter, 5.7 million in the fourth, and 2.7 million in the first quarter of 2027. Most of the affected production is expected to resume in the second half of 2027.

The outlook was published before the East–West pipeline was suspended on September 11 and loadings at Yanbu stopped on September 16. Our scenario assumptions account for those events and the recovery already included in the EIA forecast. Reuters reported on September 22 that the pipeline had restarted at a reduced rate. We haven't updated the storage projections to reflect that report.

The September 19 assumptions file lists the saved EIA workbook, source excerpts, and model inputs. See [Calculation files and checks](#how-we-check-the-predictions) below.

</details>

## What each scenario assumes

A *corridor* is an agreed shipping route through the Strait of Hormuz. We assign probabilities to three possible outcomes and calculate how storage could change under each one. **The percentages show how likely we consider each outcome.** They don't change the calculations for each line or tell you how accurate its numbers will be.

| Scenario | Odds (Sep 22) | What happens |
|---|---|---|
| The corridor holds | 10% | The shipping agreement works and tanker traffic returns to normal. |
| The standoff continues | 40% | The corridor barely works, attacks continue, and the damaged Saudi bypass pipeline operates at a reduced rate. |
| The corridor lapses | 50% | The agreement breaks down or comes under attack, the strait is effectively closed, and the bypass stays shut. |

The assumptions below were published on September 19. You can expand each table to see the monthly calculations. **P** means production, **C** means consumption, and **Δ** means an adjustment to the EIA baseline. Daily figures are in millions of barrels per day; cumulative figures show the total change in millions of barrels since the end of February 2026. We round the figures for display, so they may not add up exactly.

### The corridor holds

In this scenario, tanker traffic returns to normal over one to two quarters. Production recovers roughly a quarter earlier than the EIA expects. We add as much as 2 million barrels a day to the EIA forecast in December 2026, then reduce that addition to zero by May 2027 as the EIA's forecast production catches up.

We assume consumption is 0.25 million barrels a day above the EIA forecast through March 2027, then follows it. Under these assumptions, stocks begin rebuilding in December 2026. By December 2027, storage is **1,228.6 million barrels above its end-of-February 2026 level**, about 250 million above the EIA projection.

<details>
<summary>Monthly calculations: corridor holds</summary>

<!-- SCENARIO_TABLE:BEGIN corridor-holds -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Sep 2026 | 99.41 | +0.50 | 99.91 | 104.21 | +0.25 | 104.46 | -4.55 | 30 | -643.4 |
| Oct 2026 | 100.56 | +1.00 | 101.56 | 102.99 | +0.25 | 103.24 | -1.68 | 31 | -695.5 |
| Nov 2026 | 102.27 | +1.50 | 103.77 | 103.74 | +0.25 | 103.99 | -0.22 | 30 | -702.1 |
| Dec 2026 | 103.64 | +2.00 | 105.64 | 104.86 | +0.25 | 105.11 | +0.52 | 31 | -685.9 |
| Jan 2027 | 104.96 | +2.00 | 106.96 | 102.38 | +0.25 | 102.63 | +4.34 | 31 | -551.4 |
| Feb 2027 | 106.46 | +1.50 | 107.96 | 104.66 | +0.25 | 104.91 | +3.06 | 28 | -465.8 |
| Mar 2027 | 108.00 | +1.00 | 109.00 | 103.48 | +0.25 | 103.73 | +5.27 | 31 | -302.4 |
| Apr 2027 | 109.59 | +0.50 | 110.09 | 104.36 | +0.00 | 104.36 | +5.73 | 30 | -130.4 |
| May 2027 | 110.25 | +0.00 | 110.25 | 104.52 | +0.00 | 104.52 | +5.73 | 31 | +47.2 |
| Jun 2027 | 110.29 | +0.00 | 110.29 | 106.12 | +0.00 | 106.12 | +4.17 | 30 | +172.4 |
| Jul 2027 | 110.96 | +0.00 | 110.96 | 105.83 | +0.00 | 105.83 | +5.13 | 31 | +331.4 |
| Aug 2027 | 111.07 | +0.00 | 111.07 | 105.74 | +0.00 | 105.74 | +5.33 | 31 | +496.7 |
| Sep 2027 | 111.09 | +0.00 | 111.09 | 105.87 | +0.00 | 105.87 | +5.22 | 30 | +653.3 |
| Oct 2027 | 111.68 | +0.00 | 111.68 | 104.71 | +0.00 | 104.71 | +6.97 | 31 | +869.4 |
| Nov 2027 | 112.14 | +0.00 | 112.14 | 105.49 | +0.00 | 105.49 | +6.65 | 30 | +1,068.8 |
| Dec 2027 | 111.82 | +0.00 | 111.82 | 106.67 | +0.00 | 106.67 | +5.15 | 31 | +1,228.6 |
<!-- SCENARIO_TABLE:END corridor-holds -->

</details>

### The standoff continues

In this scenario, fighting continues and the bypass carries much less oil than before the shutdown. **We assume Gulf production stays at the same level.** We set world production at 100.5 million barrels a day through the end of 2026, assuming alternative shipping routes make up for the September disruptions. That's a level we've chosen for the scenario, not a reported figure.

For 2027, we assume production outside the Gulf increases by 0.5 million barrels a day each quarter. World production reaches 102.5 million barrels a day in December, 9.3 million below the EIA forecast.

We set consumption below the EIA forecast by 0.5 million barrels a day through 2026, 1.0 million in the first half of 2027, and 0.5 million in the second half. Those reductions are fixed in advance. The model doesn't reduce consumption further as stocks fall.

Consumption exceeds production in every month of this scenario. By December 2027, storage is **1,832.6 million barrels below its end-of-February 2026 level**.

<details>
<summary>Monthly calculations: standoff</summary>

<!-- SCENARIO_TABLE:BEGIN standoff -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Sep 2026 | 99.41 | +1.09 | 100.50 | 104.21 | -0.50 | 103.71 | -3.21 | 30 | -603.3 |
| Oct 2026 | 100.56 | -0.06 | 100.50 | 102.99 | -0.50 | 102.49 | -1.99 | 31 | -664.9 |
| Nov 2026 | 102.27 | -1.77 | 100.50 | 103.74 | -0.50 | 103.24 | -2.74 | 30 | -747.0 |
| Dec 2026 | 103.64 | -3.14 | 100.50 | 104.86 | -0.50 | 104.36 | -3.86 | 31 | -866.8 |
| Jan 2027 | 104.96 | -4.30 | 100.67 | 102.38 | -1.00 | 101.38 | -0.71 | 31 | -888.8 |
| Feb 2027 | 106.46 | -5.63 | 100.83 | 104.66 | -1.00 | 103.66 | -2.82 | 28 | -967.9 |
| Mar 2027 | 108.00 | -7.00 | 101.00 | 103.48 | -1.00 | 102.48 | -1.48 | 31 | -1,013.6 |
| Apr 2027 | 109.59 | -8.42 | 101.17 | 104.36 | -1.00 | 103.36 | -2.19 | 30 | -1,079.3 |
| May 2027 | 110.25 | -8.91 | 101.33 | 104.52 | -1.00 | 103.52 | -2.18 | 31 | -1,146.9 |
| Jun 2027 | 110.29 | -8.79 | 101.50 | 106.12 | -1.00 | 105.12 | -3.62 | 30 | -1,255.5 |
| Jul 2027 | 110.96 | -9.29 | 101.67 | 105.83 | -0.50 | 105.33 | -3.66 | 31 | -1,369.0 |
| Aug 2027 | 111.07 | -9.24 | 101.83 | 105.74 | -0.50 | 105.24 | -3.40 | 31 | -1,474.5 |
| Sep 2027 | 111.09 | -9.09 | 102.00 | 105.87 | -0.50 | 105.37 | -3.37 | 30 | -1,575.7 |
| Oct 2027 | 111.68 | -9.51 | 102.17 | 104.71 | -0.50 | 104.21 | -2.05 | 31 | -1,639.1 |
| Nov 2027 | 112.14 | -9.81 | 102.33 | 105.49 | -0.50 | 104.99 | -2.66 | 30 | -1,718.9 |
| Dec 2027 | 111.82 | -9.32 | 102.50 | 106.67 | -0.50 | 106.17 | -3.67 | 31 | -1,832.6 |
<!-- SCENARIO_TABLE:END standoff -->

</details>

<details>
<summary>Why the standoff path changed</summary>

The earlier version assumed production would rise in 2027 without clearly explaining how that supply would return while the standoff continued. On September 19, we replaced that assumption with the ones above. The December 2027 total is now about 963 million barrels lower than the previous projection of −869.8 million. We've kept the earlier predictions unchanged so we can check them against what happens.

**Correction (September 19):** Our explanation of the standoff assumptions got three things wrong:

- The EIA's September 9 forecast couldn't account for the September 11–16 disruptions. We assume alternative routes make up for them; the EIA didn't establish that.
- Production isn't below the EIA forecast in every month. It's 1.09 million barrels a day above it in September 2026 and 0.06 million below it in October, then stays below it.
- The three scenarios use different consumption assumptions, not identical ones.

We've corrected the explanation without changing the calculations. We've kept the original saved record unchanged so readers can check what we published.

</details>

### The corridor lapses

In this scenario, the shipping agreement fails and the disruption continues. More production is lost than the EIA forecast assumes. By early 2027, we assume the disruption prevents production of about 16.2 million barrels a day in the Gulf.

We keep that production loss unchanged through December 2027. As more Gulf production returns in the EIA forecast, we subtract more from it to represent a continued closure. We set consumption 3 million barrels a day below the EIA forecast through 2026 and 5 million below it throughout 2027.

By December 2027, storage is **3,495.4 million barrels below its end-of-February 2026 level**. That would require about 2,990 million barrels of additional withdrawals after August. We don't know whether that much oil could be withdrawn. The line adds up the monthly shortages; it doesn't show whether enough oil would be available to cover them through December 2027.

<details>
<summary>Monthly calculations: corridor lapses</summary>

<!-- SCENARIO_TABLE:BEGIN corridor-lapses -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Sep 2026 | 99.41 | -6.00 | 93.41 | 104.21 | -3.00 | 101.21 | -7.80 | 30 | -740.9 |
| Oct 2026 | 100.56 | -9.00 | 91.56 | 102.99 | -3.00 | 99.99 | -8.43 | 31 | -1,002.3 |
| Nov 2026 | 102.27 | -12.00 | 90.27 | 103.74 | -3.00 | 100.74 | -10.47 | 30 | -1,316.4 |
| Dec 2026 | 103.64 | -13.50 | 90.14 | 104.86 | -3.00 | 101.86 | -11.73 | 31 | -1,679.9 |
| Jan 2027 | 104.96 | -13.50 | 91.46 | 102.38 | -5.00 | 97.38 | -5.91 | 31 | -1,863.1 |
| Feb 2027 | 106.46 | -13.50 | 92.96 | 104.66 | -5.00 | 99.66 | -6.69 | 28 | -2,050.5 |
| Mar 2027 | 108.00 | -13.50 | 94.50 | 103.48 | -5.00 | 98.48 | -3.98 | 31 | -2,173.9 |
| Apr 2027 | 109.59 | -13.50 | 96.09 | 104.36 | -5.00 | 99.36 | -3.27 | 30 | -2,271.9 |
| May 2027 | 110.25 | -13.50 | 96.75 | 104.52 | -5.00 | 99.52 | -2.77 | 31 | -2,357.8 |
| Jun 2027 | 110.29 | -13.50 | 96.79 | 106.12 | -5.00 | 101.12 | -4.33 | 30 | -2,487.6 |
| Jul 2027 | 110.96 | -16.22 | 94.74 | 105.83 | -5.00 | 100.83 | -6.09 | 31 | -2,676.3 |
| Aug 2027 | 111.07 | -16.22 | 94.85 | 105.74 | -5.00 | 100.74 | -5.88 | 31 | -2,858.7 |
| Sep 2027 | 111.09 | -16.22 | 94.88 | 105.87 | -5.00 | 100.87 | -6.00 | 30 | -3,038.6 |
| Oct 2027 | 111.68 | -16.22 | 95.46 | 104.71 | -5.00 | 99.71 | -4.25 | 31 | -3,170.3 |
| Nov 2027 | 112.14 | -16.22 | 95.92 | 105.49 | -5.00 | 100.49 | -4.57 | 30 | -3,307.4 |
| Dec 2027 | 111.82 | -16.22 | 95.61 | 106.67 | -5.00 | 101.67 | -6.06 | 31 | -3,495.4 |
<!-- SCENARIO_TABLE:END corridor-lapses -->

</details>

<details>
<summary>How the extended closure is calculated</summary>

The version published on September 17 stopped at February 2027, with a total change of −2,050.5 million barrels. On September 18, we extended the calculation through December 2027. The monthly predictions through February stayed the same.

We assume the Gulf loses 16.217 million barrels a day of production in total. That includes the 2.717 million loss already in the EIA's first-quarter forecast, plus the scenario's additional 13.5 million. For March–June, we keep the loss attributed to the EIA baseline at 2.717 million, then set it to zero from July. We chose that monthly schedule to do the calculation. The EIA describes a recovery in the second half of 2027 but doesn't publish this schedule.

We therefore subtract 13.5 million barrels a day from EIA production through June and 16.217 million from July. If we kept subtracting the same amount, the scenario would gradually recover along with the EIA forecast, even though we meant to model a continued closure.

</details>

## What the model leaves out

**People could use less oil than we assume.** Higher prices, rationing, or a slower economy could bring consumption closer to production. Each scenario already assumes some change in consumption, but the model doesn't calculate further reductions as stocks fall. This matters most if the closure lasts a long time.

**Stored oil isn't all usable fuel.** Crude stocks can rise while diesel becomes scarce if refineries can't process the available crude. The model counts crude and refined fuels together. It doesn't calculate how much fuel refineries can make or how much can reach the people who need it.

**We can't say when the world would run out.** We don't know how much of the oil in storage can be withdrawn, and some is needed to keep pipelines and other facilities operating. The SPR's operating limits apply to that reserve. They don't tell us the minimum amount the world needs in storage, and neither does a past low in one group of countries.

**Three scenarios can't cover everything.** The war could develop in ways we haven't considered. We built the model with help from an AI coding tool. It wasn't developed by an energy analyst, and we've made the sources and calculations public so you can check them.

<details>
<summary>How much the assumptions can change the result</summary>

- Changing standoff production by 2 million barrels a day throughout 2027 changes the year-end total by 730 million barrels, if consumption stays the same. A 1 million barrel daily change in consumption moves the total in the opposite direction by about 180 million barrels over half a year.
- Ending the closure after November 2026 and returning both production and consumption to the EIA baseline gives about −1,224 million barrels by February 2027, compared with −2,051 million under continued closure. That's an 827 million barrel difference at the same date.
- If we assume production in the EIA baseline fully recovers in April rather than July, the continued-closure calculation gives −3,742.6 million barrels by December 2027, about 247 million lower. To keep the scenario's total production loss unchanged, we then have to subtract more from the baseline during April–June.

These examples show how much the result changes when we change an assumption. We haven't assigned probabilities to them.

</details>

## How the odds change

We assign the odds using judgment. To keep our decisions consistent, we list the events that would prompt a change in advance. The odds change when one of those events affects supply or shipping. A quiet week or a price move alone isn't enough.

The September 11 pipeline suspension moved the odds from 10/50/40 to 10/40/50. The September 16 update, after Yanbu loadings stopped, moved them to 10/35/55. We returned the odds to 10/40/50 on September 22, after Reuters reported that the pipeline had restarted and the first cargo at Yanbu was scheduled to load that day. The dashboard shows the history in “The model's odds for each outcome.”

<details>
<summary>Events that would prompt a change</summary>

These rules were recorded as of September 16; the Yanbu rule was applied on September 22:

| Event | Effect on the odds |
|---|---|
| A verified reopening, supported by an International Maritime Organization (IMO) filing and tanker traffic at or above 40% of the 85-per-day baseline for two consecutive weeks, or a durable ceasefire. | Increases the odds that the corridor holds. |
| A rapid resumption of Yanbu loadings. | Returns the odds to 10/40/50. |
| An official restart of the East–West pipeline, or an assessment that repairs would take only days. | Reverses both September changes, returning the odds to 10/50/40. |
| Tanker losses above about 15 per week; delays restarting Jazan or Abqaiq; the pipeline remaining suspended past the September 16 report; or a damage assessment calling for weeks of repairs. | Increases the odds that the corridor lapses. |
| Russia's September 30 fuel-ban decision; a widening gap between the EIA price outlook and market prices; or an adverse prediction-market result on September 14 or 30. | Could increase the odds that the corridor lapses. |
| The Houthis blocking or attacking non-Saudi vessels in the Bab el-Mandeb, leaving both shipping routes closed. | Increases the odds that the corridor lapses. |

A direct US strike on the Houthis would also prompt us to review the odds. How we'd change them would depend on what happened. The dated [research logs](https://github.com/mattcone/depletion-ledger/tree/main/research/logs) explain each decision, including cases where reports disagreed or the news didn't change the odds.

</details>

## How we check the predictions

You can compare the scenarios with the **EIA forecast**, without our adjustments, or with **Recent trend** on the dashboard. Recent trend repeats the average of the IEA's June–August monthly changes: −143 million barrels divided by three, or about −47.7 million each month. It shows what would happen if that pace continued. This simple comparison is also called a *persistence baseline*.

We save each prediction before the result is known. As the IEA reports new figures, we check how far off each prediction was, in millions of barrels. We score the monthly change and the running total separately, using the first figure the IEA publishes for each. If the IEA later revises a figure, we record the revision and keep the original score.

Comparing errors over the same months helps us see whether the model does better than simply repeating the recent trend. Each scenario assumes different events, though. Picking whichever line came closest after seeing the result doesn't show that we could predict it in advance.

A change in total storage also can't tell us whether we got production or consumption wrong. Errors in the two can cancel each other out. And because the EIA and IEA measure different things, part of the difference may come from their data rather than the model.

The separate scorecard checks predictions about whether an event happens by a given date, such as a shipping recovery or an export-ban decision. Getting those predictions right doesn't tell us whether the storage calculations are accurate.

<details>
<summary>Calculation files and checks</summary>

The file `research/sources/world-stocks-assumptions-v2026-09-19.json` contains the assumptions used for the current chart. Each older prediction has its own saved assumptions, EIA workbook, and reported starting value. We keep those records unchanged when we update the model or receive new data.

`research/scoring/regen-scenarios.py` calculates the monthly tables, chart lines, and saved predictions from the same inputs. Its `--check` command recalculates every version using its saved inputs. It also checks that the displayed tables and lines match the newest version. The script's tests check that it catches altered records and accepts valid updates.

When we change the assumptions, we save a new dated copy along with new predictions. We keep the previous predictions so we can score them later. `research/scoring/score-forecasts.py` compares each prediction with the first reported result and records revisions separately. The example data used to test the script is made up, not observed.

The source files, scripts, and update instructions are in the [repository](https://github.com/mattcone/depletion-ledger).

</details>

## Where the data comes from

| Information | Source | Publication schedule |
|---|---|---|
| World production and consumption forecasts | EIA Short-Term Energy Outlook | Monthly |
| Company and government oil stocks in OECD countries | EIA international data | Monthly |
| Observed global stock changes and commercial stocks in OECD countries | IEA Oil Market Report | Monthly; public detail varies by release |
| US commercial stocks, SPR levels, and refinery activity | EIA weekly petroleum reports | Weekly |
| Oil production by OPEC countries | OPEC | Monthly |
| Tanker traffic, attacks, and shipping restrictions | PortWatch, Kpler, official statements, and dated news reports | Reviewed daily |
| Oil and fuel prices | Exchanges and AAA | Daily |

OECD stands for the Organisation for Economic Co-operation and Development. Its member countries hold only some of the world's oil stocks. The source notes tell you which figures are reported, estimated, or assumed for the model. We keep unverified reports in the research notes.

We update the US inventory charts with the weekly EIA report. The monthly EIA and IEA reports give us new forecasts and observations to check against the global projections. When we change the assumptions, we publish a new version and keep the earlier predictions for scoring. Daily shipping news can change the odds when it meets the rules above.

## Where the SPR fits now

The dashboard still shows how much oil is in the SPR and how quickly it's being withdrawn. Those figures track what's happened to the reserve. They don't set the pace of withdrawals in the global scenarios.

**SPR withdrawals could pause even if the crisis continues.** A supply shortage doesn't automatically trigger a release. Oil leaves the reserve through Department of Energy contracts and scheduled deliveries, so the current pace might not continue. That's why we no longer project dates for reaching the reserve's operating limits.

Return to the [dashboard](/) to compare the paths and see the latest reported figures.
