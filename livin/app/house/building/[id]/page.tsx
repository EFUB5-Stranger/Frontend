'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import DormReviewCard from '@/app/components/Dorm/DormReviewCard';
import FloatingWriteButton from '@/app/components/Common/FloatingWriteButton';

export default function BuildingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [buildingInfo, setBuildingInfo] = useState('');

  // 임시 건물 데이터
  const building = {
    id: params.id,
    name: '하늘이화대박빌라',
    address: '서울특별시 서대문구 이화여대길 55',
    info: '지상 4층, 주차 가능, 엘리베이터 없음. 정문에서 도보 5분 거리',
    image: '',
    averageRating: 4.0,
    reviewCount: 12,
  };

  // 임시 리뷰 데이터
  const reviews = [
    {
      id: 1,
      date: '2025.09.27',
      name: '구구',
      score: 4.0,
      stars: 4,
      tags: ['방음:보통', '건물 상태:좋음'],
      evaluations: {
        방음: '보통',
        시설: '보통',
        접근성: '좋음',
        벌레: '많음',
      },
    },
    {
      id: 2,
      date: '2025.09.27',
      name: '김이화',
      score: 4.0,
      stars: 4,
      tags: ['방음:나쁨', '건물 상태:좋음'],
      evaluations: {
        방음: '나쁨',
        시설: '보통',
        접근성: '좋음',
        벌레: '많음',
      },
    },
  ];

  return (
    <Wrapper>
      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>
            <Image src='/arrow_back.svg' alt='뒤로가기' width={15} height={15} />
          </BackButton>
          <Title>{building.name}</Title>
          <Spacer />
        </Header>

        <BuildingImageLarge />

        <BuildingInfoSection>
          <BuildingInfoText>
            {building.info}
          </BuildingInfoText>
        </BuildingInfoSection>

        <ReviewSection>
          <ReviewHeader>
            <ReviewTitle>리뷰 평점 {building.averageRating.toFixed(1)} · {building.reviewCount}개</ReviewTitle>
            <Stars>
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src={star <= Math.floor(building.averageRating) ? '/star.svg' : '/star_unfilled.svg'}
                  alt='star'
                  width={16}
                  height={16}
                />
              ))}
            </Stars>
            <ViewAllButton onClick={() => console.log('전체 보기')}>
              전체 보기
            </ViewAllButton>
          </ReviewHeader>

          <ReviewList>
            {reviews.map((review) => (
              <DormReviewCard
                key={review.id}
                date={review.date}
                name={review.name}
                score={review.score}
                stars={review.stars}
                tags={review.tags}
                evaluations={review.evaluations}
                onClick={() => router.push(`/house/${review.id}`)}
              />
            ))}
          </ReviewList>
        </ReviewSection>
      </Container>

      <FloatingWriteButton href='/house/write' />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 120px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0 20px;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Spacer = styled.div`
  width: 24px;
`;

const BuildingImageLarge = styled.div`
  width: 100%;
  height: 200px;
  background: #d9d9d9;
  border-radius: 16px;
  margin-bottom: 20px;
`;

const BuildingInfoSection = styled.div`
  width: 100%;
  margin-bottom: 24px;
  padding: 0 4px;
`;

const BuildingInfoText = styled.div`
  width: 100%;
  min-height: 60px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  font-family: inherit;
`;

const ReviewSection = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
  padding: 0 4px;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const ReviewTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const ViewAllButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
