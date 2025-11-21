'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import StarDisplay from '@/components/Dorm/StarDisplay';
import EvaluationList from '@/components/Dorm/EvaluationList';

export default function HouseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // 임시 데이터
  const review = {
    id: params.id,
    date: '2025.09.27',
    name: '구구',
    score: 4.0,
    stars: 4,
    title: '하늘이화대박빌라',
    address: '서울특별시 서대문구 이화여대길 52',
    tags: ['한우리집', '102동', '301호'],
    evaluations: {
      방음: '보통',
      시설: '보통',
      접근성: '좋음',
      벌레: '많음',
    },
    images: [
      { id: 1, url: '' },
      { id: 2, url: '' },
    ],
    content: `학교랑 가까워서 좋아요
근데 벌레가 좀 많이 나와요......`,
    comments: [
      {
        id: 1,
        author: '구구',
        date: '2025.09.27 17:50',
        text: '맞아요 여기 벌레 너무 많이 나와요ㅠ',
        canDelete: true,
      },
      {
        id: 2,
        author: '익명1',
        date: '2025.09.27 17:50',
        text: '저는 벌레 별로 안 나오던데요?',
        isReported: false,
      },
      {
        id: 3,
        author: '익명2',
        date: '2025.09.27 18:50',
        text: '저는 벌레 별로 안 나오던데요?',
        isReported: false,
      },
    ],
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    console.log('댓글 작성:', { text: commentText, anonymous: isAnonymous });
    setCommentText('');
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>
            <Image src='/arrow_back.svg' alt='뒤로가기' width={15} height={15} />
          </BackButton>
          <Title>{review.title}</Title>
          <Spacer />
        </Header>

        <ReviewCard>

          <ProfileSection>
            <ProfileImage />
            <ProfileInfo>
              <NameSection>
                <Name>{review.name}</Name>
              </NameSection>
              <RatingRow>
                <StarDisplay stars={review.stars} score={review.score} size="medium" />
                <DateText>{review.date}</DateText>
              </RatingRow>
            </ProfileInfo>
          </ProfileSection>

          <ImageSection>
            {review.images.map((img) => (
              <ImagePlaceholder key={img.id} />
            ))}
          </ImageSection>

          <EvaluationList evaluations={review.evaluations} size="medium" />

          <ContentSection>
            <ContentTitle>후기</ContentTitle>
            <ContentBox>
              <ContentText>{review.content}</ContentText>
            </ContentBox>
          </ContentSection>
        </ReviewCard>

        <CommentsSection>
          <CommentsHeader>댓글 {review.comments.length}개</CommentsHeader>
          
          {review.comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentTopRow>
                <CommentLeft>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentDate>{comment.date}</CommentDate>
                </CommentLeft>
                {comment.canDelete && (
                  <CommentActions>
                    <ActionButton>수정</ActionButton>
                    <Divider>|</Divider>
                    <ActionButton>삭제</ActionButton>
                  </CommentActions>
                )}
              </CommentTopRow>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentsSection>

        <CommentInputSection>
          <InputRow>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <CheckboxLabel htmlFor="anonymous">
                <CheckIcon $checked={isAnonymous}>
                  {isAnonymous && '✓'}
                </CheckIcon>
                익명
              </CheckboxLabel>
            </CheckboxWrapper>
            <CommentInput
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글 작성"
            />
            <SubmitButton onClick={handleSubmitComment}>
              <Image src='/send.svg' alt='전송' width={17} height={17} />
            </SubmitButton>
          </InputRow>
        </CommentInputSection>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 120px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 24px 20px;
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

const ReviewCard = styled.div`
  background: #fff;
  border-radius: 0;
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: none;
`;

const BuildingName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0 0 20px 0;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #d9d9d9;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DateText = styled.span`
  font-size: 10px;
  color: #aaa;
`;

const ImageSection = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
`;

const ImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  background: #d9d9d9;
  flex-shrink: 0;
`;

const ContentSection = styled.div`
  margin-top: 0;
  padding-top: 0;
  border-top: none;
`;

const ContentTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin: 0 0 10px 0;
`;

const ContentBox = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #fafafa;
`;

const ContentText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
`;

const CommentsSection = styled.div`
  margin-bottom: 16px;
  padding: 0 24px;
`;

const CommentsHeader = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin: 0 0 14px 0;
`;

const CommentItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e5e5e5;
`;

const CommentTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentAuthor = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #000;
`;

const CommentDate = styled.span`
  font-size: 10px;
  color: #999;
`;

const CommentText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  margin: 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  color: #b0b0b0;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #666;
  }
`;

const Divider = styled.span`
  font-size: 11px;
  color: #e0e0e0;
`;

const CommentInputSection = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 12px 24px 20px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.06);
  max-width: 360px;
  margin: 0 auto;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 22px;
  padding: 0 6px 0 12px;
  height: 44px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
`;

const CheckIcon = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked, theme }) => $checked ? theme.colors.primary : '#d0d0d0'};
  background: ${({ $checked, theme }) => $checked ? theme.colors.primary : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s;
`;

const CommentInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 8px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;

  &::placeholder {
    color: #b6b6b6;
  }

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    filter: brightness(0) invert(1);
  }
`;
