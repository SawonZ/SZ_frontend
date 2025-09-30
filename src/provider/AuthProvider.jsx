import React, { useEffect } from 'react';
import { useAuth } from '../store/useUserStore';

const AuthProvider = ({ children }) => {
    const {login, isLoading} = useAuth();

    useEffect(() => {
        const initAuth = async () => {
            await login(); 
        };
        initAuth();
    }, []);

    if(isLoading) return <p>로딩중...</p>

    return children;
};

export default AuthProvider;