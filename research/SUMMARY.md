# Crisis state — Nov 16 (full pass)

Sources and decisions: [Nov 16 daily log](logs/2026-11-16.md) · [Nov 15 daily log](logs/2026-11-15.md) · [judgment history](judgment-history.md)

## Current read

**Judgment:** 10 / 50 / 40 — corridor holds / standoff / corridor lapses. **HOLD; any
reweight remains a user decision.** UKMTO: **two new entries** this pass — #206
(Nov 16: suspicious activity, 430NM east of Socotra) and #207 (Nov 16: attack, Strait of Hormuz, outbound tanker, engine-room fire);
126 entries, #143–#207, coverage to Nov 16. All 8 date-drift flags adjudicated
as the expected registration-timestamp pattern — none applied. UKMTO's **Nov 13
weekly overview** remains the operative figure: 139 outbound / 169 inbound
transits for the week to Nov 11 (≈65% below pre-war levels), 8 incidents (two
of unknown outcome, none sunk), 163 conflict-related incidents since Feb 28.
The Iranian tanker-strike claims have grown to **at least seven vessels**
(Nov 13–15) and remain **unverified — state media only**; the newest claim
(Nov 15, IRGC): two more tankers struck, one a **supertanker (≥2M bbl) that
"sank"** — no UKMTO warning, no hull name, no wreckage photos; the tanker-loss
input stays at 1. **Bahrain:** CENTCOM's only Riffa statement (Nov 13) confirms
two drones shot down by the F-35C at the Al-Riffa radar station, the rest
"accounted for by the Kingdom of Bahrain," no injuries or damage; the IRGC's
Nov 16 claim that the radar itself was hit by **six drones** is still
unanswered by CENTCOM as of this pass. **A THIRD US carrier group (USS
Theodore Roosevelt, CVW-11) is now in the region** (third carrier since the
blockade began) — the largest naval escalation signal of the week. **Trump, Xi
and Putin meet in Shenzhen on Nov 19** (confirmed; APEC sidelines). #204
(Dominica Prosperity, Nov 11) is on day 4: still burning, salvage underway
(Copernicus EU satellite), crew evacuated. #199's burning tanker remains
Reuters-verified as Navig8-managed with identity unresolved; no sinking
confirmed.

**Filter (diagnostic, not public odds):** HORIZON **15.0 / 50.0 / 35.0**; STATE
**0.1 / 99.9 / 0.0** (37th run — inputs unchanged since run 36; no new
settlement at pass time, no new Kpler print, no new confirmed loss). Inputs: 11 transits (to Oct 30, 16 days stale), one tanker loss (the
#199 burning tanker — the model input; the site copy does not call it a confirmed
loss), Brent **$95.84** (Nov 13 settlement, still in the $90–100 band), and
Kpler's 7.195M b/d through Oct 28 (18 days stale, basis not switched).

**Candidate shadow:** HORIZON **15.2 / 49.9 / 34.9** (0.152362 / 0.498948 /
0.348689); STATE **0.5 / 99.5 / 0.0** (0.005250 / 0.994746 / 0.000004).
Not published. Identical to the Nov 6–15 runs (no new Kpler print; Brent is
context, not a state observation, in the candidate). Vintage: volume 19 days
old, transits 17.

**Storage context:** the reference draw band is 0.45M b/d (the $90–100 band) at
Brent $95.84. It implies about 275.0M barrels in the SPR by Nov 16, based on the
Nov 6 WPSR figure of 279.535M and ten elapsed days. Reference estimate, not a
new inventory report; the 250M operational floor sits around Jan 11, 2027 at band
pace (~56 days).

**Other model metrics:** elasticity sensitivity is −0.26 / −0.52 / −0.78 mb/d per
+$5 Brent move (ε 0.05 / 0.10 / 0.15, marginal from the Nov 6 settle $98.32) —
unchanged. **Polymarket weekly cross-check (last: Nov 15, gamma API):** "Hormuz
normal by Dec 31" = **4.5%** (5.5% Nov 14, 8.5% Nov 10, 12% Oct 15); "by Nov 30"
= **1.65%** (1.2% Nov 14, 3% Nov 10) — thin market, noise around the same
level. This market asks whether Hormuz will be "normal" by a date, which is not
the same event as the model's corridor-state categories. **Calibration ledger:
9 resolved, 2 open (running Brier 0.2724)** — the Nov 15 corridor-lapses binary
set (5 rows: filter v2.1 at p=0.828 plus the four judgment rows) settled this
pass, all **0** (no lapse — the strait is open: 139/169 transits the week to Nov
11, bypass operating since Sep 29); the judgment row (10/50/40) scored 0.1600,
the best of the set; the filter v2.1 row at 0.6856 is the worst. Open: ceasefire
by Sep 30 (p=0.15, source market unrecoverable) and by Dec 31 (p=0.579).

## Markets, shipping, and stocks

- **Prices (Mon Nov 16 — settlement not yet printed at pass time):** Brent
  **$95.84** (January contract, Nov 13 settlement; Rigzone; Yahoo BZ=F matched)
  and WTI **$88.56** (December contract, Nov 13; $7.28 below January Brent)
  remain the latest plotted. Nov 16 intraday: WTI ~$87.76, Brent ~$94.68 —
  **both below the Nov 13 settlements; NOT plotted** (settles ~14:30 ET, after
  the pass). Brent is down 15.5% from the Oct 30 settlement of $113.43. The
  December WTI contract's last trading day is **Nov 20 (Friday)** — the series
  rolls to January after that. 10-yr: the Nov 16 session is incomplete at pass
  time — the Nov 13 close of **5.154** (second straight close above 5%;
  Nov 12: 5.103, the first since Oct 28) remains the latest bar.
- **CPI (released Nov 10, BLS USDL-26-1685):** October consumer prices **+0.4% MoM
  (SA)** — above the +0.3% consensus — and core **+0.3%**, the third straight
  month at that pace. **No headline or core 12-month rate was published** (the
  2025 shutdown left no October 2025 index), so September's 3.7% remains the
  latest official headline rate; gasoline's 12-month change was +37.4%. Futures
  fell; traders began pricing a possible December Fed increase (CNBC).
  **October PPI (released Nov 13, verified from the BLS API):** headline
  **+6.5% YoY — the largest since November 2022** (CNBC: "highest in nearly four
  years") after **+0.3% MoM (SA)**; September was revised +1.3% → +1.4%. Core
  (ex food, energy, trade) **+0.5% MoM (second straight month), +4.9% YoY**
  (Babypips/finwire). BLS-reported 12-mo (WPUFD4, unadj): Oct 6.5, Sep 6.3
  (unchanged), Aug revised 5.6 → 5.5. With the CPI's October annual rate
  unpublished, 6.5% is the latest official annual print — and the strongest
  case yet for a December Fed hike (CNBC: "keeping pressure on the Fed").
  November CPI, Dec 10.
- **AAA Nov 16 (applied):** gasoline **$3.8118**, diesel **$5.9989** — the
  **20th straight daily decline since Oct 28**, and **$0.53 below** AAA's Sep 22
  record of $6.5276 (−8.1% from the record). Nov 16 retail-minus-WTI gap (paired
to the Nov 13 settlement $88.56 — no same-day settlement; derived): **$163.4
diesel / $71.5 gasoline** (Nov 15: 164.3 / 72.1; Nov 13: 166.1 / 74.1
  same-day).
- **Hormuz:** UKMTO's **Nov 13 weekly overview** is now the operative figure:
  **139 outbound / 169 inbound transits** for the week to Nov 11 (≈65% below
  pre-war levels), 8 incidents in the Strait / Arabian Gulf / Gulf of Oman (two
  of unknown outcome, none sunk), 163 conflict-related incidents since Feb 28
  (Al Jazeera, Gulf News). **New entries this pass: #206 (Nov 16, suspicious
  activity east of Socotra) and #207 (Nov 16, attack in the Strait of Hormuz)** — no confirmed loss;
  #205 (Nov 15) remains the last attack entry. The IRGC's Nov 15 supertanker
  claim (≥2M bbl, "sank") is unverified — see Current read. JMIC's Nov 12
  advisory counts 181
  incidents since Mar 1 and about 211 vessels waiting at anchorages east of
  Hormuz. The Iranian mine-strike claims (≥6 vessels since Nov 13) remain
  unverified, state media only — see Current read. Kpler's latest full-month
  figure put October crude flows at 11.1M b/d (~2% below September); Kpler (Nov
  11) puts total Gulf exports incl. bypass routes at 16.7M b/d since early October
  vs ~17M pre-war; Kpler data reported by Reuters (Nov 9) put October crude
  exports through Hormuz at 10.3M b/d excluding Iran vs 13.5M pre-war (URL not
  yet located at review — kept with attribution).
- **Oil flows (OPEC monthly, Nov 11; IEA OMR, Nov 13):** OPEC+ October output
  **41.23M b/d**, about **97%** of the pre-crisis February level (42.72M), based
  on outside estimates; **Saudi Arabia told OPEC its output rose 26% to 10.563M
  b/d** (from 8.372M in September), but OPEC's outside estimates put it at
  **9.194M** (Bloomberg via Rigzone). The IEA's own OMR count is lower — OPEC+
  **37.72M b/d** of crude in October (35.71M in September) — and says **Gulf
  exports excluding Oman reached 18.4M b/d, 26% below pre-war** and +1.6 m-o-m.
  The OMR sees Q4 supply at **105M b/d, 1.7M above demand** — a return to surplus
  as Gulf exports recover (BNN, Reuters, Baird, Arab News). At the G7 (Nov 10)
  Rubio said strait oil/fuel flows had reached 80–85% of pre-conflict levels on
  some nights, the gap being Iranian oil (AP). Iraq's lane near Oman is not yet
  implemented.
- **Iran / US:** neither side is moving toward a deal, but the channels moved
  and the strikes continued. **Riffa, Bahrain (verified timeline):** On Nov 13,
  CENTCOM said the IRGC launched two one-way attack drones toward Bahrain and
  both were shot down by US forces, with "no injuries or damage" (CENTCOM,
  via MEE/RFE/RL; AP) — the first confirmed launch at a Gulf host state since
  early September (ISW-CTP). On Nov 15, the IRGC claimed six drones targeted a
  US radar at the Riffa helicopter base; Bahrain said it intercepted the attack
  and issued its first nationwide alert since September. CENTCOM had not
  commented on the Nov 15 claim by the morning of Nov 16 (Al Jazeera, CBS
  News). **A THIRD US carrier group (USS Theodore
  Roosevelt, CVW-11) is now in the region** — the largest naval escalation of
  the week. **The Trump–Xi–Putin trilateral is confirmed for Nov 19 in
  Shenzhen** (Kremlin and White House; APEC sidelines, nuclear-arms focus;
  officials say the Iran war will also be discussed). IEA: Iranian October
  production fell to **1.86M b/d** — below the country's own refinery needs.
  **Mossad director Gofman:** met Ratcliffe and held talks with Witkoff in
  Miami (no breakthrough); he was due to brief Israel's security cabinet on
  his return (Times of Israel). Axios's "expected to consider approving action" is
  unconfirmed (review Nov 16). Netanyahu pressing for a resumed war, Trump refusing ("I could end it
  immediately"; the Saudis want the status quo — Iran is "disintegrating" —
  Axios). Bessent: the campaign is "working," "We are squeezing the regime"
  (ABC); a ~$1B Iranian-crypto seizure is planned. Qalibaf: US officials asked
  Putin to facilitate direct talks (AP; White House did not address it).
  **Trump moved VP Vance to domestic issues** (AP, Nov 13). Rezaei's "no single
  atom leaves" (Nov 11) and Ghalibaf's "ball in the American court" stand. The
  Qatari two-week window (JPost/i24) and the Israel Hayom interim-deal report
  ($8B in Qatari-held funds) remain unconfirmed.
- **Saudi / Yemen:** **government-aligned forces withdrew from Dhubab and the
  Bab el-Mandeb area (announced Nov 15) and the Houthis moved in** (Al Jazeera) — while the Saudi front
  continues: Nov 13 — claimed **two drones at Pumping Station
  No. 3 east of Riyadh** (East–West pipeline; a second strike in 24 hours) plus
  **one drone at King Khalid International Airport** (Houthi spokesman Sarea, Al
  Masirah); no Saudi confirmation. Their **Lahij offensive advanced ~12 km**
  before Saudi forces retook the ground on Nov 13, with Saudi close air support in
  Lahij and southern Taiz (Critical Threats, Khaleej Times). The coalition says at
  least 26 killed in the Kingdom since Sep 23 (Saudi authorities, via Al
  Jazeera, Nov 15 — re-verified post-review); Nov 14–15 it intercepted two
  Houthi ballistic missiles aimed at Riyadh (Nov 15) and three drones over the
  eastern region (Reuters, Gulf News). The GCC's Kuwait unified
  command (assigned Nov 10) has no operational date.
- **Iraqi Kurdistan:** the suspected drone attack on the **Khor Mor gas field**
  (late Nov 8 / Nov 9) suspended production (~2,800 MW of generation offline);
  **no claim of responsibility as of Nov 11**.
- **Russia:** **new to the tally: Ilsky Oil Refinery (Krasnodar Krai, 6.6 Mt/yr)** —
  struck Nov 15–16, a repeat of the Sep 26 strike (three killed); the site
  tally now stands at **14 sites** (window Oct 24–Nov 16). **Zelensky (Nov 15
  address): "more than 55% of Russia's oil refining capacity" neutralized** — up from the Oct
  4 figure of 51% (Defense Ministry) and the Sep 9 Forbes ~54%; Ukraine's claim,
  not independently verifiable — it now sets the LOW end of the spread (45–80%
  remaining). The overnight wave was a **record 1,336 drones**; the **Crimean
  Bridge was struck** (car traffic restricted; Kremlin: minor damage); it has
  been hit before (Oct 2022, Jul 2023). Prior entries stand: TAIF-NK at Nizhnekamsk (Nov 15, the plant's only
  ELOU-AVT-7 unit hit); Volgograd (Nov 13 General-Staff claim; four killed);
  Omsk (Nov 11, third strike). Standing: **Reuters reported Nov 12 that fuel
  shortages have returned in at least six regions** (via National Security
  Journal); long queues at Volgograd petrol stations (Archyde); **wholesale
  gasoline sales fell 31%** (Bohnert via Moscow Times, Nov 16); CERAC's October
  report says **diesel loading volumes at Russian ports tripled in October** while
  the producer ban (exceptions for global supply) runs through Jan 31, 2027.
  **Diesel:** the FT (Nov 11–12) reports Russian diesel exports roughly doubled in
  October — **135,000 → 271,000 b/d (Kpler)** — after an early-October US–Russia
  diesel deal and a pause in Ukrainian refinery strikes; **none of the four
  US-bound tankers has delivered**, the Agioi Fanendes is waiting off the East
  Coast for a buyer. The IEA plans a further 71M-barrel release of emergency
  stocks by end-February 2027, about 15M of it diesel (OMR, Nov 13, via Business
  Upturn).
- **Gas (TTF/JKM):** unchanged — TTF **$28.0/MMBtu** and JKM **$32.2/MMBtu** (Dec
  delivery, Nov 6 values, per the Global LNG Hub post of Nov 9) remain the latest
  plotted JOGMEC-assessed prices; **no new assessed print as of this pass**
  (last known JKM–TTF spread 51.1¢/MMBtu, Nov 12, Platts); EU carbon slipped
  below €90 on the free-permit deal — context, not a plotted series.
- **WPSR w/e Nov 6 (released Nov 12; ingested Nov 13):** SPR **279.535M
  (−2.649M)** — the largest weekly withdrawal since the week ending Aug 28
  (−3.122M); per Reuters the lowest since Oct 1982. Commercial crude ex-SPR
  **414.417M (+4.657M)**; analysts had expected a **1.1M decline** (Reuters poll).
  Distillates **103.330M (+4.071M)** — back above 100M after one week below it
  (Oct 30) — but still **6.8% below last year**; East Coast 23.784M (12.2%
  below). **Next: Wed Nov 18, noon ET** (w/e Nov 13).
- **STEO November edition (released Nov 10, ingested Nov 10):** October world
  balance is a **1.7 mb/d net build — the first build month since February**; the
  September draw was cut 2.94 → 0.97 mb/d; 2027 is a build every month; the
  cumulative draw is fully made back by **April 2027**. EIA Brent: 2026 $97 (was
  $96), 2027 $86 (was $84). Scheduled spread check (Nov 12 settlement $95.82 vs
  the workbook's H2 2026 Brent $102.59): **≈ −$6.8** — negative side, the
  market-above-EIA gauge NOT met, no reweight. (Next check at the Dec edition
  against the Nov 20 settlement.)
- **IEA OMR November edition (released Nov 13, ingested Nov 13):** October
  observed inventories **built +52 mb (+1.7 mb/d)** — the first increase since
  June; oil on water +86 mb (highest since January); on-land stocks remain at
  their lowest since at least 2016 (OECD total −47 mb). **Cumulative draw: 462 mb
  since the start of the war (Feb 28)** — the same end-February anchor the Oct
  edition used; the Nov-edition point (−462) is plotted in world-stocks.json.
  Refinery runs **81.3 mb/d** (seasonal low, −1.3 m-o-m); December forecast 84.7;
  2026 refining forecast **−2.2 mb/d**. 2026 demand −2.7 mb/d to 102.3; October
  supply 105.4. The 71M-barrel release is not printed on the public OMR page —
  confirm in the full report.

## Next dates

- **Nov 16 (evening) — pending at pass time:** the Nov 16 WTI/Brent
  settlement (~14:30 ET) → apply + plot at the next pass (intraday at pass
  time: WTI ~87.76 / Brent ~94.68, both below the Nov 13 settles); the 10-yr
  Nov 16 close (site ends Nov 13 at 5.154); the next JOGMEC TTF/JKM assessed
  print (not yet published — last spread 51.1¢/MMBtu, Nov 12); a CENTCOM
  response to the IRGC's six-drone Riffa claim; the Dominica Prosperity
  salvage (day 4).
- EIA WPSR, **Wed Nov 18, noon ET** (w/e Nov 13; expected: SPR w/e Nov 13,
  utilization, world balance).
- **Nov 19** — **Trump–Xi–Putin trilateral, Shenzhen** (Iran on the agenda per
  the White House).
- **Nov 20** — the Dec WTI contract's last trading day; roll to January after.
- OPEC+ ministerial, Nov 29 (2027 policy); STEO Dec edition, ~Dec 11 (next
  scheduled EIA–market spread check); **CPI, Dec 10**.
- **The standing reweight condition remains met** after the Nov 8 review. This
  pass added no confirmed loss (#206/#207 are suspicious activity / an attack
  with no confirmed loss; the IRGC supertanker claim is state media only —
  no UKMTO warning, no hull name); the next Kpler print is the clean physical
  reweight point; **open question: the model's volume basis (7.195M total-oil
  vs the Reuters-reported 10.3M crude-only) — a basis change moves the
  STATE/HORIZON rows and needs an explicit decision.**
- Watch: corroboration of the IRGC supertanker claim (hull name, AIS, photos);
  the CENTCOM response to the six-drone Riffa claim (and whether the third CSG
  brings strikes); the Nov 19 trilateral outcome; the Dominica Prosperity
  salvage and any independent confirmation of the 400,000 bbl release; the #199
  tanker's identity; the Qatari two-week window; Khor Mor attribution; Iraq
  transit-lane implementation; the Fed's reaction to the 6.5% PPI print
  (December-hike pricing); whether the 10-year holds above 5% (two straight
  closes now); the OMR paywalled PDF for the month-by-month inventory detail;
  10 UKMTO entries (#166, #172, #173, #189, #192, #193, #194, #196, #199,
  #200) carry API date drift against the adjudicated incident dates
  (registration-timestamp pattern; #166 stands on its explicit report date) —
  none applied.
- **Prod:** `507004c9-172a-445d-9fd0-a0220e3d2f6f` (bundle `C4d9n6nC.js`,
  byte-identical to staging `a33c4932`) — full Nov 16 state + post-review
  corrections, deployed on the user's explicit go-ahead (07:35 Nov 16).
  Live-verified PASS (depletion.org + custom domain); corrected strings
  confirmed live (7/7 present, 0 old errors). Supersedes `c47af500` (Nov 15).
- **Staging:** `a33c4932-beaf-423a-a4cb-3f00801b5349` (bundle `C4d9n6nC.js`) —
  full Nov 16 state **plus the post-review corrections** (AAA Nov 16 diesel
  $5.9989 / gasoline $3.8118; UKMTO #206/#207 + coverage to Nov 16; Ilsky
  [Krasnodar Krai] strike + 14-site tally + window to Nov 16; Zelensky 55%-
  capacity anchor + 45–80% spread; Riffa [Nov 13 CENTCOM two drones / Nov 15
  six-drone claim, CENTCOM silent] + 3rd CSG Theodore Roosevelt; IRGC
  supertanker claim; Dominica Prosperity day 4; Gofman [ToI version]; Houthi
  Bab el-Mandeb pullback [direction corrected]; record-wave casualties [Moscow
  Times]; wholesale gasoline sales −31%; DATA_AS_OF 2026-11-16). Geometry gate
  + verify-live PASS on shipped bytes (all 22 charts, 7 endpoint dots, no
  console errors); all nine corrected strings confirmed live in the HTML.
- **Staging and prod are in sync** — both at the Nov 16 + corrections state
  (staging `a33c4932`, prod `507004c9`; same bundle `C4d9n6nC.js`).
