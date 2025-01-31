import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as loginApi, register as registerApi, getCurrentUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      console.log('Loading user with token');
      const { user } = await getCurrentUser();
      console.log('User loaded:', user);
      setUser(user);
      return true;
    } catch (err) {
      console.error('Error loading user:', err);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await loadUser();
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [loadUser]);

  const login = async (credentials) => {
    try {
      setError(null);
      console.log('Attempting login with:', credentials.email);
      
      const response = await loginApi(credentials);
      console.log('Login response:', response);
      
      if (!response?.token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response.user;
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      console.log('Attempting registration with:', userData.email);
      
      const response = await registerApi(userData);
      console.log('Registration response:', response);
      
      if (!response?.token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response.user;
    } catch (err) {
      console.error('Registration error:', err);
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = useCallback(() => {
    console.log('Logging out');
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
