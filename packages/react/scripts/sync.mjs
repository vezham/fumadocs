import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = path.resolve(root, '../vezham-ui');
const distDir = path.join(root, 'dist');
const cssDir = path.join(root, 'css');
const sourcePackageName = '@vx-oss/docs-vezham-ui';
const defaultExports = new Set([
  './components/dialog/search-algolia',
  './components/dialog/search-default',
  './components/dialog/search-orama',
  './mdx',
]);

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

if (sourcePackage.exports['.']) {
  await writeWrappers('.', sourcePackage.exports['.']);
}

for (const subpath of entries) {
  await writeWrappers(subpath, sourcePackage.exports[subpath]);
}

await cp(path.join(sourceRoot, 'css'), cssDir, { recursive: true });
await copyIfExists(
  path.join(sourceRoot, 'dist/style.css'),
  path.join(distDir, 'style.css'),
  `@import '${sourcePackageName}/style.css';\n`,
);
await copyIfExists(
  path.join(sourceRoot, 'dist/components/image-zoom2.css'),
  path.join(distDir, 'components/image-zoom2.css'),
  `@import '${sourcePackageName}/components/image-zoom2.css';\n`,
);
await copyIfExists(
  path.join(sourceRoot, 'dist/tailwind/typography.js'),
  path.join(distDir, 'tailwind/typography.js'),
  "export { default } from '@vx-oss/docs-tailwind/typography';\n",
);
await copyIfExists(
  path.join(sourceRoot, 'dist/tailwind/typography.d.ts'),
  path.join(distDir, 'tailwind/typography.d.ts'),
  "export { default } from '@vx-oss/docs-tailwind/typography';\n",
);

async function writeWrapper(subpath, outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const specifier =
    subpath === '.' ? sourcePackageName : `${sourcePackageName}/${subpath.slice(2)}`;
  const lines = [`export * from '${specifier}';`];

  if (defaultExports.has(subpath)) {
    lines.push(`export { default } from '${specifier}';`);
  }

  await writeFile(outputPath, `${lines.join('\n')}\n`);
}

async function writeWrappers(subpath, exportValue) {
  for (const target of getExportTargets(exportValue)) {
    await writeWrapper(subpath, path.join(root, target));
  }
}

function getExportTargets(exportValue) {
  if (typeof exportValue === 'string') return [exportValue];
  if (!exportValue || typeof exportValue !== 'object') return [];

  return Object.values(exportValue).flatMap(getExportTargets);
}

async function copyIfExists(from, to, fallback) {
  await mkdir(path.dirname(to), { recursive: true });

  try {
    await access(from);
    await cp(from, to);
  } catch {
    await writeFile(to, fallback);
  }
}
