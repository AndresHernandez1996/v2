import type { ReactElement } from 'react';
import styles from './Hero.module.scss';
import { useTranslation } from 'react-i18next';

export function Hero(): ReactElement {
  const { t } = useTranslation();

  return (
    <section id="hero" className={styles.section} data-sr="title">
      <p className={styles.kicker}>{t('hero_kicker')}</p>
      <h1 className={styles.title}>{t('hero_title')}</h1>
      <p className={styles.subtitle}>{t('hero_subtitle')}</p>
      <p className={styles.text}>{t('hero_text')}</p>
      <button
        className={styles.resumeButton}
        type="button"
        aria-label={t('hero_cta_aria')}
      >
        {t('hero_cta')}
      </button>
    </section>
  );
}
