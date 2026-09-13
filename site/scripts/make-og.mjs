#!/usr/bin/env node
// Render the /og/supply share-card page to og-supply.png with headless Chrome.
//
// Run AFTER `npm run build` (deploy does this automatically):
//   node scripts/make-og.mjs
//
// Writes:
//   dist/og-supply.png    — for THIS deploy
//   public/og-supply.png  — picked up by future builds (so a bare build keeps working)
//
// The card is 1200x630 CSS pixels; rendered at 2x device scale (2400x1260) so it
// stays sharp in high-DPI social previews.
//
// NOTE: Chrome must be spawned ASYNC (execFile, not execFileSync) — the screenshot
// is taken from a page served by THIS process, and a sync spawn blocks the event
// loop into a deadlock (server can't answer its own client).

import { execFile } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const here = fileURLToPath(new URL(".", import.meta.url));
const dist = join(here, "../dist");
const pngDist = join(dist, "og-supply.png");
const pngPublic = join(here, "../public/og-supply.png");

if (!existsSync(join(dist, "index.html"))) {
  console.error("dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

const chrome =
  process.env.CHROME_BIN ||
  join(
    homedir(),
    ".cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell"
  );
if (!existsSync(chrome)) {
  console.error(`headless Chrome not found at ${chrome}`);
  console.error("set CHROME_BIN to a chrome-headless-shell binary and retry.");
  process.exit(1);
}

// --- tiny static server for dist/ (no deps) ---
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
};
const server = http.createServer((req, res) => {
  try {
    let p = join(dist, decodeURIComponent(req.url || "/").replace(/^\/+/, ""));
    if (statSync(p).isDirectory()) p = join(p, "index.html");
    if (!p.startsWith(dist) || !existsSync(p)) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, {
      "content-type": TYPES[p.slice(p.lastIndexOf("."))] || "application/octet-stream",
    });
    res.end(readFileSync(p));
  } catch {
    res.writeHead(500).end("server error");
  }
});

const run = (cmd, args) =>
  new Promise((resolve, reject) =>
    execFile(cmd, args, { stdio: "ignore" }, (err) => (err ? reject(err) : resolve()))
  );

const PORT = 8931;
server.listen(PORT, "127.0.0.1", async () => {
  const url = `http://127.0.0.1:${PORT}/og/supply`;
  try {
    await run(chrome, [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      "--window-size=1200,630",
      "--virtual-time-budget=8000", // let fonts + Chart.js settle
      `--screenshot=${pngDist}`,
      url,
    ]);
  } finally {
    server.close();
    server.closeAllConnections?.(); // don't wait out keep-alive sockets
  }

  if (!existsSync(pngDist)) {
    console.error("screenshot failed — no PNG produced.");
    process.exit(1);
  }
  const bytes = readFileSync(pngDist).length;
  if (bytes < 20_000) {
    console.error(`suspiciously small PNG (${bytes} bytes) — render likely broken.`);
    process.exit(1);
  }
  writeFileSync(pngPublic, readFileSync(pngDist));
  console.log(`og-supply.png: ${bytes} bytes → dist/ (this deploy) + public/ (future builds)`);
});
