import React from 'react';
import { mainContentsTwo, mainLayout } from '../shared/styles/commonTailwind';

const AttendanceAdmin = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContentsTwo}>
                <h4 className={`${title2} text-left`}>출퇴근 기록조회</h4>
            </div>
        </main>
    );
};

export default AttendanceAdmin;