import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/src/lib/layout-shared';

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => (
    <HomeLayout {...baseOptions()}>
      {children}
    </HomeLayout>
  )
