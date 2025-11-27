'use client';

import styled from 'styled-components';
import RoomInfo from './Rooms/RoomInfo';
import { useRouter } from 'next/navigation';
import { BuildingType } from '@/types/building';
import { useEffect, useState } from 'react';
import { getTopHousesApi, TopHouse } from '@apis/bookmark';
import { getHouseReviewsApi } from '@apis/house';

interface HouseWithRate extends TopHouse {
  calculatedRate: number;
}

interface ReviewItem {
  finalRate: number;
}

interface ReviewResponse {
  content: ReviewItem[];
}

export default function PopularRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<HouseWithRate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 인기 매물 5개 가져오기
        const topHouseData = await getTopHousesApi();

        if (topHouseData && topHouseData.houses) {
          const houses = topHouseData.houses;

          // 2. 각 매물에 대해 리뷰 API를 호출하여 평균 별점 계산
          const housesWithRates = await Promise.all(
            houses.map(async (house) => {
              try {
                // 각 하우스 ID로 리뷰 목록 조회
                const reviewRes: ReviewResponse = await getHouseReviewsApi(
                  house.houseId
                );
                const reviews = reviewRes.content || [];

                // 리뷰가 없으면 0점
                if (reviews.length === 0) {
                  return { ...house, calculatedRate: 0 };
                }

                // 평균 계산: (총합 / 개수)
                const sum = reviews.reduce(
                  (acc, review) => acc + review.finalRate,
                  0
                );
                const avg = sum / reviews.length;

                return { ...house, calculatedRate: avg };
              } catch (err) {
                console.error(
                  `Failed to fetch review for house ${house.houseId}`,
                  err
                );
                // 에러 발생 시 0점으로 처리
                return { ...house, calculatedRate: 0 };
              }
            })
          );

          // 3. 계산된 평점을 포함한 데이터로 상태 업데이트
          setRooms(housesWithRates);
        }
      } catch (error) {
        console.error('Failed to fetch top rooms:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/houses/${id}`);
  };

  if (!rooms.length) return null;

  return (
    <Wrapper>
      <Title>인기있는 자취방</Title>

      <ScrollArea>
        {rooms.map((room) => (
          <RoomInfo
            key={room.houseId}
            id={room.houseId}
            type={room.type as BuildingType}
            title={room.buildingName}
            address={room.address}
            rate={room.calculatedRate}
            thumbnailUrl={room.imageUrl}
            onClick={() => handleClick(room.houseId)}
            variant='card'
          />
        ))}
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 20px;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
