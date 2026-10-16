# Recheck of Qwen's v2 corrections

> Superseded where resolved by the [October 16 final recheck](review-2026-10-16-v2-final.md).

Verdict: substantial fixes verified, but the claim that everything is complete is
not supported. This recheck supersedes the previous delivery review where stated.
No source code, numerical inputs, probabilities or assumptions changed here.
No commit or deployment.

## Resolved findings

- Public audit heading now exists; built model page anchor resolves.
- All three archived v1 table bodies match HEAD's original table blocks exactly.
  v1 issued targets, anchors and issue metadata are preserved; added outcomes remain.
- Current v2 tables and per-scenario endpoints now agree. Standoff's non-Gulf schedule
  has the January increment restored and ends at approximately 103.30M b/d production;
  the cumulative endpoint is −1547.7985M from end-February (−1040.7985M from chart zero).
- Tooltip callbacks and the EIA December annotation use the ghost-dataset offset.
  Browser calls confirm proper labels for datasets 1–9. V1/EIA/trend checkboxes change
  the intended visibility groups at 1440px and 390px.
- Score selection now includes both v1 and v2 when they have outcomes for the selected
  month; it no longer immediately discards v1 when v2 first receives an outcome.
- Audit has the 8.18 / 78.13 / 8M arithmetic decomposition and identifies the limits
  of its causal interpretation. Lapse outcomes remain scored, with an applicability
  caveat. Forward assumptions are explicitly labeled judgments in the audit.
- Required dated storage revision entry now exists in judgment-history.md, with odds
  unchanged. The draft timestamp is distinguished from record issuance.
- All-version drift check and full generator selftest PASS, including version
  coexistence, advanced anchors and deliberate-corruption rejection. Previous failing
  selftest finding is withdrawn.

## Remaining accuracy and completeness findings

### 1. Current model introduction still describes v1

`research/MODEL.md:13–25` says all paths start at August zero, tables start at −507,
standoff ends at −1832.6 / displayed −1326, and the baseline is Sep 9. Current v2
computes from Sep −509 using Oct 6 baseline; standoff now ends at −1547.8 / displayed
−1041. The old “What the EIA baseline assumes” block also says storage paths have not
been updated for the September pipeline restart. Update the current explanation and
label any retained September source narrative explicitly as v1 history.

### 2. World production is mislabeled as Gulf production

The current standoff explanation calls **101.3M b/d** “Gulf production.” It is the
EIA **world total**. The new odds entry repeats the mistake and names “EIA WPUFD4”
as its source; WPUFD4 is a BLS producer-price series. Correct the prose/source to
EIA STEO world production; no numerical series change is needed. The explanation
of the v2 change also says growth now runs monthly “instead of stopping at 0,”
but v1 already had monthly non-Gulf growth. Remove that false history.

### 3. Score explanation still needs the agreed accounting and candid result

The dashboard says −2 is the reported −10 “rebased to the frozen anchor.” That is
not the operation: −2 = September cumulative −509 minus frozen August −507; the
8M difference from monthly −10 reflects prior-period revisions. It calls v2 the
“October 6” version instead of October 15. The required verbatim sentence is still
absent: “The scenarios were less accurate than the recent-trend baseline in the
first scored month.” Add it before caveats, as instructed.

The dashboard and public audit now say most of the apparent miss is coverage
rather than forecast error. The decomposition establishes an **unresolved difference**
between EIA's updated balance and IEA's observed stocks; it does not measure how
much arises from coverage versus estimation error or other reconciliation issues.
State this limit without dismissing the saved score. The research audit is more
careful about unresolved attribution than parts of the public explanation.
The public audit also incorrectly dates both releases to October 15: IEA was
October 14 and STEO October 6; October 15 was the audit/revision date.

### 4. Archived chart and score presentation remain incomplete

The model page has restored v1 tables, but no v1 chart or full September score table.
The dashboard ghost toggle is useful but does not satisfy the explicit request to
keep the original chart and score on the model page. A text discussion of standoff's
94M error is not the complete original scorecard.

The dashboard selects only the latest scored month and the two most recent model
versions. It supports v1/v2 comparison now, but it does not append a visible monthly
history; a third model version would drop v1. If the requirement is a continuing v1
ledger, pin the original version and render/archive the past monthly comparisons.

### 5. V2 plot still includes an August zero point

The fcLine function falls back to the shared August chart anchor for every record,
including rebased v2 records. Runtime data confirms the first plotted v2 point is
August 0, followed by September −2. The requested behavior was to keep August as the
axis reference but begin v2 at observed September −2. Return null before a rebased
record's rebase_start; the zero reference and v1 lines can still start in August.
This affects presentation, not the stored cumulative calculations.

## Validation

Fresh final build PASS; whitespace check PASS. Browser at 1440px/390px: 22 chart
registrations, no page errors or horizontal overflow on either page, public audit
anchor exists, all three comparison toggles target the correct datasets, all
non-reference global-storage dataset tooltip callbacks return the correct labels.
No implemented dark theme exists; these results do not claim a separate theme.
All-version drift and full selftest PASS. Current end-Feb v2 endpoints reproduce:
holds +1218.2396, standoff −1547.7985, lapse −3165.6884M. Calibration file unchanged.

The remaining items do not require another probability change or a new numerical
model. Finish the explanation and preservation requirements before calling the task done.
