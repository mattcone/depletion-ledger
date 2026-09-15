# Oil Inventory Depletion Model — US & Europe (with Asia exposure)

**Author:** GLM-5.2 via pi · **Original:** June 30, 2026 · **Updated:** September 9, 2026 (Day 193 — the war's biggest tit-for-tat wave: 10 Iranian tankers gone in a week, Iranian missiles on a US base in Jordan, the exclusion zone enforced before declared; Brent back above $100 for the first time since Jul 24; the Sep 9 STEO lands) · **Status:** **Two closed chokepoints** (Hormuz + Red Sea/Bab el-Mandeb) + Russian refinery strike front — the Hormuz corridor now runs mostly on the **Iranian-controlled route** inside a declared (uncoordinated) exclusion zone (Kpler ~10 transits/day, down from 13/15; Lloyd's 102/week vs ≥130/day prewar); **US–Iran tanker war in force with a published exchange rate** (3 tankers per 2 warships targeted; 10 Iranian tankers destroyed/disabled in one week); OPEC+ paused its production hikes (Sep 6); US retail diesel at a new all-time high ($5.94, Sep 9); **Houthi strikes (Sep 8) re-hit Aramco's Jazan refinery (~400 kb/d, offline since at least late July) — the bypass's own processing node is a strike target**; **Sep 9 STEO: Brent 2H26 ~$90, 2027 $74 (from $69), Middle East below pre-conflict output until 2Q27, US distillates under the 5-yr low through much of 2027**

> Built from EIA WPSR (w/e Aug 21), IEA Oil Market Report, GEF supply trackers & forecasts, S&P Global/Insights Global, GAO/DOE, METI, and tanker-tracking (PortWatch/Kpler/LSEG). See [Sources & caveats](#sources--caveats). This is a scenario model, not a prediction.

---

## 🚨 Update banner (Sep 9, 2026 — Day 193: the war's biggest tit-for-tat wave; the exclusion zone enforced before declared; Brent >$100 since Jul 24; the STEO hinge lands)

**The Sep 8→9 window — what changed:**

| # | Claim / Event | Verified status |
|---|---|---|
| 1 | **US destroyed 5 Iranian crude tankers** (Tue night): M/T Kaviz, Charminar, Horizon 1, Riesco (Gulf of Oman) + M/T Derya (near Kharg Island) after IRGC ballistic missiles twice targeted a US warship (evaded; no US personnel harmed). **10 Iranian tankers lost in one week**; CENTCOM: "No U.S. Navy warship has been struck; all IRGC attempted attacks failed" | CENTCOM (Sep 9) + sinking video; **confirmed (US account)** |
| 2 | **Iran attacked 10 ships near Hormuz** (IRGC: 2 US vessels + 8 tankers, "heavy damage"; claimed hits on DDG-119/DDG-53) | **IRGC claim — no independent confirmation by midday Sep 9**; CENTCOM: "completely FALSE" |
| 3 | **20 Iranian ballistic missiles on the Al-Azraq US base in Jordan** — first phase strike on a third country; Jordan: 18 intercepted, 2 fell in unpopulated areas, no casualties | Jordan Armed Forces + Al Jazeera/US News (Sep 9); **confirmed** |
| 4 | **Exclusion zone enforced before declared:** IRGC cites ships crossing a "prohibited and unsafe zone" and claims "complete management and control" of the waterway; vessels entering go on Iran's sanctions list; Mohebi: permanent Hormuz transit ban for zone-entering ships | Sepah News/Rezaei/Mohebi (Sep 8–9); **enforcement claimed, coordinates pending** |
| 5 | **IRGC warns tankers at berth in Kuwait and Bahrain to abandon ship** — first direct threat to shipping in Gulf Arab *ports* | Sepah News via hngn (Sep 8–9); **stated, untested** |
| 6 | **Oman corridor:** Iran FM — safe-corridor talks with Oman at "final stage", IMO registration "within days"; a headline the same day says it was filed | **Conflicting; verify against IMO circulars** |
| 7 | **UKMTO: cargo ship hit 52 km SE of al-Faw, Iraq** — the war now touches Iraq's coast | UKMTO (Sep 9); **confirmed report** |
| 8 | **Traffic floor falls further:** Kpler 10 transits/day (Sun, down from 13/15), mostly on the Iranian-controlled route; Lloyd's List 102/week vs 126 prior, vs ≥130/day prewar; Red Sea dry cargo partially recovering (25 commodity vessels Tue) but crude-tanker crossings <3/day | Kpler/Lloyd's via hngn; brecorder/Arab News; Hanke (Sep 9) |
| 9 | **Jazan re-hit (Sep 8):** refinery + Bulk plant + airport hotspot; 73 wounded across the Abha/Jizan/Khamis strikes; Saudi retaliation; Houthis report 30+ Saudi strikes in Yemen. **But Jazan's offline history is murkier than "since Sep 8"** — restart had already been pushed to late August; some accounts say shut since July | LA Times/coalition (Sep 8); qcintel/livenewschat (Sep 7–8); **§9B entry provisional** |
| 10 | **Novorossiysk fuel-oil terminal (~4 mt/yr) hit** (night Sep 8→9) — **4 killed, 29 wounded in the city**; **CPC terminal (Kazakhstan's outlet) also targeted Wed**; **Ust-Luga (Baltic) terminal on fire last week** — all three Russian export directions now under attack; Novorossiysk crude outflow **800→350 kb/d (Jul→Aug)**, Black Sea port exports 1.7Mt vs 5.5Mt (Aug vs Jul) | Kyiv Post/unn/Global Banking & Finance/Hindustan Times/OilPrice (Sep 9); HURM via Al Jazeera; **confirmed (multi-source)** |
| 11 | **Russia's "second wave" fuel crisis:** 17 regions under sales restrictions (30–40 L caps, odd–even plates); domestic gasoline ≈ **70% of consumption** (~30 kt/day gap); **importing gasoline from India**; Putin urges prep for a *prolonged* shortage; producer diesel/marine-fuel ban **extended to Sep 30** (T-21); oil output forecast cut to a 17-year low | Moscow Times/NV/UA.NEWS (Aug 19–Sep 9); Vitol/P66 via energynews.pro (Sep 9) |
| 12 | **Saudi 32 airstrikes overnight** (Taiz, Hodeidah, Jawf, Marib) — the counteroffensive on the Houthis has gone multi-pronged; 500+ killed since the Houthi offensive began; the Red Sea front's owner is now being hit where it lives | Houthi spokesman via hngn/AFP (Sep 9) |
| 13 | **Prices:** Brent **$100.71 (+2.85%), intraday $101.25** — first >$100 since Jul 24; WTI $96.38; AAA regular **$4.2245** (+10¢ w/w), diesel **record $5.94**; **Goldman: $120 now "plausible"** | tradingeconomics/CNBC/AAA (Sep 9) |
| 14 | **Aug PPI (Sep 10): 5.4% YoY** — up from 4.8% (Jul, revised); +0.4% m/m in line with consensus; energy +4.2% (diesel +24.1%), goods +1.1%, services +0.1%; 10-yr yield hit highest since Nov 2023 — the macro tripwire is now in play | BLS/CNBC (Sep 10) |

**The Sep 9 EIA STEO — the hinge (full analysis in `research/2026-09-09.md`):**

| Line | Aug 11 | Sep 9 |
|---|---|---|
| Brent 2H26 | ~$85 | **~$90** (inventories keep falling through 2026) |
| Brent 2027 | $69 | **$74** (+$5) |
| Middle East recovery | "early 2027" | **below pre-conflict avg until 2Q27** |
| Distillate crack 2026 | $0.84/gal | **$0.94** (+11.6%) |
| Retail diesel 2026/2027 | $4.85/$4.07 | **$5.07/$4.40** |
| US distillate stocks | — | **<100M bbl in Sep; below 5-yr low through much of 2027** |

Global inventories down **400M bbl YTD** (EIA est.). **Crucial caveat: inputs were finalized Sep 3 — this revision does NOT price the Sep 4–9 escalation.** The ~Oct 7 STEO is the next real signal. EIA's path ("gradually increasing flows + alternative routes + constraints through year-end") is the base case in agency words — but at ~$90, *below* a spot market trading >$100. **The EIA–market spread is now a live gauge of the corridor-lapse branch.**

**What this means for the model — reweight (regime event):**

1. **Branch weights move:** corridor holds **15→10%** (the lanes now run inside a declared exclusion zone, mostly on the Iranian-controlled route); standoff drift **50–55→~50%** (still the base — the executed exchange-rate regime *is* the standoff, just hotter); corridor lapses **30→40%** (exclusion zone + tanker-at-berth threats + 10 tankers gone in a week are each lapse accelerants). The US's published exchange rate makes de-escalation costlier, not easier.
2. **The Oman corridor is the swing factor.** If the IMO filing is real, the corridor reconstitutes *under Iranian management* — structurally less free-flow, more revocable. Verify before moving weights back.
3. **§11 compression, round two:** sequence unchanged; most dates pull another ~1–3 weeks. Sep 30 Russia ban is T-21 and now lands with Novorossiysk on the damage list. The Sep 14/15 "Hormuz normal" bet (3.8%) settles ~0. Goldman naming $120 gives the escalation tail institutional cover.
4. **New input — the EIA–market spread:** EIA 2H26 ~$90 vs spot >$100. Spread widening past ~$10–15 into October ⇒ market prices lapse >40% ⇒ move the weights with it. If the Oct STEO holds ~$90 while spot stays >$100, EIA's "constraints, not closure" is the wrong leg.
5. **Jazan's §9B entry is provisional:** "offline since at least late July (nameplate 400 kb/d); re-struck Sep 8; restart already slipped once." The Abqaiq 7-day precedent does not apply — the repair clock started weeks before the Sep 8 strike.

**What did not change:** the dual-chokepoint structure; product-not-crude scarcity (the STEO's +11.6% crack revision is confirmation, not contradiction); gasoline safety in all branches; China's Q1–Q2 2027 buffer cliff; the undated Russia→Europe hybrid risk. **Base case stands — but it is now a standoff with a published exchange rate, an exclusion zone, and a third country in the missile path.**

---

## 🚨 Update banner (Sep 8, 2026 — Day 192: Houthi strikes bring Aramco's Jazan refinery off line — the Red Sea front moves from shipping to processing)

**WSJ (Sep 8):** Houthi drones and missiles struck four Saudi cities overnight (Sep 7→8) — Aramco's **Jazan refinery (~400 kb/d, the kingdom's largest; gasoline + ULSD), Aramco facilities in Abha (and a power plant) and Najran, and King Khalid Air Base in Khamis Mushait** — 73 injured (women and children among them). Saudi Arabia vowed retaliation ("take all necessary measures to defend its sovereignty"). **The single most important infrastructure development since Abqaiq (Jul 27)** — and it lands on the bypass, not the strait.

**The Sep 7–8 window — what changed:**

| # | Claim / Event | Verified status |
|---|---|---|
| 1 | Aramco's **Jazan refinery (~400 kb/d) aflame and off line** (Sep 8), after an Aug 9 strike that had already "diminished output" — a repeat strike within a week | **WSJ (Sep 8); fire corroborated by Guardian/NPR/CBC/AP; "off line" is WSJ's characterization** |
| 2 | **New Houthi targets beyond Jazan:** Aramco facilities in Abha (+ a power plant) and Najran | WSJ (Sep 8); Guardian/CBC confirm Abha + Najran |
| 3 | **King Khalid Air Base (Khamis Mushait) hit; a Jazan airport attack failed** | WSJ (Sep 8); Guardian confirms Khamis Mushait airbase |
| 4 | **Iranian floating crude: ~29M bbl, down from ~90M in mid-July** (Kpler) — the US Navy blockade has drawn down pre-war floating stock by ~⅔ | WSJ (Sep 8), citing Kpler |
| 5 | **ANZ Research:** "prolonged standoff, punctuated by calibrated military action by the US and Iran… Persian Gulf supply remain constrained through the rest of 2026" | WSJ (Sep 8) |
| 6 | Brent **$98.62** (Sep 8, +1.7%; touched >$99); WTI **$93.97** (+2.7%) | WSJ (Sep 8); Guardian: "above $99" |
| 7 | Iran announced a **"maritime exclusion zone"** from the US blockade perimeter through the strait into the Gulf | Guardian (Sep 8) |

**What this means for the model:**

1. **§7A has become a §9B front.** The Red Sea front was a shipping/chokepoint front (blockade + tanker strikes). The Jazan refinery is **product capacity (gasoline + ULSD) — the exact scarce asset the model is built around** — and it sits at the terminus of the very bypass (Yanbu/Jazan) the Houthis are blocking. They are now destroying the processing node, not just the shipping lane. This is the second Saudi processing loss after Abqaiq (Jul 27), and it adds a repair clock, not just a flow interruption.
2. **The dual-chokepoint coordination is now stated, not inferred.** The article's framing — the Houthi attacks target "the Saudis' major alternative route to the blockage in Hormuz" — confirms the §7A window-update thesis: the two chokepoints are fought on the same calendar, and the model's main offset assumption (a strait failure absorbed by the Red Sea route) is gone. The Red Sea is not an independent front; it is the coordinated strike on the bypass.
3. **The US blockade is working, quantified.** Iranian floating crude 29M (from ~90M in mid-July) is the first hard number on the blockade's drawdown — ~⅔ of the pre-war floating stock is gone. Less Iranian crude sits in the system to flow once sanctions or flows loosen.
4. **ANZ is the base case, in an analyst house's words.** "Prolonged standoff, punctuated by calibrated military action" is the §11 escalation-tripwire language verbatim; "constrained through the rest of 2026" is the base case. The institutional read has caught up with the model.
5. **Prices confirm the trajectory, not a new regime.** Brent $98.62 toward $100 extends the Sep 7 $97.89 six-week high; the Sep 9 STEO revision (first after the Sep 6–7 escalation) is the next hard signal.

**What did not change:** the base case (standoff drift) is **confirmed, not overturned**; the dual-chokepoint structure is intact — the Jazan loss is an addition to the §9B damage inventory, not a new chokepoint; the §11 breaking-points cascade is untouched — the Houthi escalation changes the *pace* of the standoff, not the sequence of the dated breaks.

**The window, complete — other developments (Sep 8, corroborated):**

| # | Claim / event | Verified status |
|---|---|---|
| 8 | **OPEC August output fell 900K bpd to 19.91M** — first hard *production* number (not just flow); snapped a 2-month recovery | Bloomberg survey (Sep 8) |
| 9 | **Iran is about to formally announce a Hormuz "exclusion zone"** — SNSC head: Tehran "planning to announce" a no-transit zone *outside* the strait; US calls it "a total lie" | CBS/AP/AFP (Sep 8); **stated policy, not yet in force** |
| 10 | **Iran claims it captured an advanced US unmanned submarine** in Hormuz | IRGC (Sep 8); **unverified** |
| 11 | **Iran hit 3 US-linked ships** (IRGC claim) in retaliation; US: neither warship impacted, 3 Iranian tankers disabled | Newstribune/AFP vs US military (Sep 8); conflicting |
| 12 | **US sanctioned 20+ Iranian airlines** (Operation Economic Outcast) | CBS/AP (Sep 8) |
| 13 | **Saratov refinery (Rosneft, 4.8 mt/yr) hit for the 4th time this year**; 3-refinery drone blitz (Perm, Tatarstan, Sep 7); 10 injured incl. 3 children | Kyiv Post/Kyiv Independent (Sep 8) |
| 14 | **South Korea sent a fact-finding team to Hormuz** (no troops) | CBS/AFP (Sep 8) |
| 15 | **Prices:** Brent settled **$97.13** (six-week high since Jul 24), WTI **$92.63**; intraday touched >$99 | tradingeconomics/Brecorder/CBS (Sep 8) |

**Date effect — the §11 compression:** none of this changes the *sequence* of the breaking points; it **pulls most of them ~2–6 weeks earlier**. The **Sep 9 STEO is now the hinge** — the version currently published is still the Aug 11 version (0.6M bpd disruption, recovery "early 2027," Brent → $69 in 2027), which the Sep 8 data (Jazan off-line, OPEC −900K, exclusion zone imminent) makes unholdable. The **Iran exclusion zone** (outside the strait — where the shadow southern lane runs) could collapse the corridor's "30–60 day lifespan" into days; the **Sep 14/15 Polymarket** "normal" bet (7%) settles ~0; the **mid/late October European shortage** and the **Q1–Q2 2027 breaking points** arrive earlier; the **Sep 30 Russia ban** holds but lands on a smaller capacity base (>30% of *actual* refining offline after Saratov). **Base case confirmed, not overturned — the escalation changes the pace and the horizon, not the sequence.**

---

## 🚨 Update banner (Sep 7, 2026 — Day 191: Tanker war begins; OPEC+ pauses its hikes; US diesel sets an all-time record)

**The Sep 2–7 window — what changed:**

| # | Claim / Event | Verified status |
|---|---|---|
| 1 | US "permanently disabled" two Iranian oil tankers and "completely destroyed" a third (one off Kharg Island, one near Jask) after IRGC ballistic missiles were fired at a US carrier and destroyer — the first direct US–Iran tanker war of the crisis | Multi-source: CENTCOM statements, PBS, ABC, gCaptain, CNN, BBC (Sep 4–6). Iranian counter-claim: IRGC "targeted three oil tankers on the unauthorised route" plus three US-linked vessels (IRGC statement to Iranian media — a claim, not verified) |
| 2 | Iran vowed (Sep 7) to strike "energy infrastructure across the Middle East"; US energy facilities are "sprawling, accessible and exposed" (Reuters, Dubai) | Statement, Sep 7 — no infrastructure strike verified yet. This is §9B's "second-order shock" becoming stated policy |
| 3 | OPEC+ (Sep 6, virtual): October quotas **held flat** at 31.01 mb/d — four straight monthly increases paused after the final +188K bpd September tranche; the group "needs to agree new quotas before deciding its next move" (i.e., the 2027 framework) | OPEC+ statement via Reuters/NYT — confirmed |
| 4 | **US retail diesel: all-time record.** AAA daily $5.78 (Sep 3) → **$5.85 (Sep 4 — above the June 2022 record)** → $5.90 (Sep 6–7). EIA official weekly w/e Aug 31: $5.599 US / $5.448 PADD1 / $7.218 California — the surge is concentrated in Sep 1–7, after the strikes resumed | AAA via Fox Business/FreightWaves/ts2; EIA Gasoline and Diesel Fuel Update (released Sep 1, next Sep 9) |
| 5 | Kirishi (KINEF, Russia's second-largest refinery, Surgutneftegaz) **fully halted** after the Aug 30 drone strike; Reuters-sourced: two of four primary distillation units damaged, the other two already offline; hit twice in recent weeks (NORSI also twice). Russian refiners have **failed to fulfill >50% of gasoline contracts** | Reuters sources via NV (Sep 5); UA.NEWS (Sep 3); Leningrad Oblast governor confirmed fire + 42 drones shot down (Aug 30–31) |
| 6 | Saudi August crude exports at their **lowest in ~9 years** — Hormuz at ~4% + Houthis' declared "blockade on Saudi navigation" in the Red Sea | Bloomberg (Sep 2), observed/Kpler-based exports; Houthi blockade claim per Daily Yemen (Sep 3) |
| 7 | Hormuz traffic: **Windward: 12 transits on Sep 6 (7 in / 5 out)**; Kpler 10-day moving average ~10 vessels/day, "lowest since May" (via Reuters, Sep 6); PortWatch last published day Aug 30: 6; 404–436 vessels holding away from berth; 63 AIS-dark tankers/24h (7-day avg 72.3) | Windward daily; Reuters/Kpler; IMF PortWatch; straits.live Sep 5–7 briefs |
| 8 | Polymarket "Hormuz normal by Sep 15": **~7%** (settles Sep 14/15); "ceasefire through Sep 15" market still trading on the view that no US strike has directly hit Iranian territory | Polymarket via Coinotag (Sep 4); market pages |
| 9 | "Iran intends to declare a restricted maritime zone beyond the strait" (Anadolu); "a corridor deal is near" (voi.id) | Both single-source, unverified — claims only |

**What this means for the model:**

1. **Regime change — the branch weights shift.** Sep 1–7 is the first direct US–Iran tanker war of the crisis: the US has destroyed/disabled Iranian tankers, the IRGC has fired ballistic missiles at a US carrier and destroyer, and Iran has now explicitly threatened the Gulf energy infrastructure (not just shipping). Updated branch weights (author's judgment, see banner): Branch 1 10→8%, Branch 2 30→25%, Branch 3 35→**40%**, Branch 4 25→**27%**. The stalemate is now both the most likely and the most sticky outcome — OPEC+ pausing its hikes removed the one supply-side lever that could have absorbed a corridor failure.
2. **The US political tripwire has been crossed.** §11 said the political break would land early because Slovenia and Ireland broke on *price* in March/April, not scarcity. US retail diesel has now crossed the **June 2022 all-time record** ($5.85 → $5.90) — the price level at which the 2022 political response (price-cap politics, RFS waivers, the SPR release) was triggered. The breaking-points table gains a crossed row; the question is no longer *whether* the US political break comes but *how many weeks after the record*.
3. **OPEC+ flat for October = no spare capacity this winter.** The +188K bpd September tranche was the last of the months-long cut rollback; the group now has to negotiate the 2027 quota framework *inside* the crisis before it will move again (Reuters). Mechanically this raises Branch 3's floor: ~3M b/d of spare capacity (Saudi/UAE) is locked by a cartel that has just demonstrated it will not add barrels while the strait is contested.
4. **The SPR draw decelerated** — 286.6M (w/e Aug 28), −3.1M in the week ≈ **443K b/d**, half the prior week's pace (814K b/d). Demand destruction and product imports are absorbing the draw. At 443K b/d from 286.6M: the 250M operational floor is ~83 days out; the 180M hard floor ~241 days. **But the pace is regime-dependent**: a re-escalation that breaks the dark-fleet corridor — now directly at risk under the "tanker for tanker" policy — puts the 600–800K b/d pace back on the table.
5. **The Russia front hardened into contract failure.** Kirishi fully halted (hit twice, as was NORSI) plus >50% of gasoline contracts unfulfilled means the **Sep 30** jet-fuel/non-producer product export ban (row 1 of the §11 cascade) is no longer a policy choice — with >30% of actual refining capacity offline it is the *consequence* of the capacity loss, and it lands in **3 weeks**.
6. **Saudi August exports at a 9-year low** confirms the §10 squeeze is working: between Hormuz (~4%) and Bab el-Mandeb (−97% in August), the world's largest exporter has lost both routes, and the Houthi language has escalated from attacks to a declared "blockade on Saudi navigation" — the Red Sea front is now policy, not opportunism.
7. **The next 10 days of data set the frame:** STEO **Sep 9** (the Aug 11 Q3-Brent-$85 forecast is already broken at $97+); WPSR **Sep 16 (w/e Sep 11** — the w/e Sep 4 print landed **Sep 10** and was ingested late Sep 15: SPR draw down ~60% to ~0.18M b/d, distillates BUILT 2.1M to 106.3M; see the Sep 15 log); IEA OMR **~Sep 10**; Polymarket "by Sep 15" settles **~Sep 14/15** (~7%); the Russian ban **Sep 30**.

**What did not change:** the verified AIS floor is still 6–12 transits/day vs ~10+/day satellite-assisted (the gap between claimed and verified flow remains the story); ARA gasoil is flat at 12.08M bbl — the floor, not a recovery; China's 1.2–1.4B bbl buffer is untouched; the §11 12-month cascade is intact — the escalation changes the *pace* at which its rows arrive, not its existence.

### 🚨 Update banner (Sep 2, 2026 — Day 184: corridor claims don't survive contact with AIS data; tanker-for-tanker)


The Aug 31 Kpler report of **8.6M bpd through Hormuz** — and the US administration's claim of **10M bpd (~half of pre-war)** through a US-protected southern lane — did not hold up. AIS-verified traffic is back down, two supertankers were hit on Aug 31, and on Sep 2 the US struck Iranian tankers for the first time.

| Claim (Aug 31 – Sep 2) | Verifiable reality (Sep 2) | Verdict |
|---|---|---|
| Kpler (Aug 31): **8.6M bpd** through Hormuz, "more closely in line with what the Trump Administration has been claiming" (10M bpd) | PortWatch (Aug 30): **6 vessels = 7% of the 85/day typical**. NBC (Sep 2): "traffic is back down following a brief pick-up." Iran: "the Strait of Hormuz will remain closed until further notice." 80 AIS-dark tankers in 24h (7-day avg 60.8). | **Corridor is effectively closed to the insured world.** The claimed flow is dark-fleet + ship-to-ship relays; treat 8.6M as a *disputed ceiling*, 6 transits as the *verified floor* — same gap as Goldman's 15–16M claim. |
| "We have been controlling the southern lane of the Strait of Hormuz for two months now" (US official, Axios Aug 19) | Aug 31: **two oil supertankers struck by projectiles** while attempting to exit (Marisks/Bloomberg); Iran hit two UAE tankers; IRGC claimed a supertanker struck two mines and caught fire (CENTCOM: "FALSE"). Sep 1: CENTCOM strikes on IRGC targets; US hit Larak Island rocket launchers; Iran hit military bases in Jordan and the UAE. | **The escalation cycle is back on.** The lane is contested, not controlled. |
| "US had only prevented Iranian ships from violating the naval blockade" | Sep 2: **US struck two Iranian government tankers for the first time** under Trump's new **"tanker for tanker" policy** — drones hit the engine rooms of tankers anchored off Iran's coast, north of the blockade line (Axios). Retaliation, not blockade enforcement. | **The last restraint is gone.** Every future Iranian tanker attack now invites a US strike on Iranian tonnage — and every US strike gives Iran a pretext to widen the closure. |
| — | Iran and Oman are closing in on a Hormuz deal in which **no military vessel would ever pass** (NSJ, ~Sep 1). | **The "corridor" is becoming an Iranian toll booth with a treaty behind it** — the US Navy would be contractually locked out, and Iran would keep the toll either way. |

**EIA w/e Aug 28 (released Sep 2):** crude **−4.45M → 424.5M bbl** (1% *above* 5-year avg); gasoline −1.17M → 205.7M; distillates **+0.8M → 104.2M (14% below 5-year avg)**; SPR **−3.12M → 286.6M** (draw ~0.45M b/d; ~445M below the 731.6M ceiling). 4-week US demand 20.4M b/d (**−4% YoY**); distillate supply 3.7M b/d (−6% YoY). *API had preliminary crude at a 2.6M draw — EIA's 4.5M is the number; the API/EIA gap itself signals noisy import/receipts data.*

**Russia (Aug 29–31):** 21+ strikes in August (record month); **>30% of actual refining capacity knocked out** (Moscow Times); petrol production at ~70% of summer consumption (~80K t/d) → **30% shortfall**; diesel/marine export ban extended to **Sep 30**; all major Lukoil refineries offline (Perm lost ~86% of primary capacity, ~11.3M t/yr); petrol queues back in Moscow and Moscow Oblast.

**Europe/ARA (Aug 26–31):** the market is **splitting** — fuel oil piling up in ARA coastal storage while inland Germany faces shortages (product can't reach where it's needed); ARA fuel-oil imports **363K bpd in August, more than double July** (Benin 26%, Venezuela 15%, France 9%); NW Europe gasoline margins at **highest since mid-2022**; Rotterdam conventional fuel prices **+$24–53/mt in one week** (HSFO most); prompt diesel lead times 5–7 days. Saudi Bab el-Mandeb crude still **64K bpd (−97% vs Jul)**.

**Prices (Sep 2):** Brent **$95.57** (front high **$96.73**; Nov contract close $95.52), WTI **$90.84** — up ~$7–8 on the week. Nov/May spread **$14.19** (front-end contango widening = the market is paying to defer, i.e., it expects the disruption to persist). Crisis pressure gauge 92 (extreme); escalation gauge 52 (elevated, +1 in 24h).

**Model revisions (Day 184):**
- **§9A branch weights:** corridor holds **25–30% → ~15%** (the corridor demonstrably is not delivering claimed flow, and tanker-for-tanker removes the last de-escalation restraint); corridor lapses **15–20% → ~30%**; standoff drift remains the base case at ~50–55%.
- **The binding constraints are unchanged:** distillates (14% below 5-year avg, 104.2M) + SPR (286.6M). The ~0.45M b/d SPR draw is *corridor-holds arithmetic*; a lapse branch forces 1M+ b/d (250M GEF floor ~30–40 days out).
- **Next dated shock is Sep 30: the Russian diesel export ban expiry** — it lands inside the corridor-expiry window and collides with the Iran–Oman no-military-vessels talks. Three dated events now converge in one week.
- **The false-signal argument stands and is stronger:** Brent is back to $95 on escalation headlines, not restored supply; US 4-week demand is −4% YoY. Retail is still pinned because *product* — not crude — is the scarce thing.
- **New §9B — infrastructure damage is a different loss class.** The spring/summer strikes (Ras Laffan Trains 4 & 6: ~13M t/yr of LNG, 3–5 years to repair; Abqaiq ~7M bpd of processing halted Jul 27; South Pars still at 40% of damaged capacity; 48% of all 172+ non-military strikes hit energy infrastructure) mean the post-reopening baseline is *structurally lower*. EIA's own path: shut-in peaked 11.2M bpd (May) → 1.4M by Q4 2026, with **~600K bpd of disruption persisting through end-2027**. The branches are no longer just "when does the strait open" — also "how much of the baseline is left when it opens."

---

## Depletion timeline (updated Sep 15, 2026 — Day 199; prior view Sep 2, Day 184)

*Current consolidated view. Supersedes §9 (Aug 29) and the §9A baseline; full model and assumptions remain in [§9A](#9a-depletion-model-from-current-state-aug-30). Dated snapshots below are preserved.*

**Where the stocks are (EIA, w/e Sep 4 — released Sep 10, ingested late Sep 15 after the watchlist carried the wrong week-ending):**

| Stock | Level (M bbl) | WoW | Days of cover |
|---|---|---|---|
| Commercial crude | 424.1 | −0.39 | ~24 days vs refinery input |
| **SPR** | **285.4** (lowest since Dec 1982) | **−1.24** (~0.18M b/d — down ~60% from the prior week's ~0.45M pace) | see below |
| Gasoline | 206.9 | +1.27 | ~24 days (supply 8.6M b/d) |
| **Distillate/diesel** | **106.3** | **+2.09 BUILD** | ~29 days (supply 3.7M b/d; **13% below 5-yr avg** per EIA summary — the STEO's sub-100M call is in question) |
| Jet fuel | 46.0 (w/e Sep 4) | +0.16 | ~26 days |

(Prior week, w/e Aug 28: crude 424.5, SPR 286.6 at −3.12, gasoline 205.7, distillate 104.2 at +0.8.)

US 4-week products supplied 20.1M b/d (−3.7% YoY, EIA summary). **The binding constraints are distillates and the SPR — not crude** (424.1M, matching the 5-year average per the Sep 4 report). The geographic weak spot is **PADD1 (East Coast) distillate** (21.7M, −28% YoY, w/e Sep 4), the same Atlantic pool that feeds 34% of ARA's gasoil imports — **the US East Coast and Europe break in the same week, not in sequence**.

**SPR milestones (285.4M; −130.1M from 415.4M pre-war):**

| Milestone | Level | @ 0.45M b/d (corridor holds) | @ 0.70M b/d (standoff) | @ 1.35M b/d (lapse) |
|---|---|---|---|---|
| Cavern-damage floor | ~300M | **crossed early Aug (first reported below wk of Aug 7)** | — | — |
| GEF operational floor | ~250M | ~79 days (≈ late Nov) | ~51 days (≈ late Oct) | ~26 days (≈ Sep 30) |
| Hard operable floor | ~180M | ~late Apr 2027 | ~Feb 2027 | ~78 days (≈ Nov 21) |
| DOE safe minimum | ~70M | ~late Dec 2027 | ~early Jul 2027 | — |

The reported one-week pace (0.18M b/d) is far below even the corridor-holds column — **the Sep 16 print (w/e Sep 11) is the check: a second slow week or a DOE statement is the reweight surface** (draw-rate change is the spec's trigger).

**The three branches — snapshot as of Sep 2, retained for the record (its weights and end-of-November levels predate the Sep 11 reweight; the current framework is 10/40/50 with the milestone table above). It was set when tanker-for-tanker removed the last de-escalation restraint and corridor claims were uncorroborated by AIS:**

| Branch (end of Nov) | Weight (Sep 2) | SPR | Distillate | PADD1 by mid-Nov | Retail diesel | First rationing |
|---|---|---|---|---|---|---|
| **Corridor holds** (extended; shadow flows continue) | **~15%** | ~274M | 65–75M (~18–20d) | ~10–12d | $5.20–5.50 | None national; East Coast tight |
| **Standoff drift** (short extensions, gradual decay — **base case**) | **~50–55%** | ~265–270M | 55–65M (~15–17d) | ~8–10d | $5.30–5.80 | **East Coast, late Nov** |
| **Corridor lapses** (no extension) | **~30%** | ~250–255M | 40–50M (~11–13d) | **single digits** | $5.80–6.50+ | **East Coast early Nov; spreads Dec** |

**Dated catalysts:** **Sep 6** — OPEC+ ministerial (11:00 GMT): the final +188K bpd tranche unwinds the 2023 voluntary cuts; Novak says no new cuts will be discussed. **Sep 9** — EIA STEO release: the revision size is a signal (current path, Q4 $78, is ~$17 below spot on a reopening premise). **Sep 15** — Polymarket "normal by Sep 15" market settles (early read on the corridor). **Sep 30** — Russian producer diesel export ban expiry, now landing *inside* the corridor-expiry window (late Sep–mid Nov) and colliding with the Iran–Oman no-military-vessels talks; **the Swedish petrol excise cut expires the same day**. **Nov 30** — Russian jet export ban. **Q1–Q2 2027** — estimated expiry of China's commercial buffer (undisclosed; see §9A). Prediction markets (Polymarket, Sep 2): Hormuz normal by Sep 30 = **3%**, by Dec 31 = **26%**, by Jul 1 2027 = **55%** (straits.live aggregation: 3.8% / 31.5% — same direction).

**Europe:** ARA trader floor (8.5–9M bbl gasoil) crossed **~late Oct** (mid-Oct in the lapse branch); GEF's December 75–82% diesel base case **revised to 70–80%** on the extended Russian ban calendar; visible European shortages expected **mid/late October** (price-triggered political breaks first). **Asia:** Japan ~203 days, Korea >1 year, China official SPR untouched; the exposed Asians are the secondary importers (SG imports −29%, KR −23%, MY −41%) and **Australia** (excise relief expired Aug 2).

**Baseline note (new §9B):** the branch table above assumes recovery to pre-war supply on reopening. The spring/summer infrastructure strikes (Ras Laffan −17% of Qatar's LNG capacity until ~2029–31; Abqaiq halted Jul 27; South Pars ~40% restored; ~600K bpd of structural disruption through 2027) mean **the post-reopening baseline is damaged** — every branch's terminal state is structurally lower than pre-war, by a few hundred kb/d of crude and ~13M t of LNG. See §9B.

---

## 📡 14-day deep dive (Aug 19 – Sep 2) — what the model was missing

Systematic sweep of the past two weeks across four research tracks (inventories, shipping/insurance, Russia & global shortages, institutional commentary; ~30 sources, all cited in Sources). The Day 184 banner above carries the top-line items; this section is the full delta, including items the report had not yet absorbed.

### A. Inventories — the product-record series continues

| Finding | Data | Source |
|---|---|---|
| EIA w/e Aug 14 (released Aug 19) | crude **+4.4M → 428.8M** (build); gasoline +0.7M → 209.4M; distillate **−1.5M → 105.6M**; utilization 97.2% | EIA via BOE Report/OilPrice |
| EIA w/e Aug 21 (released Aug 26) | distillate **103.4M — record seasonal low, ~14% below 5-yr avg**; utilization **97.4%**; distillate production down to **5.1M bpd**; exports ~1.9M bpd draining the pool | EIA via IndexBox/PrimeXBT |
| EIA w/e Aug 28 | distillates on track for the **lowest end-of-August level since April 2005** | RBN Energy (Sep 2) |
| API diverged from EIA both weeks | w/e Aug 21: API crude **+4.2M vs EIA +0.1M** (big miss); w/e Aug 28: API distillate **−0.3M vs EIA +0.8M** (opposite direction) | API via OilPrice/Seeking Alpha |
| **SPR draws continued after the program nominally ended** | the IEA release — 400M bbl global, 172M of it US (authorized Mar 11, ~120 days) — ended ~early July, yet the SPR kept drawing **~3M bbl/wk all August** (289.7 → 286.6). No DOE/EIA statement on why. 286.6M is inside the "generally accepted operational minimum" band of **250–300M** | OilPrice (Sep 1) |
| ARA fuel oil building while gasoil hits a 4-yr low | August: fuel oil **+15% MoM → 4.62M bbl** (still −29% vs Feb); gasoil **12.07M (−1% MoM, 4-yr low)**; gasoil imports 156K bpd (US 36%); 5–7-day prompt bunker lead times | ENGINE (Aug 28, Insights Global/Vortexa) |
| **Aramco September OSP: Arab Light $2.00 below ODU — widest discount since June 2020** | Saudi barrels selling at their most-undervalued point in six years — the price signature of Gulf surplus without a route out, while product (not crude) is the scarce thing | priceofoil (Aug 13) |
| Rhine low water | barge logistics squeezing inland German distribution (Miro refinery, 320K bpd, shuttling by truck; 3.1M t/yr ethylene capacity at risk) — Europe dodging a deeper Rhine crisis only because crackers run ~70% utilization | OilPrice (~Aug 20) |

### B. Shipping & insurance — the corridor deal may be structurally unusable

- **LLI weekly Hormuz transits: 73 (Aug 10–16) → 114 (Aug 17–23, +30% WoW)** — the brief pick-up that UKMTO's ~29/day reflects, then back to 6/day by Aug 30 (PortWatch).
- **Named vessel incidents (Aug 27 – Sep 2):** Kuwaiti tanker hit (Aug 27); Saudi supertanker ***Sidr*** struck **two naval mines** on an "unauthorized route," on fire, immobilized (Aug 31); Saudi **Bahri VLCC** hit by three projectiles exiting, engine room disabled (Sep 1, UKMTO 120-26); ***Sidr* and *Senegal Prosperity*** — two Saudi VLCCs, ~4M bbl — in the strike zone (Sep 2); Houthi ballistic missile hit Bahri tanker ***Amzan* off Yanbu** (Aug 24) — the Houthis are targeting the Saudi side, not just Bab el-Mandeb.
- **P&I cover has formally withdrawn from the Red Sea:** UK P&I Circular 15/26, cancellation effective **Aug 16**; six P&I clubs have pulled Gulf cover; the Iran/Persian Gulf exclusion stands since Mar 3. The US has stood up a **$20B reinsurance program**; Saudi Arabia is in talks for state-backed war insurance (FT).
- **The LMA toll clause (late July) voids war-risk cover for any vessel that pays a Hormuz transit fee** — and Washington has sanctioned the Iranian body that would collect the toll. **The toll at the center of the Iran–Oman deal may be unusable even if agreed** — a structural defect in the corridor framework. Iran's six published conditions for reopening (sanctions relief, war reparations, end of US naval blockade, end of military action, release of frozen assets, end of threats against its leader) and its statement that the Oman agreement "does not itself reopen the strait" confirm the mechanism is contested.
- **War-risk rates: 7.5–10% of hull value (~$7–10M per VLCC transit), quotes not updated in 39 days** (Noah Intelligence, Sep 1); TotalEnergies CEO: ~$20M per VLCC transit; JWC war-risk listing conditions unmet — insurers are not lifting the strait exclusion.
- **Frontline (record $659M Q2): Q3 contracted VLCC TCE $156,900/day (86% covered), Suezmax $117,400** — but expects full-quarter rates to fade below current spot. Ras Tanura→India VLCC freight $4.34/bbl in August, **+411% vs pre-war**.
- **The Sidi Kerir shuttle chain is now the operational backbone:** Yanbu → Ain Sukhna → SUMED → Sidi Kerir; Sidi Kerir liftings at a record, **+33% in 30 days**; South Korea and Idemitsu rerouting Saudi crude through the chain; ≥2 European term buyers lifting September barrels from Sidi Kerir. Kpler: UAE exports up in August (above 2025 avg) — the Fujairah bypass is working, but ADNOC has reported 15 vessel attacks.
- **Disputed:** Trump declared mines "all cleared" and the strait open (Aug 25) — **IMO's Secretary-General denied it**; JMIC stayed SEVERE (Sep 1) with a drifting-mines warning; a tanker was hit in the strait Aug 27.
- **Dark fleet:** Kpler — strait transits 8–10 mb/d of which US+Gulf "bright" trade is only 4.8–5 mb/d (−60–70%); shadow crude is STS'd to obscure origins and delivered to **Chinese teapots** (Fox News). Bousso/Reuters (Aug 18): Hormuz flows ~2.0 mb/d (Kpler) vs 4.8 July avg vs ~18 pre-war; Iran exports 294 kb/d since early Aug; total ME exports 9.5 mb/d in August.

### C. Russia & global product shortages — rationing is now in the data

- **Kirishi (KINEF) — Russia's #2 refinery, the only NW-Russia plant, ~400 kb/d — struck Aug 30 and "completely halted" (UA.NEWS, Sep 2).** Add Novatek **Ust-Luga refinery + export port** (struck Sep 1; the port was already hit twice in early Aug). Capacity-out estimates now: UA Gen Staff **42.74%**, IEA ">20%", Russian Forbes **54% damaged**.
- **The domestic crisis is visible:** petrol at only **28% of stations nationwide (Aug 19, vs 41% the week before)**; **90% of Moscow stations out of AI-92**; per-customer caps (40–60 L), QR rationing, odd/even plates in **nearly all regions**; National Guard at stations; record ruble cash withdrawals; FAS opened **41 price-abuse cases** (Aug 19–20); **Euro-2/3/4 (low-grade) petrol authorized for ~1 year — SPIMEX trading began Aug 18**, with cars breaking down on it.
- **Belarus:** rail fuel imports to Russia **+25x YoY Jan–Jul**; record July deliveries (212K t petrol + 162K t diesel); Novopolotsk refinery maintenance in September.
- **Central Asia spillover (new):** petrol prices +12–13% Tajikistan, +10% Kyrgyzstan, +11–11.5% Uzbekistan; **Kyrgyzstan (>90% petrol imported from Russia) down to ~6 weeks of reserves**, asking Azerbaijan/Kazakhstan for help.
- **Bangladesh:** gas to industry <50% of demand; CNG load-shedding **peaked 3,595 MW (~Aug 30)**; Ashuganj fertiliser plant dark 1+ year.
- **Airlines:** China Big Three (Air China, China Eastern, China Southern) **$1.21B combined loss** on jet fuel; domestic fuel surcharge added Aug 2026 (RMB40/70).
- **Retail:** AAA US national avg **$4.1203 (Sep 2)**; Australia 91-unleaded 205.1 c/L (+4.9 WoW), diesel 252.2; Russia petrol avg 70 ₽/L (+7.4% H1), diesel +12%, some regions >100 ₽/L.
- **Policy in-window:** Australia's 16 c/L excise cut **expired Aug 2** (relief gone — as noted in §8) and emergency fuel-cargo subsidy powers made **permanent** (Aug 23); Sweden's SEK 1,025/L petrol excise cut **expires Sep 30** (new dated item); no new EU emergency measure found in the window.

### D. Institutional views — every 2027 number is a forecast about a negotiation

- **EIA STEO (Aug 11): Brent 2026 avg $87** (from $81.91 in July), Q3 ~$85, **Q4 $78**, 2027 $69 — assuming the severe constraints "persist through August" with most shut-in restored Q1 2027. **The EIA path is *below* where Brent actually trades (~$95.57 on Sep 2)** — the official forecaster is pricing a reopening that hasn't happened. Next STEO release Sep 9: the revision size is itself a signal.
- **IEA Aug MOEM: 2026 supply −4.3 mb/d (revised from −3.7)**; Q4 shortfall 1.27 mb/d; 2027 rebound +8.3 mb/d supply / +2.4 demand.
- **OPEC: fourth consecutive 2026 demand cut → +580 kb/d growth** (total 105.74 mb/d); the OPEC-vs-IEA 2026 demand gap is **~2.2 mb/d**.
- **Banks:** Goldman $80 Q4'26 / $75 2027 with an explicit tail of >$100 if Hormuz stays shut another month; JPM cut end-2026 from $95 → **$78**. Consensus banding: de-escalation → low $70s/$60s; contained conflict → mid-$80s to low-$90s; supply-shock trigger (Kharg, full closure, real Houthi interdiction) → **$110–150+**.
- **Kharg Island is "largely idle rather than damaged"** — no strike has hit it or Iran's export infrastructure. It is the trigger the market is watching for the premium to rebuild.
- **"Products, not crude" is now the consensus theme** (Jeff Currie: "Nobody on the planet earth consumes crude oil"; Energy Aspects' Amrita Sen; WSJ: diesel shortage "brewing since spring" and "about to get worse"; RBN ~$100/bbl diesel cracks) — the report's central thesis, now with Wall Street receipts.
- **LNG/gas compounds the winter story:** TTF ~€50/MWh (highest since 2023), JKM ~$23.17/MBtu (all-time high) — 15.6 MTPA of Ras Laffan offline for 3–5 years is now repricing in gas markets, not just oil.
- **OPEC+ meets Sunday Sep 6, 11:00 GMT** — the final +188K bpd tranche unwinds the 2023 voluntary cuts; Novak: "does not plan to discuss new cuts." Next week's dated event.
- **Prediction markets (Polymarket, Sep 2): Hormuz "back to normal" by Sep 30 = 3%, Dec 31 = 26%, Jul 1 2027 = 55%** (straits.live aggregation: 3.8% / 31.5% — same direction, slightly higher).

### E. Contradictions to carry in the model

| Dispute | Sides | How to treat |
|---|---|---|
| Hormuz flow | Kpler **2.0 mb/d** (Bousso, Aug 18) vs Kpler **8.6M bpd** (Aug 31) vs US administration **10M** vs verified 6 transits | Two Kpler numbers ten days apart straddle a 4× range — the Aug 31 figure is a claimed ceiling, not a measurement. Model on the verified floor. |
| API vs EIA, w/e Aug 28 | API distillate −0.3M vs EIA +0.8M | Opposite directions; use EIA throughout. The build is likely import substitution. |
| ARA gasoil | 11.90M (INDEXBOX/ENGINE Aug 24) vs **12.07M (ENGINE Aug 28)** | Different vintages ~2 weeks apart; range 11.9–12.1M — the trend (4-yr low) is robust either way. |
| Russia capacity loss | 42.74% (UA Gen Staff) vs ">20%" (IEA) vs **54%** (Russian Forbes) | Wide spread; the report's ">30% of effective capacity" remains the midpoint. |
| War-risk rates | 7.5–10% (Marsh/Noah) vs 3–8% (Insurance Business) | Use 7.5–10% around Hormuz (most recent, most specific); the 39-day-stale quotes matter more than the level. |
| "Russia extends fuel export ban to 2027" (Pravda ~Aug 29) | Established schedule: producer diesel **Sep 30**, non-producer **Jan 31 2027**, jet **Nov 30** | Product unspecified; likely a re-report of the Jan 2027 ban — but watch for a fresh diesel extension around the Sep 6 OPEC+ meeting / Kremlin statements. |

### F. What the deep dive changes in the model

1. **The corridor deal has a new structural defect: the toll may be unusable** (LMA clause + sanctions on the collector + P&I withdrawal). This argues against "corridor holds" being durable and supports the ~15% weight; the deal's durability now depends on a waiver mechanism nobody has described.
2. **Russia's Sep 30 ban expiry is more dangerous than modeled:** Russia is itself rationing (28% of stations, nationwide caps) — it cannot release domestic stock to cover the ban expiry, and Kirishi's loss means the "producer diesel" pool is smaller than the GEF assumed. Keep Sep 30 as the single most dangerous dated event of Q4.
3. **The EIA STEO divergence is a new calibration point:** the official forecaster (Q4 $78) is ~$17 below spot on a *reopening* premise. The Sep 9 STEO revision size is a signal: a hike toward spot = institutional admission that the standoff branch is base case.
4. **The SPR draw mystery is a new monitor:** ~3M/wk continued after the release program nominally ended. If draws accelerate without an announcement, the floor math (250M ≈ 82 days) shortens; watch the draw *rate*, not the level.
5. **Nothing in the deep dive moves the base case** — the record-low distillates, the 4-yr-low gasoil, the +411% freight, the ~$100 cracks, the 28%-of-stations in Russia, and the banks' own tail scenarios all point the same way as the Day 184 re-weighting. The delta is in the insurance/toll mechanism (new), the Russia-rationing data (sharper), and the institutional divergence (quantified).

---

## 🚨 Update banner (Aug 30, 2026 — dual chokepoint + Russia)

The Aug 29 update modeled a single chokepoint with a valve. Two structural changes — one that began in July and one accelerating this week — changed the shape of the problem:

| Aug 29 claim | Aug 30 reality | Verdict |
|---|---|---|
| "Corridor = the only valve; if it lapses, the system breaks" | Still true — but the *bypass* that was silently assumed to keep the Atlantic basin supplied is gone: Houthi embargo on Saudi shipping (Jul 20) has cut Saudi Bab el-Mandeb crude from **2.4M bpd (Jul) to 64K bpd (Aug), −97%**. Kpler: total Gulf exports **3.6M bpd in Aug — 82% below pre-war** (20M Feb; 1.4M May trough). | **Both chokepoints are closed.** One valve (Hormuz shadow corridor), no working bypass. |
| "Russia lost ~25% of refinery capacity; diesel export ban" | **All major Lukoil refineries offline** (Perm Aug 21; NORSI — Russia's #4 refinery, 15M t/yr — Aug 26). **21+ refinery strikes in August** (record month, near-daily). Bans extended: producer diesel to **Sep 30**; non-producer gasoline/diesel to **Jan 31, 2027**; jet to **Nov 30, 2026**. Crimea in fuel state of emergency since June. | **Worsening; the ban calendar now spans all of Q4.** |
| "US is a net product exporter; the East Coast is the weak spot" | Confirmed — and the Atlantic basin's Saudi crude now routes **around the Cape** or through **SUMED** (2.5M bpd cap; Sidi Kerir loadings ~1.3M). +10–15 days' voyage, record freight ($647K/day VLCCs). To **Asia**, the Suez route roughly doubles voyage time → uneconomic: the bypass is dead for East-of-Suez demand. | **Damage is asymmetric: Asia worst; US/Europe pay freight, not scarcity.** |

**Net:** the Oct/Nov question is no longer "does the corridor extend?" — it is "can *any* combination of these three fronts (Hormuz corridor, Red Sea, Russia) deliver Q4 product?" See the [depletion model from the current state (§9A)](#9a-depletion-model-from-current-state-aug-30).

---

## ⚠️ Update banner (Aug 29, 2026)

What changed since June 30, and where this model landed:

| June 30 claim | Aug 29 reality | Verdict |
|---|---|---|
| "SPR ~3 weeks from 300M cavern-damage floor" | **SPR is at 289.7M — already below the 300M floor.** Broke through in the week ending Aug 7 (298.7M; 293.4M by wk of Aug 21). Lowest since Dec 1982. | **Confirmed, early.** The floor estimate was validated by the data (GEF uses ~250M as the *operational* salt-dome limit; DOE's stated safe minimum is ~70M). |
| "Brent $74 — false signal, release-driven calm" | Brent peaked **$117.29 (Apr avg)**, fell to $83.76 (Jul avg), now **~$88.10**. Retail never came down: gasoline peaked $4.61/gal, diesel $5.60 (May); AAA national avg $4.090 (Aug 28). | **Confirmed.** The low *crude* price coexisted with record *retail* prices — the buffer was spent to hold the crack spreads down, not the pump. |
| "Base case: deal-based recovery, December diesel ~92%" | GEF downgraded: base case is now **standoff (50% weight), December diesel 75–82%**; de-escalation weight cut 65%→**25%**. | **Deteriorated.** The winter cliff is now the base case, not the tail. |
| "Hormuz 5% of normal (5 ships/day vs 93)" | PortWatch (Aug 23): **3 vessels = 4% of the 85/day baseline**. GEF 10-day avg ~15 (incl. dark operators); Goldman: Gulf exports ~15–16M b/d ≈ 2/3 of pre-war, but **86% of crude tankers operate dark**. | **Roughly stable — still closed to the insured world.** The "reopening" is a shadow-fleet corridor, not commercial normalization. |
| "Asia: JP/KR depleting fast, Australia thinnest (29–36 days)" | Japan released **80M bbl** (45 days, Mar 16, largest ever) + a 2nd 20-day round (May); June stocks still **203 days** — resilient. Korea released **12M** (via mandate cut, May); minister says >1 year cover. Australia's excise relief **expired Aug 2**; ACCC diesel 232.8 c/L. | **Asia is far more resilient than June 30 suggested** — except Australia, which has no relief left. |
| "US product cover ~25 days, gasoline building" | Gasoline **stopped building**: 206.8M (−2.5M/wk, −7% YoY). Distillate 103.4M (−9.5% YoY). **PADD1 (East Coast) distillates −27.3% YoY.** Jet 45.7M (+4.8% YoY). | **US East Coast is living Europe's diesel problem.** Product covers: gasoline ~23d, distillate ~27d, jet ~26d. |

**Net assessment:** The June model's *structure* held (SPR floor binding, Europe winter cliff, false-crude-price-signal, Asia exposed-but-buffered). The *trajectory* worsened: the base case is now a prolonged standoff, the SPR has crossed its own floor, and the only positive — the Iran-Oman corridor — is a 30–60-day temporary arrangement that expires in late September–November.

---

## TL;DR (Aug 30 — dual chokepoint)

- **Two chokepoints, one valve.** Hormuz: 3 AIS-visible transits/day (4% of normal) plus the Iran–Oman shadow corridor (30–60 days, expires late Sep–mid Nov). Red Sea: Houthi embargo has cut Saudi Bab el-Mandeb crude to **64K bpd (Aug)** from 4.14M (June). What remains: Fujairah (+1M), Kirkuk–Ceyhan (750K), SUMED (~1.3M loading / 2.5M cap), Cape routing. Kpler total: Gulf exports **3.6M bpd (−82%)** — vs Goldman's 15–16M that counts dark fleet; the gap is unverifiable and is itself the risk.
- **Russia is the third front.** Record refinery strike campaign (21+ in August; all major Lukoil offline), export bans extended to Jan 2027. The world is running a simultaneous **crude** (Gulf) and **product** (Russia + Gulf refineries) shortage — the exact regime where retail stays pinned ~40% above pre-crisis while Brent unwinds.
- **Asia is now the most exposed region, not Europe** — and **China is the variable, deliberately deleveraging, not passively suffering**: 2Q26 imports −32% QoQ, drawing *commercial* stocks (not the official SPR), and halting product exports to the world. The official reserve (estimated 1.2–1.4B bbl — **undisclosed, all figures are third-party estimates**) is untouched and is the only swing factor left. The one potential relief valve: China–Houthi safe-passage talks (Jul 28).
- **US Oct/Nov (model, §9A):** gasoline safe in all branches (net exporter). National diesel survivable in the base case (55–65M bbl, ~15–17d, end Nov). **PADD1 (East Coast) is the flashpoint in every branch** — 8–10 days' cover by mid-Nov in the base case, single digits if the corridor lapses. Base-case retail diesel $5.30–5.80 by November.
- **Demand destruction is real and accelerating** (IEA: 2026 demand −1.6 mb/d, cut ~510 kb/d in one month) — it is why Brent is $88 instead of $150. But it cannot absorb the bad branch (only physical rationing can), and it is self-limiting: if the corridor holds and Brent falls, ~1.6 mb/d of destroyed demand returns into a still-broken supply base — the December re-spike risk.
- **Europe:** the ARA path holds (trader floor 8.5–9M bbl crossed ~late Oct; mid-Oct if corridor lapses), but the extended Russian ban calendar makes GEF's December 75–82% base case look optimistic — **revised 70–80%**. Expect visible European shortages **mid/late October**, not December (price-triggered political breaks come first).

---

## TL;DR (Aug 29)

- **The Strait is "open" only in the shadows.** The June 17 MoU expired Aug 17–18 unextended. The new **Iran-Oman temporary corridor** (agreed Aug 27; lanes declared mine-free Aug 28) is a 30–60-day window. AIS-visible commercial transits: **3/day vs 85 pre-crisis (4%)**. Goldman counts **15–16M b/d** actually moving — but **86% of crude tankers are dark**. Functionally open to dark operators, functionally closed to everyone else.
- **Brent ~$88 is still a false signal.** Peak was April ($117 avg); the unwind came from the 400M-barrel IEA release, demand destruction, and deal hopes — not restored supply. Retail prices (gas $4.09, diesel ~$4.96) stay pinned ~40% above pre-crisis (Jan: $2.94 / $3.52) because product inventories, not crude, are the scarce thing.
- **The US SPR is *inside* its damage zone: 289.7M bbl** (lowest since Dec 1982), drawn ~114.5M YoY (from 404.2M) — largely the **172M-barrel US contribution to the IEA's 400M coordinated release**. Recent draw pace is slow (~0.53M b/d); runway to DOE's 70M safe minimum is **~14 months** at that pace, to GEF's 250M operational floor **~2.5 months**.
- **Europe's winter cliff is now the base case.** ARA gasoil at an **11.9M-bbl, four-year low**; GEF December diesel base case **75–82%** (rationing-risk zone); de-escalation weight 25%. On the depletion path, the **physical trader floor (~8.5–9M bbl) is crossed ~late October**; the political break (price caps/rationing) will likely land earlier — Slovenia and Ireland both broke on *price*, not scarcity, as far back as March/April.
- **Asia proved more resilient than feared** (Japan 203 days, Korea >1 year, China SPR untouched), but Gulf importers are bleeding: Singapore imports −29%, S. Korea −23%, Malaysia −41%.
- **The decision window is Sept 30–Nov.** Corridor expiry, winter drawdown, and the standoff-vs-deal choice converge. Prediction markets: Hormuz-normal by Sep 30 = **3.8%**; by Dec 31 = **31.5%**.

---

## 1. The situation (Aug 29, Day 181)

The June 17 US-Iran deal (60-day toll-free passage) **expired Aug 17–18 without extension**. August brought both escalation and a narrow de-escalation:

- **Aug 20:** UAE suspends all financial/economic transactions with Iran.
- **Aug 25:** **"Operation Economic Outcast" enacted** — secondary sanctions on Iranian oil, Chinese banks excluded from the settlement rail; Brent −2.4% to $89.89 on the day.
- **Aug 27:** **Iran-Oman temporary maritime corridor agreed** — a 30–60-day window for monitored passage.
- **Aug 28:** CENTCOM declares the shipping lanes mine-free; a Kuwaiti tanker is nonetheless hit in the Strait.
- **Aug 29:** IRGC Navy claims "full control" — no transit without Iranian coordination. Istanbul talks postponed.

| Indicator | Value | Source |
|---|---|---|
| Hormuz commercial transits (AIS-visible) | **3 vessels/day** (Aug 23) vs 85 normal = **4%** | PortWatch via straits.live |
| 10-day transit average (incl. dark) | ~15/day | GEF (Aug 29) |
| Gulf export volume actually moving | ~15–16M b/d (2/3 of pre-war 22–24M); 86% of crude tankers dark | Goldman (via GEF) |
| Vessels holding position away from berth | **380** | straits.live (Aug 29) |
| War-risk insurance (VLCC) | ~**$10M per passage, 40× pre-crisis**; 6 P&I clubs withdrawn | straits.live |
| Tanker rates | Record **$647K/day** | GEF |
| Brent | **$88.10** (Apr peak $117.29 monthly avg; Jul $83.76) | straits.live / EIA monthly |
| Crisis pressure index | **91 / 100 (extreme)** | straits.live |
| Escalation gauge | 49 / 100 (elevated) | straits.live |
| IEA-coordinated release (Mar) | **400M bbl from 32 countries; US contributed 172M** | IEA / GEF / EIA |
| Global supply lost since Feb | ~1.3B barrels (IEA: "largest supply disruption in the history of the global oil market") | IEA |

**Transit-count note:** the "~85/day" figure is the *pre-crisis baseline*, not current flow. Current AIS-visible flow is 3–5/day; GEF's ~15/day and Goldman's 15–16M b/d include dark transits the AIS count structurally misses. The strait is a shadow corridor, not a reopened highway.

---

## 2. The central paradox — now with receipts

Brent at $88 looks calm. It isn't. Monthly averages tell the real story:

| Month | Brent ($/bbl) | WTI | NYH ULSD ($/gal) | Retail diesel ($/gal) |
|---|---|---|---|---|
| Jan | 66.60 | 60.04 | 2.258 | 3.52 |
| Mar | 103.13 | 91.38 | — | 4.92 |
| **Apr** | **117.29 (peak)** | 100.32 | — | 5.50 |
| May | 107.14 | **102.13 (peak)** | **3.969** | **5.60 (peak)** |
| Jun | 85.40 | 84.81 | — | ≈5.1* |
| Jul | 83.76 | 80.46 | 3.913 | 4.96 |

*June retail = EIA weekly average (6/8: $5.21 → 6/29: $4.67); all other months are EIA Table 14 monthly averages.

The crude price unwound from the April spike while **retail diesel stayed within ~$0.60 of its May peak through July**. That is exactly the release-and-demand-destruction signature: the 400M-barrel strategic release + demand destruction (Q2 global demand −5M b/d YoY) + Atlantic Basin ramping held the crude price down, while product inventories (distillate −9.5% YoY, PADD1 −27.3%) stayed structurally short. **The buffer was spent to manufacture the calm.** When inventories hit operable floors and the corridor expires without a permanent deal, the product price — not the crude price — is where the shock lands.

---

## 3. The SPR — inside the floor (key update)

The SPR is salt-cavern storage with geology physics — not a tank you can pump to empty. The June model's floor estimates have now been stress-tested against reality:

| Threshold | Level (M bbl) | Status (Aug 28) |
|---|---|---|
| Pre-war (Feb 28, 2026) | 404.2 | — |
| Cavern-collapse floor (engineering est.) | ~300 | **BREACHED** (first reported below wk of Aug 7) |
| **Current holding** | **285.4** (w/e Sep 4; Aug 28: 286.6) | lowest since Dec 1982; w/e Sep 4 draw just 1.2M bbl (~0.18M b/d) |
| Operational floor (GEF; salt-dome hydraulic limit) | ~250 | ~51 days at the model's 0.70M b/d standoff pace (~79 days at 0.45M) |
| Hard operable floor (June est.) | ~180 | — |
| DOE stated safe operating minimum | ~70 | **~16 months** at 0.45M b/d |
| Absolute max (unrecoverable) | ~44 | — |

**Drawdown math (actual):**

```
SPR inventory (million barrels)
420 ┤●
400 ┤ ●  404.2 (Feb 28)
380 ┤  ●
360 ┤   ●   ← IEA release phase (US: 172M)
340 ┤     ●
331 ┤       ●  Jun 19
320 ┤
300 ┤································  ~300M cavern-damage floor
    │      ▲ BREACHED wk of Aug 7 (298.7)
290 ┤              ●  289.7 (Aug 21)
280 ┤               ●  286.6 (Aug 28) ←
260 ┤
250 ┤································  ~250M GEF operational floor
240 ┤
220 ┤
200 ┤
180 ┤································  ~180M hard operable floor
160 ┤
140 ┤
120 ┤
100 ┤
 80 ┤
 70 ┤································  ~70M DOE safe minimum
  0 └────────────────────────────────
    Feb  Mar  Apr  May  Jun  Jul  Aug
```

| Measure | Value |
|---|---|
| YoY draw (405.2 → 285.4) | **−119.9M bbl (−29.6%)** YoY |
| Recent pace (w/e Sep 4) | **−1.24M/wk ≈ 0.18M b/d** — down ~60% from the prior week (−3.12M ≈ 0.45M) |
| Runway to 250M (GEF floor) | ~51 days (late Oct) at the model's 0.70M b/d; ~79 days at 0.45M; far longer at the reported 0.18M |
| Runway to 70M (DOE min) | ~308 days (early Jul 2027) at 0.70M b/d, from the Sep 4 anchor |

**Deep-dive note (Aug 19 – Sep 2):** the ~3M/wk draws continued all August even though the IEA release program — 400M bbl global, 172M US (authorized Mar 11, ~120 days) — nominally ended in early July — no DOE/EIA statement explains the continuation. 286.6M sits inside the "generally accepted operational minimum" band of 250–300M cited by traders (OilPrice, Sep 1). If the draws are discretionary and accelerating without announcement, the ~82-day runway to 250M shortens; the draw *rate* is the leading indicator, not the level.

**The June "3 weeks to floor" call was right and is now moot** — the floor was crossed, and the market did not blow up, because the draw rate fell to ~0.45M b/d (the corridor + US production + demand destruction absorbed the gap). The relevant question is no longer *when* the SPR hits a floor but *what draw rate a corridor failure would force*. At the June-era 1.4M b/d, the 286.6M → 250M cushion is ~26 days; to 180M, ~76 days.

---

## 4. US depletion timeline (w/e Aug 21, 2026)

### Current stocks (EIA WPSR, precise)

| Stock | Level (M bbl) | WoW | YoY |
|---|---|---|---|
| Commercial crude | 428.9 | +0.1 | +2.5% |
| SPR | 289.7 | −3.7 | **−28.3%** |
| **Total crude (incl. SPR)** | **718.6** | −3.6 | **−12.6%** |
| Cushing hub | 22.4 | — | — |
| Gasoline | 206.8 | −2.5 | −7.0% |
| Distillate (diesel/heating) | 103.4 | −2.2 | **−9.5%** |
| Jet fuel | 45.7 | −0.5 | +4.8% |
| **PADD1 (East Coast) distillate** | **21.0** | — | **−27.3%** |

Flows: production 13,843 kb/d (+3.5% YoY); crude imports 6,158 kb/d; crude net imports 2,366 kb/d (−20.4% YoY); **net product exporter at 6,151 kb/d** (−16.9% YoY); gasoline supply 9,043 kb/d (−1.1%); distillate supply 3,839 kb/d (−2.2%); jet supply 1,772 kb/d (+2.3%).

Two weeks earlier (w/e Aug 14, released Aug 19): crude **+4.4M → 428.8M**, gasoline +0.7M → 209.4M, distillate **−1.5M → 105.6M** — i.e., crude built for two weeks before reversing, while **distillates have drawn every week since mid-July, hitting a record seasonal low (103.4M, ~14% below the 5-yr average) w/e Aug 21** with ~1.9M bpd of exports draining the pool. API has diverged from EIA in both weeks (w/e Aug 21: API +4.2M crude vs EIA +0.1M; w/e Aug 28: distillates −0.3M vs +0.8M) — use EIA throughout.

**Week ending Aug 28 (released Sep 2 — latest):**

| Stock | Level (M bbl) | WoW | vs 5-year avg |
|---|---|---|---|
| Commercial crude | 424.5 | **−4.45** | +1% |
| SPR | 286.6 | **−3.12** (~0.45M b/d) | ~445M below max |
| Gasoline (total motor) | 205.7 | −1.17 | — |
| Distillate | 104.2 | +0.8 | **−14%** |

4-week supply (demand proxy): total 20.4M b/d (−4% YoY); gasoline 8.9M; distillate 3.7M (−6% YoY). Production: gasoline 9.8M b/d, distillate 5.1M b/d. Note: API's preliminary figure for the same week was a 2.6M crude draw vs EIA's 4.45M — use the EIA number; the gap signals noisy receipts data, not a data error. The pattern is unchanged from Aug 21: **crude near-normal, distillates structurally short, SPR grinding down slowly** — the constraint is product, not crude.

### Days-of-cover (product stock ÷ supply)

| Product | Stock (M bbl) | Cover |
|---|---|---|
| Gasoline | 206.8 | **~23 days** |
| Distillate/diesel | 103.4 | **~27 days** |
| Jet fuel | 45.7 | **~26 days** |
| Crude (commercial) | 428.9 | ~25 days vs 17.4M b/d refinery input |

**What changed since June:** gasoline **stopped building** (June: +2.1M/wk; now −2.5M/wk) — the June scenario table's "status quo builds" branch did not play out; the "−10% cut" branch (slow draw) is roughly where we are. The **East Coast is the weak spot**: PADD1 distillates −27.3% YoY mean the US Atlantic Basin is running a deficit it covers with imports — while ARA's August gasoil imports are **34% US-sourced**, i.e. the *same* Atlantic product pool is feeding both the US East Coast and Europe. **The "US is buffered, Europe is exposed" dichotomy has partially collapsed.**

---

## 5. Gasoline — what actually happened

June model: "gasoline is not the binding constraint; the build continues." Partially right.

- Stock fell 216.3M → 206.8M (June 19 → Aug 21), from a build of +2.1M/wk to a draw of −2.5M/wk.
- Retail: national avg peaked **$4.61 (May)**, now **$4.09** (AAA, Aug 28) — roughly flat vs the July weekly average ($3.99) and ~$1.15 above the pre-crisis January average ($2.94). West Coast peaked $5.59 (May), $4.94 in July.
- The US remains a net product **exporter** (6.15M b/d) — gasoline is the surplus product.

**Interpretation unchanged:** gasoline is the most robust product (domestic feedstock, export flexibility). The binding constraints are **diesel (US East Coast + ARA), the SPR floor, and the corridor's expiry date.**

---

## 6. Jet fuel — averted again, but the pool is shared

- **US:** 45.7M bbl (now precise, +4.8% YoY), ~26 days cover. Airlines added fuel surcharges; Spirit ceased operations May 2 (cost-driven, not supply-driven).
- **Europe (ARA):** kerosene held 30%+ below pre-crisis (June data; no acute-shortage reports through Aug 29); the April airport stockbuild (+60%) did its job again. S&P (June 29) warned about August; UK jet-fuel forecast (GEF) flags Q4 hub traffic as the trigger, not current supply.
- **Asia-Pacific:** the summer that hurt most — SE Asia/Oceania carriers added surcharges or cut routes; Australia holds ~30 days of jet, mostly sourced from China/Singapore/Korea refiners.

**The winter jet risk (June model) stands:** if Gulf hub traffic normalizes (corridor → permanent deal) while ARA/US product pools stay thin, jet is the product that snaps first in Q4. IATA's own guidance (even with a full reopening, jet supply recovery takes **months** due to refinery/logistics constraints) is the governing fact.

---

## 7. Europe — the winter cliff is now the base case

**The June "deal-and-recovery" base case (December diesel ~92%) is dead.** GEF's updated EU forecast (late Aug):

| Scenario | Weight (Jun → Aug) | Diesel (Dec) | Petrol (Dec) |
|---|---|---|---|
| **Standoff** (corridor drifts, no deal) | 50% | **75–82%** | ~80–85% |
| De-escalation (permanent reopening) | 65% → **25%** | ~90–93% | ~95% |
| Re-escalation (corridor collapses) | ~15–20% | ~50–60% | ~58% |

**The ARA data (the June paywalled gap — now filled via Insights Global/ENGINE/Vortexa):**

| Metric | Value | Context |
|---|---|---|
| ARA independent **gasoil** (diesel + heating oil) | **11.90M bbl** (late Aug) | **four-year low**; −3% vs July |
| ARA gasoil, Jul 15 | ~13.48M bbl | 2.5-year low at the time; imports had halved to ~84k b/d |
| ARA fuel oil | 4.41M bbl | +22% off May's 10-year low, still −32% vs Feb |
| ARA gasoil imports (Aug) | 148k b/d (vs 119k Jul) | 34% US, 17% Sweden, 10% Nigeria |
| Prompt lead times | **5–7 days** for competitive offers | Rotterdam HSFO +9%, LSMGO +8% over the month |
| ARA gasoil — ENGINE Aug 28 vintage | **12.07M bbl** (−1% MoM, 4-yr low); fuel oil **4.62M (+15% MoM**, still −29% vs Feb); gasoil imports 156K bpd (US 36%) | Different vintage from the 11.90M above; range 11.9–12.1M — the 4-yr-low trend is robust |

Total ARA product stocks hit a **12-year low (4.72M mt)** in mid-April. Diesel availability has been ~86% since mid-July (petrol ~89%), and diesel is up ~40% since mid-June. Structural drags that won't heal quickly: **Russia lost ~25% of refinery capacity** to strikes and imposed a **diesel export ban**; Saudi **Jazan refinery shut**; EU pipeline-gas ban (June 17) is permanent.

**Is there a point at which price can no longer absorb? Yes — the mechanism has a hard stop.** Price absorbs a supply shock through three channels: demand destruction, marginal supply pulled in (imports, expensive refineries), and inventory drawdown. Only the third is finite. The breaking point is when stock reaches the **traders' operational floor** — at 5–7-day lead times, competitive offers stop being made — and the market flips from *expensive* to *unavailable*. That is the line between a price spike and physical rationing, and it is well above zero: nobody drains the pool to empty. The binding pool is ARA gasoil, and because ARA imports 34% of its gasoil from the US it is **coupled to US PADD1 diesel (−27% YoY)** — the US East Coast is effectively Europe's overflow tank, so the two break together.

**Depletion path (base case = standoff, 50% weight):** interpolating GEF's December endpoint (75–82% diesel) back through the heating ramp. Summer draw is ~0.26M bbl/wk (Jul 15 → late Aug); from October, heating oil, road diesel, and power generation (GEF: "hits diesel-via-power in all scenarios") compete for the same pool, and the draw is assumed to accelerate 50–100%:

| Date | ARA gasoil (est.) | What's happening |
|---|---|---|
| Late Aug | 11.9M | 4-year low; 5–7-day lead times |
| Late Sep | ~10.6M | Corridor expiry window opens (Aug 27 + 30–60 days) |
| **Late Oct** | **~8.5–9M** | **Physical traders' floor** — heating switch-over; lead times stretch past 2 weeks |
| Late Nov | ~6.5M | Inside the rationing band (GEF: <80% availability = rationing-risk) |
| Dec | — | GEF base case: **75–82% diesel** |

**The political break comes before the physical one.** The precedent events were all triggered by *price*, not scarcity: Slovenia — first EU country to ration — capped purchases at 50 L/day on **Mar 23** to stop cross-border arbitrage (Austrians exploiting Slovenian prices); Ireland had protest convoys and a government no-confidence vote **Apr 7–14**; Germany cut fuel taxes for two months (**Apr 13**) — all during the March–April price spike (Brent $117 avg, diesel $5.50 retail), when markets were still clearing — no reported stockouts, and each measure targeted *price* (caps, tax cuts, anti-arbitrage), not allocation. Governments act before stock is physically gone, so the *observed* failure (policy response, visible shortage) lands ahead of the 8.5–9M floor. The **master switch that moves the date is the corridor's expiry (late Sep–mid Nov)**: if it lapses unextended, ARA imports (148k b/d) and US PADD1 export capacity dry up simultaneously, the whole table slides 4–6 weeks earlier — a **mid-October break** — and the 25% escalation tail (Dec diesel 48–58%) goes live.

---

## 7A. The second chokepoint: Red Sea / Bab el-Mandeb (new, Aug 30)

The Aug 29 update silently assumed the Gulf's alternate export path — East–West pipeline → Yanbu → Red Sea → the world — was still carrying load. It was the lifeline for the Atlantic basin while Hormuz closed. Since July 20 it is broken too.

**Timeline:**
- **Jul 20:** Houthis declare a maritime embargo on vessels serving Saudi ports ("eye for an eye" for the Sanaa airport strike).
- **Jul 22:** strikes on two Saudi crude-laden tankers; JMIC: Bab el-Mandeb tanker transits **−40%** since the blockade.
- **Aug 9:** Houthi strikes on Mokha port and **Aramco's Jazan refinery**; ballistic missile at the Saudi tanker *Amzan* off Yanbu.
- **Aug:** Saudi Bab el-Mandeb crude at **64K bpd** (vs 2.4M July; 3.1M March; 633K pre-war).

**The bypass math (Kpler factbox, Aug 15):**

| Route | Capacity | Status |
|---|---|---|
| Bab el-Mandeb direct (Yanbu → Suez) | ran 3–4M bpd Mar–Jun (Yanbu crude exports 4.18M Apr / 3.77M May / 4.14M Jun) | **~64K bpd (Aug)** — embargo + attacks |
| SUMED (Ain Sukhna → Sidi Kerir, Mediterranean) | 2.5M bpd pipeline (all-time peak 1.77M, 2016) | Sidi Kerir loadings **~1.3M bpd** (+250K w/w) — the Med/Atlantic lifeline, working |
| Suez Canal (VLCCs half-load ~1M bbl for draught) | limited | sporadic cargo-split operations (1–2 vessels identified) |
| Cape of Good Hope | unbounded; +10–15 days; freight premium | Aramco routing "some crude around Africa" |
| Theoretical max (SUMED + cargo splits) | ~3.4M bpd | not operationally reachable in Q4 |

**The constraint stack:** the East–West pipeline is pumping at its **7M bpd record** (a March pump-station strike cost 700K bpd), but **Yanbu's port loading capacity is only 3–4M bpd in wartime conditions** (Vortexa/Argus) — the pipeline can push more than the Red Sea can ship. And to **Asia** the Suez detour roughly doubles voyage time → uneconomic: the bypass is dead for East-of-Suez demand. China's crude imports from Iran are already −48% (~530K bpd).

**Gulf totals (Kpler via The National, Aug 28):** exports 20M bpd (Feb) → 1.4M (May trough) → **3.6M (Aug), −82% below pre-war**. By country: Saudi via strait −94% (7.3M → 466K); Iran −97% (~70K); UAE −68% via strait but **+1M via Fujairah** (Abu Dhabi–Fujairah pipeline; 2× expansion planned for 2027); Iraq −72% but Kirkuk–Ceyhan at 750K (12-month extension); UAE has left OPEC (Apr 28). **Reconciliation note:** Goldman's "15–16M b/d of Gulf exports" counts dark-fleet flows that Kpler's AIS/cargo tracking cannot see. Treat 3.6M as the *verified floor* and 15–16M as the *claimed ceiling*; the true figure is between and unverifiable — that gap is itself a risk.

**Who it hits, asymmetrically:**
- **Asia: worst.** No economic route for Saudi crude to East of Suez. Japan (203 days) and Korea (>1 year) absorb it for months, not indefinitely.
- **Europe: partial.** SUMED exists precisely to feed the Mediterranean; Sidi Kerir at 1.3M is working. The hit is freight + transit time, not scarcity.
- **US: partial, pricier.** Cape routing reaches the US Gulf/East Coast; the net effect is 0.2–0.5M b/d of Atlantic crude delayed or expensive → refinery run cuts → less product (the transmission chain in §9A).

**Window update (Aug 19 – Sep 2):**
- **The Sidi Kerir shuttle chain is now the operational backbone:** Yanbu → Ain Sukhna → SUMED → Sidi Kerir; liftings at a record, **+33% in 30 days**; South Korea and Idemitsu rerouting Saudi crude through it; ≥2 European term buyers lifting September barrels from Sidi Kerir (Breakwave).
- **P&I cover has formally withdrawn from the Red Sea:** UK P&I Circular 15/26, effective **Aug 16**; six clubs have pulled Gulf cover; the US has stood up a **$20B reinsurance program**; Saudi Arabia is in talks for state-backed war insurance (FT).
- **The Hormuz toll may be unusable:** a Lloyd's Market Association clause (late July) voids war-risk cover for vessels that pay the Hormuz transit fee, and Washington has sanctioned the Iranian body that would collect it — a structural defect in the Iran–Oman framework (see the deep-dive section, §B).
- **War-risk: 7.5–10% of hull value (~$7–10M per VLCC transit), quotes 39 days stale** (Noah Intelligence, Sep 1); JWC listing conditions unmet — insurers are not lifting the strait exclusion.
- **Disputed:** Trump's "mines all cleared, strait open" (Aug 25) was denied by the IMO Secretary-General; JMIC stayed **SEVERE** (Sep 1) with a drifting-mines warning; a tanker was hit in the strait Aug 27.
- **Window update (Sep 2–7):** Saudi August crude exports at a **nine-year low** (Bloomberg) and the Houthis declared a "blockade of Saudi navigation" — the Red Sea front hardened while the strait front re-escalated (the US struck Iranian tankers in the strait, Sep 4–6; the Houthis announced attacks on "energy facilities in Saudi Arabia and other Gulf countries," Sep 2). The two chokepoints are now being fought on the same calendar, which removes the model's main offset assumption: that a strait failure could be absorbed by the Red Sea route.
- **Window update (Sep 7–8, WSJ):** the front crossed from shipping to processing. Houthi drones/missiles struck **Aramco's Jazan refinery (~400 kb/d — the kingdom's largest; gasoline + ULSD) on Sep 7–8 — reported aflame and off line (WSJ)** after the Aug 9 strike had already "diminished" its output, plus **Aramco facilities in Abha (and a power plant) and Najran, and King Khalid Air Base in Khamis Mushait** (73 injured; Saudi retaliation vowed). Jazan is the Red Sea-side processing node — the terminus of the Yanbu/Jazan bypass — so the Houthis are now destroying the bypass's own refinery, not just its shipping lane. **The Red Sea front is now both a chokepoint front and a §9B structural-damage front.**

## 7B. The third front: Russian refineries (new, Aug 30)

The Aug 29 update carried "Russia −25% refinery capacity + diesel export ban" as a static drag. It is not static — the strike campaign is accelerating and the ban calendar now spans all of Q4:

| Event | Date |
|---|---|
| 2025–26 Russian fuel crisis (refinery strikes since Aug 2025); Crimea state of emergency + fuel restrictions | Jun 2026 |
| Full producer diesel export ban in effect | Jul 8, 2026 |
| **21+ refinery strikes in August** — record month, near-daily | Aug 2026 |
| **>30% of Russia's actual refining capacity knocked out**; petrol production at ~70% of summer consumption (~80K t/d) → 30% shortfall (Moscow Times) | Aug 29 |
| All major Lukoil refineries offline; Perm lost ~86% of primary capacity (~11.3M t/yr, satellite imagery Aug 25) | Aug 25–26 |
| Diesel/marine gas oil export ban extended to **Sep 30**; petrol queues back in Moscow and Moscow Oblast | Aug 29 |
| Lukoil Perm refinery offline | Aug 21 |
| **Lukoil NORSI (Kstovo) — Russia's #4 refinery, 15M t/yr — offline; all major Lukoil refineries down** | Aug 26 |
| Bans extended: producer diesel → **Sep 30**; non-producer gasoline/diesel → **Jan 31, 2027**; **jet → Nov 30, 2026** | Aug 29–30 |
| **Kirishi (KINEF) — Russia's #2 refinery, the only NW-Russia plant, ~400 kb/d — struck and "completely halted"** | Aug 30 – Sep 2 |
| Novatek **Ust-Luga refinery + export port** struck (the port was already hit twice in early Aug) | Sep 1 |
| **Saratov refinery (Rosneft, 4.8 mt/yr) hit for the 4th time this year**; 3-refinery drone blitz (Perm, Tatarstan, Sep 7) — 10 injured incl. 3 children | Sep 7–8 |
| Petrol at **28% of stations nationwide** (vs 41% the week before); **90% of Moscow stations out of AI-92**; caps/QR rationing/odd-even plates in nearly all regions; National Guard at stations; FAS **41 price-abuse cases** | Aug 19–20 |
| **Euro-2/3/4 (low-grade) petrol authorized for ~1 year; SPIMEX trading began** — vehicles failing on low-grade fuel | Aug 5–18 |
| Belarus rail fuel imports to Russia **+25x YoY Jan–Jul**; record July deliveries; Novopolotsk maintenance in September | Aug 20 |

**Why it matters to the depletion model:** Russia's losses do not hit ARA directly (EU import ban) — they hit the **global product pool**. Russia was a net exporter of diesel, gasoline, and marine fuel to Asia/Africa; ~25% of capacity lost plus near-zero exports puts a structural floor under every crack spread on earth. Combined with Gulf product-export damage (Kuwait force majeure; Ras Tanura, Ruwais, Jazan, Satorp/Samref, Kuwaiti refineries struck), the world is running a simultaneous **crude (Gulf) and product (Russia + Gulf refineries) shortage** — precisely the regime in which retail prices stay pinned ~40% above pre-crisis while Brent unwinds. The ban calendar is also a set of *dated* variables: **Sep 30 (diesel) and Nov 30 (jet) are global supply shocks with published dates** — the same class of event as the corridor expiry. A producer-diesel ban expiry, landing inside the corridor expiry window, is the Q4 date the model must watch first.

**Spillover is now visible (deep dive):** Russia's rationing is exporting price signals — Central Asia petrol +10–13% (Tajikistan +12–13%, Kyrgyzstan +10%, Uzbekistan +11–11.5%), with **Kyrgyzstan (>90% petrol imported from Russia) down to ~6 weeks of reserves** and asking Azerbaijan/Kazakhstan for help; Bangladesh gas to industry <50% of demand, CNG load-shedding peaked 3,595 MW (~Aug 30). Capacity-out estimates now: UA Gen Staff 42.74%, IEA ">20%", Russian Forbes 54% damaged — the report's ">30% of effective capacity" is the midpoint of that spread. Crucially, Russia is itself rationing (28% of stations): it **cannot** release domestic stock to cover the Sep 30 ban expiry, and Kirishi's loss means the producer-diesel pool is smaller than the GEF assumed.

**Window update (Sep 2–7):** the picture degraded further — Kirishi (KINEF, 16M t/yr) is confirmed **fully halted** with two primary distillation units damaged (Aug 30) and two more already offline; **more than 50% of Russian gasoline contracts went unfulfilled** (TASS, Sep 3); the Sep 30 producer-diesel ban expiry is now **three weeks** out, with no sign of extension relief; and oil/gas revenue is running **−45.4% YoY** (Q1 official) — the fiscal term of the fuel crisis is now as large as the physical one. The §7B reading stands: the ban cascade lands on a system that cannot cover its own gap.

**Window update (Sep 7–8, Kyiv Post/Kyiv Independent):** **Saratov (Rosneft, 4.8 mt/yr) was struck for the 4th time this year** (Sep 8), part of a **3-refinery drone blitz** (Perm, Tatarstan, Sep 7) that injured 10 including 3 children. The capacity-out base is now smaller still — **>30% of actual refining offline and rising** — and Russia's own 28% station-rationing means it cannot cover the gap. The §7B reading is reinforced: the Sep 30 / Nov 30 / Jan 31 ban cascade is now clearly capacity-forced, not policy-chosen.

**The fourth front: Russia→Europe hybrid (new, Sep 2 — WSJ).** The strike campaign above has a mirror image the model had not carried: Russia's escalating small-scale attacks on European territory — the failed Leipzig drone attack on a Ukrainian cargo aircraft (drones malfunctioned, no damage), arson on arms factories supporting Ukraine, two investigated power-station attacks (devices designed to short transmission lines), cyber operations; Europe directly attributed **20 sabotage incidents to Russia last month** — among the highest monthly tallies since 2022 — and Berlin calibrated its response partly to preserve room for a sharper one. This is **calibrated deniable escalation**: each incident placed just below the threshold that forces a military response, probing where the line actually is ("Russia is testing NATO's ability to hold back from a hot war" — WSJ, Sep 2). Two model consequences: **(a) Causality.** The WSJ confirms Kyiv's deep strikes target "facilities crucial to its revenue-generating petroleum industry" — the §7B refinery damage is a **war aim funded by the €90B European package**, not exogenous weather; Russia's fuel crisis is being manufactured by the European war coalition. **(b) Endogeneity.** This is the one front the model can turn: the strike pace — and therefore the severity of the Sep 30 / Nov 30 / Jan 31 ban cascade — is a **dial European politicians control**. The deeper the product shortage, the stronger the "pull back on Ukraine" argument inside European governments (ARA at the trader floor and price caps land in the same weeks); the more Europe pulls back, the faster Russian refineries recover and the shortage self-eases. The energy crisis and the hybrid war are feeding each other — a feedback loop, not two parallel stories.

## 8. Asia — more resilient than the June model feared (correction)

| Country | What actually happened | Buffer (latest) |
|---|---|---|
| **Japan** | **Released 80M bbl** (Mar 16, largest-ever, = 45 days demand); 2nd round ~20 days (May); private mandate cut 70→55 days; **replenishing in July** (+3 days) | **203 days total (June data; IEA basis 175d)** — national 105d, private 95d. 94.2% of crude was ME-sourced pre-war. |
| **South Korea** | Released **12M bbl** (May, via private mandate cut 40→20 days, counted toward IEA pledge; original plan was 22.46M); energy-saving campaign; coal decommissioning postponed | Minister: **>1 year** cover. But: imports from Gulf **−23%**; refiners considering export limits. |
| **China** | **SPR (1.23B bbl) untouched** — drew on corporate stockpiles (~1.4B bbl total reserves) instead; **halted all refined-product exports** (Mar 5, Sinopec/Rongsheng et al.) | Deepest cushion on earth; used the crisis to expand leverage + renewables push. |
| **India** | Cut excise duties, raised export duties (diesel +22¢/L, jet +31¢/L); LPG was the first shortage (60% of LPG demand is Hormuz import); piped-gas installs spiked | ~50% of crude ME-sourced; coal power ramped. |
| **Singapore / Malaysia** | Refinery hub drawing on diversified crude; imports **−29% / −41%** | Tight, managed. |
| **Australia** | Excise relief (50% cut) **expired Aug 2** — back to 53.7 c/L; National Fuel Security Plan at stage 2; flash-point standard relaxed to squeeze the 2 refineries | ACCC: petrol 193.6 c/L, **diesel 232.8 c/L**. Geelong RCCU restarted Jun 23 at 90%. **29–36 days — still the thinnest.** |
| **Gulf states** | NYT (Aug 18): Saudi/UAE racing to **build overseas storage** in Asia as the war drags on | The exporters are hedging against their own chokepoint. |

**Correction to June:** "Japan/Korea depleting fast" overstated it. The IEA-release mechanics (Japan 80M + Korea 12M + NZ 6 days + others = the 400M global pool) plus two decades of reserve policy bought Japan/Korea a year of cover. **The exposed Asians are the secondary importers** — Bangladesh, Vietnam, Thailand (diesel peaked 50.54 THB/L), the Philippines (energy emergency Mar 24), Sri Lanka, Pakistan — and Australia on the product side.

---

## 9. Revised depletion timeline (Aug 29)

| Region | Next 30 days (→ Sep 29) | 30–90 days (→ late Nov) | 90–180 days (winter) |
|---|---|---|---|
| **US** | Corridor holds → SPR drifts ~285M; product covers 23–27 days; retail softens ~$0.1–0.2 | **Corridor expiry window opens (late Sep–Nov).** If no extension: draw rate jumps toward 1M+ b/d; 250M GEF floor in ~2–3 months; East Coast distillate (−27% YoY) is the first product to ration | SPR 250→180M band; gasoline still OK (exporter); diesel is the story |
| **Europe** | Diesel ~86%; ARA gasoil grinds toward ~10.6M; 5–7 day lead times normalize into the status quo | **October heating switch-over** hits the thin pool: **physical traders' floor (~8.5–9M bbl) crossed ~late Oct**; standoff base case pulls diesel toward 80%; if corridor lapses, break slides to mid-October | **December: 75–82% diesel (base)**, rationing spreads from Slovenia/Ireland precedent (price-triggered, not scarcity-triggered); de-escalation tail (25%) saves it |
| **Asia (JP/KR/CN)** | Japan 203d, Korea >1y, China untouched — no physical risk | Strain = price + imports (SG −29%, KR −23%), not shortage | If permanent reopening: wind-down; if not: secondary importers (Bangladesh/Vietnam/PH) go first |
| **Australia** | **No excise relief left** — every c/L of crack spread hits retail directly | Shortages in regional areas if SG/KR product exports tighten | Liquid Fuel Emergency Act (1984) is the tripwire — never triggered since the 1970s |

---

## 9A. Depletion model from the current state (Aug 30)

Built from the actual present: EIA WPSR w/e Aug 28 (latest published, released Sep 2), Kpler Red Sea flows (Aug), Russian ban calendar (Aug 29–30), corridor expiry window (late Sep–mid Nov). Three branches; weights per GEF + prediction markets, reweighted Sep 2 (see below).

### US

**Baseline (w/e Aug 28, updated Sep 2):** crude 424.5M (−4.45M WoW, +1% vs 5-yr avg); distillate 104.2M (+0.8M WoW — a build, but still **14% below 5-year avg**); gasoline 205.7M (−1.17M); SPR 286.6M (−3.12M WoW → draw decelerated to ~0.45M b/d); 4-wk total demand 20.4M b/d (−4% YoY), distillate 3.7M b/d (−6% YoY). Prior baseline (w/e Aug 21): distillate 103.4M (~27d, drawing 2.2M bbl/wk), gasoline 206.8M (~23d), jet 45.7M (~26d), **PADD1 distillate 21.0M (−27.3% YoY)**, SPR 289.7M at 0.53M b/d; refinery inputs ~17.4M b/d; net crude imports 2.366M b/d (−20.4% YoY). The Aug 28 actuals are consistent with the slow-draw trajectory — the constraint remains distillates + SPR, not crude.

**The Red Sea transmission chain (new):** 0.2–0.5M b/d of Atlantic crude supply is now Cape/SUMED-routed → +10–15 days, record freight → US refiners cut runs by a similar amount (1–3% of inputs) → **distillate supply 3.84M b/d drops toward ~3.6–3.7M b/d**, and product-import arrivals (including the PADD1↔ARA arbitrage cargoes) slip. This alone converts the "slow draw" branch into a "seasonal build never happens" branch.

| Branch (end of Nov) | Weight | SPR | Distillate | PADD1 by mid-Nov | Retail diesel | First rationing |
|---|---|---|---|---|---|---|
| **Corridor holds** (extended; shadow flows continue) | 25–30% → **~15% (Sep 2)** | ~274M (0.53M b/d) | 65–75M (~18–20d) | ~10–12d | $5.20–5.50 | None national; East Coast tight |
| **Standoff drift** (short extensions, gradual decay) | 50% → **~50–55% (Sep 2)** | ~265–270M (0.7M b/d) | 55–65M (~15–17d) | ~8–10d | $5.30–5.80 | **East Coast, late Nov** |
| **Corridor lapses** (no extension) | 15–20% → **~30% (Sep 2)** | ~250–255M (1.2–1.4M b/d from late Oct) | 40–50M (~11–13d) | **single digits** | $5.80–6.50+ | **East Coast early Nov; spreads Dec** |

**Day 184 reweight (Sep 2):** the "corridor holds" branch is downgraded because the corridor's claimed flow (Kpler 8.6M bpd; US admin 10M bpd) is not corroborated by AIS data (PortWatch Aug 30: 6 transits = 7% of normal; NBC Sep 2: traffic "back down following a brief pick-up"), and the new **"tanker for tanker" policy (Sep 2)** — US strikes on Iranian tonnage in retaliation — removes the last de-escalation restraint while the Iran–Oman no-military-vessels talks would formalize Iranian control of the strait. The lapse branch is raised correspondingly; standoff drift (short extensions, gradual decay, dark flows continuing at 5–15% of normal) remains the base case. The Sep 30 Russian diesel ban expiry now lands inside the corridor-expiry window.

**Day 189 reweight (Sep 7):** the base case hardened further. The "corridor holds" branch lost credibility twice over: (a) the US began striking Iranian tankers in the strait itself (1 destroyed, 2 disabled, Sep 4–6) after IRGC ballistic missiles hit a US carrier and destroyer — the last de-escalation restraint is gone and the strait is now an *active combat zone*, not a contested-but-closed one; (b) the single unverified "corridor deal near" report (voi.id, Sep 6) is the only de-escalation datapoint and it is single-source. OPEC+ held October flat at 31.01M bpd — the spare-capacity narrative is now "trapped, not withheld." And US retail diesel hit an **all-time record** ($5.85 Sep 4, $5.90 Sep 7) — the political-break mechanism (Slovenia/Ireland precedent: governments act on *price*, not scarcity) is now live on the US side as well, not just Europe. Net effect: lapse branch up, holds branch down, standoff drift remains the base case; the escalation tail widens because a tanker war in the strait is the exact regime in which a single mine strike or major-flag loss converts drift into all-out (the Tanker War precedent, below). The branch table's November endpoints are unchanged in level but the *probability mass* has shifted toward the right-hand column.

*Stated assumptions:* distillate weekly draw 2.2M → **3.5 / 4.5 / 6.0M bbl** in the three branches, the increment from (a) earlier/stronger heating season, (b) Red Sea freight delays on crude and product arrivals, (c) Russian ban dates (Sep 30, Nov 30) removing global product supply, and (d) in the lapse case, the shadow corridor collapsing so Gulf product exports to the Atlantic stop. SPR paths at the stated draw rates from 289.7M. All ranges ±1 week/±5%.

**Reading:**
- **Gasoline is safe in all three branches** — 23 days plus net exporter; worst case $4.70–5.00 in November.
- **National diesel is survivable in the base case** (15–17 days). The story is geographic: **PADD1 at 8–10 days by mid-November in the base case** — and PADD1 is the pool that feeds ARA (34% of its gasoil imports). **The US East Coast and Europe break in the same week, not in sequence.**
- **Jet is fine through November in all branches; it is the product that snaps first in December** if Gulf hub traffic normalizes while product pools stay this thin (IATA: recovery takes months even after reopening).
- **What would beat the base case:** a corridor extension *plus* a China–Houthi safe-passage lane (restoring Saudi→Asia on dark tonnage, relieving global freight, freeing SUMED capacity for the Atlantic) — the only configuration that helps all three regions at once.

### Europe (ARA)

The Aug 29 depletion path stands: trader floor **8.5–9M bbl crossed ~late Oct**; mid-Oct if the corridor lapses; ~6.5M by late Nov. One revision: GEF's December **75–82%** diesel base case predates the extended Russian ban calendar (diesel past Sep 30, jet past Nov 30) and Lukoil's full shutdown. With the global product pool tighter than GEF assumed, **revised December diesel: 70–80%** in the standoff branch. The political break (price caps/rationing) still precedes the physical one — Slovenia/Ireland precedent — so expect **visible European shortage mid/late October, not December**.

### Asia

**Asia is now the most exposed region, not Europe.** The Saudi Red Sea route to Asia is uneconomic (Suez doubles voyage time); Fujairah (+1M) and Kirkuk–Ceyhan (750K) cannot cover it; China's Iranian imports already −48%. Japan (203d) and Korea (>1y) buffers buy 3–6 months at the current burn; the burn accelerates 10–15% without the Saudi route. The only swing factor left: **China's official SPR (estimated 1.2–1.4B bbl; China discloses no inventory figures), untouched** — a Chinese release would reprice the entire global model (and would presumably be traded for the safe-passage lane). See the China subsection below for the deleveraging mechanism and runway. Watch METI/KEA mandate levels monthly.

### Demand side — destruction is real, accelerating, but not keeping up (new, Aug 30)

Supply is only half the depletion equation. The demand response so far:

**Global (IEA OMR, Aug 12):**
- 2026 global demand: **−1.6 mb/d** vs 2025 — cut again this month (July forecast: −1.0), i.e. **destruction accelerated ~510 kb/d in one month**.
- OPEC: 2026 growth cut 800 → **580 kb/d** (second consecutive cut).
- Global refinery throughput July: **80.9 mb/d, ~5 mb/d below normal**; IEA now forecasts full-year 2026 runs −2.5 mb/d, Q3 cut a further 370 kb/d.
- Q4 2026 balance: **−1.8 mb/d deficit** — supply is still below demand.

**Where it's visible:** aviation is the cleanest signal — global ASK **−1.3%**, fuel now ~⅓ of airline operating costs (~$350B industry spend in 2026), capacity growth cut and pushed into fares. Russia's domestic fuel emergency (Crimea, June) is *forced* destruction — rationing, not price. Product-restricted zones (Gulf/Asia) consume less mechanically. **The US is lagging:** gasoline −1.4% YoY, jet −3.5%, pump $4.12; EIA STEO (Aug 11) still has US runs ~17 mb/d through August, utilization cuts starting only Sep–Oct.

**Four implications for the model:**
1. **Demand destruction is why Brent is $88, not $150** — the 1.6 mb/d of cuts has absorbed roughly a third of the 4.3 mb/d supply loss.
2. **It cannot absorb the bad branch.** Elastic, price-driven destruction of 1.6 mb/d cannot close a 4–6 mb/d product supply hole; in the corridor-lapse branch the only remaining absorber is *physical* rationing.
3. **Reflation risk (flagged on the corridor-holds branch):** price-driven destruction is self-limiting. If the corridor extends and Brent falls to $75–80, ~1.6 mb/d of destroyed demand returns **on top of a still-broken supply base** — the December re-spike scenario. Corridor-holds is "stable but fragile," not recovery.
4. **The US is the unmodeled cushion:** US price elasticity kicks in at retail diesel ~$5.50+ with a 4–8 week lag → in the base case that lands in November, exactly when PADD1 is at 8–10 days. A few days of extra cover; not a fix.

### China — deliberate deleveraging, and the buffer has a date on it (new, Aug 30)

**Caveat on the numbers, up front:** China does **not** officially disclose SPR inventory levels. The widely cited "1.2–1.4B bbl reserve" is a **third-party estimate** (EIA/IEA/Reuters/tank-farm capacity analysis, with fill rates back-calculated from customs data since the 2024 stockpiling push). The corporate/commercial stockpiles are even less observable — **nothing is disclosed**, and the draw on them is inferred from customs data and the import-vs-refinery-runs gap. Treat every Chinese inventory number in this report as order-of-magnitude, not fact.

**What China is actually doing (a three-part operation):**
1. **Import cuts, not a stop.** 2Q26 crude imports **8.1M bpd, −32% QoQ** (EIA/Customs); Jan–Jul YTD −13.2% by volume. But **July rebounded to 35.73M t (~8.9M bpd), a 3-month high** — off a near-decade low. This is a managed trim, not a shutdown; the July rebound is the first visible sign of the floor.
2. **Commercial draw, official SPR untouched.** Estimates put the official SPR at **nearly unchanged** from war start through June and beyond. The import gap is being covered by **corporate/commercial stockpiles outside the official reserve** — the draw is invisible by design; we only infer it.
3. **Product export halt.** China has **stopped exporting refined products** to other countries, removing its normal share of the already-tight global product pool. This is the part the West is least watching.

**Why it matters:** the ~4M bpd demand deletion (2Q26 QoQ) is the **single largest absorber in the system** — bigger than all of US demand destruction, bigger than the Red Sea loss. It is the main reason Brent is $88 instead of $150+. If China had held pre-crisis import levels (~12M bpd) against 3.6M bpd of verified Gulf flows, the physical market would have dislocated within weeks.

**The runway (model assumption, arithmetic shown):** commercial draw ≈ the import gap vs pre-crisis, minus July restocking ≈ **2–3M bpd** ≈ ~0.3B bbl per quarter. Against a commercial stock of estimated **0.6–1.0B bbl** (undisclosed, order-of-magnitude), that is **~9–18 months of runway from now → the buffer expires in Q1–Q2 2027** — the same quarter ADNOC says full Middle East flow is unlikely before. **The buffer and the supply recovery are scheduled to meet on a knife-edge.** If the official 1.2–1.4B (estimated) is also drawn, that doubles the runway; if the commercial stock is smaller than estimated, it halves it. The range is the point: nobody on the outside knows, and that opacity is itself the strategic asset.

**The two cards after that:**
- China re-imports (~12M bpd) into a still-broken supply base → **Q1–Q2 2027 price re-spike**.
- Or Beijing flips the other switch: **releases the official SPR** — the only card that can crash the market, and the only credible lever to force a permanent Hormuz framework and the Houthi safe-passage lane. The posture reads less like passive survival and more like **positioning to be the one who ends this, on Beijing's timeline**.

**The worse-case that cooks everyone (September watch item):** not the corridor lapsing — it is the **Houthi embargo expanding from the Red Sea into the Gulf of Oman, hitting Fujairah**. Fujairah is the +1M bpd outlet keeping UAE barrels moving, and the only major route that touches neither Iran's current declared targets nor the Houthis' current blockade. A "second front" declaration in the Gulf of Oman closes the last unblocked outlet and converts "tight" into **physical collapse within a month**.

---

## 9B. Infrastructure damage: the baseline itself is damaged (new, Sep 2)

Everything above treats the supply loss as an interruption of *flow*: strait closed → barrels stopped → strait opens → barrels flow again. That was a fair model in March. It stopped being fair after the spring strikes, because a significant share of the war's damage landed on the *production and processing infrastructure itself* — and that loss doesn't reopen with the strait. It has a repair clock.

### The verified damage inventory (Feb 28 – Sep 2, 2026)

ACLED: **172+ strikes on non-military infrastructure** across the six GCC states since Feb 28; **48% of all non-military strikes** hit oil & gas, power, or desalination. UAE, Kuwait, and Bahrain took the most successful strikes.

| Facility | Location | Date | Attacker | Damage | Recovery outlook |
|---|---|---|---|---|---|
| Ras Laffan Trains 4 & 6 (Rasgas JV) | Qatar | Mar | Iranian missiles | ~13M t/yr of LNG capacity = **17% of Qatar's export capacity**; Shell's gas-to-liquids plant damaged; est. $20B/yr lost revenue (Al-Kaabi, Mar 19) | **3–5 years, ~$3B**; critical turbine shortage (Rystad); force majeure still standing on affected cargoes in late Aug |
| North Field East/South expansion | Qatar | delayed | — | the 2026–28 global LNG growth pipeline (QatarEnergy–ConocoPhillips–Shell) pushed back | project delay — the planned supply growth simply doesn't arrive |
| Barzan gas plant | Qatar | Jun 13 | explosion on restart after months of maintenance | 13 killed, 66 injured | further delay; the restart-risk case study |
| South Pars + Asaluyeh | Iran | Mar 18 | Israeli airstrike | **12% of Iran's total gas production**; two refineries halted; Iran's gas supply to Iraq cut | **40% of capacity restored as of Aug 31** (Iranian MoP; self-reported) |
| Abqaiq + East–West pumping station | Saudi | Jul 27 | drone (Riyadh blames Iran-backed groups) | world's largest crude stabilization plant (~7M bpd of processing) + pumping station; **full halt, emergency flaring** | unknown; 2019 precedent = ~7 days, but this is inside an active war |
| Shah gas plant (OXY 40%) | UAE | Mar | drone, fire | operations halted | repairing |
| Sarsang oilfield + storage | Iraq | Mar + Apr | drone + explosion | field damaged | repairing |
| Kuwait Mina Abdullah + Mina Al-Ahmadi refineries; Bahrain BAPCO; UAE al-Ruwais + Habshan; Jazan (Saudi); SAMREF Yanbu (minor) | GCC | Mar+ | various | struck | varying |
| Aramco **Jazan refinery (~400 kb/d gasoline + ULSD)**; Abha + Najran Aramco facilities, Abha power plant | Saudi | **Aug 9 + Sep 7–8 (repeat)** | Houthi drones/missiles | Jazan **aflame / off line (WSJ, Sep 8)**; 73 injured across the four cities | Red Sea-side product node — the terminus of the Yanbu/Jazan bypass; repair clock unknown |

**Second-order effects (Rystad via AJ, Aug 30):** US majors' Gulf gas supply share **−40% in 2026**, oil **−30–35%**; ExxonMobil's Qatar+UAE equity upstream (20% of its global) lost ~$1.3B of H1 earnings on volume (offset by price); Exxon's Qatar LNG share 13M t → **4M t**; ConocoPhillips 2.5M t → **1.0M t**; Upper Zakum (Exxon 28%) production curtailed Mar–May.

### What comes back, and what doesn't — the official numbers

- **Crude shut-in peaked at 11.2M bpd (May avg)** — most of it *voluntary* (tank farms full, no export route), i.e. restartable. EIA (Jul 7): path to **1.4M bpd by Q4 2026**, majority back by Q1 2027. US (Aug 11): **~600K bpd of disruption persists through end-2027** — that is the structural residual.
- So the official answer: of the 11.2M peak, ~5% is permanently lost on schedule (0.6M), ~12% by Q4 (1.4M), and the rest is recoverable *if* the strait reopens.
- But "recoverable" ≠ "identical." A shut-in well suffers **water encroachment** while offline; on restart it comes back with a higher water cut, so net oil per well is permanently lower even at the same well count (Forbes/M. Lynch, May 4). Every additional month of drift lengthens that period. The 2019 Abqaiq attack (5.7M bpd, ~7-day recovery) is the optimistic precedent; the 2026 difference is that this is an ongoing war with insurance withdrawn, not a one-shot event.
- **The permanent loss is in the LNG, not the crude.** Qatar is ~17% smaller until at least 2029–31 (Trains 4 & 6), the North Field expansion growth is gone, and the June Barzan restart explosion added further delay. Europe takes this one directly — **12–14% of EU LNG is Qatari** — which is a *structural* add-on to the §7 winter cliff, independent of the strait's status.

### Model implications — the branch terminal states move down

The §9A branches implicitly assumed "reopening → pre-war baseline restored." After the spring strikes that is wrong in all three:

- **Corridor holds:** even full reopening lands in a world where Qatar's LNG is −13M t (until ~2029–31), crude supply is −0.6M bpd through 2027, the North Field expansion is delayed, and Abqaiq/South Pars may still be mid-repair. The §9A reflation risk (destroyed demand returning onto a "still-broken supply base") is now a *permanent* broken base, not a temporary one. Winter 2026 and winter 2027 are both structurally tighter than pre-war.
- **Standoff drift:** each month of drift adds (a) Abqaiq-class attack surface (172 strikes in six months and rising), (b) degradation of shut-in assets (water cut, maintenance backlog — the Barzan June restart explosion is the case study), (c) compounding project delays (turbine queue, North Field, the $10B Upper Zakum expansion). The 0.6M bpd residual becomes **1.5–2.5M bpd by 2027**.
- **Corridor lapses:** damage compounds fastest — no restarts, no repair crews or insurance operating in the region, South Pars stuck at 40%, and the EIA's 1.4M bpd Q4 path is no longer achievable.

**One-line reframe:** the model's branches used to be "when does the strait open?"; after the spring strikes they are also **"how much of the baseline is left when it opens?"** — a question that has no answer until the war ends, and whose answer shrinks the longer the drift goes on.

**Watch items (monthly):** (1) EIA monthly shut-in series — the 11.2M → 1.4M path; (2) Abqaiq restart timing (2019 precedent: 7 days; >2 weeks ⇒ assume partial permanent loss); (3) QatarEnergy force-majeure status quarterly (Trains 4 & 6 repair milestones — Shell: "could take until Q1 2027," Jul 30); (4) South Pars restoration rate (currently 40%); (5) ACLED strike pace (~30/month — if it doubles, the residual-loss estimate doubles with it).

---

## 10. What decides the timeline (updated Sep 2)

1. **The corridor's expiry (30–60 days from Aug 27 → late Sep to mid-Nov).** This *is* the deal question now. Prediction markets price it: Hormuz normal by **Sep 30 = 3.8%**, by **Dec 31 = 31.5%**. If the corridor lapses into the heating season with no extension, both the US (SPR draw accelerates) and Europe (diesel → 75%) get their worst-case simultaneously. The **Iran-Oman** bilateral channel (not Doha) is where it is being negotiated; the IRGC's "full control" claim means Iran keeps the toll booth either way.
2. **"Operation Economic Outcast" (Aug 25) and the China question.** Excluding Chinese banks from the settlement rail is the first real secondary-sanctions action. It squeezes Iran's largest buyer — but also decides whether Beijing helps enforce or quietly underwrites the shadow fleet. China's untouched 1.23B-bbl SPR is the largest single swing factor in global oil: it has never been tapped.
3. **SPR draw rate, not SPR level.** 289.7M is survivable at 0.5M b/d (14 months to the DOE floor). The floor only matters if the draw re-accelerates to 1.4M+ b/d (corridor failure) — then the 250M operational floor is ~28 days out. **Watch the weekly EIA number, not the headline level.**
4. **The Red Sea / Houthi embargo (Jul 20) and the China-in-Yemen question.** Saudi Bab el-Mandeb flow at 64K bpd. The variable: whether China negotiates a safe-passage lane with the Houthis (contact Jul 28). A lane restores Saudi→Asia, relieves global freight, and frees SUMED capacity for the Atlantic — the only move that improves all three regions at once.
5. **The Russian ban calendar and strike pace.** Producer diesel **Sep 30**, jet **Nov 30**, non-producer gasoline/diesel **Jan 31, 2027** — dated global supply shocks. Plus the strike rate (21+ in August; all major Lukoil already offline; Kirishi halted Aug 30): each additional major refinery out is a step-change in crack spreads. The deep dive sharpened this: Russia is itself rationing (28% of stations), so it cannot release stock to cover the Sep 30 expiry.
6. **The OPEC+ meeting (held Sep 6) — first policy change in the crisis.** The group **held October quotas flat at 31.01M bpd** (Reuters) — pausing the four consecutive monthly increases (the last +188K in September) that were unwinding the 2023 voluntary cuts, and turning its attention to 2027 quotas. The hike stopped at ~$98 Brent, with Iran's Kharg Island export hub still shut. **Model reading:** spare capacity is physically trapped (export disruption), not policy-constrained — the pause changes the narrative ("OPEC+ is no longer adding supply") more than the physical (the unwound 1.65M bpd was never reaching the Atlantic basin while the strait is contested). It is the first dated event in §11's list that has now *resolved*, and it resolved toward the stalemate branch.
7. **The insurance/toll mechanism (new, deep dive).** The LMA clause voids war-risk cover for vessels paying the Hormuz transit fee; P&I cover has withdrawn from the Red Sea (Aug 16); quotes are 39 days stale. If the toll can't be paid with cover, the Iran–Oman deal's core mechanism is broken — watch for a waiver arrangement. This is the most under-modeled variable in the corridor-holds branch.

---

## 11. If nothing changes — a 6–12 month extrapolation (new, Sep 2; date-compression note added Sep 8)

> **Sep 8 date-compression note.** The Sep 7–8 developments (Jazan off-line, OPEC August output −900K bpd, the Iran "exclusion zone" about to be announced, Saratov hit for the 4th time) do **not** change the *sequence* of the breaking points below — they compress the *horizon*, pulling most dated breaks **~2–6 weeks earlier**. The **Sep 9 EIA STEO** is now the hinge: the version currently published still assumes the disruption "persists through August," forecasts a 0.6M bpd residual, production recovering "early 2027," and Brent falling to $69/b in 2027 — all of which the Sep 8 data makes unholdable, so the STEO must either break the model's base case ("the recovery branch is the one that's breaking") or issue a short-lived hold. The **Iran exclusion zone** (declared "outside the strait") is the wildcard that could collapse the corridor's 30–60 day lifespan into days. The full date-by-date table is in the Day 192 banner above. **Base case — standoff drift to the breaking points, not recovery — is unchanged.**

> **The macro channel (recession / stagflation) — the model's under-weighted resolution (Sep 8, 90-day deep-dive).** This is a supply/inventory model, so demand destruction has entered only as a *price absorber* (why Brent is $88–99, not $135–150). But that destroyed demand **is the economy slowing** — the same force that caps the price, pushed far enough, becomes a contraction. Ninety days of published analysis puts the macro resolution in three parts:
>
> - **Recession odds (12-mo US).** Goldman **30%** (up from 20% pre-war; "base case still growth"), JPM **35%**, Moody's **~50%** (bearish outlier), NY Fed model **25%**, TD **25%** (Sep 7; GDP 2.1% Q4/Q4, unemployment 4.2%, "sideways growth"), and the WSJ July poll of 74 economists **25% avg, down from 33% in April** (consensus: *avoids* recession). Prediction markets: Polymarket "recession by end-2026" ~**7%** (narrow window); "recession by end-2027" **32%** (Sep 9, verified via [Polymarket macro dashboard](https://polymarket.com/dashboards/macro); end-2026 market 8%) — a longer window, but at the banks' level, so the betting market is no longer the outlier. The 25–35% bank odds run into H1 2027, which is exactly where the winter diesel draw and the re-spike land. The IMF WEO (Jul 8) is the optimistic pole: global 3.0% 2026, a "V-shaped recovery, weaker this year, rebound next year," with the oil shock "limited" because AI-driven demand offsets it. The ECB warns prolonged conflict → "stagflation," with Germany and Italy into technical recession by end-2026.
> - **The demand number is contested — that's the signal.** IEA (Aug OMR): 2026 demand **−1.6 mb/d** (Q2 −4.9, the deepest contraction since COVID). EIA: **−1.2 mb/d**. OPEC (Aug 12, fourth straight downward revision): still **positive, +0.58 mb/d**. That is a ~2.2 mb/d spread. OPEC — the seller — is far more bullish on demand than the Western agencies; if IEA is right, the price is being carried almost entirely by demand destruction, which is self-limiting (and is the December re-spike risk).
> - **The monetary-policy response is hawkish, not cushioning — the sharpest new finding.** The usual recession-aversion move (cut rates) is off the table. BofA (Jun 22), citing the new hawkish Fed chair (Kevin Warsh), expects "a series of rate hikes this year, reversing earlier cuts"; the July FOMC was a 9-3 hold at 3.50–3.75% with officials "seeing the need for a rate hike if inflation doesn't cool"; Fed funds futures priced ~38% odds of a hike (Jul 23). The "look-through" camp (Daly: "we look through oil prices") bets the shock is transitory; the hike camp does not. **Implication:** the Fed's policy is *pro-cyclical into the shock* — if the oil price doesn't come down, the hike meant to anchor inflation becomes the trigger for the contraction. That makes the two exits starker: **(a) recession** — the throttle (demand destruction + a hawkish Fed) goes too far; or **(b) the price is forced down first** (de-escalation, OPEC supply, SPR) — the base case, i.e., the model's existing political tripwire. The Fed's hawkishness is a bet that (b) resolves on the *oil* side, not the *monetary* side.
>
> **New macro tripwire:** a second consecutive upward revision in a major bank's 12-mo recession odds, or the WSJ economist poll crossing back above 30%, is the macro confirmation that exit (b) is failing and (a) is becoming the base case. A Fed *hike* (not a cut) into the winter draw would be the single most bearish macro signal in the model.

**Framing.** "Nothing changes" is defined as the standoff-drift branch persisting at its current rates: the shadow corridor keeps working on short extensions (5–15% of normal flow, tolls collected, no formal reopening); the Red Sea embargo and P&I withdrawals stand (no China–Houthi lane); Russian strikes continue at the August pace (21+ in one month) and the ban calendar lands all three dates (Sep 30, Nov 30, Jan 31 2027); the SPR keeps drawing at the current pace (0.45–0.7M b/d, the post-program continuation unexplained); demand destruction holds near 1.6 mb/d; no Kharg strike, no Gulf of Oman second front, no China SPR release, and — the assumption the model has been missing — **no Russia→Europe kinetic threshold-crossing**: the hybrid front (WSJ, Sep 2: Leipzig drone on a Ukrainian cargo aircraft, arson on arms factories, power-station attacks, 20 attributed sabotage incidents last month) stays hybrid. That last one is the least stable premise in the list: calibrated attacks are designed to fail safely until they don't, and a single passenger-aircraft or casualty event puts the Article 5 question live and breaks every energy assumption at once. It carries no date — which is what makes it dangerous. That is the 50–55% base case.

**The headline finding, up front: the status quo is not an equilibrium. It is a path with dated breaking points, and the arithmetic says it cannot survive 12 months.** Extrapolating "nothing changes" does not produce a steady state — it produces a sequence of forced breaks, each of which changes which variable dominates. The prediction markets agree: Polymarket prices "Hormuz back to normal" at **3% (Sep 30) / 26% (Dec 31) / 55% (Jul 1 2027)** — i.e., ~45% odds of *some* normalization before month 10. Even the market does not believe the status quo lasts 12 months.

### The hard arithmetic (model math from the Sep 2 baseline)

**US SPR — the smoothing tool runs out inside the window.** Straight-line draw from 286.6M (w/e Aug 28) at the two paces the model carries:

| Date | @ 0.45M b/d (current) | @ 0.7M b/d (standoff drift) |
|---|---|---|
| Aug 28, 2026 | 286.6M | 286.6M |
| Nov 30, 2026 | ~244M | ~221M |
| Dec 31, 2026 | ~230M | ~199M |
| Mar 31, 2027 | ~190M | ~136M |
| Jun 30, 2027 | ~149M | ~73M |
| **Sep 2, 2027 (month 12)** | **~120M** | **~28M** (draw must stop ~late Aug 2027 for geology — below the 44M unrecoverable line) |

Floor crossings: **250M operational floor — late Oct (0.7) / late Nov (0.45) 2026; 180M hard-operable floor — ~Feb 2027 (0.7) / ~May 2027 (0.45); 70M DOE safe minimum — ~late Jul 2027 (0.7) / ~Jan 2028 (0.45).** The honest statement: **at any draw pace consistent with "nothing changes," the SPR crosses the 180M hard-operable floor within 6–12 months, and by month 12 the US strategic reserve sits at a level not seen in 40+ years, with no capacity left to absorb a corridor lapse.** The @0.7 path is only "survivable" because the draw is discretionary — the unexplained ~3M/wk continuation after the IEA program nominally ended is what makes the path plausible. This is the most policy-dependent line in the entire extrapolation: one DOE announcement (stop the draw, or announce a refill) flattens the curve and deletes three of the ten breaking points below. Watch the draw *rate*, not the level.

**US distillates — the winter draw is unfunded.** Base case: 104M (Aug 28) → 55–65M (~15–17d) by end-Nov, with the §9A offsets (partial demand destruction, import substitution) already assumed. Extrapolating the heating season at a sustained 2.5–3.5M bbl/wk draw with only partial offsets: **Q1 2027 at ~35–55M vs a ~120M 5-year seasonal average — 55–70% below normal.** The "seasonal build never happens" branch (Red Sea freight on crude and product arrivals) means the spring 2027 restock arrives late and small; PADD1 — the pool that also feeds ARA (34% of its August gasoil imports) — runs at 8–12 days all winter. **Atlantic-basin diesel rationing becomes a standing condition, not an event.** By Q1 2027 the trilemma is fully live: pool, price ($5.30–5.80 retail), and SPR must bend at least two at once.

**Europe — a structurally deficit winter, then normalized caps and rationing.** ARA gasoil: 12.07M (4-yr low) → trader floor 8.5–9M crossed late Oct → 6.5M end-Nov → **Q1 2027 at or below 6.5M (model: ~4–6M)** — at or under the level where prompt lead times (already 5–7 days) stretch to weeks and the hub starts pricing by allocation rather than balance. December diesel fill 70–80% (revised standoff branch). The structural add-on that does *not* reset with the strait: **Qatar LNG −17% until 2029–31 (12–14% of EU LNG) with TTF ~€50 as the new winter normal (model: €50–60)**. The Slovenia/Ireland precedent says the break comes on *price*, not scarcity: price caps Oct–Nov, first rolling fuel restrictions Q1 2027 — and by month 12, rationing has moved from emergency measure to normalized policy instrument. The Rhine low-water squeeze (Miro shuttling by truck) becomes a standing annual risk.

**Russia — a closed fuel system by Q1 2027.** If strikes continue at the August pace, each major refinery out is a step-change: 2–3 more major plants by Q1–Q2 2027 → **40–55% of capacity out** (UA Gen Staff already 42.74%; Russian Forbes 54% damaged), much of it permanent. The ban cascade removes Russian product exports on three dated dates — **all inside the heating season** — and Russia cannot cover its own gap (28% of stations stocked, per-customer caps, odd/even plates in nearly all regions, degraded Euro-2/3/4 fuel in circulation; Kirishi, the #2 plant, down). By month 6: Russia is a closed domestic system — degraded fuel, caps, **Belarus rail as the only outside lifeline (+25x YoY)**, Central Asia in spillover crisis (Kyrgyzstan at ~6 weeks of reserves). The global cost: three dated product-supply deletions landing in the heating season, while the West's only offset (OPEC+ unwinding the final +188K bpd) is *crude*, not product — crude cannot replace lost refinery capacity. The Sep 6 meeting confirmed the unwind is now **paused** (October held flat at 31.01M bpd), so even the crude offset has stopped arriving.

**Asia — buffer burn on a timer, and China runs out of room inside the window.** Japan's 203 days, burned 10–15% faster, is an effective 175–185 days → **buffer exhaustion risk ~Mar–Apr 2027** (METI mandate releases will trigger before the physical zero). Korea's >1-year buffer survives to the window's edge. China's commercial buffer runway (9–18 months, undisclosed, order-of-magnitude) **expires Q1–Q2 2027 at the low end — inside the window** — with the high end (early 2028) landing a few months past month 12. This is the most important line in the extrapolation: **the status quo cannot literally last 12 months, because by months 6–9 the largest player in the system runs out of room and is forced to choose between (a) re-importing ~12M bpd into a still-broken supply base → a Q1–Q2 2027 price re-spike into the banks' $110–150 band, or (b) releasing the official SPR (est. 1.2–1.4B bbl) → the only card that can crash the market.** Either choice is the largest market event of the war so far. And either would presumably be traded for a permanent Hormuz framework plus the Houthi safe-passage lane — meaning the status quo ends in a deal, on Beijing's timeline.

**The price path.** Contained-conflict consensus band: Brent **mid-$80s to low-$90s** (spot $97.89 Sep 7 — a six-week high, +11% in five days — vs the EIA's $78 Q4 path; the Sep 9 STEO must now revise into a war that just re-escalated — the EIA revises up every cycle until the reopening happens, and the revision size is the first signal). **~$100/bbl diesel cracks (RBN) as the standing condition** — product, not crude, is the scarce asset. Month 12: mid-$90s with a re-spike option into $110–150 that China's forced move either triggers (re-import) or defuses (release). Aramco's $2.00-below-ODU OSP — the price signature of Gulf surplus without a route out — narrows as the shadow corridor and the Sidi Kerir chain scale, but does not close while the strait is contested.

### Breaking points, in order (what ends the status quo first)

| # | Breaking point | Date (if nothing changes) | Forced by |
|---|---|---|---|
| 1 | Russia's producer-diesel ban expires; Russia cannot cover it (28% of stations, Kirishi down) | **Sep 30, 2026** | dated ban; Russia's own rationing removes the offset |
| 2 | Corridor expiry window (30–60 days from Aug 27) | **late Sep – mid Nov 2026** | the mechanism has a lifespan; the toll clause + P&I withdrawal make each extension structurally harder |
| 3 | ARA gasoil crosses the trader floor; first EU price caps | **late Oct – Nov 2026** | pool at 12.07M and falling; Slovenia/Ireland broke on *price* |
| 4 | SPR crosses the 250M operational floor | **late Oct – Nov 2026** (pace-dependent) | the unexplained draw rate; the US smoothing tool enters the danger band |
| 5 | Russia's jet-fuel ban | **Nov 30, 2026** | dated ban; aviation is the product that snaps first in December (IATA: recovery takes months) |
| 6 | Russia's non-producer ban — all three bans live simultaneously | **Jan 31, 2027** | dated ban |
| 7 | SPR crosses the 180M hard-operable floor | **~Feb 2027 (0.7) / ~May 2027 (0.45)** | geology, not politics; the US can no longer smooth a shock |
| 8 | China's commercial buffer runway expires (low end) | **Q1–Q2 2027** | the largest player runs out of room → the re-import-or-release decision |
| 9 | SPR crosses the 70M DOE minimum / 44M unrecoverable line (0.7 path) | **~late Jul / ~late Aug 2027** | the draw must stop for geology |
| 10 | Japan buffer exhaustion risk (METI mandates earlier) | **~Mar–Apr 2027** | 10–15% faster burn on 203 days |
| 11 | **A calibrated Russia→Europe hybrid attack fails to fail** (passenger aircraft, casualties, a major-infrastructure event) — Article 5 question live | **any date; probability compounds with every incident** | the only undated row: deniable escalation is a ladder, and every rung tested is one that cannot be untested (WSJ, Sep 2); breaks every energy assumption in the table at once |

All ten dated rows fall inside the 6–12 month window; six of them (1, 2, 5, 6, 4/7/9 as floor math, 10 as buffer math) require no new decision by anyone — the rest are political consequences of the first six. Row 11 is the exception to the whole table: it has no date because it doesn't need one — it is the tail risk the other nine rows are, in a sense, priced against.

**One tripwire has already crossed since this table was written:** US retail diesel set an **all-time record on Sep 4** (AAA $5.85, above the June 2022 peak) and stood at $5.90 on Sep 7. In the Slovenia/Ireland logic, the political break comes when *price* crosses a line that voters can see — and the US line is now crossed. The §7 table predicted the European break on price; the US equivalent has arrived a month earlier than the PADD1 8–10-day cover would imply. The question for the next two weeks is no longer *whether* a US political response (price action, strategic measures, or both) comes, but *how many weeks after the record*.

### Snapshots

**Month 6 (~March 2027) — if every line above played out at the low end of each range:**

- **US:** gasoline still fine (net exporter; $4.70–5.00). Diesel: Atlantic basin at 8–12 days, regional rationing the norm; national distillates ~35–55M, 55–70% below normal. SPR ~190–205M — at or inside the 180M hard floor depending on pace. The "floor" is now the operating condition, not an emergency.
- **Europe:** survived winter 2026-27 on price caps plus first rolling fuel restrictions; TTF €50–60; the Qatar LNG loss is permanent; energy policy is a standing political issue in every member state.
- **Russia:** closed fuel system; 40–55% of capacity out, much of it permanent; degraded domestic fuel; the Belarus rail lifeline; Central Asia in crisis.
- **Asia:** Japan on METI mandate releases; Korea drawing; China at the knife-edge — the re-import-vs-release decision is being made now.
- **Price:** Brent mid-$80s to low-$90s; ~$100 cracks; diesel the scarce asset.
- **Shipping:** the shadow fleet is the de facto backbone; war-risk quotes are a daily input; Sidi Kerir/SUMED is critical infrastructure (liftings +33% in 30 days and still growing).

**Month 12 (~September 2027) — the terminal state of the status quo:**

- **The supply base is permanently lower, not interrupted:** crude −1.5–2.5M bpd vs pre-war (the drift-compounded residual of §9B, not the 0.6M structural figure); Qatar LNG −17% until 2029–31; the North Field expansion gone; 30–55% of Russian refinery capacity out, permanently; Abqaiq/South Pars still mid-repair. The branch question is no longer "when does the strait open?" but "how much of the baseline is left when it opens?" — and at month 12 the answer is *less* than at any point since the war began, because every month of drift adds water cut, maintenance backlog (the Barzan restart explosion is the case study), and a compounding turbine queue.
- **Every buffer is now single-use:** the US SPR at 120–230M (pace-dependent), inside the danger band and not refillable within the window at $90+ prices; China's commercial buffer spent or released; Japan's buffer at a post-war low; the ARA trader pool rebuilt only to the floor. The system has consumed its shock absorbers — **the next shock is unabsorbed.**
- **Demand has structurally shrunk:** aviation capacity cut permanently (fuel ~⅓ of operating cost through the winter); European industry shifted to power; the price signal accelerated electrification — the crisis is the largest demand-side restructuring since the 1970s. The hidden legacy: even after supply recovers (ADNOC: late 2027 at the earliest), a meaningful share of the destroyed demand does not come back.
- **China has played its card** (Q1–Q2 2027) — the market either re-spiked and settled or crashed and re-set; the world after the card is a world with a permanent Hormuz framework negotiated under the threat of a 1.2B-bbl release.
- **Recovery takes 18 months even in the good case** — so month 12 lands *midway* through recovery. The world at month 12 is not the pre-war world with a valve reopened; it is a **lower-supply, higher-electrification, rationing-normalized world with a contested strait and an Iranian toll booth that survives every deal.**

### What this extrapolation is (and isn't)

- **It is a stress test, not a forecast.** "Nothing changes" is the least-likely path — the ten breaking points above are discontinuities, and the 12-month window contains all of them. The exercise's value is the *ordering*: it shows the status quo is a path to forced breaks, identifies which variable dominates after each, and shows the terminal state (month 12) is structurally different from the starting state (month 0) even in the nothing-changes case.
- **The most policy-dependent line is the SPR draw.** The entire SPR table assumes the unexplained ~3M/wk continuation. A single DOE announcement flattens it. If the draw re-accelerates to 1.4M b/d (corridor lapse), every date in the table compresses by ~3x — 250M in ~26 days, 180M in ~76.
- **The single most important point:** the status quo cannot last 12 months intact. By month 9 at the latest, either the corridor mechanism or China's buffer breaks — and that break is the largest market event of the war. The prediction markets price it themselves: ~45% odds the status quo ends in "normal" by Jul 1, 2027. The market's own number is an admission of what the arithmetic says.

### Escalation tripwires (what "nothing changes" is hiding)

The status-quo branch is also the *least stable equilibrium*: every actor's incentive points at using the crisis to extract concessions (Iran's six conditions and the toll regime, Russia's energy leverage, the US "tanker-for-tanker" interlock), and **every date in the breaking-points table is an escalation tripwire as much as a market event.**

- **The most likely widening is not a decision but an accident at a dated event:** a tanker on a drifting mine in the corridor-expiry window (the *Sidr* mine strikes; the disputed "all mines cleared" claim), a Russian strike that overruns, a major-flag loss mid-tit-for-tat. The 1987 *Impeccable* incident (US spy ship, four Americans killed) nearly produced exactly this.
- **The "contested but not all-out" precedent is the Tanker War (1984–88)** — hundreds of attacks, mines, Ras Tanura struck, US reflagging and minesweeping — and it ended when one side's patience ran out, not when the physics resolved. War-risk premiums then ran ~5–10% of hull value, the same range the model quotes today.
- **China is the biggest brake** — a Kharg strike or a true full closure blows up Beijing's energy security — but the brake expires with its buffer (Q1–Q2 2027). A stabilizer with an expiration date is a countdown.

So the breaking-points table reads two ways: each row is a market event *and* a widening trigger.
---
## 11B. Second-order effects — food, fertiliser, and the 2027–28 lag (new, Sep 2)

**Framing.** §11 models the energy buffers. Energy is an input, not the final good. The food channel has a **12–18 month lag**, so it does not arrive before the energy crisis peaks — it arrives **on top of the terminal state**. That lag is what turns this from an energy crisis into a food crisis, and it is the reason the §11 month-12 snapshot (Sep 2027) is not the end of the crisis but the *beginning of the food phase*.

### Channel 1 — Fertiliser (the largest, the most delayed)

- Gas is ~⅓ of nitrogen-fertiliser marginal cost (ammonia/urea). TTF ~€50, JKM at all-time highs (~$23/MBtu), and Ras Laffan's 15.6 MTPA of LNG offline until 2029–31 remove both feedstock and export route at once.
- Already visible inside the model: Bangladesh's Ashuganj plant (its largest fertiliser unit) dark a year+, CNG load-shedding peaked at 3,595 MW; India and the Gulf are gas-intensive on the same input.
- **The lag structure:** winter 2026–27 fertiliser prices → spring 2027 application rates → 2027 harvest yield → 2027–28 food prices. The 2027 crop is a **one-shot bet on H1 2027**: farmers plant in March–April with the fertiliser prices of the preceding winter. If the status quo persists into winter, the 2027 harvest is at risk; if the corridor resolves by early spring 2027, it is saved. There is no second chance within the crop year.
- Precedent: the 2007–08 food-price doubling was driven substantially by fertiliser + freight (not just biofuels); the 2022 post-Ukraine fertiliser shock hit the 2022–23 plantings the same way.

### Channel 2 — Freight and logistics (immediate)

- Food is bulky and low value-per-ton — the most freight-sensitive commodity class. Gulf-origin freight +411%, ~$100 cracks, war-risk cover at 7.5–10% of hull or absent, P&I withdrawn: model a **15–30% uplift on food logistics and cold-chain cost bases** (order-of-magnitude, not a published figure).
- Cold chains in tropical importers (Gulf, Bangladesh, West Africa) run on diesel; load-shedding and fuel caps cut shelf life and distribution radius directly, before a single grain of wheat is short.

### Channel 3 — Access/entitlements (the famine mechanism)

- Famines are **access failures, not physical supply failures** (Sen's entitlement approach). The energy shock attacks access from three directions at once: food prices rise for net buyers; wages and employment fall (transport, manufacturing, services); cooking/heating fuel itself becomes scarce (fuel poverty).
- **Exposure map (not a prediction):** Egypt (bread subsidy — a regime variable); the Gulf states (import most of their food; food security is a function of shipping insurance, which is precisely what has broken); Bangladesh/Pakistan (already load-shedding, fertiliser plant dark); North Africa and Sub-Saharan Africa (diesel for everything); Central Asia (Kyrgyzstan at ~6 weeks of fuel reserves, +10–13% price spikes).
- Historical rhymes: 2007–08 (fertiliser + freight → doubled food prices → Horn of Africa famine 2011); 2010–11 (food-price spikes as the proximate trigger of the Arab Spring); 2022 (wheat + fertiliser shock → Global South debt and bread-subsidy strain).

### Timing — the central finding

| Phase | Window | What happens |
|---|---|---|
| Q4 2026 | now → Dec | Freight/logistics costs already embedded in food prices; winter heating competes with fertiliser for the same gas |
| Winter 2026–27 | Dec–Feb | Fertiliser prices peak while §11's breaking points run (SPR < 250M, ARA floor crossed, EU price caps, Russia's first two bans) |
| Spring 2027 | Mar–Apr | Farmers cut application rates — the one-shot bet on an H1 2027 resolution |
| Harvest 2027 | Jul–Oct | Yield damage in gas-dependent regions (wheat, rice); the damage is now fixed |
| **Q4 2027 → 2028** | **the lag lands** | **Food-price spike hits net importers exactly when §11 says buffers are thinnest: SPR under 180M, China's buffer expiring, all three Russian bans live, buffers single-used** |

The food shock lands **on the terminal state, not before it**. It converts a "manageable" energy crisis into a food crisis at the precise moment §11's political tolerance (the rationing tripwire) is about to break — and several of the most exposed net importers (Egypt, the Gulf, Bangladesh) are also *parties to the crisis*, which adds a food term to the "who can absorb this" question and raises the stakes on every escalation tripwire in §11.

### What this extrapolation is (and isn't)

- **Conditional on the same status quo as everything else:** if TTF normalises by spring 2027 (corridor resolved), the 2027 crop is saved and the whole channel attenuates. The lag is a property of *nothing changing*, not of the crisis per se.
- **Substitution absorbs part of it:** urea/ammonia form switching, potash mix, Chinese stockpiles, biofuel policy. The yield response is a range, not a point.
- **The 15–30% freight uplift is a modeling assumption**, not a published number.
- **China/India harvest responses are order-of-magnitude**; Chinese data in particular.
- **Famine is a binary political outcome.** The exposure map is a map of where the entitlements break, not a prediction that they will.

**The one-line version:** energy is the first-order shock; food is the second-order shock that lands 12–18 months later, exactly when the first-order buffers run out. The §11 terminal state is not the end of the crisis — it is where the food phase begins.
## Bottom line (Aug 29)

- The June model's **structure held and its worst call was confirmed early**: the SPR is now *inside* its 300M cavern-damage floor (289.7M, lowest since Dec 1982). The "3 weeks to floor" was right; what it didn't predict is that the draw would decelerate to 0.53M b/d and the market would absorb it.
- **The base case deteriorated from "deal and recovery" to "standoff."** Europe enters winter with diesel at 86% and a GEF base-case December of 75–82% — the winter cliff is no longer the tail, it's the central scenario. On the depletion path, the **physical traders' floor (~8.5–9M bbl ARA gasoil) is crossed ~late October**; the political break — price caps, rationing — will land earlier, because Slovenia and Ireland both broke on *price* in March/April, not scarcity.
- **Brent at $88 remains a false signal.** April's $117 peak and the retail/diesel divergence prove the price was manufactured by releases and demand destruction. The scarce asset is **product** (gasoil, jet, East Coast diesel), not crude.
- **Asia's resilience was underestimated**: Japan (203 days), Korea (>1 year), China (SPR untouched, exports halted). The genuinely exposed Asians are the secondary importers and **Australia, which just lost its excise relief.**
- **The decision window is the corridor's 30–60-day life: it expires into the heating season.** Sep 30 (3.8% odds) vs Dec 31 (31.5% odds) is the market's own summary of how little time there is.
- **Even the good case is an 18-month recovery** (ADNOC: full Middle East flow unlikely before late 2027; IATA: jet recovery takes months even after reopening).
- **(Aug 30) The structure changed: it is no longer one chokepoint with a valve — it is two chokepoints and a refinery front.** Hormuz at 4% + shadow corridor; Saudi Red Sea at 64K bpd (−97%); Russia at record strike pace with bans into 2027. The Oct/Nov base case is now: **US East Coast diesel at 8–10 days' cover by mid-November, visible European shortage mid/late October, Asia burning buffers 10–15% faster.** The one move that improves everything: corridor extension + a China–Houthi safe-passage lane.
- **(Sep 2) §11 extrapolates the status quo: it is not a steady state — it is a path of ten dated breaking points, all inside 12 months.** Russia's ban cascade (Sep 30/Nov 30/Jan 31), the corridor's 30–60-day lifespan, the SPR crossing the 180M hard floor in Q1–Q2 2027, and China's commercial buffer expiring Q1–Q2 2027 — the last one forces the re-import-or-release decision that ends the standoff. **The status quo cannot last 12 months intact; by month 9, either the corridor or China's buffer breaks.**
- **(Sep 2) §11B adds the missing axis: food.** Fertiliser (gas ≈ ⅓ of nitrogen cost; Ras Laffan dark until 2029–31; Ashuganj already dark a year) + freight +411% + entitlement collapse → a **2027–28 food-price spike landing 12–18 months after the energy shock — i.e., on top of the terminal state, not before it.** The 2027 crop is a one-shot bet on an H1 2027 resolution. The Sep 2027 snapshot is the beginning of the food phase, not the end of the crisis.
- **(Sep 2) The fourth front enters the model.** Russia's calibrated hybrid attacks on Europe (WSJ, Sep 2 — Leipzig drone on a Ukrainian cargo aircraft, power-station attacks, 20 attributed sabotage incidents last month) mean the §7B ban cascade's severity is a **dial European politicians control**, not exogenous weather — the refinery damage is a war aim funded by the €90B package. "No Russia→Europe threshold-crossing" is the least stable premise in §11, and the breaking-points table gains row 11: the only one with no date.
- **(Sep 7 / Day 189) The crisis re-escalated in both theaters at once, and the base case hardened.** A US–Iran **tanker war began** (US destroyed 1 / disabled 2 Iranian tankers; IRGC ballistic missiles hit a US carrier and destroyer; Iran vowed Sep 7 to strike "energy infrastructure across the Middle East"); **OPEC+ paused four consecutive production hikes** (October flat at 31.01M bpd — the first policy change in the crisis; spare capacity is trapped, not withheld); Brent +11% in five days to a six-week high ($97.89); and **US retail diesel set an all-time record** ($5.85 Sep 4, $5.90 Sep 7) — the political-break tripwire (Slovenia/Ireland precedent: governments act on *price*) has now crossed on the US side too. Russia's #2 refinery (Kirishi) is fully halted with >50% of gasoline contracts unfulfilled as the Sep 30 ban lands in three weeks; Saudi August exports are at a nine-year low. Polymarket: "normal by Sep 15" = 7%. **The §11 dated breaking points have shifted earlier, not later — the status quo is now the least stable branch, not the base case's opponent.**
- **(Sep 8 / Day 192) The Red Sea front crossed from shipping to processing.** Houthi strikes (Sep 7–8) brought **Aramco's Jazan refinery (~400 kb/d — the kingdom's largest) aflame and off line (WSJ)** after the Aug 9 hit, plus Aramco facilities in Abha and Najran and King Khalid Air Base (73 injured; Saudi retaliation vowed). This is the second Saudi processing loss after Abqaiq (Jul 27) — and it lands on the *bypass*, the very route the Houthis are blocking. **The dual-chokepoint coordination is now explicit: the Red Sea is the coordinated strike on the alternative to Hormuz, not an independent front.** The US blockade is quantified (Iranian floating crude 29M, from ~90M in mid-July, Kpler). ANZ Research — "a prolonged standoff, punctuated by calibrated military action… constrained through the rest of 2026" — is the base case in an analyst house's words. **The base case is confirmed, not overturned; the Jazan loss adds a repair clock to the §9B damage inventory, and the breaking-points cascade is untouched — the escalation changes the pace, not the sequence.**

---

## Sources & caveats

### Sources
- **Sep 8 / Day 192 — Houthi strikes on Saudi energy (WSJ, Sep 8 + Guardian/NPR/CBC/AP):** WSJ (Sep 8) — Houthi drones/missiles on four Saudi cities (Sep 7→8): Aramco's **Jazan refinery (~400 kb/d, kingdom's largest; gasoline + ULSD) aflame and off line** (repeat strike after Aug 9 "diminished" output); Aramco facilities in **Abha (+ power plant) and Najran**; **King Khalid Air Base (Khamis Mushait)** hit; Jazan airport attack failed; 73 injured (women/children); Saudi "take all necessary measures" retaliation; **Iranian floating crude ~29M bbl (from ~90M mid-July, Kpler)**; **ANZ Research: "prolonged standoff, punctuated by calibrated military action… Persian Gulf supply remain constrained through the rest of 2026"**; Brent $98.62 (+1.7%, touched >$99), WTI $93.97 (+2.7%); **Guardian/NPR/CBC/AP (Sep 8)** — corroborate Abha + Najran + Khamis Mushait airbase, 73 injured, Jazan "damaged in an attack weeks ago," Brent "above $99"; **Guardian (Sep 8)** — Iran "maritime exclusion zone" from US blockade perimeter through strait into Gulf; MBS "extremely uncomfortable dilemma" (Krieg); Houthi spokesman Yahya Saree blames Riyadh's Yemen airstrikes
- **Sep 8 / Day 192 (corroborated, same window) — OPEC production, Iran exclusion zone, Saratov, South Korea:** **Bloomberg (Sep 8)** — OPEC August crude output fell **900K bpd to 19.91M**, snapping a 2-month recovery (survey-based); **CBS/AP/AFP (Sep 8)** — Iran's SNSC head: Tehran "planning to announce" a **Hormuz "exclusion zone" outside the strait** (stated policy, not yet in force; US calls it "a total lie"); Iran claims **capture of a US unmanned submarine** (IRGC, **unverified**); IRGC claims **3 US-linked ships hit** (US: neither warship impacted, 3 Iranian tankers disabled); **US sanctioned 20+ Iranian airlines** (Operation Economic Outcast); **South Korea sent a fact-finding team to Hormuz** (no troops); **Kyiv Post/Kyiv Independent (Sep 8)** — **Saratov (Rosneft, 4.8 mt/yr) hit 4th time this year**, 3-refinery drone blitz (Perm, Tatarstan, Sep 7), 10 injured incl. 3 children; **tradingeconomics/Brecorder/CBS (Sep 8)** — Brent settled **$97.13** (six-week high since Jul 24), WTI **$92.63**, intraday >$99
- **Sep 7 / Day 189 — OPEC+, prices, tanker war:** Reuters (Sep 6) — OPEC+ held October quotas flat at 31.01M bpd, four consecutive monthly increases paused, focus shifts to 2027 quotas (7-member group: SA, RU, IQ, KW, KZ, DZ, AE); Reuters (Sep 7) — Iran vowed to strike "energy infrastructure across the Middle East" (statement; US facilities "sprawling, accessible and exposed"); Bloomberg (Sep 7) — Brent $97.89 (six-week high), WTI $92.30; ABC News/Reuters (Sep 4–6) — US destroyed 1 and disabled 2 Iranian tankers (Kharg, Jask) after IRGC ballistic missiles hit a US carrier and destroyer; IRGC claimed attacks on 3 tankers + 3 US vessels; Windward (Sep 6, via straits.live) — 12 Hormuz transits; Kpler — 10-day average ~10 vessels/day (lowest since May), 404–436 vessels anchored, crisis pressure 90–92, escalation gauge 52–53; TASS (Sep 3) — >50% of Russian gasoline contracts unfulfilled; Moscow Times — Kirishi (KINEF, 16M t/yr) fully halted, 2 primary distillation units damaged + 2 already offline; Russian oil/gas revenue −45.4% YoY (Q1, official); Bloomberg (Sep 2) — Saudi August crude exports at nine-year low; Houthi "blockade of Saudi navigation" + announced attacks on Saudi/Gulf energy facilities (Sep 2); AAA (Sep 4–7) — US retail diesel $5.78 → **$5.85 all-time record** (above June 2022 peak) → $5.90; EIA Gasoline & Diesel Fuel Update (w/e Aug 31) — US $5.599, PADD1 $5.448, CA $7.218; Polymarket (Sep 7) — "Hormuz normal by Sep 15" = 7%; voi.id (Sep 6) — corridor deal "near" (single-source, unverified); EIA WPSR (w/e Aug 28, released Sep 2) — crude 424.5M, gasoline 205.7M, distillate 104.2M, SPR 286.6M (−3.1M WoW → ~443K b/d)
- **Sep 2 / Day 184 — official traffic sources:** IMO hot-topic page (imo.org) — avg daily transits chart (31 Aug), incident list updated 2 Sep, evacuation framework paused (136 vessels / 2,900 seafarers in June; ~20,000 seafarers in region); UKMTO/JMIC weekly (28 Aug) — 204 full transits in 7 days (101 out / 103 in ≈ 29/day), ~90% below pre-conflict, 23 projectile incidents since 6 Jul, 16/18 on southern Omani route, threat "severe"; IMF PortWatch chokepoint6 (via straits.live Day 186, Sep 2 1957Z) — Aug 30: 6 transits, Brent $95.57 / high $96.73, crisis pressure 92, escalation gauge 52, 80 AIS-dark tankers/24h; pre-war baseline spread: 85 (PortWatch) / ~100 (CNN, Al Jazeera) / 130–140 (Reuters-cited) / ~153 (hormuzmonitor); NBC News live tracker (Sep 2) — "traffic back down following a brief pick-up"; Kpler (Aug 31) — 8.6M bpd Hormuz transit (disputed, see caveats); Axios (Sep 2) — first US strikes on Iranian tankers, "tanker for tanker" policy, southern-lane claims; Marisks via Bloomberg (Sep 1) — two supertankers struck by projectiles exiting strait; CENTCOM (Sep 1) — IRGC strikes; NSJ (Aug 31–Sep 1) — Larak Island strikes, Jordan/UAE base strikes, Iran–Oman no-military-vessels talks, IRGC mine claim (CENTCOM: false);
- **14-day deep dive (Aug 19 – Sep 2):** EIA WPSR w/e Aug 14 (crude 428.8M, gasoline 209.4M, distillate 105.6M) and w/e Aug 21 (distillate 103.4M record seasonal low, utilization 97.4%, distillate production 5.1M bpd) via BOE Report/IndexBox/OilPrice/PrimeXBT; API w/e Aug 21 (+4.2M crude) and w/e Aug 28 (−2.6M crude; distillate −0.3M vs EIA +0.8M) via OilPrice/Seeking Alpha; RBN Energy (Sep 2) — lowest end-August distillate since April 2005; OilPrice (Sep 1) — SPR 250–300M "operational minimum"; ENGINE (Aug 28, Insights Global/Vortexa) — ARA fuel oil 4.62M (+15% MoM), gasoil 12.07M 4-yr low, gasoil imports 156K (US 36%); Lloyd's List Intelligence via USNI (Aug 28) — 114 Hormuz transits Aug 17–23 (+30% WoW, prior week 73); LLI brief (Aug 19); UK P&I Circular 15/26 — Red Sea war-risk cancellation effective Aug 16; Noah Intelligence (Sep 1) — war-risk 7.5–10% of hull, 39-day stale, Polymarket 3/26/55%; Benzinga (Aug 28) — Frontline record $659M Q2, Q3 VLCC TCE $156,900/day 86% covered; Business Insurance (Aug 26) — war-risk rates, JWC listing conditions; FT via Newsquawk (~Aug 26) — Saudi state-backed war insurance talks; Tradewinds/DeepDraft/JMIC-UKMTO (Aug 27 – Sep 2) — named vessel incidents (Kuwaiti tanker, Sidr ×2 mines, Bahri VLCC, Senegal Prosperity, Amzan); OilPrice/Rigzone/Breakwave (mid–late Aug) — Sidi Kerir +33% in 30 days, Korea/Idemitsu rerouting; Mighty Shipping — IMO denial of "mines cleared," Bessent sanctions, TotalEnergies $20M transit cost; Reuters/R. Bousso (Aug 18) — Hormuz ~2.0 mb/d (Kpler) vs 4.8 July avg, Iran 294 kb/d, total ME exports 9.5 mb/d in Aug; priceofoil (Aug 13) — EIA STEO $87/Q4 $78, IEA −4.3 mb/d, OPEC 4th demand cut, LMA toll clause, Iran's six conditions, Aramco OSP $2.00 below ODU (lowest since Jun 2020), Kharg idle, Goldman/JPM scenario banding; JPM Global Research (Jul 21) — end-2026 $78; WSJ (~Aug 19) — diesel shortage "about to get worse"; OilPrice/I. Slav (~Aug 20) — Currie "nobody consumes crude oil," Kpler UAE exports up, ADNOC 15 vessel attacks, Iraq–Syria pipeline 4 years/$15B; Kpler blog + Canada LNG Group (Jul 24 – Aug 31) — TTF ~€50/MWh, JKM ~$23.17/MBtu; Economic Times (~Aug 20) — WoodMac Asian gasoline ~197M bbl below 5-yr avg; UA.NEWS (Sep 2) — Kirishi halted; HamerIntel (Aug 30) — Kirishi strike; Moscow Times/Ukrinform (Sep 1) — Ust-Luga refinery + port; Euronews (Aug 20) — 28% of stations, Moscow 90% out of AI-92, FAS 41 cases, SPIMEX Euro-2/3/4, Belarus +25x, Murmansk import-price standoff; Wikipedia "2025–2026 Russian fuel crisis" (accessed Sep 2); TBS/Ittefaq (Aug 25–31) — Bangladesh CNG load-shedding 3,595 MW; Travel and Tour World (~Sep 1) — China Big Three airlines $1.21B loss; TASS (Aug 31, Sep 2) — OPEC+ Sep 6 11:00 GMT, +188K final tranche, Novak; TBS/AFR (Aug 23) — Australia permanent emergency fuel subsidy powers; DKV Mobility (~Aug 26) — Swedish excise cut ends Sep 30; AAA (Sep 2) — $4.1203; PetrolPulse (Aug 24) — Australia 205.1/252.2 c/L; WSJ / D. Michaels, B. Benoit, L. Norman (Sep 2) — Russia hybrid attacks on Europe: failed Leipzig drone strike on a Ukrainian cargo aircraft, arson on arms factories, two power-station attacks, 20 attributed sabotage incidents last month (highest monthly tally since 2022), NATO "testing the ability to hold back" threshold framing, €90B Ukraine package, Berlin's calibrated response
- **US (weekly, precise):** EIA WPSR (w/e Aug 28, 2026 — crude 424.5M, gasoline 205.7M, distillate 104.2M, SPR 286.6M, 4-wk demand 20.4M b/d) and CSV tables (w/e Aug 21, 2026) — balance sheet, crude/gasoline/distillate/jet by PADD, monthly retail (Table 14) and spot (Tables 11–12); API preliminary w/e Aug 28 (crude −2.6M — differs from EIA); EIA today-in-energy #67504 (SPR 409M as of Apr 10, post-release)
- **Hormuz (live):** straits.live (Day 181, Aug 29 1341Z) — PortWatch 3 transits (Aug 23), 380 vessels holding, insurance 40×; GEF daily log (Aug 14–29) — corridor, Economic Outcast, mine clearance, Goldman 15–16M b/d
- **Europe (Aug 30 + Sep 2):** GEF EU forecast (late Aug) — scenario weights 50/25/~20, December diesel 75–82%; Insights Global via INDEXBOX/ENGINE (Aug 24) — ARA gasoil 11.90M bbl 4-year low, fuel oil 4.41M, imports 148k b/d; Vortexa via ENGINE (Aug 26) — ARA fuel-oil imports 363K bpd August (2× July), Benin 26%/Venezuela 15%/France 9%; moomoo/Argus (Aug 27) — ARA market splitting: fuel oil piling up coastal, inland Germany short; INDEXBOX (Aug 31) — NW Europe gasoline margins highest since mid-2022, Rotterdam +$24–53/mt in a week; Vortexa cargo flows; lowdown.today (Jul 15 ARA gasoil 13.48M)
- **SPR:** EIA WPSR (289.7M, w/e Aug 21); Reuters (Aug 24, lowest since 1982); GAO (680M capacity); DOE (4.4M b/d max drawdown; ~70M safe min via GEF/CNBC); GEF (~250M operational floor)
- **Global:** IEA (400M-bbl coordinated release from 32 countries; "largest supply disruption in history"; 1.3B bbl lost; Q2 demand −5M b/d YoY); Wikipedia "2026 Iran war fuel crisis" (compiled from Reuters/Bloomberg/FT/Guardian/AP/NYT, through Aug 2026)
- **Asia:** METI (Mar 24 & Apr 15/24 release announcements; June 2026 stockpile = 203 days via OpenGov.jp, Aug 2026 publication); Korea Times/S&P Global/Seoul Economic Daily (12M release via mandate cut, May 28); NYT (Jun 15/21 — China 1.4B bbl reserves, SPR untouched, exports halted; Aug 18 — Gulf storage expansion); AGBI (SG −29%, KR −23%, MY −41%); Japan Times (Mar 17 rerouting)
- **Prices:** EIA monthly spot/retail 2026; AAA national avg $4.090 (Aug 28); ACCC (petrol 193.6, diesel 232.8 c/L); straits.live Brent $88.10
- **Prediction markets:** straits.live aggregate (37 markets): Sep 30 = 3.8%, Dec 31 = 31.5%, US invasion = 13.5%
- **Red Sea (Aug 30):** Kpler factbox "Red Sea crude flows, Bab el-Mandeb, and alternative routes" (Aug 15) — Yanbu crude exports 4.14M (Jun), Sidi Kerir loadings 1.3M, SUMED 2.5M cap / 3.4M theoretical; The National (Aug 28, "Six months of war leaves Gulf oil trapped between two chokepoints") — Bab el-Mandeb 2.4M (Jul) → 64K (Aug), Gulf exports 3.6M (−82%), by-country detail, UAE/OPEC, infrastructure strikes; JMIC (transits −40%); Reuters/Fortune (East–West pipeline 7M bpd record, Mar 28); houseofsaud (Yanbu wartime loading 3–4M, citing Vortexa/Argus); NYT (Aug 5), JPost (Aug 29), CNBC (Aug 12 — Nasser on SUMED/Suez optionality)
- **Russia (Aug 30 + Sep 2):** Euromaidan Press (Aug 27) / UNITED24 / hamerintel — all major Lukoil offline (Perm Aug 21, NORSI Aug 26); Bloomberg (Aug 25, Aug 29) — record August strikes (21+), ban extension; Reuters via UA.news (Aug 26) — non-producer gasoline/diesel ban to Jan 31, 2027, jet to Nov 30, 2026; Moscow Times (Aug 29) — >30% of actual refining capacity offline, petrol output ~70% of summer consumption, queues in Moscow/Moscow Oblast; Wikipedia "2025–2026 Russian fuel crisis"
- **Demand (Aug 30):** IEA Oil Market Report August 2026 (Aug 12) — 2026 demand −1.6 mb/d (prior −1.0), throughput 80.9 mb/d (~5 mb/d below normal), 2026 supply −4.3 mb/d, Q4 deficit 1.8 mb/d; OPEC MOMR August 2026 (Aug 12) — 2026 growth cut 800 → 580 kb/d; IATA + SWAPA State of the Airline Industry Q2 2026 — global ASK −1.3%, fuel ~⅓ of operating costs, $350B spend; EIA STEO August 2026 (Aug 11) — US runs ~17 mb/d through August, utilization cuts Sep–Oct
- **China (Aug 30):** EIA Today in Energy (Jul 2026) — 2Q26 imports 8.1M bpd, −32% QoQ; CNBC (Aug 7) — July 35.73M t (~8.9M bpd), 3-month high off near-decade low; China Customs via ABC/Yahoo/Washington Times (Aug 7) — Jan–Jul volume −13.2% YoY; Wikipedia "Strategic petroleum reserve (China)" + Middle East Eye (Aug 23) — est. 1.2B+ bbl "could last at least a year", official SPR unchanged through June, commercial stockpiles + product export halt; National Security Journal (Aug 16) — 1.4B est.; Hindustan Times/Mint (Aug 29) — 1.0–1.4B est. ≈ 120 days of imports, stockpiling from 2024 at ~1–1.2M bbl/d. **All Chinese inventory figures are estimates; China discloses none.**
- **Infrastructure damage (Sep 2, §9B):** Al Jazeera (Aug 30, "Mapping the Iran war's strikes on Gulf energy") — ACLED 172+ non-military strikes, 48% energy/power/desal; Rystad (Choudhary): Trains 4 & 6 ~13M t / 3–5 yrs / $3B, US majors gas −40% / oil −30–35%, Exxon Q+UAE = 20% of upstream / H1 upstream earnings −$1.3B / Qatar LNG 13→4M t, Conoco 2.5→1.0M t, Barzan, Sarsang, Shah, Upper Zakum Mar–May; QatarEnergy/Al-Kaabi (Mar 19) — export capacity −17%, $20B/yr, 3–5 yr repair; S&P Global (Mar 19) — force majeure on long-term contracts; Bloomberg (Jul 7) — shut-in peaked 11.2M bpd May → 1.4M Q4 2026, majority back by Q1 2027; The National (Aug 11) — US: ~600K bpd disruption through end-2027; The National (Jul 30) — Shell: repairs until Q1 2027; Caliber.Az / Times of Israel / RT (Jul 27–29) — Abqaiq full halt + emergency flaring, ~7M bpd processing offline; NaturalNews (Aug 31, citing Iranian MoP) — South Pars 40% restored; Wikipedia "2026 South Pars field attack" (Mar 18, 12% of Iran's gas); SIL Safe (Jul 18) — Barzan restart explosion, 13 killed; OilPrice (Jun 22–26) — empty LNG carriers massing, exports edging back "despite ongoing force majeure"; Forbes/M. Lynch (May 4) — water encroachment / water-cut mechanism on restarted wells; Macquarie via Reuters (Apr 10) — 136M bbl stranded in the Gulf

### Caveats
- **Traffic data sources — use the intergovernmental ones, not the press.** Three quasi-official series exist, and they disagree in level but not in conclusion:
  - **IMO (UN agency)** — imo.org "Middle East / Strait of Hormuz" hot-topic page: average daily transits chart (updated 31 Aug; image-only), **incident list (updated 2 Sep)**, seafarer evacuation framework (136 vessels / ~2,900 seafarers evacuated in June; **currently paused**; ~20,000 seafarers still in region). IMO states its data is "an average based on several available sources... for general awareness only."
  - **UKMTO / JMIC (UK Ministry of Defence)** — weekly Gulf situation reports + daily incident reports (ukmto.org). Week to 28 Aug: **204 full transits (101 outbound + 103 inbound) ≈ 29/day**, "about 90% below pre-conflict levels," 23 projectile-strike incidents since 6 Jul (16 of 18 on the southern Omani route), tankers 45% of movements, JMIC threat assessment: **severe**. UKMTO's count is the highest independent series because it includes satellite-detected dark vessels; its 29/day reflects the late-August pick-up that has since reverted.
  - **IMF PortWatch (IMF/World Bank/UNCTAD)** — open platform, satellite + AIS, "chokepoint6" dataset; source of the 3–6 transits/day (23–30 Aug) and the ~85/day baseline. Counts AIS-broadcast crossings only.
  - (US 5th Fleet/CENTCOM statements exist but are a party to the conflict; Kpler/Vortexa/Windward are commercial.)
  - **The pre-war baseline itself is source-dependent:** ~85/day (IMF PortWatch), ~100/day (CNN, Al Jazeera), 130–140/day (Reuters-cited maritime tracking), ~153/day (hormuzmonitor). The difference is what gets counted (AIS-only vs all vessels incl. small craft). **Conclusion is baseline-invariant:** 3–29 transits/day today is 85–97% below *any* published pre-war baseline.
- **The Hormuz flow figures are a range, not a number, and the range is the story:** verified AIS (IMF PortWatch) shows 3–6 transits/day; UKMTO's satellite-assisted count shows ~29/day (week to 28 Aug, now reverting); Kpler (8.6M bpd, Aug 31) and the US administration (10M bpd) claim substantially higher via dark operators and ship-to-ship relay; Goldman's earlier 15–16M bpd is the outer bound. The gap between claimed and verified flow is itself a data point: **whatever is moving is moving in the shadows**, and the Sep 2 "tanker for tanker" escalation puts even the claimed flow at risk. Model on the verified floor (3–29 transits ≈ 0.3–1.0M bpd + an unverifiable dark component), not on any claimed number.
- **API vs EIA w/e Aug 28:** API preliminary showed crude −2.6M, gasoline +0.3M, distillates −0.3M; EIA official showed crude −4.45M, gasoline −1.17M, distillates +0.8M. EIA is used throughout. The divergence is within the noise of import/receipts data but the direction (EIA drawing more crude, building more distillate) is consistent with product-import substitution.
- The **~300M / ~180M floor thresholds** are petroleum-engineering estimates, **not published DOE figures** — but the 300M level was *crossed* in the data without a reported cavern event, which is weak evidence the true floor is lower (GEF's ~250M operational and DOE's ~70M minimum are the better anchors now). Treat ±50M uncertainty as before.
- **SPR "lowest since Dec 1982/1983"** — the exact comparison month varies by source (Reuters says 1982; straits.live says 1983); the level (289.7M) is the EIA number.
- **Transit counts are methodology-dependent:** PortWatch counts AIS-broadcast crossings only (3/day); GEF's ~15/day and Goldman's 15–16M b/d include dark operators. All are far below the 85/day (≈22–24M b/d) pre-crisis baseline. The Sep 6–7 commercial single-day figures (Windward: 12; Kpler 10-day average: ~10) are *data points inside* the 3–29/day verified band, not a new baseline — and the 404–436 anchored vessels are the more stable signal: the fleet is waiting, not gone.
- **US diesel "all-time record"** is the AAA national-average *retail* daily survey (Sep 4: $5.85, above the June 2022 peak). The EIA's official weekly average is lower (w/e Aug 31: $5.599) because the surge is concentrated in Sep 1–7, after the strikes resumed — the two series measure different things and the record is real in the retail series, not the wholesale one.
- **Days-of-cover** ignores production (extends) and demand destruction (extends).
- **Europe scenario table** interpolates GEF anchor points — illustrative, not a weekly series.
- The **ARA gasoil depletion path** (Section 7) is an interpolation: the observed summer draw (~0.26M bbl/wk) plus an assumed 50–100% heating ramp; GEF publishes the December availability endpoint (75–82%) but not a weekly stock series. Treat the late-October floor crossing as **±3 weeks**. GEF's "availability %" (demand cover) and the bbl figure (buffer) are different metrics; both point at the same window.
- **ARA gasoil** (11.90M bbl) is independent-sector stock; total including majors is higher but the trend is what matters.
- The IEA release's **US share (172M bbl)** is from GEF/DOE reporting; EIA's own Apr 10 level (409M) is consistent with it.
- **Infrastructure-damage figures (§9B):** the ~7M bpd Abqaiq-offline number comes from social-media-derived reporting (satellite imagery confirms damage + flaring; Aramco has not published a processing-offline figure) — treat as an upper bound; the 2019 precedent recovered 5.7M bpd in ~7 days. The South Pars "40% restored" is an Iranian MoP self-report via secondary press, not independently verified. The EIA 11.2M → 1.4M bpd path is a *projection* conditional on strait status and strike pace, not a measurement. Qatar's 17% capacity loss is a floor, not a ceiling — restarts have already slipped twice (June Barzan explosion; Shell's Jul 30 "until Q1 2027").
- I am a coding agent, not an energy analyst; verify load-bearing numbers against primary sources before acting on this.
