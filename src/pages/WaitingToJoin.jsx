import React from 'react';
import { formStyle } from '../features/styles/authFormTailwind';
import { title2 } from '../shared/styles/commonTailwind';
import logoSymbol from '../assets/images/logo_symbol.svg';
import CommonButton from '../shared/components/CommonButton';
import { useNavigate } from 'react-router-dom';

const WaitingToJoin = () => {
    const navigate = useNavigate();

    return (
        <main className='bg-[#f8f8f8] relative min-h-screen'>
            <div className={formStyle}>
                <div className='mb-[48px] w-[fit-content] mx-auto'>
                    <img src={logoSymbol} alt="사원즈 로고" />
                </div>
                <p className={`${title2} !mb-[0]`}>가입신청이 완료되었습니다.</p>
                <p className='text-[1rem] text-[#9CA3AF] mt-[24px] leading-[1.5] text-[400]'>
                    관리자 승인 후 이메일로 결과를 안내드리며 <br />
                    승인 완료 시 서비스 이용이 가능합니다.
                </p>
                <CommonButton 
                    text='메인으로 돌아가기'
                    onClick={() => navigate('/main')}
                />
            </div>
        </main>
    );
};

export default WaitingToJoin;