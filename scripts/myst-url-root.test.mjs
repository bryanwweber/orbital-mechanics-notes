import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const cli = path.resolve("node_modules/mystmd/dist/myst.cjs");
const template = path.resolve("_build/book-theme");

async function build({ urlRoot, folders = true, nestedConfig = true, mode = "toc", outside = false }) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "myst-url-root-"));
  try {
    await mkdir(path.join(directory, "content/section"), { recursive: true });
    await mkdir(path.join(directory, "config"));
    await writeFile(path.join(directory, "content/index.md"), "# Home\n");
    await writeFile(path.join(directory, "content/section/page.md"), "# Page\n\n[Other](other.md)\n");
    await writeFile(path.join(directory, "content/section/other.md"), "# Other\n");
    if (outside) await writeFile(path.join(directory, "outside.md"), "# Outside\n");
    const files = ["content/index.md", "content/section/page.md", "content/section/other.md"];
    if (outside) files.push("outside.md");
    const toc = mode === "toc" ? `  toc:\n${files.map((file) => `    - file: ${file}`).join("\n")}\n` : "";
    if (mode === "sphinx") {
      await writeFile(path.join(directory, "_toc.yml"), `root: content/index\nchapters:\n${files.slice(1).map((file) => `  - file: ${file}`).join("\n")}\n`);
    }
    const config = nestedConfig ? "config/myst.yml" : "myst.yml";
    await writeFile(path.join(directory, config), `version: 1\nproject:\n  title: URL root fixture\n${urlRoot === undefined ? "" : `  url_root: ${JSON.stringify(urlRoot)}\n`}${toc}site:\n  template: ${JSON.stringify(template)}\n  options:\n    folders: ${folders}\n`);
    const result = spawnSync(process.execPath, [cli, `--config=${config}`, "build", "--site", "--strict"], {
      cwd: directory, encoding: "utf8", timeout: 30000,
    });
    assert.ifError(result.error);
    const output = result.stdout + result.stderr;
    if (result.status !== 0) return { status: result.status, output };
    const manifest = JSON.parse(await readFile(path.join(directory, "_build/site/config.json"), "utf8"));
    const slugs = manifest.projects[0].pages.filter((page) => page.slug).map((page) => page.slug);
    const page = JSON.parse(await readFile(path.join(directory, "_build/site/content", `${slugs.find((slug) => slug.endsWith("page"))}.json`), "utf8"));
    return { status: result.status, output, slugs, page };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("url_root is relative to the project root, independent of config location", async () => {
  for (const nestedConfig of [false, true]) {
    const result = await build({ urlRoot: "content", nestedConfig });
    assert.equal(result.status, 0, result.output);
    assert.deepEqual(result.slugs, ["section.page", "section.other"]);
    assert.match(JSON.stringify(result.page), /section\/other/);
  }
});

test("omitting url_root preserves the original folder URLs", async () => {
  const result = await build({});
  assert.equal(result.status, 0, result.output);
  assert.deepEqual(result.slugs, ["content.section.page", "content.section.other"]);
});

test("folders: false continues to produce flat URLs", async () => {
  const result = await build({ urlRoot: "content", folders: false });
  assert.equal(result.status, 0, result.output);
  assert.deepEqual(result.slugs, ["page", "other"]);
});

test("url_root works with implicit and legacy Sphinx tables of contents", async () => {
  for (const mode of ["implicit", "sphinx"]) {
    const result = await build({ urlRoot: "content", mode });
    assert.equal(result.status, 0, result.output);
    assert.deepEqual(result.slugs.toSorted(), ["section.other", "section.page"]);
  }
});

test("invalid roots and pages outside the root fail the build", async () => {
  for (const urlRoot of [42, null, "", "missing", "content/index.md"]) {
    const result = await build({ urlRoot });
    assert.notEqual(result.status, 0, result.output);
    assert.match(result.output, /url_root/);
  }
  const result = await build({ urlRoot: "content", outside: true });
  assert.notEqual(result.status, 0, result.output);
  assert.match(result.output, /outside project\.url_root/);
});
