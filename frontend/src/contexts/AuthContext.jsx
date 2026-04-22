import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ── Restore session on mount ─────────────────────────────── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('st360_user');
      const token = localStorage.getItem('st360_token');
      if (saved && token) {
        const userData = JSON.parse(saved);
        setUser(userData);
        apiService.setToken(token);
      }
    } catch {
      localStorage.removeItem('st360_user');
      localStorage.removeItem('st360_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const result = await apiService.login(credentials);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('st360_user',  JSON.stringify(result.user));
        localStorage.setItem('st360_token', result.token);
        apiService.setToken(result.token);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const result = await apiService.signup(userData);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('st360_user',  JSON.stringify(result.user));
        localStorage.setItem('st360_token', result.token);
        apiService.setToken(result.token);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('st360_user');
    localStorage.removeItem('st360_token');
    apiService.setToken(null);
  }, []);

  const updateUser = useCallback((updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('st360_user', JSON.stringify(updated));
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
