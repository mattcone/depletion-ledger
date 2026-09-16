# Depletion Model — technical specification

> The public model card is `MODEL.md` (synced to the site's `/model/` at build
> time, written for a general audience). This file is the full technical spec and
> the working instructions: exact inputs, formulas, branch weights, floor math,
> breaking points, calibration, and the update procedure. The "main report"
> referenced below is `Oil-Depletion-Report.md`.
>
> **Instructions for future passes:** when the model changes (new data, regime event,
> reweighting), update THIS file first — it is the spec of record. Then translate the
> change into plain language in `MODEL.md` (no jargon: no "Brier", "Bayes", "kb/d",
> or unexpanded acronyms; every number on the public card must trace to this file or to
> a dated entry in `research/`). Then rebuild the site: `npm run deploy` in
> `../site/`.

---

*Distilled from the [main report](Oil-Depletion-Report.md) (§3, §4, §9A, §9B, §11) on Sep 9, 2026 (Day 193); branch weights reweighted Sep 9 (regime event: biggest tit-for-tat wave of the war, exclusion zone enforced, first third-country base hit). The main report is the source of truth; this file is the compact technical spec — what goes in, what is assumed, what comes out, and how it updates. Review before treating as canonical.*

## 1. Inputs (what feeds the model)

| Input | Source | Cadence |
|---|---|---|
| US inventories (crude, gasoline, distillate, jet, SPR, by PADD) | EIA WPSR (API for cross-check only — use EIA) | weekly (Wed) |
| US retail/spot prices | EIA tables 11–14, AAA national avg | daily/weekly |
| Hormuz traffic | IMO hot-topic page, UKMTO/JMIC weekly, IMF PortWatch (AIS-only) | weekly |
| Red Sea / Bab el-Mandeb flows | Kpler factbox, The National, JMIC | weekly |
| Russian refining | strike reports (Euromaidan/UNITED24/hamerintel), ban calendar (Reuters) | weekly |
| Asia buffers | METI/KEA mandate levels (JP 203d, KR >1y), China customs imports | monthly |
| Infrastructure damage | §9B inventory (ACLED 172+ strikes; Rystad, EIA shut-in series) | monthly |
| Demand | IEA OMR, OPEC MOMR, EIA STEO (Sep 9: Brent 2H26 ~$90, 2027 $74, ME < pre-conflict until 2Q27 — inputs froze Sep 3) | monthly |
| Branch weights | GEF + prediction markets (Polymarket: Sep 30 = 3.8%, Dec 31 = 31.5%) | as published |
| Prices | Brent/WTI settlement, RBN cracks, AAA retail diesel | daily |

## 2. Core assumptions

1. **Product, not crude, is the scarce asset.** US crude ~normal; the constraint is distillates + SPR. Brent $88–99 is carried by demand destruction (−1.6 mb/d IEA), not by physical crude shortage.
2. **Three branches, weights reweighted Sep 11 then Sep 16** (10/35/55; before that 10/40/50 Sep 11, 10/50/40 since Sep 9, 15/55/30 Sep 7):
   - Corridor holds (extended, shadow flows — now mostly on the Iranian-controlled route, inside the exclusion zone) — **~10%**
   - Standoff drift (hotter standoff: published US exchange rate, Iranian exclusion zone; gradual decay; the Saudi bypass pipeline struck but restarting) — **~40%**
   - Corridor lapses (no extension; the bypass stays shut) — **~50%** ← base case since Sep 11
   - *Swing factor:* the Oman safe corridor (IMO filing claimed Sep 8–9, unverified) — if real, "corridor holds" reconstitutes under Iranian management (less free-flow, more revocable). Verify against IMO circulars before moving weights back.
   - *New gauge:* the EIA–market spread (EIA 2H26 ~$90 vs spot >$100). Widening past ~$10–15 into October ⇒ market prices lapse >40% ⇒ move the weights with it.
   - *Explicit reweight trigger (logged Sep 10):* the Sep 10 filter run (prior 10/50/40, transits 7/d, 10 losses) at the SETTLED Brent 108.03 returned horizon 8.5/23.9/67.6 — 28 pts more lapse-leaning than judgment (no reweighting: the Sep 10 wave intensified the Sep 9 regime, it did not create one). The $7.32 settlement move is itself a state input: at the morning's 100.71 the price signal leaned slightly standoff; at 108.03 it sits exactly at the lapse distribution's mean (N(108,12)), moving the state posterior 55.5/44.5 → 34.8/65.2. Move the judgment to ~10/40/50 when BOTH: (a) the Sep 16 weekly count sustains ~7 transits/day, AND (b) the EIA–market spread (was ~$18.0 on Sep 10 at settled $108.03 vs EIA 2H26 ~$90 — beyond the $10–15 zone) holds past the Oct 7 STEO. The Oman corridor's 4th day without IMO/Oman confirmation is a structural negative for "holds" — if the registration never materializes, the holds branch has no reconstitution path. (Sep 11 confirmation: Kpler revised the Sep 9 count **up** to 11; Sep 10 = 7 with zero crude tankers. Filter re-run with the same settled inputs → horizon 8.5/23.9/67.6, unchanged. The Houthi takeover of Mocha and the Yemeni Red Sea coastline (Sep 10) is an intensification of the standoff regime, not a new regime — Bab el-Mandeb traffic is unchanged (26/day). No reweight; triggers stand.)
   - ***Regime event (Sep 11 afternoon) — reweight EXECUTED:*** the Saudi Energy Ministry SUSPENDED the East–West pipeline (Abqaiq→Yanbu, the only bypass of Hormuz) as a "precautionary" measure after Thursday's attacks (pumping stations hit, injuries in the Riyadh/Madinah regions; no damage assessment yet; second outage this war — April cut ~700k b/d, it was back to full capacity Sep 10). Same day: the Houthis completed the seizure of Yemen's ENTIRE Red Sea coastline + Bab el-Mandeb islands. The bypass was the load-bearing element of the standoff branch — its going dark is structural, not intensification. **Judgment 10/50/40 → 10/40/50** (first reweight of this framework; the call was delegated). **Pre-declared reversion:** official ESPO restart, or a damage assessment finding the line repairable in days → back to 10/50/40 (degraded). Suspension persisting past the Sep 16 print, or a multi-week damage assessment → further toward lapse. The pre-committed data triggers stand and now operate from the 10/40/50 base (Sep 16 transit count, Oct 7 spread). Filter reads: `--corridor-flow degraded` → horizon 12.1/38.5/49.3; `absent` (bypass not moving trade) → 6.1/14.3/79.6 — the ceiling on how far the judgment should move, not the judgment itself.
   - ***Sep 15 morning — judgment UNCHANGED (10/40/50):*** filter re-run (prior 10/40/50, transits 4/d preliminary, 1 confirmed tanker loss this week — the _El Gaia_, Brent settled 105.68, corridor flow absent) → state 0.0/6.4/93.6, **horizon 5.6/12.6/81.8** (was 6.1/14.2/79.7) — the gap widened to ~32 pts lapse-leaning; logged, not averaged in. No pre-committed trigger fired: the 6-day pause at host states held (survived the Hengam Iranian-hull strike, the VTB designation, the Vienna exclusion); no Houthi attack on a non-Saudi vessel (the Houthi "85 vessels in 72h ≈ 96% of normal" claim is self-reported but consistent with the lane staying open). **New trigger candidate (surfaced to user, NOT yet a clause): the Yanbu clock — Reuters (three industry sources) puts the Red Sea port's stocks at five to seven days of exports with the ESPO shut.** If the port's exports visibly fall or Aramco acknowledges the depletion, the bypass's failure becomes a hard supply loss rather than a rerouting cost; candidate action would be further toward lapse. The _El Gaia_ mine claim (Iran's first acknowledged disabling of a named merchant hull; the vessel was on its own non-compliant list) is a declaratory escalation and an enforcement record for the coordinate-less restricted area — not a regime event under the current clauses. Reversion clause (days-scale repair ⇒ 10/50/40) still not met; the Yanbu data point argues toward a longer outage.
   - ***Sep 15 evening — judgment UNCHANGED (10/40/50, user decision):*** filter re-run (prior 10/40/50, transits 4/d, 1 tanker loss this week, Brent settled **108.50 — new closing record (restated $108.75)**, corridor flow absent) → **horizon 5.5/11.8/82.7** (was 5.6/12.6/81.8). The record close is the Yanbu buffer being priced (Rystad/CNBC: the ~4M b/d pipeline loss vs the 5–7 day cover; "prices are unlikely to fall below $100 anytime soon"), not a regime event — no clause fired. Elasticity per +$5 from $101.39: −0.25/−0.51/−0.76 mb/d. The Yanbu clock stays the standing trigger candidate; the Sep 16 WPSR (w/e Sep 11) + Fed decision remain the day's gates.
   - ***Sep 16 mid-morning (WPSR) — judgment UNCHANGED (10/40/50, user's call):*** filter re-run (prior 10/40/50, transits 4 — Sep 15 verified, 1 tanker loss, Brent settled **108.75 restated**, corridor flow absent) → **horizon 5.4/11.8/82.8** (flat vs 5.5/11.8/82.7). The double test came back clean: the WPSR REFUTED the API's +7.1M crude build (official: −0.6M draw, imports UP w/w → neither inflow collapse nor abundance; the API number was noise), and the SPR withdrawal slowed a THIRD straight week (0.4M bbl, ~58 kb/d — the managed pace at its noise floor). No clause fired: no new tanker losses, transits still single digits (7 on Sep 14 revised, 4 on Sep 15), Brent at the same level. **Pre-committed trigger check: "weekly transit count ~7/day" — two-day actual 7+4=11 (5.5/day), 10-day avg 18: not clearly tripped either direction; surfaced to user, not applied.** The new US official claim (Axios: 40 ships/day, ~14M b/d under US guidance; UKMTO 3:1 reported-vs-AIS ratio, UAE ships AIS-dark) raises the stakes on the transit counts but changes no clause. YASREF strike still claim-only. Libya (PFG guards' illegal valve closure on the Hamada–Zawiya main pipeline halted the Hamada + Al-Tahara fields and station NC5 per the NOC statement; FM warning) is a second-country supply loss, not a defined tripwire. draw_rate re-baselined: 0.70M band, adjusted level ~281.5M as of Sep 16, 250M floor ~45 days (~Oct 31).
   - ***Sep 16 evening — judgment REWEIGHTED (10/40/50 → 10/35/55, user decision):*** the Yanbu trigger candidate (surfaced Sep 15 morning, 48h SLA started ~13:00 ET) was RATIFIED after a second wire verification: loading suspension (Reuters, SOLID, re-verified Sep 16 ~12:40 ET), the 5–7 day buffer cover exhausted over the weekend, "several weeks" repairs (Bloomberg) vs "days" (Wright), Aramco cancelling/pushing European cargoes (≥3 refiners). The 48h SLA forced the decision: act or formally reject; user chose act — 5 pts standoff→lapse. **Counter-argument logged (weighted, not vetoing):** the official 40 ships/day / ~14M b/d (Axios, Sep 16) is untested against AIS (7, 4; UKMTO 3:1; UAE ships dark) — if it holds, the strait works better than counts say → toward standoff; review at the Sep 23 WPSR + a week of counts. **Context the decision explicitly weighed:** the v2.2 refactor (3-day transits) moved the filter's central lapse estimate 82.8 → 58.3, so the "persistent 30-pt gap" argument shrank to ~8 pts; the move is process-driven (trigger discipline), not evidence-chasing, and lands BELOW the filter under either convention. **Reversion:** rapid resumption of Yanbu loadings ⇒ 10/40/50; official ESPO restart or days-scale assessment ⇒ 10/50/40 (Sep 11 clause, unchanged). **Ledger:** Nov 15 judgment row re-published at 0.55 (new row, Sep 16 PM; the 0.50 row stands as the morning publication).
3. **SPR draw rate is the leading indicator, not the level.** 285.0M (w/e Sep 11, released Sep 16); the w/e Sep 11 draw was **0.40M bbl (~58 kb/d) — the THIRD STRAIGHT WEEK OF SLOWING** (3.1M→1.2M→0.4M), far below every band in draw_rate.py (price band 0.70M at Brent $108.75). **The taper is now explained by the contract schedule (Sep 16 evening):** the FY26 program is an EXCHANGE (crude now, base+premium returned later; not a sale), 133.56M awarded across 5 rounds (Mar 20–Jun 22; R1 45.22M + R3 0.5M verified directly against the DOE award PDFs); rounds 1–2 deliveries drove the spring/summer draws (9.06M peak w/e Jun 19 — note: 1.29M b/d, WITHIN the 0.45–1.35M scenario range near lapse, not above it); round 3 (0.5M, Jul–Sep 26 delivery window) is the last awarded volume. Conditional reconciliation: 133.560M awarded − 130.485M net decline (415.442M Mar 13 → 284.957M) = **3.075M not yet delivered** (assumes inventory change = these deliveries; receipts/modifications un-audited). **CORRECTION (external review):** "scheduled deliveries run out ~Sep 30–early Oct" was stated too firmly — the round-3 window (Jul–Sep) applies to round-3 volume only, and Aug–Sep draws (1.24+0.40M) exceed all of round 3's 0.5M, so the remainder likely includes round 1–2 volume under delivery schedules not yet read (their RFPs unread — gap). At the latest net pace (0.403M/wk) the remainder takes ~53 days (→ early Nov). Status: HYPOTHESIS (deliveries winding down / nearing completion), to be confirmed or refuted by the Sep 23 + Sep 30 prints — NOT a verified stopping date. Also corrected: the below-ALL-scenario-rates regime is only the last two weeks (Sep 4: 0.18M b/d, Sep 11: 0.058M b/d); "far below the bands all summer" was wrong. Floor-table arithmetic: 285→250M at 1.35M b/d = 26 days (not 36 — chat arithmetic error; the card's ~Oct 7 is right). The policy element narrows to: **DOE has not re-solicited** — the announced 172M program is ~38.4M short of the ~133.6M awarded, and the June round (sour streams only, 9.0% min premium, returns from Jan 2027) was 98.75% unawarded (0.5M of 40M, Vitol) — a market signal consistent with crude not being the scarce asset (refining bottleneck). The Sep 16 "backstop mode" read is SUPERSEDED as the taper explanation (pace is contract-mechanical; conservation survives only as the prediction that DOE re-solicits if the corridor lapses). Return windows start Jan 2027 (round 3; rounds 1–2 windows unknown — their RFPs unread), so floor dates are unaffected near-term. **Next checks: (a) spr.doe.gov postings for a round-4 RFP (esp. post-Yanbu — would restart the pace); (b) Sep 23 print (w/e Sep 18), first after the round-3 window closes — taper continues then stops ⇒ exhaustion confirmed; step-up ⇒ new DOE action.**
4. **Floor hierarchy (SPR):** ~300M cavern-collapse floor (crossed early Aug — first reported below in the week ending Aug 7) → ~250M GEF operational floor → ~180M hard-operable floor → ~70M DOE safe minimum → ~44M unrecoverable. The 300/180 figures are engineering estimates, ±50M, not published DOE numbers.
5. **Political breaks precede physical ones.** Slovenia/Ireland broke on *price*, not scarcity. US retail diesel all-time record ($5.90, Sep 7) means the US tripwire is crossed too.
6. **The PADD1↔ARA pool is shared** (34% of ARA August gasoil imports are US-sourced). The US East Coast and Europe break in the same week, not in sequence.
7. **The baseline itself is damaged (§9B):** reopening does not restore pre-war supply. Structural residuals: crude −0.6M bpd through 2027 (drift compounds it to 1.5–2.5M), Qatar LNG −17% until 2029–31 (12–14% of EU LNG), 30–55% of Russian refining out permanently by 2027.
8. **China is opaque by design.** All Chinese inventory figures (SPR est. 1.2–1.4B bbl; commercial est. 0.6–1.0B) are order-of-magnitude estimates. The commercial buffer runway (9–18 months) expires Q1–Q2 2027 → forces the re-import-or-release decision.
9. **Days-of-cover ignores production and demand destruction** (both extend actual cover).
10. **Least stable premise:** no Russia→Europe kinetic threshold-crossing. The hybrid front is a dial European politicians control; the one undated breaking point.

## 3. Branch endpoints (US, end of November 2026)

| Branch | Weight | SPR | Distillate | PADD1 mid-Nov | Retail diesel | First rationing |
|---|---|---|---|---|---|---|
| Corridor holds | ~15% | ~274M (0.53M b/d) | 65–75M (~18–20d) | ~10–12d | $5.20–5.50 | none national; East Coast tight |
| Standoff drift | ~50–55% | ~265–270M (0.7M b/d) | 55–65M (~15–17d) | ~8–10d | $5.30–5.80 | **East Coast, late Nov** |
| Corridor lapses | ~30% | ~250–255M (1.2–1.4M b/d from late Oct) | 40–50M (~11–13d) | single digits | $5.80–6.50+ | **East Coast early Nov; spreads Dec** |

Gasoline is safe in all branches (net exporter). Jet is fine through November; it snaps first in December.

## 4. SPR runway (from 285.4M, w/e Sep 4)

| Floor | @ 0.45M b/d | @ 0.7M b/d | @ 1.35M b/d (lapse) |
|---|---|---|---|
| 250M operational | late Nov 2026 (~79d) | late Oct 2026 (~51d) | ~26 days (Sep 30) |
| 180M hard-operable | ~late Apr 2027 | ~Feb 2027 (~151d) | ~78 days (Nov 21) |
| 70M DOE minimum | ~late Dec 2027 | ~early Jul 2027 (~308d) | — |

(The reported one-week pace was 0.18M b/d — far below even the 0.45 column; the table keeps the model's structural paces. If the Sep 16 print shows a second slow week, this table is the first thing that moves.)

At any "nothing-changes" pace the SPR crosses the 180M floor within 6–12 months; by month 12 the reserve is at a 40+ year low with no capacity left to absorb a corridor lapse.

## 5. Dated breaking points (if nothing changes, Sep 2 baseline; Sep 8 note compresses most ~2–6 weeks earlier; Sep 9 note: regime event — most pull another ~1–3 weeks; the Sep 14/15 "Hormuz normal" bet (3.8%) settles ~0)

1. **Sep 30, 2026** — Russia producer-diesel ban expires; Russia cannot cover its own gap (28% of stations stocked, Kirishi down).
2. **Late Sep – mid Nov 2026** — corridor expiry window (30–60-day lifespan).
3. **Late Oct – Nov 2026** — ARA gasoil crosses trader floor (~8.5–9M bbl); first EU price caps.
4. **Late Oct – Nov 2026** — SPR crosses 250M operational floor (pace-dependent).
5. **Nov 30, 2026** — Russia jet-fuel ban.
6. **Jan 31, 2027** — Russia non-producer gasoline/diesel ban (all three live simultaneously).
7. **~Feb / ~May 2027** — SPR crosses 180M hard-operable floor (0.7 / 0.45 pace).
8. **Q1–Q2 2027** — China commercial buffer runway expires → re-import-or-release decision (the largest market event of the war).
9. **~Late Jul / ~late Aug 2027** — SPR at 70M / 44M on the 0.7 path; draw must stop for geology.
10. **~Mar–Apr 2027** — Japan buffer exhaustion risk (203d burned 10–15% faster; METI mandates trigger first).
11. **Any date** — a calibrated Russia→Europe hybrid attack fails to fail (passenger aircraft, casualties) → Article 5 live; breaks every energy assumption at once.

**Headline: the status quo cannot last 12 months intact. By month 9, either the corridor or China's buffer breaks.**

## 6. Key limitations

- This is a **stress test, not a forecast** — the value is the *ordering* of breaks, not the dates.
- Traffic figures are a range (3–29 transits/day verified; claimed 8.6–10M bpd dark flows unverified). Model on the verified floor.
- ARA depletion path is an interpolation (GEF publishes the December endpoint, not weekly stock); late-October floor crossing ±3 weeks.
- Every Chinese number is an estimate; China discloses nothing.
- Infrastructure figures: Abqaiq ~7M bpd offline is an upper bound (social-media-derived); South Pars "40% restored" is an Iranian self-report.
- Demand-destruction figures are contested: IEA −1.6 / EIA −1.2 / OPEC **+0.58** mb/d — a 2.2 mb/d spread. The spread itself is the signal (the seller is bullish on demand).
- The macro channel (recession/stagflation) is under-weighted: bank recession odds 25–50% vs Polymarket ~7% (narrower window); the Fed is *pro-cyclical into the shock* (hike camp, 3.50–3.75%). **Scored forecast for the end-Sep batch: a 25bp hike on Sep 16 — CME ~86% vs Polymarket 62% (Sep 11, after the above-forecast core CPI; 72% Thu). SETTLED Sep 16: the hike happened (12–0, +25bp to 3.75–4.00%); p=0.86, Brier 0.0196 — the ledger's first resolved row (running Brier 0.0196 over 1).** Note: the pre-committed tripwire was "a Fed *hike* into the winter draw" — the hike arrived in September, ahead of the winter draw; surfaced to the user as an odds-review item, not a trigger. **SEP (Sep 16): 16/18 participants pencil in ≥1 more hike this year (WSJ/Timiraos); only 4 pencil next year below ~4%.** New scored call (user-requested, Sep 16 evening): **Fed hikes again (any size) at the Oct 27–28 FOMC, p=0.60** — judgment, not arithmetic: the 16/18 SEP count is evidence of the Committee's lean, not a probability; read with the Sep 16 statement it supports ~85–90% for ≥1 hike this year, of which ~70% lands in October rather than the Dec 8–9 SEP meeting (≈0.60); consecutive-hike base rate 1994–95 / 1999–2000 / 2022–23. (Evening correction: the original writeup ran 0.89 (16/18) × 0.70 as if the count were a probability — the count is evidence; the probability is the judgment.) Counter on file: Goldman "underlying case weak" (3-mo underlying price growth decelerating) — a soft Sep CPI (Oct 14) tips October to hold. Also WSJ: 10-yr above 5% (highest in ~2 decades), 30-yr mortgage ~7% (highest in a year, vs 6% in Feb) — the long end is pricing the hiking turn, not just the short end. Branch odds unchanged (10/35/55): the macro channel is under-weighted in the model, not a branch trigger. Tripwire (standing): a second consecutive upward revision of 12-mo recession odds, or a Fed *hike* into the winter draw.
- I am a coding agent, not an energy analyst; verify load-bearing numbers against primary sources.

## 7. Update procedure

1. **Pull:** EIA WPSR (weekly), UKMTO/JMIC + PortWatch (weekly), AAA diesel + Brent/WTI settlement (daily), strike/ban reports (weekly), METI/KEA + China customs (monthly), IEA/OPEC/STEO (monthly), prediction markets (as published).
2. **Log** every new data point in `research/<YYYY-MM-DD>.md` with source and date. Unverified items are flagged as such and never enter SUMMARY until verified.
3. **Re-baseline** §3/§4 of the report on each WPSR (levels, WoW, draw rate). The draw *rate* change is the trigger for branch reweighting.
4. **Reweight branches** only on regime events (corridor deal/lapse, tanker-war escalation/de-escalation, China move, ban dates landing) — not on weekly noise.
5. **Check breaking points:** each dated row is both a market event and an escalation tripwire. When one crosses, the table's dominant variable changes; re-order.
6. **Update SUMMARY.md at the end of every research pass** (standing rule). Update the report's banner only on regime changes; append, don't rewrite.
7. **Monthly:** re-check the §9B damage inventory, the 11.2M→1.4M shut-in path, ACLED strike pace (if it doubles, the residual-loss estimate doubles), and the reflation risk on the corridor-holds branch.

## 8. External methods (literature survey)

`research/2026-09-09_literature.md` maps each model component to its academic literature and off-the-shelf algorithms (buffer-stock theory — Williams & Wright 1978, Dorfman 1969, Pindyck 1979; chokepoint network flows — Pratson 2023; elasticity-driven demand destruction — EIA elasticity review; Bayesian scenario filtering + Brier-score calibration; API-first nowcasting; fat-tailed price paths — GED/GARCH; GPR-style escalation index — Caldara & Iacoviello 2022; ripple-effect graph analysis of the §11 cascade). Includes a prioritized adoption list. **Adopted Sep 9:** items #1–#3 are now scripts in `model/` (elasticity updater, Bayesian branch filter + Brier-score calibration ledger, price-triggered draw rate); see `model/README.md` for usage and the Sep 9 worked examples.

**Model scripts v2.0 (Sep 11, code review):** (1) elasticity LEVEL switched to the standard log-difference form −D0·ε·ln(P/P0) — the v1.0 linear form overstates by ~20% at the current +44% move (Sep 9 example: band −2.25…−6.75 → −1.86…−5.59 mb/d; MARGINAL view unchanged); (2) the branch filter gained the structural `--corridor-flow {functioning,degraded,absent}` signal (documented judgment likelihood vectors) — it encodes "contested, not closed" so weekly counts alone don't swing the lapse weight (Sep 10 inputs: v1 8.5/23.9/67.6 → v2.0 12.1/38.5/49.3 vs judgment 10/50/40); (3) `score` reports a base-rate Brier comparator; (4) robustness: log-space Poisson (no overflow at extreme transits), transition-matrix row validation, input guards. Regression tests: `model/test_model.py` (14 tests, all green). **Published judgment and reweight triggers are UNCHANGED by v2.0: 10/50/40 stands; Sep 16 transits + Oct 7 STEO spread remain the gate.** *(Superseded Sep 11 afternoon by the ESPO regime event — judgment is now 10/40/50 with a pre-declared reversion; see §2.)*
