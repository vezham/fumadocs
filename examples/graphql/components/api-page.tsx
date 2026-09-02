'use client';
import { createGraphQLPage } from '@vx-oss/docs-graphql/ui';

export const GraphQLPage = createGraphQLPage({
  playground: {
    url: '/api/graphql',
  },
});
