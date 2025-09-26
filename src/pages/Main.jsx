import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';

const Main = () => {
    const {user} = useAuth();
    
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                {user.userName}
            </div>
        </main>
    );
};

export default Main;