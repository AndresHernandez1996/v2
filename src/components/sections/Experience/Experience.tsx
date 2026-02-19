import { useEffect, useRef, useState } from 'react';
import styles from './Experience.module.scss';
import { D20 } from '@/components/icons/D20';
import { D6 } from '@/components/icons/D6';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EXPERIENCE_ITEMS } from './Experience.data';

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = EXPERIENCE_ITEMS[activeIndex];
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  return (
    <section
      id="experience"
      className={styles.section}
      data-sr="text"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className={styles.title}>
        <D20 className={styles.titleIcon} />
        <span>Experience</span>
      </h2>

      <div className={styles.inner}>
        <div
          ref={tabListRef}
          className={styles.tabList}
          role="tablist"
          aria-label="Companies"
        >
          {EXPERIENCE_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            const tabId = `experience-tab-${index}`;
            const panelId = `experience-panel-${index}`;

            return (
              <button
                key={item.company}
                id={tabId}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveIndex(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        <div
          key={activeItem.company}
          id={`experience-panel-${activeIndex}`}
          className={`${styles.panel} ${prefersReducedMotion ? '' : styles.panelEnter}`}
          role="tabpanel"
          aria-labelledby={`experience-tab-${activeIndex}`}
        >
          <h3 className={styles.role}>
            {activeItem.role}{' '}
            <a
              className={styles.companyTag}
              href={activeItem.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{activeItem.company}
            </a>
          </h3>
          <p className={styles.period}>{activeItem.period}</p>

          <ul className={styles.highlights}>
            {activeItem.highlights.map((highlight) => (
              <li key={highlight}>
                <D6 className={styles.bulletIcon} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
