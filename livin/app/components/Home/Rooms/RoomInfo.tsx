'use client';

import styled from 'styled-components';
import Image from 'next/image'; // Next.js Image 최적화 사용
import { BuildingType } from '@/types/building';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import RoomTag from './TagComponents';
import { getHouseReviewsApi } from '@apis/house';
import { useEffect, useState } from 'react';

interface RoomInfoProps {
  id: number;
  reviewId?: number;
  type: BuildingType;
  title: string;
  address: string;
  rate?: number;
  thumbnailUrl?: string;
  variant?: 'popup' | 'card';
  onClick?: () => void; // 카드 클릭 이벤트 추가 (상세페이지 이동 등)
}

export default function RoomInfo({
  id,
  type,
  title,
  address,
  rate: initialRate = 0,
  thumbnailUrl,
  variant = 'card',
  onClick,
}: RoomInfoProps) {
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark);
  const isBookmarked = useBookmarkStore((s) => s.isBookmarked(id));
  const validThumbnail =
    thumbnailUrl && thumbnailUrl.startsWith('https://images.unsplash.com')
      ? thumbnailUrl
      : '/default_img.jpg';

  // 평점 상태 관리 (초기값은 부모가 준 값 혹은 0)
  const [currentRate, setCurrentRate] = useState<number>(initialRate);

  // 컴포넌트가 마운트되거나 ID가 바뀌면 리뷰 데이터를 새로 가져옴
  useEffect(() => {
    const fetchRating = async () => {
      try {
        // 리뷰 목록 조회 API 호출
        const res = await getHouseReviewsApi(id);

        // API 응답 구조가 { content: [...] } 라고 가정 (이전 이미지 기반)
        const reviews = res.content || [];

        if (reviews.length > 0) {
          // 평균 계산
          const sum = reviews.reduce(
            (acc: number, review: any) => acc + review.finalRate,
            0
          );
          const avg = sum / reviews.length;
          setCurrentRate(avg);
        } else {
          // 리뷰 없으면 0점
          setCurrentRate(0);
        }
      } catch (error) {
        console.error(`리뷰 평점 조회 실패 (ID: ${id})`, error);
        // 에러 시 기존 값 유지 혹은 0 처리
      }
    };

    fetchRating();
  }, [id]);

  const formattedRate = Number(currentRate).toFixed(1);

  // 팝업용 레이아웃 (기존 유지)
  if (variant === 'popup') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <Image
          src={validThumbnail}
          alt={title}
          width={100}
          height={100}
          style={{ borderRadius: '8px', objectFit: 'cover' }}
        />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '190px',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '24px',
                fontFamily: 'Pretendard',
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark({
                  id,
                  type,
                  title,
                  address,
                  rate: currentRate,
                });
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <Image
                src={
                  isBookmarked
                    ? '/bookmark_filled.svg'
                    : '/bookmark_unfilled.svg'
                }
                alt={isBookmarked ? '북마크 해제' : '북마크'}
                width={17.5} // 1.7rem ≒ 27px
                height={22.5} // 1.7rem ≒ 27px
              />
            </button>
          </div>
          <Rate>
            <StarIcon src='/star.svg' alt='star' width={13} height={13} />
            <span>{formattedRate}</span>
          </Rate>
          <p
            style={{
              marginTop: '10px',
              fontSize: '15px',
              fontFamily: 'Pretendard',
              color: '#999999',
            }}
          >
            {address}
          </p>
        </div>
      </div>
    );
  }

  // 카드용 레이아웃
  return (
    <Wrapper onClick={onClick}>
      {/* 썸네일 영역 (배경 이미지로 처리) */}
      <Thumb $bgUrl={thumbnailUrl}>
        <TagWrapper>
          <RoomTag type={type} />
        </TagWrapper>
      </Thumb>

      {/* 텍스트 정보 영역 */}
      <Text>
        <TitleBox>
          <RoomTitle>{title}</RoomTitle>
          <BookmarkIcon
            src={
              isBookmarked ? '/bookmark_filled.svg' : '/bookmark_unfilled.svg'
            }
            width={13}
            height={17}
            alt='bookmark'
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark({
                id,
                type,
                title,
                address,
                rate: currentRate,
              });
            }}
          />
        </TitleBox>
        <RoomAddr>{address}</RoomAddr>
        <Rate>
          <StarIcon src='/star.svg' alt='star' width={13} height={13} />
          <span>{formattedRate}</span>
        </Rate>
      </Text>
    </Wrapper>
  );
}

/* ---------------- Styled Components ---------------- */

const Wrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 7px;
  cursor: pointer; /* 클릭 가능함을 표시 */
`;

// 배경 이미지를 props로 받기 위해 타입 정의 및 $bgUrl 사용
const Thumb = styled.div<{ $bgUrl?: string }>`
  display: flex;
  width: 150px;
  height: 150px;
  padding: 6px 11px;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  aspect-ratio: 1/1;
  border-radius: 15px;
  position: relative;
  /* 이미지가 없으면 기본 색상 혹은 기본 이미지 표시 */
  background: ${({ $bgUrl }) =>
    $bgUrl && !$bgUrl.includes('bookmark_unfilled.svg')
      ? `url(${$bgUrl})`
      : `url('/default_img.jpg')`};
  background-color: lightgray;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const TagWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 11px;
  z-index: 10;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BookmarkIcon = styled(Image)`
  cursor: pointer;
`;

const RoomTitle = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
`;

const RoomAddr = styled.div`
  color: #868686;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Rate = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 12px;
  gap: 2px;
`;

const StarIcon = styled(Image)`
  width: 13px;
  height: 13px;
`;
