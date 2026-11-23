import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

test("media hints apply to prefixed book pages and leave embedded documents alone", async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), "book-media-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const html = path.join(root, "html");
  await Promise.all(["site", "html/chapter", "html/chapters/assets", "html/_public"].map(
    (directory) => mkdir(path.join(root, directory), { recursive: true })
  ));
  await writeFile(path.join(root, "site/config.json"), JSON.stringify({
    projects: [{ index: "index", pages: [{ slug: "chapter" }] }],
  }));
  await copyFile("assets/threejs-placeholders/inertial.png", path.join(html, "_public/plot.png"));
  await copyFile("images/wmap-trajectory.webp", path.join(html, "_public/wmap-trajectory-abcd.webp"));
  await writeFile(path.join(html, "_public/diagram.svg"),
    '<?xml version="1.0"?><svg width="42px" height="28" viewBox="0 0 42 28"></svg>');
  await writeFile(path.join(html, "index.html"), [
    '<img src="/preview/_public/plot.png">',
    '<img src="/preview/_public/diagram.svg" style="width:75%">',
  ].join("\n"));
  const chapter = path.join(html, "chapter/index.html");
  const embed = path.join(html, "chapters/assets/demo.html");
  const original = [
    '<iframe src="/preview/chapters/assets/demo.html" title="Orbit"></iframe>',
    '<iframe src="https://example.org/demo" title="External"></iframe>',
    '<figure id="fig-pseudo-potential-energy-cr3bp"><img src="/preview/_public/plot.png"></figure>',
    '<figure id="fig-wmap-trajectory"><img src="/preview/_public/wmap-trajectory-abcd.webp"></figure>',
    '<img src="/preview/_public/plot.png" width="100" height="50">',
    '<script>const example = \'<iframe src="/preview/chapters/assets/demo.html">\';</script>',
    '<link rel="preload" as="image" href="/preview/_public/wmap-trajectory-abcd.webp">',
    '<link rel="preload" as="image" href="/preview/_public/logo.svg">',
  ];
  await writeFile(chapter, original.join("\n"));
  await writeFile(embed, original[0]);
  const run = () => execFileSync(process.execPath, ["scripts/book-media.mjs", root], {
    env: { ...process.env, BASE_URL: "/preview/" },
  });

  run();
  const updated = await readFile(chapter, "utf8");
  const lines = updated.split("\n");
  assert.equal(lines[0], original[0].replace("<iframe", '<iframe loading="lazy"'));
  assert.equal(lines[1], original[1]);
  assert.match(lines[2], /<img loading="lazy" width="[1-9]\d*" height="[1-9]\d*" /);
  assert.equal(lines[3], original[3].replace("<img", '<img loading="lazy" width="560" height="420"'));
  assert.equal(lines[4], original[4].replace("<img", '<img loading="lazy"'));
  assert.deepEqual(lines.slice(5), [original[5], "", original[7]]);
  const [png, svg] = (await readFile(path.join(html, "index.html"), "utf8")).split("\n");
  assert.match(png, /^<img width="\d+" height="\d+" src=/);
  assert.equal(svg, '<img width="42" height="28" src="/preview/_public/diagram.svg" style="width:75%">');
  assert.equal(await readFile(embed, "utf8"), original[0]);
  run();
  assert.equal(await readFile(chapter, "utf8"), updated);
});

test("production sitemap uses the final URLs without changing external locations", async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), "book-sitemap-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const sitemap = path.join(root, "sitemap.xml");
  const robots = path.join(root, "robots.txt");
  await writeFile(sitemap, [
    '<loc>http://pre.render</loc>',
    '<loc>http://localhost:3000/section/page</loc>',
    '<loc>https://orbital-mechanics.space/section/another/</loc>',
    '<loc>https://example.org/external</loc>',
  ].join("\n"));
  await writeFile(robots, "Sitemap: http://pre.render/sitemap.xml\n");
  const run = () => execFileSync(process.execPath, ["scripts/book-sitemap.mjs", root]);

  run();
  const updated = await readFile(sitemap, "utf8");
  assert.equal(updated, [
    '<loc>https://orbital-mechanics.space/</loc>',
    '<loc>https://orbital-mechanics.space/section/page/</loc>',
    '<loc>https://orbital-mechanics.space/section/another/</loc>',
    '<loc>https://example.org/external</loc>',
  ].join("\n"));
  assert.equal(await readFile(robots, "utf8"), "Sitemap: https://orbital-mechanics.space/sitemap.xml\n");
  run();
  assert.equal(await readFile(sitemap, "utf8"), updated);
});
