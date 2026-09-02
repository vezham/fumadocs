import { createAsyncAPI } from '@vx-oss/docs-asyncapi/server';
import path from 'node:path';

export const asyncapi = createAsyncAPI({
  input: [path.resolve('./scalar-asyncapi.yaml')],
});
