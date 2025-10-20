import { createClient } from '@supabase/supabase-js'

// Kredensial dibaca dari Environment Variables (Vercel → Project → Settings → Environment Variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase environment variables not set. Please check your Vercel settings.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
