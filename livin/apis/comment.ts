import axiosInstance from './axiosInstance';

// 댓글 목록 조회
export const getCommentsApi = async (review_id: string | number) => {
  const res = await axiosInstance.get(`/review/${review_id}/comment`);
  return res.data;
};

// 댓글 작성
export const createCommentApi = async (
  review_id: string | number,
  data: {
    content: string;
    anonymous: boolean;
  }
) => {
  const res = await axiosInstance.post(`/review/${review_id}/comment`, data);
  return res.data;
};

// 댓글 삭제
export const deleteCommentApi = async (comment_id: string | number) => {
  const res = await axiosInstance.delete(`/comment/${comment_id}`);
  return res.status;
};

// 내 댓글 조회
export const getMyCommentsApi = async () => {
  const res = await axiosInstance.get('/comment/me');
  return res.data;
};
