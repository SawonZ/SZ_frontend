import React from 'react';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import CommonButton from '../../shared/components/CommonButton';
import { Link } from 'react-router-dom';
import CircularLeaveProgress from './CircularLeaveProgress';
import SchedulePopup from './SchedulePopup';
import useSchedulePopup from '../hooks/useSchedulePopup';

const AnnuleLeaveUseBoard = ({ arrow }) => {
    const { schedulePopupShow, openSchedulePopup, setSchedulePopupShow } = useSchedulePopup();

    return (
        <div className={`${board} after:content-none`}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>연차 관리</h4>
                <Link to={"/user-lists"}>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>
            <div className='relative'>
                <p className='text-[#1F2937] mb-[4px] leading-[1.5]'>총 연차 갯수 : 15개</p>
                <p className='text-[#1F2937] leading-[1.5] mb-[72px]'>남은 연차 : 0개</p>

                <div className='absolute right-[0] top-[-20px]'>
                    <CircularLeaveProgress 
                        total={23}        
                        remaining={22.5}     
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

export default AnnuleLeaveUseBoard;