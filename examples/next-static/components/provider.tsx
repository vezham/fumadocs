'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from '@vx-oss/docs-react/provider/next';
import { type ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider search={{ SearchDialog }}>{children}</RootProvider>;
}
