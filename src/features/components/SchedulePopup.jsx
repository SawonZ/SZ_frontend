import pencilIco from '../../assets/images/pencil.png';
import calendarIco from '../../assets/images/calendar.png';
import clockIco from '../../assets/images/clock.png';
import textIco from '../../assets/images/text-align-start.png';
import closetIco from '../../assets/images/close.png';
import downArrowIco from '../../assets/images/down_arrow.png';
import { annuleLeave, annuleLeaveDropdown, annuleLeaveDropdownList, annuleLeaveDropdownListItem, annuleLeaveInput, annuleLeaveInputDate, annuleLeaveInputTextArea, annuleLeaveInputTime, annuleLeaveInputWrap } from '../styles/annuleLeaveTailwind';
import useSchedule from '../hooks/useSchedule'; 

const SchedulePopup = ({ closePopup }) => {
    const {
            dropdown,
            setDropDown,
            schedulTitle,
            setSchedulTitle,
            scheduleKeyword,
            setScheduleKeywordType,
            scheduleDate,
            setScheduleDate,
            scheduleTime,
            setscheduleTime,
            schedulInfo,
            setSchedulInfo,
            handleKeywordSelect,
            scheduleSubmit
    } = useSchedule(closePopup);

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={annuleLeave}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>근무 일정 신청</p>
                    <button
                        onClick={closePopup}
                    >
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>
                <form onSubmit={scheduleSubmit}>
                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <input 
                            className={annuleLeaveInput}
                            type="text" 
                            placeholder='근무시간 변경 요청'
                            value={schedulTitle}
                            onChange={(e) => setSchedulTitle(e.target.value)}
                        />
                    </div> {/* 제목 입력 */}

                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <div 
                            className={annuleLeaveDropdown}
                            onClick={() => setDropDown(prev => !prev)}
                        >
                            <p className='text-[14px] text-[#9CA3AF]'>{scheduleKeyword}</p>
                            <img src={downArrowIco} alt="아래 화살표" />
                        </div>

                        <div 
                            className={annuleLeaveDropdownList}
                            style={
                                dropdown ? { display: 'block' } : { display: 'none' }
                            }
                        >
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('keyword1');
                                    setScheduleKeywordType('worktime_update');
                                    setDropDown(false);
                                }}
                            >
                                근무시간 조정
                            </p>
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('keyword2');
                                    setScheduleKeywordType('outside_work');
                                    setDropDown(false);
                                }}
                            >
                                외근
                            </p>
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('keyword3');
                                    setScheduleKeywordType('full_rest');
                                    setDropDown(false);
                                }}
                            >
                                연차
                            </p>
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('keyword4');
                                    setScheduleKeywordType('am_rest');
                                    setDropDown(false);
                                }}
                            >
                                오전 반차
                            </p>
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('keyword5');
                                    setScheduleKeywordType('pm_rest');
                                    setDropDown(false);
                                }}
                            >
                                오후 반차
                            </p>
                        </div>
                    </div> {/* 신청 항목 */}

                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={calendarIco} alt="달력 아이콘" />
                        <input 
                            className={annuleLeaveInputDate}
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                        />
                    </div> {/* 날짜 */}

                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={clockIco} alt="시계 아이콘" />
                        <div className='flex items-center gap-[8px]'>
                            <input 
                                style={(scheduleKeyword === "외근" || scheduleKeyword === "근무시간 조정") ? {} : { backgroundColor: '#F3F4F6', pointerEvents: 'none' }}
                                className={annuleLeaveInputTime}
                                type="time"
                                value={scheduleTime.start}
                                onChange={(e) => setscheduleTime({ ...scheduleTime, start: e.target.value })}
                            />
                            <span className='text-[#9CA3AF]'>~</span>
                            <input 
                                style={(scheduleKeyword === "외근" || scheduleKeyword === "근무시간 조정") ? {} : { backgroundColor: '#F3F4F6', pointerEvents: 'none' }}
                                className={annuleLeaveInputTime}
                                type="time"
                                value={scheduleTime.end}
                                onChange={(e) => setscheduleTime({ ...scheduleTime, end: e.target.value })}
                            />
                        </div>
                    </div> {/* 시간 */}

                {/*  <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <div className='flex items-center gap-[8px] pl-[26px]'>
                            <input 
                                style={{ accentColor: '#62CCD0' }}
                                className='w-[16px] h-[16px]'
                                type="checkbox"
                                checked={allDay}
                                onChange={(e) => setAllDay(e.target.checked)}
                            />
                            <span className='text-[#9CA3AF]'>종일</span>
                        </div>
                    </div> */} {/* 종일 체크박스 */}

                    <div className='flex items-start gap-[8px] mb-[8px] relative'>
                        <img src={textIco} alt="텍스트 아이콘" />
                        <textarea
                            className={annuleLeaveInputTextArea}
                            placeholder='출근지문 누락'
                            value={schedulInfo}
                            onChange={(e) => setSchedulInfo(e.target.value)}
                        ></textarea>
                    </div> {/* 내용 */}

                    <button 
                        className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300 absolute bottom-[40px] right-[40px]'
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SchedulePopup;