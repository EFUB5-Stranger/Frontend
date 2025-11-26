import styled from 'styled-components';
import { BuildingType } from '@/types/building';

export default function RoomTag({ type }: { type: BuildingType }) {
  // UI에 표시할 한글 라벨
  const label = type === 'PRIVATE' ? '자취방' : '하숙집';
  return <Tag $type={type}>{label}</Tag>;
}

const Tag = styled.div<{ $type: BuildingType }>`
  display: inline-flex;
  width: 42px;
  height: 18px;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  border-radius: 20px;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: ${({ $type, theme }) =>
    $type === 'PRIVATE' ? '#fff' : theme.colors.primary};

  background: ${({ $type, theme }) =>
    $type === 'PRIVATE' ? theme.colors.primary : '#fff'};
`;
