import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { useAuth } from '../store/useUserStore';
import { noticeGetDetail, noticeDelete } from '../features/api/noticeApi';

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await noticeGetDetail(noticeId);
                if (res.responseCode === 'SUCCESS') {
                    setNotice(res.data);
                } else {
                    alert('공지사항을 불러오지 못했습니다.');
                }
            } catch (err) {
                console.error(err);
                alert('공지사항 조회 중 오류가 발생했습니다.');
            }
        };
        fetchNotice();
    }, [noticeId]);

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            const res = await noticeDelete(noticeId);
            if (res.responseCode === 'SUCCESS') {
                alert('공지사항이 삭제되었습니다.');
                navigate('/notice');
            } else {
                alert('삭제 실패');
            }
        } catch (err) {
            console.error(err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    if (!notice) return <p className='p-[40px]'>로딩 중...</p>;

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>{notice.title}</h4>
                <p className='text-[#4B5563] mb-[20px]'>
                    작성자: {notice.writerName} | 작성일: {notice.createdAt.slice(0,10)}
                </p>
                <div className='border-t border-[#D1D5DB] pt-[20px]'>
                    <p>{notice.content}</p>
                </div>

                {(user?.role === "ROLE_ADMIN" || user?.role === "ROLE_MANAGER") && (
                    <div className='flex gap-[8px] mt-[40px]'>
                        <button
                            className="w-[100px] h-[40px] rounded-[8px] text-[16px] text-[#fff] bg-[#62CCD0]"
                            onClick={() => navigate(`/notice-edit/${noticeId}`)}
                        >
                            수정
                        </button>
                        <button
                            className="w-[100px] h-[40px] rounded-[8px] text-[16px] text-[#fff] bg-[#FF4242]"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                        <button
                            className="w-[100px] h-[40px] rounded-[8px] text-[16px] text-[#fff] bg-[#D1D5DB]"
                            onClick={() => navigate('/notice')}
                        >
                            목록으로
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default NoticeDetail;
