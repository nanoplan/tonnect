import { supabase } from "@/lib/supabase";
import { getTelegramUser } from "./telegram";

export async function signInWithTelegram() {
  try {
    const user = getTelegramUser();
    // jika tidak ada Telegram (webapp), langsung return null (non-blocking)
    if (!user) return null;

    // jika id bukan numeric (mis. "guest"), jangan panggil Supabase — return user sebagai guest
    if (!/^\d+$/.test(String(user.id))) {
      return { ...user, guest: true };
    }

    // jika numeric, lakukan upsert (sesuaikan nama kolom di DB kamu: telegram_id / id)
    const payload = { telegram_id: Number(user.id), username: user.username };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: ["telegram_id"] })
      .select()
      .single();

    if (error) {
      console.warn("Supabase upsert warning:", error);
      // jangan throw — return user minimal supaya UI tetap jalan
      return { ...user, guest: false };
    }

    return data ?? { ...user, guest: false };
  } catch (err) {
    console.error("signInWithTelegram error:", err);
    return null; // jangan throw
  }
}
