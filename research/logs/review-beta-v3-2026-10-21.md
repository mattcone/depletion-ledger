# Beta v3 build review — October 21

Reviewed current generator, serialized assumptions/records, method doc, chain tests and dashboard changes. Read-only numerical reproduction; no beta numbers, assumptions, published forecasts or odds changed. Recommendation: do not promote staging to production until the material defects below are resolved.

## P1 — Production anchor is the wrong month

`gen-beta-v3.py` ANCHOR_LEVEL=102.10 is labeled September production, with “verified against workbook” claims repeated in method doc, JSON and correction log. Read the frozen workbook through its existing canonical loader (regen-scenarios.load_baseline):

| month | production mb/d | consumption mb/d |
|---|---|---|
| 2026-09 | 101.3037931 | 104.2414188 |
| 2026-10 | 102.10465956 | 102.77556996 |
| 2027-12 | 111.4912152 | 106.33014982 |

102.10 is October’s forecast, not September’s estimate. September 101.30 was correct in the draft; the asserted “correction” reversed it. Current beta production therefore starts ~0.7962 mb/d above the stated observed baseline before its added recovery. Over 457 forecast days, that adds 363.8666M barrels to the beta standoff endpoint and ~181.5177M to the central endpoint at the stored standoff weight.

Isolating this anchor error only (not recommending a forecast): standoff becomes approximately -1,036.9M vs February / -529.9M vs August, rather than -673.0/-166.0; central becomes approximately -1,434.9/-927.9 instead of -1,253.4/-746.4. Any accepted anchor change needs regenerated tables, artifacts and public line.

Method doc also says issued v2 standoff December production is 113.99 and beta is more conservative. Actual frozen v2 adjustment -8.1907 plus December baseline 111.4912152 = **103.3005152**. Current beta is **106.10**, HIGHER than v2 standoff and LOWER than EIA baseline. “Both issued paths assume more recovery” is false. Read actual frozen v2, not a hand-entered summary. Existing self-checks confirm formulas using ANCHOR_LEVEL but never independently assert its month/source value. Add a meaningful anchor test tied to the dated source field.

## P1 — Vintage writer overwrites issued assumptions

CLI accepts new --version/--issued, and data filename uses ISSUED. But assumptions output path and every assumptions_ref remain hard-coded to world-stocks-assumptions-beta-v3-2026-10-21.json. A future vintage rewrites that old assumptions snapshot, breaking existing records’ references/hashes. Even the current vintage opens both files with `w` and has no overwrite guard. “Frozen at issue” is not enforced. Build both files under a new validated vintage identity, refuse overwriting different issued bytes, validate first, and write as one consistent operation. Guard failure paths so partial writes do not corrupt records.

The script also fixes FORECAST_MONTHS at October 2026–December 2027 and issued_before_outcome=True for all targets regardless of future --issued values. Future vintages must classify partly elapsed/already reported months rather than label all October targets as issued before outcome. Preserve old vintages and explicit scores.

## P1/P2 — Claimed full-chain responses and kill-switch are not implemented as tested

The generator takes --g2026-end/--g2027-end as manual values; regional/bypass evidence is a static description. It does not consume an OPEC observation or apply an override. Chain case 1 manually changes g2027 to 3.0 after inventing regional 21.0, without a computed component-to-recovery rule. Case 6 manually supplies exact issued-v2 ΔP values; this proves the calculator reproduces values when handed those values, not that a production observation triggers the advertised rule. The two-briefing helper exists in the TEST file only. Reframe as judgment/sensitivity tests unless actual issuance/review logic is implemented; do not claim it is an end-to-end observation response.

The override text also revives an earlier rejected inference: comparing a future MOMR OPEC aggregate with 21.49 (a Reuters survey September aggregate) conflates agencies and measures; an OPEC total at/below that threshold does not uniquely establish Gulf or world production. Manual review with comparable source series is needed. Any automated reset needs explicit supported criteria and a test that supplies the observation, not the final desired schedule.

## P2 — Route-to-production bridge is stronger than the evidence

Fujairah/Oman+Red Sea increments relative to prewar routing are not automatically unexploited Gulf capacity beyond the observed September production anchor. Some recovery may already be in September; route substitution can increase a bypass without net new exports/production. Source flags no origin attribution for some cargos. The claim that ~1 mb/d at Sidi Kerir is “NOT Gulf-origin” because the terminal is Mediterranean is unsupported; terminal location does not determine crude origin (Sumed connects Red Sea to Mediterranean). Thus the 1.65–2.65 “demonstrated Gulf-attributable” range is an assumption, not a measured production bound. State that uncertainty and avoid double-counting September recovery. The ±0.5 inventory bridge is also a judgment with no represented inventory sensitivity in the issued beta.

## P2 — Public explanation not delivered as requested

Dashboard has checkbox and central line, but no nearby beta odds, data cutoff, or public link to beta assumptions/method. Only research/MODEL.md is synchronized into site docs; the new research/beta-forecast-v3-2026-10-21.md is not a rendered page. The caption says central over “the three scenario paths” despite the visible issued standoff being a DIFFERENT path and nearby displayed odds being published 10/50/40, not beta ~15.3/49.9/34.9. Readers cannot reconstruct this line. Add concise explicit beta odds, source cutoff, a working public method link and a distinction between beta branches and issued lines.

## Scoring / tests

Re-ran all 21 chain assertions with report output redirected to /tmp/beta-chain-review.md: PASS. They do not catch the anchor/date error or enforce immutable vintages. Existing scoring default reads world-stocks.json / forecast_records, whereas beta data use a separate file with records; no beta scoring integration was demonstrated. Do not promise automatic November scoring unless a dedicated adapter/command is implemented and tested (or clearly document manual scoring).

No numerical corrections made silently. This is a handoff to Qwen for correction/review, not approval to re-issue any forecast or deploy.

## Additional verification

Site build and git diff whitespace check PASS. Browser checks at 1440px and 390px PASS: beta checkbox initially off, enables/disables its dataset correctly, no horizontal overflow or console errors. These checks validate presentation, not the forecast inputs.

Primary sources for the Sidi Kerir origin distinction: [SUMED facilities](https://www.sumed.org/?p=facilities), [SUMED crude transport](https://sumed.org/crude/), and [SUMED main pipelines](https://www.sumed.org/index.php/sumed-system/main-pipelines.html). The system carries crude between Ain Sukhna and Sidi Kerir; Mediterranean loading location does not establish non-Gulf origin. Cargo-specific attribution remains unverified.

## Recheck after Qwen's re-issue (2026-10-21)

Current files inspected again. Withdraw the original anchor and positioning objections for the corrected artifact: September is now read as 101.3037931; shipped endpoints are standoff -1036.893 and central -1434.881M (February basis), and the assumptions hash matches. The dated filenames fix the hardcoded-path defect. The public /beta page and dashboard method link exist, and the observation screen is explicitly manual. All 22 chain assertions and the site build pass; published pipeline drift check passes. This supersedes the earlier status of those specific findings. No model or public copy changed by this review.

Two remaining writer defects reproduced using isolated temporary directories (repository artifacts untouched):

1. **P1: a genuinely new vintage crashes.** Import the module, redirect SITE_DATA to a temporary directory containing only copies of world-stocks.json and v2 assumptions, and run main with --version beta-v3-2026-10-22 --issued 2026-10-22. It raises KeyError: world-stocks-assumptions-beta-v3-2026-10-22.json at line 396. The conditional at line 404 applies only to issue_note, not the entire supersession dictionary; superseded is empty on first issue, yet its filename key is indexed unconditionally. Wrap the entire optional supersession dictionary in the condition. Test both fresh issue and re-issue.

2. **P1: failed validation still replaces issued files.** In a temporary copy with the current beta pair, change the reference holds endpoint by +1M in the copied published file, then call main with --reissue. It exits SELF-CHECK FAILED: holds_reproduces_issued_v2_endpoint, but hashes of BOTH beta files have already changed. Lines 596/659 replace files before lines 675–677 reject the run. Validate in memory and temporary serialized files before committing; preserve the old consistent pair on failure and test this failure path. Per-file rename is not a transaction across the pair.

Remaining qualification: routing increment is still called a Gulf-attributable bound, despite acknowledged unknown origin, substitution and inventories. It can motivate a judgment; it does not establish incremental production available above the September anchor. The new caveat narrows the claim but does not verify that bound.

Public copy cleanup before production: /beta currently says “not deployed to production”, which becomes stale when released; use durable experimental/unscored wording. The public method's anchor/schedule/positioning prose is largely hardcoded, although odds and endpoint table read JSON; update it with each new vintage or derive values from assumptions.

Review is of local current files. No independent re-verification of staging version 80c4a9a5 performed in this recheck. No forecast edits, commit or deployment.

## Resolution of the round-2 writer defects (2026-10-21, same day)

Both P1 writer defects and both public-copy items are resolved; no forecast
values changed and the frozen v3 artifact was NOT rewritten (sha256
2489b93b…/9a32c890… unchanged).

1. **New-vintage KeyError — fixed.** The re-issue metadata block
   (`supersedes_sha256` / `supersession_chain` / `issue_note`) is now built
   only when a re-issue is actually happening; a fresh issue carries no
   supersession metadata.
2. **Failed validation overwriting files — fixed.** Order is now: build both
   payloads → run ALL self-checks (the pre-write checks AND the
   serialized-pair consistency checks, computed against the payloads — the
   exact bytes about to be placed) → gate → write. A failed run never touches
   existing bytes. Writes are temp-write → temp-byte verify → rename →
   final-byte verify, with restore-from-snapshot on the final mismatch and no
   `.tmp` left behind on any path. The per-file rename not being a
   transaction across the pair is addressed by the pre-write gate: either
   both payloads validate or neither file is replaced.
3. **Both reproductions are now pinned by
   `research/scoring/test_gen_beta_writer.py`** (20 checks, all pass): fresh
   issue succeeds with no supersession metadata; same-version without
   --reissue is refused with bytes unchanged; name/version mismatch is
   refused; a forced pre-write check failure replaces NOTHING (the exact
   round-2 repro); a forced temp-byte corruption aborts the replace with
   bytes intact and no `.tmp`; a failed new-vintage run creates nothing; and
   a fresh v3-defaults run into an isolated directory reproduces the frozen
   v3 numbers (series, odds, checks block, records' identity+targets,
   assumptions modulo re-issue metadata). Generator test hooks:
   `--data-dir`, `--failure-injection pre|post` (documented as
   never-to-be-used-for-a-real-issue).
4. **Public copy cleanup — done.** /beta/ no longer says "not deployed to
   production" (durable "experimental and unscored" wording), and the
   anchor, increment schedule, route increments, Gulf-attributable range and
   the beta's Dec 2027 production are now DERIVED from the shipped
   assumptions file at build time (nothing vintage-specific is hand-entered
   in the page). The v2 (103.30) and EIA (111.49) Dec 2027 references are
   labelled frozen-baseline constants (frozen v2 ΔP schedule; sha-pinned
   workbook) — they do not vary per vintage; the generator's self-check
   asserts v2 < beta < EIA for every vintage.

Staging redeployed with the updated /beta/ page (version cda83407, geometry
gate PASS on shipped bytes, verify-live PASS — 21 charts, no console errors).
Prod unchanged (awaits green-light). Method doc correction log gained entry
5 (the two writer bugs + the pinning test).

Remaining qualification (unchanged, acknowledged): the routing increment
motivates the judgment cap; it does not establish incremental production
above the September anchor. That is stated in the assumptions
(`route_basis.gulf_attributable_note`), the method doc §3.2 and the /beta/
page.

## Independent recheck after writer-test fixes

Re-ran test_gen_beta_writer.py: all 20 checks PASS. Withdraw the new-vintage KeyError and validation-before-write objections: both reproductions are resolved. The test also reproduces shipped numeric series, odds and targets without changing repository artifacts. Public copy now says experimental/unscored and derives the main production values from assumptions.

**P2 remaining writer hardening: second-file I/O failure leaves a mismatched pair.** This is separate from pre-write validation, and does not invalidate the current shipped forecast. Reproduced in a temporary directory: create a fresh default pair, save both bytes, then reissue while monkeypatching os.replace to raise OSError only when the destination filename starts world-stocks-beta-. The assumptions rename succeeds first; records rename raises; there is no outer rollback, so assumptions bytes change, old records remain, and the records' assumptions_ref SHA no longer matches. The final pair-hash check is never reached. Current post injection corrupts the FIRST file's temp bytes, so the 20 tests do not exercise this. Wrap BOTH writes and final verification in one rollback handler for ordinary exceptions and verification failures; restore both snapshots (or remove both new outputs) and clean temps on any failure. Add second-write and second-file final-verification failure tests. This is recoverability on a handled I/O failure, not a demand for crash-proof database transactions.

No forecast, probability or public copy edits; no deployment. This finding concerns future writer operation, not the validity of the already generated forecast.

## Resolution of the round-3 P2 (pair-atomicity), same day

Fixed and pinned; no forecast, probability or public-copy change; the frozen
v3 artifact was NOT rewritten (sha256 2489b93b…/9a32c890… unchanged).

- Both writes (and the final post-run hash verification) are now wrapped in
  ONE pair-wide rollback handler in the generator. On any failure —
  verification failure or an ordinary I/O exception such as the reproduced
  `OSError` on the second rename — both files are restored to their pre-run
  bytes, or both new outputs are removed on a fresh issue, and temps are
  cleaned. A handled I/O failure can no longer leave a mismatched
  assumptions/records pair. (Scoped as requested: recoverability on a handled
  I/O failure, not crash-proof database transactions.)
- The reproduction is now an executable test: `--failure-injection second`
  makes the second rename raise an ordinary `OSError` after the first file
  has been replaced. Case 5b (re-issue): the already-replaced first file is
  restored, both bytes identical, no `.tmp`. Case 6b (fresh issue into an
  empty dir): both new outputs removed, dir left empty.
- `research/scoring/test_gen_beta_writer.py` now runs **24 checks, all PASS**
  (was 20). The frozen-v3 numeric reproduction (case 7) still passes, and the
  published-pipeline drift check + selftest still pass.

No deployment. Prod unchanged (awaits green-light); staging still cda83407
(the /beta/ page is unchanged by this fix — it is a writer change only).
