'use client';
import type { ReactNode } from 'react';
import { RootProvider } from '@vezham/docs-react/provider/waku';

export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
