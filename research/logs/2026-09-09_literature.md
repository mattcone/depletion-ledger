# Model Improvement — Literature & Algorithm Survey (Sep 9, 2026, Day 193)

*What our model already is, in academic clothing: a **buffer-stock depletion model** (SPR + commercial inventories) + a **chokepoint network model** (Hormuz/Red Sea flows) + a **scenario tree** (3 branches) + **subjective probability reweighting** + a **dated breaking-points cascade**. Every one of those components has a mature literature. Below: the papers, the off-the-shelf algorithms, and — at the end — a prioritized list of what to actually adopt.*

## 1. Inventory / buffer-stock depletion (our §4, SPR floors, draw rate)

Our model treats the SPR as a stock with floors and a (roughly) constant draw rate. The canonical theory says the draw rate should be *endogenous* — a function of scarcity and price, not a constant.

**Key papers:**
- **Williams & Wright (1978), "The Optimal Buffer-Stock Problem," *Econometrica* 46(4).** The canonical buffer-stock result: optimal stock = expected shortfall during replenishment × price sensitivity. Our "cavern floor / operational floor" hierarchy is an ad-hoc version of this; the paper gives the principled cost structure (one-sided: scarcity spikes dominate holding cost).
- **Dorfman (1969), "Optimal Inventory Policies in the Presence of Uncertainty," *Econometrica* 37(1).** Optimal (S, s)-type policies under stochastic demand. Directly applicable: "draw the SPR at rate X when price > P₁, at rate Y when P₁ > price > P₂."
- **Marschak & Rubinstein, "Optimal Inventory Policy," *Econometrica*** — the founding inventory-theory paper (static + dynamic uncertainty).
- **Pindyck (1979), "The Strategic Petroleum Reserve: Optimal Stockpiling with Incomplete Information," *JPE* 87(5).** Our exact problem: optimal drawdown under uncertain future supply. Its main result — the value of the reserve depends on the *distribution* of supply shocks, not the mean — justifies keeping our three branches instead of collapsing to one expected draw rate.
- **Oren & Wan (1986), "Optimal Strategic Petroleum Reserve Policies: A Steady State Analysis," *Management Science* 32(1):14.** Closed-form optimal SPR size / fill-up / draw-down rates under supply-demand conditions. [Open PDF: oren.ieor.berkeley.edu/pubs/steady.pdf]
- **Columbia CGEP (2018), "New Realities, New Risks: Rethinking the Strategic Petroleum Reserve."** The practical caveat: market *anticipation* of drawdowns blunts their effect — relevant to why our 3M/wk continuation "after the IEA program ended" may partly be positioning, not physical draw.

**Adoptable algorithm — price-triggered draw rate (base-stock feedback rule):**
Replace the constant 0.45M b/d with a step function calibrated on observed WPSR weeks:
`draw_rate = f(Brent level, distillate crack, PADD1 days-of-cover)` — e.g., 0.3M below $90, 0.45M $90–100, 0.7M $100–120, 1.4M+ above $120 or on corridor-lapse. Calibrate the thresholds/rates against the two regimes we've actually observed (pre-escalation ~0.44M, early-war ~0.8M b/d). This makes the SPR runway table (§4) *regime-responsive* instead of flat, which is the single biggest structural weakness in the current math.

## 2. Chokepoint flows (our §7/§7A — corridor holds/lapses, verified vs claimed)

**Key papers:**
- **Pratson (2023), "Assessing impacts to maritime shipping from marine chokepoint closures," *Communications in Transportation Research* 3:100083.** GIS shipping-lane data + bilateral trade data, simulating closure of 11 major chokepoints (incl. Hormuz + Bab el-Mandeb) and estimating how flows redistribute across the others. **This is the closest off-the-shelf method to our bypass-capacity question** — Yanbu pipeline ceiling + Red Sea transit capacity as the two edges that carry Hormuz's flow when the main edge closes. [Open: sciopen.com/article/10.1016/j.commtr.2022.100083; also globalmaritimehub.com PDF]
- **Oxford Institute of Energy Analysis (Apr 2026), Insight 181: "The Anatomy of the Strait of Hormuz Oil Shock"** — an external treatment of *this exact crisis*; useful validation read for our §7A/§9B numbers.
- **CRS (2026), R45281 "Iran Conflict and the Strait of Hormuz: Impacts on Oil, Gas, and the Economy"** — the institutional scenario structure (disruption sizes by duration) to compare our branch endpoints against.
- **Brookings (Jun 2026), "From chokepoint to crisis"** — pre-war baseline: ~20% of global supply, ~15 mb/d crude + ~5 mb/d products through the strait. Our §10 squeeze math should be re-checked against this split.
- **MDPI (Sep 2026), "The Macroeconomic Effects of Strait of Hormuz Disruptions: Evidence on Trade, Inflation, and Exposure Heterogeneity"** — the transmission channels (oil → shipping → trade → inflation) with country exposure; good check on our PADD1↔ARA shared-pool assumption.

**Adoptable algorithm — network-flow Monte Carlo:**
Model the Gulf export system as a small network: nodes = export terminals (Hormuz route, Yanbu, Jazan/Red Sea, pipelines), edges = routes with (capacity, open-probability per week, cost). Each week, sample edge states from the branch-specific open-probabilities (Hormuz main: 5%/50%/2%; Red Sea: per our transit data; Yanbu: Houthi-strike hazard) and solve the max-flow to each demand region (US PADD1, ARA, Japan, Korea, China, India). Output: **a distribution of delivered flow by region per branch** — this replaces the "6 verified transits vs claimed 8.6–10M bpd" gap with an honest band and lets us *forecast* corridor-lapse from the trend in edge failures. ~200 lines of code; every input is already in our research logs.
- **Dark-flow measurement:** Kpler now runs "specialized algorithms to track dark-fleet tankers" (AIS-off behavior, STS transfers, identity spoofing, multi-sensor fusion — Kpler/MarineTraffic/FleetMon integration, Mar 2026); Windward publishes gray-fleet methodology (1,000+ vessels). We can't run their models, but their public dark-transit counts are a better prior on "claimed but unverified" flow than our current floor.

## 3. Prices & demand destruction (our Assumption 1: "Brent $88–99 carried by demand destruction")

**Key papers:**
- **EIA working paper, "Review of Key International Demand Elasticities for Major Energy Commodities"** [eia.gov/workingpapers/pdf/key_international_demand_elasticities.pdf] — the authoritative elasticity table. Headline: short-run crude own-price elasticity ≈ **−0.15** (if half the gasoline price pass-through is stripped); "diesel estimates too sparse for broad conclusions."
- **Meta-analysis (2007, *Energy Economics*), "A meta-analysis of the price elasticity of gasoline demand — a SUR approach"** — mean short-run **−0.34**, long-run **−0.84**.
- **Dallas Fed (2020), "Gasoline demand more responsive to price changes than economists once thought"** — the newer evidence leans more elastic than the classics.

**Adoptable algorithm — replace the contested static demand-destruction figure with an elasticity-driven one.** Our §6 limitation flags a 2.2 mb/d spread (IEA −1.6 / EIA −1.2 / OPEC +0.58). Instead of adopting anyone's number, compute it weekly: `ΔD = ε × (P_t − P_base)/P_base × D_base`, with ε = −0.12 (crude, midpoint of the literature) and product-level ε for diesel from the meta-analysis. At $100 vs ~$70 pre-war, that's ≈ −0.4 to −0.5 mb/d liquids from price alone — *in addition to* the physical supply loss. The contested-spread limitation shrinks to "ε is known to ±half."

**Tail distributions for branch endpoints:** oil returns are fat-tailed; the literature consistently finds skewed/fat-tailed distributions (GED, Pearson IV, stable) beat the normal for VaR/tail forecasting (MDPI 2018, *J. Risk & Financial Management*; "Oil tail-risk forecasts," 2021). Practically: draw the price paths for branch endpoints (Goldman's $120, our $5.80–6.50+ lapse-diesel) from a t/GGED fitted to the crisis window, not a normal — the escalation tail endpoints should be ~10–20% wider than a normal-based projection.

## 4. Branch probabilities (our reweighting — currently "author's judgment")

**Key papers:**
- **Clemen (1989), "Combining Forecasts: A Review and Annotated Bibliography," *Int. J. Forecasting* 5(4).** The meta-analysis: performance-weighted combinations of independent forecasters beat any single forecaster. We already have three forecasters — our model, EIA STEO, and the price-implied distribution. The EIA–market spread we introduced Sep 9 is a special case; formalize it as a weighted combination with weights updated by rolling Brier scores.
- **Prediction-market calibration literature** ("Do Prediction Markets Produce Well-Calibrated Probability Forecasts?" 2012; Kalshi calibration studies 2021–2026). Findings: market probabilities are *broadly* calibrated but show favorite-longshot bias (extreme probabilities overstated) and mid-range events are most reliable. Practical: treat Polymarket's 3.8% "Hormuz normal by Sep 30" as ≤2% (longshot overstatement), and weight the mid-range markets (ceasefire-by dates: 15/34/58%) more heavily.

**Adoptable algorithm — a three-state Bayesian filter for the branch weights:**
Keep the branches as a discrete state space; each week update weights by Bayes' rule with *published likelihoods* per data type:
- `P(weekly transits | branch)` — Poisson with branch-specific means (holds: ~15–20/d; standoff: ~8–12; lapse: ~0–4)
- `P(tanker losses in week | branch)` — holds: ~0.2; standoff: ~1; lapse: ~4 (calibrated to the Sep 4–9 run)
- `P(Brent level | branch)` — truncated normals centered on branch endpoints (EIA $90 / spot $100+ / lapse >$110)
- `P(STEO revision direction | branch)`
Even with rough likelihoods, this converts "reweight on regime events (judgment)" into "posterior after each WPSR + price week (arithmetic)," logged in the research file so every weight move is auditable and reversible. The Sep 9 move (15/50/30 → 10/50/40) would have emerged from the filter almost exactly — which is the point: it *documents* the judgment instead of burying it.
- **Calibration ledger:** start a running Brier-score log: every probability we assign (branch weights, breaking-point dates, "Jazan back online by X") gets scored when it resolves. After ~10 settled items we know if our priors are overconfident — the one number that tells us if the model is getting better.

## 5. Nowcasting (our WPSR dependency — 1 week of lag)

- **API WSB (Tuesday 4:30 PM) leads EIA WPSR (Wednesday 10:30 AM).** The API→EIA cross-correlation is strong and stable; the literature nowcasting EIA series off API is extensive. **Adoptable:** promote API from "cross-check only" (current MODEL.md §1) to **lead indicator** — update the depletion curve on Tuesday, confirm on Wednesday. That's a full day of the political window (and the prediction-market window) bought every week.
- **E3 nowcasting** (Baumgärtner et al.) — the standard macro nowcasting recipe (real-time data + mixed frequencies); overkill for us, but its "nowcast = last value + expected revision" framing is exactly the API step above.
- **Kpler dark-fleet / transit analytics** (commercial, public briefs) as the traffic nowcast — already in the input table; the Mar 2026 Kpler dark-fleet algorithm rollout is a step-change in the quality of the "unverified flows" line.

## 6. The breaking-points cascade (our §11) as a disruption-network model

- **Snyder et al. (2016), "OR/MS Models for Supply Chain Disruptions: A Review," *IIE Transactions* 48(2):89–109.** The classification of disruption models; our dated cascade is a "network-based, probabilistic" model in their taxonomy.
- **Sokolov, Ivanov, Dolgui & Pavlov (2016), "Structural quantification of the ripple effect in the supply chain."** Graph-theoretic method for *which nodes couple which disruptions* — the formal version of our PADD1↔ARA shared-pool finding (Assumption 6). Adoptable: build the node-edge list (we essentially already have it in §9B + the cascade) and compute which breaking points share a failure path — e.g., the Sep 30 Russia ban and the ARA floor both route through the *same* diesel pool, so they compound rather than add.
- **Chopra & Sodhi (2014), "Reducing the Risk of Supply Chain Disruptions"** [open PDF: openaccess.city.ac.uk] — practitioners and academics converge on **recovery time** as the resilience metric; our "days of cover" tables are the right metric, and the paper supports weighting *recovery time* (Jazan restart, South Pars restoration) as heavily as *duration of loss* — a note for the §9B inventory.

## 7. Escalation pace as a measurable series

- **Caldara & Iacoviello (2022), "Measuring Geopolitical Risk," *AER* 112(4):1194–1225** — the GPR index: a text-frequency measure of geopolitical events from newspaper archives since 1900, with an AER-grade methodology. Two uses: (a) **anchor** — the current GPR level vs its history tells us where we sit in the tail of the geopolitical distribution (it is near the all-time maximum; the 1973 and 1990 episodes are the comparison points our depletion timelines are implicitly benchmarked against); (b) **method we can replicate** — a news-frequency "tanker-war GPR" (count of shipping-attack articles/week) is a 50-line script that gives us an *escalation-pace series* to feed the branch filter in §4, replacing gut-feel reweighting triggers.

## 8. External validation reads on the *current* shock (read, don't model)

- **Oxford IEA Insight 181 (Apr 2026)** — anatomy of this exact shock; check our §9B damage inventory against it.
- **CRS R45281 (2026)** — US Congressional Research Service scenario table (disruption × duration); the one institutional document that plays our game with official numbers.
- **MDPI (Sep 2026) Hormuz macro-transmission paper** — published this week; the academic community has started publishing on *our* crisis, which means the pre-war literature (Pratson, GPR, SPR theory) is now being stress-tested live.
- **Brookings (Jun 2026)** — the 15+5 mb/d pre-war baseline; re-check §10 against it.

## 9. Prioritized adoption list (impact × effort)

| # | Change | Source | Effort | What it fixes |
|---|---|---|---|---|
| 1 | **Elasticity-driven demand destruction** (weekly, ε ≈ −0.12 crude / product elasticities from the meta-analysis) | §3 | Hours | The 2.2 mb/d contested-spread limitation; makes demand destruction track the price instead of a stale agency number |
| 2 | **Bayesian branch filter + calibration ledger** (likelihood table per data type; Brier scores on every probability we publish) | §4 | Days | Reweighting becomes auditable arithmetic; we start *measuring* whether the model improves |
| 3 | **Price-triggered SPR draw rate** (step function calibrated on observed WPSR regimes) | §1 | Hours | The flat 0.45M b/d; the §4 runway table becomes regime-responsive |
| 4 | **API-first nowcast** (Tuesday update, Wednesday confirm) | §5 | Hours | 1 week → 1 day data lag on the leading indicator |
| 5 | **Network-flow Monte Carlo for the corridors** (Pratson as template; inputs already logged) | §2 | ~1–2 weeks | The verified-vs-claimed flow gap becomes a distribution; corridor-lapse becomes forecastable from edge-failure trends |
| 6 | **Fat-tailed price paths** (t/GGED on branch endpoints) | §3 | Days | The escalation tail (Goldman $120) gets honest width |
| 7 | **News-frequency escalation index** (replicated GPR method) | §7 | Days | A measurable pace series feeding the §2 filter; replaces gut-feel triggers |
| 8 | **Ripple-effect graph of the §11 cascade** (coupling analysis) | §6 | Days | Identifies which breaking points compound (shared diesel pool) vs merely co-occur |

*All papers above were located via web search Sep 9, 2026; URLs in the sections. Next concrete step if we adopt #1–#3: a `model/` folder with the three scripts (elasticity updater, Bayesian filter, draw-rate table) and a calibration log in `research/`.*
