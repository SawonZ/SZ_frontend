import React, { useEffect, useState } from 'react';
import { fetchGetAllSchedule } from '../api/workApi';

const useAllScheduleList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        const fetchAllScheduleList = async () => {
            setisLoading(true);

            try {
                const res = await fetchGetAllSchedule();

                if(res.data.responseCode !== "SUCCESS") {
                    console.log('전체 일정 조회 실패');
                    return;
                }

                // 데이터가 객체인지 배열인지 체크
                let dataArray = [];
                if (Array.isArray(res.data.data)) {
                    dataArray = res.data.data;
                } else if (res.data.data) {
                    dataArray = [res.data.data]; // 단일 객체도 배열로 변환
                }

                const fcEvents = res.data.data.map(ev => {
                const startDate = new Date(ev.date + 'T' + (ev.startTime || '00:00'));
                const days = ['일', '월', '화', '수', '목', '금', '토']; // 한국 요일
                const dayOfWeek = days[startDate.getDay()];

                return {
                    id: ev.calendarId,
                    title: ev.calendarTitle,
                    start: ev.date + 'T' + (ev.startTime || '00:00'),
                    end: ev.date + 'T' + (ev.endTime || '23:59'),
                    extendedProps: {
                        userName: ev.userName,
                        memo: ev.calendarMemo,
                        calendarType: ev.calendarType,
                        status: ev.status,
                        dayOfWeek: dayOfWeek, // 요일 추가
                        positionTitle: ev.positionTitle // 직급 추가
                    }
                };
            });

                setEvents(fcEvents);
            } catch(err) {
                console.log('에러 내용', err);
                console.error(err.response?.data?.message);
            } finally {
                setisLoading(false);
            }
        };

        fetchAllScheduleList();
    }, []);

    return { events, isLoading };
};

export default useAllScheduleList;