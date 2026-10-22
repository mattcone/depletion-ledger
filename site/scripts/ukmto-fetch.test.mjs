#!/usr/bin/env node
/**
 * ukmto-fetch.test.mjs — regression tests for the UKMTO ingestion script.
 *
 * Run: node scripts/ukmto-fetch.test.mjs   (no test framework needed; exits 1 on failure)
 *
 * Covers the Oct 22 recheck findings (see research/logs/review-2026-10-22.md):
 *  - P1: duplicate protection must survive REPEATED runs. A re-slotted record
 *    (known sitecoreId, new number) is flagged as an alias on every run and
 *    never auto-appended — even when a read-only fetch precedes the --apply.
 *    (Original bug: run 1 flagged #200 and the sidecar recorded it; run 2
 *    treated it as legitimate and appended it alongside #179.)
 *  - P2: reconciled date exceptions suppress ONLY the exact reviewed
 *    local-date/API-placeholder pair; an unrelated date change re-flags.
 *  - Interface: read-only and dry-run modes make NO writes (crisis.ts and the
 *    sidecar both byte-identical after the run).
 * Plus the baseline behaviors the fixes must not break: a genuinely new
 * incident is still appended, and a manual reconcile of the array to a new
 * slot is picked up as the new canonical.
 *
 * Everything runs on isolated temp files (UKMTO_MOCK_FILE / UKMTO_CRISIS_PATH
 * / UKMTO_IDENTITY_PATH) — the repo's crisis.ts and sidecar are never touched.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT = path.join(path.dirname(fileURLToPath(import.meta.url)), "ukmto-fetch.mjs");
const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "America/Denver" });

const rec = (num, sitecoreId, type, date, otherDetails = "") => ({
  incidentIssuer: "UKMTO", incidentNumber: num, sitecoreId,
  utcDateCreated: date, utcDateOfIncident: date,
  pinColour: "Yellow", incidentTypeName: type, incidentTypeLevel: 1,
  region: "IO", place: "Test", vesselName: "X", vesselType: "Tanker ",
  otherDetails,
});

const crisisTemplate = (entries) => `export const ukmtoIncidents: { num: number; type: "attack" | "hijack" | "advisory" | "suspicious activity"; date: string }[] = [
${entries.map((e) => `  { num: ${e.num}, type: "${e.type}", date: "${e.date}" },`).join("\n")}
];

// Reports that existed before the captured window.
export const ukmtoReportsBeforeWindow = 77;

export const ukmtoCoverageStart = "2026-10-01";
export const ukmtoCoverageEnd = "${TODAY}";
`;

// Isolated scenario: temp crisis.ts, optional sidecar, mock API payload.
function setup({ entries, identities, payload }) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "ukmto-test-"));
  const crisis = path.join(dir, "crisis.ts");
  const ident = path.join(dir, "identities.json");
  const mock = path.join(dir, "payload.json");
  writeFileSync(crisis, crisisTemplate(entries));
  if (identities !== null) writeFileSync(ident, JSON.stringify(identities));
  writeFileSync(mock, JSON.stringify(payload));
  return { dir, crisis, ident, mock, env: { UKMTO_MOCK_FILE: mock, UKMTO_CRISIS_PATH: crisis, UKMTO_IDENTITY_PATH: ident } };
}
const run = (mode, env) => spawnSync("node", [SCRIPT, ...mode], { encoding: "utf8", env: { ...process.env, ...env } });
const sha = (f) => (existsSync(f) ? readFileSync(f, "utf8") : null);

const failures = [];
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${!cond && detail ? `  — ${detail}` : ""}`);
  if (!cond) failures.push(name);
};

// ---------- T1: re-slot flagged on EVERY run, never appended (P1) ----------
{
  const t = setup({
    entries: [{ num: 179, type: "attack", date: "2026-10-21" }],
    identities: { records: { AAAA: { canonical: 179, warningNumber: "179-26", firstSeen: TODAY, lastSeen: TODAY } } },
    payload: [rec(200, "AAAA", "Attack", "2026-10-21T01:45:00Z", "UKMTO WARNING 179-26 - ATTACK re-slot test")],
  });
  const r1 = run(["--apply"], t.env);
  check("T1 run1: exit 0", r1.status === 0, r1.stderr?.slice(0, 200));
  check("T1 run1: #200 flagged as identity alias", r1.stdout.includes("FLAG (identity): #200"), r1.stdout);
  check("T1 run1: not appended", !sha(t.crisis).includes("num: 200"));
  const s1 = JSON.parse(sha(t.ident));
  check("T1 run1: canonical still 179 (observation did not overwrite it)", s1.records.AAAA.canonical === 179, JSON.stringify(s1.records.AAAA));
  check("T1 run1: alias observed and recorded", s1.records.AAAA.aliases?.some((a) => a.num === 200));
  // The recheck bug: a second IDENTICAL run appended #200.
  const r2 = run(["--apply"], t.env);
  check("T1 run2: exit 0", r2.status === 0, r2.stderr?.slice(0, 200));
  check("T1 run2: #200 STILL flagged as identity alias", r2.stdout.includes("FLAG (identity): #200"), r2.stdout);
  check("T1 run2: still NOT appended (the regression)", !sha(t.crisis).includes("num: 200"), sha(t.crisis));
  const s2 = JSON.parse(sha(t.ident));
  check("T1 run2: alias not double-recorded", s2.records.AAAA.aliases.filter((a) => a.num === 200).length === 1);
  rmSync(t.dir, { recursive: true, force: true });
}

// ---------- T1b: read-only fetch BEFORE --apply changes nothing ----------
{
  const t = setup({
    entries: [{ num: 179, type: "attack", date: "2026-10-21" }],
    identities: { records: { AAAA: { canonical: 179, warningNumber: "179-26", firstSeen: TODAY, lastSeen: TODAY } } },
    payload: [rec(200, "AAAA", "Attack", "2026-10-21T01:45:00Z", "UKMTO WARNING 179-26 - ATTACK re-slot test")],
  });
  const beforeCrisis = sha(t.crisis), beforeIdent = sha(t.ident);
  const r0 = run([], t.env);
  check("T1b readonly: exit 0", r0.status === 0, r0.stderr?.slice(0, 200));
  check("T1b readonly: crisis.ts byte-identical", sha(t.crisis) === beforeCrisis);
  check("T1b readonly: sidecar byte-identical (no metadata write in read-only mode)", sha(t.ident) === beforeIdent);
  const r1 = run(["--apply"], t.env);
  check("T1b apply after readonly: #200 flagged, not appended", r1.stdout.includes("FLAG (identity): #200") && !sha(t.crisis).includes("num: 200"), r1.stdout);
  rmSync(t.dir, { recursive: true, force: true });
}

// ---------- T1c: missing sidecar in read-only mode — note, no writes ----------
{
  const t = setup({
    entries: [{ num: 179, type: "attack", date: "2026-10-21" }],
    identities: null,
    payload: [rec(200, "AAAA", "Attack", "2026-10-21T01:45:00Z", "UKMTO WARNING 179-26 - ATTACK re-slot test")],
  });
  const r0 = run([], t.env);
  check("T1c: exit 0", r0.status === 0, r0.stderr?.slice(0, 200));
  check("T1c: notes that alias detection is off until --apply seeds", r0.stdout.includes("identity sidecar absent"), r0.stdout);
  check("T1c: no sidecar written in read-only mode", !existsSync(t.ident));
  check("T1c: crisis.ts untouched", sha(t.crisis) === crisisTemplate([{ num: 179, type: "attack", date: "2026-10-21" }]));
  rmSync(t.dir, { recursive: true, force: true });
}

// ---------- T2: reconciled date pair — exact pair suppressed, others flag (P2) ----------
{
  const mk = (date166) => setup({
    entries: [
      { num: 166, type: "attack", date: "2026-10-11" },
      { num: 179, type: "attack", date: "2026-10-21" },
    ],
    identities: { records: { CCCC: { canonical: 166 }, AAAA: { canonical: 179 } } },
    payload: [
      rec(166, "CCCC", "Attack", date166),
      rec(179, "AAAA", "Attack", "2026-10-21T01:45:00Z"),
    ],
  });
  // The reviewed pair: local Oct 11 (report body) / API Oct 12 (placeholder) → suppressed.
  const a = mk("2026-10-12T00:00:00Z");
  const ra = run([], a.env);
  check("T2a reviewed pair: no flag for #166", !ra.stdout.includes("FLAG: #166"), ra.stdout);
  // An unrelated new API date → must re-flag.
  const b = mk("2026-10-20T00:00:00Z");
  const rb = run([], b.env);
  check("T2b unrelated date change: #166 re-flags", rb.stdout.includes("FLAG: #166"), rb.stdout);
  // The API placeholder date with a DIFFERENT local date (not the reviewed
  // pair) → also re-flags.
  const c = setup({
    entries: [
      { num: 166, type: "attack", date: "2026-10-13" },
      { num: 179, type: "attack", date: "2026-10-21" },
    ],
    identities: { records: { CCCC: { canonical: 166 }, AAAA: { canonical: 179 } } },
    payload: [rec(166, "CCCC", "Attack", "2026-10-12T00:00:00Z"), rec(179, "AAAA", "Attack", "2026-10-21T01:45:00Z")],
  });
  check("T2c placeholder date with non-pair local date: re-flags", run([], c.env).stdout.includes("FLAG: #166"));
  rmSync(a.dir, { recursive: true, force: true });
  rmSync(b.dir, { recursive: true, force: true });
  rmSync(c.dir, { recursive: true, force: true });
}

// ---------- T3: a genuinely new incident is still appended ----------
{
  const t = setup({
    entries: [{ num: 179, type: "attack", date: "2026-10-21" }],
    identities: { records: { AAAA: { canonical: 179 } } },
    payload: [
      rec(179, "AAAA", "Attack", "2026-10-21T01:45:00Z"),
      rec(181, "BBBB", "Attack", "2026-10-21T22:00:00Z", "UKMTO WARNING 181-26 - ATTACK new test"),
    ],
  });
  const r1 = run(["--apply"], t.env);
  check("T3: new incident appended", r1.stdout.includes("NEW ENTRIES (1)") && sha(t.crisis).includes("num: 181"), r1.stdout);
  const s = JSON.parse(sha(t.ident));
  check("T3: new record seeded as its own canonical", s.records.BBBB?.canonical === 181, JSON.stringify(s.records.BBBB));
  rmSync(t.dir, { recursive: true, force: true });
}

// ---------- T4: manual reconcile to the new slot → canonical follows ----------
{
  // The human followed the alias flag: the array now counts #200 (the slot
  // UKMTO re-issued the record under) and no longer #179.
  const t = setup({
    entries: [{ num: 200, type: "attack", date: "2026-10-21" }],
    identities: { records: { AAAA: { canonical: 179, aliases: [{ num: 200, firstSeen: TODAY }] } } },
    payload: [rec(200, "AAAA", "Attack", "2026-10-21T01:45:00Z", "UKMTO WARNING 179-26 - ATTACK re-slot test")],
  });
  const r1 = run(["--apply"], t.env);
  check("T4: reconciled slot no longer flagged as alias", !r1.stdout.includes("FLAG (identity)"), r1.stdout);
  const s = JSON.parse(sha(t.ident));
  check("T4: canonical follows the counted number (179 → 200)", s.records.AAAA.canonical === 200, JSON.stringify(s.records.AAAA));
  rmSync(t.dir, { recursive: true, force: true });
}

console.log(failures.length ? `\n${failures.length} test(s) FAILED` : "\nAll ukmto-fetch regression tests passed");
process.exit(failures.length ? 1 : 0);
