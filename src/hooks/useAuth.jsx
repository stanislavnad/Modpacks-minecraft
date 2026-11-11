/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import { getStoredSession, setupMockServer } from '../services/mockServer';
import { useFetch } from './useFetch';

setupMockServer();

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = getStoredSession();
    return session?.user || null;
  });

  const { loading, error, setError, post } = useFetch(null, {
    immediate: false,
  });

  const login = useCallback(
    async ({ email, password }) => {
      const response = await post('/api/auth/login', { email, password });
      setUser(response.user);
      return response.user;
    },
    [post],
  );

  const register = useCallback(
    async ({ username, email, password }) => {
      const response = await post('/api/auth/register', {
        username,
        email,
        password,
      });
      setUser(response.user);
      return response.user;
    },
    [post],
  );

  const loginWithGithub = useCallback(async () => {
    const response = await post('/api/auth/github', {});
    setUser(response.user);
    return response.user;
  }, [post]);

  const logout = useCallback(async () => {
    await post('/api/auth/logout', {});
    setUser(null);
  }, [post]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    error,
    clearError,
    login,
    register,
    loginWithGithub,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Користувацький хук для авторизації користувача
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth має використовуватися всередині AuthProvider');
  }
  return context;
}

export default useAuth;
