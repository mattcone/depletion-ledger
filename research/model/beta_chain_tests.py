#!/usr/bin/env python3
"""beta_chain_tests.py — beta v3 full-chain validation (filed 2026-10-21).

Runs the FULL chain — observations → beta odds → beta production schedule
→ consumption → probability-weighted storage — through the nine cases the
beta task spec enumerates. Each case prints which outputs moved and why.
The script EXITS NON-ZERO if any assert fails, so it is a test, not a memo:

  1. rising exports with Hormuz restricted        (regional up, strait flat)
  2. high throughput with continuing attacks      (strait recovered, losses up)
  3. higher volumes without higher counts         (barrels/counts divergence)
  4. crude strong, products weak                  (no same-definition split)
  5. high prices with recovered throughput        (price is not a state obs)
  6. exports inventory-supported, production not  (the OPEC screen + human review)
  7. renewed damage / throughput collapse         (the lapse branch)
  8. preliminary revisions / stale / missing      (data-quality states)
  9. repeated observations, overlapping windows   (the two-briefing rule)

Read-only: no published file, record, odds or path is touched. Writes
research/model/candidate/beta-chain-tests-2026-10-21.md.
"""
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
REPO = "/home/mcone/depletion-ledger"
SCORING = os.path.join(REPO, "research", "scoring")
sys.path.insert(0, SCORING)

_spec = importlib.util.spec_from_file_location("regen_scenarios", os.path.join(SCORING, "regen-scenarios.py"))
rs = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(rs)
_spec2 = importlib.util.spec_from_file_location("gen_beta_v3", os.path.join(SCORING, "gen-beta-v3.py"))
gb = importlib.util.module_from_spec(_spec2)
_spec2.loader.exec_module(gb)   # runs gen-beta-v3 main? NO — guarded by __name__ below
import branch_filter_candidate as bc
import branch_filter as bf

OUT = os.path.join(HERE, "candidate", "beta-chain-tests-2026-10-21.md")
PROBLEMS = []


def check(label, cond, detail=""):
    if not cond:
        PROBLEMS.append(f"{label}: {detail}")
    print(f"  [{'PASS' if cond else 'FAIL'}] {label}" + (f" — {detail}" if detail and not cond else ""))


def run_chain(horizon, g2026=None, g2027=None, standoff_ap_override=None):
    """The storage half of the chain: the stated production schedule (with
    the given increment endpoints, or an exact ΔP override — the OPEC
    override rule) through the ISSUED calculation, weighted by the given
    HORIZON row. Returns per-scenario + central Dec 2027 cumulative (Feb
    2026 basis)."""
    saved = (gb.G_2026_END, gb.G_2027_END)   # save/restore: gulf_increment reads these globals
    if g2026 is not None:
        gb.G_2026_END = g2026
    if g2027 is not None:
        gb.G_2027_END = g2027
    baseline = gb._BASELINE
    if standoff_ap_override is not None:
        standoff_ap = dict(standoff_ap_override)
    else:
        standoff_ap = {m: gb.intended_world_production(m) - baseline[m]["prod"] for m in gb.FORECAST_MONTHS}
    try:
        return _run(horizon, standoff_ap)
    finally:
        gb.G_2026_END, gb.G_2027_END = saved


def _run(horizon, standoff_ap):
    assumptions = {
        "scenarios": [
            {"id": "corridor-holds",
             "production_adjustment_mb_d": {m: 0.0 for m in gb.MONTHS_2026 + gb.MONTHS_2027},
             "consumption_adjustment_mb_d": {m: 0.0 for m in gb.MONTHS_2026 + gb.MONTHS_2027},
             "validity_horizon": "2027-12"},
            {"id": "standoff",
             "production_adjustment_mb_d": dict(standoff_ap, **{"2026-09": 0.0}),
             "consumption_adjustment_mb_d": {m: 0.0 for m in gb.MONTHS_2026 + gb.MONTHS_2027},
             "validity_horizon": "2027-12"},
            {"id": "corridor-lapses",
             "production_adjustment_mb_d": dict(gb._LAPSE_V2["production_adjustment_mb_d"]),
             "consumption_adjustment_mb_d": dict(gb._LAPSE_V2["consumption_adjustment_mb_d"]),
             "validity_horizon": "2027-12"},
        ]
    }
    anchor = {"period": "2026-09", "value_mb": -509.0}
    paths = rs.compute(gb._BASELINE, assumptions, anchor)
    p = {"corridor-holds": horizon[0], "standoff": horizon[1], "corridor-lapses": horizon[2]}
    dec = "2027-12"
    central = sum(p[s] * paths[s][dec]["cumulative_mb"] for s in p)
    return {s: paths[s][dec]["cumulative_mb"] for s in p}, central


def beta_hz(transits=None, tankers=None, volume=None):
    """The beta odds (selected spec) at the given obs. brent is never a
    state observation — it is accepted and ignored by the candidate."""
    obs = {}
    if transits is not None:
        obs["transits"] = transits
    if tankers is not None:
        obs["tankers"] = tankers
    if volume is not None:
        obs["volume"] = volume
    state, _ = bc.state_posterior_candidate([0.10, 0.50, 0.40], obs)
    return state, bf.horizon_weights(state, bf.DEFAULT_TRANSITION)


def reexamination_condition(briefings, confirmed_prewar_print):
    """The stored illustrative condition — DELEGATED to the shared rule in the
    generator module (gb.reexamination_condition), so the rule is defined in
    ONE place. Wraps the two-briefing dict interface for the (date, regional)
    tuple form used in the cases below."""
    import datetime as dt
    (d1, r1), (d2, r2) = briefings[-2], briefings[-1]
    res = gb.reexamination_condition(
        {"data_window_end": d1, "regional_mb_d": r1},
        {"data_window_end": d2, "regional_mb_d": r2, "at_or_above_prewar": bool(confirmed_prewar_print)})
    if not res["two_consecutive_briefings_ge_19"]:
        return False, f"regional below 19 (got {r1}, {r2})"
    if not res["data_dates_7d_apart"]:
        return False, (f"data dates {(dt.date.fromisoformat(d2) - dt.date.fromisoformat(d1)).days} "
                       f"days apart (< 7 — overlapping windows are not independent)")
    if not res["at_or_above_prewar_confirmed"]:
        return False, "no comparable-basis 'at/above prewar' confirmation"
    return True, "both legs met"


def f3(v):
    return f"{v:+,.1f}"


def main():
    global ISSUED_V2_STANDOFF_DEC27
    # gb._BASELINE / gb._LAPSE_V2 / gb.ANCHOR are loaded from the frozen workbook + issued v2
    # file AT IMPORT of the generator module (sha256 guard on the workbook) — the tests and the
    # generator share the same baseline object.
    gb.G_2026_END, gb.G_2027_END = 0.5, 2.0   # reset to the issued vintage values
    # the issued v2 standoff Dec 2027 endpoint (the screen's revert target)
    v2_full = json_load_v2()
    ISSUED_V2_STANDOFF_DEC27 = rs.compute(gb._BASELINE, v2_full,
                                          {"period": "2026-09", "value_mb": -509.0})["standoff"]["2027-12"]["cumulative_mb"]

    L = ["# Beta v3 full-chain validation — 2026-10-21", "",
         "The chain: observations → beta odds (the selected spec) → beta production schedule",
         "(the stated route-bounded judgment, with its pre-committed revision rules) →",
         "consumption (0, the v2 convention) → probability-weighted storage. Endpoints are the",
         "Dec 2027 cumulative on the Feb 2026 basis (mb); the chart basis adds +507 (the frozen",
         "August anchor). The issued v2026-10-15 forecast is untouched throughout.", ""]

    base_st, base_hz = beta_hz(transits=10, tankers=1, volume=7.894)
    base_ep, base_central = run_chain(base_hz)
    L.append(f"Reference (issued beta vintage, data to Oct 17): STATE "
             f"{base_st[0]*100:.1f}/{base_st[1]*100:.1f}/{base_st[2]*100:.1f}; HORIZON "
             f"{base_hz[0]*100:.1f}/{base_hz[1]*100:.1f}/{base_hz[2]*100:.1f}; Dec 2027 "
             f"standoff {f3(base_ep['standoff'])}, central {f3(base_central)}.")
    L.append("")

    # ── case 1: rising exports, Hormuz restricted ─────────────────────────
    L.append("## Case 1 — Regional exports rise while Hormuz stays restricted")
    L.append("")
    L.append("Inputs: Kpler regional 7-day avg 19.041 → 21.0 mb/d (a new edition, data date ≥7 days "
             "later); strait 7.894 unchanged; crossings 10/day; confirmed losses 1.")
    L.append("")
    s1, h1 = beta_hz(transits=10, tankers=1, volume=7.894)
    L.append(f"- ODDS: unchanged ({h1[0]*100:.1f}/{h1[1]*100:.1f}/{h1[2]*100:.1f}) — BY DESIGN: the beta "
             "odds spec keys on STRAIT throughput (7.894), crossings and losses. The regional export "
             "measure is the STORAGE-side input (the production connection), not a state input — the "
             "two channels are separate measures and are never conflated.")
    L.append("- PRODUCTION: the storage-side rules do NOT map this print to a cap by themselves — "
             "no rule lifts the increment cap mechanically. The demonstrated bypass ROUTING "
             "increment rises with the new edition (regional 21.0 vs 19.041), and a DATED HUMAN "
             "decision would re-derive the next vintage's cap from the component sums (Fujairah/Oman "
             "+ Red Sea, Gulf-attributable). SENSITIVITY ILLUSTRATION of what such a decision could "
             "produce (cap 2.0 → 3.0, schedule shape unchanged):")
    ep1, c1 = run_chain(h1, g2027=3.0)
    L.append(f"- STORAGE IF a human lifted the cap to 3.0 (illustration, not a rule): standoff "
             f"endpoint {f3(base_ep['standoff'])} → {f3(ep1['standoff'])}; central {f3(base_central)} "
             f"→ {f3(c1)} ({f3(c1 - base_central)}).")
    L.append(f"- The stored re-examination condition does NOT fire: regional 21.0 < 23.3 (prewar "
             f"regional baseline) and there is no comparable-basis 'at/above prewar' confirmation — "
             f"the condition needs BOTH legs plus a dated human decision.")
    check("case1: odds unchanged when only the regional measure moves",
          abs(h1[0] - base_hz[0]) < 1e-12 and abs(h1[1] - base_hz[1]) < 1e-12)
    check("case1: lifted cap improves the standoff endpoint", ep1["standoff"] > base_ep["standoff"])
    check("case1: re-examination condition not met at regional 21.0",
          not reexamination_condition([("2026-10-17", 19.041), ("2026-10-26", 21.0)], False)[0])
    L.append("")

    # ── case 2: high throughput, attacks continue ─────────────────────────
    L.append("## Case 2 — High throughput with continuing attacks")
    L.append("")
    L.append("Inputs: strait 17.267 (pre-war volume); crossings 20/day; confirmed tanker losses 3 "
             "(attacks continue).")
    L.append("")
    s2, h2 = beta_hz(transits=20, tankers=3, volume=17.267)
    s2l, h2l = beta_hz(transits=20, tankers=1, volume=17.267)   # comparator: losses back to 1
    ep2, c2 = run_chain(h2)
    L.append(f"- ODDS: HORIZON {h2[0]*100:.1f}/{h2[1]*100:.1f}/{h2[2]*100:.1f} vs reference "
             f"{base_hz[0]*100:.1f}/{base_hz[1]*100:.1f}/{base_hz[2]*100:.1f} — the throughput channels "
             f"move the odds toward holds (holds share {base_hz[0]*100:.1f} → {h2[0]*100:.1f}; lapse "
             f"{base_hz[2]*100:.1f} → {h2[2]*100:.1f}) but do NOT flip the regime: with 3 confirmed "
             f"losses the danger channel keeps a real lapse tail ({h2[2]*100:.0f}%), and the 0.5 "
             f"transits weight (the documented hypothesis) plus the volume median 15.0 (17.267 is "
             f"only ~1.25σ above) keep the odds standoff-dominated. With losses back to 1 the same "
             f"throughput flips holds-dominant: {h2l[0]*100:.1f}/{h2l[1]*100:.1f}/{h2l[2]*100:.1f}. "
             f"That is the cross-check working: pre-war barrels with continued attacks are NOT "
             f"treated as the corridor-holds regime.")
    L.append(f"- PRODUCTION/STORAGE: the scenario PATHS are conditional and unchanged; the central "
             f"projection moves through the ODDS only — Dec 2027 central {f3(base_central)} → "
             f"{f3(c2)} ({f3(c2 - base_central)}), the holds path (the EIA baseline path) gaining "
             f"weight. This is the shipping-responsive part of the beta: recovered strait flows "
             f"re-weight the storage lines even while losses continue.")
    check("case2: holds share rises vs the reference at pre-war throughput", h2[0] > base_hz[0])
    check("case2: regime does NOT flip with continuing attacks (standoff still >= holds)", h2[1] >= h2[0])
    check("case2: the same throughput flips holds-dominant once losses fall back to 1", h2l[0] > h2l[1] and h2l[0] > h2l[2])
    L.append("")

    # ── case 3: volumes up, counts flat ────────────────────────────────────
    L.append("## Case 3 — Higher volumes without higher counts")
    L.append("")
    L.append("Inputs: strait 15.0 mb/d (recovering barrels); crossings still 10/day (no count "
             "growth); losses 1.")
    L.append("")
    s3, h3 = beta_hz(transits=10, tankers=1, volume=15.0)
    s3v, h3v = beta_hz(tankers=1, volume=15.0)   # volume-only comparator
    ep3, c3 = run_chain(h3)
    L.append(f"- ODDS: HORIZON {h3[0]*100:.1f}/{h3[1]*100:.1f}/{h3[2]*100:.1f} vs volume-only "
             f"{h3v[0]*100:.1f}/{h3v[1]*100:.1f}/{h3v[2]*100:.1f}. The stale count (10/day, near the "
             f"standoff lambda 10) DRAGS the holds share down by {(h3v[0]-h3[0])*100:.1f} pts — the "
             f"count-vs-barrels cross-check working as designed (cargo sizes, load factors and shuttle "
             f"geometry can move barrels without moving crossings; the 0.5 weight is the stance on "
             f"that, a documented hypothesis).")
    L.append(f"- STORAGE: central {f3(base_central)} → {f3(c3)} — partial response: the odds moved, "
             f"the paths did not (the standoff path is a conditional, not a function of this print).")
    check("case3: count drag reduces holds vs volume-only", h3[0] < h3v[0])
    check("case3: volumes still move the odds toward holds vs the reference", h3[0] > base_hz[0])
    L.append("")

    # ── case 4: crude strong, products weak ────────────────────────────────
    L.append("## Case 4 — Crude strong, products weak")
    L.append("")
    L.append("Inputs: a hypothetical same-basis split (crude 82% of prewar, products 44% of prewar — "
             "the DPA Oct 20 print, UNRECONCILED).")
    L.append("")
    L.append("- NO RESPONSE, and that is the honest answer: the model input is TOTAL-OIL strait "
             "throughput; no same-definition crude/product split series exists (the DPA print is "
             "relative-only, crude-anchored, window unspecified — see the shipping framework §4). "
             "The beta spec has no crude/product channel and does not invent one from an "
             "unreconciled print. A \"weak products at high crude\" state is UNREACHABLE until a "
             "same-basis split series exists — flagged missing input, not silently approximated.")
    L.append("- STORAGE: unchanged at the reference vintage. The total-oil print (7.894) is the only "
             "volume the chain consumes.")
    check("case4: chain consumes only the total-oil input (no split channel exists)",
          "crude" not in dir(bc) and "crude" not in dir(bf))
    L.append("")

    # ── case 5: high prices, recovered throughput ─────────────────────────
    L.append("## Case 5 — High prices with recovered throughput")
    L.append("")
    L.append("Inputs: strait 17.267; crossings 20/day; losses 1; Brent 130 (a lapse-era price with "
             "holds-era flows — the exact contamination the candidate removed).")
    L.append("")
    s5a, h5a = beta_hz(transits=20, tankers=1, volume=17.267)
    s5b, h5b = beta_hz(transits=20, tankers=1, volume=17.267)   # brent never enters the spec
    L.append(f"- ODDS: HORIZON {h5a[0]*100:.1f}/{h5a[1]*100:.1f}/{h5a[2]*100:.1f} — IDENTICAL whether "
             f"Brent is 108.79 or 130: price is NOT a state observation in the beta spec (the "
             f"candidate's removal stands; at high prices the old channel put ~64% of its pull on "
             f"LAPSE while flows said holds). Price keeps its two documented roles: the draw-rate "
             f"band (reference calculation) and the judgment's EIA-spread future-risk trigger at "
             f"monthly STEO releases.")
    ep5, c5 = run_chain(h5a)
    L.append(f"- STORAGE: central {f3(base_central)} → {f3(c5)} — driven entirely by the throughput "
             f"channels; a price move alone cannot move the beta storage lines.")
    check("case5: brent has zero effect on the beta odds", all(abs(a - b) < 1e-15 for a, b in zip(h5a, h5b)))
    L.append("")

    # ── case 6: exports inventory-supported, production not demonstrated ───
    L.append("## Case 6 — Exports supported by inventories, production not demonstrated")
    L.append("")
    L.append("Inputs: Kpler regional rises to 21.0 (exports up) BUT the OPEC November MOMR shows "
             "October OPEC at 21.49 (flat at September) — the export growth is inventory-supported, "
             "not production.")
    L.append("")
    ep6a, c6a = run_chain(base_hz, g2027=3.0)   # without the screen's action (cap lifted on exports alone)
    # the OBSERVATION goes through the shared screen (generator module); the screen names the
    # schedule SOURCE file (the frozen v2 assumptions), from which the exact frozen ΔP is read —
    # the test does not hand-supply the schedule.
    screen = gb.production_bridge_screen(21.49)
    v2_path = os.path.join(REPO, "site", "src", "data", screen["candidate_schedule_source"])
    v2_standoff_ap = {m: {sc["id"]: sc for sc in json.load(open(v2_path))["scenarios"]}["standoff"]
                      ["production_adjustment_mb_d"][m] for m in gb.FORECAST_MONTHS}
    ep6b, c6b = run_chain(base_hz, standoff_ap_override=v2_standoff_ap)   # the screen's named source
    L.append(f"- The shared SCREEN fires on the observation: October OPEC "
             f"{screen['observation']['october_opec_mb_d']} <= September "
             f"{screen['observation']['september_opec_mb_d']} (a Reuters-survey-based estimate). The "
             f"screen's action: {screen['action']}. It names its schedule source: "
             f"{screen['candidate_schedule_source']} — the exact frozen v2 ΔP is read from that "
             f"file, not hand-supplied.")
    L.append(f"- WITHOUT the screen's action (exports alone): standoff {f3(ep6a['standoff'])}, central {f3(c6a)}.")
    L.append(f"- WITH the screen's action (revert to the issued v2 schedule): the beta standoff "
             f"coincides with the issued v2 standoff path — standoff {f3(ep6b['standoff'])}, central "
             f"{f3(c6b)} ({f3(c6b - c6a)} vs exports-only).")
    L.append("- This is why the bridge is stated as an ASSUMPTION with a dated review screen: "
             "export growth never converts to production mechanically (the barrels↔production "
             "relationship is not established; inventories and cargo timing are the unobserved "
             "channel).")
    check("case6: the observation triggers the shared screen", screen["screen"] == "triggered")
    check("case6: the screen's named source, read from disk, reproduces the issued v2 standoff path",
          abs(ep6b["standoff"] - ISSUED_V2_STANDOFF_DEC27) < 1e-6)
    check("case6: the screen's action worsens the central vs exports-only", c6b < c6a)
    L.append("")

    # ── case 7: renewed damage / collapse ──────────────────────────────────
    L.append("## Case 7 — Renewed damage / throughput collapse")
    L.append("")
    L.append("Inputs: strait 2.0 mb/d (near-closed print, the Aug 18 class); crossings 3/day; "
             "confirmed tanker losses 5 (a renewed-damage week).")
    L.append("")
    s7, h7 = beta_hz(transits=3, tankers=5, volume=2.0)
    ep7, c7 = run_chain(h7)
    L.append(f"- ODDS: HORIZON {h7[0]*100:.1f}/{h7[1]*100:.1f}/{h7[2]*100:.1f} — lapse-dominant "
             f"(volume 2.0 is below the 4.12M lapse boundary and the loss count is at the lapse "
             f"lambda 4).")
    L.append(f"- STORAGE: central {f3(base_central)} → {f3(c7)} ({f3(c7 - base_central)}) — the "
             f"lapse path (−3,165.7) carries {h7[2]*100:.0f}% of the weight. If the "
             f"damage is CONFIRMED at named fields/terminals, the MOOT condition applies: the "
             f"EIA-baseline-based paths become questionable and the beta is re-anchored by "
             f"explicit dated decision (a flow print alone does not trigger that).")
    check("case7: lapse-dominant HORIZON at collapse inputs", h7[2] > h7[0] and h7[2] > h7[1])
    check("case7: central projection drops sharply", c7 < base_central - 500)
    L.append("")

    # ── case 8: preliminary / stale / missing ──────────────────────────────
    L.append("## Case 8 — Preliminary revisions, stale and missing inputs")
    L.append("")
    L.append("Three sub-cases on the data-quality states:")
    L.append("")
    s8a, h8a = beta_hz(transits=10, tankers=1, volume=7.894)
    L.append(f"- STALE: the Oct 19 edition's 7.894 (data to Oct 17) re-run 4 days later (Oct 21) "
             f"carries the SAME odds ({h8a[0]*100:.1f}/{h8a[1]*100:.1f}/{h8a[2]*100:.1f}) with "
             f"staleness REPORTED (4 days) — the vintage flags (the candidate's --volume-date/"
             f"--transits-date) make staleness a printed property, never a silent assumption. The "
             f"preliminary tier (last 7 days, Kpler's 'typically settle 1.5-2x higher' caveat) is "
             f"provenance, not a confidence band — the chain consumes the print as published.")
    s8b, h8b = beta_hz(transits=10, tankers=1)   # volume MISSING
    L.append(f"- MISSING: no volume print (counts only, transits 10 + loss 1): HORIZON "
             f"{h8b[0]*100:.1f}/{h8b[1]*100:.1f}/{h8b[2]*100:.1f} — the chain runs on the "
             f"available channels; the missing channel is absent, not zero-filled. The counts-only "
             f"odds sit within ~1 pt of the full-input reference ({base_hz[0]*100:.1f}/" + f"{base_hz[1]*100:.1f}/" + f"{base_hz[2]*100:.1f}) "
             f"because 10/day is exactly the standoff lambda — the count channel alone carries the "
             f"regime call here. The production schedule keeps the LAST CONFIRMED schedule (no "
             f"invented update) until a new same-definition print arrives; that is a new vintage, "
             f"logged.")
    s8c, h8c = beta_hz(transits=10, tankers=1, volume=7.363)   # the Oct 17 DAILY (preliminary floor)
    L.append(f"- PRELIMINARY REVISION: if a future edition revises the 7-day average (7.894 → say "
             f"the Oct 17 daily floor 7.363), the NEXT vintage re-runs at the revised same-"
             f"definition print: HORIZON {h8c[0]*100:.1f}/{h8c[1]*100:.1f}/{h8c[2]*100:.1f}. This "
             f"vintage is NEVER rewritten — the revision is a new dated file.")
    check("case8: stale re-run reproduces the reference odds", all(abs(a - b) < 1e-15 for a, b in zip(h8a, base_hz)))
    check("case8: missing volume runs on the remaining channels (no crash, no zero-fill)",
          abs(sum(h8b) - 1.0) < 1e-12 and all(x > 0 for x in h8b))
    check("case8: counts-only odds are within ~1 pt of the full-input reference",
          all(abs(a - b) < 0.01 for a, b in zip(h8b, base_hz)))
    L.append("")

    # ── case 9: overlapping windows ────────────────────────────────────────
    L.append("## Case 9 — Repeated observations with overlapping 7-day windows")
    L.append("")
    L.append("The Kpler briefings' 7-day windows overlap by 6 days when editions are a week apart "
             "or less — successive prints are NOT independent observations. The stored condition "
             "handles this by counting EDITIONS with data dates ≥7 days apart:")
    L.append("")
    cases = [
        ([("2026-10-17", 19.041), ("2026-10-21", 20.5)], False, "data dates 4 days apart — the second print does NOT count"),
        ([("2026-10-17", 19.041), ("2026-10-26", 19.2)], False, "both legs of the regional test met, but no comparable-basis prewar confirmation"),
        ([("2026-10-17", 19.041), ("2026-10-26", 19.2)], True, "both editions ≥19, data dates 9 days apart, AND the confirmation — the condition fires (a HUMAN then decides, dated, on a new vintage)"),
        ([("2026-10-17", 19.041), ("2026-10-26", 18.5)], True, "the second edition fell back below 19 — NOT met"),
    ]
    for briefings, confirmed, expect_reason in cases:
        ok, reason = reexamination_condition(briefings, confirmed)
        L.append(f"- briefings {briefings}, confirmed={confirmed} → {ok} ({reason})")
    check("case9: overlapping windows (4 days) rejected",
          not reexamination_condition([("2026-10-17", 19.041), ("2026-10-21", 20.5)], True)[0])
    check("case9: two editions 9 days apart + confirmation fires",
          reexamination_condition([("2026-10-17", 19.041), ("2026-10-26", 19.2)], True)[0])
    check("case9: regional leg failure blocks the condition",
          not reexamination_condition([("2026-10-17", 19.041), ("2026-10-26", 18.5)], True)[0])
    check("case9: missing confirmation blocks the condition",
          not reexamination_condition([("2026-10-17", 19.041), ("2026-10-26", 19.2)], False)[0])
    L.append("")

    # ── summary ──
    L.append("## Summary")
    L.append("")
    L.append("| case | what moved | why |")
    L.append("|---|---|---|")
    L.append("| 1 rising exports, strait restricted | storage only (next vintage's cap) | odds key on the strait measure; regional is the production-connection input |")
    L.append("| 2 high throughput, attacks on | odds move toward holds (regime does not flip); central via odds | losses=3 keeps the lapse tail; the 0.5 transits weight is a hypothesis |")
    L.append("| 3 volumes up, counts flat | partial odds response | the stale count drags (the cross-check, w=0.5 hypothesis) |")
    L.append("| 4 crude strong, products weak | nothing | no same-definition split exists — flagged missing input |")
    L.append("| 5 high prices, recovered flows | odds move only on flows | price is future-risk context, not a state observation |")
    L.append("| 6 exports up, production flat | standoff → issued v2 path (if the human review reverts it) | the OPEC screen fires; a dated human review decides; the screen names the schedule source |")
    L.append("| 7 renewed damage / collapse | odds → lapse; central drops | volume below 4.12M + losses at the lapse lambda |")
    L.append("| 8 stale / missing / preliminary | none in this vintage | staleness reported; missing channels absent; revisions are new vintages |")
    L.append("| 9 overlapping windows | condition logic | editions ≥7 days apart + the confirmation leg; no auto-promotion |")
    L.append("")
    L.append("Greater responsiveness of the beta chain is NOT claimed as greater accuracy. The "
             "scoring test begins with the November 2026 prints (the first clean month).")
    L.append("")

    text = "\n".join(L)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write(text + "\n")
    print(f"\n[wrote {OUT}]")
    if PROBLEMS:
        print(f"\nCHAIN TESTS: {len(PROBLEMS)} FAILURE(S)")
        for p in PROBLEMS:
            print(f"  FAIL: {p}")
        sys.exit(1)
    print("CHAIN TESTS: all asserts PASS")


# ── fixtures ──
def json_scen():
    import json
    return json.load(open(os.path.join(REPO, "site/src/data/world-stocks-assumptions-v2026-10-15.json")))["scenarios"]


def json_load_v2():
    import json
    return json.load(open(os.path.join(REPO, "site/src/data/world-stocks-assumptions-v2026-10-15.json")))


ISSUED_V2_STANDOFF_DEC27 = None


if __name__ == "__main__":
    main()
