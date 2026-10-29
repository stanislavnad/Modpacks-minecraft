import styles from './Input.module.css';

function Input({
  label,
  hint,
  leftIcon,
  rightIcon,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={`${styles.field} ${className}`.trim()}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          type={type}
          className={[
            styles.input,
            leftIcon ? styles.withLeftIcon : '',
            rightIcon ? styles.withRightIcon : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

export default Input;

