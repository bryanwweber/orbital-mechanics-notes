import assert from 'node:assert/strict';
import test from 'node:test';
import { pseudoPotential, lagrangePoints, collinearResidual, surfaceHeight } from './cr3bp-potential-math.mjs';

test('potential retains the published negative convention and constant term', () => {
  assert.equal(pseudoPotential(0.2, Math.sqrt(3) / 2, 0.3), -1.5);
  const mu = 0.3, x = 0.6, y = -0.4;
  const canonical = -(1 - mu) / Math.hypot(x + mu, y) - mu / Math.hypot(x - 1 + mu, y) - (x * x + y * y) / 2;
  assert.ok(Math.abs(pseudoPotential(x, y, mu) - (canonical - mu * (1 - mu) / 2)) < 1e-14);
  assert.equal(pseudoPotential(-0.3, 0, 0.3), -Infinity);
  assert.equal(surfaceHeight(-Infinity), -0.75);
  assert.equal(surfaceHeight(-1.5, true), -0.75);
});

test('five Lagrange points are stationary throughout the mass-ratio control range', () => {
  for (const mu of [0.001, 0.012, 0.3, 0.499, 0.5]) {
    const points = lagrangePoints(mu);
    assert.equal(points.length, 5);
    assert.ok(-mu < points[0].x && points[0].x < 1 - mu);
    assert.ok(points[1].x > 1 - mu);
    assert.ok(points[2].x < -mu);
    for (const point of points.slice(0, 3)) assert.ok(Math.abs(collinearResidual(point.x, mu)) < 1e-10);
    for (const point of points) {
      const h = 1e-5;
      const dx = (pseudoPotential(point.x + h, point.y, mu) - pseudoPotential(point.x - h, point.y, mu)) / (2 * h);
      const dy = (pseudoPotential(point.x, point.y + h, mu) - pseudoPotential(point.x, point.y - h, mu)) / (2 * h);
      assert.ok(Math.hypot(dx, dy) < 1e-6, `${point.name} at mu=${mu} is stationary`);
    }
    assert.equal(points[3].u, -1.5);
    assert.equal(points[4].u, -1.5);
  }
});

test('equal masses place L1 at barycenter with symmetric outer points', () => {
  const [l1, l2, l3] = lagrangePoints(0.5);
  assert.ok(Math.abs(l1.x) < 1e-12);
  assert.ok(Math.abs(l2.x + l3.x) < 1e-12);
  assert.throws(() => lagrangePoints(0), RangeError);
  assert.throws(() => lagrangePoints(0.6), RangeError);
});
