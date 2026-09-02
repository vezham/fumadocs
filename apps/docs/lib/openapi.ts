import { createOpenAPI } from '@vx-oss/docs-openapi/server';
import path from 'node:path';

export const openapi = createOpenAPI({
  input: [path.resolve('./scalar.yaml')],
  proxyUrl: '/api/proxy',
});
