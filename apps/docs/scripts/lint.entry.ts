import { postInstall } from '@vezham/docs-mdx/next';
import mdx from '@vezham/docs-mdx/rolldown';
import { unrun } from 'unrun';

process.env.LINT = '1';
await postInstall();
await unrun({
  path: './scripts/lint.ts',
  inputOptions: {
    plugins: [mdx(await import('../source.config.ts'))],
  },
});
