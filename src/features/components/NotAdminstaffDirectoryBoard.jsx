import React, { useEffect, useState } from 'react';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import { Link } from 'react-router-dom';
import searchIco from '../../assets/images/search.png';
import profileTest2 from '../../assets/images/profile_test2.png';
import useLoading from '../hooks/useLoading';
import {useUserInquiryPortion } from '../../store/useUserStore';
import usePositionTitle from '../hooks/usePositionTitle';

const NotAdminstaffDirectoryBoard = ({ arrow }) => {
    const {usersPortion, situation, error, userListsNotAdmin} = useUserInquiryPortion();
    const {userListLoading} = useLoading();
    const {koreanPositionTitle} = usePositionTitle();
    const [searchList, setSearchList] = useState('');
    const [debounced, setDebounced] = useState('');

    //리스트
    useEffect(() => {
        const initLists = async () => {
            await userListsNotAdmin();
        }
        initLists();   
    }, [userListsNotAdmin]);

    //검색 디바운싱
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(searchList);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchList]);

    //로딩/에러처리
    const pending = userListLoading(situation, error, usersPortion);
    if(pending) return pending;

    //이름, 이메일, 직급으로 필터링
    const filteredUsers = usersPortion.filter(user => {
        if(!user.status) return;

        const koreanPositionTitles = koreanPositionTitle(user.positionTitle);
        return (
            user.userName.includes(debounced) ||
            user.email.toLowerCase().includes(debounced.toLowerCase()) ||
            koreanPositionTitles.includes(debounced)
        )
    });

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

                <ul className='overflow-auto max-h-[128px]'>
                    {filteredUsers.map((user) => (
                        <li key={user?.email} className='flex items-center gap-[12px] mb-[0.875rem] last:mb-[0]'>
                            <img src={profileTest2} alt="프로필" />
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