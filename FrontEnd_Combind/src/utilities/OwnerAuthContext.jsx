import { createContext, useContext, useState } from 'react';

const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    return (
        <OwnerAuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </OwnerAuthContext.Provider>
    );
};

export const useOwnerAuth = () => useContext(OwnerAuthContext);