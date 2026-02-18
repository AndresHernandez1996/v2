import { useEffect, useState } from 'react';
import { Isotipo } from '@/components/icons/Isotipo';
import styles from './Nav.module.scss';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrolledToTop, setScrolledToTop] = useState(() =>
    typeof window === 'undefined' ? true : window.scrollY < 50,
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
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
  }, []);

  const headerClassName = [
    styles.header,
    !scrolledToTop ? styles.headerScrolled : '',
    !scrolledToTop && scrollDirection === 'up' ? styles.headerUp : '',
    !scrolledToTop && scrollDirection === 'down' ? styles.headerDown : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClassName}>
      <nav className={styles.nav} aria-label="Main">
        <a className={styles.brand} href="#hero" aria-label="Go to hero">
          <div className={styles.logo} aria-hidden="true">
            <Isotipo className={styles.logoIcon} />
          </div>
        </a>
        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
