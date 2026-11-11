import { useCallback } from 'react';
import { useFetch } from './useFetch';

/**
 * Користувацький хук для роботи зі збірками модів (CRUD операції через useFetch)
 */
export function useModpacks({ immediate = true } = {}) {
  const {
    data: modpacks,
    setData: setModpacks,
    loading,
    error,
    setError,
    get,
    post,
    put,
    remove,
  } = useFetch('/api/modpacks', { immediate });

  const fetchModpacks = useCallback(() => {
    return get('/api/modpacks');
  }, [get]);

  const getModpackById = useCallback(
    (id) => {
      return get(`/api/modpacks/${id}`, { updateData: false });
    },
    [get],
  );

  const createModpack = useCallback(
    async (modpackData) => {
      const created = await post('/api/modpacks', modpackData);
      setModpacks((prev) => (Array.isArray(prev) ? [created, ...prev] : [created]));
      return created;
    },
    [post, setModpacks],
  );

  const updateModpack = useCallback(
    async (id, modpackData) => {
      const updated = await put(`/api/modpacks/${id}`, modpackData);
      setModpacks((prev) =>
        Array.isArray(prev)
          ? prev.map((item) => (item.id === id ? updated : item))
          : [updated],
      );
      return updated;
    },
    [put, setModpacks],
  );

  const deleteModpack = useCallback(
    async (id) => {
      await remove(`/api/modpacks/${id}`);
      setModpacks((prev) =>
        Array.isArray(prev) ? prev.filter((item) => item.id !== id) : [],
      );
    },
    [remove, setModpacks],
  );

  return {
    modpacks: Array.isArray(modpacks) ? modpacks : [],
    loading,
    error,
    setError,
    fetchModpacks,
    getModpackById,
    createModpack,
    updateModpack,
    deleteModpack,
  };
}

export default useModpacks;
