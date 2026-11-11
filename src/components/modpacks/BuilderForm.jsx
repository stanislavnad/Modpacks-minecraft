import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModpacks } from '../../hooks/useModpacks';
import { calculateModpackSize, parseModInput } from '../../utils/modpackUtils';
import Button from '../ui/Button';
import Chip from '../ui/Chip';
import Input from '../ui/Input';
import Select from '../ui/Select';
import styles from './BuilderForm.module.css';

const VERSIONS = ['1.21.1', '1.20.4', '1.20.1', '1.19.2', '1.18.2'];
const LOADERS = ['Fabric', 'Forge', 'NeoForge', 'Quilt'];
const DEFAULT_MODS = ['JEI', 'Sodium', 'Iris Shaders', 'Lithium'];

function BuilderForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');

  const {
    getModpackById,
    createModpack,
    updateModpack,
    loading,
    error: apiError,
  } = useModpacks({ immediate: false });

  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('1.21.1');
  const [loader, setLoader] = useState('Fabric');
  const [mods, setMods] = useState(DEFAULT_MODS);
  const [modInput, setModInput] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editId) return;
    let isMounted = true;

    getModpackById(editId)
      .then((pack) => {
        if (!isMounted || !pack) return;
        setTitle(pack.title || '');
        setVersion(pack.version || '1.21.1');
        setLoader(pack.loader || 'Fabric');
        setMods(
          Array.isArray(pack.mods) && pack.mods.length > 0
            ? pack.mods
            : DEFAULT_MODS,
        );
      })
      .catch(() => {
        if (isMounted) {
          setFormError('Не вдалося завантажити дані збірки для редагування');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [editId, getModpackById]);

  const handleAddMod = () => {
    setFormError('');
    const parsedName = parseModInput(modInput);
    if (!parsedName) {
      setFormError('Введіть назву або посилання на мод');
      return;
    }

    const exists = mods.some(
      (item) => item.toLowerCase() === parsedName.toLowerCase(),
    );
    if (exists) {
      setFormError(`Мод «${parsedName}» вже додано до списку`);
      return;
    }

    setMods((prev) => [...prev, parsedName]);
    setModInput('');
  };

  const handleModInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddMod();
    }
  };

  const handleRemoveMod = (modToRemove) => {
    setMods((prev) => prev.filter((mod) => mod !== modToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setFormError('Вкажіть назву збірки');
      return;
    }

    if (mods.length === 0) {
      setFormError('Додайте щонайменше один мод у збірку');
      return;
    }

    const payload = {
      title: trimmedTitle,
      version,
      loader,
      mods,
      modsCount: mods.length,
      size: calculateModpackSize(mods.length),
    };

    try {
      if (editId) {
        await updateModpack(editId, payload);
      } else {
        await createModpack(payload);
      }
      navigate('/modpacks');
    } catch {
      // Помилка відображається через apiError
    }
  };

  const activeError = formError || apiError;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {editId ? 'Редагування модпаку' : 'Створення нового модпаку'}
        </h1>
        <p className={styles.subtitle}>
          Задай базові параметри, додай моди та підготуй архів для експорту.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {activeError && (
          <div className={styles.errorBox} role="alert">
            {activeError}
          </div>
        )}

        <Input
          label="Назва збірки"
          placeholder="Наприклад: Medieval Vanilla+"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          label="Версія Minecraft"
          options={VERSIONS}
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Тип модлоадера</span>
          <div className={styles.loadersRow}>
            {LOADERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLoader(item)}
                className={`${styles.loaderBtn} ${
                  loader === item ? styles.loaderActive : ''
                }`.trim()}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Додавання модів</span>
          <div className={styles.addModRow}>
            <div className={styles.addModInput}>
              <Input
                placeholder="Назва або посилання на мод"
                value={modInput}
                onChange={(e) => setModInput(e.target.value)}
                onKeyDown={handleModInputKeyDown}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              className={styles.addBtn}
              onClick={handleAddMod}
            >
              + Додати
            </Button>
          </div>
          <p className={styles.hint}>
            Підтримуються посилання з Modrinth, CurseForge і GitHub-релізів.
          </p>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>
            Додані моди ({mods.length})
          </span>
          <div className={styles.modsContainer}>
            {mods.length === 0 ? (
              <span className={styles.emptyMods}>
                Список модів порожній — додайте перший мод вище
              </span>
            ) : (
              mods.map((mod) => (
                <Chip
                  key={mod}
                  label={mod}
                  onRemove={() => handleRemoveMod(mod)}
                />
              ))
            )}
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
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Збереження...' : 'Зберегти'}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default BuilderForm;
