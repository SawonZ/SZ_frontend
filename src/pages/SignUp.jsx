import InputField from '../shared/components/InputField';
import { regularExpression } from '../utils/validation';
import useAuthState from '../features/hooks/useAuthState';
import { Link, useNavigate } from 'react-router-dom';
import { citationCheck, fetchSignUp, postEmail } from '../features/api/authApi';
import { buttonDisabled, commonButton, title2 } from '../shared/styles/commonTailwind';
import { formStyle } from '../features/styles/authFormTailwind';
import InputFieldCitation from '../features/components/InputFieldCitation';
import { useEffect, useState } from 'react';
import Modal from '../shared/components/Modal';
import useModalShow from '../shared/hooks/useModalShow';

const SignUp = () => {
    const {state, authInputChanged, authInputReset, regexCheck, regexErrMsg} = useAuthState();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const [hasInput, setHasInput] = useState(false);
    const [emailCitationCheckPostcheck, setemailCitationCheckPostcheck] = useState(false);

    const navigate = useNavigate();

    //이메일 인증번호 발송
    // 인증번호 발송 후 딜레이가 걸린다면 setModalShow를 항상 on 상태
    const postCitation = async (e) => {
        e.preventDefault();

        if(state.email.trim() === '') {
            setModalText('이메일을 작성해 주세요.');
            setModalShow(true);
            return;
        };

        if(!regularExpression.emailRegex.test(state.email.trim())) {
            setModalText('이메일 유형이 올바르지 않습니다.');
            setModalShow(true);
            authInputReset('email');
            return;
        };

        try {
            const res = await postEmail({email: state.email});

            if(res.status < 200 || res.status >= 300) {
                console.log('전송오류');
            }

            setModalText(res.data.message);
            setModalShow(true);
        } catch(err) {
            setModalText(err.response.data.message);
            setModalShow(true);
            console.log('에러 내용 : ', err);
            console.error('인증번호 발송 서버 오류', err);
        }
    };

    //이메일 인증 번호 확인
    const postCitationCheck = async (e) => {
        e.preventDefault();

        if(state.emailCheck.trim() === '') {
            setModalText('인증번호를 입력해주세요.');
            setModalShow(true);
            return;
        }

        if(!regularExpression.emailCheckRegex.test(state.emailCheck.trim())) {
            setModalText('인증번호는 숫자 6자리만 들어가야합니다.');
            setModalShow(true);
            authInputReset('emailCheck');
            return;
        }

        try{
            const res = await citationCheck({
                email: state.email,
                verificationCode: state.emailCheck
            });

            if(res.status < 200 || res.status >= 300) {
                console.log('전송오류');
            }

            setModalText(res.data.message);
            setModalShow(true);
            setemailCitationCheckPostcheck(true);
        } catch(err) {
            console.log('에러 내용 : ', err);
            setModalText(err.response.data.message);
            setModalShow(true);
            console.error('인증완료 서버 오류', err);
        }
    };  
    
    //가입신청 서브밋
    const signUpSubmit = async (e) => {
        e.preventDefault();

        if(!emailCitationCheckPostcheck) {
            setModalText('이메일 인증을 진행해주세요.');
            setModalShow(true);
            return;
        }

        try{
            const res = await fetchSignUp({
                userName: state.name,
                phone: state.phone,
                email: state.email,
                password: state.password
            });

            if(res.status < 200 || res.status >= 300) {
                console.log('회원가입 POST 실패');
                return;
            }

            console.log(res.data);
            setModalText('회원가입 완료');
            setModalShow(true);
            navigate('/login');
        }catch(err) {
            console.log('에러 내용 : ', err);
            setModalText(err.response.data.message);
            setModalShow(true);
            console.error('회원가입 서버 오류', err);
        };
    };

    //가입 완료 버튼 활성화/비활성화
    useEffect(() => {
        const isButtonDisabled = () => {
            const hasInputs = Object.values(state).some((state) => state === '');
            if(hasInputs) {
                setHasInput(true);
            } else {
                setHasInput(false);
            }
        };  

        isButtonDisabled();
    }, [state]);

    return (
        <main className='bg-[#f8f8f8] relative min-h-screen'>
            <form 
                className={formStyle}
                onSubmit={signUpSubmit}
            >  
                <p className={title2}>회원가입</p>
                <InputFieldCitation 
                    label='이메일'
                    type='email'
                    htmlFor='email'
                    onChange={(e) => authInputChanged(e, 'email')}
                    value={state.email}
                    inputReset={() => authInputReset('email')}
                    text='인증번호'
                    onClick={postCitation}
                />
                <InputFieldCitation 
                    label='인증번호'
                    type='text'
                    htmlFor='emailCheck'
                    onChange={(e) => authInputChanged(e, 'emailCheck')}
                    value={state.emailCheck}
                    inputReset={() => authInputReset('emailCheck')}
                    text='확인'
                    onClick={postCitationCheck}
                />
                <InputField 
                    label='비밀번호'
                    type='password'
                    htmlFor='password'
                    onChange={(e) => authInputChanged(e, 'password')}
                    value={state.password}
                    inputReset={() => authInputReset('password')}
                    regexCheck={() => regexCheck('password')}
                    errText={regexErrMsg.pwdErrMsg}
                />
                <InputField 
                    label='비밀번호 확인'
                    type='password'
                    htmlFor='passwordCheck'
                    onChange={(e) => authInputChanged(e, 'passwordCheck')}
                    value={state.passwordCheck}
                    inputReset={() => authInputReset('passwordCheck')}
                    regexCheck={() => regexCheck('passwordCheck')}
                    errText={regexErrMsg.pwdCheckErrMsg}
                />
                <InputField 
                    label='이름'
                    type='text'
                    htmlFor='name'
                    onChange={(e) => authInputChanged(e, 'name')}
                    value={state.name}
                    inputReset={() => authInputReset('name')}
                    regexCheck={() => regexCheck('name')}
                    errText={regexErrMsg.nameErrMsg}
                />
                <InputField 
                    label='연락처'
                    type='tel'
                    htmlFor='phone'
                    onChange={(e) => authInputChanged(e, 'phone')}
                    value={state.phone}
                    inputReset={() => authInputReset('phone')}
                    regexCheck={() => regexCheck('phone')}
                    errText={regexErrMsg.phoneErrMsg}
                />

                <button 
                    className={
                        hasInput ? buttonDisabled : commonButton
                    }
                >
                    가입 완료
                </button>
                
                <p className='text-[1rem] text-[#9CA3AF] text-center mt-[52px]'>
                    이미 계정이 있으신가요? <Link to={'/login'} className='text-[#62CCD0] font-[600]'>로그인</Link>
                </p>
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

export default SignUp;