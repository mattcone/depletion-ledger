# Final v2 recheck, October 16

Core implementation and earlier material findings now check out. Remaining items
are limited copy/share-card inconsistencies and the longer-term score-history UI.
This review supersedes resolved items in the October 15 recheck. No model assumptions,
records or code changed in this review. No commit or deployment.

## Resolved and independently verified

- Current baseline and standoff endpoint in the model introduction are Oct 6 and
  −1547.8M since February / −1041M relative to August.
- The standoff paragraph correctly names 101.3M b/d as world production.
- Public audit dates, monthly −10M versus cumulative-relative −2M, and uncertainty
  about the cross-agency difference are explained. The persistence-result sentence
  is present in the rendered page (line breaks in source aside).
- Public archived v1 chart exists, with all three original paths; runtime endpoints
  are +1735.55 / −1325.63 / −2988.38M. Model page has all five September score rows.
  Archive renders at desktop and mobile widths.
- Main v2 chart now starts at September −2, with August null. V1 and reference lines
  retain August zero. All comparison toggles and dataset tooltip identities pass.
- V1 records' issued metadata/targets preserved against HEAD. Current v2 endpoints
  remain holds +1218.2396, standoff −1547.7985, lapse −3165.6884M since February.
- All-version drift check, full selftest, final site build and whitespace checks pass.
- Browser at 1440px and 390px: no page errors or horizontal overflow on either page;
  all 22 dashboard charts load, audit anchor resolves, archive chart has three valid
  datasets and five score rows. There is no separate implemented dark theme.

## Remaining cleanup

1. **Share card uses v2 numbers but old framing.** `site/src/pages/og/supply.astro`
   and the newly changed `site/public/og-supply.png` still say scenarios adjust the
   September 9 forecast. Both frontmatter and script line builders omit rebase_start,
   plotting August 0 then October rather than starting at September −2. Update both
   line builders and the caption to match the dashboard, then regenerate the PNG.
   The PNG's displayed v2 endpoints are correct.

2. **A few current model-page explanations are stale or overgeneralized.**
   - Opening says the detailed tables start from August −507; current tables compute
     from September −509. Distinguish current v2 from the archived v1 tables.
   - Baseline explanation says the current assumptions add no recovery adjustment and
     follow EIA's path; that applies to holds, not standoff or lapse.
   - Holds is described as “the EIA's own path.” Its monthly balances match EIA,
     but its cumulative level starts at the IEA September observation; the separate
     EIA overlay has a different frozen starting convention. Say “same monthly
     balance as EIA, starting from observed September.”
   - The expanded closure rationale (2.717M already shut in / fixed 16.217M total)
     and sensitivity examples retain v1 baseline logic and endpoints without a v1
     label. Retained offsets are explicitly a v2 judgment, but that alone doesn't
     establish those same total physical shut-ins against the newer baseline.
     Label the examples historical or verify them against the Oct 6 baseline.
   - New odds entry still says “not the Gulf WPUFD4 series”; WPUFD4 is a BLS PPI
     series, not a Gulf-production series. Delete this unnecessary parenthesis.

3. **Continuing history display is not implemented.** The dashboard still chooses
   only the latest scored month and the latest two versions. It correctly compares
   v1/v2 now, and September has a permanent archive. Future monthly score tables are
   not automatically appended to a visible ledger, and v3 would displace v1 from
   the dashboard. This remains a limitation relative to the requested continuing
   original-v1 comparison. Numerical forecast/outcome records remain preserved.

The numeric v2 implementation no longer needs the earlier repairs. Remaining cleanup
should not trigger another change to the assumptions, scores or probabilities.
