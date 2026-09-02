import { loader } from '@vx-oss/docs-core/source';
import { openapi } from './openapi';
import { defineDocs } from '@vx-oss/docs-mdx/macro';

const docs = defineDocs({
  dir: 'content/docs',
});

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      groupBy: 'tag',
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [openapi.loaderPlugin()],
  },
);
