import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import { noticeRegistration } from '../features/api/noticeApi';

const NoticeWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 작성 완료
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return alert('제목을 입력해주세요.');
        if (!content.trim()) return alert('내용을 입력해주세요.');

        try {
            const res = await noticeRegistration({ title, content });

            if (res.data.responseCode === 'SUCCESS') {
                alert('공지사항이 등록되었습니다.');
                navigate('/notice');
            } else {
                alert(`등록 실패: ${res.data.message}`);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
                navigate('/login');
            } else {
                alert('공지사항 등록 중 오류가 발생했습니다.');
                console.error(error);
            }
        }
    };

    // 취소 버튼
    const handleCancel = () => {
        if (window.confirm('작성 중인 내용이 사라집니다. 취소하시겠습니까?')) {
            navigate('/notice');
        }
    };

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>공지사항</h4>

                <form 
                    className='w-[1100px] mx-auto border-t-[2px] border-[#62CCD0] p-[40px]'
                    onSubmit={handleSubmit}
                >
                    {/* 제목 */}
                    <div className='flex items-center gap-[12px] mb-[20px]'>
                        <img
                            src="/src/assets/images/pencil.png"
                            alt="제목 아이콘"
                            className='w-[20px] h-[20px]'
                        />
                        <input
                            className='w-[calc(100%-32px)] h-[40px] border border-[#D1D5DB] rounded-[8px] pl-[20px] outline-none text-[14px] placeholder:text-[#9CA3AF]'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="공지 제목을 입력해주세요."
                        />
                    </div>

                    {/* 내용 */}
                    <div className='flex items-start gap-[12px]'>
                        <img
                            src="/src/assets/images/text-align-start.png"
                            alt="내용 아이콘"
                            className='w-[20px] h-[20px] mt-[8px]'
                        />
                        <textarea
                            className='w-[calc(100%-32px)] h-[300px] border border-[#D1D5DB] rounded-[8px] pl-[20px] pt-[12px] pr-[20px] outline-none text-[14px] placeholder:text-[#9CA3AF] resize-none'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="공지 내용을 입력해주세요."
                        />
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-center gap-[20px] mt-[40px]">
                        <button 
                            type="submit"
                            className="w-[200px] h-[60px] rounded-[8px] text-[18px] text-[#fff] bg-[#62CCD0] hover:bg-[#4fb5b9] transition"
                        >
                            작성완료
                        </button>

                        <button 
                            type="button"
                            onClick={handleCancel}
                            className="w-[200px] h-[60px] rounded-[8px] text-[18px] text-[#333] bg-[#E5E7EB] hover:bg-[#d1d5db] transition"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default NoticeWrite;
