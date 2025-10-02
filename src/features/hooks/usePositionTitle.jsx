import React from 'react';

const usePositionTitle = () => {
    const koreanPositionTitle = (positionTitle) => {
        if(positionTitle === 'Owner') {
            return '대표';
        } else if(positionTitle === "TeamJang") {
            return '팀장';
        } else if(positionTitle === "Sawon" || "사원") {
            return '사원';
        }
    };

    return {koreanPositionTitle};
};

export default usePositionTitle;