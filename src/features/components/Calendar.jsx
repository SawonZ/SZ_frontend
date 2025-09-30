import React from 'react';
import '../styles/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendal = () => {
    return (
        <div>
            <FullCalendar 
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin ]} 
                locale="ko"
                events={[
                    { title: 'Event 1', date: '2025-09-01' },
                    { title: 'Event 2', date: '2025-09-07' }
                ]}
            />
        </div>
    );
};

export default Calendal;