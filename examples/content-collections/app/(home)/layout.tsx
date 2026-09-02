import type { ReactNode } from 'react';
import { HomeLayout } from '@vezham/docs-react/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
