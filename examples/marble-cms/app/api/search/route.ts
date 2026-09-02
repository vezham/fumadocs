import { source } from '@/lib/source';
import { createFromSource } from '@vezham/docs-core/search/server';

export const { GET } = createFromSource(source, {
  language: 'english',
});
