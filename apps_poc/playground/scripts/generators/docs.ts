import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';
import { openapi } from '@/src/lib/openapi';

const out = './content/docs/(api)';

async function main() {
  // wjdlz/NOTE: clean generated files/dir
  await rimraf(out, {
    filter(v) {
      return !v.endsWith('meta.json');
    },
  });

  // wjdlz/NOTE: gen files
  await OpenAPI.generateFiles({
    input: openapi,
    output: out,
  });
}

main();
