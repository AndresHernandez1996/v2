import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section id="hero" className={styles.section} data-sr="title">
      <p className={styles.kicker}>Frontend Engineer</p>
      <h1 className={styles.title}>
        Building clean and scalable web experiences.
      </h1>
      <p className={styles.text}>
        React, TypeScript and design systems focused on clarity, performance and
        usability.
      </p>
    </section>
  );
}
