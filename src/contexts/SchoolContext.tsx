import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SchoolConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  motto?: string;
  features: {
    messaging: boolean;
    events: boolean;
    reportDownload: boolean;
    payments: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'teacher' | 'admin';
  schoolId: string;
  children?: Child[];
}

export interface Child {
  id: string;
  name: string;
  grade: string;
  class: string;
  studentId: string;
}

interface SchoolContextType {
  school: SchoolConfig | null;
  user: User | null;
  selectedChild: Child | null;
  setSchool: (school: SchoolConfig) => void;
  setUser: (user: User) => void;
  setSelectedChild: (child: Child) => void;
  applySchoolTheme: (config: SchoolConfig) => void;
  logout: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [school, setSchoolState] = useState<SchoolConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const setSchool = (schoolConfig: SchoolConfig) => {
    setSchoolState(schoolConfig);
    applySchoolTheme(schoolConfig);
  };

  const applySchoolTheme = (config: SchoolConfig) => {
    const root = document.documentElement;
    
    // Convert hex to HSL and apply
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    if (config.primaryColor) {
      root.style.setProperty('--school-primary', hexToHsl(config.primaryColor));
      root.style.setProperty('--primary', hexToHsl(config.primaryColor));
    }
    if (config.secondaryColor) {
      root.style.setProperty('--school-secondary', hexToHsl(config.secondaryColor));
    }
    if (config.accentColor) {
      root.style.setProperty('--school-accent', hexToHsl(config.accentColor));
    }
  };

  const logout = () => {
    setUser(null);
    setSchoolState(null);
    setSelectedChild(null);
    
    // Reset theme to default
    const root = document.documentElement;
    root.style.removeProperty('--school-primary');
    root.style.removeProperty('--primary');
    root.style.removeProperty('--school-secondary');
    root.style.removeProperty('--school-accent');
  };

  return (
    <SchoolContext.Provider value={{
      school,
      user,
      selectedChild,
      setSchool,
      setUser,
      setSelectedChild,
      applySchoolTheme,
      logout,
    }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};