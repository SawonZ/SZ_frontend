import InputField from '../shared/components/InputField';
import CommonButton from '../shared/components/CommonButton';
import { regularExpression } from '../utils/validation';
import useAuthState from '../features/hooks/useAuthState';
import { useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../features/api/authApi';

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
        <>
            <form onSubmit={signUpSubmit}>
                <InputField 
                    label='이름'
                    type='text'
                    placeholder='이름 입력'
                    onChange={(e) => authInputChanged(e, 'name')}
                    value={state.name}
                />
                <InputField 
                    label='연락처'
                    type='tel'
                    placeholder='연락처 입력'
                    onChange={(e) => authInputChanged(e, 'phone')}
                    value={state.phone}
                />
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

export default SignUp;