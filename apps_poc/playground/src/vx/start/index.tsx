import { i18n } from '@/src/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

type Props = {
  children: ReactNode
}

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    cn: {
      displayName: 'Chinese',
      toc: '目錄',
      search: '搜尋文檔',
      lastUpdate: '最後更新於',
      searchNoResult: '沒有結果',
      previousPage: '上一頁',
      nextPage: '下一頁',
      chooseLanguage: '選擇語言',
    },
  },
});

export const defineConfig = ({ children }: Props) => {
  const lang = 'en';
  
  return (
    <html lang="en" className={`${inter.className} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  )
}