import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { NavLink } from '@/types/navigation';
import styles from './MobileMenu.module.scss';

const MOBILE_BREAKPOINT = 768;

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
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onMenuStateChange?.(isOpen);
  }, [isOpen, onMenuStateChange]);

  useEffect(() => {
    const previous = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (!isOpen || event.key !== 'Tab') {
        return;
      }

      const focusables = [
        buttonRef.current,
        ...Array.from(
          navRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [],
        ),
      ].filter(Boolean) as HTMLElement[];

      if (focusables.length <= 1) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  const buttonLabel = isOpen ? closeLabel : openLabel;
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith(
    'es',
  )
    ? 'es'
    : 'en';

  const handleLanguageChange = (language: 'en' | 'es') => {
    setIsOpen(false);

    if (currentLanguage === language) {
      return;
    }

    void i18n.changeLanguage(language);
  };

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
        id="mobile-navigation"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        role="dialog"
        aria-modal={isOpen}
        aria-label={panelLabel}
        aria-hidden={!isOpen}
      >
        <nav ref={navRef} className={styles.sidebarNav} aria-label={linksLabel}>
          <ol className={styles.sidebarLinks}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
          <div className={styles.languageRow} aria-label={t('language_label')}>
            <button
              type="button"
              className={`${styles.languageOption} ${currentLanguage === 'en' ? styles.languageOptionActive : ''}`}
              onClick={() => handleLanguageChange('en')}
              aria-pressed={currentLanguage === 'en'}
            >
              {t('language_short_en')}
            </button>
            <span className={styles.languageDivider} aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className={`${styles.languageOption} ${currentLanguage === 'es' ? styles.languageOptionActive : ''}`}
              onClick={() => handleLanguageChange('es')}
              aria-pressed={currentLanguage === 'es'}
            >
              {t('language_short_es')}
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
}
