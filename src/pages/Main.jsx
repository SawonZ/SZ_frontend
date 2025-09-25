import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';

const Main = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                메인 컨텐츠 영역
            </div>
        </main>
    );
};

export default Main;