import React, { useEffect } from 'react';
import { useAuth } from '../store/useUserStore';
import LoadingUi from '../shared/components/LoadingUi';

const AuthProvider = ({ children }) => {
    const {login, isLoading} = useAuth();

    useEffect(() => {
        const initAuth = async () => {
            await login(); 
        };
        initAuth();
    }, [login]);

    if(isLoading) return <LoadingUi />

    return children;
};

export default AuthProvider;