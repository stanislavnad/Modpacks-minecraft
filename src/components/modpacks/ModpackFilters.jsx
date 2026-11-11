import Badge from '../ui/Badge';
import Input from '../ui/Input';
import styles from './ModpackFilters.module.css';

const FILTERS = [
  { id: 'all', label: 'Всі' },
  { id: 'Fabric', label: 'Fabric' },
  { id: 'Forge', label: 'Forge' },
  { id: 'NeoForge', label: 'NeoForge' },
  { id: 'Quilt', label: 'Quilt' },
];

function ModpackFilters({
  searchQuery = '',
  onSearchChange,
  activeLoader = 'all',
  onLoaderChange,
}) {
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
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      <div className={styles.pills}>
        {FILTERS.map((filter) => (
          <Badge
            key={filter.id}
            variant="filter"
            active={activeLoader === filter.id}
            onClick={() => onLoaderChange?.(filter.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLoaderChange?.(filter.id);
              }
            }}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default ModpackFilters;
