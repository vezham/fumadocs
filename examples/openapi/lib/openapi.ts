import { createOpenAPI } from '@vezham/docs-openapi/server';

export const openapi = createOpenAPI({
  // input files
  input: ['./openapi.yaml'],
});
