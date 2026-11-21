import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { threejsDirective } from "./render3js.mjs";

const file = {
  path: path.resolve("chapters/the-n-body-problem/two-body-inertial-numerical-solution.md"),
  fail(message) { throw new Error(message); },
};
const data = {
  arg: "assets/two-body-inertial.html",
  options: { label: "fig:test", title: "Test animation", placeholder: "test.png" },
  body: [{ type: "paragraph", children: [{ type: "text", value: "Caption" }] }],
};

test("publishes document-relative HTML and preserves figure/export metadata", () => {
  const [figure] = threejsDirective.run(data, file);
  assert.equal(figure.identifier, "fig:test");
  const [iframe, caption] = figure.children;
  assert.match(iframe.src, /^\.\.\/\.\.\/threejs\/[a-f0-9]+\.html$/);
  assert.equal(iframe.title, "Test animation");
  assert.equal(iframe.children[0].placeholder, true);
  assert.equal(iframe.children[0].url, "test.png");
  assert.deepEqual(caption.children, data.body);
  assert.equal(
    readFileSync(path.join("_build/threejs", path.basename(iframe.src)), "utf8"),
    readFileSync("chapters/the-n-body-problem/assets/two-body-inertial.html", "utf8"),
  );
});

test("reports missing files and rejects non-HTML or paths outside the project", () => {
  assert.throws(() => threejsDirective.run({ ...data, arg: "missing.html" }, file), /not found/);
  for (const arg of ["../../../../outside.html", "assets/example.py"]) {
    assert.throws(() => threejsDirective.run({ ...data, arg }, file), /HTML file inside the project/);
  }
});
