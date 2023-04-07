import { createContext, useContext } from "react";
import { User } from "types/api";

type IAuthContext = {
    user: Omit<User, "password"> | null;
    setUser: (user: Omit<User, "password">) => void;
}

const AuthContext = createContext<IAuthContext>({ user: null, setUser: () => {
    console.warn("No user provider");
}});

export const AuthContextProvider = AuthContext.Provider;

export const useAuthContext = () => useContext(AuthContext);
