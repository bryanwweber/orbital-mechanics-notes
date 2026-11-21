import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AnimationMixer, Vector3 } from 'three';
import { ellipticOrbit, createTwoBodyScene } from './two-body-scenes.mjs';

test('Kepler propagation reproduces initial state, closes orbit, and conserves energy', () => {
  const mu = 6.67430e-20 * 5.97219e24;
  const orbit = ellipticOrbit([8000, 0, 6000], [0, 7, 0], mu);
  assert.ok(orbit.at(0).distanceTo(new Vector3(8000, 0, 6000)) < 1e-8);
  assert.ok(orbit.at(orbit.period).distanceTo(orbit.at(0)) < 1e-8);
  const energy = 49 / 2 - mu / 10000;
  for (const t of [0, 1000, orbit.period / 2, 10000]) {
    const dt = 0.01;
    const v = orbit.at(t + dt).sub(orbit.at(t - dt)).divideScalar(2 * dt);
    assert.ok(Math.abs(v.lengthSq() / 2 - mu / orbit.at(t).length() - energy) < 1e-7);
  }
});

test('animated reference frames preserve separation and center of mass', () => {
  const scenes = ['inertial', 'barycenter', 'primary'].map((preset) => {
    const result = createTwoBodyScene(preset);
    return { ...result, mixer: new AnimationMixer(result.scene) };
  });
  for (const item of scenes) item.mixer.clipAction(item.animations[0]).play();
  for (const time of [0, 5, 20, 40]) {
    const points = scenes.map(({ scene, mixer }) => {
      mixer.setTime(time);
      return ['Sphere', 'Sphere001', 'Sphere002'].map((name) => scene.getObjectByName(name).position.clone());
    });
    const separation = points[0][1].clone().sub(points[0][0]);
    for (const [first, second, center] of points) {
      assert.ok(second.clone().sub(first).distanceTo(separation) < 1e-5);
      assert.ok(first.clone().add(second).multiplyScalar(0.5).distanceTo(center) < 1e-5);
    }
    assert.ok(points[1][2].length() < 1e-8);
    assert.ok(points[2][0].length() < 1e-8);
  }
});
