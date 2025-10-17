import React from 'react';
import workCheck from '../../assets/images/work_check.png';

const WorkModal = ({ modalText, setWorkModalText, setWorkModal, modalTime, modalKind }) => {
    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className='w-[506px] p-[40px] rounded-[20px] bg-[#fff] box-border fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-center'>
                <img src={workCheck} alt="체크표시" className='mb-[12px]' />

                {/* ✅ 시간 표시 (초 단위 포함) */}
                <p className='text-[28px] font-[600] text-[#1F2937] leading-[1.5]'>
                    {modalKind === 'go' ? '출근 시간' : '퇴근 시간'} : {modalTime || '--:--:--'}
                </p>

                <p className='text-[#1f2937] leading-[1.5] mb-[40px]'>
                    {modalText}
                </p>

                <button 
                    className='flex items-center justify-center w-full h-[60px]  text-[#fff] bg-[#62CCD0] rounded-[0.5rem] hover:bg-[#59BABE] transition-all duration-300 text-[18px]'
                    onClick={() => {
                        setWorkModal(false);
                        setWorkModalText('');
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default WorkModal;
