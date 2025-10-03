import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import Commute from './Commute';
import CommuteBoard from '../features/components/CommuteBoard';
import { boardGrid } from '../features/styles/boardTailwind';
import StaffDirectoryBoard from '../features/components/StaffDirectoryBoard';
import boardArrow from '../assets/images/board_arrow.png';
import Calendar from '../features/components/Calendar';
import { useAuth } from '../store/useUserStore';
import NotAdminstaffDirectoryBoard from '../features/components/NotAdminstaffDirectoryBoard';
import AnnuleLeaveUseBoard from '../features/components/AnnuleLeaveUseBoard';


const Main = () => {
    const {user} = useAuth();

    return (
        <main className={mainLayout}>
            <div className={mainContents}>
                <div className='flex gap-[30px] h-full'>
                    <div className={boardGrid}>
                        <CommuteBoard 
                            arrow={boardArrow}
                        />

                        <AnnuleLeaveUseBoard 
                            arrow={boardArrow}
                        />

                        {
                            user?.role === "ROLE_ADMIN" ? 
                            <StaffDirectoryBoard 
                                arrow={boardArrow}
                            /> : 
                            <NotAdminstaffDirectoryBoard 
                                arrow={boardArrow}
                            />
                        }
                    </div>

                    <Calendar 
                        arrow={boardArrow}
                    />
                </div>
            </div>
        </main>
    );
};

export default Main;