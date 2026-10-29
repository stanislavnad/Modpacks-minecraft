import styles from './StepCard.module.css';

function StepCard({ stepNumber, title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.stepBadge}>{stepNumber}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default StepCard;

