#!/usr/bin/env python3
"""Generate a beta-v3 world-stocks forecast vintage (vintage-safe writer).

Beta v3 = published scenario structure (holds/lapse paths identical to the
issued v2; the published forecast is untouched) + the reviewed candidate
filter's odds (spec v3) + a shipping-informed production path for the
standoff branch.

Production path (the new content):
  World P (beta standoff) = ANCHOR + g(t) + the issued v2 non-Gulf pace,
  where ANCHOR = September 2026 world production READ FROM THE FROZEN EIA
  WORKBOOK (2026-09 column, full precision — never hand-entered; the first
  bytes of this vintage hand-entered the 2026-10 value, 102.10, and were
  re-issued). g(t) is the frozen v3 schedule: 0 at the September anchor,
  G_2026_END/3 per month through 2026, then G_2026_END + (G_2027_END -
  G_2026_END)*m/12 across 2027 (see gulf_increment). The g caps are a
  JUDGMENT bounded by (not equal to) the demonstrated bypass ROUTING
  increment above prewar — routing is not production (see route_basis in
  the assumptions file).

Storage math: this generator reuses regen-scenarios.compute() — the exact
code path of the published pipeline — on a synthesized assumptions dict (the
v2 scenarios with the standoff production adjustment replaced). The
self-checks assert the holds and lapse paths reproduce the ISSUED records'
endpoints to 1e-9, and that the same computation reproduces the issued v2
standoff endpoint (sanity that compute + inputs are right).

Vintage safety and writer invariants (second external review, 2026-10-21:
  a new-date run crashed with KeyError, and a failed validation had already
  replaced both files — both fixed, both pinned by
  research/scoring/test_gen_beta_writer.py):
  - both output files are named from the full vintage identity (--version,
    e.g. beta-v3-2026-10-21); a new date is a new file;
  - writing over a file whose stored version differs is REFUSED (earlier
    vintages are frozen); re-issuing the same vintage requires --reissue and
    records the superseded bytes' sha256 in the artifact;
  - ALL self-checks — the pre-write checks AND the serialized-pair
    consistency checks, run against the payloads — complete BEFORE any file
    is replaced; a failed run never touches existing bytes. (The artifact's
    checks block records the pre-write checks + endpoints, matching the
    frozen v3 artifact's shape; the pair checks are runtime gates.)
  - writes are atomic: temp write → temp-byte verify → rename → final-byte
    verify, with restore-from-snapshot on the final mismatch and no .tmp
    left behind on any path.
  Pair-wide rollback (round 3, same day): BOTH writes are wrapped in one
  rollback handler — if the second file's write or verification fails after
  the first has been replaced, both files are restored to their pre-run bytes
  (or both new outputs removed), and temps are cleaned, so a handled I/O
  failure never leaves a mismatched assumptions/records pair.
  Test hooks (never use for a real issue): --data-dir (isolated output dir),
  --failure-injection pre|post|second (force the failure modes to prove the
  invariants: pre = a self-check fails before the write; post = the FIRST
  file's temp bytes are corrupted; second = the second rename raises an
  ordinary I/O error after the first file has been replaced — the round-3
  reproduction).

Module level (imported by research/model/beta_chain_tests.py):
  _BASELINE, ANCHOR, ANCHOR_MONTH, G_2026_END, G_2027_END,
  MONTHS_2026, MONTHS_2027, FORECAST_MONTHS, _LAPSE_V2, _V2_SC,
  gulf_increment(m), non_gulf(m), intended_world_production(m)
  production_bridge_screen(october_opec_mb_d)  -> a SCREEN that triggers a
      dated human review of the export->production bridge (not a
      determination: the September reference is a Reuters-survey-based
      OPEC estimate and the comparison conflates agency/measurement bases);
  reexamination_condition(briefing_a, briefing_b) -> the stored two-briefing
      rule that schedules a human re-examination of the storage path.
  Neither rule function emits a schedule by itself; the schedule comes from
  a dated human decision, and the tests supply OBSERVATIONS, not schedules.

Run:  python3 research/scoring/gen-beta-v3.py [--reissue] [flags]
Test: python3 research/scoring/test_gen_beta_writer.py (writer invariants)
The v3-vintage values are the defaults; the route_basis evidence and the
bridge text are vintage-specific and must be reviewed at each (re-)issue.
"""
from __future__ import annotations

import argparse
import copy
import datetime
import hashlib
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
SITE_DATA = REPO / "site" / "src" / "data"
WORKBOOK = REPO / "research" / "sources" / "eia-steo-2026-10-06.xlsx"
WORKBOOK_SHA = "54989362410da4aff5673580396380c3a8f4f111fa6d01c6d4fab05ef90efbf4"
PUBLISHED = "world-stocks.json"
V2_ASSUMPTIONS = "world-stocks-assumptions-v2026-10-15.json"

DEFAULTS = {
    "version": "beta-v3-2026-10-21",
    "issued": "2026-10-21",
    "data_cutoff": "2026-10-17",
    "transits": 10, "tankers": 1, "volume": 7.894, "brent_context": 108.79,
    # Gulf-recovery increment caps (mb/d above the September anchor at year end).
    # JUDGMENT values; must sit at or below the demonstrated bypass ROUTING
    # increment above prewar (route_basis) — which bounds new production only
    # because September (strait closed) was already forced to use at least
    # the prewar bypass level.
    "g2026_end": 0.5, "g2027_end": 2.0,
}

ANCHOR_MONTH = "2026-09"
NON_GULF_ANNUAL = 2.0   # the v2 standoff's non-Gulf pace (0 in 2026; +1/6 mb/d per month in 2027)

SEPTEMBER_OPEC_MBD = 21.49  # OPEC Sep 2026 (OPEC Sep 8 press release; MOMR table = Reuters survey)


# --- frozen baseline (module level; the chain tests import it) --------------

def _sha256_of(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _load_baseline() -> dict:
    if _sha256_of(WORKBOOK) != WORKBOOK_SHA:
        raise SystemExit("EIA workbook hash changed — the baseline is no longer the frozen one; "
                         "STOP and re-derive the v2/v3 assumptions deliberately")
    sys.path.insert(0, str(HERE))
    import importlib.util
    spec = importlib.util.spec_from_file_location("rs", HERE / "regen-scenarios.py")
    rs = importlib.util.module_from_spec(spec); spec.loader.exec_module(rs)
    return rs.load_baseline(WORKBOOK)


_BASELINE = _load_baseline()

# ANCHOR: September 2026 world production, read from the frozen workbook at
# import time (full precision). 2026-09 = 101.3038 and 2026-10 = 102.1047 in
# the same workbook: different months. The first bytes of this vintage
# hand-entered the 2026-10 value as the anchor; the correction log in the
# method doc records the reversal.
ANCHOR = _BASELINE[ANCHOR_MONTH]["prod"]

_v2 = json.load(open(SITE_DATA / V2_ASSUMPTIONS))
_V2_SC = {s["id"]: s for s in _v2["scenarios"]}
_LAPSE_V2 = _V2_SC["corridor-lapses"]

MONTHS_2026 = [m for m in _BASELINE if m[:4] == "2026" and m > "2026-09"]   # 2026-10..12
MONTHS_2027 = [m for m in _BASELINE if m[:4] == "2027"]                     # 2027-01..12
FORECAST_MONTHS = MONTHS_2026 + MONTHS_2027

# Gulf-recovery increment caps — module globals so the chain tests can sweep
# them (save/restore around a case).
G_2026_END = DEFAULTS["g2026_end"]
G_2027_END = DEFAULTS["g2027_end"]


def gulf_increment(m: str) -> float:
    """The stated Gulf-recovery increment g(t) for month m (mb/d above the
    September anchor). The frozen v3 schedule: g = 0 at the September anchor,
    ramping G_2026_END/3 per month through 2026 (Oct 1/3, Nov 2/3, Dec 1 of
    G_2026_END) and then G_2026_END + (G_2027_END - G_2026_END) * m/12 across
    2027 (0.125 mb/d per month at the v3 caps). Do not change the shape in a
    re-issue — a different schedule is a different vintage."""
    if m <= "2026-12":
        return G_2026_END * (int(m[5:7]) - 9) / 3.0
    return G_2026_END + (G_2027_END - G_2026_END) * int(m[5:7]) / 12.0


def non_gulf(m: str) -> float:
    """The issued v2 non-Gulf pace: 0 in 2026; +1/6 mb/d per month in 2027."""
    return 0.0 if m < "2027-01" else (int(m[5:7]) / 12.0) * NON_GULF_ANNUAL


def intended_world_production(m: str) -> float:
    """The beta standoff's stated world production for month m:
    September anchor + g(t) + non-Gulf pace."""
    return ANCHOR + gulf_increment(m) + non_gulf(m)


# --- observation -> decision rules (shared with research/model/beta_chain_tests.py)

def production_bridge_screen(october_opec_mb_d: float,
                             september_opec_mb_d: float = SEPTEMBER_OPEC_MBD) -> dict:
    """SCREEN (not a determination) for the export->production bridge.

    An OPEC/MOMR October aggregate at or below the September aggregate
    screens IN a dated human review of the bridge. It is only a screen:
    21.49 is a Reuters-survey-based September OPEC estimate, and a future
    MOMR aggregate on a different agency/measurement basis does not by
    itself establish Gulf or world production. The review decides, by dated
    judgment, whether the next vintage's standoff schedule reverts to the
    issued v2 schedule. This function returns the decision and its candidate
    schedule SOURCE; it never emits a schedule itself."""
    triggered = october_opec_mb_d <= september_opec_mb_d
    return {
        "screen": "triggered" if triggered else "not triggered",
        "observation": {
            "october_opec_mb_d": october_opec_mb_d,
            "september_opec_mb_d": september_opec_mb_d,
            "september_basis": "Reuters-survey-based OPEC September estimate (OPEC Sep 8 press release)",
        },
        "action": ("dated human review of the export->production bridge; if the production "
                   "evidence does not support the bridge, the next vintage's standoff schedule "
                   "reverts to the issued v2 standoff schedule (its exact frozen delta-P, read "
                   f"from {V2_ASSUMPTIONS})") if triggered
                  else "no action; the bridge stands until the next scheduled review (OPEC Nov "
                       "MOMR ~Nov 10, then monthly)",
        "candidate_schedule_source": V2_ASSUMPTIONS if triggered else None,
    }


def reexamination_condition(briefing_a: dict, briefing_b: dict) -> dict:
    """The stored two-briefing condition (identical in the candidate filter's
    review and here). A MANUAL rule that schedules a human re-examination of
    the storage path — not a learned process, not a trigger by itself."""
    a_date = datetime.date.fromisoformat(briefing_a["data_window_end"])
    b_date = datetime.date.fromisoformat(briefing_b["data_window_end"])
    span_ok = (b_date - a_date).days >= 7
    level_ok = (briefing_a.get("regional_mb_d") or 0) >= 19.0 and \
               (briefing_b.get("regional_mb_d") or 0) >= 19.0
    confirmed = bool(briefing_b.get("at_or_above_prewar", False))
    return {
        "met": bool(level_ok and span_ok and confirmed),
        "two_consecutive_briefings_ge_19": level_ok,
        "data_dates_7d_apart": span_ok,
        "at_or_above_prewar_confirmed": confirmed,
    }


def close(x: float, y: float, tol: float = 1e-9) -> bool:
    return abs(x - y) <= tol


def main() -> None:
    global G_2026_END, G_2027_END
    ap = argparse.ArgumentParser(description="beta-v3 vintage writer")
    for k, v in DEFAULTS.items():
        ap.add_argument(f"--{k.replace('_', '-')}", default=v)
    ap.add_argument("--reissue", action="store_true",
                    help="re-issue THIS vintage over its existing (same-version) files; "
                         "records the superseded bytes' sha256")
    ap.add_argument("--data-dir", default=None,
                    help="output directory for the two beta files (default: site/src/data). "
                         "Test hook for isolated runs; the published + v2 references always "
                         "come from site/src/data regardless.")
    ap.add_argument("--failure-injection", choices=["pre", "post", "second"], default=None,
                    help="TEST HOOK (never use for a real issue): pre = force a self-check "
                         "failure BEFORE the write gate (proves no file is touched); "
                         "post = corrupt the first file's temp bytes so the temp verification "
                         "must abort the replace; second = make the second rename raise an "
                         "ordinary I/O error after the first file has been replaced (the "
                         "round-3 reproduction — the pair-wide rollback must restore both).")
    a = ap.parse_args()
    DATA_DIR = Path(a.data_dir).expanduser().resolve() if a.data_dir else SITE_DATA
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    FAILURE_INJECTION = a.failure_injection

    VERSION = a.version
    if not re.fullmatch(r"beta-v\d+-\d{4}-\d{2}-\d{2}", VERSION):
        raise SystemExit("--version must look like beta-v3-2026-10-21 (spec + issue date)")
    for name in ("issued", "data_cutoff"):
        try:
            setattr(a, name, datetime.date.fromisoformat(getattr(a, name)))
        except ValueError:
            raise SystemExit(f"--{name.replace('_', '-')} must be a date (YYYY-MM-DD)")
    ISSUED, CUTOFF = a.issued, a.data_cutoff
    if ISSUED < CUTOFF:
        raise SystemExit("--issued cannot precede --data-cutoff")
    G_2026_END, G_2027_END = float(a.g2026_end), float(a.g2027_end)
    if not (0.0 <= G_2026_END <= G_2027_END <= 2.65):
        raise SystemExit("g caps must satisfy 0 <= g2026_end <= g2027_end <= 2.65 "
                         "(the demonstrated bypass routing increment above prewar)")

    ASSUMPTIONS_OUT = DATA_DIR / f"world-stocks-assumptions-{VERSION}.json"
    RECORDS_OUT = DATA_DIR / f"world-stocks-{VERSION}.json"

    # --- vintage safety -------------------------------------------------------
    superseded: dict[str, str] = {}
    prior_chains: dict[str, list] = {}
    for path in (ASSUMPTIONS_OUT, RECORDS_OUT):
        if not path.exists():
            continue
        try:
            existing = json.loads(path.read_text())
        except Exception:
            raise SystemExit(f"refusing to write {path.name}: existing file is not valid JSON")
        if existing.get("version") != VERSION:
            raise SystemExit(f"refusing to overwrite EARLIER VINTAGE {path.name} "
                             f"(stored version {existing.get('version')!r}); a new observation "
                             "needs a new --version/date")
        if not a.reissue:
            raise SystemExit(f"{path.name} already exists for this vintage; pass --reissue to "
                             "re-issue it (and log the supersession)")
        superseded[path.name] = _sha256_of(path)
        prior = list(existing.get("supersession_chain", []))
        if not prior and isinstance(existing.get("supersedes_sha256"), dict) \
                and path.name in existing["supersedes_sha256"]:
            # legacy format (pre-chain): carry the recorded entry forward so the
            # chain stays complete across the format change
            prior = [{"sha256": existing["supersedes_sha256"][path.name],
                      "replaced_by": VERSION, "replaced_on": ISSUED.isoformat(),
                      "note": "legacy supersedes_sha256 entry (pre-chain format)"}]
        prior_chains[path.name] = prior

    # --- published records (the identity references) ---------------------------
    pub_ws = json.load(open(SITE_DATA / PUBLISHED))
    pub_recs = {r["record_id"]: r for r in pub_ws["forecast_records"]}
    v2_stand_rec = pub_recs["scenario-standoff-2026-10-15-global-observed"]
    v2_hold_rec = pub_recs["scenario-corridor-holds-2026-10-15-global-observed"]
    v2_lapse_rec = pub_recs["scenario-corridor-lapses-2026-10-15-global-observed"]
    rebase = {"period": v2_stand_rec["rebase_start"]["period"],
              "value_mb": float(v2_stand_rec["rebase_start"]["value_mb"])}
    anchor_obj = dict(v2_stand_rec["anchor"])
    anchor_obs = dict(v2_stand_rec["anchor_observation"])
    rebase_obj = dict(v2_stand_rec["rebase_start"])

    # --- the beta standoff schedule ---------------------------------------------
    intended_P = {m: intended_world_production(m) for m in FORECAST_MONTHS}
    beta_dp = {m: round(intended_P[m] - _BASELINE[m]["prod"], 6) for m in FORECAST_MONTHS}
    beta_dp["2026-09"] = 0.0   # coverage entry (compute() starts at 2026-10), as in the v2 file

    v2_dec_P = _BASELINE["2027-12"]["prod"] + _V2_SC["standoff"]["production_adjustment_mb_d"]["2027-12"]
    beta_dec_P = intended_P["2027-12"]
    eia_dec_P = _BASELINE["2027-12"]["prod"]

    # --- storage paths: the published pipeline's own computation -----------------
    import importlib.util
    spec = importlib.util.spec_from_file_location("rs2", HERE / "regen-scenarios.py")
    rs = importlib.util.module_from_spec(spec); spec.loader.exec_module(rs)
    beta_assumptions = copy.deepcopy(_v2)
    beta_assumptions["scenarios"] = [
        (dict(sc, production_adjustment_mb_d=dict(beta_dp)) if sc["id"] == "standoff" else sc)
        for sc in _v2["scenarios"]
    ]
    comp_beta = rs.compute(_BASELINE, beta_assumptions, rebase)
    comp_v2 = rs.compute(_BASELINE, _v2, rebase)

    holds, beta_stand, lapses = (comp_beta["corridor-holds"], comp_beta["standoff"],
                                 comp_beta["corridor-lapses"])
    central = {m: None for m in FORECAST_MONTHS}  # filled after the odds run

    # --- the odds (frozen with the vintage) --------------------------------------
    sys.path.insert(0, str(REPO / "research" / "model"))
    import branch_filter as bf
    import branch_filter_candidate as bc
    state, _note = bc.state_posterior_candidate([0.10, 0.50, 0.40],
                                                {"transits": a.transits, "tankers": a.tankers,
                                                 "volume": a.volume})
    hz = bf.horizon_weights(state, bf.DEFAULT_TRANSITION)
    h, s, l = hz
    for m in FORECAST_MONTHS:
        central[m] = h * holds[m]["cumulative_mb"] + s * beta_stand[m]["cumulative_mb"] + l * lapses[m]["cumulative_mb"]

    # --- self-checks ---------------------------------------------------------------
    checks = {
        "holds_reproduces_issued_v2_endpoint":
            close(holds["2027-12"]["cumulative_mb"], v2_hold_rec["endpoint"]["cumulative_mb"], 1e-9),
        "lapses_reproduce_issued_v2_endpoint":
            close(lapses["2027-12"]["cumulative_mb"], v2_lapse_rec["endpoint"]["cumulative_mb"], 1e-9),
        "same_compute_reproduces_issued_v2_standoff_endpoint":
            close(comp_v2["standoff"]["2027-12"]["cumulative_mb"], v2_stand_rec["endpoint"]["cumulative_mb"], 1e-9),
        "anchor_is_workbook_2026_09_not_2026_10":
            close(ANCHOR, _BASELINE[ANCHOR_MONTH]["prod"], 1e-12)
            and abs(_BASELINE["2026-10"]["prod"] - ANCHOR) > 0.5
            and close(ANCHOR, 101.3037931, 1e-6),
        "standoff_matches_stated_schedule_every_month":
            all(close(beta_dp[m], intended_P[m] - _BASELINE[m]["prod"], 5e-7) for m in FORECAST_MONTHS),
        "intended_2027_12_is_anchor_plus_caps":
            close(intended_P["2027-12"], ANCHOR + G_2027_END + NON_GULF_ANNUAL, 1e-12),
        "positioning_v2_lt_beta_lt_eia_dec2027":
            close(v2_dec_P, 103.3005152, 1e-4) and v2_dec_P < beta_dec_P < eia_dec_P,
        "central_is_probability_weighted_sum_monthly":
            all(close(central[m],
                      h * holds[m]["cumulative_mb"] + s * beta_stand[m]["cumulative_mb"]
                      + l * lapses[m]["cumulative_mb"], 1e-9) for m in FORECAST_MONTHS),
        "anchors_agree_with_published":
            anchor_obj["value_mb"] == v2_hold_rec["anchor"]["value_mb"]
            and anchor_obj["period"] == v2_hold_rec["anchor"]["period"],
    }

    odds = {
        "spec": ("beta odds spec v3 = the reviewed candidate filter (branch_filter_candidate.py), "
                 "unchanged — prior 0.10/0.50/0.40; volume lognormal 15.0/8.5/2.0 sigma 0.35 w=1.0; "
                 "transits Poisson 20/10/2 w=0.5 (hypothesis); tankers Poisson 0.2/1.5/4.0 w=0.5; "
                 "brent NOT a state observation; the documented state->horizon transition table"),
        "spec_ref": "research/model/candidate/beta-odds-evaluation-2026-10-21.md (section: Selected beta odds spec)",
        "inputs": {
            "transits": a.transits, "transits_date": CUTOFF.isoformat(),
            "tankers": a.tankers, "volume": a.volume, "volume_date": CUTOFF.isoformat(),
            "brent_context": a.brent_context,
            "brent_note": "context only — not a state observation in the beta odds",
        },
        "prior": [0.1, 0.5, 0.4],
        "state_unrounded": list(state),
        "horizon_unrounded": list(hz),
        "mapping_note": ("The HORIZON row is the issue-date estimate of the corridor regime for the "
                         "forecast horizon; the state->horizon transition is already folded in ONCE. "
                         "It weights the three scenario paths with a FIXED weight across the whole "
                         "horizon — no time-varying re-transition (that would double-count the "
                         "transition). The HORIZON is NOT a confidence interval over the storage lines."),
    }

    assumptions_ref = {"path": f"site/src/data/{ASSUMPTIONS_OUT.name}", "sha256": None,
                       "note": "frozen at issue — this record validates only against this snapshot"}

    # --- assumptions file -----------------------------------------------------------
    # Re-issue metadata — built ONLY when re-issuing. A fresh vintage (no
    # existing files) must not dereference superseded entries; the second
    # external review found a KeyError here on a new-date run.
    reissue_meta = {}
    if superseded:
        reissue_meta = {
            "supersedes_sha256": superseded,
            "supersession_chain": prior_chains.get(ASSUMPTIONS_OUT.name, []) +
                                  [{"sha256": superseded[ASSUMPTIONS_OUT.name],
                                    "replaced_by": VERSION, "replaced_on": ISSUED.isoformat()}],
            "issue_note": ("re-issue of this same vintage (same date): the first bytes carried a "
                           "hand-entered anchor of 102.10 mb/d — the workbook's 2026-10 value, not "
                           "2026-09's 101.3038. The anchor is now read from the 2026-09 column at "
                           "build time; the route_basis and revision-rule text were also corrected "
                           "(Sidi Kerir origin attribution withdrawn; the OPEC comparison reframed "
                           "as a manual-review screen). The first bytes were never deployed to "
                           "production. See the method doc's correction log."),
        }

    assumptions = {
        "version": VERSION,
        "issued": ISSUED.isoformat(),
        "experimental": True,
        "description": (
            f"Beta storage forecast assumptions ({VERSION}), issued {ISSUED.isoformat()} (data cutoff "
            f"{CUTOFF.isoformat()}). EXPERIMENTAL: a shipping-responsive beta layered over the issued "
            "v2026-10-15 forecast, which remains unchanged and authoritative. Same baseline (EIA STEO "
            "Oct 6 edition, frozen workbook), same reference frame (chart anchor 2026-08/-507; "
            "rebase_start 2026-09/-509), same production-minus-consumption calculation (the published "
            "pipeline's own compute function). Two differences from v2: (1) the standoff branch allows "
            f"PARTIAL Gulf recovery through alternative routes while attacks continue and the strait "
            f"stays restricted — world production = September 2026 world production in the frozen EIA "
            f"baseline ({ANCHOR:.4f} mb/d, read from the workbook's 2026-09 column at build time) + "
            f"gulf increment g (0 -> +{G_2026_END} by end-2026 -> +{G_2027_END} by end-2027 — a "
            "JUDGMENT bounded by the demonstrated bypass ROUTING increment above prewar routing; "
            "routing is not production, see route_basis) + non-Gulf growth at the issued v2 pace "
            "(0 in 2026; +1/6 mb/d per month in 2027); consumption 0 (the v2 convention). By Dec 2027 "
            f"the beta standoff's world production ({beta_dec_P:.2f}) sits BETWEEN the issued v2 "
            f"standoff ({v2_dec_P:.2f} = September level + non-Gulf) and the EIA baseline "
            f"({eia_dec_P:.2f}, which assumes a large 2027 recovery): more production recovery than "
            "the issued standoff allows, far less than the EIA base case. (2) the central projection "
            "is weighted by the BETA odds (the reviewed candidate spec at the freshest "
            "same-definition inputs), not the published judgment odds. The corridor-holds and "
            "corridor-lapses paths are identical to the issued v2 paths (same scenario definitions; "
            "the lapse closure path was not tested in September and is not re-invented here)."),
        **reissue_meta,
        "baseline": {
            "source": "EIA Short-Term Energy Outlook (STEO), released 6 Oct 2026 (workbook retrieved 6 Oct 2026)",
            "archive": f"research/sources/eia-steo-2026-10-06.xlsx (sha256 {WORKBOOK_SHA})",
            "series": {
                "production_mb_d": "papr_world (Table 3a, World total oil production)",
                "consumption_mb_d": "dmand_world (Table 3a, World total oil consumption)",
            },
            "note": "identical to the issued v2 baseline (same frozen workbook, same sha256)",
        },
        "production_connection": {
            "anchor_level_mb_d": ANCHOR,
            "anchor_basis": (
                f"September 2026 world production in the frozen EIA STEO (Oct 6 edition) baseline — "
                f"{ANCHOR:.4f} mb/d, read from the workbook's 2026-09 column at build time (full "
                "precision; never hand-entered). The 2026-10 column in the same workbook is "
                "102.1047 mb/d: a different month. The first bytes of this vintage hand-entered the "
                "2026-10 value and were re-issued (see issue_note and the method doc's correction "
                "log)."),
            "gulf_increment_mb_d": {m: round(gulf_increment(m), 6) for m in FORECAST_MONTHS},
            "non_gulf_mb_d": {m: round(non_gulf(m), 6) for m in FORECAST_MONTHS},
            "intended_world_production_mb_d": {m: round(intended_P[m], 4) for m in FORECAST_MONTHS},
            "route_basis": {
                "source": "Kpler media briefing 19 Oct 2026 (flow data to 17 Oct 2026; archived at research/data/kpler/kpler-briefing-2026-10-19/)",
                "fujairah_oman_kbd": {"current_7d_avg": 4563, "prewar": 3416, "increment": 1147},
                "red_sea_kbd": {
                    "current_7d_avg": 4304, "prewar": 2803, "increment": 1501,
                    "caveat": ("includes cargo with no confirmed load terminal; Sidi Kerir (Sumed) "
                               "~1 mb/d — the source does NOT establish the cargo origin: the Sumed "
                               "pipeline connects the Red Sea to the Mediterranean, so a "
                               "Mediterranean loading port does not exclude Gulf origin"),
                },
                "gulf_attributable_increment_kbd": [1147, 2648],
                "gulf_attributable_note": (
                    "This is a demonstrated ROUTING increment above prewar, NOT a measured production "
                    "increment. New production available through bypass beyond September is bounded "
                    "above by the increment above the routing level September was already using — at "
                    "most the full prewar-vs-now increment (2,648 kbd) — and the lower bound keeps "
                    "all of the Red Sea increment unattributed. Some of the increment may be route "
                    "substitution of EXISTING production or inventory drawdown rather than new "
                    "production. The g caps (0.5 / 2.0) are a JUDGMENT inside this routing bound, not "
                    "a demonstrated production level."),
                "go_o_sts_kbd": {
                    "current_7d_avg": 2280, "prewar": 0,
                    "treatment": "NOT counted — a transloading activity; the cargo still transits the strait (no double-counting)",
                },
                "strait_treatment": "the strait stays at its observed restricted level (no normalization — that is the corridor-holds branch); no further strait decline assumed",
                "component_sums": "10,173 (strait clearance) = 7,894 (strait) + 2,280 (STS); 19,041 (regional) = 10,173 + 4,563 + 4,304 — component sums reproduce the briefing's totals",
            },
            "inventory_bridge": (
                "stated assumption (bounded ±0.5 mb/d equivalent): Gulf domestic use flat, Gulf "
                "regional inventories roughly flat, so Gulf production growth tracks Gulf export "
                "growth on the bypass channel. An assumption, not a measurement. The alternative "
                "reading — that the increment draws down Gulf inventory rather than new production — "
                "would put the true production path BELOW the beta standoff; the issued beta shows a "
                "single central line and does not represent that sensitivity. See the revision rule."),
        },
        "scenarios": [
            dict(sc) if sc["id"] != "standoff" else {
                **sc,
                "definition": ("Attacks continue and the strait stays restricted at its observed "
                               "level; Gulf production recovers PARTIALLY through alternative routes "
                               "(Fujairah/Oman, Saudi west coast via the Red Sea) — the substantive "
                               "difference from the issued v2 standoff, which allows no net Gulf "
                               "recovery. The beta path allows the demonstrated bypass increment to "
                               "convert to production at the capped pace g(t); by Dec 2027 its world "
                               f"production ({beta_dec_P:.2f}) sits between the issued v2 standoff "
                               f"({v2_dec_P:.2f}) and the EIA baseline ({eia_dec_P:.2f})."),
                "production_adjustment_mb_d": dict(beta_dp),
                "rationale": (
                    "beta-v3 change (the shipping-to-production connection): the v2 standoff holds "
                    "world production at the September level (101.3038 mb/d) plus the non-Gulf pace "
                    "— i.e. no net Gulf recovery — because no Gulf field/terminal damage was confirmed "
                    "and the bypass was demonstrably working (8.87 mb/d, +43% vs prewar, Kpler Oct "
                    "19). The beta standoff instead allows the demonstrated bypass routing increment "
                    "to convert to NEW Gulf production at a capped pace: g = 0 at the September "
                    "anchor -> +0.167 at 2026-10 -> +0.5 at end-2026 -> +2.0 at end-2027, a "
                    "JUDGMENT bounded by (not equal to) the routing "
                    "increment (1,147–2,648 kbd above prewar, of which the Sidi Kerir ~1 mb/d has no "
                    "established origin and some may be route substitution of existing production). "
                    "delta-P is computed against the frozen EIA baseline exactly like the v2 records "
                    "(negative in 2027 because the EIA baseline itself recovers to ~111.5)."),
            } for sc in _v2["scenarios"]
        ],
        "odds": odds,
        "revision_rules": [
            ("REVIEW SCREEN (the export->production bridge): the OPEC November MOMR (~Nov 10) is the "
             "first direct observation. An October OPEC aggregate at or below the September aggregate "
             "(21.49 mb/d — a Reuters-survey-based September OPEC estimate) SCREENS IN a dated human "
             "review of the bridge. The comparison is a screen, not a determination: the agency and "
             "measurement bases differ, and an OPEC aggregate at or below that threshold does not by "
             "itself establish Gulf or world production. If the review finds the production evidence "
             "does not support the bridge, the next vintage's standoff schedule reverts to the issued "
             "v2026-10-15 standoff schedule (its exact frozen delta-P) — the beta standoff then "
             "coincides with the issued v2 standoff path. Nothing resets automatically."),
            ("RE-EXAMINATION (the stored illustrative condition, verbatim): two consecutive Kpler "
             "briefings with the regional 7-day avg at or above 19 mb/d (data dates at least 7 days "
             "apart) AND a comparable-basis confirmation of the 'total Middle East flows at/above "
             "prewar' print (definition + window printed). If it fires, a HUMAN decision (dated, "
             "logged) issues a new vintage with a standoff schedule between the beta standoff and the "
             "EIA baseline — no automatic promotion."),
            ("MOOT: confirmed damage to named Gulf fields/terminals makes the EIA-baseline-based "
             "paths questionable; the beta vintages are then re-anchored by explicit decision."),
            ("NEW VINTAGE: any material new observation (Kpler edition, OMR, MOMR, STEO) issues a NEW "
             "dated beta file; this vintage is frozen and is never rewritten. The generator refuses "
             "to write over an earlier vintage's bytes; a same-vintage re-issue requires an explicit "
             "flag and records the superseded bytes' hash here."),
        ],
        "scoring": (
            "November 2026 is the first clean score for this vintage. Scoring is a MANUAL procedure "
            "for now (read the November print, compute the delta from each record's targets, append "
            "to the score history in research/). No automatic scoring adapter for beta files exists "
            "yet; do not claim one."),
    }

    # --- records (same shape as the published v2 records) ---------------------------
    def targets_for(series):
        out = []
        for m in FORECAST_MONTHS:
            y, mm = int(m[:4]), int(m[5:7])
            m_end = datetime.date(y + 1, 1, 1) if mm == 12 else datetime.date(y, mm + 1, 1)
            before = ISSUED < m_end
            out.append({
                "period": m,
                "target_monthly_mb": series[m]["monthly_mb"],
                "target_cumulative_mb": series[m]["cumulative_mb"],
                "issued_before_outcome": before,
                "issued_before_outcome_note": (
                    "issued during or before this month; the month's print is pending — frozen at "
                    "issue, scored exactly once" if before else
                    "this month was fully elapsed at issue; the outcome is already reported — scored "
                    "as a historical record, not a live forecast"),
                "outcome_first_release": {"monthly_mb": None, "monthly_published": None,
                                          "cumulative_mb": None, "cumulative_published": None},
                "outcome_latest": {"monthly_mb": None, "monthly_published": None,
                                   "cumulative_mb": None, "cumulative_published": None,
                                   "revisions": 0, "published_date": None},
            })
        return out

    baseline_str = (f"EIA STEO, released 6 Oct 2026 (frozen workbook, sha256 {WORKBOOK_SHA}) + beta v3 "
                    f"adjustments (assumptions version {VERSION}, sha256 FILL)")

    def record(rid, scenario_label, series):
        return {
            "record_id": rid,
            "type": "model-projection",
            "scenario": scenario_label,
            "beta_of": "world-stocks v2026-10-15 (issued; unchanged)",
            "baseline": baseline_str,
            "issued": ISSUED.isoformat(),
            "issued_before_outcome": ISSUED < datetime.date(2026, 11, 1),
            "model_version": f"beta-v3 ({ISSUED.isoformat()}, experimental — not the published forecast)",
            "scope": ("global — beta v3 path over the EIA STEO world total (all liquids, balance-implied). "
                      "EXPERIMENTAL beta layer over the issued v2026-10-15 forecast (which is unchanged). "
                      "Anchored to the IEA's cumulative observed level for visual comparison only; EIA "
                      "coverage is broader than the IEA's observed pool. Scores against the IEA series "
                      "must carry that coverage mismatch."),
            "anchor": anchor_obj,
            "anchor_observation": anchor_obs,
            "rebase_start": rebase_obj,
            "assumptions_ref": assumptions_ref,
            "targets": targets_for(series),
        }

    records = [
        record(f"beta-scenario-corridor-holds-{ISSUED.isoformat()}-global-observed",
               "Corridor holds (v2 path)", holds),
        record(f"beta-scenario-standoff-{ISSUED.isoformat()}-global-observed",
               "Standoff (partial recovery)", beta_stand),
        record(f"beta-scenario-corridor-lapses-{ISSUED.isoformat()}-global-observed",
               "Corridor lapses (v2 path)", lapses),
    ]
    central_series = {m: {"monthly_mb": central[m] - (central[FORECAST_MONTHS[i - 1]] if i else rebase["value_mb"]),
                          "cumulative_mb": central[m]} for i, m in enumerate(FORECAST_MONTHS)}
    records.append(record(f"beta-central-{ISSUED.isoformat()}-global-observed",
                          "Beta central (probability-weighted)", central_series))
    data_supersession = None
    if superseded:
        data_supersession = prior_chains.get(RECORDS_OUT.name, []) + \
            [{"sha256": superseded[RECORDS_OUT.name], "replaced_by": VERSION,
              "replaced_on": ISSUED.isoformat()}]

    # --- build both payloads, run ALL checks, then write ---------------------------
    # Second external review (2026-10-21), bug 2: a failed endpoint check used
    # to replace both files BEFORE the gate ran. Order now: build payloads →
    # compute every self-check (the serialized-pair checks run against the
    # payloads — the exact bytes the writer is about to place; atomic_write
    # re-verifies temp and final bytes against the same payloads) → gate →
    # write. A failed run never touches existing bytes.
    assumptions_payload = json.dumps(assumptions, indent=2) + "\n"
    assumptions_sha = hashlib.sha256(assumptions_payload.encode()).hexdigest()
    assumptions_ref["sha256"] = assumptions_sha
    baseline_str_final = baseline_str.replace("sha256 FILL", f"sha256 {assumptions_sha}")
    for rec in records:
        rec["baseline"] = baseline_str_final
        rec["assumptions_ref"] = dict(assumptions_ref)

    def pts(series):
        return {"points": [{"period": m, "value_mb": series[m]["cumulative_mb"],
                            "status": "model-projection"} for m in FORECAST_MONTHS]}

    data = {
        "version": VERSION,
        "issued": ISSUED.isoformat(),
        "data_cutoff": CUTOFF.isoformat(),
        "experimental": True,
        "published_forecast_unchanged": True,
        "description": (
            f"Beta v3 storage forecast, issued {ISSUED.isoformat()} (data cutoff {CUTOFF.isoformat()}). "
            "EXPERIMENTAL: a shipping-responsive beta layer over the issued v2026-10-15 forecast, which "
            "remains unchanged and authoritative. The probability-weighted central line is the beta odds "
            f"(holds {h:.4f} / standoff {s:.4f} / lapses {l:.4f}, frozen at issue from shipping data "
            f"through {CUTOFF.isoformat()}) applied to three conditional paths — two of which (holds, "
            "lapses) are identical to the issued v2 paths and one of which (the standoff branch) allows "
            "partial Gulf recovery through alternative routes while attacks continue: a DIFFERENT path "
            f"from the published standoff line (September level + non-Gulf, no Gulf increment). World "
            f"production in the beta standoff reaches {beta_dec_P:.2f} mb/d by Dec 2027 — between the "
            f"issued v2 standoff ({v2_dec_P:.2f}) and the EIA baseline ({eia_dec_P:.2f}). Reference "
            "frame: zero = the frozen August 2026 anchor (−507 mb vs end-Feb 2026); the paths restart at "
            "the observed September (−509). October 2026 is partly elapsed at issue; November 2026 is the "
            "first clean month. A new observation issues a NEW dated vintage; this file is frozen. "
            "Method: /beta/ (research/beta-forecast-v3-2026-10-21.md). Dashboard: the 'Beta storage "
            "forecast (v3)' checkbox, off by default."),
        "odds": odds,
        "baseline_ref": {
            "source": "EIA STEO, released 6 Oct 2026",
            "archive": "research/sources/eia-steo-2026-10-06.xlsx",
            "sha256": WORKBOOK_SHA,
            "note": "identical to the issued v2 baseline",
        },
        "anchor": anchor_obj,
        "rebase_start": rebase_obj,
        "assumptions_ref": assumptions_ref,
        **({"supersession_chain": data_supersession} if superseded else {}),
        "series": {
            "beta_scenario_corridor_holds_cumulative_mb": pts(holds),
            "beta_scenario_standoff_cumulative_mb": pts(beta_stand),
            "beta_scenario_corridor_lapses_cumulative_mb": pts(lapses),
            "beta_central_cumulative_mb": pts(central_series),
        },
        "records": records,
    }

    # The artifact's checks block carries the pre-write checks + endpoints
    # (exactly the shape of the frozen v3 artifact); the serialized-pair
    # checks below are RUNTIME GATES — computed before the write, enforced,
    # but not recorded in the artifact.
    artifact_checks = dict(checks)
    d2 = json.loads(json.dumps(data, indent=2) + "\n")   # probe: pre-injection form
    checks["on_disk_assumptions_sha_matches_data_reference"] = \
        d2["assumptions_ref"]["sha256"] == assumptions_sha
    checks["on_disk_records_carry_the_same_sha"] = \
        all(r["assumptions_ref"]["sha256"] == assumptions_sha for r in d2["records"])
    checks["on_disk_central_is_weighted_sum_of_on_disk_paths"] = all(
        close(d2["series"]["beta_central_cumulative_mb"]["points"][i]["value_mb"],
              hz[0] * d2["series"]["beta_scenario_corridor_holds_cumulative_mb"]["points"][i]["value_mb"]
              + hz[1] * d2["series"]["beta_scenario_standoff_cumulative_mb"]["points"][i]["value_mb"]
              + hz[2] * d2["series"]["beta_scenario_corridor_lapses_cumulative_mb"]["points"][i]["value_mb"],
              1e-6)
        for i in range(len(FORECAST_MONTHS)))
    data["checks"] = {
        **artifact_checks,
        "endpoints_dec2027_feb2026_basis_mb": {
            "corridor-holds": round(holds["2027-12"]["cumulative_mb"], 3),
            "standoff": round(beta_stand["2027-12"]["cumulative_mb"], 3),
            "corridor-lapses": round(lapses["2027-12"]["cumulative_mb"], 3),
            "central": round(central["2027-12"], 3),
        },
    }
    data_payload = json.dumps(data, indent=2) + "\n"

    # the gate — BEFORE any file is replaced
    if FAILURE_INJECTION == "pre":
        checks["injected_pre_write_failure (test hook)"] = False
    failed = [k for k, v in checks.items() if not v]
    if failed:
        raise SystemExit(f"SELF-CHECK FAILED (no files written): {failed}")

    # --- atomic write (temp-verify → rename → final-verify with rollback) --------
    snapshots = {p: (p.read_bytes() if p.exists() else None)
                 for p in (ASSUMPTIONS_OUT, RECORDS_OUT)}

    def atomic_write(path: Path, payload: str, tag: str) -> str:
        tmp = path.with_suffix(path.suffix + ".tmp")
        try:
            tmp.write_text(payload)
            if FAILURE_INJECTION == "post" and tag == "assumptions":
                tmp.write_text(payload + "\nCORRUPTED (test hook)\n")
            if tmp.read_text() != payload:
                raise SystemExit(f"TEMP-BYTE VERIFICATION FAILED for {tag}: the original file was NOT touched")
            if FAILURE_INJECTION == "second" and tag == "records":
                # round-3 reproduction: an ordinary I/O error on the second
                # rename, after the first file has already been replaced
                raise OSError("simulated I/O failure during records rename (test hook)")
            os.replace(tmp, path)
            if path.read_text() != payload:
                raise SystemExit(f"POST-WRITE VERIFICATION FAILED for {tag}: pair rollback will restore both files")
        finally:
            if tmp.exists():
                tmp.unlink()
        return hashlib.sha256(payload.encode()).hexdigest()

    def restore_pair() -> None:
        """Pair-wide rollback: restore both files to their pre-run bytes
        (or remove both new outputs). A handled I/O failure must never leave
        a mismatched assumptions/records pair on disk."""
        for p in (ASSUMPTIONS_OUT, RECORDS_OUT):
            if snapshots[p] is None:
                p.unlink(missing_ok=True)
            else:
                p.write_bytes(snapshots[p])

    try:
        assumptions_sha_written = atomic_write(ASSUMPTIONS_OUT, assumptions_payload, "assumptions")
        data_sha = atomic_write(RECORDS_OUT, data_payload, "records")
    except BaseException:
        restore_pair()
        raise
    data_sha2 = hashlib.sha256(RECORDS_OUT.read_bytes()).hexdigest()
    assumptions_sha2 = hashlib.sha256(ASSUMPTIONS_OUT.read_bytes()).hexdigest()
    if data_sha2 != data_sha or assumptions_sha2 != assumptions_sha:
        # catastrophic: restore whatever was there before this run
        restore_pair()
        raise SystemExit("post-run hash mismatch: both files restored to their pre-run bytes")

    print(f"[gen-beta-v3] wrote {RECORDS_OUT.name} (sha256 {data_sha[:16]}…)")
    print(f"[gen-beta-v3] wrote {ASSUMPTIONS_OUT.name} (sha256 {assumptions_sha_written[:16]}…)")
    for k, v in superseded.items():
        print(f"[gen-beta-v3] RE-ISSUED this vintage; superseded {k} sha256 {v[:16]}…")
    print(f"[gen-beta-v3] anchor: {ANCHOR_MONTH} world production {ANCHOR:.6f} mb/d (frozen workbook, read at import)")
    print(f"[gen-beta-v3] beta odds HORIZON: holds {h:.6f} / standoff {s:.6f} / lapse {l:.6f}")
    ep = data["checks"]["endpoints_dec2027_feb2026_basis_mb"]
    print(f"[gen-beta-v3] Dec 2027 endpoints (Feb 2026 basis, mb): holds {ep['corridor-holds']:,.1f}  "
          f"beta standoff {ep['standoff']:,.1f}  lapse {ep['corridor-lapses']:,.1f}  central {ep['central']:,.1f}")
    print(f"[gen-beta-v3] positioning Dec 2027 world P: v2 standoff {v2_dec_P:.4f} < beta {beta_dec_P:.4f} < EIA {eia_dec_P:.4f}")
    print(f"[gen-beta-v3] all self-checks PASS ({len(checks)} checks)")


if __name__ == "__main__":
    main()
