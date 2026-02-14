import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EssentialModeContextType {
  isEssentialMode: boolean;
  toggleEssentialMode: () => void;
}

const EssentialModeContext = createContext<EssentialModeContextType | undefined>(undefined);

export function EssentialModeProvider({ children }: { children: ReactNode }) {
  const [isEssentialMode, setIsEssentialMode] = useState<boolean>(() => {
    // Safe localStorage access with fallback
    try {
      const stored = localStorage.getItem('essentialMode');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Save to localStorage with error handling
    try {
      localStorage.setItem('essentialMode', String(isEssentialMode));
    } catch {
      // Silently fail if localStorage is unavailable
    }
    
    // Add/remove class to body for CSS targeting
    if (isEssentialMode) {
      document.body.classList.add('essential-mode');
    } else {
      document.body.classList.remove('essential-mode');
    }
  }, [isEssentialMode]);

  const toggleEssentialMode = () => {
    setIsEssentialMode(prev => !prev);
  };

  return (
    <EssentialModeContext.Provider value={{ isEssentialMode, toggleEssentialMode }}>
      {children}
    </EssentialModeContext.Provider>
  );
}

export function useEssentialMode() {
  const context = useContext(EssentialModeContext);
  // Graceful fallback if context is missing
  if (!context) {
    return { isEssentialMode: false, toggleEssentialMode: () => {} };
  }
  return context;
}
