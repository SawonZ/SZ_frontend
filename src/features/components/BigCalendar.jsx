import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import '../styles/calendar.css';
import useAllScheduleList from '../hooks/useAllScheduleList';
import { formatTime } from '../../utils/formatTime';
import LoadingUi from '../../shared/components/LoadingUi';

const BigCalendar = () => {
    const { events, isLoading } = useAllScheduleList();

    if(isLoading) {
        return <LoadingUi />;
    }

    return (
        <div className='relative big-calendar'>
        <FullCalendar
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            locale="ko"
            dayCellContent={arg => arg.date.getDate()}
            eventSources={[
                {
                    googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                    googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
                },
            ]}
            eventDisplay="block"
            events={events}
            // status별 이벤트 커스터마이징
            eventContent={(info) => {
                const isGoogleEvent = info.event._def.url !== '';

                // API 이벤트 status에 따라 색상 변경
                const status = info.event.extendedProps.status;
            
                let statusClass = '';
                switch (status) {
                    case true:
                        statusClass = 'ball green-ball';
                        break;
                    case false:
                        statusClass = 'ball red-ball';
                        break;
                    case null:
                        statusClass = 'ball yellow-ball';
                        break;
                    default:
                        statusClass = '';
                };

                const calendarType = info.event.extendedProps.calendarType;
                const getCalendarTypeText = (type) => {
                    switch(type) {
                        case 'pm_rest':
                            return '오후 반차';
                        case 'am_rest':
                            return '오전 반차';
                        case 'full_rest':
                            return '연차';
                        case 'outside_work':
                            return '외근';
                        default:
                            return type;
                    }
                };

                //날짜 및 시간 형식 변경
                const startTime = formatTime(info.event.start);

                return (
                    <div
                        className={isGoogleEvent ? 'holidays' : 'eventDay'}
                        title={`${info.event.title}`}
                    >
                        <span className={statusClass}></span>
                        {
                            isGoogleEvent ? info.event.title :
                            `${info.event.extendedProps.userName} - ${startTime} ${getCalendarTypeText(calendarType)}`
                        }
                    </div>
                );
            }}
        />
        </div>
    );
};

export default BigCalendar;