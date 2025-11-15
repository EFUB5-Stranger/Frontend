'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import RoomTag from './Rooms/TagComponents';

export default function PopularRooms() {
  const [bookmarked1, setBookmarked1] = useState(false);
  const [bookmarked2, setBookmarked2] = useState(false);

  return (
    <Wrapper>
      <Title>인기있는 자취방</Title>

      <ScrollArea>
        <RoomCard>
          <Thumb>
            <TagWrapper>
              <RoomTag type='자취방' />
            </TagWrapper>
          </Thumb>
          <Text>
            <TitleBox>
              <RoomTitle>신촌 럭키아파트</RoomTitle>
              <BookmarkIcon
                src={
                  bookmarked1
                    ? '/bookmark_filled.svg'
                    : '/bookmark_unfilled.svg'
                }
                alt='bookmark'
                width={13}
                height={17}
                onClick={() => setBookmarked1(!bookmarked1)}
              />
            </TitleBox>
            <RoomAddr>서울 서대문구 이화여대길 50-12</RoomAddr>
            <Rate>
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <span>4.3</span>
            </Rate>
          </Text>
        </RoomCard>

        <RoomCard>
          <Thumb>
            <TagWrapper>
              <RoomTag type='하숙집' />
            </TagWrapper>
          </Thumb>
          <Text>
            <TitleBox>
              <RoomTitle>이화 하숙집</RoomTitle>
              <BookmarkIcon
                src={
                  bookmarked2
                    ? '/bookmark_filled.svg'
                    : '/bookmark_unfilled.svg'
                }
                alt='bookmark'
                width={13}
                height={17}
                onClick={() => setBookmarked2(!bookmarked2)}
              />
            </TitleBox>
            <RoomAddr>서울 서대문구 이화여대길 50-12</RoomAddr>
            <Rate>
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <span>4.3</span>
            </Rate>
          </Text>
        </RoomCard>
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 26px;
  padding: 0 20px;
  gap: 15px;
  margin-bottom: 44px;
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
  margin-top: 32px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomCard = styled.div`
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
  z-index: 1;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const TagWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 11px;
  z-index: 10;
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
  flex: 1 0 0;
  align-self: stretch;
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RoomAddr = styled.div`
  align-self: stretch;
  color: #868686;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Rate = styled.div`
  margin-top: 4px;
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
`;

const StarIcon = styled(Image)`
  width: 13px;
  height: 13px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
