'use client';

import styled from 'styled-components';
import Image from 'next/image';

export default function DormList() {
  return (
    <Wrapper>
      <Title>우리학교 기숙사</Title>

      <Card>
        <Skeleton />

        <Info>
          <TopRow>
            <span>2025.09.27</span>
          </TopRow>
          <MiddleRow>
            <Name>두둥</Name>
            <Stars>
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <StarIcon src='/star.svg' alt='star' width={13} height={13} />
              <StarIcon
                src='/star_unfilled.svg'
                alt='star-unfilled'
                width={13}
                height={13}
              />
              <Score>4.0</Score>
            </Stars>
          </MiddleRow>

          <Tags>
            <Tag>한우리집</Tag>
            <Tag>101동</Tag>
            <Tag>101호</Tag>
          </Tags>

          <DescRow>
            <DescItem>
              <b>방음:</b>
              <SmallTag>보통</SmallTag>
            </DescItem>

            <DescItem>
              <b>시설:</b>
              <SmallTag>보통</SmallTag>
            </DescItem>

            <DescItem>
              <b>접근성:</b>
              <SmallTag>좋음</SmallTag>
            </DescItem>

            <DescItem>
              <b>벌레:</b>
              <SmallTag>많음</SmallTag>
            </DescItem>
          </DescRow>
        </Info>
      </Card>
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
  align-self: stretch;
  color: #818181;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  gap: 10px;
  border-radius: 15px;
  border: 1px solid #b6b6b6;
  background: #fff;

  color: #000;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DescRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DescItem = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  white-space: nowrap;
`;

const SmallTag = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 15px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  white-space: nowrap;
`;
