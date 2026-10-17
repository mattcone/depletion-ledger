# October 16 evening changes — accuracy and copy review

Reviewed the current diff and October 16 logs, using /home/mcone/pi/COPY-STYLE.md.

Verified:
- October 16 oil settlements 109.86 Brent / 101.41 WTI and +3.7/+3.5% against Reuters' final wrap: https://in.marketscreener.com/news/oil-edges-down-as-investors-weigh-possible-us-sanctions-on-shadow-fleet-ce785dd3d08ff224 . Highest settlement dates May 19 / September 17 confirmed there. Treasury 5.098 corroborated by https://portfolio-terminal.com/markets/10-year-treasury-yield (secondary Yahoo-based series).
- MOS July 2025/2026 intake, product output and stock values match user-supplied October PDF, SHA b2f0e0d0aca6fc3084d06f1a29dd12fed0362c4be1e5d241dbb98afbb953ea1d. Checked pages 7,19,30–34; product groups reconcile exactly to total tonnes. Output is essentially unchanged. Diesel/gasoline spreads reproduce 164.2862 / 80.3282 dollars per barrel.
- NY Fed September 2027 probability is 12.7587%, rounded 13, based on September 2026 data (official Prob_Rec.pdf, updated October 4). WSJ 24% / 71 respondents corroborated by RevSD's October survey summary; primary WSJ article not independently accessed. Polymarket's exact October 16 snapshot was not independently reproduced.
- OFAC GL135 official signed text and October 9 release support Russian diesel permission through April 7, 2027: https://ofac.treasury.gov/media/937216/download . This does not repeal Russia's export restrictions.
- July Omsk report describes 38% damaged CDU-10 plus 37% halted CDU-11, not 75% physically damaged. Current status cannot be established from July news alone: https://www.marketscreener.com/news/russia-s-largest-oil-refinery-halts-processing-after-drone-attack-sources-say-ce7f5ed8db8ff424 . Ryazan October 16 report says CDU-6 shut but three other primary units operate: https://www.ukrinform.net/amp/rubric-ato/4175287-russias-ryazan-oil-refinery-shuts-down-key-processing-unit-after-drone-attack-reuters.html . Surgut fire confirmed by governor, fuel-plant identity unverified: https://www.themoscowtimes.com/2026/10/16/ukrainian-drones-strike-energy-plant-in-russias-largest-oil-producing-region-a94008 . IEA diesel constraint explanation verified against October OMR public analysis.

Corrections/copy:
- Corrected prose recession range to 13–50 and noted differing forecast windows.
- Replaced Ryazan “both out”/whole-plant-offline presentation with partial operation, and limited Kirishi status to its dated shutdown report. Narrowed Omsk claim to historical shutdown plus unverified current status.
- Renamed count to refineries and industrial sites so the unverified Surgut plant identification is not presented as a confirmed fuel plant. No count/incident dates changed.
- Shortened Russia watch item and struck-list explanation. Preserved confirmed events and qualifications. Removed unsupported delivery-timing detail from public watch copy; research record preserved.
- Corrected “seven-month high” in Treasury provenance to Brent's actual highest settlement since May 19. Corrected IEA OMR issue date to October 14. Fixed rounding comment (0.05 threshold, not 0.1).

Build, local chart/endpoint verification (22 charts), desktop/mobile browser check and model drift check passed. No issued model assumptions, scenario odds, numerical series values or supply-shape source values changed in this review. No commit or deployment. Historical event count and remaining secondary-source limitations are documented above; no source-access failure was treated as proof a claim was false.

## Factual edits for Qwen to review

These are reviewable corrections, not final adjudications. Please check the sources and flag any disagreement.

| Original claim | Replacement | Reason / evidence |
|---|---|---|
| Recession estimates range from 15% to 50%. | 13% to 50%, with different forecast windows. | Updated chart includes NY Fed's 12.7587%, rounded to 13. Official PDF cited above. |
| Ryazan “offline since Sep 6”; major refineries “both out.” | Ryazan partly operating; CDU-6 shut, three primary units operating. Kirishi retains its dated shutdown attribution, with current status unverified. | October 16 Reuters report relayed by Ukrinform explicitly reports the three operating units. It supersedes whole-plant-offline wording for Ryazan. |
| Omsk July shutdown, roughly three-quarters damaged or shut, no restart reported, presented among current shutdowns. | July shutdown affected units representing about three-quarters of capacity; current status unverified. | Reuters July report distinguishes damaged CDU-10 from halted CDU-11 and anticipated possible restart. Absence of a located restart report does not establish continued shutdown. |
| “Refineries and fuel plants struck” includes Surgut. | “Refineries and industrial sites struck”; Surgut identity remains unverified. | Governor confirms an industrial-site fire; condensate-plant identification comes from other reporting. Twelve-site count retained; Qwen should review whether this broader category is appropriate for the chart. |
| Treasury note says oil at a seven-month high. | Brent at its highest settlement since May 19. | October 16 Reuters final oil wrap; May to October is about five months. |
| IEA October report dated Oct 15. | Oct 14. | October OMR publication date; Oct 15 was later reporting. |

Public copy also omits the proposed two-week delivery timing, long political context, and some repeated detail to shorten the watch item. Those omissions do not declare the underlying reports false; the research record remains available. The shortened Russia status flag omits earlier exact shutdown counts because current operating status is not verified uniformly across the list. No source-series numbers, plant-count number, probabilities or model assumptions changed.
