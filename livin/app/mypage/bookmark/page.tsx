'use client';

import styled from 'styled-components';
import Image from 'next/image';
import RoomCard from '@/components/Home/Rooms/RoomCard';
import { useBookmarkStore } from '../../stores/useBookmarkStore';

export default function BookmarkPage() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>북마크</Title>
      </Header>

      <ScrollArea>
        <BookmarkGrid>
          {bookmarks.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
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
