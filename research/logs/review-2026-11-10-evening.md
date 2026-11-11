# Review handoff — 2026-11-10 (evening, STEO pass)

Review of the uncommitted Nov 10 evening STEO pass, covering crisis.ts, index.astro,
og/supply.astro, world-stocks.json, SUMMARY.md, judgment-history.md and the daily log.
It records factual corrections for Qwen to verify. These corrections are reviewable,
not final; check the cited sources yourself.

STEO figures were checked directly against `research/data/steo/steo-2026-11/STEO_m.xlsx`
(sha256 7d28012f… matches provenance.json) with a stdlib XML reader. The 2tab column
mapping was validated three ways: (a) the Oct-edition workbook gives Oct/Nov/Dec =
111/104/99, which matches the Oct 7 PDF-anchored mapping; (b) the Nov edition's 2026
monthly mean is $97.20, matching the price-summary "$97"; (c) its 4Q27 is (79+77+75)/3 =
$77, matching the prose.

## Verified correct (no change)

- worldBalance Jan–Oct and the raw drawdown values match Table 3a. Mar −5.56 is the deepest month.
- worldConsumption2026 Jan–Oct matches Table 3e. The demandDecline 2026 Jul column (World
  101.67, ME 8.88, Asia & Oceania 35.97, China 15.57, Europe 14.51, US 20.61) matches, as do
  the 2025 "from" values.
- Demand copy gaps: May −4.80, Jul −3.96, Aug −1.147 ("1.1" is correct), Sep −1.96,
  Oct −1.79.
- Table 4a crude inputs, Jan–Oct 2026: 15.91–17.53, above 2025 in every month. The caption
  "15.9–17.5" is correct.
- STEO quotes ("near $100 … for the remainder of this year"; "$77/b in the fourth quarter of
  2027"; "As depleted global oil inventories build throughout next year") appear verbatim in
  steo-main.html. The annual figures $97 / $86 match the price-summary table.
- The new world-stocks record matches the workbook: Sep −29.2 mb = −0.973 × 30; Oct +52.4 =
  1.690 × 31. The cumulative is +0.76 mb at 2027-04, so "made back by April 2027" is correct
  but only just. This is the site's rebased construct (IEA anchor plus EIA balance), not an
  EIA statement.
- Settlements: Brent $91.49 (−1.17%), WTI $86.04 (−0.93%), session low $89.16.
  Source: [CNBC, Nov 10](https://www.cnbc.com/2026/11/10/oil-prices-trump-iran.html).
  The −19.3% from $113.43 is correct.
- UKMTO #201 (19 NM northeast of Lima, 1338 UTC, unidentified projectile, crew safe, no
  environmental impact). Source: [gCaptain](https://gcaptain.com/adnoc-vessel-damaged-in-gulf-attack-as-ukmto-reports-fresh-tanker-strike-near-hormuz/).
- ADNOC vessel damaged in UAE territorial waters, Nov 10. Sources: [Khaleej Times](https://www.khaleejtimes.com/business/energy/adnoc-vessel-damaged-attack-uae-waters-november-10-2026),
  [Anadolu](https://www.aa.com.tr/en/middle-east/uae-oil-company-s-vessel-sustains-damage-in-attack-in-territorial-waters/4119235).
  gCaptain says it is not clear whether this and #201 are the same incident; the copy keeps
  them separate and does not link them.

## Factual edits made

1. **Spread check figure** (log, SUMMARY, judgment-history). *Original:* "spread ≈ −$8.5 …
   the edition gives no monthly H2 table this time … INSIDE the ~$10–15 review zone."
   *Replacement:* −$11.1 vs H2 calendar-weighted ($102.59), −$10.0 vs Nov–Dec, −$17.5 vs Q4.
   The magnitude is in the zone, but the spread is negative, and the gauge (MODEL-internal §2)
   only fires on a positive spread, so the trigger is NOT met. *Reasoning:* the workbook's 2tab
   BREPUUS row has monthly forecasts (Nov $104, Dec $99), and the Oct 7 correction set the
   method as calendar-weighted H2 from the workbook. *Conclusion unchanged:* HOLD, no reweight.
   *Uncertainty:* the trigger book never defined what to do with a large negative spread.
   That is a model-rule question for the user, and I did not decide it.

2. **WTI note arithmetic** (crisis.ts wtiWeekly Nov 10). *Original:* "Down 17.2% … basis to
   Brent ~$5.6." *Replacement:* "Down 17.4% … $5.45 below the January Brent settlement."
   *Reasoning:* 86.04 / 104.12 − 1 = −17.36%, and 91.49 − 86.04 = 5.45. "Basis" was also
   loose, since these are different contract months. Uncertainty: none.

3. **OPEC+ date** (crisis.ts Brent Nov 10 note; SUMMARY). *Original:* "OPEC+ said it would
   keep December output unchanged at September levels (Reuters, Nov 10)." *Replacement:*
   "OPEC+ had agreed on Nov 1 to keep its December output targets unchanged (Reuters)."
   Sources: [Bloomberg, Nov 1](https://www.bloomberg.com/news/articles/2026-11-01/opec-leaves-oil-output-targets-unchanged-for-december),
   [World Oil, Nov 1](https://www.worldoil.com/news/2026/11/1/opec-subgroup-keeps-oil-production-quotas-unchanged-for-december).
   I dropped "at September levels" because none of the sources I read supports it.
   *Uncertainty:* a Nov 10 Reuters story may have repeated the Nov 1 decision as background.
   Even so, it was not a Nov 10 decision.

4. **Trump "not necessary" date** (crisis.ts Brent note + Trump/Iran watch item). *Original:*
   "added on Nov 10 that further strikes on Iran 'would not be necessary' (AP)" and "(Nov 10)".
   *Replacement:* the remark is dated Nov 9, made after the Qatar meeting, and the quote marks
   are dropped because it is now paraphrased. Sources: [Capital Brief](https://www.capitalbrief.com/briefing/oil-falls-to-three-month-low-as-trump-signals-iran-strikes-unlikely-66a17126-fbe1-42bb-94c3-20f9aad88395/)
   (says "Monday", which was Nov 9, 2026); TMGM's Nov 10 morning brief already reported the
   remark. *Uncertainty:* I could not find the exact quoted wording or the AP piece. Restore the
   quote marks only if AP's text confirms the wording.

5. **Iraq lane date** (Trump/Iran watch item). *Original:* "On Nov 10 Iraq and the US reached
   an understanding … (Iraqi FM, Reuters)." *Replacement:* "Iraq's foreign minister said on
   Nov 8 that Iraq had reached an understanding with the US … (Reuters)." Source: [Arab News /
   Reuters, Nov 8–9](https://www.arabnews.pk/node/3006481), which also carries the $60B figure.
   *Uncertainty:* the "first tests in December" detail is NOT in that article, and I did not
   find it elsewhere. I kept it, but it is unverified (see below).

6. **Reuters, not the Kyiv Independent** (crisis.ts russiaSnapshot; log; judgment-history).
   *Original:* "Kyiv Independent counts nine of the 35 largest refineries struck, about a 30%
   reduction." *Replacement:* "Reuters, citing two industry sources, said attacks since late
   October cut refining capacity by about 30% and, over the past week, disrupted nine of
   Russia's 35 major refineries (via Kyiv Independent, Nov 10)." Source: [Kyiv Independent](https://kyivindependent.com/ukrainian-strikes-cut-russias-oil-refining-capacity-by-30-reuters-reports/)
   ("disrupted operations or caused emergency situations at nine of Russia's 35 major
   refineries, according to Reuters"). *Uncertainty:* the article's own tonnage figures
   (−200 kt/d to 700 kt/d) imply a cut of about 21–25%, not 30%.

7. **World-balance copy** (index.astro). *Original:* "rebuilding stocks slightly in October."
   *Replacement:* "adding 1.7 million barrels per day to stocks in October." *Reasoning:* a
   1.7 mb/d build is not slight; it is about 52 mb in the month, comparable to June's draw.
   The previous "slightly" described July's 0.27. Uncertainty: none.

8. **Rates paragraph** (index.astro). *Original:* "the yield rose about 12bp on Nov 10, to
   4.98%." *Replacement:* "release on Nov 10, the yield closed at 4.98%, up from 4.86% the day
   before." *Reasoning:* the public copy elsewhere avoids "bp" (tooltips use it, so the note is
   unchanged). The figures are from the stored Yahoo ^TNX closes; I did not check them
   against a wire.

9. **Code comments** (crisis.ts). The stale "Oct 6 edition … −3.9" comment is now "Nov 10 …
   −4.0". "Second non-negative month after July" is now "first build month since February".
   The pre-existing "largest single regional decliner is the Middle East (−1.2)" comment is
   corrected: ME is −1.30, and Asia & Oceania (−1.90) is larger.

10. **SUMMARY prices bullet.** *Original:* "WTI … wire-confirmed — the Yahoo bar had missed
    the sub-$90 dip." That attached a Brent intraday fact to WTI. *Replacement:* both
    settlements are wire values (CNBC), with Yahoo closes of 91.76 / 86.24 noted.

11. **Log details.** The Table 4a range is now "15.91 (Feb)–17.53" (it was "16.33–17.53").
    The demandDecline list now says the Middle East and US rows were unchanged; the original
    implied they had been revised.

## Copy edits for length (no substance change)

The three "Any day" watch items grew from 721 / 607 / 730 to 867 / 877 / 1,070 characters.
I tightened the Trump/Iran item (now 838) and the UKMTO item. In the UKMTO item I merged
sentences and removed the "35 vessel attacks in October (Reuters, Nov 10)" sentence because
it duplicates the Nov 5 Brent note ("35 vessels were hit in October, a monthly record"). The
UKMTO item is now 884 characters, still above its HEAD length. A further candidate cut
is the Khor Mor sentence, which is not shipping. That is the editor's call.

## Unresolved (not shown false; searches unsuccessful)

- **Saudi denial of refinery attacks (Reuters, Nov 10).** I found no report. Coverage I did
  find says the Houthis claimed KKIA, Abqaiq and Riyadh's financial district on Nov 10, and
  that the Houthis denied a Saudi Medina-pipeline claim
  ([House of Saud](https://houseofsaud.com/houthis-4-ops-lahj-riyadh-financial-nov10/)).
  Abqaiq is a processing plant, not a refinery. Cite the Reuters URL before prod.
- **Rubio, "80–85% of pre-war on some nights" (G7, Nov 10, Reuters).** I found no report. AP
  covered Rubio at the Paris G7 urging allies to "step up" on Hormuz security
  ([Baltimore Sun / AP](https://www.baltimoresun.com/2026/11/10/g7-meeting-ukraine/)), with no
  flow figure. Note the measure mismatch: this figure is oil flow on some nights, while the
  same watch list cites UKMTO transits about 65% below pre-conflict levels.
- **CERAC 20–35% (Nov 10).** No source found.
- **Iraq–Oman lane "first tests in December".** No source found (see edit 5).
- **"First time since Aug 31"** (Brent intraday below $90). CNBC says only "since August".
  24/7 Wall St says the Nov 9 settlement was the lowest since Aug 31. This is plausible but
  not pinned down.

## Data and record issues reported, not changed (data edits need authorization)

- **`worldConsumption2025` has no October 2025 point.** The demand chart now plots
  2026-10 (102.78), but the 2025 comparison line ends in September, while the copy and aria
  say "1.8 below" in October. Fix: add `{ date: "2025-10-15", value: 104.57 }` (Table 3e AV,
  104.572). Note that the 2025 array is truncated rather than rounded (Aug 104.509 → 104.5,
  Sep 106.006 → 106.0), which is harmless at one decimal.
- **`steo-2026-11-global-observed` outcome_status contradicts the log.** The record says the
  first scoreable outcome is Nov 2026, published by the Dec OMR. The log and SUMMARY say the
  Nov OMR (~Nov 13) gives the first scoreable outcome (the Oct target). The two are consistent
  only if "scoreable" covers estimate-vs-observation scoring; pick one wording. Also, the
  record-level `issued_before_outcome: true` is not true of the 2026-09 target: its outcome
  (IEA −10 / −509) was published on Oct 14, before the Nov 10 issue. The record's note flags
  Sep–Oct as retrospective, but the boolean should be per-target or qualified.
- **world-stocks.json was reformatted** from 1-space to 2-space indentation, with `—`
  escapes decoded. The semantic diff is only the new record plus `generated_by`, but the
  14k-line diff hides that. Consider re-serializing with the original formatting.
- `generated` is still "2026-09-19" while `generated_by` lists a Nov 10 addition. The field
  already lagged after the Oct additions, so this is a pre-existing convention question.

## Not checked

- The 10-yr 4.983 close and the Yahoo bar values (local snapshots only).
- The og-supply.png change; it was regenerated from the record and not inspected.
- The staging deploy. A rebuild is needed for the edits above; `npm run build` passes locally.

---

## Recheck after Qwen's post-review pass (2026-11-10, ~20:00 MDT)

I rechecked the current files rather than repeating the first review. This time I used the
project copy style guide at `/home/mcone/pi/COPY-STYLE.md`. It is outside the repo, and I
did not find it in the first review, which fell back on site conventions. AGENTS.md should
point to it.

### Withdrawn or narrowed from the first review

- **Rubio 80–85%: WITHDRAWN as "unresolved".** The figure is real. Middle East Eye (Nov 10,
  13:58 GMT) quotes: "Oil is getting out – on some nights it's 80-85 percent of what was
  getting out pre-conflict … The only reason why it isn't 100 percent is because Iranian oil
  isn't getting out." Sources: [MEE](https://www.middleeasteye.net/live-blog/live-blog-update/rubio-claims-strait-hormuz-oil-flows-near-pre-war-levels-some-nights);
  a State Department transcript is also indexed ([state.gov](https://www.state.gov/releases/office-of-the-spokesman/2026/11/secretary-of-state-marco-rubio-remarks-to-the-press-23/),
  which returned 403 to me). My first-pass search missed it.
  *Remaining source disagreement (not edited):* the site says "oil and products flows" and
  credits AP. MEE's quote names only oil, and I could not read the AP text Qwen cites. If AP's
  transcript does not mention products, change the copy to "oil flows". The State Department
  transcript is the better primary citation.
- **CERAC 20–35%: narrowed to a naming error.** Qwen found the source ([Seoul Economic
  Daily](https://en.sedaily.com/world/2026/11/11/ukrainian-strikes-halt-up-to-35-percent-of-russian-refining)).
  It credits the figure to the **Centre for Research on Energy and Clean Air**, the
  Finland-based group whose acronym is CREA. The article uses no acronym; "CERAC" appears in
  no source I found. **Edit:** crisis.ts now names "The Centre for Research on Energy and
  Clean Air (CREA), a Finland-based research group". The SUMMARY line is updated to match.
  *Uncertainty:* none on the name. The (Nov 10) date is fine: 21:15 UTC Nov 10.
- **Khor Mor.** The handoff called this cut "the editor's call", not a reviewer decision; the
  log describes it as the latter. Qwen's reason (it's a gas field, not shipping) is sound. The
  daily log still tracks attribution.

### Confirmed in Qwen's pass

The spread recomputation, the WTI arithmetic, the OPEC+/Trump/Iraq dates, the Reuters
attribution, the removal of the Saudi denial, the removal of "first tests in December",
"since August", the Oct 2025 point (104.57), the record `outcome_status` and per-target
`issued_before_outcome`, and the world-stocks re-serialization (the diff is now 335 lines).

### New factual edits made in this recheck

1. **Brent narrative paragraph and chart aria (index.astro) were stale.** *Original:* "On
   Nov 9, January Brent settled at $92.57 … On Nov 10, Brent traded around $90 … unsettled.
   … down 18.4%." The aria also gave the Nov 9 settlements. *Replacement:* the Nov 10
   settlements, $91.49 (−1.2%) and $86.04 (−0.9%); the brief dip below $90 for the first time
   since August (CNBC); Trump's Nov 9 remarks (AP); Israel Hayom; −19.3% from Oct 30.
   *Reasoning:* the Nov 10 point is plotted and the stats strip already shows it. Source:
   [CNBC](https://www.cnbc.com/2026/11/10/oil-prices-trump-iran.html). *Uncertainty:* the
   "(Reuters)" settlement attribution follows the crisis.ts notes; I verified the values via
   CNBC.
2. **Crack comment (index.astro, code only).** Nov 10 AAA is now paired with the Nov 10 WTI
   settle of 86.04. Diesel gap 6.1572×42 − 86.04 = 172.6, gasoline 3.9788×42 − 86.04 = 81.1
   (was 171.8 / 80.3 at 86.85). The chart pairs to the nearest WTI automatically, so only the
   comment was stale.
3. **Stale "first scoreable" wording.** The SUMMARY (×2) and the log's Next list said the Nov
   OMR "closes the first scoreable outcome". Per the corrected record, Sep is first (already
   recorded), the Nov OMR publishes Oct, and Nov is the first prospective score. The
   historical 17:1x log entry still says the old wording; the post-review section supersedes
   it.

### Copy edits for length (style guide: one idea per paragraph, short building sentences)

The Saudi/GCC watch item was the longest on the list at 912 characters (721 at HEAD). It is
now 843, put in date order, with the same facts and attributions. Current "Any day"
lengths: 843 / 877 / 727. The Trump/Iran item (877) is now the longest. If it needs a cut,
Task Force Iron Gate (Nov 7) is the oldest and least market-relevant clause; that is the
editor's call.

### Still open

- Rubio's scope ("oil" vs "oil and products") and the AP attribution, as above.
- The 10-yr 4.983 close is from local Yahoo data only.
- The supply headline tense change ("has been using") reads correctly and fits the style
  guide's descriptive-heading rule; no change.

---

## Copy edit against COPY-STYLE.md (2026-11-10, ~20:05 MDT)

This was a style and length pass over the public strings changed today. I added no new
facts. Each sentence below keeps its figures, dates, sources and uncertainty.

**Split: Trump/Iran watch item (877 chars, four topics).** The style guide asks for one idea
per paragraph, so this became two items:
- **Diplomacy (410):** Trump's Nov 9 remarks, the Israel Hayom report, and Rubio's
  Nov 8 "far from a breakthrough". Why: corroboration of the deal.
- **Flows and routes (587):** Rubio's G7 figure, the Iraq lane, Task Force Iron Gate. Why:
  lane implementation and Iron Gate scope.

**Added sentence (reviewable).** "That is a US government estimate of oil volumes; UKMTO's
count below measures ship transits." This keeps the like-for-like distinction visible to the
reader: Rubio's 80–85% is oil volume on some nights, while UKMTO's figure is transits about
65% below pre-conflict levels. "Oil and products" became "oil and fuel", because the style
guide asks for research shorthand to be translated. The open scope question (MEE quotes only
oil) still stands. "Qatari PM" became "Qatari prime minister".

**Other edits:**
- **Saudi/GCC item (843 → 812):** put in date order and split the long sentences. "Two
  ballistic and two cruise missiles … plus a ballistic missile aimed at the south" became
  "three ballistic and two cruise missiles aimed at Riyadh, other regions and the south".
  The counts are the same and the AP attribution is kept.
- **UKMTO item:** "AIS-based reporting" became "reporting based on ship-tracking (AIS) data",
  because the guide asks for unfamiliar terms to be defined.
- **Brent Nov 10 tooltip and stats strip:** "intraday" became "during the session". The
  causal sentence is now two sentences, and the Trump remark keeps its Nov 9 date.
- **Russia capacity flag (1,054 → 992; it was 662 at HEAD):** tightened throughout, with no
  estimate dropped. The closing caveat now reads "None of these reports establishes how much
  national capacity is offline now", which has the same meaning.

**Length status ("Any day" items):** 812 / 410 / 587 / 751 / 439 / 482 / 296. The Russia
flag is the remaining outlier. A further cut would mean dropping superseded estimates
(Forbes Sep 9, Kpler early October, the undated IEA ">20%"), and that needs an editorial
decision.

`npm run build` passes. Not committed or deployed.
