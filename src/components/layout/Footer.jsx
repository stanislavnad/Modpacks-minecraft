import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          Платформа для швидкого створення та експорту модпаків Minecraft
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;

