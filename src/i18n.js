import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from 'assets/locales/en.json'
import tw from 'assets/locales/tw.json'

const resources = {
  en: {
    translation: en,
  },
  tw: {
    translation: tw,
  },
}

i18n
  .use(Backend) // load translation using http
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 預設語言
    fallbackLng: 'en', // 如果當前切換的語言沒有對應的翻譯則使用這個語言
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
