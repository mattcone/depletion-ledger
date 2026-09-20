// QA: /research/lapse-persistence — chart, labels, console, and review fixes.
import { createRequire } from "module";
const require = createRequire("/home/mcone/bertha/Jarvis/package.json");
const { chromium } = require("playwright-core");

const URL = "https://oil-report-staging.me-fce.workers.dev/research/lapse-persistence?v=" + Date.now();
const CHROME = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });

async function runPage(page, width) {
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__charts && window.__charts.lapseStressChart, { timeout: 15000 });
  await page.waitForTimeout(1200);
  console.log(`\n[viewport ${width}px]`);
  console.log(`  console errors: ${errors.length} ${errors.length ? errors.join(" | ") : ""}`);

  const dsCount = await page.evaluate(() => {
    const c = window.__charts && window.__charts.lapseStressChart;
    return c ? c.data.datasets.length : 0;
  });
  const hasNaN = await page.evaluate(() => {
    const c = window.__charts.lapseStressChart;
    if (!c) return false;
    return c.data.datasets.some(d => d.data.some(v => typeof v === "number" && !Number.isFinite(v)));
  });
  console.log(`  datasets: ${dsCount} (expect 8)`);
  console.log(`  NaN values: ${hasNaN ? "FAIL" : "PASS"}`);

  // --- review-fix checks (innerText: page.content() mangles non-ASCII on re-serialization) ---
  // innerText reflects visual line wraps — normalize whitespace before substring checks
  const bodyText = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
  const rawHtml = await page.evaluate(() => document.documentElement.outerHTML);
  console.log(`  no literal template in HTML: ${rawHtml.includes("{fmt") ? "FAIL" : "PASS"}`);
  const aria = await page.evaluate(() => window.__lapseChartAria || "");
  console.log(`  aria-label set with numbers: ${aria.length > 200 && aria.includes("2,051") && aria.includes("3,495") ? "PASS" : "FAIL"} (${aria.length} chars)`);
  const noindex = await page.$('meta[name="robots"][content="noindex, nofollow"]');
  console.log(`  noindex meta: ${noindex ? "PASS" : "FAIL"}`);
  const hasCharset = await page.$('meta[charset="utf-8"]');
  const title = await page.title();
  console.log(`  charset + title: ${hasCharset && title.includes("Stress Test") ? "PASS" : "FAIL"} (${title.slice(0, 40)})`);
  console.log(`  no mojibake in body: ${/[ÂÃâ][·ˆ’“”]/.test(bodyText) ? "FAIL" : "PASS"}`);
  console.log(`  EIA relabel applied: ${bodyText.includes("EIA STEO monthly balance (from the Feb 2027 scenario cumulative)") ? "PASS" : "FAIL"}`);
  const stripped = bodyText.replace("not a no-war counterfactual", "");
  console.log(`  no stale 'no-war' framing: ${/no-war path|no-war baseline|no-war counterfactual, frozen/.test(stripped) ? "FAIL" : "PASS"}`);
  console.log(`  demand-crossing copy: ${bodyText.includes("crosses; it does not rank") ? "PASS" : "FAIL"}`);
  console.log(`  C1 larger deficits Mar-May: ${bodyText.includes("C1 produces the larger deficits in March–May") ? "PASS" : "FAIL"}`);
  console.log(`  no 'observed change' stem claim: ${bodyText.includes("cumulative observed change") ? "FAIL" : "PASS"}`);
  console.log(`  issued-projection stem wording: ${bodyText.includes("issued corridor-lapses projection, starting from the IEA") ? "PASS" : "FAIL"}`);
  console.log(`  P2 formula stated: ${bodyText.includes("reference production = EIA baseline production + assumed baseline shut-in") ? "PASS" : "FAIL"}`);
  console.log(`  simplification labeled: ${bodyText.includes("simplification, not source-derived") ? "PASS" : "FAIL"}`);
  console.log(`  sensitivity direction (below): ${bodyText.includes("mb below the primary (a larger accumulated deficit)") ? "PASS" : "FAIL"}`);
  console.log(`  P3 'largest accumulated deficit': ${bodyText.includes("largest accumulated deficit of the three production variants") ? "PASS" : "FAIL"}`);
  console.log(`  China wording: ${bodyText.includes("No separate China adjustment is included; China remains part of the EIA world totals") ? "PASS" : "FAIL"}`);
  console.log(`  headline neutral: ${bodyText.includes("These flow assumptions imply an accumulated balance of") ? "PASS" : "FAIL"}`);
  console.log(`  em-dash not literal entity: ${bodyText.includes("&mdash;") ? "FAIL" : "PASS"}`);
  console.log(`  Apr-zero sensitivity rows: ${bodyText.includes("Sensitivity \u00b7 P2, baseline shut-in zeroed from Apr (C0)") && bodyText.includes("Sensitivity \u00b7 P2, baseline shut-in zeroed from Apr (C1)") ? "PASS" : "FAIL"}`);
  console.log(`  new P2 endpoint (3,495): ${bodyText.includes("3,495") ? "PASS" : "FAIL"}`);
  // the banner is text-transform:uppercase, so innerText is uppercased — compare case-insensitively
  console.log(`  banner issued-note: ${bodyText.toLowerCase().includes("primary variant issued sep 18 as the v2026-09-18 conditional scenario") ? "PASS" : "FAIL"}`);
  console.log(`  not-a-CI wording: ${bodyText.includes("not a confidence interval") ? "PASS" : "FAIL"}`);
  console.log(`  v17-records-unchanged wording: ${bodyText.includes("The v2026-09-17 forecast records are unchanged") || bodyText.includes("The v2026-09-17 records are unchanged by this page") ? "PASS" : "FAIL"}`);
  console.log(`  caption v2 note: ${bodyText.includes("the Sep 18 version (v2026-09-18, supply page) extends it") ? "PASS" : "FAIL"}`);

  // --- label geometry (Chart.js 4: measure through the active transform) ---
  await page.evaluate(() => {
    const c = window.__charts.lapseStressChart;
    const endpointLabels = [
      { text: "EIA STEO balance \u2212394", align: "right" },
      { text: "fixed adjustment \u22122,995", align: "right" },
      { text: "fixed total disruption \u22123,495", align: "right" },
      { text: "fixed production \u22124,288", align: "right" },
    ];
    const branchLabel = { text: "issued path ends \u00b7 Feb 2027", align: "left" };
    const origFill = c.ctx.fillText.bind(c.ctx);
    window.__labelBoxes = [];
    c.ctx.fillText = (text, x, y) => {
      const t = String(text);
      if (endpointLabels.some(l => t.startsWith(l.text.slice(0, 8))) || t.startsWith(branchLabel.text.slice(0, 12))) {
        const m = c.ctx.getTransform();
        // manual affine map of the local text rect corners (no DOMMatrix)
        const align = endpointLabels.find(l => t.startsWith(l.text.slice(0, 8)))?.align || "left";
        const w = c.ctx.measureText(t).width;
        const h = 13;
        const x0 = align === "right" ? x - w : x;
        const pts = [[x0, y - h / 2 - 1], [x0 + w, y - h / 2 - 1], [x0, y + h / 2 + 1], [x0 + w, y + h / 2 + 1]];
        const mapped = pts.map(([px, py]) => ({
          x: m.a * px + m.c * py + m.e,
          y: m.b * px + m.d * py + m.f,
        }));
        const xs = mapped.map(p => p.x), ys = mapped.map(p => p.y);
        window.__labelBoxes.push({ text: t, x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) });
      }
      return origFill(text, x, y);
    };
    c.draw();
  });
  const boxes = await page.evaluate(() => window.__labelBoxes || []);
  const { chartArea } = await page.evaluate(() => {
    const c = window.__charts.lapseStressChart;
    return { chartArea: c.chartArea };
  });
  const canvasRect = await page.$eval("#lapseStressChart", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  // label boxes are in canvas-LOCAL css px (getTransform space)
  const inCanvas = (b) =>
    b.x >= -1 && b.y >= -1 &&
    b.x + b.w <= canvasRect.w + 1 && b.y + b.h <= canvasRect.h + 1;
  for (const b of boxes) {
    const ok = inCanvas(b);
    console.log(`  label "${b.text.slice(0, 28)}": ${ok ? "IN CANVAS" : "OUT"} (x=${b.x.toFixed(0)},y=${b.y.toFixed(0)},w=${b.w.toFixed(0)},h=${b.h.toFixed(0)})`);
  }
  let overlaps = 0;
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) {
      overlaps++;
      console.log(`  OVERLAP: "${a.text.slice(0, 20)}" x "${b.text.slice(0, 20)}"`);
    }
  }
  console.log(`  label overlaps: ${overlaps}`);
  await page.evaluate(() => { delete window.__labelBoxes; });
}

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await runPage(page, width);
  await page.screenshot({ path: `/tmp/pwl/resp-${width}.png` });
  await page.close();
}

// Sitemap exclusion
const sitemap = await fetch("https://oil-report-staging.me-fce.workers.dev/sitemap-0.xml").then(r => r.text()).catch(() => "");
console.log(`\n[sitemap] research page excluded: ${sitemap && !sitemap.includes("lapse-persistence") ? "PASS" : (sitemap ? "FAIL" : "CHECK MANUALLY")}`);

// Regression: public page still healthy
const pub = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const pubErrors = [];
pub.on("console", (m) => { if (m.type() === "error") pubErrors.push(m.text()); });
await pub.goto("https://oil-report-staging.me-fce.workers.dev/?v=" + Date.now(), { waitUntil: "networkidle" });
await pub.waitForFunction(() => window.__charts && window.__charts.globalObservedChart, { timeout: 15000 });
await pub.waitForTimeout(1000);
const pubCount = await pub.evaluate(() => Object.keys(window.__charts).length);
console.log(`\n[public page regression]`);
console.log(`  console errors: ${pubErrors.length} ${pubErrors.length ? pubErrors.join(" | ") : ""}`);
console.log(`  charts: ${pubCount} (expect 11)`);

// Panel B is the rebased scenario chart (2026-09-18 redesign) — full detailed checks
// (rebase vs the data file, checkbox round-trip, tooltip, label geometry) live in
// qa-panel-b.mjs (point it here with QA_BASE). This section keeps the headline invariants.
const pubText = (await pub.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
const pubHtml = await pub.evaluate(() => document.documentElement.outerHTML);
console.log(`  heading: ${pubText.includes("How oil inventories could change") ? "PASS" : "FAIL"}`);
console.log(`  zero meaning copy: ${pubText.includes("Zero means unchanged since then, not empty storage") ? "PASS" : "FAIL"}`);
// The not-a-CI wording moved off the public page with the caption rewrite (2026-09-18
// finishing fixes) — it is checked on the research page above; the public caption now
// carries the inventory-pool distinction instead.
console.log(`  caption pool distinction: ${pubText.includes("cover different inventory pools") ? "PASS" : "FAIL"}`);
const resLink = await pub.$('a[href="/research/lapse-persistence"]');
console.log(`  research-page link present: ${resLink ? "PASS" : "FAIL"}`);
console.log(`  no hardcoded v2026-09-17 tooltip: ${pubHtml.includes("(model scenario, v2026-09-17") ? "FAIL" : "PASS"}`);
const pbInfo = await pub.evaluate(() => {
  const c = window.__charts.globalObservedChart;
  const ds = c.data.datasets;
  return {
    n: ds.length,
    vis: ds.map((_, i) => c.isDatasetVisible(i)).join(","),
    ymin: c.options.scales.y.min,
    ymax: c.options.scales.y.max,
    lapseNn: ds[3].data.filter((v) => v !== null).length,
    lapseStart: ds[3].data[0],
    axis0: c.data.labels[0],
    axisN: c.data.labels.length,
  };
});
const pbVisOk = pbInfo.n === 6 && pbInfo.vis === "true,true,true,true,false,false";
console.log(`  panel B datasets/visibility: ${pbInfo.n} / ${pbInfo.vis}: ${pbVisOk ? "PASS" : "FAIL (expect 6 / true,true,true,true,false,false)"}`);
const pbAxisOk = pbInfo.ymin === -3600 && pbInfo.ymax === 2100 && pbInfo.axisN === 17 && pbInfo.axis0 === "2026-08";
console.log(`  panel B y range + axis: ${pbInfo.ymin}..${pbInfo.ymax}, ${pbInfo.axisN} months from ${pbInfo.axis0}: ${pbAxisOk ? "PASS" : "FAIL (expect -3600..2100, 17 from 2026-08)"}`);
const pbLapseOk = pbInfo.lapseNn === 17 && pbInfo.lapseStart === 0;
console.log(`  panel B lapse line: ${pbInfo.lapseNn} points, rebased start ${pbInfo.lapseStart}: ${pbLapseOk ? "PASS" : "FAIL (expect 17, 0)"}`);
const cbs = await pub.evaluate(() =>
  ["toggleEia", "toggleTrend"].map((id) => { const el = document.getElementById(id); return el ? !el.checked : null; })
);
console.log(`  checkboxes present + initially off: ${JSON.stringify(cbs) === "[true,true]" ? "PASS" : "FAIL"}`);

await browser.close();
