import { loader } from '@vezham/docs-core/source';
import { i18n } from '@/lib/i18n';
import { defineDocs } from '@vezham/docs-mdx/macro';

const docs = defineDocs({
  dir: 'content/docs',
});

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n,
});
