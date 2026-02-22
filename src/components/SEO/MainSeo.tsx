import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export function MainSeo() {
  // Uses localized strings so metadata stays aligned with the active language.
  const { t, i18n } = useTranslation();
  // Resolves absolute URLs for canonical/OpenGraph tags in both dev and production.
  const siteUrl =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
    (typeof window !== 'undefined' ? window.location.origin : '');
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${siteUrl}${window.location.pathname}`
      : siteUrl;
  const ogImageUrl = siteUrl ? `${siteUrl}/OG.webp` : '/OG.webp';
  const title = t('title');
  const description = t('subtitle');

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
    />
  );
}
