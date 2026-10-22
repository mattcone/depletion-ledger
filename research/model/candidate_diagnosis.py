#!/usr/bin/env python3
"""Diagnosis of the branch filter's shipping-insensitivity (Oct 21 pass).

Read-only: imports branch_filter.py and reports, at the current logged
inputs, (1) the volume sweep, (2) CHANNEL ABLATIONS on the full filter
(removing one channel at a time; single-channel runs), (3) the
transition-matrix compression, (4) the stale/overlapping input notes.

Attribution of dominance uses the ablations, NOT single-channel ratios:
a channel's effect on the posterior depends on what else is present.

No model files are modified. Output: research/model/candidate/
diagnosis-2026-10-21.md (tables) + stdout.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import branch_filter as bf

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "candidate", "diagnosis-2026-10-21.md")

STATES = bf.STATES  # ["corridor-holds", "standoff", "corridor-lapsed"]
PRIOR = [0.10, 0.50, 0.40]

# current logged inputs (Oct 21 morning pass)
CUR = dict(transits=12, tankers=1, brent=108.79, volume=7.6)


def obs_without(obs, *channels):
    return {k: v for k, v in obs.items() if k not in channels}


def run(obs, prior=PRIOR):
    post = bf.state_posterior(prior, obs)
    return post, bf.horizon_weights(post, bf.DEFAULT_TRANSITION)


def fmt(x):
    if x >= 0.0001:
        return f"{x * 100:.3f}%"
    if x > 0:
        return f"{x:.3e}"
    return "0"


def main():
    L = []
    a = L.append
    a("# Branch filter diagnosis — why the shipping evidence barely moves the display")
    a("")
    a("Date: 2026-10-21 (revised after the external review at "
      "research/logs/review-model-candidate-2026-10-21.md: attribution now "
      "uses channel ablations on the full filter, not single-channel "
      "ratios). Read-only diagnosis of `branch_filter.py` (v2.4b).")
    a("")
    a(f"Current logged inputs: transits={CUR['transits']}, "
      f"tankers={CUR['tankers']}, brent={CUR['brent']}, "
      f"volume={CUR['volume']}, prior {PRIOR}.")
    a("")

    full_obs = dict(CUR)
    post_full, hz_full = run(full_obs)

    # ---- 1. the sweep -------------------------------------------------
    a("## 1. Volume sweep, all other inputs fixed (current model)")
    a("")
    a("| volume (mb/d) | STATE holds / standoff / lapse (unrounded) | HORIZON (rounded, as displayed) |")
    a("|---|---|---|")
    vols = [7.6, 8.0, 9.0, 10.0, 11.0, 13.0, 15.0, 17.3]
    first = last = None
    for v in vols:
        st, hz = run(dict(CUR, volume=v))
        if v == vols[0]:
            first = st
        if v == vols[-1]:
            last = st
        a(f"| {v:.1f} | {fmt(st[0])} / {fmt(st[1])} / {fmt(st[2])} "
          f"| {hz[0] * 100:.1f} / {hz[1] * 100:.1f} / {hz[2] * 100:.1f} |")
    a("")
    a(f"The holds-state share rises {first[0]:.3e} -> {last[0]:.3e} "
      f"({last[0] / first[0]:,.0f}x) across the full sweep — but the displayed "
      f"HORIZON rounds to the same 15.0 / 50.0 / 35.0 at every point, and the "
      f"displayed STATE is 0.0 / 100.0 / 0.0 at both ends.")

    # ---- 2. channel ablations ----------------------------------------
    a("")
    a("## 2. Channel ablations on the full filter (at the current inputs)")
    a("")
    a("Each row is the state posterior and HORIZON of the full filter with "
      "one channel removed (or with only that channel present). This is the "
      "attribution the review required: a channel's pull depends on the "
      "other channels present, so single-channel densities alone do not "
      "rank the forces.")
    a("")
    a("| configuration | STATE holds / standoff / lapse (unrounded) | HORIZON |")
    a("|---|---|---|")
    configs = [
        ("full filter (all four channels)", dict(CUR)),
        ("full minus Brent", obs_without(CUR, "brent")),
        ("full minus transits", obs_without(CUR, "transits")),
        ("full minus volume", obs_without(CUR, "volume")),
        ("full minus tanker losses", obs_without(CUR, "tankers")),
        ("Brent only", {"brent": CUR["brent"]}),
        ("transits only", {"transits": CUR["transits"]}),
        ("volume only", {"volume": CUR["volume"]}),
        ("tanker losses only", {"tankers": CUR["tankers"]}),
    ]
    for name, obs in configs:
        st, hz = run(obs)
        a(f"| {name} | {fmt(st[0])} / {fmt(st[1])} / {fmt(st[2])} "
          f"| {hz[0] * 100:.1f} / {hz[1] * 100:.1f} / {hz[2] * 100:.1f} |")
    a("")
    a("Reading (rows are posteriors at prior 10/50/40): ")
    a("")
    a("- Removing **Brent** is the only single removal that moves the "
      "state by orders of magnitude (holds-share 3.0e-08 -> 0.413%): the "
      "price channel is the dominant force against 'holds' in the full "
      "filter. Removing transits, volume or losses leaves the state "
      "essentially pinned (the count and volume channels jointly point at "
      "standoff at the current values, as does the prior).")
    a("- **Brent only** is the cleanest statement of the price channel's "
      "direction: by itself, at 108.79, it puts 41.5% of the state at "
      "standoff and **58.5% at LAPSE** (HORIZON 9.1/26.6/64.3). Its "
      "normalized pull is 64% lapse / 36% standoff — the only one of the "
      "four channels that pulls mostly at closure at the current data.")
    a("- **Transits only** by itself does NOT pin the state at 100% "
      "standoff: the count likelihood normalizes to ~15.7% holds / "
      "~84.3% standoff / ~0.001% lapse (review-verified, before the "
      "prior); with the 10/50/40 prior the posterior is the table's 3.6/"
      "96.4/0.0000009. The near-pinned full-filter state is the product of "
      "the count, price, volume and loss channels together.")

    # ---- 3. price ------------------------------------------------------
    a("## 3. The Brent channel at the current price")
    a("")
    bv = tuple(bf.normal_pdf(CUR["brent"], mu, sd)
               for mu, sd in bf.NORMAL["brent"])
    ratio = bv[0] / bv[1]
    a(f"Raw normal densities at Brent {CUR['brent']}: holds {bv[0]:.3e}, "
      f"standoff {bv[1]:.3e}, lapse {bv[2]:.3e} (raw holds/standoff ratio "
      f"~{1 / ratio:,.0f}:1 — a density ratio, not a posterior share). The "
      f"ablation table quantifies the consequence: with the price channel "
      f"present the state is pinned at ~100% standoff with a 3.0e-08 holds "
      f"share; without it the holds share is 0.413% — a ~1.4e7 difference, "
      f"the largest single-channel effect in the filter. And the price "
      f"channel's pull at this level points mostly at LAPSE (its N(108,12) "
      f"density peaks at 108.79; normalized pull 64% lapse / 36% standoff): "
      f"the dominant force in the posterior is a *price* observation "
      f"reading 'expensive ≈ closing'. The level is contaminated as a "
      f"current-state observation — it embeds freight (~half the premium "
      f"per Kpler), war-risk insurance, gasoil crack tightness ($80-90) and "
      f"the risk premium, not only corridor state — and its parameters "
      f"(N(88,4)/N(97,9)/N(108,12)) are judgment, never fitted.")

    # ---- 4. transition compression -------------------------------------
    a("")
    a("## 4. The transition matrix compresses the residual")
    a("")
    a("HORIZON = STATE x the fixed judgment transition rows:")
    a("")
    a("| from \\ to | holds | standoff | lapse |")
    a("|---|---|---|---|")
    for i, s in enumerate(STATES):
        row = bf.DEFAULT_TRANSITION[i]
        a(f"| {s} | {row[0] * 100:.0f}% | {row[1] * 100:.0f}% | {row[2] * 100:.0f}% |")
    a("")
    a("With the state ~100% standoff, the HORIZON is ~the standoff row "
      "(15/50/35) regardless of the tiny holds/lapse residual. A 45x change "
      "in the holds-state share (section 1) maps to <1 pt on the displayed "
      "HORIZON. The matrix is the judgment's documented table — it is the "
      "right place for *future-deterioration* risk, but it also means the "
      "display cannot reflect current-state movement smaller than ~the prior "
      "mass on the non-dominant states.")

    # ---- 5. stale inputs ------------------------------------------------
    a("")
    a("## 5. Stale and overlapping inputs")
    a("")
    a(f"- volume {CUR['volume']} mb/d is the Oct 14 briefing's 7-day average (data to "
      "Oct 12). The same-definition successor (Oct 19 briefing, data to Oct 17) "
      "is 7.894 — the input is 9 days stale as of the Oct 21 pass. The input "
      "history is mixed-basis: 7.4 / 10.3 / 10.1 were Kpler Hormuz CRUDE "
      "throughput prints (Sep 28 – Oct 14 logs); 7.6 onward is the briefing's "
      "TOTAL-oil strait transits — the shared volume medians (15.0/8.5/2.0) "
      "were anchored on the crude series, so the total-oil input inherits a "
      "crude-anchored calibration (a known limitation of the current code "
      "too, not a candidate change).")
    a(f"- transits {CUR['transits']}/day is a 3-day average of Kpler daily tanker "
      "crossings (Oct 5/6/7: 20+/7/10, the documented model window "
      "convention). The Oct 19 briefing's 7-day average is 10/day; the Oct 17 "
      "daily count is 6. Using the 7-day average (10) instead of the 3-day "
      "average (12) is a window-convention change that has not been tested "
      "separately — it is carried in the input-refresh comparison, not "
      "isolated.")
    a("- transits and volume are the same underlying quantity (corridor "
      "function) measured two ways (vessel counts vs barrels). The briefing "
      "counts 34 of 43 Oct 14-17 crossings as dark/unknown-route — those "
      "movements are INCLUDED in the count (Kpler's dark-transit methodology "
      "confirms them via satellite imagery + human intelligence against a "
      "binary standard), so 79% is a route-coverage statistic, NOT a miss "
      "rate: the count series is not an AIS-only floor. Counts and barrels "
      "can still diverge for reasons unrelated to AIS (cargo sizes, load "
      "factors, shuttle geometry), so multiplying both at weight 1.0 is a "
      "plausible double-count — but the 0.5 demotion in the candidate is a "
      "HYPOTHESIS (the Sep 21 refactor proposal's intent), not a calibrated "
      "joint likelihood.")
    a("- brent 108.79 as a *current-state* observation is contaminated (see "
      "section 3); as a *future-risk* observation it is the EIA-spread "
      "trigger that already lives in the judgment, not in the filter.")

    # ---- 6. counterfactual preview --------------------------------------
    a("")
    a("## 6. Preview: same inputs, price removed from the state filter, transits at 0.5")
    a("")
    a("Not a model change — a counterfactual computed from the existing "
      "channel functions (one different weight, one channel omitted), to show "
      "the residual shipping information is not absent, only swamped. The "
      "volume input is updated to the same-definition Oct 19 print (7.894). "
      "(This is what the candidate module now implements; the module is the "
      "authoritative source.)")
    a("")
    a("| volume (mb/d) | STATE (no price; transits w=0.5) | HORIZON |")
    a("|---|---|---|")
    for v in (7.894, 10.0, 15.0, 17.3):
        obs = {"transits": CUR["transits"], "tankers": CUR["tankers"], "volume": v}
        unnorm = []
        for i in range(3):
            l = bf.poisson_pmf(obs["transits"], bf.POISSON["transits"][i]) ** 0.5
            l *= bf.poisson_pmf(obs["tankers"], bf.POISSON["tankers"][i]) ** bf.SIGNAL_WEIGHTS["tankers"]
            l *= bf.volume_likelihood(obs["volume"])[i] ** bf.SIGNAL_WEIGHTS["corridor_flow"]
            unnorm.append(PRIOR[i] * l)
        s = sum(unnorm)
        st = [u / s for u in unnorm]
        hz = bf.horizon_weights(st, bf.DEFAULT_TRANSITION)
        a(f"| {v} | {fmt(st[0])} / {fmt(st[1])} / {fmt(st[2])} "
          f"| {hz[0] * 100:.1f} / {hz[1] * 100:.1f} / {hz[2] * 100:.1f} |")
    a("")
    a("The volume channel now moves the displayed HORIZON monotonically "
      "(holds up, lapse down as volume rises): the corridor-function "
      "information was present; the channel mix hid it.")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write("\n".join(L) + "\n")
    print("\n".join(L))
    print(f"\n[written] {OUT}")


if __name__ == "__main__":
    main()
