import { getSource } from '@/lib/source';
import { createFromSource } from '@vx-oss/docs-core/search/server';

export const { GET } = createFromSource(getSource);
