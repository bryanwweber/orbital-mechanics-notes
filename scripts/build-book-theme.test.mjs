import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { applySourcePatch, buildFingerprint, sourcePatches } from './build-book-theme.mjs';

test('theme cache changes with source, patches, Bun, deployment prefix, and build script', () => {
  const base = { source: 'revision', patches: [{ name: 'a.patch', content: 'before' }], bunVersion: '1', baseUrl: '', script: 'build' };
  for (const key of Object.keys(base)) {
    assert.notEqual(buildFingerprint(base), buildFingerprint({ ...base, [key]: 'changed' }), key);
  }
  assert.equal(buildFingerprint(base), buildFingerprint({ ...base }));
});

test('source patches are ordered and nonpatch files are ignored', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'orbital-theme-list-'));
  try {
    await writeFile(path.join(directory, '02-second.patch'), 'second');
    await writeFile(path.join(directory, '01-first.patch'), 'first');
    await writeFile(path.join(directory, 'source.json'), '{}');
    assert.deepEqual(await sourcePatches(directory), [{ name: '01-first.patch', content: 'first' }, { name: '02-second.patch', content: 'second' }]);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('iframe patch removes only media autoplay delegation and rejects upstream drift', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'orbital-theme-patch-'));
  const filename = path.join(directory, 'packages/myst-to-react/src/iframe.tsx');
  const patch = path.resolve('patches/book-theme/01-iframe-permissions.patch');
  try {
    await mkdir(path.dirname(filename), { recursive: true });
    const original = [
      '          src={node.src}', '          title={node.title}', '          allowFullScreen',
      '          allow="autoplay"', '          style={{', "            width: '100%',", "            height: '100%',", '',
    ].join('\n');
    await writeFile(filename, original);
    applySourcePatch(directory, patch);
    const result = await readFile(filename, 'utf8');
    assert.equal(result, original.replace('          allow="autoplay"\n', ''));
    assert.match(result, /allowFullScreen/);
    assert.throws(() => applySourcePatch(directory, patch));
  } finally { await rm(directory, { recursive: true, force: true }); }
});
