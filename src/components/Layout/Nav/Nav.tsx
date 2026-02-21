import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Isotipo } from '@/components/icons/Isotipo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { useAnimatedMount } from '@/hooks/useAnimatedMount';
import { useNavScrollState } from '@/hooks/useNavScrollState';
import { useViewportBreakpoint } from '@/hooks/useViewportBreakpoint';
import type { NavLink } from '@/types/navigation';
import { NAV_ANIMATION } from '@/utils/animations';
import { LINKS } from '@/constants/links';
import { MobileMenu } from './MobileMenu';
import styles from './Nav.module.scss';

type NavProps = {
  isHome?: boolean;
  onHomeClick?: () => void;
};

const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

const cx = (...values: Array<string | false>) =>
  values.filter(Boolean).join(' ');

export function Nav({ onHomeClick, isHome = false }: NavProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobileViewport = useViewportBreakpoint(MOBILE_MEDIA_QUERY);
  const { scrollDirection, scrolledToTop } = useNavScrollState({
    isLocked: isMenuOpen,
  });

  // Shared mount animation state (disabled later on mobile/reduced-motion paths).
  const { isMounted, prefersReducedMotion } = useAnimatedMount({
    delayMs: isHome && !isMobileViewport ? NAV_ANIMATION.mountDelayMs : 0,
  });
  const shouldAnimateNav = isHome && !prefersReducedMotion && !isMobileViewport;

  // Single link source used by desktop links and mobile menu.
  const links: NavLink[] = [
    { href: LINKS.navigation.sections.about, label: t('nav_about') },
    { href: LINKS.navigation.sections.experience, label: t('nav_experience') },
    { href: LINKS.navigation.sections.work, label: t('nav_work') },
    { href: LINKS.navigation.sections.contact, label: t('nav_contact') },
  ];

  const headerClassName = cx(
    styles.header,
    isMenuOpen && styles.headerMenuOpen,
    !scrolledToTop && styles.headerScrolled,
    !scrolledToTop && scrollDirection === 'up' && styles.headerUp,
    !scrolledToTop && scrollDirection === 'down' && styles.headerDown,
  );

  // Required by CSSTransition to avoid findDOMNode
  const brandRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Home uses callback flow (e.g., replay loader); non-home uses router navigation.
  const brandNode = isHome ? (
    <a
      className={styles.brand}
      href="/"
      aria-label={t('nav_go_to_hero')}
      onClick={(event) => {
        if (!onHomeClick) {
          return;
        }

        event.preventDefault();
        onHomeClick();
      }}
    >
      <div className={styles.logo} aria-hidden="true">
        <Isotipo className={styles.logoIcon} />
      </div>
    </a>
  ) : (
    <Link className={styles.brand} to="/" aria-label={t('nav_go_to_hero')}>
      <div className={styles.logo} aria-hidden="true">
        <Isotipo className={styles.logoIcon} />
      </div>
    </Link>
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
        {/* Mobile/reduced motion path: render immediately without mount transitions. */}
        {!shouldAnimateNav ? (
          <>
            <div className={styles.navItem}>{brandNode}</div>
            <div className={styles.navItem}>{actionsNode}</div>
          </>
        ) : (
          // Desktop path: stagger brand and actions for a simple nav entrance.
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
