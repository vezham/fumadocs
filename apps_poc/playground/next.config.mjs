import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // output: 'export', //  "standalone" | "export" // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  reactStrictMode: true,
  images:{
    remotePatterns: [new URL('https://static.cdn.vezham.com/**'), new URL('https://mdg.imgix.net/assets/images/tux.png?auto=format&fit=clip&q=40&w=100'), new URL('https://mdg.imgix.net/assets/images/**')],
  }
};

export default withMDX(config);
