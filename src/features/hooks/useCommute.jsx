import { useState, useEffect, useRef } from 'react';
import { fetchGoToWork, fetchLeaveWork } from '../api/workApi'; // fetchWorkStatus 제거

const useCommute = () => {
    const [workState, setWorkState] = useState(false);
    const [leaveState, setLeaveState] = useState(false);
    const [goToWork, setGoToWork] = useState('00:00:00');
    const [leaveWork, setLeaveWork] = useState('00:00:00');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);

    const storageKey = (key) => `default_${key}`;

    // --- 시간 포맷 ---
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

    const calculateProgress = () => {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const startMinutes = 9 * 60;
        const endMinutes = 18 * 60;
        if (nowMinutes < startMinutes) return 0;
        if (nowMinutes > endMinutes) return 100;
        return ((nowMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;
    };

    // --- 일일 초기화 ---
    const resetDaily = () => {
        const todayStr = new Date().toDateString();
        const lastDate = localStorage.getItem(storageKey('lastDate'));
        if (lastDate !== todayStr) {
            ['goToWork','leaveWork','workState','leaveState','startTimestamp'].forEach(key =>
                localStorage.removeItem(storageKey(key))
            );
            localStorage.setItem(storageKey('lastDate'), todayStr);

            setGoToWork('00:00:00');
            setLeaveWork('00:00:00');
            setWorkState(false);
            setLeaveState(false);
            setElapsedTime(0);
            setProgress(0);

            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    // --- 출근 ---
    const handleClickGoToWork = async () => {
        try {
            const res = await fetchGoToWork(); // axios 호출
            let workTime = formatTime(new Date());

            if (res.data.responseCode === 'SUCCESS') {
                workTime = formatTime(new Date());
            } else if (res.data.responseCode === 'ALREADY_CHECKED') {
                workTime = res.data.goToWorkTime ?? formatTime(new Date());
            } else {
                return alert(res.data.message);
            }

            setGoToWork(workTime);
            setWorkState(true);
            localStorage.setItem(storageKey('goToWork'), workTime);
            localStorage.setItem(storageKey('workState'), 'true');

            if (timerRef.current) clearInterval(timerRef.current);
            const startTimestamp = Date.now();
            localStorage.setItem(storageKey('startTimestamp'), startTimestamp);

            timerRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                setElapsedTime(elapsed);
                setProgress(calculateProgress());
            }, 1000);
        } catch (err) {
            console.error('출근 오류:', err.response?.data?.message || err.message);
            alert(err.response?.data?.message || '출근 처리 중 오류 발생');
        }
    };

    // --- 퇴근 ---
    const handleClickLeaveWork = async () => {
        try {
            const res = await fetchLeaveWork(); // axios 호출
            let leaveTime = formatTime(new Date());

            if (res.data.responseCode === 'SUCCESS') {
                leaveTime = formatTime(new Date());
            } else if (res.data.responseCode === 'ALREADY_CHECKED') {
                leaveTime = res.data.leaveWorkTime ?? formatTime(new Date());
            } else {
                return alert(res.data.message);
            }

            setLeaveWork(leaveTime);
            setLeaveState(true);

            localStorage.setItem(storageKey('leaveWork'), leaveTime);
            localStorage.setItem(storageKey('leaveState'), 'true');

            if (timerRef.current) clearInterval(timerRef.current);
            setProgress(calculateProgress());
        } catch (err) {
            console.error('퇴근 오류:', err.response?.data?.message || err.message);
            alert(err.response?.data?.message || '퇴근 처리 중 오류 발생');
        }
    };

    // --- localStorage 기반 초기화 ---
    useEffect(() => {
        resetDaily();

        const storedGo = localStorage.getItem(storageKey('goToWork'));
        const storedLeave = localStorage.getItem(storageKey('leaveWork'));
        const storedWorkState = localStorage.getItem(storageKey('workState')) === 'true';
        const storedLeaveState = localStorage.getItem(storageKey('leaveState')) === 'true';
        const startTimestamp = parseInt(localStorage.getItem(storageKey('startTimestamp')), 10);

        if (storedGo) setGoToWork(storedGo);
        if (storedLeave) setLeaveWork(storedLeave);
        if (storedWorkState) {
            setWorkState(true);
            if (!storedLeaveState && startTimestamp) {
                timerRef.current = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                    setElapsedTime(elapsed);
                    setProgress(calculateProgress());
                }, 1000);
            }
        }
        if (storedLeaveState) setLeaveState(true);

        setProgress(calculateProgress());

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
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
