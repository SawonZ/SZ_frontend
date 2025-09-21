import React from 'react';
import InputField from '../shared/components/InputField';
import CommonButton from '../shared/components/CommonButton';
import useAuthState from '../features/hooks/useAuthState';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../features/api/authApi';
import { regularExpression } from '../utils/validation';

const Login = () => {
    const {state, authInputChanged, authInputReset} = useAuthState();
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

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
            const res = await fetchLogin({
                email: state.email,
                password: state.password 
            });

            if(res.status !== 200) {
                console.log('로그인 POST 실패');
                return;
            };

            console.log(res.data);
            if(res.data.user.role !== 'admin') {
                console.log('일반사원');
            } else {
                navigate('관리자 페이지');
            };
        } catch(err) {
            console.error('회원가입 서버 오류', err);
        };
    };

    return (
        <>
            <form onSubmit={loginSubmit}>
                <InputField 
                    label='이메일'
                    type='email'
                    placeholder='이메일 입력'
                    onChange={(e) => authInputChanged(e, 'email')}
                    value={state.email}
                />
                <InputField 
                    label='패스워드'
                    type='password'
                    placeholder='비밀번호 입력'
                    onChange={(e) => authInputChanged(e, 'password')}
                    value={state.password}
                />
                <CommonButton 
                    text='success'
                />
            </form>
        </>
    );
};

export default Login;