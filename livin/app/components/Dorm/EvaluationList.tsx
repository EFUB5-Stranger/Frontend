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
  const translateValue = (value: string): string => {
    const translations: { [key: string]: string } = {
      // 방음/벌레 관련
      'NONE': '없음',
      'SOMETIMES': '보통', 
      'OFTEN': '많음',
      
      // 시설 관련
      'DIRTY': '더러움',
      'NORMAL': '보통',
      'CLEAN': '깨끗함',
      
      // 접근성 관련  
      'BAD': '나쁨',
      'GOOD': '좋음',
      'VERY_GOOD': '매우 좋음'
    };
    
    return translations[value] || value;
  };

  return (
    <Container $size={size}>
      <DescItem>
        <b>방음:</b> <SmallTag>{translateValue(evaluations['방음'])}</SmallTag>
      </DescItem>
      <DescItem>
        <b>시설:</b> <SmallTag>{translateValue(evaluations['시설'])}</SmallTag>
      </DescItem>
      <DescItem>
        <b>접근성:</b> <SmallTag>{translateValue(evaluations['접근성'])}</SmallTag>
      </DescItem>
      <DescItem>
        <b>벌레:</b> <SmallTag>{translateValue(evaluations['벌레'])}</SmallTag>
      </DescItem>
    </Container>
  );
}

const Container = styled.div<{ $size: 'small' | 'medium' }>`
  display: flex;
  gap: ${({ $size }) => $size === 'small' ? '5px' : '8px'};
  font-size: 10px;
  margin-top: ${({ $size }) => $size === 'small' ? '0' : '0'};
  margin-bottom: ${({ $size }) => $size === 'medium' ? '18px' : '0'};
  flex-wrap: nowrap;
  overflow: hidden;
`;

const DescItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  color: #666;
  font-weight: 400;
  min-width: 0;
  
  b {
    font-size: 9px;
    font-weight: 500;
  }
`;

const SmallTag = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 16px;
  padding: 2px 6px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 8px;
  font-weight: 500;
  white-space: nowrap;
`;
