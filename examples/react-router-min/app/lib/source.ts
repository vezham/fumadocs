import { loader } from '@vezham/docs-core/source';
import { defineDocs } from '@vezham/docs-mdx/macro';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
  },
});

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: '/docs',
});
