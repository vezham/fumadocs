import { source } from '@/lib/source';
import { flexsearchFromSource } from '@vezham/docs-core/search/flexsearch';

export const { GET } = flexsearchFromSource(source);
