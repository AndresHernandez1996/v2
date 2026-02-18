import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Isotipo } from '@/components/icons/Isotipo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { useAnimatedMount } from '@/hooks/useAnimatedMount';
import type { NavLink } from '@/types/navigation';
import { NAV_ANIMATION } from '@/utils/animations';
import { MobileMenu } from './MobileMenu';
import styles from './Nav.module.scss';

type NavProps = {
  onHomeClick?: () => void;
};

export function Nav({ onHomeClick }: NavProps) {
  const { t } = useTranslation();
  // Viewport + header behavior state
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrolledToTop, setScrolledToTop] = useState(() =>
    typeof window === 'undefined' ? true : window.scrollY < 50,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Shared mount animation control (disabled on mobile / reduced motion)
  const { isMounted, prefersReducedMotion } = useAnimatedMount({
    delayMs: isMobileViewport ? 0 : NAV_ANIMATION.mountDelayMs,
  });
  const shouldAnimateNav = !prefersReducedMotion && !isMobileViewport;

  // Navigation links (desktop + mobile menu)
  const links: NavLink[] = [
    { href: '#about', label: t('nav_about') },
    { href: '#experience', label: t('nav_experience') },
    { href: '#work', label: t('nav_work') },
    { href: '#contact', label: t('nav_contact') },
  ];

  useEffect(() => {
    // Track mobile breakpoint to avoid initial nav animation glitches
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches);
    updateViewport();
    mobileQuery.addEventListener('change', updateViewport);

    return () => {
      mobileQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    // Hide/reveal header based on scroll direction when menu is closed
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (isMenuOpen) {
        return;
      }

      const current = window.scrollY;
      setScrolledToTop(current < 50);

      if (Math.abs(current - lastScrollY) < 6) {
        return;
      }

      setScrollDirection(current > lastScrollY ? 'down' : 'up');
      lastScrollY = current > 0 ? current : 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMenuOpen]);

  const headerClassName = [
    styles.header,
    isMenuOpen ? styles.headerMenuOpen : '',
    !scrolledToTop ? styles.headerScrolled : '',
    !scrolledToTop && scrollDirection === 'up' ? styles.headerUp : '',
    !scrolledToTop && scrollDirection === 'down' ? styles.headerDown : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Required by CSSTransition to avoid findDOMNode
  const brandRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const brandNode = (
    <a
      className={styles.brand}
      href="/"
      aria-label={t('nav_go_to_hero')}
      onClick={(event) => {
        event.preventDefault();
        onHomeClick?.();
      }}
    >
      <div className={styles.logo} aria-hidden="true">
        <Isotipo className={styles.logoIcon} />
      </div>
    </a>
  );

  const actionsNode = (
    <div className={styles.desktopActions}>
      <ul className={styles.links} aria-label={t('nav_links_label')}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <LanguageSwitcher />
    </div>
  );

  return (
    <header className={headerClassName}>
      <nav className={styles.nav} aria-label={t('nav_aria_main')}>
        {/* On mobile/reduced-motion: render immediately without transitions */}
        {!shouldAnimateNav ? (
          <>
            <div className={styles.navItem}>{brandNode}</div>
            <div className={styles.navItem}>{actionsNode}</div>
          </>
        ) : (
          // On desktop: staggered mount animation for brand and desktop actions
          <TransitionGroup component={null}>
            {isMounted ? (
              <CSSTransition
                key="brand"
                nodeRef={brandRef}
                timeout={NAV_ANIMATION.itemTimeoutMs}
                classNames={{
                  enter: styles.navFadeEnter,
                  enterActive: styles.navFadeEnterActive,
                  enterDone: styles.navFadeEnterDone,
                }}
              >
                <div
                  ref={brandRef}
                  className={styles.navItem}
                  style={
                    {
                      '--nav-stagger-delay': `${NAV_ANIMATION.staggerMs}ms`,
                    } as CSSProperties
                  }
                >
                  {brandNode}
                </div>
              </CSSTransition>
            ) : null}
            {isMounted ? (
              <CSSTransition
                key="actions"
                nodeRef={actionsRef}
                timeout={NAV_ANIMATION.itemTimeoutMs}
                classNames={{
                  enter: styles.navFadeEnter,
                  enterActive: styles.navFadeEnterActive,
                  enterDone: styles.navFadeEnterDone,
                }}
              >
                <div
                  ref={actionsRef}
                  className={styles.navItem}
                  style={
                    {
                      '--nav-stagger-delay': `${NAV_ANIMATION.staggerMs * 2}ms`,
                    } as CSSProperties
                  }
                >
                  {actionsNode}
                </div>
              </CSSTransition>
            ) : null}
          </TransitionGroup>
        )}

        <MobileMenu
          links={links}
          openLabel={t('nav_open_menu')}
          closeLabel={t('nav_close_menu')}
          panelLabel={t('nav_mobile_panel_label')}
          linksLabel={t('nav_links_label')}
          onMenuStateChange={setIsMenuOpen}
        />
      </nav>
    </header>
  );
}
