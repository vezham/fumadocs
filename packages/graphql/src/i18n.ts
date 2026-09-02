import translationKeys from '@/.translations/keys.json';
import type { TranslationExtension } from '@vx-oss/docs-core/i18n';
import type { Translations } from '@/.translations';
import {
  type Translations as SharedTranslations,
  apiDocsTranslations,
} from '@vx-oss/docs-api/i18n';

export type { Translations };
export function graphqlTranslations(): TranslationExtension<
  keyof Translations | keyof SharedTranslations
> {
  const shared = apiDocsTranslations();
  return { keys: [...shared.keys, ...translationKeys] as never };
}
