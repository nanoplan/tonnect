export function getTelegramUser() {
  const tg = window.Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user) return tg.initDataUnsafe.user;

  // fallback saat testing di browser
  console.warn("⚠️ Telegram user not detected. Fallback to guest mode.");
  return { id: "guest", username: "guest_user" };
}
