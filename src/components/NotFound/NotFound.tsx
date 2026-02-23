import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { getLocaleFromPath, getLocalizedHomePath } from '@/utils/paths';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname) ?? 'en';

  return (
    <section className={styles.main} aria-labelledby="notfound-title">
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 id="notfound-title" className={styles.title}>
          {t('notfound_title')}
        </h1>
        <Link
          className={styles.cta}
          to={getLocalizedHomePath(locale)}
          aria-label={t('notfound_cta_aria')}
        >
          {t('notfound_cta')}
        </Link>
      </div>
    </section>
  );
}
