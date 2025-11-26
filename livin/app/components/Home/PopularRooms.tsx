'use client';

import styled from 'styled-components';
import RoomInfo from './Rooms/RoomInfo';
import { useRouter } from 'next/navigation';
import { BuildingType } from '@/types/building';

interface RoomData {
  id: number;
  type: BuildingType; // 'PRIVATE' | 'BOARDING'
  title: string;
  address: string;
  rate: number;
  thumbnailUrl?: string;
}

const POPULAR_ROOMS: RoomData[] = [
  {
    id: 1,
    type: 'PRIVATE', // 자취방
    title: '신촌 럭키아파트',
    address: '서울 서대문구 이화여대길 50-12',
    rate: 4.8,
  },
  {
    id: 2,
    type: 'BOARDING', // 하숙집
    title: '연희 하숙',
    address: '서울 마포구 독막로 123',
    rate: 4.7,
  },
  {
    id: 3,
    type: 'PRIVATE',
    title: '이대 프라임빌',
    address: '서울 서대문구 대현동 11-3',
    rate: 4.6,
  },
  {
    id: 4,
    type: 'PRIVATE',
    title: '신촌 스카이뷰',
    address: '서울 서대문구 신촌로 45',
    rate: 4.5,
  },
  {
    id: 5,
    type: 'BOARDING',
    title: '이화 하숙',
    address: '서울 서대문구 이화여대길 77',
    rate: 4.4,
  },
];

export default function PopularRooms() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/houses/${id}`);
  };

  return (
    <Wrapper>
      <Title>인기있는 자취방</Title>

      <ScrollArea>
        {POPULAR_ROOMS.slice(0, 5).map((room) => (
          <RoomInfo
            key={room.id}
            id={room.id}
            type={room.type}
            title={room.title}
            address={room.address}
            rate={room.rate}
            thumbnailUrl={room.thumbnailUrl}
            onClick={() => handleClick(room.id)}
            variant='card'
          />
        ))}
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 20px;
  margin-bottom: 44px;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 20px;
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
