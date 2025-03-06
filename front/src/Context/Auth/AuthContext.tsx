import { createContext } from "react";

import type { User } from "../../Types/Auth";


export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => void,
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const AuthContext = createContext<AuthContextType>(null!);