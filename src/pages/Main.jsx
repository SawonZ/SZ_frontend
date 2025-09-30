import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import Commute from './Commute';
import CommuteBoard from '../features/components/CommuteBoard';
import { boardGrid } from '../features/styles/boardTailwind';
import StaffDirectoryBoard from '../features/components/StaffDirectoryBoard';
import boardArrow from '../assets/images/board_arrow.png';
import Calendar from '../features/components/Calendar';


const Main = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <div className='flex gap-[30px] h-full'>
                    <div className={boardGrid}>
                        <CommuteBoard 
                            arrow={boardArrow}
                        />
                        
                        <StaffDirectoryBoard 
                            arrow={boardArrow}
                        />
                        <StaffDirectoryBoard 
                            arrow={boardArrow}
                        />
                        <StaffDirectoryBoard 
                            arrow={boardArrow}
                        />
                    </div>

                    <Calendar />
                </div>
            </div>
        </main>
    );
};

export default Main;