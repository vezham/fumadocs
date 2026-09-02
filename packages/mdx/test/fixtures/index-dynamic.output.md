```ts title="server.ts"
// @ts-nocheck
import { server } from '@vx-oss/docs-mdx/runtime/server';
import type * as Config from './config';

const create = server<typeof Config, import("@vx-oss/docs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    blogs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("@vx-oss/docs-mdx").ExtractedReference[];
    },
  }
}>();
```

```ts title="dynamic.ts"
// @ts-nocheck
import { dynamic } from '@vx-oss/docs-mdx/runtime/dynamic';
import path from 'node:path';
import * as Config from './config';

const create = await dynamic<typeof Config, import("@vx-oss/docs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    blogs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("@vx-oss/docs-mdx").ExtractedReference[];
    },
  }
}>(Config, {"environment":"dynamic","root":"","configPath":"packages/mdx/test/fixtures/config.ts","outDir":"packages/mdx/test/fixtures"});

export const docs = await create.doc("docs", "packages/mdx/test/fixtures/generate-index", [{ absolutePath: path.resolve("packages/mdx/test/fixtures/generate-index/index.mdx"), info: {"fullPath":"packages/mdx/test/fixtures/generate-index/index.mdx","path":"index.mdx"}, data: {}, hash: "b12f02f44f5ed3318104c095c455e5ee" }, { absolutePath: path.resolve("packages/mdx/test/fixtures/generate-index/folder/test.mdx"), info: {"fullPath":"packages/mdx/test/fixtures/generate-index/folder/test.mdx","path":"folder/test.mdx"}, data: {}, hash: "d41d8cd98f00b204e9800998ecf8427e" }]);

export const blogs = await create.doc("blogs", "packages/mdx/test/fixtures/generate-index", [{ absolutePath: path.resolve("packages/mdx/test/fixtures/generate-index/index.mdx"), info: {"fullPath":"packages/mdx/test/fixtures/generate-index/index.mdx","path":"index.mdx"}, data: {}, hash: "b12f02f44f5ed3318104c095c455e5ee" }, { absolutePath: path.resolve("packages/mdx/test/fixtures/generate-index/folder/test.mdx"), info: {"fullPath":"packages/mdx/test/fixtures/generate-index/folder/test.mdx","path":"folder/test.mdx"}, data: {}, hash: "d41d8cd98f00b204e9800998ecf8427e" }]);
```

```ts title="browser.ts"
// @ts-nocheck
import { browser } from '@vx-oss/docs-mdx/runtime/browser';
import type * as Config from './config';

const create = browser<typeof Config, import("@vx-oss/docs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    blogs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("@vx-oss/docs-mdx").ExtractedReference[];
    },
  }
}>();
const browserCollections = {
};
export default browserCollections;
```