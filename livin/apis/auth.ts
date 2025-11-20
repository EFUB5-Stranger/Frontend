import axiosInstance from './axiosInstance';

// 이메일 전송 (1차 회원 생성)
export const signupRequestApi = async (
  nickname: string,
  school: string,
  email: string
) => {
  const res = await axiosInstance.post('/users/signup', {
    nickname,
    school,
    email,
  });
  return res.data;
};

// 이메일 인증 코드 검증
export const verifyEmailApi = async (
  email: string,
  verificationCode: string
) => {
  const res = await axiosInstance.post('/users/verify-email', {
    email,
    verificationCode,
  });
  return res.data;
};

// 최종 회원가입 (비밀번호 설정)
export const signupFinalApi = async (email: string, password: string) => {
  const res = await axiosInstance.post('/users/signup/password', {
    email,
    password,
  });
  return res.data;
};

// 로그인
export const loginApi = async (email: string, password: string) => {
  const res = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  return res.data;
};
