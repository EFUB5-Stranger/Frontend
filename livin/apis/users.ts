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

// 프로필 이미지 업로드 (multipart/form-data)
export const updateUserProfileImageApi = async (formData: FormData) => {
  const res = await axiosInstance.patch('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
