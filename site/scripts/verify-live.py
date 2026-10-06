#!/usr/bin/env python3
"""verify-live.py — chart geometry + completeness + console-error check.

Usage:
    python3 scripts/verify-live.py [staging|prod|local|selftest]

    staging  → https://oil-report-staging.me-fce.workers.dev/
    prod     → https://www.depletion.org/
    local    → serves the freshly built dist/ on a local port (no deploy needed —
               verify the exact bytes that a deploy would ship). `deploy.sh` runs
               this mode after every build and refuses to deploy on failure.
    selftest → runs the checker against seven local FIXTURE pages (stub charts, no
               real site) plus five verdict unit checks, and asserts each behaves as
               expected: the full registry passes (foodChart with real floating-bar
               data); a missing chart, an empty linear chart, an EMPTY CATEGORY
               chart, an unexpected extra chart, a clipped chart, and a missing
               endpoint dot each FAIL; the verdict requires all EndDot results (six)
               and rejects missing/duplicate/unexpected tokens of either kind. Run it
               after editing this file or EXPECTED. (The Oct 5 external review
               reproduced a false PASS with 16 of 21 charts absent and one chart
               empty — before the expected-registry below existed; the recheck
               reproduced a false PASS with every category chart emptied and
               accepted a probe line with no endpoint results.)

Checks, per chart in EXPECTED (all 21 register on window.__charts):
    OK       margin between the last plotted point and the plot's right edge >= 4px
    CLIP     margin < 4px — the 3.5px endpoint dot is half-clipped at the edge
             (widen that chart's x-scale in index.astro) — FAIL
    CAT      category-scale chart (last category at the right edge is by design —
             SPR, recession, OECD-stocks, global-observed) — PASS
    NODATA   the chart built but no dataset has a plotted point — FAIL, unless the
             id is in EXPECTED_NODATA (currently empty: foodChart's old "exemption"
             was a probe format gap, not an empty chart — the probe now reads its
             floating-bar [start, end] data, so a truly empty foodChart fails)
    MISSING  an EXPECTED id is not on window.__charts — FAIL (a chart that failed
             to register or was deleted used to vanish silently: the old check
             only iterated whatever registered)
    NOTBUILT chart id registered a null — FAIL
    EndDot   the endpoint dot of the six daily-updated lines (diesel/gas/brent/
             crack) is present (the margin check alone can't catch a missing dot)
    UNEXPECTED a registered id not in EXPECTED — FAIL (a renamed id is a bug)

Exit code 0 = PASS (every expected id OK/CAT, NODATA only where whitelisted, all
four EndDots yes, no console errors). 1 = any FAIL above or a real console error
(the Hawk "Ignoring Event: localhost" line is filtered — it is not a site error).

Gotchas encoded (all hit the hard way, Sep 28 — the old check passed "clean" while
validating nothing):
  * the main bundle is type="module" and lazy-imports ./auto.*.js +
    ./world-stocks-assumptions.*.js by RELATIVE path — those must be mirrored too,
    or the module graph 404s locally, no chart builds, and the check passes
    while checking nothing;
  * --dump-dom serializes at load time, so plain timers never fire — use
    --virtual-time-budget=15000 (fast-forwards module execution + the probe);
  * the probe's output marker is computed at runtime (["X","Q","Z"].join("")) so the
    grep can't match the probe's own source text sitting in the DOM;
  * Cloudflare 403s urllib's default UA — every request sends a browser UA;
  * the chrome run must happen against the MIRROR (which carries the injected
    probe), never against dist/ or the live URL directly — running it at the
    un-probed page makes the probe output vanish and the check fail with "probe
    output not found" while the site is perfectly fine (Oct 5, hit while porting).
"""
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request

SITES = {
    "staging": "https://oil-report-staging.me-fce.workers.dev/",
    "prod": "https://www.depletion.org/",
}
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64)"}
CHROME = os.path.expanduser(
    "~/.cache/ms-playwright/chromium_headless_shell-1243/"
    "chrome-headless-shell-linux64/chrome-headless-shell"
)

# Every chart id that MUST register on window.__charts. Keep in sync with the
# registration loop in index.astro (16 ids) + oecdStocksChart + globalObservedChart.
# The verdict fails on any missing or unexpected id, so a stale list is loud, not
# silent — but update it when a chart is added or removed.
EXPECTED = [
    "shipping-hormuz", "shipping-suez", "shipping-bab",
    "brentChart", "gasChart", "dieselChart", "crackChart",
    "gasTtfChart", "gasJkmChart", "treasury10yChart", "cpiChart",
    "flipChart", "sprChart", "refineryChart", "russiaChart", "demandChart",
    "recessionChart", "foodChart", "commercialCrudeChart",
    "oecdStocksChart", "globalObservedChart", "ukmtoChart",
]
# Ids that may legitimately report NODATA today (registered, no data to plot).
# Empty as of the Oct 5 recheck: foodChart's "exemption" was based on a wrong
# description — the gantt DOES have data (floating-bar [start, end] pairs), the old
# probe just couldn't read that format. The probe now does, and a genuinely empty
# foodChart fails like any other chart. The mechanism stays for a real future case.
EXPECTED_NODATA = []
# The four daily-updated lines whose endpoint dot is checked.
# gasTtfChart/gasJkmChart added Oct 6 — the Oct 2 log claimed these two were already
# end-dot-checked; they were not, and the TTF keep-set (hardcoded Sep 25 endpoint)
# left the Oct 2 point dotless on staging.
END_DOT = ["dieselChart", "gasChart", "brentChart", "crackChart", "gasTtfChart", "gasJkmChart"]
# Category-scale ids (informational — the probe reports CAT from the scale type).
CATEGORY = ["sprChart", "recessionChart", "oecdStocksChart", "globalObservedChart", "ukmtoChart"]


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()


def free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def local_server(root: str, port: int):
    return subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--directory", root],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def mirror(base: str, tmpdir: str) -> int:
    """Download the page + every asset (including the main bundle's RELATIVE lazy
    imports — required, see module docstring). Returns the asset count."""
    html = get(base).decode()
    with open(os.path.join(tmpdir, "index.html"), "w") as f:
        f.write(html)
    assets = set(re.findall(r'(?:src|href)="(/_astro/[^"]+)"', html))
    mainjs = [a for a in assets
              if a.endswith(".js") and "index.astro_astro_type_script" in a][0]
    js = get(base + mainjs.lstrip("/")).decode()
    assets |= {"/_astro/" + m for m in re.findall(r'from"(\./[^"]+)"', js)}
    for m in sorted(assets):
        p = os.path.join(tmpdir, m.lstrip("/"))
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "wb") as f:
            f.write(get(base + m.lstrip("/")))
    return len(assets)


def probe_script() -> str:
    """The probe + the expected registry it checks against (both injected into HTML
    we control — never at the live URL directly)."""
    expected = ",".join(json_dq(i) for i in EXPECTED)
    return f"""<script>
window.__expected = [{expected}];
</script>
<script>
window.addEventListener("DOMContentLoaded", () => setTimeout(() => {{
  const MARK = ["X","Q","Z"].join("");   // runtime-computed: grep can't match this in source
  const res = [];
  const charts = window.__charts || {{}};
  // a plotted point: a finite number, a floating bar [start, end] (the food-lag
  // gantt — Oct 5 recheck: the probe used to read that format as "no data"), or an
  // {{x}} object with a finite x
  const hasPt = (p) =>
    (typeof p === "number" && isFinite(p)) ||
    (Array.isArray(p) && p.length >= 2 && isFinite(p[0]) && isFinite(p[1])) ||
    (p && typeof p === "object" && isFinite(p.x));
  for (const [id, c] of Object.entries(charts)) {{
    if (!c) {{ res.push(id + "=NOTBUILT"); continue; }}
    const xs = c.scales.x, ca = c.chartArea;
    if (xs.type === "category") {{
      // exempt from the EDGE-MARGIN check (last category sits at the right edge by
      // design), NOT from data presence (Oct 5 recheck: emptied category datasets
      // still passed as CAT)
      res.push(c.data.datasets.some((ds) => ds.data && ds.data.some(hasPt)) ? id + "=CAT" : id + "=NODATA");
      continue;
    }}
    // Only datasets that draw dots — reference lines (pointRadius 0) span the full axis width by design.
    const hasDot = (ds) => {{
      const pr = ds.pointRadius;
      if (pr === 0) return false;
      if (typeof pr === "number") return pr > 0;
      if (Array.isArray(pr)) return pr.some((v) => v > 0);
      if (typeof pr === "function") return ds.data.some((_, i) => (pr({{ dataIndex: i }}) || 0) > 0);
      return true;  // undefined → Chart.js default radius 3
    }};
    let mx = -Infinity;
    for (const ds of c.data.datasets) {{
      if (!hasDot(ds)) continue;
      for (const p of ds.data) {{
        // {{x}} objects carry their own x; floating bars [start, end] plot to their
        // right end; bare numbers on a linear-x dataset are y-values — not x, skip
        const v = Array.isArray(p) && p.length >= 2 ? p[1]
          : (p && typeof p === "object") ? p.x : null;
        if (typeof v === "number" && isFinite(v) && v > mx) mx = v;
      }}
    }}
    if (typeof mx !== "number" || !isFinite(mx)) {{ res.push(id + "=NODATA"); continue; }}
    const m = ca.right - xs.getPixelForValue(mx);
    res.push(id + "=" + (m >= 4 ? "OK" : "CLIP") + " r=" + m.toFixed(1) + "px");
  }}
  // Expected-but-absent ids (Oct 5 review: the old check iterated only whatever
  // registered, so 16 deleted charts still passed).
  for (const id of (window.__expected || [])) {{
    if (!(id in charts)) res.push(id + "=MISSING");
  }}
  // EndDot check (added Oct 4 — the diesel endpoint dot lagged the endpoint label
  // three times: Sep 28, Oct 2-era, Oct 4). Margin check can't catch a missing
  // endpoint dot; this does.
  const endDot = (id) => {{
    const c = charts[id];
    if (!c) return id + "EndDot=nobuilt";
    const ds = c.data.datasets[0];
    const pr = ds.pointRadius, i = ds.data.length - 1;
    let r = 0;
    if (typeof pr === "number") r = pr;
    else if (Array.isArray(pr)) r = pr[i] || 0;
    else if (typeof pr === "function") r = pr({{ dataIndex: i }}) || 0;
    else r = 3;
    return id + "EndDot=" + (r > 0 ? "yes" : "NO");
  }};
  {chr(10).join('  res.push(endDot(' + json_dq(i) + '));' for i in END_DOT)}
  const el = document.createElement("pre");
  el.textContent = MARK + " " + res.join(" | ");
  document.body.appendChild(el);
}}, 4000));
</script>"""


def json_dq(s: str) -> str:
    return '"' + s.replace('"', '\\"') + '"'


def verdict(line: str):
    """Parse the probe line. Returns (ok, problems).

    Chart-status tokens and endpoint (EndDot) tokens are tracked SEPARATELY (Oct 5
    recheck: a line with every expected chart OK but NO EndDot tokens returned
    PASS — the four endpoint results are required, one each, no duplicates)."""
    bad = []
    seen = set()
    missing_reported = set()
    enddot = {}
    for token in line.split(" | "):
        if token.startswith("XQZ "):
            token = token[len("XQZ "):]
        m = re.match(r"^([A-Za-z0-9-]+)EndDot=(yes|NO|nobuilt)$", token)
        if m:
            cid, status = m.group(1), m.group(2)
            if cid in enddot:
                bad.append(f"{cid}EndDot (duplicate endpoint token)")
            enddot[cid] = status
            if cid not in END_DOT:
                bad.append(f"UNEXPECTED:{cid}EndDot (not in END_DOT)")
            if status != "yes":
                bad.append(f"{cid}EndDot={status}")
            continue
        m = re.match(r"^([A-Za-z0-9-]+)=(OK|CAT|CLIP|NODATA|MISSING|NOTBUILT)( .*)?$", token)
        if not m:
            bad.append("UNPARSED:" + token)
            continue
        cid, status = m.group(1), m.group(2)
        if cid not in EXPECTED:
            bad.append(f"UNEXPECTED:{cid}={status} (not in EXPECTED — rename or new chart?)")
        if cid in seen or cid in missing_reported:  # seen/missing_reported are disjoint — any hit is a duplicate
            bad.append(f"{cid}={status} (duplicate chart token)")
        if status == "MISSING":
            missing_reported.add(cid)
            bad.append(f"{cid}=MISSING (expected on window.__charts)")
        elif status in ("CLIP", "NOTBUILT"):
            seen.add(cid)  # it IS registered — the failure is the status, not absence
            bad.append(token)
        elif status == "NODATA":
            seen.add(cid)  # it IS registered — the failure is the emptiness, not absence
            if cid not in EXPECTED_NODATA:
                bad.append(f"{cid}=NODATA (no plotted data — not whitelisted)")
        else:
            seen.add(cid)
    for cid in EXPECTED:
        if cid not in seen and cid not in missing_reported:
            bad.append(f"{cid}=MISSING (expected on window.__charts)")
    for cid in END_DOT:
        if cid not in enddot:
            bad.append(f"{cid}EndDot=MISSING (no endpoint result — the probe line is incomplete)")
    return (not bad), bad


def run_chrome(tmpdir: str, console: str) -> str:
    """Serve tmpdir and dump the probed DOM. Returns the probe line or ''."""
    port = free_port()
    server = local_server(tmpdir, port)
    try:
        time.sleep(1.2)  # http.server binds inside the child — give it a moment
        with open(console, "w") as cerr:
            r = subprocess.run(
                [CHROME, "--headless", "--no-sandbox", "--window-size=1280,4000",
                 "--virtual-time-budget=15000", "--timeout=90000",
                 "--dump-dom", f"http://127.0.0.1:{port}/"],
                stdout=subprocess.PIPE, stderr=cerr, timeout=150)
        dom = r.stdout.decode(errors="replace")
    finally:
        server.terminate()
    m = re.search(r"XQZ ([^<]*)", dom)
    return m.group(1) if m else ""


def console_errors(console: str):
    return [l for l in open(console, errors="replace")
            if re.search(r"CONSOLE.*[Ee]rror|Uncaught", l)
            and not re.search(r"hawk\.forklabs|Ignoring Event", l)]


def check_label(root: str, label: str) -> int:
    """Inject the probe into root/index.html and run the full verdict."""
    html_path = os.path.join(root, "index.html")
    html = open(html_path).read()
    assert "</body>" in html, "page has no </body> — layout changed?"
    open(html_path, "w").write(html.replace("</body>", probe_script() + "\n</body>"))
    tmp_console = os.path.join(os.path.dirname(html_path), "console.txt")
    line = run_chrome(root, tmp_console)
    if not line:
        print(f"FATAL: probe output not found in the DOM — the charts did not "
              f"execute (incomplete mirror or a build fault)")
        print("console errors:")
        print(open(tmp_console).read()[:2000])
        return 1
    print(f"# {label}")
    print(line)
    ok, bad = verdict(line)
    for b in bad:
        print(f"  FAIL: {b}")
    errs = console_errors(tmp_console)
    if errs:
        ok = False
        print("console errors:")
        for l in errs[:10]:
            print("  " + l.strip())
    else:
        print("(no console errors)")
    print("PASS" if ok else "FAIL")
    return 0 if ok else 1


def fixture_page(chart_spec: dict) -> str:
    """A minimal index.html with stub __charts entries.
    chart_spec: {id: kind} where kind is 'ok' | 'cat' | 'cat-empty' | 'nodata' | 'fbar'
    | 'clip' | 'enddot-no'. 'fbar' = floating-bar data (the food-lag gantt format)."""
    def stub(kind: str) -> str:
        if kind in ("cat", "cat-empty"):
            scale = '"category"'
        else:
            scale = '"linear"'
        if kind == "nodata" or kind == "cat-empty":
            data = "[]"
            pr = "3"
        elif kind == "fbar":
            data = "[[5,10],[8,12]]"
            pr = "3"
        elif kind == "enddot-no":
            data = "[{x:5},{x:10},{x:15}]"
            pr = "[3,3,0]"
        else:
            data = "[{x:5},{x:10}]"
            pr = "3"
        right = 101 if kind == "clip" else 120
        return (f"chartArea: {{ right: {right} }}, "
                f"scales: {{ x: {{ type: {scale}, getPixelForValue: (v) => 100 }} }}, "
                f"data: {{ datasets: [{{ pointRadius: {pr}, data: {data} }}] }}")
    canvases = "".join(f'<canvas id="{i}" width="300" height="100"></canvas>\n'
                       for i in chart_spec)
    entries = ",\n    ".join(f"{json_dq(i)}: {{ {stub(k)} }}" for i, k in chart_spec.items())
    return (f"<!doctype html><html><head><meta charset=\"utf-8\"><title>fixture</title></head>"
            f"<body>\n{canvases}<script>\nwindow.__charts = {{\n    {entries}\n}};\n</script>"
            f"</body></html>")


def selftest() -> int:
    """Fixture cases (full chrome runs) + verdict unit checks; each must produce
    the outcome it claims."""
    base = {}
    for i in EXPECTED:
        # foodChart stands in with floating-bar data — the real gantt format the
        # probe must read (an empty foodChart now fails, like any chart)
        base[i] = ("fbar" if i == "foodChart"
                   else "cat" if i in CATEGORY else "ok")
    missing_refinery = {k: v for k, v in base.items() if k != "refineryChart"}
    cases = [("baseline: full registry, foodChart as floating bars", dict(base), True),
             ("missing refineryChart", missing_refinery, False),
             ("empty flipChart (NODATA)", {**base, "flipChart": "nodata"}, False),
             ("empty category chart (sprChart)", {**base, "sprChart": "cat-empty"}, False),
             ("unexpected rogueChart", {**base, "rogueChart": "ok"}, False),
             ("dieselChart endpoint dot gone", {**base, "dieselChart": "enddot-no"}, False),
             ("brentChart clipped at the edge", {**base, "brentChart": "clip"}, False)]
    failures = 0
    for name, spec, expect_pass in cases:
        tmpdir = tempfile.mkdtemp(prefix="verify-live-selftest-")
        try:
            with open(os.path.join(tmpdir, "index.html"), "w") as f:
                f.write(fixture_page({k: v for k, v in spec.items() if v}))
            rc = check_label(tmpdir, f"selftest: {name}")
            got = (rc == 0)
            if got != expect_pass:
                failures += 1
                print(f"  SELFTEST FAIL: '{name}' — expected "
                      f"{'PASS' if expect_pass else 'FAIL'}, got {'PASS' if got else 'FAIL'}")
        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

    # Verdict unit checks (no chrome): the endpoint results are REQUIRED — a line
    # with every chart OK but no EndDot tokens must fail (Oct 5 recheck), and the
    # token set must be exactly one per END_DOT id.
    full = " | ".join(f"{i}={'CAT' if i in CATEGORY else 'OK'}" for i in EXPECTED)
    ends = " | ".join(f"{i}EndDot=yes" for i in END_DOT)
    units = [("no EndDot tokens at all", full, False),
             ("complete line", full + " | " + ends, True),
             ("duplicate EndDot token", full + " | " + ends + f" | {END_DOT[0]}EndDot=yes", False),
             ("unexpected EndDot id", full + " | " + ends + " | rogueEndDot=yes", False),
             ("duplicate chart token", full + " | brentChart=OK", False)]
    for name, line, expect_pass in units:
        ok, bad = verdict(line)
        if ok != expect_pass:
            failures += 1
            print(f"  SELFTEST FAIL: verdict unit '{name}' — expected "
                  f"{'PASS' if expect_pass else 'FAIL'}, got {'PASS' if ok else 'FAIL'}: {bad}")
    total = len(cases) + len(units)
    print(f"selftest: {total - failures}/{total} cases behaved as expected")
    return 1 if failures else 0


def main() -> int:
    which = sys.argv[1] if len(sys.argv) > 1 else "staging"
    tmpdir = tempfile.mkdtemp(prefix="verify-live-")
    try:
        if which == "selftest":
            return selftest()
        if which in SITES:
            # live check: mirror the deployed page + assets into tmpdir, inject the
            # probe, and run chrome against the MIRROR (see docstring gotchas)
            print(f"# verify-live {which} — {SITES[which]}")
            mirror(SITES[which], tmpdir)
        elif which == "local":
            dist = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "dist"))
            if not os.path.isdir(dist):
                print(f"FATAL: {dist} not found — run `npm run build` first")
                return 2
            print(f"# verify-live local — {dist}")
            shutil.copytree(dist, os.path.join(tmpdir, "site"), dirs_exist_ok=True)
        else:
            print(f"usage: verify-live.py [staging|prod|local|selftest] (got {which!r})")
            return 2

        root = os.path.join(tmpdir, "site") if which == "local" else tmpdir
        return check_label(root, f"verify-live {which}")
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
