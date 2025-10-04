export const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
};

export const formatDate = (stringDate) => {
    if(!stringDate) return '';
    const date = new Date(stringDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeekTwo = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeekTwo}`;
};