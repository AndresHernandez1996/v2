import styles from './About.module.scss';
import jsIcon from '@/assets/about/JS.svg';
import reactIcon from '@/assets/about/React.svg';
import tsIcon from '@/assets/about/TS.svg';
import nextIcon from '@/assets/about/NextJs.svg';
import tailwindIcon from '@/assets/about/Tailwind.svg';
import sassIcon from '@/assets/about/Sass.svg';
import antdIcon from '@/assets/about/Antd.svg';
import yayoImage from '@/assets/about/yayo.png';
import { D20 } from '@/components/icons/D20';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  const technologies = [
    { src: jsIcon, alt: 'JavaScript' },
    { src: reactIcon, alt: 'React' },
    { src: tsIcon, alt: 'TypeScript' },
    { src: nextIcon, alt: 'Next.js' },
    { src: tailwindIcon, alt: 'Tailwind CSS' },
    { src: sassIcon, alt: 'Sass' },
    { src: antdIcon, alt: 'Ant Design' },
  ] as const;

  return (
    <section
      id="about"
      className={styles.section}
      data-sr="text"
      aria-labelledby="about-title"
      aria-describedby="about-summary"
    >
      <div className={styles.inner}>
        <div className={styles.textColumn}>
          <h2 id="about-title" className={styles.title}>
            <D20 className={styles.titleIcon} />
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
            {technologies.map((technology) => (
              <li key={technology.alt} className={styles.techItem}>
                <img src={technology.src} alt={technology.alt} />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.imagePlaceholder}>
          <img src={yayoImage} alt={t('about_image_alt')} />
        </div>
      </div>
    </section>
  );
}
