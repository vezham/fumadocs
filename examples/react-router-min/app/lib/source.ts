import { loader } from '@vx-oss/docs-core/source';
import { defineDocs } from '@vx-oss/docs-mdx/macro';

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
