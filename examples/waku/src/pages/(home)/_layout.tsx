import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from '@vezham/docs-react/layouts/home';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
