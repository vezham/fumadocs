import { getSource } from '@/lib/source';
import { createFromSource } from '@vezham/docs-core/search/server';

export const { GET } = createFromSource(getSource);
