import { getSource } from '@/lib/source';
import { createFromSource } from '@vx-oss/docs-core/search/server';

// the structured data of processed HTML pages is indexed automatically
export const { GET } = createFromSource(getSource, {
  language: 'english',
});
