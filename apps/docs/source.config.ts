import { defineConfig } from '@vx-oss/docs-mdx/config';
import jsonSchema from '@vx-oss/docs-mdx/plugins/json-schema';
import lastModified from '@vx-oss/docs-mdx/plugins/last-modified';

export default defineConfig({
  compiler: 'satteri',
  plugins: [
    jsonSchema({
      insert: true,
    }),
    lastModified(),
  ],
});
