import pickIcon from '../../assets/fluent-emoji-flat--pick.svg';
import Button from '../ui/Button';
import styles from './Header.module.css';

function Header({ activePage = 'home' }) {
  const navItems = [
    { id: 'home', label: 'Головна', href: '#home' },
    { id: 'modpacks', label: 'Мої збірки', href: '#modpacks' },
    { id: 'builder', label: 'Конструктор', href: '#builder' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#home" className={styles.brand}>
          <img
            src={pickIcon}
            alt=""
            className={styles.logoIcon}
            aria-hidden="true"
          />
          <span className={styles.brandText}>Modpacks minecraft</span>
        </a>

        <nav className={styles.nav} aria-label="Головна навігація">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.navLink} ${
                activePage === item.id ? styles.active : ''
              }`.trim()}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button variant="secondary" size="sm">
            Увійти
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
