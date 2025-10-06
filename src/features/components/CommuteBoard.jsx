import React from 'react';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import { Link } from 'react-router-dom';
import clockTwo from '../../assets/images/clock2.svg';

const CommuteBoard = ({ arrow }) => {
    return (
        <div className={board}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>출퇴근 관리</h4>
                <Link to={"/user-lists"}>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>
            <div>
                <p className='text-[#1F2937] mb-[4px] leading-[1.5]'>2025년 10월 3일 (금)</p>
                <div className='flex mb-[40px]'>
                    <p className='text-[#1F2937] leading-[1.5] mr-[8px]'>출근 : 08:47:59</p>
                    <p 
                        className='text-[#D1D5DB] leading-[1.5] relative pl-[10px] before:absolute before:content-[""] before:top-[50%] before:left-[0] before:translate-y-[-50%] before:w-[4px] before:h-[4px] before:rounded-[50%] before:bg-[#9CA3AF]'
                    >
                        퇴근 : 00:00:00
                    </p>
                </div>

                <div>
                    <div className='flex items-end justify-between mb-[6px]'>
                        <p className='text-[#9CA3AF]'>9:00</p>
                        <p className='text-[#1F2937] text-[28px] font-[600]'>00:00:00</p>
                        <p className='text-[#9CA3AF]'>18:00</p>
                    </div>
                    <div>
                        <img src={clockTwo} alt="출퇴근 시계 아이콘" />
                        <div className='progress-bar'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommuteBoard;