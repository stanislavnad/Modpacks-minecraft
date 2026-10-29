import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import ModpackCard from '../../components/modpacks/ModpackCard';
import ModpackFilters from '../../components/modpacks/ModpackFilters';
import Button from '../../components/ui/Button';
import styles from './MyModpacksPage.module.css';

const MODPACKS = [
  {
    id: 'rpg-adventure',
    title: 'RPG Adventure 1.20.1',
    loader: 'Fabric',
    version: '1.20.1',
    modsCount: 34,
    size: '180 MB',
    updatedAt: 'сьогодні',
  },
  {
    id: 'tech-factory',
    title: 'Tech Factory Skyblock',
    loader: 'Forge',
    version: '1.19.2',
    modsCount: 42,
    size: '246 MB',
    updatedAt: '2 дні тому',
  },
  {
    id: 'vanilla-plus',
    title: 'Vanilla+ Performance',
    loader: 'Fabric',
    version: '1.21.1',
    modsCount: 21,
    size: '94 MB',
    updatedAt: 'вчора',
  },
];

function MyModpacksPage() {
  const navigate = useNavigate();

  return (
    <PageLayout activePage="modpacks">
      <div className={styles.pageContent}>
        <ModpackFilters />

        <div className={styles.titleRow}>
          <h1 className={styles.title}>Мої збірки ({MODPACKS.length})</h1>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/builder')}
          >
            + Новий модпак
          </Button>
        </div>

        <section className={styles.grid} aria-label="Список збірок">
          {MODPACKS.map((pack) => (
            <ModpackCard
              key={pack.id}
              title={pack.title}
              loader={pack.loader}
              version={pack.version}
              modsCount={pack.modsCount}
              size={pack.size}
              updatedAt={pack.updatedAt}
              onEdit={() => navigate('/builder')}
            />
          ))}
        </section>
      </div>
    </PageLayout>
  );
}

export default MyModpacksPage;
