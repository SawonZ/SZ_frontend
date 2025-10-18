import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { noticeGetDetail, noticeUpdate } from '../features/api/noticeApi';

const NoticeEdit = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await noticeGetDetail(noticeId);
                if (res.responseCode === 'SUCCESS') {
                    setTitle(res.data.title);
                    setContent(res.data.content);
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

    const handleUpdate = async () => {
        try {
            const res = await noticeUpdate({ noticeId, title, content });
            if (res.responseCode === 'SUCCESS') {
                alert('공지사항이 수정되었습니다.');
                navigate(`/notice-detail/${noticeId}`);
            } else {
                alert('수정 실패');
            }
        } catch (err) {
            console.error(err);
            alert('수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>공지사항 수정</h4>
                <div className='flex flex-col gap-[20px] mt-[20px]'>
                    <input
                        className='w-full h-[40px] border border-[#D1D5DB] pl-[10px] rounded-[8px] outline-none box-border'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                    />
                    <textarea
                        className='w-full h-[200px] border border-[#D1D5DB] p-[10px] rounded-[8px] outline-none resize-none box-border'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용"
                    />
                    <div className='flex gap-[8px]'>
                        <button
                            className='w-[100px] h-[40px] rounded-[8px] text-[#fff] bg-[#62CCD0]'
                            onClick={handleUpdate}
                        >
                            저장
                        </button>
                        <button
                            className='w-[100px] h-[40px] rounded-[8px] text-[#fff] bg-[#D1D5DB]'
                            onClick={() => navigate(`/notice-detail/${noticeId}`)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NoticeEdit;
