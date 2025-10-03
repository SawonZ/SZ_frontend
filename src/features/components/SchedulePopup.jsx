import React, { useState } from 'react';
import pencilIco from '../../assets/images/pencil.png';
import calendarIco from '../../assets/images/calendar.png';
import clockIco from '../../assets/images/clock.png';
import textIco from '../../assets/images/text-align-start.png';
import closetIco from '../../assets/images/close.png';
import downArrowIco from '../../assets/images/down_arrow.png';
import { annuleLeave, annuleLeaveDropdown, annuleLeaveDropdownList, annuleLeaveDropdownListItem, annuleLeaveInput, annuleLeaveInputDate, annuleLeaveInputTextArea, annuleLeaveInputTime, annuleLeaveInputWrap } from '../styles/annuleLeaveTailwind';

const SchedulePopup = ({ onClick }) => {
    const [dropdown, setDropDown] = useState(false);

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={annuleLeave}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>근무 일정 신청</p>
                    <button
                        onClick={onClick}
                    >
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>
                <form>
                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <input 
                            className={annuleLeaveInput}
                            type="text" 
                            placeholder='근무시간 변경 요청'
                        />
                    </div> {/* 제목 입력 */}

                    <div className={annuleLeaveInputWrap}>
                        <img src={pencilIco} alt="제목 아이콘" />
                        <div 
                            className={annuleLeaveDropdown}
                            onClick={() => setDropDown(prev => !prev)}
                        >
                            <p className='text-[14px] text-[#9CA3AF]'>근무신청</p>
                            <img src={downArrowIco} alt="아래 화살표" />
                        </div>

                        <div 
                            className={annuleLeaveDropdownList}
                            style={
                                dropdown ? { display: 'block' } : { display: 'none' }
                            }
                        >
                            <p className={annuleLeaveDropdownListItem}>근무시간 조정</p>
                            <p className={annuleLeaveDropdownListItem}>외근</p>
                            <p className={annuleLeaveDropdownListItem}>연차</p>
                            <p className={annuleLeaveDropdownListItem}>오전 반차</p>
                            <p className={annuleLeaveDropdownListItem}>오후 반차</p>
                        </div>
                    </div> {/* 신청 항목 */}

                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={calendarIco} alt="달력 아이콘" />
                        <input 
                            className={annuleLeaveInputDate}
                            type="date"
                        />
                    </div> {/* 날짜 */}

                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <img src={clockIco} alt="시계 아이콘" />
                        <div className='flex items-center gap-[8px]'>
                            <input 
                                className={annuleLeaveInputTime}
                                type="time"
                            />
                            <span className='text-[#9CA3AF]'>~</span>
                            <input 
                                className={annuleLeaveInputTime}
                                type="time"
                            />
                        </div>
                    </div> {/* 시간 */}

                    <div className='flex items-center gap-[8px] mb-[8px] relative'>
                        <div className='flex items-center gap-[8px] pl-[26px]'>
                            <input 
                                style={{ accentColor: '#62CCD0' }}
                                className='w-[16px] h-[16px]'
                                type="checkbox"
                            />
                            <span className='text-[#9CA3AF]'>종일</span>
                        </div>
                    </div> {/* 종일 체크박스 */}

                    <div className='flex items-start gap-[8px] mb-[8px] relative'>
                        <img src={textIco} alt="텍스트 아이콘" />
                        <textarea
                            className={annuleLeaveInputTextArea}
                            placeholder='출근지문 누락'
                        ></textarea>
                    </div> {/* 시간 */}

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