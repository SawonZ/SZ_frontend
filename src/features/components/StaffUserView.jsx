import React, { useState } from 'react';
import profileIco3 from '../../assets/images/profile_test3.png';
import UserCorrectionModal from './UserCorrectionModal';
import LoadingUi from '../../shared/components/LoadingUi';
import StaffCorrectionModal from './StaffCorrectionModal';

const StaffUserView = ({ params, formatPhoneNumber, koreanPositionTitle, formatSalaryNumber }) => {
    const [staffCorrectionModalshow , setStaffCorrectionmodalShow] = useState(false);

    console.log(params);

    if(!params) return <LoadingUi />

    return (
        <div className='pb-[40px]'>
            <div className='flex flex-col items-center w-[179px] mx-auto mb-[40px]'>
                <img 
                    className='w-[100px] h-[100px] overflow-hidden rounded-[50%]'
                    src={params.imgUrl === null ? profileIco3 : params.imgUrl} 
                    alt="직원 프로필 사진" 
                />
                <p className='mt-[24px] mb-[12px] text-[#1F2937]'>{params.userName}</p>
                <div className='flex justify-between w-full'>
                    <p className='text-[#1F2937] text-[14px]'>입사일자</p>
                    <p className='text-[#1F2937] text-[14px]'>{params.hiredAt}</p>
                </div>
            </div>

            <ul>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>이메일</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.email}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>연락처</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{formatPhoneNumber(params.phone)}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>직급</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{koreanPositionTitle(params.positionTitle)}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>연차</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.annualLeaveCount}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>주소</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.address}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>연봉</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{formatSalaryNumber(params.salary)}원</p>
                </li>
            </ul>

            <div className='flex items-center justify-center gap-[12px]'>
                <button    
                    className='w-[135px] h-[36px] border border-[#E6E8EB] rounded-[8px] text-[#1F2937]'
                    onClick={() => setStaffCorrectionmodalShow(true)}
                >
                    내 정보 수정
                </button>
            </div>

            {
                staffCorrectionModalshow && 
                <StaffCorrectionModal 
                    params={params}
                    closePopup={() => setStaffCorrectionmodalShow(false)}
                />
            }
        </div>
    );
};

export default StaffUserView;