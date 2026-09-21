# Diesel Modeling — Literature Survey & Feasibility (Codex research session, Sep 20, 2026)

**Origin:** user asked "can we model diesel prices and/or supplies in the future?" — codex
read-only research session (web search) scoped to our data inventory and the no-imputation
rule. Report below is codex's output verbatim, followed by local verification notes.

**Headline verdict: YES, but scoped.** Build a US distillate balance-and-buffer monitor with a
short conditional stock projection first; add price modeling only after adding the free EIA
wholesale ULSD spot histories (Gulf Coast + New York Harbor — verified locally, see notes).
NOT feasible with our data: global diesel balance, international market-clearing prices, a
"date of exhaustion," or ML price forecasting (≈30 weekly crisis observations; identification
and validation problems, not compute).

**Fit table (codex):** Physical balances GOOD (US) · Crack/refining margins ADAPTABLE (needs
wholesale prices — now available free) · Spatial trade NOT FEASIBLE (no regional benchmarks +
freight) · Storage/stocks GOOD for buffer monitoring · Retail pass-through ADAPTABLE (needs
longer history) · Mixed-frequency nowcasting ADAPTABLE (modest benefit) · Event/scenario/
Bayesian GOOD as decision framework (probabilities uncalibrated) · ML NOT FEASIBLE initially ·
Intervention/change-detection (Box–Tiao, CUSUM) GOOD for objective tripwires.

**Key measurement corrections (codex):**
- Our "crack" (AAA diesel − WTI) is a **retail-to-crude spread** (42·R − C), not a crack — it
  bundles wholesale refining, transport, taxes, retail margin, timing. A real crack uses a
  wholesale product price: K = 42·W − C.
- Product supplied is derived (production + trade + stocks), not an independent demand survey.
- SPR cannot be added to product stocks (different commodity; value depends on release,
  refining, yields, time). Keep state vectors separate.
- JODI needs a scope audit before any model use (we already flagged US rows scope-mismatched).
- Don't reuse crude 10/35/55 as diesel outcome probabilities — need
  P(diesel outcome) = Σ_h P(diesel outcome | h)·P(h) with diesel-specific conditionals.

**Recommended architecture ("HORIZON-for-diesel") — 5 components, separately evaluated:**
1. Observation ledger (period, release time, retrieval time, units, scope, source, vintage)
2. US balance & buffer monitor (stock changes, net exports, seasonal comparisons)
3. Short-horizon stock model (conditional projection + empirical error ranges)
4. Event/scenario layer (defined diesel outcomes: refinery outages, export restrictions,
   US production/net exports, regional stocks, heating seasonality)
5. Price component, LATER (wholesale crack + small retail pass-through model)

**The first build (codex's "single most useful"): US distillate balance-and-buffer monitor.**
Data lines: P=WDIRPUS2, M=WDIIMUS2, X=WDIEXUS2, D=WDIUPUS2, S/S_r=table6.csv, U=WPULEUS3,
I_r=table2.csv. Steps: (1) validate balance
ε = P+M−X−D − (1000/7)(S_t−S_{t−1}) ≈ 0; (2) physical state: net exports N=X−M,
4-wk balance b (≈ (1000/28)(S_t−S_{t−4})), cover = 1000·S/D̄₄ labeled "stocks relative to
trailing supplied, NOT days-until-empty"; (3) seasonal context: matched-week median of 5 prior
years, anomaly %; (4) conditional projection Ŝ_{t+h} = S_t + (h/4)(S_t−S_{t−4}), h=1 and 4,
labeled "at the recent stock-change rate," invalidated (not clipped) if negative; (5) empirical
80% error interval from rolling-origin backtest errors (nearest-rank quantiles), publish
coverage + sample size. Validation: rolling forecast origins, aggressive baselines (no-change,
drift, seasonal), stress periods (2008, 2020, 2022) as stress tests not equivalents, real-time
vs revised-data testing distinguished, Brier scores for scenario probabilities.

**What would change the answer:** (1) free EIA Gulf Coast / New York Harbor ULSD spot
histories — unlocks real crack, wholesale/retail margin decomposition, domestic price
differential, retail pass-through test (HIGHEST-VALUE acquisition, no paid data needed);
(2) for international pricing: matched regional assessments (Rotterdam/ARA + Singapore)
**plus** route freight/insurance/basis together — a benchmark alone doesn't unlock arbitrage
economics; for international physical supply: cargo tracking with destinations + revision
history.

---

## Codex report (verbatim)

**Recommendation: build a US distillate balance and stock-pressure model first. Add diesel price forecasting only as a separately validated component.** Your inventory supports a transparent account of where US supply is coming from, how quickly stocks are changing, and which regions have unusually small buffers. It does not support a global diesel balance, regional market-clearing prices, or a reliable date when diesel “runs out.”

There is also a useful discovery: **free EIA wholesale diesel prices substantially improve the price-modeling possibilities.** Paid Rotterdam or Singapore assessments are unnecessary for an initial US wholesale/retail model.

This was a read-only investigation. No files were changed, committed, or deployed. The session’s filesystem restrictions prevent saving `/tmp/codex-review.txt`; the full report follows.

**Scope and interpretation**

I treat your crisis background as the project’s stated setting, rather than independently reassessing its events or current probabilities. References below were checked against publisher pages, author manuscripts, or agency documentation. Working papers are identified as such. The equations are simplified methodological descriptions or proposed adaptations, not reproductions of estimated coefficients.

For the no-imputation constraint, I assume you permit:

- Official published estimates, including EIA’s estimates.
- Reproducible calculations from observed inputs.
- Explicitly labeled forecasts and scenario assumptions, kept separate from observations.

If “every number must be sourced” excludes even labeled model outputs, the appropriate product is an accounting and monitoring dashboard; numerical forecasting would contradict that interpretation.

| Family | Fit for the stated inventory | Practical conclusion |
|---|---|---|
| Physical balances | **GOOD** for US accounting; **ADAPTABLE** for forecasts | Make this the foundation |
| Crack spreads/refining margins | **ADAPTABLE** | Add free wholesale prices; retail minus crude is insufficient |
| Spatial trade/no-arbitrage | **NOT FEASIBLE** for a quantitative international model | Missing regional prices, freight, and route constraints |
| Storage/stocks | **GOOD** for buffer monitoring; **ADAPTABLE** for price relationships | Use product stocks; keep SPR separate |
| Retail pass-through | **ADAPTABLE** | Requires longer history and preferably wholesale prices |
| Mixed-frequency nowcasting | **ADAPTABLE**, with modest likely benefit initially | Respect actual releases; monthly repetition creates no new information |
| Event/scenario/Bayesian updating | **GOOD** as a decision framework | Probability calibration remains unproven |
| ML price forecasting | **NOT FEASIBLE** as the initial crisis model | Small transparent regressions are better research candidates |
| Intervention/change detection | **GOOD** for monitoring | Useful addition to pre-committed tripwires |

**Important measurement issues before modeling**

**Retail minus crude is not a diesel crack spread.** The local [diesel research notes](/home/mcone/depletion-ledger/research/diesel-dashboard-ideas.md) describe AAA diesel minus WTI as a crack. In consistent units,

\[
42\,R_t-C_t
\]

is a **retail-to-crude spread**, where \(R\) is dollars/gallon and \(C\) dollars/barrel. It includes wholesale refining economics, transportation, taxes, retail margins, and differences in adjustment timing. A wholesale diesel crack instead uses a wholesale product price. EIA’s documented price model explicitly separates wholesale-to-crude and retail-to-wholesale margins. [EIA, *Petroleum Product Prices Module*](https://www.eia.gov/outlooks/steo/documentation/petroleum_product_prices.pdf)

**Distillate is broader than road diesel.** Heating demand can move the same stocks and production series. Renewable diesel substitution also complicates interpreting petroleum distillate supplied as total diesel use. EIA has specifically documented this distinction. [EIA, *Low U.S. distillate consumption reflects slow economic activity and biofuel substitution*](https://www.eia.gov/todayinenergy/detail.php?id=61925)

**Product supplied is not an independent demand survey.** In the weekly product balance, it is calculated from production, trade, and stock changes. Reconstructing it from those inputs checks consistency; it does not provide independent confirmation of demand. Primary stocks also exclude important downstream inventories. [EIA, WPSR explanatory notes](https://www.eia.gov/petroleum/supply/weekly/pdf/appendixb.pdf)

**JODI needs a scope audit before model use.** The local notes already flag implausible production/stock comparisons. Check product, flow, unit, monthly-total versus daily-rate treatment, and vintage before explaining discrepancies economically. A unit mismatch is one possibility; I have not established the cause. JODI distinguishes gross refinery output, receipts, transfers, demand, and statistical differences, and publishes different unit representations. Seaborne exports alone cannot close a country’s balance. [JODI definitions](https://www.jodidata.org/oil/support/user-guide/data-available-in-the-jodi-oil-world-database.aspx)

**1. Physical balance and market-clearing models**

Key methodological references:

- **U.S. EIA, 2025 update, *Short-Term Energy Outlook: Petroleum Refining Forecasts*, EIA model documentation.** Describes refinery input/output regressions and subsequent reconciliation of refinery balances. The document’s cover says October 2025; internal pages retain January 2024. [Documentation](https://www.eia.gov/analysis/handbook/pdf/STEO%20Petroleum%20Refining%20Model.pdf)
- **IEA, 2022, *Oil Market Report Glossary*, OMR methodological guide.** Explains product balances, reporting coverage, preliminary estimates, stock definitions, and unexplained balancing differences. [Guide](https://www.iea.org/articles/oil-market-report-glossary)
- **U.S. EIA, 2023, *What drives our forecast of U.S. diesel fuel consumption?*, STEO analysis.** Explains the role of GDP and a distillate-weighted manufacturing index in forecasting consumption. [Analysis](https://www.eia.gov/outlooks/steo/report/BTL/2023/06-dieselmacro/article.php)

These agency documents are more directly useful to this project than a generic equilibrium paper.

For weekly national data, define:

- \(P,M,X,D\): production, imports, exports, product supplied, in thousand barrels/day.
- \(S\): stocks, in million barrels.
- \(d\): days between stock observations.

The basic balance is:

\[
S_t-S_{t-1}=\frac{d}{1000}(P_t+M_t-X_t-D_t)
\]

Stock draw contributes to supply available for domestic disposition:

\[
D_t=P_t+M_t-X_t+\frac{1000}{d}(S_{t-1}-S_t)
\]

For a fuller international balance, add explicitly defined receipts, transfers, other production, and statistical differences. Do not invent a residual flow to make incomplete data close.

**Accounting does not determine price.** Market clearing requires additional behavioral equations:

\[
Q^d(p,z_d)=Q^s(p,z_s)+\text{stock release}(p,\text{expectations})
\]

You need demand elasticities, production responses, trade constraints, and storage behavior to solve for \(p\). The balance identity supplies none of those parameters.

**What STEO actually does.** Its refining module combines regressions with accounting identities. Distillate output depends on crude and unfinished-oil inputs, relative gasoline/distillate prices, lagged stocks, weather, and seasonality. Refinery inputs are adjusted to reconcile outputs and processing gain. This is an aggregate forecasting system, not a detailed refinery engineering optimizer. Several required inputs are outside your inventory. [EIA refining documentation](https://www.eia.gov/analysis/handbook/pdf/STEO%20Petroleum%20Refining%20Model.pdf)

**What IEA OMR actually does.** It assembles reported balances, preliminary observations, and estimates. OECD reporting supplies product-level accounting; less complete coverage elsewhere produces balancing uncertainty. “Miscellaneous-to-balance” can include unreported stocks, oil in transit, and measurement errors. The guide describes holding some unavailable stocks unchanged—an approach your policy should reject. Also, OMR “middle distillates” includes jet/kerosene, so it is not identical to EIA distillate. [IEA methodology](https://www.iea.org/articles/oil-market-report-glossary)

**Data requirements:** aligned production, all relevant trade, stocks, and product disposition; independently specified predictors for forecasting those components.

**FIT: GOOD for US accounting; ADAPTABLE for short-horizon forecasting.** National accounting is immediately useful. PADD balances need interregional movements and regional product disposition that you do not presently have. A global balance is not feasible from three reporting countries and incomplete trade categories.

**2. Crack-spread and refining-margin models**

Key references:

- **Hamed Ghoddusi, Sheridan Titman, and Stathis Tompaidis, 2021, *Crack Spreads and Capacity Utilization in the US Refinery*, SSRN working paper.** Structural treatment of crude/product prices and the relationship between utilization and processing spreads. I verified the working-paper record, not a subsequent journal publication. [Paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3951918)
- **Alessandro Lanza, Matteo Manera, and Massimo Giovannini, 2005, *Modeling and forecasting cointegrated relationships among heavy oil and product prices*, Energy Economics 27, 831–848.** Uses cointegration and error correction for crude/product relationships; its forecasting exercise targets crude, so diesel adaptation is an extension. [Paper](https://www.sciencedirect.com/science/article/pii/S0140988305000678)
- **U.S. EIA, 2015, *Petroleum Product Prices Module*, STEO documentation.** Provides an unusually transparent precedent for diesel wholesale margins and subsequent retail adjustment. Treat the specification as a precedent, not its historical coefficients as current parameters. [Documentation](https://www.eia.gov/outlooks/steo/documentation/petroleum_product_prices.pdf)

A wholesale diesel crack is:

\[
K_t=42W_t-C_t
\]

where \(W\) is wholesale diesel dollars/gallon.

A small reduced-form candidate is:

\[
K_t=a+\rho K_{t-1}+\beta A^S_{t-1}
+\gamma U_{t-1}+\theta^\top Z_t+\epsilon_t
\]

Here \(A^S\) is a seasonal stock anomaly, \(U\) utilization, and \(Z\) a very small set of seasonal or verified event variables.

The structural intuition is:

\[
\max_{\text{feasible runs and product slate}}
\left[\sum_k p_kq_k-\text{crude cost}-\text{processing cost}\right]
\]

subject to unit capacities, crude quality, product specifications, and joint production constraints. Diesel output competes with other products for equipment and suitable feedstock. A high diesel price cannot produce arbitrary additional diesel.

Two cautions matter:

- Utilization is endogenous: high margins can encourage higher runs, while outages can raise margins and lower utilization. A single regression coefficient need not have a stable causal sign.
- Atmospheric distillation utilization is not spare hydrocracker or desulfurization capacity. “Remaining utilization percentage” is not directly convertible into additional diesel barrels.

**Data requirements:** aligned wholesale diesel and crude prices, long histories, stocks, utilization, and preferably gasoline/jet prices, refinery yields, capacity, and outages.

**FIT: ADAPTABLE.** The original inventory lacks the dependent variable for a genuine crack model. However, EIA publishes free [Gulf Coast ULSD spot prices](https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_RGC_DPGD.htm) and [New York Harbor ULSD spot prices](https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_Y35NY_DPGD.htm).

Those unlock a US benchmark crack monitor and a modest econometric experiment. They do not turn the benchmark crack into realized refinery profit. Match observation dates and price bases; a spot-product minus front-month-crude spread retains a maturity/basis difference.

**3. Spatial trade and no-arbitrage models**

Key references:

- **Paul A. Samuelson, 1952, *Spatial Price Equilibrium and Linear Programming*, American Economic Review 42, 283–303.** Foundational treatment of regional prices, production, consumption, and transport costs in spatial equilibrium. [Journal issue](https://www.jstor.org/stable/i331414)
- **Fabiano Mezadre Pompermayer, Michael Florian, José Eugenio Leal, and Adriana Costa Soares, 2007, *A spatial price equilibrium model in the oligopolistic market for oil derivatives: an application to the Brazilian scenario*, Pesquisa Operacional 27, 517–534.** Models refined-product competition across refineries, terminals, and demand regions with an iterative equilibrium algorithm. [Paper](https://www.scielo.br/j/pope/a/LQbdMN37wVT34YbBXw7YxYt/?lang=en)
- **Walter C. Labys and Chin-wei Yang, 1991, *Advances in the Spatial Equilibrium Modeling of Mineral and Energy Issues*, International Regional Science Review 14.** Reviews transport, political constraints, and processing stages in regional commodity models. [Paper](https://journals.sagepub.com/doi/10.1177/016001769101400104)

For a feasible route \(i\rightarrow j\):

\[
p_j\le p_i+f_{ij}+\tau_{ij}+c_{ij}+\lambda_{ij}
\]

where \(f\) is freight, \(\tau\) taxes/tariffs, \(c\) other delivery costs, and \(\lambda\) the scarcity value of route capacity. For a used, unconstrained route in competitive equilibrium, the inequality becomes equality and \(\lambda=0\).

A diagnostic arbitrage incentive is:

\[
A_{ij}=p_j-p_i-f_{ij}-\tau_{ij}-c_{ij}
\]

A positive value is an incentive to trade. It does not prove cargoes can move or arrive immediately.

**Data requirements:** comparable regional wholesale products, delivered freight and insurance, transit times, route capacities, taxes, quality adjustments, inventories, and bilateral flows. Closures and sanctions require explicit feasible-route constraints.

**FIT: NOT FEASIBLE for international quantitative modeling with your inventory.** Crude prices, total transit counts, and US exports cannot identify the missing regional diesel prices or freight.

Free US Gulf Coast and New York Harbor prices would permit a domestic price-differential monitor. Without transport costs and availability, even that is not a validated arbitrage-profit calculation.

A qualitative map of verified disruptions and possible substitution routes remains useful.

**4. Storage, stocks, and working capital**

Key references:

- **Michael J. Brennan, 1958, *The Supply of Storage*, American Economic Review 48, 50–72.** Foundational empirical storage economics, including the value of holding physical inventory. [Journal issue](https://www.jstor.org/stable/i331430)
- **Michael J. Brennan and Eduardo S. Schwartz, 1985, *Evaluating Natural Resource Investments*, Journal of Business 58, 135–157.** Uses contingent-claims and control methods to value resource projects and operating flexibility. This is a real-options foundation, not a ready-made diesel storage model. [Author manuscript](https://www.anderson.ucla.edu/faculty/eduardo.schwartz/articles/24.pdf)
- **Angus Deaton and Guy Laroque, 1992, *On the Behaviour of Commodity Prices*, Review of Economic Studies 59, 1–23.** Competitive storage with nonnegative inventories generates nonlinear prices and occasional spikes. [Paper](https://academic.oup.com/restud/article-abstract/59/1/1/1516592?login=false)
- **Hélyette Geman and Steve Ohana, 2009, *Forward curves, scarcity and price volatility in oil and natural gas markets*, Energy Economics 31, 576–585.** Examines relationships between inventories, forward curves, and volatility; evidence concerns crude and gas, not a diesel calibration. [Authors’ publication listing](https://helyettegeman.com/selected-publications/)

A simplified competitive-storage condition is:

\[
0\le I_t
\quad\perp\quad
p_t+c_t-\frac{E_t[p_{t+1}]}{1+r_t}\ge0
\]

Positive inventory makes the intertemporal condition bind in this simplified risk-neutral model; at zero inventory, prices can disconnect sharply from normal storage relationships.

The familiar carry equation is:

\[
F_{t,T}=p_t e^{(r+c-y)(T-t)}
\]

where \(y\) is convenience yield—the operational benefit of having the product available.

A working-capital approximation is:

\[
\text{financing cost}
=\text{inventory value}\times
\text{annual funding rate}\times\frac{\text{holding days}}{365}
\]

Your 10-year Treasury yield is not a diesel trader’s short-term borrowing rate. It omits credit spreads and collateral terms.

A feasible buffer statistic is:

\[
\text{trailing domestic cover}
=\frac{1000S_t}{\overline D_{4,t}}
\]

It is a stock-to-recent-disposition ratio, not a countdown to exhaustion. Primary stocks include operating inventory; imports and production continue; demand and exports respond to conditions.

**Can PADD stocks and SPR do double duty?** Product stocks can serve as observed state variables for regional buffer monitoring and as predictors in a price model. SPR cannot be added to them. SPR contains crude, whose usefulness for diesel depends on release, delivery, refining capability, yields, and time. [DOE, Strategic Petroleum Reserve](https://www.energy.gov/hgeo/opr/strategic-petroleum-reserve)

Keep the state vector separate:

\[
x_t=(S_{1,t}^{dist},\ldots,S_{5,t}^{dist},
\text{refinery runs},S_t^{SPR},\text{logistics status})
\]

Do not count national stocks and their PADD components as independent evidence.

**Data requirements:** stocks and disposition for monitoring; product forward curves, funding/storage costs, operational minima, capacities, and withdrawal constraints for structural valuation.

**FIT: GOOD for monitoring; ADAPTABLE for empirical price-risk relationships.** A calibrated storage-option model is not feasible from stock levels and a crude front month alone.

**5. Retail pass-through and price formation**

The usual literature term is **“rockets and feathers.”**

Key references:

- **Severin Borenstein, A. Colin Cameron, and Richard Gilbert, 1997, *Do Gasoline Prices Respond Asymmetrically to Crude Oil Price Changes?*, Quarterly Journal of Economics 112, 305–339.** Classic analysis of asymmetric adjustment through the gasoline supply chain; methodological precedent, not diesel evidence. [Author manuscript](https://faculty.haas.berkeley.edu/borenste/download/QJE97GasAsym.pdf)
- **Jack Fosten, 2012, *Rising household diesel consumption in the United States: A cause for concern? Evidence on asymmetric pricing*, Energy Economics 34, 1514–1522.** Diesel-specific US study using threshold error correction and allowing for a structural break. [Author repository](https://wrap.warwick.ac.uk/id/eprint/50823/)
- **Steven Cook and Jack Fosten, 2019, *Replicating rockets and feathers*, Energy Economics 82, 139–151.** Shows that gasoline/diesel asymmetry findings can depend materially on sample and specification. [Author repository](https://ueaeprints.uea.ac.uk/id/eprint/65763/)

An asymmetric error-correction model is:

\[
\Delta R_t=
\alpha(R_{t-1}-a-bW_{t-1})
+\sum_j\beta_j^+\Delta W_{t-j}^+
+\sum_j\beta_j^-\Delta W_{t-j}^-
+\sum_j\phi_j\Delta R_{t-j}
+\epsilon_t
\]

where:

\[
\Delta W^+=\max(\Delta W,0),\qquad
\Delta W^-=\min(\Delta W,0)
\]

The first term pulls retail and wholesale prices toward their estimated longer-term relationship; the other terms allow different adjustment speeds after increases and decreases.

**Data requirements:** a long, consistent retail series; wholesale diesel; matched calendars; tax and specification changes where relevant. Cointegration and coefficient stability must be checked before using an error-correction interpretation.

**FIT: ADAPTABLE.** A crude-only distributed-lag model is possible, but its residual mixes refining, distribution, taxes, retail behavior, and omitted shocks. It cannot isolate retail pass-through.

With only the crisis sample, begin with a symmetric, very small lag model. Add asymmetry only if it improves genuinely held-out forecasts.

AAA and EIA retail diesel are different measurement series. A model trained on EIA should initially forecast EIA. Do not silently splice EIA history onto AAA or claim that performance transfers without an overlapping-series assessment.

**6. Mixed-frequency nowcasting**

Key references:

- **Eric Ghysels, Arthur Sinko, and Rossen Valkanov, 2007, *MIDAS Regressions: Further Results and New Directions*, Econometric Reviews 26, 53–90.** Uses parsimonious lag weights to combine different sampling frequencies. [Author institution](https://research.manchester.ac.uk/en/publications/midas-regressions-further-results-and-new-directions/)
- **Claudia Foroni, Massimiliano Marcellino, and Christian Schumacher, 2015, *Unrestricted mixed data sampling (MIDAS): MIDAS regressions with unrestricted lag polynomials*, Journal of the Royal Statistical Society, Series A 178, 57–82.** Shows how unrestricted lags can work when frequency differences are modest. [Paper](https://onlinelibrary.wiley.com/doi/10.1111/rssa.12043)
- **Marta Bańbura and Michele Modugno, 2014, *Maximum Likelihood Estimation of Factor Models on Datasets with Arbitrary Pattern of Missing Data*, Journal of Applied Econometrics 29, 133–160.** Handles differing release schedules and missing observations in dynamic-factor models. [Paper](https://doi.org/10.1002/jae.2306)

Conventional MIDAS predicts a lower-frequency target from higher-frequency inputs:

\[
y_m=a+\rho y_{m-1}
+\beta\sum_{j=0}^{J}w_j(\theta)x_{t(m)-j}
+\gamma z_{m-\ell}+\epsilon_m
\]

The weights sum to one and use a small number of parameters.

For a weekly target with lagged monthly international information, a simpler release-aware regression is:

\[
y_{t+h}=a+\rho y_t+\beta x_t+
\gamma z_{m^*(t)}+\delta\,age_t+\epsilon_{t+h}
\]

Here \(m^*(t)\) is the latest reference month actually published by forecast time \(t\).

Using “latest available June observation” as a predictor is permissible if its date is retained. Publishing that value as an observed July, August, or September flow would be imputation.

**Data requirements:** long histories, actual release dates, revision vintages, a clear target, and enough joint observations to estimate cross-country relationships.

**FIT: ADAPTABLE, but not an initial priority.**

Specific limitations:

- Repeating one monthly observation across several weekly forecasts does not create several independent international observations.
- US weekly movements do not necessarily predict Kuwait or Saudi output under local disruptions.
- A nowcast of an unreported monthly quantity is a model estimate. It cannot fill the observed-data table.
- A state-space model can operate with missing measurements, but estimated latent values must remain visibly distinct from observations.
- Do not call the latest published US weekly balance a nowcast of today. A genuine nowcast targets an unpublished period.

Start with monthly information as dated context or a candidate lagged predictor. Require evidence that it improves forecasts over a US-only model.

**7. Event-driven scenarios, Bayesian updating, and judgment**

Key references:

- **Bruce Abramson and Anthony Finizza, 1991, *Using belief networks to forecast oil prices*, International Journal of Forecasting 7, 299–315.** An oil-industry precedent combining elicited relationships and probabilistic networks, designed to update as Gulf events changed. [Paper](https://www.sciencedirect.com/science/article/abs/pii/016920709190004F)
- **Robert T. Clemen and Robert L. Winkler, 1999, *Combining Probability Distributions From Experts in Risk Analysis*, Risk Analysis 19, 187–203.** Reviews pooling methods and the difficulties created by dependent information sources. [Author manuscript](https://people.duke.edu/~clemen/bio/Published%20Papers/28.CombiningDistributions-Clemen%26Winkler-RA-99.pdf)
- **Victoria Hemming, Mark A. Burgman, Anca M. Hanea, Marissa F. McBride, and Bonnie C. Wintle, 2018, *A practical guide to structured expert elicitation using the IDEA protocol*, Methods in Ecology and Evolution 9, 169–180.** A practical investigate–discuss–estimate–aggregate process. [Paper](https://doi.org/10.1111/2041-210x.12857)
- **Tilmann Gneiting and Adrian E. Raftery, 2007, *Strictly Proper Scoring Rules, Prediction, and Estimation*, Journal of the American Statistical Association 102, 359–378.** Establishes principled evaluation of probabilistic forecasts. [Author manuscript](https://sites.stat.washington.edu/people/raftery/Research/PDF/Gneiting2007jasa.pdf)

For mutually exclusive, collectively exhaustive scenarios \(s\):

\[
p_t(s)=
\frac{p_{t-1}(s)L_t(s)}
{\sum_kp_{t-1}(k)L_t(k)}
\]

where \(L_t(s)=P(e_t\mid s,\text{previous evidence})\).

This is a transparent update only if the likelihoods are documented. Assigning a number to a likelihood does not make it empirically calibrated.

A model/judgment blend can be:

\[
p_t^{published}(s)
=(1-\lambda)p_t^{model}(s)+\lambda p_t^{judgment}(s)
\]

Publish both components and the reason for \(\lambda\). The linear pool is an aggregation rule, not automatically a Bayesian posterior.

A useful release surprise is:

\[
u_t=x_t-\widehat x_{t\mid t^-}
\]

The forecast must be frozen before release. A likelihood-based surprise, \(-\log P(e_t\mid\text{prior information})\), requires a specified probability model; it cannot be manufactured from a narrative.

**Data requirements:** precise outcomes and horizons; timestamped evidence; documented likelihood assumptions; explicit treatment of duplicated and correlated signals; archived forecasts and resolutions.

**FIT: GOOD as a governance and scenario framework; ADAPTABLE as a calibrated probability model.**

For diesel, add mechanisms absent from a Hormuz-only model:

- Refinery outages and restart verification.
- Export restrictions and their implementation.
- US production and net exports.
- Regional stocks and logistics.
- Seasonal heating demand.
- Product-specific disruption evidence.

Do not multiply separate likelihoods for stocks, stock change, and product supplied as though they were independent. Likewise, multiple articles citing one wire report are one underlying observation.

One maintainer plus an LLM is not an independent expert panel. The LLM can check arithmetic, retrieve counterevidence, and enforce the elicitation form; its agreement is not another expert vote.

Do not reuse the crude model’s 10/35/55 weights as diesel outcome probabilities. If \(h\) denotes a crude scenario:

\[
P(\text{diesel outcome})
=\sum_hP(\text{diesel outcome}\mid h)P(h)
\]

The conditional probabilities still require diesel-specific evidence or explicitly labeled judgment.

**8. Machine-learning approaches**

Key references:

- **Lean Yu, Shouyang Wang, and Kin Keung Lai, 2008, *Forecasting crude oil price with an EMD-based neural network ensemble learning paradigm*, Energy Economics 30, 2623–2635.** Decomposes crude prices into components, forecasts them with neural networks, and recombines them. [Paper](https://www.sciencedirect.com/science/article/pii/S0140988308000765)
- **Kulwadee Wahanarat, Phatcharaphon Ratchawong, Somruethai Ze-ueng, and Puntipa Wanitjirattikal, 2024, *Comparison of Model Performance between Penalized Regression and Machine Learning for Diesel Prices in Thailand*, Journal of Science Ladkrabang 33, 167–184.** Diesel-specific comparison of penalized regression, support-vector regression, and random forests using daily data. Its reported ranking does not establish transferability to US crisis forecasting. [Paper](https://li01.tci-thaijo.org/index.php/science_kmitl/article/view/259980)
- **Kunliang Xu and Weiqing Wang, 2023, *Limited information limits accuracy: Whether ensemble empirical mode decomposition improves crude oil spot price prediction?*, International Review of Financial Analysis 87, 102625.** Shows why whole-series decomposition leaks future information and reports much weaker gains when preprocessing is restricted to information available at each forecast origin. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S1057521923001412)

The general algorithm is:

\[
\widehat y_{t+h}=f_\theta(x_t,x_{t-1},\ldots)
\]

with:

\[
\widehat\theta=
\arg\min_\theta
\sum_{t\in train}\ell(y_{t+h},f_\theta(X_t))
+\lambda\Omega(\theta)
\]

**Data requirements:** many genuinely independent training examples, representative regimes, reliable targets, strictly chronological validation, and careful feature construction.

**FIT: NOT FEASIBLE as the initial crisis forecasting model.** Seven months supplies only roughly thirty weekly observations before lagging and holdouts, with strong serial dependence. Monthly international information is even thinner.

Specific failure modes include:

- Large model capacity relative to independent observations.
- Weak extrapolation to new disruptions or record prices.
- Training/test leakage from random splits, smoothing, normalization, or decomposition.
- Mistaking accurate price-level tracking for useful forecasts of changes.
- Feature importance being presented as causal explanation.

The objection is not that all ML requires heavy compute. Random forests can be cheap. The problem is identification, validation, and explanation.

With a much longer history, ridge regression or a very small tree could be a research challenger. It should have to beat the same simple baselines as every other candidate.

**9. Additional family: intervention models and sequential change detection**

Key references:

- **George E. P. Box and George C. Tiao, 1975, *Intervention Analysis with Applications to Economic and Environmental Problems*, Journal of the American Statistical Association 70, 70–79.** Introduces structured pulse, step, and dynamic intervention effects in time-series models. [Paper](https://www.tandfonline.com/doi/abs/10.1080/01621459.1975.10480264)
- **E. S. Page, 1954, *Continuous Inspection Schemes*, Biometrika 41, 100–115.** Foundation of cumulative-sum monitoring for persistent departures from a baseline. [Paper](https://doi.org/10.1093/biomet/41.1-2.100)

An intervention model can be:

\[
y_t=\text{seasonal baseline}_t+
\phi y_{t-1}+\omega I_t+\epsilon_t
\]

where \(I_t\) is a pre-defined event pulse or continuing condition. A richer transfer function can allow delayed effects, but adds parameters.

A one-sided cumulative-sum detector is:

\[
C_t=\max(0,C_{t-1}+z_t-k)
\]

Trigger a review when \(C_t>H\). Here \(z_t\) is a standardized forecast residual, \(k\) tolerated drift, and \(H\) a threshold selected from historical false-alarm performance.

**Data requirements:** a historical seasonal baseline, stable measurement definitions, serial-dependence treatment, and timestamped event coding.

**FIT: GOOD for monitoring.** This gives tripwires an objective persistence test. It does not establish why the break occurred or produce a calibrated shortage probability. Avoid estimating separate effects for numerous events that overlap during the same short crisis.

**A. Recommended architecture for “HORIZON-for-diesel”**

Use a small set of separately evaluated components.

| Component | Computes | Inputs | Permissible claim |
|---|---|---|---|
| Observation ledger | Latest values, dates, revisions, missingness | Original EIA/AAA/JODI/event sources | “These are the observations available at this time” |
| US balance and buffer monitor | Stock changes, net exports, domestic availability, seasonal stock comparisons | Weekly EIA flows and stocks | “US primary distillate stocks accumulated/depleted at this rate” |
| Short-horizon stock model | Future stock change with empirical error ranges | Long EIA history and current observations | “Conditional forecast of reported US stocks” |
| Event/scenario layer | Explicit beliefs about defined future outcomes | Verified events plus selected physical signals | “Judgment-informed scenario probabilities” |
| Price component, later | Wholesale cracks and short-term retail forecasts | Added wholesale prices, consistent retail history, crude | “Forecast of this named US benchmark” |

**The observation ledger is essential.** Store reference period, release time, retrieval time, original units, product scope, source link, assessment flag, and vintage. Each derived value should retain input identifiers and its formula.

Keep distinct:

- Published observations and official estimates.
- Calculations from those observations.
- Statistical predictions.
- Human scenario assumptions.

A missing input produces a missing calculation. A model forecast never overwrites the missing observation.

**Define diesel outcomes before assigning probabilities.** A tractable first target is the change in seasonally adjusted national stocks over a fixed future horizon:

\[
T_{t,h}
=(S_{t+h}-B_{t+h})-(S_t-B_t)
\]

where \(B\) is a baseline frozen at forecast time.

“Easing,” “persistent pressure,” and “deterioration” can be defined by pre-committed boundaries on \(T\). Determine those boundaries from a documented historical distribution or an explicit editorial decision; do not call them engineering shortage thresholds.

Keep PADD stress visible separately. National improvement can coexist with regional deterioration.

Actual physical-shortage probabilities need observable resolution criteria—such as specified delivery restrictions or verified outages—and their own event record. Low stocks alone are not a shortage label.

**Maintain the 48-hour decision SLA.** A new material release or verified event should produce a logged decision to update or retain the assessment. Retaining it should also have a reason. Corrected reports supersede earlier evidence; they are not an additional independent signal.

**Price-model research should begin with a small forecast.** After adding wholesale history, a possible one-period retail model is:

\[
\widehat{\Delta R}_{t+1}
=a+\phi\Delta R_t+\beta_0\Delta W_t+\beta_1\Delta W_{t-1}
\]

All predictors must already be available at the stated forecast origin. Align retail and wholesale observation calendars explicitly. This model asks whether recent wholesale changes help predict the next retail observation.

Only add stocks, crude, asymmetry, or event interactions if they improve held-out performance. A longer-horizon retail forecast also requires future wholesale/crude assumptions; its uncertainty must include those paths.

**What it can and cannot claim**

It can describe published US distillate conditions, quantify historical unusualness, forecast a defined reported quantity, and organize evidence about what could change.

It cannot presently establish:

- A global diesel deficit.
- Available-to-deliver stocks at every location.
- A date of physical exhaustion.
- The causal fraction of retail prices attributable to Hormuz.
- A calibrated effect of an export ban.
- Future AAA diesel prices merely by applying crude scenario weights.

TTF, JKM, Henry Hub, EUR/USD, and Treasury yields should enter only through a specified mechanism and demonstrated incremental value. Their availability is not a reason to include them.

**Validation and honest uncertainty**

1. **Obtain longer histories from the same free sources.** Use all periods with compatible definitions. Pre-crisis observations help estimate seasonality and normal dynamics; they do not supply repetitions of the present crisis.

2. **Use rolling forecast origins.** At each origin, fit and transform data using only what was available then. Evaluate proposed one- and four-week horizons separately. These horizons are design choices.

3. **Benchmark aggressively.** For stocks, compare no change, recent drift, and seasonal historical change. For prices, compare no change and a small autoregression before adding explanatory inputs.

4. **Evaluate difficult historical periods separately.** Where definitions and coverage permit, examine the 2008 price cycle, pandemic disruption, and 2022 product-market stress. These are stress tests, not equivalent geopolitical events.

5. **Distinguish real-time from revised-data testing.** If historical release vintages are unavailable, label the result a revised-data backtest. Monthly EIA data can help assess weekly-estimate discrepancies, but do not replace weekly observations retrospectively.

6. **Respect aggregation limits.** Weekly flow averages crossing calendar-month boundaries cannot produce exact monthly totals without assumptions. Label any prorating as an estimate. Do not interpolate weekly stocks to fabricate month-end stocks.

7. **Report errors in useful units.** Stock-change MAE in million barrels; retail MAE in cents/gallon; interval coverage and width; and performance during stress periods. For scenario probabilities, use Brier scores and calibration summaries on resolved forecasts. [Gneiting and Raftery](https://sites.stat.washington.edu/people/raftery/Research/PDF/Gneiting2007jasa.pdf)

8. **Allow for dependence.** Overlapping horizons and repeated forecasts about the same disruption are correlated. Use blocked evaluation or block bootstrap when estimating uncertainty in performance.

9. **Separate uncertainty types.** Historical forecast error, measurement/revision uncertainty, and uncertainty about scenario assumptions are different. A sensitivity envelope is not a confidence interval.

Do not announce a numerical error bar until the backtest produces one. Even then, historical coverage is not guaranteed under a new closure regime. If the model loses to a baseline, ship the baseline and retain the physical explanation.

**B. The single most useful first build**

Build a **US distillate balance-and-buffer monitor with a short conditional stock projection**.

It can fit in one or two sessions because it needs no optimized scenario probabilities, no international gap-filling, and no price regression. Its forecast component is deliberately simple enough to expose whether more elaborate work adds value.

Use these exact data lines:

| Symbol | Input | Units/use |
|---|---|---|
| \(P_t\) | `WDIRPUS2` | Refiner/blender net production, kb/d |
| \(M_t\) | `WDIIMUS2` | Imports, kb/d |
| \(X_t\) | `WDIEXUS2` | Exports, kb/d |
| \(D_t\) | `WDIUPUS2` | Product supplied, kb/d |
| \(S_t\) | `table6.csv`, national distillate stocks | Convert published units explicitly to million barrels |
| \(S_{r,t}\) | `table6.csv`, five PADD distillate stocks | Regional levels and changes |
| \(U_t\) | `WPULEUS3` | Utilization context |
| \(I_{r,t}\) | `table2.csv`, crude inputs by PADD | Refinery activity context |

Source tables: [WPSR Table 6](https://ir.eia.gov/wpsr/table6.csv), [WPSR Table 2](https://ir.eia.gov/wpsr/table2.csv). Preserve each release because these URLs are updated.

Use only observations with matched reference weeks and compatible vintages.

**Step 1: validate the balance.**

For a standard seven-day reporting interval:

\[
\epsilon_t=
P_t+M_t-X_t-D_t-\frac{1000}{7}(S_t-S_{t-1})
\]

Expected interpretation: near zero within published rounding and any documented scope adjustments.

If it does not reconcile, flag the affected calculation. Do not distribute the discrepancy across flows. A near-zero result is a data-consistency check, not evidence of forecast skill.

**Step 2: compute the physical state.**

\[
N_t=X_t-M_t
\]

\[
A_t=P_t-N_t
\]

Here \(N\) is net exports and \(A\) production retained after net trade, before inventory movements.

For any flow \(Z\), using four consecutive observed weeks:

\[
\overline Z_{4,t}=\frac14\sum_{j=0}^{3}Z_{t-j}
\]

Then:

\[
b_t=\overline P_{4,t}+\overline M_{4,t}
-\overline X_{4,t}-\overline D_{4,t}
\]

\[
b_t=\frac{1000}{28}(S_t-S_{t-4})
\]

Positive \(b\) means accumulation; negative \(b\) means depletion. The second expression makes the accounting dependence explicit.

Also compute:

\[
Cover_t=\frac{1000S_t}{\overline D_{4,t}}
\]

Label this **stocks relative to trailing domestic product supplied**, not “days until empty.”

For each PADD:

\[
\Delta_4S_{r,t}=S_{r,t}-S_{r,t-4}
\]

Do not divide regional stocks by national demand and call the result regional cover.

**Step 3: provide seasonal context.**

Let \(H_{r,t}\) contain observed stocks from the corresponding reporting week in each of the preceding five completed years. Define the matching-week and week-53 conventions in the spec.

\[
B_{r,t}=\operatorname{median}(H_{r,t})
\]

\[
A^S_{r,t}=100\left(\frac{S_{r,t}}{B_{r,t}}-1\right)
\]

Show the historical sample size and actual range. Five matched years support a useful comparison, not a precise tail probability. Missing historical observations remain missing.

The five-year window is a proposed design choice. Test whether conclusions change under another documented historical window, especially where biofuel substitution or capacity changes affect comparability.

**Step 4: add the conditional projection.**

If the recent net balance persisted for \(h\) more weeks:

\[
\widehat S_{t+h\mid t}
=S_t+\frac{7h}{1000}b_t
\]

Equivalently:

\[
\widehat S_{t+h\mid t}
=S_t+\frac h4(S_t-S_{t-4})
\]

Evaluate \(h=1\) and \(h=4\).

Label it **“conditional projection at the recent stock-change rate.”** It is not a forecast that production, exports, and demand will individually remain unchanged.

A negative projected stock or an implausibly long extrapolation should invalidate the projection, not create a depletion-date headline. Do not clip it silently to zero.

**Step 5: attach empirically earned error ranges.**

At each historical origin \(o\):

\[
e_{o,h}=S_{o+h}-\widehat S_{o+h\mid o}
\]

For a proposed central 80% historical error interval:

\[
\left[
\widehat S_{t+h\mid t}+Q_{0.10}(e_{\cdot,h}),
\quad
\widehat S_{t+h\mid t}+Q_{0.90}(e_{\cdot,h})
\right]
\]

Use only errors whose outcomes were known before the current origin. Nearest-rank empirical quantiles avoid interpolating quantile values. The coverage level is an explicit presentation choice.

Publish interval sample size, historical coverage, and stress-period coverage. If validation is insufficient, ship the observed monitor first and keep the projection in an experimental panel.

The first screen should show national stocks and seasonal comparison, regional stock changes, production, net exports, product supplied, and the conditional stock path. Every result can be traced to a short formula and named inputs.

**C. What would change the answer**

**1. Acquire a consistent historical US wholesale-price package—free first.**

Add EIA Gulf Coast and New York Harbor ULSD spot histories, matched crude spot histories, and a consistent long retail diesel history. EIA’s product-price pages establish that the wholesale series are publicly available. [Gulf Coast ULSD](https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_RGC_DPGD.htm), [New York Harbor ULSD](https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_Y35NY_DPGD.htm)

This unlocks:

- A genuine benchmark diesel crack.
- Wholesale versus retail margin decomposition.
- A domestic regional price differential.
- A credible test of short-horizon retail pass-through.

This is the highest-value next acquisition because it addresses the largest conceptual weakness in the current price inventory without requiring a paid international benchmark.

**2. For international pricing, acquire matched regional diesel assessments and route freight together.**

A package covering the relevant Rotterdam/ARA and Singapore diesel specifications, plus freight, insurance, delivery basis, and route availability, would make quantitative spatial diagnostics plausible.

A regional benchmark alone unlocks regional cracks and price comparisons. It does **not** unlock delivered arbitrage economics or identify trade volumes.

If the priority instead becomes international physical supply, product-specific export/cargo tracking with destinations and revision history would be a better second purchase. Even then, unobserved inland demand and stocks would remain obstacles to a complete global balance.

For the present project, the implementable decision is to ship the US balance-and-buffer monitor, collect forecast errors, and develop a US wholesale/retail component only after adding the free price histories.
---

## Local verification notes (Sep 20 evening)

1. **Free wholesale ULSD spot pages — VERIFIED LIVE:**
   - Gulf Coast: `https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_RGC_DPGD.htm`
   - NY Harbor: `https://www.eia.gov/dnav/pet/hist/EER_EPD2DXL0_PF4_Y35NY_DPGD.htm`
   Both exist, titled "…Ultra-Low Sulfur No 2 Diesel Spot Price (Dollars per Gallon)", layout
   = weekly rows "YYYY Mmm-D to Mmm-D" with FIVE daily $/gal cells (Mon–Fri; blanks on
   weekends/holidays), 20+ years of history (page ~237 KB). These are EIA's posted spot
   assessments (weekdays only) — free, no key. NOTE: they are daily-point observations; a
   weekly value must be an explicitly-labeled average of the available days, or use matched
   single days.
2. **Balance identity — VERIFIED with live numbers (w/e Sep 11, 2026):**
   P+M−X−D = 5,227+114−1,614−3,501 = 226 kb/d → ×7/1000 = **1.582 M bbl** vs table6 stock
   change 107.859−106.274 = **+1.585 M bbl**. Reconciles to rounding. Step 1 of the first
   build works on real data.
3. Papers cited by codex were checked against publisher pages per its own scope note;
   working papers flagged as such.

## Continued verification (Sep 20 evening, post-save)

**ULSD series parsed in full:** 1,058 weekly rows / ~5,080 daily observations each, from
2006-06-12 through the current week. Both pages live: GC's newest row is "Sep 14–18" with
values [4.946, 5.206] (2 days — EIA's spot survey appears to be a few days behind at the
margin; the prior row "Sep 7–11" has 4 of 5 days). Daily values map Mon→Fri across the five
cells; treat day-assignment of partial weeks with care.

**2026 wholesale trajectory (weekly avg of available days, $/gal):** GC 1.991 (Jan 5–9) →
4.612 (Aug 31–Sep 4) → 4.881 (Sep 7–11) → 5.076 (Sep 14–18, 2 days). NY Harbor: 2.133 →
4.604 → 4.928 → 5.208. **Wholesale diesel has roughly 2.5×'d YTD.**

**First REAL crack (K = 42·W − C, labeled weekly averages, matched to the site's WTI series):**

| Week | GC ULSD avg (days) | 42·W $/bbl | WTI (site series) | Crack $/bbl |
|---|---|---:|---|---:|
| Jan 5–9 (pre-crisis) | 1.991 (5) | 83.6 | 58.10 (Jan 5) | **≈25.5** |
| Sep 7–11 | 4.881 (4) | 205.0 | 102.93 (Sep 10 close) | **≈102.1** |
| Sep 14–18 (partial) | 5.076 (2) | 213.2 | 105.83 (Sep 15 close) | **≈107.4** |

So the wholesale refining margin is up roughly **4× from pre-crisis**, and the site's
retail-minus-crude spread ($172.9, Sep 20) sits ~$65–70 above it — that gap is taxes,
transport, and retail margin, which the retail spread currently bundles invisibly. This is
the concrete justification for the two-line presentation: real crack (wholesale) + retail
spread (labeled as such).

**NY−GC domestic differential:** +0.142 (Jan), +0.047 (Sep 7–11), +0.132 (Sep 14–18) $/gal —
i.e. the East Coast premium is about where it was pre-crisis. The "East Coast is worse" story
lives in the STOCKS data (PADD 1 −31% y/y vs Gulf Coast −6.9%), not yet in the price
differential. Watch item for the monitor: a widening NY−GC gap would be the first price signal
of regional tightness.

**Balance-identity check (step 1 of the first build) — PASS:** w/e Sep 11:
P+M−X−D = 5,227+114−1,614−3,501 = 226 kb/d → +1.582 M bbl vs table6 ΔS = +1.585 M bbl
(rounding). The US weekly distillate balance reconciles on live data.
