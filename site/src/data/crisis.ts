// Dashboard data — single source of truth. Update here after each research pass.
// All figures sourced from the research project (`../research`) — each array's
// comment carries its source and as-of date.
//
// Data policy: verified observations only, no interpolation. Every chart point is a
// real observation with a source; `approx: true` marks a source's rounded estimate
// (e.g. "Brent near $80 on Jun 22") and renders as a hollow marker.

export const DATA_AS_OF = "2026-11-12";
// War began Feb 28, 2026 (report: "Pre-war (Feb 28)"; ACLED damage inventory "since Feb 28"; IEA supply loss "since Feb").
// Day count = days elapsed since Feb 28 → Sep 9, 2026 = Day 193.
export const CRISIS_DAY_1 = "2026-02-28";
export const MODEL_DAY_1 = "2026-06-30"; // depletion model established

export interface SeriesPoint {
  date: string; // ISO date of observation
  value: number;
  approx?: boolean; // source gave a rounded estimate
  note?: string;
  tip?: string; // short tooltip-only label; the tooltip shows tip when set, else note
  fred?: boolean; // true = value from the FRED weekly spot series; unset/false = futures close or settlement (tooltip source labels derive from this)
}

// ---------- Brent, $/bbl — 2026 YTD (observed points) ----------
export const brentYtd: SeriesPoint[] = [
  { date: "2026-01-15", value: 70, approx: true, note: "pre-crisis (est.)" },
  { date: "2026-02-27", value: 76, approx: true, note: "pre-closure level" },
  { date: "2026-03-08", value: 100, approx: true, note: "first >$100 in four years (closure Mar 4)" },
  { date: "2026-03-18", value: 126, note: "intraday peak — March +65%, largest monthly rise on record" },
  { date: "2026-04-20", value: 95.48, note: "settle · ceasefire hopes mid-April" },
  { date: "2026-06-22", value: 80, approx: true, note: "diplomatic signals, partial reopening" },
  { date: "2026-06-30", value: 74, note: "Day 1 of the model" },
  { date: "2026-07-31", value: 83.76, note: "July monthly avg (EIA, Sep 9)" },
  { date: "2026-08-29", value: 88.1, note: "" },
  { date: "2026-09-02", value: 95.57, note: "Nov/May spread $14.19 — contango widening" },
  { date: "2026-09-04", value: 95.7, note: "settle +$3.66 · tanker war begins" },
  { date: "2026-09-08", value: 97.13, note: "Settlement; Business Recorder reports $97.92 instead. The difference is unresolved." },
  { date: "2026-09-09", value: 100.71, note: "settle +$3.58 · intraday high $101.25" },
  { date: "2026-09-10", value: 108.03, note: "close +$6.82 in a day (Yahoo front-month; Convex cross-check)" },
  { date: "2026-09-11", value: 104.61, note: "settle −2.8% (CNBC)" },
  { date: "2026-09-14", value: 105.68, note: "closing price (Yahoo, corrected Sep 15)" },
  { date: "2026-09-15", value: 108.75, tip: "Closing price (Yahoo, nearest-month futures contract; corrected from $108.50)", note: "closing price (Yahoo front-month; corrected from $108.50). Before the shutdown, the East–West pipeline carried about 4M barrels a day to Yanbu, according to Reuters. Stored oil at the port was estimated to cover 5–7 days of exports." },
  { date: "2026-09-16", value: 105.83, tip: "settlement · down 2.7% (CNBC)", note: "Settlement down 2.7% (CNBC). Prices fell as the US energy secretary called the pipeline outage 'brief and temporary,' 'measured in days.' Officials and analysts point to weeks; no official damage assessment or repair schedule has been published." },
  { date: "2026-09-17", value: 104.82, tip: "settlement · down 1.0% (Yahoo front-month)", note: "settlement (Yahoo front-month; −1.0% vs Sep 16). A second straight down session in the settlement series as Saudi bypass hopes — the 20M-barrel ship-to-ship sale and pipeline repair targets — eased disruption fears (Reuters/CNBC; CNBC framed it as the 'third day')." },
  { date: "2026-09-18", value: 103.87, tip: "settlement · down 0.9% (Yahoo front-month; also reported by CNBC)", note: "settlement (Yahoo front-month; −0.9% vs Sep 17; CNBC concurs). A third straight down session; the week finished roughly flat. JPMorgan: Middle East flows averaged ~17M b/d over 10 days, and satellite imagery shows ~2.8M b/d moving through Hormuz over six days. Rapidan: the pipeline outage will constrain Saudi exports through at least the end of September." },
  { date: "2026-09-21", value: 100.34, tip: "settlement · down 3.4% (Reuters)", note: "settlement (Reuters, November contract; −3.4% vs Sep 18). A fourth straight down session and the lowest since Sep 9. Both presidents arrived in New York for the UN General Assembly; no meeting between them has been confirmed. Saudi Arabia is again shipping oil through the strait (WSJ: ~2.4M b/d over the past two weeks, per Kpler)." },
  { date: "2026-09-22", value: 99.25, tip: "settlement · down 1.1% (Yahoo front-month; news: below $100)", note: "Session close (Yahoo, November front-month; −1.1% vs Sep 21) — the first close below $100 since Sep 8 (Reuters) and a fifth straight down session. Drivers: the first acknowledged US–Iran contact since June (Witkoff and Kushner met Araghchi on the UN margins, Sep 22) and the East–West pipeline restart. News: Brent fell below $100 on Tuesday (OilPrice/Reuters; TradingEconomics: 'fell to $99')." },
  { date: "2026-09-23", value: 103.08, tip: "settlement · up 3.9% (Reuters)", note: "Session close (Yahoo, November front-month; +3.9% vs Sep 22) — five straight down sessions reversed and the first close back above $100 (Reuters). Drivers: Iran's security-council secretary gave Washington four to five days to accept Tehran's seven conditions, a written road map (up to 60-day regionwide ceasefire, phased strait reopening) produced no announced breakthrough from the second New York round, and a Supreme Leader adviser said the war could extend to the Indian Ocean." },
  { date: "2026-09-24", value: 106.60, tip: "settlement · up 3.4% (Yahoo front-month) · intraday high $108.23", note: "Session close (Yahoo, November front-month; +3.4% vs Sep 23; intraday high $108.23). The strait's risk premium came back: the Houthis fired the first missiles at Saudi territory since the pause began (six ballistic missiles at Taif and Yanbu, all intercepted), France said it would send troops and air-defence systems to protect the Red Sea port of Yanbu, and Iran's security-council secretary restated the four-to-five-day deadline in harder terms — 'talk is enough, negotiations are enough, now we must act.' Prices retreated in the afternoon from the intraday high on Iran's seven-day road map to reopen the strait (Araghchi; NYT)." },
  { date: "2026-09-25", value: 104.32, tip: "settlement · down 2.1% (Reuters)", note: "Settlement (Reuters; −$2.28 vs Sep 24) — a third straight close above $100 and a small weekly gain. Friday's decline: hopes that the US and Iran could negotiate a phased path toward ending the war and reopening the strait outweighed worry over the Houthis' escalating attacks on Saudi oil facilities (Reuters). The Wall Street Journal reported the rejection of Iran's seven-day proposal after Friday's settlement. Watch how prices respond when futures trading resumes." },
  { date: "2026-09-28", value: 105.28, tip: "settlement · up 0.9% (Reuters)", note: "Settlement (Reuters, November contract; +$0.96 vs Sep 25, +0.9%) — a fourth straight close above $100. Brent jumped toward $108 in Asian trading on Monday after the rejection of Iran's seven-day proposal, then eased. Foreign Minister Araghchi met Qatari mediators on Sep 28 in separate sessions and said Iran expects an official US response to the amended proposal on Sep 29; the Houthis vowed 'severe consequences' for Saudi Arabia after strikes on a Taiz market (Sep 27–28)." },
  { date: "2026-09-29", value: 102.59, tip: "settlement · down 2.6% (CNBC)", note: "Settlement (CNBC; −2.6% vs Sep 28) — a fifth straight close above $100. The decline tracked the recovery in Saudi Red Sea exports: satellite imagery showed tankers loading some 12.5 million barrels at the Yanbu and Muajjiz terminals on Sunday (Kpler, via AP), and Kpler's strait flow ran at a seven-day average of 13.2 million barrels a day through Sep 23, about three-quarters of pre-war (CNBC, Sep 25)." },
  { date: "2026-09-30", value: 103.50, tip: "settlement · up 0.9% (Fox News)", note: "Settlement (Fox News; +0.9% vs Sep 29) — the November Brent contract's sixth straight close above $100 and its final trading day. WTI's November contract settled at $90.42, up 1.2% (Fox News). On Oct 1, Brent's December contract traded near $96–97, then rose above $100 after reports of China's fuel export suspension (CNBC). Its gain of over 2% was against December's own prior settlement; the change of contract accounts for part of the apparent drop from November's $103.50." },
  { date: "2026-10-01", value: 102.31, tip: "settlement · up 4.4% on the December contract", note: "Settlement (December contract; the BZ=F daily bar matches the settlement feed) — +$4.28 vs the December contract's own Sep 30 settlement of $98.03, a seventh session close above $100. The Nov contract had settled at $103.50 on Sep 30, its final day, so part of the step down from the Sep 30 point is the contract switch, not a price move." },
  { date: "2026-10-02", value: 102.25, tip: "settlement · down $0.06 (Reuters)", note: "Settlement (Reuters, December contract; −$0.06 vs Oct 1) — an eighth session close above $100. Brent fell briefly below $100 intraday (low $98.43) when the G7 announced its reserve release, then recovered (BBC). Drivers: the G7 agreed to release up to 100M barrels over four months, and Reuters reported that Saudi Arabia is planning an assault on the Houthis (Oct 2)." },
  { date: "2026-10-05", value: 100.32, tip: "settlement", note: "Settlement · Yahoo BZ=F closing price: $100.32 (matches)." },
  { date: "2026-10-06", value: 100.58, tip: "settlement · up 0.3% (Rigzone)", note: "Settlement (Rigzone, December contract; +$0.26 vs Oct 5) — a tenth session close above $100. The session fell as low as the high-$97s in the morning after the WSJ reported Kpler's seven-day strait average at 10.3M barrels a day (76% of pre-war), then recovered into the close." },
  { date: "2026-10-07", value: 100.20, tip: "settlement · down 0.4% (Reuters)", note: "Settlement (Reuters, December contract; −$0.38 vs Oct 6) — an eleventh session close above $100. Prices fell as the IEA agreed to accelerate its reserve release, with about 100M barrels of the March program still to come, prioritizing diesel (Reuters, Oct 7)." },
  { date: "2026-10-08", value: 104.28, tip: "settlement · up 4.1% (Reuters)", note: "Settlement (Reuters, December contract; +$4.08 vs Oct 7) — a twelfth session close above $100. Up on the Oct 7 tanker strike off Qatar — the first in six months outside the strait, with casualties — the IRGC declaration that routes off southern Oman will be blocked, and Hurricane Isaias shutting in more than 510,000 barrels a day in the Gulf of Mexico; Trump's post that the US would not strike before the midterms briefly capped the rally (Reuters, Oct 8)." },
  { date: "2026-10-09", value: 104.72, tip: "settlement · up 0.4% (Reuters)", note: "Settlement (Reuters, December contract; +$0.44 vs Oct 8) — a thirteenth session close above $100. The session dipped to about $102.6 in the morning on Trump's no-strikes-before-midterms remark, then recovered into the close; his announcement of a deal for Russian diesel — with an OFAC temporary license issued the same hour — landed near the close, and China approved about 3.7M metric tons of October refined-fuel exports after its Golden Week pause (Reuters, four traders, Oct 9)." },
  { date: "2026-10-12", value: 106.65, tip: "settlement · up 1.8% (Newsquawk)", note: "Settlement (Newsquawk wire, December contract; +$1.93 vs Oct 9 — Yahoo BZ=F bar matches) — a fourteenth session close above $100. The first priced session after the weekend: a fifth Houthi strike on King Khalid airport (Riyadh) and the Dammam airport strike, and four more UKMTO-logged attacks on ships around the strait (Oct 11–12); separately, the IRGC claimed a strike on the ADNOC-owned VLCC Al Maqam (a claim, unconfirmed)." },
  { date: "2026-10-13", value: 105.69, tip: "settlement · down 0.9% (Reuters)", note: "Settlement (Reuters wire, December contract; −$0.96 vs Oct 12 — the Yahoo BZ=F bar of 106.22 ran off the wire again; the wire value is plotted) — a fifteenth session close above $100, easing after a three-session rally. The Houthi missile that hit Aramco's headquarters complex in Dhahran and two further UKMTO-logged projectile strikes in the strait (a container ship, a tanker) came in after the London close." },
  { date: "2026-10-14", value: 106.06, tip: "settlement · up 0.4% (Rigzone)", note: "Settlement (Rigzone wire, December contract; +$0.37 vs Oct 13 — the Yahoo BZ=F bar of 106.06 matches) — a sixteenth session close above $100. The first full settlement after the Dhahran strike and the above-forecast Sep CPI: the GFS Pride sank and the Cape Dao was later reported sunk near the strait, a third ship (the GFS Giselle) was hit, and two senior Iranian officials told Reuters Iran is using new attack tactics to keep prices high ahead of the US midterms (Reuters, Oct 14)." },
  { date: "2026-10-15", value: 105.92, tip: "settlement · down $0.14 (CNBC)", note: "Settlement (CNBC/Newsquawk wire, December contract; −$0.14 vs Oct 14 — the Yahoo BZ=F bar of 105.54 ran off the wire; the wire value is plotted) — a seventeenth session close above $100. A divergence day: WTI jumped 3% on the week's 8M-barrel US crude draw and the renewed strait attacks while Brent barely moved, and the IEA agreed to accelerate the remaining ~100M barrels of its March program, including over 20M of diesel (Reuters, Oct 15)." },
  { date: "2026-10-16", value: 109.86, tip: "settlement · up $3.94 (Rigzone/Reuters)", note: "Settlement (Rigzone/Reuters wire, December contract; +$3.94 vs Oct 15, +3.7%) — the highest settlement since May 19 and an eighteenth session close above $100; intraday it touched $110, the first time since May 20. Up on the week's surge in strait attacks — two ships sank this week and the MT ST 3 crude tanker was struck off Oman on Oct 16 — plus Ukraine's resumption of Russian refinery strikes; Bloomberg says prospects for imminent supply relief have faded. Data quality: the Yahoo BZ=F bar of 109.69 ran $0.17 off the wire; the wire value is plotted (Rigzone, Reuters, Oct 16)." },
  { date: "2026-10-19", value: 109.55, tip: "settlement", note: "December contract settlement, down $0.31 (0.3%) from Oct 16 (CNBC). Yahoo BZ=F close: $109.26." },
  { date: "2026-10-20", value: 108.79, tip: "settlement · down $0.76 (eOption/AFP)", note: "Settlement (eOption closing wrap, December contract; −$0.76 vs Oct 19 — AFP and Reuters-derived reporting agree; the Yahoo BZ=F bar closed at 109.12, the settlement is plotted per the Oct 13/16 precedent). A twentieth session close above $100. AFP reports an intraday high of $111.99; EnergyNow’s earlier indicated price was $111.57. Prices later eased amid reports of a new US–Iran proposal (The New Arab, Oct 20; no official agreement announced)." },
  { date: "2026-10-21", value: 108.82, tip: "settlement · up $0.03 (Newsquawk/CNBC)", note: "Settlement (Newsquawk/CNBC wire, December contract; +$0.03 vs Oct 20 — the Yahoo BZ=F bar matches). A twenty-first session close above $100; eOption independently reports the same settlement and daily change." },
  { date: "2026-10-22", value: 113.17, tip: "settlement · up $4.35 (CNBC/Newsquawk/AP)", note: "Settlement (CNBC/Newsquawk/AP wire, December contract; +$4.35 vs Oct 21, +4.0% — the highest level since May 4 (AP's market wrap names the date directly); the Yahoo BZ=F bar closed at 112.87, the wire value is plotted). A twenty-second session close above $100. Up on the Houthi attacks that killed four in Saudi Arabia (Dammam airport, the Shaybah field), the NYT report that US and Israeli militaries have drawn up plans for renewed strikes after the midterms, the IRGC threat to \"extend confrontation to US bases\" (Al Jazeera), and Aramco telling staff to leave its Dhahran headquarters (Reuters)." },
  { date: "2026-10-23", value: 116.72, tip: "settlement · up $3.55 (Reuters/CNBC)", note: "Settlement (Reuters wire, December contract; +$3.55 vs Oct 22, +3.1% — the highest settlement since April 29; the Yahoo BZ=F bar closed at 111.66, off the wire again, the wire value is plotted). A twenty-third session close above $100. Up on the Houthi attacks on Saudi targets (four drones downed over Riyadh and Medina on Oct 22), the UAE closing beaches to a tanker oil spill, and Iran's seven-conditions statement on reopening the strait (Rezaei, ISNA via Anadolu). DOE authorization of an emergency 400K-barrel SPR swap to Phillips 66's Lake Charles refinery put some pressure on prices (Newsquawk)." },
  { date: "2026-10-26", value: 115.81, tip: "settlement · down $0.91 (CNBC)", note: "Settlement (CNBC wire, December contract; −$0.91 vs Oct 23 — briefly topped $117 intraday, the Yahoo BZ=F bar closed at 110.27, far off the wire again, the wire value is plotted). A twenty-fourth session close above $100. Eased on the confirmed Tehran meeting — Saudi Defense Minister Khalid bin Salman met President Pezeshkian and Security Council secretary Rezaei (CNBC) — while the Houthis claimed Monday's missile at Riyadh's airport and drones at oil pumping stations (the Saudis have not confirmed those strikes, CNBC)." },
  { date: "2026-10-27", value: 113.88, tip: "settlement · down $1.93 (CNBC)", note: "Settlement (CNBC wire, December contract; −$1.93 vs Oct 26, −1.7%; the Yahoo BZ=F bar closed at 113.88, matching the wire). A twenty-fifth session close above $100. Second straight down session on the renewed diplomatic push: Iran's Supreme Leader Khamenei met top security official Rezaei to discuss the conditions for ending the war, calling the current state of 'neither war nor peace' something that needs to end (CNBC) — the day after the Saudi-Iran Tehran talks. The Ras Tanura refinery claim stayed unverified in the coverage (CNBC, Oct 27)." },
  { date: "2026-10-28", value: 115.32, tip: "settlement · up $1.44 (CNBC)", note: "Settlement (CNBC wire, December contract; +$1.44 vs Oct 27, +1.3% — the Yahoo BZ=F bar ran far off the wire again, the wire value is plotted). A twenty-sixth session close above $100. Up on the US Navy advisory for vessels that do not need to transit the area to remain well clear of Hormuz (USNAVCENT, Oct 28) and Israel's inconclusive election (Reuters/CNBC, Oct 28)." },
  { date: "2026-10-29", value: 114.88, tip: "settlement · down $0.44 (DTNPF/CNBC)", note: "Settlement (DTNPF/CNBC wire, December contract; −$0.44 vs Oct 28, −0.4% — the Yahoo BZ=F bar closed at 114.88, matching the wire). A twenty-seventh session close above $100. Down as prospects of renewed US–Iran peace negotiations eased supply-disruption fears (CNBC), as Iran reported two further tanker incidents in the strait and the UK maritime authority logged one of them as an attack." },
  { date: "2026-10-30", value: 117.64, tip: "settlement · up $2.76 (CNBC)", note: "Settlement (CNBC wire, December contract; +$2.76 vs Oct 29, +2.4% — the Yahoo BZ=F bar closed at 117.64, matching the wire). A twenty-eighth session close above $100. This was the December contract's FINAL settlement (its last trading day was Oct 30); the front month rolls to January, which settled at $113.43 (MarketScreener/CNBC, Oct 30) — the next point switches contracts, so the change will combine the switch with January's own move. Up on the renewed strait escalation: the UK maritime authority issued two more attack reports (one in the strait, one south of Lavan Island) and Oman evacuated the crew of the burning Panamanian-flagged tanker RITI, as the Houthis claimed strikes on Saudi refineries, airports and a military base (GlobalSecurity, Oct 31)." },
  { date: "2026-11-02", value: 104.77, tip: "settlement · down $8.66 (The Private Banker wire, January contract)", note: "January settlement (The Private Banker wire): down $8.66 (7.6%) from its Oct 30 settlement of $113.43. Yahoo BZ=F closed at $104.44, so the wire value is plotted. This is the first session after December Brent's final settlement ($117.64); the chart's step down includes both the contract change and January's fall. Brent closed above $100 for a twenty-ninth straight session. Reports of the intraday low conflict and remain unverified (Guardian: $105.55; MarineLink: $104.49). Prices fell as a draft proposal to end the war circulated in Doha (Al Jazeera, Guardian, Nov 2)." },
  { date: "2026-11-03", value: 103.6, tip: "settlement", note: "January settlement, down $1.17 (1.1%) from Nov 2 — lowest settlement since Oct 7; the market weighed talks to end the wars in Ukraine and Iran against supply-disruption worries (Reuters/Nation Thailand, Nov 3; Yahoo BZ=F close 103.60 cross-checks). January contract (rolled from December on Nov 1). Brent closed above $100 for a thirtieth straight session." },
  { date: "2026-11-04", value: 94.62, tip: "settlement · down 8.7% (EnergyNow wire, January contract)", note: "January settlement (EnergyNow wire; −$8.98, −8.7% vs Nov 3 — the Yahoo BZ=F bar closed at 94.62, matching the wire). First settlement below $100 since Sep 22, ending a run of thirty consecutive closes above it. The drop followed the US midterms (Democrats took both chambers), which the market read as a move toward ending the war (EnergyNow/Yahoo, Nov 4)." },
  { date: "2026-11-05", value: 98.29, tip: "settlement · up $3.67 (Reuters wire, January contract)", note: "January settlement (Reuters wire; +$3.67, +3.9% vs Nov 4; Yahoo BZ=F closed at 99.11). Shipping risks remained high: Reuters reported UKMTO had received incidents involving at least five vessels since Sunday and that 35 vessels were hit in October, a monthly record. Iranian claims of fires aboard tankers and a tugboat remain unverified. Citi warned that the White House could act through executive powers after the midterms; Eurasia Group lowered its November strike and deal estimates and raised its prolonged-standoff estimate (Reuters and The National, Nov 5)." },
  { date: "2026-11-06", value: 98.32, tip: "settlement · up $0.03 (Reuters wire, January contract)", note: "January settlement (Reuters wire; +$0.03 vs Nov 5 — the Yahoo BZ=F bar closed at 98.32, matching the wire). The January contract fell 13.3% from its Oct 30 settlement of $113.43. Per LSEG data cited by Reuters (Nov 6), the Brent benchmark was on track for a 17% weekly decline — its steepest weekly percentage fall since the start of the pandemic and its biggest in absolute terms; a different contract series than the January same-contract comparison. News that day included a US strike on an air-defense system near Qeshm Island, an unconfirmed IRGC claim of a US MQ-9 shootdown, and a suspected missile attack on an unladen, inbound products tanker that killed one crew member (Reuters). An Iranian lawmaker said ships linked to China, India, Iraq and Qatar were exempt from Iran's transit restrictions; the scope and US response remain unclear (Al Jazeera, Nov 6)." },
  { date: "2026-11-09", value: 92.57, tip: "settlement · down $5.75 (Reuters wire, January contract)", note: "January settlement (Reuters wire; −$5.75, −5.9% vs Nov 6 — the Yahoo BZ=F bar closed at 92.57, matching the wire). The drop came amid diplomatic headlines: Trump said the war with Iran was “militarily effectively over” (Nov 9, AP). Separately, Israel Hayom reported an unconfirmed proposal to reopen Hormuz and release $8B in Iranian funds held in Qatar, citing two diplomatic sources. The January contract was down 18.4% from its Oct 30 settlement of $113.43." },
  { date: "2026-11-10", value: 91.49, tip: "settlement · down $1.08 (Reuters wire, January contract)", note: "January settlement (Reuters wire; −$1.08, −1.2% vs Nov 9 — the Yahoo BZ=F bar closed at 91.76, about $0.3 off the wire, so the wire value is plotted). Brent briefly traded below $90 during the session, the first time since August (CNBC). Prices fell after Trump said on Nov 9 that further strikes on Iran would not be necessary. Israel Hayom had also reported an unconfirmed proposal to reopen the strait and unlock $8B in Iranian funds (Nov 9). OPEC+ had agreed on Nov 1 to keep its December output targets unchanged (Reuters). The January contract is down 19.3% from its Oct 30 settlement of $113.43." },
  { date: "2026-11-11", value: 92.76, tip: "settlement · up $1.27 (Reuters wire, January contract)", note: "January settlement (Reuters wire; +$1.27, +1.4% vs Nov 10 — the Yahoo BZ=F bar closed at 92.76, matching the wire). Prices rose after Mohsen Rezaei, Iran's national security chief, said no enriched nuclear material would leave the country (Reuters). The January contract is down 18.2% from its Oct 30 settlement of $113.43." },
];
export const brentMonthlyAvgs = [
  { month: "Mar", value: 103.0, src: "EIA" },
  { month: "Apr", value: 117.29, src: "EIA, Sep 9" },
  { month: "Jul", value: 83.76, src: "EIA, Sep 9" },
];

// ---------- WTI spot, $/bbl — FRED DCOILWTICO, sampled on the product dates below ----------
// Mondays (EIA gasoline) + Wednesdays (AAA diesel). Six product dates have no same-day FRED
// value (Jan 19, Feb 16, May 25 — Mondays; Sep 6 — a Sunday; Sep 12–13 — weekend AAA dailies);
// for those, the crack math uses the nearest trading day's WTI (Jan 20, Feb 17, May 26, Sep 8,
// Sep 11, Sep 14 — included below, also drawn on the WTI line). Disclosed in the crack caption.
// No interpolation, ever.
// Basis check: Sep 9 FRED 97.26 vs news settlement 96.38 (~$0.9 spot-vs-settle, acceptable).
// FRED's Brent (DCOILBRENTEU, = EIA dnav RBRTE) does NOT reconcile with tracked settlements
// (Sep 9: 109.51 vs 100.71, a ~$9 gap — same FRED issue as PPIACO) — WTI is the crude basis.
// Sep 10 point: NYMEX front-month session close (Yahoo CL=F, 102.93) — FRED posts the next
// morning; the spot-vs-futures gap is ≈$1.2 (Sep 9: FRED 97.26 vs Yahoo 96.05). Disclosed here
// rather than silently mixed into the FRED series.
// SeriesPoint (not a bare {date, value}): the tail is mixed-source — FRED weekly closes
// plus the Sep 10 front-month close and the Sep 11 and Sep 14 closes, flagged in the notes.
export const wtiWeekly: SeriesPoint[] = [
  { fred: true, date: "2026-01-05", value: 58.1 },
  { fred: true, date: "2026-01-12", value: 59.39 },
  { fred: true, date: "2026-01-15", value: 59.13 },
  { fred: true, date: "2026-01-20", value: 60.3 },
  { fred: true, date: "2026-01-26", value: 60.46 },
  { fred: true, date: "2026-02-02", value: 61.6 },
  { fred: true, date: "2026-02-09", value: 64.53 },
  { fred: true, date: "2026-02-17", value: 62.53 },
  { fred: true, date: "2026-02-23", value: 66.36 },
  { fred: true, date: "2026-02-27", value: 66.96 },
  { fred: true, date: "2026-03-02", value: 71.13 },
  { fred: true, date: "2026-03-09", value: 94.65 },
  { fred: true, date: "2026-03-16", value: 93.39 },
  { fred: true, date: "2026-03-23", value: 89.33 },
  { fred: true, date: "2026-03-30", value: 104.69 },
  { fred: true, date: "2026-04-06", value: 114.01 },
  { fred: true, date: "2026-04-13", value: 100.72 },
  { fred: true, date: "2026-04-20", value: 91.06 },
  { fred: true, date: "2026-04-27", value: 99.89 },
  { fred: true, date: "2026-05-04", value: 109.76 },
  { fred: true, date: "2026-05-11", value: 101.56 },
  { fred: true, date: "2026-05-15", value: 108.99 },
  { fred: true, date: "2026-05-18", value: 112.25 },
  { fred: true, date: "2026-05-26", value: 97.63 },
  { fred: true, date: "2026-06-01", value: 95.96 },
  { fred: true, date: "2026-06-08", value: 95.0 },
  { fred: true, date: "2026-06-15", value: 84.65 },
  { fred: true, date: "2026-06-22", value: 78.94 },
  { fred: true, date: "2026-06-29", value: 71.87 },
  { fred: true, date: "2026-07-06", value: 69.6 },
  { fred: true, date: "2026-07-13", value: 79.2 },
  { fred: true, date: "2026-07-20", value: 84.38 },
  { fred: true, date: "2026-07-27", value: 84.25 },
  { fred: true, date: "2026-08-03", value: 81.96 },
  { fred: true, date: "2026-08-10", value: 83.76 },
  { fred: true, date: "2026-08-17", value: 86.04 },
  { fred: true, date: "2026-08-21", value: 87.21 },
  { fred: true, date: "2026-08-24", value: 86.34 },
  { fred: true, date: "2026-08-31", value: 87.03 },
  { fred: true, date: "2026-09-03", value: 92.55 },
  { fred: true, date: "2026-09-04", value: 92.69 },
  { fred: true, date: "2026-09-08", value: 94.21 },
  { fred: true, date: "2026-09-09", value: 97.26 },
  { fred: false, date: "2026-09-10", value: 102.93 },
  { fred: false, date: "2026-09-11", value: 100.05, note: "settle −2.4% (CNBC)" },
  { fred: false, date: "2026-09-14", value: 101.39, note: "front-month futures close (Yahoo, corrected Sep 15; FRED not yet available)" },
  { fred: false, date: "2026-09-15", value: 105.83, note: "front-month futures close (Yahoo; corrected from $105.48)" },
  { fred: false, date: "2026-09-16", value: 102.43, note: "front-month futures close (NYMEX 2pm ET; CNBC) · −3.2%" },
  { fred: false, date: "2026-09-17", value: 101.91, note: "front-month futures close (Yahoo) · −0.5%" },
  { fred: false, date: "2026-09-18", value: 100.3, note: "front-month futures close (Yahoo; CNBC concurs) · −1.6%" },
  { fred: false, date: "2026-09-21", value: 95.78, note: "settlement (Reuters, October contract) · −4.5%" },
  { fred: false, date: "2026-09-22", value: 94.59, note: "settlement (Jiji, October contract — its final trading day, Sep 22) · −1.2% vs Sep 21 for the same contract. The series switches to November starting Sep 23. November closed at $90.52 on Sep 22, about $4 below October, so the next change will reflect both the switch in contracts and any movement in November's price." },
  { fred: false, date: "2026-09-23", value: 92.16, note: "settlement (MarketScreener, November contract) · +1.8% on the same contract (November closed $90.52 on Sep 22). The step down from the Sep 22 point is the October→November contract switch, not a price move." },
  { fred: false, date: "2026-09-24", value: 94.61, note: "settlement (Yahoo, November contract) · +2.7% on the same contract" },
  { fred: false, date: "2026-09-25", value: 92.41, note: "settlement (November contract) · down 2.3% on the same contract · the price gap between Brent and WTI was at its widest since May, according to the settlement report" },
  { fred: false, date: "2026-09-28", value: 92.60, note: "settlement (Reuters, November contract) · up 0.2% on the same contract" },
  { fred: false, date: "2026-09-29", value: 89.38, note: "settlement (CNBC, November contract) · down 3.5% on the same contract — the drop tracked the Saudi Red Sea export recovery (Kpler)" },
  { fred: false, date: "2026-09-30", value: 90.42, note: "settlement (Fox News, November contract) · up 1.2% on the same contract" },
  { fred: false, date: "2026-10-01", value: 92.87, note: "settlement (November contract; the CL=F daily bar matches the settlement feed) · up 2.7% on the same contract — tracked China's fuel export suspension and the US carrier build-up (Reuters/WSJ, Oct 1)" },
  { fred: false, date: "2026-10-02", value: 91.11, note: "settlement (Reuters, November contract) · down 1.9% on the same contract — the G7 reserve-release announcement knocked prices lower intraday (CNBC, Oct 2)" },
  { fred: false, date: "2026-10-05", value: 89.43, note: "Settlement · Yahoo CL=F closing price: $89.43 (matches)." },
  { fred: false, date: "2026-10-06", value: 89.44, note: "Settlement (Rigzone, November contract; flat vs Oct 5) — the session dipped to the low-$87s in the morning (WSJ/Kpler strait-flow report) and recovered into the close." },
  { fred: false, date: "2026-10-07", value: 88.28, note: "Settlement (Reuters, November contract; −1.30% vs Oct 6) — down on the IEA's agreement to accelerate its reserve release (Reuters, Oct 7). Prices reversed higher Thursday on a tanker attack off Qatar and the first Gulf hurricane of the season." },
  { fred: false, date: "2026-10-08", value: 91.49, note: "Settlement (Yahoo front-month bar, cross-checked to the wire; +3.64% vs Oct 7) — up on the Qatar tanker strike, the IRGC route declaration, and the Isaias shut-ins; Trump's no-strikes-before-midterms post briefly dampened the rally (Reuters, Oct 8)." },
  { fred: false, date: "2026-10-09", value: 91.85, note: "Settlement (Reuters, November contract; +$0.36 vs Oct 8) — the session traded as low as about $90.4 after Trump's no-strikes remark, then recovered; the Russian diesel-deal announcement landed near the close (Reuters, Oct 9)." },
  { fred: false, date: "2026-10-12", value: 93.74, note: "Settlement (Newsquawk wire, November contract; +$1.89 vs Oct 9 — Yahoo CL=F bar matches) — up on the Saudi airport strikes and the strait tanker attacks; early Tuesday trading eased as the Russian diesel-supply story gained (Reuters, Oct 12)." },
  { fred: false, date: "2026-10-13", value: 94.14, note: "Settlement (Reuters wire, November contract; +$0.40 vs Oct 12 — the Yahoo CL=F bar of 94.59 is a post-settlement last trade; the wire value is plotted) — erased the session's early losses; the dollar and the 10-year yield slipped from their highs (Reuters, Oct 13)." },
  { fred: false, date: "2026-10-14", value: 95.09, note: "Settlement (Rigzone wire, November contract; +$0.95 vs Oct 13 — the Yahoo CL=F bar of 95.17 is a post-settlement last trade; the wire value is plotted) — WTI outpaced Brent; analysts cited fund buying and stronger demand for US barrels as freight conditions shifted (Bloomberg via Rigzone, Oct 14)." },
  { fred: false, date: "2026-10-15", value: 97.97, note: "Settlement (CNBC/Newsquawk wire, November contract; +$2.88 vs Oct 14, +3.0%) — up on the week's 8M-barrel US crude draw, the renewed strait attacks, and reports of US planning for new strikes on Iran including the MOAB (CNBC, Oct 15). Data quality: the Yahoo CL=F bar of 96.11 is an artifact (its session high of 96.39 is below the wire settlement); the wire value is plotted." },
  { fred: false, date: "2026-10-16", value: 101.41, note: "Settlement (Rigzone/Reuters wire, November contract; +$3.44 vs Oct 15, +3.5%) — the highest settlement since Sep 17, on the strait-attack surge (two ships sank this week; the MT ST 3 crude tanker struck off Oman) and the week's 8.6M-barrel US crude draw. Data quality: the Yahoo CL=F bar of 99.04 ran $2.37 below the wire settlement; the wire value is plotted (Rigzone, Reuters, Oct 16)." },
  { fred: false, date: "2026-10-19", value: 103.66, note: "November contract settlement, up $2.25 (2.2%) from Oct 16 (CNBC). December settled at $98.54. The lower Yahoo CL=F reading requires a contract-roll check before it can be classified as a feed error." },
  { fred: false, date: "2026-10-20", value: 97.82, note: "December front-month settlement (Reuters, Oct 20 — the AP NYMEX table and DOB/LSEG agree; supersedes the unverified $98.10 Yahoo CL=F close that was plotted Oct 21) — the front month ROLLED today: the November contract's final settlement was $101.79 (MarketScreener, Oct 20). The step down from Oct 19's $103.66 is the contract switch plus the November contract's own decline, not a single-contract move. December's prior settlement was $98.54, so the December contract itself fell $0.72." },
  { fred: false, date: "2026-10-21", value: 97.15, note: "Settlement (Newsquawk/CNBC wire, December contract; −$0.67 vs the Oct 20 settlement — the Yahoo CL=F bar matches; eOption independently reports the same settlement and daily change)." },
  { fred: false, date: "2026-10-22", value: 99.47, note: "Settlement (CNBC/Newsquawk/Investrade/Rigzone wire, December contract; +$2.32 vs Oct 21, +2.4% — the Yahoo CL=F bar closed at 99.10, the wire value is plotted). Touched $100 intraday (session high 100.17, Newsquawk) on the same drivers as Brent: the Houthi attacks on Saudi infrastructure and the NYT report of planned post-midterm strikes (Reuters, CNBC, Oct 22)." },
  { fred: false, date: "2026-10-23", value: 103.27, note: "Settlement (Reuters wire, December contract; +$3.80 vs Oct 22, +3.8% — back above $100 after three closes below; the Yahoo CL=F bar closed at 103.44, the wire value is plotted). Up on the same drivers as Brent: the Houthi attacks on Saudi targets, the UAE oil spill, and the unverified seven-tanker claim (Reuters, Oct 23)." },
  { fred: false, date: "2026-10-26", value: 101.76, note: "Settlement (CNBC wire, December contract; −$1.51 vs Oct 23 — slipped below $101 early, then recovered into the close; the Yahoo CL=F bar closed at 101.25, the wire value is plotted). Down from the six-month highs (Bloomberg/Rigzone) on the Tehran meeting and renewed US–Iran diplomatic effort; prices have gained about 12% this month (CNBC)." },
  { fred: false, date: "2026-10-27", value: 99.9, note: "Settlement (CNBC wire, December contract; −$1.86 vs Oct 26, −1.8%; the Yahoo CL=F bar closed at 99.90, matching the wire). Back below $100 after two closes above it; December WTI last settled below $100 on Oct 22 ($99.47). Second straight down session on the renewed US–Iran diplomatic push (CNBC, Oct 27)." },
  { fred: false, date: "2026-10-28", value: 102.78, note: "Settlement (CNBC wire, December contract; +$2.88 vs Oct 27, +2.9% — the Yahoo CL=F bar closed at 101.95, below the wire settlement, the wire value is plotted). Back above $100 after one close below it (CNBC, Oct 28)." },
  { fred: false, date: "2026-10-29", value: 102.00, note: "Settlement (DTNPF wire, December contract; −$0.78 vs Oct 28, −0.76%; the Yahoo CL=F bar closed at 102.00, matching the wire). Intraday low $99.79." },
  { fred: false, date: "2026-10-30", value: 104.12, note: "Settlement (CNBC wire, December contract; +$2.12 vs Oct 29, +2.1% — the Yahoo CL=F bar closed at 104.12, matching the wire). December WTI remains active; its last trading day is Nov 20 under the CME contract rule. Up on the same drivers as Brent (GlobalSecurity, Oct 31)." },
  { fred: false, date: "2026-11-02", value: 96.46, note: "December settlement (The Private Banker wire): down $7.66 (7.4%) from Oct 30. Yahoo CL=F closed at $96.41, so the wire value is plotted. WTI fell below $100 as a draft peace proposal circulated in Doha and Iran's president said the Supreme Leader had expanded the government's authority to negotiate (Al Jazeera, Nov 2). December remains the front month; its last trading day is Nov 20 under CME rules." },
  { date: "2026-11-03", value: 96.09, note: "December settlement, down $0.37 (0.4%) from Nov 2 (Reuters, Nov 3; Yahoo CL=F close 96.09 cross-checks). December remains the front month; its last trading day is Nov 20 under CME rules." },
  { fred: false, date: "2026-11-04", value: 88.12, note: "December settlement (EnergyNow wire; Macrotrends agrees: $88.12 as of Nov 4; −$7.97, −8.3% vs Nov 3 — the Yahoo CL=F bar closed at 88.12, matching the wire). December remains the front month; its last trading day is Nov 20 under CME rules." },
  { fred: false, date: "2026-11-05", value: 90.52, note: "December settlement (Reuters wire; +$2.40, +2.7% vs Nov 4 — the Yahoo CL=F bar closed at 91.13, so the wire value is plotted). Reuters linked the rebound to shipping risks and post-midterm escalation concerns (Nov 5). December remains the front month; its last trading day is Nov 20 under CME rules." },
  { fred: false, date: "2026-11-06", value: 90.83, note: "December settlement (Reuters wire; +$0.31, +0.3% vs Nov 5 — the Yahoo CL=F bar closed at 90.83, matching the wire). Down 12.76% from the December contract's Oct 30 settlement of $104.12 (EnergyNow). December remains the front month; its last trading day is Nov 20 under CME rules." },
  { fred: false, date: "2026-11-09", value: 86.85, note: "December settlement (Reuters wire; −$3.98, −4.4% vs Nov 6 — the Yahoo CL=F bar closed at 86.85, matching the wire). Down 16.6% from the December contract's Oct 30 settlement of $104.12. December remains the front month; its last trading day is Nov 20 under CME rules." },
  { fred: false, date: "2026-11-10", value: 86.04, note: "December settlement (Reuters wire; −$0.81, −0.9% vs Nov 9). The Yahoo CL=F bar closed at 86.24, about $0.2 off the wire, so the wire value is plotted. Down 17.4% from the December contract's Oct 30 settlement of $104.12; $5.45 below the January Brent settlement." },
  { fred: false, date: "2026-11-11", value: 86.53, note: "December settlement (Reuters wire; +$0.49, +0.6% vs Nov 10). The Yahoo CL=F bar closed at 86.53, matching the wire. Down 16.9% from the December contract's Oct 30 settlement of $104.12; $6.23 below the January Brent settlement. December remains the front month; its last trading day is Nov 20 under CME rules — the series will roll to the January contract after that date." },
];

// ---------- US retail gasoline, $/gal — EIA weekly (verified); AAA daily Sep 10–14
// (per-point notes below). A Sep 7 point (4.157, no logged source) was removed on the
// Sep 14 accuracy pass — the published AAA record runs from the Sep 10 release ----------
export const gasolineYtd: SeriesPoint[] = [
  { date: "2026-01-05", value: 2.796 },
  { date: "2026-01-12", value: 2.779 },
  { date: "2026-01-19", value: 2.806 },
  { date: "2026-01-26", value: 2.853 },
  { date: "2026-02-02", value: 2.867 },
  { date: "2026-02-09", value: 2.902 },
  { date: "2026-02-16", value: 2.924 },
  { date: "2026-02-23", value: 2.937 },
  { date: "2026-03-02", value: 3.015 },
  { date: "2026-03-09", value: 3.502 },
  { date: "2026-03-16", value: 3.72 },
  { date: "2026-03-23", value: 3.961 },
  { date: "2026-03-30", value: 3.99 },
  { date: "2026-04-06", value: 4.12 },
  { date: "2026-04-13", value: 4.123 },
  { date: "2026-04-20", value: 4.044 },
  { date: "2026-04-27", value: 4.123 },
  { date: "2026-05-04", value: 4.452 },
  { date: "2026-05-11", value: 4.5 },
  { date: "2026-05-18", value: 4.49 },
  { date: "2026-05-25", value: 4.475 },
  { date: "2026-06-01", value: 4.305 },
  { date: "2026-06-08", value: 4.146 },
  { date: "2026-06-15", value: 4.052 },
  { date: "2026-06-22", value: 3.914 },
  { date: "2026-06-29", value: 3.831 },
  { date: "2026-07-06", value: 3.777 },
  { date: "2026-07-13", value: 3.855 },
  { date: "2026-07-20", value: 4.001 },
  { date: "2026-07-27", value: 4.096 },
  { date: "2026-08-03", value: 4.079 },
  { date: "2026-08-10", value: 4.006 },
  { date: "2026-08-17", value: 4.049 },
  { date: "2026-08-24", value: 4.085 },
  { date: "2026-08-31", value: 4.071 },
  { date: "2026-09-10", value: 4.2770, note: "AAA release Sep 10 (logged)" },
  { date: "2026-09-11", value: 4.2950, note: "AAA release Sep 11 (logged)" },
  { date: "2026-09-12", value: 4.3104, note: "AAA release Sep 12 (logged)" },
  { date: "2026-09-13", value: 4.3130, note: "AAA release Sep 13 (logged)" },
  { date: "2026-09-14", value: 4.3163, note: "AAA release Sep 14 (logged)" },
  { date: "2026-09-15", value: 4.3289, note: "AAA release, Sep 15" },
  { date: "2026-09-16", value: 4.3672, note: "AAA release, Sep 16" },
  { date: "2026-09-17", value: 4.4386, note: "AAA release, Sep 17" },
  { date: "2026-09-18", value: 4.4687, note: "AAA release, Sep 18" },
  { date: "2026-09-19", value: 4.4759, note: "AAA release, Sep 19" },
  { date: "2026-09-20", value: 4.4761, note: "AAA release, Sep 20" },
  { date: "2026-09-21", value: 4.4786, note: "AAA release, Sep 21" },
  { date: "2026-09-22", value: 4.4750, note: "AAA release, Sep 22" },
  { date: "2026-09-23", value: 4.4744, note: "AAA release, Sep 23" },
  { date: "2026-09-24", value: 4.4825, note: "AAA release, Sep 24" },
  { date: "2026-09-25", value: 4.4918, note: "AAA release, Sep 25" },
  { date: "2026-09-26", value: 4.4874, note: "AAA release, Sep 26" },
  { date: "2026-09-27", value: 4.4798, note: "AAA release, Sep 27" },
  { date: "2026-09-28", value: 4.4768, note: "AAA release, Sep 28" },
  { date: "2026-09-29", value: 4.4558, note: "AAA release, Sep 29" },
  { date: "2026-09-30", value: 4.4343, note: "AAA release, Sep 30" },
  { date: "2026-10-01", value: 4.4137, note: "AAA release, Oct 1" },
  { date: "2026-10-02", value: 4.3961, note: "AAA release, Oct 2" },
  { date: "2026-10-03", value: 4.3807, note: "AAA release, Oct 3" },
  { date: "2026-10-04", value: 4.3697, note: "AAA release, Oct 4" },
  { date: "2026-10-05", value: 4.3653, note: "AAA release, Oct 5" },
  { date: "2026-10-06", value: 4.3685, note: "AAA release, Oct 6" },
  { date: "2026-10-07", value: 4.3667, note: "AAA release, Oct 7" },
  { date: "2026-10-08", value: 4.3612, note: "AAA release, Oct 8" },
  { date: "2026-10-09", value: 4.3718, note: "AAA release, Oct 9" },
  { date: "2026-10-10", value: 4.3669, note: "AAA release, Oct 10" },
  { date: "2026-10-11", value: 4.3585, note: "AAA release, Oct 11" },
  { date: "2026-10-12", value: 4.3556, note: "AAA release, Oct 12" },
  { date: "2026-10-13", value: 4.3413, note: "AAA — down $0.0143" },
  { date: "2026-10-14", value: 4.3333, note: "AAA — down $0.0080" },
  { date: "2026-10-15", value: 4.3344, note: "AAA release, Oct 15" },
  { date: "2026-10-16", value: 4.3271, note: "AAA release, Oct 16" },
  { date: "2026-10-17", value: 4.3085, note: "AAA release, Oct 17" },
  { date: "2026-10-18", value: 4.2988, note: "AAA release, Oct 18" },
  { date: "2026-10-19", value: 4.2953, note: "AAA release, Oct 19" },
  { date: "2026-10-20", value: 4.2786, note: "AAA release, Oct 20" },
  { date: "2026-10-21", value: 4.2644, note: "AAA release, Oct 21" },
  { date: "2026-10-22", value: 4.2701, note: "AAA release, Oct 22" },
  { date: "2026-10-23", value: 4.2926, note: "AAA release, Oct 23" },
  { date: "2026-10-24", value: 4.2957, note: "AAA release, Oct 24" },
  { date: "2026-10-25", value: 4.2892, note: "AAA release, Oct 25" },
  { date: "2026-10-26", value: 4.2858, note: "AAA release, Oct 26" },
  { date: "2026-10-27", value: 4.2661, note: "AAA release, Oct 27" },
  { date: "2026-10-28", value: 4.2471, note: "AAA release, Oct 28" },
  { date: "2026-10-29", value: 4.2258, note: "AAA release, Oct 29" },
  { date: "2026-10-30", value: 4.2046, note: "AAA release, Oct 30" },
  { date: "2026-10-31", value: 4.1837, note: "AAA release, Oct 31" },
  { date: "2026-11-01", value: 4.1732, note: "AAA release, Nov 1" },
  { date: "2026-11-02", value: 4.1694, note: "AAA release, Nov 2" },
  { date: "2026-11-03", value: 4.1493, note: "AAA release, Nov 3" },
  { date: "2026-11-04", value: 4.1239, note: "AAA release, Nov 4" },
  { date: "2026-11-05", value: 4.1003, note: "AAA release, Nov 5" },
  { date: "2026-11-06", value: 4.0688, note: "AAA release, Nov 6" },
  { date: "2026-11-07", value: 4.0371, note: "AAA release, Nov 7" },
  { date: "2026-11-08", value: 4.0203, note: "AAA release, Nov 8" },
  { date: "2026-11-09", value: 4.0093, note: "AAA release, Nov 9" },
  { date: "2026-11-10", value: 3.9788, note: "AAA release, Nov 10" },
  { date: "2026-11-11", value: 3.9429, note: "AAA release, Nov 11" },
  { date: "2026-11-12", value: 3.9081, note: "AAA release, Nov 12" },
];
export const gasolinePreCrisis = 2.81; // Jan 2026 monthly avg (BTS/EIA)

// ---------- US retail diesel, $/gal — AAA national (sourced points) ----------
export const dieselYtd: SeriesPoint[] = [
  { date: "2026-01-15", value: 3.52, approx: true, tip: "Jan monthly (C.H. Robinson)", note: "Jan monthly (C.H. Robinson)" },
  { date: "2026-02-09", value: 3.688, tip: "AAA", note: "AAA" },
  { date: "2026-02-27", value: 3.72, tip: "Feb monthly", note: "Feb monthly" },
  { date: "2026-03-30", value: 5.62, tip: "TIME (Mar 31)", note: "TIME Mar 31: +49% since war began" },
  { date: "2026-05-15", value: 5.6, approx: true, tip: "May peak", note: "May peak" },
  { date: "2026-06-22", value: 5.13, tip: "FleetOwner", note: "FleetOwner" },
  { date: "2026-08-21", value: 5.37, approx: true, tip: "Aug avg (The Hill)", note: "Aug avg (The Hill)" },
  { date: "2026-09-03", value: 5.78, tip: "AAA", note: "AAA" },
  { date: "2026-09-04", value: 5.85, tip: "AAA", note: "all-time record — breaks Jun 2022 record" },
  { date: "2026-09-06", value: 5.9, tip: "AAA", note: "AAA record" },
  { date: "2026-09-09", value: 5.94, tip: "AAA", note: "AAA record" },
  { date: "2026-09-10", value: 5.9773, tip: "AAA", note: "AAA record" },
  { date: "2026-09-11", value: 6.0556, tip: "AAA", note: "AAA record" },
  { date: "2026-09-12", value: 6.1602, tip: "AAA", note: "AAA record" },
  { date: "2026-09-13", value: 6.2040, tip: "AAA", note: "AAA record" },
  { date: "2026-09-14", value: 6.2301, tip: "AAA", note: "AAA record" },
  { date: "2026-09-15", value: 6.2694, tip: "AAA", note: "AAA record" },
  { date: "2026-09-16", value: 6.3103, tip: "AAA", note: "AAA record" },
  { date: "2026-09-17", value: 6.3956, tip: "AAA", note: "AAA record" },
  { date: "2026-09-18", value: 6.4476, tip: "AAA", note: "AAA record" },
  { date: "2026-09-19", value: 6.4866, tip: "AAA", note: "AAA record" },
  { date: "2026-09-20", value: 6.505, tip: "AAA", note: "AAA record — first above $6.50" },
  { date: "2026-09-21", value: 6.5107, tip: "AAA", note: "AAA record" },
  { date: "2026-09-22", value: 6.5276, tip: "AAA", note: "AAA record" },
  { date: "2026-09-23", value: 6.5217, tip: "AAA", note: "AAA — first decline since the Sep 4 record streak began" },
  { date: "2026-09-24", value: 6.5141, tip: "AAA", note: "AAA — second straight decline off the Sep 22 record" },
  { date: "2026-09-25", value: 6.5019, tip: "AAA", note: "AAA — third straight decline off the Sep 22 record" },
  { date: "2026-09-26", value: 6.4839, tip: "AAA", note: "AAA — fourth straight decline off the Sep 22 record" },
  { date: "2026-09-27", value: 6.4709, tip: "AAA", note: "AAA — fifth straight decline off the Sep 22 record" },
  { date: "2026-09-28", value: 6.4531, tip: "AAA", note: "AAA — sixth straight decline off the Sep 22 record" },
  { date: "2026-09-29", value: 6.4391, tip: "AAA", note: "AAA — seventh straight decline off the Sep 22 record" },
  { date: "2026-09-30", value: 6.4139, tip: "AAA", note: "AAA — eighth straight decline off the Sep 22 record" },
  { date: "2026-10-01", value: 6.3895, tip: "AAA", note: "AAA — ninth straight decline off the Sep 22 record" },
  { date: "2026-10-02", value: 6.3726, tip: "AAA", note: "AAA — tenth straight decline off the Sep 22 record" },
  { date: "2026-10-03", value: 6.3554, tip: "AAA", note: "AAA — eleventh straight decline off the Sep 22 record" },
  { date: "2026-10-04", value: 6.3434, tip: "AAA", note: "AAA — twelfth straight decline off the Sep 22 record" },
  { date: "2026-10-05", value: 6.3207, tip: "AAA", note: "AAA release, Oct 5" },
  { date: "2026-10-06", value: 6.3151, tip: "AAA", note: "AAA — fourteenth straight decline off the Sep 22 record" },
  { date: "2026-10-07", value: 6.3015, tip: "AAA", note: "AAA — fifteenth straight decline off the Sep 22 record" },
  { date: "2026-10-08", value: 6.2847, tip: "AAA", note: "AAA — sixteenth straight decline off the Sep 22 record" },
  { date: "2026-10-09", value: 6.2785, tip: "AAA", note: "AAA — seventeenth straight decline off the Sep 22 record" },
  { date: "2026-10-10", value: 6.2824, tip: "AAA", note: "AAA — up $0.0039, the first rise in 18 days and the end of the seventeen-day decline off the Sep 22 record" },
  { date: "2026-10-11", value: 6.2771, tip: "AAA", note: "AAA — the Oct 10 uptick didn't hold (−$0.0053); still $0.25 below the Sep 22 record" },
  { date: "2026-10-12", value: 6.2665, tip: "AAA", note: "AAA — second straight decline" },
  { date: "2026-10-13", value: 6.2787, tip: "AAA", note: "AAA — up $0.0122, ending the two-day decline; still $0.25 below the Sep 22 record" },
  { date: "2026-10-14", value: 6.2997, tip: "AAA", note: "AAA — second straight rise, +$0.0210; still $0.23 below the Sep 22 record" },
  { date: "2026-10-15", value: 6.3173, tip: "AAA", note: "AAA — third straight rise, +$0.0176; still $0.21 below the Sep 22 record" },
  { date: "2026-10-16", value: 6.3261, tip: "AAA", note: "AAA — fourth straight rise, +$0.0088; still $0.20 below the Sep 22 record" },
  { date: "2026-10-17", value: 6.3276, tip: "AAA", note: "AAA — fifth straight rise, +$0.0015; still $0.20 below the Sep 22 record" },
  { date: "2026-10-18", value: 6.3224, tip: "AAA", note: "AAA — down $0.0052 after five straight rises; $0.2052 below the Sep 22 record" },
  { date: "2026-10-19", value: 6.3187, tip: "AAA", note: "AAA — second straight decline, down $0.0037" },
  { date: "2026-10-20", value: 6.3199, tip: "AAA", note: "AAA — up $0.0012, ending the two-day decline; still $0.21 below the Sep 22 record" },
  { date: "2026-10-21", value: 6.3174, tip: "AAA", note: "AAA — down $0.0025 after a one-day rise; still $0.21 below the Sep 22 record" },
  { date: "2026-10-22", value: 6.3090, tip: "AAA", note: "AAA — down $0.0084, second consecutive daily decline; $0.22 below the Sep 22 record" },
  { date: "2026-10-23", value: 6.3172, tip: "AAA", note: "AAA — up $0.0082, first rise after two straight declines; $0.21 below the Sep 22 record" },
  { date: "2026-10-24", value: 6.3374, note: "AAA release, Oct 24" },
  { date: "2026-10-25", value: 6.3474, note: "AAA release, Oct 25" },
  { date: "2026-10-26", value: 6.3492, note: "AAA release, Oct 26" },
  { date: "2026-10-27", value: 6.3521, note: "AAA release, Oct 27" },
  { date: "2026-10-28", value: 6.3499, note: "AAA — first decline after five straight rises off the Oct 22 low ($6.3090)" },
  { date: "2026-10-29", value: 6.3347, note: "AAA — second straight decline" },
  { date: "2026-10-30", value: 6.3204, note: "AAA — third straight decline" },
  { date: "2026-10-31", value: 6.3101, note: "AAA — fourth straight decline" },
  { date: "2026-11-01", value: 6.3039, note: "AAA — fifth straight decline" },
  { date: "2026-11-02", value: 6.2921, note: "AAA — sixth straight decline" },
  { date: "2026-11-03", value: 6.2875, note: "AAA — seventh straight decline" },
  { date: "2026-11-04", value: 6.2748, note: "AAA — eighth straight decline" },
  { date: "2026-11-05", value: 6.2564, note: "AAA — ninth straight decline; $0.21 below the Sep 22 record" },
  { date: "2026-11-06", value: 6.2305, note: "AAA — tenth straight decline; $0.24 below the Sep 22 record" },
  { date: "2026-11-07", value: 6.2075, tip: "AAA", note: "AAA — eleventh straight decline; $0.32 below the Sep 22 record" },
  { date: "2026-11-08", value: 6.1929, note: "AAA — twelfth straight decline" },
  { date: "2026-11-09", value: 6.1723, note: "AAA — thirteenth straight daily decline since Oct 28; $0.36 below the Sep 22 record" },
  { date: "2026-11-10", value: 6.1572, tip: "AAA", note: "AAA — fourteenth straight daily decline since Oct 28; $0.37 below the Sep 22 record" },
  { date: "2026-11-11", value: 6.1306, tip: "AAA", note: "AAA — fifteenth straight daily decline since Oct 28; $0.40 below the Sep 22 record" },
  { date: "2026-11-12", value: 6.0977, tip: "AAA", note: "AAA — sixteenth straight daily decline since Oct 28; $0.43 below the Sep 22 record" },
];
export const dieselOldRecord = 5.85; // June 2022 AAA record (broken Sep 4)
export const dieselPreWar = 3.72; // Feb 27, just before the war — the "up NN%" baseline

// ---------- Headline stats (derived — single source for the table and the panel copy) ----------
// The value, date, streak, and "up NN%" below are computed from the series above, so the
// stats table can no longer drift from the chart copy (the hand-typed versions went stale
// on the Oct 5 pass: the table said +56% while the derived panel copy said +55%).
const shortStatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const WORDS = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
export const wordNum = (n: number) =>
  n < 20 ? WORDS[n] : n < 100 ? `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${WORDS[n % 10]}` : ""}` : String(n);
export const lastGasoline = gasolineYtd[gasolineYtd.length - 1];
export const lastDiesel = dieselYtd[dieselYtd.length - 1];
const dieselRecord = dieselYtd.reduce((a, b) => (b.value > a.value ? b : a));
export const gasUpPct = Math.round((lastGasoline.value / gasolinePreCrisis - 1) * 100);
export const dieselUpPct = Math.round((lastDiesel.value / dieselPreWar - 1) * 100);
// Decline streak ending at the latest reading: strictly lower than the previous
// reading AND exactly one calendar day later (a missed AAA day breaks the streak).
export const dieselStreak = (() => {
  let n = 0;
  for (let i = dieselYtd.length - 1; i > 0; i--) {
    const gap = (Date.parse(dieselYtd[i].date) - Date.parse(dieselYtd[i - 1].date)) / 86400000;
    if (dieselYtd[i].value < dieselYtd[i - 1].value && gap === 1) n++;
    else break;
  }
  return n;
})();
// The decline streak ending the day BEFORE the latest reading (calendar days, the same
// basis as the record-streak wording) — for the "first rise after N declines" sub-line.
// `fromRecord` is true when the streak runs back to the record day.
export const dieselPriorStreak = (() => {
  let s = dieselYtd.length - 2;
  while (s > 0 && dieselYtd[s].value < dieselYtd[s - 1].value) s--;
  return {
    days: Math.round((Date.parse(dieselYtd[dieselYtd.length - 2].date) - Date.parse(dieselYtd[s].date)) / 86400000),
    fromRecord: s === dieselYtd.indexOf(dieselRecord),
  };
})();
// The rise streak ending the day BEFORE the latest reading (consecutive strictly
// higher readings, one calendar day apart) — for the "down after N straight rises"
// sub-line when the latest reading ends a rise streak with a one-day dip.
export const dieselPriorRise = (() => {
  let n = 0;
  for (let i = dieselYtd.length - 2; i > 0; i--) {
    const gap = (Date.parse(dieselYtd[i].date) - Date.parse(dieselYtd[i - 1].date)) / 86400000;
    if (dieselYtd[i].value > dieselYtd[i - 1].value && gap === 1) n++;
    else break;
  }
  return n;
})();
// The rise streak ending AT the latest reading (same basis as dieselPriorRise) —
// for the "Nth straight rise from the low" sub-line once the rise runs past day one
// (the "first rise after N declines" wording is only true on day one).
export const dieselRiseStreak = (() => {
  let n = 0;
  for (let i = dieselYtd.length - 1; i > 0; i--) {
    const gap = (Date.parse(dieselYtd[i].date) - Date.parse(dieselYtd[i - 1].date)) / 86400000;
    if (dieselYtd[i].value > dieselYtd[i - 1].value && gap === 1) n++;
    else break;
  }
  return n;
})();
export const stats = [
  { label: "Brent", value: "$92.76", sub: "Nov 11 settlement · January contract · +$1.27 on the day (+1.4%); −18.2% from Oct 30" },
  { label: "US diesel (AAA)", value: `$${lastDiesel.value.toFixed(2)}`, sub: `${shortStatDate(lastDiesel.date)} · ${dieselStreak > 0 ? (dieselStreak === dieselYtd.length - 1 - dieselYtd.indexOf(dieselRecord) ? `${wordNum(dieselStreak)} straight drops from the ${shortStatDate(dieselRecord.date)} record $${dieselRecord.value.toFixed(4)}` : (dieselStreak === 1 ? (dieselPriorRise > 0 ? (dieselPriorRise === 1 ? "down after yesterday’s rise" : `down after ${wordNum(dieselPriorRise)} straight rises`) : "down again") : `down ${wordNum(dieselStreak)} days in a row`)) + " · " : dieselRiseStreak === 1 && dieselPriorStreak.days > 0 ? `first rise after ${wordNum(dieselPriorStreak.days)} straight declines${dieselPriorStreak.fromRecord ? ` off the ${shortStatDate(dieselRecord.date)} record` : ""} · ` : dieselRiseStreak >= 2 ? `${wordNum(dieselRiseStreak)} straight rises from the ${shortStatDate(dieselYtd[dieselYtd.length - 1 - dieselRiseStreak].date)} low $${dieselYtd[dieselYtd.length - 1 - dieselRiseStreak].value.toFixed(4)} · ` : ""}+${dieselUpPct}% vs pre-war $3.72` },
  { label: "US gasoline (AAA)", value: `$${lastGasoline.value.toFixed(2)}`, sub: `${shortStatDate(lastGasoline.date)} · +${gasUpPct}% vs Jan $2.81 (AAA)` },
  { label: "SPR", value: "282.2M", sub: "Oct 30 · down 0.4M on the week · down 133.2M from pre-war 415.4M · lowest since Nov 1982" },
  { label: "US distillate stocks", value: "99.3M", sub: "Oct 30 · down 3.6M in a week · 11.0% below last year · East Coast stocks 14.5% below last year" },
];

// ---------- SPR, million bbl — EIA weekly ending stocks (verified) ----------
export const sprWeekly: { date: string; level: number }[] = [
  { date: "2026-01-02", level: 413.464 },
  { date: "2026-01-09", level: 413.678 },
  { date: "2026-01-16", level: 414.484 },
  { date: "2026-01-23", level: 414.999 },
  { date: "2026-01-30", level: 415.213 },
  { date: "2026-02-06", level: 415.212 },
  { date: "2026-02-13", level: 415.441 },
  { date: "2026-02-20", level: 415.441 },
  { date: "2026-02-27", level: 415.441 },
  { date: "2026-03-06", level: 415.442 },
  { date: "2026-03-13", level: 415.442 },
  { date: "2026-03-20", level: 415.442 },
  { date: "2026-03-27", level: 415.064 },
  { date: "2026-04-03", level: 413.325 },
  { date: "2026-04-10", level: 409.181 },
  { date: "2026-04-17", level: 405.045 },
  { date: "2026-04-24", level: 397.924 },
  { date: "2026-05-01", level: 392.7 },
  { date: "2026-05-08", level: 384.095 },
  { date: "2026-05-15", level: 374.175 },
  { date: "2026-05-22", level: 365.112 },
  { date: "2026-05-29", level: 357.119 },
  { date: "2026-06-05", level: 349.192 },
  { date: "2026-06-12", level: 340.251 },
  { date: "2026-06-19", level: 331.191 },
  { date: "2026-06-26", level: 325.655 },
  { date: "2026-07-03", level: 319.489 },
  { date: "2026-07-10", level: 316.504 },
  { date: "2026-07-17", level: 311.447 },
  { date: "2026-07-24", level: 307.65 },
  { date: "2026-07-31", level: 304.809 },
  { date: "2026-08-07", level: 298.694 },
  { date: "2026-08-14", level: 293.426 },
  { date: "2026-08-21", level: 289.726 },
  { date: "2026-08-28", level: 286.604 },
  { date: "2026-09-04", level: 285.360 },
  { date: "2026-09-11", level: 284.957 },
  { date: "2026-09-18", level: 284.552 },
  { date: "2026-09-25", level: 283.767 },
  { date: "2026-10-02", level: 282.983 },
  { date: "2026-10-09", level: 282.983 },
  { date: "2026-10-16", level: 282.683 },
  { date: "2026-10-23", level: 282.583 },
  { date: "2026-10-30", level: 282.184 }, // WPSR w/e 2026-10-30 (released Nov 4, 2026)
];
// US commercial crude inventories, EXCLUDING the SPR (EIA WPSR, week ending Friday),
// million barrels. Source: EIA API series WCESTUS1 ("U.S. Ending Stocks excluding SPR of
// Crude Oil (Thousand Barrels)") — the API labels units "MBBL" but the values are THOUSANDS
// of barrels (verified: w/e Sep 11 = 423,429 → 423.429M, matches WPSR Table 1). Related:
// WCRSTUS1 = total INCLUDING SPR; WCSSTUS1 = the SPR itself.
export const commercialCrude2026: { date: string; value: number }[] = [
  { date: "2026-01-02", value: 419.056 }, { date: "2026-01-09", value: 422.447 },
  { date: "2026-01-16", value: 426.049 }, { date: "2026-01-23", value: 423.754 },
  { date: "2026-01-30", value: 420.299 }, { date: "2026-02-06", value: 428.829 },
  { date: "2026-02-13", value: 419.815 }, { date: "2026-02-20", value: 435.804 },
  { date: "2026-02-27", value: 439.279 }, { date: "2026-03-06", value: 443.103 },
  { date: "2026-03-13", value: 449.259 }, { date: "2026-03-20", value: 456.185 },
  { date: "2026-03-27", value: 461.636 }, { date: "2026-04-03", value: 464.717 },
  { date: "2026-04-10", value: 463.804 }, { date: "2026-04-17", value: 465.729 },
  { date: "2026-04-24", value: 459.495 }, { date: "2026-05-01", value: 457.182 },
  { date: "2026-05-08", value: 452.876 }, { date: "2026-05-15", value: 445.013 },
  { date: "2026-05-22", value: 441.686 }, { date: "2026-05-29", value: 433.712 },
  { date: "2026-06-05", value: 426.485 }, { date: "2026-06-12", value: 418.222 },
  { date: "2026-06-19", value: 412.134 }, { date: "2026-06-26", value: 408.359 },
  { date: "2026-07-03", value: 411.357 }, { date: "2026-07-10", value: 409.665 },
  { date: "2026-07-17", value: 411.675 }, { date: "2026-07-24", value: 404.508 },
  { date: "2026-07-31", value: 406.987 }, { date: "2026-08-07", value: 424.410 },
  { date: "2026-08-14", value: 428.815 }, { date: "2026-08-21", value: 428.910 },
  { date: "2026-08-28", value: 424.460 }, { date: "2026-09-04", value: 424.069 },
  { date: "2026-09-11", value: 423.429 }, { date: "2026-09-18", value: 426.398 },
  { date: "2026-09-25", value: 427.320 },
  { date: "2026-10-02", value: 424.134 },
  { date: "2026-10-09", value: 415.577 },
  { date: "2026-10-16", value: 412.517 },
  { date: "2026-10-23", value: 410.625 },
  { date: "2026-10-30", value: 409.76 },
];
// Same weeks in 2025 (each 2026 week matched to its nearest 2025 week-ending date).
export const commercialCrude2025: { date: string; value: number }[] = [
  { date: "2025-01-03", value: 414.642 }, { date: "2025-01-10", value: 412.680 },
  { date: "2025-01-17", value: 411.663 }, { date: "2025-01-24", value: 415.126 },
  { date: "2025-01-31", value: 423.790 }, { date: "2025-02-07", value: 427.860 },
  { date: "2025-02-14", value: 432.493 }, { date: "2025-02-21", value: 430.161 },
  { date: "2025-02-28", value: 433.775 }, { date: "2025-03-07", value: 435.223 },
  { date: "2025-03-14", value: 436.968 }, { date: "2025-03-21", value: 433.627 },
  { date: "2025-03-28", value: 439.792 }, { date: "2025-04-04", value: 442.345 },
  { date: "2025-04-11", value: 442.860 }, { date: "2025-04-18", value: 443.104 },
  { date: "2025-04-25", value: 440.408 }, { date: "2025-05-02", value: 438.376 },
  { date: "2025-05-09", value: 441.830 }, { date: "2025-05-16", value: 443.158 },
  { date: "2025-05-23", value: 440.363 }, { date: "2025-05-30", value: 436.059 },
  { date: "2025-06-06", value: 432.415 }, { date: "2025-06-13", value: 420.942 },
  { date: "2025-06-20", value: 415.106 }, { date: "2025-06-27", value: 418.951 },
  { date: "2025-07-04", value: 426.021 }, { date: "2025-07-11", value: 422.162 },
  { date: "2025-07-18", value: 418.993 }, { date: "2025-07-25", value: 426.691 },
  { date: "2025-08-01", value: 423.662 }, { date: "2025-08-08", value: 426.698 },
  { date: "2025-08-15", value: 420.684 }, { date: "2025-08-22", value: 418.292 },
  { date: "2025-08-29", value: 420.707 }, { date: "2025-09-05", value: 424.646 },
  { date: "2025-09-12", value: 415.361 }, { date: "2025-09-19", value: 414.754 },
  { date: "2025-09-26", value: 416.546 }, { date: "2025-10-03", value: 420.261 },
  { date: "2025-10-10", value: 423.785 },
  { date: "2025-10-17", value: 422.824 }, // WPSR table1 w/e 2025-10-17: total crude 831.388 − SPR 408.564
  { date: "2025-10-24", value: 416.0 }, // WPSR archive table1.pdf w/e 2025-10-24: total crude 825.1 − SPR 409.1
  { date: "2025-10-31", value: 421.168 }, // WPSR w/e 2026-10-30, 10/31/25 column
];
export const sprFloors = [
  { level: 300, name: "Cavern damage risk: about 300M barrels (first report below: week ending Aug 7)" },
  { level: 250, name: "GEF operating minimum: 250M barrels" },
  { level: 180, name: "Operating limit: 180M barrels" },
  { level: 70, name: "DOE stated safe minimum: 70M barrels" },
];
// ---------- Branch weights: the three tracks ----------
// Oct 21, 2026: the per-track `path` sentences (Brent ranges and storage
// directions) were removed from the public page with the scenario withdrawal —
// the odds now describe the shipping corridor only. The full issued scenario
// definitions, including those price/storage implications, remain archived in
// the research logs (Sep 19 / Oct 15 vintages) and on the model page.
export const branchTracks = [
  {
    name: "Corridor holds",
    bar: "bg-calm",
    border: "border-l-calm",
    weight: "10%",
    what: "Tankers can pass through Hormuz under an Iran–Oman agreement or with US escorts. Traffic gradually returns to normal over one to two quarters.",
  },
  {
    name: "Standoff",
    bar: "bg-crude",
    border: "border-l-crude",
    weight: "50%",
    what: "Fighting continues at the current level. Tanker attacks and shipping restrictions continue, some Iranian facilities remain out of service, and the repaired Saudi bypass operates at a reduced rate. The strait stays partly open.",
  },
  {
    name: "Corridor lapses",
    bar: "bg-alarm",
    border: "border-l-alarm",
    weight: "40%",
    what: "The shipping route closes for a prolonged period or the fighting gets worse. More tankers are lost, shipping restrictions remain, and the bypass, Abqaiq, and Jazan stay out of service for months.",
  },
];

// ---------- Branch weights history ----------
export const branchWeights = [
  { date: "Jun 30", holds: 65, standoff: 35, lapse: 0, note: "Our first estimate: about a 65% chance that the conflict would ease." },
  { date: "Sep 2", holds: 35, standoff: 60, lapse: 5, note: "Vessel tracking showed 7% of normal crossings through Hormuz and did not support reports that 8.6M barrels a day were passing through." },
  { date: "Sep 7", holds: 15, standoff: 55, lapse: 30, note: "An area was closed to shipping, and a base in a third country was hit for the first time." },
  { date: "Sep 9", holds: 10, standoff: 50, lapse: 40, note: "Tanker losses reached 10 per week, Brent passed $100, and Jazan was affected." },
  { date: "Sep 11", holds: 10, standoff: 40, lapse: 50, note: "The Saudi bypass pipeline was suspended, and the Houthis held the entire Red Sea coast. An official pipeline restart would return the odds to 10/50/40." },
  { date: "Sep 16", holds: 10, standoff: 35, lapse: 55, note: "Oil loadings at Yanbu, the pipeline's export port, stopped while the pipeline remained shut. Oil could no longer leave through the Saudi bypass. In Libya, guards shut the Hamada–Zawiya pipeline, halting two oil fields." },
  { date: "Sep 22", holds: 10, standoff: 40, lapse: 50, note: "Reuters reported that the bypass pipeline had restarted at a reduced rate, with the first cargo at Yanbu scheduled to load on Sep 22. We moved the odds back toward standoff on that report." },
  { date: "Sep 29", holds: 10, standoff: 50, lapse: 40, note: "The repaired Saudi bypass pipeline is carrying about 3.5M barrels a day, close to the 4M it carried before the drone strikes, and tanker loadings at Yanbu have resumed (Wall Street Journal, Sep 28). We moved the odds toward standoff based on that report, making an exception to our rule requiring official confirmation or an assessment that repairs would take only days." },
];

// ---------- Research log (local-only files) ----------
// ---------- The flip: surplus → reserve drawdown (reported months only) ----------
// World oil balance, mb/d — production minus consumption. Source: EIA STEO Table 3a
// (STEO_m.xlsx, Nov 10 2026 release, "Total crude oil and other liquids inventory net
// withdrawals, world total"; positive there = drawdown). Jan–Oct 2026 are ACTUALS in
// that release; Nov 2026 onward is EIA forecast and deliberately NOT shown (the
// forecasted 2027 return to surplus is not credible while the strait is contested).
// Positive here = surplus (build); negative = net withdrawal (running on reserves).
// Raw STEO values (drawdown +), Nov 10 edition: Jan −3.69, Feb −4.39, Mar +5.56, Apr
// +4.24, May +4.60, Jun +2.39, Jul +0.01, Aug +2.59, Sep +0.97, Oct −1.69. Mid-month
// x positions. The Nov 10 edition revised every 2026 month (Sep withdrawal cut from
// 2.94 to 0.97); Oct is a 1.69 net BUILD — the first build month since February (Jul,
// a 0.27 build in the Oct edition, is revised to a ~flat 0.01 draw here).
// Context: the physical loss peaked at 11.2M b/d of Gulf shut-in in May (EIA); demand
// destruction (−1.6 in the Aug 12 OMR; −2.5 in the Sep 11 edition) and non-Gulf supply
// absorbed most of it, so the world balance never went deeper than ~5.6 (Nov 10
// edition). IEA counts ≈1.3B bbl lost in total since Feb (Aug edition figure; the Sep
// edition's total is not in the public copy).
export const worldBalance = [
  { date: "2026-01-15", value: 3.7 },
  { date: "2026-02-15", value: 4.4 },
  { date: "2026-03-15", value: -5.6 },
  { date: "2026-04-15", value: -4.2 },
  { date: "2026-05-15", value: -4.6 },
  { date: "2026-06-15", value: -2.4 },
  { date: "2026-07-15", value: 0.0 },
  { date: "2026-08-15", value: -2.6 },
  { date: "2026-09-15", value: -1.0 },
  { date: "2026-10-15", value: 1.7 },
];

// ---------- Demand destruction: world petroleum consumption (mb/d, monthly) ----------
// EIA STEO Nov 10, 2026 workbook, Table 3e "World Petroleum and Other Liquid Fuels
// Consumption" (row patc_world). Jan–Oct 2026 are ACTUALS in that release — same
// convention as the world-balance chart; Nov 2026 onward is EIA forecast and
// deliberately not shown. World/regional consumption is EIA-estimated (apparent
// consumption, incl. refinery fuel & bunkering) — sourced estimates, not interpolation.
// Story: the destruction is BROAD, not Chinese. China is only −0.8 of the −4.0 Jul gap
// (Nov 10 edition) because it is holding consumption up by halting imports and drawing commercial
// stockpiles (Q2 imports −32% QoQ, EIA TIE; Jan–Jul −13.2% YoY, China customs; official
// 1.2–1.4B bbl reserve untouched — research/2026-08-30.md). China's buffer is the next
// breaking point (Q1–Q2 2027), not a source of the destruction. The Middle East itself
// is down −1.3 (Asia & Oceania as a whole, −1.9, is the largest regional decline).
export const worldConsumption2026: { date: string; value: number }[] = [
  { date: "2026-01-15", value: 102.31 },
  { date: "2026-02-15", value: 104.33 },
  { date: "2026-03-15", value: 101.97 },
  { date: "2026-04-15", value: 99.39 },
  { date: "2026-05-15", value: 98.93 },
  { date: "2026-06-15", value: 101.68 },
  { date: "2026-07-15", value: 101.67 },
  { date: "2026-08-15", value: 103.36 },
  { date: "2026-09-15", value: 104.05 },
  { date: "2026-10-15", value: 102.78 },
];
export const worldConsumption2025: { date: string; value: number }[] = [
  { date: "2025-01-15", value: 102.03 },
  { date: "2025-02-15", value: 103.68 },
  { date: "2025-03-15", value: 102.37 },
  { date: "2025-04-15", value: 103.82 },
  { date: "2025-05-15", value: 103.72 },
  { date: "2025-06-15", value: 105.82 },
  { date: "2025-07-15", value: 105.63 },
  { date: "2025-08-15", value: 104.5 },
  { date: "2025-09-15", value: 106.0 },
  { date: "2025-10-15", value: 104.57 },
];
// Same table (Nov 10 edition), July column: where the −4.0 mb/d sits (Jul 2026 vs Jul 2025, mb/d).
export const demandDecline = [
  { region: "World", from: 105.63, to: 101.67 },
  { region: "Middle East", from: 10.18, to: 8.88 },
  { region: "Asia & Oceania", from: 37.87, to: 35.97 },
  { region: "China", sub: "part of Asia & Oceania; using stockpiles to support consumption", from: 16.41, to: 15.57 },
  { region: "Europe", from: 14.78, to: 14.51 },
  { region: "United States", from: 21.19, to: 20.61 },
];

// ---------- Refining: US refinery utilization (weekly, % of operable capacity) ----------
// EIA Weekly Petroleum Status Report, series WPULEUS3 — "U.S. Percent Utilization of
// Refinery Operable Capacity". api.eia.gov/v2/petroleum/pnp/wiup, fetched 2026-09-10.
// Sourced values, never interpolated. EIA's definition: "Percent Utilization is
// calculated as gross inputs divided by the latest reported monthly operable capacity."
// 2026: avg 93.6% (n=38); above 95% every week from Jun 5 through Sep 11, then 94.0
// (wk of Sep 18, first sub-95% week since May 29); peak 98.0 (wk of Aug 28).
// 2025 same Jan–Sep window: avg 90.7%, deeper winter maintenance dip (83.5, Jan 24).
// (For provenance, the mb/d view from STEO 4a CORIPUS, Jan–Aug: 2026 16.33 15.91 16.40
// 16.14 16.79 17.20 17.16 17.31 · 2025 15.74 15.36 15.83 16.09 16.72 17.10 17.00 16.94.)
export interface UtilPt { date: string; value: number }
export const usRefineryUtil2026: UtilPt[] = [
  { date: "2026-01-02", value: 94.7 }, { date: "2026-01-09", value: 95.3 },
  { date: "2026-01-16", value: 93.3 }, { date: "2026-01-23", value: 90.9 },
  { date: "2026-01-30", value: 90.5 }, { date: "2026-02-06", value: 89.4 },
  { date: "2026-02-13", value: 91.0 }, { date: "2026-02-20", value: 88.6 },
  { date: "2026-02-27", value: 89.2 }, { date: "2026-03-06", value: 90.8 },
  { date: "2026-03-13", value: 91.4 }, { date: "2026-03-20", value: 92.9 },
  { date: "2026-03-27", value: 92.1 }, { date: "2026-04-03", value: 92.0 },
  { date: "2026-04-10", value: 89.6 }, { date: "2026-04-17", value: 89.1 },
  { date: "2026-04-24", value: 89.6 }, { date: "2026-05-01", value: 90.1 },
  { date: "2026-05-08", value: 91.7 }, { date: "2026-05-15", value: 91.6 },
  { date: "2026-05-22", value: 94.5 }, { date: "2026-05-29", value: 94.7 },
  { date: "2026-06-05", value: 95.3 }, { date: "2026-06-12", value: 96.7 },
  { date: "2026-06-19", value: 96.1 }, { date: "2026-06-26", value: 96.6 },
  { date: "2026-07-03", value: 95.8 }, { date: "2026-07-10", value: 96.2 },
  { date: "2026-07-17", value: 96.1 }, { date: "2026-07-24", value: 97.2 },
  { date: "2026-07-31", value: 96.5 }, { date: "2026-08-07", value: 96.2 },
  { date: "2026-08-14", value: 97.2 }, { date: "2026-08-21", value: 97.4 },
  { date: "2026-08-28", value: 98.0 }, { date: "2026-09-04", value: 97.8 },
  { date: "2026-09-11", value: 96.8 }, { date: "2026-09-18", value: 94.0 },
  { date: "2026-09-25", value: 92.5 }, { date: "2026-10-02", value: 92.7 },
  { date: "2026-10-09", value: 93.5 }, { date: "2026-10-16", value: 93.4 },
  { date: "2026-10-23", value: 92.8 },
  { date: "2026-10-30", value: 94.5 }, // WPSR table2 w/e 2026-10-30 (API lags a week)
];
export const usRefineryUtil2025: UtilPt[] = [
  { date: "2025-01-03", value: 93.3 }, { date: "2025-01-10", value: 91.7 },
  { date: "2025-01-17", value: 85.9 }, { date: "2025-01-24", value: 83.5 },
  { date: "2025-01-31", value: 84.5 }, { date: "2025-02-07", value: 85.0 },
  { date: "2025-02-14", value: 84.9 }, { date: "2025-02-21", value: 86.5 },
  { date: "2025-02-28", value: 85.9 }, { date: "2025-03-07", value: 86.5 },
  { date: "2025-03-14", value: 86.9 }, { date: "2025-03-21", value: 87.0 },
  { date: "2025-03-28", value: 86.0 }, { date: "2025-04-04", value: 86.7 },
  { date: "2025-04-11", value: 86.3 }, { date: "2025-04-18", value: 88.1 },
  { date: "2025-04-25", value: 88.6 }, { date: "2025-05-02", value: 89.0 },
  { date: "2025-05-09", value: 90.2 }, { date: "2025-05-16", value: 90.7 },
  { date: "2025-05-23", value: 90.2 }, { date: "2025-05-30", value: 93.4 },
  { date: "2025-06-06", value: 94.3 }, { date: "2025-06-13", value: 93.2 },
  { date: "2025-06-20", value: 94.7 }, { date: "2025-06-27", value: 94.9 },
  { date: "2025-07-04", value: 94.7 }, { date: "2025-07-11", value: 93.9 },
  { date: "2025-07-18", value: 95.5 }, { date: "2025-07-25", value: 95.4 },
  { date: "2025-08-01", value: 96.9 }, { date: "2025-08-08", value: 96.4 },
  { date: "2025-08-15", value: 96.6 }, { date: "2025-08-22", value: 94.6 },
  { date: "2025-08-29", value: 94.3 }, { date: "2025-09-05", value: 94.9 },
  { date: "2025-09-12", value: 93.3 }, { date: "2025-09-19", value: 93.0 },
  { date: "2025-09-26", value: 91.4 }, { date: "2025-10-03", value: 92.4 },
  { date: "2025-10-10", value: 85.7 }, { date: "2025-10-17", value: 88.6 },
  { date: "2025-10-24", value: 86.6 },
  { date: "2025-10-31", value: 86.0 }, // WPSR w/e 2026-10-30, 10/31/25 column
];

// Global refining anchors — IEA Oil Market Report (runs: Sep 11 edition; 2026 forecast:
// Oct 14 edition, "Global runs will drop by 2.3 mb/d, to 81.7 mb/d, this year" — the Sep 11
// edition had −2.6; Q3 cut: Aug 12). The Sep monthly runs figure is not on the public
// overview page, so the Aug runs anchor stands until an edition publishes it.
export const globalRefining = [
  { name: "Global refining, August", value: "81.4 mb/d", delta: "summer peak, −4.2 mb/d below a year ago (OMR, Sep 11)" },
  { name: "Refining forecast, 2026", value: "−2.3 mb/d", delta: "IEA forecast vs 2025 — global runs 81.7 mb/d this year (OMR, Oct 14; the Sep ed had −2.6)" },
  { name: "Q3 forecast revision", value: "−370 kb/d", delta: "Reduction in the Q3 refining forecast (OMR, Aug 12)" },
];

// ---------- Upcoming watch list ----------
export type WatchItem = { item: string; why: string };
// Grouped by timing: "Any day" = unscheduled triggers, the rest scheduled events.
// Details (PortWatch counts, prediction-market ranges, yield levels) live in the logs.
export const watchGroups: { when: string; items: WatchItem[] }[] = [
  {
    when: "Any day",
    items: [
      { item: "Houthi attacks on Saudi Arabia are now almost daily. Nov 8: shrapnel from intercepted missiles damaged an Aramco administrative building in Riyadh (AP). Nov 9: an attack in the Medina region caused a “limited fire” with no injuries (Saudi Energy Ministry). Nov 10: the coalition intercepted missiles aimed at Riyadh and the south and a drone over the Eastern Province (Al Jazeera). Nov 11: it said it destroyed three cruise missiles headed for the Riyadh region, two drones aimed at Mecca and the south, and two missiles heading west. The Houthis denied targeting Mecca and claimed a strike on a pumping station at Yanbu, which Saudi Arabia hasn't confirmed (Reuters). CBS News says the attacks have killed at least 20 people since early October. On Nov 10 the GCC approved an advanced headquarters for its unified command in Kuwait, with no operational date.", why: "Watch for confirmed damage to oil facilities, especially the Yanbu export route, and the GCC command's operational status." },
      { item: "Iran is still publicly rejecting US terms. On Nov 11, Mohsen Rezaei, secretary of Iran's Supreme National Security Council, said Iran “will not remove a single atom” of enriched uranium from the country, ruling out a transfer abroad (Al Mayadeen, via RFE/RL). He also said on X that US bases from the Middle East to Europe would be targets if the US starts another war. Parliament speaker Ghalibaf told Al Jazeera that “the ball is now in the American court” and that the strait will “never return” to its pre-war status (Nov 11). Iranian officials have denied reports of a Vance meeting in Qatar (Mehr). Two reports remain unconfirmed: that Qatar's prime minister told G7 ministers Doha had secured “at least two weeks” before a possible US attack (JPost, i24, citing diplomatic sources), and that an interim deal would reopen Hormuz and release $8B in Iranian funds held in Qatar (Israel Hayom).", why: "Watch for a US reply to Iran's conditions, any Vance meeting, and corroboration of the two-week window." },
      { item: "OPEC+ output is close to its pre-war level. OPEC's monthly report (Nov 11) puts the group's October output at 41.23M b/d, about 97% of February's 42.72M, based on outside estimates. Saudi Arabia told OPEC its output rose 26% to 10.563M b/d, but OPEC's outside estimates put it at 9.194M (Oilprice, Bloomberg via Rigzone). At the G7 on Nov 10, Rubio said oil and fuel flows through the strait had reached 80–85% of pre-conflict levels on some nights, with Iranian oil making up the gap (AP). That is a US government estimate of volumes, not ship transits. Iraq's foreign minister said on Nov 8 that Iraq had an understanding with the US to export crude through a lane near Oman (Reuters). Task Force Iron Gate (CENTCOM, Nov 7) targets weapons, sanctioned materials and illicit revenue across Iran's land borders and the Caspian.", why: "Watch for implementation of the Iraq–Oman lane and the next Kpler flow print." },
      { item: "UKMTO's latest overview (week ending Nov 6) reports 170 outbound and 155 inbound transits, about 65% below pre-conflict levels, and 11 attacks: three vessels sank, five needed help, and three continued. It names the LARGO ATOM (#192) but not the sunk vessels. #199 reports a tanker fire near Khasab on Nov 7. Reuters-verified footage and satellite imagery from Nov 8 show a burning tanker managed by Navig8, a company majority-owned by ADNOC Logistics & Services. Reuters later said it was unclear which Navig8 tanker it was; ship-tracking (AIS) data points to a sister ship of the Navig8 Messi. Reuters-verified video showed oil reaching Oman's shore (Nov 9). #200 was a separate outbound tanker attack; its crew were safe.", why: "Watch for the identity and fate of the tanker in #199, the identities of the three vessels UKMTO counted as sunk, and the next Kpler flow print." },
      { item: "Tanker attacks continue. Nov 10: UKMTO #201 reported a tanker hit by a projectile northeast of Lima, Oman (crew safe), and ADNOC said a vessel operated by its logistics arm was damaged in UAE waters. A late report, #203, says an eastbound tanker in the southern Arabian Gulf was also struck that day; injured crew were taken ashore, and the damage is unknown. Nov 11: #202 reported a tanker incident in the strait, status unknown, and Iran's army said a tanker hit a mine after entering a prohibited area (not matched to #202). Nov 12: the IRGC said explosions disabled two unnamed supertankers carrying more than 4M barrels on the strait's southern route (Mehr, Anadolu); this is unverified. The IMO counts 130 incidents in the region since the war began, with at least 25 seafarers killed.", why: "Watch the outcomes of #202 and #203, the fate of the ADNOC vessel, and whether the IRGC claim is corroborated." },
      { item: "Whether Russian diesel reaches buyers. Russia extended its producer diesel export ban through Jan 31, 2027; Novak said exceptions would remain for world markets (TASS, Oct 31). Windward tracked three tankers carrying Russian diesel as US-bound; only the Agioi Fanendes, loaded at Primorsk on Oct 22, still appears headed for a US port, and it was still en route as of Nov 8 with no confirmed delivery. The other two changed course (Nov 3).", why: "Watch for the Agioi Fanendes' arrival and updates on the diverted cargoes. New Jersey's governor warned state ports to reject the fuel and a legal dispute is under way (CBS, Nov 3); US license 135 permits covered transactions through Apr 7, 2027." },
      { item: "The BLS reported Nov 10 that October consumer prices rose 0.4% for the month — above the 0.3% analysts expected — with core prices up 0.3%, the third straight month at that pace. It could not publish an annual rate: the 2025 government shutdown left no October 2025 data, so September's 3.7% remains the latest official annual figure. Gasoline prices ran 37.4% above a year earlier (BLS, Nov 10). Stock futures fell and traders began pricing a possible December Fed increase (CNBC).",
        why: "Watch the Fed's December outlook and the next prints (October PPI, Nov 13, 8:30 a.m. ET; November CPI, Dec 10)." },
    ],
  },
  {
    when: "Nov 12",
    items: [
      { item: "The next weekly EIA report (noon ET). The Nov 4 report put SPR stocks at 282.2M barrels — down 0.4M for a fifth straight withdrawal — and distillate stocks at 99.3M, down 3.6M and 11.0% below last year, the first weekly reading below 100M this year. East Coast distillate stocks were 14.5% lower.", why: "Watch whether SPR withdrawals continue and distillate stocks keep falling. Deliveries from the sixth SPR offering are scheduled for November–December." },
    ],
  },
];

// ---------- Breaking-points cascade (§11, compressed twice) ----------
export const cascade = [
  { date: "Each weekly EIA report (next: Nov 12, noon ET)", region: "US East Coast", trigger: "US distillate stocks fell 3.6M barrels to 99.3M in the week ending Oct 30, 11.0% below last year and the first weekly reading below 100M this year. East Coast stocks rose to 22.6M but remained 14.5% lower. At the four-week average supply rate, national stocks equal about 24 days of use; that is a comparison, not a countdown to empty tanks." },
  { date: "Jan 31, 2027", region: "Russia", trigger: "Russia extended the producer diesel export ban through Jan 31, with exceptions for global supplies (TASS, Oct 31). US authorization doesn't remove Russian restrictions. The IEA's October report says limited refinery capacity makes the easing unlikely to materially increase global diesel supplies." },
  { date: "≈ late October", region: "Europe's oil hubs", trigger: "Rotterdam-area diesel stocks could fall below 8.5–9M barrels, making it harder for traders to find supplies." },
  { date: "Nov 10–30", region: "Air travel", trigger: "Russia's jet-fuel export ban, in force since Jun 1, is due to end Nov 30. An extension would keep those export restrictions in place." },
];

// ---------- Russia front (verified anchors only — report §7B + research logs) ----------
// Refining capacity, % of pre-strike baseline. Strikes began Aug 2025 (2025–26 Russian
// fuel crisis). No interpolation between anchors — the line connects verified points.
export const russiaCapacityAnchors = [
  { date: "2024-09-01", pct: 100, label: "before the strikes" },
  { date: "2025-08-01", pct: 100, label: "strikes begin (Aug 2025)" },
  { date: "2026-04-15", pct: 75, label: "~25% of capacity lost (mid-April)" },
  { date: "2026-08-29", pct: 70, label: ">30% of actual capacity offline (Moscow Times, Aug 29)" },
  { date: "2026-10-04", pct: 49, label: "51% of capacity disabled (UA Defense Ministry, Oct 4 — Khmara; up from >45% Sep 21; not independently verifiable)" },
];
// Spread of estimates (capacity OUT), current as of Oct 4: UA Defense Ministry 51% struck
// (Oct 4, Khmara) · Russian Forbes 54% (Sep 9) · IEA ">20%" → capacity REMAINING: 46%–80%
// (the range is unchanged by the Oct 4 figure — it sits inside; Forbes still sets the
// low end, IEA the high end)
export const russiaCurrentSpread = { date: "2026-10-04", low: 46, high: 80 };

// Snapshot card rows (name / value / delta / flag)
// Organized by mechanism, not by plant: the headline number, the recent-strike
// window, the big plants still dark, the domestic shortage, the jet-fuel front, the
// export routes. One plant per row is the anti-pattern — plants go dark in batches
// (six in the Sep 20–26 window), and a row-per-plant table grows without bound while
// saying the same thing. Keep it at six rows; when a new fact lands, fold it into a
// mechanism row.
//
// Updating the struck row: append an entry to russiaStruckRefineries and extend
// russiaStrikeWindow.end when a new day lands. The row's label, count, and plant list
// are DERIVED from that list — never retype them into the row. The window label
// degrades gracefully: a missed update stops being complete, never false. If the
// strikes pause for a week and restart, start a fresh window (new start, cleared
// list). The row says "struck", not "halted", on purpose: entries require a
// reported attack or strike and a reported fire; attribution and confirmation vary
// by source. A HALT requires plant-specific confirmation (Reuters, a governor, an
// industry source). Bloomberg reported the Ufa strike; OSINT reported a fire at
// Novoil. Russian officials had not confirmed damage there as of Nov 2.
// Window reset Oct 24: strikes paused ~8 days (last confirmed Oct 16), so per the
// rule above a fresh window starts with a cleared list. The prior window (Sep 20–
// Oct 16) held 12 entries: Moscow refinery (Sep 20), Kuibyshev near Samara (Sep
// 21–22), Ufa (Sep 21–22), Perm ~257 kb/d (Sep 25), Novoshakhtinsk ~110–140 kb/d
// (Sep 25), Ilsky ~125 kb/d — three killed (Sep 26), Lukoil-Volgograd (Oct 2),
// Gazprom Neftekhim Salavat (Oct 8), Omsk ~440 kb/d — second hit (Oct 8), Lukoil
// Ukhta (Oct 9), Ryazan — repeat strike (Oct 15), Surgut-district condensate plant
// (Oct 16). See the Oct 24 log.
const russiaStrikeWindow = { start: "Oct 24", end: "Nov 11" };
const russiaStruckRefineries = [
  { plant: "Tolyattikauchuk, Tolyatti — petrochemical plant, fire reported", date: "Oct 24" },
  { plant: "Omsky Kauchuk, Omsk — petrochemical plant (synthetic rubber, MTBE), fire reported", date: "Oct 24" },
  { plant: "Novokuibyshevsk, Samara region — repeat strike (struck Sep 21–22), fire reported", date: "Oct 30" },
  { plant: "Kstovo, Nizhny Novgorod region — refinery, fires reported", date: "Nov 1" },
  { plant: "Ufa, Bashkortostan — Bashneft refinery complex; strike reported, fire at Novoil reported by OSINT", date: "Oct 31" },
  { plant: "Yaroslavl — Slavneft-YANOS refinery (~300 kb/d, one of Russia's largest); fire confirmed by the governor, two employees injured", date: "Nov 3" },
  { plant: "Ryazan — Rosneft refinery (~344 kb/d, ~500 km from Ukraine); repeat strike reported (previously struck Oct 15), fire reported", date: "Nov 5" },
  { plant: "Afipsky, Krasnodar region — fire at an enterprise in Afipsky village; the refinery per Ukrainian outlets, an unnamed industrial site per Russian authorities", date: "Nov 6" },
  { plant: "Saratov — Saratov Oil Refinery; strike and fire reported by a Ukrainian monitoring channel, Russian authorities did not name the site (Kyiv Independent, Nov 7); repeat — previously struck Sep 11", date: "Nov 7" },
  { plant: "Kirishi, Leningrad region — KINEF refinery, Russia's second-largest; governor confirmed the drone attack and fire, which was contained; local reports indicated possible hits to three units. A woman was killed by drone debris elsewhere in the region (Kyiv Independent, ABC, Nov 9)", date: "Nov 9" },
  { plant: "Omsk — Gazprom Neft refinery (Russia's largest, ~440 kb/d); drone strike and large fire on Nov 11, with the attack still under way in its seventh hour (Militarnyi, citing the monitoring group Exilenova+; Ukrainska Pravda). The governor confirmed a drone attack without naming the target (Meduza). Third strike, after Jul 6 and Oct 8.", date: "Nov 11" },
];
// Oct 14 (NOT counted above — the array's criterion is a reported strike/fire): Novak
// said Ukrainian drones attacked refineries in the Saratov and Ryazan REGIONS (he named
// regions, not individual plants); Ukraine denied it; damage unconfirmed (Interfax, TASS,
// Bloomberg, Oct 14). Resolved Oct 15: the Ryazan refinery fire was CONFIRMED (Ryazan
// governor Malkov; Russian Defense Ministry; AP) — a repeat strike on a plant already
// offline since Sep 6, struck the first night Ukraine resumed attacks after its
// three-day pause (Zelensky, FT, Oct 15) → counted above. The Saratov claim remains
// unconfirmed as of the Oct 16 pass. (An Oct 14 evening addition was removed the same
// evening after the accuracy review flagged the count inflation.)
// Oct 16 (counted): a drone strike hit an "industrial facility in the Surgut district"
// of Khanty-Mansi, Russia's largest oil-producing region — fire confirmed by governor
// Kukharuk; Ukrainian tracking (Sternenko) identifies the Surgut Condensate Stabilization
// Plant, which processes condensate into motor and aviation fuel. The identification is
// unverified (Kyiv Independent) and no Ukrainian claim of responsibility has come
// (Bloomberg, Moscow Times, Kyiv Independent, Oct 16). Counted on the strike-plus-fire
// criterion; any halt is unverified.
export const russiaSnapshot = [
  { name: "Capacity out of service", value: "51%", delta: "UA Defense Ministry, Oct 4 (Khmara) — up from >45% (Sep 21) and ~30% (Aug 29, Moscow Times)", flag: "The 51% claim is unverified (AP), and other estimates use different measures. Reuters sources put late-October processing at about 5M b/d, 25% above early October. HUR says 15 of 38 major refineries were out of service at end-September and 12 more had cut output, with combined processing down 55.4% from January (HUR, Nov 5). Six named remote refineries still operating processed 906 kb/d in September, 24% of the national total. The Centre for Research on Energy and Clean Air (CREA), a Finland-based group, estimates 20–35% of capacity is currently idle (Seoul Economic Daily, Nov 10). Reuters, citing two industry sources, said strikes since late October cut capacity by about 30% and disrupted nine of the 35 major refineries in the past week (via Kyiv Independent, Nov 10). Fire Point, a Ukrainian weapons maker, said the refineries hit since Oct 30 account for 36% of Russia's refining capacity; Ukraine's General Staff said they include all five of the largest (UNN, Nov 12). That is the capacity of plants struck, not capacity offline. None of these reports establishes how much national capacity is offline now." },
  { name: `Refineries and industrial sites struck, ${russiaStrikeWindow.start}–${russiaStrikeWindow.end}`, value: `${russiaStruckRefineries.length} ${russiaStruckRefineries.length === 1 ? "site" : "sites"}`, delta: russiaStruckRefineries.map((h) => `${h.plant} (${h.date})`).join(" · "), flag: "In Ust-Luga, Ukrainian drones hit the port zone of Russia's main Baltic oil-product export hub early on Nov 11, starting a fire and injuring three workers (Leningrad Oblast governor, Nov 11); it is a terminal, not a refinery, and is not counted in the tally. In Saratov, a Ukrainian monitoring channel reported the Saratov Oil Refinery set ablaze after the Nov 7 strike; the governor confirmed residential damage but did not name the refinery, and no halt is reported (Kyiv Independent, Nov 7). In Afipsky, regional authorities reported a fire at an enterprise in the village after drone debris; Ukrainian outlets identified the refinery, but the authorities did not name the site. The Yaroslavl governor confirmed a fire at Slavneft-YANOS on Nov 3; two employees were injured (Reuters). No production halt is confirmed; the tally also includes two petrochemical plants. Ufa damage, Kstovo's site, and the Ryazan plant identification remain unconfirmed (Reuters video analysis suggests the Nov 5 strike targeted the refinery; local authorities confirmed fires only at unnamed industrial sites)." },
  { name: "Major refinery outages", value: "Kirishi status unclear", delta: "Kirishi, Russia's second-largest, ~404 kb/d: reported halted since Sep 15; Nov 9 strike and fire, fire contained, post-strike operations unverified (IntelliNews, Nov 9) · Ryazan, ~344 kb/d: struck Nov 5, no new halt confirmed; CDU-6 was shut after the Oct 15 strike (Reuters, Oct 16)", flag: "Capacity figures describe whole plants, not measured lost output. The Leningrad governor confirmed the Nov 9 Kirishi fire was contained but did not report its processing status. IntelliNews lists Kirishi as halted since Sep 15; no post-strike update is available. Ryazan's CDU-6 detail dates from October." },
  { name: "Gasoline shortages at gas stations", value: "45–53%", delta: "Share of stations without AI-92 (45%) or AI-95 (53%) gasoline, mid-September (gdebenzin, via UNN, Sep 22); rationing has returned in about two-thirds of regions (Independent, Sep 22)", flag: "Gasoline prices +21% YTD (Moscow Times, Sep 14) · IEA: diesel output down about 30%, with waits of up to 40 hours (Oct 5) · Russia plans to import up to 620,000 tonnes of gasoline monthly over Oct–Dec (UNN, Oct 23)" },
  { name: "Jet fuel now imported", value: "military + civilian", delta: "Russia is importing Jet A-1 from South Korea and Egypt (UA military intelligence, Aug 29); no jet fuel or gasoline has left Russia by sea for two straight weeks (S&P Global CAS, Oct 1)", flag: "ISW (Sep 26): Geran drones use jet fuel; a kerosene shortage would limit their use" },
];

export const russiaBanCascade = [
  { date: "Jan 31, 2027", what: "diesel, marine-fuel and gasoil export ban for producers; extended Oct 31 (TASS). Novak said exceptions would remain for supplies to world markets; sources told the Moscow Times those exceptions would run as export quotas tied to Russia's diesel deal with the US (Oct 29). US license 135 permits transactions through Apr 7, 2027; Russian export rules still apply." },
  { date: "Nov 30, 2026", what: "jet fuel exports" },
  { date: "Jan 31, 2027", what: "gasoline exports and diesel exports by non-producers" },
];

// ---------- Second-order effects (recession / rates / food — report macro channel + §11B) ----------
// 12-mo US recession odds, Jun–Oct 2026. Polymarket is "by end-2027" (longer window, ~15 months).
// Ordered by pct desc (chart plots in array order, first = top).
// Goldman: 25% (Mar 12) → 30% (Mar 25) → 25% (May 11) → 15% (Jun 26, current). The Sep 14
// "raised this week" quote (Hatzius, Bloomberg TV) restated the 15% with a caveat that the
// odds could be higher given the oil shock — not a new revision. See logs/2026-09-14.md.
// NY Fed yield-curve model (newyorkfed.org prob_rec.pdf): printed 25 in early Sep; 12.76%
// for the Sep 2027 horizon using data through Sep 2026, checked Oct 16 → dot at 13.
export const recessionOdds = [
  { name: "Moody's", pct: 50, note: "highest estimate" },
  { name: "JPMorgan", pct: 35, note: "" },
  { name: "Polymarket (by end-2027)", pct: 34, note: "covers a longer period · Oct 16" },
  { name: "TD Securities", pct: 25, note: "Sep 7" },
  { name: "WSJ poll (71 economists)", pct: 24, note: "Oct 11 · Jul 25% · Apr 33%" },
  { name: "Goldman Sachs", pct: 15, note: "since Jun 26 · restated Sep 14" },
  { name: "NY Fed model", pct: 13, note: "yield-curve model · data through Sep" },
];

export const ratesStats = [
  { label: "Fed's target rate, Oct 28", value: "3.75–4.00%", sub: "Held in a 10-to-2 vote — two members wanted a quarter-point increase · statement: 'Inflation remains elevated. … The Committee will deliver price stability.'" },
  { label: "Odds of an increase, Oct 27–28 (resolved)", value: "Held", sub: "We estimated 60% odds (published Sep 16) · the Fed held · Brier score 0.36 — running average 0.2009 over four resolved forecasts" },
  { label: "September producer prices (BLS, Oct 15)", value: "6.3% YoY", sub: "+1.3% for the month, the largest since Mar 2022 · goods +2.6% for the month — energy +10.8%, gasoline +20.3% · Aug revised to 5.6% annually" },
];

export const foodStats = [
  { label: "Gulf–India tanker shipping costs", value: "+411%", sub: "$4.34/bbl in Aug vs pre-war (Frontline)" },
  { label: "TTF gas (Europe)", value: "$28.0/MMBtu", sub: "JOGMEC · Nov 6, Dec delivery (pub. Nov 9); Oct 30: $34.0" },
  { label: "JKM gas (Asia)", value: "≈$32.2/MMBtu", sub: "JOGMEC assessed Nov 6 (published Nov 9) · low-$32s, down from low-$34s on Oct 30" },
];

// The lag chain: energy shock → food shock, 12–18 months. Dates are the midpoint of
// each documented window (Q4 2026 / Dec–Feb / Mar–Apr / Jul–Oct / 2027–28).
// Each stage is the documented WINDOW (start–end), not a point — drawn as a gantt bar.
// The war itself is the vertical reference line at Feb 28, 2026.
export const foodLagBars = [
  { name: "shipping raises food costs", start: "2026-09-01", end: "2026-12-31", window: "Q4 2026" },
  { name: "fertilizer prices peak", start: "2026-12-01", end: "2027-02-28", window: "Dec 26 – Feb 27" },
  { name: "2027 plantings", start: "2027-03-01", end: "2027-04-30", window: "Mar – Apr 27" },
  { name: "effects on harvests", start: "2027-07-01", end: "2027-10-31", window: "Jul – Oct 27" },
  { name: "food prices rise", start: "2027-11-01", end: "2028-06-30", window: "2027 – 28" },
];

// ---- Natural gas: TTF (Europe) + JKM (Asia), $/MMBtu, 2026 YTD ----
// Two sources, both verified, never interpolated:
//  * Jan 21 – Apr 24: EIA weekly averages of front-month futures (Bloomberg L.P.), from EIA's
//    Natural Gas Weekly Update + the Apr 28, 2026 Today in Energy chart (id=67604). Filled markers.
//  * May – Sep: assessed prices on the stated dates from Global LNG Hub weekly updates
//    (ICIS/Platts assessments of specific contracts, e.g. TTF October delivery; ranges reported
//    as midpoints). Hollow markers. CFD spot checks (disclosed in notes): Sep 14 TTF,
//    Sep 18 TTF (€→$ converted), Sep 18 JKM. JOGMEC's weekly assessments remain the primary.
// Pre-closure baseline = week of Feb 27 (EIA weekly averages): TTF 10.99, JKM 10.66.
// The Apr 28 EIA TIE article states: TTF +35% and JKM +51% vs pre-closure as of Apr 24 —
// which the series reproduces (14.80/10.99 = +34.6%, 16.02/10.66 = +50.3%).
export type GasPt = { date: string; value: number; assessed?: boolean; tip?: string; note?: string };

export const gasTtf: GasPt[] = [
  { date: "2026-01-21", value: 12.40, note: "EIA weekly avg" },
  { date: "2026-02-13", value: 11.39 },
  { date: "2026-02-20", value: 11.03 },
  { date: "2026-02-27", value: 10.99, note: "pre-closure week" },
  { date: "2026-03-06", value: 17.24 },
  { date: "2026-03-13", value: 17.32 },
  { date: "2026-03-20", value: 18.89, note: "three-year high" },
  { date: "2026-03-27", value: 18.57 },
  { date: "2026-04-03", value: 17.20 },
  { date: "2026-04-10", value: 16.35 },
  { date: "2026-04-17", value: 14.74 },
  { date: "2026-04-24", value: 14.80 },
  { date: "2026-05-01", value: 15.7, assessed: true },
  { date: "2026-05-08", value: 15.2, assessed: true },
  { date: "2026-05-15", value: 17.1, assessed: true },
  { date: "2026-05-19", value: 17.7, assessed: true, note: "Asgard field outage" },
  { date: "2026-05-22", value: 16.5, assessed: true },
  { date: "2026-05-29", value: 15.7, assessed: true },
  { date: "2026-06-05", value: 16.5, assessed: true },
  { date: "2026-06-08", value: 16.9, assessed: true, note: "Iran–Israel escalation" },
  { date: "2026-06-12", value: 15.9, assessed: true },
  { date: "2026-06-19", value: 14.1, assessed: true, note: "US–Iran ceasefire" },
  { date: "2026-07-03", value: 15.1, assessed: true },
  { date: "2026-07-10", value: 16.3, assessed: true },
  { date: "2026-07-17", value: 19.2, assessed: true },
  { date: "2026-07-31", value: 19.9, assessed: true },
  { date: "2026-08-07", value: 18.8, assessed: true },
  // Aug 19 "≈€50/MWh" point (16.8) removed Sep 14: refuted by the same source (Global LNG
  // Hub: $20.8 Aug 14 → $22.6 Aug 21) and by Euronews (€65 on Aug 20). Replaced with the
  // source's own USD/MBtu values (JOGMEC), no conversion.
  { date: "2026-08-14", value: 20.8, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-08-28", value: 22.9, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-09-04", value: 24.5, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-09-11", value: 27.0, assessed: true, note: "Global LNG Hub (JOGMEC) — highest since Dec 2022" },
  { date: "2026-09-14", value: 27.8, assessed: true, tip: "€81.98 CFD × 1.1557 (converted)", note: "€81.98/MWh (TradingEconomics CFD) × EUR/USD 1.1557 — converted" },
  { date: "2026-09-18", value: 26.7, assessed: true, tip: "JOGMEC (pub. Sep 24), Oct delivery", note: "Global LNG Hub (JOGMEC, published Sep 24) — USD 26.7/MBtu, Oct delivery; matches the Sep 18 CFD close (€79.52 × 1.1460)" },
  { date: "2026-09-22", value: 24.2, assessed: true, tip: "€72.10 close quote × 1.1467 (converted)", note: "€72.10/MWh (Geagency close quote, Sep 22) × EUR/USD 1.1467 — converted; a market quote, ~9% below the Sep 18 quote" },
  { date: "2026-09-25", value: 24.1, assessed: true, tip: "JOGMEC (pub. Sep 28), Oct delivery", note: "Global LNG Hub (JOGMEC, published Sep 28) — USD 24.1/MBtu, Oct delivery; down from 26.7 on Sep 18 as forecasts turned warmer and traders hoped US–Iran talks would ease tensions" },
  { date: "2026-10-02", value: 24.6, assessed: true, tip: "JOGMEC (pub. Oct 5), Nov delivery", note: "Global LNG Hub (JOGMEC, published Oct 5) — USD 24.6/MBtu, Nov delivery; up from 24.1 on Sep 25 as the front month rolled to November and traders refocused on winter supply risks and storage well below the prior year's level" },
  { date: "2026-10-09", value: 26.7, assessed: true, tip: "JOGMEC (pub. Oct 13), Nov delivery", note: "Global LNG Hub (JOGMEC, published Oct 13) — USD 26.7/MBtu on Oct 9, Nov delivery; up from the 24.6 assessment of Oct 2 on tanker attacks in the strait, colder European weather, and constraints at Norway's Dvalin and Heidrun fields. Swapped in for the Oct 9 CFD market quote (25.7)." },
  { date: "2026-10-16", value: 28.9, assessed: true, tip: "JOGMEC (pub. Oct 19), Nov delivery", note: "Global LNG Hub (JOGMEC, published Oct 19) — USD 28.9/MBtu on Oct 16, Nov delivery; up from 26.7 on Oct 9 on tight spot LNG supply, reduced Norwegian gas supply, colder European weather, and Strait of Hormuz supply concerns." },
  { date: "2026-10-23", value: 30.8, assessed: true, tip: "JOGMEC (report dated Oct 26), Nov delivery", note: "Global LNG Hub (JOGMEC, report dated Oct 26) — USD 30.8/MBtu on Oct 23, Nov delivery; up from 28.9 on Oct 16 on supply disruptions at Norway's Troll and Asgard gas fields, colder European weather, and renewed Middle East tensions. EU underground storage was 74.6% on Oct 23, below the same period last year; the first net withdrawal of the winter season was recorded on Oct 20." },
  { date: "2026-10-30", value: 34.0, assessed: true, tip: "JOGMEC (pub. Nov 2), Dec delivery", note: "Global LNG Hub (JOGMEC, published Nov 2) — USD 34.0/MBtu on Oct 30, Dec delivery; up from 30.8 on Oct 23 on Middle East supply concerns, colder European weather, the extension of Norway's Oseberg field outage, and the Freeport LNG shutdown." },
  { date: "2026-11-06", value: 28.0, assessed: true, tip: "JOGMEC (pub. Nov 9), Dec delivery", note: "Global LNG Hub (JOGMEC, published Nov 9) — USD 28.0/MBtu on Nov 6, Dec delivery; down from 34.0 on Oct 30, around 18%, as expectations of easing Middle East tensions weighed on the market — a cautious US stance on resuming strikes (Nov 2) and the US midterm results (Nov 4) raised hopes of an early end to the war, and a sharp increase in European regasification also weighed. EU underground storage was 73.0% on Nov 6, down 12.6% from the same period last year and 18.6% below the five-year average (AGSI+)." },
];

export const gasJkm: GasPt[] = [
  { date: "2026-01-21", value: 10.73, note: "EIA weekly avg" },
  { date: "2026-02-13", value: 11.07 },
  { date: "2026-02-20", value: 10.50 },
  { date: "2026-02-27", value: 10.66, note: "pre-closure week" },
  { date: "2026-03-06", value: 15.14 },
  { date: "2026-03-13", value: 16.15 },
  { date: "2026-03-20", value: 20.67, note: "March peak" },
  { date: "2026-03-27", value: 20.58 },
  { date: "2026-04-03", value: 20.18 },
  { date: "2026-04-10", value: 19.74 },
  { date: "2026-04-17", value: 17.88 },
  { date: "2026-04-24", value: 16.02 },
  { date: "2026-04-30", value: 18.2, assessed: true, note: "assessed: low-USD 18s" },
  { date: "2026-05-08", value: 16.8, assessed: true, note: "assessed: high-USD 16s" },
  { date: "2026-05-15", value: 18.5, assessed: true, note: "assessed: mid-USD 18s" },
  { date: "2026-05-20", value: 19.8, assessed: true, note: "assessed: high-USD 19s" },
  { date: "2026-05-22", value: 18.8, assessed: true, note: "assessed: high-USD 18s" },
  { date: "2026-05-29", value: 18.5, assessed: true, note: "assessed: mid-USD 18s" },
  { date: "2026-06-05", value: 18.8, assessed: true, note: "assessed: high-USD 18s" },
  { date: "2026-06-08", value: 19.5, assessed: true, note: "assessed: mid-USD 19s" },
  { date: "2026-06-12", value: 17.8, assessed: true, note: "assessed: high-USD 17s" },
  { date: "2026-06-19", value: 15.8, assessed: true, note: "assessed: high-USD 15s" },
  { date: "2026-06-26", value: 15.2, assessed: true, note: "assessed: low-USD 15s" },
  { date: "2026-07-03", value: 16.5, assessed: true, note: "assessed: mid-USD 16s" },
  { date: "2026-07-10", value: 17.8, assessed: true, note: "assessed: high-USD 17s" },
  { date: "2026-07-17", value: 20.8, assessed: true, note: "assessed: high-USD 20s" },
  { date: "2026-07-31", value: 21.2, assessed: true, note: "assessed: low-USD 21s" },
  { date: "2026-08-07", value: 21.2, assessed: true, note: "assessed: low-USD 21s" },
  { date: "2026-08-14", value: 21.8, assessed: true, note: "assessed: high-USD 21s" },
  { date: "2026-08-19", value: 23.17, assessed: true, note: "assessed price, Aug 19" },
  { date: "2026-08-21", value: 23.8, assessed: true, note: "assessed: high-USD 23s" },
  { date: "2026-08-28", value: 24.5, assessed: true, note: "assessed: mid-USD 24s" },
  { date: "2026-09-04", value: 25.5, assessed: true, note: "assessed: mid-USD 25s" },
  { date: "2026-09-11", value: 28.5, assessed: true, tip: "assessed: mid-USD 28s (record Sep 10)", note: "assessed: mid-USD 28s (record: high-USD 28s on Sep 10, per JOGMEC)" },
  { date: "2026-09-18", value: 27.2, assessed: true, tip: "JOGMEC (pub. Sep 24), Nov delivery", note: "assessed: low-USD 27s (JOGMEC, published Sep 24, Nov delivery; swapped in for the CFD quote 27.51)" },
  { date: "2026-09-25", value: 25.2, assessed: true, tip: "JOGMEC: low-$25s · Nov delivery · pub. Sep 28", note: "assessed: low-USD 25s (JOGMEC, published Sep 28, Nov delivery; down from low-USD 27s on Sep 18)" },
  { date: "2026-10-02", value: 24.8, assessed: true, tip: "JOGMEC: high-$24s · Nov delivery · pub. Oct 5", note: "assessed: high-USD 24s (JOGMEC, published Oct 5, Nov delivery; down from low-USD 25s on Sep 25 as East Asian buying stayed subdued and winter outlooks turned mild)" },
  { date: "2026-10-09", value: 26.2, assessed: true, tip: "JOGMEC: low-$26s · Nov delivery · pub. Oct 13", note: "assessed: low-USD 26s (JOGMEC, published Oct 13, Nov delivery; up from high-USD 24s on Oct 2 as renewed attacks in the strait and Middle East tensions lifted LNG supply concerns)" },
  { date: "2026-10-16", value: 29.8, assessed: true, tip: "JOGMEC: high-$29s · Dec delivery · pub. Oct 19", note: "assessed: high-USD 29s (JOGMEC, published Oct 19, Dec delivery; up from low-USD 26s on Oct 9 as the delivery month rolled to December and spot procurement by South Korea and Thailand picked up on Middle East supply risks)" },
  { date: "2026-10-23", value: 31.8, assessed: true, tip: "JOGMEC: high-$31s · Dec delivery · report dated Oct 26", note: "assessed: high-USD 31s (JOGMEC, report dated Oct 26, Dec delivery; up from high-USD 29s on Oct 16 on stronger prompt demand from China, South Korea and India and winter-supply concerns amid continued Middle East uncertainty; Japan's power-generation LNG inventories fell 0.10M tonnes to 2.54M on Oct 18)" },
  { date: "2026-10-30", value: 34.0, assessed: true, tip: "JOGMEC: low-$34s · Dec delivery · pub. Nov 2", note: "assessed: low-USD 34s (JOGMEC, published Nov 2, Dec delivery; up from high-USD 31s on Oct 23 on winter demand expectations and renewed Middle East supply concerns)" },
  { date: "2026-11-06", value: 32.2, assessed: true, tip: "JOGMEC: low-$32s · Dec delivery · pub. Nov 9", note: "assessed: low-USD 32s (JOGMEC, published Nov 9, Dec delivery; down from low-USD 34s on Oct 30 as expectations of an early diplomatic resolution weighed — the post notes JKM touched the mid-29s on Nov 5 before rebounding to the high-31s by the end of the week as participants turned cautious on a supply recovery; Asian end-user buying remained weak, and Japan's power-generation LNG inventories stood at 1.92M tonnes as of Nov 1, down 0.23M tonnes from the previous week (METI, Nov 4))" },
];

export const gasPreClosure = { ttf: 10.99, jkm: 10.66 };

// ---- US 10-year Treasury yield ----
// Weekly Friday closes, FRED DGS10 (fetched 2026-09-10), plus Sep 9 (Wednesday, FRED) and
// Sep 10 (Yahoo ^TNX daily — reconciles: Sep 9 Yahoo 4.837 ≈ FRED 4.83). Sep 11 and Sep 14
// are session closes (Yahoo) — FRED hasn't posted them at update time.
// Jun 19 missing from the source (holiday) — the gap is real, not interpolated.
// Cross-verified: Sep 1 = 4.79 here vs "~4.78% on Tuesday" (Euronews Sep 1); Sep 9 4.83 =
// "highest level since 2023" (CNBC Sep 9); 4.8% = "the high reached in January 2025" (CNBC Sep 7).
export interface Y10Pt {
  date: string;
  value: number;
  note?: string;
  fred?: boolean; // true = FRED DGS10 close; unset = Yahoo ^TNX session close
  usDaily?: boolean; // true = US Treasury daily par yield (Oct 22+); overrides fred
}
export const treasury10y: Y10Pt[] = [
  { fred: true, date: "2026-01-02", value: 4.19 },
  { fred: true, date: "2026-01-09", value: 4.18 },
  { fred: true, date: "2026-01-16", value: 4.24 },
  { fred: true, date: "2026-01-23", value: 4.24 },
  { fred: true, date: "2026-01-30", value: 4.26 },
  { fred: true, date: "2026-02-06", value: 4.22 },
  { fred: true, date: "2026-02-13", value: 4.04 },
  { fred: true, date: "2026-02-20", value: 4.08 },
  { fred: true, date: "2026-02-27", value: 3.97 },
  { fred: true, date: "2026-03-06", value: 4.15 },
  { fred: true, date: "2026-03-13", value: 4.28 },
  { fred: true, date: "2026-03-20", value: 4.39 },
  { fred: true, date: "2026-03-27", value: 4.44 },
  { fred: true, date: "2026-04-03", value: 4.35 },
  { fred: true, date: "2026-04-10", value: 4.31 },
  { fred: true, date: "2026-04-17", value: 4.26 },
  { fred: true, date: "2026-04-24", value: 4.31 },
  { fred: true, date: "2026-05-01", value: 4.39 },
  { fred: true, date: "2026-05-08", value: 4.38 },
  { fred: true, date: "2026-05-15", value: 4.59 },
  { fred: true, date: "2026-05-22", value: 4.56 },
  { fred: true, date: "2026-05-29", value: 4.45 },
  { fred: true, date: "2026-06-05", value: 4.55 },
  { fred: true, date: "2026-06-12", value: 4.48 },
  { fred: true, date: "2026-06-26", value: 4.38 },
  { fred: true, date: "2026-07-10", value: 4.56 },
  { fred: true, date: "2026-07-17", value: 4.55 },
  { fred: true, date: "2026-07-24", value: 4.69 },
  { fred: true, date: "2026-07-31", value: 4.75 },
  { fred: true, date: "2026-08-07", value: 4.65 },
  { fred: true, date: "2026-08-14", value: 4.68 },
  { fred: true, date: "2026-08-21", value: 4.74 },
  { fred: true, date: "2026-08-28", value: 4.73 },
  { fred: true, date: "2026-09-04", value: 4.78 },
  { fred: true, date: "2026-09-09", value: 4.83 },
  { fred: true, date: "2026-09-10", value: 4.95, note: "FRED (was Yahoo 4.94; FRED posted Sep 11)" },
  { date: "2026-09-11", value: 4.975, note: "session close (Yahoo) · intraday 4.992, highest since Oct 2023" },
  { date: "2026-09-14", value: 4.961, note: "session close (Yahoo)" },
  { date: "2026-09-15", value: 4.996, note: "session close (Yahoo) · pre-Fed (decision Sep 16, 14:00 ET)" },
  { date: "2026-09-16", value: 5.006, note: "session close (Yahoo) · first close above 5% of the war · post-hike" },
  { date: "2026-09-17", value: 4.947, note: "session close (Yahoo) · back below 5%" },
  { date: "2026-09-18", value: 4.998, note: "session close (Yahoo) · just below 5%" },
  { date: "2026-09-21", value: 4.96, note: "session close (Yahoo) · below 5%" },
  { date: "2026-09-22", value: 4.968, note: "session close (Yahoo) · below 5%" },
  { date: "2026-09-23", value: 5.11, note: "session close (Yahoo) · +14bp, back above 5% — flash PMI (mfg 57.0, fastest since 2022) stoked Fed-hike bets (CNN)" },
  { date: "2026-09-24", value: 5.162, note: "session close (Yahoo) · +5bp — second straight close above 5%, with oil prices rising and markets expecting another Fed rate increase" },
  { date: "2026-09-25", value: 5.18, note: "session close (Yahoo) · +2bp — third straight close above 5%, the highest close of the war" },
  { date: "2026-09-28", value: 5.24, note: "session close (Yahoo) · +6bp — fourth straight close above 5%, the highest close of the war" },
  { date: "2026-09-29", value: 5.255, note: "session close (Yahoo) · fifth straight close above 5%, the highest close of the war" },
  { date: "2026-09-30", value: 5.293, note: "session close (Yahoo) · sixth straight close above 5%, the highest close of the war" },
  { date: "2026-10-01", value: 5.237, note: "session close (Yahoo) · seventh straight close above 5%, down from the war's high close (5.293, Sep 30)" },
  { date: "2026-10-02", value: 5.277, note: "session close (Yahoo) · eighth straight close above 5%, still below the war's high close (5.293, Sep 30) — the G7 reserve release and a weak September jobs report (29k jobs, unemployment up) cut Fed-hike odds (Kitco, Oct 2)" },
  { date: "2026-10-05", value: 5.311, note: "session close (Yahoo) · ninth straight close above 5%" },
  { date: "2026-10-06", value: 5.269, note: "session close (Yahoo) · tenth straight close above 5%, down from the war's high close (5.311, Oct 5)" },
  { date: "2026-10-07", value: 5.277, note: "session close (Yahoo) · eleventh straight close above 5%" },
  { date: "2026-10-08", value: 5.231, note: "session close (Strategitz; Rio Times; Yahoo ^TNX bar) · twelfth straight close above 5%" },
  { date: "2026-10-09", value: 5.244, note: "session close (Yahoo ^TNX bar) · thirteenth straight close above 5%" },
  // Oct 12 (Columbus Day) — US Treasury cash market CLOSED (SIFMA holiday schedule);
  // the Yahoo ^TNX bar is a flat carryover (O=H=L=C=5.240), not a session. No point.
  // (The daily-update apply step re-added it on Oct 13 — removed again; the script
  //  can’t know about bond holidays, so re-check after every apply.)
  { date: "2026-10-13", value: 5.217, note: "session close (Yahoo ^TNX) · fourteenth straight close above 5% — the first cash close since Oct 9 (the market was closed Oct 12 for Columbus Day; the bar is a real session, not a flat carryover)" },
  { date: "2026-10-14", value: 5.19, note: "session close (Yahoo ^TNX) · fifteenth straight close above 5% — the above-forecast Sep CPI (3.7% YoY) kept yields near their highs; intraday high 5.33 (Yahoo bar), and Fed's Daly said further hikes were likely needed but saw no urgency for an October move (Reuters, Oct 14)" },
  { date: "2026-10-15", value: 5.089, note: "session close (Yahoo ^TNX) · sixteenth straight close above 5% — yields eased from their highs even with the hot Sep PPI (6.3% YoY, released this morning) and a 3% WTI rally; intraday low 5.04 (Yahoo bar), and the Fed's October-hike odds slipped to ~20% (OilPrice, Oct 15)" },
  { date: "2026-10-16", value: 5.098, note: "session close (Yahoo ^TNX) · seventeenth straight close above 5% — a normal Friday session; yields steady even with Brent at its highest settlement since May 19 and the strait attacks escalating (Yahoo, Oct 16)" },
  { date: "2026-10-19", value: 5.136, note: "session close (Yahoo, same-day) · eighteenth straight close above 5%" },
  { date: "2026-10-20", value: 5.117, note: "session close (Yahoo, same-day) · nineteenth straight close above 5%" },
  { date: "2026-10-21", value: 5.146, note: "session close (Yahoo, same-day) · twentieth straight close above 5%" },
  { date: "2026-10-22", value: 4.96, usDaily: true, note: "US Treasury daily par yield (official curve — per Treasury methodology, an interpolated estimate from indicative bid-side quotations, not actual transactions; Yahoo last trade 4.953, a CNBC-attributed wrap quoted 4.972) · first close below 5% after twenty straight above (Sep 23–Oct 21, official series) — safe-haven bond demand on the AI/tech stock selloff (Nasdaq's worst day since June) even as oil spiked (AP, Oct 22)" },
  { date: "2026-10-23", value: 4.99, note: "session close (Yahoo ^TNX 4.988; the official Treasury daily par CSV was unavailable at publication time) · second straight close below 5%" },
  { date: "2026-10-26", value: 4.986, note: "session close (Yahoo ^TNX) · third straight close below 5%" },
  { date: "2026-10-27", value: 4.993, note: "session close (Yahoo ^TNX) · fourth straight close below 5%" },
  { date: "2026-10-28", value: 5.045, note: "session close (Yahoo ^TNX) · back above 5% after four straight closes below it (Oct 22–27); first close above 5% since Oct 21 (5.146)" },
  { date: "2026-10-29", value: 4.989, note: "session close (Yahoo) · back below 5%" },
  { date: "2026-10-30", value: 4.929, note: "session close (Yahoo ^TNX) · second straight close below 5%; back below 4.95 after the Oct 28 bounce to 5.045" },
  { date: "2026-11-02", value: 4.894, note: "session close (Yahoo ^TNX) · third straight close below 5%" },
  { date: "2026-11-03", value: 4.952, note: "session close (Yahoo ^TNX) · fourth straight close below 5%" },
  { date: "2026-11-04", value: 4.894, note: "session close (Yahoo ^TNX) · fifth straight close below 5% — yields eased with the post-midterm oil rout (the Fed's H.15 constant-maturity value for Nov 4 is not yet posted as of the Nov 5 morning pass)" },
  { date: "2026-11-05", value: 4.837, note: "session close (Yahoo ^TNX) · sixth straight close below 5% — yields eased further as oil rebounded (the Fed's H.15 constant-maturity value for Nov 5 is not yet posted as of the evening pass)" },
  { date: "2026-11-06", value: 4.859, note: "session close (Yahoo ^TNX) · seventh straight close below 5% — yields edged up 2bp as the oil rout continued (the Fed's H.15 constant-maturity value for Nov 6 is not yet posted as of the Nov 7 morning pass)" },
  { date: "2026-11-09", value: 4.864, note: "session close (Yahoo ^TNX) · eighth straight close below 5% — yields little changed as oil sold off" },
  { date: "2026-11-10", value: 4.983, note: "session close (Yahoo ^TNX) · ninth straight close below 5% — up ~12bp on the day, after the above-expected October CPI release (the Fed's H.15 constant-maturity value for Nov 10 is not yet posted at the evening pass)" },
];
export const treasuryPreWar = 3.97; // week of Feb 27, before the closure
export const treasuryTestLevel = 4.8; // "the high reached in January 2025" — the level strategists watch (CNBC, Sep 7)

// ---- US CPI, % year-over-year, monthly ----
// Jan–Jul: official BLS annual changes, all reported. Pulled from the BLS API (series
// CUUR0000SA0 — "All items, U.S. city average, all urban consumers, not seasonally
// adjusted" — 12-mo pct change), which reproduces every news-reported value (May 4.2,
// Jun 3.5, Jul 3.4, etc.). Jan–Feb were previously computed from the FRED index
// (2.39/2.43); the official series gives 2.39/2.41, so the computed flag is gone and
// all points are filled. Aug 2026 print due Sep 11 — re-pull CUUR0000SA0 and append.
export interface CpiPt {
  date: string;
  value: number;
  computed?: boolean;
}
export const cpiYtd: CpiPt[] = [
  { date: "2026-01-31", value: 2.39 },
  { date: "2026-02-28", value: 2.41 },
  { date: "2026-03-31", value: 3.3 },
  { date: "2026-04-30", value: 3.8 },
  { date: "2026-05-31", value: 4.2 },
  { date: "2026-06-30", value: 3.5 },
  { date: "2026-07-31", value: 3.4 },
  { date: "2026-08-31", value: 3.4 },
  // Sep 2026: BLS release Oct 14 — 3.7% YoY (+0.6% MoM), ahead of the ~3.6% consensus;
  // core 2.6% YoY (+0.3% MoM seasonally adjusted, was 2.4% YoY). Gasoline +34% YoY (BLS). BLS index 336.94.
  { date: "2026-09-30", value: 3.7 },
];
export const fedCpiTarget = 2.0;

// ---- US PPI (final demand), % year-over-year, monthly ----
// BLS PPI release Table A: "Change in final demand from 12 months ago (unadj.)" —
// all official reported values, no computation. Jul 4.9 and Aug 5.6 per the Oct 15 release
// (revised from 4.8 / 5.4 as first reported); Sep 6.3 released Oct 15 — the largest 12-mo
// increase since Dec 2022 (6.4); the +1.3% month is the largest since Mar 2022 (1.7%); goods
// +2.6% (largest since the series began, Dec 2009), energy +10.8%, gasoline +20.3% (BLS).
// RESOLVED Sep 10 via the BLS API: these are exactly the official 12-mo pct changes of
// series WPUFD4 ("Final demand, not seasonally adjusted"); the Sep 10 release values matched
// the wire to the decimal. FRED's PPIACO is simply a different series, which is why it never
// reconciled. BLS-reported values were authoritative all along. See research/2026-09-10.md.
export const ppiYtd: CpiPt[] = [
  { date: "2026-01-31", value: 3.1 },
  { date: "2026-02-28", value: 3.4 },
  { date: "2026-03-31", value: 4.3 },
  { date: "2026-04-30", value: 5.7 },
  { date: "2026-05-31", value: 5.9 },
  { date: "2026-06-30", value: 5.6 },
  { date: "2026-07-31", value: 4.9 },
  { date: "2026-08-31", value: 5.6 },
  // Sep 2026: BLS release Oct 15 — 6.3% YoY (unadj. 12-mo), largest since Dec 2022;
  // +1.3% MoM SA, largest since Mar 2022. BLS index 159.613.
  { date: "2026-09-30", value: 6.3 },
];

// ---------- Streaks (derived, Oct 5) ----------
// The "NNth straight …" sub-lines, headings, and aria fragments used to be typed by
// hand each pass. Count backwards from the last point; a streak is consecutive
// points (no gaps allowed — the arrays are strictly increasing dates) on one side
// of a threshold. wordNum/wordNumOrdinal above give the phrasing.
// Ordinal word. n >= 1 required (callers branch on zero before calling — a zero streak
// must get its own sentence, never ordinal(0)). The 1-19 forms are irregular enough to
// table (fifth, eighth, ninth, twelfth); 20+ combines the tens word with the unit
// ordinal (twenty-fifth) or takes "th" (thirtieth, fortieth).
const UNIT_ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
  "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];
export const ordinal = (n: number) => {
  if (n < 1) return `${n}th`; // caller bug — surface it in output, never "undefined"
  if (n < 20) return UNIT_ORDINALS[n - 1];
  if (n < 100) {
    const last = n % 10, tens = TENS[Math.floor(n / 10)];
    // 20/30/… drop the "y" and take "ieth": twenty → twentieth, thirty → thirtieth
    return last ? `${tens}-${UNIT_ORDINALS[last - 1]}` : `${tens.slice(0, -1)}ieth`;
  }
  return `${n}th`;
};
// consecutive closes above `threshold`, ending at the latest point
export const aboveStreak = (pts: { value: number }[], threshold: number) => {
  let n = 0;
  for (let i = pts.length - 1; i >= 0; i--) if (pts[i].value > threshold) n++; else break;
  return n;
};
// consecutive readings below `threshold`, ending at the latest point
export const belowStreak = (pts: { value: number }[], threshold: number) => {
  let n = 0;
  for (let i = pts.length - 1; i >= 0; i--) if (pts[i].value < threshold) n++; else break;
  return n;
};
// 10-yr: consecutive session closes above 5% (the "eighth straight close above 5%" copy)
export const treasuryAbove5Streak = aboveStreak(treasury10y, 5);
// refinery utilization: consecutive weeks below 95% (the "second straight week" heading)
export const refineryBelow95Streak = belowStreak(usRefineryUtil2026, 95);
// 10-yr points that are Yahoo session closes, not FRED — the panel's source sub-line
// lists them (was a hand-typed date list; it went stale for the same reason wtiNonFred did)
export const treasuryNonFred = treasury10y.filter((p) => !p.fred).map((p) => p.date);
// 10-yr points that are US Treasury daily par yields (not FRED, not Yahoo) — the
// panel's source sub-line and the tooltip label these separately (Oct 22 onward)
export const treasuryUsDaily = treasury10y.filter((p) => p.usDaily).map((p) => p.date);
// same for WTI — the tooltip source label ("front-month futures close" vs "FRED weekly spot")
export const wtiNonFred = wtiWeekly.filter((p) => !p.fred).map((p) => p.date);

// ---------- UKMTO maritime incidents (attack-frequency chart, Oct 5) ----------
// UKMTO (UK Maritime Trade Operations) numbers each confirmed incident sequentially
// FOR THE YEAR ("NNN-26" = the NNNth confirmed incident of 2026) — the first three
// reports predate the war (the official "incidents since 28 Feb" list starts at #4;
// JMIC Monthly Statistics Mar 2026 puts the last pre-war incident on Feb 17). Its
// "Recent Incidents" page (ukmto.org/recent-incidents) is a SLIDING WINDOW (roughly
// the last 96 days) — the chart plots the window we
// captured on 2026-10-05 (via a web reader; ukmto.org is Cloudflare-blocked from
// this box), and the raw entries are kept here so the series survives the page
// scrolling and future passes can diff the page against this array.
// type is UKMTO's own classification: attack / hijack / advisory / suspicious activity.
// EXTENDING THE SERIES: the page slides, but this array is CUMULATIVE — each pass
// fetches the page, keeps everything already here, appends entries with numbers
// beyond the current max, and updates ukmtoCoverageEnd to the capture date, even
// on quiet days. Keep ukmtoCoverageStart fixed and update the caption date.
// (When the bar count gets unwieldy, trim the plot to a recent span with a caption
// note — do not trim the array.)
// Caveats (also in the chart caption):
//  - the window starts at #78 on Jul 1 → 77 reports preceded it (3 pre-war,
//    the rest Feb 28 – Jun 30);
//  - report numbers #99, #100, #125 are NOT shown on the page; JMIC Update 080
//    (Aug 4) records Egyptian authorities confirming #99/#100 as "likely UAV
//    maritime attacks", so the attack counts may understate by up to 2 (all three
//    would be attacks in that case);
//  - UKMTO only counts incidents it can verify through primary sources and says
//    other strikes probably go unreported.
// #166–#169 are time-late reports (published Oct 12; payload archived
// research/data/ukmto/ukmto-all-2026-10-13T0547Z.json). Rule: UKMTO's explicit
// incident date wins; otherwise the report-logged date stands. #166's report
// body states "Incident Date: 11 Oct 2026" → Oct 11. #167–#169 carry no explicit
// incident date in the body (the API's utcDateOfIncident is the registration
// time) → Oct 12 as logged; the wire (Maritime Executive) places all four on Oct 11.
// #172/#173: the API's utcDateOfIncident says Oct 14 (14:10/14:21 UTC), but the
// ORIGINAL UKMTO warnings print "Incident Date: 13 OCT 2026" (1640/1700 UTC) — and the
// API's own utcDateCreated (Oct 14 13:13/13:23 UTC) PREDATES its claimed incident
// times, which is impossible. The warnings are the primary source; the API field is
// wrong. Rows date the INCIDENT (Oct 13), not the report issuance (Oct 14, time-late).
// Originals archived: research/sources/ukmto-2026-10-14-review/ (PDFs + provenance).
// #180 (Oct 21 fetch): UKMTO WARNING 180-26, time-late report — tanker struck by an
// unknown projectile 30NM southeast of Al Faw, Iraq (northern Arabian Gulf), 20 Oct
// 1830 UTC (explicit "Incident Date: 20 Oct 2026" in the body); crew safe, no reported
// damage/environmental impact. Registered Oct 21 10:26 UTC. (QC Intel's "near Duqm"
// headline is a misplacement — the UKMTO record says Al Faw; primary source wins.)
// 28082035: an ADVISORY-SCHEME slot (advisories carry both a sequential number
// and a separate large ID — the Oct 10 tanker-and-military-forces advisory is #163
// in the sequential scheme and 28082035 in the advisory scheme; same sitecoreId
// 996a55c6). Oct 21 fetch: the API REPURPOSED the 28082035 slot to hold UKMTO
// WARNING 179-26: tanker struck by an unknown projectile 11NM west of Bukha, Oman
// (Strait of Hormuz), 21 Oct 0145 UTC (explicit in body), fire extinguished, at
// anchor, all crew safe (sitecoreId e89b2678). Mirrored here as attack/2026-10-21;
// the internal warning number 179-26 explains the publicly missing #179. The
// advisory itself still stands, as #163.
// Oct 22 follow-up: the API DROPPED the 28082035 slot and re-issued the identical
// record (same sitecoreId e89b2678, same created timestamp Oct 21 12:07 UTC) under
// the sequential number #179. The Oct 22 run then appended #179 as a "new"
// incident and the Bukha attack was double-counted (rows 179 and 28082035). The
// attack is counted ONCE, under #179; the 28082035 row was removed Oct 22 (see
// log 2026-10-22, "Data corrections"). The Oct 10 advisory was withdrawn by
// UKMTO itself; its payload remains in the archive.
// #187: UKMTO RECLASSIFIED it from "suspicious activity" to "attack" in the API
// (Oct 31 fetch; the Oct 30 payload still shows the earlier type). UKMTO WARNING
// 187-26; the coverage identifies the vessel as the Panamanian-flagged tanker
// Louise 1, struck by two limpet mines ~25NM NE of Khasab (GlobalSecurity Day
// 246, Oct 31); the updated warning says the fire was extinguished and the
// vessel resumed its voyage — an attack, not a loss. #188/#189 (both published
// Oct 30): #188 = projectile hit on an unnamed vessel 40NM south of Lavan
// Island (fire onboard, crew safe); #189 = time-late projectile hit on a crude
// tanker outbound in the strait — its incident DATE is 2026-10-28: UKMTO
// Warning 189-26's PDF face states incident date 28 October 2026, time TBC,
// source Verified (PDF transcription: REGULAS SHIPPING, Oct 31; Iran
// International restates the same date). The API's utcDateOfIncident
// (2026-10-30T20:11Z) is the registration time of the time-late report, not
// the incident time (same pattern as the #166–#169 precedent above). Same
// weekly bin (Oct 26–31) either way. ukmto-fetch.mjs will keep FLAGGING #189
// against the API's registration timestamp — that is EXPECTED; the row stands
// at 2026-10-28 per the warning PDF and must not be "fixed" back to Oct 30.
// The
// Panamanian-flagged crude tanker RITI (IMO 9249075) had its 25 crew evacuated
// by Oman on Oct 30 while burning — the strongest loss candidate, but no
// confirmed sinking yet (tanker-loss input stays at 1 until confirmed).
// #190 (Oct 31): a dhow boarded by unauthorised personnel in the Indian Ocean
// (Gulf of Aden area, 9.9N 53.05E) — a piracy/PAG concern, NOT a Hormuz attack;
// it still counts in the cumulative array. (Nov 1 fetch, payload archived at
// research/data/ukmto/ukmto-all-20261101T134818Z.json.) Nov 2 fetch: the API
// reclassified the entry "suspicious activity" → "hijack" — adopted (primary
// source wins; payload research/data/ukmto/ukmto-all-20261102T133612Z.json).
// #191/#192: Vanguard Tech identifies the vessels as Selat Storm (reported
// partially sinking) and Largo Atom (reported loss of power), via Maritime
// Executive, Nov 1 article updated with the overnight tanker report. UKMTO
// does not name either vessel. #192 DATE EXCEPTION (resolved Nov 2, per
// review-2026-11-02.md): the API's structured utcDateOfIncident field says
// Nov 2 01:36 UTC (4 min before the warning's creation — a receipt time, not
// the incident), but the face of Warning 192-26 gives incident date 1 Nov
// 2026, time 2347 UTC, source Master — corroborated by two independent
// accounts of the PDF (regulasshipping transcription; Defense & Tech citing
// UKMTO). Incident-date-over-registration policy applies (same as #189):
// row stands at 2026-11-01. This crosses the Monday weekly boundary — the
// Oct 26–Nov 1 bar is 7 (with #193), the Nov 2–8 bar 0.
// #193 DATE EXCEPTION (resolved Nov 2 evening): the API's utcDateOfIncident
// says Nov 2 18:47 UTC — 2 minutes before the warning's creation (18:49),
// a registration timestamp for a time-late report (same pattern as
// #166–#169, #189, #192). Warning 193-26 covers this Lima incident — UKMTO's
// own @UK_MTO post (Nov 2) is labeled "UKMTO WARNING 193-26", so the API
// body's "192-26" label is a UKMTO copy-paste error. Two wire accounts of
// the warning date the incident 20:20 UTC Sunday, Nov 1 (Arab Times, Nov 2:
// "In Warning 193-26, UKMTO said it received a report of the incident at
// 2020 UTC on Nov 1"; Anadolu, Nov 2: "at 2020GMT Sunday"). Incident-date-
// over-registration policy applies: row stands at 2026-11-01. ukmto-fetch.mjs
// will keep FLAGGING #193 against the API's registration timestamp — that is
// EXPECTED; do not "fix" the row back to Nov 2.
// #194 (RE-SLOTTED Nov 3 — confirmed in the evening fetch): the Al Jusufi
// attack first appeared in the advisory-scheme slot 28082035 (morning fetch;
// incident 2026-11-02 11:05 UTC per the API); UKMTO re-issued it as #194
// (same sitecoreId 94af9191). Counted ONCE, here as #194 — do not double-
// count (Oct 22 Bukha precedent: e89b2678, #179, previously held the slot).
// At re-slot the API OVERWROTE utcDateOfIncident with the registration
// timestamp (Nov 3 13:16 UTC); the incident date stays 2026-11-02.
// UKMTO WARNING 194-26: Indian-flagged dhow MSV Al Jusufi, strait — one crew
// member died, 13 rescued (India says Omani Coast Guard; UKMTO's warning says
// Royal Navy of Oman); vessel's status unknown.
// #195 (Nov 3 evening): tanker struck by two unidentified projectiles in the
// engine room, 14NM northeast of Lima, Oman (Xinhua/Times of Israel/Arab
// Times). API incident time 21:06 UTC is a registration timestamp (wires: 19:00
// GMT); same calendar day either way — row stands at 2026-11-03.
// #196: UKMTO issued the report Nov 5 for a tanker struck by two projectiles
// 50NM north of Madinat ash Shamal, Qatar (26°23'N 51°01'E). Reuters/AP date
// the incident to Nov 4, 23:20 UTC; the saved API's utcDateOfIncident field
// instead says Nov 5, 08:00 UTC. Use Nov 4 per the time printed in reporting;
// crew status, damage, and environmental impact remain unconfirmed.
// Nov 5 flag re-confirmation: the API re-flagged #189/#192/#193/#194 with the
// SAME registration timestamps as every prior pull (unchanged fields, no body
// edits) — all four rows stand at their adjudicated incident dates above; the
// flags are EXPECTED, not new re-classifications.
// NOTE: keep this array's body to entry lines only — ukmto-fetch.mjs parses each line
// strictly and rewrites the whole array on --apply, so inline comments would break it.
export const ukmtoIncidents: { num: number; type: "attack" | "hijack" | "advisory" | "suspicious activity"; date: string }[] = [
  { num: 78, type: "suspicious activity", date: "2026-07-01" },
  { num: 79, type: "attack", date: "2026-07-05" },
  { num: 80, type: "attack", date: "2026-07-06" },
  { num: 81, type: "attack", date: "2026-07-07" },
  { num: 82, type: "attack", date: "2026-07-07" },
  { num: 83, type: "attack", date: "2026-07-11" },
  { num: 84, type: "suspicious activity", date: "2026-07-13" },
  { num: 85, type: "attack", date: "2026-07-13" },
  { num: 86, type: "attack", date: "2026-07-14" },
  { num: 87, type: "attack", date: "2026-07-14" },
  { num: 88, type: "attack", date: "2026-07-17" },
  { num: 89, type: "advisory", date: "2026-07-17" },
  { num: 90, type: "hijack", date: "2026-07-17" },
  { num: 91, type: "advisory", date: "2026-07-17" },
  { num: 92, type: "attack", date: "2026-07-19" },
  { num: 93, type: "attack", date: "2026-07-19" },
  { num: 94, type: "attack", date: "2026-07-20" },
  { num: 95, type: "attack", date: "2026-07-22" },
  { num: 96, type: "advisory", date: "2026-07-25" },
  { num: 97, type: "suspicious activity", date: "2026-07-24" },
  { num: 98, type: "advisory", date: "2026-07-27" },
  { num: 101, type: "attack", date: "2026-08-01" },
  { num: 102, type: "attack", date: "2026-08-01" },
  { num: 103, type: "advisory", date: "2026-08-02" },
  { num: 104, type: "attack", date: "2026-08-03" },
  { num: 105, type: "attack", date: "2026-08-05" },
  { num: 106, type: "attack", date: "2026-08-05" },
  { num: 107, type: "advisory", date: "2026-08-05" },
  { num: 108, type: "attack", date: "2026-08-08" },
  { num: 109, type: "advisory", date: "2026-08-11" },
  { num: 110, type: "attack", date: "2026-08-11" },
  { num: 111, type: "attack", date: "2026-08-14" },
  { num: 112, type: "attack", date: "2026-08-14" },
  { num: 113, type: "attack", date: "2026-08-14" },
  { num: 114, type: "hijack", date: "2026-08-17" },
  { num: 115, type: "attack", date: "2026-08-18" },
  { num: 116, type: "attack", date: "2026-08-18" },
  { num: 117, type: "attack", date: "2026-08-18" },
  { num: 118, type: "hijack", date: "2026-08-20" },
  { num: 119, type: "attack", date: "2026-08-24" },
  { num: 120, type: "attack", date: "2026-08-24" },
  { num: 121, type: "attack", date: "2026-08-27" },
  { num: 122, type: "attack", date: "2026-08-29" },
  { num: 123, type: "advisory", date: "2026-08-31" },
  { num: 124, type: "attack", date: "2026-08-31" },
  { num: 126, type: "attack", date: "2026-09-02" },
  { num: 127, type: "advisory", date: "2026-09-05" },
  { num: 128, type: "advisory", date: "2026-09-08" },
  { num: 129, type: "advisory", date: "2026-09-09" },
  { num: 130, type: "attack", date: "2026-09-09" },
  { num: 131, type: "attack", date: "2026-09-09" },
  { num: 132, type: "suspicious activity", date: "2026-09-10" },
  { num: 133, type: "attack", date: "2026-09-10" },
  { num: 134, type: "attack", date: "2026-09-12" },
  { num: 135, type: "attack", date: "2026-09-15" },
  { num: 136, type: "suspicious activity", date: "2026-09-17" },
  { num: 137, type: "attack", date: "2026-09-17" },
  { num: 138, type: "attack", date: "2026-09-18" },
  { num: 139, type: "attack", date: "2026-09-18" },
  { num: 140, type: "attack", date: "2026-09-21" },
  { num: 141, type: "attack", date: "2026-09-21" },
  { num: 142, type: "attack", date: "2026-09-23" },
  { num: 143, type: "suspicious activity", date: "2026-09-28" },
  { num: 144, type: "attack", date: "2026-09-30" },
  { num: 145, type: "attack", date: "2026-09-30" },
  { num: 146, type: "attack", date: "2026-09-30" },
  { num: 147, type: "attack", date: "2026-10-01" },
  { num: 148, type: "attack", date: "2026-10-02" },
  { num: 149, type: "attack", date: "2026-10-02" },
  { num: 150, type: "attack", date: "2026-10-04" },
  { num: 151, type: "suspicious activity", date: "2026-10-04" },
  { num: 152, type: "suspicious activity", date: "2026-10-05" },
  { num: 153, type: "attack", date: "2026-10-04" },
  { num: 154, type: "attack", date: "2026-10-04" },
  { num: 155, type: "attack", date: "2026-10-03" },
  { num: 156, type: "attack", date: "2026-10-05" },
  { num: 157, type: "attack", date: "2026-10-05" },
  { num: 158, type: "attack", date: "2026-10-07" },
  { num: 159, type: "attack", date: "2026-10-06" },
  { num: 160, type: "attack", date: "2026-10-09" },
  { num: 162, type: "attack", date: "2026-10-10" },
  { num: 163, type: "advisory", date: "2026-10-10" },
  { num: 164, type: "attack", date: "2026-10-11" },
  { num: 165, type: "attack", date: "2026-10-11" },
  { num: 166, type: "attack", date: "2026-10-11" },
  { num: 167, type: "attack", date: "2026-10-12" },
  { num: 168, type: "attack", date: "2026-10-12" },
  { num: 169, type: "attack", date: "2026-10-12" },
  { num: 170, type: "attack", date: "2026-10-13" },
  { num: 171, type: "attack", date: "2026-10-13" },
  { num: 172, type: "attack", date: "2026-10-13" },
  { num: 173, type: "attack", date: "2026-10-13" },
  { num: 174, type: "attack", date: "2026-10-16" },
  { num: 175, type: "attack", date: "2026-10-16" },
  { num: 176, type: "attack", date: "2026-10-17" },
  { num: 177, type: "attack", date: "2026-10-18" },
  { num: 178, type: "advisory", date: "2026-10-20" },
  { num: 179, type: "attack", date: "2026-10-21" },
  { num: 180, type: "attack", date: "2026-10-20" },
  { num: 181, type: "attack", date: "2026-10-22" },
  { num: 182, type: "attack", date: "2026-10-23" },
  { num: 183, type: "suspicious activity", date: "2026-10-26" },
  { num: 184, type: "advisory", date: "2026-10-28" },
  { num: 185, type: "suspicious activity", date: "2026-10-29" },
  { num: 186, type: "attack", date: "2026-10-29" },
  { num: 187, type: "attack", date: "2026-10-29" },
  { num: 188, type: "attack", date: "2026-10-30" },
  { num: 189, type: "attack", date: "2026-10-28" },
  { num: 190, type: "hijack", date: "2026-10-31" },
  { num: 191, type: "attack", date: "2026-11-01" },
  { num: 192, type: "attack", date: "2026-11-01" },
  { num: 193, type: "attack", date: "2026-11-01" },
  { num: 194, type: "attack", date: "2026-11-02" },
  { num: 195, type: "attack", date: "2026-11-03" },
  { num: 196, type: "attack", date: "2026-11-04" },
  { num: 197, type: "attack", date: "2026-11-06" },
  { num: 198, type: "advisory", date: "2026-11-07" },
  { num: 199, type: "attack", date: "2026-11-07" },
  { num: 200, type: "attack", date: "2026-11-07" },
  { num: 201, type: "attack", date: "2026-11-10" },
  { num: 202, type: "suspicious activity", date: "2026-11-11" },
  { num: 203, type: "attack", date: "2026-11-10" },
];

// Reports that existed before the captured window — the smallest number present,
// minus one (min, not [0], so it stays right even if the array is ever reordered;
// the window opens at #78 → 77 today). Note the pre-war reports (#1–3) are INCLUDED
// in this count — they precede the window even though they predate the war.
export const ukmtoReportsBeforeWindow = Math.min(...ukmtoIncidents.map((i) => i.num)) - 1;

// Capture bounds are explicit: a quiet day must not shorten the covered period.
export const ukmtoCoverageStart = "2026-07-01";
export const ukmtoCoverageEnd = "2026-11-12";

// Include every Monday–Sunday week, even when it has no attack reports.
// Partial weeks cover fewer than seven days and don't enter full-week comparisons.
export const weeklyAttackCounts = (
  incidents: { type: string; date: string }[], start: string, end: string,
): { weekStart: string; count: number; partial: boolean }[] => {
  const monday = (iso: string) => {
    const d = new Date(iso + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
    return d;
  };
  const byWeek = new Map<string, number>();
  for (const incident of incidents) {
    if (incident.type !== "attack" || incident.date < start || incident.date > end) continue;
    const key = monday(incident.date).toISOString().slice(0, 10);
    byWeek.set(key, (byWeek.get(key) ?? 0) + 1);
  }
  const weeks = [];
  for (const d = monday(start); d.toISOString().slice(0, 10) <= end; d.setUTCDate(d.getUTCDate() + 7)) {
    const weekStart = d.toISOString().slice(0, 10);
    const sunday = new Date(d.getTime() + 6 * 86400000).toISOString().slice(0, 10);
    weeks.push({ weekStart, count: byWeek.get(weekStart) ?? 0, partial: weekStart < start || sunday > end });
  }
  return weeks;
};
export const ukmtoWeeklyAttacks = weeklyAttackCounts(ukmtoIncidents, ukmtoCoverageStart, ukmtoCoverageEnd);
