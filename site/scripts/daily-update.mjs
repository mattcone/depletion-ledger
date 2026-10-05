#!/usr/bin/env node
// daily-update.mjs — Tier 2 (Oct 4). Fetches every fetchable price input for the daily
// pass and (in apply mode) appends the mechanical parts to crisis.ts.
//
// What it fetches (all recipes verified Oct 4 — see research/API-RECIPES.md):
//   AAA retail (regular + diesel)   via the brave-search skill's content.js
//   WTI / Brent closes (CL=F, BZ=F) Yahoo v8 chart API (no key)
//   10-yr close (^TNX)              Yahoo v8 chart API (no key, direct percentage)
//   SPR level                       WPSR table1.csv (no key, cp1252, week-ending Fri)
//   commercial crude (ex-SPR)       WPSR table1.csv "Crude Oil" − SPR row (no key;
//                                   table1's "Crude Oil" INCLUDES the SPR)
//   TTF / JKM                       brave search for the Global LNG Hub post, then
//                                   content.js on the body — the TTF/JKM lines are
//                                   printed; the VALUE is still chosen by hand (bands,
//                                   assessed, conversions are judgment)
//   catalyst check                  any |day-over-day| > 3% on WTI/Brent/10-yr prints
//                                   a CATALYST CHECK section with the search recipe
//
// What it does NOT do (by design — judgment, not mechanics):
//   - News selection/framing (run `node scripts/daily-update.mjs news` for the
//     collection sweep — it now includes the GlobalSecurity ops update; verification
//     and copy are the pass's job)
//   - WTI/Brent settlement confirmation (Yahoo close ≈ settlement; pass it explicitly
//     with --wti/--brent and the script cross-checks against the Yahoo bar)
//   - TTF/JKM values, the stats-strip sub-line WORDING (fetch prints the streak
//     facts — diesel streak vs record, 10-yr closes above 5%, refinery weeks below
//     95%, commercial-crude delta vs 2025 — for the sub-lines and the weekly copy),
//     the crack methodology paragraph (run node scripts/crack-pairing.mjs after
//     applying)
//
// apply mode also (Oct 5): extends commercialCrude2026 from table1.csv, and the
// AAA-diesel / 10-yr notes carry the streak wording ("fourteenth straight decline
// off the Sep 22 record", "ninth straight close above 5%") instead of the generic
// "AAA release" line.
//
// Usage:
//   node scripts/daily-update.mjs fetch                 # report only, writes nothing
//   node scripts/daily-update.mjs apply [--dry-run] \
//       [--wti 2026-10-05=91.50] [--brent 2026-10-05=102.10] [--y10 2026-10-05=5.281]
//   node scripts/daily-update.mjs news [--days 7]       # Google News + Al Jazeera sweep,
//                                                       # deduped against the last N log days
//
// apply mode is idempotent (skips dates already present), enforces strictly-increasing
// dates and per-series value sanity ranges, backs up crisis.ts before writing
// (.bak-<timestamp> next to it), and bumps DATA_AS_OF to the newest applied date.
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
// single source of truth for the streak wording — the site's own ordinal (Node 26
// strips the types). The Oct 5 review caught a divergent local copy: it rendered
// "twenty" for 20 and "twenty-undefined" for 25 while the site said "twentieth".
import { ordinal } from "../src/data/crisis.ts";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SITE = join(here, "..");
const CRISIS = join(SITE, "src", "data", "crisis.ts");
const LOGS = join(SITE, "..", "research", "logs");
const BRAVE = "/home/mcone/.pi/agent/skills/pi-skills/brave-search";

const [,, cmd = "fetch", ...rest] = process.argv;
const flag = (name, dflt) => {
  const i = rest.indexOf(name);
  if (i < 0) return dflt;
  const v = rest[i + 1];
  if (v === undefined || v.startsWith("--")) throw new Error(`${name} needs a value (got "${v ?? "nothing"}")`);
  return v;
};
const DRY = rest.includes("--dry-run");

const todayUTC = new Date().toISOString().slice(0, 10);
const shortDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const say = (s = "") => console.log(s);

// ── sources ─────────────────────────────────────────────────────────────────

function braveEnv() {
  let key = process.env.BRAVE_API_KEY;
  if (!key) {
    const rc = readFileSync(process.env.HOME + "/.bashrc", "utf8");
    const m = rc.match(/BRAVE_API_KEY="?([A-Za-z0-9]+)"?/);
    if (m) key = m[1];
  }
  if (!key) throw new Error("BRAVE_API_KEY not found (env or ~/.bashrc)");
  return { ...process.env, BRAVE_API_KEY: key };
}

function fetchAAA() {
  const out = execFileSync("node", [join(BRAVE, "content.js"), "https://gasprices.aaa.com/"], {
    env: braveEnv(), encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "ignore"],
  });
  const dateM = out.match(/Price as of (\d{1,2})\/(\d{1,2})\/(\d{2})/);
  const rowM = out.match(/\|\s*Current Avg\.\s*\|\s*\$([\d.]+)\s*\|\s*\$[\d.]+\s*\|\s*\$[\d.]+\s*\|\s*\$([\d.]+)\s*\|\s*\$[\d.]+\s*\|/);
  if (!dateM || !rowM) throw new Error("AAA: could not parse page (bot filter or layout change) — use content.js by hand");
  const date = `20${dateM[3]}-${dateM[1].padStart(2, "0")}-${dateM[2].padStart(2, "0")}`;
  return { date, regular: +rowM[1], diesel: +rowM[2] };
}

async function yahoo(sym, range = "5d") {
  const r = await (await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=${range}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  )).json();
  const res = r?.chart?.result?.[0];
  if (!res) throw new Error(`Yahoo ${sym}: no data (${JSON.stringify(r?.chart?.error)})`);
  return res.timestamp
    .map((ts, i) => ({
      date: new Date(ts * 1000).toISOString().slice(0, 10),
      value: res.indicators.quote[0].close[i],
    }))
    .filter((p) => p.value != null);
}

async function fetchSPR() {
  const buf = await (await fetch("https://ir.eia.gov/wpsr/table1.csv", {
    headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow",
  })).arrayBuffer();
  const csv = new TextDecoder("cp1252").decode(buf);
  const lines = csv.split(/\r?\n/);
  const hdr = lines[0].split(",");
  const weekM = hdr[1].replace(/"/g, "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  const spr = lines.find((l) => l.startsWith('"Strategic Petroleum Reserve (SPR)"'));
  if (!weekM || !spr) throw new Error("SPR: table1.csv layout changed");
  // strip quotes first, then take the first numeric cell — a naive split(',') breaks
  // if EIA ever puts a thousands separator inside the quotes ("1,528.080")
  const cells = spr.replace(/"/g, "").split(",").map((s) => s.trim());
  const levelCell = cells.find((c) => /^\d[\d,]*\.\d+$/.test(c));
  if (!levelCell) throw new Error("SPR: table1.csv layout changed (no numeric level)");
  const date = `20${weekM[3]}-${weekM[1].padStart(2, "0")}-${weekM[2].padStart(2, "0")}`;
  return { date, level: +levelCell.replace(/,/g, "") };
}

// TTF/JKM: find the newest Global LNG Hub post, then pull its body and print the
// TTF/JKM/Henry lines — the pass still CHOOSES the plotted value by hand (bands like
// "high-USD 28s", assessed vs CFD, EUR conversions are judgment), but it no longer
// has to fetch and skim the whole post (Oct 5).
function fetchTtfJkm() {
  let url = null;
  try {
    const out = execFileSync("node",
      [join(BRAVE, "search.js"), "Natural gas prices weekly update JKM TTF Global LNG Hub", "-n", "5", "--freshness", "pw"],
      { env: braveEnv(), encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
    url = (out.match(/https?:\/\/[^\s]+globallngh[^\s]*/i) || out.match(/https?:\/\/[^\s]+/))?.[0];
  } catch { /* fall through */ }
  if (!url) return { url: "(search failed — run the brave query by hand)", lines: "" };
  let body;
  try {
    body = execFileSync("node", [join(BRAVE, "content.js"), url],
      { env: braveEnv(), encoding: "utf8", timeout: 90000, stdio: ["ignore", "pipe", "ignore"] });
  } catch (e) {
    return { url, lines: `(post fetch failed: ${e.message} — read it by hand)` };
  }
  const lines = body.split("\n")
    .filter((l) => /\b(TTF|JKM|Henry|MMBtu|MBtu|MWh|EURUSD|EUR\/USD|assess|JOGMEC|CFD|delivery)\b/i.test(l))
    .map((l) => l.trim()).filter(Boolean).slice(0, 30);
  return { url, lines: lines.length ? lines.join("\n") : "(no TTF/JKM lines matched — read the post by hand)" };
}

// One useful line from a search.js failure: the first non-empty stderr line (search.js
// writes "Error: HTTP 422: …" / "No results found." there). e.message starts with the
// useless "Command failed: …" line and only appends stderr after a newline.
const searchErr = (e) => {
  const line = ((e.stderr || "").trim().split("\n").find((l) => l.trim())) || e.message.split("\n")[0];
  return line.slice(0, 200);
};

// Compact brave search: one block per result (title + age, link, trimmed snippet).
// The raw output is ~4 lines per result; the fetch output is meant to be skimmed.
function braveCompact(query, n, freshness) {
  // stderr is captured (search.js writes "No results found." / API errors there) so a
  // failure message carries the reason, not just "Command failed: node …"
  const out = execFileSync("node",
    [join(BRAVE, "search.js"), query, "-n", String(n), "--freshness", freshness],
    { env: braveEnv(), encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
  return out.split(/--- Result \d+ ---/).map((block) => {
    const get = (k) => (block.match(new RegExp(`^${k}: (.+)$`, "m")) || [])[1] || "";
    const t = get("Title"), l = get("Link"), a = get("Age"), s = get("Snippet");
    if (!t) return "";
    const cp = (c) => (Number.isFinite(c) && c >= 0 && c <= 0x10FFFF ? String.fromCodePoint(c) : "");
    const clean = (x) => x.replace(/<[^>]+>/g, "")
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => cp(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => cp(+d))
      .replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
      .replace(/[\u200b-\u200f\u2060\ufeff]/g, "").replace(/\s+/g, " ").trim();
    return `${t}${a ? ` (${a})` : ""}\n      ${l}${s ? `\n      ${clean(s).slice(0, 220)}` : ""}`;
  }).filter(Boolean);
}

// Commercial crude inventories EXCLUDING the SPR, million barrels (week ending Fri).
// Same no-key table1.csv as the SPR: the "Crude Oil" row INCLUDES the SPR, so
// commercial = crude − SPR (verified: 711.087 − 283.767 = 427.320, matching WCESTUS1
// w/e Sep 25 and the crisis.ts series; 710.950 − 284.552 = 426.398 for w/e Sep 18).
// table1.csv has several "Crude Oil Supply" rows further down — the stocks row is the
// first line starting exactly with "\"Crude Oil\"".
async function fetchCommercialCrude() {
  const buf = await (await fetch("https://ir.eia.gov/wpsr/table1.csv", {
    headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow",
  })).arrayBuffer();
  const csv = new TextDecoder("cp1252").decode(buf);
  const lines = csv.split(/\r?\n/);
  const weekM = lines[0].split(",")[1].replace(/"/g, "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  const firstNum = (row) => {
    const cells = row.replace(/"/g, "").split(",").map((s) => s.trim());
    return cells.find((c) => /^\d[\d,]*\.\d+$/.test(c));
  };
  const crude = lines.find((l) => l.startsWith('"Crude Oil"'));
  const spr = lines.find((l) => l.startsWith('"Strategic Petroleum Reserve (SPR)"'));
  const c = firstNum(crude || ""), s = firstNum(spr || "");
  if (!weekM || !c || !s) throw new Error("commercial crude: table1.csv layout changed");
  return {
    date: `20${weekM[3]}-${weekM[1].padStart(2, "0")}-${weekM[2].padStart(2, "0")}`,
    value: +((+c.replace(/,/g, "")) - (+s.replace(/,/g, ""))).toFixed(3),
  };
}

// GlobalSecurity daily ops update (primary news source, data cutoff ~0500 ET) —
// pulled into the `news` sweep (Oct 5) so it's one command, not a separate content.js
function fetchGlobalSecurity() {
  try {
    return execFileSync("node", [join(BRAVE, "content.js"),
      "https://www.globalsecurity.org/military/ops/iran-war-oprep.htm"],
      { env: braveEnv(), encoding: "utf8", timeout: 90000, stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (e) {
    return `(GlobalSecurity fetch failed: ${e.message} — use content.js by hand)`;
  }
}

// ── crisis.ts parsing / appending ──────────────────────────────────────────

function readCrisis() {
  return readFileSync(CRISIS, "utf8");
}

function arrayBlock(src, name) {
  const re = new RegExp(`(export const ${name}\\s*[:=][^\\[]*\\[)([\\s\\S]*?)(\\n\\];)`);
  const m = src.match(re);
  if (!m) throw new Error(`crisis.ts: array ${name} not found`);
  return m;
}

function lastDate(src, name) {
  const pts = seriesPts(src, name);
  return pts.length ? pts[pts.length - 1].date : null;
}

// {date, value} per entry — property-ORDER-INDEPENDENT. The FRED backfill (Oct 4)
// wrote rows like `{ fred: true, date: "…", value: … }`, and a regex anchored on
// `{ date: …` silently dropped every one of them: 43 of 60 WTI rows and 36 of 52
// 10-yr rows went invisible, and crack-pairing paired Sep 3/4 retail to the Sep 10
// settlement (Oct 5 review). Parse each `{ … }` entry individually. "value:" or
// "level:" (sprWeekly); notes may contain anything, so take the first number after
// the field name. Fails loudly if any entry lacks date+value — parser drift must
// never be silent.
function seriesPts(src, name) {
  const m = arrayBlock(src, name);
  const entries = [...m[2].matchAll(/\{[^{}]*\}/g)].map((x) => x[0]);
  const pts = [];
  for (const e of entries) {
    const d = e.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/);
    const v = e.match(/\b(?:value|level):\s*(-?[\d.]+)/); // sign-aware (worldBalance has negative balances)
    if (d && v) pts.push({ date: d[1], value: +v[1] });
  }
  if (pts.length !== entries.length) {
    console.error(`!! ${name}: only ${pts.length}/${entries.length} entries parsed (missing date/value) — fix seriesPts, do not paper over it`);
    process.exit(1);
  }
  return pts;
}

// the "NNth straight …" facts the pass used to count by hand each day (Oct 5):
// diesel decline streak (vs the record, matching the crisis.ts dieselStreak rule:
// strictly lower AND exactly one day later), 10-yr closes above 5%, refinery weeks
// below 95%, and the latest commercial-crude level vs the same week in 2025
function streakFacts() {
  const src = readCrisis();
  const d = seriesPts(src, "dieselYtd");
  const rec = d.reduce((a, b) => (b.value > a.value ? b : a));
  let n = 0;
  for (let i = d.length - 1; i > 0; i--) {
    const gap = (Date.parse(d[i].date) - Date.parse(d[i - 1].date)) / 86400000;
    if (d[i].value < d[i - 1].value && gap === 1) n++;
    else break;
  }
  const offRecord = n === d.length - 1 - d.indexOf(rec);
  const dieselPhrase = n === 0
    ? "no decline streak (last reading up or flat, or a missed day)"
    : offRecord
      ? `${ordinal(n)} straight decline off the ${shortDate(rec.date)} record $${rec.value.toFixed(4)}`
      : `${ordinal(n)} straight decline (streak no longer contiguous with the record run)`;

  const y = seriesPts(src, "treasury10y");
  let a5 = 0;
  for (let i = y.length - 1; i >= 0; i--) if (y[i].value > 5) a5++; else break;
  const yLast = y[y.length - 1];

  const r = seriesPts(src, "usRefineryUtil2026");
  let b95 = 0;
  for (let i = r.length - 1; i >= 0; i--) if (r[i].value < 95) b95++; else break;
  const rLast = r[r.length - 1];

  const c26 = seriesPts(src, "commercialCrude2026");
  const c25 = seriesPts(src, "commercialCrude2025");
  const last26 = c26[c26.length - 1];
  // same week in 2025 = the 2025 point closest to (2026 week-ending date − 364 days):
  // 52 weeks lands on the same day of the week, so the matching week-ending Friday is
  // exact (2026-09-25 → 2025-09-26). MMDD equality fails across the year; absolute
  // date distance is ~365 days, not ~0.
  const expected25 = Date.parse(last26.date) - 364 * 86400000;
  const same25 = c25.reduce((best, p) =>
    Math.abs(Date.parse(p.date) - expected25) < Math.abs(Date.parse(best.date) - expected25) ? p : best);
  const off25 = Math.abs(Date.parse(same25.date) - expected25) > 1; // true → 2025 series lacks that week; say so
  const delta = last26.value - same25.value;

  return {
    diesel: { phrase: dieselPhrase, streak: n, record: rec },
    y10: { streak: a5, last: yLast },
    refinery: { streak: b95, last: rLast },
    crude: { last: last26, same25, delta, offWeek: off25 },
  };
}

// streak-aware notes for apply (Oct 5) — the hand-typed "Nth straight decline off
// the Sep 22 record" annotations, computed instead of typed
function dieselNoteFor(newPt) {
  const d = seriesPts(readCrisis(), "dieselYtd");
  const rec = d.reduce((a, b) => (b.value > a.value ? b : a));
  const last = d[d.length - 1];
  if (newPt.value > rec.value) return "AAA record";
  const gap = (Date.parse(newPt.date) - Date.parse(last.date)) / 86400000;
  if (newPt.value < last.value && gap === 1) {
    let n = 1;
    for (let i = d.length - 1; i > 0; i--) {
      const g = (Date.parse(d[i].date) - Date.parse(d[i - 1].date)) / 86400000;
      if (d[i].value < d[i - 1].value && g === 1) n++;
      else break;
    }
    const offRecord = n - 1 === d.length - 1 - d.indexOf(rec);
    return offRecord
      ? `AAA — ${ordinal(n)} straight decline off the ${shortDate(rec.date)} record`
      : `AAA — ${ordinal(n)} straight decline`;
  }
  return `AAA release, ${shortDate(newPt.date)}`;
}

// Streak note for a 10-yr addition, computed from a WORKING series (the crisis.ts
// points + the additions already accepted THIS run). Oct 5 review: reading crisis.ts
// fresh per call gave both of two same-run additions the same streak number (both
// "ninth" when the starting streak was eight). Callers push each accepted addition
// before the next call — see the y10Working helper in runApply.
function y10NoteFor(value, working, sameDay = false) {
  let a5 = 0;
  for (let i = working.length - 1; i >= 0; i--) if (working[i].value > 5) a5++; else break;
  const base = sameDay ? "session close (Yahoo, same-day)" : "session close (Yahoo)";
  // `working` already INCLUDES this point (the caller pushed it) — no +1.
  return value > 5
    ? `${base} · ${ordinal(a5)} straight close above 5%`
    : `${base} · back below 5%`;
}

function appendEntry(src, name, line) {
  const re = new RegExp(`(export const ${name}\\s*[:=][^\\[]*\\[)([\\s\\S]*?)(\\n\\];)`);
  // replacement CALLBACK, not a replacement string: the entry line can contain "$"
  // (the cross-check note "DIFFERS BY $2.00, VERIFY"), and "$2" in a replacement
  // string expands to capture group 2 — the entire array body (reproduced TS error).
  return src.replace(re, (_m, a, b, c) => `${a}${b}\n${line}${c}`);
}

const SANITY = {
  gasolineYtd: [2, 12], dieselYtd: [2, 15], wtiWeekly: [20, 300],
  brentYtd: [20, 300], treasury10y: [0, 20], sprWeekly: [100, 800],
  commercialCrude2026: [100, 800], // NEVER extends commercialCrude2025 — that series is complete
};

// Returns {src, applied: [{series, date, value}], skipped: [msg]}
function applyEntries(src, entries) {
  const applied = [];
  const skipped = [];
  for (const e of entries) {
    if (!Number.isFinite(e.value)) { skipped.push(`${e.series} ${e.date}: value is not a finite number — NOT applied`); continue; }
    const last = lastDate(src, e.series);
    if (last && e.date <= last) { skipped.push(`${e.series} ${e.date}: not newer than last (${last}) — skipped`); continue; }
    const [lo, hi] = SANITY[e.series];
    if (e.value < lo || e.value > hi) { skipped.push(`${e.series} ${e.date}: value ${e.value} outside sanity [${lo}, ${hi}] — NOT applied`); continue; }
    src = appendEntry(src, e.series, `  ${e.line},`);
    applied.push(e);
  }
  return { src, applied, skipped };
}

// ── fetch (report only) ────────────────────────────────────────────────────

async function runFetch() {
  say(`# daily-update fetch — ${new Date().toUTCString()}\n`);
  const src = readCrisis();
  const asOf = (src.match(/DATA_AS_OF = "(\d{4}-\d{2}-\d{2})"/) || [])[1] || "(not found)";

  say("## AAA retail (national)");
  try {
    const a = fetchAAA();
    const dLast = lastDate(src, "dieselYtd"), gLast = lastDate(src, "gasolineYtd");
    say(`  as of ${a.date}: regular $${a.regular.toFixed(4)} · diesel $${a.diesel.toFixed(4)}` +
        (a.date > dLast ? `   **NEW (site diesel ends ${dLast})**` : `   (site current — no new day)`));
    say(`  site tail: gasoline ${gLast} · diesel ${dLast}`);
  } catch (e) { say(`  ERROR: ${e.message}`); }

  const barSets = {}; // kept for the catalyst check below
  for (const [label, sym] of [["WTI (CL=F)", "CL=F"], ["Brent (BZ=F)", "BZ=F"], ["10-yr (^TNX)", "^TNX"]]) {
    say(`\n## ${label}`);
    try {
      const bars = await yahoo(sym);
      barSets[sym] = bars;
      for (const b of bars) say(`  ${b.date}: ${b.value.toFixed(3)}`);
      const siteSeries = label.startsWith("WTI") ? "wtiWeekly" : label.startsWith("Brent") ? "brentYtd" : "treasury10y";
      const last = lastDate(src, siteSeries);
      const newest = bars[bars.length - 1];
      say(`  site tail: ${siteSeries} ends ${last}` + (newest.date > last ? `   **new bars available**` : ""));
    } catch (e) { say(`  ERROR: ${e.message}`); }
  }

  // Catalyst rule (mechanical half, Oct 5): any |day-over-day| > 3% needs a driver
  // search BEFORE the move goes in the log — the move without its cause is half a fact.
  const movers = [];
  for (const [label, bars] of Object.entries(barSets)) {
    const [p, c] = [bars[bars.length - 2], bars[bars.length - 1]];
    if (!p || !c || !p.value) continue;
    const pct = ((c.value - p.value) / p.value) * 100;
    if (Math.abs(pct) > 3) movers.push({ label, date: c.date, pct, live: c.date >= todayUTC });
  }
  if (movers.length) {
    say(`\n## CATALYST CHECK REQUIRED (|move| > 3%)`);
    for (const m of movers) {
      say(`  ${m.label}: ${m.pct >= 0 ? "+" : ""}${m.pct.toFixed(1)}% on ${m.date}` +
        (m.live ? "   (LIVE bar — session not settled; confirm after settlement)" : ""));
    }
    say(`  → brave-search: ./search.js "<asset> <price move> reason" --freshness pd  (the wrapper takes pd/pw/pm/py — 1d/1w are silently ignored by Brave)`);
  }

  say("\n## SPR (WPSR table1.csv)");
  try {
    const s = await fetchSPR();
    const last = lastDate(src, "sprWeekly");
    say(`  week ending ${s.date}: ${s.level} Mbbl` + (s.date > last ? `   **NEW (site ends ${last})**` : `   (site current)`));
  } catch (e) { say(`  ERROR: ${e.message}`); }

  say("\n## TTF / JKM (Global LNG Hub — the plotted value is still chosen by hand)");
  const t = fetchTtfJkm();
  say(`  newest post: ${t.url}`);
  for (const l of t.lines.split("\n")) say(`  ${l}`);

  // Shipping (Oct 5): the DAILY-stale part of the shipping story — tanker/vessel
  // attack reports + the Kpler / Windward traffic numbers the watchlist copy quotes.
  // The EIA chokepoint chart (ShippingRoutes.astro / shipping-routes.json) is
  // QUARTERLY — deliberately not checked here. Collection only, like news mode:
  // each item must trace to a wire/official source before it enters the log.
  say("\n## Shipping (tanker attacks + traffic data — the watchlist's daily-stale part)");
  const shippingQueries = [
    ["Tanker/vessel attacks (past day)", "tanker OR vessel attacked OR struck OR seizure Hormuz OR \"Gulf of Aden\" OR \"Red Sea\" OR Suez", 8, "pd"],
    ["Kpler traffic data (past week)", "Kpler tanker Hormuz OR crossings OR \"crude exports\"", 5, "pw"],
    ["Windward traffic (past week)", "\"Windward\" (Hormuz OR \"Red Sea\") traffic OR vessels", 5, "pw"],
  ];
  for (const [label, q, n, fresh] of shippingQueries) {
    say(`\n### ${label}`);
    try {
      const lines = braveCompact(q, n, fresh);
      for (const line of lines) say(`  ${line}`);
      if (!lines.length) say(`  (no results)`);
    } catch (e) { say(`  (search failed: ${searchErr(e)} — run the query by hand)`); }
  }
  say(`  → watchlist copy (index.astro, \"Ship traffic through Hormuz\"): newest Kpler crossing counts + UKMTO warning numbers + any new incidents. Verify before publishing.`);
  say(`  Note: genuine Windward figures surface mostly via the trade press (Maritime Executive, TradeWinds, etc. — they quote Windward's transit counts). Ignore anonymous \"live tracker\" SEO sites (hormuz.now, tankermap.com, …) — they don't meet the wire/official source bar.`);

  // Russia (second front): the inputs for russiaSnapshot + russiaBanCascade —
  // new refinery strikes/outages (UA Gen Staff, ISW, RBC — the Gen Staff's
  // capacity figure moves nearly weekly), export-ban decisions (decree news — the
  // diesel ban was extended to Oct 31 on Sep 30), and shortage/estimate stats.
  // Collection only, same rule as shipping.
  say("\n## Russia (second front — refinery strikes, export bans, capacity estimates)");
  const russiaQueries = [
    ["Refinery strikes (past day)", "Russia (refinery OR refineries) (drone OR strike OR hit OR damaged OR offline)", 8, "pd"],
    ["Export bans (past week)", "Russia export ban diesel OR gasoline OR \"jet fuel\" extended", 5, "pw"],
    ["Capacity + fuel shortages (past week)", "Russia gasoline shortage OR \"refinery capacity\" estimate", 5, "pw"],
  ];
  for (const [label, q, n, fresh] of russiaQueries) {
    say(`\n### ${label}`);
    try {
      const lines = braveCompact(q, n, fresh);
      for (const line of lines) say(`  ${line}`);
      if (!lines.length) say(`  (no results)`);
    } catch (e) { say(`  (search failed: ${searchErr(e)} — run the query by hand)`); }
  }
  say(`  → crisis.ts: russiaSnapshot rows (newest capacity estimates — Gen Staff / Forbes / IEA — struck/offline refineries, shortage stats) and russiaBanCascade (new ban extensions or revocations). Verify before publishing.`);

  say("\n## Streaks + weekly facts (for the sub-lines, notes, and the weekly copy)");
  try {
    const f = streakFacts();
    say(`  diesel: ${f.diesel.phrase}`);
    say(`  10-yr: ${f.y10.streak === 0 ? "no streak of closes above 5%" : ordinal(f.y10.streak) + " straight close above 5%"} (last ${f.y10.last.value} on ${f.y10.last.date})`);
    say(`  refinery: ${f.refinery.streak === 0 ? "no streak of weeks below 95%" : f.refinery.streak + " straight week" + (f.refinery.streak === 1 ? "" : "s") + " below 95%"} (last ${f.refinery.last.value}% w/e ${f.refinery.last.date})`);
    say(`  commercial crude: ${f.crude.last.value.toFixed(3)}M w/e ${f.crude.last.date} — ${f.crude.delta >= 0 ? "above" : "below"} the 2025 level of ${f.crude.same25.value.toFixed(3)}M (w/e ${f.crude.same25.date}) by ${Math.abs(f.crude.delta).toFixed(1)}M` + (f.crude.offWeek ? "   **2025 series does not reach this week — delta vs the nearest available week**" : ""));
  } catch (e) { say(`  ERROR: ${e.message}`); }

  say(`\n## Site state\n  DATA_AS_OF = ${asOf}`);
  say(`\n## Manual checklist (not automatable)`);
  say(`  - [ ] WTI/Brent settlement confirmation (cross-check the Yahoo bar; pass via --wti/--brent)`);
  say(`  - [ ] TTF/JKM plotted values from the lines above (bands/assessed/conversions are judgment)`);
  say(`  - [ ] shipping watchlist copy: Kpler counts + UKMTO warnings + incidents from the search above (verify before publishing; the EIA chokepoint chart is quarterly — leave it alone)`);
  say(`  - [ ] Russia: russiaSnapshot estimates/outages + russiaBanCascade from the search above (verify before publishing)`);
  say(`  - [ ] stats-strip sub-line WORDING + any watchlist changes (the streak FACTS are printed above)`);
  say(`  - [ ] crack methodology paragraph (node scripts/crack-pairing.mjs --since <date>)`);
  say(`  - [ ] commercial-crude section copy only if the story changed (the data point itself applies automatically)`);
  say(`  - [ ] news: node scripts/daily-update.mjs news  (GlobalSecurity + sweep — collection only; verify + frame by hand)`);
  say(`  - [ ] model pass (research/model/), then build → staging (deploy.sh runs the geometry check) → verify-live.py staging → report`);
}

// ── apply ──────────────────────────────────────────────────────────────────

function parseExplicit(s, name) {
  if (!s) return null;
  const m = s.match(/^(\d{4}-\d{2}-\d{2})=([\d.]+)$/);
  if (!m) throw new Error(`${name} must be YYYY-MM-DD=value, got "${s}"`);
  const value = Number(m[2]);
  if (!Number.isFinite(value)) throw new Error(`${name} value "${m[2]}" is not a number (NaN would fail both sanity bounds and get appended)`);
  // round-trip, not just NaN: V8 rolls "2026-02-30" into Mar 2 instead of rejecting it
  const p = Date.parse(m[1] + "T00:00:00Z");
  if (Number.isNaN(p) || new Date(p).toISOString().slice(0, 10) !== m[1]) throw new Error(`${name} date "${m[1]}" is not a real date`);
  if (m[1] > todayUTC) throw new Error(`${name} date "${m[1]}" is in the future — a bad date would advance DATA_AS_OF and block real readings`);
  return { date: m[1], value };
}

async function runApply() {
  const src0 = readCrisis();
  // Working 10-yr series for the streak notes (Oct 5 review): an addition made later
  // in this run must count toward the streak of an addition made after it. `y10Note`
  // mirrors applyEntries' dedupe (an addition only counts if it extends the series)
  // and returns the note for the just-added point.
  const y10Working = seriesPts(src0, "treasury10y");
  const y10Note = (value, date, sameDay = false) => {
    const last = y10Working[y10Working.length - 1];
    if (!last || date > last.date) y10Working.push({ date, value });
    return y10NoteFor(value, y10Working, sameDay);
  };
  const entries = [];
  const notes = [];

  // AAA — mechanical daily; the diesel note carries the streak wording (Oct 5) —
  // "AAA — fourteenth straight decline off the Sep 22 record" — instead of the
  // hand-typed annotation (the note patterns: AAA record / Nth straight decline off
  // the record / plain release)
  try {
    const a = fetchAAA();
    entries.push({ series: "gasolineYtd", date: a.date, value: a.regular,
      line: `{ date: "${a.date}", value: ${a.regular}, note: "AAA release, ${shortDate(a.date)}" }` });
    entries.push({ series: "dieselYtd", date: a.date, value: a.diesel,
      line: `{ date: "${a.date}", value: ${a.diesel}, note: "${dieselNoteFor({ date: a.date, value: a.diesel })}" }` });
  } catch (e) { notes.push(`AAA fetch failed (${e.message}) — retail not applied`); }

  // 10-yr — fully elapsed sessions only (no same-day guess); note carries the
  // "Nth straight close above 5%" wording when the close is above 5 (Oct 5)
  try {
    const bars = (await yahoo("^TNX", "5d")).filter((b) => b.date < todayUTC);
    const last = bars[bars.length - 1];
    if (last) {
      const v = +last.value.toFixed(3);
      entries.push({ series: "treasury10y", date: last.date, value: v,
        line: `{ date: "${last.date}", value: ${v}, note: "${y10Note(v, last.date)}" }` });
    }
  } catch (e) { notes.push(`Yahoo ^TNX failed (${e.message}) — 10-yr not applied`); }

  // SPR — mechanical weekly
  try {
    const s = await fetchSPR();
    entries.push({ series: "sprWeekly", date: s.date, value: s.level,
      line: `{ date: "${s.date}", level: ${s.level} }` });
  } catch (e) { notes.push(`SPR fetch failed (${e.message}) — not applied`); }

  // Commercial crude (ex-SPR) — mechanical weekly from the same table1.csv (Oct 5).
  // Only 2026 is ever extended; commercialCrude2025 is complete and final.
  try {
    const c = await fetchCommercialCrude();
    entries.push({ series: "commercialCrude2026", date: c.date, value: c.value,
      line: `{ date: "${c.date}", value: ${c.value} }` });
  } catch (e) { notes.push(`commercial crude fetch failed (${e.message}) — not applied`); }

  // WTI / Brent — explicit values only, cross-checked against Yahoo
  for (const [name, sym, series] of [["wti", "CL=F", "wtiWeekly"], ["brent", "BZ=F", "brentYtd"]]) {
    const x = parseExplicit(flag(`--${name}`, null), `--${name}`);
    if (!x) continue;
    let note = "settlement";
    try {
      const bars = await yahoo(sym, "10d");
      const bar = bars.find((b) => b.date === x.date);
      if (bar) {
        const diff = Math.abs(bar.value - x.value);
        // plain text — the note lands in the user-visible chart tooltip (no markdown)
        note += ` (Yahoo ${sym} close ${bar.value.toFixed(2)}${diff > 0.05 ? ` — DIFFERS BY $${diff.toFixed(2)}, VERIFY` : " cross-checks"}).`;
      }
    } catch { /* cross-check is best-effort */ }
    const line = name === "brent"
      ? `{ date: "${x.date}", value: ${x.value}, tip: "settlement", note: "${note}" }`
      : `{ date: "${x.date}", value: ${x.value}, note: "${note}" }`;
    entries.push({ series, date: x.date, value: x.value, line });
  }
  const y10x = parseExplicit(flag("--y10", null), "--y10");
  if (y10x) entries.push({ series: "treasury10y", date: y10x.date, value: +y10x.value.toFixed(3),
    line: `{ date: "${y10x.date}", value: ${+y10x.value.toFixed(3)}, note: "${y10Note(+y10x.value.toFixed(3), y10x.date, true)}" }` });

  if (!entries.length) {
    say("No candidate entries (fetch failures?) — crisis.ts untouched.");
    for (const n of notes) say(`  ! ${n}`);
    return;
  }

  const { src, applied, skipped } = applyEntries(src0, entries);
  if (!applied.length) {
    // all candidates skipped (e.g. weekend re-run) — do NOT rewrite the file or
    // create a backup for a no-op
    say("Nothing applied (every candidate was skipped) — crisis.ts untouched.");
    for (const s of skipped) say(`  · ${s}`);
    for (const n of notes) say(`  ! ${n}`);
    return;
  }

  // DATA_AS_OF → newest applied date (only if it advances)
  let srcFinal = src;
  const asOf = (src.match(/DATA_AS_OF = "(\d{4}-\d{2}-\d{2})"/) || [])[1];
  const newest = applied.map((e) => e.date).sort().pop();
  // callback form: no "$" in these dates today, but a replacement string would
  // interpret any that ever appear
  if (newest > asOf) srcFinal = src.replace(`DATA_AS_OF = "${asOf}"`, () => `DATA_AS_OF = "${newest}"`);

  say(`# daily-update apply${DRY ? " (DRY RUN — nothing written)" : ""}`);
  for (const e of applied) say(`  + ${e.series}: ${e.date} → ${e.value}`);
  for (const s of skipped) say(`  · ${s}`);
  for (const n of notes) say(`  ! ${n}`);
  if (newest > asOf) say(`  + DATA_AS_OF: ${asOf} → ${newest}`);

  if (DRY) { say("\nDry run — pass without --dry-run to write."); return; }
  const bak = CRISIS + `.bak-${Date.now()}`;
  writeFileSync(bak, src0);
  writeFileSync(CRISIS, srcFinal);
  // keep only the 3 most recent backups
  const baks = readdirSync(dirname(CRISIS)).filter((f) => f.startsWith("crisis.ts.bak-")).sort();
  for (const old of baks.slice(0, -3)) unlinkSync(join(dirname(CRISIS), old));
  say(`\nWrote ${CRISIS} (backup: ${bak})`);
  say("Next: node scripts/crack-pairing.mjs --since <date> · stats-strip sub-lines (streak facts from `fetch`) · build → staging (deploy.sh runs the geometry check) → verify-live.py staging");
}

// ── news (collection sweep — judgment stays with the pass) ─────────────────

const NEWS_QUERIES = [
  "Strait of Hormuz",
  "Saudi Arabia oil exports OR refinery",
  "OPEC+ oil production quotas",
  "tanker attack OR seizure OR war risk insurance",
  "Red Sea shipping OR Suez OR Houthi",
  "strategic petroleum reserve OR SPR draw",
  "Iran oil sanctions OR export",
  "Russia oil refinery strike OR export",
  "UKMTO tanker warning",
];

function rssItems(xml, limit = 40) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) && items.length < limit) {
    const g = (k) => (m[1].match(new RegExp(`<${k}>([\\s\\S]*?)<\\/${k}>`)) || [])[1] || "";
    items.push({
      title: g("title").replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
      link: g("link").trim(),
      date: (g("pubDate") || "").trim(),
    });
  }
  return items;
}

// Story clustering + novelty ranking. Google News links are news.google.com redirects
// (publisher URL not recoverable), and the logs paraphrase headlines, so exact-phrase
// dedupe can't work. Instead: group outlets covering the same story (3+ shared
// significant words with the cluster head) and score each cluster by how many of its
// head-title words never appeared in the recent logs — low score = probably covered,
// high = probably new. Nothing is suppressed; the pass still decides.
// 3-letter function words are noise; domain words (oil, gas, spr, wti, iran) are signal
// and stay in at length >= 3.
const STOP_WORDS = new Set([
  "says", "said", "say", "latest", "today", "daily", "update", "news", "report",
  "reports", "data", "shows", "amid", "after", "before", "about", "into", "more",
  "most", "other", "some", "than", "then", "them", "they", "this", "that", "what",
  "when", "where", "which", "while", "will", "would", "could", "should", "their",
  "there", "these", "those", "have", "has", "had", "being", "been", "also", "just",
  "only", "still", "ever", "first", "second", "third", "now", "per", "via", "due",
  "reuters", "bloomberg", "aljazeera", "bbc", "cnbc", "yahoo", "finance", "times",
  "fortune", "wsj", "crude", "sources", "source", "people", "person", "one", "two",
  "for", "and", "the", "new", "key", "who", "how", "why", "its", "our", "out",
  "off", "not", "but", "all", "any", "can", "did", "down", "over", "with", "from",
  "make", "made", "may", "men", "use", "used",
]);

const sigWords = (title) =>
  title.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

function printCluster(c) {
  const [head, ...also] = c.items;
  const total = sigWords(head.title).length;
  say(`  [novelty ${c.score}/${total}] (${head.q}) ${head.title}`);
  say(`      ${head.link}`);
  // Google News titles are "Headline - Publisher" — take the headline side, not the publisher
  if (also.length) say(`      also: ${also.map((a) => a.title.split(" - ")[0].slice(0, 70)).join(" · ")}`);
}

async function runNews() {
  const days = +(flag("--days", "7")) || 7; // NaN (garbage value) → default window
  const files = existsSync(LOGS)
    ? readdirSync(LOGS).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().slice(-days)
    : [];
  const logText = files.map((f) => readFileSync(join(LOGS, f), "utf8").toLowerCase()).join("\n");

  const raw = [];
  // Google News RSS per topic (publisher is in the title suffix)
  for (const q of NEWS_QUERIES) {
    try {
      const xml = await (await fetch(
        "https://news.google.com/rss/search?q=" + encodeURIComponent(q) + "&hl=en-US&gl=US&ceid=US:en",
        { headers: { "User-Agent": "Mozilla/5.0" } }
      )).text();
      for (const it of rssItems(xml, 8)) raw.push({ q, ...it });
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) { say(`  (Google News "${q}" failed: ${e.message})`); }
  }
  // Al Jazeera all.xml
  try {
    const xml = await (await fetch("https://www.aljazeera.com/xml/rss/all.xml", {
      headers: { "User-Agent": "Mozilla/5.0" } }
    )).text();
    for (const it of rssItems(xml, 25)) raw.push({ q: "Al Jazeera", ...it });
  } catch (e) { say(`  (Al Jazeera failed: ${e.message})`); }

  // cluster: join a cluster when 3+ sig words of the candidate match the head's
  const clusters = [];
  for (const it of raw) {
    const w = new Set(sigWords(it.title));
    const c = clusters.find((cl) => [...w].filter((x) => cl.words.has(x)).length >= 3);
    if (c) { c.items.push(it); for (const x of w) c.words.add(x); }
    else clusters.push({ words: w, items: [it] });
  }
  // score: sig words of the head title that appear NOWHERE in the recent logs = novelty
  for (const c of clusters) {
    c.score = sigWords(c.items[0].title).filter((w) => !logText.includes(w)).length;
  }
  clusters.sort((a, b) => b.score - a.score || b.items.length - a.items.length);

  say(`# news sweep — ${raw.length} raw items → ${clusters.length} story clusters`);
  say(`dedup window: ${files.length} log days (${files.join(", ") || "none"})\n`);
  // GlobalSecurity ops update first — it is the PRIMARY source (data cutoff ~0500 ET);
  // the Google News / Al Jazeera clusters below are the cross-check sweep (Oct 5: it
  // used to be a separate content.js fetch every pass)
  say(`## GlobalSecurity daily ops update (PRIMARY source — cross-check each significant claim)`);
  say(fetchGlobalSecurity().slice(0, 12000));
  say(`\n## Probably NEW (high novelty — verify before anything else)`);
  for (const c of clusters) if (c.score >= 3) printCluster(c);
  say(`\n## Probably already covered (low novelty — skim only if unsure)`);
  for (const c of clusters) if (c.score < 3) printCluster(c);
  say("\nLEADS ONLY — every item must trace to a wire/official source before it enters the log as fact.");
}

(async () => {
  try {
    if (cmd === "fetch") await runFetch();
    else if (cmd === "apply") await runApply();
    else if (cmd === "news") await runNews();
    else { console.error(`unknown command "${cmd}" — use fetch | apply | news`); process.exit(1); }
  } catch (e) {
    console.error(`FATAL: ${e.message}`);
    process.exit(1);
  }
})();
