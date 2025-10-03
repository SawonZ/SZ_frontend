import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import '../styles/calendar.css';

const BigCalendar = () => {
    return (
        <div className='relative big-calendar'>
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin, googleCalendarPlugin ]}
                locale="ko"
                dayCellContent={(arg) => {
                    return arg.date.getDate(); // 숫자만 반환
                }}
                events={{
                    googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                    googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
                }}
                eventDisplay="block"
                eventDidMount={(info) => {
                    // 공휴일 이벤트가 있는 날짜를 찾고, 숫자를 빨간색으로
                    const dayNumber = info.el.closest('.fc-daygrid-day')?.querySelector('.fc-daygrid-day-number');
                    if (dayNumber) {
                    dayNumber.style.color = '#FF4242';
                    }
                }}
            />
        </div>
    );
};

export default BigCalendar;