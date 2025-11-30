'use client';

import styled from 'styled-components';
import Image from 'next/image';
import RoomCard from '@/components/Home/Rooms/RoomCard';
import RoomInfo from '@/components/Home/Rooms/RoomInfo';
import { useBookmarkStore } from '../../stores/useBookmarkStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookmarkPage() {
  const router = useRouter();
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Wrapper>
        <Header>
          <BackBtn onClick={() => router.back()}>
            <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
          </BackBtn>
          <Title>북마크</Title>
        </Header>
        <LoadingText>로딩 중...</LoadingText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => router.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>북마크</Title>
      </Header>

      <ScrollArea>
        {bookmarks.length > 0 ? (
          <BookmarkGrid>
            {bookmarks.map((room) => (
              <RoomInfo
                key={room.id}
                id={room.id}
                type={room.type}
                title={room.title}
                address={room.address}
                rate={room.rate}
                thumbnailUrl={room.imageUrl || undefined}
                onClick={() => router.push(`/houses/${room.id}`)}
                variant='card'
              />
            ))}
          </BookmarkGrid>
        ) : (
          <EmptyText>북마크가 없습니다.</EmptyText>
        )}
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
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

const BookmarkGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #666;
  font-size: 14px;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 14px;
`;
