# September 2026 storage-model audit (v1)

Issued 2026-10-15. Audits the September 2026 assumptions of the v1 world-stocks
scenario model (version v2026-09-19) against the reported September values, to
decide whether a revised model (v2) is justified. The September score stands
against v1; this audit does not re-score it.

## Scope and method

For each scenario we compare the **assumed** September 2026 production,
consumption, and production-minus-consumption (P−C) balance against the
**reported** September values from two agencies:

- **EIA Short-Term Energy Outlook, October 6 2026 edition** — the *same series*
  (Table 3a world total, crude + products) as the v1 baseline. **Comparable.**
- **IEA Oil Market Report, October 2026 edition** — a *separate* series (different
  coverage and definitions). **Cross-check only; not directly comparable** to the
  EIA world total.

Rules applied throughout:
- Numerical differences are computed **only between comparable measures** (the
  scenario assumptions vs. the EIA, which share a series). The IEA figures are
  shown for cross-check but no difference is computed against them.
- No agency's number is substituted into the other's series.
- Where a comparable September consumption figure cannot be verified (the IEA
  publishes no monthly demand level), it is marked **unverified**.
- The oil-on-water growth is treated as part of the total inventory change, not as
  an additional correction to the P−C balance.

## Reported September 2026 values

### EIA STEO — October 6 2026 edition (comparable to the v1 baseline)
| Measure | Sep 9 edition (v1 baseline) | Oct 6 edition (reported) | Change |
|---|---|---|---|
| Production | 99.41 mb/d | **101.30 mb/d** | **+1.89 mb/d** |
| Consumption | 104.21 mb/d | **104.24 mb/d** | +0.03 mb/d |
| P−C balance | −4.80 mb/d (−144 mb) | **−2.94 mb/d (−88 mb)** | +1.86 mb/d |

The EIA revised September **production up by 1.89 mb/d** between the two editions;
consumption was essentially unchanged.

### IEA OMR — October 2026 edition (separate series, cross-check only)
| Measure | September value | Note |
|---|---|---|
| Global oil supply (production) | **102.3 mb/d** | +2.5 mb/d m-o-m, "driven by Gulf producers". Not directly comparable to the EIA world total. |
| Global demand (consumption) | **unverified** | No monthly level in the public summary; only y-o-y forecasts (−2.6 mb/d y-o-y 2026; −2.5 mb/d y-o-y 4Q26). |
| Global observed inventory change | **−10 mb** | on-land −113 mb + on-water +103 mb. Cumulative since end-Feb: −509 mb. |

## Per-scenario comparison — September 2026

Differences are **assumed − EIA-reported**, in mb/d (the only comparable pair). The
IEA production (102.3) and demand (unverified) are shown for cross-check only.

| Scenario | Assumed P | EIA P | ΔP | Assumed C | EIA C | ΔC | Assumed P−C | EIA P−C | Δ(P−C) | IEA P | IEA C |
|---|---|---|---|---|---|---|---|---|---|---|---|
| corridor-holds | 99.91 | 101.30 | **−1.39** | 104.46 | 104.24 | +0.22 | −4.55 | −2.94 | **−1.61** | 102.3 (n.c.) | unverified |
| standoff | 100.50 | 101.30 | **−0.80** | 103.71 | 104.24 | −0.53 | −3.21 | −2.94 | **−0.27** | 102.3 (n.c.) | unverified |
| corridor-lapses | 93.41 | 101.30 | **−7.89** | 101.21 | 104.24 | −3.03 | −7.80 | −2.94 | **−4.86** | 102.3 (n.c.) | unverified |

In mb for the month (×30 days): the EIA-reported September P−C is **−88 mb**; the
v1 targets were −136 (holds), −96 (standoff), −234 (lapses).

## The standoff miss, decomposed (for the scorecard)

The scorecard shows the v1 standoff's September miss as **94 mb** (target −96 vs.
the displayed observed −2). That 94 mb is **not** all forecast error. It decomposes
into three parts, only the first of which is a within-agency assumption difference:

| Part | mb | What it is |
|---|---|---|
| v1 standoff P−C (−96.31) − updated EIA P−C (−88.13) | **−8.18** | The only within-EIA-framework difference: the v1 assumptions vs. the EIA's own revised September balance. |
| EIA P−C (−88.13) − IEA observed (−10) | **−78.13** | An unresolved **cross-measure** gap — a residual (EIA) vs. a reported total (IEA). Not a measured error. |
| IEA observed (−10) − displayed (−2) | **−8.00** | A prior-period **revision** artifact (frozen anchor vs. the IEA's revised cumulative). |
| **Sum = displayed standoff miss** | **−94.31** | Reproduces the scorecard figure. |

Within the 8.18-mb EIA-framework difference, the two components are:
- **Production:** the v1 standoff (100.50) ran **0.8038 mb/d below** the EIA's
  revised September (101.30) → **24.11 mb** of extra withdrawal.
- **Consumption:** the v1 standoff (103.71) ran **0.5311 mb/d below** the EIA
  (104.24) → **15.93 mb** offset (less withdrawal).
- Net: 24.11 − 15.93 = **8.18 mb** (matches the within-EIA row above).

Production is the larger component, but the **conditional balance was only 8.2 mb
from the EIA's own revised September P−C**. Most of the 94-mb displayed miss is the
unresolved cross-measure gap (78 mb) and the revision artifact (8 mb), not the
flat-production assumption. Attributing the full miss to flat production would
overstate what September establishes.

## Findings

1. **Production recovered more than the non-closure scenarios assumed.** The EIA
   revised September production up by +1.89 mb/d (99.41 → 101.30); the IEA
   independently reported a +2.5 mb/d m-o-m rise in global supply "driven by Gulf
   producers." **corridor-holds** (ΔP −1.39) and **standoff** (ΔP −0.80) both ran
   below that revised level — their production assumptions understated the recovery.
   **But** the standoff's displayed 94-mb miss is mostly the unresolved EIA↔IEA
   cross-measure gap (78 mb), not the flat-production assumption — see the
   decomposition above, where the within-EIA difference is only 8.2 mb. The
   production finding therefore supports re-anchoring the non-closure production to
   the recovered level, not attributing the displayed miss to flat production.
   **corridor-lapses** (ΔP −7.89) is a counterfactual (a closed strait did not occur
   in September), so its lower production is a scenario postulate, not a miss
   against September.

2. **Consumption was essentially flat vs. the EIA baseline in September.** The EIA's
   September consumption (104.24) was +0.03 vs. the Sep 9 baseline (104.21). None of
   the v1 non-closure demand adjustments (holds +0.25, standoff −0.5) is supported by
   the September data. **Caveat:** one flat month does not, by itself, validate
   removing those adjustments across the *entire* 2026–2027 horizon. Setting holds
   exactly equal to the EIA forecast and holding standoff production flat are
   **forward judgments** for the unelapsed months, not results demonstrated by this
   audit — they are documented as such in the v2 assumptions (see "What v2 changes").

3. **The closure scenario is a counterfactual for September.** corridor-lapses' lower
   production (−7.89) and demand destruction (−3.0) are closure-specific postulates;
   September was a non-closure month, so neither is directly tested by this data.
   **Scoring policy is unchanged:** the closure scenario's September outcome (−234
   target) and its 232-mb displayed miss **remain in the scorecard**, scored against
   the observed line exactly like the other scenarios. Calling it a counterfactual is
   a *caveat about applicability* (a closed strait did not occur in September), not
   a change to the frozen scoring policy. It is carried into v2 unchanged.

## Reconciliation: on-land + on-water = total (IEA)

| Component | mb |
|---|---|
| On-land stocks | −113 |
| Oil on water | +103 |
| **Total** | **−10** |

−113 + 103 = **−10** — reconciles exactly. The on-water surge is part of the total
inventory change, not a separate correction to the P−C balance.

## The 8 mb gap (monthly vs. cumulative)

- September **monthly** change: −10 mb.
- September **cumulative** (vs. end-Feb): −509 mb.
- Frozen anchor (August): −507 mb.
- −507 + (−10) = **−517**, but the published September cumulative is **−509** → an
  **8 mb** gap.

Explanation: the IEA's October edition revised prior-month cumulative values upward
by ~8 mb. The monthly figure (−10) and the cumulative-vs-frozen-anchor figure (−2)
use different baselines (revised vs. frozen), so they differ by 8 mb. This is a
data-revision artifact, not a model error. The score is frozen at first release; the
revision is recorded, not re-scored.

## Measure comparability: EIA P−C vs. IEA observed (a standing limitation)

The scenario targets are cumulative P−C on the **EIA world-total** series (a
residual: world production minus world consumption). The observed line is the
**IEA's global observed** inventory change (a reported total). These are different
measures:

- EIA September P−C: **−88 mb** (a residual on the EIA world-total series).
- IEA September observed: **−10 mb** (the reported total change in global observed
  inventory; on-land −113 + on-water +103).

They are **not directly comparable** and must not be substituted for one another.
This audit does **not** establish how much of the EIA P−C residual corresponds to
on-land versus on-water stocks — the two agencies cover different sets of stocks and
publish different definitions. The **78-mb gap** between the EIA P−C (−88) and the
IEA observed total (−10) is therefore an **unresolved cross-measure difference**,
not a measured forecast error. Consequently, a scenario's "miss" against the
observed line conflates (a) the forecast error in the assumptions and (b) this
agency/measure difference. This is a standing limitation of the chart, not a
v1-specific error, and it is why the note below the chart says the scores "don't
identify the cause of the errors."

## Gate decision

- **Consistent source framework:** established — the EIA STEO (the v1 baseline
  series). Both September production (101.30) and consumption (104.24) are verified
  from the EIA Oct 6 edition, and the full 2026–2027 forward path is available.
- **Assumptions the evidence supports changing:** production for the **non-closure
  scenarios** (corridor-holds and standoff — the recovery was stronger than assumed;
  the closure scenario's lower production is a counterfactual, not a miss) and
  consumption for **corridor-holds and standoff** (September was flat vs. the
  baseline; their small demand adjustments are unsupported).
- **corridor-lapses is carried into v2 unchanged** — it is a closure counterfactual
  that September (a non-closure month) does not test, so its offsets are retained
  (not "supported for change"). Its September outcome and displayed miss remain
  scored; the counterfactual label is a caveat, not a scoring-policy change.
- **Unverified inputs:** the IEA's September demand (cross-check series; not a
  critical input to the EIA-based model). Reported, not blocking.
- **Gate: SATISFIED** for the non-closure scenarios (holds and standoff). Proceed to
  v2 on the EIA framework.

## What v2 changes (summary)

- **Rebase** to the EIA STEO **October 6 2026** edition (the latest release with
  verified September actuals and the forward path), replacing the Sep 9 baseline.
- **Production:** corridor-holds tracks the EIA baseline (0 — the recovery is now in
  the baseline); standoff holds world production flat at the September reported level
  (101.30) through 2026, then non-Gulf growth at the v1 pace (1/6 mb/d per month,
  +2.0 by Dec 2027) so it runs below the recovering EIA baseline; corridor-lapses is
  a counterfactual not tested by September and is carried into v2 unchanged (same
  closure shut-in and demand as v1). **Forward judgment:** holding the Gulf flat for
  the unelapsed months (Oct 2026–Dec 2027) is the v1 "no net Gulf recovery" choice
  re-anchored to the reported September level — not a result demonstrated by
  September alone.
- **Consumption:** corridor-holds and standoff set to 0. **Basis:** September was
  flat vs. the baseline and neither small adjustment was supported; extending flat
  (baseline-tracking) consumption across the horizon is a **forward judgment**
  (one flat month does not, by itself, validate removing the adjustments for the
  whole 2026–2027 path). corridor-lapses keeps v1's closure demand (−3.0 H2 2026 /
  −5.0 2027) — a closure-specific postulate not tested by the non-closure September.
- **Start point:** v2 begins at the observed **−2** (September, on the chart's
  measure) at the **same frozen August anchor**, and is scored from **October**
  onward. **October is v2's first scored month** (it was partly elapsed as of the
  2026-10-15 issue, so its score partly reflects a month already underway);
  **November is v2's first full future month** (the first month entirely in the
  future at issuance).
- **The September score stands against v1** (frozen at first release).
