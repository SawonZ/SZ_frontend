import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';

const Main = () => {
    const {user, isLogged, error, isLoading} = useAuth();
    console.log("Main user 상태:", user, isLogged, error, isLoading);
    
    if(isLoading) {
        return (
            <main className={mainLayout}>
                <p>로딩 중...</p>
            </main>
        )
    }

    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                {isLogged ? <p>{user?.email}</p> : error}
            </div>
        </main>
    );
};

export default Main;