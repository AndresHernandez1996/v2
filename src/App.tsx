import { Layout } from './components/Layout/Layout';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

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
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <p>
        {t('languageLabel')}: {t('currentLanguage', { lng: i18n.language })}
      </p>
      <button type="button" onClick={() => void i18n.changeLanguage('en')}>
        {t('switchToEnglish')}
      </button>
      <button type="button" onClick={() => void i18n.changeLanguage('es')}>
        {t('switchToSpanish')}
      </button>
    </Layout>
  );
}
