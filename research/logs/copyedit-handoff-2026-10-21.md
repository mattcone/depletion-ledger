# October 21 dashboard and forecast-archive copyedit

User requested a broad copyedit of the uncommitted changes, removal of stale dashboard model references, and a simpler model page. Followed the project's private copy style guide. Edited public prose and its source templates; no commit or deployment. Research logs, source reports, shadow-model artifacts, issued assumptions, targets and score data are preserved.

## Structure and wording

- Recast `/model/` as **The storage forecast archive**. Navigation/footer labels and metadata now say **Forecast archive** while the URL stays `/model/`.
- Combined the introduction and reference-frame explanation; combined audit and scoring method; combined calculation explanation with v2 assumptions; combined limitations and SPR discussion; combined sources and reproducibility notes.
- Put v1's original descriptive assumptions and tables behind an expandable archive, and put probability history and its recorded rule table behind another. The v1 framing sentence now calls v2 the October 15 assumptions rather than “current.” Original v1 scenario descriptions and all six v1/v2 monthly tables are preserved. V2 explanatory prose is shorter and uses historical framing; no issued calculation changed.
- Reduced twelve page navigation entries to eight, including results. Kept old section IDs as aliases to avoid breaking older links. Removed the active-looking probability display in the archive sidebar; all probabilities remain in the body/table and data.
- Kept the standing supply headline in place as previously requested by the user. Its editorial history remains in expandable source notes.

## Factual wording changes for Qwen's review

### 1. Dashboard intro and shared footer no longer advertise active forecasts

**Original:** “The charts show ... how storage could change under three possible outcomes, with odds for each.” Footer: “Each scenario shows what could happen under the assumptions on the model page.” Model lead: “How could the world's oil stocks change if shipping recovers ...?”

**Replacement:** Dashboard describes tracking reported data, estimates and agency forecasts. Footer explains dated source captions. Archive lead states the October 21 withdrawal and continued scoring of issued forecasts.

**Evidence:** Current index chart has observed IEA inventories, EIA outlook and persistence only; scenario and beta datasets and corridor-odds section were removed in Qwen's prior pass. Local model archive and saved records remain. Reason: old descriptions contradicted what readers can now see. No probability values or outcome definitions changed.

### 2. Dashboard crisis intro distinguishes exports from reported depletion

**Original:** “Since ... February 2026, the world has been using more oil than it produces. Saudi Arabia's bypass pipeline has restarted, but attacks and restrictions still disrupt shipping ... Brent's December contract was above $100 ... Stored oil makes up the supply shortfall.”

**Replacement:** Production/shipping disruption, recovery of Gulf exports despite attacks, costly transport, and the International Energy Agency's reported inventory declines through September. Keeps Russian refinery/export constraints and the SPR's historical low. Drops the extra Brent quote from the intro; price charts retain it.

**Evidence:** WSJ October 20 article, supplied in full by the user and previously verified in the dated log: https://www.wsj.com/world/middle-east/more-oil-is-now-coming-out-of-the-persian-gulf-than-before-the-iran-war-6a6d1670 . IEA October 14 observed series in world-stocks.json and source audit. This avoids treating exports as production or making a weekly export print establish a global surplus. The WSJ/Kpler all-route measure is not reconciled to the earlier confirmed-clearance briefing; no map label or model input was changed.

### 3. Withdrawal correction no longer claims all scenarios assumed flat Gulf output

**Original:** “The September and October paths assumed Gulf output near September's reported level for months”; export evidence “contradicted the core assumption ... that Gulf production had fallen below prewar level.”

**Replacement:** The scenarios linked shipping conditions to production paths; recovery in regional exports **challenged the production assumptions for continued standoff**. Exports alone do not establish production or a global surplus.

**Evidence:** Frozen scenario assumptions and published tables: holds follows the EIA recovery; standoff holds world production near September through 2026 and adds non-Gulf growth in 2027; lapse has its own reductions. Different scenarios were not all flat. WSJ establishes exports, not production. This narrows the inference rather than declaring a direct production measurement. Pipeline/shuttle/offshore-transfer explanation retained from the article. No causal quantity assigned to freight/insurance incentives.

### 4. Storage-chart introduction no longer overstates comparability

**Original:** “All three start from the same zero, so their gaps are the difference between what has been reported, what the EIA expects, and what the recent pace implies.”

**Replacement:** Identifies IEA observations, EIA outlook and continuation of recent trend, gives the August zero, and states that coverage differs. Caption explains reserve-to-commercial transfers without implying that every government withdrawal disappears from combined stocks.

**Evidence:** Saved anchor in the comparison records and the documented EIA-balance/IEA-observed-pool mismatch. No shared anchor can erase that mismatch. Chart values, reference date, line visibility and dataset calculations unchanged.

### 5. Archive uses historical framing and correct dashboard references

**Original:** “shown as −1,041 million barrels on the dashboard”; “You can see the revised October 15 (v2) paths on the dashboard”; “current (revised) chart”; present-tense descriptions of active odds and future revision workflow.

**Replacement:** Explains the February/August reference frames as archival calculations; points readers to v2 tables; identifies odds as recorded historical judgments. The probabilities and change-rule table are preserved. Scoring keeps first releases and continues under the existing policy. Experimental beta remains research-only.

**Evidence:** Current withdrawn state and unchanged record/table values. Scorecard generation code remains identical. Original September 19 chart code unchanged. Coverage caveat is retained; removed wording that could suggest the score itself was excused by the agency mismatch.

### 6. Combined and shortened historical explanations

**Original:** Separate baseline, formula, revision history, limitations, SPR, sensitivities, scoring and source sections repeated edition dates and caveats. “The model now uses ...”; “Return ... to compare the paths.”

**Replacement:** One calculation explanation, one limits section, condensed revision history, source/check details and a return link for reported data and agency outlook. Original assumptions, endpoints, units, source release versions, consumption-feedback limits, storage-availability limits, SPR release-decision limits, and first-release scoring remain.

**Evidence:** Existing MODEL.md before copyedit, saved inputs and script behavior. The September 9 closure attribution schedule is explicitly historical; v2's inherited adjustments are not claimed to imply the same total production loss. The EIA's September estimate/revision remains distinct from the IEA's monthly supply movement.

### 7. Supply narrative trims stale detail without changing its headline

**Original:** Long August production/country numbers and an older China-stock estimate beside September observations and the October outlook.

**Replacement:** Keeps the EIA July stock-build qualification and dated IEA annual-loss outlook; notes that later shipping reports show recovery. Keeps the announced 400M-barrel release separately from the observed 509M-barrel stock decline. Detailed current observations remain in charts/captions; removed older country/China details are retained in research history.

**Evidence:** Existing dated source text, IEA stock series, WSJ report. An announced release is not the same as a measured total-stock decline. No inventory series or release-program value changed. The IEA's forecast is attributed, not treated as superseded by a weekly export print.

### 8. Food-price timeline and SPR display wording

**Original:** Timeline was “not a forecast from this model”; SPR chart/hover called reference levels “the model's” thresholds.

**Replacement:** Timeline is “not a forecast of food prices”; SPR uses “reference levels” without linking them to the withdrawn scenario engine.

**Evidence:** Food timeline is a historical analogy; SPR display levels are independent annotations. No level, attribution, assumption or chart geometry changed. This pass does not newly validate the source's cavern-damage/operating-limit claims; those existing claims remain separately attributable to GEF/DOE.

### 9. WPSR watch copy and stale cascade panel

**Original watch:** “w/e” shorthand; “whether fuel stocks fall further” following an increase. **Replacement:** “week ending”; watch whether diesel stocks keep recovering. The exchange/Argus paragraph is shorter but retains the unconfirmed status and dates/volumes.

**Original cascade:** Next EIA report Oct 21; stocks 102.6M, down 2.5M, 12.3% below last year, week ending Oct 9; four-week use about 4.0M/day and 26 days' equivalent.

**Replacement cascade:** Next report Oct 28; stocks 104.3M, up 1.7M, 9.7% below last year, week ending Oct 16; four-week rate 3.9M/day and about 27 days' equivalent, explicitly not a countdown to empty. East Coast remains 22% below last year.

**Primary evidence:** research/data/wpsr/wpsr-2026-10-16/table1.csv and table6.csv; provenance at https://www.eia.gov/petroleum/supply/weekly/ . Table 1: distillates 104.286M vs 102.611M, reported weekly increase 1.674M, year-ago 115.551M (−9.7%); four-week products supplied 3.913M/day. 104.286/3.913 = 26.65 days, rounded 27. Table 6 East Coast 21.016M vs 26.830M (−21.7%, rounded 22%). Oct 28 schedule already recorded in the current verified watch item. Archive file hashes match provenance. This updates display text only; numerical time-series arrays unchanged. DOE/Argus confirmation remains unresolved as before.

## Preservation and scope

Compared all world-stocks JSON hashes before/after this pass: unchanged, including beta files. Compared branchWeights, branchTracks, SPR and commercial-stock arrays: unchanged. All three generated v2 table blocks and all v1 monthly tables: unchanged. Preserved the v1 chart and scorecard generation logic. No source data, dated research reports, candidate code or forecast assumptions edited.

The public copy and changed WPSR display facts were reviewed against the existing dated evidence. This is not a new accuracy validation of the shadow model or a fresh independent verification of every older news claim in the research logs. Kpler coverage reconciliation and the unmeasured shipping-to-production relationship remain unresolved.

## Validation

- Site build PASS; all-version scenario drift check PASS; whitespace check PASS.
- Rendered local build at 1440px and 390px: all dashboard comparison lines visible, no checkboxes/odds/beta links, no console errors or horizontal overflow.
- Archive: section links resolve, no duplicate IDs, all ten tables rendered, eleven disclosures work; expanding v1 does not cause page overflow. Scores and original chart still render.
- Inspected screenshots of dashboard chart, archive lead, and scorecard at both widths. Fixed an Astro whitespace issue joining the audit link to the next word.
- Site has one light theme; no separate dark theme to verify.
- No staging/prod deployment and no commit.

### 10. Social-preview image still advertised withdrawn scenarios

**Original:** /og/supply source and og-supply.png showed holds/standoff/lapse lines under “How oil in storage could change through 2027,” with issued scenario endpoints. Shared metadata described an unrelated SPR chart.

**Replacement:** The preview now shows the same observed IEA series, EIA outlook and recent-trend comparison as dashboard Panel B. It uses the existing saved comparison records and frozen August reference without changing values. Headline matches the simplified dashboard; caption gives the releases/observation cutoff and coverage qualification; footer displays EIA +1,639 and trend −763 million barrels by December 2027. Replaced the unrelated SPR image-alt text with the actual chart description. Rounded only axis labels/range, not data.

**Evidence/reasoning:** Visual inspection of the uncommitted PNG and its Astro source exposed stale public projections despite dashboard withdrawal. The correct plotted series are already supported by world-stocks.json and the dashboard. Updated site/src/pages/og/supply.astro and SiteMeta.astro and regenerated public/dist PNGs with the repository's native chart renderer. This is a public presentation correction, not a new model version. No AI image editing or forecast calculation changes.
