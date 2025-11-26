'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dropdown from '@components/Dorm/Dropdown';
import EvaluationItem from '@components/Dorm/EvaluationItem';
import StarRating from '@components/Dorm/StarRating';
import ImageUpload from '@components/Common/ImageUpload';
import { createDormReviewApi, uploadReviewImageApi } from '@apis/dorm';

export default function DormWritePage() {
  const router = useRouter();

  const [dormInfo, setDormInfo] = useState({
    building: '',
    dong: '',
    room: '',
  });

  const [openDropdown, setOpenDropdown] = useState<
    'building' | 'dong' | 'room' | null
  >(null);

  const [ratings, setRatings] = useState({
    시설: '',
    접근성: '',
    방음: '',
    벌레: '',
  });

  const [overallRating, setOverallRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 드롭다운 옵션
  const buildingOptions = ['E-HOUSE', '한우리집', 'I-HOUSE'];
  const dongOptions = ['101동', '102동', '103동', '201동', '202동', '203동'];
  const roomOptions = ['1인실', '2인실', '3인실', '4인실'];

  // 평가 매핑 함수
  const mapRatingToEnum = (category: string, value: string) => {
    const mappings: Record<string, Record<string, string>> = {
      시설: {
        '더러워요': 'DIRTY',
        '보통이에요': 'NORMAL',
        '깨끗해요': 'CLEAN'
      },
      접근성: {
        '나빠요': 'BAD',
        '보통이에요': 'NORMAL',
        '좋아요': 'GOOD'
      },
      방음: {
        '조용해요': 'NONE',
        '보통이에요': 'SOMETIMES',
        '시끄러워요': 'OFTEN'
      },
      벌레: {
        '없어요': 'NONE',
        '가끔 나와요': 'SOMETIMES',
        '자주 나와요': 'OFTEN'
      }
    };
    return mappings[category]?.[value] || '';
  };

  const handleImageAdd = async (file: File) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadReviewImageApi(file);
      setImageUrls(prev => [...prev, imageUrl]);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!dormInfo.building || !dormInfo.dong || !dormInfo.room) {
      alert('기숙사 정보를 모두 입력해주세요.');
      return;
    }
    if (!ratings.시설 || !ratings.접근성 || !ratings.방음 || !ratings.벌레) {
      alert('만족도 평가를 모두 선택해주세요.');
      return;
    }
    if (overallRating === 0) {
      alert('종합 평가를 입력해주세요.');
      return;
    }
    if (reviewText.length < 15) {
      alert('후기는 최소 15자 이상 작성해주세요.');
      return;
    }

    try {
      // roomPeople 숫자 추출 (예: "2인실" -> 2)
      const roomPeople = parseInt(dormInfo.room.replace('인실', ''));

      const data = {
        buildName: dormInfo.building,
        buildNum: dormInfo.dong,
        roomPeople,
        facilityRate: mapRatingToEnum('시설', ratings.시설) as 'DIRTY' | 'NORMAL' | 'CLEAN',
        accessRate: mapRatingToEnum('접근성', ratings.접근성) as 'BAD' | 'NORMAL' | 'GOOD',
        soundRate: mapRatingToEnum('방음', ratings.방음) as 'NONE' | 'SOMETIMES' | 'OFTEN',
        bugRate: mapRatingToEnum('벌레', ratings.벌레) as 'NONE' | 'SOMETIMES' | 'OFTEN',
        finalRate: overallRating,
        review: reviewText,
        anonym: isAnonymous,
        imageUrls: imageUrls
      };

      await createDormReviewApi(data);

      alert('리뷰가 등록되었습니다!');
      router.push('/dorm');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>
            <Image
              src='/arrow_back.svg'
              alt='뒤로가기'
              width={15}
              height={15}
            />
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
                placeholder='건물명'
                options={buildingOptions}
                isOpen={openDropdown === 'building'}
                onToggle={() =>
                  setOpenDropdown(
                    openDropdown === 'building' ? null : 'building'
                  )
                }
                onSelect={(option) => {
                  setDormInfo({ ...dormInfo, building: option });
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                value={dormInfo.dong}
                placeholder='동 선택'
                options={dongOptions}
                isOpen={openDropdown === 'dong'}
                onToggle={() =>
                  setOpenDropdown(openDropdown === 'dong' ? null : 'dong')
                }
                onSelect={(option) => {
                  setDormInfo({ ...dormInfo, dong: option });
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                value={dormInfo.room}
                placeholder='인실'
                options={roomOptions}
                isOpen={openDropdown === 'room'}
                onToggle={() =>
                  setOpenDropdown(openDropdown === 'room' ? null : 'room')
                }
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
              icon='🏠'
              name='시설'
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
              icon='🔇'
              name='방음'
              options={['조용해요', '보통이에요', '시끄러워요']}
              selectedValue={ratings.방음}
              onSelect={(value) => setRatings({ ...ratings, 방음: value })}
            />

            <EvaluationItem
              icon='🐛'
              name='벌레'
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
              label='전반적인 만족도를 평가해주세요⭐'
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
              placeholder='✏️기숙사 생활 경험을 솔직하게 공유해주세요
(최소 15자, 최대 200자)'
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
              imageCount={imageUrls.length}
              maxImages={5}
              onAddImage={handleImageAdd}
              isAnonymous={isAnonymous}
              onToggleAnonymous={setIsAnonymous}
              isUploading={isUploading}
            />
          </Section>
        </Content>

        <SubmitButton onClick={handleSubmit}>리뷰 등록하기</SubmitButton>
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
