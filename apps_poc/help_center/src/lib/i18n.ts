import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'cn'],
});


export const translations = {
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
  }