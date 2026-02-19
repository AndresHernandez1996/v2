import styles from './Work.module.scss';
import { D20 } from '@/components/icons/D20';
import { useTranslation } from 'react-i18next';
import { WorkCard } from './WorkCard';
import work1Image from '@/assets/work/work1.png';
import work2Image from '@/assets/work/work2.png';
import work3Image from '@/assets/work/work3.png';
import capstoneImage from '@/assets/work/capstone.png';

export function Work() {
  const { t } = useTranslation();
  const projects = [
    {
      title: t('work_project_1_title'),
      kicker: t('work_featured_label'),
      description: t('work_project_1_description'),
      stack: t('work_project_1_stack'),
      projectUrl: t('work_project_1_url'),
      imageAlt: t('work_project_1_image_alt'),
      align: 'right' as const,
      image: work1Image,
    },
    {
      title: t('work_project_2_title'),
      kicker: t('work_featured_label'),
      description: t('work_project_2_description'),
      stack: t('work_project_2_stack'),
      projectUrl: t('work_project_2_url'),
      imageAlt: t('work_project_2_image_alt'),
      align: 'left' as const,
      image: work2Image,
    },
    {
      title: t('work_project_3_title'),
      kicker: t('work_featured_label'),
      description: t('work_project_3_description'),
      stack: t('work_project_3_stack'),
      projectUrl: t('work_project_3_url'),
      imageAlt: t('work_project_3_image_alt'),
      align: 'right' as const,
      image: work3Image,
    },
    {
      title: t('work_project_4_title'),
      kicker: t('work_capstone_label'),
      description: t('work_project_4_description'),
      stack: t('work_project_4_stack'),
      projectUrl: t('work_project_4_url'),
      imageAlt: t('work_project_4_image_alt'),
      align: 'left' as const,
      image: capstoneImage,
    },
  ];

  return (
    <section
      id="work"
      className={styles.section}
      data-sr="text"
      aria-labelledby="work-title"
    >
      <h2 id="work-title" className={styles.title}>
        <D20 className={styles.titleIcon} />
        <span>{t('work_title')}</span>
      </h2>

      <ul className={styles.cards} aria-label={t('work_list_aria')}>
        {projects.map((project) => (
          <WorkCard
            key={project.projectUrl}
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
      </ul>
    </section>
  );
}
