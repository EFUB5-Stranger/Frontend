'use client';

import styled from 'styled-components';
import Image from 'next/image';
import DormReviewCard from '../Dorm/DormReviewCard';

export default function DormList() {
  return (
    <Wrapper>
      <Title>우리학교 기숙사</Title>

      <DormReviewCard
        date='2025.09.27'
        name='두둥'
        score={4.0}
        stars={4}
        tags={['한우리집', '101동', '101호']}
        evaluations={{
          방음: '보통',
          시설: '보통',
          접근성: '좋음',
          벌레: '많음',
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 20px 10px;
`;

const Title = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.9px;
  margin-bottom: 23px;
`;
