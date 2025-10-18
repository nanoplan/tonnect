export interface TelegramUser {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export function getTelegramUser(): TelegramUser | null {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg?.initDataUnsafe?.user) return null;

  const u = tg.initDataUnsafe.user;

  return {
    id: u.id,
    username: u.username,
    firstName: u.first_name,
    lastName: u.last_name,
  };
}
