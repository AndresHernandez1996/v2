import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <main className={styles.main} aria-labelledby="notfound-title">
      <section className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 id="notfound-title" className={styles.title}>
          {t('notfound_title')}
        </h1>
        <Link className={styles.cta} to="/" aria-label={t('notfound_cta_aria')}>
          {t('notfound_cta')}
        </Link>
      </section>
    </main>
  );
}
