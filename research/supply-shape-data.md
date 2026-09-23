# Supply-shape preview: real data

Checked September 22, 2026; comparison switched to year over year the same day. These are the home page's refining flow plate (`site/src/components/SupplyFlow.astro`) and route charts (`site/src/components/ShippingRoutes.astro`); the standalone research preview page was folded into the home page and deleted Sep 22. OECD data: June 2026 versus June 2025. Source values and formulas live in `site/src/data/supply-shape.json` (flows, stocks) and `site/src/data/shipping-routes.json` (routes). No issued model records changed.

**Future updates:** both JSON files are the single source of truth — every width, delta, label, and mobile bar computes from them. An update = new source values in the JSON + `current_period`/`current_days` (and `comparison_period`/`comparison_days`, which must stay the same calendar month for the YoY comparison) + a read of the home page's refining h2 and two intro paragraphs in case the story changed. The update procedure is recorded in the oil-report-daily skill.

## Source retrieved

IEA, **Monthly Oil Statistics, September 2026**, published September 11; data through June. This is the free statistical release, separate from the Oil Market Report.

- Official catalogue: https://www.iea.org/data-and-statistics/data-product/monthly-oil-statistics
- Public release listing used to retrieve the IEA PDF: https://www.mtsinsights.com/summaries/10893/
- Discovery page: https://www.mtsinsights.com/events/4113/
- PDF downloaded to `/tmp/iea-mos-september-2026.pdf`; SHA-256 in the JSON. The public listing's HTML contains a `data-src` attachment URL; follow that issued URL as supplied. Signed download URLs expire, so refresh the listing rather than guessing asset URLs.
- Text extraction: `/tmp/iea-mos-september-2026.txt`. PDF pages 7, 19, and 30–34 contain the selected figures. Pages 7 and 19 were inspected visually as well as extracted.

The June 2025 comparison uses the **year-earlier figures in the same September 2026 edition** (Table 1 page 7, Table 7 page 19, tables 9.2–9.6 pages 30–34), so both periods come from one release and no cross-edition revision gap exists. The January 2026 figures previously used (from the April 2026 edition, PDF `/tmp/iea-mos-april-2026.pdf`) are no longer part of the comparison. Comparing June to June also removes the winter/summer fuel-mix shift that the January comparison carried. This is not a seasonally adjusted comparison or a causal estimate of war damage.

## Chart choices

The inlet is **observed refinery intake**, including NGLs and feedstocks. The box is **gross refinery output**, not capacity. Fuel branches use Table 7. Kerosene includes jet and other kerosene. Other products are the residual after subtracting the three named branches; independently rounded component rows differ by 1 thousand tonnes.

Band widths are proportional to volume on one shared scale (12 px per million metric tonnes per day), so the four fuel bands add up to the refinery output band. Both months are June (30 days), so each monthly total is divided by 30 for the daily rate. Labels show **estimated** million barrels per day; the source uses thousand metric tons per month. Conversion is per product, from the UN Energy Statistics Yearbook ([unstats.un.org/unsd/energy/yearbook/conversion.htm](https://unstats.un.org/unsd/energy/yearbook/conversion.htm), barrels per metric tonne): crude intake 7.32 (intake also includes NGL and feedstocks), gasoline 8.50, diesel 7.23, kerosene 7.77. "Other products" (LPG, naphtha, residual, other) is a mixed bundle with no single UN factor; it uses a disclosed assumption of 8.0, between residual fuel oil (6.62) and LPG (11.65) — hence the "estimated" label. Refinery output is converted as the sum of the four product bands (they sum to the IEA total in tonnes), so they add up exactly in barrels without inventing a factor for the output mix. Stock labels remain million tonnes at month-end. Stocks are separate end-month quantities, with middle distillates combining gas/diesel and kerosene. The source includes country estimates (page 5).

## Earlier search findings

The June OMR, Table 4 (page 76), also contains OECD industry inventories by product, including April 2026 estimates and prior-April comparisons. Table 16 (page 91) contains OECD product yields. Neither should have been treated as evidence that OECD product data were unavailable.

Global monthly crude production and refinery throughput were found separately, but are not mixed into this OECD figure. JODI's July 2026 refinery-output download omits major non-OECD producers, so its reporting-country sum was rejected as a world total. A regional output decline or export decline is not a global production decline.

## Refresh

Retrieve the next free Monthly Oil Statistics release and check whether it revises either June 2025 or June 2026. Record the edition used for each value. Check source definitions and estimates, retain the units, update dates, and recalculate changes from unrounded extracted values. Do not substitute net deliveries for refinery output, yield percentages for output amounts, or stocks for flows.

## Shipping comparison added September 22

EIA **Global Energy Security Data**, August 12, 2026 release, table 2:
https://www.eia.gov/outlooks/steo/report/energysecurity/article.php
Retrieved September 22. The surrounding STEO header says September 9; the supplemental article itself explicitly says August 12.

Global crude oil and petroleum liquids, million barrels/day; Q4 2025 → Q2 2026:

- Strait of Hormuz: 21.6 → 4.9.
- Suez Canal and SUMED pipeline: 5.9 → 5.8.
- Bab el-Mandeb: 5.4 → 8.1.

These are EIA estimates based on tanker tracking, not OECD-only refinery inputs. This earlier two-point comparison was replaced by the history charts below. The route figures are separate from the June OECD refinery data. Cargo can traverse multiple routes; do not sum them or subtract these amounts from refinery output. No claim about September route status or route-specific capacity loss is made.

## Shipping history line charts

Replaced the two-point route comparisons with three Chart.js charts in `ShippingRoutes.astro`, using dashboard colors, serif axis text, thin lines, no chart animation or gridlines, endpoint values and tooltips. Data: `site/src/data/shipping-routes.json`.

History extends to 2023. Annual crude/condensate and product averages for 2023–24 come from EIA World Oil Transit Chokepoints, updated March 3, 2026, tables 3 (Hormuz) and 4 (Suez/SUMED and Bab el-Mandeb):
https://www.eia.gov/international/content/analysis/special_topics/World_Oil_Transit_Chokepoints/

Quarterly Q1 2025–Q2 2026 values come from the August 12 Global Energy Security Data release, tables 4–6. Retrieved both sources September 22. Each point records its source edition, table and averaging period. The annual source also includes overlapping first-half 2025 estimates; those were omitted in favor of the newer quarterly release, without altering either source.

Annual averages are plotted at the middle of their years; quarterly observations are at the middle of their quarters. The current chart joins all eight points for each fuel type, including the change from annual to quarterly averages. These connecting segments show the order of observations, not measured monthly changes. Axes use proportional time and a common 0–18 million b/d vertical scale. No monthly observations or older quarterly values were invented. All markers are hollow because EIA estimates the flows. The canvas descriptions list the values for screen readers. The caption retains the warning about unreliable ship signals in 2026, and routes are not summed.
