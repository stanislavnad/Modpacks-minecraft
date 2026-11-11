import styles from './Chip.module.css';

function Chip({ label, onRemove }) {
  return (
    <span className={styles.chip}>
      <span>{label}</span>
      <button
        type="button"
        className={styles.removeBtn}
        aria-label={`Видалити ${label}`}
        onClick={onRemove}
      >
        ×
      </button>
    </span>
  );
}

export default Chip;

