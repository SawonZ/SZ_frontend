import React from 'react';

const useLoading = () => {
    const userListLoading = (situation, error, users) => {
        if(situation === 'loading') return <p style={{ padding: '300px', position: 'relative', zIndex: 100}}>로딩 중...</p>
        if(situation === 'error') return <p style={{ padding: '300px', position: 'relative', zIndex: 100}}>에러: {error}</p>
        if(situation === 'success' && users.length === 0) return <p style={{ padding: '300px', zIndex: 100}}>데이터 없음</p>

        return null;
    };

    return {userListLoading}
};

export default useLoading;