import { defineConfig } from 'waku/config';
import { fumadocsMdx } from '@vx-oss/docs-mdx/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
      dedupe: ['waku'],
    },

    plugins: [tailwindcss(), fumadocsMdx()],
  },
});
