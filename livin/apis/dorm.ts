import axiosInstance from './axiosInstance';

// 기숙사 리뷰 등록
export const createDormReviewApi = async (data: {
  buildName: string;
  buildNum: string;
  roomPeople: number;
  facilityRate: 'DIRTY' | 'NORMAL' | 'CLEAN';
  accessRate: 'BAD' | 'NORMAL' | 'GOOD';
  soundRate: 'NONE' | 'SOMETIMES' | 'OFTEN';
  bugRate: 'NONE' | 'SOMETIMES' | 'OFTEN';
  finalRate: number;
  review: string;
  anonym: boolean;
  imageUrls?: string[];
}) => {
  const res = await axiosInstance.post('/dorm/review', data);
  return res.data;
};

// 기숙사 리뷰 목록 조회
export const getDormReviewsApi = async (params?: {
  buildName?: string;
  buildNum?: string;
  minFinalRate?: number;
}) => {
  // params가 없으면 빈 객체로 전달 (전체 목록 조회)
  const res = await axiosInstance.get('/dorm/review', { 
    params: params || undefined 
  });
  return res.data;
};

// 기숙사 리뷰 상세 조회
export const getDormReviewDetailApi = async (review_id: string | number) => {
  const res = await axiosInstance.get(`/dorm/review/${review_id}`);
  return res.data;
};

// 기숙사 리뷰 삭제
export const deleteDormReviewApi = async (review_id: string | number) => {
  const res = await axiosInstance.delete(`/dorm/review/${review_id}`);
  return res.status;
};

// 리뷰 이미지 업로드
export const uploadReviewImageApi = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const res = await axiosInstance.post('/review/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data; // imageUrl 반환
};


