import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { es } from './locales/es';
import { getLocaleFromPath } from '@/utils/paths';

const initialLanguage =
  typeof window !== 'undefined'
    ? (getLocaleFromPath(window.location.pathname) ?? 'en')
    : 'en';

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
