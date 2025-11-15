import styled from 'styled-components';

type TagType = '자취방' | '하숙집';

export default function RoomTag({ type }: { type: TagType }) {
  return <Tag $type={type}>{type}</Tag>;
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
    $type === '자취방' ? '#fff' : theme.colors.primary};

  background: ${({ $type, theme }) =>
    $type === '자취방' ? theme.colors.primary : '#fff'};
`;
