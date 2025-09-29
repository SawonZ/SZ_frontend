import React, { useEffect } from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useUserInquiryPortion } from '../store/useUserStore';

const UserListsPortion = () => {
    const {usersPortion, status, userListsNotAdmin, error} = useUserInquiryPortion();

    useEffect(() => {
        userListsNotAdmin();        
    }, [userListsNotAdmin])

    if(status === 'loading') return <p style={{ padding: '300px', zIndex: 100}}>로딩 중...</p>
    if(status === 'error') return <p style={{ padding: '300px', zIndex: 100}}>에러: {error}</p>
    if(status === 'success' && usersPortion.length === 0) return <p style={{ padding: '300px', zIndex: 100}}>데이터 없음</p>

    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <ul>
                    {usersPortion.map((user) => (
                        <li key={user?.email}>
                            <p>{user?.userName}</p>
                            <p>{user?.email}</p>
                            <p>{user?.phone}</p>
                            <p>{user?.positionTitle}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default UserListsPortion;