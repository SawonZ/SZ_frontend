import React from 'react';
import '../styles/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Link } from 'react-router-dom';

const Calendal = ({ arrow }) => {
    return (
        <div className='relative'>
            <Link to={'/calendar'} className='absolute top-[43px] right-[39px]' >
                <img src={arrow} alt="달력 페이지 이동" />
            </Link>
            <FullCalendar 
                initialView="dayGridMonth"
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

export default Calendal;