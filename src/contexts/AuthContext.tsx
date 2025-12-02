import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../lib/api';
import { RegisterData, User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: apiUser } = response.data;
      
      // Normalize Backend Data
      const userData: User = {
        id: apiUser.id,
        email: apiUser.email || email,
        name: apiUser.fullName || apiUser.name, // Backend uses fullName
        role: (apiUser.role || 'client').toLowerCase() as UserRole, // Normalize "Client" -> "client"
        company: apiUser.companyName
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      console.error("Login Failed", error);
      // Re-throw the specific error message from backend (e.g., "Account is Pending Approval")
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await api.post('/auth/register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        mobile: data.phone,
        companyName: data.companyName,
        role: 'Client'
      });
    } catch (error: any) {
      console.error("Registration Failed", error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};