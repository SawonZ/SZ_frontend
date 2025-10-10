import { useState, useEffect } from 'react';
import { fetchPutSchedule } from '../api/workApi';

const useScheduleEdit = (closePopup, initialData) => {
    const [schedulTitle, setSchedulTitle] = useState('');
    const [scheduleKeywordType, setScheduleKeywordType] = useState('');
    const [scheduleKeyword, setScheduleKeyword] = useState('근무신청');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setscheduleTime] = useState({ start: '', end: '' });
    const [schedulInfo, setSchedulInfo] = useState('');
    const [dropdown, setDropDown] = useState(false);

    // calendarType -> 한글 매핑
    const getKeywordText = (type) => {
        switch(type){
            case 'worktime_update': return '근무시간 조정';
            case 'outside_work': return '외근';
            case 'full_rest': return '연차';
            case 'am_rest': return '오전 반차';
            case 'pm_rest': return '오후 반차';
            default: return '근무신청';
        }
    };

    useEffect(() => {
        if(initialData){
            setSchedulTitle(initialData.calendarTitle || '');
            setScheduleKeywordType(initialData.calendarType || '');
            setScheduleKeyword(getKeywordText(initialData.calendarType));
            setScheduleDate(initialData.date || '');
            setscheduleTime({
                start: initialData.startTime || '',
                end: initialData.endTime || ''
            });
            setSchedulInfo(initialData.calendarMemo || '');
        }
    }, [initialData]);

    const handleKeywordSelect = (id) => {
        switch(id){
            case 'keyword1':
                setScheduleKeyword('근무시간 조정');
                setScheduleKeywordType('worktime_update');
                setscheduleTime({ start:"09:00", end:"18:00" });
                break;
            case 'keyword2':
                setScheduleKeyword('외근');
                setScheduleKeywordType('outside_work');
                break;
            case 'keyword3':
                setScheduleKeyword('연차');
                setScheduleKeywordType('full_rest');
                setscheduleTime({ start:"09:00", end:"18:00" });
                break;
            case 'keyword4':
                setScheduleKeyword('오전 반차');
                setScheduleKeywordType('am_rest');
                setscheduleTime({ start:"09:00", end:"13:00" });
                break;
            case 'keyword5':
                setScheduleKeyword('오후 반차');
                setScheduleKeywordType('pm_rest');
                setscheduleTime({ start:"13:00", end:"18:00" });
                break;
            default:
                setScheduleKeyword('근무신청');
                setScheduleKeywordType('');
        }
        setDropDown(false);
    };

    const scheduleEditSubmit = async (e) => {
        e.preventDefault();

        if(!schedulTitle.trim()) return alert('제목을 입력해주세요.');
        if(scheduleKeyword === '근무신청') return alert('신청 사유를 선택해주세요.');
        if(!scheduleDate) return alert('날짜를 선택해주세요.');
        if((scheduleKeyword === '외근' || scheduleKeyword === '근무시간 조정') &&
           (!scheduleTime.start || !scheduleTime.end)) return alert('시간을 입력해주세요.');
        if(!schedulInfo.trim()) return alert('신청 사유를 입력해주세요.');

        try{
            const res = await fetchPutSchedule({
                calendarId: initialData.calendarId,
                calendarType: scheduleKeywordType,
                date: scheduleDate,
                startTime: scheduleTime.start,
                endTime: scheduleTime.end,
                calendarTitle: schedulTitle,
                calendarMemo: schedulInfo
            });

            if(res.data.responseCode !== 'SUCCESS'){
                alert(res.data.message);
                return;
            }

            alert('일정 수정 완료!');
            closePopup();
        }catch(err){
            console.error('수정 중 오류:', err.response?.data?.message || err);
            alert('수정 중 오류가 발생했습니다.');
        }
    };

    return {
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
        scheduleEditSubmit
    };
};

export default useScheduleEdit;