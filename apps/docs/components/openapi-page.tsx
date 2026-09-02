'use client';
import { defaultShikiOptions } from '@/lib/shiki';
import { createOpenAPIPage } from '@vx-oss/docs-openapi/ui';

export const OpenAPIPage = createOpenAPIPage({
  shikiOptions: defaultShikiOptions,
});
