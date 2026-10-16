# October 15 afternoon update: accuracy and copy review

Scope: new settlements, PPI, June OECD stocks, observed-inventory overlay and first
storage comparison. Read the current diff, afternoon logs, records, scoring code,
model explanation and `/home/mcone/pi/COPY-STYLE.md`. Earlier WPSR and shipping
findings remain in their separate October 15 reviews. No deployment.

## Source checks

- [BLS September PPI release](https://www.bls.gov/news.release/ppi.nr0.htm): final
  demand +6.3% year-over-year, +1.3% monthly seasonally adjusted; July/August annual
  readings revised to 4.9%/5.6%. Monthly goods +2.6%, energy +10.8%, gasoline +20.3%;
  excluding food, energy and trade services +5.0% annually. Annual record comparison
  is December 2022; monthly comparison is March 2022. Snapshot hash matches provenance.
- [Newsquawk's October 15 settlement report](https://www.newsquawk.com/headlines/crude-wrap-wti-x6-settles-usd-288-higher-at-9797bbl-brent-x6-settles-usd-014-lower-at-usd-10592bbl)
  confirms Brent 105.92 (−0.14) and WTI 97.97 (+2.88, +3.03%).
  [Reuters](https://tribune.com.pk/story/2635091/brent-holds-near-106-as-us-mulls-easing-sanctions)
  supports the US-stock decline as a price driver. Rephrased the public explanation
  with attribution and the precise 8.6M decline. CNBC's source page was inaccessible;
  that is a verification limit on its more detailed strike-planning driver, not
  evidence the reported planning is false. The source-attributed series note remains.
- Yahoo's query2 chart endpoint confirms October 15 ^TNX close 5.0889997 → 5.089%.
  The query1 endpoint returned 429; query2 succeeded. No numerical correction needed.
- EIA international API, activity 5 / OECD / monthly: June 3781.782725 → 3781.8M;
  May latest 3853.678243, versus saved 3854.1M vintage. June is the series low and
  below June's 2021–2025 band [3974.8, 4384.5]. Keeping the saved May observation
  with its original retrieval date preserves the stated vintage convention.
- [IEA October 15 statement](https://www.iea.org/news/iea-governing-board-statement-on-energy-markets-and-security)
  supports accelerating around 100M barrels remaining from March, including more
  than 20M diesel; this is not an entirely new 100M commitment.
- [IEA October OMR](https://www.iea.org/reports/oil-market-report-october-2026)
  confirms September monthly −10M, cumulative −509M from end-February, on-land
  −113M and oil-on-water +103M.

## Material wording corrections

1. Removed the table header claiming every line was published before September
   ended: the EIA October 6 estimate is retrospective. Its saved record already
   explicitly says so. Labeled that row as a September estimate and explained
   why it does not measure advance prediction.
2. Removed “for the first scored month it equals the monthly change.” The displayed
   −2M equals −509 minus the frozen −507 anchor from the prior edition. September's
   reported monthly change is −10M; the 8M difference reflects revisions to earlier
   months. Added this explanation to the observed-line introduction, score caption
   and model page. Did not change the observed points, targets, scores or anchor.
3. Removed the claim that the miss is caused by a storage-mix effect the balance
   paths “don't see.” Oil on water is part of total storage; the accounting identity
   does not itself exclude it. The scores cannot isolate a cause. Retained the
   verified land/water figures and explained coverage, revisions and assumptions.
4. Split the long CPI/PPI paragraph, removed stale “peaking ... in May,” and made
   monthly seasonal adjustment explicit. Added a direct model-page scorecard link.

## Reproduced calculations and limits

The current cumulative errors (M barrels) are holds 134.4, standoff 94.3, lapse
231.9, EIA October estimate 86.1, recent trend 45.7. They round to the displayed
134 / 94 / 232 / 86 / 46. Monthly errors against −10M are respectively 126.4 /
86.3 / 223.9 / 78.1 / 37.7. These are separate measures, not interchangeable.
All saved forecast target values are unchanged from HEAD. `regen-scenarios.py
--check` passes for all versions; scoring dry run reproduces the stored outcomes.
No model/input/scoring policy changes were made.

Validation: final site build, all-version scenario drift check, scoring dry run and whitespace checks passed. Local browser checks passed with all chart registrations/endpoint checks and no console errors; final changes after that browser run were a heading ID and model-page explanatory copy.
