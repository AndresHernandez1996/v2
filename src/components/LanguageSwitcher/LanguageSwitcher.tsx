import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icons';
import { assertNever } from '@/lib/assertNever';
import styles from './LanguageSwitcher.module.scss';

type SupportedLanguage = 'en' | 'es';

const LANGUAGES: SupportedLanguage[] = ['en', 'es'];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith(
    'es',
  )
    ? 'es'
    : 'en';

  const availableLanguages = LANGUAGES.filter((lng) => lng !== currentLanguage);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    void i18n.changeLanguage(nextLanguage);
    setIsOpen(false);
  };

  const getLanguageLabel = (language: SupportedLanguage) => {
    switch (language) {
      case 'en':
        return t('language_short_en');
      case 'es':
        return t('language_short_es');
      default:
        return assertNever(language);
    }
  };

  return (
    <div ref={rootRef} className={styles.switcher}>
      <button
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t('language_label')}
      >
        <span className={styles.label}>
          {getLanguageLabel(currentLanguage)}
        </span>
        <Icon
          name="ChevronDown"
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      <div
        className={`${styles.menu} ${isOpen ? styles.menuOpen : styles.menuClosed}`}
        role="menu"
        aria-hidden={!isOpen}
        aria-label={t('language_label')}
      >
        {availableLanguages.map((language) => (
          <button
            key={language}
            className={styles.option}
            type="button"
            role="menuitem"
            onClick={() => handleLanguageChange(language)}
          >
            {getLanguageLabel(language)}
          </button>
        ))}
      </div>
    </div>
  );
}
