import { loader } from '@vx-oss/docs-core/source';
import { defineDocs } from '@vx-oss/docs-mdx/macro';

const docs = defineDocs({
  dir: 'content/docs',
});

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});
