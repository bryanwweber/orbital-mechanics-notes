import assert from "node:assert/strict";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Run only on the downloaded preview artifact, never on the production build.
export async function preventPreviewIndexing(root) {
  let count = 0;
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      assert.ok(!entry.isSymbolicLink(), `Unexpected symlink in preview: ${file}`);
      if (entry.isDirectory()) {
        await visit(file);
      } else if (/\.html?$/i.test(entry.name)) {
        const html = await readFile(file, "utf8");
        assert.match(html, /<head\b[^>]*>/i, `Missing HTML head: ${file}`);
        const updated = html.replace(/<head\b[^>]*>/i,
          '$&\n<meta name="robots" content="noindex, nofollow">');
        await writeFile(file, updated);
        count += 1;
      }
    }
  }
  await visit(root);
  assert.ok(count > 0, "No preview HTML found");
  return count;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  assert.ok(process.argv[2], "Usage: node scripts/preview-html.mjs <preview-directory>");
  console.log(`Prevented indexing of ${await preventPreviewIndexing(process.argv[2])} preview pages.`);
}
