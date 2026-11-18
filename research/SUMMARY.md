# Crisis state — Nov 18 (morning pass)

Sources and decisions: [Nov 18 daily log](logs/2026-11-18.md) · [Nov 17 daily log](logs/2026-11-17.md) · [judgment history](judgment-history.md)

## Current read

**Judgment:** 10 / 50 / 40 — corridor holds / standoff / corridor lapses. **HOLD; any
reweight remains a user decision.** UKMTO: **one new entry** this pass — #211
(attack, dated Nov 18, a time-late report of a tanker struck ~13 NM north of
Khasab — fire extinguished, **one crew missing**). It **appears to be the
ADNOC L&S ship** attacked on the evening of Nov 17 — ADNOC says one crew
member is missing and 11 were injured — but UKMTO has not named the ship and
ADNOC gives no location, so the match is likely but unconfirmed (the site copy
says "appears to be"). It is a **separate vessel from the Tara Gas (#208)**, which
remains on fire after abandonment (Maritime Executive, Nov 17) — **no confirmed
sinking, so the tanker-loss input stays at 1**. 130 entries, #143–#211, coverage to
Nov 18. The 8 date-drift flags stand adjudicated (none applied); #211's API
incident date (Nov 18, a registration-time stamp with no explicit date in the
report body) is carried as-is per the reconciliation gate — the incident was
the evening of Nov 17 if the ADNOC match is confirmed. The API's #202
re-classification is flagged, not applied. **Iran has answered the Nov 17
Qeshm strike:** the overnight (Nov 17–18) response was the **first Iranian
attack on Kuwait in over two months** (drones targeted US Patriot systems and
drone/missile launch platforms at Ali Al Salem Air Base; Kuwait says it
engaged the "drone threats" with no damage reported) and a fourth attack on
**Bahrain in six days**; Iran's army chief warned of a "stronger, more
crushing" response "without geographic limitations"; Qatar called the attacks
on its neighbors a "dangerous escalation" (BBC, AP, Nov 18). The window closes
~Nov 19 — **judgment-entry candidate; any reweight is the user's call.**
**CNN dirty-bomb report (Nov 16, citing seven US officials):** US intelligence
indicates Iran is developing plans to detonate a dirty bomb or a chemical
weapon in Washington, DC, targeting senior administration officials; officials
dispute whether Iran has the capability; Trump said Iran would "pay a major
price" (CNN, BBC, Al Jazeera, JPost). Unverified capability claim — a watch
item, not a regime reweight. **Diplomacy:** Iran's FM Araghchi met Oman's
Sultan Haitham in Muscat (Nov 17); the Trump–Xi–Putin trilateral is set for
Shenzhen, Nov 19.

**Filter (diagnostic, not public odds):** HORIZON **15.1 / 50.0 / 35.0**
(0.150781 / 0.499653 / 0.349566); STATE **0.2 / 99.8 / 0.0**
(0.001736 / 0.998264 / 0.000000; 41st run — **FLAT**, identical inputs to the
40th: the Nov 18 Brent (89.870 live, BZ=F −3.5%) is unsettled, no new Kpler
print, no confirmed loss). Inputs: 11 transits (to Oct 30, 19 days stale), one
tanker loss (the #199 burning tanker — the model input; the site copy does not
call it a confirmed loss), Brent **$93.14** (Nov 17 settlement, in the $90–100
band), and Kpler's 7.195M b/d through Oct 28 (21 days stale, basis not
switched).

**Candidate shadow:** HORIZON **15.2 / 49.9 / 34.9** (0.152362 / 0.498948 /
0.348689); STATE **0.5 / 99.5 / 0.0** (0.005250 / 0.994746 / 0.000004).
Not published. Unchanged (no new Kpler print; Brent is context, not a state
observation, in the candidate). Vintage: volume 21 days old, transits 19.

**Storage context:** the reference draw band is 0.45M b/d (the $90–100 band) at
Brent $93.14. It implies about **274.1M** barrels in the SPR by Nov 18, based on
the Nov 6 WPSR figure of 279.535M and twelve elapsed days. Reference estimate,
not a new inventory report; the 250M operational floor sits around Jan 10, 2027
at band pace (~54 days). **The WPSR w/e Nov 13 releases today 10:30 ET —
re-baseline on landing.**

**Other model metrics:** elasticity sensitivity is −0.27 / −0.53 / −0.80 mb/d per
+$5 Brent move (ε 0.05 / 0.10 / 0.15, marginal from the Nov 13 settle $95.84) —
unchanged. **Polymarket weekly cross-check (Nov 18, gamma API):** "Hormuz
normal by Dec 31" = **4.5%** (unchanged from Nov 15; 5.5% Nov 14); "by Nov 30"
= **1.05%** (1.65% Nov 15); the ladder: Jan 31 '27 8.5%, Mar 31 '27 19.5%,
Jun 30 '27 37.0%, Dec 31 '27 57.5% — thin market, no movement worth acting on.
**Calibration ledger: 9 resolved, 2 open (running Brier 0.2724)** — unchanged
this pass.

## Markets, shipping, and stocks

- **Prices (Nov 17 settles, plotted):** Brent **$93.14** (January contract,
  +$0.70, +0.8% vs the Nov 16 $92.44; Newsquawk crude wrap — the Yahoo BZ=F bar
  closed 93.07, the bar includes post-settlement trades, wire plotted) and WTI
  **$86.01** (December contract, +$0.29, +0.3%; bar 85.61; $7.13 below the
  January Brent). Brent is down 17.9% from the Oct 30 settlement of $113.43.
  The December WTI contract's last trading day is **Nov 20 (Friday)** — the
  series rolls to January after that. 10-yr: **Nov 17 close 5.103** (O 5.125 /
  H 5.152 / L 5.089, last trade 19:59 UTC) — **fourth straight close above 5%**
  (Nov 16: 5.121, Nov 13: 5.154, Nov 12: 5.103); the session was verified
  complete before plotting (`apply`'s no-same-day rule had excluded the bar).
  Nov 18 bars at pass time are LIVE and NOT applied: WTI 83.840, Brent 89.870
  (BZ=F −3.5% — catalyst check pending at settlement), 10-yr 5.117 (crude settle
  14:30 ET, Treasuries 16:00 ET).
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
- **AAA Nov 18 (applied):** gasoline **$3.7502**, diesel **$5.9594** — the
  **22nd straight daily decline since Oct 28**, and **$0.5682 below** AAA's
  Sep 22 record of $6.5276 (−8.7% from the record). Nov 18 retail-minus-WTI
  gap, paired against the Nov 17 settlement $86.01 until the Nov 18 settlement
  lands (the chart re-pairs on landing): **≈ $164.3 diesel / $71.5 gasoline**
  (Nov 17: 165.4 / 72.8 same-day).
- **Hormuz:** UKMTO's **Nov 13 weekly overview** is now the operative figure:
  **139 outbound / 169 inbound transits** for the week to Nov 11 (≈65% below
  pre-war levels), 8 incidents in the Strait / Arabian Gulf / Gulf of Oman (two
  of unknown outcome, none sunk), 163 conflict-related incidents since Feb 28
  (Al Jazeera, Gulf News). **New entry this pass: #211 (attack, dated Nov 18 —
  a time-late report of a tanker struck 13 NM north of Khasab; fire
  extinguished, one crew missing)** — it **appears to be the ADNOC L&S ship**
  attacked on the evening of Nov 17 (ADNOC: one crew member missing, 11
  injured; UKMTO has not named the ship, ADNOC gives no location — likely but
  unconfirmed); a separate vessel from the Tara Gas (#208), which is still on
  fire after abandonment, no confirmed sinking; 130 entries, coverage to Nov
  18. Prior entries stand: #209 (Nov 13 time-late, attack,
  crew safe) and #210 (Nov 17, "attempted boarding", Gulf of Aden — skiff
  repelled; not a strait incident, not counted in the weekly attack bars). The week's tankers are now identified in trade press: **Al Dhannah**
  (IMO 9783734, ADNOC-linked) = #205 per Live-AIS; **ON Phoenix** (IMO 9893228,
  fire, crew uninjured), no UKMTO number confirmed (Maritime Executive); and
  **#208 = Tara Gas** (Panama-flagged LPG; crew abandoned, one missing — see
  Current read). **Kpler (Nov 17):
  5 tracked transits Saturday, zero Sunday, vs 31 the prior weekend** — a
  weekend pattern plus a tracking gap, not a state observation; Windward: 7 on
  Nov 16 (one in dark mode). The IRGC's Nov 15 supertanker
  claim (≥2M bbl, "sank") is unverified — see Current read. JMIC's Nov 12
  advisory counts 181
  incidents since Mar 1 and about 211 vessels waiting at anchorages east of
  Hormuz; IMO (Nov 17) puts the count at 136 incidents Mar 1–Nov 11, 35 in
  October (different body/window — not reconciled). The Iranian mine-strike claims (≥6 vessels since Nov 13) remain
  unverified, state media only — see Current read. Kpler's latest full-month
  figure put October crude flows at 11.1M b/d (~2% below September); Kpler (Nov
  11) puts total Gulf exports incl. bypass routes at 16.7M b/d since early October
  vs ~17M pre-war; Kpler data reported by Reuters (Nov 9) put October crude
  exports through Hormuz at 10.3M b/d excluding Iran vs 13.5M pre-war (URL not
  yet located at review — kept with attribution). Kpler's "State of the
  Strait" newsletter (week ending Nov 16, pub. Nov 18): Gulf of Oman–China
  VLCC ~WS 308 on Nov 13 (−64% from the Oct 8 record of WS 841); October
  observed inventories +52M bbl with oil on water +86M; **OFAC General License
  HH (Iran wind-down) expires Nov 20**; Reuters put North Asia spot LNG at
  $31.30/MMBtu in the week to Nov 13 (a spot level, not an assessment — not
  plotted).
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
  implemented; **on Nov 17 Iraq restarted the long-idle (~12 years) Kirkuk–Ceyhan
  pipeline to Turkey at 120 kb/d, with plans to reach 500 kb/d** (Reuters, oil
  minister) — a pre-war bypass route back online.
- **Iran / US:** neither side is moving toward a deal, but the channels moved
  and the strikes continued. **Riffa, Bahrain (verified timeline):** On Nov 13,
  CENTCOM said the IRGC launched two one-way attack drones toward Bahrain and
  both were shot down by US forces, with "no injuries or damage" (CENTCOM,
  via MEE/RFE/RL; AP) — the first confirmed launch at a Gulf host state since
  early September (ISW-CTP). On Nov 15, the IRGC claimed six drones targeted a
  US radar at the Riffa helicopter base; Bahrain said it intercepted the attack
  and issued its first nationwide alert since September. **On Nov 17 CENTCOM called a
  new IRGC radar claim false** — the drones "were intercepted without any damage
  to US equipment or injury to American personnel" (Gulf News, CBS News); the IRGC separately claimed a Nov 16 MQM-170 drone capture —
  no US confirmation. **On Nov 17 the US struck back: fighter jets hit an IRGC
  missile launch site on Qeshm Island “in self-defense” after the day's drone
  attack on Bahrain** — the log calls it the first *publicized* US strike on Iranian
  territory since July (unverified); ABC/WSJ report unannounced *limited*
  strikes on Qeshm in recent weeks (JPost, Fox, CBS). Iran's deputy Qeshm
  governor: no damage to civilian areas (IRNA). **Iran's overnight answer
  (Nov 17–18): drones targeted US Patriot systems and drone/missile launch
  platforms at Kuwait's Ali Al Salem Air Base — the first Iranian attack on
  Kuwait in over two months** (Kuwait says it engaged the "drone threats"; no
  damage or casualties reported; the foreign ministry condemned the "flagrant"
  sovereignty violation — BBC, AP); a fourth attack on Bahrain in six days;
  Iran's army chief warned of a "stronger, more crushing" response "without
  geographic limitations"; Qatar called the attacks on its neighbors a
  "dangerous escalation" (BBC, Nov 18). **CNN (Nov 16, citing seven US
  officials): US intelligence indicates Iran is developing plans to detonate a
  dirty bomb or a chemical weapon in Washington, DC**, targeting senior
  administration officials; officials dispute the capability (CNN, BBC, Al
  Jazeera, JPost) — unverified; Trump said Iran would "pay a major price."
  **Iran's FM Araghchi met Oman's Sultan Haitham in Muscat (Nov 17)** (Tehran
  Times, Xinhua). **Acting SecNav Cao (Senate
  testimony):** the war is putting "strain" on the Navy; weapons stockpiles are
  dwindling; resources shifted from Asia-Pacific. **A THIRD US carrier group (USS Theodore
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
  Masirah); no Saudi confirmation. Nov 17 — claimed **drone strikes on East–West
  pipeline pumping stations 8 & 9** (Al Masirah; Reuters: "launched drones
towards" the line); unconfirmed, no Saudi-side damage report — the Yanbu route
  (the export path around Hormuz) still has no confirmed hit. Their **Lahij offensive advanced ~12 km**
  before Saudi forces retook the ground on Nov 13, with Saudi close air support in
  Lahij and southern Taiz (Critical Threats, Khaleej Times). The coalition says at
  least 26 killed in the Kingdom since Sep 23 (Saudi authorities, via Al
  Jazeera, Nov 15 — re-verified post-review); Nov 14–15 it intercepted two
  Houthi ballistic missiles aimed at Riyadh (Nov 15) and three drones over the
  eastern region (Reuters, Gulf News). JMIC assesses the southern Red Sea / Bab el-Mandeb threat as **substantial**
  (via Kpler's "State of the Strait" newsletter, Nov 18). The GCC's Kuwait
  unified command (assigned Nov 10) has no operational date.
- **Iraqi Kurdistan:** the suspected drone attack on the **Khor Mor gas field**
  (late Nov 8 / Nov 9) suspended production (~2,800 MW of generation offline);
  **no claim of responsibility as of Nov 11**.
- **Russia:** **the overnight Nov 17–18 strikes are confirmed at Ilsky and
  Afipsky, both in Krasnodar Krai — both already in the site list** (Ilsky a
  repeat of the Sep 26 strike, three killed; Afipsky struck Nov 6): regional
  officials reported fires at two unnamed facilities after drone debris fell;
  local residents identified the refineries (ASTRA, Moscow Times, Nov 18). The
  site tally stands at **15 sites** (window Oct 24–Nov 18) — the first pass
  added them as new entries ("17 sites"), corrected to 15 at review. The
  reported Nov 17 drone attack on
  **Bashneft-Ufaneftekhim (Ufa)** (UA Unmanned Systems Forces; Bloomberg,
  Rigzone) remains unconfirmed — Bashkortostan authorities say all plants
  operating normally, no significant damage, no fire reported — the tally
  excludes it and Ufa remains a watch-list item. Salavat (Bashkortostan, ~10
  Mt/yr) was struck overnight Nov 16–17, a repeat of the Oct 8 strike; no
  critical damage reported (Moscow Times). **Zelensky (Nov 15
  address): "more than 55% of Russia's oil refining capacity" neutralized** — up from the Oct
  4 figure of 51% (Defense Ministry) and the Sep 9 Forbes ~54%; Ukraine's claim,
  not independently verifiable — it now sets the LOW end of the spread (45–80%
  remaining). A **second record drone wave: 1,441 UAVs downed Nov 16–17** (the
  prior record was 1,336 on Nov 15–16); the Russian MoD claimed **184 drones
  intercepted Nov 17–18** over Belgorod, Rostov, Krasnodar, Crimea and the Sea
  of Azov (UA.NEWS). The **Crimean Bridge's road span COLLAPSED** after strikes
  on two consecutive nights (Nov 16–17) — the road link is severed, the rail
  arch is damaged (Ukrainian General Staff, via BBC, Guardian); Peskov: it will
  be restored "even better than before." Prior entries stand: TAIF-NK at Nizhnekamsk (Nov 15, the plant's only
  ELOU-AVT-7 unit hit); Volgograd (Nov 13 General-Staff claim; four killed);
  Omsk (Nov 11, third strike). **Damage tally (Rand, via Moscow Times, Nov
  17): Norsi, Yanos and Novokuibyshevsk completely halted; Ryazan ~−90%, Omsk
  ~−50%, Volgograd ~−50%; Moscow has urged refineries to shift to lower-grade
  gasoline** (Reuters via Moscow Times). Standing: **Reuters reported Nov 12 that fuel
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
  (last known JKM–TTF spread 51.1¢/MMBtu, Nov 12, Platts); a weekly bunker
  snapshot (engine.online) shows January JKM trading around **$29.60/MMBtu** —
  a traded CFD value, not an assessment; Reuters (via the Kpler newsletter,
  Nov 18) put North Asia spot LNG at **$31.30/MMBtu** in the week to Nov 13 —
  a spot level, not an assessment; NOT plotted. EU carbon slipped below
  €90 on the free-permit deal — context, not a plotted series.
- **WPSR w/e Nov 6 (released Nov 12; ingested Nov 13):** SPR **279.535M
  (−2.649M)** — the largest weekly withdrawal since the week ending Aug 28
  (−3.122M); per Reuters the lowest since Oct 1982. Commercial crude ex-SPR
  **414.417M (+4.657M)**; analysts had expected a **1.1M decline** (Reuters poll).
  Distillates **103.330M (+4.071M)** — back above 100M after one week below it
  (Oct 30) — but still **6.8% below last year**; East Coast 23.784M (12.2%
  below). **Next: today, Wed Nov 18, 10:30 ET** (w/e Nov 13) — pending at this
  pass (~07:00 MST).
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

- **Today** — EIA WPSR, **Wed Nov 18, 10:30 ET** (w/e Nov 13; expected: SPR
  w/e Nov 13 — band pace suggests ~276M, utilization, world balance; pending
  at this pass) — then the Nov 18 crude settlements (14:30 ET; BZ=F −3.5%
  catalyst check) and 10-yr (16:00 ET; would be a fifth straight close above
  5%); the next JOGMEC TTF/JKM assessed print (not yet published — last spread
  51.1¢/MMBtu, Nov 12); the Dominica Prosperity salvage (day 7).
- **Nov 19** — **Trump–Xi–Putin trilateral, Shenzhen** (Iran on the agenda per
  the White House); judgment-entry decision on the Qeshm answer (Kuwait/Bahrain
  — escalation without a confirmed loss).
- **Nov 20** — the Dec WTI contract's last trading day; roll to January after.
  OFAC's general licenses HH/II/III (crude, products, petrochemicals — incl.
  the diesel deal) EXPIRE end of Nov 20.
- OPEC+ ministerial, Nov 29 (2027 policy); STEO Dec edition, ~Dec 11 (next
  scheduled EIA–market spread check); **CPI, Dec 10**.
- **The standing reweight condition remains met** after the Nov 8 review. This
  pass added no confirmed loss (#211 is the Nov 17 ADNOC L&S vessel — damaged,
  fire extinguished, one crew missing, not lost; Tara Gas is still burning,
  unconfirmed as lost; the Iranian mine claims — two tankers and an LNG ship
  on Nov 18 — are state media only, no UKMTO warning, no wreckage photos);
  Iran's Qeshm answer (the Kuwait and Bahrain strikes, Nov 18) is a
  regime-level escalation, not a physical input — the answer has arrived
  (Kuwait/Bahrain, Nov 18); a judgment entry is the user's call; **today's
  WPSR is the next
  physical reweight point** (SPR level, world balance); the next Kpler print
  is the clean transits/volume reweight point; **open question: the model's volume basis (7.195M
  total-oil vs the Reuters-reported 10.3M crude-only) — a basis change moves
  the STATE/HORIZON rows and needs an explicit decision.**
- Watch: **the WPSR (today 10:30 ET) and the Nov 18 settlements (14:30 ET —
  BZ=F −3.5%: find the driver before plotting)**; **Iran's next move after the
  Kuwait/Bahrain strikes — the "Qeshm 48-hour window" has no source found (review Nov 18)** (judgment
  entry, user's call); **the Tara Gas — confirmed lost/sunk or salvage, and the
  two missing crew members total** (one Tara Gas, one on the ADNOC L&S ship — #211 = ADNOC is likely but unconfirmed); **the dirty-bomb
  report — any corroboration or declassification**; **the Houthi East–West
  pipeline claim (stations 8 & 9) — any Saudi-side confirmation**; corroboration of the IRGC supertanker claim (hull name, AIS, photos);
  the MQM-170 drone-capture claim (no US
  confirmation) and whether the third CSG brings strikes; the Nov 19 trilateral
  outcome; the Dominica Prosperity salvage and any independent confirmation of
  the 400,000 bbl release; the #199 tanker's identity; the Qatari two-week
  window; Khor Mor attribution; the Ceyhan ramp-up (120 → 500 kb/d) and the
  Iraq–Oman lane; the Fed's reaction to the 6.5% PPI print (December-hike
  pricing); whether the 10-year holds above 5% (four straight closes now);
  the OMR paywalled PDF for the
  month-by-month inventory detail; the Volgograd halt (wire confirmation of the
  General-Staff claim still open); 10 UKMTO entries (#166, #172, #173, #189,
  #192, #193, #194, #196, #199, #200) carry API date drift against the
  adjudicated incident dates (registration-timestamp pattern; #166 stands on
  its explicit report date) — none applied; #202's API type was re-classed
  (flagged, not applied).
- **Prod:** `0f9dcf9a-d5ad-448a-bd4e-b26ebb01d942` (bundle `F-uAUDyj.js`) — deployed 08:50 MST Nov 18 on the user's explicit green light; bytes identical to the verified staging bundle; live verify-live PASS + 6/6 corrected strings, 4/4 stale strings absent. Supersedes `bebb8610` (below). Staging and prod in sync.
- (Prod: `bebb8610-9b48-4a37-80f3-685e5c23cf54` (bundle `Cx7Zzkii`) —
  deployed 17:03 Nov 17 on the user's green light (verify-live PASS + content
  spot-check matched). Superseded by `0f9dcf9a` above.)
- **Staging:** `0da23143-4e64-4301-bab4-fcf8de1186fa` (bundle `F-uAUDyj.js`;
  supersedes `836bb4cb`) — the Nov 18 morning state plus the external
  review's six fixes (review-2026-11-18.md): Russia tally de-duplicated to
  **15 sites** (Ilsky/Afipsky already listed; the Nov 17–18 strikes folded
  into their entries), Ilsky/Afipsky attribution corrected (residents named
  the plants; Afipsky capacity dropped), EIA time 10:30 a.m. ET, "State of the
  Strait" re-attributed as a newsletter citing Kpler, #211 = ADNOC → "appears
  to be", Novak's lower-grade-gasoline directive + Rand halts moved to the
  refinery-outages flag; copy trimmed (Russia 2,316→940 / 4,192→3,657 chars,
  diplomacy 1,981→1,285, tankers 1,682→1,319, commercial-crude paragraph);
  the unsourced "Qeshm 48-hour window" removed. Geometry gate + live
  verify-live PASS; spot-check 6/6 new strings present, 4/4 stale strings
  absent. **WPSR w/e Nov 13 and the Nov 18 settlements still pending — EIA
  rows (stats SPR/distillate, cascade, WPSR watch item) unchanged.**
  Superseded by the pre-review morning state below; the same state shipped to
  prod as `0f9dcf9a` (08:50 MST).
- (Staging: `836bb4cb-a7db-4015-b1d0-a481c858b073` (bundle `DAYfhz-R.js`) —
  pre-review Nov 18 morning-pass state: UKMTO #211 (likely ADNOC L&S,
  coverage to Nov 18), russiaStruckRefineries +2 (17 sites — corrected to 15
  at review), russiaSnapshot (Ufa claim not counted, Crimean Bridge road-span
  collapse, 184 drones, Rand three-complete-halt tally), watchlist (Kuwait Ali
  Al Salem + Hatami + Qatar, dirty-bomb report, Muscat, JMIC "substantial",
  two missing crew, Iran's Nov 18 mine claims, 10-yr four straight closes),
  AAA Nov 18 applied (gasoline 3.7502 / diesel 5.9594), DATA_AS_OF → Nov 18,
  commercial-crude paragraph re-typed (Nov 6 week ROSE 4.7M to 414.4M — the
  copy still said "fifth straight decline" as of Oct 30). Geometry gate +
  verify-live PASS; content spot-check 14/14. Superseded by `0da23143`; the
  evening state follows below.
- (Staging: `49b24b0a-8981-4faa-8df7-b229c87fd9a2` (bundle `Cx7Zzkii`) — evening-pass state (Nov 17 settlements at the wire,
  10-yr 5.103, UKMTO #210, Tara Gas, Qeshm, Kirkuk–Ceyhan — see `d8d76800`
  below) plus the post-review fixes (review-2026-11-17.md, evening section):
  price-paragraph drivers corrected (Bahrain launches + Tara Gas second strike;
  Qeshm "later that day" — the strike reports postdate Brent's settlement;
  Kirkuk removed from the price copy); Brent note de-sourced ($3 range cut;
  "Tara Gas (UKMTO #208)" phrasing fixed); crew numbers per India's official
  count (21 of 24 Indian crew ashore, two in hospital, one missing); the
  "first publicized strike since July" claim marked unverified; diplomacy and
  tanker watch items shortened (1,520→1,056 and 1,560→1,255 chars). Plus the
  two UKMTO items: **#210 re-typed "attempted boarding"** (first-class type
  added — crisis.ts union + header note, ukmto-fetch.mjs KNOWN_TYPES + header,
  test template, UkmtoChart copy "hijackings, attempted boardings, …"; all
  regression tests pass; the live fetch now reports #210 clean, and the 8
  remaining flags are the pre-existing date-drift/#202 set) and the **evening
  payload archived** (research/data/ukmto/ukmto-all-20261117T1625S.json,
  67 entries #143–#210, with provenance; supersedes the morning 06:22 file).
  Geometry gate + verify-live PASS on the live staging URL (all 22 charts, 7
  endpoint dots, no console errors); content spot-check passed ($93.14 ×3,
  $86.01 ×2, "launched at Bahrain" ×1, "Later that day" ×1, 21-of-24 crew ×1,
  "attempted boardings" ×1, all old error strings ×0, Kirkuk ×1 = flows item
  only). **Prod is `bebb8610-9b48-4a37-80f3-685e5c23cf54`** (same bundle
  `Cx7Zzkii`; deployed 17:03 MST on the user's green light, verify-live PASS
  + content spot-check matched) — staging and prod were in sync until the
  Nov 18 morning staging deploy above (836bb4cb).
- (Staging history: `d8d76800` / `EcqLCQkL` was the pre-review evening build —
  Nov 17 settlements at the wire (Brent $93.14 / WTI $86.01, Newsquawk), 10-yr
  5.103 (fourth straight close above 5%), UKMTO #210 (then mapped to hijack),
  Tara Gas identification, Qeshm in the diplomacy item, Kirkuk–Ceyhan in the
  oil-flow item, crack pairing re-paired same-day (165.4 / 72.8). Superseded
  by `49b24b0a`.)
