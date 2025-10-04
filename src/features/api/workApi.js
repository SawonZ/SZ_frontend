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