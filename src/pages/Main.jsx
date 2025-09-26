import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';

const Main = () => {
    const {user, isLogged, error} = useAuth();
    
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                {isLogged ? <p>{user?.email}</p> : error}
            </div>
        </main>
    );
};

export default Main;