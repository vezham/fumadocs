import { loader } from '@vx-oss/docs-core/source';
import * as icons from 'lucide-static';
import { defineDocs } from '@vx-oss/docs-mdx/macro';
import { i18n } from '@/lib/i18n';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
  },
});

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: '/docs',
  i18n,
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) return icons[icon as keyof typeof icons];
  },
});
