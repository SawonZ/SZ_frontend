import axios from 'axios';
//이메일 인증번호 발송
export const postEmail =  async ({ email }) => {
    const res = await axios.post('http://13.124.32.14:8080/email/send-code',
        {
            email
        },
    );

    return res;
};

//인증번호 확인
export const citationCheck = async ({ email, emailCheck }) => {
    const res = await axios.post('http://13.124.32.14:8080/email/check-code', 
        {
            email,
            emailCheck
        },
    );

    return res;
};

//회원가입
export const fetchSignUp = async ({name, phone, email, password}) => {
    const res = await axios.post('...API주소...',
        {
            name,
            phone,
            email,
            password
        },
    );

    return res;
};

//로그인
export const fetchLogin = async ({email, password}) => {
    const res = await axios.post('...API주소...',
        {
            email,
            password
        },
        {withCredentials: true}
    );

    return res;
};
