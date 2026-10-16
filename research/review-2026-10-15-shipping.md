# Shipping update review, October 15

Read the current diff, shipping-pass log, new API recipes, and project copy guide.

## Verified and corrected

[IMO's confirmed-incidents list](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx)
is dated **October 14**, retrieved October 15. It lists GFS Pride as sunk (October
13), Al Maqam as damaged (October 11), GFS Giselle as damaged (October 13) and two
Petro Dolphin seafarers missing (October 11). This resolves the earlier uncertainty
about Al Maqam's involvement and damage. It **does not identify an attacker or weapon**:
removed “confirming the IRGC's earlier claim” and narrowed the API recipe accordingly.
The distinction supersedes the log's blanket “IRGC claim now IMO-confirmed” language.

The fresh UKMTO API response has 30 entries, maximum #173: no new warning in that
window. Preserved the already adjudicated October 13 dates for #172/#173. No new
incident rows, vessel-to-warning matches or model changes were made. Also narrowed
the recipe's claim that missing #161 establishes UKMTO understatement: a numbering
gap alone does not prove an extra incident.

[Anadolu's October 15 report](https://www.anadoluajansi.gov.tr/en/middle-east/iran-reports-another-oil-tanker-fire-in-restricted-area-east-of-strait-of-hormuz/4090144)
and [AFP's report](https://today.lorientlejour.com/article/1550949/irans-military-says-oil-tanker-on-fire-in-gulf-of-oman.html)
attribute the unnamed tanker fire to an Iranian navy statement. The name, cause and
crew condition are unstated. Reworded the public sentence so the fire, tracking-off
assertion and prohibited-zone characterization remain Iran's account. No independent
confirmation found; did not identify it as Alfonso or call it a confirmed new strike.
Earlier similar fire reporting does not establish vessel identity or a separate count.

Shortened the shipping watch row by removing the older September flow comparison,
attributed political motive and duplicate warning-date history. Kept crew updates,
confirmed damage, the newly reported fire and the bypass-route caveat. Cape Dao's
sinking remains attributed to Reuters; the current IMO row says “Partially sunk,”
so its wording should not be presented as IMO confirmation of a complete sinking.

Archived the IMO page and fresh UKMTO response with hashes in
`research/sources/shipping-2026-10-15-review/`.

Validation: site build and `git diff --check` passed. This pass changed text and source archives only; no chart code or plotted values changed. No deployment.


## Recheck after Qwen's response

The attribution narrowing, fire-report caveats and separate retrieval date remain
correct. One follow-up objection is unsupported: the archived raw HTML explicitly
contains `Number of confirmed incidents as at 14&#160;October&#160;2026&#58; 113`.
Decoding entities yields “as at 14 October 2026.” That date was not inferred.
It dates the count, rather than proving a page-update timestamp; the public
“fetched Oct 15” wording is still valid and retained. Corrected the API recipe's
“no page-level date” statement and clarified the public incident dates separately:
GFS Pride October 13, Al Maqam October 11.

Reopened the live IMO list and Singapore MPA's October 14 release; the latter
confirms both crew totals, GFS Pride's sinking and GFS Giselle's safe anchorage.
The fresh Reuters October 15 tanker-fire account also attributes the report to
Iran's army; no independent confirmation or cause is supplied there. The source
archive and all four WPSR file hashes match provenance. WPSR data remains as
verified in the separate review. No new data or model changes, no deployment.

Recheck validation: build, local browser chart/endpoint checks and whitespace checks passed; no browser console errors.
