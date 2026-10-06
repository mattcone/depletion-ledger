// Dashboard data — single source of truth. Update here after each research pass.
// All figures sourced from the research project (`../research`) — each array's
// comment carries its source and as-of date.
//
// Data policy: verified observations only, no interpolation. Every chart point is a
// real observation with a source; `approx: true` marks a source's rounded estimate
// (e.g. "Brent near $80 on Jun 22") and renders as a hollow marker.

export const DATA_AS_OF = "2026-10-06";
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
  { date: "2026-09-10", value: 102.93 },
  { date: "2026-09-11", value: 100.05, note: "settle −2.4% (CNBC)" },
  { date: "2026-09-14", value: 101.39, note: "front-month futures close (Yahoo, corrected Sep 15; FRED not yet available)" },
  { date: "2026-09-15", value: 105.83, note: "front-month futures close (Yahoo; corrected from $105.48)" },
  { date: "2026-09-16", value: 102.43, note: "front-month futures close (NYMEX 2pm ET; CNBC) · −3.2%" },
  { date: "2026-09-17", value: 101.91, note: "front-month futures close (Yahoo) · −0.5%" },
  { date: "2026-09-18", value: 100.3, note: "front-month futures close (Yahoo; CNBC concurs) · −1.6%" },
  { date: "2026-09-21", value: 95.78, note: "settlement (Reuters, October contract) · −4.5%" },
  { date: "2026-09-22", value: 94.59, note: "settlement (Jiji, October contract — its final trading day, Sep 22) · −1.2% vs Sep 21 for the same contract. The series switches to November starting Sep 23. November closed at $90.52 on Sep 22, about $4 below October, so the next change will reflect both the switch in contracts and any movement in November's price." },
  { date: "2026-09-23", value: 92.16, note: "settlement (MarketScreener, November contract) · +1.8% on the same contract (November closed $90.52 on Sep 22). The step down from the Sep 22 point is the October→November contract switch, not a price move." },
  { date: "2026-09-24", value: 94.61, note: "settlement (Yahoo, November contract) · +2.7% on the same contract" },
  { date: "2026-09-25", value: 92.41, note: "settlement (November contract) · down 2.3% on the same contract · the price gap between Brent and WTI was at its widest since May, according to the settlement report" },
  { date: "2026-09-28", value: 92.60, note: "settlement (Reuters, November contract) · up 0.2% on the same contract" },
  { date: "2026-09-29", value: 89.38, note: "settlement (CNBC, November contract) · down 3.5% on the same contract — the drop tracked the Saudi Red Sea export recovery (Kpler)" },
  { date: "2026-09-30", value: 90.42, note: "settlement (Fox News, November contract) · up 1.2% on the same contract" },
  { date: "2026-10-01", value: 92.87, note: "settlement (November contract; the CL=F daily bar matches the settlement feed) · up 2.7% on the same contract — tracked China's fuel export suspension and the US carrier build-up (Reuters/WSJ, Oct 1)" },
  { date: "2026-10-02", value: 91.11, note: "settlement (Reuters, November contract) · down 1.9% on the same contract — the G7 reserve-release announcement knocked prices lower intraday (CNBC, Oct 2)" },
  { date: "2026-10-05", value: 89.43, note: "Settlement · Yahoo CL=F closing price: $89.43 (matches)." },
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
];
export const gasolinePreCrisis = 2.81; // Jan 2026 monthly avg (BTS/EIA)

// ---------- US retail diesel, $/gal — AAA national (sourced points) ----------
export const dieselYtd: SeriesPoint[] = [
  { date: "2026-01-15", value: 3.52, approx: true, note: "Jan monthly (C.H. Robinson)" },
  { date: "2026-02-09", value: 3.688, note: "AAA" },
  { date: "2026-02-27", value: 3.72, note: "Feb monthly" },
  { date: "2026-03-30", value: 5.62, note: "TIME Mar 31: +49% since war began" },
  { date: "2026-05-15", value: 5.6, approx: true, note: "May peak" },
  { date: "2026-06-22", value: 5.13, note: "FleetOwner" },
  { date: "2026-08-21", value: 5.37, approx: true, note: "Aug avg (The Hill)" },
  { date: "2026-09-03", value: 5.78, note: "AAA" },
  { date: "2026-09-04", value: 5.85, note: "all-time record — breaks Jun 2022 record" },
  { date: "2026-09-06", value: 5.9, note: "AAA record" },
  { date: "2026-09-09", value: 5.94, note: "AAA record" },
  { date: "2026-09-10", value: 5.9773, note: "AAA record" },
  { date: "2026-09-11", value: 6.0556, note: "AAA record" },
  { date: "2026-09-12", value: 6.1602, note: "AAA record" },
  { date: "2026-09-13", value: 6.2040, note: "AAA record" },
  { date: "2026-09-14", value: 6.2301, note: "AAA record" },
  { date: "2026-09-15", value: 6.2694, note: "AAA record" },
  { date: "2026-09-16", value: 6.3103, note: "AAA record" },
  { date: "2026-09-17", value: 6.3956, note: "AAA record" },
  { date: "2026-09-18", value: 6.4476, note: "AAA record" },
  { date: "2026-09-19", value: 6.4866, note: "AAA record" },
  { date: "2026-09-20", value: 6.505, note: "AAA record — first above $6.50" },
  { date: "2026-09-21", value: 6.5107, note: "AAA record" },
  { date: "2026-09-22", value: 6.5276, note: "AAA record" },
  { date: "2026-09-23", value: 6.5217, note: "AAA — first decline since the Sep 4 record streak began" },
  { date: "2026-09-24", value: 6.5141, note: "AAA — second straight decline off the Sep 22 record" },
  { date: "2026-09-25", value: 6.5019, note: "AAA — third straight decline off the Sep 22 record" },
  { date: "2026-09-26", value: 6.4839, note: "AAA — fourth straight decline off the Sep 22 record" },
  { date: "2026-09-27", value: 6.4709, note: "AAA — fifth straight decline off the Sep 22 record" },
  { date: "2026-09-28", value: 6.4531, note: "AAA — sixth straight decline off the Sep 22 record" },
  { date: "2026-09-29", value: 6.4391, note: "AAA — seventh straight decline off the Sep 22 record" },
  { date: "2026-09-30", value: 6.4139, note: "AAA — eighth straight decline off the Sep 22 record" },
  { date: "2026-10-01", value: 6.3895, note: "AAA — ninth straight decline off the Sep 22 record" },
  { date: "2026-10-02", value: 6.3726, note: "AAA — tenth straight decline off the Sep 22 record" },
  { date: "2026-10-03", value: 6.3554, note: "AAA — eleventh straight decline off the Sep 22 record" },
  { date: "2026-10-04", value: 6.3434, note: "AAA — twelfth straight decline off the Sep 22 record" },
  { date: "2026-10-05", value: 6.3207, note: "AAA release, Oct 5" },
  { date: "2026-10-06", value: 6.3151, note: "AAA — fourteenth straight decline off the Sep 22 record" },
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
export const stats = [
  { label: "Brent", value: "$100.32", sub: "Oct 5 settlement · down $1.93 on the December contract · ninth session close above $100 · +32% vs pre-crisis ~$76" },
  { label: "US diesel (AAA)", value: `$${lastDiesel.value.toFixed(2)}`, sub: `${shortStatDate(lastDiesel.date)} · ${dieselStreak > 0 ? (dieselStreak === dieselYtd.length - 1 - dieselYtd.indexOf(dieselRecord) ? `${wordNum(dieselStreak)} straight drops from the ${shortStatDate(dieselRecord.date)} record $${dieselRecord.value.toFixed(4)}` : `${wordNum(dieselStreak)} consecutive daily declines`) + " · " : ""}+${dieselUpPct}% vs pre-war $3.72` },
  { label: "US gasoline (AAA)", value: `$${lastGasoline.value.toFixed(2)}`, sub: `${shortStatDate(lastGasoline.date)} · +${gasUpPct}% vs Jan $2.81 (AAA)` },
  { label: "SPR", value: "283.8M", sub: "Sep 25 · down 0.8M in a week — about twice the prior two weeks' pace · down 131.7M from pre-war 415.4M · lowest since Nov 1982" },
  { label: "US diesel & heating oil", value: "105.2M", sub: "Sep 25 · down 2.3M in a week · 14.9% below last year · East Coast stocks 29% below last year" },
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
  { date: "2025-09-26", value: 416.546 },
];
export const sprFloors = [
  { level: 300, name: "Cavern damage risk: about 300M barrels (first report below: week ending Aug 7)" },
  { level: 250, name: "GEF operating minimum: 250M barrels" },
  { level: 180, name: "Operating limit: 180M barrels" },
  { level: 70, name: "DOE stated safe minimum: 70M barrels" },
];
// ---------- Branch weights: the three tracks ----------
export const branchTracks = [
  {
    name: "Corridor holds",
    bar: "bg-calm",
    border: "border-l-calm",
    weight: "10%",
    what: "Tankers can pass through Hormuz under an Iran–Oman agreement or with US escorts. Traffic gradually returns to normal over one to two quarters.",
    path: "In this scenario, Brent moves toward $70–80.",
  },
  {
    name: "Standoff",
    bar: "bg-crude",
    border: "border-l-crude",
    weight: "50%",
    what: "Fighting continues at the current level. Tanker attacks and shipping restrictions continue, some Iranian facilities remain out of service, and the repaired Saudi bypass operates at a reduced rate. The strait stays partly open.",
    path: "Brent stays in the $100–120 range. Oil stocks keep falling through 2027. We assume Gulf production stays at the same level.",
  },
  {
    name: "Corridor lapses",
    bar: "bg-alarm",
    border: "border-l-alarm",
    weight: "40%",
    what: "The shipping route closes for a prolonged period or the fighting gets worse. More tankers are lost, shipping restrictions remain, and the bypass, Abqaiq, and Jazan stay out of service for months.",
    path: "Brent rises above $130. Shortages spread from the US East Coast to Russia, Europe, China, and aviation fuel.",
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
// (STEO_m.xlsx, Oct 6 2026 release, "Total crude oil and other liquids inventory net
// withdrawals, world total"; positive there = drawdown). Jan–Sep 2026 are ACTUALS in
// that release; Oct 2026 onward is EIA forecast and deliberately NOT shown (the
// forecasted 2027 return to surplus is not credible while the strait is contested).
// Positive here = surplus (build); negative = net withdrawal (running on reserves).
// Raw STEO values (drawdown +), Oct 6 edition: Jan −3.59, Feb −4.33, Mar +5.21, Apr
// +4.04, May +4.42, Jun +2.16, Jul −0.27, Aug +2.97, Sep +2.94. Mid-month x positions.
// (The Sep 9 edition had forecast Sep at +4.80 drawdown — the Oct edition's actual is
// a much shallower 2.94.)
// Context: the physical loss peaked at 11.2M b/d of Gulf shut-in in May (EIA); demand
// destruction (−1.6 in the Aug 12 OMR; −2.5 in the Sep 11 edition) and non-Gulf supply
// absorbed most of it, so the world balance never went deeper than ~5.2 (Oct 6 edition). IEA counts
// ≈1.3B bbl lost in total since Feb (Aug edition figure; the Sep edition's total is not
// in the public copy).
export const worldBalance = [
  { date: "2026-01-15", value: 3.6 },
  { date: "2026-02-15", value: 4.3 },
  { date: "2026-03-15", value: -5.2 },
  { date: "2026-04-15", value: -4.0 },
  { date: "2026-05-15", value: -4.4 },
  { date: "2026-06-15", value: -2.2 },
  { date: "2026-07-15", value: 0.3 },
  { date: "2026-08-15", value: -3.0 },
  { date: "2026-09-15", value: -2.9 },
];

// ---------- Demand destruction: world petroleum consumption (mb/d, monthly) ----------
// EIA STEO Oct 6, 2026 workbook (forecast completed Oct 1), Table 3e "World Petroleum and
// Other Liquid Fuels Consumption" (row patc_world). Jan–Sep 2026 are ACTUALS in that
// release — same convention as the world-balance chart; Oct 2026 onward is EIA forecast
// and deliberately not shown. World/regional consumption is EIA-estimated (apparent
// consumption, incl. refinery fuel & bunkering) — sourced estimates, not interpolation.
// Story: the destruction is BROAD, not Chinese. China is only −0.8 of the −3.9 Jul gap
// (Oct 6 edition) because it is holding consumption up by halting imports and drawing commercial
// stockpiles (Q2 imports −32% QoQ, EIA TIE; Jan–Jul −13.2% YoY, China customs; official
// 1.2–1.4B bbl reserve untouched — research/2026-08-30.md). China's buffer is the next
// breaking point (Q1–Q2 2027), not a source of the destruction. The largest single
// regional decliner is the Middle East itself (−1.2).
export const worldConsumption2026: { date: string; value: number }[] = [
  { date: "2026-01-15", value: 102.38 },
  { date: "2026-02-15", value: 104.38 },
  { date: "2026-03-15", value: 102.0 },
  { date: "2026-04-15", value: 99.47 },
  { date: "2026-05-15", value: 99.0 },
  { date: "2026-06-15", value: 101.68 },
  { date: "2026-07-15", value: 101.77 },
  { date: "2026-08-15", value: 103.39 },
  { date: "2026-09-15", value: 104.24 },
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
];
// Same table (Oct 6 edition), July column: where the −3.9 mb/d sits (Jul 2026 vs Jul 2025, mb/d).
export const demandDecline = [
  { region: "World", from: 105.63, to: 101.77 },
  { region: "Middle East", from: 10.18, to: 8.88 },
  { region: "Asia & Oceania", from: 37.87, to: 35.98 },
  { region: "China", sub: "part of Asia & Oceania; using stockpiles to support consumption", from: 16.41, to: 15.58 },
  { region: "Europe", from: 14.78, to: 14.7 },
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
  { date: "2026-09-25", value: 92.5 },
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
  { date: "2025-09-26", value: 91.4 },
];

// Global refining anchors — IEA Oil Market Report (runs: Sep 11 edition; Q3 cut: Aug 12)
export const globalRefining = [
  { name: "Global refining, August", value: "81.4 mb/d", delta: "summer peak, −4.2 mb/d below a year ago (OMR, Sep 11)" },
  { name: "Refining forecast, 2026", value: "−2.6 mb/d", delta: "IEA forecast vs 2025 (OMR, Sep 11)" },
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
      { item: "Whether the Saudi bypass keeps recovering. Bloomberg reported pipeline flows of about 6M barrels a day on Oct 2, with 4.5M available for export from Red Sea ports. Reports of another shutdown conflict: AFP says an Oct 4 strike at Khurais stopped flows; Bloomberg says oil was flowing normally on Oct 5. On Oct 6, Saudi Arabia's energy minister said oil pumped through the pipeline had reached 5.8M barrels that morning (Al Arabiya). The statement doesn't specify a period; reports differ on whether the figure describes capacity or actual flow. The Houthis also claimed an Oct 5 strike on Rabigh refinery; Saudi Arabia hasn't reported the extent of the damage.", why: "The bypass avoids Hormuz. Watch for confirmation of any damage and whether tanker loadings keep up with pipeline flows. Its restart informed our Sep 29 odds of 10/50/40." },
      { item: "Whether the US and Iran agree on the steps to reopen the strait. Trump rejected Iran's seven-day proposal on Sep 26. On Oct 4, parliament speaker Ghalibaf said the strait would stay closed until the US accepts the June deal's seven conditions. On Oct 5, President Pezeshkian called US negotiations “meaningless.” The US is sending another carrier strike group and an amphibious group to the region, potentially bringing the carrier count to three (AP, Oct 1). Iran is preparing a stronger response if large-scale US strikes resume (Reuters, Oct 1). At his Oct 5 Nebraska rally, Trump called Iranian strikes on US cities “a small price to pay” (CBS News).", why: "Watch for a signed deal, a change in the blockade, or renewed strikes — any of which could change how much oil gets through." },
      { item: "Whether the Yemen offensive changes Red Sea shipping. Yemen's information minister claimed “effective control” of Bab al-Mandeb on Oct 5 (Reuters). Government forces also claimed to have retaken Mocha; the Houthis deny losing ground, and the claims aren't independently verified. The Houthis claimed Oct 5 strikes on Riyadh's King Khalid airport and Rabigh refinery. Saudi aviation authorities said attacks on Jazan and Najran airports that evening caused damage and three minor injuries. At sea, UKMTO reported explosions near the non-Saudi fuel tanker Chrystal Sky south of Mocha on Oct 4. No damage or responsibility was reported.", why: "There is no US escort in the Red Sea. Insurance costs are much lower for non-Saudi ships than Saudi-linked tankers (Reuters, Sep 25). An attack on a non-Saudi vessel could send container traffic back around Africa." },
      { item: "Whether oil keeps moving through Hormuz despite attacks. Kpler's provisional estimates put regional crude exports at 18.3M barrels a day in the week through Sep 30, near pre-war levels, including Saudi exports through the Red Sea (Reuters, Oct 5). But UKMTO reported four tanker strikes Oct 1–4, with crews safe and no vessel losses reported; the latest left a tanker disabled, according to shipping reports. The US military said on Oct 5 that it had redirected 130 vessels, disabled three and destroyed 13 commercial vessels it said violated the blockade or belonged to the IRGC's shadow network since the blockade resumed Jul 14. Large crude-carrier rates reached $1.3M a day on the Middle East–Far East route, about 43 times January levels (Gulf News, Oct 5); rates vary by route and vessel.", why: "Watch whether ships can pass safely and export estimates hold up. Regional exports include routes outside Hormuz; they don't show that the strait has returned to normal." },
    ],
  },
  {
    when: "Oct 7",
    items: [
      { item: "The next weekly EIA report is due Oct 7 at 10:30 a.m. Eastern and covers the week ending Oct 2. Bids for DOE's sixth SPR offering are due Oct 6. The Sep 30 report showed SPR stocks fell 0.8M barrels — about twice the prior two weeks' pace — and diesel and heating-oil stocks fell 2.3M to 105.2M, 14.9% below last year.", why: "Watch whether SPR withdrawals continue at the higher pace. Deliveries from the new offering are scheduled for November–December." },
    ],
  },
];

// ---------- Breaking-points cascade (§11, compressed twice) ----------
export const cascade = [
  { date: "Each weekly EIA report (next: Oct 7)", region: "US East Coast", trigger: "US diesel and heating-oil stocks fell to 105.2M barrels in the week ending Sep 25, down 2.3M that week. At the four-week average rate of 3.8M barrels a day, those stocks are equivalent to about 28 days of use. East Coast stocks are 29% below last year." },
  { date: "Oct 31", region: "Russia", trigger: "Russia announced on Sep 30 that it was extending its diesel export ban through Oct 31. With more than 30% of refining capacity damaged, Russia may have little fuel available to export." },
  { date: "≈ mid-October", region: "China", trigger: "Commercial oil stocks could begin to fall faster than normal." },
  { date: "≈ late October", region: "Europe's oil hubs", trigger: "Rotterdam-area diesel stocks could fall below 8.5–9M barrels, making it harder for traders to find supplies. If the strait closes fully, this could happen by mid-October." },
  { date: "≈ late October", region: "Europe, at the pump", trigger: "Consumers could face fuel shortages and higher prices, increasing pressure on governments to respond." },
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
// list). The row says "struck", not "halted", on purpose: a strike plus a reported
// fire is what the General Staff confirms for every entry, while a HALT requires
// plant-specific confirmation (Reuters, a governor, an industry source). Ufa has
// the strike and the fire but no confirmed halt as of Sep 26 — if one lands, the
// flag's wording is the only thing that changes.
const russiaStrikeWindow = { start: "Sep 20", end: "Oct 2" };
const russiaStruckRefineries = [
  { plant: "Moscow refinery", date: "Sep 20" },
  { plant: "Kuibyshev, near Samara", date: "Sep 21–22" },
  { plant: "Ufa", date: "Sep 21–22" },
  { plant: "Perm, ~257 kb/d", date: "Sep 25" },
  { plant: "Novoshakhtinsk, ~110–140 kb/d", date: "Sep 25" },
  { plant: "Ilsky, ~125 kb/d — three killed", date: "Sep 26" },
  { plant: "Lukoil-Volgograd", date: "Oct 2" },
];
export const russiaSnapshot = [
  { name: "Capacity out of service", value: "51%", delta: "UA Defense Ministry, Oct 4 (Khmara) — up from >45% (Sep 21) and ~30% (Aug 29, Moscow Times)", flag: "Russian Forbes: 54% (Sep 9) · IEA: more than 20% · the 51% claim can't be independently verified (AP)" },
  { name: `Refineries struck, ${russiaStrikeWindow.start}–${russiaStrikeWindow.end}`, value: `${russiaStruckRefineries.length} plants`, delta: russiaStruckRefineries.map((h) => `${h.plant} (${h.date})`).join(" · "), flag: "Fires at Ufa and Volgograd are confirmed; shutdowns are unverified. The other five plants have confirmed shutdowns, with no restarts reported. Samara and Novorossiysk terminals were also hit — all three export routes are now under attack (Reuters, ISW, Gen Staff)" },
  { name: "Major refineries still offline", value: "both out", delta: "Kirishi, Russia's second-largest, ~404 kb/d, halted since early September (UA.NEWS, Sep 2) · Ryazan, Moscow's main supplier, ~344 kb/d, offline since Sep 6 (Reuters, Sep 10)", flag: "Nameplate capacity, not measured lost output." },
  { name: "Gasoline shortages at gas stations", value: "45–53%", delta: "Share of stations without AI-92 (45%) or AI-95 (53%) gasoline, mid-September (gdebenzin, via UNN, Sep 22); rationing has returned in about two-thirds of regions (Independent, Sep 22)", flag: "Gasoline prices +21% YTD (Moscow Times, Sep 14) · IEA: diesel output down about 30%, with waits of up to 40 hours (Oct 5)" },
  { name: "Jet fuel now imported", value: "military + civilian", delta: "Russia is importing Jet A-1 from South Korea and Egypt (UA military intelligence, Aug 29); no jet fuel or gasoline has left Russia by sea for two straight weeks (S&P Global CAS, Oct 1)", flag: "ISW (Sep 26): Geran drones use jet fuel; a kerosene shortage would limit their use" },
];

export const russiaBanCascade = [
  { date: "Oct 31, 2026", what: "diesel exports by producers — extended from Sep 30 to Oct 31 by government decree (Sep 30; Moscow Times, Reuters)" },
  { date: "Nov 30, 2026", what: "jet fuel exports" },
  { date: "Jan 31, 2027", what: "gasoline exports and diesel exports by non-producers" },
];

// ---------- Second-order effects (recession / rates / food — report macro channel + §11B) ----------
// 12-mo US recession odds, July–Sep 2026. Polymarket is "by end-2027" (longer window, ~15 months).
// Ordered by pct desc (chart plots in array order, first = top).
// Goldman: 25% (Mar 12) → 30% (Mar 25) → 25% (May 11) → 15% (Jun 26, current). The Sep 14
// "raised this week" quote (Hatzius, Bloomberg TV) restated the 15% with a caveat that the
// odds could be higher given the oil shock — not a new revision. See logs/2026-09-14.md.
export const recessionOdds = [
  { name: "Moody's", pct: 50, note: "highest estimate" },
  { name: "JPMorgan", pct: 35, note: "" },
  { name: "Polymarket (by end-2027)", pct: 32, note: "covers a longer period" },
  { name: "NY Fed model", pct: 25, note: "" },
  { name: "TD Securities", pct: 25, note: "Sep 7" },
  { name: "WSJ poll (74 economists)", pct: 25, note: "33% in April" },
  { name: "Goldman Sachs", pct: 15, note: "since Jun 26 · restated Sep 14" },
];

export const ratesStats = [
  { label: "Fed's target rate, Sep 16", value: "3.75–4.00%", sub: "Up 0.25 percentage points in a 12-to-0 vote · statement: 'Inflation remains elevated. … The Committee will deliver price stability.'" },
  { label: "Odds of a rate increase, Oct 27–28", value: "60%", sub: "Our estimate, published Sep 16 · 16 of 18 Fed officials projected another increase this year · we'll check this prediction after the October decision" },
  { label: "August producer prices (BLS, Sep 10)", value: "5.4% YoY", sub: "+0.4% for the month · July revised to 4.8% annually · energy +4.2%, diesel +24.1% annually · 10-year yield 5.311% on Oct 5, its highest close of the war" },
];

export const foodStats = [
  { label: "Gulf–India tanker shipping costs", value: "+411%", sub: "$4.34/bbl in Aug vs pre-war (Frontline)" },
  { label: "TTF gas (Europe)", value: "$24.6/MMBtu", sub: "JOGMEC assessed Oct 2 (published Oct 5) · up from $24.1 on Sep 25" },
  { label: "JKM gas (Asia)", value: "≈$24.8/MMBtu", sub: "JOGMEC assessed Oct 2 (published Oct 5) · high-$24s, down from low-$25s on Sep 25" },
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
];
export const fedCpiTarget = 2.0;

// ---- US PPI (final demand), % year-over-year, monthly ----
// BLS PPI release (Sep 10) Table A: "Change in final demand from 12 months ago (unadj.)" —
// all official reported values, no computation. Apr–Jul revised per BLS footnote 1 (July
// 4.7 → 4.8 in this revision); Aug 5.4 released Sep 10.
// RESOLVED Sep 10 via the BLS API: these are exactly the official 12-mo pct changes of
// series WPUFD4 ("Final demand, not seasonally adjusted") — 3.1 3.4 4.3 5.7 5.9 5.6 4.8 5.4,
// a perfect match. FRED's PPIACO is simply a different series, which is why it never
// reconciled. BLS-reported values were authoritative all along. See research/2026-09-10.md.
export const ppiYtd: CpiPt[] = [
  { date: "2026-01-31", value: 3.1 },
  { date: "2026-02-28", value: 3.4 },
  { date: "2026-03-31", value: 4.3 },
  { date: "2026-04-30", value: 5.7 },
  { date: "2026-05-31", value: 5.9 },
  { date: "2026-06-30", value: 5.6 },
  { date: "2026-07-31", value: 4.8 },
  { date: "2026-08-31", value: 5.4 },
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
  { num: 153, type: "attack", date: "2026-10-03" },
  { num: 154, type: "attack", date: "2026-10-04" },
  { num: 155, type: "attack", date: "2026-10-03" },
  { num: 156, type: "attack", date: "2026-10-05" },
  { num: 157, type: "attack", date: "2026-10-05" },
];

// Reports that existed before the captured window — the smallest number present,
// minus one (min, not [0], so it stays right even if the array is ever reordered;
// the window opens at #78 → 77 today). Note the pre-war reports (#1–3) are INCLUDED
// in this count — they precede the window even though they predate the war.
export const ukmtoReportsBeforeWindow = Math.min(...ukmtoIncidents.map((i) => i.num)) - 1;

// Capture bounds are explicit: a quiet day must not shorten the covered period.
export const ukmtoCoverageStart = "2026-07-01";
export const ukmtoCoverageEnd = "2026-10-06";

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
