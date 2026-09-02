import { asyncapiTranslations } from '@vx-oss/docs-asyncapi/i18n';
import { storyTranslations } from '@vx-oss/docs-story/i18n';
import { defineI18n } from '@vx-oss/docs-core/i18n';
import { openapiTranslations } from '@vx-oss/docs-openapi/i18n';
import { uiTranslations } from '@vx-oss/docs-react/i18n';
import { zhTW } from '../src/zh-tw';

const i18n = defineI18n({
  languages: ['en', 'cn'],
  defaultLanguage: 'en',
});

const t1 = i18n
  .translations()
  .extend(uiTranslations())
  .extend(openapiTranslations())
  .preset('cn', zhTW());

const t2 = i18n
  .translations()
  .extend(uiTranslations())
  .extend(openapiTranslations())
  .extend(asyncapiTranslations())
  .extend(storyTranslations())
  .preset('cn', zhTW());

console.log(t1, t2);
