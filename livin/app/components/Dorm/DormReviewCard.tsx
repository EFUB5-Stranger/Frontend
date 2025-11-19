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
}

export default function DormReviewCard({
  date,
  name,
  score,
  stars,
  tags,
  evaluations,
  onClick,
}: DormCardProps) {
  return (
    <Card onClick={onClick}>
        <Skeleton />

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

/* ---------------- Styled Components ---------------- */

const Card = styled.div`
  display: flex;
  gap: 14px;
  min-height: 85px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px 0;

  &:hover {
    opacity: 0.8;
  }
`;

const Skeleton = styled.div`
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #d9d9d9;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  font-size: 13px;
  font-weight: 700;
`;

const DateText = styled.span`
  color: #999;
  font-size: 8px;
  font-weight: 400;
`;

const Tags = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.div`
  display: inline-flex;
  height: 15px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f5f5f5;
  color: #666;
  font-size: 8px;
  font-weight: 400;
`;
