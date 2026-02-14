import { useState, useEffect } from 'react';
import { getGovernmentSchemes, getDataSourceStatus, refreshGovernmentDataInBackground } from '@/services/governmentDataService';

interface GovernmentScheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  category: string;
  state: string;
  benefits: string[];
  eligibility: any;
  website?: string;
  helpline?: string;
  lastUpdated?: string;
}

interface UseGovernmentDataReturn {
  schemes: GovernmentScheme[];
  loading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback';
  lastUpdated: string;
  refresh: () => Promise<void>;
  status: {
    hasCache: boolean;
    cacheAge: string;
    needsRefresh: boolean;
  } | null;
}

/**
 * Hook to fetch and manage government scheme data
 * - Loads cached data immediately (fast startup)
 * - Refreshes in background if needed
 * - Provides loading states and error handling
 */
export function useGovernmentData(): UseGovernmentDataReturn {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'cache' | 'fallback'>('cache');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [status, setStatus] = useState<{
    hasCache: boolean;
    cacheAge: string;
    needsRefresh: boolean;
  } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getGovernmentSchemes();
      
      setSchemes(result.schemes);
      setSource(result.source);
      setLastUpdated(result.lastUpdated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load government data';
      setError(errorMessage);
      console.error('Error loading government data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStatus = async () => {
    try {
      const statusData = await getDataSourceStatus();
      setStatus(statusData);
    } catch (err) {
      console.error('Error loading status:', err);
    }
  };

  useEffect(() => {
    // Load data immediately
    loadData();
    
    // Load status
    loadStatus();

    // Trigger background refresh (non-blocking)
    refreshGovernmentDataInBackground();
  }, []);

  const refresh = async () => {
    await loadData();
    await loadStatus();
  };

  return {
    schemes,
    loading,
    error,
    source,
    lastUpdated,
    refresh,
    status,
  };
}
