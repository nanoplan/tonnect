import { supabase } from "./supabase";
import { getTelegramUser } from "./telegram";

export async function signInWithTelegram() {
  const user = getTelegramUser();
  console.log("🔹 Telegram user detected:", user);

  if (!user) {
    console.error("❌ No Telegram user found");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: user.username })
      .select()
      .single();

    if (error) throw error;

    console.log("✅ Supabase profile synced:", data);
    return data;
  } catch (err) {
    console.error("❌ Supabase error:", err);
    return null;
  }
}
