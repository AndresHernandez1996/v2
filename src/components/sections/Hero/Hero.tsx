import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { createRef, useEffect, useMemo, useState } from 'react';
import styles from './Hero.module.scss';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const HERO_NAV_DELAY_MS = 120;
const HERO_STAGGER_MS = 100;
const HERO_LOADER_DELAY_MS = 420;
type HeroItemId = 'kicker' | 'title' | 'subtitle' | 'text' | 'cta';

export function Hero(): ReactElement {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setIsMounted(true),
      HERO_NAV_DELAY_MS,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  const items: Array<{ id: HeroItemId; node: ReactNode }> = [
    { id: 'kicker', node: <p className={styles.kicker}>{t('hero_kicker')}</p> },
    { id: 'title', node: <h1 className={styles.title}>{t('hero_title')}</h1> },
    {
      id: 'subtitle',
      node: <p className={styles.subtitle}>{t('hero_subtitle')}</p>,
    },
    { id: 'text', node: <p className={styles.text}>{t('hero_text')}</p> },
    {
      id: 'cta',
      node: (
        <button
          className={styles.resumeButton}
          type="button"
          aria-label={t('hero_cta_aria')}
        >
          {t('hero_cta')}
        </button>
      ),
    },
  ];

  const nodeRefs = useMemo(
    () => ({
      kicker: createRef<HTMLDivElement>(),
      title: createRef<HTMLDivElement>(),
      subtitle: createRef<HTMLDivElement>(),
      text: createRef<HTMLDivElement>(),
      cta: createRef<HTMLDivElement>(),
    }),
    [],
  );

  return (
    <section id="hero" className={styles.section} data-sr="title">
      {prefersReducedMotion ? (
        <>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              {item.node}
            </div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, index) => (
              <CSSTransition
                key={item.id}
                nodeRef={nodeRefs[item.id]}
                timeout={HERO_LOADER_DELAY_MS}
                classNames={{
                  enter: styles.fadeupEnter,
                  enterActive: styles.fadeupEnterActive,
                  enterDone: styles.fadeupEnterDone,
                }}
              >
                <div
                  ref={nodeRefs[item.id]}
                  className={styles.item}
                  style={
                    {
                      '--stagger-delay': `${(index + 1) * HERO_STAGGER_MS}ms`,
                    } as CSSProperties
                  }
                >
                  {item.node}
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </section>
  );
}
