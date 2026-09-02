import translationKeys from '@/.translations/keys.json';
import type { TranslationExtension } from '@vezham/docs-core/i18n';
import type { Translations } from '@/.translations';
import {
  type Translations as SharedTranslations,
  apiDocsTranslations,
} from '@fumadocs/api-docs/i18n';

export type { Translations };
export function asyncapiTranslations(): TranslationExtension<
  keyof Translations | keyof SharedTranslations
> {
  const shared = apiDocsTranslations();
  return { keys: [...shared.keys, ...translationKeys] as never };
}
