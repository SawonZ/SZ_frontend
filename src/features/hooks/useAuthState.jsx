import React, {useReducer, useState } from 'react';
import { regularExpression } from '../../utils/validation';

const initialValue = {
    name: '',
    phone: '',
    email: '',
    emailCheck: '',
    password: '',
    passwordCheck: ''
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_FIELD':
            return {...state, [action.field]: action.payload};
        case 'SET_RESET':
            return {...state, [action.field]: initialValue[action.field]};
        default:
            return state;
    };
};

const useAuthState = () => {
    const [state, dispatch] = useReducer(reducer, initialValue); //회원가입 리듀서
    const [loginState, setLoginState] = useState({ //로그인 상태관리
        email: '',
        pwd: ''
    });
    const [regexErrMsg, setRegexErrMsg] = useState({ //에러 메세지
        pwdErrMsg: '',
        pwdCheckErrMsg: '',
        nameErrMsg: '',
        phoneErrMsg: '',
        emailErrMsg: '',
    });

    //회원가입 인풋 상태관리
    const authInputChanged = (e, field) => {
        dispatch({ type: 'SET_FIELD', field, payload: e.target.value });
    };
    
    const authInputReset = (field) => {
        dispatch({ type: 'SET_RESET', field });
    };

    //유효성 검사
    const regexCheck = (field) => {
        if(field === 'name') {
            if(!regularExpression.nameRegex.test(state.name.trim())) {
                authInputReset('name');
                setRegexErrMsg(prev => ({...prev, nameErrMsg: '올바르지 않은 이름입니다.'}));
                return;
            } else return setRegexErrMsg(prev => ({...prev, nameErrMsg: ''}));
        };

        if(field === 'phone') {
            if(!regularExpression.phoneRegex.test(state.phone.trim())) {
                authInputReset('phone');
                setRegexErrMsg(prev => ({...prev, phoneErrMsg: '올바르지 않은 연락처입니다.'}));
                return;
            } else return setRegexErrMsg(prev => ({...prev, phoneErrMsg: ''}));
        }

        if(field === 'password') {
            if(!regularExpression.pwdRegex.test(state.password.trim())) {
                authInputReset('password');
                setRegexErrMsg(prev => ({...prev, pwdErrMsg: '올바르지 않은 비밀번호입니다.'}));
                return;
            } else return setRegexErrMsg(prev => ({...prev, pwdErrMsg: ''}));   
        }

        if(field === 'passwordCheck') {
            if(state.password !== state.passwordCheck) {
                authInputReset('passwordCheck');
                setRegexErrMsg(prev => ({...prev, pwdCheckErrMsg: '비밀번호가 일치하지 않습니다.'}));
                return;
            } else return setRegexErrMsg(prev => ({...prev, pwdCheckErrMsg: ''}));
        }

        if(field === 'email') {
            if(!regularExpression.emailRegex.test(state.email.trim())) {
                authInputReset('email');
                setRegexErrMsg(prev => ({...prev, emailErrMsg: '올바르지 않은 이메일 형식입니다.'}));
                return;
            } else return setRegexErrMsg(prev => ({...prev, emailErrMsg: ''}));   
        }

        return false;
    };

    return {
        state, 
        authInputChanged, 
        authInputReset, 
        regexCheck, 
        regexErrMsg,
        loginState,
        setLoginState
    };
};

export default useAuthState;