import styles from './FeatureCard.module.css';

function FeatureCard({ icon, title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconBox}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default FeatureCard;

