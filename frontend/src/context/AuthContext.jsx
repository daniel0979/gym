import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for persistent auth state
        const storedUser = localStorage.getItem('nexus_auth');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('nexus_auth', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nexus_auth');
    };

    const continueAsGuest = () => {
        const guestUser = { name: 'GUEST_OPERATIVE', isGuest: true };
        setUser(guestUser);
        localStorage.setItem('nexus_auth', JSON.stringify(guestUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, continueAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
};
