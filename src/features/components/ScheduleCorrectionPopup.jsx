import React from 'react';
import pencilIco from '../../assets/images/pencil.png';
import calendarIco from '../../assets/images/calendar.png';
import clockIco from '../../assets/images/clock.png';
import textIco from '../../assets/images/text-align-start.png';
import closetIco from '../../assets/images/close.png';
import downArrowIco from '../../assets/images/down_arrow.png';
import { 
    annuleLeave, 
    annuleLeaveDropdown, 
    annuleLeaveDropdownList, 
    annuleLeaveDropdownListItem, 
    annuleLeaveInput, 
    annuleLeaveInputDate, 
    annuleLeaveInputTextArea, 
    annuleLeaveInputTime, 
    annuleLeaveInputWrap 
} from '../styles/annuleLeaveTailwind';
import useScheduleEdit from '../hooks/useScheduleEdit';

const ScheduleCorrectionPopup = ({ closePopup, initialData }) => {
    const {
        schedulTitle,
        setSchedulTitle,
        scheduleKeyword,
        scheduleKeywordType,
        scheduleDate,
        setScheduleDate,
        scheduleTime,
        setscheduleTime,
        schedulInfo,
        setSchedulInfo,
        dropdown,
        setDropDown,
        handleKeywordSelect,
        scheduleEditSubmit,
        deleteSchedule
    } = useScheduleEdit(closePopup, initialData);

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={annuleLeave}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>근무 일정 수정</p>
                    <button onClick={closePopup}>
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>

                <form onSubmit={scheduleEditSubmit}>
                    {/* 제목 */}
                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <input 
                            className={annuleLeaveInput}
                            type="text"
                            value={schedulTitle}
                            onChange={(e) => setSchedulTitle(e.target.value)}
                        />
                    </div>

                    {/* 키워드 */}
                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <div className={annuleLeaveDropdown} onClick={() => setDropDown(!dropdown)}>
                            <p className='text-[14px] text-[#9CA3AF]'>{scheduleKeyword}</p>
                            <img src={downArrowIco} alt="아래 화살표" />
                        </div>
                        <div className={annuleLeaveDropdownList} style={{ display: dropdown ? 'block' : 'none' }}>
                            <p className={annuleLeaveDropdownListItem} onClick={() => handleKeywordSelect('keyword1')}>근무시간 조정</p>
                            <p className={annuleLeaveDropdownListItem} onClick={() => handleKeywordSelect('keyword2')}>외근</p>
                            <p className={annuleLeaveDropdownListItem} onClick={() => handleKeywordSelect('keyword3')}>연차</p>
                            <p className={annuleLeaveDropdownListItem} onClick={() => handleKeywordSelect('keyword4')}>오전 반차</p>
                            <p className={annuleLeaveDropdownListItem} onClick={() => handleKeywordSelect('keyword5')}>오후 반차</p>
                        </div>
                    </div>

                    {/* 날짜 */}
                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={calendarIco} alt="달력 아이콘" />
                        <input className={annuleLeaveInputDate} type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                    </div>

                    {/* 시간 */}
                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={clockIco} alt="시계 아이콘" />
                        <input 
                            className={annuleLeaveInputTime} 
                            type="time" 
                            value={scheduleTime.start} 
                            onChange={(e) => setscheduleTime({...scheduleTime, start: e.target.value})} 
                            disabled={!(scheduleKeyword === '외근' || scheduleKeyword === '근무시간 조정')} 
                        />
                        <span>~</span>
                        <input 
                            className={annuleLeaveInputTime} 
                            type="time" 
                            value={scheduleTime.end} 
                            onChange={(e) => setscheduleTime({...scheduleTime, end: e.target.value})} 
                            disabled={!(scheduleKeyword === '외근' || scheduleKeyword === '근무시간 조정')} 
                        />
                    </div>

                    {/* 내용 */}
                    <div className='flex items-start gap-[8px] mb-[8px] relative'>
                        <img src={textIco} alt="텍스트 아이콘" />
                        <textarea className={annuleLeaveInputTextArea} value={schedulInfo} onChange={(e) => setSchedulInfo(e.target.value)} />
                    </div>
                    
                    <div className='flex absolute bottom-[40px] right-[40px] gap-[8px]'>
                        <button 
                            className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#D1D5DB] hover:bg-[#9CA3AF] transition-all duration-300'
                            onClick={deleteSchedule}
                        >
                            삭제
                        </button>
                        <button className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300'>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleCorrectionPopup;