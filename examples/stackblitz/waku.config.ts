import { defineConfig } from 'waku/config';
import { fumadocsMdx } from '@vezham/docs-mdx/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },

    plugins: [tailwindcss(), fumadocsMdx()],
  },
});
