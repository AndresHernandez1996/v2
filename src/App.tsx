import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loader finishLoading={() => setIsLoading(false)} />}
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
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <p>
          {t('language_label')}: {t('language_current', { lng: i18n.language })}
        </p>
        <button type="button" onClick={() => void i18n.changeLanguage('en')}>
          {t('language_switch_to_english')}
        </button>
        <button type="button" onClick={() => void i18n.changeLanguage('es')}>
          {t('language_switch_to_spanish')}
        </button>
      </Layout>
    </>
  );
}
