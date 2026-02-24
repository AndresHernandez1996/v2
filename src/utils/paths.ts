export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function isRootHomePath(pathname: string): boolean {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === '/' || normalizedPath === '/index.html';
}

export function getLocaleFromPath(pathname: string): SupportedLocale | null {
  const normalizedPath = normalizePathname(pathname);
  const localeSegment = normalizedPath.split('/')[1];

  if (!localeSegment) {
    return null;
  }

  return SUPPORTED_LOCALES.includes(localeSegment as SupportedLocale)
    ? (localeSegment as SupportedLocale)
    : null;
}

export function getLocalizedHomePath(locale: SupportedLocale): string {
  return `/${locale}`;
}

export function resolveLocaleFromLanguage(
  language: string | null | undefined,
): SupportedLocale {
  return language?.startsWith('es') ? 'es' : 'en';
}

export function getAlternateLocale(locale: SupportedLocale): SupportedLocale {
  return locale === 'en' ? 'es' : 'en';
}

export function isHomePath(pathname: string): boolean {
  if (isRootHomePath(pathname)) {
    return true;
  }

  const normalizedPath = normalizePathname(pathname);
  const locale = getLocaleFromPath(normalizedPath);

  if (!locale) {
    return false;
  }

  return normalizedPath === getLocalizedHomePath(locale);
}

export function getSectionIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return null;
  }

  const sectionId = href.slice(hashIndex + 1).trim();
  return sectionId || null;
}

export function buildLocalizedSectionHref(
  locale: SupportedLocale,
  sectionId: string,
): string {
  return `${getLocalizedHomePath(locale)}#${sectionId}`;
}
