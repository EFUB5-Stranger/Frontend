'use client';

import styled from 'styled-components';
import StarDisplay from './StarDisplay';
import EvaluationList from './EvaluationList';

interface DormCardProps {
  date: string;
  name: string;
  score: number;
  stars: number;
  tags: string[];
  evaluations: {
    방음: string;
    시설: string;
    접근성: string;
    벌레: string;
  };
  onClick?: () => void;
  thumbnailUrl?: string;
}

export default function DormReviewCard({
  date,
  name,
  score,
  stars,
  tags,
  evaluations,
  onClick,
  thumbnailUrl,
}: DormCardProps) {
  return (
    <Card onClick={onClick}>
      {thumbnailUrl ? (
        <Thumbnail src={thumbnailUrl} alt="리뷰 이미지" />
      ) : (
        <Skeleton />
      )}
      <Info>
        <TopRow>
          <NameSection>
            <Name>{name}</Name>
            <DateText>{date}</DateText>
          </NameSection>
          <StarDisplay stars={stars} score={score} size="small" />
        </TopRow>
        <Tags>
          {tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </Tags>
        <EvaluationList evaluations={evaluations} size="small" />
      </Info>
    </Card>
  );
}
const Thumbnail = styled.img`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 10px;
  object-fit: cover;
  background: #d9d9d9;
`;

/* ---------------- Styled Components ---------------- */

const Card = styled.div`
  display: flex;
  gap: 10px;
  min-height: 70px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 6px 0;

  &:hover {
    opacity: 0.8;
  }
`;

const Skeleton = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d9d9d9;
`;
`;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 65px;
  justify-content: space-between;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
  min-height: 20px;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
  max-width: 120px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.span`
  color: #999;
  font-size: 8px;
  font-weight: 400;
  white-space: nowrap;
`;

const Tags = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  margin: 2px 0;
  min-height: 12px;
`;

const Tag = styled.div`
  display: inline-flex;
  height: 13px;
  padding: 1px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #f5f5f5;
  color: #666;
  font-size: 7px;
  font-weight: 400;
`;
