#!/usr/bin/env python3
"""Regression tests for the depletion model scripts (stdlib only).

Pins the documented worked examples (research/model/README.md) plus the v2.0
fixes, so a future edit that changes any published number -- or crashes on a
legitimate input -- fails loudly instead of drifting into the research logs.

Run:  python3 test_model.py
"""
import json
import math
import os
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import branch_filter  # noqa: E402
import draw_rate      # noqa: E402
import elasticity     # noqa: E402


def run(script, *args):
    """Run a CLI script; return (returncode, stdout, stderr)."""
    p = subprocess.run([sys.executable, os.path.join(HERE, script), *args],
                       capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


def run_json(script, *args):
    rc, out, err = run(script, *args, "--json")
    assert rc == 0, f"{script} {args} failed: {err}"
    return json.loads(out)


class TestDrawRate(unittest.TestCase):
    def test_band_boundaries(self):
        s = draw_rate.select_rate
        self.assertEqual(s(89.99)[0], 0.30)
        self.assertEqual(s(90.0)[0], 0.45)
        self.assertEqual(s(99.99)[0], 0.45)
        self.assertEqual(s(100.0)[0], 0.70)
        self.assertEqual(s(119.99)[0], 0.70)
        self.assertEqual(s(120.0)[0], 1.00)
        self.assertEqual(s(100.0, lapse=True)[0], 1.35)

    def test_padd1_modifiers(self):
        self.assertEqual(draw_rate.select_rate(95, padd1_days=12)[0], 0.45)
        self.assertAlmostEqual(draw_rate.select_rate(95, padd1_days=9.5)[0], 0.60)
        self.assertAlmostEqual(draw_rate.select_rate(95, padd1_days=4.5)[0], 0.75)

    def test_documented_sep9_run(self):
        out = run_json("draw_rate.py", "--brent", "100.71", "--spr", "286.6",
                       "--spr-date", "2026-08-28", "--asof", "2026-09-09",
                       "--padd1-days", "12")
        self.assertEqual(out["rate_mmbd"], 0.70)
        self.assertEqual(out["spr_adjusted_m"], 278.2)
        runway = {r["floor_m"]: r for r in out["runway"]}
        self.assertEqual((runway[250.0]["days"], runway[250.0]["date"]),
                         (40.3, "2026-10-19"))
        self.assertEqual((runway[180.0]["days"], runway[180.0]["date"]),
                         (140.3, "2027-01-27"))

    def test_documented_sep9_lapse_run(self):
        out = run_json("draw_rate.py", "--brent", "100.71", "--spr", "286.6",
                       "--spr-date", "2026-08-28", "--asof", "2026-09-09", "--lapse")
        runway = {r["floor_m"]: r for r in out["runway"]}
        self.assertEqual((runway[250.0]["days"], runway[250.0]["date"]),
                         (15.1, "2026-09-24"))

    def test_reported_pace_runway(self):
        # v2.1 (Sep 16): second runway table at the actual DOE pace
        out = run_json("draw_rate.py", "--brent", "108.75", "--spr", "284.957",
                       "--spr-date", "2026-09-11", "--asof", "2026-09-16",
                       "--reported-pace", "0.058")
        runway = {r["floor_m"]: r for r in out["runway"]}
        self.assertEqual((runway[250.0]["days"], runway[250.0]["date"]),
                         (44.9, "2026-10-31"))
        self.assertIn("SCENARIO", out["note"].upper())
        self.assertEqual(out["spr_adjusted_at_reported_pace_m"], 284.7)
        rep = {r["floor_m"]: r for r in out["runway_reported_pace"]}
        self.assertEqual((rep[250.0]["days"], rep[250.0]["date"]),
                         (597.7, "2028-05-06"))

    def test_reported_pace_guard(self):
        rc, _, err = run("draw_rate.py", "--brent", "105", "--spr", "285",
                         "--spr-date", "2026-09-11", "--reported-pace", "0")
        self.assertNotEqual(rc, 0)
        self.assertIn("must be > 0", err)


class TestElasticity(unittest.TestCase):
    def test_marginal_unchanged_by_log_form_switch(self):
        out = run_json("elasticity.py", "--price", "100.71", "--base", "70",
                       "--last-week-price", "97.13")
        m = out["marginal_per_5usd_mbpd"]
        self.assertEqual((m["0.05"], m["0.10"], m["0.15"]), (-0.26, -0.53, -0.79))

    def test_level_is_log_form(self):
        out = run_json("elasticity.py", "--price", "100.71", "--base", "70")
        l = out["level_destruction_mbpd"]
        self.assertEqual((l["0.05"], l["0.10"], l["0.15"]), (-1.86, -3.73, -5.59))
        # explicit band keys (was an order-ambiguous two-element list)
        self.assertEqual(out["band_mbpd"], {"conservative": -1.86, "headline": -5.59})
        self.assertIn("ln(P/P0)", out["formula"])

    def test_zero_price_guard(self):
        for arg in (["--price", "100", "--base", "0"], ["--price", "0", "--base", "70"]):
            rc, _, err = run("elasticity.py", *arg)
            self.assertNotEqual(rc, 0)
            self.assertIn("must all be > 0", err)


class TestBranchFilter(unittest.TestCase):
    def test_poisson_no_overflow(self):
        # no overflow; far-tail pmf is negligibly small (effectively zeroes the state)
        self.assertLess(branch_filter.poisson_pmf(300, 20.0), 1e-100)
        self.assertAlmostEqual(branch_filter.poisson_pmf(10, 10.0), 0.12511, places=4)

    def test_documented_sep9_run(self):
        post = branch_filter.state_posterior(
            [0.15, 0.50, 0.35], {"transits": 10, "tankers": 10, "brent": 100.71})
        self.assertGreater(post[1], 0.99)  # standoff ~99.4%
        h = branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
        self.assertEqual([round(x * 100, 1) for x in h], [14.9, 49.8, 35.3])

    def test_documented_sep10_run_v1(self):
        # logged in MODEL-internal.md §2.2: horizon 8.5/23.9/67.6
        post = branch_filter.state_posterior(
            [0.10, 0.50, 0.40], {"transits": 7, "tankers": 10, "brent": 108.03})
        h = branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
        self.assertEqual([round(x * 100, 1) for x in h], [8.5, 23.9, 67.6])

    def test_corridor_flow_pulls_toward_judgment(self):
        # v2.0 structural signal: 'degraded' encodes contested-not-closed
        obs = {"transits": 7, "tankers": 10, "brent": 108.03}
        post = branch_filter.state_posterior([0.10, 0.50, 0.40], obs)
        h_v1 = branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
        obs["corridor_flow"] = "degraded"
        post2 = branch_filter.state_posterior([0.10, 0.50, 0.40], obs)
        h_v2 = branch_filter.horizon_weights(post2, branch_filter.DEFAULT_TRANSITION)
        self.assertEqual([round(x * 100, 1) for x in h_v2], [12.1, 38.5, 49.3])
        self.assertLess(h_v2[2], h_v1[2])  # lapse weight falls toward judgment (40)

    def test_volume_anchor_dominance(self):
        # v2.4b: single-sigma location family anchored on the sourced Kpler
        # prints (holds, standoff, lapse): the Aug 18 2.0M near-closed print
        # is lapse-dominant, the Sep 7.4M print is standoff-dominant, the
        # pre-war ~15M is holds-dominant
        l = branch_filter.volume_likelihood
        share = lambda v: [x / sum(l(v)) for x in l(v)]  # normalized
        self.assertEqual(max(l(2.0)), l(2.0)[2])
        self.assertGreater(share(2.0)[2], 0.99)
        self.assertEqual(max(l(7.4)), l(7.4)[1])
        self.assertGreater(share(7.4)[1], 0.85)
        self.assertEqual(max(l(15.0)), l(15.0)[0])
        self.assertGreater(share(15.0)[0], 0.75)

    def test_volume_channel_dominance_monotone(self):
        # v2.4b (Oct 1 review, structural requirement): test the volume
        # channel DIRECTLY, independently of any other input. Every pairwise
        # likelihood ratio must be strictly increasing in vol (with equal
        # sigmas ln(r_ij) is linear in ln vol -- one crossing), so (a) the
        # dominance ordering never backtracks and (b) more throughput never
        # shifts evidence toward a worse corridor state -- including the far
        # tails that broke v2.4 (widest sigma won both tails: holds 92.1%
        # at 17M -> 45.0% at 25M, lapse-dominant at 1000M; vol->inf must be
        # holds-dominant)
        l = branch_filter.volume_likelihood
        share = lambda v: [x / sum(l(v)) for x in l(v)]
        names = ["holds", "standoff", "lapse"]
        rank = {"lapse": 0, "standoff": 1, "holds": 2}
        vs = [x / 10 for x in range(1, 400)]  # 0.1 .. 39.9 M bpd
        r_hs = [share(v)[0] / share(v)[1] for v in vs]
        r_sl = [share(v)[1] / share(v)[2] for v in vs]
        for a, b in zip(r_hs, r_hs[1:]):
            self.assertLess(a, b)  # holds/standoff strictly increasing
        for a, b in zip(r_sl, r_sl[1:]):
            self.assertLess(a, b)  # standoff/lapse strictly increasing
        ranks = [rank[names[max(range(3), key=lambda i: share(v)[i])]]
                 for v in vs]
        for a, b in zip(ranks, ranks[1:]):
            self.assertLessEqual(a, b)  # dominance never backtracks
        # dominance windows: geometric means of the medians (sigma-independent)
        self.assertEqual(names[max(range(3), key=lambda i: share(3.0)[i])], "lapse")
        self.assertEqual(names[max(range(3), key=lambda i: share(8.5)[i])], "standoff")
        self.assertEqual(names[max(range(3), key=lambda i: share(15.0)[i])], "holds")
        # far tails: vol -> inf holds-dominant (the v2.4 bug), vol -> 0 lapse
        for v in (100.0, 1000.0, 10000.0):
            self.assertEqual(names[max(range(3), key=lambda i: share(v)[i])], "holds")
        for v in (0.001, 0.01, 0.1):
            self.assertEqual(names[max(range(3), key=lambda i: share(v)[i])], "lapse")

    def test_volume_graded_not_categorical(self):
        # v2.4: 7.4 and 9.719 no longer collapse to the same vector (v2.3
        # mapped both to 'degraded'); the posterior must differ
        base = {"transits": 9, "tankers": 1, "brent": 104.32}
        p1 = branch_filter.state_posterior(
            [0.10, 0.40, 0.50], dict(base, volume=7.4))
        p2 = branch_filter.state_posterior(
            [0.10, 0.40, 0.50], dict(base, volume=9.719))
        self.assertNotEqual([round(x, 6) for x in p1],
                            [round(x, 6) for x in p2])

    def test_volume_horizon_monotonic(self):
        # v2.4: the HORIZON lapse weight is non-increasing in volume -- the
        # whole point of the graded likelihood (v2.3 was FLAT above 10M)
        base = {"transits": 5, "tankers": 1, "brent": 103.50}
        prior = [0.10, 0.50, 0.40]
        prev = None
        for v in (2.0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20):
            post = branch_filter.state_posterior(prior, dict(base, volume=v))
            h = branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
            if prev is not None:
                self.assertLessEqual(h[2], prev + 1e-12)
            prev = h[2]

    def test_volume_current_data_v2_4(self):
        # v2.4b pin: current data (transits 5, tankers 1, Brent 103.50) with
        # the Sep strait-export volume 9.719M -> HORIZON 15.0/50.0/35.0,
        # state standoff (the 35 is the transition assumption for the
        # classified standoff state, not an independent estimate -- the run
        # classifies the state; it does not establish 35 over the judgment's 40)
        post = branch_filter.state_posterior(
            [0.10, 0.50, 0.40],
            {"transits": 5, "tankers": 1, "brent": 103.50, "volume": 9.719})
        h = branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
        self.assertEqual([round(x * 100, 1) for x in h], [15.0, 50.0, 35.0])
        self.assertGreater(post[1], 0.99)  # state standoff

    def test_volume_downside_response(self):
        # v2.4b: a collapse print must bite, and graded (not step): 2.0M
        # (deep in the lapse regime) pulls the HORIZON lapse to 85.0, while
        # 4.0M (just below the 4.12M lapse/standoff crossing) is strictly
        # between the 35.0 baseline and the deep-collapse 85.0
        def h_at(v):
            post = branch_filter.state_posterior(
                [0.10, 0.50, 0.40],
                {"transits": 5, "tankers": 1, "brent": 103.50, "volume": v})
            return branch_filter.horizon_weights(post, branch_filter.DEFAULT_TRANSITION)
        h2 = h_at(2.0)
        h4 = h_at(4.0)
        self.assertEqual([round(x * 100, 1) for x in h2], [5.0, 10.0, 85.0])
        self.assertGreater(h2[2], 0.8)
        self.assertEqual([round(x * 100, 1) for x in h4], [11.8, 37.3, 50.8])
        self.assertGreater(h4[2], 0.35)   # above the standoff baseline
        self.assertLess(h4[2], h2[2])     # graded: 4M is not yet a closure

    def test_volume_precedence_over_corridor_flow(self):
        # passing both --volume (degraded) and --corridor-flow absent: the
        # sourced number wins, so the horizon is the degraded row, not absent
        rc, out, _ = run("branch_filter.py", "update",
                         "--prior", "0.10,0.40,0.50", "--transits", "9",
                         "--tankers", "1", "--brent", "104.32",
                         "--volume", "7.4", "--corridor-flow", "absent")
        self.assertEqual(rc, 0)
        self.assertIn("precedence", out)
        self.assertIn("15.0%", out)   # degraded horizon
        self.assertNotIn("absent", out.split("Horizon")[1])

    def test_volume_precedence_in_state_posterior(self):
        # the documented precedence must hold in the LIBRARY, not just the
        # CLI: with both keys present, the sourced --volume wins over
        # --corridor-flow. Uses a discriminating input (transits 5 / brent 100)
        # where the degraded and absent vectors actually differ.
        base = {"transits": 5, "tankers": 1, "brent": 100.0}
        p_vol = branch_filter.state_posterior([0.10, 0.40, 0.50],
                                              dict(base, volume=7.4))
        p_abs = branch_filter.state_posterior([0.10, 0.40, 0.50],
                                              dict(base, corridor_flow="absent"))
        p_both = branch_filter.state_posterior([0.10, 0.40, 0.50],
                                               dict(base, volume=7.4,
                                                    corridor_flow="absent"))
        self.assertEqual([round(x, 8) for x in p_vol],
                         [round(x, 8) for x in p_both])  # volume wins
        self.assertNotEqual([round(x, 8) for x in p_abs],
                            [round(x, 8) for x in p_both])  # ...and they differ

    def test_negative_volume_rejected(self):
        rc, _, err = run("branch_filter.py", "update", "--prior", "0.1,0.5,0.4",
                         "--transits", "9", "--volume", "-1")
        self.assertNotEqual(rc, 0)
        self.assertIn(">= 0", err)

    def test_zero_volume_is_closure_limit(self):
        # v2.4 (Oct 1 review): a CONFIRMED closure must not become weaker
        # evidence than a 0.1M print just because it is exactly zero. --volume
        # 0 is accepted as the x -> 0 limit [0,0,1]: numerically identical to
        # any underflowing print, and stronger than the manual 'absent'
        # assessment (a measurement outranks an assessment).
        self.assertEqual(branch_filter.volume_likelihood(0), [0.0, 0.0, 1.0])
        common = ["branch_filter.py", "update", "--prior", "0.1,0.5,0.4",
                  "--transits", "5", "--tankers", "1", "--brent", "103.50"]
        rc0, out0, _ = run(*common, "--volume", "0")
        _, out1, _ = run(*common, "--volume", "0.001")
        self.assertEqual(rc0, 0)
        self.assertEqual(out0, out1)  # 0 == the underflow limit (85.0% lapse)
        self.assertIn("85.0%", out0)
        _, outa, _ = run(*common, "--corridor-flow", "absent")
        self.assertIn("64.5%", outa)   # manual assessment is weaker
        self.assertNotIn("64.5%", out0)

    def test_volume_mix_corner_monotone(self):
        # v2.4b (Oct 1 review): the v2.4 REVERSAL is gone. The corner that
        # exposed it (transits 20 pulls holds, Brent 103.50 crushes it -> a
        # holds/standoff MIX; v2.4's three sigmas made the channel itself
        # non-monotone here, lapse 32.2%@17M -> 33.2%@20M) now runs
        # monotonically: more throughput moves the state toward holds, whose
        # row (lapse 0.10) is more lapse-averse than standoff's (0.35), so
        # the HORIZON lapse FALLS 34.0% (15M) -> 31.7% (20M) -> 15.3% (40M).
        # Pinned so a regression to heteroskedastic sigmas fails loudly.
        common = {"transits": 20, "tankers": 1, "brent": 103.50}
        prior = [0.10, 0.50, 0.40]
        h15 = branch_filter.horizon_weights(
            branch_filter.state_posterior(prior, dict(common, volume=15.0)),
            branch_filter.DEFAULT_TRANSITION)
        h20 = branch_filter.horizon_weights(
            branch_filter.state_posterior(prior, dict(common, volume=20.0)),
            branch_filter.DEFAULT_TRANSITION)
        h40 = branch_filter.horizon_weights(
            branch_filter.state_posterior(prior, dict(common, volume=40.0)),
            branch_filter.DEFAULT_TRANSITION)
        self.assertEqual([round(x * 100, 1) for x in h15], [16.7, 49.2, 34.0])
        self.assertEqual([round(x * 100, 1) for x in h20], [20.9, 47.4, 31.7])
        self.assertEqual([round(x * 100, 1) for x in h40], [50.5, 34.2, 15.3])
        self.assertLess(h20[2], h15[2])  # the v2.4 reversal would be > here
        self.assertLess(h40[2], h20[2])

    def test_nonfinite_volume_rejected(self):
        # nan/inf must not silently become model evidence: a bare lognormal
        # eval would return 0.0 (inf) or nan and corrupt the posterior.
        # Guarded in the shared mapping (library path) and in the CLI.
        for bad in ("nan", "inf"):
            rc, _, err = run("branch_filter.py", "update", "--prior", "0.1,0.4,0.5",
                             "--transits", "9", "--volume", bad)
            self.assertNotEqual(rc, 0, f"--volume {bad} should be rejected")
            self.assertIn("finite", err)
        for bad in (float("nan"), float("inf")):
            with self.assertRaises(SystemExit):
                branch_filter.volume_likelihood(bad)

    def test_volume_extreme_finite_inputs_no_crash(self):
        # v2.4b code review: finite inputs at the edge of the float range must
        # not crash with an unhandled numerical error. Upper tail: all three
        # densities underflow to 0.0 -> state_posterior's clean "posterior is
        # zero" SystemExit (consistent with the brent channel). Lower subnormal
        # edge: the direct-form 0.0/0.0 ZeroDivisionError is gone; the density
        # is the x -> 0 limit (0.0, lapse-dominant once normalized)
        self.assertEqual(branch_filter.volume_likelihood(1e300), [0.0, 0.0, 0.0])
        self.assertEqual(branch_filter.volume_likelihood(5e-324), [0.0, 0.0, 0.0])
        with self.assertRaises(SystemExit):
            branch_filter.state_posterior(
                [0.1, 0.5, 0.4],
                {"transits": 5, "tankers": 1, "brent": 103.50, "volume": 1e300})

    def test_volume_only_update(self):
        # a volume-only update is valid evidence: the 'at least one' guard
        # must not demand a second signal just because --volume is present
        rc, out, _ = run("branch_filter.py", "update", "--prior", "0.1,0.4,0.5",
                         "--volume", "7.4")
        self.assertEqual(rc, 0, f"volume-only update failed: {out}")
        # v2.4b: 7.4M graded (standoff-anchored) -> horizon 16.5/49.3/34.2
        self.assertIn("16.5%", out)
        self.assertIn("49.3%", out)
        self.assertIn("34.2%", out)

    def test_matrix_validation(self):
        bad = ["1,1,1,1,1,1,1,1,1",              # rows sum to 3
               "-1,2,0,0.5,0.5,0,0,0,1"]          # negative entry
        for m in bad:
            rc, _, err = run("branch_filter.py", "update", "--prior", "0.1,0.5,0.4",
                             "--transits", "10", "--matrix", m)
            self.assertNotEqual(rc, 0)
            self.assertIn("matrix", err.lower())

    def test_resolve_outcome_parsing(self):
        rc, _, err = run("branch_filter.py", "resolve", "2099-01-01", "1.0")
        self.assertNotEqual(rc, 0)
        self.assertIn("outcome must be 0 or 1", err)

    def _temp_ledger(self, d):
        path = os.path.join(d, "calibration.csv")
        with open(path, "w") as f:
            f.write("published_date,description,prob,event_date,resolved,brier\n")
            f.write("2026-09-09,Hormuz normal by Sep 30,0.04,2026-09-30,,\n")
            f.write("2026-09-09,Ceasefire by Sep 30,0.15,2026-09-30,,\n")
        return path

    def test_resolve_ambiguous_date_requires_match(self):
        # two DIFFERENT predictions share the date: one outcome must not be
        # stamped onto both (the real Sep 30 settlement has three)
        with tempfile.TemporaryDirectory() as d:
            path = self._temp_ledger(d)
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with self.assertRaises(SystemExit) as cm:
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-09-30", "outcome": "1",
                        "match": None})())
            finally:
                branch_filter.CALIBRATION = saved
        self.assertIn("--match", str(cm.exception))

    def test_resolve_empty_match_rejected(self):
        # '--match ""' would otherwise match every row and resolve them all
        with tempfile.TemporaryDirectory() as d:
            path = self._temp_ledger(d)
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with self.assertRaises(SystemExit) as cm:
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-09-30", "outcome": "1",
                        "match": "   "})())
            finally:
                branch_filter.CALIBRATION = saved
        self.assertIn("non-empty", str(cm.exception))

    def test_resolve_match_batch_same_event(self):
        # two rows describing the SAME event (like the Nov 15 filter/judgment
        # pair) are both resolved by one matching call with --force --
        # the intended use of a multi-row match
        import contextlib, io
        with tempfile.TemporaryDirectory() as d:
            path = os.path.join(d, "calibration.csv")
            with open(path, "w") as f:
                f.write("published_date,description,prob,event_date,resolved,brier\n")
                f.write("2026-09-16,Corridor lapses by Nov 15 [filter],0.83,2026-11-15,,\n")
                f.write("2026-09-16,Corridor lapses by Nov 15 [judgment],0.50,2026-11-15,,\n")
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-11-15", "outcome": "1",
                        "match": "Corridor", "force": True})())
                rows = [r["resolved"] for r in branch_filter.load_rows()]
            finally:
                branch_filter.CALIBRATION = saved
        self.assertEqual(rows, ["1", "1"])

    def test_resolve_match_disambiguates(self):
        import contextlib, io
        with tempfile.TemporaryDirectory() as d:
            path = self._temp_ledger(d)
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-09-30", "outcome": "1",
                        "match": "Hormuz"})())
                rows = {r["description"]: r["resolved"]
                        for r in branch_filter.load_rows()}
            finally:
                branch_filter.CALIBRATION = saved
        self.assertEqual(rows["Hormuz normal by Sep 30"], "1")
        self.assertEqual(rows["Ceasefire by Sep 30"], "")

    def test_resolve_multi_match_requires_force(self):
        # a substring can hit UNRELATED events that merely share text: "Sep 30"
        # matches both descriptions. Without --force this must be refused and
        # nothing resolved.
        import contextlib, io
        with tempfile.TemporaryDirectory() as d:
            path = self._temp_ledger(d)
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with self.assertRaises(SystemExit) as cm:
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-09-30", "outcome": "1",
                        "match": "Sep 30", "force": False})())
                rows = {r["description"]: r["resolved"]
                        for r in branch_filter.load_rows()}
            finally:
                branch_filter.CALIBRATION = saved
        self.assertIn("force", str(cm.exception).lower())
        self.assertEqual(rows["Hormuz normal by Sep 30"], "")
        self.assertEqual(rows["Ceasefire by Sep 30"], "")

    def test_resolve_multi_match_force_resolves_all(self):
        # with --force, every matched row takes the outcome (legitimate for
        # several predictions of the SAME event, e.g. filter + judgment rows)
        import contextlib, io
        with tempfile.TemporaryDirectory() as d:
            path = self._temp_ledger(d)
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    branch_filter.cmd_resolve(type("A", (), {
                        "event_date": "2026-09-30", "outcome": "0",
                        "match": "Sep 30", "force": True})())
                rows = {r["description"]: r["resolved"]
                        for r in branch_filter.load_rows()}
            finally:
                branch_filter.CALIBRATION = saved
        self.assertEqual(rows["Hormuz normal by Sep 30"], "0")
        self.assertEqual(rows["Ceasefire by Sep 30"], "0")

    def test_score_base_rate_comparator(self):
        # isolated temp ledger: 4 items, 2 outcomes (1,0,1,0) at p=0.5,0.5,0.2,0.8
        with tempfile.TemporaryDirectory() as d:
            path = os.path.join(d, "calibration.csv")
            with open(path, "w") as f:
                f.write("published_date,description,prob,event_date,resolved,brier\n")
                f.write("2026-09-09,t1,0.50,2026-09-30,1,0.2500\n")
                f.write("2026-09-09,t2,0.50,2026-09-30,0,0.2500\n")
                f.write("2026-09-09,t3,0.20,2026-09-30,1,0.6400\n")
                f.write("2026-09-09,t4,0.80,2026-09-30,0,0.6400\n")
            saved = branch_filter.CALIBRATION
            branch_filter.CALIBRATION = path
            try:
                import io, contextlib
                buf = io.StringIO()
                with contextlib.redirect_stdout(buf):
                    branch_filter.cmd_score(type("A", (), {})())
                out = buf.getvalue()
            finally:
                branch_filter.CALIBRATION = saved
        self.assertIn("base-rate predictor = 0.2500 at p=0.50", out)
        self.assertNotIn("0.073", out)  # unsourced reference removed


if __name__ == "__main__":
    unittest.main(verbosity=2)
