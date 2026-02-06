import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LowBandwidthContextType {
  isLowBandwidth: boolean;
  toggleLowBandwidth: () => void;
  setLowBandwidth: (enabled: boolean) => void;
}

const LowBandwidthContext = createContext<LowBandwidthContextType | undefined>(undefined);

export function LowBandwidthProvider({ children }: { children: ReactNode }) {
  const [isLowBandwidth, setIsLowBandwidthState] = useState<boolean>(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('lowBandwidthMode');
    return stored === 'true';
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('lowBandwidthMode', String(isLowBandwidth));
    
    // Add/remove class to body for global CSS targeting
    if (isLowBandwidth) {
      document.body.classList.add('low-bandwidth-mode');
      // Disable animations globally
      document.body.style.setProperty('--animation-duration', '0s');
      document.body.style.setProperty('--transition-duration', '0s');
    } else {
      document.body.classList.remove('low-bandwidth-mode');
      document.body.style.removeProperty('--animation-duration');
      document.body.style.removeProperty('--transition-duration');
    }
  }, [isLowBandwidth]);

  const toggleLowBandwidth = () => {
    setIsLowBandwidthState(prev => !prev);
  };

  const setLowBandwidth = (enabled: boolean) => {
    setIsLowBandwidthState(enabled);
  };

  return (
    <LowBandwidthContext.Provider value={{ isLowBandwidth, toggleLowBandwidth, setLowBandwidth }}>
      {children}
    </LowBandwidthContext.Provider>
  );
}

export function useLowBandwidth() {
  const context = useContext(LowBandwidthContext);
  if (!context) {
    throw new Error('useLowBandwidth must be used within LowBandwidthProvider');
  }
  return context;
}
