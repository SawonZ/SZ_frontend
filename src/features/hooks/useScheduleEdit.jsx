import { useState, useEffect } from 'react';
import { fetchDeleteSchedule, fetchPutSchedule } from '../api/workApi';
import useStaffData from './useStaffData';

const useScheduleEdit = (closePopup, initialData) => {
    const [schedulTitle, setSchedulTitle] = useState('');
    const [scheduleKeywordType, setScheduleKeywordType] = useState('');
    const [scheduleKeyword, setScheduleKeyword] = useState('근무신청');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setscheduleTime] = useState({ start: '', end: '' });
    const [schedulInfo, setSchedulInfo] = useState('');
    const [dropdown, setDropDown] = useState(false);
    const {staffData} = useStaffData();
    
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

        if (scheduleKeyword === '연차' && staffData.annualLeaveCount <= 0) {
            return alert('잔여 연차가 없습니다. 연차를 사용할 수 없습니다.');
        }

        if (scheduleKeyword === '오전 반차' || scheduleKeyword === '오후 반차' && staffData.annualLeaveCount <= 0) {
            return alert('잔여 연차가 없습니다. 연차를 사용할 수 없습니다.');
        }

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

    const deleteSchedule = async (e) => {
        e.preventDefault();

        const isConfirmed = confirm("정말 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try{
            const res = await fetchDeleteSchedule({ calendarId: initialData.calendarId, });

            if(res.data.responseCode !== 'SUCCESS'){
                alert(res.data.message);
                return;
            }

            alert('일정이 삭제되었습니다.');
            closePopup();
        } catch(err) {
            console.error('삭제 중 오류:', err);
            alert('삭제 중 오류가 발생했습니다.');
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
        scheduleEditSubmit,
        deleteSchedule
    };
};

export default useScheduleEdit;