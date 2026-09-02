'use client';
import { defaultShikiOptions } from '@/lib/shiki';
import { createOpenAPIPage } from '@vezham/docs-openapi/ui';

export const OpenAPIPage = createOpenAPIPage({
  shikiOptions: defaultShikiOptions,
});
