import { loader } from '@vx-oss/docs-core/source';
import { createAsyncAPI } from '@vx-oss/docs-asyncapi/server';
import { defineDocs } from '@vx-oss/docs-mdx/macro';

const docs = defineDocs({
  dir: 'content/docs',
});

export const asyncapi = createAsyncAPI({
  // input files
  input: ['./slack-rtm.yaml', './scalar.yaml'],
});

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    asyncapi: await asyncapi.staticSource({
      baseDir: 'asyncapi',
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [asyncapi.loaderPlugin()],
  },
);
