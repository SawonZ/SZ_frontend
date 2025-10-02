import React, { useEffect, useState } from 'react';
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
    const [filterStatus, setFilterStatus] = useState("ALL"); // ALL, PENDING, APPROVED, REJECTED
    const [history, setHistory] = useState([]);

    // 검색 + 페이징 훅
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        userLists();        
    }, [userLists]);

    // 히스토리 불러오기 (7일 유지)
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('approvalHistory') || '[]');
        const now = new Date();
        setHistory(stored.filter(h => (now - new Date(h.time)) <= 7 * 24 * 60 * 60 * 1000));
    }, []);

    const approval = async (email, status) => {
        try {
        const now = new Date();
        const res = await fetchApproval({ email, status });
        if (res.status < 200 || res.status >= 300) return;

        await userLists();

        setHistory(prev => {
            const newRecord = { email, status, time: now.toISOString() };
            const updated = [
            ...prev.filter(h => (now - new Date(h.time)) <= 7 * 24 * 60 * 60 * 1000),
            newRecord
            ];
            localStorage.setItem('approvalHistory', JSON.stringify(updated));
            return updated;
        });
        } catch (err) {
        console.error('승인/반려 실패:', err);
        }
    };

    const getStatusText = (status) => {
        switch (status) {
        case true: return "승인";
        case false: return "반려";
        default: return "대기";
        }
    };

    // 필터 + 검색 적용
    const filteredUsers = users.filter(user => {
        switch (filterStatus) {
        case "PENDING": if(user.status !== null) return false; break;
        case "APPROVED": if(user.status !== true) return false; break;
        case "REJECTED": if(user.status !== false) return false; break;
        }
        if (searchQuery && !user.userName.includes(searchQuery)) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const statusNewLists = () => paginatedUsers.map(user => (
        <tr className={trStyle} key={user.email}>
        <td className={tdStyleThree}>{getStatusText(user.status)}</td>
        <td className={tdStyleThree}>{user?.userName}</td>
        <td className={tdStyleThree}>{user?.email}</td>
        <td className={tdStyleThree}>{user?.phone}</td>
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
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            reset={() => {
                setFilterStatus("ALL");
                setSearchText("");
                setSearchQuery("");
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
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-2 py-1 border rounded disabled:opacity-50">이전</button>
                {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-2 py-1 border rounded disabled:opacity-50">다음</button>
            </div>
            )}
        </div>
        </main>
    );
};

export default NewSignUpLists;