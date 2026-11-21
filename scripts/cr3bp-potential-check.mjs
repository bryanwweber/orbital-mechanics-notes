import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

// Test relative asset URLs under a deployment prefix, without changing chapters.
const assets = path.resolve('assets');
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname === '/favicon.ico') { response.writeHead(204).end(); return; }
    if (!pathname.startsWith('/preview/assets/')) throw new Error('Unknown route');
    const filename = path.resolve(assets, decodeURIComponent(pathname.slice('/preview/assets/'.length)));
    if (!filename.startsWith(`${assets}${path.sep}`)) throw new Error('Invalid asset');
    response.setHeader('Content-Type', { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png' }[path.extname(filename)] ?? 'application/octet-stream');
    response.end(await readFile(filename));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1000, height: 850 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(`http://127.0.0.1:${server.address().port}/preview/assets/cr3bp-potential.html`);
  await page.locator('[data-ready="true"]').waitFor();
  await page.waitForFunction(() => document.querySelector('canvas').clientWidth === document.querySelector('.potential-view').clientWidth);
  assert.ok(await page.evaluate(() => document.fonts.check('19px "Orbital KaTeX Main"') && document.fonts.check('19px "Orbital KaTeX Math"')), 'shared KaTeX fonts loaded');
  assert.match(await page.locator('.potential-point-label .potential-variable').first().evaluate(element => getComputedStyle(element).fontFamily), /Orbital KaTeX Math/);
  const plot = page.locator('canvas');
  const image = () => plot.screenshot();
  const initial = await image();
  await page.locator('summary').click();
  assert.equal(await page.locator('tbody tr').count(), 5);
  assert.equal(await page.locator('tbody tr').nth(3).locator('td').nth(2).textContent(), '-1.50000');
  const first = await page.locator('tbody').textContent();
  await page.locator('#mass-ratio').fill('0.001');
  assert.notEqual(await page.locator('tbody').textContent(), first);
  assert.notDeepEqual(await image(), initial, 'mass ratio changes the plotted surface');
  assert.equal(await page.locator('output').textContent(), '0.001');
  const massChanged = await image();
  await page.locator('#invert-potential').check();
  assert.equal(await page.locator('body').getAttribute('data-inverted'), 'true');
  assert.notDeepEqual(await image(), massChanged, 'inversion changes the plotted surface');
  await page.locator('#show-lagrange-labels').uncheck();
  assert.equal(await page.locator('.potential-point-label:visible').count(), 0);
  await page.locator('#reset-potential').click();
  assert.equal(await page.locator('tbody').textContent(), first);
  assert.equal(await page.locator('.potential-point-label:visible').count(), 5);
  assert.equal(await page.locator('body').getAttribute('data-inverted'), 'false');
  const resetImage = await image();
  await plot.focus();
  await page.keyboard.press('ArrowLeft');
  assert.notDeepEqual(await image(), resetImage, 'keyboard rotation changes the camera');
  await page.keyboard.press('+');
  const keyboardImage = await image();
  await page.keyboard.press('Home');
  assert.notDeepEqual(await image(), keyboardImage, 'Home restores the camera');
  const bounds = await plot.boundingBox();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 100, bounds.y + bounds.height / 2 + 40, { steps: 8 });
  await page.mouse.up();
  assert.notDeepEqual(await image(), resetImage, 'pointer drag rotates the camera');
  const dragImage = await image();
  await page.mouse.wheel(0, -200);
  assert.notDeepEqual(await image(), dragImage, 'wheel zoom changes the camera');
  await page.locator('#reset-potential').click();
  await page.locator('summary').click();
  await mkdir('_build/browser/cr3bp-potential', { recursive: true });
  await page.screenshot({ path: '_build/browser/cr3bp-potential/desktop.png', fullPage: true });
  if (process.argv.includes('--update-placeholder')) {
    await mkdir('assets/threejs-placeholders', { recursive: true });
    await writeFile('assets/threejs-placeholders/cr3bp-potential.png', await page.locator('.potential-view').screenshot());
  }
  await page.setViewportSize({ width: 360, height: 820 });
  await page.waitForFunction(() => document.querySelector('canvas').clientWidth === document.querySelector('.potential-view').clientWidth);
  await page.screenshot({ path: '_build/browser/cr3bp-potential/mobile.png', fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'figure fits a narrow viewport');
  if (process.env.BOOK_URL) {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(new URL('/the-n-body-problem/lagrange-points', process.env.BOOK_URL).href);
    const iframe = page.getByTitle('Explore the CR3BP pseudo-potential surface', { exact: true });
    await iframe.scrollIntoViewIfNeeded();
    const frame = iframe.contentFrame();
    await frame.locator('[data-ready="true"]').waitFor();
    assert.equal(await iframe.evaluate(element => element.closest('figure')?.id), 'fig-pseudo-potential-energy-cr3bp');
    assert.equal(await frame.locator('tbody tr').count(), 5);
    assert.ok(await frame.locator('body').evaluate(element => element.scrollHeight <= innerHeight), 'chapter controls fit the desktop iframe');
    await iframe.screenshot({ path: '_build/browser/cr3bp-potential/chapter-desktop.png' });
    await page.setViewportSize({ width: 390, height: 900 });
    await iframe.scrollIntoViewIfNeeded();
    await frame.locator('canvas').evaluate(async () => { await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
    assert.ok(await frame.locator('body').evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'chapter figure fits mobile width');
    assert.ok(await frame.locator('body').evaluate(element => element.scrollHeight <= innerHeight), 'chapter controls fit the mobile iframe');
    await iframe.screenshot({ path: '_build/browser/cr3bp-potential/chapter-mobile.png' });
  }
  const fallback = await browser.newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === 'webgl2' ? null : original.call(this, type, ...args);
    };
  });
  await fallback.goto(`http://127.0.0.1:${server.address().port}/preview/assets/cr3bp-potential.html`);
  await fallback.getByText(/coordinate table remains available/).waitFor();
  assert.equal(await fallback.locator('tbody tr').count(), 5, 'equilibrium data remains available without WebGL');
  assert.equal(await fallback.locator('#mass-ratio').isDisabled(), true);
  await fallback.close();
  assert.deepEqual(errors, []);
  console.log('Passed surface rendering, five-point table, mass ratio, inversion, label toggle, keyboard and pointer camera controls, reset, responsive layout, prefixed asset URLs, and the no-WebGL fallback in headed Chrome.');
} finally {
  await browser?.close();
  await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
}
