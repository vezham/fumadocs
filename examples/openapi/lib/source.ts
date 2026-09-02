import { loader } from '@vezham/docs-core/source';
import { openapi } from './openapi';
import { defineDocs } from '@vezham/docs-mdx/macro';

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
