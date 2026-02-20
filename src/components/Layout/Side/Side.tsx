import type { ReactNode } from 'react';
import styles from './Side.module.scss';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '@/utils/links';
import { GitHub, Instagram, LinkedIn, Mail, X } from '@/components/icons';

type SideItem = {
  key: 'mail' | 'x' | 'github' | 'linkedin' | 'instagram';
  href: string;
  icon: ReactNode;
  ariaLabel: string;
};

type SideProps = {
  mode?: 'fixed' | 'inline';
};

export function Side({ mode = 'fixed' }: SideProps) {
  const { t } = useTranslation();

  const items: SideItem[] = [
    {
      key: 'mail',
      href: SOCIAL_LINKS.email,
      icon: <Mail className={styles.icon} />,
      ariaLabel: t('side_mail_aria'),
    },
    {
      key: 'x',
      href: SOCIAL_LINKS.x,
      icon: <X className={styles.icon} />,
      ariaLabel: t('side_x_aria'),
    },
    {
      key: 'github',
      href: SOCIAL_LINKS.github,
      icon: <GitHub className={styles.icon} />,
      ariaLabel: t('side_github_aria'),
    },
    {
      key: 'linkedin',
      href: SOCIAL_LINKS.linkedin,
      icon: <LinkedIn className={styles.icon} />,
      ariaLabel: t('side_linkedin_aria'),
    },
    {
      key: 'instagram',
      href: SOCIAL_LINKS.instagram,
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
