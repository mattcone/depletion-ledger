#!/usr/bin/env python3
"""beta_odds_evaluation.py — beta forecast build, section 2 (filed 2026-10-21).

Evaluates the candidate odds design choices at IDENTICAL inputs and selects
the beta odds spec. READ-ONLY: does not touch the published model
(branch_filter.py), the calibration ledger, or the site.

Design questions evaluated (per the beta task spec):
  A. counts+volume vs volume-only, at identical inputs
  B. the transits-count weight (the 0.5 hypothesis) — sensitivity sweep
  C. crude-anchored volume medians vs the total-oil input (the D6 flag)
  D. price's role (the brent channel at the current settlement)
  E. dated replay (reused verbatim from candidate_validation.REPLAY)

The selected spec is printed at the end and written to
research/model/candidate/beta-odds-evaluation-2026-10-21.md. No scored
accuracy comparison is made: 6-7 weeks of record, the Nov 15 binary is
unresolved, and greater responsiveness is not demonstrated accuracy.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import branch_filter as bf
import branch_filter_candidate as bc
from candidate_validation import REPLAY

PRIOR = [0.10, 0.50, 0.40]   # the published judgment prior (unchanged in the beta)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "candidate", "beta-odds-evaluation-2026-10-21.md")


W_TANKERS = 0.5  # the tankers weight is unchanged across every configuration


def posterior_weighted(prior, transits, tankers, volume, w_t, w_vk, w_b):
    """Generalized current-state filter: per-channel weights w_t (transits),
    w_vk (volume or corridor-flow), w_b (brent). (0,0,0) plus no obs is
    degenerate and never called. Same likelihoods as branch_filter.py —
    only the weights move, so every row is directly comparable. The brent
    level is fixed at the Oct 20 settlement (108.79) wherever w_b > 0."""
    unnorm = []
    for i in range(3):
        l = 1.0
        if transits is not None:
            l *= bf.poisson_pmf(int(transits), bf.POISSON["transits"][i]) ** w_t
        if tankers is not None:
            l *= bf.poisson_pmf(int(tankers), bf.POISSON["tankers"][i]) ** W_TANKERS
        if volume is not None:
            l *= bf.volume_likelihood(volume)[i] ** w_vk
        if w_b > 0:
            mu, sd = bf.NORMAL["brent"][i]
            l *= bf.normal_pdf(108.79, mu, sd) ** w_b
        unnorm.append(prior[i] * l)
    s = sum(unnorm)
    return [u / s for u in unnorm]


def horizon(state):
    return bf.horizon_weights(state, bf.DEFAULT_TRANSITION)


def pct3(v, dp=1):
    return "  ".join(f"{x*100:.{dp}f}" for x in v)


def row(label, state, dp=1):
    hz = horizon(state)
    return f"| {label} | {pct3(state, dp)} | {pct3(hz, dp)} |"


def section_a():
    """Counts+volume vs volume-only, at identical inputs."""
    lines = ["## A. Counts+volume vs volume-only (identical inputs)", ""]
    for tag, t, v in (("refreshed inputs (transits 10, vol 7.894, data to Oct 17)", 10, 7.894),
                      ("identical old inputs (transits 12, vol 7.6)", 12, 7.6)):
        lines.append(f"### {tag}")
        lines.append("")
        lines.append("| configuration | STATE (holds/standoff/lapse) | HORIZON |")
        lines.append("|---|---|---|")
        st = posterior_weighted(PRIOR, t, 1, v, w_t=0.0, w_vk=1.0, w_b=0.0)
        lines.append(row("volume only (w_t=0)", st))
        st = posterior_weighted(PRIOR, t, 1, v, w_t=0.5, w_vk=1.0, w_b=0.0)
        lines.append(row("counts+volume, w_t=0.5 (BETA SPEC)", st))
        st = posterior_weighted(PRIOR, t, 1, v, w_t=1.0, w_vk=1.0, w_b=0.0)
        lines.append(row("counts+volume, w_t=1.0 (v2.4b channel mix, brent removed)", st))
        lines.append(f"| published v2.4b (with brent 108.79) [reference] | {pct3(bf.state_posterior(PRIOR, {'transits': t, 'tankers': 1, 'brent': 108.79, 'volume': v}))} | {pct3(horizon(bf.state_posterior(PRIOR, {'transits': t, 'tankers': 1, 'brent': 108.79, 'volume': v})))} |")
        lines.append("")
    lines += [
        "Read: at the CURRENT inputs all four configurations land in the same",
        "regime (standoff-dominated STATE, 15/50/35-class HORIZON) — the",
        "configuration choice does not change today's answer. It changes the",
        "REGIME-CHANGE answer: volume-only cannot see a count collapse (a",
        "routing/shuttle shift that moves barrels but not crossings), and",
        "w_t=1.0 double-counts the same corridor quantity twice (the documented",
        "hypothesis behind the 0.5 demotion). The count keeps cross-check force:",
        "it can still DISAGREE with the barrels (section B, vol 15 / t 10).",
        "",
    ]
    return lines


def section_b():
    """Transits-weight sensitivity at controlled (transits, volume) points."""
    lines = ["## B. Transits-count weight sensitivity (w_t sweep)", "",
             "HORIZON per configuration. The four (transits, volume) points span",
             "the current regime (10, 7.894), a partial recovery (12, 12.0) and",
             "(15, 15.0), and the pre-war volume with pre-war counts (20, 17.267)",
             "— the last two are the operating points the Oct 21 recheck flagged",
             "as count-dependent.", ""]
    lines.append("| (transits, vol) | w_t=0 (volume only) | w_t=0.25 | w_t=0.5 (BETA) | w_t=0.75 | w_t=1.0 |")
    lines.append("|---|---|---|---|---|---|")
    for t, v in ((10, 7.894), (12, 12.0), (15, 15.0), (20, 17.267)):
        cells = []
        for w in (0.0, 0.25, 0.5, 0.75, 1.0):
            st = posterior_weighted(PRIOR, t, 1, v, w_t=w, w_vk=1.0, w_b=0.0)
            cells.append(pct3(horizon(st)))
        lines.append(f"| ({t}, {v}) | " + " | ".join(cells) + " |")
    lines += [
        "",
        "Read: at the current regime (t 10, vol 7.894) the weight barely matters",
        "(holds 16.2% at w_t=0 vs 15.1% at w_t=1.0) — both channels agree on",
        "standoff. It matters when counts and barrels DISAGREE: at (12, 12.0)",
        "the count (12/day, near the standoff lambda 10) drags holds from",
        "22.0% (volume only) to 16.5% (w_t=1.0) — a stale count delays",
        "recognition of recovering barrels. At pre-war volume with pre-war",
        "counts (20, 17.267) the channels agree on recovery and the weight",
        "amplifies it (37.5% → 59.1%). The 0.5 weight is thus a stance on",
        "how fast the beta follows the barrels when the count lags: it splits",
        "the difference, it is a documented HYPOTHESIS not a calibrated",
        "optimum, and the sweep shows it is load-bearing — revisit as dated",
        "counts accumulate (first clean test: the November 2026 prints).",
        "",
    ]
    return lines


def section_c():
    """Volume medians vs the total-oil input (the D6 flag)."""
    lines = ["## C. Crude-anchored volume medians vs the total-oil input", "",
             "The volume medians (15.0 / 8.5 / 2.0) are anchored on Kpler",
             "crude-labeled observations; the current input is a TOTAL-OIL",
             "strait measure (pre-war 17.267). Effect at pre-war total-oil",
             "volume, varying the count (w_t=0.5, the beta spec):", ""]
    lines.append("| transits | volume 15.0 (median) | volume 17.267 (pre-war total oil) |")
    lines.append("|---|---|---|")
    for t in (10, 20):
        st_a = posterior_weighted(PRIOR, t, 1, 15.0, w_t=0.5, w_vk=1.0, w_b=0.0)
        st_b = posterior_weighted(PRIOR, t, 1, 17.267, w_t=0.5, w_vk=1.0, w_b=0.0)
        lines.append(f"| {t} | {pct3(st_a)} / {pct3(horizon(st_a))} | {pct3(st_b)} / {pct3(horizon(st_b))} |")
    lines += [
        "",
        "Read: at the pre-war count (t=20) the total-oil volume is already",
        "holds-dominant in the STATE posterior; at the CURRENT count (t=10) the",
        "count drags the HORIZON back toward standoff (23.0% holds) even at",
        "full pre-war volume — the barrels-vs-counts tension the recheck",
        "flagged. The median anchor mismatch (15.0 vs 17.267) shifts the holds/",
        "standoff dominance boundary but does not change any regime call in",
        "this range; it is carried as a documented uncalibrated parameter",
        "(refitting the medians to a same-definition total-oil series is a",
        "November recheck item, not a beta change).",
        "",
    ]
    return lines


def section_d():
    """Price's role."""
    lines = ["## D. Price's role (the brent channel at 108.79)", ""]
    mu_h, sd_h = bf.NORMAL["brent"][0]
    mu_s, sd_s = bf.NORMAL["brent"][1]
    mu_l, sd_l = bf.NORMAL["brent"][2]
    l = [bf.normal_pdf(108.79, mu, sd) for (mu, sd) in ((mu_h, sd_h), (mu_s, sd_s), (mu_l, sd_l))]
    s = sum(l)
    l = [x / s for x in l]
    lines.append(f"Normalized brent-channel contribution at 108.79 (before prior): "
                 f"holds {l[0]*100:.1f}% / standoff {l[1]*100:.1f}% / lapse {l[2]*100:.1f}%.")
    lines.append("")
    lines += [
        "Role in the beta: price is NOT a current-state observation (the",
        "candidate's removal stands — at 108.79 the channel puts 63.8% of its",
        "pull on LAPSE while throughput is at 45.7% of pre-war, the exact",
        "contamination the Oct 21 review flagged: freight, insurance and the",
        "risk premium are price, not corridor state). It keeps its two",
        "documented roles — the draw-rate band (elasticity, reference",
        "calculation only) and the judgment's EIA-spread future-risk trigger —",
        "i.e. it is FUTURE-RISK CONTEXT. A high price with recovered throughput",
        "therefore moves the beta odds only through the throughput channels",
        "(section B of the chain tests), never through the price channel.",
        "",
    ]
    return lines


def section_e():
    """Dated replay (reused from candidate_validation)."""
    lines = ["## E. Dated replay (identical to candidate_validation section D)", "",
             "Every observation is the one the dated log recorded at that date.",
             "`doc` is the HORIZON the log records as published (the model",
             "version as it then existed); `beta spec` re-runs the selected spec",
             "at those same logged observations. No scored accuracy comparison",
             "(6-7 week record; the Nov 15 binary is unresolved).", ""]
    lines.append("| date | inputs | published (documented) | beta spec (re-run) | note |")
    lines.append("|---|---|---|---|---|")
    for date, prior, obs, doc_hz, doc_ver, src in REPLAY:
        o = {k: v for k, v in obs.items() if k != "brent"}
        post, _ = bc.state_posterior_candidate(prior, o)
        hz = bf.horizon_weights(post, bf.DEFAULT_TRANSITION)
        obs_s = ", ".join(f"{k} {v}" for k, v in obs.items())
        lines.append(f"| {date} | {obs_s} | {'/'.join(f'{x:.1f}' for x in doc_hz)} | "
                     f"{'/'.join(f'{x*100:.1f}' for x in hz)} | {doc_ver} |")
    lines += ["",
              "The replay confirms the spec tracks the documented history (the",
              "Sep 30 row is a v2.3-vs-v2.4b version difference, recorded in",
              "the source table) and responds where the evidence moved.", ""]
    return lines


def selected_spec():
    return [
        "## Selected beta odds spec (v3)",
        "",
        "The beta odds spec IS the reviewed candidate filter, unchanged:",
        "",
        "- prior 0.10 / 0.50 / 0.40 (the published judgment; the beta changes",
        "  the POSTERIOR, never the prior)",
        "- volume channel: lognormal location family, medians 15.0 / 8.5 / 2.0,",
        "  shared sigma 0.35, weight 1.0, vol==0 closure limit — the structural",
        "  channel (Kpler strait transits, total oil, freshest same-definition",
        "  print; staleness reported via --volume-date)",
        "- transits channel: Poisson (20 / 10 / 2), weight 0.5 — a HYPOTHESIS",
        "  (the barrels-and-counts are one quantity measured two ways); the",
        "  sweep in section B shows the weight is load-bearing and the first",
        "  dated recheck is the November prints",
        "- tankers channel: Poisson (0.2 / 1.5 / 4.0), weight 0.5 — confirmed",
        "  tanker LOSSES in window (danger/loss, coexists with high exports)",
        "- brent: NOT a state observation (section D); future-risk context only",
        "- state->horizon: the documented judgment transition table",
        "  (holds 60/30/10, standoff 15/50/35, lapse 5/10/85) — future-",
        "  deterioration risk lives there, applied ONCE (no time-varying",
        "  re-transition in the storage weighting — that would double-count)",
        "",
        "Uncalibrated parameters (documented, not hidden): the 0.5 transits",
        "weight; the crude-anchored volume medians vs the total-oil input;",
        "the Poisson lambdas (judgment, never fitted); the transition table",
        "(judgment). Greater responsiveness of this spec is NOT claimed as",
        "greater accuracy.",
        "",
    ]


def main():
    lines = [
        "# Beta odds spec evaluation — 2026-10-21",
        "",
        "Filed with the beta forecast build (research/beta-forecast-v3-2026-10-21.md,",
        "section 2). Identical-input comparisons only; the published model, the",
        "published odds and the issued paths are untouched. Inputs: refreshed",
        "(transits 10 / tankers 1 / volume 7.894, Kpler data to Oct 17) and the",
        "identical old pair (transits 12 / volume 7.6).",
        "",
    ]
    lines += section_a()
    lines += section_b()
    lines += section_c()
    lines += section_d()
    lines += section_e()
    lines += selected_spec()
    text = "\n".join(lines)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write(text + "\n")
    print(text)
    print(f"\n[wrote {OUT}]")


if __name__ == "__main__":
    main()
