import React, { useState } from 'react';
import { fetchPostSchedule, fetchPutSchedule } from '../api/workApi';

const useSchedule = (closePopup, initialData = null) => {
    const [dropdown, setDropDown] = useState(false);
    const [schedulTitle, setSchedulTitle] = useState(initialData?.calendarTitle || '');
    const [scheduleKeyword, setScheduleKeyword] = useState(initialData?.calendarType ? getKeywordText(initialData.calendarType) : '근무신청');
    const [scheduleKeywordType, setScheduleKeywordType] = useState(initialData?.calendarType || '');
    const [scheduleDate, setScheduleDate] = useState(initialData?.date || '');
    const [scheduleTime, setscheduleTime] = useState({
        start: initialData?.startTime || '',
        end: initialData?.endTime || ''
    });
    const [schedulInfo, setSchedulInfo] = useState(initialData?.calendarMemo || '');

    // 초기 calendarType -> 키워드 텍스트 변환
    function getKeywordText(type) {
        switch(type) {
            case 'worktime_update': return '근무시간 조정';
            case 'outside_work': return '외근';
            case 'full_rest': return '연차';
            case 'am_rest': return '오전 반차';
            case 'pm_rest': return '오후 반차';
            default: return '근무신청';
        }
    }

    const handleKeywordSelect = (id) => {
        switch (id) {
            case 'keyword1':
                setScheduleKeyword('근무시간 조정');
                setScheduleKeywordType('worktime_update');
                break;
            case 'keyword2':
                setScheduleKeyword('외근');
                setScheduleKeywordType('outside_work');
                break;
            case 'keyword3':
                setScheduleKeyword('연차');
                setScheduleKeywordType('full_rest');
                setscheduleTime({ start: "09:00", end: "18:00" });
                break;
            case 'keyword4':
                setScheduleKeyword('오전 반차');
                setScheduleKeywordType('am_rest');
                setscheduleTime({ start: "09:00", end: "13:00" });
                break;
            case 'keyword5':
                setScheduleKeyword('오후 반차');
                setScheduleKeywordType('pm_rest');
                setscheduleTime({ start: "13:00", end: "18:00" });
                break;
            default:
                setScheduleKeyword('근무신청');
                setScheduleKeywordType('');
        }
    };

    const scheduleSubmit = async (e, calendarId = null) => {
        e.preventDefault();

        console.log({
        calendarType: scheduleKeywordType,
        date: scheduleDate,
        startTime: scheduleTime.start,
        endTime: scheduleTime.end,
        calendarTitle: schedulTitle,
        calendarMemo: schedulInfo
    });

        if (!schedulTitle.trim()) { alert("제목을 입력해주세요."); return; }
        if (scheduleKeyword === "근무신청") { alert("신청 사유(키워드)를 선택해주세요."); return; }
        if (!scheduleDate) { alert("날짜를 선택해주세요."); return; }
        if ((scheduleKeyword === "외근" || scheduleKeyword === "근무시간 조정")) {
            if (!scheduleTime.start || !scheduleTime.end) { alert("시간을 입력해주세요."); return; }
        }
        if (!schedulInfo.trim()) { alert("신청 사유를 입력해주세요."); return; }

        try {
            let res;
            if(calendarId) {
                // 수정
                res = await fetchPutSchedule({
                    calendarId,
                    calendarType: scheduleKeywordType,
                    date: scheduleDate,
                    startTime: scheduleTime.start,
                    endTime: scheduleTime.end,
                    calendarTitle: schedulTitle,
                    calendarMemo: schedulInfo
                });
            } else {
                // 새 일정
                res = await fetchPostSchedule({
                    calendarType: scheduleKeywordType,
                    date: scheduleDate,
                    startTime: scheduleTime.start,
                    endTime: scheduleTime.end,
                    calendarTitle: schedulTitle,
                    calendarMemo: schedulInfo
                });
            }

            if(res.data.responseCode !== "SUCCESS") {
                alert(res.data.message);
                return;
            }

            alert(calendarId ? "일정이 수정되었습니다." : "일정이 성공적으로 신청되었습니다.");
            closePopup();

        } catch(err) {
            console.error("일정 제출 중 오류:", err);
            alert("일정 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return {
        dropdown,
        setDropDown,
        schedulTitle,
        setSchedulTitle,
        scheduleKeyword,
        scheduleKeywordType,
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
