import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import ja from './ja.json';
import ko from './ko.json';
import pt from './pt.json';
import ru from './ru.json';
import zh from './zh.json';


const browserLanguage = navigator.language.substring(0,2);




const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  ja: {
    translation: ja,
  },
  de: {
    translation: de,
  },
  zh: {
    translation: zh,
  },
  ko: {
    translation: ko,
  },
  pt: {
    translation: pt,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  supportedLngs: ["de", "en", "es", "fr", "ja", "ko", "pt", "ru", "zh"],
  fallbackLng: "en",
  lng: browserLanguage,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
