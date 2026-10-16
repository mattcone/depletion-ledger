# WPSR October 15 accuracy and copy review

Reviewed the current diff and October 15 log using `/home/mcone/pi/COPY-STYLE.md`.
Fresh downloads of EIA tables 1, 6 and 9 match the archived files byte for byte.

## Verified

Week ending October 9: SPR 282.983M, unchanged; commercial crude 415.577M,
down 8.557M; prior-year commercial crude 423.785M; distillate 102.611M,
down 2.527M and 12.3% below last year; East Coast 21.513M, 22.3% below last
year. Utilization 93.5% versus 92.7% and year-ago 85.7%; crude inputs rose
135,000 b/d. The 41-week utilization means round to 93.6%/90.7%. The
commercial decline is the second largest in the site's 2026 series, behind
February 13. Stocks / four-week product supplied = 102.611 / 3.974 = 25.82
days: an equivalent at that rate, not a depletion forecast.

Sources: [EIA WPSR](https://www.eia.gov/petroleum/supply/weekly/),
[tables 1](https://ir.eia.gov/wpsr/table1.csv),
[6](https://ir.eia.gov/wpsr/table6.csv), [9](https://ir.eia.gov/wpsr/table9.csv).
Added the missing table 9 hash/size to provenance.

## Corrected copy and handoff

- Next report is **Wednesday October 21 at 10:30 a.m. Eastern**, covering
  October 16. October 15's Thursday/noon timing was a holiday exception.
  Fixed the stale watch-group heading, release text, cascade date and summary.
  [EIA schedule](https://www.eia.gov/petroleum/supply/weekly/schedule.php).
- The no-announcement statement omitted relevant reporting. [Argus, October 13](https://www.argusmedia.com/en/news-and-insights/latest-market-news/2890203-us-awards-up-to-25mn-bl-spr-crude-sources)
  reports 20–25M barrels awarded, citing sources, explicitly without DOE confirmation.
  Added that distinction, rather than treating it as an official award announcement.
- [DOE, October 10](https://www.energy.gov/articles/energy-department-authorizes-strategic-petroleum-reserve-exchange-address-supply)
  authorized up to 4M barrels in hurricane exchanges, including acceleration under
  an existing award. Added this context. A flat stock week does not establish a
  continuing delivery pause. Condensed the sidebar around that distinction.
- Removed the summary's stale SPR projection dates, already explicitly retired by
  the update owner. No replacement forecast or model change.

## Research-only numerical/interpretive corrections for the update owner

The log's weekly production “still +2.4% YoY” and imports “+0.9% YoY” use the
**four-week averages**. Weekly production is 13.679 versus 13.636M b/d (about
+0.3%); weekly imports 6.049 versus 5.525M b/d (about +9.5%). Public copy uses
the correct weekly levels and changes, so no public series correction is needed.

“1.101M not yet delivered” is an inference from awards minus net stock decline,
not a delivery balance verified by WPSR. It requires receipts/returns and award
scope reconciliation; October 10 also accelerates some existing deliveries.
Do not present it as measured remaining deliveries or an exhaustion forecast.
No data values, model assumptions or calculations were changed in this review.

Validation: site build, local browser chart/endpoint checks and `git diff --check` passed. No browser console errors. No deployment.
