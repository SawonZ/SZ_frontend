import { useState, useEffect, useRef } from 'react';
import { fetchGoToWork, fetchLeaveWork } from '../api/workApi';

const useCommute = () => {
    const [workState, setWorkState] = useState(false);
    const [leaveState, setLeaveState] = useState(false);
    const [goToWork, setGoToWork] = useState('00:00:00');
    const [leaveWork, setLeaveWork] = useState('00:00:00');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0); // ← 진행률 추가

    console.log(leaveState)

    const timerRef = useRef(null);

    // --- 시간 포맷 함수 ---
    const formatTime = (date) => {
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const formatElapsed = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    // --- 진행률 계산 ---
    const calculateProgress = () => {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const startMinutes = 9 * 60; // 09:00
        const endMinutes = 18 * 60;  // 18:00

        if (nowMinutes < startMinutes) return 0;
        if (nowMinutes > endMinutes) return 100;
        return ((nowMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;
    };

    // --- 출근 클릭 ---
    const handleClickGoToWork = async () => {
        try {
            const res = await fetchGoToWork();
            if (res.data.responseCode !== 'SUCCESS') return;

            const now = new Date();
            const nowStr = formatTime(now);

            setGoToWork(nowStr);
            setWorkState(true);
            localStorage.setItem('goToWork', nowStr);
            localStorage.setItem('workState', 'true');

            // 타이머 시작
            const startTimestamp = now.getTime();
            localStorage.setItem('startTimestamp', startTimestamp);
            timerRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                setElapsedTime(elapsed);
                setProgress(calculateProgress()); // ← 진행률 업데이트
            }, 1000);

        } catch (err) {
            console.error('출근 오류:', err);
        }
    };

    // --- 퇴근 클릭 ---
    const handleClickLeaveWork = async () => {
        try {
            const res = await fetchLeaveWork();
            if (res.data.responseCode !== 'SUCCESS') return;

            const now = new Date();
            const nowStr = formatTime(now);

            setLeaveWork(nowStr);
            setLeaveState(true);
            setWorkState(false);
            localStorage.setItem('leaveWork', nowStr);
            localStorage.setItem('leaveState', 'true');

            // 타이머 종료
            clearInterval(timerRef.current);
            setProgress(calculateProgress()); // 마지막으로 진행률 업데이트
        } catch (err) {
            console.error('퇴근 오류:', err);
        }
    };

    // --- 새로고침 시 로컬스토리지 값 복원 ---
    useEffect(() => {
        const storedGo = localStorage.getItem('goToWork');
        const storedLeave = localStorage.getItem('leaveWork');
        const storedWorkState = localStorage.getItem('workState') === 'true';
        const storedLeaveState = localStorage.getItem('leaveState') === 'true';
        const startTimestamp = localStorage.getItem('startTimestamp');

        if (storedGo) setGoToWork(storedGo);
        if (storedLeave) setLeaveWork(storedLeave);
        if (storedWorkState) {
            setWorkState(true);
            if (!storedLeaveState && startTimestamp) {
                // 진행 중이면 타이머 재시작
                timerRef.current = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - parseInt(startTimestamp)) / 1000);
                    setElapsedTime(elapsed);
                    setProgress(calculateProgress());
                }, 1000);
            }
        }
        if (storedLeaveState) setLeaveState(true);

        // 페이지 로드 시 한 번만 계산
        setProgress(calculateProgress());

        return () => clearInterval(timerRef.current);
    }, []);

    return {
        workState,
        leaveState,
        goToWork,
        leaveWork,
        elapsedTime,
        progress,          
        formatElapsed,
        handleClickGoToWork,
        handleClickLeaveWork
    };
};

export default useCommute;