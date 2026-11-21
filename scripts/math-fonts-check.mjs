import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

// --review-dir validates proposed protected HTML without modifying chapters.
const reviewIndex = process.argv.indexOf('--review-dir');
const review = reviewIndex < 0 ? undefined : path.resolve(process.argv[reviewIndex + 1]);
const root = process.cwd();
const prefix = '/font-check-preview/';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname.endsWith('/favicon.ico')) { response.writeHead(204).end(); return; }
    assert.ok(url.pathname.startsWith(prefix));
    const relative = decodeURIComponent(url.pathname.slice(prefix.length));
    const filename = path.resolve(root, relative);
    assert.ok(filename.startsWith(`${root}${path.sep}`));
    let bytes;
    if (review && relative.startsWith('chapters/') && relative.endsWith('.html')) {
      try { bytes = await readFile(path.resolve(review, relative)); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    bytes ??= await readFile(filename);
    response.setHeader('Content-Type', mime[path.extname(filename)] ?? 'application/octet-stream');
    response.end(bytes);
  } catch { response.writeHead(404).end(); }
});
await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
const base = `http://127.0.0.1:${server.address().port}${prefix}`;
const browser = await chromium.launch({ headless: false });
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  page.setDefaultTimeout(15000);
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (request.url().endsWith('.ttf')) requests.push(request.url()); });
  await page.addInitScript(() => {
    window.drawnLabels = [];
    const fillText = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function (text, x, y, ...rest) {
      window.drawnLabels.push({ text, x, y, font: this.font });
      return fillText.call(this, text, x, y, ...rest);
    };
  });
  await mkdir('_build/browser/math-fonts', { recursive: true });
  for (const preset of ['semimajor', 'eccentricity', 'inclination', 'raan', 'periapsis', 'combined']) {
    await page.goto(`${base}chapters/classical-orbital-elements/assets/${preset}.html`);
    await page.locator('#status').waitFor({ state: 'hidden' });
    assert.equal(await page.getByText('h', { exact: true }).evaluate(e => getComputedStyle(e).fontFamily), '"Orbital KaTeX Math", serif');
    assert.equal(await page.getByText('periapsis', { exact: true }).evaluate(e => getComputedStyle(e).fontFamily), '"Orbital KaTeX Main", serif');
    await page.getByRole('slider').first().fill(preset === 'eccentricity' ? '0.8' : '90');
    await page.screenshot({ path: `_build/browser/math-fonts/${preset}.png` });
    console.log(`KaTeX variables and upright prose: ${preset}`);
  }
  for (const [filename, bodies] of [['two-body-inertial.html', true], ['two-body-inertial-cg-relative.html', true], ['two-body-inertial-m1-relative.html', true], ['two-body-relative.html', false]]) {
    await page.goto(`${base}chapters/the-n-body-problem/assets/${filename}`);
    await page.locator('#status').waitFor({ state: 'hidden' });
    const labels = await page.evaluate(() => window.drawnLabels);
    if (bodies) {
      const variable = labels.find(label => label.text === 'm');
      const subscript = labels.find(label => label.text === '1');
      assert.ok(variable?.font.includes('Orbital KaTeX Math'));
      assert.ok(subscript?.font.includes('Orbital KaTeX Main'));
      assert.ok(subscript.y > variable.y, 'body indices are true subscripts');
      assert.ok(labels.some(label => label.text === 'COG' && label.font.includes('Orbital KaTeX Main')));
    } else {
      assert.ok(labels.some(label => label.text === 'Min. Altitude' && label.font.includes('Orbital KaTeX Main')));
    }
    await page.screenshot({ path: `_build/browser/math-fonts/${filename}.png` });
    console.log(`Loaded fonts before drawing canvas: ${filename}`);
  }
  const svgs = [
    ['the-n-body-problem', 'lagrange-points-animate.html'],
    ['the-orbit-equation', 'hyperbolic-trajectory-animation.html'],
    ['time-since-periapsis-and-keplers-equation', 'true-mean-eccentric-anomalies.html'],
    ['time-since-periapsis-and-keplers-equation', 'ellipse-area-animate.html'],
  ];
  for (const [chapter, filename] of svgs) {
    await page.goto(`${base}chapters/${chapter}/assets/${filename}`);
    const slider = page.getByRole('slider');
    await slider.waitFor();
    await page.waitForFunction(() => !document.querySelector('input[type="range"]').disabled);
    const patched = await page.locator('link[href$="math-fonts.css"]').count() > 0;
    assert.ok(patched, `KaTeX stylesheet is linked by ${filename}`);
    if (patched) {
      await page.evaluate(async () => {
        await document.fonts.load('20px "Orbital KaTeX Main"');
        await document.fonts.load('20px "Orbital KaTeX Math"');
        await document.fonts.ready;
      });
      await slider.fill(await slider.getAttribute('max'));
      const families = await page.locator('svg text, svg .math-variable, svg .math-sub').evaluateAll(elements => elements.map(e => ({ text: e.textContent, font: getComputedStyle(e).fontFamily })));
      assert.ok(families.every(label => label.font.includes('Orbital KaTeX')));
      if (filename !== 'true-mean-eccentric-anomalies.html') {
        assert.ok(families.some(label => label.font.includes('Orbital KaTeX Math')));
        assert.ok(families.some(label => label.font.includes('Orbital KaTeX Main')));
      }
      await page.screenshot({ path: `_build/browser/math-fonts/${filename}.png` });
      await page.setViewportSize({ width: 390, height: 600 });
      await page.screenshot({ path: `_build/browser/math-fonts/${filename}-mobile.png` });
      await page.setViewportSize({ width: 900, height: 700 });
      console.log(`SVG labels retain KaTeX fonts after slider updates: ${filename}`);
    } else console.log(`Protected HTML awaiting approved patch: ${filename}`);
  }
  assert.ok(requests.length > 0);
  assert.ok(requests.every(url => new URL(url).pathname.startsWith(`${prefix}assets/fonts/katex/`)), 'font URLs retain deployment prefixes');
  assert.deepEqual(errors, []);
  console.log('Passed font loading, semantic typography, canvas subscripts, SVG updates, and deployment-prefix asset loading in headed Chrome.');
} finally {
  await browser.close();
  await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
}
