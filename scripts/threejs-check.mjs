import assert from "node:assert/strict";
import { startThreejsFixture } from "./threejs-fixture.mjs";
import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const headed = process.argv.includes("--headed");
const browser = await chromium.launch({ headless: !headed });
const fixture = await startThreejsFixture();
console.log(`Chromium started in ${headed ? "headed" : "headless"} mode`);
const deadline = setTimeout(() => {
  console.error("Browser validation exceeded 90 seconds; closing Chromium.");
  process.exitCode = 1;
  void browser.close();
}, 90000);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);
  // Keep rendered pixels available for direct canvas readback in this check.
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, options) {
      return getContext.call(this, type, type.startsWith("webgl")
        ? { ...options, preserveDrawingBuffer: true } : options);
    };
  });
  const errors = [];
  const warnings = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
    if (message.type() === "warning") warnings.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  const url = fixture.url;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log("Page loaded");
  const frames = page.locator('iframe[title="Two-body motion in an inertial frame"], iframe[title="Independent two-body animation"]');
  assert.equal(await frames.count(), 2);
  const first = frames.nth(0).contentFrame();
  const second = frames.nth(1).contentFrame();
  const ready = async (frame) => {
    await frame.locator("canvas").waitFor();
    await frame.locator("#status").waitFor({ state: "hidden" });
  };
  await frames.nth(0).scrollIntoViewIfNeeded();
  await ready(first);
  console.log("First model ready, Three.js r" + await first.locator("html").getAttribute("data-three-revision"));
  const installed = JSON.parse(await readFile("node_modules/three/package.json", "utf8"));
  assert.equal(await first.locator("html").getAttribute("data-three-revision"), installed.version.split(".")[1]);
  const speed = first.locator('.lil-controller.lil-number input');
  const setSpeed = (value) => speed.evaluate((input, next) => {
    input.value = next;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
  await setSpeed("0");
  console.log("Paused first instance", await first.locator("canvas").boundingBox());
  // Allow pending rendering after the control change to finish.
  const settle = async () => page.waitForTimeout(250);
  await settle(first);
  console.log("Capturing paused canvas");
  const capture = async (frame) => Buffer.from(await frame.locator("canvas").evaluate(
    (canvas) => canvas.toDataURL("image/png").split(",")[1],
  ), "base64");
  const paused = await capture(first);
  await settle(first);
  assert.ok((await capture(first)).equals(paused), "speed zero pauses animation");
  await mkdir("_build/browser", { recursive: true });
  await writeFile("_build/browser/threejs-placeholder.png", paused);
  await setSpeed("2.5");
  await settle(first);
  await setSpeed("0");
  assert.ok(!(await capture(first)).equals(paused), "animation advances");
  await setSpeed("0");
  await settle(first);
  const beforeOrbit = await capture(first);
  const box = await first.locator("canvas").boundingBox();
  await page.mouse.move(box.x + box.width / 3, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
  await page.mouse.up();
  assert.ok(!(await capture(first)).equals(beforeOrbit), "orbit controls change view");
  await frames.nth(1).scrollIntoViewIfNeeded();
  await ready(second);
  assert.equal(await second.locator('.lil-controller.lil-number input').inputValue(), "2.5", "second instance remains independent");
  await page.setViewportSize({ width: 390, height: 844 });
  await frames.nth(0).scrollIntoViewIfNeeded();
  await settle(first);
  const size = await first.locator("canvas").evaluate((canvas) => ({
    width: canvas.clientWidth, height: canvas.clientHeight,
    frameWidth: innerWidth, frameHeight: innerHeight,
  }));
  assert.equal(size.width, size.frameWidth);
  assert.equal(size.height, size.frameHeight);
  await page.screenshot({ path: "_build/browser/threejs-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("about:blank");
  await page.goBack();
  await page.waitForURL(url);
  await frames.nth(0).scrollIntoViewIfNeeded();
  await ready(frames.nth(0).contentFrame());
  assert.equal(await frames.count(), 2);
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings.filter((message) => /deprecated|removed|renamed/i.test(message)), []);
  await page.screenshot({ path: "_build/browser/threejs-desktop.png", fullPage: true });
  await writeFile(`_build/browser/results-r${installed.version.split(".")[1]}.json`, `${JSON.stringify({
    version: installed.version, headed, errors, warnings,
    passed: ["model", "animation", "pause", "orbit", "independent instances", "resize", "navigation"],
  }, null, 2)}\n`);
  console.log("Passed: model loading, animation, pause, orbit controls, independent instances, mobile resizing, navigation, and browser errors.");
} finally {
  clearTimeout(deadline);
  await browser.close();
  await fixture.close();
}
