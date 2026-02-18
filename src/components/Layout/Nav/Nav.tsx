import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Isotipo } from '@/components/icons/Isotipo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import styles from './Nav.module.scss';

export function Nav() {
  const { t } = useTranslation();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrolledToTop, setScrolledToTop] = useState(() =>
    typeof window === 'undefined' ? true : window.scrollY < 50,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
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

  return (
    <header className={headerClassName}>
      <nav className={styles.nav} aria-label={t('nav_aria_main')}>
        <a
          className={styles.brand}
          href="#hero"
          aria-label={t('nav_go_to_hero')}
        >
          <div className={styles.logo} aria-hidden="true">
            <Isotipo className={styles.logoIcon} />
          </div>
        </a>

        <div className={styles.desktopActions}>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />
        </div>

        <MobileMenu
          links={links}
          openLabel={t('nav_open_menu')}
          closeLabel={t('nav_close_menu')}
          onMenuStateChange={setIsMenuOpen}
        />
      </nav>
    </header>
  );
}
