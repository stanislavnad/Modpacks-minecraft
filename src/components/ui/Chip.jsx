import styles from './Chip.module.css';

function Chip({ label }) {
  return (
    <span className={styles.chip}>
      <span>{label}</span>
      <button
        type="button"
        className={styles.removeBtn}
        aria-label={`Видалити ${label}`}
      >
        ×
      </button>
    </span>
  );
}

export default Chip;

