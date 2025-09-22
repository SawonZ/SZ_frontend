import InputField from '../shared/components/InputField';
import CommonButton from '../shared/components/CommonButton';
import { regularExpression } from '../utils/validation';
import useAuthState from '../features/hooks/useAuthState';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../features/api/authApi';
import { title2 } from '../shared/styles/commonTailwind';
import { formStyle } from '../features/styles/authFormTailwind';
import { useState } from 'react';

const SignUp = () => {
    const {state, authInputChanged, authInputReset} = useAuthState();
    const navigate = useNavigate();

    const signUpSubmit = async (e) => {
        e.preventDefault();

        if(!regularExpression.nameRegex.test(state.name.trim())) {
            console.log('이름오류');
            authInputReset('name');
            return;
        };

        if(!regularExpression.phoneRegex.test(state.phone.trim())) {
            console.log('전화번호오류');
            authInputReset('phone');
            return;
        };

        if(!regularExpression.emailRegex.test(state.email.trim())) {
            console.log('이메일오류');
            authInputReset('email');
            return;
        };

        if(!regularExpression.pwdRegex.test(state.password.trim())) {
            console.log('비밀번호오류');
            authInputReset('password');
            return;
        };

        try{
            const res = await fetchSignUp({
                name: state.name,
                phone: state.phone,
                email: state.email,
                password: state.password
            });

            if(res.status !== 200) {
                console.log('회원가입 POST 실패');
                return;
            }

            console.log(res.data);
            navigate('/login');
        }catch(err) {
            console.error('회원가입 서버 오류', err);
        };
    };

    return (
        <main className='bg-[#f8f8f8] relative min-h-screen'>
            <form 
                className={formStyle}
                onSubmit={signUpSubmit}
            >  
                <p className={title2}>회원가입</p>
                <InputField 
                    label='이메일'
                    type='email'
                    htmlFor='email'
                    onChange={(e) => authInputChanged(e, 'email')}
                    value={state.email}
                    inputReset={() => authInputReset('email')}
                />
                <InputField 
                    label='인증번호'
                    type='text'
                    htmlFor='emailCheck'
                    onChange={(e) => authInputChanged(e, 'emailCheck')}
                    value={state.emailCheck}
                    inputReset={() => authInputReset('emailCheck')}
                />
                <InputField 
                    label='비밀번호'
                    type='password'
                    htmlFor='password'
                    onChange={(e) => authInputChanged(e, 'password')}
                    value={state.password}
                    inputReset={() => authInputReset('password')}
                />
                <InputField 
                    label='비밀번호 확인'
                    type='password'
                    htmlFor='passwordCheck'
                    onChange={(e) => authInputChanged(e, 'passwordCheck')}
                    value={state.passwordCheck}
                    inputReset={() => authInputReset('passwordCheck')}
                />
                <InputField 
                    label='이름'
                    type='text'
                    htmlFor='name'
                    onChange={(e) => authInputChanged(e, 'name')}
                    value={state.name}
                    inputReset={() => authInputReset('name')}
                />
                <InputField 
                    label='연락처'
                    type='tel'
                    htmlFor='phone'
                    onChange={(e) => authInputChanged(e, 'phone')}
                    value={state.phone}
                    inputReset={() => authInputReset('phone')}
                />
                <CommonButton 
                    text='가입 신청'
                />
                <p className='text-[1rem] text-[#9CA3AF] text-center mt-[52px]'>
                    이미 계정이 있으신가요? <Link to={'/login'} className='text-[#62CCD0] font-[600]'>로그인</Link>
                </p>
            </form>
        </main>
    );
};

export default SignUp;