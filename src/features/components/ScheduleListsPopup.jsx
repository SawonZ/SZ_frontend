import React from 'react';
import { annuleLeaveTwo } from '../styles/annuleLeaveTailwind';
import closetIco from '../../assets/images/close.png';
import { formatDate } from '../../utils/formatTime';
import LoadingUi from '../../shared/components/LoadingUi';
import usePositionTitle from '../hooks/usePositionTitle';
import { useAuth} from '../../store/useUserStore';
import { commonButton } from '../../shared/styles/commonTailwind';

const ScheduleListsPopup = ({ sameDateEventsApi = [], isLoading, onClose }) => {
    const {koreanPositionTitle} = usePositionTitle();
    const {user} = useAuth();

    // 날짜와 요일 추출
    const extractedDate = sameDateEventsApi.length > 0 
        ? formatDate(sameDateEventsApi[0].start) 
        : '';
    
    // calendarType을 한글로 변환
    const getCalendarTypeText = (type) => {
        switch(type) {
            case 'pm_rest':
                return '오후 반차';
            case 'am_rest':
                return '오전 반차';
            case 'full_rest':
                return '연차';
            case 'outside_work':
                return '외근';
            default:
                return type;
        }
    };

    if(isLoading) {
        return <LoadingUi />;
    }
    
    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999]'>
            <div className={`${annuleLeaveTwo} relative after:content-[""] after:absolute after:bottom-[104px] after:left-[50%] after:translate-x-[-50%] after:w-[98%] after:h-[50px] after:bg-[#fff] after:blur-[5px]`}>
                <div className='flex items-center justify-between mb-[4px]'>
                    <p className='font-[600]'>일정 관리</p>
                    <button onClick={onClose}>
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>
                <p className='text-[14px] text-[#6B7280] mb-[26px]'>
                    {extractedDate || '날짜를 선택하세요'}
                </p>
                <p className='text-[12px] text-[#9CA3AF] mb-[12px]'>
                    총 {sameDateEventsApi.length}건
                </p>

                <ul className='overflow-auto h-[215px]'>
                    {sameDateEventsApi.length > 0 ? (
                        sameDateEventsApi.map((event, index) => (
                            <li key={index} className='flex items-center justify-between mb-[16px] last:mb-[0]'>
                                <div className='flex items-center'>
                                    <p className='text-[14px] text-[#1F2937] mr-[4px]'>{event.extendedProps?.userName || '-'}</p>
                                    <p className='text-[13px] text-[#4B5563] mt-[1px]'>{koreanPositionTitle(event.extendedProps?.positionTitle) || '-'}</p>
                                    <span className='block w-[1px] h-[22px] bg-[#E6E8EB] ml-[12px] mr-[12px]'></span>
                                    <p className='text-[14px] text-[#1F2937]'>{getCalendarTypeText(event.extendedProps?.calendarType)}</p>
                                </div>
                                <div>
                                    {
                                        user?.role === "ROLE_ADMIN" || user?.role === "ROLE_MANAGER" ? (
                                            <>
                                                {event.extendedProps?.status === true && (
                                                    <span className='flex items-center justify-center w-[45px] h-[32px] bg-[rgba(99,192,178,0.1)] text-[12px] text-[#63C0B2] rounded-[4px]'>승인</span>
                                                )}
                                                {event.extendedProps?.status === false && (
                                                    <span className='flex items-center justify-center w-[45px] h-[32px] bg-[rgba(255,66,66,0.1)] text-[12px] text-[#FF4242] rounded-[4px]'>반려</span>
                                                )}
                                                {event.extendedProps?.status === null && (
                                                    <div className='flex gap-[8px]'>
                                                        <button className='flex items-center justify-center w-[45px] h-[32px] bg-[#fff] text-[12px] text-[#63C0B2] rounded-[4px] border border-[#E6E8EB]'>승인</button>
                                                        <button className='flex items-center justify-center w-[45px] h-[32px] bg-[#fff] text-[12px] text-[#FF4242] rounded-[4px] border border-[#E6E8EB]'>반려</button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {event.extendedProps?.status === true && (
                                                    <span className='flex items-center justify-center w-[45px] h-[32px] bg-[rgba(99,192,178,0.1)] text-[12px] text-[#63C0B2] rounded-[4px]'>승인</span>
                                                )}
                                                {event.extendedProps?.status === false && (
                                                    <span className='flex items-center justify-center w-[45px] h-[32px] bg-[rgba(255,66,66,0.1)] text-[12px] text-[#FF4242] rounded-[4px]'>반려</span>
                                                )}
                                                {event.extendedProps?.status === null && (
                                                    <span className='flex items-center justify-center w-[45px] h-[32px] bg-[rgba(255,220,71,0.1)] text-[12px] text-[#FFDC47] rounded-[4px]'>대기</span>
                                                )}
                                            </>
                                        )
                                    }
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>날짜를 클릭하면 이벤트가 표시됩니다</li>
                    )}
                </ul>

                <button className={commonButton}>글쓰기</button>
            </div>
        </div>
    );
};

export default ScheduleListsPopup;