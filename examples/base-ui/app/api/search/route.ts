import { source } from '@/lib/source';
import { createFromSource } from '@vezham/docs-core/search/server';

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
