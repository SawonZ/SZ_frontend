import React from 'react';
import Header from './shared/components/Header';
import { Outlet } from 'react-router-dom';
import Lnb from './shared/components/Lnb';

const LayoutTwo = () => {
    return (
        <>
            <Header />
            <Lnb />
            <Outlet />
        </>
    );
};

export default LayoutTwo;