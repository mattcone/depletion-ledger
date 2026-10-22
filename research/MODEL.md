> **October 21, 2026: we withdrew the storage scenarios.** We linked shipping conditions to particular production paths. The [Wall Street Journal](https://www.wsj.com/world/middle-east/more-oil-is-now-coming-out-of-the-persian-gulf-than-before-the-iran-war-6a6d1670), citing Kpler on October 20, reported regional oil flows above prewar levels despite continued attacks, using bypass routes, shuttle voyages, and offshore transfers. That recovery challenged our production assumptions for continued standoff. Exports alone do not establish production or a global surplus.

<span id="what-the-model-tells-you"></span>
<span id="how-to-read-the-chart"></span>

## How to read this archive

We published the original storage scenarios on September 19 (v1) and revised them on October 15 (v2). Each estimated what would happen under a chosen set of production and consumption assumptions. They were not fitted to this crisis's inventory history, and their accuracy is unproven.

The dashboard measures changes from **August 2026**, which is zero on its chart. Below zero means less oil in storage than in August; a rising line means stocks are rebuilding. Zero does not mean empty tanks. The archived v1 chart uses the same reference point. V2 starts at September's reported running total, **2 million barrels below the saved August value**.

The tables below measure changes from **the end of February 2026**. V1 starts at −507 million barrels in August; v2 starts at −509 million in September. For example, v2 standoff ends at −1,547.8 million barrels relative to February, or −1,040.8 million relative to August. These are the same projection measured from different dates.

The projections use the US Energy Information Administration's (EIA) production and consumption figures. We compare them with the International Energy Agency's (IEA) observed stocks, including oil held by companies, governments, and ships. The agencies' coverage differs; a shared starting point does not make their measures identical.

## The September 2026 audit

**The scenarios were less accurate than the recent-trend baseline in the first scored month.** September is scored against v1. The IEA's October 14 report put the monthly withdrawal at 10 million barrels. Its running total was 2 million below our frozen August value; revisions to earlier months account for the 8 million difference.

The EIA raised its September production estimate between its September 9 and October 6 releases, from 99.4 to 101.3 million barrels a day, while barely changing its consumption estimate. Both non-closure scenarios had assumed less production than the revised estimate. Separately, the IEA reported a sharp monthly increase in global supply. That is a different series and comparison, not confirmation of the EIA revision's magnitude.

For the standoff, the roughly 94-million-barrel miss separates into:

- **8.2 million barrels** between the projected balance and the EIA's revised September balance. Assumed production was 0.8 million barrels a day lower, partly offset by consumption that was 0.5 million lower.
- **78.1 million barrels** between the EIA's revised balance and the IEA's monthly stock change. We cannot yet separate coverage differences from estimation errors or other causes.
- **8.0 million barrels** from IEA revisions to earlier months, which affect the comparison against the frozen August value.

This reconciles the arithmetic, not the full cause of the miss. September did not establish that production would stay flat, that the EIA's future recovery would occur, or that the closure assumptions were right. The [research audit](https://github.com/mattcone/depletion-ledger/tree/main/research/audits) preserves the inputs and definitions.

<span id="how-we-check-the-predictions"></span>

### How scoring continues

We compare each saved prediction with the IEA's first reported monthly change and running total, scoring them separately in millions of barrels. Later revisions are recorded without changing the original score. V2 is scored from October, which was partly elapsed when issued; November is its first full future month.

The [scorecard and original chart](#forecast-results) show the results. The EIA's October 6 September estimate came after the month ended and is not an advance prediction. Recent trend repeats the IEA's June–August average monthly change: −143 million barrels divided by three, or about −47.7 million a month.

Comparing errors over the same months lets you check the scenarios against simpler alternatives. Choosing the closest scenario after seeing the result does not demonstrate forecasting skill. Inventory changes alone also cannot identify production and consumption errors, which can offset one another.

<span id="what-each-scenario-assumes"></span>

## October 15 assumptions (v2)

These are the **October 15 assumptions (v2), now withdrawn from the dashboard**. The original September 19 assumptions follow in a separate archive below. The scenario descriptions record our judgments at issue, including assumptions that later evidence challenged.

| Scenario | Recorded odds (Sep 29) | Shipping assumption at issue |
|---|---|---|
| The corridor holds | 10% | The shipping agreement works and tanker traffic returns to normal. |
| The standoff continues | 50% | Shipping remains restricted, attacks continue, and the repaired Saudi bypass pipeline operates at a reduced rate. |
| The corridor lapses | 40% | The agreement breaks down or comes under attack, the strait is effectively closed, and the bypass is shut for months. |

The probabilities did not change the individual storage calculations. They did not measure confidence in those calculations.

<span id="how-the-paths-are-calculated"></span>

### How the calculations work

V2 used the **EIA Short-Term Energy Outlook released October 6, 2026**; v1 used the September 9 release. For each month, we added a scenario adjustment to baseline production and consumption, then calculated:

**Monthly stock change = (production − consumption) × days in the month.**

Adding that change to the previous total gives the cumulative figure. The EIA baseline already included some Gulf production losses and recovery; scenario adjustments were additional changes, not a second subtraction of the same loss. Moving oil from government to commercial storage did not count as new production or a loss from combined stocks.

In the tables, **P** is production, **C** is consumption, and **Δ** is the adjustment to the EIA forecast. Daily figures are in **millions of barrels per day**. Cumulative figures are in **millions of barrels since the end of February 2026**. Rounding can prevent displayed figures from adding up exactly.

### The corridor holds

V2 followed EIA production and consumption month for month, removing v1's early-recovery adjustment and its additional 0.25 million barrels a day of consumption. This was a forward judgment, not evidence that the original forecast was right.

The path started at the IEA's observed September total. Its monthly balances therefore match the EIA comparison on the dashboard, but its cumulative totals differ because the EIA comparison keeps its original starting point. By December 2027, the scenario projected stocks **1,218.2 million barrels above February's level**.

<details>
<summary>Monthly calculations: corridor holds</summary>

<!-- SCENARIO_TABLE:BEGIN corridor-holds -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 | 102.10 | +0.00 | 102.10 | 102.78 | +0.00 | 102.78 | -0.67 | 31 | -529.8 |
| Nov 2026 | 103.09 | +0.00 | 103.09 | 103.56 | +0.00 | 103.56 | -0.47 | 30 | -543.9 |
| Dec 2026 | 103.71 | +0.00 | 103.71 | 104.63 | +0.00 | 104.63 | -0.93 | 31 | -572.6 |
| Jan 2027 | 104.76 | +0.00 | 104.76 | 101.98 | +0.00 | 101.98 | +2.78 | 31 | -486.4 |
| Feb 2027 | 106.32 | +0.00 | 106.32 | 104.30 | +0.00 | 104.30 | +2.01 | 28 | -430.1 |
| Mar 2027 | 107.27 | +0.00 | 107.27 | 103.08 | +0.00 | 103.08 | +4.19 | 31 | -300.3 |
| Apr 2027 | 108.57 | +0.00 | 108.57 | 103.98 | +0.00 | 103.98 | +4.59 | 30 | -162.7 |
| May 2027 | 109.84 | +0.00 | 109.84 | 104.12 | +0.00 | 104.12 | +5.72 | 31 | +14.6 |
| Jun 2027 | 110.23 | +0.00 | 110.23 | 105.71 | +0.00 | 105.71 | +4.52 | 30 | +150.2 |
| Jul 2027 | 110.75 | +0.00 | 110.75 | 105.60 | +0.00 | 105.60 | +5.15 | 31 | +309.9 |
| Aug 2027 | 110.90 | +0.00 | 110.90 | 105.43 | +0.00 | 105.43 | +5.47 | 31 | +479.4 |
| Sep 2027 | 111.10 | +0.00 | 111.10 | 105.57 | +0.00 | 105.57 | +5.53 | 30 | +645.3 |
| Oct 2027 | 111.36 | +0.00 | 111.36 | 104.41 | +0.00 | 104.41 | +6.94 | 31 | +860.6 |
| Nov 2027 | 111.82 | +0.00 | 111.82 | 105.23 | +0.00 | 105.23 | +6.59 | 30 | +1,058.2 |
| Dec 2027 | 111.49 | +0.00 | 111.49 | 106.33 | +0.00 | 106.33 | +5.16 | 31 | +1,218.2 |
<!-- SCENARIO_TABLE:END corridor-holds -->

</details>

### The standoff continues

V2 held world production at September's estimated **101.3 million barrels a day through 2026**, assuming no further net Gulf recovery. It added non-Gulf growth of 0.17 million barrels a day each month in 2027, or 0.5 per quarter. December production reached 103.3 million barrels a day, about 8.2 million below the EIA forecast.

Consumption followed the EIA forecast. We removed v1's consumption reductions because the EIA's small revision to September consumption did not support them. Extending that choice to future months remained a judgment.

Consumption exceeded production in every projected month. The December 2027 endpoint was **1,547.8 million barrels below February's level**.

The production assumption had a large effect. An illustration halfway between standoff production and the EIA baseline, with consumption unchanged, ended 2027 about 340 million barrels above August's level, compared with about 1,040 million below it for standoff. The illustration was not a forecast and did not establish the likely recovery rate.

<details>
<summary>Monthly calculations: standoff</summary>

<!-- SCENARIO_TABLE:BEGIN standoff -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 | 102.10 | -0.80 | 101.30 | 102.78 | +0.00 | 102.78 | -1.47 | 31 | -554.6 |
| Nov 2026 | 103.09 | -1.79 | 101.30 | 103.56 | +0.00 | 103.56 | -2.26 | 30 | -622.4 |
| Dec 2026 | 103.71 | -2.41 | 101.30 | 104.63 | +0.00 | 104.63 | -3.33 | 31 | -725.7 |
| Jan 2027 | 104.76 | -3.29 | 101.47 | 101.98 | +0.00 | 101.98 | -0.51 | 31 | -741.5 |
| Feb 2027 | 106.32 | -4.68 | 101.64 | 104.30 | +0.00 | 104.30 | -2.66 | 28 | -816.1 |
| Mar 2027 | 107.27 | -5.47 | 101.80 | 103.08 | +0.00 | 103.08 | -1.28 | 31 | -855.8 |
| Apr 2027 | 108.57 | -6.60 | 101.97 | 103.98 | +0.00 | 103.98 | -2.01 | 30 | -916.1 |
| May 2027 | 109.84 | -7.70 | 102.14 | 104.12 | +0.00 | 104.12 | -1.98 | 31 | -977.4 |
| Jun 2027 | 110.23 | -7.93 | 102.30 | 105.71 | +0.00 | 105.71 | -3.41 | 30 | -1,079.6 |
| Jul 2027 | 110.75 | -8.28 | 102.47 | 105.60 | +0.00 | 105.60 | -3.13 | 31 | -1,176.7 |
| Aug 2027 | 110.90 | -8.26 | 102.64 | 105.43 | +0.00 | 105.43 | -2.79 | 31 | -1,263.3 |
| Sep 2027 | 111.10 | -8.30 | 102.80 | 105.57 | +0.00 | 105.57 | -2.77 | 30 | -1,346.4 |
| Oct 2027 | 111.36 | -8.39 | 102.97 | 104.41 | +0.00 | 104.41 | -1.44 | 31 | -1,391.2 |
| Nov 2027 | 111.82 | -8.68 | 103.14 | 105.23 | +0.00 | 105.23 | -2.09 | 30 | -1,453.9 |
| Dec 2027 | 111.49 | -8.19 | 103.30 | 106.33 | +0.00 | 106.33 | -3.03 | 31 | -1,547.8 |
<!-- SCENARIO_TABLE:END standoff -->

</details>

### The corridor lapses

September did not test a full closure. V2 therefore carried v1's production and consumption adjustments onto the newer EIA baseline. Consumption was 3 million barrels a day below baseline through 2026 and 5 million below it throughout 2027.

The endpoint was **3,165.7 million barrels below February's level**, compared with v1's 3,495.4 million. The calculation added up monthly shortages; it did not establish that enough oil could be withdrawn to cover them.

<details>
<summary>Monthly calculations: corridor lapses</summary>

<!-- SCENARIO_TABLE:BEGIN corridor-lapses -->
| Month | Baseline P | ΔP | Scenario P | Baseline C | ΔC | Scenario C | Daily balance | Days | Cumulative |
|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 | 102.10 | -9.00 | 93.10 | 102.78 | -3.00 | 99.78 | -6.67 | 31 | -715.8 |
| Nov 2026 | 103.09 | -12.00 | 91.09 | 103.56 | -3.00 | 100.56 | -9.47 | 30 | -999.9 |
| Dec 2026 | 103.71 | -13.50 | 90.21 | 104.63 | -3.00 | 101.63 | -11.43 | 31 | -1,354.1 |
| Jan 2027 | 104.76 | -13.50 | 91.26 | 101.98 | -5.00 | 96.98 | -5.72 | 31 | -1,531.4 |
| Feb 2027 | 106.32 | -13.50 | 92.82 | 104.30 | -5.00 | 99.30 | -6.49 | 28 | -1,713.1 |
| Mar 2027 | 107.27 | -13.50 | 93.77 | 103.08 | -5.00 | 98.08 | -4.31 | 31 | -1,846.8 |
| Apr 2027 | 108.57 | -13.50 | 95.07 | 103.98 | -5.00 | 98.98 | -3.91 | 30 | -1,964.2 |
| May 2027 | 109.84 | -13.50 | 96.34 | 104.12 | -5.00 | 99.12 | -2.78 | 31 | -2,050.4 |
| Jun 2027 | 110.23 | -13.50 | 96.73 | 105.71 | -5.00 | 100.71 | -3.98 | 30 | -2,169.8 |
| Jul 2027 | 110.75 | -16.22 | 94.53 | 105.60 | -5.00 | 100.60 | -6.07 | 31 | -2,357.9 |
| Aug 2027 | 110.90 | -16.22 | 94.69 | 105.43 | -5.00 | 100.43 | -5.75 | 31 | -2,536.0 |
| Sep 2027 | 111.10 | -16.22 | 94.89 | 105.57 | -5.00 | 100.57 | -5.69 | 30 | -2,706.6 |
| Oct 2027 | 111.36 | -16.22 | 95.14 | 104.41 | -5.00 | 99.41 | -4.27 | 31 | -2,839.1 |
| Nov 2027 | 111.82 | -16.22 | 95.60 | 105.23 | -5.00 | 100.23 | -4.63 | 30 | -2,978.0 |
| Dec 2027 | 111.49 | -16.22 | 95.27 | 106.33 | -5.00 | 101.33 | -6.06 | 31 | -3,165.7 |
<!-- SCENARIO_TABLE:END corridor-lapses -->

</details>

<details>
<summary>How the October revision changed the paths</summary>

The standoff production level rose from 100.5 to September's estimated 101.3 million barrels a day. Non-Gulf growth in 2027 stayed at the same pace. The December 2027 stock projection changed from −1,832.6 to −1,547.8 million barrels relative to February.

V1's closure calculation assumed about 16.2 million barrels a day of lost Gulf production by early 2027: 2.717 million already attributed to the September EIA baseline, plus an additional 13.5 million reduction. We kept the baseline-attributed loss through June, then set it to zero from July. That was our calculation schedule, not a monthly schedule published by the EIA. To represent continued closure as the baseline recovered, the additional reduction rose to 16.217 million from July.

V2 kept those additional reductions against the October baseline. They do not establish the same total loss against the newer forecast. The September 17 calculation originally ended in February 2027; its September 18 extension preserved the earlier monthly predictions and added months through December.

</details>

## The September 19 assumptions, preserved

<details>
<summary>Read the original assumptions and monthly tables (v1)</summary>


The assumptions below are the version published on September 19, 2026, **unchanged**. They are the version scored for September, and they are kept so those results can be checked against what we published. The October 15 assumptions are in the scenario tables above. These tables are historical records; they are not recalculated by the model's checks.

### The corridor holds

In this scenario, tanker traffic returns to normal over one to two quarters. Production recovers roughly a quarter earlier than the EIA expects. We add as much as 2 million barrels a day to the EIA forecast in December 2026, then reduce that addition to zero by May 2027 as the EIA's forecast production catches up.

We assume consumption is 0.25 million barrels a day above the EIA forecast through March 2027, then follows it. Under these assumptions, stocks begin rebuilding in December 2026. By December 2027, storage is **1,228.6 million barrels above its end-of-February 2026 level**, about 250 million above the EIA projection.

<details>
<summary>Monthly calculations (September 19): corridor holds</summary>

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

</details>

### The standoff continues

In this scenario, fighting continues and the bypass carries much less oil than before the shutdown. **We assume Gulf production stays at the same level.** We set world production at 100.5 million barrels a day through the end of 2026, assuming alternative shipping routes make up for the September disruptions. That's a level we've chosen for the scenario, not a reported figure.

For 2027, we assume production outside the Gulf increases by 0.5 million barrels a day each quarter. World production reaches 102.5 million barrels a day in December, 9.3 million below the EIA forecast.

We set consumption below the EIA forecast by 0.5 million barrels a day through 2026, 1.0 million in the first half of 2027, and 0.5 million in the second half. Those reductions are fixed in advance. The model doesn't reduce consumption further as stocks fall.

Consumption exceeds production in every month of this scenario. By December 2027, storage is **1,832.6 million barrels below its end-of-February 2026 level**.

<details>
<summary>Monthly calculations (September 19): standoff</summary>

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

</details>

### The corridor lapses

In this scenario, the shipping agreement fails and the disruption continues. More production is lost than the EIA forecast assumes. By early 2027, we assume the disruption prevents production of about 16.2 million barrels a day in the Gulf.

We keep that production loss unchanged through December 2027. As more Gulf production returns in the EIA forecast, we subtract more from it to represent a continued closure. We set consumption 3 million barrels a day below the EIA forecast through 2026 and 5 million below it throughout 2027.

By December 2027, storage is **3,495.4 million barrels below its end-of-February 2026 level**. That would require about 2,990 million barrels of additional withdrawals after August. We don't know whether that much oil could be withdrawn. The line adds up the monthly shortages; it doesn't show whether enough oil would be available to cover them through December 2027.

<details>
<summary>Monthly calculations (September 19): corridor lapses</summary>

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

</details>


</details>

<span id="what-the-model-leaves-out"></span>
<span id="where-the-spr-fits-now"></span>

## Limits of the forecasts

The scenarios fixed consumption in advance. They did not calculate further reductions caused by higher prices, rationing, or a slower economy as stocks fell. Nor did they estimate how much crude refineries could process into usable fuel or how much could reach a particular country.

The calculations did not identify a minimum usable stock level or a date when oil would run out. Some oil is needed to operate pipelines and facilities, and we do not know how much stored oil can be withdrawn. Operating limits for the US Strategic Petroleum Reserve (SPR) are not global inventory limits.

Earlier versions also treated SPR withdrawals as an automatic response to shortages. We removed that projection: releases depend on government decisions, contracts, and delivery schedules. The dashboard tracks reported SPR levels, not a predicted withdrawal schedule.

These were three chosen scenarios, not a complete set of possible outcomes. The model was built with an AI coding tool, not developed by an energy analyst. The sources and calculations remain public for review.

<details>
<summary>Earlier sensitivity calculations (v1)</summary>

These examples used the September 9 EIA forecast. They are historical comparisons:

- Adding 2 million barrels a day of production throughout 2027 changes year-end stocks by 730 million barrels, with consumption unchanged. A daily consumption change of 1 million barrels moves stocks in the opposite direction by about 180 million over half a year.
- Ending closure after November 2026 and returning production and consumption to baseline gave about −1,224 million barrels by February 2027, compared with −2,051 million under continued closure.
- Moving assumed baseline recovery from July to April gave −3,742.6 million barrels by December 2027 under continued closure, about 247 million lower. Maintaining the assumed total production loss required larger adjustments in April–June.

No probabilities were assigned to these examples.

</details>

<span id="how-the-odds-change"></span>

## Historical corridor odds

The corridor odds were removed from the dashboard on October 21. The record below preserves the judgments and rules used before withdrawal; it is not a new probability assessment.

<details>
<summary>Probability history and recorded change rules</summary>


These were judgment probabilities, with rules set in advance for reviewing them. They were not estimates of the storage forecasts' accuracy. The last recorded probabilities were 10% corridor holds, 50% standoff, and 40% corridor lapses, dated September 29.

The September 11 pipeline suspension moved the odds from 10/50/40 to 10/40/50. When oil loadings at Yanbu stopped, we moved them to 10/35/55 on September 16. We returned to 10/40/50 on September 22, after Reuters reported that the pipeline had restarted and the first cargo at Yanbu was scheduled to load that day.

On September 29, we moved the odds to 10/50/40. The Wall Street Journal and [Bloomberg](https://www.rigzone.com/news/wire/saudi_arabias_key_oil_pipeline_starts_exports-28-sep-2026-184718-article/) reported that exports had resumed through the repaired pipeline, which was carrying about 3.5 million barrels a day. The Journal reported that tanker loadings at Yanbu had resumed on September 27. Our rule called for an official restart announcement or an assessment that repairs would take only days. Neither condition had been met. We made an exception because the reports showed that oil was moving through the pipeline and leaving the port again.

The early-October checks did not change the odds. The gap between the EIA's October 6 price forecast and market prices did not meet our threshold. On October 7, we closed the disputed pipeline-shutdown claim after other reports said oil was still flowing.

The dated research logs preserve each decision. The dashboard stopped displaying these probabilities on October 21.

### The recorded change rules

We recorded these rules as of September 16 and applied the Yanbu rule on September 22. The September 29 change was an exception to the pipeline-restart rule, as explained above. On October 7, we removed rules that had already been used or passed — the two pipeline-reversion rules, the September 30 fuel-ban decision, and the September prediction-market checks — and replaced the dated pipeline clause with a standing one.

| Event | Effect on the odds |
|---|---|
| A verified reopening, supported by an International Maritime Organization (IMO) filing and tanker traffic at or above 40% of the 85-per-day baseline for two consecutive weeks, or a durable ceasefire. | Increases the odds that the corridor holds. |
| Tanker losses above about 15 per week; delays restarting Jazan or Abqaiq; or a damage assessment calling for weeks of repairs. | Increases the odds that the corridor lapses. |
| A confirmed shutdown of the repaired East–West pipeline. | Increases the odds that the corridor lapses. |
| A widening gap between the EIA price outlook and market prices (checked at each monthly outlook release). | Could increase the odds that the corridor lapses. |
| The Houthis blocking or attacking non-Saudi vessels in the Bab el-Mandeb, leaving both shipping routes closed. | Increases the odds that the corridor lapses. |

A direct US strike on the Houthis would also prompt us to review the odds. How we'd change them would depend on what happened. The dated [research logs](https://github.com/mattcone/depletion-ledger/tree/main/research/logs) explain each decision, including cases where reports disagreed or the news didn't change the odds.


</details>

<span id="where-the-data-comes-from"></span>

## Sources and calculation checks

| Information | Source | Schedule |
|---|---|---|
| World production and consumption forecasts | EIA Short-Term Energy Outlook | Monthly |
| Company and government stocks in OECD countries | EIA international data | Monthly |
| Observed global stock changes | IEA Oil Market Report | Monthly; public detail varies |
| US commercial stocks, SPR levels, and refinery activity | EIA weekly petroleum reports | Weekly |
| Oil production by OPEC countries | OPEC | Monthly |
| Tanker traffic, attacks, and restrictions | PortWatch, Kpler, official statements, and dated news reports | Reviewed daily |
| Oil and fuel prices | Exchanges and AAA | Daily |

OECD countries hold only part of the world's stocks. Source notes distinguish reported figures, estimates, and assumptions. Unverified reports stay in the research notes.

<details>
<summary>Saved inputs, scoring scripts, and earlier editorial decisions</summary>

Each forecast has a saved assumptions file, EIA workbook, and reported starting value. V2 uses `site/src/data/world-stocks-assumptions-v2026-10-15.json`; v1 uses `research/sources/world-stocks-assumptions-v2026-09-19.json`. The issued records remain unchanged as new outcomes are appended.

`research/scoring/regen-scenarios.py` reproduces the monthly tables, chart series, and predictions. Its `--check` command validates each version against its saved inputs and checks the latest version's generated tables. `research/scoring/score-forecasts.py` compares forecasts with first reported outcomes and records revisions separately. Scoring tests use synthetic examples, not observations.

The separate event scorecard evaluates dated predictions such as a shipping recovery or export-ban decision. It does not establish the accuracy of storage projections. The experimental beta remains in research, not on the dashboard.

On October 21 we recorded a rule to make the dashboard's supply headline a dated IEA monthly statement, then suspended that display rule at the site owner's request. New IEA statements still go into the research log. The dated logs preserve both decisions.

The [repository](https://github.com/mattcone/depletion-ledger) contains the source files, checks, and [research logs](https://github.com/mattcone/depletion-ledger/tree/main/research/logs).

</details>

Return to the [dashboard](/) for the latest reported data and agency outlook.
