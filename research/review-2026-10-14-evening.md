# October 14 evening update: accuracy and copy review

> Latest recheck: the UKMTO rows now follow the original October 13 warning dates, resolving the date correction. Refinery count and Tuapse are resolved; Daly is verified. The latest section records the copy reduction and validation; earlier open-item descriptions are superseded.

Reviewed the current diff against `3bc2eeb`, the evening research log, the revised display
strings and chart descriptions, and the cited reporting. Followed
`/home/mcone/pi/COPY-STYLE.md`. This reviews the evening updates, not every historical
claim or the model's calibration. Numerical series, model assumptions and deployments
were left unchanged. Public copy edits are local.

## Corrections applied

- **EIA release time and date grouping.** The draft said October 15 at 10:30 Eastern;
  the [EIA holiday schedule](https://www.eia.gov/petroleum/supply/weekly/schedule.php)
  explicitly gives **October 15 at noon Eastern** for the week ending October 9.
  Corrected the watch item, moved it under October 15, fixed the stale cascade date,
  and corrected the current SUMMARY's pending time.
- **WTI explanation.** The [Bloomberg article carried by Rigzone](https://www.rigzone.com/news/wire/oil_gains_as_global_supply_risks_mount-14-oct-2026-184852-article/)
  confirms November WTI **$95.09 (+1.0%)** and December Brent **$106.06 (+0.4%)**.
  It attributes WTI's relative strength to fund buying and stronger demand for US barrels
  as freight conditions shifted, not specifically US diesel tightness caused by Russian
  refinery damage. Corrected the paragraph and series note, with attribution and uncertainty.
- **Missile development versus use.** “Houthis used Chinese-sourced parts in an
  Iranian-designed ballistic missile” implied demonstrated use. The [WSJ report](https://www.wsj.com/world/middle-east/houthi-missile-china-parts-5c2b2516)
  and its detailed [Jerusalem Post account](https://fr.jpost.com/international/article-911636)
  describe an effort to develop/manufacture the missile, with progress unclear and a
  potential range around 1,200 miles. Corrected the watch item. The separate Israeli
  land/sea attack warning is supported by [Jerusalem Post reporting](https://www.jpost.com/israel-news/defense-news/article-911630).
- **Cape Dao: later evidence supersedes the earlier finding.** Earlier Reuters reporting
  said the ship was sinking; its [later update, carried by gCaptain](https://gcaptain.com/bulk-carrier-sinks-weeks-after-deadly-strait-of-hormuz-strike/),
  reports **both ships sunk**, citing maritime officials and IMO casualty data. Cape Dao
  was struck September 23, with one crew member killed; GFS Pride and Cape Dao are the
  second and third wartime vessel sinkings in that account. Updated public prose and
  the Brent note. Withdraw the earlier review's objection to describing Cape Dao's
  sinking as complete: the source has since advanced.
- **Shipping attribution and dates.** [Singapore MPA](https://www.mpa.gov.sg/media-centre/details/two-singapore-registered-vessels-struck-in-strait-of-hormuz)
  confirms GFS Pride sunk, 21 crew safely evacuated, no injuries; GFS Giselle damaged,
  arrived under its own power at safe anchorage, 22 crew safe. Its October 13/14 dates
  are explicitly **Singapore time**. Added that qualifier for Giselle, omitted unexplained
  TEU jargon, and attributed the crew facts directly. “UKMTO issued reports” now
  distinguishes publication from the underlying incident dates.
- **Iran tactics chronology.** The [Reuters article](https://quews.news/iran-shifting-tactics-to/)
  says the changed tactics began about ten days earlier; it does not say Iran spent ten
  days using a different pattern before introducing these tactics. Corrected that sequence.
- **Russian uncertainty.** Added an explicit notice that the displayed plant list includes
  two disputed claims and its total is not independently confirmed. Changed “both are
  re-strikes” to conditional language. The Russia watch item now also labels the separate
  Tuapse fire report unverified, matching the snapshot's uncertainty.
- **Copy:** simplified completed-release wording, translated IEA inventory shorthand into
  barrels and barrels per day, clarified that the 60% Fed hike probability is our judgment,
  and separated gas-price levels from the explanation of their movement.

## Verified updates

[JOGMEC's October 13 weekly release](https://journal.jogmec.go.jp/oilgas/nglng-en/index.html)
confirms October 9 TTF **$26.70**, November delivery, versus $24.60 on October 2;
JKM rose from the high-$24s to the low-$26s. The plotted $26.20 is a representative
approximation, clearly labeled, not an exact published assessment. Approximate increases
of 140% and 145% versus the stated baselines are reasonable. Weather, Norway production
constraints, and renewed Hormuz attacks are supported by the release.

## Data concerns and unresolved verification

Per AGENTS.md, these are reported separately rather than changing the underlying rows.

1. **Refinery count:** the list grew from 10 to **12 plants** by adding the Saratov and
   Ryazan claims. [Contemporary reporting](https://babel.ua/en/news/130978-russians-accused-ukraine-of-attacks-on-refineries-during-trump-s-energy-ceasefire-the-president-s-office-called-it-a-fake)
   confirms Novak's accusation and Ukraine's denial, not independently verified strikes.
   [Further reporting](https://factum.press/en/article/novak-claims-refinery-attacks-kyiv-denies)
   says Novak named regions rather than individual plants. This does not meet the array's
   own documented criterion of a confirmed strike/fire. Recommend keeping the disputed
   claims in prose and excluding them from that counted array unless corroboration lands.
   Current copy now makes their inclusion explicit; the rows/count were preserved.
2. **UKMTO incident dates:** new #172/#173 rows use **October 14**. The
   [dedicated Warning 173 account](https://regulasshipping.com/blog/ukmto-logs-an-outbound-hormuz-container-ship-hit-after-warning-173-26/)
   describes a time-late report published October 14 for an **October 13, 1700 UTC**
   incident; Seatrade also groups four attacks on October 13. Singapore's October 14
   Giselle date can also be October 13 UTC. Verify both original warning PDFs against
   API `utcDateOfIncident` before accepting October 14 as the chart's incident date.
   The direct API returned 403; the available `/tmp/ukmto-raw.txt` snapshot ends at #171
   and cannot validate the new rows. Public phrasing now describes report issuance only.
3. **Tuapse and Daly:** could not verify the claimed October 14 brief Tuapse refinery
   fire or Daly's “hikes likely needed” quotation from the cited articles after targeted
   searches. The located October 14 Moscow Times refinery/terminal article concerns
   **Rostov**, not Tuapse. This is unresolved sourcing, not proof either claim is false.
   Supply exact article links/captures before treating either as verified. Public Tuapse
   wording now clearly carries the uncertainty; the treasury note remains as supplied.
4. **Treasury:** the 5.19% close is corroborated by contemporary market-close reporting;
   Yahoo's chart endpoint returned 429 and its history page was inaccessible. The exact
   **5.33% intraday high** was not independently verified here. No numerical change made.
5. **US 19 million barrels:** reporting supports a CENTCOM claim of facilitated passage,
   not an independently measured flow. The watch item retains attribution; it must not
   be treated as a verified throughput input or combined with differently scoped Kpler
   numbers. Sources disagree on the referenced day, so no day was added to the public text.

## Validation

Build passed. Local browser geometry and endpoint checks passed for every registered
chart, with no console errors. `git diff --check` passed. No deployment performed; the staged version predates this review's copy edits.


## Recheck after Qwen’s investigation

Re-read the current full diff and follow-up log; inspected the revised refinery array,
watch items, chart descriptions, EIA dates and source notes. Re-ran the build and local
browser chart checks. No numerical series or model assumptions changed in this review.

**Resolved findings:**

- Count is now **10 plants, Sep 20–Oct 9**. Saratov/Ryazan are excluded from the array
  and retained as disputed claims in prose. Withdraw the earlier count objection.
- Tuapse claim is removed from both public locations. Withdraw that sourcing concern.
- [Reuters’ Daly interview](https://in.marketscreener.com/news/fed-s-daly-says-rate-hikes-likely-needed-but-not-urgently-ce785dd2d08df221)
  independently verifies the report. Withdraw the earlier unresolved-quotation finding.
  Added the material qualification to the Treasury note: she saw no urgency for an
  October move. The unqualified fragment alone could mislead readers about timing.
- EIA noon release, WTI attribution, missile-development wording and updated Cape Dao
  status remain corrected. JOGMEC levels and approximate gas-price comparisons still
  agree with the source. No new numerical conflict found in those changes.

**Confirmed primary-source conflict: UKMTO #172 and #173.**

The read-only project checker succeeded outside the sandbox: API 69 entries, max #173,
no missing rows; #166 retains its separately documented date-change flag. Captured the
raw response and downloaded and visually inspected both official warning PDFs.

| Warning | Original PDF incident date/time | API utcDateOfIncident | API utcDateCreated |
| --- | --- | --- | --- |
| 172-26 | **13 Oct 2026, 16:40 UTC** | 14 Oct 2026, 14:10 UTC | 14 Oct 2026, 13:13:19 UTC |
| 173-26 | **13 Oct 2026, 17:00 UTC** | 14 Oct 2026, 14:21 UTC | 14 Oct 2026, 13:23:20 UTC |

Sources: [official Warning 172](https://www.ukmto.org/-/media/ukmto/products/20261014-ukmto_warning_172-26.pdf),
[official Warning 173](https://www.ukmto.org/-/media/ukmto/products/20261014-ukmto_warning_173-26.pdf?rev=d1feb1e8533f4d23b71a6ebbbccfca89),
and the [official API](https://sccd.royalnavy.mod.uk/api/ukmto/all).
Local copies and hashes: `research/sources/ukmto-2026-10-14-review/`.

The PDFs match the detailed contemporary reporting cited earlier. Both API incident
fields occur roughly an hour **after** their creation timestamps, despite both notices
being time-late reports. This strongly suggests metadata trouble; it does not establish
its technical cause. The API is not sufficient to dismiss the PDF dates as a third-party
mistake. Qwen’s “Oct 14 stands” conclusion is therefore too strong.

**Recommendation for the update owner:** use **October 13** for #172/#173 on an
incident-date chart, with an explicit override/provenance note explaining the API
conflict. Keep October 14 as the capture/publication date. The current rows still say
October 14: this review reports the correction separately per AGENTS.md. The two dates
fall in the same Monday–Sunday week, so the weekly bar totals do not change; provenance
and any day-level summaries do. No evidence of duplicate incidents was established.

**Remaining narrow limit:** the 5.33% Treasury intraday high is attributed to the
update author's Yahoo pull but was not independently reproduced here. This is not a
finding that it is wrong. It does not affect the verified 5.19% close.

Validation: `npm run build`, `python3 scripts/verify-live.py local`, and
`git diff --check` passed; all chart endpoint checks passed and no browser console
errors were reported. No deployment performed. Further numerical/date changes belong
to the update owner; this review only changed Daly's timing qualification in public copy.


## Final recheck and copy reduction

Read the current files and the new 17:20 research-log correction. Verified #172/#173
now use October 13 and keep October 14 as the coverage end. Re-extracted the original
PDF dates and checked every archived source hash: all match. **Withdraw the outstanding
request to correct these two rows: it is now resolved.** The underlying API/PDF conflict
is documented in the code and source archive; its diagnostic detail is no longer in
public copy. No change to incident counts or weekly totals was needed.

Shortened the five unscheduled watch items from roughly 1,048 words to 517, and the
refinery caveat from 296 to 110. Shortened Asia gas prose to the current assessment,
its comparison and the supply constraint. Removed repeated explanations, older news
recaps, administrative API details, minor incident chronology and duplicated context.
Retained current risk signals, source attribution and uncertainty. Longer accounts
remain in the research logs and earlier review sections.

No new confirmed factual error found in the changed copy. EIA's holiday schedule
still supports noon Eastern October 15. Previously verified settlements, JOGMEC
assessments, ship-loss reporting and refinery exclusions remain consistent with this
shorter version. The previously stated independent-verification limit on the Treasury
intraday high remains; no numerical series or model assumptions were edited.

Validation: site build passed; local browser chart geometry and endpoint checks passed
with no console errors; `git diff --check` passed. No deployment performed.


## Review of the latest full-content-audit updates

Scope: the new food-section gas callouts, recession-market update, breakeven paragraph,
and their related chart/accessibility strings. Read the current diff and 17:10 log.

- **Gas callouts verified:** JOGMEC's October 13 weekly page confirms October 9 TTF
  $26.70 and JKM in the low-$26s. Food callouts agree with the price-chart series;
  JKM retains its approximation mark. No numerical correction needed.
- **Market price verified:** the [specific Polymarket contract](https://polymarket.com/event/us-recession-by-end-of-2027-20260807185409760)
  and public-search API return Yes 0.335, bid 0.33 / ask 0.34, last trade 0.33.
  About 34% is a valid rounding of the midpoint; it is not a new economist forecast.
  Read the resolution rules: the GDP and NBER tests are not identical to the comparison
  forecasts. Linked directly to the contract and made the different window/rules clear.
  **Corrected the tooltip**, which still called every row “12-mo US recession,” to
  label Polymarket through end-2027. Updated accessibility wording accordingly.
- **Breakeven verified:** [FRED T10YIE](https://fred.stlouisfed.org/series/T10YIE)
  reports **2.35% on October 14**. Downloaded January–February observations span
  **2.25–2.36%**, supporting “near pre-war levels.” Defined the breakeven as a market
  indicator and replaced the investor-motive claim with the narrower implication:
  higher nominal yields with a similar breakeven imply higher yields after expected
  inflation. No claim that this is a pure survey of expectations was added.

No new numerical errors found in these updates. Copy remains concise. Model assumptions
and numerical series are unchanged. Build, local browser chart checks and diff check
passed; no deployment performed. Earlier historical reviews are not a fresh audit of
all unchanged dashboard or model claims.
