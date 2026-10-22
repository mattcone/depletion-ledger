# Beta storage forecast v3 — method, 2026-10-21

**Status: EXPERIMENTAL.** A shipping-responsive beta layer over the issued
`v2026-10-15` world-stocks forecast. The issued forecast, its records, its
assumptions, its anchors, the published judgment odds and the scoring pipeline
are all **unchanged**. This beta is a separate, dated, frozen vintage: a new
observation issues a NEW file; this one is never rewritten.

- Data cutoff: 2026-10-17 (Kpler flow data date of the Oct 19 briefing)
- Issued: 2026-10-21
- Staging: https://oil-report-staging.me-fce.workers.dev (final version 80c4a9a5) — checkbox "Beta storage forecast (v3, experimental)", **off by default**; public method page at **/beta/** (`site/src/pages/beta.astro`). **Not deployed to prod.**
- **Re-issued 2026-10-21 (same vintage):** the first bytes carried a hand-entered anchor of 102.10 mb/d — the workbook's **2026-10** value, not 2026-09's 101.3038. Corrected per external review; the anchor is now read from the workbook's 2026-09 column at build time. The first bytes were never deployed. Superseded hashes are recorded in the artifacts' `supersession_chain`. See §8, entries 1 and 4.
- Files:
  - `site/src/data/world-stocks-beta-v3-2026-10-21.json` (series + records + frozen odds inputs)
  - `site/src/data/world-stocks-assumptions-beta-v3-2026-10-21.json` (the stated schedule, evidence, revision rules)
  - `research/scoring/gen-beta-v3.py` (generator; self-checks; re-runnable)
  - `research/model/beta_odds_evaluation.py` → `research/model/candidate/beta-odds-evaluation-2026-10-21.md` (the odds evaluation)
  - `research/model/beta_chain_tests.py` → `research/model/candidate/beta-chain-tests-2026-10-21.md` (9-case chain validation, 22 asserts; observations go through the shared rule functions)
  - `research/model/candidate/` (odds evaluation + chain test outputs)

---

## 1. What the beta is (and is not)

The beta connects the **shipping evidence** (Kpler strait throughput,
crossings, confirmed tanker losses) to **two** things at once:

1. **scenario probabilities** — via the reviewed candidate odds spec
   (Section 2), instead of the static published judgment odds;
2. **forward storage** — via the probability-weighted central line over the
   three conditional scenario paths (Section 4), one of which (the standoff
   branch) is NEW: it allows **partial Gulf production recovery through
   alternative routes while attacks continue** (Section 3).

What the beta does NOT do:

- it is not a confidence interval — the scenario envelope is a set of
  conditional paths, and the central line is a probability-weighted point;
- it does not promote or demote any issued path — the holds and lapse paths
  are the issued v2 paths unchanged;
- it does not let the odds update the storage forecast by themselves — the
  storage path turns on **production and stocks**, and the production
  connection (Section 3) is a stated, bounded, dated forward judgment with a
  pre-committed kill-switch;
- it does not convert barrels exported to world production mechanically —
  the bridge from exports to production is stated as an assumption
  (bounded ±0.5 mb/d equivalent) with a dated REVIEW SCREEN: a production
  print at or below the September reference screens in a human review, and
  nothing resets automatically (the OPEC November MOMR is the first direct
  observation).

## 2. The odds (spec v3, selected from the evaluation)

`research/model/candidate/beta-odds-evaluation-2026-10-21.md` resolves the
candidate's known weaknesses and selects the spec. Summary:

- **prior** 0.10 / 0.50 / 0.40 (the published judgment prior, unchanged);
- **volume** lognormal 15.0 / 8.5 / 2.0 (σ 0.35), weight 1.0 — total-oil
  strait throughput, same definition as the model input;
- **transits** Poisson 20 / 10 / 2, weight **0.5 — a documented hypothesis**
  (the barrels↔counts relationship is untested; first clean test: November
  2026 prints);
- **tanker losses** Poisson 0.2 / 1.5 / 4.0, weight 0.5 (the danger channel);
- **Brent is NOT a state observation** — context only (at 108.79 the old
  channel put ~64% of its pull on lapse while flows said standoff; the
  contamination is directional). Price keeps its two documented roles: the
  draw-rate band (reference calculation) and the judgment's EIA-spread
  future-risk trigger at monthly STEO releases;
- the documented state→horizon transition table; the **HORIZON row**
  weights the three scenario paths with a **fixed** weight across the
  horizon (the transition is folded in once; no time-varying re-transition).

At the freshest same-definition inputs (transits 10, losses 1, volume
7.894, data to 2026-10-17) the frozen odds are:

| | holds | standoff | lapse |
|---|---|---|---|
| STATE | 0.005704 | 0.994296 | 0.000003 |
| HORIZON (weights the paths) | 0.152567 | 0.498858 | 0.348575 |

The evaluation also shows (a) all candidate configurations agree at the
current inputs — the spec choice only matters for **regime-change
responsiveness**; (b) the transits weight is load-bearing (holds spans
22.0%→16.5% at (12, 12.0) and 37.5%→59.1% at (20, 17.267) across the
weight sweep); (c) the volume median (15.0) vs the pre-war total-oil level
(17.267) mismatch is documented and goes to the November recheck (a
same-definition refit), not to this vintage.

## 3. The production connection (the core)

The substantive new assumption: while attacks continue and the strait stays
restricted, Gulf production recovers **partially** through alternative
routes — not zero (the issued v2 standoff) and not the EIA-baseline pace.

### 3.1 The schedule

World production = **101.3038 mb/d** (September 2026 world production in the
frozen EIA STEO Oct 6 baseline — **read from the workbook's 2026-09 column
at build time, never hand-entered**; the 2026-10 column in the same workbook
is 102.1047 — a different month, and the value the first bytes of this
vintage wrongly hand-entered) **+ gulf increment g** **+ non-Gulf growth at
the issued v2 pace** (0 in 2026; +1/6 mb/d per month across 2027).
Consumption adjustment 0 (the v2 convention). g is the frozen v3 schedule:
0 at the September anchor → +0.5 by end-2026 (0.167/0.333/0.500 in
Oct/Nov/Dec) → +2.0 by end-2027.

| month | g (mb/d) | non-Gulf | intended world P | ΔP vs EIA baseline |
|---|---|---|---|---|
| 2026-10 | 0.167 | 0 | 101.47 | −0.63 |
| 2026-11 | 0.333 | 0 | 101.64 | −1.45 |
| 2026-12 | 0.500 | 0 | 101.80 | −1.91 |
| 2027-03 | 0.875 | 0.500 | 102.68 | −4.59 |
| 2027-06 | 1.250 | 1.000 | 103.55 | −6.68 |
| 2027-09 | 1.625 | 1.500 | 104.43 | −6.67 |
| 2027-12 | 2.000 | 2.000 | 105.30 | −6.19 |

(ΔP is DERIVED — intended minus baseline — and self-checked month by month.
The full table is in the assumptions file.)

**Positioning (honest):** by Dec 2027 the beta standoff's world production
(105.30) sits **between** the issued v2 standoff (103.30 = September level
+ non-Gulf pace — no net Gulf recovery) and the EIA baseline (111.49,
which assumes a large 2027 recovery). The beta standoff allows MORE Gulf
recovery than the issued v2 standoff — that is its substantive change — and
far less than the EIA base case. It allows only the demonstrated bypass
ROUTING increment to convert to production, at a capped pace.

### 3.2 Why the increment is bounded where it is (component sums, no double-counting)

From the Kpler Oct 19 briefing (7-day averages to 2026-10-17; archived at
`research/data/kpler/kpler-briefing-2026-10-19/`):

| component | current | pre-war | increment | treatment |
|---|---|---|---|---|
| Fujairah/Oman terminal loadings | 4,563 kbd | 3,416 | +1,147 | Gulf bypass — counted |
| Red Sea volumes | 4,304 kbd | 2,803 | +1,501 | counted, with caveat (below) |
| GoO ship-to-ship (STS) | 2,280 kbd | 0 | +2,280 | **NOT counted** — transloading; the cargo still transits the strait |
| **Gulf-attributable increment** | | | **1,147–2,648 kbd** | the schedule cap of +2.0 sits INSIDE this range |

- The Red Sea increment includes cargo with no confirmed load terminal.
  Kpler Insight reports Sidi Kerir (Sumed, Mediterranean) loading ~1 mb/d —
  the source does **NOT establish the cargo's origin**: the Sumed pipeline
  connects the Red Sea to the Mediterranean, so a Mediterranean loading port
  does not exclude Gulf origin. The range keeps the whole Red Sea increment
  unattributed at the low end (1,147) and fully attributed at the high end
  (2,648); the cap (2.0) is inside it.
- **Routing ≠ production.** This is a demonstrated ROUTING increment above
  prewar, not a measured production increment. New production available
  through bypass beyond September is bounded above by the increment above
  the routing level September was already forced to use — and some of the
  increment may be route substitution of EXISTING production or inventory
  drawdown rather than new production. The g caps (0.5 / 2.0) are a
  JUDGMENT inside this routing bound, not a demonstrated production level.
- The strait itself stays at its observed restricted level (7.894) — no
  normalization (that is the corridor-holds branch) and no further decline
  assumed (that would be a new-vintage input).
- The component sums reproduce the briefing's totals (clearance 10,173 =
  7,894 + 2,280; regional 19,041 = 10,173 + 4,563 + 4,304) — no
  double-counting between the STS and the strait figures.

### 3.3 The bridge (stated assumption, bounded)

Export growth → production growth requires: Gulf domestic use roughly flat
and Gulf regional inventories roughly flat (bounded ±0.5 mb/d equivalent).
**This is an assumption, not a measurement** — export growth can be
inventory-supported (chain test, case 6). The review screen:

> **REVIEW SCREEN:** an OPEC aggregate at or below the September reference
> (21.49 mb/d — a Reuters-survey-based September OPEC estimate) SCREENS IN
> a dated human review of the bridge. It is a screen, not a determination:
> the agency and measurement bases differ, and the comparison alone does
> not establish Gulf or world production. If the review finds the
> production evidence does not support the bridge, the next vintage's
> standoff schedule reverts to the issued v2026-10-15 standoff schedule
> (its exact frozen ΔP) — the beta standoff then coincides with the issued
> v2 standoff path. Nothing resets automatically; the first direct
> observation is the OPEC November MOMR (~Nov 10).

### 3.4 The revision rules (frozen in the assumptions file)

1. **REVIEW SCREEN** — as above (a production print at or below the
   September reference screens in a dated human review; the review decides
   reversion to the issued v2 schedule; nothing resets automatically).
2. **RE-EXAMINATION** (the stored illustrative condition, verbatim): two
   consecutive Kpler briefings with the regional 7-day avg at or above
   19 mb/d (data dates at least 7 days apart) AND a comparable-basis
   confirmation of the "total Middle East flows at/above prewar" print
   (definition + window printed). If it fires, a HUMAN decision (dated,
   logged) issues a new vintage with a standoff level between the beta
   standoff and the EIA baseline — **no automatic promotion**.
3. **MOOT** — confirmed damage to named Gulf fields/terminals: the
   EIA-baseline-based paths become questionable; the beta is re-anchored by
   explicit decision (a flow print alone does not trigger this).
4. **NEW VINTAGE** — any material new observation issues a new dated beta
   file; this vintage is frozen and never rewritten.

## 4. The storage paths and the central projection

Same reference frame as the issued paths: chart anchor 2026-08 / −507 mb
(frozen, "no change since August 2026"); rebase_start 2026-09 / −509
(IEA OMR October edition). The calculation is the ISSUED
production-minus-consumption engine (`regen-scenarios.py::compute`), against
the same frozen EIA workbook (sha256 pinned; a change aborts re-issue).

| path (Dec 2027) | Feb-2026 basis (mb) | chart basis (mb) |
|---|---|---|
| corridor holds (identical to the issued v2 path) | +1,218.2 | +1,725.2 |
| **beta standoff (partial recovery via bypass)** | **−1,036.9** | **−529.9** |
| corridor lapses (identical to the issued v2 path) | −3,165.7 | −2,658.7 |
| **beta central** (0.152567 / 0.498858 / 0.348575, fixed weights) | **−1,434.9** | **−927.9** |

Self-checks (the generator exits non-zero on any failure — 12 in the
re-issued vintage):

1. the beta holds path reproduces the ISSUED v2 holds record's endpoint to
   1e-9;
2. the beta lapse path reproduces the ISSUED v2 lapse record's endpoint to
   1e-9;
3. the same computation reproduces the ISSUED v2 standoff endpoint (the
   pipeline + inputs are right before the schedule is changed);
4. the anchor is the workbook's **2026-09** column (101.3038), not 2026-10
   (102.1047), read at import time with a sha256 guard on the workbook;
5. the standoff ΔP equals intended-minus-baseline, month by month, from the
   stated schedule;
6. the positioning check: v2 standoff (103.30) < beta (105.30) < EIA
   baseline (111.49) by Dec 2027;
7. the central line is the probability-weighted sum of the three scenario
   paths, month by month (re-verified on the serialized bytes);
8. the on-disk pair re-verifies: the assumptions sha256 matches the data
   file's reference, all records carry it, and the central is the weighted
   sum of the on-disk paths.

The scoring pipeline is untouched and re-verified: `regen-scenarios.py
--check` PASS, `--selftest` PASS.

## 5. The dashboard

One checkbox, **off by default**, in the world-stocks panel: "Beta storage
forecast (v3, experimental)". It shows the beta central line (cool gray-blue,
distinct from the warm scenario palette) on the same chart, same zero, same
axis. The published lines, their copy, the model page and the published odds
are unchanged. The beta record's anchor is verified against the published
anchor at build time (a mismatch throws — the rebased lines would not share
a zero). A new beta vintage is a new dated data file; the page import
points at the newest one.

The public method page (**/beta/**, `site/src/pages/beta.astro`) carries
the beta's own odds, its data cutoff, the production connection, the
positioning, and the revision rules — a reader never has to infer the beta's
odds or inputs from the dashboard.

## 6. Validation

- **Generator self-checks** (Section 4): all PASS.
- **Scoring regression**: `--check` PASS, `--selftest` PASS (published
  pipeline untouched).
- **Site**: build PASS; geometry gate PASS on the shipped bytes; verify-live
  staging PASS (21 charts, no console errors).
- **Vintage safety**: the generator refuses to write over an EARLIER
  vintage's bytes (version mismatch), requires an explicit flag to re-issue
  the same vintage (recording the superseded hashes in a
  `supersession_chain`), and re-verifies the written bytes atomically.
- **Full chain, nine cases** (`beta_chain_tests.py`, 22 asserts, all PASS —
  `research/model/candidate/beta-chain-tests-2026-10-21.md`):
  1. rising exports, strait restricted → odds unchanged (the regional
     measure is the production-connection input, not a state input); NO rule
     lifts the cap mechanically — a sensitivity illustration shows what a
     dated human cap decision (2.0 → 3.0) would produce.
  2. high throughput, attacks continue (3 losses) → odds move toward holds
     but the regime does NOT flip (standoff 40.4 vs holds 36.6; lapse tail
     23% — the 0.5 transits weight is a hypothesis); with losses back to 1
     the same throughput flips holds-dominant (54.3).
  3. volumes up, counts flat → partial response; the stale count drags
     holds down (the cross-check working).
  4. crude strong, products weak → no response (no same-definition split
     exists; flagged missing input, not approximated).
  5. high prices, recovered flows → odds identical with Brent 108.79 or 130
     (price is not a state observation).
  6. exports inventory-supported, production flat → the observation is
     fed through the SHARED screen (generator module), which fires and
     NAMES its schedule source (the frozen v2 assumptions file, read from
     disk — not hand-supplied); a dated human review then decides, and the
     screen's revert action collapses the beta standoff exactly onto the
     issued v2 standoff path (asserted to 1e-6).
  7. renewed damage / collapse → lapse-dominant (HORIZON 5.0/10.0/85.0);
     central drops to −2,697 (Feb basis); the MOOT condition needs
     CONFIRMED named damage, not a flow print.
  8. stale / missing / preliminary → staleness is reported, missing channels
     are absent (not zero-filled), revisions are new vintages.
  9. overlapping 7-day windows → editions <7 days apart do not count toward
     the two-briefing condition (asserted, via the shared rule); ≥7 days +
     confirmation fires (and still requires a human decision).

## 7. Gaps and open items

- **Kpler volume-basis reconciliation** (open with the user): 7,894 (Oct 19
  edition) is the confirmed same-definition successor of 7.6; the model
  input stays at 7.6 until the user adopts 7.894. The beta vintage uses
  7.894 (its stated data cutoff) — a new vintage re-runs at whatever the
  user resolves.
- **The 0.5 transits weight** and the **volume median 15.0 vs 17.267**
  (pre-war total-oil) both go to the November 2026 recheck with the first
  clean score month — not to this vintage.
- **Bloomberg's "total Middle East flows fractionally above prewar"**
  remains UNRECONCILED (no definition/window/vintage) — it does not feed
  the beta; the confirmation leg of the re-examination condition requires a
  comparable-basis print.
- **Gulf inventories** are unobserved — the bridge (Section 3.3) is the
  exposed assumption until the OPEC November MOMR tests it directly.
- The beta is **not deployed to prod** and does not score: it enters the
  scoring test with the November 2026 prints, like the v2 records did.
  Scoring is a MANUAL procedure for now (read the print, compute the delta,
  append to the score history) — there is no automatic scoring adapter for
  beta files yet; do not claim one.
- **Bypass qualification**: the routing increment bounds NEW production only
  because September (strait closed) was already forced to use at least the
  prewar bypass level; the g caps are a judgment inside that bound (see
  §3.2). The inventory bridge (Gulf use + regional inventories roughly
  flat) is the exposed assumption until the OPEC MOMR tests it.

## 8. Factual correction log (this pass)

- **The September 2026 world-production anchor was mis-stated as 101.30 mb/d
  in an early draft of the beta schedule and corrected to 102.10 mb/d before
  delivery.** Original claim: "September 2026 reported world production, EIA
  STEO Oct 6 edition = 101.30." Replacement: 102.10 mb/d — the September
  2026 production value in the frozen EIA STEO (Oct 6) workbook
  (`research/sources/eia-steo-2026-10-06.xlsx`, sha256 pinned), the same
  baseline the issued v2 paths adjust. Source: the frozen workbook itself
  (row 6, the September 2026 column), cross-checked against
  `research/MODEL.md`'s baseline table (2026-09: 102.10). Reason: the 101.30
  figure was carried in without verification against the workbook; the beta's
  anchor must be the same-definition value from the same frozen baseline it
  adjusts. Unresolved uncertainty: none for this vintage (the workbook value
  is authoritative); the OPEC November MOMR will print the first post-
  issuance direct observation. The corrected anchor shifts the beta standoff
  endpoint from −1,038.6 (draft) to −673.0 (issued) and the central from
  −1,435.7 to −1,253.4 (Feb 2026 basis). The draft figures were never
  delivered anywhere except this log.
  - **SUPERSEDED by entry 4 (external review, same day):** the "correction" to
    102.10 was itself the error — 102.10 is the workbook's **2026-10** value,
    and 101.30 (the "unverified" early-draft figure) was the correct
    September value all along. The re-issued anchor is 101.3037931, read
    from the 2026-09 column at build time.
- **The "override → g resets to 0" phrasing was tightened to "override → the
  beta standoff schedule resets to the issued v2026-10-15 standoff schedule
  (its exact frozen ΔP)."** Original: "the gulf increment resets to 0."
  Replacement: as stated in Section 3.3. Reason: a bare "g = 0" does not
  reproduce the issued v2 path (the v2 schedule is not "September level +
  non-Gulf only" in its frozen form); the override must name its exact
  target so it is testable — and the chain test asserts the equality to 1e-6.
- **Case-2 expectation corrected after running the chain test.** An early
  expectation ("high throughput ⇒ holds-dominant") was wrong at 3 confirmed
  losses: the odds move toward holds (15.3→36.6) but stay
  standoff-dominated (40.4) — the danger channel and the 0.5 transits weight
  (a hypothesis) hold the regime. The test now asserts the actual behavior
  (moves toward holds, does not flip at losses=3, flips at losses=1).
- **External review (2026-10-21, logged at
  `research/logs/review-beta-v3-2026-10-21.md`) — five material findings,
  all resolved; the vintage was re-issued (same date; superseded hashes in
  the artifacts' `supersession_chain`).**
  1. **Anchor (material, numeric):** the 102.10 anchor was the workbook's
     2026-10 value, not 2026-09's 101.3037931 — it overstated the standoff
     endpoint by 363.9M barrels and the central by 181.9M. Fixed: the
     generator now reads the 2026-09 column at import (never hand-entered)
     and self-checks that the anchor is 2026-09, not 2026-10. The re-issued
     endpoints (Feb 2026 basis): beta standoff −673.0 → **−1,036.9**;
     central −1,253.4 → **−1,434.9** — matching the review's independent
     isolation calculation (−1,036.9 / −1,434.9) to 0.1M. The holds/lapse
     paths are unchanged (they do not use the anchor).
  2. **v2 comparison (material, factual):** the claim that the beta standoff
     was "more conservative than both" was wrong twice over — the issued v2
     standoff's intended Dec 2027 production is **103.30** (111.49 − 8.19
     from its frozen ΔP), not 113.99 (an intermediate figure from the
     schedule table, not the endpoint), and the beta (105.30) allows MORE
     Gulf recovery than the issued standoff, not less. Fixed: the
     positioning now reads v2 standoff (103.30) < beta (105.30) < EIA
     baseline (111.49), and a generator self-check asserts it.
  3. **Vintage safety (material, structural):** the first generator accepted
     a new issue date but kept a hard-coded filename. Fixed: the writer
     names both files from the full vintage identity, refuses to overwrite
     an earlier vintage, requires an explicit flag to re-issue (recording
     the superseded hashes), writes atomically, and re-verifies the bytes.
  4. **Observation → production link (material, structural):** the chain
     tests had supplied recovery parameters directly. Fixed: the OPEC
     comparison is now a shared `production_bridge_screen()` function in
     the generator (a SCREEN that names its candidate schedule source — the
     frozen v2 file — for a dated HUMAN review; it never emits a schedule),
     and the two-briefing rule is the shared `reexamination_condition()`
     function; the chain test feeds the observation through the screen and
     reads the schedule from the file it names. The cap lift in case 1 is
     relabelled a sensitivity illustration (no rule maps print → cap).
     The screen text also discloses that the 21.49 reference is a
     Reuters-survey-based estimate and that the comparison conflates
     agency/measurement bases.
  5. **Public explanation (material, structural):** the dashboard did not
     show the beta's odds, data cutoff, or method. Fixed: the public method
     page at /beta/ (odds, cutoff, production connection, positioning,
     revision rules); the dashboard checkbox labels the vintage and the
     published forecast stays visible by default.
  Additional (non-blocking): the bypass-derived increment is now qualified
  as ROUTING, not production (the Sidi Kerir origin attribution was
  withdrawn — the source does not establish it, and the Sumed pipeline
  connects the Red Sea to the Mediterranean); the Gulf-attributable range
  is now 1,147–2,648 kbd (the whole Red Sea increment unattributed at the
  low end); the "automatic OPEC override" language is replaced by the
  review screen throughout; the method doc, assumptions file, generator
  and chain tests all carry the same rules.

- **Second review, round 2 (2026-10-21, external; logged in the same
  review file) — two WRITER bugs, both fixed; no forecast values changed
  and the frozen v3 artifact was not rewritten.**
  1. **New-vintage crash:** a fresh-date run raised KeyError — the
     supersession code dereferenced an entry that only exists on a
     re-issue. Fixed: the re-issue metadata block is built only when a
     re-issue is actually happening.
  2. **Failed validation overwrote files:** a deliberately broken endpoint
     check made the generator report failure AFTER it had already replaced
     both beta files. Fixed: all self-checks — the pre-write checks AND
     the serialized-pair consistency checks (run against the payloads, the
     exact bytes about to be placed) — complete BEFORE any file is
     replaced; a failed run never touches existing bytes. Writes are
     temp-write → temp-byte verify → rename → final-byte verify, with
     restore-from-snapshot on the final mismatch and no `.tmp` left behind
     on any path.
  Both reproductions plus the vintage-safety guards are now pinned by
  `research/scoring/test_gen_beta_writer.py`, which also verifies that a
  fresh v3-defaults run into an isolated directory reproduces the frozen
  v3 numbers (series, odds, checks block, records' identity+targets,
  assumptions modulo re-issue metadata).
  3. **Round 3 (same day, independent recheck) — P2 pair-atomicity:** if
     the SECOND file's write failed after the first had been replaced, the
     pair was left mismatched (the records' `assumptions_ref` sha no longer
     matched the assumptions bytes on disk). Fixed: both writes (and the
     final hash verification) are now wrapped in ONE pair-wide rollback
     handler — on any failure both files are restored to their pre-run
     bytes (or both new outputs removed) and temps are cleaned, so a
     handled I/O failure never leaves a mismatched pair. This is
     recoverability on a handled I/O failure, not crash-proof transactions.
  The pinning test now runs 24 checks, all pass, including the round-3
  reproduction (second rename raises an ordinary I/O error: case 5b — the
  already-replaced first file is restored on a re-issue; case 6b — both new
  outputs are removed on a fresh issue). Test hooks added to the generator
  (`--data-dir`, `--failure-injection pre|post|second`), documented as
  never-to-be-used-for-a-real-issue.
