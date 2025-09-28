import React, { useEffect } from 'react';
import { mainContents } from '../shared/styles/commonTailwind';
import { useUserInquiryPortion } from '../store/useUserStore';

const UserListsPortion = () => {
    const {usersPortion, isLoading, userListsNotAdmin} = useUserInquiryPortion();

    useEffect(() => {
        userListsNotAdmin();        
    }, [])

    if(isLoading) {
        return <p>로딩 중...</p>
    }

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