'use client';

import styled from 'styled-components';
import Image from 'next/image';
import DormReviewCard from '@/components/Dorm/DormReviewCard';

export default function MyPageReviews() {
  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>내가 작성한 리뷰</Title>
      </Header>

      <ScrollArea>
        <ReviewList>
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
        </ReviewList>
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 20px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;

  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
`;
