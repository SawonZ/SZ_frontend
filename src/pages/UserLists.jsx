import React, { useEffect } from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useUserInquiry } from '../store/useUserStore';

const UserLists = () => {
    const {users, isLoading, userLists} = useUserInquiry();

    useEffect(() => {
        userLists();        
    }, [])

    if(isLoading) {
        return <p>로딩 중...</p>
    }

    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <ul>
                    {users.map((user) => (
                        <li key={user?.email}>
                            <p>{user?.userName}</p>
                            <p>{user?.email}</p>
                            <p>{user?.phone}</p>
                            <p>{user?.address}</p>
                            <p>{user?.salary}</p>
                            <p>{user?.annualLeaveCount}</p>
                            <p>{user?.positionTitle}</p>
                            <p>{user?.hiredAt}</p>
                            <p>{user?.resignedAt}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default UserLists;