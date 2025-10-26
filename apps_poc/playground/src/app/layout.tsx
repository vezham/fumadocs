import type { ReactNode } from 'react';

import { defineConfig } from '@vx/start';
import './global.css';
import { i18n, translations } from '@/src/lib/i18n';

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => 
  defineConfig({
    children,
    i18n: {
      locale: i18n,
      translations: translations
    },
  })

export const metadata = {
  title: 'Home | Playground',
  description: 'App for Vezham Playground',
}