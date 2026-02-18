import styles from './Nav.module.scss';

const LINKS = [
  { href: '#hero', label: 'Hero' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <a className={styles.brand} href="#hero">
          AH
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
