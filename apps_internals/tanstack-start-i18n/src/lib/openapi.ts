import { createOpenAPI } from '@vx-oss/docs-openapi/server';

export const openapi = createOpenAPI({
  input: {
    openapi: './openapi.yaml',
  },
});
