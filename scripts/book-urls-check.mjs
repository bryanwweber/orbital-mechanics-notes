import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Run after book:build. Protect published routes when upgrading MyST or its patch.
const config = JSON.parse(await readFile("_build/site/config.json", "utf8"));
const project = config.projects[0];
const slugs = [project.index, ...project.pages.filter((page) => page.slug).map((page) => page.slug)];
assert.equal(new Set(slugs).size, slugs.length, "page URLs must be unique");
assert.ok(slugs.length > 1, "the book must contain chapter pages");
for (const slug of ["intro.reference-frames", "the-orbit-equation.elliptical-orbits",
  "time-since-periapsis-and-keplers-equation.elliptical-orbits"]) {
  assert.ok(slugs.includes(slug), `published page URL must exist: ${slug}`);
}

for (const slug of slugs) {
  assert.ok(!slug.startsWith("chapters."), `source directory leaked into page URL: ${slug}`);
  const route = slug === project.index ? "" : slug.replace(/\.index$/, "").replaceAll(".", "/");
  const html = await readFile(path.join("_build/html", route, "index.html"), "utf8");
  assert.match(html, /<h1[\s>]/, `page must render its content: ${route || "/"}`);
  for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
    assert.ok(!href.startsWith("/chapters/"), `navigation uses source prefix in ${route}: ${href}`);
  }
}
console.log(`Verified ${slugs.length} static pages and their navigation without the chapters URL prefix.`);
