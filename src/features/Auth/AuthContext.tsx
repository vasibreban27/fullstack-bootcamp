import { createContext, use, useState, type ReactNode } from "react";
import type { Auth } from "./types";

const AuthContext = createContext<Auth & {
  login: (auth: Auth) => void;  
  logout: () => void;
} | null>(null);

const initialAuthValue: Auth = {
  accessToken: null,
  user: null,
} as const;

const storageKey = 'auth';

export function AuthContextProvider({children}: {children: ReactNode}) {
  const [auth, setAuth] = useState(() => {
    const fromStorage = localStorage.getItem(storageKey);
    if(fromStorage) {
      return JSON.parse(fromStorage);
    }
    return initialAuthValue;
  });

  function login(auth: Auth) {
    setAuth(auth);
    localStorage.setItem(storageKey, JSON.stringify(auth));
  }

  function logout() {
    setAuth(initialAuthValue);
    localStorage.removeItem(storageKey);
  }

  return (
    <AuthContext value={{ ...auth, login, logout }}>{children}</AuthContext>
  )
}

export function useAuth() {
  const ctx = use(AuthContext);

  if(!ctx) {
    throw new Error('"useAuth" should only be used in a child of <AuthContextProvider>!');
  }

  return ctx;
}
