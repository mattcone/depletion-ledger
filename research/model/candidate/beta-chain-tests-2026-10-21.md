# Beta v3 full-chain validation — 2026-10-21

The chain: observations → beta odds (the selected spec) → beta production schedule
(the stated route-bounded judgment, with its pre-committed revision rules) →
consumption (0, the v2 convention) → probability-weighted storage. Endpoints are the
Dec 2027 cumulative on the Feb 2026 basis (mb); the chart basis adds +507 (the frozen
August anchor). The issued v2026-10-15 forecast is untouched throughout.

Reference (issued beta vintage, data to Oct 17): STATE 0.6/99.4/0.0; HORIZON 15.3/49.9/34.9; Dec 2027 standoff -1,036.9, central -1,434.9.

## Case 1 — Regional exports rise while Hormuz stays restricted

Inputs: Kpler regional 7-day avg 19.041 → 21.0 mb/d (a new edition, data date ≥7 days later); strait 7.894 unchanged; crossings 10/day; confirmed losses 1.

- ODDS: unchanged (15.3/49.9/34.9) — BY DESIGN: the beta odds spec keys on STRAIT throughput (7.894), crossings and losses. The regional export measure is the STORAGE-side input (the production connection), not a state input — the two channels are separate measures and are never conflated.
- PRODUCTION: the storage-side rules do NOT map this print to a cap by themselves — no rule lifts the increment cap mechanically. The demonstrated bypass ROUTING increment rises with the new edition (regional 21.0 vs 19.041), and a DATED HUMAN decision would re-derive the next vintage's cap from the component sums (Fujairah/Oman + Red Sea, Gulf-attributable). SENSITIVITY ILLUSTRATION of what such a decision could produce (cap 2.0 → 3.0, schedule shape unchanged):
- STORAGE IF a human lifted the cap to 3.0 (illustration, not a rule): standoff endpoint -1,036.9 → -838.4; central -1,434.9 → -1,335.9 (+99.0).
- The stored re-examination condition does NOT fire: regional 21.0 < 23.3 (prewar regional baseline) and there is no comparable-basis 'at/above prewar' confirmation — the condition needs BOTH legs plus a dated human decision.

## Case 2 — High throughput with continuing attacks

Inputs: strait 17.267 (pre-war volume); crossings 20/day; confirmed tanker losses 3 (attacks continue).

- ODDS: HORIZON 36.6/40.4/23.0 vs reference 15.3/49.9/34.9 — the throughput channels move the odds toward holds (holds share 15.3 → 36.6; lapse 34.9 → 23.0) but do NOT flip the regime: with 3 confirmed losses the danger channel keeps a real lapse tail (23%), and the 0.5 transits weight (the documented hypothesis) plus the volume median 15.0 (17.267 is only ~1.25σ above) keep the odds standoff-dominated. With losses back to 1 the same throughput flips holds-dominant: 54.3/32.5/13.2. That is the cross-check working: pre-war barrels with continued attacks are NOT treated as the corridor-holds regime.
- PRODUCTION/STORAGE: the scenario PATHS are conditional and unchanged; the central projection moves through the ODDS only — Dec 2027 central -1,434.9 → -701.5 (+733.4), the holds path (the EIA baseline path) gaining weight. This is the shipping-responsive part of the beta: recovered strait flows re-weight the storage lines even while losses continue.

## Case 3 — Higher volumes without higher counts

Inputs: strait 15.0 mb/d (recovering barrels); crossings still 10/day (no count growth); losses 1.

- ODDS: HORIZON 19.6/48.0/32.5 vs volume-only 30.4/43.1/26.4. The stale count (10/day, near the standoff lambda 10) DRAGS the holds share down by 10.9 pts — the count-vs-barrels cross-check working as designed (cargo sizes, load factors and shuttle geometry can move barrels without moving crossings; the 0.5 weight is the stance on that, a documented hypothesis).
- STORAGE: central -1,434.9 → -1,287.2 — partial response: the odds moved, the paths did not (the standoff path is a conditional, not a function of this print).

## Case 4 — Crude strong, products weak

Inputs: a hypothetical same-basis split (crude 82% of prewar, products 44% of prewar — the DPA Oct 20 print, UNRECONCILED).

- NO RESPONSE, and that is the honest answer: the model input is TOTAL-OIL strait throughput; no same-definition crude/product split series exists (the DPA print is relative-only, crude-anchored, window unspecified — see the shipping framework §4). The beta spec has no crude/product channel and does not invent one from an unreconciled print. A "weak products at high crude" state is UNREACHABLE until a same-basis split series exists — flagged missing input, not silently approximated.
- STORAGE: unchanged at the reference vintage. The total-oil print (7.894) is the only volume the chain consumes.

## Case 5 — High prices with recovered throughput

Inputs: strait 17.267; crossings 20/day; losses 1; Brent 130 (a lapse-era price with holds-era flows — the exact contamination the candidate removed).

- ODDS: HORIZON 54.3/32.5/13.2 — IDENTICAL whether Brent is 108.79 or 130: price is NOT a state observation in the beta spec (the candidate's removal stands; at high prices the old channel put ~64% of its pull on LAPSE while flows said holds). Price keeps its two documented roles: the draw-rate band (reference calculation) and the judgment's EIA-spread future-risk trigger at monthly STEO releases.
- STORAGE: central -1,434.9 → -92.1 — driven entirely by the throughput channels; a price move alone cannot move the beta storage lines.

## Case 6 — Exports supported by inventories, production not demonstrated

Inputs: Kpler regional rises to 21.0 (exports up) BUT the OPEC November MOMR shows October OPEC at 21.49 (flat at September) — the export growth is inventory-supported, not production.

- The shared SCREEN fires on the observation: October OPEC 21.49 <= September 21.49 (a Reuters-survey-based estimate). The screen's action: dated human review of the export->production bridge; if the production evidence does not support the bridge, the next vintage's standoff schedule reverts to the issued v2 standoff schedule (its exact frozen delta-P, read from world-stocks-assumptions-v2026-10-15.json). It names its schedule source: world-stocks-assumptions-v2026-10-15.json — the exact frozen v2 ΔP is read from that file, not hand-supplied.
- WITHOUT the screen's action (exports alone): standoff -838.4, central -1,335.9.
- WITH the screen's action (revert to the issued v2 schedule): the beta standoff coincides with the issued v2 standoff path — standoff -1,547.8, central -1,689.8 (-353.9 vs exports-only).
- This is why the bridge is stated as an ASSUMPTION with a dated review screen: export growth never converts to production mechanically (the barrels↔production relationship is not established; inventories and cargo timing are the unobserved channel).

## Case 7 — Renewed damage / throughput collapse

Inputs: strait 2.0 mb/d (near-closed print, the Aug 18 class); crossings 3/day; confirmed tanker losses 5 (a renewed-damage week).

- ODDS: HORIZON 5.0/10.0/85.0 — lapse-dominant (volume 2.0 is below the 4.12M lapse boundary and the loss count is at the lapse lambda 4).
- STORAGE: central -1,434.9 → -2,733.6 (-1,298.7) — the lapse path (−3,165.7) carries 85% of the weight. If the damage is CONFIRMED at named fields/terminals, the MOOT condition applies: the EIA-baseline-based paths become questionable and the beta is re-anchored by explicit dated decision (a flow print alone does not trigger that).

## Case 8 — Preliminary revisions, stale and missing inputs

Three sub-cases on the data-quality states:

- STALE: the Oct 19 edition's 7.894 (data to Oct 17) re-run 4 days later (Oct 21) carries the SAME odds (15.3/49.9/34.9) with staleness REPORTED (4 days) — the vintage flags (the candidate's --volume-date/--transits-date) make staleness a printed property, never a silent assumption. The preliminary tier (last 7 days, Kpler's 'typically settle 1.5-2x higher' caveat) is provenance, not a confidence band — the chain consumes the print as published.
- MISSING: no volume print (counts only, transits 10 + loss 1): HORIZON 16.2/49.2/34.6 — the chain runs on the available channels; the missing channel is absent, not zero-filled. The counts-only odds sit within ~1 pt of the full-input reference (15.3/49.9/34.9) because 10/day is exactly the standoff lambda — the count channel alone carries the regime call here. The production schedule keeps the LAST CONFIRMED schedule (no invented update) until a new same-definition print arrives; that is a new vintage, logged.
- PRELIMINARY REVISION: if a future edition revises the 7-day average (7.894 → say the Oct 17 daily floor 7.363), the NEXT vintage re-runs at the revised same-definition print: HORIZON 15.2/49.9/34.9. This vintage is NEVER rewritten — the revision is a new dated file.

## Case 9 — Repeated observations with overlapping 7-day windows

The Kpler briefings' 7-day windows overlap by 6 days when editions are a week apart or less — successive prints are NOT independent observations. The stored condition handles this by counting EDITIONS with data dates ≥7 days apart:

- briefings [('2026-10-17', 19.041), ('2026-10-21', 20.5)], confirmed=False → False (data dates 4 days apart (< 7 — overlapping windows are not independent))
- briefings [('2026-10-17', 19.041), ('2026-10-26', 19.2)], confirmed=False → False (no comparable-basis 'at/above prewar' confirmation)
- briefings [('2026-10-17', 19.041), ('2026-10-26', 19.2)], confirmed=True → True (both legs met)
- briefings [('2026-10-17', 19.041), ('2026-10-26', 18.5)], confirmed=True → False (regional below 19 (got 19.041, 18.5))

## Summary

| case | what moved | why |
|---|---|---|
| 1 rising exports, strait restricted | storage only (next vintage's cap) | odds key on the strait measure; regional is the production-connection input |
| 2 high throughput, attacks on | odds move toward holds (regime does not flip); central via odds | losses=3 keeps the lapse tail; the 0.5 transits weight is a hypothesis |
| 3 volumes up, counts flat | partial odds response | the stale count drags (the cross-check, w=0.5 hypothesis) |
| 4 crude strong, products weak | nothing | no same-definition split exists — flagged missing input |
| 5 high prices, recovered flows | odds move only on flows | price is future-risk context, not a state observation |
| 6 exports up, production flat | standoff → issued v2 path (if the human review reverts it) | the OPEC screen fires; a dated human review decides; the screen names the schedule source |
| 7 renewed damage / collapse | odds → lapse; central drops | volume below 4.12M + losses at the lapse lambda |
| 8 stale / missing / preliminary | none in this vintage | staleness reported; missing channels absent; revisions are new vintages |
| 9 overlapping windows | condition logic | editions ≥7 days apart + the confirmation leg; no auto-promotion |

Greater responsiveness of the beta chain is NOT claimed as greater accuracy. The scoring test begins with the November 2026 prints (the first clean month).

