import React, { useEffect, useMemo, useState } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { useAuth, useUserInquiryPortion } from '../store/useUserStore';
import useLoading from '../features/hooks/useLoading';
import DetailedSearchTable from '../features/components/DetailedSearchTable';
import { tableStyle, tdStyleThree, thStyle, trStyle } from '../features/styles/tableTailwind';
import usePositionTitle from '../features/hooks/usePositionTitle';
import { useNavigate } from 'react-router-dom';
import profileTest3 from '../assets/images/profile_test3.png';

const UserListsPortion = () => {
    const { user:userData } = useAuth();
    const { usersPortion = [], situation, error, userListsNotAdmin } = useUserInquiryPortion();
    const { userListLoading } = useLoading();
    const { koreanPositionTitle } = usePositionTitle();
    const navigate = useNavigate();

    // 검색 상태
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => { userListsNotAdmin(); }, [userListsNotAdmin]);

    // ✅ 퇴사 후 7일 경과 여부 체크 헬퍼
    const isWithin7Days = (dateStr) => {
        if (!dateStr) return false;
        const resignedMs = new Date(`${dateStr}T00:00:00`).getTime();
        const expireMs = resignedMs + 7 * 24 * 60 * 60 * 1000;
        return Date.now() < expireMs;
    };

    // ✅ 승인 + (미퇴사 or 7일 이내) + 검색
    const filteredUsers = useMemo(() => {
        return usersPortion
            .filter(user => user.status === true)
            .filter(user => !user.resignedAt || isWithin7Days(user.resignedAt))
            .filter(user => (searchQuery ? user.userName?.includes(searchQuery) : true));
    }, [usersPortion, searchQuery]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(start, start + itemsPerPage);
    }, [filteredUsers, currentPage]);

    const handleSearch = () => {
        setSearchQuery(searchText);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchText("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        const cleaned = phone.replace(/\D/g, "");
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    const pending = userListLoading(situation, error, usersPortion);
    if (pending) return pending;

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>직원 조회</h4>

                <DetailedSearchTable
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setSearchQuery={handleSearch}
                    filterStatus={undefined}
                    setFilterStatus={() => {}}
                    onReset={handleReset}
                />

                <table className={tableStyle}>
                    <colgroup>
                        <col width={203} />
                        <col width={203} />
                        <col width={203} />
                        <col width={203} />
                        <col width={203} />
                    </colgroup>
                    <tbody>
                        <tr className={trStyle}>
                            <th className={thStyle}>프로필</th>
                            <th className={thStyle}>이름</th>
                            <th className={thStyle}>직급</th>
                            <th className={thStyle}>이메일</th>
                            <th className={thStyle}>연락처</th>
                        </tr>

                        {paginatedUsers.map(user => (
                            <tr 
                                className={trStyle} key={user.email}
                                onClick={() => {
                                    if (userData.email === user.email) {
                                        navigate(`/staff-view/${user.email}`);
                                    }
                                }}
                            >
                                <td className={tdStyleThree}>
                                    <img 
                                        className='w-[100px] h-[100px] rounded-[50%]'
                                        src={user.imgUrl === null ? profileTest3 : user.imgUrl} 
                                        alt="직원 프로필" 
                                    />
                                </td>
                                <td className={tdStyleThree}>{user.userName}</td>
                                <td className={tdStyleThree}>{koreanPositionTitle(user.positionTitle)}</td>
                                <td className={tdStyleThree}>{user.email}</td>
                                <td className={tdStyleThree}>{formatPhoneNumber(user.phone)}</td>
                            </tr>
                        ))}
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
                                className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
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

export default UserListsPortion;