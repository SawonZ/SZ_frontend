import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';

const Main = () => {
    const {user} = useAuth();
    
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <p>{user?.userName ?? "로그인 필요"}</p>
            </div>
        </main>
    );
};

export default Main;