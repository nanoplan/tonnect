import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables not set.");
} else {
  console.log("✅ Supabase URL loaded:", supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
