//import { createContext, use, useState, type ReactNode } from "react";
import type { Auth } from "./types";
import {atomWithStorage, RESET} from "jotai/utils";
import {useAtom} from "jotai";

const storageKey = 'auth';

const initialAuthValue: Auth = {
  accessToken: null,
  user: null,
} as const;

const authAtom = atomWithStorage(storageKey, initialAuthValue,undefined, {getOnInit: true});

export function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);

  function login(auth: Auth) {
    setAuth(auth);
  }

  function logout() {
    setAuth(RESET);
  }

  return {...auth, login, logout};
}
