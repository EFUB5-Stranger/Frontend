'use client';

import styled from 'styled-components';
import RoomCard from './Rooms/RoomCard';
import { useRouter } from 'next/navigation';

export default function PopularRooms() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/houses/${id}`);
  };

  return (
    <Wrapper>
      <Title>인기있는 자취방</Title>

      <ScrollArea>
        <RoomCard
          id='room1'
          type='자취방'
          title='신촌 럭키아파트'
          address='서울 서대문구 이화여대길 50-12'
          rate={4.3}
          onClick={() => handleClick('room1')}
        />

        <RoomCard
          id='room2'
          type='자취방'
          title='홍대 하우스'
          address='서울 마포구 독막로 123'
          rate={4.6}
          onClick={() => handleClick('room2')}
        />

        <RoomCard
          id='room3'
          type='자취방'
          title='이대 프라임빌'
          address='서울 서대문구 대현동 11-3'
          rate={4.8}
          onClick={() => handleClick('room3')}
        />

        <RoomCard
          id='room4'
          type='자취방'
          title='신촌 스카이뷰'
          address='서울 서대문구 신촌로 45'
          rate={4.5}
          onClick={() => handleClick('room4')}
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
