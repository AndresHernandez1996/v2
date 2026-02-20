import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';

type ContactOverlayProps = {
  footnote: string;
  goToVOne: string;
};

export function ContactOverlay({ footnote, goToVOne }: ContactOverlayProps) {
  const { t } = useTranslation();
  const creditHandle = '@bchiang7';
  const [beforeCredit, afterCredit] = footnote.split(creditHandle);

  return (
    <div
      className={styles.overlay}
      role="group"
      aria-label={t('contact_overlay_aria')}
    >
      <p className={styles.footnote}>
        {beforeCredit}
        <a
          className={styles.creditLink}
          href="https://github.com/bchiang7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('contact_credit_aria')}
        >
          {creditHandle}
        </a>
        {afterCredit ?? ''}
      </p>
      <a
        className={styles.goToVOne}
        href="https://v1-andreshernandez.vercel.app"
        aria-label={t('contact_v1_aria')}
      >
        {goToVOne}
      </a>
    </div>
  );
}
