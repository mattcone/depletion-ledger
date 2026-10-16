# Daily-update release separated from model revision

Release branch: `2026-10-16`, based on `1fdc3a7` (main).
Source: `model-update` at `9f1453a`. Preserved backup ref:
`backup/model-update-before-release-split-2026-10-16`.
No source-branch changes, commit or deployment performed.

Included: WPSR week ending Oct 9 (SPR, commercial crude, distillate and refinery
readings); September PPI and revisions; Oct 15 oil settlements and Treasury close;
reviewed shipping/watch-list wording; source snapshots and report-ingestion manifest;
June OECD on-land observation with its existing provenance. CPI September values
were already present in the release base; copied macro prose now reflects them.

Copied the 21 daily-data/copy/chart-label hunks from index.astro explicitly. Added a
short September-miss disclosure to dashboard and model page, retaining the original
September 19 scenario paths and assumptions. Neither v2 adoption nor a replacement
forecast is implied.

Excluded: v2 assumptions/records, new computation anchors, generator changes, model
revision audit/UI, score-history/ghost-line implementation, revised share-card image,
and source-branch research summaries claiming v2 adoption. The existing model page
receives only the short disclosure; its scenario tables and calculations stay intact.

Source research and all excluded work remain available on the model-update branch.
This release is a separation of already reviewed Oct 15 changes, not an Oct 16 data
refresh. DATA_AS_OF remains October 15 until a subsequent daily update supplies new data.

Validation passed: site build; original all-version scenario drift check; local
browser chart geometry and endpoint checks (no console errors); desktop/mobile
smoke checks on dashboard and model page; whitespace checks. All original forecast
records, model-table blocks, assumption files, generator, probability records,
model-page implementation and share-card files are preserved against the release
base. Only the June OECD observation was added to world-stocks.json. Built output
contains updated daily values and no v2 controls/audit links. Source branch still
points to 9f1453a; backup ref points to the same commit. All changes are uncommitted.
