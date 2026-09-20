#!/usr/bin/env python3
"""Score the published forecast records (EIA path, persistence baseline, three scenarios)
against IEA OMR observations, frozen-at-issue.

Input (one file per OMR edition, e.g. outcomes-2026-10.json):
    {
      "edition": "IEA OMR, October 2026 (published 2026-10-12)",
      "published_date": "2026-10-12",
      "source_url": "https://www.iea.org/reports/...",
      "outcomes": {
        "2026-09": { "monthly_mb": -120.0, "cumulative_mb": -627.0 },
        ...
      }
    }
  - edition: the source edition string (stored with the outcome it first filled).
  - published_date: YYYY-MM-DD, the edition's publication date. Used to validate
    publication order: an edition OLDER than the stored latest observation for a
    period is refused, not silently applied.
  - Either monthly_mb or cumulative_mb may be null (or absent) — the two measures
    are published, scored, and frozen independently. An edition that publishes only
    one of them is usable.

Behaviour:
  - Scores are ALWAYS computed from the effective FIRST-RELEASE value per measure:
    the value first published for that measure, frozen. Later editions may change
    outcome_latest (revisions), but never a historical score.
  - The first publication of a measure is frozen into outcome_first_release with
    its own edition string; a later cumulative value can be added without
    replacing an earlier monthly value, and vice versa.
  - outcome_latest tracks the most recent value per measure, with its edition and
    the edition's published_date; "revisions" counts ACTUAL value changes
    (initial publication = 1; an edition republishing an unchanged value, or a
    re-import of the same input, adds nothing).
  - Dry run (default) prints the score table and touches nothing. --apply writes
    the records. Re-running the same file with --apply leaves the records
    unchanged.

Reading the results (kept in the docstring so it stays visible): these comparisons
show how closely each published path matched the reported stock change and the
persistence baseline. They do NOT identify which production or demand assumption
was wrong — the observed combined balance cannot distinguish the two, and
different error combinations produce the same net change — and selecting the
closest scenario after seeing the outcome is not evidence of predictive skill.
"""
import argparse
import json
import re
import sys
from datetime import date

DATA_DEFAULT = "/home/mcone/depletion-ledger/site/src/data/world-stocks.json"

# Persistence comparisons use the SAVED persistence record's own targets (frozen
# at issue), not a re-created baseline from a global constant.


def die(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def load_outcomes(path):
    try:
        f = json.load(open(path))
    except Exception as e:
        die(f"cannot read outcomes file: {e}")
    for field in ("edition", "published_date", "source_url", "outcomes"):
        if field not in f:
            die(f"outcomes file missing field: {field}")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", f["published_date"]):
        die(f"published_date must be YYYY-MM-DD, got: {f['published_date']}")
    date.fromisoformat(f["published_date"])
    for period, o in f["outcomes"].items():
        if not re.match(r"^\d{4}-\d{2}$", period):
            die(f"bad period key: {period}")
        for m in ("monthly_mb", "cumulative_mb"):
            if o.get(m) is not None and not isinstance(o[m], (int, float)):
                die(f"{period}.{m} must be a number or null")
    return f


def fmt_err(x):
    return "N/A" if x is None else f"{x:+.1f}"


def err(measure, target):
    """Absolute error for one measure, or None when either side is missing."""
    if measure is None or target is None:
        return None
    return abs(measure - target)


def effective_first(stored, incoming, edition):
    """Merge incoming values under the stored first release: per measure, the
    stored first publication always wins; a measure never published before takes
    the incoming value with the incoming edition string."""
    ef = {k: stored[k] for k in ("monthly_mb", "monthly_published",
                                 "cumulative_mb", "cumulative_published")}
    if incoming:
        if ef["monthly_mb"] is None and incoming.get("monthly_mb") is not None:
            ef["monthly_mb"] = incoming["monthly_mb"]
            ef["monthly_published"] = edition
        if ef["cumulative_mb"] is None and incoming.get("cumulative_mb") is not None:
            ef["cumulative_mb"] = incoming["cumulative_mb"]
            ef["cumulative_published"] = edition
    return ef


def record_first(target):
    return target.get("outcome_first_release") or {
        "monthly_mb": None, "monthly_published": None,
        "cumulative_mb": None, "cumulative_published": None}


def record_latest(target):
    return target.get("outcome_latest") or {
        "monthly_mb": None, "monthly_published": None,
        "cumulative_mb": None, "cumulative_published": None,
        "revisions": 0, "published_date": None}


def score(data, outcomes):
    """Print the score table from EFFECTIVE FIRST-RELEASE values (stored first
    releases take precedence; the incoming edition fills only never-published
    measures). Never mutates. Persistence errors use the saved persistence
    record's frozen targets."""
    pers_targets = {}
    for rec in data["forecast_records"]:
        if rec["record_id"].startswith("persistence"):
            pers_targets = {t["period"]: t for t in rec["targets"]}
    rows = []
    for period, inc in sorted(outcomes["outcomes"].items()):
        rows.append({"period": period, "inc": inc})
    if not rows:
        print("no outcome periods in the file")
        return
    print(f"Edition: {outcomes['edition']}  (published {outcomes['published_date']})")
    print(f"Source: {outcomes['source_url']}\n")
    for row in rows:
        period, inc = row["period"], row["inc"]
        # effective first release = stored first release, else incoming (no target
        # involved at this level — persistence only needs the measures)
        stored_any = None
        for rec in data["forecast_records"]:
            for t in rec["targets"]:
                if t["period"] == period:
                    stored_any = record_first(t)
        ef = effective_first(stored_any or {"monthly_mb": None, "monthly_published": None,
                                            "cumulative_mb": None, "cumulative_published": None},
                             inc, outcomes["edition"])
        print(f"{period}:  monthly {ef['monthly_mb']}   cumulative {ef['cumulative_mb']}"
              f"   (first release: {ef['monthly_published'] or 'not yet published'})")
        # persistence row, scored from the effective first release against the
        # saved persistence record's frozen targets (N/A outside its horizon)
        if period in pers_targets:
            m_err = err(ef["monthly_mb"], pers_targets[period]["target_monthly_mb"])
            c_err = err(ef["cumulative_mb"], pers_targets[period]["target_cumulative_mb"])
        else:
            m_err = c_err = None
        print(f"  persistence:        monthly err {fmt_err(m_err)}   cumulative err {fmt_err(c_err)}")
        # each record
        for rec in data["forecast_records"]:
            targets = {t["period"]: t for t in rec["targets"]}
            if period not in targets:
                continue
            t = targets[period]
            eff = effective_first(record_first(t), inc, outcomes["edition"])
            m_err = err(eff["monthly_mb"], t["target_monthly_mb"])
            c_err = err(eff["cumulative_mb"], t["target_cumulative_mb"])
            print(f"  {rec['record_id']}:  monthly err {fmt_err(m_err)}   cumulative err {fmt_err(c_err)}")
        print()


def apply_outcomes(data, outcomes):
    """Mutate the records. Per measure, independently:
      - first release frozen at first publication (with that edition's string);
      - latest tracks the newest value, counting actual value changes as
        revisions (initial publication = 1);
      - an edition older than the stored latest for a period is refused."""
    n_first = n_latest = 0
    refused = []
    for period, inc in sorted(outcomes["outcomes"].items()):
        for rec in data["forecast_records"]:
            for t in rec["targets"]:
                if t["period"] != period:
                    continue
                fr = record_first(t)
                latest = record_latest(t)
                # publication-order guard
                if latest["published_date"] and outcomes["published_date"] < latest["published_date"]:
                    refused.append(f"{rec['record_id']} {period}: incoming edition published "
                                   f"{outcomes['published_date']} is OLDER than the stored latest "
                                   f"({latest['published_date']}); skipped")
                    continue
                changed = False
                for m, pub in (("monthly_mb", "monthly_published"),
                               ("cumulative_mb", "cumulative_published")):
                    pv = inc.get(m)
                    if pv is None:
                        continue
                    if fr[m] is None:
                        fr[m] = pv
                        fr[pub] = outcomes["edition"]
                        n_first += 1
                    if latest[m] != pv:
                        changed = True
                    if latest[pub] != outcomes["edition"]:
                        latest[pub] = outcomes["edition"]
                        latest["published_date"] = outcomes["published_date"]
                    if latest[m] != pv:
                        latest[m] = pv
                        n_latest += 1
                if changed:
                    latest["revisions"] += 1
                t["outcome_first_release"] = fr
                t["outcome_latest"] = latest
    for r in refused:
        print(f"REFUSED: {r}", file=sys.stderr)
    print(f"applied: {n_first} first-release fill(s), {n_latest} latest update(s)")
    if refused:
        print(f"{len(refused)} period(s) refused (publication order)")
    return not refused


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("outcomes", help="outcomes JSON file for one OMR edition")
    ap.add_argument("--data", default=DATA_DEFAULT)
    ap.add_argument("--apply", action="store_true",
                    help="write the records (default: dry run)")
    args = ap.parse_args()

    outcomes = load_outcomes(args.outcomes)
    data = json.load(open(args.data))
    if not args.apply:
        score(data, outcomes)
        return
    if not apply_outcomes(data, outcomes):
        die("refused imports present; nothing written")
    json.dump(data, open(args.data, "w"), indent=1)
    open(args.data, "a").write("\n")
    print(f"wrote {args.data}")


if __name__ == "__main__":
    main()
