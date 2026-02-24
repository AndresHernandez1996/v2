import type { MouseEvent as ReactMouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { BREAKPOINTS } from '@/constants/breakpoints';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useLocaleRouting } from '@/hooks/useLocaleRouting';
import { useMenuFocusTrap } from '@/hooks/useMenuFocusTrap';
import type { NavLink } from '@/types/navigation';
import {
  getSectionIdFromHref,
  isHomePath,
  normalizePathname,
} from '@/utils/paths';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
  links: NavLink[];
  openLabel: string;
  closeLabel: string;
  panelLabel: string;
  linksLabel: string;
  onMenuStateChange?: (isOpen: boolean) => void;
};

export function MobileMenu({
  links,
  openLabel,
  closeLabel,
  panelLabel,
  linksLabel,
  onMenuStateChange,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const { currentLocale, localeFromPath, switchLocale } = useLocaleRouting();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const pendingSectionIdRef = useRef<string | null>(null);
  const scrollRetryTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onMenuStateChange?.(isOpen);
  }, [isOpen, onMenuStateChange]);

  useBodyScrollLock(isOpen, { className: 'mobile-menu-open' });
  useMenuFocusTrap({
    isOpen,
    triggerRef: buttonRef,
    contentRef: navRef,
    fallbackRef: panelRef,
    onRequestClose: () => setIsOpen(false),
  });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > BREAKPOINTS.md) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollRetryTimerRef.current !== null) {
        window.clearTimeout(scrollRetryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  const buttonLabel = isOpen ? closeLabel : openLabel;

  const handleLanguageChange = (language: 'en' | 'es') => {
    setIsOpen(false);

    if (localeFromPath === language && currentLocale === language) {
      return;
    }

    switchLocale(language);
  };

  const tryScrollToSection = useCallback(function tryScrollToSection(
    sectionId: string,
    attemptsLeft = 12,
    retryDelayMs = 80,
  ) {
    if (scrollRetryTimerRef.current !== null) {
      window.clearTimeout(scrollRetryTimerRef.current);
      scrollRetryTimerRef.current = null;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      pendingSectionIdRef.current = null;
      return;
    }

    if (attemptsLeft <= 0) {
      return;
    }

    scrollRetryTimerRef.current = window.setTimeout(() => {
      tryScrollToSection(sectionId, attemptsLeft - 1, retryDelayMs);
    }, retryDelayMs);
  }, []);

  const handleSectionLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const sectionId = getSectionIdFromHref(href);
    if (!sectionId) {
      setIsOpen(false);
      return;
    }

    event.preventDefault();
    setIsOpen(false);

    const targetPath = normalizePathname(href.split('#')[0] || '/');
    const currentPath = normalizePathname(location.pathname);
    const isSamePath = currentPath === targetPath;
    const isOnHome = isHomePath(location.pathname);
    pendingSectionIdRef.current = sectionId;

    if (isOnHome && isSamePath) {
      navigate(href, { replace: false });
      window.requestAnimationFrame(() => {
        tryScrollToSection(sectionId);
      });
      return;
    }

    navigate(href, { replace: false });
  };

  useEffect(() => {
    const sectionId = pendingSectionIdRef.current ?? location.hash.slice(1);
    if (!sectionId || !isHomePath(location.pathname)) {
      return;
    }

    tryScrollToSection(sectionId);
  }, [location.pathname, location.hash, tryScrollToSection]);

  return (
    <div ref={wrapperRef} className={styles.menu}>
      <button
        ref={buttonRef}
        className={styles.hamburgerButton}
        type="button"
        aria-label={buttonLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.hamBox} aria-hidden="true">
          <span
            className={`${styles.hamBoxInner} ${isOpen ? styles.hamBoxInnerOpen : ''}`}
          />
        </span>
      </button>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        id="mobile-navigation"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label={panelLabel}
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <nav ref={navRef} className={styles.sidebarNav} aria-label={linksLabel}>
          <ol className={styles.sidebarLinks}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => handleSectionLinkClick(event, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
          <div className={styles.languageRow} aria-label={t('language_label')}>
            <button
              type="button"
              className={`${styles.languageOption} ${localeFromPath === 'en' ? styles.languageOptionActive : ''}`}
              onClick={() => handleLanguageChange('en')}
              aria-pressed={localeFromPath === 'en'}
            >
              {t('language_short_en')}
            </button>
            <span className={styles.languageDivider} aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className={`${styles.languageOption} ${localeFromPath === 'es' ? styles.languageOptionActive : ''}`}
              onClick={() => handleLanguageChange('es')}
              aria-pressed={localeFromPath === 'es'}
            >
              {t('language_short_es')}
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
}
