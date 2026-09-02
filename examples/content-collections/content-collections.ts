import { defineCollection, defineConfig } from '@content-collections/core';
import { transformMDX } from '@vx-oss/docs-content-collections/configuration';
import { metaSchema, pageSchema } from '@vx-oss/docs-core/source/schema';

const docs = defineCollection({
  name: 'docs',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: pageSchema,
  transform: transformMDX,
});

const metas = defineCollection({
  name: 'meta',
  directory: 'content/docs',
  include: '**/meta.json',
  parser: 'json',
  schema: metaSchema,
});

export default defineConfig({
  collections: [docs, metas],
});
