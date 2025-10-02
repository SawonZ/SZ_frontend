import React, { useEffect, useState, useMemo } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { useUserInquiryPortion } from '../store/useUserStore';
import useLoading from '../features/hooks/useLoading';
import DetailedSearchTable from '../features/components/DetailedSearchTable';
import { tableStyle, tdStyleThree, thStyle, trStyle } from '../features/styles/tableTailwind';
import usePositionTitle from '../features/hooks/usePositionTitle';

const UserListsPortion = () => {
    const { usersPortion = [], situation, error, userListsNotAdmin } = useUserInquiryPortion();
    const { userListLoading } = useLoading();
    const { koreanPositionTitle } = usePositionTitle();

    // 검색 상태
    const [searchText, setSearchText] = useState("");    // 입력값
    const [searchQuery, setSearchQuery] = useState("");  // 실제 검색 적용
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 초기 데이터 가져오기
    useEffect(() => {
        userListsNotAdmin();
    }, [userListsNotAdmin]);

    // 검색 + 페이징
    const filteredUsers = useMemo(() => {
        return usersPortion
            .filter(user => user.status === true) // 승인된 직원만
            .filter(user => searchQuery ? user.userName.includes(searchQuery) : true);
    }, [usersPortion, searchQuery]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(start, start + itemsPerPage);
    }, [filteredUsers, currentPage]);

    // 검색 버튼 클릭
    const handleSearch = () => {
        setSearchQuery(searchText);
        setCurrentPage(1); // 검색 후 페이지 초기화
    };

    // 초기화 버튼 클릭
    const handleReset = () => {
        setSearchText("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    // 로딩/에러 처리
    const pending = userListLoading(situation, error, usersPortion);
    if (pending) return pending;

    return (
        <main className={mainLayout}>
            <div className={mainContentsTwo}>
                <h4 className={`${title2} text-left`}>직원 조회</h4>

                {/* 검색 입력 + 버튼 */}
                <DetailedSearchTable
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setSearchQuery={handleSearch} 
                    filterStatus={undefined}    
                    setFilterStatus={() => {}}
                    onReset={handleReset}
                />

                {/* 테이블 */}
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
                            <tr className={trStyle} key={user.email}>
                                <td className={tdStyleThree}>사진</td>
                                <td className={tdStyleThree}>{user.userName}</td>
                                <td className={tdStyleThree}>{koreanPositionTitle(user.positionTitle)}</td>
                                <td className={tdStyleThree}>{user.email}</td>
                                <td className={tdStyleThree}>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
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