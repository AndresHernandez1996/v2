import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { LINKS } from '@/constants/links';
import {
  DEFAULT_LOCALE,
  getAlternateLocale,
  getLocaleFromPath,
  getLocalizedHomePath,
  normalizePathname,
} from '@/utils/paths';

export function MainSeo() {
  // Uses localized strings so metadata stays aligned with the active language.
  const { t, i18n } = useTranslation();
  // Resolves absolute URLs for canonical/OpenGraph tags in both dev and production.
  const siteUrl =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
    (typeof window !== 'undefined' ? window.location.origin : '');
  const currentPathname =
    typeof window !== 'undefined'
      ? normalizePathname(window.location.pathname)
      : '';
  const localeFromPath = getLocaleFromPath(currentPathname) ?? DEFAULT_LOCALE;
  const localizedPath = getLocalizedHomePath(localeFromPath);
  const alternateLocale = getAlternateLocale(localeFromPath);
  const alternatePath = getLocalizedHomePath(alternateLocale);
  const canonicalUrl = siteUrl ? `${siteUrl}${localizedPath}` : localizedPath;
  const alternateUrl = siteUrl ? `${siteUrl}${alternatePath}` : alternatePath;
  const xDefaultUrl = siteUrl
    ? `${siteUrl}${getLocalizedHomePath(DEFAULT_LOCALE)}`
    : getLocalizedHomePath(DEFAULT_LOCALE);
  const ogImageUrl = siteUrl ? `${siteUrl}/OG.webp` : '/OG.webp';
  const title = t('title');
  const description = t('subtitle');
  const ogLocale = localeFromPath === 'es' ? 'es_MX' : 'en_US';
  const ogAlternateLocale = localeFromPath === 'es' ? 'en_US' : 'es_MX';
  const siteName = 'Andres Hernandez';
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andres Hernandez',
    alternateName: 'Yayo',
    url: canonicalUrl,
    image: ogImageUrl,
    jobTitle: 'Frontend Engineer',
    sameAs: [
      LINKS.social.github,
      LINKS.social.linkedin,
      LINKS.social.x,
      LINKS.social.instagram,
    ],
  };
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: canonicalUrl,
    inLanguage: localeFromPath,
    description,
  };

  return (
    // Single source of truth for home-page SEO/social metadata.
    <Helmet
      htmlAttributes={{ lang: i18n.language }}
      title={`${title} | v2`}
      link={[
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
        {
          rel: 'alternate',
          hrefLang: localeFromPath,
          href: canonicalUrl,
        },
        {
          rel: 'alternate',
          hrefLang: alternateLocale,
          href: alternateUrl,
        },
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: xDefaultUrl,
        },
      ]}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `${title} | v2`,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:url',
          content: canonicalUrl,
        },
        {
          property: 'og:locale',
          content: ogLocale,
        },
        {
          property: 'og:locale:alternate',
          content: ogAlternateLocale,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          property: 'og:image:alt',
          content: title,
        },
        {
          name: 'twitter:title',
          content: `${title} | v2`,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: ogImageUrl,
        },
      ]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(personStructuredData),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(websiteStructuredData),
        },
      ]}
    />
  );
}
