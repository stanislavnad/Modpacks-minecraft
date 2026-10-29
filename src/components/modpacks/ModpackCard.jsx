import Badge from '../ui/Badge';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import styles from './ModpackCard.module.css';

function ModpackCard({ title, loader, version, modsCount, size, updatedAt }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <Badge variant="accent">{loader}</Badge>
      </div>

      <div className={styles.statsBox}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Версія</span>
          <span className={styles.statValue}>{version}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Кількість модів</span>
          <span className={styles.statValue}>{modsCount}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Розмір</span>
          <span className={styles.statValue}>{size}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Оновлено</span>
          <span className={styles.statValue}>{updatedAt}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" size="md" className={styles.downloadBtn}>
          Завантажити .zip
        </Button>
        <IconButton label="Редагувати збірку">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </IconButton>
        <IconButton variant="danger" label="Видалити збірку">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </IconButton>
      </div>
    </article>
  );
}

export default ModpackCard;

