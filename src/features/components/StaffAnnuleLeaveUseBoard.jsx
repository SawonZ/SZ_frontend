import React, { useEffect, useState } from 'react';
import { useAuth, useUserInquiryPortion } from '../../store/useUserStore';
import useSchedulePopup from '../hooks/useSchedulePopup';
import useLoading from '../hooks/useLoading';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import { Link } from 'react-router-dom';
import SchedulePopup from './SchedulePopup';
import CommonButton from '../../shared/components/CommonButton';
import CircularLeaveProgress from './CircularLeaveProgress';
import { staffGetFetch } from '../api/userApi';
import LoadingUi from '../../shared/components/LoadingUi';
import useStaffData from '../hooks/useStaffData';

const StaffAnnuleLeaveUseBoard = ({ arrow }) => {
    const { schedulePopupShow, openSchedulePopup, setSchedulePopupShow } = useSchedulePopup();
    const {staffData, isLoading} = useStaffData();

    const fullAnnual = (title) => {  
        switch(title) {
            case 'Owner':
                return 25;
            case 'TeamJang':
                return 23;
            case 'Sawon':
                return 11;
            default:
                return 0;
        }
    };

    // 로딩/에러 처리
    if (isLoading || !staffData) return <LoadingUi />;

    return (
        <div className={`${board} after:content-none`}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>연차 관리</h4>
                <Link to={"/calendar"}>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>
            <div className='relative'>
                <p className='text-[#1F2937] mb-[4px] leading-[1.5]'>총 연차 갯수 : {fullAnnual(staffData.positionTitle)}개</p>
                <p className='text-[#1F2937] leading-[1.5] mb-[72px]'>남은 연차 : {staffData.annualLeaveCount}개</p>

                <div className='absolute right-[0] top-[-20px]'>
                    <CircularLeaveProgress 
                        total={fullAnnual(staffData.positionTitle)}        
                        remaining={staffData.annualLeaveCount}     
                        size={130}        
                        strokeWidth={12}  
                        circleColor="#ededed"
                        progressColor="#62CCD0"
                        fontColor="#62CCD0"
                    />
                </div>

                <CommonButton 
                    text="사용하기" 
                    onClick={openSchedulePopup}
                />
            </div>
            {
                schedulePopupShow && 
                <SchedulePopup 
                    closePopup={() => setSchedulePopupShow(false)}
                />
            }
        </div>
    );
};

export default StaffAnnuleLeaveUseBoard;