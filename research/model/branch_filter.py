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
same gap, opposite sign. See research/logs/2026-09-10.md.) v2.3 (Sep 29):
the structural signal gained a SOURCED basis -- `--volume <M bpd>` (Kpler
Hormuz crude throughput) takes precedence over --corridor-flow. v2.4
(Oct 1): the volume channel became a GRADED lognormal likelihood per state
(medians 15.0/8.5/2.0 for holds/standoff/lapse; anchored on the sourced
pre-war 15M / Sep 7.4-9.7 / Aug 18 2.0M prints) instead of the v2.3
3-category snap, which left sustained flow recovery almost invisible in the
published output (Oct 1 external review). Ship count (--transits)
systematically undercounts (dark/shuttle fleet); volume does not, so the
model now responds to volume exports, not just transit count. Remaining
v2.1: news-frequency escalation index, STEO revision direction.

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
  volume (structural, v2.4b)     : sourced Kpler Hormuz crude throughput
                                   (M bpd) -> GRADED lognormal LOCATION
                                   family per state (replaces the v2.3
                                   category snap; single shared sigma 0.35,
                                   medians 15.0/8.5/2.0): every pairwise
                                   likelihood ratio is linear in ln(vol), so
                                   the dominance ordering is STRICTLY
                                   monotone -- lapse < 4.12M < standoff <
                                   11.29M < holds (crossings at the medians'
                                   geometric means, sigma-independent) -- and
                                   more throughput never shifts evidence
                                   toward a worse state (structural
                                   requirement, Oct 1 review; v2.4's three
                                   sigmas let the widest win in both tails).
                                   vol == 0 is the confirmed-closure limit
                                   (lapse-dominant, accepted; stronger than any
                                   positive print and stronger than a manual
                                   --corridor-flow absent assessment), vol ->
                                   inf is holds-dominant. Takes precedence
                                   over --corridor-flow (sourced beats
                                   manual).

Usage:
  branch_filter.py update --prior 0.15,0.50,0.35 --transits 10 \
                          --tankers 10 --brent 100.71 \
                          --corridor-flow degraded
  branch_filter.py update --prior 0.10,0.40,0.50 --transits 9 \
                          --tankers 1 --brent 104.32 --volume 7.4
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

# v2.4: sourced volume (Kpler Hormuz crude throughput, M bpd) -> GRADED
# per-state lognormal likelihood. Replaces the v2.3 category lookup, which
# the Oct 1 external review found to be a near-no-op in the published output
# (7.4/9.719 and 10/13.2/15 all collapse to two of three fixed vectors, so
# the HORIZON moves ~1.3 pts at the 10M threshold and is flat beyond). The
# category snap threw away information (9.9M and 4.1M were identical); the
# graded likelihood is a SINGLE-sigma location family (v2.4b): every
# pairwise ratio is linear in ln(vol) -> dominance strictly monotone (lapse
# < 4.12M < standoff < 11.29M < holds); v2.4's three sigmas let the WIDEST
# distribution win in both tails (ratio of two lognormals with different
# sigmas: up to two crossings) -- 92.1% holds at 17M falling to 45.0% at
# 25M, lapse-dominant at 1000M. The HORIZON is state x the judgment's
# transition table, so its own vol-monotonicity is a property of that
# COMPOSITION (tested at the operating points), not a channel claim. The
# medians are JUDGMENT anchored on
# the SAME sourced Kpler Hormuz crude observations v2.3 used: pre-war ~15M
# (holds), Sep war-era prints 7.4-9.7 (standoff), Aug 18 2.0M (lapse, the
# only observed near-closed print). Ship count (--transits) systematically
# undercounts (dark / shuttle fleet); the count-vs-volume DISCREPANCY is an
# open reconciliation item (reporting windows, vessel coverage, cargo sizes,
# tracking gaps; AIS-dark is a documented candidate, not established) -- the
# transit lambdas are deliberately NOT re-tuned here. Feed the HORMUZ crude
# figure, not the regional total (12.8 would read as holds-anchored).
# vol == 0 (Oct 1 review): a CONFIRMED closure must not be weaker evidence
# than a 0.1M print just because it is exactly zero -- 0 maps to the x -> 0
# limit [0, 0, 1] (numerically identical to any underflowing print).
# v2.4b (Oct 1): single shared sigma (location family). The monotone-
# ordering requirement FORCES equal sigmas; the value 0.35 is the middle of
# the v2.4 spec's 0.15/0.35/0.50 (the contested-regime value -- the regime
# most war-era prints sit in). The medians (sourced) and the dominance
# windows (sigma-independent) are unchanged, so every sourced anchor
# classifies to its own state exactly as before; sigma sets the steepness
# between anchors only.
VOLUME_LOGNORMAL = [(math.log(15.0), 0.35),   # holds
                    (math.log(8.5), 0.35),    # standoff
                    (math.log(2.0), 0.35)]    # lapse


def lognormal_pdf(x, ln_mu, sigma):
    """Lognormal density at x > 0 with log-space mean ln_mu and sigma.
    Lognormal (not Normal) because throughput is non-negative and skewed: a
    Normal lapse component would put mass below zero. Computed in log space:
    the direct form underflows BOTH the numerator (exp) and the denominator
    (x) at subnormal x (e.g. 5e-324) and raises ZeroDivisionError on a
    finite, in-range input (Oct 1 code review)."""
    if x <= 0:
        return 0.0
    z = (math.log(x) - ln_mu) / sigma
    log_pdf = (-0.5 * z * z - math.log(x) - math.log(sigma)
               - 0.5 * math.log(2 * math.pi))
    return math.exp(log_pdf)


def volume_likelihood(vol):
    """v2.4b: graded per-state likelihood for a sourced Kpler Hormuz crude
    throughput (M bpd). Single-sigma lognormal LOCATION family (medians
    15.0/8.5/2.0, shared sigma 0.35). Structural property, TRUE BY
    CONSTRUCTION: every pairwise likelihood ratio is strictly increasing in
    vol (with equal sigmas ln(r_ij) is LINEAR in ln vol -- one crossing, at
    the geometric mean of the two medians, independent of sigma), so (a) the
    dominance ordering is strictly monotone -- lapse below sqrt(2.0*8.5)
    = 4.12M, standoff below sqrt(8.5*15.0) = 11.29M, holds above -- and
    (b) increasing throughput never shifts evidence toward a worse corridor
    state (the Oct 1 external review requirement; tested DIRECTLY on the
    channel, independently of the other inputs, in test_model.py); vol -> 0
    is lapse-dominant and vol -> inf holds-dominant. v2.4's per-state sigmas
    (0.15/0.35/0.50) violated this -- a ratio of two lognormals with
    DIFFERENT sigmas is concave in ln vol with up to two crossings, so the
    WIDEST distribution wins in both tails: holds share fell 92.1% (17M) ->
    45.0% (25M) -> ~0 (100M) and the channel was lapse-dominant at 1000M.
    The HORIZON is the state posterior times the judgment's transition
    table, so the HORIZON's own vol-monotonicity is a property of that
    COMPOSITION (pinned at the operating points in test_model.py), not a
    channel claim. vol == 0 is ACCEPTED as the x -> 0 limit [0, 0, 1] -- a
    CONFIRMED measured closure, identical to any underflowing print, stronger
    than any positive print, and stronger than the manual --corridor-flow
    absent assessment (a measurement outranks an assessment: 85% vs 64.5%
    HORIZON lapse at current data). Rejects non-finite / negative values:
    a bare log would let nan/inf in as model evidence (both CLI and library
    paths)."""
    if not math.isfinite(vol) or vol < 0:
        raise SystemExit("volume must be a finite number >= 0 (Kpler Hormuz "
                         "crude throughput, M bpd); 0 is the confirmed-"
                         "closure limit (lapse-dominant)")
    if vol == 0:
        return [0.0, 0.0, 1.0]
    return [lognormal_pdf(vol, ln_mu, s) for ln_mu, s in VOLUME_LOGNORMAL]

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
    """obs: dict with optional 'transits', 'tankers', 'brent', 'volume',
    'corridor_flow'. 'volume' and 'corridor_flow' are the SAME structural
    signal (sourced vs manual); 'volume' takes precedence if both present."""
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
        if obs.get("volume") is not None:
            l *= volume_likelihood(obs["volume"])[i] \
                ** SIGNAL_WEIGHTS["corridor_flow"]
        elif obs.get("corridor_flow") is not None:
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
    if a.volume is not None:
        if not math.isfinite(a.volume) or a.volume < 0:
            raise SystemExit("--volume must be a finite number >= 0 "
                             "(Kpler Hormuz crude throughput, M bpd); 0 is "
                             "the confirmed-closure limit (lapse-dominant)")
        obs["volume"] = a.volume
        if a.corridor_flow is not None:
            print("note: --volume takes precedence over --corridor-flow "
                  "(sourced beats manual)")
    elif a.corridor_flow is not None:
        obs["corridor_flow"] = a.corridor_flow
    if not obs:
        raise SystemExit("provide at least one of --transits/--tankers/--brent/"
                         "--volume/--corridor-flow")

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
    u.add_argument("--volume", type=float, default=None,
                   help="sourced Kpler Hormuz crude throughput, M bpd (v2.4b) "
                        "-- graded lognormal likelihood per state (medians "
                        "15/8.5/2.0 for holds/standoff/lapse); 0 = confirmed "
                        "closure (lapse-dominant limit); takes precedence over "
                        "--corridor-flow. Must be >= 0")
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
