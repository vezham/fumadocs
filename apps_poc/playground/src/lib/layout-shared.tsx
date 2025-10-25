import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@components/logo';
import { i18n } from './i18n';

export const baseOptions = (): BaseLayoutProps => ({
    nav: {
      title: <Logo />,
    },
    links: [
      {
        text: 'UI/docs',
        url: '/ui-docs/overview',
        active: 'nested-url',
      },
      {
        text: 'UI/notebook',
        url: '/ui-notebook/overview',
        active: 'nested-url',
      },
    ],
    githubUrl: 'https://github.com',
    themeSwitch: {
      mode:'light-dark-system'
    },
    i18n
  })
