import Badge from '../ui/Badge';
import Input from '../ui/Input';
import styles from './ModpackFilters.module.css';

function ModpackFilters() {
  const filters = [
    { id: 'all', label: 'Всі', active: true },
    { id: 'fabric', label: 'Fabric', active: false },
    { id: 'forge', label: 'Forge', active: false },
  ];

  const searchIcon = (
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  return (
    <div className={styles.filtersBar}>
      <div className={styles.searchWrapper}>
        <Input
          placeholder="Пошук збірки..."
          leftIcon={searchIcon}
          aria-label="Пошук збірки"
        />
      </div>
      <div className={styles.pills}>
        {filters.map((filter) => (
          <Badge key={filter.id} variant="filter" active={filter.active}>
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default ModpackFilters;

