import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = path.resolve(root, '../vezham-ui');
const distDir = path.join(root, 'dist');
const cssDir = path.join(root, 'css');
const sourcePackageName = '@vx-oss/docs-vezham-ui';

const sourcePackage = JSON.parse(await readFile(path.join(sourceRoot, 'package.json'), 'utf8'));
const entries = Object.keys(sourcePackage.exports).filter(
  (subpath) =>
    subpath !== '.' &&
    subpath !== './package.json' &&
    subpath !== './style.css' &&
    subpath !== './css/*' &&
    !subpath.endsWith('.css'),
);

await rm(distDir, { force: true, recursive: true });
await rm(cssDir, { force: true, recursive: true });
await mkdir(distDir, { recursive: true });

await writeWrapper('.', path.join(distDir, 'index.js'));
await writeWrapper('.', path.join(distDir, 'index.d.ts'));

for (const subpath of entries) {
  await writeWrapper(subpath, path.join(distDir, `${subpath.slice(2)}.js`));
  await writeWrapper(subpath, path.join(distDir, `${subpath.slice(2)}.d.ts`));
}

await copyIfExists(
  path.join(sourceRoot, 'dist/style.css'),
  path.join(distDir, 'style.css'),
  `@import '${sourcePackageName}/style.css';\n`,
);

async function writeWrapper(subpath, outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const specifier =
    subpath === '.' ? sourcePackageName : `${sourcePackageName}/${subpath.slice(2)}`;
  const lines = [`export * from '${specifier}';`];

  await writeFile(outputPath, `${lines.join('\n')}\n`);
}

async function copyIfExists(from, to, fallback) {
  await mkdir(path.dirname(to), { recursive: true });

  try {
    await access(from);
    const content = await readFile(from, 'utf8');
    await writeFile(to, content);
  } catch {
    await writeFile(to, fallback);
  }
}
