import { Link, NavLink, useNavigate } from 'react-router-dom';
import pickIcon from '../../assets/fluent-emoji-flat--pick.svg';
import Button from '../ui/Button';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Головна', to: '/' },
    { id: 'modpacks', label: 'Мої збірки', to: '/modpacks' },
    { id: 'builder', label: 'Конструктор', to: '/builder' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <img
            src={pickIcon}
            alt=""
            className={styles.logoIcon}
            aria-hidden="true"
          />
          <span className={styles.brandText}>Modpacks minecraft</span>
        </Link>

        <nav className={styles.nav} aria-label="Головна навігація">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/login')}
          >
            Увійти
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
