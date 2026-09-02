'use client';
import { defaultShikiOptions } from '@/lib/shiki';
import { createAsyncAPIPage } from '@vx-oss/docs-asyncapi/ui';

export const AsyncAPIPage = createAsyncAPIPage({
  shikiOptions: defaultShikiOptions,
});
