#!/usr/bin/env node
// daily-update.mjs — Tier 2 (Oct 4). Fetches every fetchable price input for the daily
// pass and (in apply mode) appends the mechanical parts to crisis.ts.
//
// What it fetches (all recipes verified Oct 4 — see research/API-RECIPES.md):
//   AAA retail (regular + diesel)   via the brave-search skill's content.js
//   WTI / Brent closes (CL=F, BZ=F) Yahoo v8 chart API (no key)
//   10-yr close (^TNX)              Yahoo v8 chart API (no key, direct percentage)
//   SPR level                       WPSR table1.csv (no key, cp1252, week-ending Fri)
//   TTF / JKM                       brave search for the Global LNG Hub post — URL only;
//                                   the value is read by hand (printed bands, assessed)
//
// What it does NOT do (by design — judgment, not mechanics):
//   - News selection/framing (run `node scripts/daily-update.mjs news` for the
//     collection sweep; verification and copy are the pass's job)
//   - WTI/Brent settlement confirmation (Yahoo close ≈ settlement; pass it explicitly
//     with --wti/--brent and the script cross-checks against the Yahoo bar)
//   - TTF/JKM values, the stats-strip sub-lines, the crack methodology paragraph
//     (run node scripts/crack-pairing.mjs after applying)
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

function fetchTtfJkmUrl() {
  try {
    const out = execFileSync("node",
      [join(BRAVE, "search.js"), "Natural gas prices weekly update JKM TTF Global LNG Hub", "-n", "5", "--freshness", "1w"],
      { env: braveEnv(), encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "ignore"] });
    const url = (out.match(/https?:\/\/[^\s]+globallngh[^\s]*/i) || out.match(/https?:\/\/[^\s]+/))?.[0];
    return url || "(no URL found)";
  } catch {
    return "(search failed — run the brave query by hand)";
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
  const m = arrayBlock(src, name);
  const dates = [...m[2].matchAll(/date: "(\d{4}-\d{2}-\d{2})"/g)].map((x) => x[1]);
  return dates.length ? dates[dates.length - 1] : null;
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

  for (const [label, sym] of [["WTI (CL=F)", "CL=F"], ["Brent (BZ=F)", "BZ=F"], ["10-yr (^TNX)", "^TNX"]]) {
    say(`\n## ${label}`);
    try {
      const bars = await yahoo(sym);
      for (const b of bars) say(`  ${b.date}: ${b.value.toFixed(3)}`);
      const siteSeries = label.startsWith("WTI") ? "wtiWeekly" : label.startsWith("Brent") ? "brentYtd" : "treasury10y";
      const last = lastDate(src, siteSeries);
      const newest = bars[bars.length - 1];
      say(`  site tail: ${siteSeries} ends ${last}` + (newest.date > last ? `   **new bars available**` : ""));
    } catch (e) { say(`  ERROR: ${e.message}`); }
  }

  say("\n## SPR (WPSR table1.csv)");
  try {
    const s = await fetchSPR();
    const last = lastDate(src, "sprWeekly");
    say(`  week ending ${s.date}: ${s.level} Mbbl` + (s.date > last ? `   **NEW (site ends ${last})**` : `   (site current)`));
  } catch (e) { say(`  ERROR: ${e.message}`); }

  say("\n## TTF / JKM (Global LNG Hub — value read by hand)");
  say(`  newest post: ${fetchTtfJkmUrl()}`);

  say(`\n## Site state\n  DATA_AS_OF = ${asOf}`);
  say(`\n## Manual checklist (not automatable)`);
  say(`  - [ ] WTI/Brent settlement confirmation (cross-check the Yahoo bar; pass via --wti/--brent)`);
  say(`  - [ ] TTF/JKM assessed values from the GLNGH post`);
  say(`  - [ ] stats-strip sub-lines + any watchlist changes (crisis.ts)`);
  say(`  - [ ] crack methodology paragraph (node scripts/crack-pairing.mjs --since <date>)`);
  say(`  - [ ] news: node scripts/daily-update.mjs news  (collection only — verify + frame by hand)`);
  say(`  - [ ] model pass (research/model/), then build → staging → harness → report`);
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
  const entries = [];
  const notes = [];

  // AAA — mechanical daily
  try {
    const a = fetchAAA();
    entries.push({ series: "gasolineYtd", date: a.date, value: a.regular,
      line: `{ date: "${a.date}", value: ${a.regular}, note: "AAA release, ${shortDate(a.date)}" }` });
    entries.push({ series: "dieselYtd", date: a.date, value: a.diesel,
      line: `{ date: "${a.date}", value: ${a.diesel}, note: "AAA release, ${shortDate(a.date)}" }` });
  } catch (e) { notes.push(`AAA fetch failed (${e.message}) — retail not applied`); }

  // 10-yr — fully elapsed sessions only (no same-day guess)
  try {
    const bars = (await yahoo("^TNX", "5d")).filter((b) => b.date < todayUTC);
    const last = bars[bars.length - 1];
    if (last) {
      const v = +last.value.toFixed(3);
      entries.push({ series: "treasury10y", date: last.date, value: v,
        line: `{ date: "${last.date}", value: ${v}, note: "session close (Yahoo)" }` });
    }
  } catch (e) { notes.push(`Yahoo ^TNX failed (${e.message}) — 10-yr not applied`); }

  // SPR — mechanical weekly
  try {
    const s = await fetchSPR();
    entries.push({ series: "sprWeekly", date: s.date, value: s.level,
      line: `{ date: "${s.date}", level: ${s.level} }` });
  } catch (e) { notes.push(`SPR fetch failed (${e.message}) — not applied`); }

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
    line: `{ date: "${y10x.date}", value: ${+y10x.value.toFixed(3)}, note: "session close (Yahoo, same-day)" }` });

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
  say("Next: node scripts/crack-pairing.mjs --since <date> · stats-strip sub-lines · build → staging → harness");
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
  say(`## Probably NEW (high novelty — verify before anything else)`);
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
