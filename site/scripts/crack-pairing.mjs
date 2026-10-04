#!/usr/bin/env node
// crack-pairing.mjs — Tier 1 (Oct 4). Prints the crack methodology pairing sentence
// and the latest crack values for the index.astro crack paragraph, computed from
// crisis.ts with the SAME rule the chart uses (retail × 42 − nearest WTI; same-day
// wins; ties go to the later date).
//
// Usage:  node scripts/crack-pairing.mjs [--since 2026-09-21]
//
// The paragraph still has hand-written narrative around it (roll-gap disclosures,
// weekend explanations) — this prints only the part that goes stale every pass.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const ts = readFileSync(join(here, "..", "src", "data", "crisis.ts"), "utf8");

const sinceIdx = process.argv.indexOf("--since");
const since = sinceIdx >= 0 ? process.argv[sinceIdx + 1] : "2026-09-21";
if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) {
  console.error(`--since needs YYYY-MM-DD (got "${since ?? "nothing"}")`);
  process.exit(1);
}

const arr = (name) => {
  const m = ts.match(new RegExp(`export const ${name}\\s*[:=][^\\[]*\\[([\\s\\S]*?)\\n\\];`));
  if (!m) throw new Error(`could not find ${name} in crisis.ts`);
  return [...m[1].matchAll(/\{\s*date:\s*"([^"]+)"\s*,\s*value:\s*([0-9.]+)/g)]
    .map((x) => ({ date: x[1], value: Number(x[2]) }));
};

const wti = arr("wtiWeekly");
const retail = (n) => arr(n);

// Same rule as the chart (index.astro nearestWti): nearest date; ties → later date.
const nearestWti = (iso) => {
  const t = Date.parse(iso + "T12:00:00");
  return wti.reduce((best, w) => {
    const dw = Math.abs(Date.parse(w.date + "T12:00:00") - t);
    const db = Math.abs(Date.parse(best.date + "T12:00:00") - t);
    return dw < db || (dw === db && w.date > best.date) ? w : best;
  });
};

const short = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

const compact = (d0, d1) => {
  const days = (Date.parse(d1) - Date.parse(d0)) / 86400000;
  if (days === 0) return short(d0);
  if (days === 1) return `${short(d0)} and ${short(d1)}`;
  return `${short(d0)}–${short(d1)}`;
};

for (const name of ["dieselYtd", "gasolineYtd"]) {
  const pts = retail(name).filter((p) => p.date >= since);
  if (!pts.length) { console.log(`\n# ${name}: no readings since ${since}`); continue; }
  const groups = [];
  for (const p of pts) {
    const w = nearestWti(p.date);
    const g = groups[groups.length - 1];
    if (g && g.wtiDate === w.date && (Date.parse(p.date) - Date.parse(g.last)) / 86400000 === 1) {
      g.last = p.date;
      if (w.date !== p.date) (g.off ||= []).push(p.date);
    } else {
      groups.push({ first: p.date, last: p.date, wtiDate: w.date, wtiValue: w.value, off: w.date !== p.date ? [p.date] : [] });
    }
  }
  console.log(`\n# ${name} (retail × 42 − WTI), since ${since}`);
  const last = pts[pts.length - 1];
  const lw = nearestWti(last.date);
  const crack = +((last.value * 42 - lw.value) * 10).toFixed(0) / 10;
  console.log(`# latest: ${short(last.date)} $${last.value.toFixed(4)} × 42 − ${short(lw.date)} settlement $${lw.value.toFixed(2)} = $${crack.toFixed(1)}${lw.date !== last.date ? "  (paired to nearest trading day, not same-day)" : ""}`);
  const frag = groups
    .map((g) =>
      `the ${compact(g.first, g.last)} reading${g.first !== g.last ? "s" : ""} use${g.first === g.last ? "s" : ""} the ${short(g.wtiDate)} settlement ($${g.wtiValue.toFixed(2)})${g.off.length ? ` — ${compact(g.off[0], g.off[g.off.length - 1])} ha${g.off.length > 1 ? "ve" : "s"} no same-day settlement` : ""}`
    )
    .join(", ");
  console.log(`# pairing fragment:\n  ${frag}.`);
}
