// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Drop table headers that carry no text (the "label | value" tables in the
// markdown use an empty header row: `| | |` + `|---|---|`).
function removeEmptyThead() {
  const hasText = (n) =>
    n.type === "text" ? !!n.value.trim() : (n.children ?? []).some(hasText);
  const walk = (node) => {
    if (node.children) {
      node.children = node.children.filter(
        (c) => !(c.tagName === "thead" && !hasText(c))
      );
      node.children.forEach(walk);
    }
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  // Canonical origin — used for the sitemap, canonical tags, and share cards.
  site: "https://www.depletion.org",
  integrations: [
    sitemap({
      // /og/supply is a share-card render source, not a page. (page is a full URL.)
      // /research/lapse-persistence is a labeled research preview — noindex'd,
      // and kept out of the sitemap so it is not part of the published surface.
      filter: (page) => !page.includes("/og/") && !page.includes("/research/lapse-persistence"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [removeEmptyThead],
  },
});
