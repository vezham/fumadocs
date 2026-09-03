import { fileURLToPath } from 'node:url';
import versionPkg from '../../create-app-versions/package.json';
import * as corePkg from '../../core/package.json';
import * as mdxPkg from '../../mdx/package.json';
import * as basePkg from '../../base-ui/package.json';
import * as radixPkg from '../../radix-ui/package.json';
import * as reactPkg from '../../react/package.json';
import * as vezhamUiPkg from '../../vezham-ui/package.json';

export const sourceDir = fileURLToPath(new URL(`../`, import.meta.url).href);

export const isCI = Boolean(process.env.CI);

export interface TemplateInfo {
  value:
    | '+next+fuma-docs-mdx'
    | 'astro'
    | 'waku'
    | 'react-router'
    | 'react-router-spa'
    | 'tanstack-start'
    | 'tanstack-start-spa'
    | '+next+fuma-docs-mdx+static';
  label: string;
  appDir: string;
  /**
   * path to root provider, relative to `appDir``
   */
  rootProviderPath: string;
  hint?: string;
  /**
   * rename files when copying from template
   */
  rename?: (name: string) => string;
}

export const templates: TemplateInfo[] = [
  {
    value: '+next+fuma-docs-mdx',
    label: 'Next.js: Fumadocs MDX',
    hint: 'recommended: powerful and mature',
    appDir: '',
    rootProviderPath: 'app/layout.tsx',
  },
  {
    value: 'waku',
    label: 'Waku: Fumadocs MDX',
    hint: 'recommended: fast and simple',
    appDir: 'src',
    rootProviderPath: 'components/provider.tsx',
  },
  {
    value: '+next+fuma-docs-mdx+static',
    label: 'Next.js Static: Fumadocs MDX',
    appDir: '',
    rootProviderPath: 'components/provider.tsx',
  },
  {
    value: 'react-router',
    label: 'React Router: Fumadocs MDX (not RSC)',
    appDir: 'app',
    rootProviderPath: 'root.tsx',
  },
  {
    value: 'react-router-spa',
    label: 'React Router SPA: Fumadocs MDX (not RSC)',
    hint: 'SPA mode allows you to host the site statically, compatible with a CDN.',
    appDir: 'app',
    rootProviderPath: 'root.tsx',
  },
  {
    value: 'tanstack-start',
    label: 'Tanstack Start: Fumadocs MDX (not RSC)',
    appDir: 'src',
    rootProviderPath: 'routes/__root.tsx',
  },
  {
    value: 'tanstack-start-spa',
    label: 'Tanstack Start SPA: Fumadocs MDX (not RSC)',
    hint: 'SPA mode allows you to host the site statically, compatible with a CDN.',
    appDir: 'src',
    rootProviderPath: 'routes/__root.tsx',
  },
  {
    value: 'astro',
    label: 'Astro: React Islands',
    hint: 'partial support only, uses Astro Content Collections.',
    appDir: 'src',
    rootProviderPath: 'components/docs.tsx',
  },
];

const workspaces = [corePkg, mdxPkg, basePkg, radixPkg, reactPkg, vezhamUiPkg];

export const depVersions: Record<string, string> = { ...versionPkg.dependencies };

for (const workspace of workspaces) {
  depVersions[workspace.name] = workspace.version;
}

export function resolvePublicDependency(name: string, version: string): [string, string] {
  const realName = name.replace(/^@vezham\/docs-/, '@vx-oss/docs-');
  if (
    realName === '@vx-oss/docs-react' ||
    realName === '@vx-oss/docs-vezham-ui' ||
    realName === '@vx-oss/docs-base-ui' ||
    realName === '@vx-oss/docs-radix-ui'
  ) {
    return [realName, version];
  }

  const publicName = realName.replace(/^@vx-oss\/docs-/, '@vezham/docs-');

  if (realName === publicName) return [name, version];

  return [publicName, version.startsWith('npm:') ? version : `npm:${realName}@${version}`];
}
