import { useEffect, useState, type ReactNode } from 'react';
import { MainContainer } from '@/components/Layout/MainContainer/MainContainer';
import { Nav } from '@/components/Layout/Nav/Nav';
import { Side } from '@/components/Layout/Side/Side';
import { Loader } from '@/components/Loader/Loader';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  // Normalizes pathname so "/" and "/index.html" can be handled consistently upstream.
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isHome = normalizedPath === '/' || normalizedPath === '/index.html';

  // Global entry loader gate for home route.
  const [isLoading, setIsLoading] = useState(isHome); // For deactivation set to false, otherwise isHome to show loader on initial load.

  // Enforces secure defaults for external anchors rendered in sections/content.
  const handleExternalLinks = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach((link) => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    // Wait until loader ends before running post-load navigation/link adjustments.
    if (isLoading || typeof window === 'undefined') {
      return;
    }

    // If URL has hash (e.g. /#work), move focus/scroll to the target section.
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <div className={styles.layout}>
      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <MainContainer>
          <Nav isHome={isHome} />
          <Side isHome={isHome} />
          {children}
        </MainContainer>
      )}
    </div>
  );
}
