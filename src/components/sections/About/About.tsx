import { useEffect, useRef } from 'react';
import styles from './About.module.scss';
import { Icon } from '@/components/icons';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import sr from '@/utils/sr';
import { srConfig } from '@/utils/srConfig';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ABOUT_IMAGE, ABOUT_TECHNOLOGIES } from '@/constants/about';

export function About() {
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
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
      aria-describedby="about-summary"
    >
      <div className={styles.inner}>
        <div className={styles.textColumn}>
          <h2 id="about-title" className={styles.title}>
            <Icon name="D20" className={styles.titleIcon} />
            <span>{t('about_title')}</span>
          </h2>

          <p id="about-summary" className={styles.paragraph}>
            {t('about_p1')}
          </p>

          <p className={styles.paragraph}>
            {t('about_p2_prefix')}
            <span className={styles.accent}>{t('about_p2_highlight_1')}</span>
            {t('about_p2_middle')}
            <span className={styles.accent}>{t('about_p2_highlight_2')}</span>
            {t('about_p2_suffix')}
            <span className={styles.accent}>{t('about_p2_highlight_3')}</span>
          </p>

          <p className={styles.paragraph}>
            {t('about_p3_prefix')}
            <span className={styles.accent}>{t('about_p3_highlight')}</span>
            {t('about_p3_suffix')}
          </p>

          <p className={styles.techLabel}>{t('about_tech_label')}</p>

          <ul className={styles.techList} aria-label={t('about_tech_aria')}>
            {ABOUT_TECHNOLOGIES.map((technology) => (
              <li key={technology.alt} className={styles.techItem}>
                <Tooltip
                  content={technology.alt}
                  className={styles.techTooltip}
                >
                  <span className={styles.techIcon}>
                    <img
                      src={technology.src}
                      alt={technology.alt}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.imagePlaceholder}>
          <img
            src={ABOUT_IMAGE}
            alt={t('about_image_alt')}
            width={512}
            height={512}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
