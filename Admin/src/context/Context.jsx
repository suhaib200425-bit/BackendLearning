import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [User, setUser] = useState({});
    const token=localStorage.getItem('token')
    const value = {
        token,
        User,
        setUser
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}