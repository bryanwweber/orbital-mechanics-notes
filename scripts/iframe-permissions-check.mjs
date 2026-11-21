import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from '@playwright/test';

const useFirefox = process.argv.includes('--firefox');
const browser = await (useFirefox ? firefox : chromium).launch({ headless: false });
const base = process.env.BOOK_URL ?? 'http://localhost:3000';
const output = `_build/browser/iframe-permissions-${useFirefox ? 'firefox' : 'chrome'}`;
const routes = [
  ['/the-n-body-problem/two-body-inertial-numerical-solution', 3],
  ['/the-n-body-problem/two-body-relative-numerical-solution', 1],
  ['/the-n-body-problem/lagrange-points', 1],
  ['/classical-orbital-elements/classical-orbital-elements', 6],
  ['/the-orbit-equation/hyperbolic-trajectories', 1],
  ['/time-since-periapsis-and-keplers-equation/time-since-periapsis', 1],
  ['/time-since-periapsis-and-keplers-equation/elliptical-orbits', 1],
];
const report = [];
try {
  await mkdir(output, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const [route, count] of routes) {
    const warnings = [], errors = [];
    const onConsole = message => { if (/unsupported feature name.*autoplay/i.test(message.text())) warnings.push(message.text()); };
    const onError = error => errors.push(error.message);
    page.on('console', onConsole);
    page.on('pageerror', onError);
    try {
      const response = await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const frames = page.locator('iframe');
      assert.equal(await frames.count(), count, route);
      for (const iframe of await frames.all()) {
        await iframe.scrollIntoViewIfNeeded();
        assert.equal(await iframe.getAttribute('allow'), null);
        assert.ok(await iframe.getAttribute('title'), 'figure retains its accessible title');
        assert.ok(await iframe.evaluate(element => element.closest('figure')?.querySelector('figcaption')?.textContent?.trim()), 'figure retains its caption');
        const bounds = await iframe.boundingBox();
        assert.ok(bounds.width > 0 && bounds.height > 0, 'figure remains visible');
        await iframe.contentFrame().locator('body').waitFor();
      }
      assert.deepEqual(warnings, [], route);
      assert.deepEqual(errors, [], route);
      report.push({ route, frames: count, warnings, errors });
      console.log(`${route}: ${count} figures, no autoplay warning`);
    } finally {
      page.off('console', onConsole);
      page.off('pageerror', onError);
    }
  }
  await page.goto(new URL(routes[0][0], base).href, { waitUntil: 'networkidle' });
  await page.locator('iframe').first().screenshot({ path: `${output}/inertial.png` });
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
} finally { await browser.close(); }
