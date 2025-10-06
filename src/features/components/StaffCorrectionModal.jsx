import React, { useState } from 'react';
import { annuleLeave, annuleLeaveInput } from '../styles/annuleLeaveTailwind';
import closetIco from '../../assets/images/close.png';
import { regularExpression } from '../../utils/validation';
import { staffInfoPatch } from '../api/userApi';

const StaffCorrectionModal = ({ params, closePopup }) => {
    const [correction, setCorrection] = useState({
        address: params.address,
        phone: params.phone
    });

    const patchStaffInfo = async (e) => {
        e.preventDefault();

        if(!regularExpression.phoneRegex.test(correction.phone.trim())) {
            alert('연락처 형식이 올바르지 않습니다.');
            return;
        }

        try {
            const res = await staffInfoPatch({
                address: correction.address,
                phone: correction.phone
            });

            if(res.data.responseCode !== "SUCCESS") {
                console.log('내 정보 수정 오류');
                return;
            }

            alert('내 정보 수정이 완료되었습니다.');
            closePopup();
        } catch(err) {
            console.log('에러 내용 :', err);
            console.error(err.response?.data?.message);
        }
    };

    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className={annuleLeave}>
                <div className='flex items-center justify-between mb-[24px]'>
                    <p className='font-[600]'>내 정보 수정</p>
                    <button
                        onClick={closePopup}
                    >
                        <img src={closetIco} alt="닫기" />
                    </button>
                </div>

                <form onSubmit={patchStaffInfo}>
                    <div className='mb-[16px]'>
                        <label className='block text-[14px] text-[#9CA3AF] mb-[8px]'>주소</label>
                        <input 
                            className={annuleLeaveInput}
                            type="text" 
                            value={correction.address}
                            onChange={(e) => setCorrection(prev => ({ ...prev, address: e.target.value }))}
                        />
                    </div>

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

export default StaffCorrectionModal;