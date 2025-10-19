import React, { useRef, useState } from 'react';
import { annuleLeave, annuleLeaveDropdown, annuleLeaveDropdownList, annuleLeaveDropdownListItem, annuleLeaveInput, annuleLeaveInputDate } from '../styles/annuleLeaveTailwind';
import closetIco from '../../assets/images/close.png';
import downArrowIco from '../../assets/images/down_arrow.png';
import useSchedule from '../hooks/useSchedule';
import usePositionTitle from '../hooks/usePositionTitle';
import profileIco3 from '../../assets/images/profile_test3.png';
import { profileDelete, userInfoPatch, profilePut } from '../api/userApi';

const UserCorrectionModal = ({ params, closePopup }) => {
    const [correction, setCorrection] = useState({
        email: params.email,
        salary: params.salary,
        hiredAt: params.hiredAt
    });

    const {
            dropdown,
            setDropDown,
    } = useSchedule();   
    const [Keyword, setKeyword] = useState(params.positionTitle);
    const [KeywordType, setKeywordType] = useState(null);
    const [annualLeaveCount, setAnnualLeaveCount] = useState(params.annualLeaveCount);
    const {koreanPositionTitle} = usePositionTitle();    
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

    const handleKeywordSelect = (title) => {
        switch(title) {
            case 'Sawon':
                return setKeyword('Sawon'), setAnnualLeaveCount(11);
            case 'TeamJang':
                return setKeyword('TeamJang'), setAnnualLeaveCount(20);
        }
    };

    const handleKeywordType = (title) => {
        switch(title) {
            case '사원':
                return setKeywordType('Sawon');
            case '팀장':
                return setKeywordType('TeamJang');
        }
    };

    const patchUserInfo = async (e) => {
        e.preventDefault();

        try {
            const res = await userInfoPatch({
                email: correction.email,
                salary: correction.salary,
                annualLeaveCount: annualLeaveCount,
                positionTitle: KeywordType,
                hiredAt: correction.hiredAt
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

            if(res.data.responseCode !== "SUCCESS") {
                console.log('직원 정보 수정 오류');
                return;
            }

            console.log(res.data.data);
            alert('직원 정보 수정이 완료되었습니다.');
            closePopup();
        }catch(err) {
            console.log('에러내용 :', err);
            console.error(err.response?.data?.message);
            alert('직원 정보 수정 서버 오류');
        }
    };

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={`${annuleLeave} !h-[700px]`}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>직원정보 수정</p>
                    <button
                        onClick={closePopup}
                    >
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>

                <form 
                    className='h-full overflow-auto'
                    onSubmit={patchUserInfo}
                >
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

                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>이메일</label>
                        <input 
                            className={annuleLeaveInput}
                            readOnly
                            type="email" 
                            value={correction.email}
                        />
                    </div>

                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>연봉</label>
                        <input 
                            className={annuleLeaveInput}
                            type="number" 
                            step="1000000" 
                            min="0"
                            value={correction.salary}
                            onChange={(e) => setCorrection(prev => ({...prev, salary: e.target.value }))}
                        />
                    </div>
                    
                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>연차</label>
                        <input 
                            className={annuleLeaveInput}
                            type="number" 
                            value={annualLeaveCount}
                            onChange={(e) => setAnnualLeaveCount(e.target.value)}
                        />
                    </div>

                    <div className='mb-[16px] relative'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>직급</label>
                        <div 
                            className={annuleLeaveDropdown}
                            onClick={() => setDropDown(prev => !prev)}
                        >
                            <p className='text-[14px] text-[#9CA3AF]'>{koreanPositionTitle(Keyword)}</p>
                            <img src={downArrowIco} alt="아래 화살표" />
                        </div>

                        <div 
                            className={`${annuleLeaveDropdownList} !left-[0] !top-[70px]`}
                            style={
                                dropdown ? { display: 'block' } : { display: 'none' }
                            }
                        >
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('Sawon');
                                    handleKeywordType('사원');
                                    setDropDown(false);
                                }}
                            >
                                사원
                            </p>
                            <p 
                                className={annuleLeaveDropdownListItem}
                                onClick={() => {
                                    handleKeywordSelect('TeamJang');
                                    handleKeywordType('팀장');
                                    setDropDown(false);
                                }}
                            >
                                팀장
                            </p>
                        </div>
                    </div>

                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>입사일</label>
                        <input 
                            className={`${annuleLeaveInputDate} w-full box-border`}
                            type="date" 
                            value={correction.hiredAt}
                            onChange={(e) => setCorrection(prev => ({...prev, hiredAt: e.target.value }))}
                        />
                    </div>

                    <button 
                        className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300 absolute bottom-[40px] right-[40px]'
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserCorrectionModal;