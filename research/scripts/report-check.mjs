#!/usr/bin/env node
// report-check.mjs — check for new EIA WPSR / EIA STEO / IEA OMR editions, download
// them, and save every edition to research/data/ with provenance.
//
// Cadence (verified, from the EIA pages + archive folders):
//   WPSR  — WEDNESDAY 10:30 ET, for the week ending the PRECEDING Friday.
//   STEO  — second WEDNESDAY 10:30 ET (Sep 9 2026 edition → next Oct 7 2026).
//   OMR   — ~second Tuesday (Sep 11 2026 edition → next ~Oct 13 2026).
// The checks QUERY FOR THE LATEST EDITION rather than trusting the calendar — a
// missed edition is caught on the next run (the Sep 9/10 WPSR sat un-ingested for
// 5 days because the watchlist date was wrong; this is the fix for that class).
//
// Sources (all verified Oct 4):
//   WPSR tables   ir.eia.gov/wpsr/table{1,5,6}.csv — SAME-DAY at release (the v2 API
//                 lags ~1h on release morning), 302-redirect, cp1252. table1 = national
//                 (SPR row), table5 = PADD gasoline, table6 = PADD distillate.
//   STEO          eia.gov/outlooks/steo/xls/STEO_m.xlsx (monthly workbook; the ANNUAL
//                 workbook 404s as of Oct 2026 — discontinued) + the eia.gov/outlooks/
//                 steo/ page (Brent/D2/WTI forecast prose — the workbook has NO world
//                 price forecasts). openpyxl parses the workbook (delegated to python3).
//   OMR PDFs      iea.blob.core.windows.net — NOT Cloudflare-protected, plain fetch
//                 works; the URL is a UUID asset path, DISCOVERED via brave search.
//   OMR summary   iea.org IS Cloudflare-protected; only the codex CLI reader passes
//                 (see the iea-fetch skill). Behind --summary, off by default (slow).
//
// Rules:
//   - Every saved file gets provenance.json (source URL, edition, retrieval time, sha256).
//   - Editions are saved SIDE BY SIDE, never overwritten — when a later edition revises
//     a number, both vintages are preserved (the OMR cumulative series does NOT sum to
//     the published cumulative; never silently reconcile — see the iea-fetch skill).
//   - Nothing here touches site/ — ingestion of a number into crisis.ts is a separate,
//     judgment-gated step in the daily pass.
//
// Usage (from anywhere):
//   node research/scripts/report-check.mjs wpsr
//   node research/scripts/report-check.mjs steo
//   node research/scripts/report-check.mjs omr [--summary]
//   node research/scripts/report-check.mjs bls
//   node research/scripts/report-check.mjs all
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, rmSync, mkdtempSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const REPO = join(here, "..", "..");
const DATA = join(REPO, "research", "data");
const MANIFEST = join(DATA, "reports-manifest.json");
const BRAVE = "/home/mcone/.pi/agent/skills/pi-skills/brave-search";
const UA = { headers: { "User-Agent": "Mozilla/5.0" } };

const [,, cmd = "all", ...rest] = process.argv;
const say = (s = "") => console.log(s);

const todayISO = () => new Date().toISOString().slice(0, 10);

const loadManifest = () =>
  existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const saveManifest = (m) => {
  mkdirSync(DATA, { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
};
const sha256 = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

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

async function getBuf(url) {
  const r = await fetch(url, { ...UA, redirect: "follow" });
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}
const cp1252 = (buf) => new TextDecoder("cp1252").decode(buf);

// python3 program: parses STEO_m.xlsx (argv[1]) + the STEO page HTML (argv[2]) → JSON.
// Layout verified Oct 6 against the Sep 2026 edition (values match crisis.ts: Aug 2026
// world net withdrawal +4.07 mb/d; 2026 Brent 2H26 ~$90 / 2027 $74 from the page prose).
const STEO_PARSER = `
import json, re, sys
import openpyxl
xlsx_path, html_path = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(xlsx_path, data_only=True)
MON = {"January":1,"February":2,"March":3,"April":4,"May":5,"June":6,
       "July":7,"August":8,"September":9,"October":10,"November":11,"December":12}
out = {}
edition = last_hist = None
for row in wb["Dates"].iter_rows(values_only=True):
    vals = [v for v in row if v is not None]
    if not vals: continue
    k = str(vals[0])
    if "Forecast Month" in k and len(vals) > 1: edition = str(vals[1])
    if "Last Historical Month" in k and len(vals) > 1: last_hist = int(vals[1])
if not edition or " " not in edition: sys.exit("STEO Dates sheet: Forecast Month not found")
mon_s, yr = edition.split()
out["edition"] = f"steo-{yr}-{MON[mon_s]:02d}"
out["lastHistorical"] = last_hist
def blocks(ws):
    return {v: i for i, v in enumerate([c.value for c in ws[3]]) if isinstance(v, int)}
def series(ws, sid, years=(2026, 2027)):
    b = blocks(ws)
    for row in ws.iter_rows(min_row=5):
        if row[0].value == sid:
            return {y: [row[c].value if c < len(row) else None for c in range(b[y], b[y] + 12)]
                    for y in years if y in b}
    return None
w = series(wb["3atab"], "t3_stchange_world")
out["worldBalance2026"] = w[2026] if w else None   # workbook sign: + = withdrawal
out["worldBalance2027"] = w[2027] if w else None
c = series(wb["3etab"], "patc_world")
out["worldConsumption2026"] = c[2026] if c else None
out["worldConsumption2027"] = c[2027] if c else None
html = open(html_path, encoding="cp1252", errors="replace").read()
prices = {}
for name, pat in [
    ("Brent", r"Brent crude oil spot price to average around\\s*\\$([\\d.]+)/b in 2H\\d\\d.*?\\$([\\d.]+)/b in (\\d{4})"),
    ("WTI",   r"WTI crude oil spot price to average around\\s*\\$([\\d.]+)/b in 2H\\d\\d.*?\\$([\\d.]+)/b in (\\d{4})"),
    ("D2",    r"Distillate fuel oil spot price to average around\\s*\\$([\\d.]+)/b in 2H\\d\\d.*?\\$([\\d.]+)/b in (\\d{4})"),
]:
    m = re.search(pat, html)
    if m: prices[name] = f"2H26 ~\${m.group(1)}/b, {m.group(3)} \${m.group(2)}/b"
out["prices"] = prices
print(json.dumps(out))
`;

function saveEdition(dir, name, buf, provenance) {
  mkdirSync(dir, { recursive: true });
  const p = join(dir, name);
  writeFileSync(p, buf);
  provenance.files.push({ file: name, sha256: sha256(p), bytes: buf.length });
  return p;
}

// ── WPSR (weekly) ───────────────────────────────────────────────────────────

// RFC-4180 line parser — values like "1,528.080" carry thousands separators INSIDE the
// quotes, so a naive split(',') breaks them.
function csvRow(line) {
  const out = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
const csvRows = (text) => text.split(/\r?\n/).filter((l) => l.trim()).map(csvRow);
const wEndUS = (s) => { // "9/25/26" → "2026-09-25"
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  return m ? `20${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}` : null;
};

const WPSR_TABLES = { table1: "national supplies (SPR, crude, products)", table5: "PADD gasoline stocks", table6: "PADD distillate stocks" };
// exact labels, stocks section only (table1.csv has several STUB_1 sections; "Crude Oil"
// also appears in the later "Crude Oil Supply" rows)
const WPSR_ROWS = new Set(["Crude Oil", "Commercial (Excluding SPR)", "Strategic Petroleum Reserve (SPR)",
  "Total Motor Gasoline", "Distillate Fuel Oil", "Total Stocks (Including SPR)"]);

async function runWpsr(man) {
  say("## WPSR (weekly, Wed 10:30 ET, w/e preceding Friday)");
  const buf = await getBuf("https://ir.eia.gov/wpsr/table1.csv");
  const rows = csvRows(cp1252(buf));
  const hdr = rows[0];
  const week = wEndUS(hdr[1]); // col 1 = newest week-ending date (col 0 is the stub header)
  const prev = man.wpsr?.lastWeekEnd;
  if (!week) throw new Error("WPSR table1.csv header layout changed");
  if (prev && week <= prev) { say(`  w/e ${week} — CURRENT (last ingested ${prev}). Nothing to do.`); return man; }
  say(`  w/e ${week} — **NEW** (last ingested ${prev || "never"})`);

  const dir = join(DATA, "wpsr", `wpsr-${week}`);
  const prov = { report: "EIA WPSR", weekEnd: week, url: "https://www.eia.gov/petroleum/supply/weekly/", retrievedAt: new Date().toISOString(), files: [] };
  for (const [t, desc] of Object.entries(WPSR_TABLES)) {
    const b = await getBuf(`https://ir.eia.gov/wpsr/${t}.csv`);
    saveEdition(dir, `${t}.csv`, b, prov);
  }
  writeFileSync(join(dir, "provenance.json"), JSON.stringify(prov, null, 2));
  say(`  saved ${Object.keys(WPSR_TABLES).length} tables → ${dir}`);

  // key rows: newest value, WoW difference, YoY (cols: 0 label, 1 newest, 3 WoW diff, 6 YoY)
  say("  key rows (latest / WoW / YoY):");
  let inStocks = true;
  for (const row of rows.slice(1)) {
    if (row[0] === "STUB_1") { if (!inStocks) break; inStocks = false; continue; } // 2nd section starts
    if (inStocks && WPSR_ROWS.has(row[0])) {
      const wow = row[3] != null && row[3] !== "" ? +row[3] : null;
      const yoy = row[6] != null && row[6] !== "" ? +row[6] : null;
      say(`    ${row[0]}: ${row[1]}M  (${wow == null ? "n/a" : `${wow >= 0 ? "+" : ""}${wow}M WoW`}, ${yoy == null ? "n/a" : `${yoy}M YoY`})`);
    }
  }
  man.wpsr = { lastWeekEnd: week, dir, at: prov.retrievedAt };
  say(`  next: WPSR w/e ${nextWeekEnd(week)} prints next Wednesday 10:30 ET · ingestion into crisis.ts (sprWeekly etc.) is the pass's step`);
  return man;
}
function nextWeekEnd(ingestedWeek) { // the week-ending Friday for the NEXT Wednesday's release
  const d = new Date();
  const day = d.getUTCDay(); // 0 Sun..6 Sat
  const toWed = (3 - day + 7) % 7 || 7; // next Wednesday (release day)
  let next = new Date(d.getTime() + (toWed - 5) * 86400000).toISOString().slice(0, 10); // release − 5d = its Friday
  if (ingestedWeek && next <= ingestedWeek) next = new Date(Date.parse(ingestedWeek) + 7 * 86400000).toISOString().slice(0, 10); // weekend runs would otherwise point at the week we just ingested
  return next;
}

// ── STEO (monthly) ──────────────────────────────────────────────────────────

async function runSteo(man) {
  say("## STEO (monthly, 2nd Wed 10:30 ET)");
  const [wb, page] = await Promise.all([
    getBuf("https://www.eia.gov/outlooks/steo/xls/STEO_m.xlsx"),
    getBuf("https://www.eia.gov/outlooks/steo/"),
  ]);
  const xlsx = join(DATA, "steo", "_incoming.xlsx");
  const pageHtml = join(DATA, "steo", "_incoming.html");
  mkdirSync(dirname(xlsx), { recursive: true });
  writeFileSync(xlsx, wb);
  const html = cp1252(page);
  writeFileSync(pageHtml, html);

  // workbook + price prose → JSON via python3/openpyxl (the xlsx layout is documented in
  // API-RECIPES.md: row 1 title, row 3 = year header cells that ARE that year's January
  // column, 12 monthly columns per year; col A = series id)
  let parsed;
  try {
    parsed = JSON.parse(execFileSync("python3", ["-", xlsx, pageHtml], {
      input: STEO_PARSER, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
    }).trim());
  } catch (e) {
    for (const p of [xlsx, pageHtml]) try { unlinkSync(p); } catch {}
    throw e;
  }
  // temp copies served their purpose — the real files go into the edition dir below
  for (const p of [xlsx, pageHtml]) try { unlinkSync(p); } catch {}
  const edition = parsed.edition; // e.g. "steo-2026-09"
  const prev = man.steo?.lastEdition;
  if (prev && edition <= prev) { say(`  ${edition} — CURRENT (last ingested ${prev}). Nothing to do.`); return man; }
  say(`  ${edition} — **NEW** (last ingested ${prev || "never"}); last historical month ${parsed.lastHistorical}`);

  const dir = join(DATA, "steo", edition);
  const prov = { report: "EIA STEO", edition, url: "https://www.eia.gov/outlooks/steo/", workbook: "STEO_m.xlsx", retrievedAt: new Date().toISOString(), files: [] };
  saveEdition(dir, "STEO_m.xlsx", wb, prov);
  saveEdition(dir, "steo-main.html", page, prov); // original bytes (cp1252), not re-encoded
  writeFileSync(join(dir, "parsed.json"), JSON.stringify(parsed, null, 2));
  writeFileSync(join(dir, "provenance.json"), JSON.stringify(prov, null, 2));
  say(`  saved workbook + page + parsed.json → ${dir}`);

  say(`  world inventory net withdrawals (mb/d, workbook sign: + = withdrawal; crisis.ts stores the FLIP):`);
  say(`    2026: ${parsed.worldBalance2026.map((v) => (v == null ? "·" : v.toFixed(1))).join(" ")}`);
  say(`    2027: ${parsed.worldBalance2027.map((v) => (v == null ? "·" : v.toFixed(1))).join(" ")}`);
  for (const k of Object.keys(parsed.prices)) say(`    ${k}: ${parsed.prices[k]}`);
  if (parsed.worldConsumption2027) say(`    world consumption 2027 (mb/d): ${parsed.worldConsumption2027.map((v) => (v == null ? "·" : Math.round(v))).join(" ")}`);

  // forecast delta vs the prior edition
  const prevDir = man.steo?.dir;
  if (prevDir && existsSync(join(prevDir, "parsed.json"))) {
    const old = JSON.parse(readFileSync(join(prevDir, "parsed.json"), "utf8"));
    say("  forecast deltas vs " + old.edition + ":");
    const d = (a, b, u = " mb/d") => a != null && b != null && a !== b ? ` ${a.toFixed(1)}→${b.toFixed(1)}${u}` : "";
    for (let m = 0; m < 12; m++) {
      const s = d(old.worldBalance2027[m], parsed.worldBalance2027[m]);
      if (s) say(`    2027-${String(m + 1).padStart(2, "0")}:${s}`);
    }
    for (const k of new Set([...Object.keys(old.prices || {}), ...Object.keys(parsed.prices)])) {
      const o = old.prices?.[k], n = parsed.prices?.[k];
      if (o !== n) say(`    ${k}: ${o ?? "—"} → ${n ?? "—"}`);
    }
  }
  man.steo = { lastEdition: edition, dir, at: prov.retrievedAt };
  return man;
}

// ── IEA OMR (monthly) ───────────────────────────────────────────────────────

const OMR_MONTHS = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
const OMR_MONTH_FULL = ["january","february","march","april","may","june","july","august","september","october","november","december"];

async function runOmr(man, withSummary) {
  say("## IEA OMR (monthly, ~2nd Tuesday)");
  // Two INDEPENDENT artifacts, tracked separately (Oct 4 review): a default run that
  // archives the PDF must not block a later --summary run, and the summary must target
  // the LATEST published edition, not the (lagging) PDF's month.

  // (1) free PDF — UUID blob URLs, discoverable via brave; recent editions sit behind
  // the JS download button and don't get indexed, so this lags the live editions.
  try {
    // no --freshness: blob URLs get indexed when they're first crawled, so freshness
    // filtering hides the very URLs we want; recency is handled by the date sort below.
    const out = execFileSync("node", [join(BRAVE, "search.js"),
      "iea.blob.core.windows.net OilMarketReport 2026 pdf", "-n", "10"],
      { env: braveEnv(), encoding: "utf8", timeout: 90000, stdio: ["ignore", "pipe", "ignore"] });
    const urls = [...out.matchAll(/https?:\/\/iea\.blob\.core\.windows\.net\/[^\s")]+\.pdf/gi)].map((m) => m[0]);
    const MON = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
    const dated = urls.map((u) => {
      // two URL styles, parsed SEPARATELY (the capture groups differ — a shared
      // m[1..3] read turns OMR_AUG_2026's "AUG" into day=NaN)
      let iso = null;
      let m = u.match(/-(\d{1,2})([A-Z]{3})(\d{4})/i);
      if (m) {
        const mon = MON[m[2].toUpperCase()];
        if (mon) iso = `${+m[3]}-${String(mon).padStart(2, "0")}-${String(+m[1]).padStart(2, "0")}`;
      } else if ((m = u.match(/OMR_([A-Z]{3})_(\d{4})/i))) {
        const mon = MON[m[1].toUpperCase()];
        if (mon) iso = `${+m[2]}-${String(mon).padStart(2, "0")}-01`; // month-only URL → first of month
      }
      return { u, iso };
    }).filter((x) => x.iso && /^\d{4}-\d{2}-\d{2}$/.test(x.iso));
    const prev = man.omr?.lastPub;
    if (!dated.length) {
      say("  free PDF: none discoverable in the search — nothing to check (recent editions are not indexed).");
    } else {
      dated.sort((a, b) => b.iso.localeCompare(a.iso));
      const newest = dated[0];
      const gapDays = Math.round((Date.parse(todayISO()) - Date.parse(newest.iso)) / 86400000);
      if (prev && newest.iso <= prev) {
        say(`  free PDF: newest found ${newest.iso} — CURRENT (last ingested ${prev}).`);
        if (gapDays > 45 && !withSummary) say(`  ⚠ the newest DISCOVERABLE free PDF is ${gapDays} days old — the live numbers for the current edition come from the public summary page: re-run with --summary (codex reader).`);
      } else {
        say(`  free PDF: ${newest.iso} — **NEW** (last ingested ${prev || "never"})`);
        say(`    ${newest.u}`);
        const buf = await getBuf(newest.u);
        const dir = join(DATA, "omr", `omr-${newest.iso}`);
        const prov = { report: "IEA Oil Market Report (free version)", publication: newest.iso, url: newest.u, retrievedAt: new Date().toISOString(), files: [] };
        saveEdition(dir, "OMR.pdf", buf, prov);
        writeFileSync(join(dir, "provenance.json"), JSON.stringify(prov, null, 2));
        say(`  saved OMR.pdf (${(buf.length / 1048576).toFixed(1)} MB) → ${dir}`);
        man.omr = { ...(man.omr || {}), lastPub: newest.iso, dir, at: prov.retrievedAt };
      }
    }
  } catch (e) {
    say(`  free PDF: check failed (${e.message})`);
  }

  // (2) public summary page — independent of the PDF state
  if (withSummary) await omrSummary(man);
  else say("  (pass --summary to also fetch the public summary page via the codex reader)");
  return man;
}

async function omrSummary(man) {
  // Candidate = the NEWER of (a) the publication calendar (the OMR for month M lands
  // ~2nd Tuesday of M; before that, the previous month's edition is latest) and
  // (b) the newest iea.org summary URL brave has indexed (search sees iea.org URLs
  // without fetching the Cloudflare-walled site). Either can lead by a day or two.
  const now = new Date();
  let cy = now.getUTCFullYear(), cm = now.getUTCMonth(); // 0-based
  const firstDow = new Date(Date.UTC(cy, cm, 1)).getUTCDay();
  const firstTue = firstDow === 2 ? 1 : 1 + ((2 - firstDow + 7) % 7);
  if (now.getUTCDate() < firstTue + 7) { cm--; if (cm < 0) { cm = 11; cy--; } }
  const cand = { iso: `${cy}-${String(cm + 1).padStart(2, "0")}-01`, slug: `oil-market-report-${OMR_MONTH_FULL[cm]}-${cy}` };
  try {
    const out = execFileSync("node", [join(BRAVE, "search.js"), 'iea.org "Oil Market Report"', "-n", "10"],
      { env: braveEnv(), encoding: "utf8", timeout: 90000, stdio: ["ignore", "pipe", "ignore"] });
    for (const m of out.matchAll(/iea\.org\/reports\/(oil-market-report-[a-z]+-\d{4})/gi)) {
      const name = m[1].match(/^oil-market-report-([a-z]+)-(\d{4})$/);
      const mon = name && OMR_MONTHS[name[1].toLowerCase()];
      if (mon) {
        const iso = `${+name[2]}-${String(mon).padStart(2, "0")}-01`;
        if (iso > cand.iso) Object.assign(cand, { iso, slug: name[1].toLowerCase() });
      }
    }
  } catch { /* calendar candidate stands */ }

  const prev = man.omr?.lastSummary;
  if (prev && cand.iso <= prev) { say(`  summary: ${cand.iso} — CURRENT (last ingested ${prev}).`); return man; }
  // fallback: the previous month, only if not yet ingested (a delayed publication
  // must not wedge the check on a 404ing slug forever)
  const pm = { m: cm - 1 < 0 ? 11 : cm - 1, y: cm - 1 < 0 ? cy - 1 : cy };
  const pmIso = `${pm.y}-${String(pm.m + 1).padStart(2, "0")}-01`;
  const candidates = pmIso !== cand.iso && pmIso < cand.iso && (!prev || pmIso > prev)
    ? [cand, { iso: pmIso, slug: `oil-market-report-${OMR_MONTH_FULL[pm.m]}-${pm.y}` }]
    : [cand];

  for (const c of candidates) {
    say(`  summary: ${c.iso} — **NEW** (last ingested ${prev || "never"}) → https://www.iea.org/reports/${c.slug}`);
    say("  fetching the public summary page via the codex reader (slow, up to ~15 min)…");
    const dir = join(DATA, "omr", `omr-${c.iso}`);
    // private scratch dir for THIS invocation: a shared /tmp path could hold another
    // research run's files, or a failed run's stale omr-*.txt that we must not
    // attribute to this edition
    const tmp = mkdtempSync(join("/tmp", "iea-omr-"));
    const prompt = `You are a web-fetching tool for a research task on the IEA Oil Market Report.
Use your web reader. Do not use curl. Do not edit anything outside ${tmp}/.

Fetch this page:
https://www.iea.org/reports/${c.slug}

Save two files under ${tmp}/:
1. omr-summary.txt — the most complete verbatim text extraction your reader can produce.
   Go section by section (do not stop at the highlights block). Transcribe numbers EXACTLY
   as printed. Never paraphrase a number. If a section is not visible, write
   "[section not accessible]" — do not reconstruct it.
2. omr-figures.json — machine-readable figures, an array of objects:
   {"series": <what it measures>, "period": <reference month/year>, "value": <number>,
    "unit": "mb|mb/d|days|bbl", "quote": <the exact sentence containing the number>,
    "section": <page section where found>}

In your final answer: the publication date shown on the page, any PDF download links
(exact URLs), and whether the page is summary-only or full sections. If the reader 403s,
retry once, then report the failure. Do not guess figures for a page you could not read.`;
    const r = spawnSync("codex", ["exec", "--skip-git-repo-check", prompt], {
      cwd: REPO, encoding: "utf8", timeout: 900000,
    });
    // Validate BEFORE trusting: the prompt tells codex to write "[section not accessible]"
    // for unread sections, so a file can exist and still be a failed fetch. Placeholder-only
    // text, an empty figures array, or a failed child process (timeout mid-write leaves
    // partial files) must NOT mark the edition ingested — that would block the retry.
    const spawnOk = !r.error && r.status === 0;
    const failMsg = r.error ? `spawn failed: ${r.error.message}` : `exit ${r.status}`;
    let summaryOk = false, figuresOk = false;
    const summaryPath = join(tmp, "omr-summary.txt");
    if (existsSync(summaryPath)) {
      const text = readFileSync(summaryPath, "utf8");
      const real = text.replace(/\[section not accessible\]/gi, " ").replace(/\s+/g, " ").trim();
      summaryOk = real.length >= 200; // a real highlights block is ~150 words; <200 chars is nothing usable
    }
    const figuresPath = join(tmp, "omr-figures.json");
    if (existsSync(figuresPath)) {
      try {
        const figs = JSON.parse(readFileSync(figuresPath, "utf8"));
        figuresOk = Array.isArray(figs) && figs.length > 0 && figs.every((f) => typeof f?.quote === "string" && f.quote.trim().length > 0);
      } catch { figuresOk = false; }
    }
    if (!spawnOk || (!summaryOk && !figuresOk)) {
      say(`  codex produced no USABLE summary (${spawnOk ? "placeholder/empty files discarded" : failMsg}) — ${c.iso} not marked ingested; trying the next candidate or re-run later.`);
      // the scratch dir is this invocation's alone — remove it whole (codex may create extras)
      try { rmSync(tmp, { recursive: true, force: true }); } catch {}
      continue;
    }
    const prov = { report: "IEA Oil Market Report (public summary page)", edition: c.iso, url: `https://www.iea.org/reports/${c.slug}`, retrievedAt: new Date().toISOString(), files: [] };
    if (summaryOk) { saveEdition(dir, "omr-summary.txt", readFileSync(summaryPath), prov); say(`  saved omr-summary.txt → ${dir}`); }
    if (figuresOk) { saveEdition(dir, "omr-figures.json", readFileSync(figuresPath), prov); say(`  saved omr-figures.json → ${dir}`); }
    // the scratch dir is this invocation's alone — remove it whole (codex may create extras)
    try { rmSync(tmp, { recursive: true, force: true }); } catch {}
    // separate provenance file: the same edition dir may already hold the free PDF's
    // provenance.json, and the two artifacts are fetched on different days
    writeFileSync(join(dir, "summary-provenance.json"), JSON.stringify(prov, null, 2));
    man.omr = { ...(man.omr || {}), lastSummary: c.iso, summaryDir: dir, at: prov.retrievedAt };
    say(`  done — check ${dir}/ for omr-summary.txt (the global stock change + cumulative are the numbers we plot)`);
    return man;
  }
  say(`  summary: no candidate produced files — nothing ingested; re-run later.`);
  return man;
}

// ── BLS CPI + PPI (monthly, mid-month ~8:30 ET) ──────────────────────────────

// Verified Sep 10/15: CUUR0000SA0 = CPI-U all items (site's cpiYtd), CUUR0000SA0L1E = core
// (the "shock is energy, not core" line), WPUFD4 = PPI final demand (site's ppiYtd).
// Data comes back NEWEST-FIRST; calculations.pct_changes["12"] = the YoY the site plots.
const BLS_SERIES = [
  { id: "CUUR0000SA0", name: "CPI-U all items (headline)", site: "cpiYtd" },
  { id: "CUUR0000SA0L1E", name: "CPI-U less food & energy (core)", site: null },
  { id: "WPUFD4", name: "PPI final demand", site: "ppiYtd" },
];
// +undefined is NaN, not null — coerce explicitly
const pct = (d, k) => { const v = d.calculations?.pct_changes?.[k]; return v != null ? +v : null; };

async function runBls(man) {
  say("## BLS CPI + PPI (monthly, mid-month ~8:30 ET — CPI and PPI release on DIFFERENT days; each series is checked against its own last period)");
  const key = readFileSync(join(REPO, ".bls_api_key"), "utf8").replace(/\s/g, "");
  const r = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seriesid: BLS_SERIES.map((s) => s.id),
      startyear: "2025", endyear: String(new Date().getUTCFullYear()),
      calculations: true,
      registrationkey: key,
    }),
  });
  const j = await r.json();
  if (j.status !== "REQUEST_SUCCEEDED") throw new Error(`BLS: ${j.status} ${j.message || ""}`);

  const latest = {};
  for (const s of j.Results.series) latest[s.seriesID] = s.data[0]; // newest first
  if (!latest["CUUR0000SA0"]) throw new Error("BLS: no data for CUUR0000SA0");
  const per = (id) => { const d = latest[id]; return `${d.year}-${d.period.replace("M", "")}`; }; // "2026-08"
  const prevMap = man.bls?.periods || {};
  // PPI and CPI release on DIFFERENT days (Aug 2026: PPI Sep 10, CPI Sep 11) — an early
  // PPI print must not be masked by the CPI period. Check each series against its own last.
  const fresh = BLS_SERIES.filter((s) => latest[s.id] && per(s.id) > (prevMap[s.id] || ""));
  if (!fresh.length) {
    const ingested = Object.entries(prevMap).map(([k, v]) => `${k} ${v}`).join(", ");
    say(`  CURRENT — CPI ${per("CUUR0000SA0")}, PPI ${latest["WPUFD4"] ? per("WPUFD4") : "n/a"} (last ingested ${ingested}). Nothing to do.`);
    return man;
  }
  say(`  NEW print — ${fresh.map((s) => `${s.name} ${per(s.id)}`).join(", ")}`);
  for (const s of BLS_SERIES) {
    const d = latest[s.id];
    if (!d) { say(`  ${s.name}: NO DATA`); continue; }
    const yoy = pct(d, "12");
    const mom = pct(d, "1");
    const mEnd = `${per(s.id)}-${String(new Date(+per(s.id).slice(0, 4), +per(s.id).slice(5), 0).getDate()).padStart(2, "0")}`;
    const flag = fresh.includes(s) ? "**NEW**" : `(${per(s.id)} unchanged)`;
    say(`  ${s.name}: ${yoy ?? "n/a"}% YoY (${mom == null ? "n/a" : (mom >= 0 ? "+" : "") + mom + "% MoM"}) ${flag}` + (s.site && fresh.includes(s) && yoy != null ? `  → append { date: "${mEnd}", value: ${yoy} } to ${s.site}` : ""));
  }

  const period = [...fresh.map((s) => per(s.id))].sort().pop();
  const dir = join(DATA, "bls", `bls-${period}`);
  // CPI and PPI for the SAME reference month release on DIFFERENT days (PPI ~10th,
  // CPI ~15th) — name each release's snapshot by the series it brings in, so the
  // PPI-first vintage survives the CPI release (immutable-vintage contract).
  const releaseId = fresh.map((s) => s.id).sort().join("+");
  const prov = { report: "BLS CPI/PPI", period, newSeries: fresh.map((s) => s.id), allSeries: BLS_SERIES.map((s) => s.id), url: "https://api.bls.gov/publicAPI/v2/timeseries/data/", retrievedAt: new Date().toISOString(), files: [] };
  const snapshot = {};
  for (const s of j.Results.series) {
    snapshot[s.seriesID] = s.data.slice(0, 13).map((d) => ({
      period: `${d.year}-${d.period.replace("M", "")}`, value: +d.value,
      yoy: pct(d, "12"), mom: pct(d, "1"),
    }));
  }
  mkdirSync(dir, { recursive: true });
  saveEdition(dir, `snapshot-${releaseId}.json`, Buffer.from(JSON.stringify(snapshot, null, 2)), prov);
  writeFileSync(join(dir, `provenance-${releaseId}.json`), JSON.stringify(prov, null, 2));
  say(`  saved 13-month snapshot → ${dir}/snapshot-${releaseId}.json`);
  man.bls = { periods: { ...prevMap, ...Object.fromEntries(fresh.map((s) => [s.id, per(s.id)])) }, dir, at: prov.retrievedAt };
  return man;
}

// ── all ─────────────────────────────────────────────────────────────────────

(async () => {
  const man = loadManifest();
  const started = new Date().toISOString();
  say(`# report-check — ${started}`);
  const run = async (name, fn) => {
    try { await fn(man); }
    catch (e) { say(`  ERROR (${name}): ${e.message}`); }
  };
  if (cmd === "wpsr") await run("wpsr", () => runWpsr(man));
  else if (cmd === "steo") await run("steo", () => runSteo(man));
  else if (cmd === "omr") await run("omr", (m) => runOmr(m, rest.includes("--summary")));
  else if (cmd === "bls") await run("bls", () => runBls(man));
  else if (cmd === "all") {
    await run("wpsr", () => runWpsr(man));
    await run("steo", () => runSteo(man));
    await run("omr", (m) => runOmr(m, rest.includes("--summary")));
    await run("bls", () => runBls(man));
  }
  else { say(`unknown command "${cmd}" — use wpsr | steo | omr | bls | all`); process.exit(1); }
  saveManifest(man);
  say(`\nmanifest: ${JSON.stringify(man, null, 2)}`);
})().catch((e) => { console.error(`FATAL: ${e.message}`); process.exit(1); });
