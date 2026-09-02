'use client';
import type { ReactNode } from 'react';
import { RootProvider } from '@vx-oss/docs-react/provider/waku';
import { i18nProvider, uiTranslations } from '@vx-oss/docs-react/i18n';
import { i18n } from '@/lib/i18n';
import { useRouter } from 'waku/router/client';
import { zhTW } from '@vx-oss/docs-language/zh-tw';

const translations = i18n.translations().extend(uiTranslations()).preset('cn', zhTW());

export function Provider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const lang = router.path.split('/')[1] ?? i18n.defaultLanguage;

  return <RootProvider i18n={i18nProvider(translations, lang)}>{children}</RootProvider>;
}
