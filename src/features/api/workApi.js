import axios from "axios";

// 일정 추가
export const fetchPostSchedule = async ({ calendarType, date, startTime, endTime, calendarTitle, calendarMemo }) => {
    const res = await axios.post('https://api.sawonz.world/calendar', 
        {
            calendarType,
            date,
            startTime,
            endTime,
            calendarTitle,
            calendarMemo
        },
        {withCredentials: true}
    );

    return res;
};

// 전체 일정 조회
export const fetchGetAllSchedule = async () => {
    const res = await axios.get("https://api.sawonz.world/calendar?list=email", 
        {withCredentials: true}
    );

    return res;
};

// 본인 일정 조회
export const fetchGetSchedule = async () => {
    const res = await axios.get("https://api.sawonz.world/calendar?list=me", 
        {withCredentials: true}
    );

    return res;
};

// 본인 일정 수정(대기상태 일때만 가능)
export const fetchPutSchedule = async ({ calendarId, calendarType, date, startTime, endTime, calendarTitle, calendarMemo}) => {
    const res = await axios.put(`https://api.sawonz.world/calendar/${calendarId}`, 
        {
            calendarType,
            date,
            startTime,
            endTime,
            calendarTitle,
            calendarMemo
        },
        {withCredentials: true}
    );

    return res;
};

// 본인 일정 수정(대기상태 일때만 가능)
export const fetchDeleteSchedule = async ({ calendarId }) => {
    const res = await axios.delete(`https://api.sawonz.world/calendar/${calendarId}`, 
        {withCredentials: true}
    );

    return res;
};

// 관리자가 일정 승인 / 반려
export const fetchRejectApprovalSchedule = async ({ calendarId, status }) => {
    const res = await axios.patch(`https://api.sawonz.world/calendar/${calendarId}`, 
        {
            status
        },
        {withCredentials: true}
    );

    return res;
};

//출근
export const fetchGoToWork = async () => {
    const res = await axios.post('https://api.sawonz.world/attendance/in',
        {},
        { withCredentials: true }
    );

    return res;
};

//퇴근
export const fetchLeaveWork = async () => {
    const res = await axios.post('https://api.sawonz.world/attendance/out',
        {},
        { withCredentials: true }
    );

    return res;
};
