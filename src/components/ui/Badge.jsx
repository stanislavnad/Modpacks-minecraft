import styles from './Badge.module.css';

function Badge({ children, variant = 'accent', active = false, ...props }) {
  const classes = [
    styles.badge,
    styles[variant] || styles.accent,
    active ? styles.active : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;

