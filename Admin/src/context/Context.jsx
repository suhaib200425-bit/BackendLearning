import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [User, setUser] = useState({});

    const value = {
        User,
        setUser
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}