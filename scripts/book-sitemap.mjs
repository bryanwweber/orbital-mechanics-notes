import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const htmlRoot = process.argv[2] ?? "_build/html";
const origin = "https://orbital-mechanics.space";
const replaceBuildOrigin = (text) => text.replaceAll(/http:\/\/(?:pre\.render|localhost:3000)\b/g, origin);

const sitemapPath = path.join(htmlRoot, "sitemap.xml");
const robotsPath = path.join(htmlRoot, "robots.txt");
const [sitemap, robots] = await Promise.all([
  readFile(sitemapPath, "utf8"),
  readFile(robotsPath, "utf8"),
]);

// GitHub Pages serves the generated directory index at the slash URL.
const formatted = replaceBuildOrigin(sitemap).replaceAll(/<loc>([^<]+)<\/loc>/g, (entry, url) => {
  const location = new URL(url);
  if (location.origin !== origin) return entry;
  if (!location.pathname.endsWith("/")) location.pathname += "/";
  return `<loc>${location.href}</loc>`;
});

await Promise.all([
  writeFile(sitemapPath, formatted),
  writeFile(robotsPath, replaceBuildOrigin(robots)),
]);
