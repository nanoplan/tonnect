// src/telegram.ts
export interface TelegramUser {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export function getTelegramUser(): TelegramUser | null {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg) return null;

  tg.ready(); // penting agar Telegram WebApp siap
  const u = tg.initDataUnsafe?.user;
  if (!u) return null;

  return {
    id: u.id,
    username: u.username,
    firstName: u.first_name,
    lastName: u.last_name,
  };
}
