'use client';

import styled from 'styled-components';
import Image from 'next/image'; // Next.js Image 최적화 사용
import { BuildingType } from '@/types/building';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import RoomTag from './TagComponents';

interface RoomInfoProps {
  id: number;
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
  rate = 0,
  thumbnailUrl,
  variant = 'card',
  onClick,
}: RoomInfoProps) {
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark);
  const isBookmarked = useBookmarkStore((s) => s.isBookmarked(id));

  // 팝업용 레이아웃 (기존 유지)
  if (variant === 'popup') {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Image
          src={thumbnailUrl || '/default.png'}
          alt={title}
          width={120}
          height={80}
          style={{ borderRadius: '8px', objectFit: 'cover' }}
        />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1px',
            }}
          >
            <h3 style={{ margin: 0 }}>{title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark({
                  id,
                  type,
                  title,
                  address,
                  rate,
                });
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Image
                src={
                  isBookmarked
                    ? '/bookmark_filled.svg'
                    : '/bookmark_unfilled.svg'
                }
                alt={isBookmarked ? '북마크 해제' : '북마크'}
                width={27} // 1.7rem ≒ 27px
                height={27} // 1.7rem ≒ 27px
              />
            </button>
          </div>
          <p>{address}</p>
          <p>⭐ {rate}</p>
        </div>
      </div>
    );
  }

  // 카드용 레이아웃 (요청하신 스타일 적용)
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
                rate,
              });
            }}
          />
        </TitleBox>
        <RoomAddr>{address}</RoomAddr>
        <Rate>
          <StarIcon src='/star.svg' alt='star' width={13} height={13} />
          <span>{rate}</span>
        </Rate>
      </Text>
    </Wrapper>
  );
}

/* ---------------- Styled Components ---------------- */

const Wrapper = styled.div`
  min-width: 150px;
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
    $bgUrl ? `url(${$bgUrl})` : `url('/default.png')`};
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
  /* Next.js Image 컴포넌트는 width/height가 필수지만 styled에서 덮어쓸 수 있음 */
`;

const RoomTitle = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
  font-weight: 600;
`;

const RoomAddr = styled.div`
  color: #868686;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 11px;
  white-space: nowrap; /* 주소가 길어질 경우 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표(...) 처리 */
  max-width: 100%;
`;

const Rate = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 12px;
  gap: 2px; /* 별 아이콘과 점수 사이 간격 */
`;

const StarIcon = styled(Image)`
  width: 13px;
  height: 13px;
`;
