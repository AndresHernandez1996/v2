import { Side } from '@/components/Layout/Side/Side';
import { useTranslation } from 'react-i18next';
import { ContactOverlay } from './ContactOverlay';
import styles from './Contact.module.scss';

export function ContactFooter() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.mobileSide}>
        <Side mode="inline" />
      </div>
      <ContactOverlay
        footnote={t('contact_footnote')}
        goToVOne={t('contact_back_to_top')}
      />
    </>
  );
}
