import { loader } from '@vx-oss/docs-core/source';
import { defineDocs } from '@vx-oss/docs-mdx/macro';
import { lucideIconsPlugin } from '@vx-oss/docs-core/source/lucide-icons';

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
