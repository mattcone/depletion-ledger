#!/usr/bin/env node
// Sync content from the research project (../research) into the site's content
// directories before each build. The research project remains the single source
// of truth; this script copies and injects frontmatter.
//
// On the site:  MODEL.md -> src/content/docs/model.md  (/model/)
//
// Deliberately NOT on the site:
//   Oil-Depletion-Report.md, Oil-Report-Index.md, SUMMARY.md,
//   Oil-Crisis-Plain-Summary.md, MODEL-internal.md, logs/*.md — repo only,
//   not rendered as site pages

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "../../research");
const OUT = join(here, "../src/content");

function withFrontmatter(md, fm) {
  if (md.startsWith("---")) return md; // already has frontmatter
  // Always JSON-encode values: JSON strings are valid YAML, and the values
  // contain colons/quotes that would otherwise break the frontmatter parse.
  const block = Object.entries(fm)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n");
  return `---\n${block}\n---\n\n${md}`;
}

// Regenerate from scratch every build (src/content/ is gitignored).
rmSync(join(OUT, "docs"), { recursive: true, force: true });
mkdirSync(join(OUT, "docs"), { recursive: true });

const md = readFileSync(join(SRC, "MODEL.md"), "utf8");
writeFileSync(
  join(OUT, "docs", "model.md"),
  withFrontmatter(md, {
    title: "How the Model Works",
    description:
      "Learn how the Depletion Ledger assigns odds to three shipping scenarios, tracks the emergency reserve, and keeps a record of its predictions.",
  })
);
console.log("docs: MODEL.md -> src/content/docs/model.md");
console.log("content sync complete");
