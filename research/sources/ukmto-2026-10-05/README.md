# UKMTO captures — 2026-10-05

Raw evidence behind `ukmtoIncidents` in site/src/data/crisis.ts (72 entries, #78–#152)
and the JMIC/VRA context figures used in the Supply-section copy. All fetched via the
web reader CLI (ukmto.org is Cloudflare-blocked from this box; direct curl 403s).

- `recent-incidents.txt` — UKMTO "Recent Incidents" page (ukmto.org/recent-incidents),
  captured 2026-10-05. 72 entries with UKMTO report number, type, and incident date.
  The page is a ~96-day sliding window; #99, #100, #125 are not present.
- `update-080.txt` — JMIC Advisory Note update 080 (ukmto.org PDF, Aug 4 2026). Main
  list (Jul 31–Aug 3) + annex "confirmed incidents since 28 Feb" (garbled table,
  numbers recoverable). Confirms #99/#100 as "likely UAV maritime attacks".
- `jmic-mar-2026.txt` — JMIC Monthly Statistics, March 2026 edition (ukmto.org PDF).
  27 incidents / 18 attacks in March; month-on-month context (pre-war 0–1/month).
  Only the March edition is public — Apr–Sep editions 404 under the guessed slugs.
- `vra-2026-10-02.txt` — UKMTO VRA Weekly Overview, produced 2 Oct 2026 (ukmto.org PDF).
  7-day incident table (143–146, cross-checks the capture) + running tallies, incl.
  "Since 6 Jul 26, 31 of 48 projectile strike incidents … on the southern Omani route"
  and the standing "probably other projectile strikes … NOT … reported" note.

Also probed (not kept): UKMTO Telegram channel t.me/s/UK_MTO_TM (curl-able; 280 posts
Dec 26 2025 – Jul 14 2026; early posts lack incident types).

## Update (15:3x UTC) — JSON API found

A better primary source than the page capture: **`https://sccd.royalnavy.mod.uk/api/ukmto/all`**
(the API ukmto.org's own Next.js page calls). Plain JSON, no auth; fetched with curl + browser
headers (CF intermittently challenges). `site/scripts/ukmto-fetch.mjs` now pulls this daily and
appends new entries to `ukmtoIncidents`. Card date == `utcDateOfIncident` (verified 49/49 against
the capture above), so the capture remains the verification baseline. New entries appended from
the API: #153–#156 (all attacks; #153/#154/#155 are time-late reports, incident dates Oct 3–4).
