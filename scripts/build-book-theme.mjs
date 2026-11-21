import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const digest = (value) => createHash('sha256').update(value).digest('hex');
const run = (command, args, cwd, env = process.env) => execFileSync(command, args, { cwd, env, stdio: 'inherit' });

export async function sourcePatches(directory) {
  return Promise.all((await readdir(directory)).filter(name => name.endsWith('.patch')).sort().map(async name => ({
    name, content: await readFile(path.join(directory, name), 'utf8'),
  })));
}

export function buildFingerprint({ source, patches, bunVersion, baseUrl, script }) {
  return digest(JSON.stringify({ source, patches, bunVersion, baseUrl, script }));
}

export function applySourcePatch(sourceRoot, filename) {
  // Never silently accept patch drift after an upstream update.
  run('patch', ['--batch', '--forward', '--fuzz=0', '-p1', '-i', filename], sourceRoot);
}

async function exists(filename) {
  try { await readFile(filename); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

export async function buildBookTheme() {
  if (!globalThis.Bun) throw new Error('Run this script with Bun: bun run build:theme');
  const patchesDirectory = path.join(root, 'patches/book-theme');
  const source = JSON.parse(await readFile(path.join(patchesDirectory, 'source.json'), 'utf8'));
  if (!/^[a-f0-9]{40}$/.test(source.revision) || !/^[a-f0-9]{64}$/.test(source.sha256)) {
    throw new Error('The theme source requires a full commit ID and archive SHA-256.');
  }
  const patches = await sourcePatches(patchesDirectory);
  const baseUrl = process.env.BASE_URL ?? '';
  const fingerprint = buildFingerprint({ source, patches, bunVersion: Bun.version, baseUrl, script: await readFile(fileURLToPath(import.meta.url), 'utf8') });
  const output = path.join(root, '_build/book-theme');
  const provenanceFile = path.join(output, 'provenance.json');
  if (await exists(provenanceFile)) {
    const provenance = JSON.parse(await readFile(provenanceFile, 'utf8'));
    if (provenance.fingerprint === fingerprint && await exists(path.join(output, 'template.yml'))) {
      console.log(`Using patched book theme ${source.revision.slice(0, 12)} (${fingerprint.slice(0, 12)}).`);
      return output;
    }
  }

  const cache = path.join(root, '_build/theme-source');
  await mkdir(cache, { recursive: true });
  const archive = path.join(cache, `${source.revision}.tar.gz`);
  if (!await exists(archive)) {
    const response = await fetch(source.archive, { headers: { 'User-Agent': 'orbital-mechanics-notes-theme-build' } });
    if (!response.ok) throw new Error(`Theme download failed: ${response.status} ${source.archive}`);
    const data = Buffer.from(await response.arrayBuffer());
    if (digest(data) !== source.sha256) throw new Error('Theme archive SHA-256 does not match source.json.');
    await writeFile(archive, data);
  }
  if (digest(await readFile(archive)) !== source.sha256) throw new Error('Cached theme archive SHA-256 does not match source.json.');

  const sourceRoot = path.join(cache, fingerprint);
  const patchedMarker = path.join(sourceRoot, '.orbital-patched');
  if (!await exists(patchedMarker)) {
    await mkdir(sourceRoot, { recursive: true });
    run('tar', ['-xzf', archive, '--strip-components=1', '-C', sourceRoot], root);
    for (const patch of patches) applySourcePatch(sourceRoot, path.join(patchesDirectory, patch.name));
    await writeFile(patchedMarker, fingerprint);
  }
  run('bun', ['install', '--frozen-lockfile'], sourceRoot);
  // Turbo builds all package dependencies before the book application.
  const env = { ...process.env, NODE_ENV: 'production', BASE_URL: baseUrl };
  run('bun', ['run', 'build', '--filter=@myst-theme/book...'], sourceRoot, env);
  const book = path.join(sourceRoot, 'themes/book');
  await mkdir(output, { recursive: true });
  await cp(path.join(book, 'build'), path.join(output, 'server'), { recursive: true, force: true });
  await cp(path.join(book, 'public'), path.join(output, 'public'), { recursive: true, force: true });
  run('bun', ['run', 'build:renderer'], book, env);
  await cp(path.join(book, 'build'), path.join(output, 'renderer'), { recursive: true, force: true });
  for (const name of ['template.yml', '.env.prod']) await cp(path.join(book, name), path.join(output, name));
  await cp(path.join(sourceRoot, 'LICENSE'), path.join(output, 'LICENSE'));
  await writeFile(path.join(output, 'package.json'), '{"type":"module"}\n');
  await writeFile(provenanceFile, JSON.stringify({
    source, fingerprint, bun: Bun.version, baseUrl,
    patches: patches.map(({ name, content }) => ({ name, sha256: digest(content) })),
  }, null, 2) + '\n');
  console.log(`Built patched book theme at ${path.relative(root, output)}.`);
  return output;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) await buildBookTheme();
