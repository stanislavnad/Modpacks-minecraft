import styles from './Badge.module.css';

function Badge({ children, variant = 'accent', active = false }) {
  const classes = [
    styles.badge,
    styles[variant] || styles.accent,
    active ? styles.active : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}

export default Badge;

