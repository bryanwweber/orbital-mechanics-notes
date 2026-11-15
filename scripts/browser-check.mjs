import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const url = new URL(
  process.argv[2] ?? "/the-n-body-problem/two-body-inertial-numerical-solution",
  process.env.BOOK_URL ?? "http://localhost:3000",
).href;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  const failedRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push({ url: request.url(), error: request.failure()?.errorText });
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedRequests.push({ url: response.url(), status: response.status() });
    }
  });
  const response = await page.goto(url, { waitUntil: "load" });
  await page.locator("h1").first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  const webgl = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return { available: false };
    const result = { available: true, version: gl.getParameter(gl.VERSION) };
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return result;
  });
  await mkdir("_build/browser", { recursive: true });
  await page.screenshot({ path: "_build/browser/page.png", fullPage: true });
  console.log(JSON.stringify({
    url,
    status: response?.status(),
    heading: await page.locator("h1").first().innerText(),
    webgl,
    errors,
    failedRequests,
    screenshot: "_build/browser/page.png",
  }, null, 2));
  if (!response?.ok() || !webgl.available || errors.length || failedRequests.length) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
