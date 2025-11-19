'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dropdown from '@/app/components/Dorm/Dropdown';
import EvaluationItem from '@/app/components/Dorm/EvaluationItem';
import StarRating from '@/app/components/Dorm/StarRating';

export default function DormWritePage() {
  const router = useRouter();
  
  const [dormInfo, setDormInfo] = useState({
    building: '',
    dong: '',
    room: '',
  });
  
  const [openDropdown, setOpenDropdown] = useState<'building' | 'dong' | 'room' | null>(null);
  
  const [ratings, setRatings] = useState({
    시설: '',
    청결: '',
    방음: '',
    벌레: '',
  });
  
  const [overallRating, setOverallRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // 드롭다운 옵션
  const buildingOptions = ['E-HOUSE', '한우리집', 'I-HOUSE'];
  const dongOptions = ['101동', '102동', '103동', '201동', '202동', '203동'];
  const roomOptions = ['1인실', '2인실', '3인실', '4인실'];

  const handleImageAdd = () => {
    if (images.length < 5) {
      console.log('이미지 추가');
    }
  };

  const handleSubmit = () => {
    console.log('리뷰 등록:', {
      dormInfo,
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
          <Title>기숙사 리뷰 작성</Title>
          <Spacer />
        </Header>

        <Content>
          {/* 기숙사 정보 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>
                기숙사 정보<Required>*</Required>
              </SectionTitle>
            </SectionHeader>
            <FilterRow>
              <Dropdown
                value={dormInfo.building}
                placeholder="건물명"
                options={buildingOptions}
                isOpen={openDropdown === 'building'}
                onToggle={() => setOpenDropdown(openDropdown === 'building' ? null : 'building')}
                onSelect={(option) => {
                  setDormInfo({ ...dormInfo, building: option });
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                value={dormInfo.dong}
                placeholder="동 선택"
                options={dongOptions}
                isOpen={openDropdown === 'dong'}
                onToggle={() => setOpenDropdown(openDropdown === 'dong' ? null : 'dong')}
                onSelect={(option) => {
                  setDormInfo({ ...dormInfo, dong: option });
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                value={dormInfo.room}
                placeholder="인실"
                options={roomOptions}
                isOpen={openDropdown === 'room'}
                onToggle={() => setOpenDropdown(openDropdown === 'room' ? null : 'room')}
                onSelect={(option) => {
                  setDormInfo({ ...dormInfo, room: option });
                  setOpenDropdown(null);
                }}
              />
            </FilterRow>
          </Section>

          {/* 만족도 평가 */}
          <Section>
            <SectionHeader>
              <VerticalLine src='/line.svg' alt='line' width={4} height={20} />
              <SectionTitle>
                만족도 평가<Required>*</Required>
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
              icon="🧹"
              name="청결도"
              options={['나빠요', '보통이에요', '좋아요']}
              selectedValue={ratings.청결}
              onSelect={(value) => setRatings({ ...ratings, 청결: value })}
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
              label="전반적인 만족도를 평가해주세요⭐"
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
              placeholder="✏️기숙사 생활 경험을 솔직하게 공유해주세요
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
            <ImageUploadSection>
              {images.map((img, idx) => (
                <ImageBox key={idx}>
                  <RemoveButton>×</RemoveButton>
                  <ImagePreview>📷</ImagePreview>
                  <ImageCount>0 / 5</ImageCount>
                </ImageBox>
              ))}
              {images.length < 5 && (
                <AddImageBox onClick={handleImageAdd}>
                  <PlusIcon>+</PlusIcon>
                </AddImageBox>
              )}
            </ImageUploadSection>
            <ImageFooter>
              <div></div>
              <CheckboxWrapper>
                <CheckboxLabel>
                  <Checkbox type="checkbox" />
                  <CheckIcon>✓</CheckIcon>
                  익명
                </CheckboxLabel>
              </CheckboxWrapper>
            </ImageFooter>
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

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
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

const ImageUploadSection = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px dashed #d0d0d0;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ImagePreview = styled.div`
  font-size: 24px;
`;

const ImageCount = styled.div`
  font-size: 10px;
  color: #999;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddImageBox = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px dashed #d0d0d0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: #f8f8f8;
  }
`;

const PlusIcon = styled.span`
  font-size: 28px;
  color: #999;
`;

const ImageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #000;
  cursor: pointer;
`;

const CheckIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid #d0d0d0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: transparent;
  
  ${Checkbox}:checked + & {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
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
