#!/usr/bin/env python3
"""branch_filter_candidate.py — reviewable candidate revision of the branch
filter (filed 2026-10-21). CANDIDATE ONLY: not wired into the site, not used
by the daily pass, does NOT write to the calibration ledger, and does not
change any published probability. The current model (branch_filter.py,
v2.4b) is untouched.

What changes vs v2.4b (two channel-mix changes, nothing else):

1. The Brent channel is REMOVED from the current-state filter.
   - At the current price it is the largest single pull in the posterior and
     it points at LAPSE (N(108,12) peaked at 108.79): high prices at
     recovered throughput drag the state toward closure — the exact failure
     mode the Oct 21 review flagged.
   - The level is contaminated as a current-state observation: it embeds
     freight (~half the premium per Kpler), war-risk insurance, product /
     refining tightness, and the risk premium, not only corridor state.
   - Its parameters (88/4, 97/9, 108/12) are pure judgment, never fitted.
   - A reduced weight (e.g. 0.25) was considered and rejected: at 108.79 the
     reweighted channel still puts ~56% of its pull on lapse — the
     contamination is directional, not just a magnitude problem.
   - Price is not dropped from the model: it keeps its two existing roles —
     the draw-rate band (elasticity) and the judgment's EIA-spread
     future-risk trigger ("widening beyond ~$10-15 into October => the
     market is pricing lapse > 40%"). It moves from "current-state
     observation" to "future-risk context", where it already lived in the
     judgment.

2. The transits Poisson weight is demoted 1.0 -> 0.5. A HYPOTHESIS, not a
   calibrated joint likelihood:
   - Transits and volume are the same underlying quantity (corridor
     function) measured two ways (vessel counts vs barrels). Counts and
     barrels can diverge for reasons unrelated to AIS (cargo sizes, load
     factors, shuttle geometry), so multiplying both at weight 1.0 is a
     plausible double-count — but 0.5 is not derived from data.
   - The briefing's '34 of 43 crossings dark/unknown-route' (Oct 14-17)
     does NOT establish a miss rate: those movements are INCLUDED in the
     count (Kpler's dark-transit methodology confirms them via satellite
     imagery + human intelligence against a binary standard). 79% is a
     route-coverage statistic, not 'the count missed 79%'.
   - The Sep 21 refactor proposal (model-refactor-throughput-signal.md)
     intended exactly this demotion when the volume channel was added; the
     v2.4 implementation kept it at 1.0. Historical author intent is not
     calibration; a volume-only comparator is in the validation doc.
   - The count keeps cross-check force at 0.5: it can still disagree with
     the barrels (validation scenario 7).

Everything else is unchanged: prior 0.10/0.50/0.40; volume lognormal
location family (medians 15.0/8.5/2.0, sigma 0.35, vol==0 closure limit);
tanker-loss Poisson (0.2/1.5/4.0, weight 0.5); DEFAULT_TRANSITION (the
judgment's documented state->horizon table, which is where future-
deterioration risk lives); CLI shape (brent is accepted for parity but
ignored, and reported as context only).

Use:
  python3 branch_filter_candidate.py update --prior 0.10,0.50,0.40 \
      --transits 10 --tankers 1 --volume 7.894 [--brent 108.79] \
      [--volume-date 2026-10-17] [--transits-date 2026-10-17] \
      [--today 2026-10-21] [--contribution] [--unrounded]

The --volume-date / --transits-date flags take the DATA-TO date of each
print (not the publication date) and report staleness against --today;
when omitted, the output says the vintage was not provided (staleness
unreported) rather than silently assuming currency.
"""
import argparse
import datetime as _dt
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import branch_filter as bf

CANDIDATE_VERSION = "v3-candidate (2026-10-21, reviewable, not published)"

# the only structural change: channel weights for the current-state filter
CANDIDATE_WEIGHTS = {
    "transits": 0.5,   # v2.4b: 1.0 (demoted — same quantity as volume)
    "tankers": 0.5,    # unchanged
    "volume": 1.0,     # unchanged (the structural channel)
    # "brent": REMOVED (see module docstring)
}
PRIOR_DEFAULT = [0.10, 0.50, 0.40]


def state_posterior_candidate(prior, obs):
    """Same obs-dict shape as branch_filter.state_posterior. The 'brent' key
    is accepted and IGNORED (future-risk context, not a state observation).
    Returns (post, note) where note is None or a warning string."""
    note = None
    if obs.get("brent") is not None:
        note = (f"note: brent {obs['brent']} is NOT a state observation in "
                f"the candidate (context only; see module docstring)")
    unnorm = []
    for i in range(3):
        l = 1.0
        if obs.get("transits") is not None:
            l *= bf.poisson_pmf(int(obs["transits"]),
                                bf.POISSON["transits"][i]) ** CANDIDATE_WEIGHTS["transits"]
        if obs.get("tankers") is not None:
            l *= bf.poisson_pmf(int(obs["tankers"]),
                                bf.POISSON["tankers"][i]) ** CANDIDATE_WEIGHTS["tankers"]
        if obs.get("volume") is not None:
            l *= bf.volume_likelihood(obs["volume"])[i] ** CANDIDATE_WEIGHTS["volume"]
        elif obs.get("corridor_flow") is not None:
            l *= bf.CORRIDOR_FLOW[obs["corridor_flow"]][i] ** CANDIDATE_WEIGHTS["volume"]
        unnorm.append(prior[i] * l)
    s = sum(unnorm)
    if s == 0:
        raise SystemExit("posterior is zero -- observations impossible under "
                         "all states (check inputs)")
    return [u / s for u in unnorm], note


def channel_contribution(obs):
    """Normalized per-channel contribution (lik^weight, normalized) — for
    the --contribution report. Only candidate channels."""
    out = {}
    if obs.get("transits") is not None:
        v = tuple(bf.poisson_pmf(int(obs["transits"]), lam)
                  for lam in bf.POISSON["transits"])
        out["transits"] = (v, CANDIDATE_WEIGHTS["transits"])
    if obs.get("tankers") is not None:
        v = tuple(bf.poisson_pmf(int(obs["tankers"]), lam)
                  for lam in bf.POISSON["tankers"])
        out["tankers"] = (v, CANDIDATE_WEIGHTS["tankers"])
    if obs.get("volume") is not None:
        out["volume"] = (tuple(bf.volume_likelihood(obs["volume"])),
                         CANDIDATE_WEIGHTS["volume"])
    elif obs.get("corridor_flow") is not None:
        out["corridor_flow"] = (bf.CORRIDOR_FLOW[obs["corridor_flow"]],
                                CANDIDATE_WEIGHTS["volume"])
    return out


def _norm(vec):
    m = max(math.log(v) for v in vec if v > 0)
    e = [math.exp(math.log(v) - m) if v > 0 else 0.0 for v in vec]
    t = sum(e) or 1.0
    return [x / t for x in e]


def _iso(s):
    return _dt.date.fromisoformat(s)


def vintage_lines(a):
    """Staleness report from the --volume-date / --transits-date flags."""
    out = []
    try:
        today = _iso(a.today) if a.today else _dt.date.today()
    except ValueError:
        raise SystemExit(f"--today must be YYYY-MM-DD (got {a.today!r})")
    for flag, attr, label in (("volume_date", "volume", "volume"),
                              ("transits_date", "transits", "transits")):
        d = getattr(a, flag, None)
        if d is None:
            if getattr(a, attr, None) is not None:
                out.append(f"vintage: {label} date not provided — staleness unreported")
            continue
        try:
            parsed = _iso(d)
        except ValueError:
            raise SystemExit(f"--{label}-date must be YYYY-MM-DD (got {d!r})")
        age = (today - parsed).days
        if age < 0:
            out.append(f"vintage: {label} data-to date {d} is after reference date {today}")
        else:
            out.append(f"vintage: {label} data to {d} ({age} day{'s' if age != 1 else ''} old as of {today})")
    return out


def cmd_update(a):
    try:
        prior = [float(x) for x in a.prior.split(",")]
    except ValueError:
        raise SystemExit("--prior must be 3 comma-separated numbers, e.g. 0.10,0.50,0.40")
    if len(prior) != 3 or abs(sum(prior) - 1.0) > 1e-6:
        raise SystemExit("prior must be 3 comma-separated weights summing to 1")
    obs = {}
    if a.transits is not None:
        obs["transits"] = a.transits
    if a.tankers is not None:
        obs["tankers"] = a.tankers
    if a.brent is not None:
        obs["brent"] = a.brent  # accepted, ignored by the posterior
    if a.volume is not None:
        if not math.isfinite(a.volume) or a.volume < 0:
            raise SystemExit("--volume must be a finite number >= 0 "
                             "(Kpler Hormuz oil throughput, M b/d — total-oil "
                             "definition); 0 is the confirmed-closure limit")
        obs["volume"] = a.volume
        if a.corridor_flow is not None:
            print("note: --volume takes precedence over --corridor-flow "
                  "(sourced beats manual)")
    elif a.corridor_flow is not None:
        obs["corridor_flow"] = a.corridor_flow
    if not any(k in obs for k in ("transits", "tankers", "volume", "corridor_flow")):
        raise SystemExit("provide at least one of --transits/--tankers/"
                         "--volume/--corridor-flow (brent alone is context "
                         "only in the candidate)")

    transition = bf.DEFAULT_TRANSITION
    if a.matrix:
        m = [float(x) for x in a.matrix.split(",")]
        if len(m) != 9 or any(x < 0 for x in m) or \
                any(abs(sum(m[3 * i:3 * i + 3]) - 1.0) > 1e-6 for i in range(3)):
            raise SystemExit("--matrix must be 9 non-negative numbers, rows summing to 1")
        transition = [m[0:3], m[3:6], m[6:9]]

    post, note = state_posterior_candidate(prior, obs)
    horizon = bf.horizon_weights(post, transition)

    print(f"[{CANDIDATE_VERSION}]")
    if note:
        print(note)
    for line in vintage_lines(a):
        print(line)
    fmt = lambda p: "  ".join(f"{bf.STATES[j]}: {p[j]*100:5.1f}%" for j in range(3))
    print("Prior (state)    :", fmt(prior))
    print("Posterior (state):", fmt(post))
    if a.unrounded:
        print("Posterior (unrounded): " +
              "  ".join(f"{bf.STATES[j]}: {post[j]:.6e}" for j in range(3)))
    print("Horizon weights  :", fmt(horizon))
    if a.unrounded:
        print("Horizon (unrounded): " +
              "  ".join(f"{bf.STATES[j]}: {horizon[j]:.6f}" for j in range(3)))
    if a.contribution:
        print("\nPer-channel normalized contribution (before prior):")
        for name in ("transits", "tankers", "volume", "corridor_flow"):
            if name in channel_contribution(obs):
                vec, w = channel_contribution(obs)[name]
                c = _norm([v ** w if v > 0 else 0.0 for v in vec])
                print(f"  {name} (w={w}): " +
                      "  ".join(f"{bf.STATES[j]}: {c[j]*100:7.3f}%" for j in range(3)))
    print("\n(CANDIDATE diagnostic — not the published model; the published")
    print("row comes from branch_filter.py + the judgment. This run does NOT")
    print("touch the calibration ledger or the site.)")
    return horizon


def main():
    p = argparse.ArgumentParser(description="CANDIDATE branch filter (v3, reviewable)")
    sub = p.add_subparsers(dest="cmd")
    up = sub.add_parser("update", help="run the candidate filter (read-only)")
    up.add_argument("--prior", default=",".join(str(x) for x in PRIOR_DEFAULT))
    up.add_argument("--transits", type=int, default=None)
    up.add_argument("--tankers", type=int, default=None)
    up.add_argument("--brent", type=float, default=None,
                    help="accepted for parity; IGNORED by the candidate posterior")
    up.add_argument("--volume", type=float, default=None)
    up.add_argument("--volume-date", default=None,
                    help="data-to date of the volume print (YYYY-MM-DD); reported as staleness")
    up.add_argument("--transits-date", default=None,
                    help="data-to date of the crossings print (YYYY-MM-DD); reported as staleness")
    up.add_argument("--today", default=None,
                    help="reference date for staleness (YYYY-MM-DD; default: system date)")
    up.add_argument("--corridor-flow", default=None,
                    choices=[None, "functioning", "degraded", "absent"])
    up.add_argument("--matrix", default=None)
    up.add_argument("--contribution", action="store_true",
                    help="print per-channel normalized contributions")
    up.add_argument("--unrounded", action="store_true")
    up.set_defaults(func=cmd_update)
    a = p.parse_args()
    if not a.cmd:
        p.print_help()
        return
    a.func(a)


if __name__ == "__main__":
    main()
