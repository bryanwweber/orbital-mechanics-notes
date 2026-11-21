// Resolve from either emitted module, including a deployment's URL prefix.
export const mathFont = 'Orbital KaTeX Math';
export const mainFont = 'Orbital KaTeX Main';
let ready;
export function loadMathFonts() {
  ready ??= Promise.all([
    [mainFont, 'KaTeX_Main-Regular.ttf'],
    [mathFont, 'KaTeX_Math-Italic.ttf'],
  ].map(async ([family, filename]) => {
    const url = new URL(`../../fonts/katex/${filename}`, import.meta.url);
    const face = new FontFace(family, `url("${url}")`);
    document.fonts.add(await face.load());
  }));
  return ready;
}

// Prose and numerals remain upright. Only mathematical variables use italics.
export function labelFont(text, size = 20) {
  const family = /^[XYZhaiω]$/.test(text) ? mathFont : mainFont;
  return `${size}px "${family}",serif`;
}

export function canvasLabel(context, text, x, y, draw = true) {
  const body = /^m([12])$/.exec(text);
  context.font = labelFont(body ? 'm' : text, 40);
  if (body) context.font = `40px "${mathFont}"`;
  const base = body ? 'm' : text;
  if (draw) context.fillText(base, x, y);
  let width = context.measureText(base).width;
  if (body) {
    context.font = `28px "${mainFont}"`;
    if (draw) context.fillText(body[1], x + width, y + 9);
    width += context.measureText(body[1]).width;
  }
  return width;
}

// SVG callers supply semantic pieces so dynamic updates retain their fonts.
export function setSvgMath(element, pieces) {
  element.replaceChildren(...pieces.map(([text, kind = 'normal']) => {
    const span = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    span.textContent = text;
    span.setAttribute('class', `math-${kind}`);
    return span;
  }));
}

// Preserve the source figure and its animation anchors while replacing the
// simple outlined MathJax labels in the interactive ellipse with KaTeX text.
export function replaceSvgMathPaths(svg) {
  for (const group of svg.querySelectorAll('g[data-mml-node="math"]')) {
    const match = /^([A-Za-z])(?:_([0-9]))?$/.exec(group.dataset.latex ?? '');
    if (!match) continue;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('font-size', '1000');
    text.setAttribute('stroke', 'none');
    const pieces = [[match[1], 'variable']];
    if (match[2]) pieces.push([match[2], 'sub']);
    setSvgMath(text, pieces);
    group.replaceChildren(text);
  }
}
