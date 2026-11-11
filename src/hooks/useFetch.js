import { useCallback, useEffect, useState } from 'react';
import { setupMockServer } from '../services/mockServer';

setupMockServer();

/**
 * Користувацький хук для отримання (GET) та відправки (POST/PUT/DELETE) даних через fetch
 */
export function useFetch(initialUrl = null, { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(initialUrl && immediate));
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    const { updateData = true, ...fetchOptions } = options;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(fetchOptions.headers || {}),
        },
        ...fetchOptions,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || `Помилка запиту (${response.status})`;
        throw new Error(message);
      }

      if (updateData) {
        setData(result);
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Невідома помилка мережі';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(
    (url = initialUrl, options = {}) =>
      request(url, { ...options, method: 'GET' }),
    [initialUrl, request],
  );

  const post = useCallback(
    (url, body, options = {}) =>
      request(url, {
        updateData: false,
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
      }),
    [request],
  );

  const put = useCallback(
    (url, body, options = {}) =>
      request(url, {
        updateData: false,
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
      }),
    [request],
  );

  const remove = useCallback(
    (url, options = {}) =>
      request(url, {
        updateData: false,
        ...options,
        method: 'DELETE',
      }),
    [request],
  );

  useEffect(() => {
    if (initialUrl && immediate) {
      get(initialUrl).catch(() => {});
    }
  }, [initialUrl, immediate, get]);

  return {
    data,
    setData,
    loading,
    error,
    setError,
    request,
    get,
    post,
    put,
    remove,
  };
}

export default useFetch;
