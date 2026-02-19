import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Experience.module.scss';
import { D20 } from '@/components/icons/D20';
import { D6 } from '@/components/icons/D6';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import sr from '@/utils/sr';
import { srConfig } from '@/utils/srConfig';
import { getNextTabIndexByKey } from '@/utils/tabs';
import { EXPERIENCE_ITEMS } from './Experience.data';

export function Experience() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = EXPERIENCE_ITEMS[activeIndex];
  const revealContainer = useRef<HTMLElement | null>(null);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = revealContainer.current;
    if (prefersReducedMotion || !sr || !node) {
      return;
    }

    sr.reveal(node, srConfig());
  }, [prefersReducedMotion]);

  useEffect(() => {
    const tabList = tabListRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (!tabList || !activeTab) {
      return;
    }

    const targetLeft =
      activeTab.offsetLeft -
      tabList.clientWidth / 2 +
      activeTab.offsetWidth / 2;

    tabList.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex, prefersReducedMotion]);

  const focusAndSelectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = EXPERIENCE_ITEMS.length - 1;
    const nextIndex = getNextTabIndexByKey(event.key, index, lastIndex);
    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    focusAndSelectTab(nextIndex);
  };

  return (
    <section
      ref={revealContainer}
      id="experience"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className={styles.title}>
        <D20 className={styles.titleIcon} />
        <span>{t('experience_title')}</span>
      </h2>

      <div className={styles.inner}>
        <div
          ref={tabListRef}
          className={styles.tabList}
          role="tablist"
          aria-label={t('experience_tablist_aria')}
        >
          {EXPERIENCE_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            const tabId = `experience-tab-${index}`;
            const panelId = `experience-panel-${index}`;

            return (
              <button
                key={item.companyKey}
                id={tabId}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                aria-label={t('experience_tab_aria', {
                  company: t(item.companyKey),
                })}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {t(item.companyKey)}
              </button>
            );
          })}
        </div>

        <div
          key={activeItem.companyKey}
          id={`experience-panel-${activeIndex}`}
          className={`${styles.panel} ${prefersReducedMotion ? '' : styles.panelEnter}`}
          role="tabpanel"
          aria-labelledby={`experience-tab-${activeIndex}`}
          aria-label={t('experience_panel_aria', {
            company: t(activeItem.companyKey),
          })}
        >
          <h3 className={styles.role}>
            {t(activeItem.roleKey)}{' '}
            <a
              className={styles.companyTag}
              href={activeItem.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('experience_company_link_aria', {
                company: t(activeItem.companyKey),
              })}
            >
              @{t(activeItem.companyKey)}
            </a>
          </h3>
          <p className={styles.period}>{t(activeItem.periodKey)}</p>

          <ul className={styles.highlights}>
            {activeItem.highlightsKeys.map((highlightKey) => (
              <li key={highlightKey}>
                <D6 className={styles.bulletIcon} />
                <span>{t(highlightKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
