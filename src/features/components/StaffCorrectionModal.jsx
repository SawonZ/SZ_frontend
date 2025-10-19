import React, { useRef, useState } from 'react';
import { annuleLeave, annuleLeaveInput } from '../styles/annuleLeaveTailwind';
import closetIco from '../../assets/images/close.png';
import { regularExpression } from '../../utils/validation';
import { profilePut, staffInfoPatch, profileDelete } from '../api/userApi';
import profileIco3 from '../../assets/images/profile_test3.png';

const StaffCorrectionModal = ({ params, closePopup }) => {
    const [correction, setCorrection] = useState({
        address: params.address,
        phone: params.phone
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [currentImg, setCurrentImg] = useState(params.imgUrl);
    const fileInputRef = useRef(null);

    // 이미지 선택
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setCurrentImg(null); // 기존 이미지 제거
        }
    };

    // 삭제 버튼 클릭 → 서버에 null 전송
    const handleDeleteImage = async () => {
        try {
            await profileDelete(); // DELETE 요청 → 서버에서 imgUrl=null 처리
            setSelectedFile(null);
            setPreview(null);
            setCurrentImg(null);

            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            console.error('이미지 삭제 실패:', err.response?.data?.message || err);
            alert('이미지 삭제 실패: ' + (err.response?.data?.message || '서버 오류'));
        }
    };

    // 정보 제출
    const patchStaffInfo = async (e) => {
        e.preventDefault();

        if (!regularExpression.phoneRegex.test(correction.phone.trim())) {
            alert('연락처 형식이 올바르지 않습니다.');
            return;
        }

        try {
            // 1️⃣ 기본 정보 수정
            const res = await staffInfoPatch({
                address: correction.address,
                phone: correction.phone
            });

            // 2️⃣ 새 이미지가 있으면 업로드
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const res2 = await profilePut(formData);
                if (res2.data.responseCode !== "SUCCESS") {
                    console.log('프로필 이미지 수정 오류');
                    return;
                }
            }

            if (res.data.responseCode !== "SUCCESS") {
                console.log('내 정보 수정 오류');
                return;
            }

            alert('내 정보 수정이 완료되었습니다.');
            closePopup();
        } catch (err) {
            console.log('에러 내용 :', err);
            console.error(err.response?.data?.message);
        }
    };

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={annuleLeave}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>내 정보 수정</p>
                    <button onClick={closePopup}>
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>

                <form onSubmit={patchStaffInfo}>
                    {/* 프로필 이미지 */}
                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>
                            프로필 이미지
                        </label>

                        <div className='flex items-center gap-[16px]'>
                            {/* 이미지 미리보기 영역 */}
                            <div className='w-[80px] h-[80px] rounded-full overflow-hidden bg-[#f3f4f6] flex items-center justify-center'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={preview || currentImg || profileIco3} 
                                    alt='프로필 이미지'
                                />
                            </div>

                            {/* 삭제 버튼 */}
                            <button
                                type="button"
                                onClick={handleDeleteImage}
                                className="w-[100px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#D1D5DB] hover:bg-[#9CA3AF] transition-all duration-300 text-center leading-[36px] cursor-pointer"
                            >
                                삭제
                            </button>

                            {/* 파일 선택 */}
                            <label
                                htmlFor='profileUpload'
                                className='w-[100px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300 text-center leading-[36px] cursor-pointer'
                            >
                                이미지 수정
                            </label>
                            <input
                                id='profileUpload'
                                type='file'
                                accept='image/*'
                                className='hidden'
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* 주소 */}
                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>주소</label>
                        <input
                            className={annuleLeaveInput}
                            type="text"
                            value={correction.address}
                            onChange={(e) => setCorrection(prev => ({ ...prev, address: e.target.value }))}
                        />
                    </div>

                    {/* 연락처 */}
                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>연락처</label>
                        <input
                            className={annuleLeaveInput}
                            type="text"
                            placeholder="'-' 제외"
                            value={correction.phone}
                            onChange={(e) => setCorrection(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>

                    {/* 확인 버튼 */}
                    <button
                        type="submit"
                        className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300 absolute bottom-[40px] right-[40px]'
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffCorrectionModal;
