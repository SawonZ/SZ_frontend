import axios from "axios";
//이메일 인증번호 발송
export const postEmail = async ({ email }) => {
  const res = await axios.post("https://api.sawonz.world/email/send-code", {
    email,
  });

  return res;
};

//인증번호 확인
export const citationCheck = async ({ email, verificationCode }) => {
  const res = await axios.post("https://api.sawonz.world/email/check-code", {
    email,
    verificationCode,
  });

  return res;
};

//회원가입
export const fetchSignUp = async ({ userName, phone, email, password }) => {
  const res = await axios.post("https://api.sawonz.world/users/signup", {
    userName,
    phone,
    email,
    password,
  });

  return res;
};

//신규직원 승인
export const fetchApproval = async ({ email, status }) => {
  const res = await axios.patch("https://api.sawonz.world/admin/user/status", 
  {
    email,
    status
  }, 
  {withCredentials: true}
);

  return res;
};

//로그인
export const fetchLogin = async ({ email, password }) => {
  const res = await axios.post("https://api.sawonz.world/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return res;
};

//로그아웃
export const fetchLogout = async () => {
  const res = await axios.post(
    "https://api.sawonz.world/auth/logout",
    {},
    {withCredentials: true}
  );

  return res;
}

//리프레쉬 토큰
export const refreshToken = async () => {
  const res = await axios.post('https://api.sawonz.world/auth/refresh',
    {},
    {withCredentials: true}
  );

  return res;
};