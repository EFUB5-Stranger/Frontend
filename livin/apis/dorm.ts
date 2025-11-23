import axiosInstance from './axiosInstance';

// 기숙사 리뷰 등록
export const createDormReviewApi = async (
  buildName: string,
  buildNum: string,
  roomPeople: number,
  facilityRate: string,
  accessRate: string,
  soundRate: string,
  bugRate: string,
  finalRate: number,
  review: string,
  anonym: boolean
) => {
  const res = await axiosInstance.post('/dorm/review', {
    buildName,
    buildNum,
    roomPeople,
    facilityRate,
    accessRate,
    soundRate,
    bugRate,
    finalRate,
    review,
    anonym,
  });
  return res.data;
};

// 기숙사 리뷰 목록 조회
export const getDormReviewsApi = async (params?: {
  buildName?: string;
  buildNum?: string;
  minFinalRate?: number;
}) => {
  const res = await axiosInstance.get('/dorm/review', { params });
  return res.data;
};

// 기숙사 리뷰 상세 조회
export const getDormReviewDetailApi = async (reviewId: string | number) => {
  const res = await axiosInstance.get(`/dorm/review/${reviewId}`);
  return res.data;
};

// 기숙사 리뷰 삭제
export const deleteDormReviewApi = async (reviewId: string | number) => {
  const res = await axiosInstance.delete(`/dorm/review/${reviewId}`);
  return res.data;
};
