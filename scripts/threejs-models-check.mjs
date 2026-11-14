import assert from "node:assert/strict";
import { startThreejsFixture } from "./threejs-fixture.mjs";
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ headless: false });
const deadline = setTimeout(() => void browser.close(), 90000);
const fixture = await startThreejsFixture();
const url = fixture.url;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" || (message.type() === "warning" && /deprecated|removed|renamed/i.test(message.text()))) {
      errors.push(message.text());
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(url);
  await mkdir("_build/browser/r187-models", { recursive: true });
  const scenes = [
    ["inertial", "Migrated inertial animation", "2.5"],
    ["barycenter", "Migrated barycenter animation", "2.5"],
    ["primary", "Migrated primary-relative animation", "2.5"],
    ["relative", "Migrated relative animation", "1"],
  ];
  for (const [name, title, speed] of scenes) {
    const iframe = page.getByTitle(title, { exact: true });
    await iframe.scrollIntoViewIfNeeded();
    const frame = iframe.contentFrame();
    await frame.locator("canvas").waitFor();
    await frame.locator("#status").waitFor({ state: "hidden" });
    assert.equal(await frame.locator("html").getAttribute("data-three-revision"), "187");
    const input = frame.locator(".lil-controller.lil-number input");
    assert.equal(await input.inputValue(), speed);
    await input.fill("0");
    const label = frame.getByRole("checkbox");
    await label.uncheck();
    assert.equal(await label.isChecked(), false);
    await label.check();
    assert.equal(await label.isChecked(), true);
    await iframe.screenshot({ path: `_build/browser/r187-models/${name}.png` });
    console.log(`Passed migrated ${name}: model, default speed, label controls, screenshot`);
  }
  assert.deepEqual(errors, []);

  const source = await page.getByTitle("Migrated inertial animation", { exact: true }).getAttribute("src");
  const standalone = new URL(source, page.url()).href;
  // Exercise the two visible failure states without involving the book kernel.
  const unsupported = await browser.newPage();
  const escapedErrors = [];
  unsupported.on("pageerror", (error) => escapedErrors.push(error.message));
  await unsupported.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, options) {
      return type === "webgl2" ? null : original.call(this, type, options);
    };
  });
  await unsupported.goto(standalone);
  await unsupported.getByRole("status").filter({ hasText: "WebGL 2 is unavailable" }).waitFor();
  assert.deepEqual(escapedErrors, []);
  await unsupported.close();

  const missing = await browser.newPage();
  await missing.route("**/two-body-inertial.glb", (route) => route.abort());
  await missing.goto(standalone);
  await missing.getByRole("status").filter({ hasText: "Unable to load the animation" }).waitFor();
  await missing.close();
  console.log("Passed visible errors for unavailable WebGL 2 and failed model loading.");
} finally {
  clearTimeout(deadline);
  await browser.close();
  await fixture.close();
}
