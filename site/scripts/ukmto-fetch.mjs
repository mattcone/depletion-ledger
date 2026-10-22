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
 *  - IDENTITY (Oct 22 fix, hardened after the recheck): the API re-slots
 *    records. On Oct 21 the non-sequential slot 28082035 was repurposed to
 *    hold WARNING 179-26 (Bukha); on Oct 22 the API dropped that slot and
 *    re-issued the IDENTICAL record (same sitecoreId e89b2678, same created
 *    timestamp) under sequential #179 — keying on incidentNumber made the
 *    run append #179 as "new" while the 28082035 row stayed, double-counting
 *    the attack. A record's stable identity is its sitecoreId, tracked in the
 *    sidecar research/data/ukmto/ukmto-identities.json. Each sidecar record
 *    holds a CANONICAL number — the one the array counts — plus observed
 *    ALIASES. A number absent locally whose sitecoreId is known under a
 *    different canonical is flagged as an ALIAS and NEVER auto-appended.
 *    Observing an alias must never overwrite the canonical (the recheck bug:
 *    run 1 flagged #200, the sidecar recorded it, run 2 appended it). The
 *    canonical follows whatever the array counts, so a manual reconcile to a
 *    new slot is picked up on the next run.
 *  - MODES: the default mode and --dry-run make NO writes at all (the
 *    sidecar is written only on --apply, after the crisis.ts write, against
 *    the post-merge array). Regression tests: scripts/ukmto-fetch.test.mjs.
 *  - ukmtoCoverageEnd means "the API was verified current as of this date"
 *    — it advances to the FETCH date on every successful validated fetch,
 *    even on quiet days (that's what keeps the trailing partial week
 *    honest). It is NOT the max incident date (time-late reports make
 *    those lag).
 *  - Type or date changes to numbers we already have are FLAGGED, never
 *    auto-applied — EXCEPT the reconciled date exceptions in
 *    RECONCILED_DATES below, where the API's utcDateOfIncident is a
 *    registration-time placeholder and the report body's explicit date
 *    wins (documented in the crisis.ts comment block). Number gaps in the
 *    API window are reported, not filled.
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
// Reconciled date exceptions: the API's utcDateOfIncident is a registration-time
// placeholder for these records; the original UKMTO warnings print the incident
// dates explicitly ("Incident Date: 11 Oct 2026" / "13 OCT 2026") and the API's
// own utcDateCreated predates its claimed incident times for #172/#173 (see the
// crisis.ts comment block and logs 2026-10-18 / 2026-10-22). While the API keeps
// the placeholder and the type is unchanged, the flag is suppressed; any other
// change re-flags.
// Reconciled date exceptions — the API's utcDateOfIncident is a
// registration-time placeholder for these records, while the original UKMTO
// warnings print the incident dates explicitly ("Incident Date: 11 Oct 2026" /
// "13 OCT 2026"; for #172/#173 the API's own utcDateCreated predates its
// claimed incident times — see the crisis.ts comment block and logs
// 2026-10-18 / 2026-10-22). Suppression is scoped to the EXACT reviewed pair:
// local date === report-body date AND API date === the known placeholder, with
// the type unchanged. Any other combination — including a later genuine date
// revision by UKMTO — re-flags.
const RECONCILED_DATES = {
  166: { local: "2026-10-11", apiPlaceholder: "2026-10-12" },
  172: { local: "2026-10-13", apiPlaceholder: "2026-10-14" },
  173: { local: "2026-10-13", apiPlaceholder: "2026-10-14" },
};
// Identity sidecar: sitecoreId -> { canonical, warningNumber, firstSeen,
// lastSeen, aliases? }. The record's stable identity is its sitecoreId (and
// the "UKMTO WARNING NNN-26" number in its body), NOT the incidentNumber slot
// — UKMTO re-slots records (see the header's Oct 22 note). `canonical` is the
// number the array counts; `aliases` are observations under other numbers
// (flagged, never auto-appended, never allowed to become the canonical).
const IDENTITY_PATH = process.env.UKMTO_IDENTITY_PATH
  ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "research", "data", "ukmto", "ukmto-identities.json");
function loadIdentities() {
  try {
    const j = JSON.parse(readFileSync(IDENTITY_PATH, "utf8"));
    if (!j || typeof j.records !== "object" || j.records === null) throw new Error("bad shape (missing records map)");
    // Migrate the pre-recheck shape ({ incidentNumber }) in memory.
    for (const rec of Object.values(j.records)) {
      if (rec.canonical == null && rec.incidentNumber != null) rec.canonical = rec.incidentNumber;
    }
    return j;
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw new Error(`identity sidecar unreadable: ${String(e.message).slice(0, 120)}`);
  }
}
function saveIdentities(j) {
  const tmp = IDENTITY_PATH + ".tmp";
  writeFileSync(tmp, JSON.stringify(j, null, 1) + "\n");
  renameSync(tmp, IDENTITY_PATH);
}
const warningNumber = (d) => {
  const m = String(d.otherDetails ?? "").match(/UKMTO WARNING (\d{1,3})-(\d{2})/i);
  return m ? `${m[1]}-${m[2]}` : null;
};

const [mode] = process.argv.slice(2); // "", "--apply", "--dry-run"
const willWrite = mode === "--apply";
const dryRun = mode === "--dry-run";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Local date (America/Denver), NOT UTC: the site's convention is Denver local time
// everywhere ("data as of <local date>"). A UTC toISOString() flips a day early after
// 18:00 MDT (17:00 MST) and would advance coverageEnd before the local date changes
// (for example, Oct 14 at 20:25 MDT is Oct 15 at 02:25 UTC).
const todayIso = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Denver" });

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
    if (seen.has(num)) console.log(`  warn: API returned #${num} more than once — keeping the latest publication`);
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
// Dedupe by number (validate warns) in case the backend repeats a record —
// keeping the LATEST publication, not the first: UKMTO reclassifies incidents
// in place (Oct 11 #165 arrived first as "suspicious activity", then the same
// number was re-issued as "attack" after UAV confirmation — the first record
// is the stale one).
const apiOnce = [];
for (const d of api) {
  const i = apiOnce.findIndex((x) => x.incidentNumber === d.incidentNumber);
  if (i === -1) apiOnce.push(d);
  else if (String(d.utcDateCreated) > String(apiOnce[i].utcDateCreated)) apiOnce[i] = d;
}

// Identity check BEFORE the "new" filter: a number absent locally whose
// sitecoreId we already know under a different canonical is a re-slotted
// record (an alias), NOT a new incident — flag it, never auto-append (the
// Bukha double-count, log 2026-10-22). No sidecar yet (first run) → nothing
// can be known; the sidecar is seeded on the next --apply.
const identities = loadIdentities();
const aliasFlags = [];
for (const d of apiOnce) {
  if (ourNums.has(d.incidentNumber)) continue;
  const known = identities?.records?.[String(d.sitecoreId)];
  if (known && known.canonical !== d.incidentNumber) {
    aliasFlags.push({ num: d.incidentNumber, sitecoreId: String(d.sitecoreId), knownNum: known.canonical, warning: warningNumber(d) });
  }
}
const newEntries = apiOnce
  .filter((d) => !ourNums.has(d.incidentNumber) && !aliasFlags.some((a) => a.num === d.incidentNumber))
  .sort((a, b) => a.incidentNumber - b.incidentNumber)
  .map((d) => ({ num: d.incidentNumber, type: String(d.incidentTypeName).toLowerCase(), date: d.utcDateOfIncident.slice(0, 10) }));

// Sidecar write — ONLY in the --apply path (quiet-day apply and post-merge
// apply, below). Read-only and dry-run modes make no writes at all. Mock mode
// never writes the repo copy. `countedNums` is the array's number set AFTER
// this run's appends, so a just-appended entry seeds as canonical.
const identityWritable = !(process.env.UKMTO_MOCK_FILE && !process.env.UKMTO_IDENTITY_PATH);
if (!identities) console.log("  note: identity sidecar absent — alias detection is off until the next --apply seeds it (no writes in this mode)");
function updateSidecar(countedNums) {
  const j = identities ?? { records: {} };
  const firstRun = identities === null;
  for (const d of apiOnce) {
    const k = String(d.sitecoreId);
    const num = d.incidentNumber;
    const prev = j.records[k];
    const rec = prev ?? { canonical: num, warningNumber: warningNumber(d), firstSeen: fetchDate, lastSeen: fetchDate };
    rec.lastSeen = fetchDate;
    if (rec.warningNumber == null) rec.warningNumber = warningNumber(d);
    if (countedNums.has(num)) {
      // The array counts this number for this record — it is the canonical
      // (the original slot, or a manual reconcile switched the array to it).
      if (rec.canonical !== num) rec.canonical = num;
    } else if (num !== rec.canonical) {
      // Observed under a number we don't count and that isn't the canonical —
      // an alias observation. Recorded for the provenance; it must NEVER
      // become the canonical (that self-poisoning was the recheck bug).
      if (!rec.aliases?.some((a) => a.num === num)) (rec.aliases ??= []).push({ num, firstSeen: fetchDate });
    }
    j.records[k] = rec;
  }
  saveIdentities(j);
  console.log(firstRun ? `identity sidecar seeded with ${Object.keys(j.records).length} records` : `identity sidecar updated (${Object.keys(j.records).length} records tracked)`);
}

// The chart plots [coverageStart, coverageEnd] — an entry outside that span
// (e.g. a time-late report with an old incident date) would sit in the array
// but be invisible in the bars while the copy derives from the array.
for (const e of newEntries) {
  if (coverageStart && e.date < coverageStart) console.log(`  warn: #${e.num} (${e.date}) is BEFORE coverageStart ${coverageStart} — it will not appear in the chart; review the coverage span`);
}

// Existing numbers whose record changed on the API — flag, never auto-apply.
// Reconciled date exceptions (RECONCILED_DATES) suppress ONLY the exact
// reviewed local/API placeholder pair with the type unchanged; any other date
// movement re-flags.
const changed = apiOnce.filter((d) => {
  const o = ourNums.get(d.incidentNumber);
  if (!o) return false;
  if (o.type !== String(d.incidentTypeName).toLowerCase()) return true;
  const apiDate = String(d.utcDateOfIncident).slice(0, 10);
  if (o.date === apiDate) return false;
  const r = RECONCILED_DATES[d.incidentNumber];
  return !(r && o.date === r.local && apiDate === r.apiPlaceholder);
});

// Numbers missing from BOTH the API and our records (like #99/#100/#125 —
// UKMTO simply doesn't list them; the count may understate). Numbers we hold
// but that have slid out of the API window are NOT gaps — they're history.
// Advisory IDs (e.g. 28082035) use a SEPARATE scheme — they must be excluded
// from the gap range or the loop iterates ~28M times and prints a 160MB line
// (caught Oct 11: the loop ran to #28082035 and the output was truncated).
const seqOf = (ns) => ns.filter((n) => n < 100000);
const apiSeqNums = seqOf(apiOnce.map((d) => d.incidentNumber));
const ourSeqNums = seqOf(ours.map((e) => e.num));
const apiNums = new Set(apiSeqNums);
const gaps = [];
for (let n = Math.min(...apiSeqNums); n <= Math.max(...apiSeqNums); n++) if (!apiNums.has(n) && !ourNums.has(n)) gaps.push(n);

// Coverage advances to the fetch date on every successful validated fetch —
// quiet days included (keeps the trailing partial week honest).
const newCoverageEnd = fetchDate > coverageEnd ? fetchDate : coverageEnd;
const coverageAdvances = newCoverageEnd !== coverageEnd;
const hasChanges = newEntries.length > 0 || coverageAdvances;

console.log(`UKMTO API: ${apiOnce.length} entries (sequential #${Math.min(...apiSeqNums)}–#${Math.max(...apiSeqNums)}, +${apiOnce.length - apiSeqNums.length} non-sequential IDs), fetched ${fetchDate}`);
console.log(`crisis.ts: ${ours.length} entries (sequential max #${Math.max(...ourSeqNums)}), coverageEnd ${coverageEnd}`);
for (const a of aliasFlags) {
  console.log(`  FLAG (identity): #${a.num} carries sitecoreId ${a.sitecoreId}, already known as #${a.knownNum}${a.warning ? ` (warning ${a.warning})` : ""} — UKMTO re-slotted the record. NOT appended; reconcile the array by hand (keep ONE row, drop the stale slot, record it in the crisis.ts comment block).`);
}
for (const r of changed) {
  const o = ourNums.get(r.incidentNumber);
  console.log(`  FLAG: #${r.incidentNumber} changed on the API: type "${o.type}" -> "${String(r.incidentTypeName).toLowerCase()}", date ${o.date} -> ${String(r.utcDateOfIncident).slice(0, 10)} (NOT auto-applied — review)`);
}
if (gaps.length) console.log(`  note: numbers ${gaps.join(", ")} are in neither the API nor our records (UKMTO doesn't list them — the count may understate)`);

if (newEntries.length) {
  console.log(`NEW ENTRIES (${newEntries.length}):`);
  for (const e of newEntries) console.log(`  #${e.num}  ${e.type.padEnd(20)}  ${e.date}`);
}
if (coverageAdvances) console.log(`coverageEnd: ${coverageEnd} -> ${newCoverageEnd} (verified current as of the fetch)`);
if (!hasChanges) {
  const flagged = changed.length + aliasFlags.length;
  if (willWrite && identityWritable) updateSidecar(new Set(ours.map((e) => e.num)));
  if (flagged) console.log(`No changes applied — ${flagged} flagged entr${flagged === 1 ? "y needs" : "ies need"} manual review.`);
  else console.log("Up to date — nothing to do.");
  process.exit(0);
}
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
if (identityWritable) updateSidecar(new Set(merged.map((e) => e.num)));
console.log(`WROTE crisis.ts: +${newEntries.length} entr${newEntries.length === 1 ? "y" : "ies"}${coverageAdvances ? `, coverageEnd -> ${newCoverageEnd}` : ""}. Rebuild + verify before deploy.`);
}
