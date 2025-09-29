import React, { useEffect } from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useUserInquiry } from '../store/useUserStore';
import useLoading from '../features/hooks/useLoading';

const UserLists = () => {
    const {users, status, error, userLists} = useUserInquiry();
    const {userListLoading} = useLoading();

    //리스트
    useEffect(() => {
        userLists();        
    }, [userLists]);

    //로딩/에러처리
    const pending = userListLoading(status, error, users);
    if(pending) return pending;

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