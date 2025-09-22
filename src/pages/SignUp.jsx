import InputField from '../shared/components/InputField';
import CommonButton from '../shared/components/CommonButton';
import { regularExpression } from '../utils/validation';
import useAuthState from '../features/hooks/useAuthState';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../features/api/authApi';
import { title2 } from '../shared/styles/commonTailwind';
import { formStyle } from '../features/styles/authFormTailwind';

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
                    onChange={(e) => authInputChanged(e, 'email')}
                    value={state.email}
                />
                <InputField 
                    label='인증번호'
                    type='text'
                    onChange={(e) => authInputChanged(e, 'emailCheck')}
                    value={state.emailCheck}
                />
                <InputField 
                    label='비밀번호'
                    type='password'
                    onChange={(e) => authInputChanged(e, 'password')}
                    value={state.password}
                />
                <InputField 
                    label='비밀번호 확인'
                    type='password'
                    onChange={(e) => authInputChanged(e, 'passwordCheck')}
                    value={state.passwordCheck}
                />
                <InputField 
                    label='이름'
                    type='text'
                    onChange={(e) => authInputChanged(e, 'name')}
                    value={state.name}
                />
                <InputField 
                    label='연락처'
                    type='tel'
                    onChange={(e) => authInputChanged(e, 'phone')}
                    value={state.phone}
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