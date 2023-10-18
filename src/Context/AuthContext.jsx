
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

const AuthContext = React.createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [modal, setModal] = useState(false);
    const [logModel, setLogModel] = useState(false);
    const [tokens, setTokens] = useState(null);

    

    const login = (Token) => {
        localStorage.setItem('Token', Token);
        setTokens(Token);
        setIsLogin(true);

    };

    const value = {
        isLogin,
        login,
        setIsLogin,
        modal,
        setModal,
        logModel,
        setLogModel,
        setTokens,
    };

    return (
        <AuthContext.Provider value={value}>{children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
