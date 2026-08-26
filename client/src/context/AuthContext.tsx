import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem('codevault_token');
      
      if (savedToken) {
        setToken(savedToken);
        try {
          // If token exists, api interceptor automatically adds it to headers
          const res = await api.get('/auth/me');
          setUser(res.data);
          localStorage.setItem('codevault_user', JSON.stringify(res.data));
        } catch (error) {
          console.error('Failed to authenticate user', error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('codevault_token');
          localStorage.removeItem('codevault_user');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('codevault_token', newToken);
    localStorage.setItem('codevault_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('codevault_token');
    localStorage.removeItem('codevault_user');
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updatedFields };
      setUser(updated);
      localStorage.setItem('codevault_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
