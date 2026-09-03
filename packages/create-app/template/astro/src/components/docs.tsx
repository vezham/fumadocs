import { DocsLayout } from '@vx-oss/docs-react/layouts/docs';
import { DocsPage, type DocsPageProps } from '@vx-oss/docs-react/layouts/docs/page';
import type { Root } from '@vezham/docs-core/page-tree';
import type { ReactNode } from 'react';
import { navigate } from 'astro:transitions/client';
import { RootProvider } from '@vx-oss/docs-react/provider/astro';
import type { AstroProviderProps } from '@vezham/docs-core/framework/astro';
import SearchDialog from './search';

export function Docs({
  tree,
  children,
  pathname,
  params,
  page,
}: {
  tree: Root;
  children: ReactNode;
  pathname: string;
  params: AstroProviderProps['params'];
  page?: DocsPageProps;
}) {
  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      theme={{ enabled: false }}
      search={{ SearchDialog }}
    >
      <DocsLayout
        tree={tree}
        themeSwitch={{
          enabled: false,
        }}
        nav={{
          title: 'Fumadocs on Astro',
        }}
      >
        <DocsPage {...page}>{children}</DocsPage>
      </DocsLayout>
    </RootProvider>
  );
}
