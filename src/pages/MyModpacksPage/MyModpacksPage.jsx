import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import ModpackCard from '../../components/modpacks/ModpackCard';
import ModpackFilters from '../../components/modpacks/ModpackFilters';
import Button from '../../components/ui/Button';
import { useModpacks } from '../../hooks/useModpacks';
import styles from './MyModpacksPage.module.css';

function MyModpacksPage() {
  const navigate = useNavigate();
  const { modpacks, loading, error, deleteModpack } = useModpacks();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeLoader, setActiveLoader] = useState('all');
  const [notification, setNotification] = useState('');

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((current) => (current === message ? '' : current));
    }, 2500);
  };

  const filteredModpacks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return modpacks.filter((pack) => {
      const matchesLoader =
        activeLoader === 'all' ||
        pack.loader.toLowerCase() === activeLoader.toLowerCase();
      const matchesSearch =
        !query || pack.title.toLowerCase().includes(query);
      return matchesLoader && matchesSearch;
    });
  }, [modpacks, searchQuery, activeLoader]);

  const handleDelete = async (pack) => {
    try {
      await deleteModpack(pack.id);
      showToast(`Збірку «${pack.title}» видалено`);
    } catch {
      showToast('Не вдалося видалити збірку');
    }
  };

  const handleDownload = (title) => {
    showToast(`Підготовлено архів «${title}.zip» до завантаження`);
  };

  return (
    <PageLayout activePage="modpacks">
      <div className={styles.pageContent}>
        <ModpackFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeLoader={activeLoader}
          onLoaderChange={setActiveLoader}
        />

        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            Мої збірки ({filteredModpacks.length})
          </h1>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/builder')}
          >
            + Новий модпак
          </Button>
        </div>

        {notification && (
          <div className={styles.toast} role="status">
            {notification}
          </div>
        )}

        {error && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        {loading && modpacks.length === 0 ? (
          <p className={styles.emptyState}>Завантаження збірок...</p>
        ) : filteredModpacks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Збірок за вашим запитом не знайдено.</p>
          </div>
        ) : (
          <section className={styles.grid} aria-label="Список збірок">
            {filteredModpacks.map((pack) => (
              <ModpackCard
                key={pack.id}
                title={pack.title}
                loader={pack.loader}
                version={pack.version}
                modsCount={pack.modsCount}
                size={pack.size}
                updatedAt={pack.updatedAt}
                onEdit={() => navigate(`/builder?id=${pack.id}`)}
                onDelete={() => handleDelete(pack)}
                onDownload={handleDownload}
              />
            ))}
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default MyModpacksPage;
