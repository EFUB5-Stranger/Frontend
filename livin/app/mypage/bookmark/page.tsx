'use client';

import styled from 'styled-components';
import Image from 'next/image';
import RoomCard from '@/app/components/Home/Rooms/RoomCard';
import { useState } from 'react';

export default function BookmarkPage() {
  const [bookmarked1, setBookmarked1] = useState(false);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.back()}>
          <Image src='/back-arrow.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>북마크</Title>
      </Header>

      <ScrollArea>
        <BookmarkGrid>
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
          <RoomCard
            type='자취방'
            title='신촌 럭키아파트'
            address='서울 서대문구 이화여대길 50-12'
            rate={4.3}
            bookmarked={true}
            onToggleBookmark={() => setBookmarked1(!bookmarked1)}
          />
        </BookmarkGrid>
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 20px 0;
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

const BookmarkGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
