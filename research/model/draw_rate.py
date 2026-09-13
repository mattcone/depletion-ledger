#!/usr/bin/env python3
"""Price-triggered SPR draw-rate estimator + runway table.

Replaces the flat 0.45M b/d draw assumption with a step function, calibrated
on the two regimes actually observed in WPSR data (pre-escalation ~0.44M b/d
at Brent ~$90-97; early-war ~0.81M b/d at Brent >$97, Sep 4-9 escalation).

Bands (author's judgment, see research/2026-09-09_literature.md §1):
  corridor lapse ............ 1.35M b/d  (model §4 lapse range 1.2-1.4)
  Brent >= $120 ............. 1.00M b/d  (extrapolation)
  $100 <= Brent < $120 ...... 0.70M b/d  (Sep 7 banner re-escalation pace)
  $90  <= Brent < $100 ...... 0.45M b/d  (observed, w/e Aug 28 = 443K b/d)
  Brent < $90 ............... 0.30M b/d  (pre-escalation baseline)

Modifiers (product-scarcity triggers, documented heuristic):
  PADD1 days-of-cover < 10  -> +0.15M b/d
  PADD1 days-of-cover < 5   -> +0.30M b/d

Usage:
  draw_rate.py --brent 100.71 --spr 286.6 --spr-date 2026-08-28 \
               [--asof 2026-09-09] [--padd1-days 12] [--lapse] [--json]

Note: the WPSR level is dated (week ending). With --asof, the script shows
both the reported level and a level adjusted for elapsed draw at the selected
rate, and computes the runway from the adjusted level.
"""
import argparse
import json
import sys
from datetime import date, timedelta

FLOORS = [
    (250.0, "250M operational floor (GEF)"),
    (180.0, "180M hard-operable floor"),
    (70.0, "70M DOE safe minimum"),
]


def parse_date(s):
    return date.fromisoformat(s)


def select_rate(brent, padd1_days=None, lapse=False):
    notes = []
    if lapse:
        rate, label = 1.35, "corridor lapse"
    elif brent >= 120:
        rate, label = 1.00, "Brent >= $120"
    elif brent >= 100:
        rate, label = 0.70, "$100 <= Brent < $120"
    elif brent >= 90:
        rate, label = 0.45, "$90 <= Brent < $100"
    else:
        rate, label = 0.30, "Brent < $90"
    if padd1_days is not None:
        if padd1_days < 5:
            rate += 0.30
            notes.append("PADD1 < 5d cover: +0.30M")
        elif padd1_days < 10:
            rate += 0.15
            notes.append("PADD1 < 10d cover: +0.15M")
    return rate, label, notes


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--brent", type=float, required=True, help="Brent price, $/bbl")
    ap.add_argument("--spr", type=float, required=True,
                    help="SPR level, million bbl (last WPSR)")
    ap.add_argument("--spr-date", type=str, required=True,
                    help="week-ending date of the SPR level, ISO (e.g. 2026-08-28)")
    ap.add_argument("--asof", type=str, default=None,
                    help="analysis date, ISO; defaults to spr-date (no adjustment)")
    ap.add_argument("--padd1-days", type=float, default=None,
                    help="PADD1 (East Coast) days-of-cover, for the modifier")
    ap.add_argument("--lapse", action="store_true", help="assume corridor-lapse pace")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    a = ap.parse_args()

    spr_date = parse_date(a.spr_date)
    asof = parse_date(a.asof) if a.asof else spr_date
    if asof < spr_date:
        sys.exit("asof cannot be before spr-date")

    rate, label, notes = select_rate(a.brent, a.padd1_days, a.lapse)
    elapsed_days = (asof - spr_date).days
    adj = a.spr - rate * elapsed_days  # level as of `asof` at the selected rate

    rows = []
    for floor, name in FLOORS:
        if adj <= floor:
            rows.append((floor, name, 0, asof, "already at/below floor"))
        else:
            days = (adj - floor) / rate
            rows.append((floor, name, days, asof + timedelta(days=round(days)), ""))

    out = {
        "model": "step-function draw rate (Sep 9 WPSR calibration; bands + PADD1 modifier)",
        "brent": a.brent,
        "spr_reported_m": a.spr,
        "spr_reported_asof": str(spr_date),
        "spr_adjusted_m": round(adj, 1),
        "spr_adjusted_asof": str(asof),
        "rate_mmbd": rate,
        "band": label,
        "modifiers": notes,
        "runway": [
            {"floor_m": f, "name": n, "days": round(d, 1), "date": str(dt), "note": note}
            for f, n, d, dt, note in rows
        ],
    }

    if a.json:
        print(json.dumps(out, indent=2))
        return

    print(f"Brent ${a.brent:.2f}  ->  draw band: {label}  =  {rate:.2f}M b/d")
    for n in notes:
        print(f"  modifier: {n}")
    if elapsed_days:
        print(f"SPR: {a.spr:.1f}M (w/e {spr_date})  ->  ~{adj:.1f}M as of {asof} "
              f"({elapsed_days}d at {rate:.2f}M b/d)")
    else:
        print(f"SPR: {a.spr:.1f}M (w/e {spr_date})")
    print("Runway (from adjusted level):")
    for f, n, d, dt, note in rows:
        if note:
            print(f"  {f:>5.0f}M  {n:<32} {note}")
        else:
            print(f"  {f:>5.0f}M  {n:<32} ~{d:5.0f} days  (~{dt.isoformat()})")


if __name__ == "__main__":
    main()
