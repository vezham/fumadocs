import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const baseRoot = path.resolve(root, '../base-ui');
const distDir = path.join(root, 'dist');
const cssDir = path.join(root, 'css');
const basePackageName = '@vx-oss/docs-base-ui';
const defaultExports = new Set([
  './components/dialog/search-algolia',
  './components/dialog/search-default',
  './components/dialog/search-orama',
  './mdx',
]);

const basePackage = JSON.parse(await readFile(path.join(baseRoot, 'package.json'), 'utf8'));
const entries = Object.keys(basePackage.exports).filter(
  (subpath) =>
    subpath !== './package.json' &&
    subpath !== './style.css' &&
    subpath !== './css/*' &&
    !subpath.endsWith('.css'),
);

await rm(distDir, { force: true, recursive: true });
await rm(cssDir, { force: true, recursive: true });
await mkdir(distDir, { recursive: true });

for (const subpath of entries) {
  await writeWrapper(subpath, path.join(distDir, `${subpath.slice(2)}.js`));
  await writeWrapper(subpath, path.join(distDir, `${subpath.slice(2)}.d.ts`));
}

await writeWrapper('./mdx', path.join(distDir, 'mdx.server.js'));
await writeWrapper('./mdx', path.join(distDir, 'mdx.server.d.ts'));

await cp(path.join(baseRoot, 'css'), cssDir, { recursive: true });
await copyIfExists(
  path.join(baseRoot, 'dist/style.css'),
  path.join(distDir, 'style.css'),
  `@import '${basePackageName}/style.css';\n`,
);
await copyIfExists(
  path.join(baseRoot, 'dist/components/image-zoom2.css'),
  path.join(distDir, 'components/image-zoom2.css'),
  `@import '${basePackageName}/components/image-zoom2.css';\n`,
);

async function writeWrapper(subpath, outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const specifier = `${basePackageName}/${subpath.slice(2)}`;
  const lines = [`export * from '${specifier}';`];

  if (defaultExports.has(subpath)) {
    lines.push(`export { default } from '${specifier}';`);
  }

  await writeFile(outputPath, `${lines.join('\n')}\n`);
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
