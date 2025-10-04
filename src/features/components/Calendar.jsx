import React, { useState, useMemo } from 'react';
import '../styles/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import { Link } from 'react-router-dom';
import useAllScheduleList from '../hooks/useAllScheduleList';
import LoadingUi from '../../shared/components/LoadingUi';
import { formatDate, formatTime } from '../../utils/formatTime';
import ScheduleListsPopup from './ScheduleListsPopup';

const Calendal = ({ arrow }) => {
    const { events, isLoading } = useAllScheduleList();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    if(isLoading) {
        return <LoadingUi />;
    }

    // 선택된 날짜의 이벤트 필터링
    const sameDateEventsApi = selectedDate 
        ? events.filter(ev => formatDate(ev.start) === selectedDate)
        : [];

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedDate(null);
    };

    return (
        <div className='main-calendar relative'>
            <Link to={'/calendar'} className='absolute top-[43px] right-[39px]' >
                <img src={arrow} alt="달력 페이지 이동" />
            </Link>
            <FullCalendar 
                key={`calendar-${isPopupOpen}`}
                initialView="dayGridMonth"
                plugins={[ dayGridPlugin, googleCalendarPlugin, interactionPlugin ]}
                locale="ko"
                dayCellContent={(arg) => {
                    return arg.date.getDate();
                }}
                eventSources={[
                    {
                        googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                        googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
                    },
                ]}
                eventDisplay="block"
                events={events}
                eventClick={(info) => {
                    if (!info.event._def.url) {
                        const clickedDate = formatDate(info.event.start);
                        console.log('이벤트 클릭됨:', clickedDate);
                        setSelectedDate(clickedDate);
                        setIsPopupOpen(true);
                    }
                }}
                
                eventContent={(info) => {
                    const isGoogleEvent = info.event._def.url !== '';
                    
                    if (isGoogleEvent) {
                        return (
                            <div className="holidays" title={`${info.event.title}`}>
                                {info.event.title}
                            </div>
                        );
                    }
    
                    const startDate = formatDate(info.event.start);
                    const allEvents = info.view.calendar.getEvents();
                    const sameDateEvents = allEvents.filter(
                        (ev) => !ev._def.url && formatDate(ev.start) === startDate
                    );
                    
                    const isFirstEvent = sameDateEvents[0]?.id === info.event.id;
                    if (!isFirstEvent) {
                        return null;
                    }
                    
                    const approvedCount = sameDateEvents.filter(
                        (ev) => ev.extendedProps.status === true
                    ).length;
                    
                    const pendingCount = sameDateEvents.filter(
                        (ev) => ev.extendedProps.status === null
                    ).length;
                    
                    const rejectedCount = sameDateEvents.filter(
                        (ev) => ev.extendedProps.status === false
                    ).length;
    
                    return (
                        <div className="eventDay">
                            {approvedCount > 0 && (
                                <div className="status-item">
                                    <span className="ball green-ball"></span>
                                    {approvedCount}개
                                </div>
                            )}
                            {pendingCount > 0 && (
                                <div className="status-item">
                                    <span className="ball yellow-ball"></span>
                                    {pendingCount}개
                                </div>
                            )}
                            {rejectedCount > 0 && (
                                <div className="status-item">
                                    <span className="ball red-ball"></span>
                                    {rejectedCount}개
                                </div>
                            )}
                        </div>
                    );
                }}
            />

            {isPopupOpen && (
                <ScheduleListsPopup 
                    sameDateEventsApi={sameDateEventsApi}
                    selectedDate={selectedDate}
                    isLoading={isLoading}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default Calendal;