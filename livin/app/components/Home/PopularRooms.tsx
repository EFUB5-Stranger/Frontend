'use client';

import styled from 'styled-components';
import { useState } from 'react';
import RoomCard from '../Home/Rooms/RoomCard';

export default function PopularRooms() {
  const [bookmarked1, setBookmarked1] = useState(false);
  const [bookmarked2, setBookmarked2] = useState(false);

  return (
    <Wrapper>
      <Title>인기있는 자취방</Title>

      <ScrollArea>
        <RoomCard
          type='자취방'
          title='신촌 럭키아파트'
          address='서울 서대문구 이화여대길 50-12'
          rate={4.3}
          bookmarked={bookmarked1}
          onToggleBookmark={() => setBookmarked1(!bookmarked1)}
        />

        <RoomCard
          type='하숙집'
          title='이화 하숙집'
          address='서울 서대문구 이화여대길 50-12'
          rate={4.3}
          bookmarked={bookmarked2}
          onToggleBookmark={() => setBookmarked2(!bookmarked2)}
        />

        <RoomCard
          type='자취방'
          title='신촌 럭키아파트'
          address='서울 서대문구 이화여대길 50-12'
          rate={4.3}
          bookmarked={bookmarked1}
          onToggleBookmark={() => setBookmarked1(!bookmarked1)}
        />

        <RoomCard
          type='하숙집'
          title='이화 하숙집'
          address='서울 서대문구 이화여대길 50-12'
          rate={4.3}
          bookmarked={bookmarked2}
          onToggleBookmark={() => setBookmarked2(!bookmarked2)}
        />
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 26px;
  padding: 0 20px;
  margin-bottom: 44px;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 32px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
