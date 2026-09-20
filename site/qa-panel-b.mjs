// QA: redesigned Panel B (rebased scenario chart with opt-in overlays).
// Serves ./dist on http://127.0.0.1:4399 (start: python3 -m http.server 4399 -d dist).
// Run: node qa-panel-b.mjs
import { createRequire } from "node:module";
const require = createRequire("/home/mcone/bertha/Jarvis/package.json");
const { chromium } = require("playwright-core");
import { readFileSync } from "node:fs";

// QA_BASE override: default is the local dist server; set to the staging URL to verify a deploy.
const BASE = process.env.QA_BASE || "http://127.0.0.1:4399/";
const ws = JSON.parse(readFileSync(new URL("./src/data/world-stocks.json", import.meta.url), "utf8"));

// Expected rebased values from the records (the same transform the chart applies).
const ver = ws.forecast_records
  .filter((r) => r.record_id?.startsWith("scenario-"))
  .reduce((m, r) => {
    const d = r.record_id.match(/-(\d{4}-\d{2}-\d{2})-global-observed$/);
    return d && d[1] > m ? d[1] : m;
  }, "");
const rec = (id) => ws.forecast_records.find((r) => r.record_id === `scenario-${id}-${ver}-global-observed`);
const eiaRec = ws.forecast_records.find((r) => r.record_id === "steo-2026-09-global-observed");
const persRec = ws.forecast_records.find((r) => r.record_id === "persistence-2026-09-global-observed");
const all = [eiaRec, persRec, rec("corridor-holds"), rec("standoff"), rec("corridor-lapses")];
const anchor = all[0].anchor;
console.log(`[setup] shared anchor: ${anchor.period} ${anchor.value_mb}; records: ${all.length}`);
if (!all.every((r) => r.anchor.period === anchor.period && r.anchor.value_mb === anchor.value_mb)) {
  console.log("FAIL: records disagree on the anchor — aborting");
  process.exit(1);
}
const rebase = (v) => v - anchor.value_mb;
const axis = [...new Set(all.flatMap((r) => [r.anchor.period, ...r.targets.map((t) => t.period)]))].sort();
const expected = (r, m) => {
  const t = r.targets.find((t) => t.period === m);
  if (t) return rebase(t.target_cumulative_mb);
  if (m === r.anchor.period) return 0;
  return null;
};
const recs = { 1: rec("corridor-holds"), 2: rec("standoff"), 3: rec("corridor-lapses"), 4: eiaRec, 5: persRec };

const browser = await chromium.launch({
  executablePath: process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});

for (const width of [1440, 390]) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(BASE + "?v=" + Date.now(), { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__charts && window.__charts.globalObservedChart, { timeout: 15000 });
  await page.waitForTimeout(800);

  console.log(`\n[Panel B @ ${width}px]`);
  console.log(`  console errors: ${errors.length} ${errors.length ? errors.join(" | ") : ""}`);

  const info = await page.evaluate(() => {
    const c = window.__charts.globalObservedChart;
    return {
      n: c.data.datasets.length,
      vis: c.data.datasets.map((_, i) => c.isDatasetVisible(i)),
      labels: c.data.labels,
      ymin: c.options.scales.y.min,
      ymax: c.options.scales.y.max,
      ytitle: c.options.scales.y.title?.text ?? "",
      xticks: c.scales.x.ticks.map((t) => t.label),
      data: c.data.datasets.map((d) => d.data),
    };
  });
  console.log(`  datasets: ${info.n} (expect 6: zero line + 3 scenarios + 2 overlays)`);
  console.log(`  default visibility [zero,holds,standoff,lapses,EIA,trend]: ${info.vis.join(",")} (expect true,true,true,true,false,false)`);
  const axisOk = info.labels.length === axis.length && info.labels[0] === axis[0] && info.labels[info.labels.length - 1] === axis[axis.length - 1];
  console.log(`  axis: ${info.labels.length} months ${info.labels[0]} → ${info.labels[info.labels.length - 1]}: ${axisOk ? "PASS" : "FAIL"}`);
  console.log(`  y range: ${info.ymin}..${info.ymax} (expect -3600..2100)`);
  console.log(`  y title (short): ${JSON.stringify(info.ytitle)}: ${info.ytitle === "Change in inventories, million barrels" ? "PASS" : "FAIL"}`);
  const tickOk = info.xticks.includes("Aug ’26") && info.xticks.includes("Dec ’27");
  console.log(`  axis ticks anchor + horizon (Aug ’26 / Dec ’27): ${tickOk ? "PASS" : "FAIL"}`);

  // Zero starting points + full rebase verification against the data file.
  let rebaseBad = 0, zeroBad = 0;
  for (const ds of [1, 2, 3, 4, 5]) {
    if (info.data[ds][0] !== 0) zeroBad++;
    for (let i = 0; i < axis.length; i++) {
      const exp = expected(recs[ds], axis[i]);
      const got = info.data[ds][i];
      if (exp === null ? got !== null : Math.abs(got - exp) > 1e-9) rebaseBad++;
    }
  }
  console.log(`  anchor zero start (all 5 lines at ${anchor.period}): ${zeroBad === 0 ? "PASS" : "FAIL (" + zeroBad + ")"}; rebase = stored − anchor for all ${axis.length * 5} points: ${rebaseBad === 0 ? "PASS" : "FAIL (" + rebaseBad + " mismatches)"}`);

  // Copy + accessibility.
  const bodyText = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
  console.log(`  heading: ${bodyText.includes("How oil inventories could change") ? "PASS" : "FAIL"}`);
  console.log(`  suggested copy: ${bodyText.includes("These paths show the change in inventories under three supply and demand scenarios") ? "PASS" : "FAIL"}`);
  console.log(`  zero meaning: ${bodyText.includes("Zero means unchanged since then, not empty storage") ? "PASS" : "FAIL"}`);
  console.log(`  trend explanation: ${bodyText.includes("Recent trend repeats the June–August 2026 average monthly change") ? "PASS" : "FAIL"}`);
  const aria = await page.$eval("#globalObservedChart", (el) => el.getAttribute("aria-label"));
  console.log(`  aria rebased endpoints: ${aria.includes("+1,736") && aria.includes("−363") && aria.includes("−2,988") ? "PASS" : "FAIL"}`);
  console.log(`  aria zero meaning: ${aria.includes("zero means inventories unchanged since that month, not empty storage") ? "PASS" : "FAIL"}`);
  console.log(`  aria overlays: ${aria.includes("optional overlays, off by default") ? "PASS" : "FAIL"}`);
  const cbs = await page.evaluate(() => {
    const out = [];
    for (const id of ["toggleEia", "toggleTrend"]) {
      const el = document.getElementById(id);
      const label = el?.closest("label")?.textContent.trim() ?? "";
      out.push({ id, exists: !!el, checked: el?.checked, label });
    }
    return out;
  });
  console.log(`  checkboxes: ${cbs.map((c) => `${c.id}=${c.exists ? (c.checked ? "checked" : "unchecked") : "MISSING"} label="${c.label}"`).join("; ")}`);
  const cbOk = cbs.every((c) => c.exists && !c.checked && c.label.length > 3);
  console.log(`  checkboxes accessible (label-associated, initially off): ${cbOk ? "PASS" : "FAIL"}`);

  // Endpoint label geometry: 3 scenario labels by default; 6 with overlays on.
  const captureLabels = async () => {
    await page.evaluate(() => {
      const c = window.__charts.globalObservedChart;
      // Capture/restore the native fillText each time — re-patching a patched function
      // would double-count every label.
      if (!c.__nativeFill) c.__nativeFill = c.ctx.fillText;
      c.ctx.fillText = c.__nativeFill;
      const orig = c.__nativeFill.bind(c.ctx);
      window.__pbBoxes = [];
      c.ctx.fillText = (text, x, y) => {
        const t = String(text);
        if (/^(0 —|\+\d|−\d)/.test(t) && t.includes("—")) {
          const m = c.ctx.getTransform();
          const wdt = c.ctx.measureText(t).width;
          const h = 13;
          const align = c.ctx.textAlign || "start";
          const x0 = align === "right" || align === "end" ? x - wdt : align === "center" ? x - wdt / 2 : x;
          const pts = [[x0, y - h / 2 - 1], [x0 + wdt, y - h / 2 - 1], [x0, y + h / 2 + 1], [x0 + wdt, y + h / 2 + 1]];
          const mapped = pts.map(([px, py]) => ({ x: m.a * px + m.c * py + m.e, y: m.b * px + m.d * py + m.f }));
          const xs = mapped.map((p) => p.x), ys = mapped.map((p) => p.y);
          window.__pbBoxes.push({ text: t, x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) });
        }
        return orig(text, x, y);
      };
      c.draw();
      c.ctx.fillText = c.__nativeFill; // restore: later draws (tooltips) stay native
    });
    return page.evaluate(() => window.__pbBoxes || []);
  };
  const canvasBox = await page.$eval("#globalObservedChart", (el) => { const r = el.getBoundingClientRect(); return { w: r.width, h: r.height }; });
  const checkBoxes = (boxes, tag, expectN) => {
    let bad = 0, overlaps = 0;
    for (const b of boxes) {
      const ok = b.x >= -1 && b.y >= -1 && b.x + b.w <= canvasBox.w + 1 && b.y + b.h <= canvasBox.h + 1;
      if (!ok) { bad++; console.log(`    [${tag}] OUT: "${b.text.slice(0, 30)}" (x=${b.x.toFixed(0)},y=${b.y.toFixed(0)})`); }
    }
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) {
        overlaps++;
        console.log(`    [${tag}] OVERLAP: "${a.text.slice(0, 22)}" x "${b.text.slice(0, 22)}"`);
      }
    }
    console.log(`  [${tag}] endpoint labels: ${boxes.length} (expect ${expectN}), in-canvas ${boxes.length - bad}, overlaps ${overlaps}`);
  };
  let boxes = await captureLabels();
  checkBoxes(boxes, "default", 4); // 3 scenario endpoints + the zero-line ref label
  const zeroRefOk = boxes.some((b) => b.text.includes("no change since August 2026"));
  console.log(`  zero ref label carries the August 2026 wording: ${zeroRefOk ? "PASS" : "FAIL"}`);
  // Lapse endpoint label must sit BELOW its endpoint (above, it crossed the descending
  // approach segment) — checked against the plotted point, not just other labels.
  const lapseGeom = await page.evaluate(() => {
    const c = window.__charts.globalObservedChart;
    const el = c.getDatasetMeta(3).data[c.data.labels.length - 1];
    return { py: el.y };
  });
  const lapseLabel = boxes.find((b) => b.text.includes("corridor lapses"));
  console.log(`  lapse label below endpoint: ${lapseLabel && lapseLabel.y > lapseGeom.py + 2 ? "PASS" : "FAIL"}`);

  // Toggle both overlays on (via the real checkboxes) and re-check.
  await page.click("label:has(#toggleEia)");
  await page.click("label:has(#toggleTrend)");
  await page.waitForTimeout(400);
  const visOn = await page.evaluate(() => { const c = window.__charts.globalObservedChart; return [c.isDatasetVisible(4), c.isDatasetVisible(5)]; });
  console.log(`  overlays on after checkbox click: ${visOn.join(",") === "true,true" ? "PASS" : "FAIL (" + visOn.join(",") + ")"}`);
  boxes = await captureLabels();
  checkBoxes(boxes, "overlays-on", 7); // + EIA Dec 2026, EIA end, recent trend
  if (width === 1440) {
    const el = await page.$("#globalObservedChart");
    await el.screenshot({ path: "/tmp/pw5/panelB-1440-overlays.png" });
  } else {
    const el = await page.$("#globalObservedChart");
    await el.screenshot({ path: "/tmp/pw5/panelB-390-overlays.png" });
  }

  // Tooltip at Jun 2027 with overlays on: expect rebased values + "since August 2026".
  const tip = await page.evaluate(() => {
    const c = window.__charts.globalObservedChart;
    const idx = c.data.labels.indexOf("2027-06");
    const x = c.scales.x.getPixelForValue(idx);
    const y = (c.chartArea.top + c.chartArea.bottom) / 2;
    const r = c.canvas.getBoundingClientRect();
    return { x: r.left + x, y: r.top + y, idx };
  });
  await page.mouse.move(tip.x, tip.y);
  await page.waitForTimeout(500);
  const tipText = await page.evaluate(() => {
    const c = window.__charts.globalObservedChart;
    return c.tooltip ? c.tooltip.body.map((b) => b.lines.join(" ")).join(" | ") + " :: " + c.tooltip.title.join(" ") : "NO TOOLTIP";
  });
  console.log(`  tooltip @ Jun 2027: ${tipText.slice(0, 220)}`);
  const tipOk = tipText.includes("since August 2026") && tipText.includes("Recent trend") && tipText.includes("EIA STEO balance-implied");
  console.log(`  tooltip wording (rebased, since August 2026, overlays listed): ${tipOk ? "PASS" : "FAIL"}`);

  // Toggle back off — state returns to default.
  await page.click("label:has(#toggleEia)");
  await page.click("label:has(#toggleTrend)");
  await page.waitForTimeout(400);
  const visOff = await page.evaluate(() => { const c = window.__charts.globalObservedChart; return [c.isDatasetVisible(4), c.isDatasetVisible(5)]; });
  console.log(`  overlays off again: ${visOff.join(",") === "false,false" ? "PASS" : "FAIL"}`);
  console.log(`  console errors after toggling: ${errors.length} ${errors.length ? errors.join(" | ") : ""}`);
  if (width === 1440) {
    const el = await page.$("#globalObservedChart");
    await el.screenshot({ path: "/tmp/pw5/panelB-1440.png" });
  } else {
    const el = await page.$("#globalObservedChart");
    await el.screenshot({ path: "/tmp/pw5/panelB-390.png" });
  }
  await page.close();
}
await browser.close();
console.log("\nDone.");
