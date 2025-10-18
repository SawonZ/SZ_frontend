import React, { useEffect, useState } from 'react';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import { Link } from 'react-router-dom';
import searchIco from '../../assets/images/search.png';
import profileTest2 from '../../assets/images/profile_test2.png';
import useLoading from '../hooks/useLoading';
import { useUserInquiryPortion } from '../../store/useUserStore';
import usePositionTitle from '../hooks/usePositionTitle';

const NotAdminstaffDirectoryBoard = ({ arrow }) => {
    const { usersPortion = [], situation, error, userListsNotAdmin } = useUserInquiryPortion();
    const { userListLoading } = useLoading();
    const { koreanPositionTitle } = usePositionTitle();

    const [searchList, setSearchList] = useState('');
    const [debounced, setDebounced] = useState('');

    // 리스트
    useEffect(() => {
        const initLists = async () => {
            await userListsNotAdmin();
        };
        initLists();
    }, [userListsNotAdmin]);

    // 검색 디바운싱
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(searchList), 500);
        return () => clearTimeout(timer);
    }, [searchList]);

    // ✅ (임시 디버깅) 실제 들어오는 키 확인 - 첫 렌더 후 1번만
    useEffect(() => {
        if (!usersPortion?.length) return;
        const sample = usersPortion.slice(0, 3).map(u => ({
            email: u.email,
            resigned: u.resigned,
            resignedAt: u.resignedAt,
            resignAt: u.resignAt,
            retiredAt: u.retiredAt,
            resigned_date: u.resigned_date,
            isResigned: u.isResigned,
            retired: u.retired,
        }));
        // 확인 후 필요없으면 주석 처리해도 됩니다.
        console.log('[NotAdminstaffDirectoryBoard] sample resigned fields:', sample);
    }, [usersPortion]);

    // ✅ 퇴사 여부 판정(여러 키/타입 방어적으로 커버)
    const isResigned = (u) => {
        // 1) 불린성 플래그 후보
        const flagCandidates = [u?.resigned, u?.isResigned, u?.retired];
        const hasTrueFlag = flagCandidates.some(v => {
            if (typeof v === 'boolean') return v === true;
            if (typeof v === 'string') return v.toLowerCase() === 'true' || v === '1' || v.toLowerCase() === 'y';
            if (typeof v === 'number') return v === 1;
            return false;
        });

        if (hasTrueFlag) return true;

        // 2) 날짜성 필드 후보
        const dateCandidates = [u?.resignedAt, u?.resignAt, u?.retiredAt, u?.resigned_date];
        for (const d of dateCandidates) {
            if (d == null) continue; // null/undefined
            if (typeof d === 'string' && d.trim().length === 0) continue; // 빈문자열
            // 날짜로 파싱 가능하면 퇴사 처리로 간주
            const t = new Date(`${d}`.replace(' ', 'T')).getTime();
            if (!Number.isNaN(t)) return true;
        }
        return false;
    };

    // ✅ 이름/이메일/직급 검색 + 승인자만 + 퇴사자는 즉시 제외
    const filteredUsers = usersPortion.filter((user) => {
        if (!user?.status) return false;      // 승인된 직원만
        if (isResigned(user)) return false;   // 퇴사자는 즉시 제외

        const titleKo = koreanPositionTitle(user.positionTitle) || '';
        const name = user.userName || '';
        const email = (user.email || '').toLowerCase();
        const q = debounced.toLowerCase();

        return (
            name.includes(debounced) ||
            email.includes(q) ||
            titleKo.includes(debounced)
        );
    });

    // 로딩/에러처리
    const pending = userListLoading(situation, error, usersPortion);
    if (pending) return pending;

    return (
        <div className={board}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>직원조회</h4>
                <Link to={"/user-lists-portion"}>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>
            <div>
                <div className='relative w-full mb-[1rem]'>
                    <button className='absolute top-[50%] left-[12px] translate-y-[-50%]'>
                        <img src={searchIco} alt='검색버튼' />
                    </button>
                    <input
                        className='w-full block h-[40px] bg-[#F5F5F5] rounded-[40px] outline-none border-none pl-[40px] box-border'
                        type="text"
                        value={searchList}
                        onChange={(e) => setSearchList(e.target.value)}
                    />
                </div>

                <ul className='overflow-auto max-h-[128px] pb-[10px] box-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                    {filteredUsers.map((user) => (
                        <li key={user?.email} className='flex items-center gap-[12px] mb-[0.875rem] last:mb-[0]'>
                            <img
                                className='w-[32px] h-[32px] rounded-[50%]'
                                src={user.imgUrl === null ? profileTest2 : user.imgUrl}
                                alt="프로필"
                            />
                            <div className='flex items-center gap-[5px]'>
                                <p className='text-[0.875rem] text-[#1F2937] font-[500]'>{user?.userName}</p>
                                <p className='text-[0.8125rem] text-[#4B5563]'>{koreanPositionTitle(user?.positionTitle)}</p>
                                <p className='text-[0.8125rem] text-[#4B5563]'>{user?.email}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotAdminstaffDirectoryBoard;
