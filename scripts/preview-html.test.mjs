import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// Test the actual workflow step, without a checkout containing helper scripts.
const workflow = await readFile(new URL("../.github/workflows/pr-publish.yml", import.meta.url), "utf8");
const match = workflow.match(/<<'JS'\n([\s\S]*?)          JS(?:\n|$)/);
assert.ok(match, "Preview workflow must contain its indexing implementation");
const source = match[1].replace(/^          /gm, "");
const run = promisify(execFile);
async function preventPreviewIndexing(root) {
  await run(process.execPath, ["--input-type=module", "--eval", source, "-", root]);
}

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "preview-html-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test("marks nested preview pages, including standalone figures, without touching production", async (t) => {
  const root = await fixture(t);
  const preview = path.join(root, "preview");
  await mkdir(path.join(preview, "figures"), { recursive: true });
  const original = '<html><head><title>Book</title></head><body>Content</body></html>';
  await writeFile(path.join(root, "production.html"), original);
  await writeFile(path.join(preview, "index.html"), original);
  await writeFile(path.join(preview, "figures", "scene.html"), original.replace("<head>", "<HEAD lang='en'>"));
  await writeFile(path.join(preview, "data.json"), "{}");
  await preventPreviewIndexing(preview);
  for (const file of ["index.html", "figures/scene.html"]) {
    assert.match(await readFile(path.join(preview, file), "utf8"), /<head\b[^>]*>\n<meta name="robots" content="noindex, nofollow">/i);
  }
  assert.equal(await readFile(path.join(root, "production.html"), "utf8"), original);
  assert.equal(await readFile(path.join(preview, "data.json"), "utf8"), "{}");
});

test("refuses empty or malformed output", async (t) => {
  const root = await fixture(t);
  await assert.rejects(preventPreviewIndexing(root), /No preview HTML/);
  await writeFile(path.join(root, "index.html"), "<div>Not an HTML document</div>");
  await assert.rejects(preventPreviewIndexing(root), /Missing HTML document/);
});

test("marks figure documents with an omitted head tag", async (t) => {
  const root = await fixture(t);
  const figure = '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n'
    + '<title>Explore the five orbital elements</title>\n'
    + '<style>canvas{display:block}</style>\n<body><script type="module">'
    + 'console.log("figure");</script></body></html>';
  await writeFile(path.join(root, "combined.html"), figure);
  await preventPreviewIndexing(root);
  const updated = await readFile(path.join(root, "combined.html"), "utf8");
  assert.match(updated, /<html lang="en">\n<meta name="robots" content="noindex, nofollow">/);
  assert.equal(updated.replace('\n<meta name="robots" content="noindex, nofollow">', ""), figure);
});

test("refuses symlinks instead of modifying files outside the artifact", async (t) => {
  const root = await fixture(t);
  await mkdir(path.join(root, "preview"));
  const original = "<html><head></head></html>";
  await writeFile(path.join(root, "production.html"), original);
  await symlink(path.join(root, "production.html"), path.join(root, "preview", "index.html"));
  await assert.rejects(preventPreviewIndexing(path.join(root, "preview")), /Unexpected symlink/);
  assert.equal(await readFile(path.join(root, "production.html"), "utf8"), original);
});
