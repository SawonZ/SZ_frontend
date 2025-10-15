import React, { useState, useEffect } from 'react';
import useStaffData from '../features/hooks/useStaffData';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { tableStyle, tdStyleThree, thStyle, trStyle } from '../features/styles/tableTailwind';

const MyAttendanceTable = () => {
    const { staffData, isLoading } = useStaffData();
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('ALL'); // WEEK, MONTH, ALL
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedState, setSelectedState] = useState('ALL'); // ALL, PENDING, APPROVED

    useEffect(() => {
        if (!isLoading && staffData && staffData.attendanceList) {
            const sorted = [...staffData.attendanceList].sort((a, b) => a.workDate.localeCompare(b.workDate));
            setFilteredAttendance(sorted);
        }
    }, [isLoading, staffData]);

    // 날짜 관련 헬퍼
    const getThisWeek = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(today.setDate(diff));
        const sunday = new Date(today.setDate(diff + 6));
        return [monday, sunday].map(d => d.toISOString().split('T')[0]);
    };

    const getThisMonth = () => {
        const today = new Date();
        const first = new Date(today.getFullYear(), today.getMonth(), 1);
        const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return [first, last].map(d => d.toISOString().split('T')[0]);
    };

    const handlePeriodClick = (period) => {
        setSelectedPeriod(period);
        if (period === 'WEEK') {
            const [start, end] = getThisWeek();
            setStartDate(start);
            setEndDate(end);
        } else if (period === 'MONTH') {
            const [start, end] = getThisMonth();
            setStartDate(start);
            setEndDate(end);
        } else {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleSearch = () => {
        if (!staffData.attendanceList) return;
        let result = [...staffData.attendanceList];

        // 기간 필터
        if (startDate && endDate) {
            result = result.filter(att => att.workDate >= startDate && att.workDate <= endDate);
        }

        // 근태 필터
        if (selectedState !== 'ALL') {
            result = result.filter(att => {
                if (!att.checkInAt) return false; // 출근 기록 없으면 제외
                    const [hh, mm] = att.checkInAt.split(':').map(Number);
                    const totalMinutes = hh * 60 + mm;
                if (selectedState === 'PENDING') return totalMinutes <= 9*60; // 9:00 이전 정상
                if (selectedState === 'APPROVED') return totalMinutes > 9*60; // 9:01 이후 지각
                return true;
            });
        }

        // 날짜순 정렬
        result.sort((a, b) => a.workDate.localeCompare(b.workDate));

        setFilteredAttendance(result);
    };

    const handleReset = () => {
        setSelectedPeriod('ALL');
        setStartDate('');
        setEndDate('');
        setSelectedState('ALL');
        if (staffData.attendanceList) {
            const sorted = [...staffData.attendanceList].sort((a, b) => a.workDate.localeCompare(b.workDate));
            setFilteredAttendance(sorted);
        }
    };

    if (isLoading) return <p className="text-[14px] text-[#1F2937]">로딩중...</p>;

    const formatTime = (timeStr) => {
        if (!timeStr) return '-';
        const [hh, mm] = timeStr.split(':');
        return `${hh}:${mm}`;
    };

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>출퇴근 기록조회</h4>

                <div className="mb-[32px]">
                    {/* 기간 검색 */}
                    <table className="border border-[#E6E8EB] border-r-0 border-l-0 border-b-0 w-full">
                        <colgroup>
                            <col width="140"/>
                            <col width="1500"/>
                        </colgroup>
                        <tbody>
                            <tr className="border-b border-[#E6E8EB] cursor-pointer first:cursor-auto">
                                <td className="p-[13px] bg-[#FAFAFC] h-[50px] box-border text-[#1F2937]">검색기간</td>
                                <td className="p-[13px] bg-[#fff] h-[50px] box-border text-[#1F2937]">
                                    <div className="flex gap-[8px]">
                                        <div className='w-[190px] h-[32px] border border-[#DEE0E4] box-border rounded-[4px] overflow-hidden flex'>
                                            <button 
                                                className={`w-[69px] h-full border-r border-[#DEE0E4] text-[#1F2937] ${selectedPeriod === 'WEEK' ? 'bg-[#62CCD0] text-[#fff]' : 'bg-[#fff]'}`}
                                                onClick={() => handlePeriodClick('WEEK')}
                                            >
                                                이번 주
                                            </button>
                                            <button
                                                className={`w-[69px] h-full border-r border-[#DEE0E4] text-[#1F2937] ${selectedPeriod === 'MONTH' ? 'bg-[#62CCD0] text-[#fff]' : 'bg-[#fff]'}`}
                                                onClick={() => handlePeriodClick('MONTH')}
                                            >
                                                이번 달
                                            </button>
                                            <button
                                                className={`w-[52px] h-full text-[#1F2937] ${selectedPeriod === 'ALL' ? 'bg-[#62CCD0] text-[#fff]' : 'bg-[#fff]'}`}
                                                onClick={() => handlePeriodClick('ALL')}
                                            >
                                                전체
                                            </button>
                                        </div>
                                        <div className="relative flex items-center gap-[8px]">
                                            <input 
                                                className='w-[160px] h-[32px] border border-[#DEE0E4] rounded-[4px] pl-[12px] pr-[12px] box-border'
                                                type="date" 
                                                value={startDate}
                                                onChange={e => setStartDate(e.target.value)}
                                            />
                                            <span className='pl-[8px] pr-[8px]'>~</span>
                                            <input 
                                                className='w-[160px] h-[32px] border border-[#DEE0E4] rounded-[4px] pl-[12px] pr-[12px] box-border'
                                                type="date" 
                                                value={endDate}
                                                onChange={e => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* 근태구분 */}
                            <tr className="border-b border-[#E6E8EB] cursor-pointer first:cursor-auto">
                                <td className="p-[13px] bg-[#FAFAFC] h-[50px] box-border text-[#1F2937]">근태구분</td>
                                <td className="p-[13px] bg-[#fff] h-[50px] box-border text-[#1F2937]">
                                    <ul className="flex gap-[8px]">
                                        {[{ value: 'ALL', label: '전체' }, { value: 'PENDING', label: '정상' }, { value: 'APPROVED', label: '지각' }].map(({ value, label }) => (
                                            <li key={value} className="flex items-center gap-[8px]">
                                                <input
                                                    className="w-[18px] h-[18px] rounded-full border-1 border-[gray]
                                                        appearance-none checked:bg-[#fff] checked:border-[#62CCD0] relative
                                                        before:content-[''] before:absolute before:inset-[4px]
                                                        before:rounded-full before:bg-white
                                                        checked:before:bg-[#62CCD0]"
                                                    type="radio"
                                                    value={value}
                                                    checked={selectedState === value}
                                                    name="state"
                                                    onChange={() => setSelectedState(value)}
                                                />
                                                <label className="text-[14px] text-[#1F2937]">{label}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* 검색 / 초기화 버튼 */}
                    <div className="flex w-[fit-content] mx-auto mt-[12px] gap-[12px]">
                        <button className="p-[24px] pt-[6px] pb-[6px] border border-[#E6E8EB] rounded-[8px]" onClick={handleReset}>
                            초기화
                        </button>
                        <button className="p-[24px] pt-[6px] pb-[6px] bg-[#62CCD0] text-[#fff] rounded-[8px]" onClick={handleSearch}>
                            검색
                        </button>
                    </div>
                </div>

                {/* 출퇴근 테이블 */}
                <table className={tableStyle}>
                    <colgroup>
                        <col width={140} />
                        <col width={140} />
                        <col width={140} />
                        <col width={440} />
                        <col width={140} />
                        <col width={440} />
                        <col width={140} />
                    </colgroup>
                    <tbody>
                        <tr className={trStyle}>
                            <th className={thStyle}>이름</th>
                            <th className={thStyle}>일자</th>
                            <th className={thStyle}>출근 시각</th>
                            <th className={thStyle}>출근 등록 방식</th>
                            <th className={thStyle}>퇴근 시각</th>
                            <th className={thStyle}>퇴근 등록 방식</th>
                            <th className={thStyle}>근태 구분</th>
                        </tr>
                        {filteredAttendance.map(att => (
                            <tr className={trStyle} key={att.attendanceId}>
                                <td className={tdStyleThree}>{staffData.userName}</td>
                                <td className={tdStyleThree}>{att.workDate}</td>
                                <td className={tdStyleThree}>{formatTime(att.checkInAt)}</td>
                                <td className={tdStyleThree}>{att.checkInIp || "-"}</td>
                                <td className={tdStyleThree}>{formatTime(att.checkOutAt)}</td>
                                <td className={tdStyleThree}>{att.checkOutIp || "-"}</td>
                                <td className={`${tdStyleThree} ${att.checkInAt && att.checkInAt.split(':')[0]*1 >= 9 ? 'text-[#FF4242]' : 'text-[#1F2937]'}`}>
                                    {att.checkInAt && att.checkInAt.split(':')[0]*1 >= 9 ? '지각' : '정상'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default MyAttendanceTable;
