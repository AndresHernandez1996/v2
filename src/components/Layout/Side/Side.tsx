import type { ReactNode } from 'react';
import styles from './Side.module.scss';
import { useTranslation } from 'react-i18next';
import { LINKS } from '@/constants/links';
import { GitHub, Instagram, LinkedIn, Mail, X } from '@/components/icons';

type SideItem = {
  key: 'mail' | 'x' | 'github' | 'linkedin' | 'instagram';
  href: string;
  icon: ReactNode;
  ariaLabel: string;
};

type SideProps = {
  isHome?: boolean;
  mode?: 'fixed' | 'inline';
};

export function Side({ isHome: _isHome, mode = 'fixed' }: SideProps) {
  console.log(_isHome);
  const { t } = useTranslation();

  const items: SideItem[] = [
    {
      key: 'mail',
      href: LINKS.contact.email,
      icon: <Mail className={styles.icon} />,
      ariaLabel: t('side_mail_aria'),
    },
    {
      key: 'x',
      href: LINKS.social.x,
      icon: <X className={styles.icon} />,
      ariaLabel: t('side_x_aria'),
    },
    {
      key: 'github',
      href: LINKS.social.github,
      icon: <GitHub className={styles.icon} />,
      ariaLabel: t('side_github_aria'),
    },
    {
      key: 'linkedin',
      href: LINKS.social.linkedin,
      icon: <LinkedIn className={styles.icon} />,
      ariaLabel: t('side_linkedin_aria'),
    },
    {
      key: 'instagram',
      href: LINKS.social.instagram,
      icon: <Instagram className={styles.icon} />,
      ariaLabel: t('side_instagram_aria'),
    },
  ];

  return (
    <aside
      className={`${styles.side} ${mode === 'inline' ? styles.sideInline : styles.sideFixed}`}
      aria-label={t('side_links_aria')}
    >
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
      {mode === 'fixed' ? (
        <span className={styles.line} aria-hidden="true" />
      ) : null}
    </aside>
  );
}
