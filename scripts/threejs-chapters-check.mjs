import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const update = process.argv.includes("--update-placeholders");
const browser = await chromium.launch({ headless: false });
const deadline = setTimeout(() => void browser.close(), 90000);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, options) {
      return original.call(this, type, type.startsWith("webgl")
        ? { ...options, preserveDrawingBuffer: true } : options);
    };
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await mkdir("_build/browser/chapters", { recursive: true });
  if (update) await mkdir("assets/threejs-placeholders", { recursive: true });
  const chapters = [
    ["two-body-inertial-numerical-solution", [
      ["inertial", "Two-body motion in an inertial frame", "fig:two-body-inertial"],
      ["barycenter", "Two-body motion relative to the barycenter", "fig:two-body-inertial-cg-relative"],
      ["primary", "Two-body motion relative to the first mass", "fig:two-body-inertial-m1-relative"],
    ]],
    ["two-body-relative-numerical-solution", [
      ["relative", "Satellite motion relative to the Earth", "fig:two-body-relative"],
    ]],
  ];
  for (const [chapter, figures] of chapters) {
    await page.goto(`${process.env.BOOK_URL ?? "http://localhost:3000"}/chapters/the-n-body-problem/${chapter}`);
    await page.getByTitle(figures[0][1], { exact: true }).waitFor({ state: "attached" });
    assert.equal(await page.locator("iframe").count(), figures.length);
    for (const [preset, title, label] of figures) {
      const iframe = page.getByTitle(title, { exact: true });
      await iframe.scrollIntoViewIfNeeded();
      const frame = iframe.contentFrame();
      await frame.locator("canvas").waitFor();
      await frame.locator("#status").waitFor({ state: "hidden" });
      const opaque = await frame.locator("canvas").evaluate((canvas) => !canvas.getContext("webgl2").getContextAttributes().alpha);
      assert.ok(opaque, "canvas remains opaque on the book's light background");
      await frame.locator(".lil-controller.lil-number input").fill("0");
      const caption = await iframe.evaluate((element) => element.closest("figure")?.textContent);
      assert.ok(caption?.trim(), `caption exists for ${label}`);
      console.log(`${label}: ${caption.trim()}`);
      await iframe.screenshot({ path: `_build/browser/chapters/${preset}.png` });
      if (update) {
        const data = await frame.locator("canvas").evaluate((canvas) => canvas.toDataURL("image/png").split(",")[1]);
        await writeFile(`assets/threejs-placeholders/${preset}.png`, Buffer.from(data, "base64"));
      }
    }
    const brokenReferences = await page.locator('a[href^="#"]').evaluateAll((links) => links
      .filter((link) => link.hash.includes("two-body") && !document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .map((link) => link.hash));
    assert.deepEqual(brokenReferences, []);
  }
  assert.deepEqual(errors, []);
  console.log("Passed chapter figures, captions, local cross-references, and asset loading.");
} finally {
  clearTimeout(deadline);
  await browser.close();
}
