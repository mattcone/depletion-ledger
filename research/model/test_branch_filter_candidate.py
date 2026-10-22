#!/usr/bin/env python3
"""Regression tests for the CANDIDATE branch filter (v3, 2026-10-21).

The candidate is a reviewable revision living alongside branch_filter.py;
these tests pin its worked examples and the properties the Oct 21 review
requires:
  - displayed HORIZON moves monotonically with volume (not a 45x-invisible
    residual),
  - high exports and ongoing attacks coexist (attacks degrade but do not
    force lapse at high volume),
  - a confirmed throughput collapse / closure maps to the lapse row,
  - price is not a state observation (context only),
  - the count series keeps cross-check force at its demoted weight,
  - the candidate never writes to the published calibration ledger.

Run: python3 -m unittest test_branch_filter_candidate -v
"""
import os
import subprocess
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import branch_filter as bf
import branch_filter_candidate as bfc

PRIOR = bfc.PRIOR_DEFAULT
HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "branch_filter_candidate.py")


def horizon(transits=None, tankers=None, brent=None, volume=None,
            prior=PRIOR, corridor_flow=None):
    obs = {}
    if transits is not None:
        obs["transits"] = transits
    if tankers is not None:
        obs["tankers"] = tankers
    if brent is not None:
        obs["brent"] = brent
    if volume is not None:
        obs["volume"] = volume
    if corridor_flow is not None:
        obs["corridor_flow"] = corridor_flow
    post, _ = bfc.state_posterior_candidate(prior, obs)
    return bf.horizon_weights(post, bf.DEFAULT_TRANSITION), post


class TestCandidateWorkedExamples(unittest.TestCase):
    def test_current_data_read(self):
        # Oct 21 pass: freshest same-definition prints (Kpler Oct 19 briefing:
        # 7-day strait transits 7.894 mb/d, tanker crossings 7-day avg 10/day;
        # confirmed tanker losses 1). Must sit on the published row.
        hz, post = horizon(transits=10, tankers=1, volume=7.894)
        self.assertAlmostEqual(hz[0] * 100, 15.3, delta=0.15)
        self.assertAlmostEqual(hz[1] * 100, 49.9, delta=0.15)
        self.assertAlmostEqual(hz[2] * 100, 34.9, delta=0.15)
        # state is standoff-dominant but NOT pinned: holds has real mass
        self.assertGreater(post[0], 0.005)
        self.assertLess(post[0], 0.02)

    def test_stale_inputs_same_reading(self):
        # the stale logged inputs (transits 12, volume 7.6) give the same
        # displayed row — the candidate is not a data change
        hz, _ = horizon(transits=12, tankers=1, volume=7.6)
        self.assertAlmostEqual(hz[0] * 100, 15.4, delta=0.15)
        self.assertAlmostEqual(hz[2] * 100, 34.8, delta=0.15)


class TestCandidateRequiredProperties(unittest.TestCase):
    def test_horizon_monotone_in_volume(self):
        # the Oct 21 failure mode: 7.6 -> 17.3 must move the DISPLAYED row
        # (holds up, lapse down), not just an invisible residual
        prev_h, prev_l = None, None
        for v in [5.0, 6.0, 7.894, 9.0, 10.0, 12.0, 14.0, 16.0, 17.3, 20.0]:
            hz, _ = horizon(transits=10, tankers=1, volume=v)
            if prev_h is not None:
                self.assertGreaterEqual(hz[0], prev_h - 1e-9,
                                        f"holds not non-decreasing at {v}")
                self.assertLessEqual(hz[2], prev_l + 1e-9,
                                     f"lapse not non-increasing at {v}")
            prev_h, prev_l = hz[0], hz[2]
        # and the move is visible on the displayed (1dp) row
        hz_lo = horizon(transits=10, tankers=1, volume=7.894)[0]
        hz_hi = horizon(transits=10, tankers=1, volume=17.3)[0]
        self.assertGreater(round(hz_hi[0] * 100, 1), round(hz_lo[0] * 100, 1))
        self.assertLess(round(hz_hi[2] * 100, 1), round(hz_lo[2] * 100, 1))

    def test_high_exports_and_attacks_coexist(self):
        # at recovered throughput, attacks degrade the picture but do not
        # force lapse; the lapse share rises monotonically with confirmed
        # losses
        prev_l = None
        for k in [0, 1, 2, 3, 4, 6, 10]:
            hz, post = horizon(transits=12, tankers=k, volume=17.3)
            if prev_l is not None:
                self.assertGreaterEqual(hz[2], prev_l - 1e-9,
                                        f"lapse not non-decreasing at {k} losses")
            prev_l = hz[2]
            # one or two confirmed losses at full throughput: still not
            # lapse-dominant
            if k in (1, 2):
                self.assertLess(post[2], 0.25)
        # zero losses at full throughput: holds has real mass
        hz, post = horizon(transits=12, tankers=0, volume=17.3)
        self.assertGreater(post[0], 0.5)

    def test_confirmed_collapse_maps_to_lapse_row(self):
        # vol == 0 is the confirmed-closure limit: state [0,0,1], HORIZON =
        # the lapse transition row
        hz, post = horizon(transits=2, tankers=3, volume=0.0)
        self.assertEqual(post, [0.0, 0.0, 1.0])
        self.assertAlmostEqual(hz[0], 0.05, places=6)
        self.assertAlmostEqual(hz[1], 0.10, places=6)
        self.assertAlmostEqual(hz[2], 0.85, places=6)

    def test_near_collapse_is_lapse_dominant(self):
        # a confirmed 0.5 mb/d trickle (vs 17.3 pre-war) is collapse evidence
        hz, post = horizon(transits=2, tankers=2, volume=0.5)
        self.assertGreater(post[2], 0.8)

    def test_brent_is_not_a_state_observation(self):
        # identical posterior with no price and with an extreme price
        post_a, _ = bfc.state_posterior_candidate(PRIOR,
                                                  {"transits": 10, "tankers": 1,
                                                   "volume": 7.894})
        post_b, _ = bfc.state_posterior_candidate(PRIOR,
                                                  {"transits": 10, "tankers": 1,
                                                   "volume": 7.894, "brent": 200.0})
        self.assertEqual(post_a, post_b)
        post_c, note = bfc.state_posterior_candidate(PRIOR,
                                                     {"transits": 10, "tankers": 1,
                                                      "volume": 7.894, "brent": 50.0})
        self.assertEqual(post_c, post_a)
        self.assertIn("context only", note)

    def test_brent_alone_is_rejected_by_cli(self):
        r = subprocess.run([sys.executable, SCRIPT, "update", "--brent", "108.79"],
                           capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("context only", r.stderr)

    def test_transits_keep_cross_check_force(self):
        # at the demoted weight the count series still bites: LOW COUNTS
        # (4/day) disagree with 17.3 mb/d of barrels and cut the holds
        # share relative to a consistent 14/day. (The briefing's count
        # INCLUDES satellite/HUMINT-confirmed dark crossings, so 'low'
        # here is a low count, not a dark-AIS-floor inference; low counts
        # at high barrels can also reflect cargo sizes, load factors and
        # shuttle geometry.)
        hz_low, post_low = horizon(transits=4, tankers=1, volume=17.3)
        hz_high, post_high = horizon(transits=14, tankers=1, volume=17.3)
        self.assertLess(post_low[0], post_high[0])
        self.assertGreater(hz_low[2], hz_high[2])


class TestCandidateVintageReporting(unittest.TestCase):
    def test_vintage_dates_reported_as_staleness(self):
        r = subprocess.run([sys.executable, SCRIPT, "update",
                            "--transits", "10", "--tankers", "1",
                            "--volume", "7.894",
                            "--volume-date", "2026-10-17",
                            "--transits-date", "2026-10-17",
                            "--today", "2026-10-21"],
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("vintage: volume data to 2026-10-17 (4 days old as of 2026-10-21)", r.stdout)
        self.assertIn("vintage: transits data to 2026-10-17 (4 days old as of 2026-10-21)", r.stdout)

    def test_missing_vintage_says_unreported(self):
        r = subprocess.run([sys.executable, SCRIPT, "update",
                            "--transits", "10", "--tankers", "1",
                            "--volume", "7.894",
                            "--today", "2026-10-21"],
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("vintage: volume date not provided — staleness unreported", r.stdout)
        self.assertIn("vintage: transits date not provided — staleness unreported", r.stdout)

    def test_bad_vintage_date_rejected(self):
        r = subprocess.run([sys.executable, SCRIPT, "update",
                            "--transits", "10", "--tankers", "1",
                            "--volume", "7.894",
                            "--volume-date", "notadate"],
                           capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("YYYY-MM-DD", r.stderr)

    def test_volume_channel_monotone_inherited(self):
        # the candidate leans on the v2.4b volume channel; re-pin the
        # structural property on the channel itself (lapse < 4.12 < standoff
        # < 11.29 < holds)
        for v, argmax in [(1.0, 2), (4.0, 2), (5.0, 1), (11.0, 1),
                          (12.0, 0), (30.0, 0)]:
            lik = bf.volume_likelihood(v)
            self.assertEqual(max(range(3), key=lambda i: lik[i]), argmax,
                             f"volume {v} misclassified")


class TestCandidateDoesNotTouchLedger(unittest.TestCase):
    def test_cli_run_leaves_calibration_csv_unchanged(self):
        with open(os.path.join(HERE, "calibration.csv"), "rb") as f:
            before = f.read()
        r = subprocess.run([sys.executable, SCRIPT, "update",
                            "--transits", "10", "--tankers", "1",
                            "--volume", "7.894", "--unrounded",
                            "--contribution"],
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        with open(os.path.join(HERE, "calibration.csv"), "rb") as f:
            after = f.read()
        self.assertEqual(before, after)
        # and the candidate banner is on stdout
        self.assertIn("CANDIDATE", r.stdout)


if __name__ == "__main__":
    unittest.main(verbosity=2)
