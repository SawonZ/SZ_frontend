import React from 'react';
import LandingHeader from './shared/components/LandingHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <LandingHeader />
            <Outlet />
        </>
    );
};

export default Layout;