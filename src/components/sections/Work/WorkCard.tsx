import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import styles from './Work.module.scss';

type WorkCardProps = {
  align?: 'left' | 'right';
  kicker: string;
  title: string;
  description: string;
  stack: string;
  projectUrl: string;
  projectLinkAriaLabel: string;
  imageSrc: string;
  imageAlt: string;
  style?: CSSProperties;
};

export const WorkCard = forwardRef<HTMLLIElement, WorkCardProps>(
  (
    {
      align = 'right',
      kicker,
      title,
      description,
      stack,
      projectUrl,
      projectLinkAriaLabel,
      imageSrc,
      imageAlt,
      style,
    },
    ref,
  ) => {
    const rowClassName = [
      styles.cardRow,
      align === 'left' ? styles.cardRowLeft : styles.cardRowRight,
    ].join(' ');

    return (
      <li ref={ref} className={styles.cardItem} style={style}>
        <article className={rowClassName}>
          <div className={styles.cardContent}>
            <p className={styles.kicker}>{kicker}</p>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
            <p className={styles.cardStack}>{stack}</p>
          </div>
          <a
            className={styles.imagePlaceholder}
            href={projectUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={projectLinkAriaLabel}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
            />
          </a>
        </article>
      </li>
    );
  },
);

WorkCard.displayName = 'WorkCard';
