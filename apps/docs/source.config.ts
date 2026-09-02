import { defineConfig } from '@vezham/docs-mdx/config';
import jsonSchema from '@vezham/docs-mdx/plugins/json-schema';
import lastModified from '@vezham/docs-mdx/plugins/last-modified';

export default defineConfig({
  compiler: 'satteri',
  plugins: [
    jsonSchema({
      insert: true,
    }),
    lastModified(),
  ],
});
