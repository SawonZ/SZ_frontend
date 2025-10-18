import React, { useEffect, useState } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { noticeGet } from '../features/api/noticeApi';

const Notice = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await noticeGet();
                if (res.responseCode === 'SUCCESS') {
                    setNoticeList(res.data);
                } else {
                    alert('공지사항을 불러오지 못했습니다.');
                }
            } catch (error) {
                console.error(error);
                alert('공지사항 조회 중 오류가 발생했습니다.');
            }
        };

        fetchNotices();
    }, []);

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>공지사항</h4>

                <ul className='border-t-[2px] border-[#62CCD0] mb-[80px]'>
                    {noticeList.length > 0 ? (
                        noticeList.map((notice, index) => (
                            <li
                                key={notice.noticeId}
                                className='border-b border-[#D1D5DB] p-[15px] pl-[50px] pr-[50px] cursor-[pointer] flex justify-between'
                                onClick={() => navigate(`/notice-detail/${notice.noticeId}`)}
                            >
                                <div className='flex gap-[100px]'>
                                    <p className='text-[#1F2937]'>{index + 1}</p>
                                    <p className='text-[#1F2937] font-[600]'>{notice.title}</p>
                                </div>
                                <p className='text-[#4B5563]'>
                                    {notice.createdAt ? notice.createdAt.slice(0, 10) : '-'}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li className='text-center p-[30px] text-[#9CA3AF]'>
                            등록된 공지사항이 없습니다.
                        </li>
                    )}
                </ul>

                {user?.role === "ROLE_ADMIN" || user?.role === "ROLE_MANAGER" && (
                    <button 
                        className="w-[200px] h-[60px] rounded-[8px] text-[18px] text-[#fff] bg-[#62CCD0] ml-auto mr-auto block"
                        onClick={() => navigate('/notice-write')}
                    >
                        글쓰기
                    </button>
                )}
            </div>
        </main>
    );
};

export default Notice;
