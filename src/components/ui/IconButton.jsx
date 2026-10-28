import styles from './IconButton.module.css';

function IconButton({
  children,
  variant = 'default',
  label,
  type = 'button',
  ...props
}) {
  const classes = [
    styles.iconButton,
    variant === 'danger' ? styles.danger : styles.default,
  ].join(' ');

  return (
    <button type={type} className={classes} aria-label={label} {...props}>
      {children}
    </button>
  );
}

export default IconButton;

