import {
  // useLayoutEffect,
  useState,
} from 'react';
import { Layout } from './components/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { Nav } from './components/Layout/Nav/Nav';
import { Hero } from './components/sections/Hero/Hero';
import { About } from './components/sections/About/About';
import { Experience } from './components/sections/Experience/Experience';
import { Work } from './components/sections/Work/Work';
import { Contact } from './components/sections/Contact/Contact';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
// import { initScrollReveal } from './lib/scrollReveal';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // useLayoutEffect(() => {
  //   if (isLoading) {
  //     return;
  //   }

  //   return initScrollReveal();
  // }, [isLoading]);

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
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
    </Layout>
  );
}
