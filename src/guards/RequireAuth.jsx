import React, { useEffect } from 'react';
import { useAuth } from '../store/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingUi from '../shared/components/LoadingUi';

const RequireAuth = () => {
    const { isLogged, isLoading, login } = useAuth();

    useEffect(() => {
        login();
    }, [login]);

    if (isLoading) return <LoadingUi />;

    if (!isLogged) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default RequireAuth;