import { allDocs, allMetas } from 'content-collections';
import { loader } from '@vx-oss/docs-core/source';
import { createMDXSource } from '@vx-oss/docs-content-collections';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(allDocs, allMetas),
});
