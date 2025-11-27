import axiosInstance from './axiosInstance';

// 타입 정의 (응답 데이터 구조)
export interface TopHouse {
  houseId: number;
  buildingName: string;
  address: string;
  parking: boolean | null;
  elevator: boolean | null;
  floor: number | null;
  type: string;
  options: string | null;
  lon: string;
  lat: string;
  imageUrl: string;
  place_url: string | null;
  phone: string | null;
  bookmarked: boolean;
}

interface TopHouseResponse {
  houses: TopHouse[];
}

// 자취/하숙 인기순 Top 5 조회
export const getTopHousesApi = async () => {
  const res = await axiosInstance.get<TopHouseResponse>('/house/top');
  return res.data;
};
