import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { htmlFigureDirective } from "./htmlFigure.mjs";

const directory = "chapters/time-since-periapsis-and-keplers-equation";
const file = {
  path: path.resolve(directory, "elliptical-orbits.md"),
  fail(message) { throw new Error(message); },
};
const data = {
  arg: "assets/ellipse-area-animate.html",
  options: { label: "fig:ellipse-area-animate", title: "Stretching ellipse", placeholder: "assets/ellipse-area-animate.svg" },
  body: [{ type: "paragraph", children: [{ type: "text", value: "Caption" }] }],
};

test("preserves HTML and sibling SVG URLs without publishing Python", () => {
  const [figure] = htmlFigureDirective.run(data, file);
  const iframe = figure.children[0];
  assert.equal(iframe.src, `/${directory}/${data.arg}`);
  assert.equal(iframe.children[0].url, data.options.placeholder);
  assert.equal(figure.identifier, data.options.label);
  assert.deepEqual(figure.children[1].children, data.body);
  const published = path.join("_build/html-figures", directory, "assets");
  for (const name of ["ellipse-area-animate.html", "ellipse-area-animate.svg"]) {
    assert.equal(readFileSync(path.join(published, name), "utf8"), readFileSync(path.join(directory, "assets", name), "utf8"));
  }
  assert.equal(existsSync(path.join(published, "ellipse_area_animate.py")), false);
  const page = new URL("https://example.com/book/chapters/time-since-periapsis-and-keplers-equation/elliptical-orbits");
  const html = new URL(iframe.src, page);
  assert.equal(html.pathname, "/chapters/time-since-periapsis-and-keplers-equation/assets/ellipse-area-animate.html");
  assert.equal(new URL("ellipse-area-animate.svg", html).pathname, "/chapters/time-since-periapsis-and-keplers-equation/assets/ellipse-area-animate.svg");
});

test("iframe paths support trailing-slash routes and deployment prefixes", () => {
  const original = process.env.BASE_URL;
  try {
    for (const prefix of ["", "/book", "/book/"]) {
      process.env.BASE_URL = prefix;
      const [figure] = htmlFigureDirective.run(data, file);
      for (const slash of ["", "/"]) {
        const page = `https://example.com${prefix.replace(/\/$/, "")}/${directory}/elliptical-orbits${slash}`;
        assert.equal(new URL(figure.children[0].src, page).pathname,
          `${prefix.replace(/\/$/, "")}/${directory}/${data.arg}`);
      }
    }
  } finally {
    if (original === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = original;
  }
});

test("reports missing files and rejects paths outside the project", () => {
  assert.throws(() => htmlFigureDirective.run({ ...data, arg: "missing.html" }, file), /not found/);
  assert.throws(() => htmlFigureDirective.run({ ...data, arg: "../../../../outside.html" }, file), /inside the project/);
});

test("Three.js entry points load the shared bundle from preserved chapter paths", () => {
  const document = {
    ...file,
    path: path.resolve("chapters/the-n-body-problem/two-body-inertial-numerical-solution.md"),
  };
  for (const name of ["two-body-inertial", "two-body-inertial-cg-relative", "two-body-inertial-m1-relative", "two-body-relative"]) {
    const [figure] = htmlFigureDirective.run({ ...data, arg: `assets/${name}.html` }, document);
    const url = new URL(figure.children[0].src, "https://example.com/book/chapters/the-n-body-problem/two-body-inertial-numerical-solution");
    const html = readFileSync(path.join("_build/html-figures", url.pathname), "utf8");
    const imported = html.match(/from "([^"]+)"/)[1];
    assert.equal(new URL(imported, url).pathname, "/assets/js/orbital-three/orbital-three.js");
  }
});
