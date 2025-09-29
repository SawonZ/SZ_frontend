import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import Commute from './Commute';
import CommuteBoard from '../features/components/CommuteBoard';
import { boardGrid } from '../features/styles/boardTailwind';
import StaffDirectoryBoard from '../features/components/StaffDirectoryBoard';
import boardArrow from '../assets/images/board_arrow.png';

const Main = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <div className='flex gap-[30px]'>
                    <div className={boardGrid}>
                        <CommuteBoard />
                        <StaffDirectoryBoard 
                            arrow={boardArrow}
                        />
                    </div>
                    <div className='w-[538px] bg-[#ddd]'>달력 공간</div>
                </div>
            </div>
        </main>
    );
};

export default Main;