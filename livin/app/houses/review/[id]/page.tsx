'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import StarDisplay from '@/components/Dorm/StarDisplay';
import EvaluationList from '@/components/Dorm/EvaluationList';
import { getHouseReviewDetailApi } from '@apis/house';
import {
  createCommentApi,
  deleteCommentApi,
  getCommentsApi,
} from '@apis/comment';

interface ReviewDetail {
  id: number;
  buildName: string;
  buildNum: string;
  roomPeople: string;
  review: string;
  finalRate: number;
  facilityRate: string;
  soundRate: string;
  bugRate: string;
  accessRate: string;
  imageUrls: string[];
}

interface Comment {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export default function HouseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [review, setReview] = useState<ReviewDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const houseId = searchParams.get('houseId');

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!params.id || !houseId) return;

      try {
        setLoading(true);
        const data = await getHouseReviewDetailApi(
          houseId,
          params.id as string
        );
        setReview(data);

        // 댓글 데이터 로드
        const reviewId = Number(params.id);
        const commentsData = await getCommentsApi(reviewId);
        setComments(commentsData.comments);
      } catch (error) {
        console.error('Failed to fetch review detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [params.id, houseId]);

  if (loading) {
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
            <Title>로딩 중...</Title>
            <Spacer />
          </Header>
        </Container>
      </Wrapper>
    );
  }

  if (!review) {
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
            <Title>리뷰를 찾을 수 없습니다</Title>
            <Spacer />
          </Header>
        </Container>
      </Wrapper>
    );
  }

  // 댓글 작성
  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmittingComment(true);
      const reviewId = Number(params.id);
      await createCommentApi(reviewId, {
        content: commentText,
        anonymous: isAnonymous,
      });
      // 댓글 목록 새로고침
      const commentsData = await getCommentsApi(reviewId);
      setComments(commentsData.comments);
      setCommentText('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const reviewId = Number(params.id);
      await deleteCommentApi(commentId);
      // 댓글 목록 새로고침
      const commentsData = await getCommentsApi(reviewId);
      setComments(commentsData.comments);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
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
          <Title>{review.buildName}</Title>
          <Spacer />
        </Header>

        <ReviewCard>
          <ProfileSection>
            <ProfileImage
              src={'/profile_gray.svg'}
              alt='프로필 이미지'
              width={50}
              height={50}
            />
            <ProfileInfo>
              <NameSection>
                <Name>익명</Name>
              </NameSection>
              <RatingRow>
                <StarDisplay
                  stars={review.finalRate}
                  score={review.finalRate}
                  size='medium'
                />
                <DateText>2025.09.27</DateText>
              </RatingRow>
            </ProfileInfo>
          </ProfileSection>

          <ImageSection>
            {review.imageUrls.map((url, index) => (
              <ImagePlaceholder key={index} />
            ))}
          </ImageSection>

          <EvaluationList evaluations={{
            방음: review.soundRate,
            시설: review.facilityRate,
            접근성: review.accessRate,
            벌레: review.bugRate,
          }} size="medium" />

          <ContentSection>
            <ContentTitle>후기</ContentTitle>
            <ContentBox>
              <ContentText>{review.review}</ContentText>
            </ContentBox>
          </ContentSection>
        </ReviewCard>

        <CommentsSection>
          <CommentsHeader>댓글 {comments.length}개</CommentsHeader>

          {Array.isArray(comments) && comments.map((comment) => (
            <CommentItem key={comment.commentId}>
              <CommentTopRow>
                <CommentLeft>
                  <CommentAuthor>{comment.nickname}</CommentAuthor>
                  <CommentDate>
                    {new Date(comment.createdAt).toLocaleString('ko-KR')}
                  </CommentDate>
                </CommentLeft>
                <CommentActions>
                  <ActionButton onClick={() => handleDeleteComment(comment.commentId)}>삭제</ActionButton>
                </CommentActions>
              </CommentTopRow>
              <CommentText>{comment.content}</CommentText>
            </CommentItem>
          ))}

          {comments.length === 0 && (
            <EmptyComment>첫 댓글을 남겨보세요!</EmptyComment>
          )}
        </CommentsSection>

        <CommentInputSection>
          <InputRow>
            <CheckboxWrapper>
              <Checkbox
                type='checkbox'
                id='anonymous'
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <CheckboxLabel htmlFor='anonymous'>
                <CheckIcon $checked={isAnonymous}>
                  {isAnonymous && '✓'}
                </CheckIcon>
                익명
              </CheckboxLabel>
            </CheckboxWrapper>
            <CommentInput
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder='댓글 작성'
              disabled={isSubmittingComment}
            />
            <SubmitButton
              onClick={handleSubmitComment}
              disabled={isSubmittingComment || !commentText.trim()}
            >
              <Image src='/send.svg' alt='전송' width={17} height={17} />
            </SubmitButton>
          </InputRow>
        </CommentInputSection>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
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

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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
  border: 1.5px solid
    ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#d0d0d0')};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : '#fff'};
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

const EmptyComment = styled.div`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
`;
