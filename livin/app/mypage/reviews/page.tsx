'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DormReviewCard from '@/components/Dorm/DormReviewCard';
import { getMyDormReviewsApi } from '@apis/dorm';

export default function MyPageReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);

      // 명세서에 따라 파라미터 없이 호출 (토큰은 헤더에 포함됨)
      const data = await getMyDormReviewsApi();

      console.log('My Reviews Response:', data);

      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (error: any) {
      console.error('내 리뷰 조회 실패:', error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => router.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>내가 작성한 리뷰</Title>
      </Header>

      <ScrollArea>
        <ReviewList>
          {isLoading ? (
            <LoadingText>로딩 중...</LoadingText>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <DormReviewCard
                key={review.id}
                // 날짜 데이터가 없으면 오늘 날짜 혹은 임의의 값
                date={
                  review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : '2025.11.26'
                }
                // 내 리뷰이므로 이름은 '나' 또는 닉네임
                name={review.nickname || '나'}
                score={review.finalrate || 0}
                stars={review.finalrate || 0}
                tags={[
                  review.buildName,
                  review.buildNum,
                  review.roomPeople ? `${review.roomPeople}인실` : null,
                ].filter((tag): tag is string => Boolean(tag))}
                evaluations={{
                  방음: review.soundRate || '-',
                  시설: review.facilityRate || '-',
                  접근성: review.accessRate || '-',
                  벌레: review.bugRate || '-',
                }}
                onClick={() => router.push(`/dorm/${review.id}`)}
              />
            ))
          ) : (
            <EmptyText>작성한 리뷰가 없습니다.</EmptyText>
          )}
        </ReviewList>
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 10px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;

  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
`;
