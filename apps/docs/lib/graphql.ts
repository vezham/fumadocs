import { createGraphQL } from '@vx-oss/docs-graphql/server';
import path from 'node:path';

export const graphql = createGraphQL({
  input: [path.resolve('./store.graphql')],
});
