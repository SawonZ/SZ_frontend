import React, { useEffect, useMemo, useState } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { approvalBtn, companionlBtn, tableStyle, tdStyleThree, thStyle, trStyle } from '../features/styles/tableTailwind';
import { useUserInquiry } from '../store/useUserStore';
import { fetchApproval } from '../features/api/authApi';
import useLoading from '../features/hooks/useLoading';
import DetailedSearchTable from '../features/components/DetailedSearchTable';

const NewSignUpLists = () => {
    const { users, situation, error, userLists } = useUserInquiry();
    const { userListLoading } = useLoading();

    // 필터 + 히스토리 상태
    const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED
    const [history, setHistory] = useState([]);              // [{email, status:boolean, time: ISOString}]

    // 검색 + 페이징
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 서버 데이터 로드
    useEffect(() => { userLists(); }, [userLists]);

    // ❗ 기존 코드: 로드 시 7일 내 기록만 메모리에 보관 → 7일 넘긴 걸 판단할 근거가 사라짐
    // ⬇️ 변경: 로컬스토리지의 기록을 "있는 그대로" 모두 로드. (표시 여부는 필터에서 7일 초과를 계산)
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('approvalHistory') || '[]');
        setHistory(Array.isArray(stored) ? stored : []);
    }, []);

    // ⏱ 1시간마다 강제 리렌더(7일 경과 타이밍에 자동 반영을 위해)
    const [, forceTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => forceTick(v => v + 1), 60 * 60 * 1000);
        return () => clearInterval(t);
    }, []);

    // 승인/반려 액션
    const approval = async (email, status) => {
        try {
        const now = new Date();
        const res = await fetchApproval({ email, status }); // 서버 상태 변경
        if (res.status < 200 || res.status >= 300) return;

        await userLists(); // 서버 목록 갱신

        // 히스토리: "모든 기록"을 보관. 오래된 건 가볍게 청소(선택)
        setHistory(prev => {
            const newRecord = { email, status, time: now.toISOString() };
            const merged = [...prev, newRecord];

            // 용량 방지용 선택적 청소: 60일 넘은 기록 제거
            const sixtyDays = 60 * 24 * 60 * 60 * 1000;
            const cleaned = merged.filter(h => (now - new Date(h.time)) <= sixtyDays);

            localStorage.setItem('approvalHistory', JSON.stringify(cleaned));
            return cleaned;
        });
        } catch (err) {
        console.error('승인/반려 실패:', err);
        }
    };

    const getStatusText = (status) => {
        switch (status) {
        case true: return '승인';
        case false: return '반려';
        default: return '대기';
        }
    };

    // 🧠 반려 후 7일 초과 여부 계산
    const isRejectedExpired = (email) => {
        // 해당 이메일의 "가장 최근" 기록 중 반려가 있는지 확인
        // (가장 최근 기록 우선이 더 직관적이라 뒤에서부터 탐색)
        for (let i = history.length - 1; i >= 0; i--) {
        const h = history[i];
        if (h.email !== email) continue;
        if (h.status === false) {
            const diff = Date.now() - new Date(h.time).getTime();
            return diff > 7 * 24 * 60 * 60 * 1000; // 7일 초과
        } else {
            // 최근 기록이 승인이라면 더 볼 필요 없음(반려 만료 대상 아님)
            return false;
        }
        }
        return false; // 반려 기록 자체가 없으면 만료 아님
    };

    // 필터 + 검색 + "반려 7일 초과 자동 제외" 적용
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
        // 1) 필터 상태
        switch (filterStatus) {
            case 'PENDING': if (user.status !== null) return false; break;
            case 'APPROVED': if (user.status !== true) return false; break;
            case 'REJECTED': if (user.status !== false) return false; break;
            // ALL은 통과
        }

        // 2) 검색어(이름)
        if (searchQuery && !user.userName?.includes(searchQuery)) return false;

        // 3) 반려 7일 초과 자동 제외(ALL/PENDING/APPROVED는 물론 REJECTED 탭에서도 제외)
        if (isRejectedExpired(user.email)) return false;

        return true;
        });
    }, [users, filterStatus, searchQuery, history]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 연락처 형식 변환
    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    // 행 렌더
    const statusNewLists = () => paginatedUsers.map(user => (
        <tr className={trStyle} key={user.email}>
        <td className={tdStyleThree}>{getStatusText(user.status)}</td>
        <td className={tdStyleThree}>{user?.userName}</td>
        <td className={tdStyleThree}>{user?.email}</td>
        <td className={tdStyleThree}>{formatPhoneNumber(user?.phone)}</td>
        <td className={tdStyleThree}>
            {user.status === null && (
            <>
                <button className={approvalBtn} onClick={() => approval(user.email, true)}>승인</button>
                <button className={companionlBtn} onClick={() => approval(user.email, false)}>반려</button>
            </>
            )}
        </td>
        </tr>
    ));

    const pending = userListLoading(situation, error, users);
    if (pending) return pending;

    return (
        <main className={mainLayout}>
        <div className={mainContentsTwo}>
            <h4 className={`${title2} text-left`}>신규 가입 내역</h4>

            <DetailedSearchTable
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchText={searchText}
            setSearchText={setSearchText}
            setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }}
            setCurrentPage={setCurrentPage}
            onReset={() => {
                setFilterStatus('ALL');
                setSearchText('');
                setSearchQuery('');
                setCurrentPage(1);
            }}
            />

            <table className={tableStyle}>
            <colgroup>
                <col width={80} />
                <col width={140} />
                <col width={610} />
                <col width={610} />
                <col width={200} />
            </colgroup>
            <tbody>
                <tr className={trStyle}>
                <th className={thStyle}>상태</th>
                <th className={thStyle}>이름</th>
                <th className={thStyle}>아이디(이메일)</th>
                <th className={thStyle}>휴대폰 번호</th>
                <th className={thStyle}>가입 요청</th>
                </tr>
                {statusNewLists()}
            </tbody>
            </table>

            {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
                <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-2 py-1 border rounded disabled:opacity-50"
                >
                이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={`px-2 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
                ))}
                <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-2 py-1 border rounded disabled:opacity-50"
                >
                다음
                </button>
            </div>
            )}
        </div>
        </main>
    );
};

export default NewSignUpLists;