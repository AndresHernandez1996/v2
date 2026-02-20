import { createRef, useEffect, useMemo, useRef } from 'react';
import styles from './Work.module.scss';
import { D20 } from '@/components/icons/D20';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import sr from '@/utils/sr';
import { srConfig } from '@/utils/srConfig';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { WorkCard } from './WorkCard';
import work1Image from '@/assets/work/work1.png';
import work2Image from '@/assets/work/work2.png';
import work3Image from '@/assets/work/work3.png';
import capstoneImage from '@/assets/work/capstone.png';
import { WORK_PROJECT_LINKS } from '@/utils/links';

export function Work() {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealTitle = useRef<HTMLHeadingElement | null>(null);
  const projects = useMemo(
    () => [
      {
        title: t('work_project_1_title'),
        kicker: t('work_featured_label'),
        description: t('work_project_1_description'),
        stack: t('work_project_1_stack'),
        projectUrl: WORK_PROJECT_LINKS.shelftia,
        imageAlt: t('work_project_1_image_alt'),
        align: 'right' as const,
        image: work1Image,
      },
      {
        title: t('work_project_2_title'),
        kicker: t('work_featured_label'),
        description: t('work_project_2_description'),
        stack: t('work_project_2_stack'),
        projectUrl: WORK_PROJECT_LINKS.iwRobot,
        imageAlt: t('work_project_2_image_alt'),
        align: 'left' as const,
        image: work2Image,
      },
      {
        title: t('work_project_3_title'),
        kicker: t('work_featured_label'),
        description: t('work_project_3_description'),
        stack: t('work_project_3_stack'),
        projectUrl: WORK_PROJECT_LINKS.automationPlatform,
        imageAlt: t('work_project_3_image_alt'),
        align: 'right' as const,
        image: work3Image,
      },
      {
        title: t('work_project_4_title'),
        kicker: t('work_capstone_label'),
        description: t('work_project_4_description'),
        stack: t('work_project_4_stack'),
        projectUrl: WORK_PROJECT_LINKS.capstone,
        imageAlt: t('work_project_4_image_alt'),
        align: 'left' as const,
        image: capstoneImage,
      },
    ],
    [t],
  );
  const nodeRefs = useMemo(
    () => projects.map(() => createRef<HTMLLIElement>()),
    [projects],
  );

  useEffect(() => {
    const scrollReveal = sr;
    if (prefersReducedMotion || !scrollReveal) {
      return;
    }

    if (revealTitle.current) {
      scrollReveal.reveal(revealTitle.current, srConfig());
    }

    nodeRefs.forEach((nodeRef, index) => {
      if (!nodeRef.current) {
        return;
      }

      scrollReveal.reveal(nodeRef.current, srConfig(index * 100));
    });
  }, [nodeRefs, prefersReducedMotion]);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <h2 ref={revealTitle} id="work-title" className={styles.title}>
        <D20 className={styles.titleIcon} />
        <span>{t('work_title')}</span>
      </h2>

      <ul className={styles.cards} aria-label={t('work_list_aria')}>
        {prefersReducedMotion ? (
          <>
            {projects.map((project, index) => (
              <WorkCard
                key={project.projectUrl}
                ref={nodeRefs[index]}
                align={project.align}
                kicker={project.kicker}
                title={project.title}
                description={project.description}
                stack={project.stack}
                projectUrl={project.projectUrl}
                projectLinkAriaLabel={t('work_project_link_aria', {
                  project: project.title,
                })}
                imageSrc={project.image}
                imageAlt={project.imageAlt}
              />
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projects.map((project, index) => (
              <CSSTransition
                key={project.projectUrl}
                nodeRef={nodeRefs[index]}
                timeout={300}
                classNames={{
                  enter: styles.fadeupEnter,
                  enterActive: styles.fadeupEnterActive,
                  enterDone: styles.fadeupEnterDone,
                }}
              >
                <WorkCard
                  ref={nodeRefs[index]}
                  align={project.align}
                  kicker={project.kicker}
                  title={project.title}
                  description={project.description}
                  stack={project.stack}
                  projectUrl={project.projectUrl}
                  projectLinkAriaLabel={t('work_project_link_aria', {
                    project: project.title,
                  })}
                  imageSrc={project.image}
                  imageAlt={project.imageAlt}
                  style={{ transitionDelay: `${index * 100}ms` }}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </section>
  );
}
