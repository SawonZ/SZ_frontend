import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import Commute from './Commute';
import CommuteBoard from '../features/components/CommuteBoard';
import { boardGrid } from '../features/styles/boardTailwind';

const Main = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <div className='flex gap-[30px]'>
                    <div className={boardGrid}>
                        <CommuteBoard />
                        
                    </div>
                    <div className='w-[538px] bg-[#ddd]'>달력 공간</div>
                </div>
            </div>
        </main>
    );
};

export default Main;