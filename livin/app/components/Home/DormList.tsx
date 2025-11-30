'use client';

import styled from 'styled-components';
import Image from 'next/image';
import DormReviewCard from '../Dorm/DormReviewCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDormReviewsApi } from '@apis/dorm';
import type { DormList } from '@apis/dorm';

export default function DormList() {
  const router = useRouter();
  const [randomReview, setRandomReview] = useState<DormList | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSelectRandomReview = async () => {
      try {
        setIsLoading(true);
        // 1. 전체 리뷰 목록 조회
        const data = await getDormReviewsApi();

        // 2. 데이터가 있고 배열인 경우 랜덤 선택
        if (Array.isArray(data) && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomReview(data[randomIndex]);
        }
      } catch (error) {
        console.error('기숙사 리뷰 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSelectRandomReview();
  }, []);

  const getFormattedDate = (dateString?: string) => {
    if (!dateString) return '2025.11.27';
    return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '.');
  };

  return (
    <Wrapper>
      <Title>우리학교 기숙사</Title>

      {!isLoading && randomReview ? (
        <DormReviewCard
          key={randomReview.id}
          date={getFormattedDate(
            (randomReview as DormList & { createdAt?: string }).createdAt
          )}
          name={randomReview.nickname || '익명'}
          score={randomReview.finalrate || 0}
          stars={randomReview.finalrate || 0}
          tags={[
            randomReview.buildName,
            randomReview.buildNum,
            randomReview.roomPeople ? `${randomReview.roomPeople}인실` : null,
          ].filter((tag): tag is string => Boolean(tag))}
          evaluations={{
            방음: randomReview.soundRate || '-',
            시설: randomReview.facilityRate || '-',
            접근성: randomReview.accessRate || '-',
            벌레: randomReview.bugRate || '-',
          }}
          thumbnailUrl={
            Array.isArray(randomReview.imageUrl) &&
            randomReview.imageUrl.length > 0
              ? (randomReview.imageUrl as string[])[0] // 수정된 부분
              : undefined
          }
          onClick={() => router.push(`/dorm/${randomReview.id}`)}
        />
      ) : (
        <EmptyBox>
          <EmptyText>등록된 리뷰가 없습니다.</EmptyText>
        </EmptyBox>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 20px 10px;
`;

const Title = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.9px;
  margin-bottom: 15px;
`;

const EmptyBox = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
`;
