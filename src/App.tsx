import { useLayoutEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { MainContainer } from './components/Layout/MainContainer/MainContainer';
import { Loader } from './components/Loader/Loader';
import { Nav } from './components/Layout/Nav/Nav';
import { Hero } from './components/sections/Hero/Hero';
import { About } from './components/sections/About/About';
// import { Experience } from './components/sections/Experience/Experience';
// import { Work } from './components/sections/Work/Work';
// import { Contact } from './components/sections/Contact/Contact';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { initScrollReveal } from './lib/scrollReveal';

const ENABLE_INITIAL_LOADER = false;

export default function App() {
  // i18n data for content and document metadata
  const { t, i18n } = useTranslation();
  // Entry loader state (also enabled on browser reload)
  const [isLoading, setIsLoading] = useState(() => {
    if (!ENABLE_INITIAL_LOADER) {
      return false;
    }

    if (typeof window === 'undefined') {
      return false;
    }

    const [navigationEntry] = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];

    return navigationEntry?.type === 'reload';
  });

  // Home logo action: reset route/scroll and replay loader
  const handleHomeClick = () => {
    window.history.replaceState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'auto' });
    setIsLoading(true);
  };

  // Section reveal animations after loader completes
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
      {/* SEO and document-level metadata */}
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
      {/* Fixed navigation */}
      <Nav onHomeClick={handleHomeClick} />
      {/* Main SPA sections */}
      <MainContainer>
        <Hero />
        <About />
        {/* <Experience />
        <Work />
        <Contact /> */}
      </MainContainer>
    </Layout>
  );
}
