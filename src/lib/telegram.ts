export function getTelegramUser() {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg) return null;

  return {
    id: tg.initDataUnsafe?.user?.id,
    username: tg.initDataUnsafe?.user?.username,
    firstName: tg.initDataUnsafe?.user?.first_name,
    lastName: tg.initDataUnsafe?.user?.last_name,
  };
}
