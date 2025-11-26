import styled from 'styled-components';

// 서버 타입과 매핑하기 쉽게 영어 키워드 사용
export type TagType = 'privateHouse' | 'boardingHouse';

export default function RoomTag({ type }: { type: TagType }) {
  // UI에 표시할 한글 라벨
  const label = type === 'privateHouse' ? '자취방' : '하숙집';
  return <Tag $type={type}>{label}</Tag>;
}

const Tag = styled.div<{ $type: TagType }>`
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
    $type === 'privateHouse' ? '#fff' : theme.colors.primary};

  background: ${({ $type, theme }) =>
    $type === 'privateHouse' ? theme.colors.primary : '#fff'};
`;
