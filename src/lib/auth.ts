import { supabase } from "./supabase";
import { getTelegramUser } from "./telegram";

export async function signInWithTelegram() {
  const user = getTelegramUser();
  if (!user) return null;

  // Sesuaikan dengan tabel kamu di Supabase (misal "profiles")
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, username: user.username })
    .select()
    .single();

  if (error) throw error;
  return data;
}
