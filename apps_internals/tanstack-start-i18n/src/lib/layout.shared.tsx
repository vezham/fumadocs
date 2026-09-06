import type { BaseLayoutProps } from '@vx-oss/docs-react/layouts/shared';
import { i18n } from '@/lib/i18n';

export function baseOptions(locale: string = i18n.defaultLanguage): BaseLayoutProps {
  return {
    nav: {
      title: `Tanstack Start ${locale}`,
    },
  };
}
