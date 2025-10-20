import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({ id: "guest", username: "guest_user" });

  useEffect(() => {
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.initDataUnsafe?.user) {
        const { id, username } = tg.initDataUnsafe.user;
        setUser({ id: String(id), username });
      }
    } catch (err) {
      console.warn("⚠️ Telegram not detected, fallback to guest");
    }
  }, []);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
