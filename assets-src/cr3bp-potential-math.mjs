// Same negative pseudo-potential (including its constant term) as the book.
export function pseudoPotential(x, y, mu = 0.3) {
  const r1 = Math.hypot(x + mu, y);
  const r2 = Math.hypot(x - 1 + mu, y);
  return -(1 - mu) / r1 - mu / r2
    - 0.5 * ((1 - mu) * r1 ** 2 + mu * r2 ** 2);
}

export function collinearResidual(x, mu = 0.3) {
  const a = x + mu, b = x - 1 + mu;
  return x - (1 - mu) * a / Math.abs(a) ** 3 - mu * b / Math.abs(b) ** 3;
}

function bisect(left, right, mu) {
  let leftValue = collinearResidual(left, mu);
  if (leftValue * collinearResidual(right, mu) > 0) throw new Error('Root must be bracketed');
  for (let iteration = 0; iteration < 80; iteration++) {
    const middle = (left + right) / 2;
    const value = collinearResidual(middle, mu);
    if (Math.abs(value) < 1e-13 || right - left < 1e-13) return middle;
    if (leftValue * value < 0) right = middle;
    else { left = middle; leftValue = value; }
  }
  return (left + right) / 2;
}

export function lagrangePoints(mu = 0.3) {
  if (!Number.isFinite(mu) || mu <= 0 || mu > 0.5) throw new RangeError('Mass ratio must be in (0, 0.5]');
  const gap = 1e-8;
  const coordinates = [
    [bisect(-mu + gap, 1 - mu - gap, mu), 0],
    [bisect(1 - mu + gap, 2, mu), 0],
    [bisect(-2, -mu - gap, mu), 0],
    [0.5 - mu, Math.sqrt(3) / 2],
    [0.5 - mu, -Math.sqrt(3) / 2],
  ];
  return coordinates.map(([x, y], index) => ({ name: `L${index + 1}`, x, y, u: pseudoPotential(x, y, mu) }));
}

export function surfaceHeight(u, inverted = false) {
  // Clip the singular wells at U = -3, as in the published figure.
  return (Math.max(-3, u) + 2.25) * (inverted ? -1 : 1);
}
