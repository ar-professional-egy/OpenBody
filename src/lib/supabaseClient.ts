import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ? String(import.meta.env.VITE_SUPABASE_URL) : 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ? String(import.meta.env.VITE_SUPABASE_ANON_KEY) : 'placeholder_key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase credentials are not set. Please update your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
