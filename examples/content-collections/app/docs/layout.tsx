import { source } from '@/lib/source';
import { DocsLayout } from '@vx-oss/docs-react/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
