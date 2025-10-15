import React, { useEffect, useState, useMemo } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { useUserInquiry } from '../store/useUserStore';
import useLoading from '../features/hooks/useLoading';
import DetailedSearchTable from '../features/components/DetailedSearchTable';
import { tableStyle, tdStyleThree, thStyle, trStyle } from '../features/styles/tableTailwind';
import usePositionTitle from '../features/hooks/usePositionTitle';
import { useNavigate } from 'react-router-dom';
import profileIco3 from '../assets/images/profile_test3.png';

const UserLists = () => {
    const { users, situation, error, userLists } = useUserInquiry();
    const { userListLoading } = useLoading();
    const { koreanPositionTitle } = usePositionTitle();
    const navigate = useNavigate();

    // 검색 상태
    const [searchText, setSearchText] = useState("");    // 입력값
    const [searchQuery, setSearchQuery] = useState("");  // 실제 검색 적용
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 사용자 목록 초기화
    useEffect(() => {
        userLists();        
    }, [userLists]);

    // 검색 적용 + 페이징
    const filteredUsers = useMemo(() => {
        return users
            .filter(user => user.status === true) // 승인된 직원만
            .filter(user => searchQuery ? user.userName.includes(searchQuery) : true);
    }, [users, searchQuery]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    //연락처 형식 변환
    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        const cleaned = phone.replace(/\D/g, ""); // 숫자만 추출

        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    // 연봉 3자리마다 콤마 표시
    const formatSalaryNumber = (salary) => {
        if (salary == null) return "";
        const cleaned = String(salary).replace(/\D/g, "");

        return Number(cleaned).toLocaleString();
    };
    
    // 로딩/에러 처리
    const pending = userListLoading(situation, error, users);
    if (pending) return pending;

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>직원 조회</h4>

                {/* 검색 인풋 */}
                <DetailedSearchTable
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setSearchQuery={setSearchQuery}
                    setCurrentPage={setCurrentPage} // 검색 시 페이지 초기화
                />

                {/* 테이블 */}
                <table className={tableStyle}>
                    <colgroup>
                        <col width={140} />
                        <col width={140} />
                        <col width={140} />
                        <col width={203} />
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
                            <th className={thStyle}>주소</th>
                            <th className={thStyle}>입사일</th>
                            <th className={thStyle}>연봉</th>
                            <th className={thStyle}>잔여 연차</th>
                        </tr>

                        {paginatedUsers.map(user => (
                            <tr 
                                className={trStyle} 
                                key={user.email}
                                onClick={() => navigate(`/user-view/${user.email}`)}
                            >
                                <td className={tdStyleThree}>
                                    <img
                                        className='w-[100px] h-[100px] rounded-[50%]' 
                                        src={user.imgUrl === null ? profileIco3 : user.imgUrl } 
                                        alt="직원 프로필" />
                                </td>
                                <td className={tdStyleThree}>{user?.userName}</td>
                                <td className={tdStyleThree}>{koreanPositionTitle(user?.positionTitle)}</td>
                                <td className={tdStyleThree}>{user?.email}</td>
                                <td className={tdStyleThree}>{formatPhoneNumber(user?.phone)}</td>
                                <td className={tdStyleThree}>{user?.address}</td>
                                <td className={tdStyleThree}>{user?.hiredAt}</td>
                                <td className={tdStyleThree}>{formatSalaryNumber(user?.salary)}원</td>
                                <td className={tdStyleThree}>{user?.annualLeaveCount}</td>
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

export default UserLists;