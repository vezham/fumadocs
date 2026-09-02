import { dynamicLoader } from '@vx-oss/docs-core/source';
import { obsidian } from '@vx-oss/docs-obsidian';

const vault = obsidian({
  dir: 'public/vault',
  url: (path) => `/vault/${path}`,
});

if (process.env.NODE_ENV === 'development') {
  void vault.devServer();
}

const vaultLoader = dynamicLoader(vault.dynamicSource(), {
  baseUrl: '/docs',
});

export function getSource() {
  return vaultLoader.get();
}
