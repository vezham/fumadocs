import { dynamicLoader } from '@vx-oss/docs-core/source';
import { createPython } from '@vx-oss/docs-python';

const python = createPython({
  file: './httpx.json',
  // serve pages at the root of `/docs`, instead of grouped under `/docs/httpx`
  groupBy: 'none',
});

const pythonLoader = dynamicLoader(python.dynamicSource(), {
  baseUrl: '/docs',
  plugins: [python.loaderPlugin()],
});

export function getSource() {
  return pythonLoader.get();
}
