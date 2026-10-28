import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Chip from '../ui/Chip';
import Input from '../ui/Input';
import Select from '../ui/Select';
import styles from './BuilderForm.module.css';

const VERSIONS = ['1.21.1', '1.20.4', '1.20.1', '1.19.2', '1.18.2'];
const LOADERS = [
  { id: 'fabric', label: 'Fabric', active: true },
  { id: 'forge', label: 'Forge', active: false },
  { id: 'neoforge', label: 'NeoForge', active: false },
  { id: 'quilt', label: 'Quilt', active: false },
];
const ADDED_MODS = ['JEI', 'Sodium', 'Iris Shaders', 'Lithium'];

function BuilderForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/modpacks');
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Створення нового модпаку</h1>
        <p className={styles.subtitle}>
          Задай базові параметри, додай моди та підготуй архів для експорту.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Назва збірки"
          placeholder="Наприклад: Medieval Vanilla+"
        />

        <Select
          label="Версія Minecraft"
          options={VERSIONS}
          defaultValue="1.21.1"
        />

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Тип модлоадера</span>
          <div className={styles.loadersRow}>
            {LOADERS.map((loader) => (
              <button
                key={loader.id}
                type="button"
                className={`${styles.loaderBtn} ${
                  loader.active ? styles.loaderActive : ''
                }`.trim()}
              >
                {loader.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Додавання модів</span>
          <div className={styles.addModRow}>
            <div className={styles.addModInput}>
              <Input placeholder="Назва або посилання на мод" />
            </div>
            <Button variant="primary" size="md" className={styles.addBtn}>
              + Додати
            </Button>
          </div>
          <p className={styles.hint}>
            Підтримуються посилання з Modrinth, CurseForge і GitHub-релізів.
          </p>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Додані моди</span>
          <div className={styles.modsContainer}>
            {ADDED_MODS.map((mod) => (
              <Chip key={mod} label={mod} />
            ))}
          </div>
        </div>

        <div className={styles.footerActions}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/modpacks')}
          >
            Скасувати
          </Button>
          <Button variant="primary" size="md" type="submit">
            Зберегти
          </Button>
        </div>
      </form>
    </section>
  );
}

export default BuilderForm;
