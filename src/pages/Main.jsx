import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';

const Main = () => {
    const {user, isLogged, error} = useAuth();
    console.log("Main user 상태:", user, isLogged, error);
    
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                {isLogged ? <p>{user?.email}</p> : error}
            </div>
        </main>
    );
};

export default Main;