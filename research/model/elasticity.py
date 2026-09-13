#!/usr/bin/env python3
"""Elasticity-driven demand-destruction estimator.

Replaces the contested static agency figures (IEA -1.6 / EIA -1.2 / OPEC +0.58
mb/d) with a band computed from the literature's short-run own-price
elasticities applied to the observed price move.

Sources (research/2026-09-09_literature.md §3):
  - EIA working paper, "Review of Key International Demand Elasticities":
    short-run CRUDE own-price elasticity ~ -0.15 (upper end; the paper notes
    this assumes full pass-through).
  - Gasoline meta-analysis (Energy Economics 2007): short-run -0.34 (product
    level; crude-level response is smaller due to refining/tax wedge).
  - Dallas Fed (2020): newer evidence leans more elastic than the classics.

The tool reports a 3-point band at the crude level (eps = 0.05 / 0.10 / 0.15):
  - 0.05: low pass-through / conservative
  - 0.10: midpoint
  - 0.15: EIA headline, full pass-through

Two views:
  LEVEL: total implied destruction vs the pre-war base price, computed with
    the standard log-difference form  D = -D0 * eps * ln(P/P0).
    (v1.0 used the linear first-order form -D0*eps*(P-P0)/P0, which overstates
    by ~20% at the current +44% move; switched to log form Sep 11.)
  MARGINAL: additional destruction per $5 of Brent from last week's price
    (small step -- the linear form is exact to first order here, kept as-is).
    The marginal view is the right one for the weekly research log -- level
    effects partly reflect lag, and the physical supply loss dominates the
    price channel anyway (see model Assumption 1).

Usage:
  elasticity.py --price 100.71 --base 70 [--last-week-price 97.13] \
                [--demand 102.5] [--json]
"""
import argparse
import json
import math
import sys

EPS = [0.05, 0.10, 0.15]
EPS_LABELS = {
    0.05: "low pass-through (conservative)",
    0.10: "midpoint",
    0.15: "EIA headline (full pass-through)",
}
AGENCY = [
    ("IEA OMR (Sep)", -1.6),
    ("EIA", -1.2),
    ("OPEC MOMR", +0.58),
]


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--price", type=float, required=True, help="current Brent, $/bbl")
    ap.add_argument("--base", type=float, default=70.0,
                    help="pre-war base price, $/bbl (default 70)")
    ap.add_argument("--last-week-price", type=float, default=None,
                    help="last week's Brent, for the marginal view")
    ap.add_argument("--demand", type=float, default=102.5,
                    help="global liquids demand base, mb/d (default 102.5)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    if a.price <= 0 or a.base <= 0 or (a.last_week_price is not None and a.last_week_price <= 0):
        raise SystemExit("price, base and last-week price must all be > 0")

    level_pct = (a.price - a.base) / a.base
    level = {e: -a.demand * e * math.log(a.price / a.base) for e in EPS}
    marginal = None
    if a.last_week_price:
        d5 = 5.0 / a.last_week_price
        marginal = {e: -a.demand * e * d5 for e in EPS}

    out = {
        "price": a.price, "base": a.base, "demand_base_mbpd": a.demand,
        "level_change_pct": round(level_pct * 100, 1),
        "level_destruction_mbpd": {f"{e:.2f}": round(level[e], 2) for e in EPS},
        "band_mbpd": {"conservative": round(level[0.05], 2),
                      "headline": round(level[0.15], 2)},
        "formula": ("level: -D0*eps*ln(P/P0) (log-difference, v2.0 Sep 11); "
                    "marginal: -D0*eps*(5/P_last)"),
    }
    if marginal:
        out["last_week_price"] = a.last_week_price
        out["marginal_per_5usd_mbpd"] = {f"{e:.2f}": round(marginal[e], 2) for e in EPS}

    if a.json:
        print(json.dumps(out, indent=2))
        return

    print(f"Brent ${a.price:.2f} vs pre-war base ${a.base:.2f} "
          f"({level_pct*100:+.1f}%)  on {a.demand:.1f} mb/d of liquids")
    print("\nLEVEL (total implied destruction vs base; log-difference form):")
    for e in EPS:
        print(f"  eps={e:.2f}  ({EPS_LABELS[e]:<34}) {level[e]:+.2f} mb/d")
    if marginal:
        print(f"\nMARGINAL (per +$5 from last week's ${a.last_week_price:.2f}) "
              f"-- use this in the weekly log:")
        for e in EPS:
            print(f"  eps={e:.2f}  ({EPS_LABELS[e]:<34}) {marginal[e]:+.2f} mb/d")
    print("\nAgency figures for comparison (contested, static):")
    for name, v in AGENCY:
        print(f"  {name:<16} {v:+.2f} mb/d")
    print("\nNote: the band is an UPPER ENVELOPE for the price channel; agencies sit "
          "below it (lag, substitution, inventory effects). Physical supply loss "
          "dominates -- do not double-count.")


if __name__ == "__main__":
    main()
