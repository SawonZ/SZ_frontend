import React, { useEffect, useState } from 'react';
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
import LoginInputField from '../features/components/LoginInputField';

const Login = () => {
    const {loginState, setLoginState} = useAuthState();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [savedIdCheck, setSavedIdCheck] = useState(false);

    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if(savedId) {
            setLoginState(prev => ({ ...prev, email: savedId }));
            setSavedIdCheck(true);
        }
    }, []);

    const loginSubmit = async (e) => {
        e.preventDefault();

        if(!regularExpression.emailRegex.test(loginState.email.trim())) {
            setModalText('이메일 또는 비밀번호를 확인해주세요.');
            setModalShow(true);
            return;
        };

        if(!regularExpression.pwdRegex.test(loginState.pwd.trim())) {
            setModalText('이메일 또는 비밀번호를 확인해주세요.');
            setModalShow(true);
            setLoginState(prev => ({ ...prev, pwd: '' }));
            return;
        };

        try{
            const res = await fetchLogin({
                email: loginState.email,
                password: loginState.pwd 
            });

            if(res.status < 200 || res.status >= 300) {
                console.log('로그인 POST 실패');
                return;
            };

            login();
            setModalText(res.data.message);
            setModalShow(true);

            if(savedIdCheck) {
                localStorage.setItem('savedId', loginState.email);
            } else {
                localStorage.removeItem('savedId');
            }
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
                <LoginInputField 
                    label='아이디'
                    htmlFor='login-id'
                    type='email'
                    onChange={(e) => setLoginState(perv => ({...perv, email: e.target.value }))}
                    value={loginState.email}
                    inputReset={() => setLoginState(perv => ({...perv, email: '' }))}
                    checked={savedIdCheck}
                    checkedClear={() => {setSavedIdCheck(false)}}
                />
                <LoginInputField 
                    label='비밀번호'
                    htmlFor='login-pwd'
                    type='password'
                    onChange={(e) => setLoginState(perv => ({...perv, pwd: e.target.value }))}
                    value={loginState.pwd}
                    inputReset={() => setLoginState(perv => ({...perv, pwd: '' }))}
                />
                <CommonButton 
                    text='로그인'
                />
                <div className='flex items-center gap-[6px] mt-[24px]'>
                    <input 
                        style={{ accentColor: '#62CCD0' }}
                        className='w-[16px] h-[16px]'
                        type="checkbox"
                        onChange={(e) => setSavedIdCheck(e.target.checked)}
                        checked={savedIdCheck}
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
                    onClick={() => {
                        const isError = modalText === "이메일 또는 비밀번호를 확인해주세요." ||
                                        modalText === "토큰이 없거나, 유효하지 않은 토큰입니다" ||
                                        modalText === "관리자 승인 대기중입니다." ||
                                        modalText === "이메일 또는 비밀번호가 올바르지 않습니다."
                        
                        if(!isError) {
                            navigate('/main')
                        }
                    }}
                />
            }
        </main>
    );
};

export default Login;