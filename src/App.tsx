import { Suspense, lazy, useEffect, useLayoutEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { MainContainer } from './components/Layout/MainContainer/MainContainer';
import { Loader } from './components/Loader/Loader';
import { Nav } from './components/Layout/Nav/Nav';
import { Hero } from './components/sections/Hero/Hero';
// import { Contact } from './components/sections/Contact/Contact';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { initScrollReveal } from './lib/scrollReveal';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ENABLE_INITIAL_LOADER } from './utils/animations';

const About = lazy(() =>
  import('./components/sections/About/About').then((module) => ({
    default: module.About,
  })),
);
const Experience = lazy(() =>
  import('./components/sections/Experience/Experience').then((module) => ({
    default: module.Experience,
  })),
);
const Work = lazy(() =>
  import('./components/sections/Work/Work').then((module) => ({
    default: module.Work,
  })),
);

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

  // After loader finishes, honor deep-link hashes like "/#about"
  // Retry briefly because sections are lazy-loaded.
  useEffect(() => {
    if (isLoading || typeof window === 'undefined' || !window.location.hash) {
      return;
    }

    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    let rafId = 0;
    let attempts = 0;
    const maxAttempts = 120;

    const tryScroll = () => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }

      if (attempts >= maxAttempts) {
        return;
      }

      attempts += 1;
      rafId = window.requestAnimationFrame(tryScroll);
    };

    rafId = window.requestAnimationFrame(tryScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
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
        <Suspense fallback={null}>
          <About />
          <Experience />
          <Work />
        </Suspense>
        {/*
        <Contact /> */}
      </MainContainer>
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}
