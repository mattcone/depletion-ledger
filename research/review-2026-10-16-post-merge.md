# Post-merge v2 recheck — October 16

Reviewed clean commit cada5c8 against the remaining findings in review-2026-10-16-v2-final.md. This supersedes that file's remaining-cleanup list where noted below. No implementation, assumptions, probabilities, or scores changed in this review.

## Remaining findings

1. Share-card start remains incomplete (site/src/pages/og/supply.astro:177–190). Both line functions now recognize rebase_start and the caption correctly names October 6 and September. However, the browser-side axis includes only August plus target months (October onward). September never enters labels, so the new September branch cannot execute: the image's scenario lines still start in October. Reproduced from the published records: labels begin [2026-08, 2026-10, 2026-11], required rebase_start is 2026-09. Explicitly add every rebase_start period in BOTH axis builders, then regenerate the image. The frontmatter currently gets September incidentally from the EIA comparison record, while the browser builder excludes that record.

2. Continuing history now exists, withdrawing the previous finding that it was absent. Its release-selection rule is still unsafe (site/src/pages/index.astro:353–360): a version is retrospectively hidden if the next is issued within seven days. A genuine v3 issued October 20 would hide adopted v2 (October 15) and its historical scores. Current v1 remains visible, but the claim that every released version remains visible is not guaranteed. Exclude only the explicitly identified September 17/18 drafts, or use explicit release metadata; elapsed time is not publication status.

3. Minor explanation issue (research/MODEL.md:62): “drops both, because the reported September matched the baseline” can be read as agreement with the original forecast, which the audit contradicts (September world production revised 99.41 to 101.30). The newer baseline's retrospective September estimate cannot demonstrate that its future recovery path or consumption adjustment is correct. The public audit properly calls these forward judgments. Match this paragraph to that explanation.

## Verified fixes

- Model introduction distinguishes current September -509 from archived August -507 tables.
- Holds monthly balances versus cumulative starting convention now distinguished.
- Closure rationale and sensitivity examples explicitly labeled historical v1.
- Spurious Gulf WPUFD4 reference removed.
- Continuing monthly ledger renders; current September has five comparison rows.
- Share-card caption corrected; line functions partly corrected as described above.

Build, all-version numerical drift check, desktop/mobile browser checks at 1440/390, and local 22-chart/endpoint verification pass. No page errors or horizontal dashboard overflow. No assumptions or probabilities require changing for these findings. No deployment or commit.

## Recheck after Qwen's fixes — all three findings resolved

The current working-tree changes resolve findings 1–3 above; those objections are withdrawn.

- Both share-card axis builders explicitly include rebase_start. Browser execution of the built card confirms labels August/September/October and all three scenario datasets begin [null, -2, October target]. Saved public/og-supply.png visually checked: revised October 6 caption, September start, expected endpoints and readable layout.
- Score-history release selection now explicitly excludes only September 17/18. No elapsed-time inference remains, so a quick subsequent revision cannot remove issued v2 from the ledger.
- The holds explanation identifies adopting the newer baseline as a forward judgment and distinguishes its retrospective September estimate. Shortened that explanation into two paragraphs during this review without changing its figures or assumptions; build regenerated the content mirror.
- All numerical world-stocks data (including issued records, outcomes and anchors) equal commit 9f1453a exactly. No probabilities, assumptions, forecasts or scores changed.
- Build, all-version drift check, full selftest, desktop/mobile browser checks (1440/390), local 22-chart/endpoint verification and whitespace check pass. Share-card runtime checked separately. No implementation findings remain from this review. No commit or deployment.

## Final sensitivity-note review

Recomputed standoff-partial-recovery.py successfully (it has no CLI argument parser; invocation writes its research results). Issued standoff reproduces -1547.7985; midpoint -164.7795 since February = +342.2205 against August, a +1383.0191 difference from standoff. Both reference frames and the rebuilding-versus-full-recovery distinction are present in meta.endpoint_frames. No numerical issued model data differ from 9f1453a.

Public sensitivity note correctly states no further Gulf recovery plus non-Gulf growth, identical consumption, illustrative status and unchanged odds/paths. Removed only its implementation-path parenthetical, which called the calculation “not published” immediately after publishing its result; regenerated content mirror. Midpoint remains absent from active chart records.

Build, all-version calculation check, desktop/mobile browser review and local 22-chart verification pass. Prior three implementation findings remain resolved. No remaining material finding in the final note or sensitivity arithmetic. This verifies arithmetic and presentation, not predictive skill: the unresolved EIA/IEA measurement difference and the flat Gulf production judgment remain substantive limitations. No commit or deployment.
