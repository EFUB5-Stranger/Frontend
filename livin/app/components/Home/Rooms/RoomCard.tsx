import styled from 'styled-components';
import RoomInfo from './RoomInfo';
import { BuildingType } from '@/types/building';

interface Props {
  id: number;
  type: BuildingType;
  title: string;
  address: string;
  rate?: number;
  thumbnailUrl?: string;
  onClick?: () => void;
}

export default function RoomCard(props: Props) {
  return (
    <Wrapper onClick={props.onClick}>
      <RoomInfo
        id={props.id}
        type={props.type}
        title={props.title}
        address={props.address}
        rate={props.rate}
        thumbnailUrl={props.thumbnailUrl}
        variant='card' // ✅ 카드 레이아웃 지정
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 7px;
`;
