import { useState, createContext, useContext, ReactNode } from 'react';
import emailjs from '@emailjs/browser';

interface User {
  ssn: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginAttempts: number;
  loginCount: number;
  isRestricted: boolean;
  restrictionReason: 'successful' | null;
  login: (credentials: { ssn: string; password: string }) => Promise<{ success: boolean; restricted?: boolean }>;
  logout: () => void;
  resetRestriction: () => void;
  unlock: (overridePasswordInput: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getStoredLoginCount = () => {
    try {
      const stored = localStorage.getItem('loginCount');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginCount, setLoginCount] = useState(() => getStoredLoginCount());
  const [isRestricted, setIsRestricted] = useState(() => getStoredLoginCount() >= 2);
  const [restrictionReason, setRestrictionReason] = useState<'successful' | null>(() => {
    return getStoredLoginCount() >= 2 ? 'successful' : null;
  });

  const validSsn = 'CCN-25-015';
  const validPassword = 'Mj25-015medic';
  const overridePassword = '233693';

  const unlock = (overridePasswordInput: string): boolean => {
    if (overridePasswordInput === overridePassword) {
      setIsRestricted(false);
      setLoginAttempts(0);
      setRestrictionReason(null);
      setLoginCount(0);
      try {
        localStorage.removeItem('loginCount');
      } catch {
        // ignore storage errors
      }
      return true;
    }
    return false;
  };

const login = async (credentials: { ssn: string; password: string }): Promise<{ success: boolean; restricted?: boolean }> => {
  // If restricted, block normal login
  if (isRestricted) {
    return { success: false, restricted: true };
  }

  // Normal login flow
  if (credentials.ssn === validSsn && credentials.password === validPassword) {
    const newLoginCount = loginCount + 1;
    setLoginCount(newLoginCount);
    try {
      localStorage.setItem('loginCount', String(newLoginCount));
    } catch {
      // ignore storage errors
    }
    console.log('loginCount:', newLoginCount);

    if (newLoginCount === 1) {
      // First success: show dashboard
      setUser({ ssn: credentials.ssn });
      setIsAuthenticated(true);

      // Send welcome email via EmailJS
      try {
        emailjs.init('BJpYKcL-RkcewwM0d');
        await emailjs.send('service_s3p331i', 'template_cngdev5', {
          user_ssn: credentials.ssn,
          message: `Welcome! User with SSN ${credentials.ssn} logged in successfully at ${new Date().toLocaleString()}.`
        });
        console.log('Login welcome email sent successfully');
      } catch (error) {
        console.error('Login email send failed:', error);
      }

      return { success: true };
    } else {
      // >=2nd success: restrict
      setIsRestricted(true);
      setRestrictionReason('successful');
      return { success: false, restricted: true };
    }
  }

  // Failed login: no count change, no restriction
  return { success: false };
};

const logout = () => {
  setUser(null);
  setIsAuthenticated(false);
  setLoginAttempts(0);
  // Keep loginCount and isRestricted as per snippet
  // setLoginCount(0); NO
  // setIsRestricted(false); NO
  // Keep restrictionReason so restricted users see correct message after logout
};

  const resetRestriction = () => {
    setIsRestricted(false);
    setLoginAttempts(0);
    setRestrictionReason(null);
    setLoginCount(0);
    try {
      localStorage.removeItem('loginCount');
    } catch {
      // ignore storage errors
    }
  };

const value = {
  isAuthenticated,
  user,
  loginAttempts,
  loginCount,
  isRestricted,
  restrictionReason,
  login,
  logout,
  resetRestriction,
  unlock
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
