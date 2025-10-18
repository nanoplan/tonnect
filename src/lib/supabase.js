import { createClient } from '@supabase/supabase-js';

// Kredensial dibaca dari Environment Variables yang Anda masukkan di Vercel.
// Pastikan variabel ini sudah dimasukkan ke Vercel:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Pesan error jika environment variables belum disetel
  console.error("Supabase environment variables not set. Please check Vercel settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
