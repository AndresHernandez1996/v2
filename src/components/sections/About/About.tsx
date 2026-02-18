import styles from './About.module.scss';

export function About() {
  return (
    <section id="about" className={styles.section} data-sr="text">
      <h2>About</h2>
      <p>
        I focus on maintainable frontend architecture, accessible interfaces and
        performance-first implementation.
      </p>
    </section>
  );
}
