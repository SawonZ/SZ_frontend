import React from 'react';

const useLoading = () => {
    const userListLoading = (status, error, users) => {
        if(status === 'loading') return <p style={{ padding: '300px', position: 'relative', zIndex: 100}}>로딩 중...</p>
        if(status === 'error') return <p style={{ padding: '300px', position: 'relative', zIndex: 100}}>에러: {error}</p>
        if(status === 'success' && users.length === 0) return <p style={{ padding: '300px', zIndex: 100}}>데이터 없음</p>

        return null;
    };

    return {userListLoading}
};

export default useLoading;