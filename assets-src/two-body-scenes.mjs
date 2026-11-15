import {
  AnimationClip, BufferGeometry, Color, Group, Line, LineBasicMaterial, Mesh,
  MeshStandardMaterial, SphereGeometry, Vector3, VectorKeyframeTrack,
} from 'three';

// The numerical examples use km and seconds. Display in 100 km units, with
// textbook Z up mapped to Three.js Y up (the former Blender export convention).
const display = (v) => new Vector3(v.x, v.z, -v.y).multiplyScalar(0.01);
const TAU = 2 * Math.PI;

// Elliptic two-body propagation from the chapter's initial state. Solving
// Kepler's equation preserves the orbital plane and energy without time steps.
export function ellipticOrbit(position, velocity, mu) {
  const r = new Vector3(...position);
  const v = new Vector3(...velocity);
  const h = new Vector3().crossVectors(r, v);
  const eccentricity = new Vector3().crossVectors(v, h).divideScalar(mu)
    .sub(r.clone().normalize());
  const e = eccentricity.length();
  const a = 1 / (2 / r.length() - v.lengthSq() / mu);
  const p = eccentricity.clone().normalize();
  const q = new Vector3().crossVectors(h.clone().normalize(), p);
  const n = Math.sqrt(mu / a ** 3);
  const E0 = Math.atan2(r.dot(q) / Math.sqrt(1 - e * e), r.dot(p) + a * e);
  const M0 = E0 - e * Math.sin(E0);
  return {
    period: TAU / n,
    at(time) {
      const M = ((M0 + n * time + Math.PI) % TAU + TAU) % TAU - Math.PI;
      let E = M;
      for (let i = 0; i < 20; i++) {
        const step = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= step;
        if (Math.abs(step) < 1e-13) break;
      }
      return p.clone().multiplyScalar(a * (Math.cos(E) - e))
        .addScaledVector(q, a * Math.sqrt(1 - e * e) * Math.sin(E));
    },
  };
}

const blue = [0.0506345555, 0.0705931857, 0.8];
const green = [0.001051826, 0.1892855465, 0];
const white = [0.8, 0.8, 0.8];
const color = (rgb) => new Color().setRGB(...rgb);

export function createTwoBodyScene(preset) {
  const scene = new Group();
  const tracks = [];
  const relative = preset === 'relative';
  const orbit = relative
    ? ellipticOrbit([8000, 0, 6000], [0, 7, 0], 6.67430e-20 * 5.97219e24)
    : ellipticOrbit([3000, 0, 0], [-10, 20, -30], 2 * 6.67430e6);
  const physicalDuration = relative ? orbit.period : 480;
  const duration = relative ? 4.1291666667 : 41.6666666667;
  const count = 1000;
  const times = Array.from({ length: count + 1 }, (_, i) => duration * i / count);
  function body(name, radius, rgb, at, path = true) {
    const mesh = new Mesh(new SphereGeometry(radius, 32, 24),
      new MeshStandardMaterial({ color: color(rgb), roughness: 0.4 }));
    mesh.name = name;
    mesh.position.copy(at(0));
    scene.add(mesh);
    const points = times.map((_, i) => at(physicalDuration * i / count));
    tracks.push(new VectorKeyframeTrack(`${name}.position`, times, points.flatMap((p) => p.toArray())));
    if (path) scene.add(new Line(new BufferGeometry().setFromPoints(points),
      new LineBasicMaterial({ color: color(rgb) })));
    return mesh;
  }
  if (relative) {
    body('satellite', 1.5, [0.5, 0.5, 0.5], (t) => display(orbit.at(t)));
    body('earth', 63.7812, [0.1, 0.1, 0.8], () => new Vector3(), false);
    const equator = Array.from({ length: 257 }, (_, i) =>
      new Vector3(63.88 * Math.cos(TAU * i / 256), 0, 63.88 * Math.sin(TAU * i / 256)));
    scene.add(new Line(new BufferGeometry().setFromPoints(equator), new LineBasicMaterial({ color: 0xff0000 })));
    for (const [name, t, rgb] of [['min-altitude', 0, [1, 0, 0]], ['max-altitude', orbit.period / 2, [0, 1, 0]]]) {
      body(name, 1, rgb, () => display(orbit.at(t)), false);
    }
  } else {
    function positions(t) {
      const r = orbit.at(t);
      const center = new Vector3(1500 + 5 * t, 30 * t, 15 * t);
      const first = center.clone().addScaledVector(r, -0.5);
      const second = center.clone().addScaledVector(r, 0.5);
      const origin = preset === 'barycenter' ? center.clone() : preset === 'primary' ? first.clone() : new Vector3();
      return [first, second, center].map((v) => display(v.sub(origin)));
    }
    body('Sphere', 1, blue, (t) => positions(t)[0], preset !== 'primary');
    body('Sphere001', 1, white, (t) => positions(t)[1]);
    const center = body('Sphere002', 1, green, (t) => positions(t)[2], preset !== 'barycenter');
    center.scale.setScalar(0.5);
  }
  return { scene, animations: [new AnimationClip('two-body-motion', duration, tracks)] };
}
