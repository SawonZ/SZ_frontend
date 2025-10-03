import React from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import BigCalendar from '../features/components/BigCalendar';

const CalendarView = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContentsTwo}>
                <BigCalendar />
            </div>
        </main>
    );
};

export default CalendarView;