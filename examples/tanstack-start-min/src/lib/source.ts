import { loader } from '@vezham/docs-core/source';
import { defineDocs } from '@vezham/docs-mdx/macro';
import { lucideIconsPlugin } from '@vezham/docs-core/source/lucide-icons';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: '/docs',
  plugins: [lucideIconsPlugin()],
});
