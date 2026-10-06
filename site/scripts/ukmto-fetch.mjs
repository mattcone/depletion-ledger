#!/usr/bin/env node
/**
 * ukmto-fetch.mjs — UKMTO incident ingestion (Oct 5, 2026; corrected Oct 5 after review).
 *
 * PRIMARY SOURCE: https://sccd.royalnavy.mod.uk/api/ukmto/all
 *   The ukmto.org "Recent Incidents" page is a Next.js app (Sitecore backend);
 *   the page's own JS chunks call this JSON API. Plain GET, no auth, no JS.
 *   Fields used: incidentNumber, incidentTypeName, utcDateOfIncident.
 *   NOTE: the page's card date == utcDateOfIncident (verified 49/49 against
 *   the Oct 5 page capture), so the chart's incident-date axis is preserved.
 *   NOTE: Cloudflare on the mod.uk host is INTERMITTENT — a challenge page
 *   ("Attention Required") or 403 can come back for a valid URL. Retries
 *   (async, actually awaited) handle it. A raw 2026-10-05 response is
 *   archived in research/sources/ukmto-2026-10-05/ for independent checks.
 *
 * FALLBACK: if the API is unreachable, use the web reader on
 *   https://www.ukmto.org/recent-incidents (see research log 2026-10-05).
 *   The Telegram channel (t.me/s/UK_MTO_TM) is DEAD — posts stop at #087.
 *   There is NO RSS feed (rss/feed/rss.xml/feed.xml/sitemap.xml/wp-json all 404).
 *
 * SEMANTICS (post-review):
 *  - The array in crisis.ts is CUMULATIVE: the API window slides, so nothing
 *    is ever removed. New = set membership — ANY number present in the API
 *    but absent locally is appended (time-late reports can arrive with
 *    numbers BELOW the current max, e.g. a #157 published after #158).
 *    The array is kept sorted by number.
 *  - ukmtoCoverageEnd means "the API was verified current as of this date"
 *    — it advances to the FETCH date on every successful validated fetch,
 *    even on quiet days (that's what keeps the trailing partial week
 *    honest). It is NOT the max incident date (time-late reports make
 *    those lag).
 *  - Type or date changes to numbers we already have are FLAGGED, never
 *    auto-applied. Number gaps in the API window are reported, not filled.
 *
 * Usage:
 *   node scripts/ukmto-fetch.mjs            # fetch + diff + report (no writes)
 *   node scripts/ukmto-fetch.mjs --apply    # append missing entries, advance coverageEnd
 *   node scripts/ukmto-fetch.mjs --dry-run  # fetch + diff + show planned writes
 */
import { readFileSync, writeFileSync, renameSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const API_URL = "https://sccd.royalnavy.mod.uk/api/ukmto/all";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const KNOWN_TYPES = new Set(["attack", "hijack", "advisory", "suspicious activity"]);
const CRISIS_PATH = process.env.UKMTO_CRISIS_PATH
  ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "crisis.ts");
// Test hooks (used by the mock-input checks in the Oct 5 review):
//   UKMTO_CRISIS_PATH — crisis.ts to read/write instead of the repo copy
//   UKMTO_MOCK_FILE   — read a local JSON file instead of calling the API
const ARRAY_RE = /export const ukmtoIncidents[^=]*=\s*\[([\s\S]*?)\n\];/;
const ARRAY_HEADER = 'export const ukmtoIncidents: { num: number; type: "attack" | "hijack" | "advisory" | "suspicious activity"; date: string }[] = [';
const ENTRY_RE = /\{\s*num:\s*(\d+),\s*type:\s*"([^"]+)",\s*date:\s*"([^"]+)"\s*\}/;

const [mode] = process.argv.slice(2); // "", "--apply", "--dry-run"
const willWrite = mode === "--apply";
const dryRun = mode === "--dry-run";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const todayIso = () => new Date().toISOString().slice(0, 10);

// ---------- fetch with retries (async — the delays are actually awaited) ----------
// Uses curl (not Node fetch): Cloudflare fingerprints TLS ClientHellos, and
// undici's fingerprint gets challenged while curl's goes through. Full browser
// headers too — the CF rule intermittently 403s bare requests.
async function fetchApi() {
  if (process.env.UKMTO_MOCK_FILE) {
    const data = JSON.parse(readFileSync(process.env.UKMTO_MOCK_FILE, "utf8"));
    if (!Array.isArray(data) || data.length === 0) throw new Error("unexpected payload (not a non-empty array)");
    return data;
  }
  let lastErr = "unknown";
  for (let attempt = 1; attempt <= 4; attempt++) {
    let text, status;
    try {
      status = "200";
      text = execFileSync("curl", [
        "-s", "--http2", "--max-time", "30", "-w", "\n%{http_code}",
        "-H", `User-Agent: ${UA}`,
        "-H", "Accept: application/json, text/plain, */*",
        "-H", "Accept-Language: en-US,en;q=0.9",
        "-H", "Referer: https://www.ukmto.org/recent-incidents",
        "-H", "Origin: https://www.ukmto.org",
        "-H", 'sec-ch-ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "-H", "sec-ch-ua-mobile: ?0",
        "-H", 'sec-ch-ua-platform: "Windows"',
        "-H", "Sec-Fetch-Dest: empty",
        "-H", "Sec-Fetch-Mode: cors",
        "-H", "Sec-Fetch-Site: cross-site",
        API_URL,
      ], { encoding: "utf8", timeout: 35000 });
    } catch (e) { lastErr = `curl failed${Number.isInteger(e?.status) ? ` (exit ${e.status})` : ""}: ${String(e?.stderr ?? e?.message ?? "").slice(0, 80)}`; if (attempt < 4) await sleep(8000 * attempt); continue; }
    const nl = text.lastIndexOf("\n");
    status = text.slice(nl + 1).trim();
    text = text.slice(0, nl);
    if (status !== "200") { lastErr = `HTTP ${status}`; }
    else if (/Attention Required|cf-chl|challenge-platform|__cf_chl/i.test(text)) { lastErr = "Cloudflare challenge"; }
    else {
      try {
        const data = JSON.parse(text);
        if (!Array.isArray(data) || data.length === 0) throw new Error("unexpected payload (not a non-empty array)");
        return data;
      } catch (e) { lastErr = `parse: ${String(e.message).slice(0, 120)}`; }
    }
    if (attempt < 4) await sleep(8000 * attempt);
  }
  console.error(`ERROR: UKMTO API unreachable after 4 attempts (last: ${lastErr}).`);
  console.error(`Fallback: fetch https://www.ukmto.org/recent-incidents with the web reader CLI and diff by hand (see research log 2026-10-05).`);
  process.exit(2);
}

// ---------- current state from crisis.ts ----------
function currentIncidents() {
  const src = readFileSync(CRISIS_PATH, "utf8");
  const m = src.match(ARRAY_RE);
  if (!m) throw new Error("could not find ukmtoIncidents array in crisis.ts");
  const out = [];
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const e = line.match(ENTRY_RE);
    if (!e) throw new Error(`unparseable array line (refusing to rewrite): ${line.trim().slice(0, 80)}`);
    out.push({ num: +e[1], type: e[2], date: e[3] });
  }
  if (out.length === 0) throw new Error("parsed 0 entries from crisis.ts — aborting");
  return out;
}

// ---------- validate ----------
function validate(api) {
  const seen = new Set();
  for (const d of api) {
    const num = d.incidentNumber, type = String(d.incidentTypeName ?? "").toLowerCase(), date = String(d.utcDateOfIncident ?? "").slice(0, 10);
    if (!Number.isInteger(num)) throw new Error(`entry with non-integer incidentNumber: ${JSON.stringify(d).slice(0, 120)}`);
    if (seen.has(num)) console.log(`  warn: API returned #${num} more than once — keeping the first occurrence`);
    seen.add(num);
    if (!KNOWN_TYPES.has(type)) throw new Error(`NEW TYPE VOCABULARY: #${num} is "${d.incidentTypeName}" — review manually, not auto-applying`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > todayIso()) throw new Error(`#${num} has bad/future incident date "${d.utcDateOfIncident}"`);
  }
}

// ---------- main ----------
try {
await main();
} catch (e) {
  console.error(`ERROR: ${String(e?.message ?? e).slice(0, 300)}`);
  process.exit(1);
}

async function main() {
// Mock mode must never touch the real crisis.ts.
if (process.env.UKMTO_MOCK_FILE && willWrite && !process.env.UKMTO_CRISIS_PATH) {
  throw new Error("UKMTO_MOCK_FILE with --apply requires UKMTO_CRISIS_PATH (refusing to write mock data to the repo file)");
}
const api = await fetchApi();
validate(api);
const fetchDate = todayIso();
const coverageStartLine = readFileSync(CRISIS_PATH, "utf8").match(/export const ukmtoCoverageStart = "([^"]+)"/);
const coverageStart = coverageStartLine ? coverageStartLine[1] : null;
const ours = currentIncidents();
if (new Set(ours.map((e) => e.num)).size !== ours.length) {
  const seen = new Set(), dups = [];
  for (const e of ours) { if (seen.has(e.num)) dups.push(e.num); seen.add(e.num); }
  throw new Error(`duplicate incident numbers in crisis.ts: ${dups.join(", ")} — fix the array by hand before running this script`);
}
const ourNums = new Map(ours.map((e) => [e.num, e]));
const coverageEndLine = readFileSync(CRISIS_PATH, "utf8").match(/export const ukmtoCoverageEnd = "([^"]+)"/);
if (!coverageEndLine) throw new Error("could not find ukmtoCoverageEnd in crisis.ts");
const coverageEnd = coverageEndLine[1];

// New = set membership, NOT "> max": time-late reports can carry numbers
// below the current max. Sorted by number so the array stays ordered.
// Dedupe by number (validate warns) in case the backend repeats a record.
const apiOnce = [];
for (const d of api) if (!apiOnce.some((x) => x.incidentNumber === d.incidentNumber)) apiOnce.push(d);

const newEntries = apiOnce
  .filter((d) => !ourNums.has(d.incidentNumber))
  .sort((a, b) => a.incidentNumber - b.incidentNumber)
  .map((d) => ({ num: d.incidentNumber, type: String(d.incidentTypeName).toLowerCase(), date: d.utcDateOfIncident.slice(0, 10) }));

// The chart plots [coverageStart, coverageEnd] — an entry outside that span
// (e.g. a time-late report with an old incident date) would sit in the array
// but be invisible in the bars while the copy derives from the array.
for (const e of newEntries) {
  if (coverageStart && e.date < coverageStart) console.log(`  warn: #${e.num} (${e.date}) is BEFORE coverageStart ${coverageStart} — it will not appear in the chart; review the coverage span`);
}

// Existing numbers whose record changed on the API — flag, never auto-apply.
const changed = apiOnce.filter((d) => {
  const o = ourNums.get(d.incidentNumber);
  return o && (o.type !== String(d.incidentTypeName).toLowerCase() || o.date !== d.utcDateOfIncident.slice(0, 10));
});

// Numbers missing from BOTH the API and our records (like #99/#100/#125 —
// UKMTO simply doesn't list them; the count may understate). Numbers we hold
// but that have slid out of the API window are NOT gaps — they're history.
const apiNums = new Set(apiOnce.map((d) => d.incidentNumber));
const gaps = [];
for (let n = Math.min(...apiOnce.map((d) => d.incidentNumber)); n <= Math.max(...apiOnce.map((d) => d.incidentNumber)); n++) if (!apiNums.has(n) && !ourNums.has(n)) gaps.push(n);

// Coverage advances to the fetch date on every successful validated fetch —
// quiet days included (keeps the trailing partial week honest).
const newCoverageEnd = fetchDate > coverageEnd ? fetchDate : coverageEnd;
const coverageAdvances = newCoverageEnd !== coverageEnd;
const hasChanges = newEntries.length > 0 || coverageAdvances;

console.log(`UKMTO API: ${apiOnce.length} entries (#${Math.min(...apiOnce.map((d) => d.incidentNumber))}–#${Math.max(...apiOnce.map((d) => d.incidentNumber))}), fetched ${fetchDate}`);
console.log(`crisis.ts: ${ours.length} entries (max #${Math.max(...ours.map((e) => e.num))}), coverageEnd ${coverageEnd}`);
for (const r of changed) {
  const o = ourNums.get(r.incidentNumber);
  console.log(`  FLAG: #${r.incidentNumber} changed on the API: type "${o.type}" -> "${String(r.incidentTypeName).toLowerCase()}", date ${o.date} -> ${String(r.utcDateOfIncident).slice(0, 10)} (NOT auto-applied — review)`);
}
if (gaps.length) console.log(`  note: numbers ${gaps.join(", ")} are in neither the API nor our records (UKMTO doesn't list them — the count may understate)`);

if (!hasChanges) {
  if (changed.length) console.log(`No changes applied — ${changed.length} flagged entr${changed.length === 1 ? "y needs" : "ies need"} manual review.`);
  else console.log("Up to date — nothing to do.");
  process.exit(0);
}
if (newEntries.length) {
  console.log(`NEW ENTRIES (${newEntries.length}):`);
  for (const e of newEntries) console.log(`  #${e.num}  ${e.type.padEnd(20)}  ${e.date}`);
}
if (coverageAdvances) console.log(`coverageEnd: ${coverageEnd} -> ${newCoverageEnd} (verified current as of the fetch)`);
if (dryRun || !willWrite) {
  console.log(dryRun ? "\n[dry-run] no files written." : "\n(fetched only — re-run with --apply)");
  process.exit(0);
}

// ---------- apply ----------
// Re-read and re-parse: if the file changed since the diff, abort rather than
// writing a stale merged array over it.
const src = readFileSync(CRISIS_PATH, "utf8");
const reparsed = currentIncidents();
if (reparsed.length !== ours.length || reparsed.some((e, i) => e.num !== ours[i].num || e.type !== ours[i].type || e.date !== ours[i].date)) {
  throw new Error("crisis.ts changed between fetch and apply — re-run from the start");
}
const merged = [...ours, ...newEntries].sort((a, b) => a.num - b.num);
const body = merged.map((e) => `  { num: ${e.num}, type: "${e.type}", date: "${e.date}" },`).join("\n");
let out = src.replace(ARRAY_RE, () => `${ARRAY_HEADER}\n${body}\n];`);
if (coverageAdvances) out = out.replace(/export const ukmtoCoverageEnd = "[^"]+"/, `export const ukmtoCoverageEnd = "${newCoverageEnd}"`);
if (out === src) throw new Error("no change produced — aborting");
// Atomic write: temp file + rename, so a crash mid-write can't truncate crisis.ts.
const tmp = CRISIS_PATH + ".tmp";
writeFileSync(tmp, out);
renameSync(tmp, CRISIS_PATH);
console.log(`WROTE crisis.ts: +${newEntries.length} entr${newEntries.length === 1 ? "y" : "ies"}${coverageAdvances ? `, coverageEnd -> ${newCoverageEnd}` : ""}. Rebuild + verify before deploy.`);
}
