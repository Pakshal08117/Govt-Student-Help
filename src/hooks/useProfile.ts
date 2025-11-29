import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type ProfileInsert = TablesInsert<'profiles'>;
type ProfileUpdate = TablesUpdate<'profiles'>;

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user profile
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user?.id,
  });

  // Create profile mutation
  const createProfile = useMutation({
    mutationFn: async (profileData: Omit<ProfileInsert, 'id'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({ 
          ...profileData, 
          id: user.id,
          email: user.email 
        })
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  // Check if username is available
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    if (!username) return false;
    
    let query = supabase
      .from('profiles')
      .select('username')
      .eq('username', username);
    
    // Only exclude current user if we have a valid user ID
    if (user?.id) {
      query = query.neq('id', user.id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.length === 0;
  };

  return {
    profile,
    isLoading,
    error,
    createProfile,
    updateProfile,
    checkUsernameAvailability,
  };
}
