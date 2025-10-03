import React, { useState } from 'react';
import { fetchPostSchedule } from '../api/workApi';

const useSchedule = (closePopup) => {
    const [dropdown, setDropDown] = useState(false);
    const [schedulTitle, setSchedulTitle] = useState('');
    const [scheduleKeyword, setScheduleKeyword] = useState('근무신청');
    const [scheduleKeywordType, setScheduleKeywordType] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setscheduleTime] = useState({
        start: '',
        end: ''
    });
    const [schedulInfo, setSchedulInfo] = useState('');

    const handleKeywordSelect = (id) => {
        switch (id) {
            case 'keyword1':
                setScheduleKeyword('근무시간 조정');
                break;
            case 'keyword2':
                setScheduleKeyword('외근');
                break;
            case 'keyword3':
                setScheduleKeyword('연차');
                setscheduleTime({ start: "09:00", end: "18:00" });
                break;
            case 'keyword4':
                setScheduleKeyword('오전 반차');
                setscheduleTime({ start: "09:00", end: "13:00" });
                break;
            case 'keyword5':
                setScheduleKeyword('오후 반차');
                setscheduleTime({ start: "13:00", end: "18:00" });
                break;
            default:
                setScheduleKeyword('근무신청');
        }
    };

    const scheduleSubmit = async (e) => {
        e.preventDefault();
        // 1. 제목 체크
        if (!schedulTitle.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        // 2. 키워드 체크
        if (scheduleKeyword === "근무신청") {
            alert("신청 사유(키워드)를 선택해주세요.");
            return;
        }

        // 3. 날짜 체크
        if (!scheduleDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        // 4. 시간 체크 (외근, 근무시간 조정만 필수)
        if ((scheduleKeyword === "외근" || scheduleKeyword === "근무시간 조정")) {
            if (!scheduleTime.start || !scheduleTime.end) {
                alert("시간을 입력해주세요.");
                return;
            }
        }

        // 5. 신청 사유 상세내용 체크
        if (!schedulInfo.trim()) {
            alert("신청 사유를 입력해주세요.");
            return;
        }

        try {
            console.log('일정 제출 시작');
            const res = await fetchPostSchedule({
                calendarType: scheduleKeywordType,
                date: scheduleDate,
                startTime: scheduleTime.start,
                endTime: scheduleTime.end,
                calendarTitle: schedulTitle,
                calendarMemo: schedulInfo
            });

            if(res.data.responseCode !== "SUCCESS") {
                alert(`${res.data.message}`);
                return;
            }

            console.log('일정 제출 성공:', res.data);

            alert("일정이 성공적으로 신청되었습니다.");
            closePopup();
        }catch (err) {
            console.log('에러 내용 : ', err.response?.data?.message);
            console.error("일정 신청 중 오류 발생:", err);
            alert("일정 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
            return;
        }
    };

    return {
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
    };
};

export default useSchedule;