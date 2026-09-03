import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = path.join(root, 'dist');

await rm(distDir, { force: true, recursive: true });
await mkdir(distDir, { recursive: true });

const entry = await readFile(path.join(root, 'src/index.ts'), 'utf8');
const styles = await readFile(path.join(root, 'src/style.css'), 'utf8');

await writeFile(path.join(distDir, 'index.js'), entry);
await writeFile(path.join(distDir, 'index.d.ts'), entry);
await writeFile(path.join(distDir, 'style.css'), styles);
