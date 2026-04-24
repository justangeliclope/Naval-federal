import { useState, createContext, useContext, ReactNode } from 'react';

interface User {
  ssn: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { ssn: string; password: string }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (credentials: { ssn: string; password: string }) => {
    const validSsn = 'CCN-25-015';
    const validPassword = 'Mj25-015medic';
    if (credentials.ssn === validSsn && credentials.password === validPassword) {
      setUser({ ssn: credentials.ssn });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
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
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

