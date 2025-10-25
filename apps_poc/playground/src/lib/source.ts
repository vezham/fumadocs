import { createMDXSource } from 'fumadocs-mdx/runtime/next';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { openapiPlugin } from 'fumadocs-openapi/server';
import { docs, meta } from '@/.source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}