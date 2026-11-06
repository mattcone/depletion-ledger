# Crisis state — Nov 6 (morning)

Sources and decisions: [Nov 6 daily log](logs/2026-11-06.md) · [Nov 5 daily log (morning + evening)](logs/2026-11-05.md) · [judgment history](judgment-history.md)

## Current read

**Judgment:** 10 / 50 / 40 — corridor holds / standoff / corridor lapses. No pre-committed trigger fired. The IRGC's vessel-fire claims (five tankers and a tugboat on Nov 5; two more tankers reportedly immobilized on Nov 6) remain unverified as described. UKMTO #197 reports a same-day tanker explosion that could overlap with one claim, but does not confirm a mine strike. Sustained, confirmed attacks on outbound traffic would warrant a fresh review of the odds.

**Filter (diagnostic, not public odds):** HORIZON **15.0 / 50.0 / 35.0**; STATE **0.0 / 100.0 / 0.0** (26th run, morning basis: Brent $98.29, still the latest settlement — Nov 6 settles at 14:30 ET). Inputs: 11 transits, one tanker loss, Brent $98.29, and Kpler's 7.195M b/d through Oct 28 (nine days old).

**Candidate shadow:** HORIZON **15.2 / 49.9 / 34.9** (0.152362 / 0.498948 / 0.348689); STATE **0.5 / 99.5 / 0.0** (0.005250 / 0.994746 / 0.000004). Not published. Reproduces at the recorded inputs. The Nov 5 morning run's unrounded output remains unexplained; see the Nov 5 daily log. No retroactive re-log.

**Storage context:** the reference draw band is 0.45M b/d (the $90–100 band) at Brent $98.29. It implies about 279.0M barrels in the SPR by Nov 6, based on the Oct 30 WPSR figure of 282.184M and seven elapsed days. Reference estimate, not a new inventory report; the 250M operational floor sits around Jan 10, 2027 at band pace.

**Other model metrics:** elasticity sensitivity is −0.22 / −0.45 / −0.67 mb/d per +$5 Brent move (ε 0.05 / 0.10 / 0.15, marginal from last week's $114.88). Calibration ledger: 4 resolved, 7 open.

## Markets, shipping, and stocks

- **Nov 6 closes (intraday, not settlements):** Brent **$98.47**, WTI **$90.85**. Latest settlements remain Nov 5: January Brent **$98.29** (+3.9%) / December WTI **$90.52** (+2.7%, Reuters wire). 10-yr **4.876%** intraday Nov 6 (sixth straight close below 5% was Nov 5's 4.837%; FRED/H.15 not yet posted). The Nov 6 settlement lands at 14:30 ET → evening pass.
- **AAA Nov 6 (applied):** gasoline $4.0688, diesel $6.2305 — diesel's **tenth straight daily decline**, $0.24 below the Sep 22 record. Nov 6 retail-minus-WTI gaps: **$171.2 diesel / $80.4 gasoline** (paired to the Nov 5 settlement $90.52; no same-day settlement yet).
- **Hormuz:** UKMTO has logged **seven attack reports since Nov 1**. In its latest (#197, Nov 6), a tanker reported a waterline explosion 16NM east of Khasab while outbound; crew safe, vessel under its own power. This could overlap with one of the IRGC's same-day tanker claims, but UKMTO did not confirm a mine strike. India's foreign ministry says one seafarer died and 13 were rescued in the Nov 3 dhow attack. Kpler's Oct 30 briefing put October crude flows at 11.1M b/d, about 2% below September.
- **Iran / US:** Iran said it sent a nuclear proposal through Qatar on Nov 5 and conditioned further talks on seven demands; Reuters reported the US was reviewing it. Trump met his national security team. Fox News reported CENTCOM was finalizing preparations for possible renewed major operations, with no new order. The USS Theodore Roosevelt is not expected in the region until mid-November; CENTCOM says the blockade is tightening. CENTCOM said on Oct 25 that U.S. forces had helped Gulf partners export more than 1.5B barrels of crude since summer. Its Aug 28 update cited nearly 1,500 protected vessel transits carrying nearly 750M barrels and said recognized routes were free of Iranian mines.
- **Houthis:** the group claimed a missile strike on Riyadh's King Khalid Airport and attacks on Saudi forces (Nov 4), then a drone that disrupted air traffic at Dammam's King Fahd Airport (Nov 5); Saudi Arabia has not confirmed the airport claims. The coalition said it intercepted a missile toward Medina (Nov 5) and two toward Najran (Nov 6). The Houthis also claimed a downed Saudi drone and 61 Saudi airstrikes in 24 hours. CBS says Houthi attacks on Saudi airports have killed at least 20.
- **Sanctions:** Treasury's Nov 4 Chandigarh ship-registry action (five jurisdictions per OFAC; five countries not stated in the release). OFAC separately sanctioned an Indian and a Turkish firm/individual Nov 4 for facilitating Iran's shadow fleet.
- **Russia:** regional authorities reported a fire at an enterprise in Afipsky village after drone debris; Ukrainian outlets identified the refinery, the authorities did not name the site. HUR says 15 of 38 major refineries were out at end-September and 12 more had cut output; combined processing at those facilities was down 55.4% from January. Six named remote refineries processed 906 kb/d in September (24% of the national total). Ryazan was reportedly targeted, but local authorities confirmed fires only at unnamed industrial sites. No plant halt or cut was reported in the latest readable IntelliNews edition (Nov 5).
- **Russian diesel:** unchanged from Nov 5 — only the Agioi Fanendes (New York expected ~Nov 7) still appears headed for a US port; the other two Windward-tracked tankers changed course. New Jersey's governor warned state ports to reject the fuel.
- **OPEC+:** the seven producing members froze output for December (Nov 2, virtual) — already on the site.
- **Gas (TTF/JKM):** unchanged — latest assessments Oct 30 (JOGMEC, published Nov 2): TTF $34.0/MBtu (December delivery) and JKM low-$34s (December delivery). Recheck JOGMEC at the evening pass.
- **OECD stocks (EIA, July):** 3,810M barrels, up 23.6M from revised June; second-lowest monthly level since January 2021, and below the July 2021–25 seasonal range.
- **WPSR w/e Oct 30 (released Nov 4):** still the latest inventory report — SPR 282.184M (−0.399M); commercial crude ex-SPR 409.760M; distillates 99.259M (11.0% below last year); utilization 94.5%. Next: Nov 12, noon ET (w/e Nov 6).

## Next dates

- EIA WPSR, Nov 12, noon ET (w/e Nov 6; holiday-adjusted schedule); October CPI, Nov 10; IEA OMR, Nov 13; OPEC+ meeting, Nov 29.
- Agioi Fanendes arrival expected ~Nov 7 — delivery confirmation is the watch item.
- **Prod:** version `5c409d3a` (bundle `vrHNSgeN`) deployed ~07:55 MST on user green light — the Nov 6 morning build with the external-review fixes; verify-live prod PASS, all string checks pass. Supersedes `397a7e4a`. Next prod candidate: the Nov 6 settlements build (this evening).
