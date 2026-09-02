import { source } from '@/lib/source';
import { createFromSource } from '@vx-oss/docs-core/search/server';

export const { GET } = createFromSource(source, {
  language: 'english',
});
