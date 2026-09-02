import { loader } from '@vezham/docs-core/source';
import { defineDocs } from '@vezham/docs-mdx/macro';
import { graphql } from './graphql';

const docs = defineDocs({
  dir: 'content/docs',
});

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    graphql: await graphql.staticSource({
      // a route group, generated pages won't have a `/graphql` prefix in their URLs
      baseDir: '(graphql)',
      meta: true,
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [graphql.loaderPlugin()],
  },
);
