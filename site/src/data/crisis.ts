// Dashboard data — single source of truth. Update here after each research pass.
// All figures sourced from the research project (`../research`) — each array's
// comment carries its source and as-of date.
//
// Data policy: verified observations only, no interpolation. Every chart point is a
// real observation with a source; `approx: true` marks a source's rounded estimate
// (e.g. "Brent near $80 on Jun 22") and renders as a hollow marker.

export const DATA_AS_OF = "2026-09-13";
// War began Feb 28, 2026 (report: "Pre-war (Feb 28)"; ACLED damage inventory "since Feb 28"; IEA supply loss "since Feb").
// Day count = days elapsed since Feb 28 → Sep 9, 2026 = Day 193.
export const CRISIS_DAY_1 = "2026-02-28";
export const MODEL_DAY_1 = "2026-06-30"; // depletion model established

export interface SeriesPoint {
  date: string; // ISO date of observation
  value: number;
  approx?: boolean; // source gave a rounded estimate
  note?: string;
}

// ---------- Headline stats ----------
export const stats = [
  { label: "Brent", value: "$104.61", sub: "Sep 11 settle −2.8% · +38% vs pre-crisis ~$76" },
  { label: "US diesel (AAA)", value: "$6.20", sub: "Sep 13 · new all-time record ($6.2040) — fourth straight · +67% vs pre-war $3.72" },
  { label: "US gasoline (AAA)", value: "$4.31", sub: "Sep 13 · +17¢ in a week (AAA) · +53% vs Jan $2.81" },
  { label: "SPR", value: "286.6M", sub: "w/e Aug 28 · −128.8M since pre-war 415.4M · lowest since Dec 1982" },
  { label: "US diesel & heating oil", value: "104.2M", sub: "as of Aug 28 · down 14% vs 5-yr avg · East Coast stocks 27% below last year — the tightest link" },
];

// ---------- Brent, $/bbl — 2026 YTD (observed points) ----------
export const brentYtd: SeriesPoint[] = [
  { date: "2026-01-15", value: 70, approx: true, note: "pre-crisis (est.)" },
  { date: "2026-02-27", value: 76, approx: true, note: "pre-closure level" },
  { date: "2026-03-08", value: 100, approx: true, note: "first >$100 in four years (closure Mar 4)" },
  { date: "2026-03-18", value: 126, note: "intraday peak — March +65%, largest monthly rise on record" },
  { date: "2026-04-20", value: 95.48, note: "settle · ceasefire hopes mid-April" },
  { date: "2026-06-22", value: 80, approx: true, note: "diplomatic signals, partial reopening" },
  { date: "2026-06-30", value: 74, note: "Day 1 of model — the 'false signal'" },
  { date: "2026-07-31", value: 83.76, note: "July monthly avg (EIA, Sep 9)" },
  { date: "2026-08-29", value: 88.1, note: "" },
  { date: "2026-09-02", value: 95.57, note: "Nov/May spread $14.19 — contango widening" },
  { date: "2026-09-04", value: 95.7, note: "settle +$3.66 · tanker war begins" },
  { date: "2026-09-08", value: 97.13, note: "settle (brecorder $97.92 — open discrepancy)" },
  { date: "2026-09-09", value: 100.71, note: "settle +$3.58 · intraday high $101.25" },
  { date: "2026-09-10", value: 108.03, note: "close +$6.82 in a day (Yahoo front-month; Convex cross-check)" },
  { date: "2026-09-11", value: 104.61, note: "settle −2.8% (CNBC)" },
];
export const brentMonthlyAvgs = [
  { month: "Mar", value: 103.0, src: "EIA" },
  { month: "Apr", value: 117.29, src: "EIA, Sep 9" },
  { month: "Jul", value: 83.76, src: "EIA, Sep 9" },
];

// ---------- WTI spot, $/bbl — FRED DCOILWTICO, sampled on the product dates below ----------
// Mondays (EIA gasoline) + Wednesdays (AAA diesel). Five product dates have no same-day FRED
// value (Jan 19, Feb 16, May 25, Sep 7 — Mondays; Sep 6 — a Sunday); for those, the crack math
// uses the NEXT trading day's WTI (Jan 20, Feb 17, May 26, Sep 8 — included below, also drawn
// on the WTI line). Disclosed in the crack caption. No interpolation, ever.
// Basis check: Sep 9 FRED 97.26 vs news settlement 96.38 (~$0.9 spot-vs-settle, acceptable).
// FRED's Brent (DCOILBRENTEU, = EIA dnav RBRTE) does NOT reconcile with tracked settlements
// (Sep 9: 109.51 vs 100.71, a ~$9 gap — same FRED issue as PPIACO) — WTI is the crude basis.
// Sep 10 point: NYMEX front-month session close (Yahoo CL=F, 102.93) — FRED posts the next
// morning; the spot-vs-futures gap is ≈$1.2 (Sep 9: FRED 97.26 vs Yahoo 96.05). Disclosed here
// rather than silently mixed into the FRED series.
// SeriesPoint (not a bare {date, value}): the tail is mixed-source — FRED weekly closes
// plus the Sep 10 front-month close and the Sep 11 settle, flagged in the notes.
export const wtiWeekly: SeriesPoint[] = [
  { date: "2026-01-05", value: 58.1 },
  { date: "2026-01-12", value: 59.39 },
  { date: "2026-01-15", value: 59.13 },
  { date: "2026-01-20", value: 60.3 },
  { date: "2026-01-26", value: 60.46 },
  { date: "2026-02-02", value: 61.6 },
  { date: "2026-02-09", value: 64.53 },
  { date: "2026-02-17", value: 62.53 },
  { date: "2026-02-23", value: 66.36 },
  { date: "2026-02-27", value: 66.96 },
  { date: "2026-03-02", value: 71.13 },
  { date: "2026-03-09", value: 94.65 },
  { date: "2026-03-16", value: 93.39 },
  { date: "2026-03-23", value: 89.33 },
  { date: "2026-03-30", value: 104.69 },
  { date: "2026-04-06", value: 114.01 },
  { date: "2026-04-13", value: 100.72 },
  { date: "2026-04-20", value: 91.06 },
  { date: "2026-04-27", value: 99.89 },
  { date: "2026-05-04", value: 109.76 },
  { date: "2026-05-11", value: 101.56 },
  { date: "2026-05-15", value: 108.99 },
  { date: "2026-05-18", value: 112.25 },
  { date: "2026-05-26", value: 97.63 },
  { date: "2026-06-01", value: 95.96 },
  { date: "2026-06-08", value: 95.0 },
  { date: "2026-06-15", value: 84.65 },
  { date: "2026-06-22", value: 78.94 },
  { date: "2026-06-29", value: 71.87 },
  { date: "2026-07-06", value: 69.6 },
  { date: "2026-07-13", value: 79.2 },
  { date: "2026-07-20", value: 84.38 },
  { date: "2026-07-27", value: 84.25 },
  { date: "2026-08-03", value: 81.96 },
  { date: "2026-08-10", value: 83.76 },
  { date: "2026-08-17", value: 86.04 },
  { date: "2026-08-21", value: 87.21 },
  { date: "2026-08-24", value: 86.34 },
  { date: "2026-08-31", value: 87.03 },
  { date: "2026-09-03", value: 92.55 },
  { date: "2026-09-04", value: 92.69 },
  { date: "2026-09-08", value: 94.21 },
  { date: "2026-09-09", value: 97.26 },
  { date: "2026-09-10", value: 102.93 },
  { date: "2026-09-11", value: 100.05, note: "settle −2.4% (CNBC)" },
];

// ---------- US retail gasoline, $/gal — EIA weekly (verified); AAA daily from
// Sep 7 (per-point notes below; the Sep 7 point was added without a logged source
// and is flagged approx until verified or removed) ----------
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
  { date: "2026-09-07", value: 4.157, approx: true, note: "AAA — source not in research log (added Sep 8); verify or remove" },
  { date: "2026-09-10", value: 4.2770, note: "AAA release Sep 10 (logged)" },
  { date: "2026-09-11", value: 4.2950, note: "AAA release Sep 11 (logged)" },
  { date: "2026-09-12", value: 4.3104, note: "AAA release Sep 12 (logged)" },
  { date: "2026-09-13", value: 4.3130, note: "AAA release Sep 13 (logged)" },
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
  { date: "2026-09-10", value: 5.9773, note: "AAA record — +13¢ in a week (AAA release, Sep 10)" },
  { date: "2026-09-11", value: 6.0556, note: "AAA record — first above $6.00, +20.6¢ in a week" },
  { date: "2026-09-12", value: 6.1602, note: "AAA record — third straight, +27.8¢ in a week" },
  { date: "2026-09-13", value: 6.2040, note: "AAA record — fourth straight, +30.7¢ in a week (AAA week-ago avg $5.8970)" },
];
export const dieselOldRecord = 5.85; // June 2022 AAA record (broken Sep 4)

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
];
export const sprPreWar = 415.441; // Feb 27, 2026 (EIA)
export const sprFloors = [
  { level: 300, name: "cavern damage ~300M (breached Aug 14)" },
  { level: 250, name: "GEF operational minimum 250M" },
  { level: 180, name: "hard-operable 180M" },
  { level: 70, name: "DOE stated safe minimum 70M" },
];
export const sprScenarios = [
  { rate: 0.45, name: "corridor holds · 0.45M b/d" },
  { rate: 0.7, name: "standoff $100–120 · 0.70M b/d" },
  { rate: 1.35, name: "corridor lapse · 1.35M b/d" },
];

// ---------- SPR drawdown pace + floor dates (computed from sprWeekly) ----------
// Weekly draw, M bbl (positive = drawn), oldest → newest
export const sprDrawDeltas: { date: string; mmbbl: number }[] = sprWeekly
  .slice(1)
  .map((p, i) => ({ date: p.date, mmbbl: +(sprWeekly[i].level - p.level).toFixed(2) }));

// 4-week average draw pace, M b/d (smoothes weekly noise vs a single week)
export const sprDrawPace4w = +(((sprWeekly[sprWeekly.length - 5].level - sprWeekly[sprWeekly.length - 1].level) / 28).toFixed(2));

// Floor dates on the standoff path (40% since the Sep 11 reweight) at 0.70M b/d
// from the last actual (286.604M, w/e Aug 28)
const STANDOFF_RATE = 0.7;
const _anchorDate = Date.parse(sprWeekly[sprWeekly.length - 1].date);
const _daysToFloor = (floor: number) => (sprWeekly[sprWeekly.length - 1].level - floor) / STANDOFF_RATE;
export const sprFloor250Date = new Date(_anchorDate + _daysToFloor(250) * 86400000); // ≈ Oct 19 2026
export const sprFloor180Date = new Date(_anchorDate + _daysToFloor(180) * 86400000); // ≈ Jan 27 2027

// Floor dates on the LAPSE path (top track since the Sep 11 ESPO reweight) at 1.35M b/d,
// same reported-basis anchor (286.604M, w/e Aug 28)
const LAPSE_RATE = 1.35;
const _daysToFloorLapse = (floor: number) => (sprWeekly[sprWeekly.length - 1].level - floor) / LAPSE_RATE;
export const sprLapse250Date = new Date(_anchorDate + _daysToFloorLapse(250) * 86400000); // ≈ Sep 24 2026
export const sprLapse180Date = new Date(_anchorDate + _daysToFloorLapse(180) * 86400000); // ≈ Nov 14 2026

// ---------- Supply snapshot (EIA WPSR w/e Aug 28 + STEO Sep 9) ----------
export const invSnapshot = [
  { name: "SPR", value: "286.6M bbl", delta: "−128.8M (−31%) since pre-war 415.4M", flag: "lowest since Dec 1982" },
  { name: "US diesel & heating oil", value: "104.2M bbl", delta: "down 14% from the 5-year average (121.2M bbl)", flag: "East Coast stocks 27% below last year — the tightest link in the chain" },
  { name: "US crude", value: "424.5M bbl", delta: "+1% vs 5-yr avg (420.3M)", flag: "products, not crude, are the scarce thing" },
  { name: "Global inventories", value: "−400M bbl YTD", delta: "EIA estimate, Sep 9", flag: "falling through end of 2026" },
];

// ---------- Branch weights: the three tracks ----------
export const branchTracks = [
  {
    name: "Corridor holds",
    bar: "bg-calm",
    border: "border-l-calm",
    weight: "10%",
    what: "Transit resumes under some regime — an Iran–Oman safe corridor or US-escorted lanes — and Hormuz trends back toward normal over one to two quarters.",
    path: "Brent mean-reverts toward $70–80; the SPR draw slows to ~0.45M b/d and the depletion timeline stretches out again.",
  },
  {
    name: "Standoff drift",
    bar: "bg-crude",
    border: "border-l-crude",
    weight: "40%",
    what: "The war continues at current intensity — periodic tanker strikes, the exclusion zone holding, Iranian infrastructure partially offline, the Saudi bypass pipeline struck, no restart date — but no sustained closure.",
    path: "Brent ranges $95–125; the SPR draws ~0.70M b/d; global stocks keep falling; the breaking-points cascade is delayed, not cancelled.",
  },
  {
    name: "Corridor lapses",
    bar: "bg-alarm",
    border: "border-l-alarm",
    weight: "50%",
    what: "Sustained closure or escalation — tanker losses spike, the exclusion zone hardens into permanence, the bypass stays shut, Abqaiq and Jazan stay offline for months.",
    path: "Brent $130+; the SPR drains at 1.35M b/d and the inventory cascade begins — US East Coast first, then Russia, Europe, China, and jet fuel.",
  },
];

// ---------- Branch weights history ----------
export const branchWeights = [
  { date: "Jun 30", holds: 65, standoff: 35, lapse: 0, note: "original model (de-escalation 65%) — approx" },
  { date: "Sep 2", holds: 35, standoff: 60, lapse: 5, note: "post-8.6M-claim bust" },
  { date: "Sep 7", holds: 15, standoff: 55, lapse: 30, note: "regime event: exclusion zone + first third-country base hit" },
  { date: "Sep 9", holds: 10, standoff: 50, lapse: 40, note: "regime event: 10 tankers/week + $100 + Jazan" },
  { date: "Sep 11", holds: 10, standoff: 40, lapse: 50, note: "regime event: ESPO suspension (the bypass is offline) + Houthi hold of the entire Red Sea coast — reverts to 10/50/40 on an official restart" },
];

// ---------- Research log (local-only files) ----------
// ---------- The flip: surplus → reserve drawdown (reported months only) ----------
// World oil balance, mb/d — production minus consumption. Source: EIA STEO Table 3a
// (STEO_m.xlsx, Sep 9 2026 release, "Total crude oil and other liquids inventory net
// withdrawals, world total"; positive there = drawdown). Jan–Aug 2026 are ACTUALS in
// that release; Sep 2026 onward is EIA forecast and deliberately NOT shown (the
// forecasted 2027 return to surplus is not credible while the strait is contested).
// Positive here = surplus (build); negative = net withdrawal (running on reserves).
// Raw STEO values (drawdown +): Jan −3.47, Feb −4.23, Mar +5.24, Apr +4.16, May +4.76,
// Jun +2.63, Jul +0.09, Aug +4.07. Mid-month x positions.
// Context: the physical loss peaked at 11.2M b/d of Gulf shut-in in May (EIA); demand
// destruction (−1.6 in the Aug 12 OMR; −2.5 in the Sep 11 edition) and non-Gulf supply
// absorbed most of it, so the world balance never went deeper than ~5.2. IEA counts
// ≈1.3B bbl lost in total since Feb (Aug edition figure; the Sep edition's total is not
// in the public copy).
export const worldBalance = [
  { date: "2026-01-15", value: 3.5 },
  { date: "2026-02-15", value: 4.2 },
  { date: "2026-03-15", value: -5.2 },
  { date: "2026-04-15", value: -4.2 },
  { date: "2026-05-15", value: -4.8 },
  { date: "2026-06-15", value: -2.6 },
  { date: "2026-07-15", value: -0.1 },
  { date: "2026-08-15", value: -4.1 },
];

// The bill, paid in reserves — every figure from the Sep 9 EIA report (verified
// sections), except the demand-destruction line: IEA OMR, Sep 11 edition
export const billLedger = [
  { name: "Global commercial stocks", value: "−400M bbl", note: "year-to-date · EIA est. (Sep 9)" },
  { name: "US Strategic Petroleum Reserve", value: "−129M bbl", note: "since Feb 28 · EIA" },
  { name: "IEA coordinated release", value: "400M bbl", note: "pulled from 32 countries · IEA" },
  { name: "China commercial stockpiles", value: "~2–3M b/d", note: "draw inferred from customs data · official SPR untouched" },
  { name: "Demand destruction", value: "−2.5M b/d", note: "full-year 2026, cut from −1.6 in the August edition · IEA OMR, Sep 11" },
  { name: "Still in the hole", value: "−1.8M b/d", note: "Q4 2026 forecast — supply still below demand · IEA OMR, Aug 12" },
];

// ---------- Demand destruction: world petroleum consumption (mb/d, monthly) ----------
// EIA STEO Sep 9, 2026 workbook (forecast completed Sep 3), Table 3e "World Petroleum and
// Other Liquid Fuels Consumption" (row patc_world). Jan–Aug 2026 are ACTUALS in that
// release — same convention as the world-balance chart; Sep 2026 onward is EIA forecast
// and deliberately not shown. World/regional consumption is EIA-estimated (apparent
// consumption, incl. refinery fuel & bunkering) — sourced estimates, not interpolation.
// Story: the destruction is BROAD, not Chinese. China is only −0.8 of the −3.6 Jul gap
// because it is holding consumption up by halting imports and drawing commercial
// stockpiles (Q2 imports −32% QoQ, EIA TIE; Jan–Jul −13.2% YoY, China customs; official
// 1.2–1.4B bbl reserve untouched — research/2026-08-30.md). China's buffer is the next
// breaking point (Q1–Q2 2027), not a source of the destruction. The largest single
// regional decliner is the Middle East itself (−1.2).
export const worldConsumption2026: { date: string; value: number }[] = [
  { date: "2026-01-15", value: 102.48 },
  { date: "2026-02-15", value: 104.48 },
  { date: "2026-03-15", value: 102.14 },
  { date: "2026-04-15", value: 99.62 },
  { date: "2026-05-15", value: 99.17 },
  { date: "2026-06-15", value: 102.05 },
  { date: "2026-07-15", value: 101.82 },
  { date: "2026-08-15", value: 103.7 },
];
export const worldConsumption2025: { date: string; value: number }[] = [
  { date: "2025-01-15", value: 102.01 },
  { date: "2025-02-15", value: 103.54 },
  { date: "2025-03-15", value: 102.31 },
  { date: "2025-04-15", value: 103.59 },
  { date: "2025-05-15", value: 103.51 },
  { date: "2025-06-15", value: 105.76 },
  { date: "2025-07-15", value: 105.42 },
  { date: "2025-08-15", value: 104.49 },
];
// Same table, July column: where the −3.6 mb/d sits (Jul 2026 vs Jul 2025, mb/d).
export const demandDecline = [
  { region: "World", from: 105.42, to: 101.82 },
  { region: "Middle East", from: 10.18, to: 8.94 },
  { region: "Asia & Oceania", from: 37.88, to: 36.03 },
  { region: "China", sub: "of Asia & Oceania — holding up on stockpiles", from: 16.41, to: 15.59 },
  { region: "Europe", from: 14.78, to: 14.71 },
  { region: "United States", from: 20.98, to: 20.54 },
];

// ---------- Refining: US refinery utilization (weekly, % of operable capacity) ----------
// EIA Weekly Petroleum Status Report, series WPULEUS3 — "U.S. Percent Utilization of
// Refinery Operable Capacity". api.eia.gov/v2/petroleum/pnp/wiup, fetched 2026-09-10.
// Sourced values, never interpolated. EIA's definition: "Percent Utilization is
// calculated as gross inputs divided by the latest reported monthly operable capacity."
// 2026: avg 93.5% (n=36); above 95% every week since Jun 5; peak 98.0 (wk of Aug 28).
// 2025 same Jan–Sep window: avg 90.8%, deeper winter maintenance dip (83.5, Jan 24).
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
];

// Global refining anchors — IEA Oil Market Report (runs: Sep 11 edition; Q3 cut: Aug 12)
export const globalRefining = [
  { name: "Aug global runs", value: "81.4 mb/d", delta: "summer peak, −4.2 mb/d below a year ago (OMR, Sep 11)" },
  { name: "FY 2026 runs", value: "−2.6 mb/d", delta: "IEA forecast vs 2025 (OMR, Sep 11)" },
  { name: "Q3 runs", value: "−370 kb/d", delta: "the quarter's further cut (OMR, Aug 12)" },
];

// ---------- Upcoming watch list ----------
export const watchList = [
  { date: "Any day", item: "An official Aramco/Ministry statement on the East–West pipeline — sources put the loss at ~700,000 b/d from a damaged pumping station (\"at least eight places,\" unconfirmed); satellite flaring detected along the route; no restart date yet", why: "the bypass is what keeps the standoff track alive — a days-scale-repair assessment or a restart date would change the picture materially" },
  { date: "Sep 14", item: "The Gulf–Iran ministerial in Salalah — the war's first GCC–Iran ministerial; Bahrain will not attend (\"recent attacks on the Gulf\"); Iran's FM says the Oman deal \"in no way\" means reopening. Same day: the US Treasury designates a major Iranian bank, and the first settles since Friday (Brent/WTI/10-yr) price the weekend's three developments — Trump's Iran attribution of the pipeline attack, a seafarer killed off Qeshm, Iraq seizing the launch platform", why: "the holds branch's reconstitution path finally has a date — though FT-cited diplomats say a full reopening still needs a US–Iran understanding, which does not exist" },
  { date: "Sep 16", item: "The Fed's decision — a 25bp hike (3.50–3.75% → 3.75–4.00%) is priced at ~86% (CME; Polymarket 62%)", why: "August CPI's core came in above forecast, the last major print before the meeting; the 2-year is at 4.63%, its highest since Jul 2024, and the 10-year touched 4.99% on Sep 11 — highest since Oct 2023" },
  { date: "Sep 16", item: "EIA weekly report (week ending Sep 4) — do US diesel stocks fall under 100M barrels, and how fast is the SPR being drained now?", why: "the earliest sign of whether things are worsening or easing" },
  { date: "Sep 30", item: "Four things in one week: Russia's diesel export ban expires (already extended to this date — the choice is extend or open), the US-led coalition withdrawal from Iraq is due to complete (Patriots leaving Erbil), the Sep 30 prediction-market bets settle, and Sweden's fuel-tax cut ends", why: "the densest cluster of dated events" },
  { date: "Oct 7", item: "The EIA's monthly outlook — the first one written after the tanker war, the refinery strikes, and the no-sailing zone", why: "the real test of the EIA's \"constrained, but open\" view — and of the EIA–market spread (EIA 2H26 ~$90 vs settled spot $104.61 — a ~$15 gap)" },
  { date: "Nov 30", item: "Russia's jet-fuel export ban takes effect", why: "the start of the airline fuel crunch" },
];

// ---------- Breaking-points cascade (§11, compressed twice) ----------
export const cascade = [
  { date: "Sep 14–21", region: "US East Coast", trigger: "diesel and heating-oil stocks fall below a month of supply — already 27% lower than last year" },
  { date: "Sep 30", region: "Russia", trigger: "the diesel export ban runs out — refineries are 30%+ damaged, so Russia simply has no diesel left to sell; survival, not politics" },
  { date: "Early Oct", region: "Europe's oil hubs", trigger: "Rotterdam-area diesel stocks drop below the level where traders start panicking (8.5–9M barrels); mid-October if the strait closes fully" },
  { date: "≈ mid-October", region: "China", trigger: "commercial buffer stocks start draining faster than normal" },
  { date: "≈ late October", region: "Europe, at the pump", trigger: "shortages reach ordinary consumers — and governments buckle under price spikes first" },
  { date: "Nov 10–30", region: "Air travel", trigger: "Russia bans jet-fuel exports (Nov 30) — the world's remaining buffer is ~26 days of flying" },
];

// ---------- Russia front (verified anchors only — report §7B + research logs) ----------
// Refining capacity, % of pre-strike baseline. Strikes began Aug 2025 (2025–26 Russian
// fuel crisis). No interpolation between anchors — the line connects verified points.
export const russiaCapacityAnchors = [
  { date: "2024-09-01", pct: 100, label: "pre-strike baseline" },
  { date: "2025-08-01", pct: 100, label: "strikes begin (Aug 2025)" },
  { date: "2026-04-15", pct: 75, label: "~25% of capacity lost (mid-April)" },
  { date: "2026-08-29", pct: 70, label: ">30% of actual capacity offline (Moscow Times, Aug 29)" },
];
// Sep 9 spread of estimates (capacity OUT): UA Gen Staff 42.74% · Russian Forbes 54% · IEA ">20%"
// → capacity REMAINING: 46%–80%
export const russiaCurrentSpread = { date: "2026-09-09", low: 46, high: 80 };

// Snapshot card rows (name / value / delta / flag) — same shape as invSnapshot
export const russiaSnapshot = [
  { name: "capacity offline", value: ">30%", delta: "Aug 29, Moscow Times — up from ~25% in April", flag: "today's estimates: 42.7% out (UA Gen Staff) to 54% (Forbes)" },
  { name: "strikes in August", value: "21+", delta: "record month, near-daily (Bloomberg, Aug 29)", flag: "" },
  { name: "Kirishi — Russia's #2 plant", value: "halted", delta: "~400K b/d, its only NW plant, two strikes in a month (UA.NEWS, Sep 2)", flag: "" },
  { name: "Perm capacity", value: "−86%", delta: "primary capacity, satellite imagery (Bloomberg, Aug 25)", flag: "every major Lukoil refinery is offline" },
  { name: "Novorossiysk — main Black Sea port", value: "hit", delta: "fuel-oil terminal + the city, 4 killed (Sep 8–9)", flag: "crude outflow 800 → 350 kb/d, Jul → Aug — all three export directions now under attack" },
  { name: "stations rationed", value: "28%", delta: "nationwide caps; Moscow 90% out of AI-92 (Euronews, Aug 20)", flag: "" },
  { name: "gasoline contracts unmet", value: ">50%", delta: "TASS, Sep 3", flag: "" },
  { name: "oil & gas revenue", value: "−45.4%", delta: "YoY, Q1 official", flag: "the fiscal hit is now as large as the physical one" },
];

export const russiaBanCascade = [
  { date: "Sep 30, 2026", what: "diesel exports" },
  { date: "Nov 30, 2026", what: "jet fuel exports" },
  { date: "Jan 31, 2027", what: "gasoline & the remaining diesel" },
];

// ---------- Second-order effects (recession / rates / food — report macro channel + §11B) ----------
// 12-mo US recession odds, July–Sep 2026. Polymarket is "by end-2027" (longer window, ~15 months).
// Ordered by pct desc (chart plots in array order, first = top).
export const recessionOdds = [
  { name: "Moody's", pct: 50, note: "bearish outlier" },
  { name: "JPMorgan", pct: 35, note: "" },
  { name: "Polymarket (by end-2027)", pct: 32, note: "longer window" },
  { name: "Goldman Sachs", pct: 30, note: "20% pre-war" },
  { name: "NY Fed model", pct: 25, note: "" },
  { name: "TD Securities", pct: 25, note: "Sep 7" },
  { name: "WSJ poll (74 economists)", pct: 25, note: "33% in April" },
];

export const ratesStats = [
  { label: "Fed funds, July FOMC", value: "3.50–3.75%", sub: "9-to-3 hold; officials 'see the need for a hike if inflation doesn't cool'" },
  { label: "Odds of a HIKE in September", value: "≈86%", sub: "fed funds futures, Sep 11 — up from ~72% Thursday after the Aug CPI core ran above forecast; Polymarket 62%" },
  { label: "Aug PPI (BLS, Sep 10)", value: "5.4% YoY", sub: "+0.4% m/m, in line; up from 4.8% (Jul, rev.) — energy +4.2% (diesel +24.1%); 10-yr at highest since Oct 2023" },
];

export const foodStats = [
  { label: "Gulf → India VLCC freight", value: "+411%", sub: "$4.34/bbl in Aug vs pre-war (Frontline)" },
  { label: "TTF gas (Europe)", value: "≈€50/MWh", sub: "Aug 19 · ≈$16.8/MMBtu" },
  { label: "JKM gas (Asia)", value: "$23.17/MBtu", sub: "all-time high" },
];

// The lag chain: energy shock → food shock, 12–18 months. Dates are the midpoint of
// each documented window (Q4 2026 / Dec–Feb / Mar–Apr / Jul–Oct / 2027–28).
// Each stage is the documented WINDOW (start–end), not a point — drawn as a gantt bar.
// The war itself is the vertical reference line at Feb 28, 2026.
export const foodLagBars = [
  { name: "freight in food prices", start: "2026-09-01", end: "2026-12-31", window: "Q4 2026" },
  { name: "fertiliser prices peak", start: "2026-12-01", end: "2027-02-28", window: "Dec 26 – Feb 27" },
  { name: "2027 plantings", start: "2027-03-01", end: "2027-04-30", window: "Mar – Apr 27" },
  { name: "harvest damage fixed", start: "2027-07-01", end: "2027-10-31", window: "Jul – Oct 27" },
  { name: "food-price spike", start: "2027-11-01", end: "2028-06-30", window: "2027 – 28" },
];

// ---- Natural gas: TTF (Europe) + JKM (Asia), $/MMBtu, 2026 YTD ----
// Two sources, both verified, never interpolated:
//  * Jan 21 – Apr 24: EIA weekly averages of front-month futures (Bloomberg L.P.), from EIA's
//    Natural Gas Weekly Update + the Apr 28, 2026 Today in Energy chart (id=67604). Filled markers.
//  * May – Aug: assessed spot prices on the stated dates from Global LNG Hub weekly updates
//    (ICIS/Platts assessments; ranges reported as midpoints). Hollow markers.
// Pre-closure baseline = week of Feb 27 (EIA weekly averages): TTF 10.99, JKM 10.66.
// The Apr 28 EIA TIE article states: TTF +35% and JKM +51% vs pre-closure as of Apr 24 —
// which the series reproduces (14.80/10.99 = +34.6%, 16.02/10.66 = +50.3%).
export type GasPt = { date: string; value: number; assessed?: boolean; note?: string };

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
  { date: "2026-08-19", value: 16.8, assessed: true, note: "≈€50/MWh (converted)" },
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
  { date: "2026-08-19", value: 23.17, assessed: true, note: "all-time high" },
];

export const gasPreClosure = { ttf: 10.99, jkm: 10.66 };

// ---- US 10-year Treasury yield ----
// Weekly Friday closes, FRED DGS10 (fetched 2026-09-10), plus Sep 9 (Wednesday, FRED) and
// Sep 10 (Yahoo ^TNX daily — reconciles: Sep 9 Yahoo 4.837 ≈ FRED 4.83).
// Jun 19 missing from the source (holiday) — the gap is real, not interpolated.
// Cross-verified: Sep 1 = 4.79 here vs "~4.78% on Tuesday" (Euronews Sep 1); Sep 9 4.83 =
// "highest level since 2023" (CNBC Sep 9); 4.8% = "the high reached in January 2025" (CNBC Sep 7).
export interface Y10Pt {
  date: string;
  value: number;
}
export const treasury10y: Y10Pt[] = [
  { date: "2026-01-02", value: 4.19 },
  { date: "2026-01-09", value: 4.18 },
  { date: "2026-01-16", value: 4.24 },
  { date: "2026-01-23", value: 4.24 },
  { date: "2026-01-30", value: 4.26 },
  { date: "2026-02-06", value: 4.22 },
  { date: "2026-02-13", value: 4.04 },
  { date: "2026-02-20", value: 4.08 },
  { date: "2026-02-27", value: 3.97 },
  { date: "2026-03-06", value: 4.15 },
  { date: "2026-03-13", value: 4.28 },
  { date: "2026-03-20", value: 4.39 },
  { date: "2026-03-27", value: 4.44 },
  { date: "2026-04-03", value: 4.35 },
  { date: "2026-04-10", value: 4.31 },
  { date: "2026-04-17", value: 4.26 },
  { date: "2026-04-24", value: 4.31 },
  { date: "2026-05-01", value: 4.39 },
  { date: "2026-05-08", value: 4.38 },
  { date: "2026-05-15", value: 4.59 },
  { date: "2026-05-22", value: 4.56 },
  { date: "2026-05-29", value: 4.45 },
  { date: "2026-06-05", value: 4.55 },
  { date: "2026-06-12", value: 4.48 },
  { date: "2026-06-26", value: 4.38 },
  { date: "2026-07-10", value: 4.56 },
  { date: "2026-07-17", value: 4.55 },
  { date: "2026-07-24", value: 4.69 },
  { date: "2026-07-31", value: 4.75 },
  { date: "2026-08-07", value: 4.65 },
  { date: "2026-08-14", value: 4.68 },
  { date: "2026-08-21", value: 4.74 },
  { date: "2026-08-28", value: 4.73 },
  { date: "2026-09-04", value: 4.78 },
  { date: "2026-09-09", value: 4.83 },
  { date: "2026-09-10", value: 4.95, note: "FRED (was Yahoo 4.94; FRED posted Sep 11)" },
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
