import React, { useEffect, useState } from 'react';
import { fetchGetSchedule } from '../api/workApi';
import { formatDate } from '../../utils/formatTime';
import ScheduleCorrectionPopup from './ScheduleCorrectionPopup';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';

const ScheduleViewBoard = () => {
    const [scheduleHistoryState, setScheduleHistoryState] = useState([]);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await fetchGetSchedule();
                if(res.data.responseCode !== "SUCCESS") {
                    console.log('연차 내역 조회 오류');
                    return;
                }
                setScheduleHistoryState(res.data.data);
            } catch(err) {
                console.error('연차 내역 조회 실패:', err.response?.data?.message || err);
            }
        };
        fetchSchedules();
    }, []);

    const openEditPopup = (schedule) => {
        setSelectedSchedule(schedule);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedSchedule(null);
    };

    const getCalendarTypeText = (type) => {
        switch(type) {
            case 'pm_rest': return '오후 반차';
            case 'am_rest': return '오전 반차';
            case 'full_rest': return '연차';
            case 'outside_work': return '외근';
            case 'worktime_update': return '근무시간 조정';
            default: return type;
        }
    };

    const getCalendarTypeTime = (type) => {
        switch(type) {
            case 'pm_rest': return '0.5일';
            case 'am_rest': return '0.5일';
            case 'full_rest': return '1일';
            default: return null;
        }
    };

    const getCalendarTypeRealTime = (type) => {
        switch(type) {
            case 'pm_rest': return '근무시간 09:00~13:00';
            case 'am_rest': return '근무시간 13:00~18:00';
            default: return null;
        }
    };

    return (
        <div className={board}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>연차 내역</h4>
            </div>

            <div className='h-[180px] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                <ul>
                    {scheduleHistoryState.map((his) => (
                        <li 
                            key={his.calendarId} 
                            className='pb-[12px] border-b border-[#E6E8EB] mb-[12px] last:mb-0 cursor-pointer'
                            onClick={() => { if(his.status === null) openEditPopup(his); }}
                        >
                            <div className='flex items-center justify-between mb-2'>
                                <p className='text-[14px] text-[#1F2937]'>{formatDate(his.date)}</p>
                                {his.status === true && <span className='flex items-center justify-center w-[37px] h-[22px] rounded-[4px] bg-[rgba(99,192,178,0.1)] text-[14px] text-[#63C0B2]'>승인</span>}
                                {his.status === false && <span className='flex items-center justify-center w-[37px] h-[22px] rounded-[4px] bg-[rgba(255,66,66,0.1)] text-[14px] text-[#FF4242]'>반려</span>}
                                {his.status === null && <span className='flex items-center justify-center w-[37px] h-[22px] rounded-[4px] bg-[rgba(255,220,71,0.1)] text-[14px] text-[#FFDC47]'>대기</span>}
                            </div>

                            <div className='flex items-center gap-[8px]'>
                                <p className='text-[12px] text-[#4B5563]'>{getCalendarTypeText(his.calendarType)}</p>
                                {
                                    his.calendarType !== 'outside_work' && his.calendarType !== 'worktime_update' ?
                                    <p 
                                        className='text-[12px] text-[#4B5563] pl-[10px] relative before:absolute before:content-[""] before:top-[50%] before:left-[0] before:translate-y-[-50%] before:w-[4px] before:h-[4px] before:bg-[#9CA3AF] before:rounded-[50%]'
                                    >
                                        {getCalendarTypeTime(his.calendarType)}
                                    </p> : 
                                    <p 
                                        className='text-[12px] text-[#4B5563] pl-[10px] relative before:absolute before:content-[none] before:top-[50%] before:left-[0] before:translate-y-[-50%] before:w-[4px] before:h-[4px] before:bg-[#9CA3AF] before:rounded-[50%]'
                                    >
                                        {getCalendarTypeTime(his.calendarType)}
                                    </p> 
                                }
                                {
                                    his.calendarType === 'outside_work' || his.calendarType === 'worktime_update' && 
                                    <p 
                                        className='text-[12px] text-[#4B5563] pl-[10px] relative before:absolute before:content-[none] before:top-[50%] before:left-[0] before:translate-y-[-50%] before:w-[4px] before:h-[4px] before:bg-[#9CA3AF] before:rounded-[50%]'
                                    >
                                        {getCalendarTypeRealTime(his.calendarType)}
                                    </p>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {editPopupOpen && selectedSchedule && (
                <ScheduleCorrectionPopup 
                    closePopup={closeEditPopup} 
                    initialData={selectedSchedule} 
                />
            )}
        </div>
    );
};

export default ScheduleViewBoard;