import {createContext, type ReactNode, useContext, useState} from 'react';
import type {Auth} from './types';
const AuthContext = createContext<Auth & {
    login: (auth:Auth) => void;
    logout: () => void;
}|null>(null);

const initialValue: Auth = {
    accessToken: null,
    user: null,
}as const;


export function AuthContextProvider({children}: {children: ReactNode}) {
    const [auth, setAuth] = useState(initialValue);

    function login(auth:Auth) {
        setAuth(auth);
    }

    function logout() {
        setAuth(initialValue);
    }

    return (
        <AuthContext value={{...auth, login, logout}}>{children}</AuthContext>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if(!ctx) {
        throw new Error('useAuth hook should be used in a child of AuthContextProvider');
    }

    return ctx;
}


