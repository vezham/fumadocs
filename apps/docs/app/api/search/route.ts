import { source } from '@/lib/source';
import { flexsearchFromSource } from '@vx-oss/docs-core/search/flexsearch';

export const { GET } = flexsearchFromSource(source);
