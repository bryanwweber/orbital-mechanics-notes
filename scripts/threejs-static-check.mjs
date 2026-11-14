import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { startThreejsFixture } from "./threejs-fixture.mjs";

const browser = await chromium.launch({ headless: false });
const fixture = await startThreejsFixture();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(fixture.url);
  const frame = page.locator("iframe").first().contentFrame();
  await frame.locator("canvas").waitFor();
  await frame.locator("#status").waitFor({ state: "hidden" });
  const placeholder = fixture.figures[0].children[0].children.find((node) => node.placeholder);
  const response = await page.request.get(new URL(placeholder.url, fixture.url).href);
  assert.ok(response.ok(), "static placeholder exists");
  assert.deepEqual(errors, []);
  console.log("Passed: directive-staged HTML, bundled JS, GLB, and placeholder load under /preview/ without MyST.");
} finally {
  await browser.close();
  await fixture.close();
}
