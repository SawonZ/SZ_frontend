import React, { useEffect } from 'react';
import { useAuth } from '../store/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const {isLogged, isLoading, login} = useAuth();

    useEffect(() => {
        const initAuth = async () => {
            await login(); 
        };
        initAuth();
    }, [login]);

    if(isLoading) return <p>로딩중...</p>
    
    if(!isLogged) {
        return <Navigate to={'/login'} replace />
    }

    return <Outlet />
};

export default RequireAuth;