import { useLayoutEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { initScrollReveal } from './lib/scrollReveal';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (isLoading) {
      return;
    }

    return initScrollReveal();
  }, [isLoading]);

  if (isLoading) {
    return <Loader finishLoading={() => setIsLoading(false)} />;
  }

  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: i18n.language }}
        title={`${t('title')} | v2`}
        meta={[
          {
            name: 'description',
            content: t('subtitle'),
          },
        ]}
      />
      <h1 data-sr="title">{t('title')}</h1>
      <p data-sr="text">{t('subtitle')}</p>
      <p data-sr="text">
        {t('language_label')}: {t('language_current', { lng: i18n.language })}
      </p>
      <div data-sr="actions">
        <button type="button" onClick={() => void i18n.changeLanguage('en')}>
          {t('language_switch_to_english')}
        </button>
        <button type="button" onClick={() => void i18n.changeLanguage('es')}>
          {t('language_switch_to_spanish')}
        </button>
      </div>
    </Layout>
  );
}
