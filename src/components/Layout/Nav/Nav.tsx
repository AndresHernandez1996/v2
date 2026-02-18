import type { CSSProperties, ReactNode } from 'react';
import { createRef, useEffect, useMemo, useState } from 'react';
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

type NavAnimatedItemId = 'brand' | 'actions';

export function Nav({ onHomeClick }: NavProps) {
  const { t } = useTranslation();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrolledToTop, setScrolledToTop] = useState(() =>
    typeof window === 'undefined' ? true : window.scrollY < 50,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMounted, prefersReducedMotion } = useAnimatedMount({
    delayMs: NAV_ANIMATION.mountDelayMs,
  });

  const links: NavLink[] = [
    { href: '#about', label: t('nav_about') },
    { href: '#experience', label: t('nav_experience') },
    { href: '#work', label: t('nav_work') },
    { href: '#contact', label: t('nav_contact') },
  ];

  useEffect(() => {
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

  const animatedItems: Array<{ id: NavAnimatedItemId; node: ReactNode }> = [
    {
      id: 'brand',
      node: (
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
      ),
    },
    {
      id: 'actions',
      node: (
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
      ),
    },
  ];

  const nodeRefs = useMemo(
    () => ({
      brand: createRef<HTMLDivElement>(),
      actions: createRef<HTMLDivElement>(),
    }),
    [],
  );

  return (
    <header className={headerClassName}>
      <nav className={styles.nav} aria-label={t('nav_aria_main')}>
        {prefersReducedMotion ? (
          animatedItems.map((item) => (
            <div key={item.id} className={styles.navItem}>
              {item.node}
            </div>
          ))
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              animatedItems.map((item, index) => (
                <CSSTransition
                  key={item.id}
                  nodeRef={nodeRefs[item.id]}
                  timeout={NAV_ANIMATION.itemTimeoutMs}
                  classNames={{
                    enter: styles.navFadeEnter,
                    enterActive: styles.navFadeEnterActive,
                    enterDone: styles.navFadeEnterDone,
                  }}
                >
                  <div
                    ref={nodeRefs[item.id]}
                    className={styles.navItem}
                    style={
                      {
                        '--nav-stagger-delay': `${(index + 1) * NAV_ANIMATION.staggerMs}ms`,
                      } as CSSProperties
                    }
                  >
                    {item.node}
                  </div>
                </CSSTransition>
              ))}
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
