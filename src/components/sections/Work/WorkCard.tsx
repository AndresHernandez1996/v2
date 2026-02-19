import styles from './Work.module.scss';

type WorkCardProps = {
  align?: 'left' | 'right';
  kicker: string;
  title: string;
  description: string;
  stack: string;
  projectUrl: string;
  imageSrc: string;
  imageAlt: string;
};

export function WorkCard({
  align = 'right',
  kicker,
  title,
  description,
  stack,
  projectUrl,
  imageSrc,
  imageAlt,
}: WorkCardProps) {
  const rowClassName = [
    styles.cardRow,
    align === 'left' ? styles.cardRowLeft : styles.cardRowRight,
  ].join(' ');

  return (
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
        rel="noreferrer"
        aria-label={title}
      >
        <img src={imageSrc} alt={imageAlt} />
      </a>
    </article>
  );
}
