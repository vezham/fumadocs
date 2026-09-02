import { createFromSource } from '@vx-oss/docs-core/search/server';
import { source } from '@/lib/source';

export const { GET } = createFromSource(source);
