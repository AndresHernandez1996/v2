import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export function NotFoundSeo() {
  // Keeps 404 metadata localized and explicit for crawlers.
  const { t, i18n } = useTranslation();

  return (
    <Helmet
      htmlAttributes={{ lang: i18n.language }}
      title={`404 | ${t('title')}`}
      meta={[
        // Prevent indexing of not-found routes.
        {
          name: 'robots',
          content: 'noindex,nofollow',
        },
      ]}
    />
  );
}
