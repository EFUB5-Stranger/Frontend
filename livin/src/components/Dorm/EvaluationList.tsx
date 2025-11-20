'use client';

import styled from 'styled-components';

interface EvaluationListProps {
  evaluations: {
    방음: string;
    시설: string;
    접근성: string;
    벌레: string;
  };
  size?: 'small' | 'medium';
}

export default function EvaluationList({ evaluations, size = 'small' }: EvaluationListProps) {
  return (
    <Container $size={size}>
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
    </Container>
  );
}

const Container = styled.div<{ $size: 'small' | 'medium' }>`
  display: flex;
  gap: ${({ $size }) => $size === 'small' ? '4px' : '5px'};
  font-size: 10px;
  margin-top: ${({ $size }) => $size === 'small' ? '2px' : '0'};
  margin-bottom: ${({ $size }) => $size === 'medium' ? '18px' : '0'};
`;

const DescItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  color: #666;
  font-weight: 400;
  
  b {
    font-weight: 500;
  }
`;

const SmallTag = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 16px;
  padding: 0 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 9px;
  font-weight: 500;
`;
