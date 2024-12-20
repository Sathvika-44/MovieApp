// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [term, setTerm] = useState("Harry");
    return (
        <AppContext.Provider value={{ currentUser,setCurrentUser,term,setTerm}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
