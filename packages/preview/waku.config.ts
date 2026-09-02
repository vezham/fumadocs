import { defineConfig } from 'waku/config';
import tailwindcss from '@tailwindcss/vite';
import { getConfig } from '@vx-oss/docs-vite';

export default defineConfig({
  distDir: 'dist/waku',
  vite: {
    resolve: {
      tsconfigPaths: true,
    },

    plugins: [
      tailwindcss(),
      {
        name: 'internal',
        config(_, env) {
          return getConfig({ root: process.cwd(), isBuild: env.command === 'build' });
        },
      },
    ],
  },
});
