import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeContextType {
  applications: any[];
  schemes: any[];
  isConnected: boolean;
  lastUpdate: Date | null;
}

const RealtimeContext = createContext<RealtimeContextType>({
  applications: [],
  schemes: [],
  isConnected: false,
  lastUpdate: null
});

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Initial data fetch
    fetchInitialData();

    // Set up realtime subscriptions
    const applicationsChannel = supabase
      .channel('applications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications'
        },
        (payload) => {
          console.log('Applications change:', payload);
          handleApplicationsChange(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log('Connected to applications realtime');
        }
      });

    const schemesChannel = supabase
      .channel('schemes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'schemes'
        },
        (payload) => {
          console.log('Schemes change:', payload);
          handleSchemesChange(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Connected to schemes realtime');
        }
      });

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(applicationsChannel);
      supabase.removeChannel(schemesChannel);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch applications
      const { data: appsData } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (appsData) setApplications(appsData);

      // Fetch schemes
      const { data: schemesData } = await supabase
        .from('schemes')
        .select('*')
        .eq('is_active', true);
      
      if (schemesData) setSchemes(schemesData);

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleApplicationsChange = (payload: any) => {
    setLastUpdate(new Date());

    if (payload.eventType === 'INSERT') {
      setApplications(prev => [payload.new, ...prev]);
    } else if (payload.eventType === 'UPDATE') {
      setApplications(prev =>
        prev.map(app => app.id === payload.new.id ? payload.new : app)
      );
    } else if (payload.eventType === 'DELETE') {
      setApplications(prev =>
        prev.filter(app => app.id !== payload.old.id)
      );
    }
  };

  const handleSchemesChange = (payload: any) => {
    setLastUpdate(new Date());

    if (payload.eventType === 'INSERT') {
      setSchemes(prev => [...prev, payload.new]);
    } else if (payload.eventType === 'UPDATE') {
      setSchemes(prev =>
        prev.map(scheme => scheme.id === payload.new.id ? payload.new : scheme)
      );
    } else if (payload.eventType === 'DELETE') {
      setSchemes(prev =>
        prev.filter(scheme => scheme.id !== payload.old.id)
      );
    }
  };

  return (
    <RealtimeContext.Provider
      value={{
        applications,
        schemes,
        isConnected,
        lastUpdate
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider');
  }
  return context;
}
