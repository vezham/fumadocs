import type { BaseLayoutProps } from '@vx-oss/docs-react/layouts/shared';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: 'Waku',
      url: `/${locale}`,
    },
  };
}
