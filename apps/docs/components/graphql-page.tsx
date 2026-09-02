'use client';
import { defaultShikiOptions } from '@/lib/shiki';
import { createGraphQLPage } from '@vx-oss/docs-graphql/ui';

export const GraphQLPage = createGraphQLPage({
  shikiOptions: defaultShikiOptions,
  playground: {
    url: '/api/graphql',
  },
});
