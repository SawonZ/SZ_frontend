import React from 'react';
import InputField from '../shared/components/InputField';
import CommonButton from '../shared/components/CommonButton';
import useAuthState from '../features/hooks/useAuthState';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../features/api/authApi';
import { regularExpression } from '../utils/validation';
import useModalShow from '../shared/hooks/useModalShow';
import { formStyle } from '../features/styles/authFormTailwind';
import logoSymbol from '../assets/images/logo_symbol.svg';
import { title2 } from '../shared/styles/commonTailwind';
import Modal from '../shared/components/Modal';
import { useAuth } from '../store/useUserStore';

const Login = () => {
    const {state, authInputChanged, authInputReset, regexCheck} = useAuthState();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const { userInfo } = useAuth();
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        if(!regularExpression.emailRegex.test(state.email.trim())) {
            setModalText('이메일 또는 비밀번호를 확인해주세요.');
            setModalShow(true);
            authInputReset('email');
            return;
        };

        if(!regularExpression.pwdRegex.test(state.password.trim())) {
            setModalText('이메일 또는 비밀번호를 확인해주세요.');
            setModalShow(true);
            authInputReset('password');
            return;
        };

        try{
            const res = await fetchLogin({
                email: state.email,
                password: state.password 
            });

            if(res.status < 200 || res.status >= 300) {
                console.log('로그인 POST 실패');
                return;
            };

            userInfo();
            setModalText(res.data.message);
            setModalShow(true);
            await navigate('/main');
        } catch(err) {
            console.log('에러 내용 : ', err);
            setModalText(err.response.data.message);
            setModalShow(true);
            console.error('로그인 서버 오류', err);
        };
    };

    return (
        <main className='bg-[#f8f8f8] relative min-h-screen'>
            <form 
                className={formStyle}
                onSubmit={loginSubmit}
            >
                <div className='mb-[48px] w-[fit-content] mx-auto'>
                    <img src={logoSymbol} alt="사원즈 로고" />
                </div>
                <p className={title2}>로그인</p>
                <InputField 
                    label='이메일'
                    type='email'
                    onChange={(e) => authInputChanged(e, 'email')}
                    value={state.email}
                    inputReset={() => authInputReset('email')}
                    regexCheck={regexCheck}
                />
                <InputField 
                    label='패스워드'
                    type='password'
                    placeholder='비밀번호 입력'
                    onChange={(e) => authInputChanged(e, 'password')}
                    value={state.password}
                    inputReset={() => authInputReset('password')}
                    regexCheck={regexCheck}
                />
                <CommonButton 
                    text='로그인'
                />
                <div className='flex items-center gap-[6px] mt-[24px]'>
                    <input 
                        style={{ accentColor: '#62CCD0' }}
                        className='w-[16px] h-[16px]'
                        type="checkbox" 
                    />
                    <label className='text-[14px] text-[#9CA3AF]'>아이디 기억하기</label>
                </div>

                <Link to={'/policy'} 
                    className='block w-[fit-content] text-[1rem] text-[#9CA3AF] text-center mt-[52px] mx-auto underline'
                >
                    아이디가 없으신가요?
                </Link>
            </form>

            {
                modalShow && 
                <Modal 
                    modalShowReset={() => setModalShow(false)}
                    modalText={modalText}
                    modalTextClear={() => setModalText('')}
                />
            }
        </main>
    );
};

export default Login;