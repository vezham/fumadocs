import { defineDocs } from '@vx-oss/docs-mdx/macro';

export const docs = defineDocs({
  docs: {
    async mdxOptions() {
      return createOptions();
    },
  },
});

// Config evaluation must not execute consumers of the macro result.
export const source = docs.toFumadocsSource();

const _unused = () => {
  throw new Error('must not run during config evaluation');
};

function createOptions(unused: [] = []) {
  return { rehypePlugins: unused };
}
