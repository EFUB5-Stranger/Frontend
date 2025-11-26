'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EvaluationItem from '@/components/Dorm/EvaluationItem';
import StarRating from '@/components/Dorm/StarRating';
import ImageUpload from '@/components/Common/ImageUpload';

export default function HouseWritePage() {
  const router = useRouter();
  
  const [ratings, setRatings] = useState({
    시설: '',
    접근성: '',
    방음: '',
    벌레: '',
  });
  
  const [overallRating, setOverallRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // 임시 건물 정보
  const houseInfo = {
    name: '하늘이화대박빌라',
    address: '서울특별시 서대문구 이화여대길 55',
  };

  const handleImageAdd = () => {
    if (images.length < 5) {
      console.log('이미지 추가');
    }
  };

  const handleSubmit = () => {
    console.log('리뷰 등록:', {
      ratings,
      overallRating,
      reviewText,
      images,
    });
    router.back();
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>
            <Image src='/arrow_back.svg' alt='뒤로가기' width={15} height={15} />
          </BackButton>
          <Title>리뷰 작성</Title>
          <Spacer />
        </Header>

        <Content>
          {/* 건물 정보 */}
          <HouseInfoCard>
            <HouseImage />
            <HouseDetails>
              <HouseName>{houseInfo.name}</HouseName>
              <HouseAddress>{houseInfo.address}</HouseAddress>
            </HouseDetails>
          </HouseInfoCard>

          {/* 세부 항목 평가 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>
                세부 항목 평가<Required>*</Required>
              </SectionTitle>
            </SectionHeader>

            <EvaluationItem
              icon="🏠"
              name="시설"
              options={['더러워요', '보통이에요', '깨끗해요']}
              selectedValue={ratings.시설}
              onSelect={(value) => setRatings({ ...ratings, 시설: value })}
            />

            <EvaluationItem
              icon="🏢"
              name="접근성"
              options={['나빠요', '보통이에요', '좋아요']}
              selectedValue={ratings.접근성}
              onSelect={(value) => setRatings({ ...ratings, 접근성: value })}
            />

            <EvaluationItem
              icon="🔇"
              name="방음"
              options={['조용해요', '보통이에요', '시끄러워요']}
              selectedValue={ratings.방음}
              onSelect={(value) => setRatings({ ...ratings, 방음: value })}
            />

            <EvaluationItem
              icon="🐛"
              name="벌레"
              options={['없어요', '가끔 나와요', '자주 나와요']}
              selectedValue={ratings.벌레}
              onSelect={(value) => setRatings({ ...ratings, 벌레: value })}
            />
          </Section>

          {/* 종합 평가 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>
                종합 평가<Required>*</Required>
              </SectionTitle>
            </SectionHeader>
            <StarRating
              rating={overallRating}
              onRate={setOverallRating}
              label="전반적인 만족도를 평가해주세요."
            />
          </Section>

          {/* 후기 작성 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>
                후기 작성<Required>*</Required>
              </SectionTitle>
            </SectionHeader>
            <ReviewTextArea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="자취방/하숙, 생활 경험을 솔직하게 공유해주세요
(최소 15자, 최대 200자)"
              maxLength={200}
            />
            <CharCount>{reviewText.length} / 200</CharCount>
          </Section>

          {/* 사진 첨부 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>사진 첨부 (선택, 최대 5장)</SectionTitle>
            </SectionHeader>
            <ImageUpload
              imageCount={images.length}
              maxImages={5}
              onAddImage={handleImageAdd}
              isAnonymous={isAnonymous}
              onToggleAnonymous={setIsAnonymous}
            />
          </Section>
        </Content>

        <SubmitButton onClick={handleSubmit}>
          리뷰 등록하기
        </SubmitButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 100px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0 24px;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Spacer = styled.div`
  width: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 24px;
`;

const HouseInfoCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
`;

const HouseImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #d9d9d9;
  flex-shrink: 0;
`;

const HouseDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const HouseName = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

const HouseAddress = styled.p`
  font-size: 11px;
  color: #666;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VerticalLine = styled(Image)`
  width: 4px;
  height: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Required = styled.span`
  color: #ff4444;
  font-size: 15px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #d0d0d0;
  background: #fff;
  font-size: 13px;
  line-height: 1.6;
  color: #000;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #999;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 20px;
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;