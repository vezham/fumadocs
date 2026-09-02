import type { BaseLayoutProps } from '@vx-oss/docs-react/layouts/shared';
import { i18n } from '@/lib/i18n';
import { zhTW } from '@vx-oss/docs-language/zh-tw';
import { uiTranslations } from '@vx-oss/docs-react/i18n';

export const translations = i18n.translations().extend(uiTranslations()).preset('cn', zhTW());

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: locale === 'cn' ? 'Chinese Docs' : 'English Docs',
      url: `/${locale}`,
    },
    githubUrl: 'https://github.com',
    links: [
      {
        type: 'main',
        text: locale === 'cn' ? '文檔' : 'Documentation',
        url: `/${locale}/docs`,
      },
    ],
  };
}
