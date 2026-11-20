# Crisis state — Nov 19 (afternoon pass + Kpler update)

Sources and decisions: [Nov 19 daily log](logs/2026-11-19.md) · [Nov 18 daily log](logs/2026-11-18.md) · [Nov 17 daily log](logs/2026-11-17.md) · [judgment history](judgment-history.md)

## Current read

**Judgment:** 10 / 50 / 40 — corridor holds / standoff / corridor lapses. **HOLD;
any reweight remains a user decision.** UKMTO: **no new entries** this pass —
131 entries, #143–#212, coverage to Nov 19; the latest is #212 (attack,
dated Nov 18, a time-late report of a tanker "struck by an unknown
projectile in its engine room" ~6 NM north of Khasab while outbound through
the strait — all crew safe and accounted for, extent of damage unknown,
vessel not named; **vessel naming is muddled** — India's shipping minister
named the Wednesday strike's ship MT Navig8 Messi, but that name is also the
one security firm Vanguard attaches to the Nov 17 attack (#211), so at
least one attribution is wrong; the site copy keeps #212 unnamed). No
confirmed loss, so the tanker-loss input stays at 1 (the #199 burning
tanker is the model input; the Tara Gas #208 remains unaccounted for;
#211's missing crew member still unaccounted for). The 8 date-drift flags
and the #202 re-classification flag stand (not applied). **The escalation
continued on the political/territorial axis, with no new model input:**
**the Senate rejected a war powers resolution to end the war 51–48** (Nov
19, the first such vote since the midterms — Collins, Murkowski and Paul
plus nearly all Democrats for; Tillis (R-NC) against this time; mostly a
signaling vote — AP, CBS, The Hill, Guardian); **CENTCOM (Adm. Cooper) called
Iran's mine-strike claims "FALSE" and said the primary transit routes
"remain free and clear of Iranian sea mines,"** while ISW assesses Iran
makes mine claims to "undermine US operations" (Iran's navy claim (Nov 19,
state media, unverified) that three tankers struck mines east of the strait
Wednesday stands unverified); **Kpler's Nov 13 media briefing (flow data through Nov 11) puts the 7-day
average of strait transits, excluding Iranian-origin cargoes, at 5.66M b/d —
67% below pre-war — with tanker crossings at 11 a day, and total clearance
including net Gulf of Oman STS at 8.3M b/d, 48% of pre-war; the latest four
days are preliminary and Kpler expects them to settle 1.5–2× higher** (the
Bloomberg read of Kpler data on Nov 19 — ~10M b/d by Nov 10, down from
~13.4M early in the month — is the provisional transit-plus-transfer figure)
— and Kuwait
notified the IMO of attacks on **eight of its own tankers** in recent
weeks; **the EU's Nov 16 sanctions package lists 12 Russian refineries**
(incl. Gazprom Neft Moscow and Omsk) and the St Petersburg oil terminal;
**RAND (Moscow Times, Nov 17): Norsi, Yanos and Novokuibyshevsk halted, Ryazan down ~90%,
Omsk and Volgograd ~half, Kirishi ~one-third** [corrected at review: the earlier line dropped Novokuibyshevsk]; the "~30%" processing cut is superseded by Reuters' 45% (Nov 18); seaborne gasoline imports ran 416,000 tonnes (Aug) and 234,000 (Sept)
vs ~5,000 tonnes/month pre-crisis, and Novak told companies to keep importing (Moscow Times; the "at least until the end of the year" quote rests on an aggregator — unverified); **the Pentagon puts the war's cost
to date at $48.3B** (as of Nov 13). **Israel (Channel 12 via ToI): an Israeli official says the chances of military action are growing, pending Trump's approval** [review: the "coming days" quote wasn't found in the ToI article]; the Washington Post (via ToI) reports Netanyahu ordered Mossad to prepare covert operations without informing the IDF chief or the cabinet. Trump said there is an "indication" Iran is developing
chemical/biological weapons; Iran's foreign ministry rejected the claim as
the "same fraudulent script" as Iraq in 2003. **CENTCOM extended the
blockade to ship-to-ship transfers (Nov 18 advisory)** — vessels receiving
Iranian cargo at sea may be stopped, boarded, diverted or captured (it
targets the LPG/jet-fuel exports Iran has sustained since July); **a Houthi
missile damaged Saudi Arabia's PIF Tower in Riyadh before dawn Nov 19** —
Saudi civil defense: a tower in the King Abdullah Financial District was
"targeted," material damage to several floors, no injuries (the coalition
intercepted four ballistic missiles and a cruise missile aimed at the
south); the Houthis say a Saudi strike on a lodging house in Taiz killed or
wounded at least 19 (the coalition, which launched a major aerial assault
across Houthi-held territory, says at least 17 killed); **USS George
Washington has left the Middle East** (two US carriers remain in the
CENTCOM area); CENTCOM (Nov 19): "No American forces were injured during
any of Iran's attempted attacks this week." **Hormuz war-risk insurance is
now $64M per transit** (acting Navy Secretary Hung Cao to the Senate, Nov 17
hearing; ~$54,000 pre-war).

**Filter (diagnostic, not public odds):** HORIZON **15.0 / 50.0 / 35.0**
(44th run); STATE **0.1 / 99.9 / 0.0** — the only input that moved off the
43rd run is the Kpler volume 7.195 → **5.66M b/d** (the Nov 13 media
briefing, flow data through Nov 11 — the same strait-transit total-oil
basis; the map's 22-day-stale vintage is now 8 days old). The displayed row
shifts 0.1pp toward lapse (the volume likelihood is graded per state; 5.66M
is further from the 8.5M standoff median than 7.195M was). The other inputs
are unchanged: 11 transits (now also to Nov 11), one tanker loss (the #199
burning tanker — the model input; the site copy does not call it a confirmed
loss), Brent **$91.98** (Nov 19 settlement, in the $90–100 band). Judgment
10/50/40 unchanged — no reweight clause fired.

**Candidate shadow:** HORIZON **15.1 / 50.0 / 35.0** (0.150772 / 0.499626 /
0.349602); STATE **0.2 / 99.8 / 0.0** (0.001732 / 0.998199 / 0.000069).
Not published. Moved the same 0.1pp as the published row on the refreshed
inputs (Brent is context, not a state observation, in the candidate). Both
shadow runs (identical inputs; refreshed inputs) return this row. Vintage:
volume 8 days old (through Nov 11), transits 8 days old.

**Storage context:** the WPSR w/e Nov 13 put the SPR at **276.361M (−3.174M
w/w)** — a reported pace of 0.453M b/d, right at the model's $90–100 band
pace (0.45M at Brent $91.98). Re-baselined at band pace: ≈**273.7M as of
Nov 19**; 250M operational floor ≈ Jan 11, 2027 (~53 days); 180M ≈ Jun 15
(~208 days); 70M ≈ Feb 15, 2028 (~453 days).

**Other model metrics:** elasticity level −1.40 / −2.80 / −4.20 mb/d (ε
0.05 / 0.10 / 0.15); marginal −0.27 / −0.53 / −0.80 mb/d per +$5 Brent move
(ε 0.05 / 0.10 / 0.15, marginal from last week's Nov 12 settle $95.82).
**Polymarket weekly cross-check (Nov 19, gamma API, morning):** "Hormuz
normal by Dec 31" = **3.7%** (4.5% Nov 18); "by Nov 30" = **0.6%** (1.05% Nov
18); the ladder: Jan 31 '27 7.5%, Mar 31 '27 18.5%, Jun 30 '27 33.0%, Dec 31
'27 57.5% (unchanged) — thin market, slight drift toward closure tracking the
oil move. **Calibration ledger: 9 resolved, 2 open (running Brier
0.2724)** — unchanged this pass.

## Markets, shipping, and stocks

- **Prices (Nov 19 settles, plotted):** Brent **$91.98** (January contract,
  +$0.03, +0.03% vs the Nov 18 $91.95) and WTI **$83.21** (December contract,
  −$0.05, −0.06% — **its lowest settlement since Aug 26**, Reuters). The
  session was roughly flat: disruption in the Strait of Hormuz offset
  concern about a global supply surplus (Reuters wrap). **Yahoo vs wire: the
  BZ=F bar closed at 90.16, ~$1.8 below the wire settlement (the bar's high
  90.70 sat under the settlement — an artifact bar), so the wire settlement
  is plotted; the CL=F bar closed at 83.13, ~$0.08 below the wire.** Brent
  is down 18.9% from the Oct 30 settlement of $113.43. The **December WTI
  contract's last trading day is Nov 20** — tomorrow's settlement is the
  first January-contract point in the series (roll to confirm at the next
  pass). 10-yr: **Nov 19 close 5.052** (O 5.101 / H 5.107 / L 5.042) —
  **sixth straight close above 5%** (Nov 12: 5.103, Nov 13: 5.154, Nov 16:
  5.121, Nov 17: 5.103, Nov 18: 5.066, Nov 19: 5.052).
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
- **AAA Nov 19 (applied):** gasoline **$3.7212**, diesel **$5.9298** — the
  **23rd straight daily decline since Oct 28**, and **$0.5978 below** AAA's
  Sep 22 record of $6.5276 (−9.2% from the record). Retail-minus-WTI gap now
  pairs the Nov 19 AAA against the Nov 18 settlement $83.26: **≈ $165.8 diesel
  / $73.0 gasoline** (Nov 18: ≈164.3 / 71.5).
- **Hormuz:** UKMTO's **Nov 13 weekly overview** is now the operative figure:
  **139 outbound / 169 inbound transits** for the week to Nov 11 (≈65% below
  pre-war levels), 8 incidents in the Strait / Arabian Gulf / Gulf of Oman (two
  of unknown outcome, none sunk), 163 conflict-related incidents since Feb 28
  (Al Jazeera, Gulf News). **New entry this pass: #212 (attack, dated Nov 18 —
  a time-late report of a tanker struck by an unknown projectile in its engine
  room ~6 NM north of Khasab; all crew safe, damage unknown, vessel not
  named)** — India's shipping minister named the ship MT Navig8 Messi, the
  same name security firm Vanguard attaches to the Nov 17 #211 attack
  (ADNOC did not name the ship; Riviera), so the naming is contradictory and
  unconfirmed; #211 (the likely ADNOC L&S ship; fire
  extinguished, one crew missing) and the Tara Gas (#208, still unaccounted
  for) stand; no confirmed loss; **131 entries, coverage to Nov 19**. **CENTCOM
  extended the blockade to ship-to-ship transfers (Nov 18 advisory)** —
  vessels receiving Iranian cargo at sea may be stopped, boarded, diverted or
  captured even without entering an Iranian port (it targets the LPG/jet-fuel
  exports Iran has sustained since July). **Hormuz war-risk insurance is now
  $64M per transit** (acting Navy Secretary Cao, Senate hearing Nov 17; ~$54,000
  pre-war). Prior entries stand: #209 (Nov 13 time-late, attack,
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
  and the strikes continued. **Nov 19 updates:** the **Shenzhen trilateral
  (first Trump–Xi–Putin meeting)** produced UN-reform and nuclear-risk
  language plus a pledge to increase production and supply of refined
  petroleum products and "maintaining stable energy flows" (declaration text
  via TRT World, Daily Sabah) — the declaration itself makes no mention of
  Iran; at the summit, Trump said, "We're not going to let Iran have a
  nuclear weapon" (ANI); Trump departed. **CENTCOM's Nov 18 advisory extended the
  blockade to ship-to-ship transfers** (vessels taking Iranian cargo at sea
  may be stopped/captured without entering an Iranian port — the LPG/jet-fuel
  channel Iran has kept open since July). **USS George Washington has left the
  region** (5th→7th Fleet transition; two US carriers remain in the CENTCOM
  area). CENTCOM (Nov 19): "No American forces were injured during any of
  Iran's attempted attacks this week." **Iran's navy claims three tankers hit
  by naval mines east of the strait Wednesday** (state media, unverified —
  echoing the Nov 14 tanker claim; ISW sees no re-mining). **Acting SecNav
  Cao: war-risk insurance for one Hormuz transit now costs $64M** (was ~$54,000
  pre-war). **Riffa, Bahrain (verified timeline):** On Nov 13,
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
- **Saudi / Yemen:** **a Houthi missile damaged the PIF Tower in Riyadh
  before dawn Nov 19** — windows blown out on several floors of the
  80-storey headquarters of Saudi Arabia's sovereign-wealth fund (Reuters
  sources, AFP witnesses, NYT); the coalition says "material damage" from
  falling debris and did not say whether the missile was intercepted; it also
  reported intercepting four ballistic missiles and a cruise missile aimed at
  southern Saudi Arabia and destroying launch platforms in Saada and Dhamar,
  and on Nov 18 a cruise missile aimed at Riyadh plus two drones. Reuters:
  Saudi Arabia expects its campaign against the Houthis to last **up to six
  more months, possibly into 2027**; Houthi rockets have killed at least 20 in
  the Kingdom. **Yemen's parliament approved a 55-article law designating the
  Houthis a terrorist organization.** Windward: 12 sanctioned tankers delivered
  an estimated 3.26M barrels of fuel to Houthi-controlled Ras Issa. Prior:
  **government-aligned forces withdrew from Dhubab and the
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
- **Russia:** **Reuters exclusive (Nov 18): Ukrainian drone attacks have cut
  Russian refineries' combined crude processing by 45% since late October** —
  to ~400,000 metric tons/day (≈3M b/d) from >700,000 at the end of October;
  **15 of 35 major refineries are disrupted or halted** (up from 9 a week
  earlier); the affected plants' combined nominal capacity ≈500,000 t/day ≈
  **54% of total primary refining capacity** (est. 930,000 t/day); the
  November average is still >500,000 t/day (5–10% below Sep/Oct). Named
  plants: Ryazan, Yaroslavl, Kirishi, Volga region. Reuters also reported the
  week's strikes included the biggest overnight drone attack on Russia since
  the war began. **the overnight Nov 17–18 strikes are confirmed at Ilsky and
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
- **WPSR w/e Nov 13 (released Nov 18, 10:30 a.m. ET; ingested ~08:52 MST):**
  SPR **276.361M (−3.174M w/w)** — second straight weekly withdrawal above 2.5M
  and the largest since the week ending Aug 21 (−3.700M; Aug 28's −3.122M was smaller — corrected at review); below every month-end level
  since Sep 1982 (EIA monthly — the last month-end below it was Aug 1982 at 273.593M, so "since Aug 1982" was imprecise; Sep 1982 was 277.884M; Reuters' "since Oct 1982" described the 279.5M Nov 6 level). Commercial crude ex-SPR **417.797M (+3.380M)** — second
  straight weekly build. Gasoline **215.949M (+5.193M)**. Distillates
  **104.901M (+1.571M)**, −5.6% YoY (111.080M a year ago); East Coast PADD1
  **24.419M (+0.635M)**, −7.8% YoY, −26.7% 2-yr. Total incl. SPR
  **1,501.299M (+6.030M)**. Net imports (incl. SPR) 1,088 kb/d (−2,155 w/w).
  **Refinery utilization 95.7% w/e Nov 13 (95.2% w/e Nov 6)** — the seven-week
  sub-95% streak (Sep 18–Oct 30) ended the week ending Nov 6; the Nov 6 print
  was missed in the Nov 12 pass while the EIA API lagged (data-quality note in
  the log). Site updated (stats strip, SPR + commercial paragraphs, refinery
  section, WPSR watch item, cascade → Nov 25): staging `0d4a5e44`, prod
  pending.
- **WPSR w/e Nov 6 (released Nov 12; superseded by the above):** SPR 279.535M
  (−2.649M); commercial crude 414.417M (+4.657M); distillates 103.330M
  (+4.071M), 6.8% below last year; East Coast 23.784M (12.2% below).
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

- **Today** — the Nov 18 settlements **landed and are plotted** (Brent $91.95 /
  WTI $83.26; catalyst = the EIA build, +3.4M vs an expected ~58k — the
  settlement moves were far smaller than the intraday rout; WTI's lowest close
  since Aug 26); the 10-yr settle is **5.066 — fifth straight close above 5%
  (the Nov 18 log's "streak would END" line was a LIVE-value error, corrected)**;
  the Shenzhen trilateral was held (no Iran deliverable); the PIF Tower strike
  (Houthi missile, Riyadh). Next JOGMEC TTF/JKM assessed print still not
  published (last spread 51.1¢/MMBtu, Nov 12); the Dominica Prosperity salvage
  (day 8).
- **Nov 20** — the Dec WTI contract's last trading day — tomorrow's settlement
  is the first **January-contract** point in the WTI series (re-type the
  front-month note). OFAC's general licenses HH/II/III (crude, products,
  petrochemicals — incl. the diesel deal) EXPIRE end of Nov 20.
- OPEC+ ministerial, Nov 29 (2027 policy); STEO Dec edition, ~Dec 11 (next
  scheduled EIA–market spread check); **CPI, Dec 10**.
- **The standing reweight condition remains met** after the Nov 8 review. This
  pass added no confirmed loss (#212 is a damaged tanker with all crew safe —
  not lost; #211's missing crew member still unaccounted for; the Tara Gas
  remains unaccounted for; Iran's Nov 19 claim of three tankers hit by mines
  east of the strait is state media only, unverified); the STS blockade
  extension and the PIF Tower strike are regime-level escalations, not
  physical inputs; **the next Kpler print is the clean transits/volume
  reweight point** (the Nov 13 edition was adopted in-place on the existing
  basis — volume 5.66M through Nov 11, transits 11 — no basis switch);
  **open question: the model's volume basis — Kpler's strait-transit
  total-oil 7-day average (now 5.66M) vs other measures (the clearance-based
  8.3M, the Bloomberg ~10M provisional read, the Reuters-reported 10.3M
  October crude-only) — any basis change moves the STATE/HORIZON rows and
  needs an explicit decision.**
- Watch: **Iran's next move after the PIF Tower strike and the STS blockade
  extension** (judgment entry, user's call); **Iran's "three tankers hit by
  mines east of the strait" claim (Nov 19, state media) — any corroboration
  (names, AIS, wreckage)**; **the Tara Gas — confirmed lost/sunk or salvage, and
  the two missing crew members total** (one Tara Gas, one on the ADNOC L&S
  ship — #211 = ADNOC is likely but unconfirmed); **the dirty-bomb report — any
  corroboration or declassification**; **the Houthi East–West pipeline claim
  (stations 8 & 9) — any Saudi-side confirmation**; corroboration of the IRGC
  supertanker claim (hull name, AIS, photos); the MQM-170 drone-capture claim
  (no US confirmation) and what the two-carrier posture (after the George
  Washington's departure) brings; the Dominica Prosperity salvage and any
  independent confirmation of the 400,000 bbl release; the #199 tanker's
  identity; the Qatari two-week window; Khor Mor attribution; the Ceyhan
  ramp-up (120 → 500 kb/d) and the Iraq–Oman lane; the Fed's reaction to the
  6.5% PPI print (December-hike pricing); whether the 10-year holds above 5%
  (five straight closes now); the OMR paywalled PDF for the month-by-month
  inventory detail; the Volgograd halt (wire confirmation of the
  General-Staff claim still open); 10 UKMTO entries (#166, #172, #173, #189,
  #192, #193, #194, #196, #199, #200) carry API date drift against the
  adjudicated incident dates (registration-timestamp pattern; #166 stands on
  its explicit report date) — none applied; #202's API type was re-classed
  (flagged, not applied).
- **Prod:** `aed95fa3-42ae-46b6-b56d-f0be6f8903b0` (bundle `DPRixaif.js`) —
  deployed 21:29 MST Nov 19 on the user's explicit green light. Carries the
  Kpler Nov 13 map update **plus the external review's copy edits**
  (review-2026-11-19.md: Navig8 Messi attribution corrected to #211-per-
  Vanguard / minister's account matching #212; RAND outages → the full Moscow
  Times list (Norsi, Yanos, Novokuibyshevsk halted; Ryazan −90%; Omsk/Volgograd
  ~half; Kirishi ~one-third); Novak wording → the Moscow Times account; the
  Channel 12 line without the unfound "coming days" quote (the Mossad detail
  was the Washington Post's, cut for length); CENTCOM mines line paraphrased
  (the "free and clear" quote dated to Aug/Oct, not Nov 19); Shenzhen
  declaration re-typed; Houthi/Diplomacy/Tankers/Russia flags trimmed). Same
  JS bundle as staging `12834fc5` (the review's edits are HTML-inline, not
  bundle); the HTML carries the reviewed wording. Geometry gate PASS on the
  shipped bytes; live verify on the prod URL PASS; spot-check: current strings
  present (5.7M · 67%, 4.4M · 58%, "media briefing Nov 13", "5.66M b/d in the
  seven days to Nov 11", "11 tankers crossing a day"), stale strings absent
  (7.2M · 58%, 3.0M · 8%, "through Oct 28; recent figures", "coming days",
  7.195). A fresh rebuild of the post-review tree is byte-identical to the
  deployed dist (no build race on the review's 21:29:38 model.md touch).
  Supersedes `b466c1e1` (below). **Staging `12834fc5` is now behind prod**
  (pre-review HTML) — re-baseline at the next staging deploy.
- **Staging:** `12834fc5-0946-4bb1-a67a-7f866b1886de` (bundle `DPRixaif.js`;
  supersedes `c05fbcfe`) — the Kpler map update: the map labels moved to the
  Nov 13 media briefing's 7-day averages through Nov 11 (Hormuz 5.7M b/d ·
  67% below pre-war; Red Sea 4.4M b/d · 58% above pre-war), the caption
  re-typed with the preliminary-four-days caveat, and the Gulf-oil watch item
  now cites the primary edition (5.66M strait transits excl. Iranian-origin,
  8.3M clearance, 11 crossings/day) alongside the Bloomberg ~10M provisional
  read. The Nov 19 afternoon pass (`d9e95cd6` → `c05fbcfe`) is carried in
  the daily log, not listed here. Geometry gate + live verify PASS;
  spot-check 4/4 current strings present, 3/3 stale absent.
  **Prod moved past this build: `aed95fa3` (above) carries this map update
  plus the review's copy edits — this staging version is now behind prod.**
- **Staging:** `00dfb368-a079-493f-b352-8599e413f34b` (bundle `BVr62kKN.js`;
  supersedes `a6c9e663`) — the Nov 19 review re-verification restoration: the
  diplomacy item regained "maintaining stable energy flows" (declaration text
  per TRT World, Daily Sabah — the review's "not found in the coverage" was a
  false positive) and Trump's verbatim summit line, "We're not going to let
  Iran have a nuclear weapon" (ANI; the previously quoted wording "Iran will
  not get a nuclear weapon" was a paraphrase, not verbatim). The unverified
  "SBS" citation was dropped. The SPR paragraph was aligned to the Nov 18
  corrected wording as deployed on prod ("since the week ending Aug 21
  (3.7 million)" / "below every month-end level since September 1982 — the
  last month-end below it was August 1982 (273.6 million, EIA monthly
  data)"); the working tree had carried a weaker variant ("lower than at any
  month-end since August 1982, when it held 273.6 million") — ambiguous,
  since 276.361M is ABOVE the Aug 1982 month-end. SUMMARY contradictions
  fixed (Current-read annotation, Iran/US bullet's NYT/AJ/NPR attribution,
  Hormuz bullet's "ADNOC/Vanguard" → Vanguard only, per Riviera). Geometry
  gate + live verify PASS; spot-check: all restored strings present, all
  stale strings absent (incl. the weaker 1982 variant). **Prod unchanged at
  `f3f2bd28` — staging is ahead.**
- (Staging: `a6c9e663-ebbf-467e-a330-30c39f4dc2bd` (bundle `BVr62kKN.js`;
  supersedes `b7126bb1`) — first cut of the restoration above; carried the
  weaker 1982 variant. Superseded by `00dfb368`.)
- (Staging: `b7126bb1-230a-4a97-a87d-85d25425c2ea` (bundle `DkXmUbFU.js`;
  supersedes `6fbc1d2f`) — the Nov 19 morning pass: Nov 18 settlements
  plotted (Brent $91.95 / WTI $83.26 — the EIA-build driver, +3.4M vs an
  expected ~58k; WTI's lowest close since Aug 26), 10-yr 5.066 = **fifth**
  straight close above 5% (the Nov 18 log's "streak would END" LIVE-value
  error corrected in the series note and watch item), AAA Nov 19
  ($3.7212 / $5.9298 — 23rd straight diesel decline), UKMTO #212 applied via
  ukmto-fetch (131 entries, coverage to Nov 19; payload archived with
  provenance), watchlist + snapshots updated (PIF Tower strike, STS blockade
  extension, Shenzhen trilateral outcome, George Washington departure, the
  Navig8 Messi naming contradiction, Reuters' 45%-processing-cut Russia
  exclusive). Geometry gate + verify-live PASS on the live URL; spot-check:
  new strings present ($91.95, $83.26, 5.066/fifth straight, $5.93/$3.72,
  PIF Tower, ship-to-ship, first trilateral meeting, MT Navig8 Messi,
  "six more tanker attacks", "45% since late October"), stale strings absent
  ($93.14 settle copy, "four straight sessions", "five more tanker attacks").
  Carried the review's false-positive Shenzhen removal and the regressed SPR
  wording ("since Aug 28 (−3.122M)") on the live page — superseded by
  `a6c9e663` above.)
- (Staging: `6fbc1d2f-f438-4cc6-9bcb-36597d2ea3f6` (bundle `DxXRhJgv.js`;
  supersedes `0d4a5e44`) — the WPSR w/e Nov 13 pass **plus the review's four
  fixes + copy edit, plus a further tightening of the 1982 claim** (~14:28
  MST): "largest weekly withdrawal since the week ending Aug 21 (3.7M)" (not
  Aug 28 — 3.700M > 3.122M), "below every month-end level since September
  1982" with the Aug 1982 month-end (273.6M) named as the last below it (the
  276.361M level is above the Aug 1982 month-end, so "since Aug 1982" was
  imprecise; verified against the EIA monthly series — no month-end
  Sep 1982–Aug 2026 below 276,361k), refinery copy = "second straight week
  above 95% after seven weeks below it (Sep 18–Oct 30)" + "crude runs fell
  by 129,000 barrels a day" (total inputs ROSE 53k b/d, 17,178→17,231,
  WGIRIUS2), SPR deliveries paragraph = "From Sep 11 through Oct 30, weekly
  withdrawals had stayed under 1 million barrels" (max 0.785M). The review's
  open item (4-wk distillate supply 3.96M b/d) resolved: EIA's own
  days-of-supply series prints 26.5 days w/e Nov 13 (implies 3,959 kb/d;
  components give 4,010/3,992) — 3.96M stands. Geometry PASS; live verify
  PASS; spot-check all fixed strings present, stale absent. **Prod then
  matched (`f3f2bd28`); the Nov 18 settlements followed on staging as
  `b7126bb1` above.** Superseded by `b7126bb1`.)
- (Staging: `0d4a5e44-cda9-4489-b66f-0f9c7a6e4394` (bundle `DxXRhJgv.js`;
  supersedes `0da23143`) — the full WPSR w/e Nov 13 site pass (~11:03 MST):
  sprWeekly +276.361, commercialCrude2026 +417.797, stats strip (SPR 276.4M /
  distillate 104.9M), SPR + commercial-crude paragraphs and aria re-typed,
  refinery section re-typed (95.7% w/e Nov 13, 95.2% w/e Nov 6), WPSR watch
  item → the result, cascade → Nov 25. Superseded by `6fbc1d2f` above after
  the review fixes.)
- **Prod:** `b466c1e1-3a88-4597-98cd-414b8b109852` (bundle `BVr62kKN.js`) — deployed ~07:26 MST Nov 19 on the user's explicit green light; same bundle bytes as the verified staging `00dfb368`. Carries the full Nov 19 morning pass (Nov 18 settles Brent $91.95 / WTI $83.26, 10-yr 5.066 fifth straight above 5%, AAA Nov 19 23rd decline, UKMTO #212, PIF Tower, STS blockade extension, George Washington departure, Reuters 45% Russia processing cut) **plus the review re-verification restorations** ("maintaining stable energy flows" per TRT World/Daily Sabah; Trump's verbatim "We're not going to let Iran have a nuclear weapon" per ANI; SPR paragraph at the Nov 18 corrected wording). Live verify-live PASS on the prod URL; spot-check: 6/6 current strings present, 6/6 stale strings absent. Supersedes `f3f2bd28` (below). *(Staging and prod were in sync; prod moved
  to `aed95fa3` at 21:29.)*
- (Prod: `f3f2bd28-5519-43bc-9977-1da4a3c6e17a` (bundle `DxXRhJgv.js`) — deployed ~14:35 MST Nov 18 on the user's explicit green light; bytes identical to the verified staging bundle `6fbc1d2f`; live verify-live PASS; spot-check 11/11 present, 7/7 stale absent. Superseded by `b466c1e1` above.)
- (Prod: `0f9dcf9a-d5ad-448a-bd4e-b26ebb01d942` (bundle `F-uAUDyj.js`) — deployed 08:50 MST Nov 18 on the user's explicit green light; pre-WPSR state. Superseded by `f3f2bd28` above.)
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
