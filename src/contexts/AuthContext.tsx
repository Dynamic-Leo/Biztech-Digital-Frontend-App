import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../services/api'; // Using the api service created above
import { User, UserRole, RegisterData } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user data");
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: apiUser } = response;
      
      // Normalize Backend Data to match frontend User Interface
      const userData: User = {
        id: apiUser.id,
        email: apiUser.email || email,
        name: apiUser.fullName || apiUser.name, // Handle backend variation
        role: (apiUser.role || 'client').toLowerCase() as UserRole, // Normalize "Client" -> "client"
        company: apiUser.companyName || apiUser.company
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      console.error("Login Failed", error);
      throw error; // Let the UI handle the specific error message
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
        role: 'Client' // Default role for public registration
      });
    } catch (error: any) {
      console.error("Registration Failed", error);
      throw error;
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
    isLoading
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export { UserRole };
