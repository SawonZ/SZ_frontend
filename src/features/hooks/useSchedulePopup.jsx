import React, { useState } from 'react';

const useSchedulePopup = () => {
    const [schedulePopupShow, setSchedulePopupShow] = useState(false);

    const openSchedulePopup = (e) => {
        e.preventDefault();
        setSchedulePopupShow(true);
    };

    return { schedulePopupShow, openSchedulePopup, setSchedulePopupShow };
};

export default useSchedulePopup;