import React from 'react';
import { mainContents, mainLayout } from '../shared/styles/commonTailwind';
import CommuteBoard from '../features/components/CommuteBoard';
import { boardGrid } from '../features/styles/boardTailwind';
import StaffDirectoryBoard from '../features/components/StaffDirectoryBoard';
import boardArrow from '../assets/images/board_arrow.png';
import Calendar from '../features/components/Calendar';
import { useAuth } from '../store/useUserStore';
import NotAdminstaffDirectoryBoard from '../features/components/NotAdminstaffDirectoryBoard';
import AnnuleLeaveUseBoard from '../features/components/AnnuleLeaveUseBoard';
import ScheduleViewBoard from '../features/components/ScheduleViewBoard';
import StaffAnnuleLeaveUseBoard from '../features/components/StaffAnnuleLeaveUseBoard';


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

                        {
                            user?.role === "ROLE_ADMIN" ? 
                            <AnnuleLeaveUseBoard 
                                arrow={boardArrow}
                            /> :
                            <StaffAnnuleLeaveUseBoard 
                                arrow={boardArrow}
                            />
                        }
                        

                        {
                            user?.role === "ROLE_ADMIN" ? 
                            <StaffDirectoryBoard 
                                arrow={boardArrow}
                            /> : 
                            <NotAdminstaffDirectoryBoard 
                                arrow={boardArrow}
                            />
                        }

                        <ScheduleViewBoard 
                            arrow={boardArrow}
                        />

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