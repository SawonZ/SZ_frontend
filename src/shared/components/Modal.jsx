import React from 'react';

const Modal = ({ modalText, modalTextClear, modalShowReset, onClick }) => {
    return (
        <div className='fixed top-[0] left-[0] w-full h-full bg-[rgba(0,0,0,0.5)] z-99'>
            <div className='w-[506px] h-[198px] p-[40px] rounded-[20px] bg-[#fff] box-border fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
                <p className='text-[0.875rem] text-[#1f2937] leading-[1.5]'>
                    {modalText}
                </p>
                <button 
                    className='w-[76px] h-[36px] text-[1rem] text-[#fff] rounded-[0.5rem] bg-[#62CCD0] hover:bg-[#59BABE] transition-all duration-300 absolute bottom-[40px] right-[40px]'
                    onClick={() => {
                        modalTextClear()
                        modalShowReset()
                        onClick
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default Modal;