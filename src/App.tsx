import { Suspense } from 'react';
import { Layout } from './components/Layout/Layout';
import { Hero } from './components/sections/Hero/Hero';
import { NotFound } from './components/NotFound/NotFound';
import { MainSeo } from './components/SEO/MainSeo.tsx';
import { NotFoundSeo } from './components/SEO/NotFoundSeo';
import { lazyNamed } from './utils/lazyNamed';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLocation } from 'react-router-dom';

// Lazy-loaded sections keep the initial bundle focused on above-the-fold content.
const About = lazyNamed(
  () => import('./components/sections/About/About'),
  'About',
);
const Experience = lazyNamed(
  () => import('./components/sections/Experience/Experience'),
  'Experience',
);
const Work = lazyNamed(() => import('./components/sections/Work/Work'), 'Work');
const Contact = lazyNamed(
  () => import('./components/sections/Contact/Contact'),
  'Contact',
);

export default function App() {
  const location = useLocation();
  // Normalize trailing slashes to classify routes consistently.
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isNotFoundPath =
    normalizedPath !== '/' && normalizedPath !== '/index.html';

  if (isNotFoundPath) {
    return (
      <Layout>
        <NotFoundSeo />
        <NotFound />
      </Layout>
    );
  }

  return (
    <Layout>
      <MainSeo />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Work />
        <Contact />
      </Suspense>
      {/* Runtime analytics for production monitoring */}
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}
