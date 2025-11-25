import axiosInstance from './axiosInstance';

// 프로필 조회 (GET /users/me)
export const getUserProfileApi = async () => {
  const res = await axiosInstance.get('/users/me');
  return res.data;
};

// 닉네임 수정 (PATCH /users/me)
export const updateUserProfileApi = async (nickname: string) => {
  const res = await axiosInstance.patch('/users/me', {
    nickname,
  });
  return res.data;
};
