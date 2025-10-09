import type { ReactNode } from 'react';

import { defineConfig } from '@vx/start';
import './global.css';

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => 
  defineConfig({
    children
  })

export const metadata = {
  title: 'Home | Playground',
  description: 'App for Vezham Playground',
}