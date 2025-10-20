import { supabase } from "./supabase";
import { getTelegramUser } from "./telegram";

export async function signInWithTelegram() {
  try {
    const user = getTelegramUser();

    if (!user) {
      console.warn("⚠️ Telegram WebApp not detected. Using guest user.");
      return { id: "guest", username: "guest_user" };
    }

    // Pastikan Supabase terdefinisi (env variabel di Vercel)
    if (!supabase) {
      console.error("❌ Supabase client not initialized.");
      return { id: user.id, username: user.username ?? "unknown_user" };
    }

    // Simpan atau update user di tabel Supabase
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: user.username })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("signInWithTelegram() error:", err);
    return { id: "guest", username: "guest_user" };
  }
}
