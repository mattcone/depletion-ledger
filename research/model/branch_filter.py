#!/usr/bin/env python3
"""Three-state Bayesian filter for corridor branch weights + calibration ledger.

Turns "reweight on regime events (author's judgment)" into auditable arithmetic:
  1. A STATE filter over {corridor-holds, standoff, corridor-lapsed} updates
     on weekly data (verified transit count, shipping losses, Brent level).
  2. A transition matrix maps state -> HORIZON branch weights (the next ~6
     months). The matrix is where the judgment lives -- one documented table
     instead of an invisible per-event gut feel.
  3. A calibration ledger (calibration.csv) scores every binary probability
     we publish (Brier score) once it settles -- the only way to know if the
     model is improving.

v2.0 (Sep 11): the state filter gained a STRUCTURAL input --
`--corridor-flow {functioning,degraded,absent}` -- a documented judgment
likelihood that encodes "contested, not closed" so a single bad transit week
cannot swing the lapse weight alone. (v1 limitation: the filter had no memory
of structure/trend -- underweighted lapse on Sep 9, overweighted it by Sep 10,
same gap, opposite sign. See research/logs/2026-09-10.md.) Remaining v2.1:
news-frequency escalation index, STEO revision direction.

STATE LIKELIHOODS (observations; defaults are author's judgment):
  transits/day (verified, Kpler) : Poisson  holds=20  standoff=10  lapse=2
                                   v2.2 (Sep 16): feed the 3-day average of verified
                                   daily counts (rounded), not a single day -- single
                                   days get revised after the fact (Sep 14: 4 -> 7).
                                   KNOWN BIAS: counts are AIS-derived; UKMTO logs a ~3:1
                                   ratio of US-reported to AIS-observed transits and says
                                   UAE-facilitated vessels run AIS-dark (Sep 16). If the
                                   official volume claim (14M b/d, Axios) is real, the
                                   transit evidence systematically undercounts -- the
                                   lapse weight may be overstated by that gap. Do not
                                   re-tune the Poisson lambdas until the AIS-dark question
                                   is resolved by a week of counts.
  tanker losses/week (confirmed) : Poisson  holds=0.2 standoff=1.5 lapse=4
                                   weight 0.5 (leading indicator, weak ID)
  Brent level                    : Normal   holds=N(88,4) standoff=N(97,9)
                                   lapse=N(108,12)
  corridor flow (structural, v2) : functioning (0.55, 0.40, 0.05)
                                   degraded    (0.15, 0.70, 0.15)
                                   absent      (0.02, 0.18, 0.80)

Usage:
  branch_filter.py update --prior 0.15,0.50,0.35 --transits 10 \
                          --tankers 10 --brent 100.71 \
                          --corridor-flow degraded
  branch_filter.py add "Hormuz normal by Sep 30" 0.038 2026-09-30
  branch_filter.py resolve 2026-09-30 0 --match "Hormuz"   # --match is
                                                  # required when several
                                                  # predictions share the
                                                  # settle date; a match
                                                  # hitting SEVERAL rows is
                                                  # refused unless --force
                                                  # is passed (and only if
                                                  # they are predictions of
                                                  # the same event)
  branch_filter.py score
"""
import argparse
import csv
import math
import os
from datetime import date

STATES = ["corridor-holds", "standoff", "corridor-lapsed"]

# weekly data -> state likelihood parameters
POISSON = {  # (holds, standoff, lapse)
    "transits": (20.0, 10.0, 2.0),
    "tankers": (0.2, 1.5, 4.0),
}
NORMAL = {  # (mean, sd) per state
    "brent": [(88.0, 4.0), (97.0, 9.0), (108.0, 12.0)],
}
# structural assessment of whether the (shadow) corridor still moves trade
CORRIDOR_FLOW = {  # (holds, standoff, lapse) per assessment
    "functioning": (0.55, 0.40, 0.05),
    "degraded": (0.15, 0.70, 0.15),
    "absent": (0.02, 0.18, 0.80),
}
SIGNAL_WEIGHTS = {"transits": 1.0, "tankers": 0.5, "brent": 1.0,
                  "corridor_flow": 1.0}

# state -> horizon branch weights (the documented judgment table)
DEFAULT_TRANSITION = [
    [0.60, 0.30, 0.10],   # holds
    [0.15, 0.50, 0.35],   # standoff
    [0.05, 0.10, 0.85],   # lapse
]

CALIBRATION = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           "calibration.csv")
CSV_HEADER = ["published_date", "description", "prob", "event_date",
              "resolved", "brier"]


def poisson_pmf(k, lam):
    """Log-space Poisson pmf (lgamma) -- `lam ** k / k!` overflows in float
    space around k~250, which a restored-corridor observation could hit."""
    if k < 0 or lam <= 0:
        return 0.0
    return math.exp(-lam + k * math.log(lam) - math.lgamma(k + 1))


def normal_pdf(x, mu, sd):
    return math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * math.sqrt(2 * math.pi))


def state_posterior(prior, obs):
    """obs: dict with optional 'transits', 'tankers', 'brent', 'corridor_flow'."""
    unnorm = []
    for i, st in enumerate(STATES):
        l = 1.0
        for sig in ("transits", "tankers"):
            if obs.get(sig) is not None:
                w = SIGNAL_WEIGHTS[sig]
                l *= poisson_pmf(int(obs[sig]), POISSON[sig][i]) ** w
        if obs.get("brent") is not None:
            mu, sd = NORMAL["brent"][i]
            l *= normal_pdf(obs["brent"], mu, sd) ** SIGNAL_WEIGHTS["brent"]
        if obs.get("corridor_flow") is not None:
            l *= CORRIDOR_FLOW[obs["corridor_flow"]][i] \
                ** SIGNAL_WEIGHTS["corridor_flow"]
        unnorm.append(prior[i] * l)
    s = sum(unnorm)
    if s == 0:
        raise SystemExit("posterior is zero -- observations impossible under "
                         "all states (check inputs)")
    return [u / s for u in unnorm]


def horizon_weights(state_post, transition):
    return [sum(state_post[i] * transition[i][j] for i in range(3)) for j in range(3)]


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
        obs["brent"] = a.brent
    if not obs:
        raise SystemExit("provide at least one of --transits/--tankers/--brent")

    if a.corridor_flow is not None:
        obs["corridor_flow"] = a.corridor_flow

    transition = DEFAULT_TRANSITION
    if a.matrix:
        try:
            m = [float(x) for x in a.matrix.split(",")]
        except ValueError:
            raise SystemExit("--matrix must be 9 comma-separated numbers (3x3, row-major)")
        if len(m) != 9 or any(x < 0 for x in m):
            raise SystemExit("--matrix must be 9 non-negative comma-separated "
                             "numbers (3x3, row-major)")
        transition = [m[0:3], m[3:6], m[6:9]]
        for i, row in enumerate(transition):
            if abs(sum(row) - 1.0) > 1e-6:
                raise SystemExit(f"--matrix row {i + 1} must sum to 1 "
                                 f"(got {sum(row):.6f})")

    post = state_posterior(prior, obs)
    horizon = horizon_weights(post, transition)

    fmt = lambda p: "  ".join(f"{STATES[j]}: {p[j]*100:5.1f}%" for j in range(3))
    print("Prior (state)    :", fmt(prior))
    print("Posterior (state):", fmt(post))
    print("Horizon weights  :", fmt(horizon))
    print("\n(Use the HORIZON row in MODEL.md/SUMMARY. State row is the raw filter.)")
    return horizon


def load_rows():
    if not os.path.exists(CALIBRATION):
        return []
    with open(CALIBRATION, newline="") as f:
        return list(csv.DictReader(f))


def save_rows(rows):
    with open(CALIBRATION, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CSV_HEADER)
        w.writeheader()
        w.writerows(rows)


def cmd_add(a):
    if not (0.0 <= a.prob <= 1.0):
        raise SystemExit("prob must be in [0,1]")
    date.fromisoformat(a.event_date)
    rows = load_rows()
    rows.append({
        "published_date": a.published_date or date.today().isoformat(),
        "description": a.description,
        "prob": f"{a.prob:.4f}",
        "event_date": a.event_date,
        "resolved": "",
        "brier": "",
    })
    save_rows(rows)
    print(f"added: {a.description} p={a.prob:.3f} (event {a.event_date}) "
          f"[{len(rows)} total]")


def cmd_resolve(a):
    try:
        outcome = int(a.outcome)
    except ValueError:
        raise SystemExit("outcome must be 0 or 1")
    if outcome not in (0, 1):
        raise SystemExit("outcome must be 0 or 1")
    if a.match is not None and not a.match.strip():
        raise SystemExit("--match must be a non-empty substring")
    rows = load_rows()
    cands = [r for r in rows
             if r["event_date"] == a.event_date and not r["resolved"]]
    if a.match is not None:
        m = a.match.strip().lower()
        cands = [r for r in cands if m in r["description"].lower()]
    if not cands:
        raise SystemExit(f"no unresolved row with event_date={a.event_date}"
                         + (f" matching '{a.match}'" if a.match else ""))
    if len(cands) > 1 and (a.match is None or not a.force):
        # Several DIFFERENT predictions can settle on the same date (e.g. the
        # three Sep 30 items) with different outcomes -- resolving all of them
        # with one outcome would corrupt the ledger. A --match substring can
        # hit unrelated events that merely share text (e.g. "Sep 30" matches
        # all three Sep 30 descriptions), so a multi-row match is refused
        # unless the caller explicitly passes --force. A multi-row --force
        # is legitimate for several predictions of ONE event (e.g. the filter
        # and judgment rows for the same Nov 15 outcome).
        if a.match is None:
            why = f"share event_date={a.event_date}"
            hint = "pass --match <substring> to pick which one to resolve"
        else:
            why = f"match '{a.match.strip()}'"
            hint = ("use a more specific --match, or pass --force to resolve "
                    "all of them (only if they are predictions of the SAME event)")
        raise SystemExit(
            f"{len(cands)} unresolved rows {why}; one outcome may not fit "
            f"all of them. {hint}:\n  "
            + "\n  ".join(r["description"] for r in cands))
    for r in cands:
        p = float(r["prob"])
        r["resolved"] = str(outcome)
        r["brier"] = f"{(p - outcome) ** 2:.4f}"
        print(f"resolved: {r['description']} p={p:.3f} outcome={outcome} "
              f"brier={(p - outcome) ** 2:.4f}")
    save_rows(rows)
    cmd_score(argparse.Namespace())


def cmd_score(a):
    rows = load_rows()
    resolved = [r for r in rows if r["resolved"] != ""]
    open_ = [r for r in rows if r["resolved"] == ""]
    print(f"\ncalibration ledger: {len(resolved)} resolved, {len(open_)} open")
    if resolved:
        b = [float(r["brier"]) for r in resolved]
        pbar = sum(int(r["resolved"]) for r in resolved) / len(resolved)
        print(f"running Brier score: {sum(b)/len(b):.4f}  "
              f"(0 = perfect; coin-flip = 0.25; base-rate predictor = "
              f"{pbar * (1 - pbar):.4f} at p={pbar:.2f})")
        print("by date (earliest first):")
        for r in sorted(resolved, key=lambda r: r["published_date"]):
            print(f"  {r['published_date']}  {r['description'][:52]:<52} "
                  f"p={r['prob']} -> {r['resolved']}  brier={r['brier']}")
    if open_:
        print("open (waiting to settle):")
        for r in sorted(open_, key=lambda r: r["event_date"]):
            print(f"  {r['event_date']}  p={r['prob']:<7} {r['description']}")


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)

    u = sub.add_parser("update", help="Bayesian update of branch weights")
    u.add_argument("--prior", required=True, help="state prior, e.g. 0.15,0.50,0.35")
    u.add_argument("--transits", type=int, default=None,
                   help="verified transits/day -- 3-day average of verified daily "
                        "counts (v2.2), rounded to nearest int (Kpler/Reuters)")
    u.add_argument("--tankers", type=int, default=None,
                   help="confirmed shipping losses this week (both sides)")
    u.add_argument("--brent", type=float, default=None, help="Brent level, $/bbl")
    u.add_argument("--corridor-flow",
                   choices=["functioning", "degraded", "absent"], default=None,
                   help="structural assessment of (shadow) corridor trade (v2.0)")
    u.add_argument("--matrix", default=None,
                   help="override transition matrix (9 numbers, row-major)")
    u.set_defaults(fn=cmd_update)

    ad = sub.add_parser("add", help="add a published probability to the ledger")
    ad.add_argument("description")
    ad.add_argument("prob", type=float)
    ad.add_argument("event_date", help="ISO date the prediction settles")
    ad.add_argument("--published-date", default=None)
    ad.set_defaults(fn=cmd_add)

    r = sub.add_parser("resolve", help="mark predictions settled on a date")
    r.add_argument("event_date")
    r.add_argument("outcome", help="0 = did not happen, 1 = happened")
    r.add_argument("--match", default=None,
                   help="substring of the description, to pick one prediction "
                        "when several share the settle date (required if "
                        "ambiguous)")
    r.add_argument("--force", action="store_true",
                   help="resolve ALL rows matched by --match with the same "
                        "outcome (default refuses: a substring can hit "
                        "unrelated events). Only for several predictions of "
                        "the SAME event.")
    r.set_defaults(fn=cmd_resolve)

    s = sub.add_parser("score", help="show running Brier score + open items")
    s.set_defaults(fn=cmd_score)

    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
