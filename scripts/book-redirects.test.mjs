import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { runInNewContext } from "node:vm";
import test from "node:test";

const exec = promisify(execFile);
const generator = new URL("./book-redirects.mjs", import.meta.url).pathname;
const pages = [
  ["index", "intro.md", ""],
  ["intro.reference-frames", "intro/reference-frames.md", "intro/reference-frames"],
  ["the-n-body-problem.equations-of-motion-cr3bp", "the-n-body-problem/equations-of-motion-CR3BP.md", "the-n-body-problem/equations-of-motion-cr3bp"],
  ["the-n-body-problem.lagrange-points-example", "the-n-body-problem/lagrange-points-example.md", "the-n-body-problem/lagrange-points-example"],
  ["interplanetary-maneuvers.planetary-departure-trajectory", "interplanetary-maneuvers/planetary-departure-trajectory.md", "interplanetary-maneuvers/planetary-departure-trajectory"],
  ["the-orbit-equation.elliptical-orbits", "the-orbit-equation/elliptical-orbits.md", "the-orbit-equation/elliptical-orbits"],
  ["time-since-periapsis-and-keplers-equation.elliptical-orbits", "time-since-periapsis-and-keplers-equation/elliptical-orbits.md", "time-since-periapsis-and-keplers-equation/elliptical-orbits"],
];
const original = '<!doctype html><html><head></head><body><h1>Page</h1>'
  + '<h2 id="types-of-reference-frames">Section</h2>'
  + '<div id="eq-departure-energy">Equation</div></body></html>';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "book-redirects-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "site/content"), { recursive: true });
  await writeFile(path.join(root, "site/config.json"), JSON.stringify({ projects: [{
    index: "index", pages: pages.slice(1).map(([slug]) => ({ slug })),
  }] }));
  for (const [slug, source, route] of pages) {
    await writeFile(path.join(root, "site/content", `${slug}.json`), JSON.stringify({
      location: `/chapters/${source}`,
    }));
    await mkdir(path.join(root, "html", route), { recursive: true });
    await writeFile(path.join(root, "html", route, "index.html"), original);
  }
  await writeFile(path.join(root, "html/sitemap.xml"), "original sitemap");
  return root;
}

async function generate(root) {
  return exec(process.execPath, [generator, root]);
}

function followRedirect(html, from) {
  let redirected;
  const location = new URL(from);
  location.replace = (target) => { redirected = new URL(target, from).href; };
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  runInNewContext(script, { window: { location } });
  return redirected;
}

test("preserves legacy paths, distinct sections, and root content without changing the sitemap", async (t) => {
  const root = await fixture(t);
  await generate(root);
  const paths = [
    ["intro.html", ""],
    ["intro/reference-frames.html", "intro/reference-frames"],
    ["the-n-body-problem/Equations-of-Motion-CR3BP.html", "the-n-body-problem/equations-of-motion-cr3bp"],
    ["the-n-body-problem/equations-of-motion-CR3BP.html", "the-n-body-problem/equations-of-motion-cr3bp"],
    ["the-n-body-problem/equations-of-motion-cr3bp.html", "the-n-body-problem/equations-of-motion-cr3bp"],
    ["the-n-body-problem/Lagrange-points-example.html", "the-n-body-problem/lagrange-points-example"],
    ["the-n-body-problem/lagrange-points-example.html", "the-n-body-problem/lagrange-points-example"],
    ["interplanetary-maneuvers/planetary-depahture-trajectory.html", "interplanetary-maneuvers/planetary-departure-trajectory"],
    ["the-orbit-equation/elliptical-orbits.html", "the-orbit-equation/elliptical-orbits"],
    ["time-since-periapsis-and-keplers-equation/elliptical-orbits.html", "time-since-periapsis-and-keplers-equation/elliptical-orbits"],
  ];
  for (const [legacy, route] of paths) {
    const html = await readFile(path.join(root, "html", legacy), "utf8");
    const destination = `https://orbital-mechanics.space/${route}${route ? "/" : ""}`;
    assert.ok(html.includes(`<link rel="canonical" href="${destination}">`));
    assert.doesNotMatch(html, /noindex|nofollow/);
    const refresh = html.match(/<meta http-equiv="refresh" content="0; url=([^"]+)">/)[1];
    assert.equal(new URL(refresh, `https://orbital-mechanics.space/${legacy}`).href, destination);
    for (const prefix of ["", "/pr-preview/pr-51"]) {
      const from = `https://orbital-mechanics.space${prefix}/${legacy}?utm_source=old-link#types-of-reference-frames`;
      assert.equal(followRedirect(html, from),
        `https://orbital-mechanics.space${prefix}/${route}${route ? "/" : ""}?utm_source=old-link#types-of-reference-frames`);
    }
  }
  assert.equal(await readFile(path.join(root, "html/index.html"), "utf8"), original);
  assert.equal(await readFile(path.join(root, "html/sitemap.xml"), "utf8"), "original sitemap");
  await generate(root);
});

test("translates Sphinx equation fragments and old departure labels, preserving other fragments", async (t) => {
  const root = await fixture(t);
  await generate(root);
  const html = await readFile(path.join(root, "html/interplanetary-maneuvers/planetary-depahture-trajectory.html"), "utf8");
  const from = "https://orbital-mechanics.space/interplanetary-maneuvers/planetary-depahture-trajectory.html";
  const target = "https://orbital-mechanics.space/interplanetary-maneuvers/planetary-departure-trajectory/";
  for (const fragment of ["equation-eq-departure-energy", "equation-eq-depahture-energy", "eq-depahture-energy"]) {
    assert.equal(followRedirect(html, `${from}#${fragment}`), `${target}#eq-departure-energy`);
  }
  assert.equal(followRedirect(html, `${from}#unknown-section`), `${target}#unknown-section`);
  assert.equal(followRedirect(html, `${from}#__proto__`), `${target}#__proto__`);
  assert.equal(followRedirect(html, from), target);
  assert.equal(followRedirect(html, `${from}#bad%encoding`), `${target}#bad%25encoding`);
});

test("fails before writing redirects if a destination is missing or existing content would be overwritten", async (t) => {
  const missing = await fixture(t);
  await rm(path.join(missing, "html/intro/reference-frames/index.html"));
  await assert.rejects(generate(missing), /ENOENT/);
  await assert.rejects(readFile(path.join(missing, "html/intro.html")), /ENOENT/);
  const conflict = await fixture(t);
  await writeFile(path.join(conflict, "html/intro/reference-frames.html"), original);
  await assert.rejects(generate(conflict), /Refusing to overwrite an existing page/);
  assert.equal(await readFile(path.join(conflict, "html/intro/reference-frames.html"), "utf8"), original);
  await assert.rejects(readFile(path.join(conflict, "html/intro.html")), /ENOENT/);
});
