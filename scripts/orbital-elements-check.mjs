import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { Vector3 } from 'three';
import { chromium } from '@playwright/test';
import { elementGeometry } from '../assets-src/orbital-elements.mjs';

for (const preset of ['semimajor', 'eccentricity', 'inclination', 'raan', 'periapsis', 'combined']) {
  const g = elementGeometry(preset);
  assert.ok(Math.abs(g.ascending.z) < 1e-10);
  assert.ok(Math.abs(g.descending.z) < 1e-10);
  assert.ok(g.orbitPoint(g.nodeAngle + 0.001).z > 0, 'ascending crossing');
  assert.ok(Math.abs(g.periapsis.length() - 60) < 1e-10);
  assert.ok(Math.abs(g.normal.angleTo(new Vector3(0, 0, 1)) - Math.PI / 6) < 1e-10);
}
for (const degrees of [0, 1, 90, 179, 180]) {
  const g = elementGeometry('inclination', degrees);
  assert.ok(Math.abs(g.normal.angleTo(new Vector3(0, 0, 1)) - degrees * Math.PI / 180) < 1e-10);
  assert.ok(Math.abs(g.periapsis.dot(g.normal)) < 1e-9, 'periapsis stays in the orbital plane');
}
for (const degrees of [0, 90, 180, 270, 360]) {
  const g = elementGeometry('raan', 30, degrees);
  assert.ok(g.ascending.clone().normalize().distanceTo(new Vector3(Math.cos(degrees * Math.PI / 180), Math.sin(degrees * Math.PI / 180), 0)) < 1e-10,
    'ascending node matches the requested right ascension');
}
for (const degrees of [0, 90, 150, 180, 270, 360]) {
  const g = elementGeometry('periapsis', 30, undefined, degrees);
  const node = g.ascending.clone().normalize();
  const periapsis = g.periapsis.clone().normalize();
  const normal = g.normal.clone().normalize();
  assert.ok(Math.abs(node.dot(periapsis) - Math.cos(degrees * Math.PI / 180)) < 1e-10);
  assert.ok(Math.abs(node.clone().cross(periapsis).dot(normal) - Math.sin(degrees * Math.PI / 180)) < 1e-10);
  assert.ok(node.distanceTo(elementGeometry('periapsis').ascending.clone().normalize()) < 1e-10);
  assert.ok(normal.distanceTo(elementGeometry('periapsis').normal.clone().normalize()) < 1e-10);
}
for (const a of [50, 100, 150]) {
  const g = elementGeometry('semimajor', 30, undefined, undefined, a);
  assert.ok(g.periapsis.distanceTo(new Vector3(a * 0.6, 0, 0)) < 1e-9, 'periapsis on +X: both orientation angles are zero');
  assert.ok(g.ascending.distanceTo(g.periapsis) < 1e-9);
  const apocenter = g.orbitPoint(0);
  assert.ok(Math.abs(g.periapsis.distanceTo(apocenter) / 2 - a) < 1e-9);
  assert.ok(Math.abs(g.normal.angleTo(new Vector3(0, 0, 1)) - Math.PI / 6) < 1e-10);
}
for (const e of [0, 0.01, 0.4, 0.9, 0.99]) {
  const g = elementGeometry('eccentricity', 30, undefined, undefined, 100, e);
  const points = g.ellipsePoints();
  assert.ok(Math.abs(g.periapsis.length() - 100 * (1 - e)) < 1e-9);
  assert.ok(Math.abs(g.orbitPoint(0).length() - 100 * (1 + e)) < 1e-9);
  assert.ok(Math.abs(points[0].distanceTo(points[128]) - 200) < 1e-9, 'major axis remains fixed');
  assert.ok(Math.abs(points[64].distanceTo(points[192]) - 200 * Math.sqrt(1 - e ** 2)) < 1e-9, 'minor axis follows eccentricity');
  assert.ok(points.every((p) => p.toArray().every(Number.isFinite)));
}
const browser = await chromium.launch({ headless: false });
const deadline = setTimeout(() => void browser.close(), 90000);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(`${process.env.BOOK_URL ?? 'http://localhost:3000'}/classical-orbital-elements/classical-orbital-elements`);
  await mkdir('_build/browser/elements', { recursive: true });
  const frames = page.locator('iframe');
  await frames.nth(5).waitFor({ state: 'attached' });
  assert.equal(await frames.count(), 6);
  for (const [index, preset] of ['semimajor', 'eccentricity', 'inclination', 'raan', 'periapsis', 'combined'].entries()) {
    if (process.argv.includes('--combined-only') && preset !== 'combined') continue;
    const iframe = frames.nth(index);
    await iframe.scrollIntoViewIfNeeded();
    const frame = iframe.contentFrame();
    // A lazy frame can still be on about:blank after the iframe scrolls into view.
    await frame.locator(`body[data-preset="${preset}"]`).waitFor({ state: 'attached' });
    await frame.locator('#status').waitFor({ state: 'hidden' });
    assert.ok((await iframe.evaluate((e) => e.closest('figure').textContent)).trim());
    await iframe.screenshot({ path: `_build/browser/elements/${preset}.png` });
    if (process.argv.includes('--update-placeholders')) {
      await iframe.screenshot({ path: `assets/threejs-placeholders/elements-${preset}.png` });
    }
    const canvas = frame.locator('canvas');
    const beforeOrbit = await canvas.screenshot();
    const box = await canvas.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.6, { steps: 12 });
    await page.mouse.up();
    const afterOrbit = await canvas.screenshot();
    assert.ok(!afterOrbit.equals(beforeOrbit), `${preset}: dragging orbits the view`);
    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(200);
    let afterZoom = await canvas.screenshot();
    assert.ok(!afterZoom.equals(afterOrbit), `${preset}: wheel zooms the view`);
    if (preset === 'combined') {
      const cases = [
        ['Semi-major axis (relative units)', '100', ['50', '150']],
        ['Eccentricity', '0.4', ['0', '0.99']],
        ['Inclination', '30', ['0', '180']],
        ['Right ascension of the ascending node', '120', ['0', '360']],
        ['Argument of periapsis', '150', ['0', '360']],
      ];
      assert.equal(await frame.getByRole('slider').count(), 5);
      for (const [name, initial, endpoints] of cases) {
        const slider = frame.getByRole('slider', { name, exact: true });
        assert.equal(await slider.inputValue(), initial);
        for (const value of endpoints) {
          await slider.fill(value);
          assert.ok(!(await canvas.screenshot()).equals(afterZoom), `${name} changes the shared orbit`);
        }
        await slider.fill(initial);
        assert.ok((await canvas.screenshot()).equals(afterZoom), 'restoring a parameter preserves the camera and other parameters');
      }
      for (const [name, value] of [[cases[0][0], '150'], ['Eccentricity', '0.99'], ['Inclination', '135'], [cases[3][0], '270'], [cases[4][0], '300']]) {
        await frame.getByRole('slider', { name, exact: true }).fill(value);
      }
      await iframe.screenshot({ path: '_build/browser/elements/combined-settings.png' });
      await frame.getByRole('slider', { name: 'Eccentricity', exact: true }).fill('0');
      await frame.getByRole('slider', { name: 'Inclination', exact: true }).fill('0');
      assert.ok((await frame.locator('p[role="status"]').last().textContent()).includes('Circular orbit'));
      assert.ok((await frame.locator('p[role="status"]').last().textContent()).includes('Equatorial orbit'));
      assert.equal(await frame.getByText('Ascending Node', { exact: true }).isVisible(), false);
      assert.equal(await frame.getByText('periapsis', { exact: true }).isVisible(), false);
      for (const [name, initial] of cases) await frame.getByRole('slider', { name, exact: true }).fill(initial);
      const slider = frame.getByRole('slider', { name: 'Inclination', exact: true });
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '31');
      await slider.fill('30');
      afterZoom = await canvas.screenshot();
    } else if (preset === 'semimajor') {
      const slider = frame.getByRole('slider', { name: 'Semi-major axis (relative units)', exact: true });
      assert.equal(await slider.inputValue(), '100');
      for (const value of [50, 150, 100]) {
        await slider.fill(String(value));
        assert.equal(await frame.locator('output').textContent(), String(value));
        const updated = await canvas.screenshot();
        assert.ok(!updated.equals(afterZoom), `semi-major axis ${value} updates geometry`);
        afterZoom = updated;
      }
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '101');
      await slider.fill('100');
      afterZoom = await canvas.screenshot();
    } else if (preset === 'eccentricity') {
      const slider = frame.getByRole('slider', { name: 'Eccentricity', exact: true });
      assert.equal(await slider.inputValue(), '0.4');
      assert.equal(await slider.getAttribute('min'), '0');
      assert.equal(await slider.getAttribute('max'), '0.99');
      assert.equal(await slider.getAttribute('step'), '0.01');
      for (const value of [0, 0.01, 0.9, 0.99, 0.4]) {
        await slider.fill(String(value));
        assert.equal(await frame.locator('output').textContent(), value.toFixed(2));
        const updated = await canvas.screenshot();
        assert.ok(!updated.equals(afterZoom), `eccentricity ${value} updates geometry`);
        afterZoom = updated;
        if (value === 0) assert.equal(await frame.getByText('periapsis', { exact: true }).isVisible(), false);
        if (value === 0 || value === 0.99) {
          await iframe.screenshot({ path: `_build/browser/elements/eccentricity-${value}.png` });
        }
      }
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '0.41');
      await slider.fill('0.4');
      afterZoom = await canvas.screenshot();
    } else if (preset === 'inclination') {
      const slider = frame.getByRole('slider', { name: 'Inclination' });
      assert.equal(await slider.inputValue(), '30');
      for (const degrees of [0, 90, 180, 30]) {
        await slider.fill(String(degrees));
        assert.equal(await frame.locator('output').textContent(), `${degrees}°`);
        const updated = await canvas.screenshot();
        assert.ok(!updated.equals(afterZoom), `inclination ${degrees} updates geometry`);
        afterZoom = updated;
      }
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '31', 'slider supports keyboard adjustment');
      await slider.fill('30');
      afterZoom = await canvas.screenshot();
    } else if (preset === 'raan') {
      const slider = frame.getByRole('slider', { name: 'Right ascension of the ascending node', exact: true });
      assert.equal(await slider.inputValue(), '120');
      for (const degrees of [0, 90, 180, 270, 360, 120]) {
        await slider.fill(String(degrees));
        assert.equal(await frame.locator('output').textContent(), `${degrees}°`);
        const updated = await canvas.screenshot();
        assert.ok(!updated.equals(afterZoom), `right ascension ${degrees} updates geometry`);
        afterZoom = updated;
      }
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '121');
      await slider.fill('120');
      afterZoom = await canvas.screenshot();
    } else {
      const slider = frame.getByRole('slider', { name: 'Argument of periapsis', exact: true });
      assert.equal(await slider.inputValue(), '150');
      for (const degrees of [0, 90, 180, 270, 360, 150]) {
        await slider.fill(String(degrees));
        assert.equal(await frame.locator('output').textContent(), `${degrees}°`);
        const updated = await canvas.screenshot();
        assert.ok(!updated.equals(afterZoom), `argument of periapsis ${degrees} updates geometry`);
        afterZoom = updated;
      }
      await slider.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await slider.inputValue(), '151');
      await slider.fill('150');
      afterZoom = await canvas.screenshot();
    }
    await page.waitForTimeout(150);
    assert.ok((await canvas.screenshot()).equals(afterZoom), 'view stays still when idle');
    await page.setViewportSize({ width: 390, height: 844 });
    await iframe.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const size = await frame.locator('canvas').evaluate((c) => [c.clientWidth, innerWidth, c.clientHeight, innerHeight, c.parentElement.lastElementChild.offsetHeight]);
    assert.equal(size[0], size[1]);
    assert.equal(size[2], size[3] - size[4]);
    if (preset === 'combined') {
      assert.ok(size[2] > 300, 'combined mobile canvas has usable height');
      for (const slider of await frame.getByRole('slider').all()) {
        const bounds = await slider.boundingBox();
        assert.ok(bounds.width > 150, 'all five controls remain usable on mobile');
      }
    }
    await iframe.screenshot({ path: `_build/browser/elements/${preset}-mobile.png` });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  assert.deepEqual(errors, []);
  console.log(process.argv.includes('--combined-only')
    ? 'Passed combined figure, five slider endpoints, mixed settings, circular/equatorial cases, camera preservation, keyboard control, and mobile resizing.'
    : 'Passed orbital geometry, six rendered chapter figures, captions, assets, individual and combined slider endpoints and keyboard control, orbit controls, wheel zoom, idle rendering, and mobile resizing.');
} finally {
  clearTimeout(deadline);
  await browser.close();
}
