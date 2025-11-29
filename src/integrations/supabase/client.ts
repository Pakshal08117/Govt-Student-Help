// Enhanced Supabase client with proper error handling
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables with validation
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL is not defined in environment variables. Please check your .env file.');
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined in environment variables. Please check your .env file.');
}

// Validate URL format
if (!SUPABASE_URL.startsWith('https://') || !SUPABASE_URL.includes('.supabase.co')) {
  throw new Error('Invalid SUPABASE_URL format. Expected format: https://your-project-ref.supabase.co');
}

// Create the Supabase client with enhanced configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});
