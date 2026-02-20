import { Suspense, lazy, useEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { MainContainer } from './components/Layout/MainContainer/MainContainer';
import { Loader } from './components/Loader/Loader';
import { Nav } from './components/Layout/Nav/Nav';
import { Side } from './components/Layout/Side/Side';
import { Hero } from './components/sections/Hero/Hero';
import { NotFound } from './components/NotFound/NotFound';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
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
const Contact = lazy(() =>
  import('./components/sections/Contact/Contact').then((module) => ({
    default: module.Contact,
  })),
);

export default function App() {
  // i18n data for content and document metadata
  const { t, i18n } = useTranslation();
  const siteUrl =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
    (typeof window !== 'undefined' ? window.location.origin : '');
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${siteUrl}${window.location.pathname}`
      : siteUrl;
  const ogImageUrl = siteUrl ? `${siteUrl}/OG.webp` : '/OG.webp';
  const normalizedPath =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '') || '/'
      : '/';
  const isNotFoundPath =
    normalizedPath !== '/' && normalizedPath !== '/index.html';
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

  if (isNotFoundPath) {
    return (
      <Layout>
        <Helmet
          htmlAttributes={{ lang: i18n.language }}
          title={`404 | ${t('title')}`}
          meta={[
            {
              name: 'robots',
              content: 'noindex,nofollow',
            },
          ]}
        />
        <Nav onHomeClick={handleHomeClick} />
        <NotFound onGoHome={handleHomeClick} />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* SEO and document-level metadata */}
      <Helmet
        htmlAttributes={{ lang: i18n.language }}
        title={`${t('title')} | v2`}
        link={[
          {
            rel: 'canonical',
            href: canonicalUrl,
          },
        ]}
        meta={[
          {
            name: 'description',
            content: t('subtitle'),
          },
          {
            property: 'og:title',
            content: `${t('title')} | v2`,
          },
          {
            property: 'og:description',
            content: t('subtitle'),
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
            content: t('title'),
          },
          {
            name: 'twitter:title',
            content: `${t('title')} | v2`,
          },
          {
            name: 'twitter:description',
            content: t('subtitle'),
          },
          {
            name: 'twitter:image',
            content: ogImageUrl,
          },
        ]}
      />
      {/* Fixed navigation */}
      <Nav onHomeClick={handleHomeClick} />
      <Side />
      {/* Main SPA sections */}
      <MainContainer>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Experience />
          <Work />
          <Contact />
        </Suspense>
      </MainContainer>
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}
