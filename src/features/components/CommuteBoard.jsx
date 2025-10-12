import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import '../styles/commute.css';
import { Link } from 'react-router-dom';
import clockTwo from '../../assets/images/clock2.svg';
import useCommute from '../hooks/useCommute';

const CommuteBoard = ({ arrow }) => {
    const {
        workState,
        leaveState,
        goToWork,
        leaveWork,
        elapsedTime,
        progress,          
        formatElapsed,
        handleClickGoToWork,
        handleClickLeaveWork
    } = useCommute();

    const timeToSeconds = (timeStr) => {
        const [h, m, s] = timeStr.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    };

    return (
        <div className={`${board} after:content-none`}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>출퇴근 관리</h4>
                <Link to={"/user-lists"}>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>

            <div>
                <p className='text-[#1F2937] mb-[4px] leading-[1.5]'>
                    {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일 ({['일','월','화','수','목','금','토'][new Date().getDay()]})
                </p>

                <div className='flex mb-[10px]'>
                    <p className='text-[#1F2937] leading-[1.5] mr-[8px]'>출근 : {goToWork}</p>
                    <p 
                        className='text-[#D1D5DB] leading-[1.5] relative pl-[10px] before:absolute before:content-[""] before:top-[50%] before:left-[0] before:translate-y-[-50%] before:w-[4px] before:h-[4px] before:rounded-[50%] before:bg-[#9CA3AF]'
                    >
                        퇴근 : {leaveWork}
                    </p>
                </div>

                <div className='mb-[10px]'>
                    <div className='flex items-end justify-between mb-[12px]'>
                        <p 
                            className={timeToSeconds(goToWork.slice(0,5)) > timeToSeconds('09:00') ? 'text-[#9CA3AF]' : 'text-[#FF4242]'}
                        >
                            {goToWork.slice(0,5)}
                        </p>
                        <p className='text-[#1F2937] text-[28px] font-[600]'>{formatElapsed(elapsedTime)}</p>
                        <p className='text-[#9CA3AF]'>{!leaveState ? "18:00" : leaveWork.slice(0,5)}</p>
                    </div>
                    <div className='progress'>
                        <img src={clockTwo} alt="출퇴근 시계 아이콘" className='progress-ico'/>
                        <div
                            style={{ width: `${progress}%` }}
                            className='progress-bar'
                        ></div>
                    </div>
                </div>

                <div className='flex gap-[8px]'>
                    <button
                        style={workState ? { background: '#D1D5DB', pointerEvents: 'none' } : { background: '#62CCD0' }}
                        className='w-[50%] h-[60px] rounded-[8px] text-[18px] text-[#fff]'
                        onClick={handleClickGoToWork}
                    >
                        출근하기
                    </button>
                    <button 
                        style={workState && !leaveState ? { background: '#62CCD0' } : { background: '#D1D5DB', pointerEvents: 'none' }}
                        className='w-[50%] h-[60px] rounded-[8px] text-[18px] text-[#fff]'
                        onClick={handleClickLeaveWork}
                    >
                        퇴근하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommuteBoard;