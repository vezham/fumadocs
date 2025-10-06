import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/src/app/logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
  };
}
