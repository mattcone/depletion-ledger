// Dashboard data — single source of truth. Update here after each research pass.
// All figures sourced from the research project (`../research`) — each array's
// comment carries its source and as-of date.
//
// Data policy: verified observations only, no interpolation. Every chart point is a
// real observation with a source; `approx: true` marks a source's rounded estimate
// (e.g. "Brent near $80 on Jun 22") and renders as a hollow marker.

export const DATA_AS_OF = "2026-09-21";
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
}

// ---------- Headline stats ----------
export const stats = [
  { label: "Brent", value: "$100.34", sub: "Sep 21 settlement · −3.4% vs. prior close $103.87 (Sep 18) · +32% vs pre-crisis ~$76" },
  { label: "US diesel (AAA)", value: "$6.51", sub: "Sep 21 · all-time high $6.5107 · +75% vs pre-war $3.72" },
  { label: "US gasoline (AAA)", value: "$4.48", sub: "Sep 21 · +16.2¢ in a week (AAA) · +59% vs Jan $2.81" },
  { label: "SPR", value: "285.0M", sub: "Sep 11 · down 0.4M in a week · down 130.5M from pre-war 415.4M · lowest since Nov 1982" },
  { label: "US diesel & heating oil", value: "107.9M", sub: "Sep 11 · up 1.6M in a week · 13.5% below last year · East Coast stocks 31% below last year" },
];

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
  { date: "2026-09-14", value: 101.39, note: "front-month futures close (Yahoo, corrected Sep 15; FRED not yet available)" },
  { date: "2026-09-15", value: 105.83, note: "front-month futures close (Yahoo; corrected from $105.48)" },
  { date: "2026-09-16", value: 102.43, note: "front-month futures close (NYMEX 2pm ET; CNBC) · −3.2%" },
  { date: "2026-09-17", value: 101.91, note: "front-month futures close (Yahoo) · −0.5%" },
  { date: "2026-09-18", value: 100.3, note: "front-month futures close (Yahoo; CNBC concurs) · −1.6%" },
  { date: "2026-09-21", value: 95.78, note: "settlement (Reuters, October contract — its final trading day) · −4.5%" },
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
  { date: "2026-09-04", level: 285.360 },
  { date: "2026-09-11", level: 284.957 },
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
  { date: "2026-09-11", value: 423.429 },
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
  { date: "2025-09-12", value: 415.361 },
];
export const sprPreWar = 415.441; // Feb 27, 2026 (EIA)
export const sprFloors = [
  { level: 300, name: "Cavern damage risk: about 300M barrels (first report below: week ending Aug 7)" },
  { level: 250, name: "GEF operating minimum: 250M barrels" },
  { level: 180, name: "Operating limit: 180M barrels" },
  { level: 70, name: "DOE stated safe minimum: 70M barrels" },
];
// ---------- SPR drawdown pace (computed from sprWeekly) ----------
// Weekly draw, M bbl (positive = drawn), oldest → newest
export const sprDrawDeltas: { date: string; mmbbl: number }[] = sprWeekly
  .slice(1)
  .map((p, i) => ({ date: p.date, mmbbl: +(sprWeekly[i].level - p.level).toFixed(2) }));

// 4-week average draw pace, M b/d (smoothes weekly noise vs a single week)
export const sprDrawPace4w = +(((sprWeekly[sprWeekly.length - 5].level - sprWeekly[sprWeekly.length - 1].level) / 28).toFixed(2));

// ---------- Supply snapshot (EIA WPSR w/e Sep 11, released Sep 16 + STEO Sep 9) ----------
export const invSnapshot = [
  { name: "SPR", value: "285.0M bbl", delta: "−130.5M (−31%) since pre-war 415.4M", flag: "Lowest since Nov 1982 · down 0.4M barrels in the week ending Sep 11 — third straight week of slowing withdrawals" },
  { name: "US diesel & heating oil", value: "107.9M bbl", delta: "Up 1.6M barrels in the week ending Sep 11 — the second weekly increase in a row; 13.5% below last year (EIA)", flag: "East Coast (PADD 1) stocks are 31% below last year" },
  { name: "US crude", value: "423.4M bbl", delta: "Down 0.6M barrels in the week ending Sep 11 — EIA reported a decrease, while the American Petroleum Institute (API) had reported an increase", flag: "Refined fuels remain in shorter supply than crude oil" },
  { name: "Global inventories", value: "−400M bbl YTD", delta: "EIA estimate, Sep 9", flag: "EIA expects stocks to keep falling through the end of 2026" },
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
    weight: "35%",
    what: "Fighting continues at the current level. Tanker attacks and shipping restrictions continue, some Iranian facilities remain out of service, and the damaged Saudi bypass has no reopening date. The strait stays partly open.",
    path: "Brent stays in the $100–120 range. Oil stocks keep falling through 2027. We assume Gulf production stays at the same level.",
  },
  {
    name: "Corridor lapses",
    bar: "bg-alarm",
    border: "border-l-alarm",
    weight: "55%",
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
  { name: "US Strategic Petroleum Reserve", value: "−130.5M bbl", note: "since Feb 28 · EIA" },
  { name: "IEA coordinated release", value: "400M bbl", note: "released from 32 countries · IEA" },
  { name: "China commercial stockpiles", value: "~2–3M b/d", note: "withdrawals inferred from customs data · official SPR untouched" },
  { name: "Decline in oil demand", value: "−2.5M b/d", note: "2026 forecast, revised from −1.6 in the August report · IEA OMR, Sep 11" },
  { name: "Remaining supply shortfall", value: "−1.8M b/d", note: "Q3 2026 forecast — supply below demand · IEA OMR, Aug 12" },
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
  { region: "China", sub: "part of Asia & Oceania; using stockpiles to support consumption", from: 16.41, to: 15.59 },
  { region: "Europe", from: 14.78, to: 14.71 },
  { region: "United States", from: 20.98, to: 20.54 },
];

// ---------- Refining: US refinery utilization (weekly, % of operable capacity) ----------
// EIA Weekly Petroleum Status Report, series WPULEUS3 — "U.S. Percent Utilization of
// Refinery Operable Capacity". api.eia.gov/v2/petroleum/pnp/wiup, fetched 2026-09-10.
// Sourced values, never interpolated. EIA's definition: "Percent Utilization is
// calculated as gross inputs divided by the latest reported monthly operable capacity."
// 2026: avg 93.5% (n=36); above 95% every week since Jun 5; peak 98.0 (wk of Aug 28).
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
  { date: "2026-09-11", value: 96.8 },
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
  { date: "2025-09-12", value: 93.3 },
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
      { item: "An official repair timetable for the East–West pipeline. An unnamed Bloomberg source says Saudi Arabia aims to restore half its capacity within days and full capacity in six weeks. In the meantime, Vortexa reports that Saudi Gulf terminals have loaded an average of about 3.7M barrels a day since Sep 12, up from 2.9M earlier in the month. Saudi Red Sea loadings fell to zero.", why: "An official estimate of repairs taking only days would reverse the Sep 11 change in odds." },
      { item: "Whether the US and Iran meet at the UN General Assembly this week. Both presidents arrived in New York on Sep 21, but no meeting between them has been confirmed. Iran's military warned on Sep 20 that the US was preparing new strikes.", why: "Talks could help reopen the strait. Renewed strikes could make that harder." },
      { item: "Whether attacks in Bab el-Mandeb spread to non-Saudi vessels.", why: "An attack on a non-Saudi vessel would raise the model's odds that the shipping corridor closes." },
      { item: "Ship traffic through Hormuz. Reuters reported a preliminary Kpler count of 17 tracked commodity vessels crossing on Sep 19–20, down from 37 the previous weekend. Kpler also reported that 22 tankers carried 42M barrels of crude through the strait in the week of Sep 13. On Sep 21, UKMTO reported that a projectile struck a tanker entering the strait, injuring two crew members, and debris hit a second vessel.", why: "Watch whether more ships can pass safely. These counts come from independent trackers and exclude ships with their tracking signals off. The site doesn't use US Central Command's higher claimed totals as data." },
      { item: "Saudi Arabia's response to Houthi attacks on Riyadh. Saudi Arabia confirmed on Sep 19 that the Houthis tried to strike the capital with a ballistic missile (AP). Reuters imagery showed a fire at a fuel depot at King Khalid International Airport. The BBC reported Riyadh's first air-raid alerts since fighting with the Houthis intensified. The Houthis also claimed on Sep 16 that they shot down a Saudi F-15 over Marib; the BBC verified footage of the wreckage, but Saudi Arabia hasn't confirmed the loss.", why: "Confirmation of the F-15 loss or a Saudi military response would mean the fighting has worsened." },
      { item: "Whether the Saudi-led Red Sea coalition takes military action. Saudi Arabia hosted a meeting on Sep 19 to secure the Red Sea, the Gulf of Aden, and Bab el-Mandeb. Turkey offered defense support, and the UK agreed on Sep 21 to provide one refuelling aircraft for a limited period to help Saudi jets defend against Houthi drones and missiles. The UK says this support does not cover strikes on the Houthis.", why: "A coalition naval operation or an expanded UK role would mean the fighting has worsened." },
    ],
  },
  {
    when: "Sep 23",
    items: [
      { item: "The EIA report for the week ending Sep 18, which includes the first days after loadings at Yanbu stopped.", why: "Watch for faster SPR withdrawals, lower commercial crude stocks, or falling diesel stocks." },
      { item: "The Trump–Xi summit in Washington. Xi's state visit is scheduled for Sep 23–25. It follows a new US law authorizing tariffs of up to 100% on countries buying Russian oil and gas, and pressure on China to cut purchases of Iranian crude.", why: "Watch for agreements affecting oil purchases or trade. Better trade relations could increase demand for oil; exemptions from sanctions could make it easier to buy Russian crude." },
    ],
  },
  {
    when: "Sep 30",
    items: [
      { item: "The US-led coalition is scheduled to complete its withdrawal from Iraq.", why: "The withdrawal changes security for Iraq, a major Gulf exporter." },
    ],
  },
  {
    when: "Oct 6",
    items: [
      { item: "The EIA's next monthly oil outlook.", why: "Watch whether the EIA still expects shipping to continue despite restrictions." },
    ],
  },
];

// ---------- Breaking-points cascade (§11, compressed twice) ----------
export const cascade = [
  { date: "Sep 23", region: "US East Coast", trigger: "US diesel and heating-oil stocks covered about a month of consumption on Sep 11. East Coast stocks were 31% below last year. The Sep 23 EIA report, covering the week ending Sep 18, will let us check whether national coverage has fallen below a month." },
  { date: "Sep 30", region: "Russia", trigger: "The diesel export ban expires. With more than 30% of refining capacity damaged, Russia may have little fuel available to export." },
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
];
// Sep 9 spread of estimates (capacity OUT): UA Gen Staff 42.74% · Russian Forbes 54% · IEA ">20%"
// → capacity REMAINING: 46%–80%
export const russiaCurrentSpread = { date: "2026-09-09", low: 46, high: 80 };

// Snapshot card rows (name / value / delta / flag) — same shape as invSnapshot
export const russiaSnapshot = [
  { name: "Capacity out of service", value: ">30%", delta: "Aug 29, Moscow Times — up from ~25% in April", flag: "Early September estimates of capacity offline: 42.7% (Ukraine's General Staff) to 54% (Forbes)" },
  { name: "Strikes in August", value: "21+", delta: "record month, near-daily (Bloomberg, Aug 29)", flag: "" },
  { name: "Kirishi, Russia's second-largest refinery", value: "halted", delta: "~400K b/d; Russia's only northwestern refinery, hit twice in a month (UA.NEWS, Sep 2)", flag: "" },
  { name: "Ryazan (Rosneft), Moscow's main supplier", value: "down", delta: "~156K barrels/day; both primary units offline since Sep 6, with repairs expected to take several weeks (Reuters, Sep 10)", flag: "" },
  { name: "Perm capacity", value: "−86%", delta: "Primary processing capacity lost, based on satellite imagery (Bloomberg, Aug 25)", flag: "Every major Lukoil refinery is out of service" },
  { name: "Novorossiysk — main Black Sea port", value: "hit", delta: "The fuel-oil terminal and city were hit; 4 people killed (Sep 8–9)", flag: "Crude exports fell from 800 to 350 kb/d between Jul and Aug; all three export routes are now under attack" },
  { name: "Gas stations rationing fuel", value: "28%", delta: "Purchase limits nationwide; 90% of Moscow stations out of AI-92 gasoline (Euronews, Aug 20)", flag: "" },
  { name: "Gasoline contracts unfilled", value: ">50%", delta: "TASS, Sep 3", flag: "" },
  { name: "Oil and gas revenue", value: "−45.4%", delta: "First-quarter decline from a year earlier, official figures", flag: "Lost production is also reducing government revenue" },
];

export const russiaBanCascade = [
  { date: "Sep 30, 2026", what: "diesel exports" },
  { date: "Nov 30, 2026", what: "jet fuel exports" },
  { date: "Jan 31, 2027", what: "gasoline & the remaining diesel" },
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
  { label: "August producer prices (BLS, Sep 10)", value: "5.4% YoY", sub: "+0.4% for the month · July revised to 4.8% annually · energy +4.2%, diesel +24.1% annually · 10-year yield highest since Oct 2023" },
];

export const foodStats = [
  { label: "Gulf–India tanker shipping costs", value: "+411%", sub: "$4.34/bbl in Aug vs pre-war (Frontline)" },
  { label: "TTF gas (Europe)", value: "€80/MWh", sub: "Sep 18 · Trading Economics CFD quote · $26.7/MMBtu" },
  { label: "JKM gas (Asia)", value: "$27.5/MMBtu", sub: "Sep 18 · Trading Economics CFD quote" },
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
  // Aug 19 "≈€50/MWh" point (16.8) removed Sep 14: refuted by the same source (Global LNG
  // Hub: $20.8 Aug 14 → $22.6 Aug 21) and by Euronews (€65 on Aug 20). Replaced with the
  // source's own USD/MBtu values (JOGMEC), no conversion.
  { date: "2026-08-14", value: 20.8, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-08-28", value: 22.9, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-09-04", value: 24.5, assessed: true, note: "Global LNG Hub (JOGMEC)" },
  { date: "2026-09-11", value: 27.0, assessed: true, note: "Global LNG Hub (JOGMEC) — highest since Dec 2022" },
  { date: "2026-09-14", value: 27.8, assessed: true, note: "€81.98/MWh (TradingEconomics CFD) × EUR/USD 1.1557 — converted" },
  { date: "2026-09-18", value: 26.7, assessed: true, note: "€79.52/MWh (TradingEconomics CFD, Sep 18 close) × EUR/USD 1.1460 (ECB reference) — converted" },
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
  { date: "2026-09-11", value: 28.5, assessed: true, note: "assessed: mid-USD 28s (record: high-USD 28s on Sep 10, per JOGMEC)" },
  { date: "2026-09-18", value: 27.51, assessed: true, note: "Trading Economics CFD (Sep 18) — a financial-market quote, not a JOGMEC spot price assessment" },
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
  { date: "2026-09-11", value: 4.975, note: "session close (Yahoo) · intraday 4.992, highest since Oct 2023" },
  { date: "2026-09-14", value: 4.961, note: "session close (Yahoo)" },
  { date: "2026-09-15", value: 4.996, note: "session close (Yahoo) · pre-Fed (decision Sep 16, 14:00 ET)" },
  { date: "2026-09-16", value: 5.006, note: "session close (Yahoo) · first close above 5% of the war · post-hike" },
  { date: "2026-09-17", value: 4.947, note: "session close (Yahoo) · back below 5%" },
  { date: "2026-09-18", value: 4.998, note: "session close (Yahoo) · just below 5%" },
  { date: "2026-09-21", value: 4.96, note: "session close (Yahoo) · below 5%" },
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
