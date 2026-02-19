import styles from './Contact.module.scss';

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2>Contact</h2>
      <p>Let&apos;s build something together.</p>
      <a className={styles.cta} href="mailto:hello@example.com">
        Say hello
      </a>
    </section>
  );
}
