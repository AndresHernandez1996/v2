import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getLocaleFromPath,
  getLocalizedHomePath,
  resolveLocaleFromLanguage,
  type SupportedLocale,
} from '@/utils/paths';

export function useLocaleRouting() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocale = resolveLocaleFromLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  );
  const localeFromPath = getLocaleFromPath(location.pathname) ?? currentLocale;

  const switchLocale = (nextLocale: SupportedLocale) => {
    if (localeFromPath === nextLocale && currentLocale === nextLocale) {
      return;
    }

    navigate(`${getLocalizedHomePath(nextLocale)}${location.hash}`);
    void i18n.changeLanguage(nextLocale);
  };

  return {
    currentLocale,
    localeFromPath,
    switchLocale,
  };
}
