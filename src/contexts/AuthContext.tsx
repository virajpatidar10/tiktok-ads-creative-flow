import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { oauthService } from '../services/oauthService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const storedToken = oauthService.getStoredToken();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // In a real app, you might want to validate the token and get user info
      setUser({
        id: 'demo_user_123',
        name: 'Demo TikTok User',
        email: 'demo@tiktok.com'
      });
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsLoading(true);
    oauthService.initiateLogin();
  };

  const logout = () => {
    oauthService.logout();
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const newToken = await oauthService.refreshToken();
      setToken(newToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    token,
    user,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};