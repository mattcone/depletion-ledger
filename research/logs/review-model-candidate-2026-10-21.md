# Review of Qwen’s October 21 model candidate

Read-only review of candidate code, generator, source framework, archived Kpler text/provenance and dated research logs. No candidate or published model code, inputs, assumptions, targets, odds or site files edited. Recommendation: useful experiment, not ready for adoption or automatic storage-path promotion.

## P1 — Historical replay inputs do not match the dated record

research/model/candidate_validation.py BACKTEST September 16 uses transits 17, losses 0, Brent 106, volume 10.14, generating HORIZON current 15/50/35 and candidate 33.7/41.7/24.6. research/logs/2026-09-16.md:143 explicitly records transits 4, losses 1, Brent 108.75, corridor-flow absent, with current HORIZON 5.4/11.8/82.8. The day’s reporting documents four vessels on September 15 and a revised seven on September 14. A search of the September 16/September 9 logs did not locate the candidate’s 10.14/17 input vintage. Do not call the unsubstantiated input set an as-of replay. If a different intraday snapshot supports it, supply the exact timestamp and primary archive; otherwise reconstruct from actual dated observations.

Read-only rerun at the logged September 16 observations:
- current: 5.4 / 11.8 / 82.8
- candidate: 6.5 / 16.0 / 77.5
This reverses the narrative of candidate optimism that day. Other replay rows need the same source/vintage audit; the hard-coded observed AFTER descriptions are not outcome scores. The report’s “flat at 15/50/35 across all seven weeks” also contradicts its OWN September 23 row (14.3/47.4/38.3). No scored comparison supports candidate_validation.py’s “at least as good as persistence” statement.

Fairness issue: controlled comparisons use CUR (counts 12, volume 7.6) for the old model and CUR_FRESH (counts 10, volume 7.894) for the candidate. Both should also be run at identical inputs to isolate the code change, then show the input-refresh effect separately. Current-code replay is also distinct from the actual historical model version used at issue.

## P1 — DPA/Kpler reconciliation is conjecture, not an established match

shipping-input-framework.md:85–97 and main deliverable multiply the DPA crude-only 82% by an independently reported ~13.5 mb/d baseline, infer a product denominator by subtraction from another total baseline, then put the estimated 12.7 total inside 1.5–2 times 7.894 and declare the two reports consistent/reconciled. Scope, origin exclusions, vintage, time window and compatible product baseline are not established. Kpler’s historical observation that preliminary figures have often revised 1.5–2x is NOT a confidence/settlement band for this observation, nor a conversion between definitions. Leave reconciliation unresolved until same-basis dated data exist. Scenario tests may illustrate revision sizes but cannot validate the current measurement or forecast its revision.

Related source-framework arithmetic error: section 2 says Total Hormuz Clearance includes Fujairah/Oman, then section 3 adds only Red Sea. Archived original briefing gives 7.894 strait + 2.280 GoO STS = ~10.173 clearance; regional adds 4.563 Fujairah/Oman + 4.304 Red Sea = 19.041 (rounding). Putting Fujairah/Oman inside the 10.173 measure cannot reproduce the published totals. Fix names/composition across framework, deliverable, generator and JSON.

## P1 — Midpoint promotion gate does not establish a production path

research/model/gen_candidate_recovery_path.py halves the issued world-production adjustment. This is a midpoint of TWO WORLD PRODUCTION LEVELS with identical consumption, mathematically the existing sensitivity, not a measured “half-rate Gulf recovery.” There is no Gulf/non-Gulf decomposition here. Shipment recovery, even two regional observations above a threshold and a comparable prewar print, does not identify world production, inventories, domestic use or a 2027 recovery rate.

Keep this as an illustrative sensitivity; remove automatic issuance action in promotion_trigger. Proposed 19/17 thresholds and 5.8 pipeline premise have not been calibrated to the path. “Floor”/“ceiling” are scenario endpoints, not physical bounds or a supported interval for the eventual outcome. Any confirmed damage does not logically restore the old fixed production level either. A trigger can initiate a review without automatically picking this midpoint. The documented 1.5–2x revisions do not place a world-production midpoint below a regional-flow uncertainty band: these are different quantities.

## P2 — Transit weighting rationale and role separation remain unproven

The source briefing explicitly counts 34 dark/unknown-route crossings AMONG its 43 counted crossings and describes satellite/human-intelligence confirmation. Thus 79% dark does not establish that this Kpler count series is AIS-only or that 79% were missed. Candidate docstring calls it “AIS-visible ship counts” and source framework calls four/day a dark-AIS floor without establishing same coverage/window. Low vessel counts and high barrel volumes can also reflect cargo sizes, load factors and shuttle geometry. Dependence between counts and volumes is plausible; downweighting by 0.5 does not establish a correct joint likelihood, and historical author intent is not calibration.

The code still multiplies volume, counts and losses into ONE latent state. The conceptual three-role table is not three separately estimated processes. Bypass recovery still leaves filter output unchanged by design; its impact is delegated to an unadopted storage sensitivity. Test high exports + “attacks” actually varies confirmed LOSSES; ordinary attacks are not a candidate input. Clarify what is and is not implemented.

Also, the count Poisson alone at counts=12 normalizes ~15.68% holds / 84.32% standoff / 0.001% lapse. It does not by itself pin standoff at ~100%; the claimed near-100% no-volume result also includes the dominant PRICE channel. Attribution of dominance must use channel ablations on the full filter.

## P2 — Not all adoption requirements implemented

Candidate CLI accepts bare values with no source dates/windows/vintages, age checks or missing-vintage output. A separate documentation table is helpful but is not automatic staleness reporting. It also substitutes a 7-day count average for a model convention documented as a rounded 3-day average without testing how window changes affect the likelihood. The shared inherited volume medians are still crude-anchored while input is total oil (already admitted in existing code); deleting price does not resolve that calibration issue.

Validation docs mix probabilities with percentages (e.g. 2.998e-08 fraction next to 99.99997%), contain inconsistent/mislabeled scenario input sets, and call a non-monotonic displayed lapse sequence monotonic. Regenerate tables directly with uniform units and exact input columns rather than manual transcription.

## Verified positives / tests

- Candidate is isolated; no published-model/site/issued-assumption changes in git status.
- Removal of Brent from the current-state calculation works; it is retained as logged context only.
- At fresh inputs 10/1/7.894, reproduced candidate state ~0.5704/99.4293/0.0003%, HORIZON 15.2567/49.8858/34.8575%.
- At counts 10/losses 1/volume 17.3, reproduced HORIZON 23.0562/46.4195/30.5243%.
- 11 candidate tests and 36 existing model tests pass. These verify chosen behavior, not source validity or predictive accuracy. Frozen-model drift check also passes.

## Requested next pass

Reconstruct sourced, timestamped replay; separate identical-input code comparison from refreshed inputs; remove accuracy/persistence claims without scoring. Correct cumulative flow composition and leave DPA reconciliation unresolved. Keep world-production midpoint explicitly illustrative with no automatic promotion. Reassess count treatment with a volume-only comparator and measured coverage/window uncertainty. Record remaining judgment parameters as hypotheses; prospective shadow runs can proceed after these corrections, with issued paths/odds preserved.

Final verification: scoring selftest PASS (expected corruption cases detected), git diff --check PASS. Review created this handoff only; no model or publication changes.


## Recheck after Qwen’s D1–D6 corrections

**Verdict:** candidate is now suitable for prospective SHADOW runs alongside the existing model, with published odds and issued storage paths preserved. This supersedes the earlier blanket “not ready for adoption” for the limited shadow-run use case. It does not approve publication of candidate odds or issuance of the recovery midpoint.

Verified in current files: September 16 replay now uses logged 4/1/108.75/absent inputs; candidate 6.5/16.0/77.5 and documented 5.4/11.8/82.8 reproduced. Chronological claims distinguish historical code versions; the old all-seven-weeks-flat and persistence-accuracy assertions are withdrawn. Identical-input comparisons separate code effects and refreshed inputs. DPA reconciliation marked unresolved. Clearance/regional component placement corrected. Count’s dark-route statistic no longer asserted to be an AIS miss rate; 0.5 remains a hypothesis. CLI vintage dates report four-day age for both October 17 observations as of October 21. Automatic production-promotion action removed; human review/decision required.

**Material leftover in unused storage sensitivity:** generator research/model/gen_candidate_recovery_path.py:124,131,133 and generated JSON lines 94,135,137 still say “HALF its pace,” “1.5–2x band,” compare a world-production midpoint to the midpoint of that regional-flow band, and claim the eventual path lies between these illustrative endpoints. These survive despite removal of the automatic trigger and are not justified by the arithmetic. Correct the GENERATOR and regenerate: name/define it as the month-by-month midpoint between two world-production levels; delete revision-band assumptions and claims that the endpoints bound reality. Keep as an illustration only. This does not block shadow-running the separate branch filter, but blocks using that artifact as evidence for a storage-path choice.

**Small reporting leftover:** candidate_validation.py:179–180 formats small state shares as raw probability (scientific notation) and larger shares as percent, despite claiming uniform units. Format x*100 plus % in the small branch too, or use fractions throughout. Does not change model calculations.

Tests rerun: 14 candidate + 36 existing = 50 pass. Frozen-model drift check passes. Source/parameter limitations remain explicitly unresolved: crude-anchored likelihood medians vs total-oil inputs, seven-day vs three-day count windows, judgment count weighting, unscored accuracy. No public or candidate code edits made in this recheck; only this review append.


## Review of production-path-assessment-2026-10-21.md

Read the complete memo and section F handoff. Retaining the issued version for scoring and avoiding an invented new trajectory is defensible; the memo does not establish that the flat path remains the best current production forecast.

Material issues for Qwen:

1. The new two-of-three rule contradicts itself. It calls October OPEC >=21.49 “recovery beyond September,” but equality is no recovery; it then separately says flat/declining October OPEC means retain. At equality, >= can combine with the regional condition to demand revision while the flat clause demands retention. Moreover OPEC aggregate includes non-Gulf production and is not world production or a country-specific Gulf series; forecast revisions and physical observations are different kinds of evidence. No calibration justifies voting these overlapping signals into a particular direction/interval. Use a scheduled evidence review, not automatic production-level inference from this tally.
2. The memo misquotes the frozen v2 path: December 2027 adjustment is -8.1907, not -8.36; 2027 non-Gulf increments start +1/6 and end +2.0, not +0.0...+1.83. Verified directly against site/src/data/world-stocks-assumptions-v2026-10-15.json. Issued file remains unchanged.
3. Regional decomposition double-counts GoO STS again: memo says regional 19.041 = clearance 10.173 + Fujairah/Oman 4.563 + Red Sea 4.304 + STS 2.280, totaling 21.320, not 19.041. Clearance already includes STS. Bypass 8.867 and baseline 6.219 imply incremental Fujairah/Oman+Red Sea 2.648, not ~4.5. Adding new STS 2.280 gives ~4.928 offset against the strait loss of 9.373 (rounding aside). Baseline vintage differences also need reconciliation before forcing exact regional arithmetic. Public data unchanged; these are memo corrections.
4. Production-source conflation: 21.49 / +1.78 is Reuters’s September OPEC survey, not established here as an OPEC MOMR number. Read Reuters syndication https://www.eleconomista.com.mx/mercados/produccion-petroleo-opep-aumento-septiembre-20261016-838965.html (Oct 16). The memo separately combines Saudi 8.372 direct-report figure with that survey. Keep each series and its change separate; September production recovery has already informed the September anchor, irrespective of a later publication date. It is not an observation of production recovering beyond September.
5. A single new direct observation can justify a review; not having a subsequent monthly print is absence of a test, not evidence favoring flat production. Likewise “consistent with ... exactly as much” claims equal support without a likelihood comparison. A working bypass establishes export capacity/flows, not the production level it supports. The newly proposed rule should not be represented as validated just because it is pre-announced.
6. An increased Saudi rate alone would not force OPEC or world totals upward if others fall. The illustrative paragraph that half of Saudi’s +2.0 guarantees OPEC +0.9 and world >101.3 needs explicit all-else-equal assumptions, comparable source definitions and arithmetic. No observations identify the replacement’s position between standoff and endpoint C; those remain illustrative endpoints, not bounds.

Other memo limitations: September monthly 15.5 vs preliminary seven-day 16.894/19.041 is not a like-for-like trend series; shipping windows/vintages must remain attached. Global stocks do not by themselves separate production/consumption; global land/on-water mix does not identify a Gulf inventory release. The memo says STEO ~Nov 4, whereas earlier project reviews corrected that to Nov 10; verify official release schedules before using a date as a commitment. This review did not re-audit the newly quoted WPSR numbers.

No code, issued model, probabilities or public copy changed in this review; this append records unresolved memo findings. Shadow runs remain appropriate.
