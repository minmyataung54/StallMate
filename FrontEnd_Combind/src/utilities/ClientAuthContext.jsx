import { createContext, useContext, useState } from 'react';

const ClientAuthContext = createContext();

export const ClientAuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    return (
        <ClientAuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </ClientAuthContext.Provider>
    );
};

export const useClientAuth = () => useContext(ClientAuthContext);