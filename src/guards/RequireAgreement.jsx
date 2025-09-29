import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAgreement = () => {
    const agreed = sessionStorage.getItem('agreementsAccepted') === '1';

    if(!agreed) {
        alert('약관동의를 진행해주세요.');
        return <Navigate to={'/policy'} replace />
    }

    return <Outlet />;
};

export default RequireAgreement;