import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLang } from '@/contexts/LanguageContext';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    if (!navigator.onLine) {
      setShowOfflineAlert(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineAlert && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-50 px-4">
      <Alert
        variant={isOnline ? 'default' : 'destructive'}
        className="max-w-2xl mx-auto shadow-lg"
      >
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
          <AlertDescription>
            {isOnline ? (
              <span className="text-green-600 dark:text-green-400">
                {t('online_mode') || 'You are back online'}
              </span>
            ) : (
              <span>
                {t('offline_mode') || 'You are offline. Some features may be limited.'}
              </span>
            )}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

// Compact offline badge for header
export const OfflineBadge = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { t } = useLang();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-md text-xs">
      <WifiOff className="h-3 w-3" />
      <span>{t('offline') || 'Offline'}</span>
    </div>
  );
};
