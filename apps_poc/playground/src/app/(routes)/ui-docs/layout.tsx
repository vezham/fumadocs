import { source } from '@/src/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/src/lib/layout-shared';

type Props = {
  children: ReactNode
}

export default ({ children }: Props) =>  (
    <DocsLayout {...baseOptions()} tree={source.pageTree} >
      {children}
    </DocsLayout>
  )
