'use client';

import styled from 'styled-components';
import Image from 'next/image';

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
}

export default function DormReviewCard({
  date,
  name,
  score,
  stars,
  tags,
  evaluations,
}: DormCardProps) {
  return (
    <Card>
      <Skeleton />

      <Info>
        <TopRow>
          <span>{date}</span>
        </TopRow>

        <MiddleRow>
          <Name>{name}</Name>

          <Stars>
            {Array.from({ length: stars }).map((_, i) => (
              <StarIcon
                key={i}
                src='/star.svg'
                alt='star'
                width={13}
                height={13}
              />
            ))}

            {Array.from({ length: 5 - stars }).map((_, i) => (
              <StarIcon
                key={`f-${i}`}
                src='/star_unfilled.svg'
                alt='star-unfilled'
                width={13}
                height={13}
              />
            ))}

            <Score>{score.toFixed(1)}</Score>
          </Stars>
        </MiddleRow>

        <Tags>
          {tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </Tags>

        <DescRow>
          <DescItem>
            <b>방음:</b> <SmallTag>{evaluations['방음']}</SmallTag>
          </DescItem>

          <DescItem>
            <b>시설:</b> <SmallTag>{evaluations['시설']}</SmallTag>
          </DescItem>

          <DescItem>
            <b>접근성:</b> <SmallTag>{evaluations['접근성']}</SmallTag>
          </DescItem>

          <DescItem>
            <b>벌레:</b> <SmallTag>{evaluations['벌레']}</SmallTag>
          </DescItem>
        </DescRow>
      </Info>
    </Card>
  );
}

/* ---------------- Styled Components ---------------- */

const Card = styled.div`
  display: flex;
  gap: 14px;
  height: 85px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  height: 11px;
  color: #818181;
  font-size: 10px;
`;

const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  color: #000;
  font-size: 10px;
  font-weight: 700;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled(Image)`
  width: 13px;
  height: 13px;
`;

const Score = styled.span`
  color: #818181;
  font-size: 10px;
  margin-left: 8px;
`;

const Tags = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.div`
  display: flex;
  height: 15px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #b6b6b6;
  background: #fff;
  font-size: 8px;
`;

const DescRow = styled.div`
  display: flex;
  gap: 6px;
  font-size: 11px;
`;

const DescItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const SmallTag = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 15px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;
