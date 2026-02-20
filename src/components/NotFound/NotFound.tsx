import styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

type NotFoundProps = {
  onGoHome?: () => void;
};

export function NotFound({ onGoHome }: NotFoundProps) {
  const { t } = useTranslation();

  return (
    <main className={styles.main} aria-labelledby="notfound-title">
      <section className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 id="notfound-title" className={styles.title}>
          {t('notfound_title')}
        </h1>
        <a
          className={styles.cta}
          href="/"
          aria-label={t('notfound_cta_aria')}
          onClick={(event) => {
            event.preventDefault();
            onGoHome?.();
          }}
        >
          {t('notfound_cta')}
        </a>
      </section>
    </main>
  );
}
