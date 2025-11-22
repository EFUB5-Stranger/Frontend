'use client';

import styled from 'styled-components';
import Image from 'next/image';
import RoomTag, { TagType } from './TagComponents';
import { useBookmarkStore } from '../../../stores/useBookmarkStore';

interface Props {
  id: string;
  type: TagType;
  title: string;
  address: string;
  rate: number;
  onClick?: () => void;
}

export default function RoomCard({
  id,
  type,
  title,
  address,
  rate,
  onClick,
}: Props) {
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) => state.isBookmarked(id));
  return (
    <Wrapper onClick={onClick}>
      <Thumb>
        <TagWrapper>
          <RoomTag type={type} />
        </TagWrapper>
      </Thumb>

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
              toggleBookmark({ id, type, title, address, rate });
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
`;

const Thumb = styled.div`
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
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
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
`;

const RoomAddr = styled.div`
  color: #868686;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 11px;
`;

const Rate = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 12px;
`;

const StarIcon = styled(Image)`
  width: 13px;
  height: 13px;
`;
