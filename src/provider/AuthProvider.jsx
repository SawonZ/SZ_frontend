import React, { useEffect } from 'react';
import { useAuth } from '../store/useUserStore';

const AuthProvider = ({ children }) => {
    const {login} = useAuth();

    useEffect(() => {
        const initAuth = async () => {
            await login(); 
        };
        initAuth();
    }, []);

    return children;
};

export default AuthProvider;