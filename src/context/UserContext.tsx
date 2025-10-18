import { createContext, useContext } from "react";

interface UserContextType {
  userId: string | null;
}

export const UserContext = createContext<UserContextType>({ userId: null });

export function useUser() {
  return useContext(UserContext);
}
