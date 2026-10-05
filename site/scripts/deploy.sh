#!/usr/bin/env bash
# deploy.sh — Tier 3 (Oct 4). Guarded deploys for the oil-crisis site.
#
#   scripts/deploy.sh staging              # rebuild + deploy to the staging worker
#   scripts/deploy.sh prod                 # HALTS — prod needs the user's explicit go-ahead
#   scripts/deploy.sh prod --green-light   # the go-ahead: show what changed, rebuild, deploy
#
# Guardrails (Oct 4 process rules):
#   1. A content fingerprint of src/ + public/ is kept in a state file OUTSIDE the repo
#      (~/.pi/agent/depletion-deploy-state.json — staging details never in the public repo).
#      If the tree changed since the last deploy, the changed files are listed. That is the
#      external-review copy-edit case: the diff is surfaced for re-verification, not treated
#      as a failure — but for prod the script still halts without --green-light, and the
#      changed files must be re-read/re-verified before the rebuild is trusted.
#   2. Prod always requires --green-light (mechanical encoding of the user's rule).
#   3. Every deploy rebuilds (prebuild sync + astro build + make-og), so the deployed build
#      matches the current tree by construction. If the tree changes DURING the build
#      (mid-pass edit), the post-build check catches it and refuses.
#   4. og-supply.png must be regenerated whenever DATA_AS_OF changed (the day counter is
#      rendered into the share card) — verified, not assumed.
set -euo pipefail

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE="$HOME/.pi/agent/depletion-deploy-state.json"
STAGING_CONFIG="$HOME/.pi/agent/depletion-staging/wrangler.jsonc"

MODE="${1:-}"
GREEN=0
[[ "${2:-}" == "--green-light" ]] && GREEN=1

if [[ "$MODE" != "staging" && "$MODE" != "prod" ]]; then
  echo "usage: deploy.sh staging | prod [--green-light]" >&2
  exit 2
fi

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" && -f "$HOME/.airhoncho-cf-token" ]]; then
  CLOUDFLARE_API_TOKEN="$(tr -d '[:space:]' < "$HOME/.airhoncho-cf-token")"
  export CLOUDFLARE_API_TOKEN
fi
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "FATAL: no CLOUDFLARE_API_TOKEN (env or ~/.airhoncho-cf-token)" >&2
  exit 4
fi

# Per-file content hashes, one "hash  path" per line, sorted by path.
# SYNCED_SOURCES: research/ files that sync-content.mjs copies into src/. The fingerprint
# must cover the SOURCE, not just the generated copy — an edit to MODEL.md that lands
# after the prebuild sync would otherwise pass the mid-build check with a stale /model/ page.
SYNCED_SOURCES=("$SITE/../research/MODEL.md")
hashlist_file="$(mktemp)"
MIDBUILD_LIST=""; POSTBUILD_LIST=""
PRE_SYNC_SRC=""; POST_SYNC_SRC=""
OLD_STATE_TMP="/tmp/.deploy-state-old.json"
trap 'rm -f "$hashlist_file" "$MIDBUILD_LIST" "$POSTBUILD_LIST" "$PRE_SYNC_SRC" "$POST_SYNC_SRC" "$OLD_STATE_TMP"' EXIT
hashlist() {
  (cd "$SITE" && find src public -type f ${1:-} 2>/dev/null | sort | xargs -r sha256sum)
  for f in "${SYNCED_SOURCES[@]}"; do if [[ -f "$f" ]]; then sha256sum "$f"; fi; done
}
# og-supply.png is excluded here too: make-og re-renders it on EVERY deploy, so it can
# never be a meaningful "changed since last deploy" signal — it would flag on every run
hashlist "! -path public/og-supply.png" > "$hashlist_file"
NEW_FP="$(sha256sum "$hashlist_file" | cut -d' ' -f1)"

changed_files() { # old-state-file → prints "+ added / - removed / ~ changed" lines
  local old_state="$1"
  python3 - "$old_state" "$hashlist_file" <<'EOF'
import json, sys
old_path, cur_path = sys.argv[1], sys.argv[2]
try:
    old = json.load(open(old_path)).get("files", {})
except Exception:
    old = {}
cur = {}
for line in open(cur_path):
    h, p = line.split(" ", 1)
    cur[p.strip()] = h
for p in sorted(set(old) | set(cur)):
    if old.get(p) != cur.get(p):
        print(("+" if p not in old else ("-" if p not in cur else "~")) + " " + p)
EOF
}

cd "$SITE"
OLD_FP=""
[[ -f "$STATE" ]] && OLD_FP="$(python3 -c "import json;print(json.load(open('$STATE'))['fingerprint'])" 2>/dev/null || true)"

if [[ -n "$OLD_FP" && "$OLD_FP" != "$NEW_FP" ]]; then
  echo "⚠ Tree changed since the last deploy ($MODE):"
  cp "$STATE" "$OLD_STATE_TMP"
  changed_files "$OLD_STATE_TMP" | sed 's/^/    /'
  echo ""
  if [[ "$MODE" == "prod" && "$GREEN" -ne 1 ]]; then
    echo "HALT: production deploy requires the user's explicit go-ahead." >&2
    echo "Re-run as:  scripts/deploy.sh prod --green-light" >&2
    exit 3
  fi
  if [[ "$MODE" == "prod" ]]; then
    echo "The changed files above (typically the external review's copy edits) MUST be"
    echo "re-read and re-verified (build + staging + harness) before this prod deploy."
    echo "Continuing because --green-light was given. If you have not verified them,"
    echo "stop:  scripts/deploy.sh staging  →  verify  →  scripts/deploy.sh prod --green-light"
    echo ""
  else
    echo "(staging — informational; the rebuild picks these up)"
    echo ""
  fi
fi
if [[ "$MODE" == "prod" && "$GREEN" -ne 1 ]]; then
  echo "PRODUCTION DEPLOY — requires the user's explicit go-ahead." >&2
  echo "Re-run as:  scripts/deploy.sh prod --green-light" >&2
  exit 3
fi

# Stage 1: sync research docs into src/content/docs. This legitimately rewrites src/
# BEFORE the build, so the mid-build fingerprint below is taken after it.
# The synced SOURCE is hashed before AND after the sync: an edit to MODEL.md landing
# inside the sync window would otherwise be copied stale (the sync read the old bytes)
# while every fingerprint below records the new hash — a permanently stale /model/ page
# that no later deploy would flag. The window is milliseconds, but the cost is one hash.
PRE_SYNC_SRC="$(mktemp)"
for f in "${SYNCED_SOURCES[@]}"; do if [[ -f "$f" ]]; then sha256sum "$f"; fi; done > "$PRE_SYNC_SRC"
npm run prebuild >/dev/null
POST_SYNC_SRC="$(mktemp)"
for f in "${SYNCED_SOURCES[@]}"; do if [[ -f "$f" ]]; then sha256sum "$f"; fi; done > "$POST_SYNC_SRC"
if ! diff -q "$PRE_SYNC_SRC" "$POST_SYNC_SRC" >/dev/null; then
  echo "FATAL: a synced research source changed DURING the content sync — the built page may be stale:" >&2
  { diff "$PRE_SYNC_SRC" "$POST_SYNC_SRC" || true; } | sed 's/^/    /' >&2
  echo "Re-run the deploy." >&2
  exit 8
fi

# Mid-build fingerprint: the tree, byte-for-byte, at the moment the build starts.
# (public/og-supply.png is excluded — make-og rewrites it AFTER the build, by design.)
MIDBUILD_LIST="$(mktemp)"
hashlist "! -path public/og-supply.png" > "$MIDBUILD_LIST"

echo "→ rebuild (astro + make-og)…"
# astro build directly (not `npm run build`): the sync step above is already done, and
# re-running it under the fingerprint would be a legitimate change the guard can't tell
# apart from drift.
npx astro build >/dev/null
node scripts/make-og.mjs >/dev/null
echo "  built. og-supply.png: $(stat -c '%s bytes, %y' public/og-supply.png | cut -c1-40)"

# the og card must be at least as new as the data file (the day counter is rendered in)
if ! node -e "
  const fs=require('fs');
  // the og card renders the day number, which derives from DATA_AS_OF; verify the
  // image is at least as new as the data file
  const og=fs.statSync('public/og-supply.png').mtimeMs;
  const ts=fs.statSync('src/data/crisis.ts').mtimeMs;
  process.exit(og >= ts - 60000 ? 0 : 1);
"; then
  echo "FATAL: og-supply.png is older than crisis.ts — the share card does not match the data." >&2
  echo "Re-run make-og or the full deploy." >&2
  exit 5
fi

# mid-build edit detector (content-based, not mtime): the tree must be byte-identical
# to what it was when the build started. The old mtime-vs-NEWEST-output check missed
# edits that landed between two output writes (reproduced Oct 4 review); hashes catch
# every edit regardless of timing.
POSTBUILD_LIST="$(mktemp)"
hashlist "! -path public/og-supply.png" > "$POSTBUILD_LIST"
if ! diff -q "$MIDBUILD_LIST" "$POSTBUILD_LIST" >/dev/null; then
  echo "FATAL: source changed DURING the build — the build may not match the tree:" >&2
  # diff exits 1 on "files differ" (its normal signal) — under set -e + pipefail the
  # bare pipeline would kill the script before the FATAL is finished (reproduced: exit 1, no message tail)
  { diff "$MIDBUILD_LIST" "$POSTBUILD_LIST" || true; } | sed 's/^/    /' >&2
  echo "Re-run the deploy." >&2
  exit 6
fi

# grep exits 1 on no match — same pipefail trap as the diff above; keep it alive so the FATAL below can print
BUNDLE="$( { grep -o 'index\.astro_astro_type_script_index_0_lang\.[A-Za-z0-9_-]*\.js' dist/index.html || true; } | head -1)"
if [[ -z "$BUNDLE" ]]; then
  echo "FATAL: could not find the JS bundle in dist/index.html — the build output layout changed;" >&2
  echo "do not deploy an unverified build." >&2
  exit 7
fi
echo "  bundle: $BUNDLE"

# Chart geometry + console check on the EXACT bytes about to be deployed (local mirror
# of dist/ — no propagation lag). CLIP/NOTBUILT/missing-endpoint-dot fails the deploy
# before it ships; the pass can still re-run `python3 scripts/verify-live.py staging`
# against the live URL afterwards.
echo "→ geometry check (local mirror of dist/)…"
if ! python3 "$SITE/scripts/verify-live.py" local; then
  echo "FATAL: the geometry check failed — the endpoint dot would be clipped or a chart" >&2
  echo "would not build. Fix the chart (usually: widen the x-scale in index.astro) and" >&2
  echo "re-run the deploy. The deploy was NOT run." >&2
  exit 9
fi

CONFIG="wrangler.jsonc"
[[ "$MODE" == "staging" ]] && CONFIG="$STAGING_CONFIG"
echo "→ deploying to $MODE (config: $CONFIG)…"
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" npx wrangler deploy --config "$CONFIG" 2>&1 | tail -4

python3 - "$STATE" "$MODE" "$NEW_FP" "$BUNDLE" "$hashlist_file" <<'EOF'
import json, sys, datetime
state_path, mode, fp, bundle, cur_path = sys.argv[1:6]
files = {}
for line in open(cur_path):
    h, p = line.split(" ", 1)
    files[p.strip()] = h
json.dump({
    "mode": mode,
    "fingerprint": fp,
    "bundle": bundle,
    "files": files,
    "at": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
}, open(state_path, "w"), indent=2)
EOF
echo "✓ $MODE deploy complete. bundle: $BUNDLE (geometry check passed on these bytes)"
echo "  (staging: optionally re-verify the live URL with scripts/verify-live.py staging; prod: log the version)"
