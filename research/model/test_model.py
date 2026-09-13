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
