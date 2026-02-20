import { useEffect, useRef } from 'react';
import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import sr from '@/utils/sr';
import { srConfig } from '@/utils/srConfig';
import { ContactOverlay } from './ContactOverlay';

export function Contact() {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = revealContainer.current;
    if (prefersReducedMotion || !sr || !node) {
      return;
    }

    sr.reveal(node, srConfig());
  }, [prefersReducedMotion]);

  return (
    <section
      ref={revealContainer}
      id="contact"
      className={styles.section}
      aria-label={t('contact_section_aria')}
      aria-labelledby="contact-title"
      aria-describedby="contact-text"
    >
      <div className={styles.card}>
        <p className={styles.kicker}>{t('contact_kicker')}</p>
        <h2 id="contact-title" className={styles.title}>
          {t('contact_title')}
        </h2>
        <p id="contact-text" className={styles.text}>
          {t('contact_text')}
        </p>

        <a
          className={styles.cta}
          href={t('contact_email_href')}
          aria-label={t('contact_cta_aria')}
        >
          {t('contact_cta')}
        </a>
        <ContactOverlay
          footnote={t('contact_footnote')}
          goToVOne={t('contact_back_to_top')}
        />
      </div>
    </section>
  );
}
