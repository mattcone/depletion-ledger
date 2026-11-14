# Crisis state — Nov 13 (morning pass)

Sources and decisions: [Nov 13 daily log](logs/2026-11-13.md) · [Nov 12 daily log](logs/2026-11-12.md) · [judgment history](judgment-history.md)

## Current read

**Judgment:** 10 / 50 / 40 — corridor holds / standoff / corridor lapses. **HOLD; any
reweight remains a user decision.** UKMTO's latest overview (week ending Nov 6)
reports 170 outbound and 155 inbound transits, about 65% below pre-conflict levels,
and counts 11 attacks: three vessels sank, five needed help, three continued — it
does not name the vessels counted as sunk. Since then: **#202 (Nov 11) was
confirmed by UKMTO's own UPDATE 001 as an attack** — the tanker "was struck with an
unknown projectile," all crew safe, "re-classified as an Attack" (JMIC names it the
NCC Fajr); #203 (Nov 10) put an eastbound tanker in the southern Arabian Gulf
struck, crew taken ashore (JMIC names it the Fujairah Energy); **#204 (Nov 11) is
the Dominica Prosperity** (Liberia-flag crude tanker, Sinokor Maritime) — engine
room hit 14 nm NW of Ra's al Khaymah, all 22 crew (19 Indian) evacuated, no
casualties, fire-fighting under way. The IRGC's Nov 12 claim of two disabled
supertankers on the strait's southern route is unverified. #199's burning tanker
remains Reuters-verified as Navig8-managed with identity unresolved; no sinking
confirmed.

**Filter (diagnostic, not public odds):** HORIZON **15.0 / 50.0 / 35.0**; STATE
**0.1 / 99.9 / 0.0** (34th run — Brent moved up 92.76 → **$95.82**, the Nov 12
settlement, still in the $90–100 band; −0.1 to the holds weight). Inputs: 11
transits (to Oct 30, 14 days stale), one tanker loss (the #199 burning tanker —
the model input; the site copy does not call it a confirmed loss), Brent
**$95.82**, and Kpler's 7.195M b/d through Oct 28 (16 days stale, basis not
switched).

**Candidate shadow:** HORIZON **15.2 / 49.9 / 34.9** (0.152362 / 0.498948 /
0.348689); STATE **0.5 / 99.5 / 0.0** (0.005250 / 0.994746 / 0.000004).
Not published. Identical to the Nov 6–12 runs (no new Kpler print; Brent is
context, not a state observation, in the candidate).

**Storage context:** the reference draw band is 0.45M b/d (the $90–100 band) at
Brent $95.82. It implies about 276.4M barrels in the SPR by Nov 13, based on the
Nov 6 WPSR figure of 279.535M and seven elapsed days. Reference estimate, not a
new inventory report; the 250M operational floor sits around Jan 11, 2027 at band
pace.

**Other model metrics:** elasticity sensitivity is −0.26 / −0.52 / −0.78 mb/d per
+$5 Brent move (ε 0.05 / 0.10 / 0.15, marginal from the Nov 6 settle $98.32) —
unchanged. **Polymarket weekly cross-check (last: Nov 10):** "Hormuz normal by
Dec 31" = 8.5% (vs 12% Oct 15); "by Nov 30" = 3%. This market asks whether Hormuz
will be "normal" by a date, which is not the same event as the model's
corridor-state categories. Calibration ledger: 4 resolved, 7 open (Brier 0.2009);
the Nov 15 corridor-lapses binary set (5 rows) settles in 2 days.

## Markets, shipping, and stocks

- **Prices:** Nov 12 settlements now plotted — Brent **$95.82** (January contract,
  +$3.06, +3.3%; Reuters leads with the Houthi-claimed attacks on Saudi oil sites —
  a pumping station on the East–West pipeline and a Yanbu facility — and reports of
  tankers hit in the strait; mid-session, Trump posted “We don't need a deal with
  Iran. Those days have long since passed.” and “We've got their Strait!” (CNBC).
  Down 15.5% from the Oct 30 settlement of $113.43.) and WTI **$88.74** (December
  contract,
  +$2.21, +2.6%; $7.08 below January Brent). The December WTI contract's last
  trading day is Nov 20 — the series rolls to January after that. 10-yr: the Nov
  12 close is **5.103** — back above 5% for the first time since Oct 28 (5.045),
  ending the nine straight closes below it (Oct 29–Nov 10); the Yahoo Nov 11 bar
  (4.998) is a Veterans Day carry, not a session, and is not plotted.
- **CPI (released Nov 10, BLS USDL-26-1685):** October consumer prices **+0.4% MoM
  (SA)** — above the +0.3% consensus — and core **+0.3%**, the third straight
  month at that pace. **No headline or core 12-month rate was published** (the
  2025 shutdown left no October 2025 index), so September's 3.7% remains the
  latest official headline rate; gasoline's 12-month change was +37.4%. Futures
  fell; traders began pricing a possible December Fed increase (CNBC).
  **October PPI (released Nov 13, verified from the BLS API):** headline
  **+6.5% YoY — the largest since late 2022** (CNBC: "highest in nearly four
  years") after **+0.3% MoM (SA)**; September was revised +1.3% → +1.4%. Core
  (ex food, energy, trade) **+0.5% MoM (second straight month), +4.9% YoY**
  (Babypips/finwire). BLS-reported 12-mo (WPUFD4, unadj): Oct 6.5, Sep 6.3
  (unchanged), Aug revised 5.6 → 5.5. With the CPI's October annual rate
  unpublished, 6.5% is now the latest official annual print — and the strongest
  case yet for a December Fed hike (CNBC: "keeping pressure on the Fed").
  November CPI, Dec 10.
- **AAA Nov 13 (applied):** gasoline **$3.8724**, diesel **$6.0640** — the
  **17th straight daily decline since Oct 28**, and **$0.46 below** AAA's Sep 22
  record of $6.5276. Nov 13 retail-minus-WTI gaps (paired to the Nov 12 settlement
  $88.74, derived): **$166.0 diesel / $73.9 gasoline**.
- **Hormuz:** UKMTO's latest overview (week ending Nov 6): 170 outbound / 155
  inbound transits, about 65% below pre-conflict levels, 11 attacks (three counted
  as sunk, unnamed); 88 projectile strikes since July 6. New this pass: **#204
  (Dominica Prosperity, Nov 11)**; **#202 confirmed by UKMTO as an attack** (the
  API's type field lags its own update body — adopted as attack per the Nov 13
  archived payload, precedent #187); #203 named by JMIC as the Fujairah Energy;
  the IRGC's Nov 12 claim of two disabled supertankers (unverified, unnamed).
  JMIC's Nov 12 advisory counts 181 incidents since Mar 1 and about 211 vessels
  waiting at anchorages east of Hormuz. IMO counts 130 incidents in the region,
  at least 25 seafarers killed. Kpler's latest full-month figure put October crude
  flows at 11.1M b/d (~2% below September); Kpler (Nov 11) puts total Gulf exports
  incl. bypass routes at 16.7M b/d since early October vs ~17M pre-war; Kpler data
  reported by Reuters (Nov 9) put October crude exports through Hormuz at 10.3M
  b/d excluding Iran vs 13.5M pre-war (URL not yet located at review — kept with
  attribution).
- **Oil flows (OPEC monthly, Nov 11; IEA OMR, Nov 13):** OPEC+ October output
  **41.23M b/d**, about **97%** of the pre-crisis February level (42.72M), based
  on outside estimates; **Saudi Arabia told OPEC its output rose 26% to 10.563M
  b/d** (from 8.372M in September), but OPEC's outside estimates put it at
  **9.194M** (Bloomberg via Rigzone). The IEA's own OMR count is lower — OPEC+
  **37.72M b/d** of crude in October (35.71M in September) — and says **Gulf
  exports excluding Oman reached 18.4M b/d, 26% below pre-war** and +1.6 m-o-m.
  At the G7 (Nov 10) Rubio said strait oil/fuel flows had reached 80–85% of
  pre-conflict levels on some nights, the gap being Iranian oil (AP). Iraq's lane
  near Oman is not yet implemented.
- **Iran / US:** neither side is moving toward a deal. Rezaei (Nov 11) said Iran
  "will not remove a single atom" of enriched uranium from the country, ruling
  out a transfer abroad (Al Mayadeen, via RFE/RL), and said US bases from the
  Middle East to Europe would be targets (posted on X, Nov 11). Ghalibaf (Nov 11)
  told Al Jazeera the "ball is in the American court" and the strait will "never
  return" to pre-war status. Trump (Nov 12) posted: “We don't need a deal with
  Iran. Those days have long since passed.” and “We've got their Strait!” — and
  said further military action didn't appear necessary "at this point" (CNBC).
  Military incidents continue: IRNA reported an "enemy" attack on
  Bandar Sirik (Nov 12), and the IRGC claimed it targeted a US early-warning radar
  in Bahrain (Nov 13). A CBS live-blog line that CENTCOM struck "more than 100
  targets over four straight nights" (Nov 12) was **not located at review** — cut
  from the site pending a URL. The Qatari two-week window (JPost/i24) and the
  Israel Hayom interim-deal report (reopen Hormuz, release $8B in Qatari-held
  funds) remain unconfirmed. Task Force Iron Gate (CENTCOM, Nov 7) works the
  land/Caspian routes.
- **Saudi / Yemen:** Nov 11 — the coalition said it destroyed **three cruise
  missiles headed for the Riyadh region, two drones aimed at Mecca and the south,
  and two missiles heading west**. The Houthis denied targeting **Mecca** and
  claimed strikes on a pumping station at **Yanbu** and on a Saudi pipeline, which
  Saudi Arabia hasn't confirmed (Reuters, Gulf News, Nov 12). CBS: at least 20
  killed in attacks on Saudi Arabia since early October. The GCC's Kuwait unified
  command (assigned Nov 10) has no operational date.
- **Iraqi Kurdistan:** the suspected drone attack on the **Khor Mor gas field**
  (late Nov 8 / Nov 9) suspended production (~2,800 MW of generation offline);
  **no claim of responsibility as of Nov 11**.
- **Russia:** **Volgograd (Lukoil-Volgogradneftepererabotka, in the southern
  industrial zone) was hit overnight Nov 12–13** — four workers killed, two
  injured (governor); no official confirmation that the refinery itself was hit,
  Lukoil did not reply to comment (AP); a production facility in **Rostov-on-Don**
  was also reported ablaze (Kyiv Independent) — unidentified, not in the tally.
  Added to the struck tally (now **12 sites**, window Oct 24–Nov 13). Fire Point's
  36%-of-capacity claim and the General Staff's five-largest claim stand as
  Ukrainian claims. The Ust-Luga terminal strike (Nov 11) remains tracked in the
  snapshot flag, not the tally. **Diesel:** the FT (Nov 11–12) reports Russian
  diesel exports roughly doubled in October — **135,000 → 271,000 b/d (Kpler)** —
  after an early-October US–Russia diesel deal and a pause in Ukrainian refinery
  strikes; **none of the four US-bound tankers has delivered**, the Agioi Fanendes
  is waiting off the East Coast for a buyer. The pause is over (the Volgograd and
  Rostov strikes). The producer diesel export ban runs through Jan 31, 2027 with
  exceptions (TASS); the exceptions reportedly run as quotas tied to the deal
  (Moscow Times, Oct 29). The Abu Dhabi trilateral (US–Ukraine–Russia, first
  substantive since February, no breakthrough, new round agreed) is off the oil
  thread.
- **Gas (TTF/JKM):** unchanged — TTF **$28.0/MMBtu** and JKM **$32.2/MMBtu** (Dec
  delivery, Nov 6 values, per the Global LNG Hub post of Nov 9) remain the latest
  plotted JOGMEC-assessed prices; no new assessed print as of this pass.
- **WPSR w/e Nov 6 (released Nov 12; ingested this pass):** SPR **279.535M
  (−2.649M)** — the largest weekly withdrawal since the week ending Aug 28
  (−3.122M); per Reuters the lowest since Oct 1982. Commercial crude ex-SPR
  **414.417M (+4.657M)**; analysts had expected a **1.1M decline** (Reuters poll,
  via Oil & Gas 360/Oilprice). Distillates **103.330M (+4.071M)** — back above
  100M after one week below it (Oct 30) — but still **6.8% below last year**;
  East Coast 23.784M (12.2% below). **Next: Wed Nov 18, noon ET** (w/e Nov 13).
- **STEO November edition (released Nov 10, ingested Nov 10):** October world
  balance is a **1.7 mb/d net build — the first build month since February**; the
  September draw was cut 2.94 → 0.97 mb/d; 2027 is a build every month; the
  cumulative draw is fully made back by **April 2027**. EIA Brent: 2026 $97 (was
  $96), 2027 $86 (was $84). Scheduled spread check (Nov 12 settlement $95.82 vs
  the workbook's H2 2026 Brent $102.59): **≈ −$6.8** — negative side, the
  market-above-EIA gauge NOT met, no reweight.
- **IEA OMR November edition (released Nov 13, ingested this pass):** October
  observed inventories **built +52 mb (+1.7 mb/d)** — the first increase since
  June; oil on water +86 mb (highest since January); on-land stocks remain at
  their lowest since at least 2016 (OECD total −47 mb). **Cumulative draw: 462 mb
  since the start of the war (Feb 28)** — the same end-February anchor the Oct
  edition used; the Nov-edition point (−462) is plotted in world-stocks.json.
  Refinery runs **81.3 mb/d** (seasonal low, −1.3 m-o-m); December forecast
  84.7; 2026 refining forecast **−2.2 mb/d** (revised up from −2.3 in the Oct
  ed). 2026 demand −2.7 mb/d to 102.3; October supply 105.4. The OMR says the
  **IEA plans a further 71M-barrel release of emergency stocks by end-February
  2027, about 15M of it diesel**, to bridge the Russian-diesel gap (via Business
  Upturn; the G7's October 100M-barrel package is separate). The 71M is not
  printed on the public OMR page — confirm in the full report.

## Next dates

- EIA WPSR, **Wed Nov 18, noon ET** (w/e Nov 13).
- GlobalSecurity Day 259 (0800 ET cutoff) — ingest when published; the 48-hour US
  strike window closed ~11:30 ET Nov 13.
- **Nov 15 corridor-lapses binary** — settles in 2 days (proxy: sustained ~0
  verified transits; current transits 11/day to Oct 30 argue against lapse).
- **WTI December-contract roll after Nov 20**; OPEC+ meeting, Nov 29; STEO Dec
  edition, ~Dec 11 (the next scheduled EIA–market spread check).
- **The standing reweight condition remains met** after the Nov 8 review. #202's
  confirmed attack adds no confirmed loss (crew safe, no sinking); the IRGC
  two-supertanker claim is unverified. The next Kpler print is the clean physical
  reweight point; **open question: the model's volume basis (7.195M total-oil vs
  the Reuters-reported 10.3M crude-only) — a basis change moves the STATE/HORIZON
  rows and needs an explicit decision.**
- Watch: the Dominica Prosperity's fate (fire-fighting); the IRGC two-supertanker
  claim; the #199 tanker's identity; the Omsk/Volgograd production halts;
  corroboration of the Qatari two-week window and the Vance meeting; Khor Mor
  attribution; Iraq transit-lane implementation; the Fed's reaction to the 6.5%
  PPI print (December-hike pricing); whether the 10-year holds above 5%; the OMR
  paywalled PDF for the
  month-by-month inventory detail; 7 UKMTO entries (#189, #192, #193, #194,
  #196, #199, #200) changed dates on the API — manual review before re-typing.
- **Prod:** `088023e0-c27e-4ddf-be85-bd1e2fd2f087` (bundle
  `BW-Lfr6R.js`, deployed after the evening PPI pass and the external review's
  PPI-copy fixes; previous `00f84515`) — the full Nov 13 state: the pass plus the external review's
  fixes (`logs/review-2026-11-13.md`) plus two data decisions: #202 re-typed as
  attack (per UKMTO's own UPDATE 001) and the world-stocks October point plotted
  at the published −462 (was the chained −457). Deployed on user green light
  this session; live-verified on www.depletion.org (see the Nov 13 daily log).
- **Staging:** `46c17311-c98d-4589-a56e-7e5c42e08245` — identical bytes to the
  prod deploy.
