import type { BaseLayoutProps } from '@vezham/docs-react/layouts/shared';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: 'Waku',
      url: `/${locale}`,
    },
  };
}
