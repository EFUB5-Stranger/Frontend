'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMyCommentsApi } from '@apis/comment';

interface Comment {
  commentId: number;
  userId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

interface MyCommentsResponse {
  count: number;
  comments: Comment[];
}

export default function MyPageComments() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const data: MyCommentsResponse = await getMyCommentsApi();
      console.log('My Comments Response:', data);

      if (data && Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('내 댓글 조회 실패:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentClick = (commentId?: number) => {
    // 아직 정의되지 않아서 일단 로그 출력으로 대체
    console.log('comment clicked', commentId);
  };

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>댓글</Title>
      </Header>

      <ScrollArea>
        <CommentList>
          {isLoading ? (
            <LoadingText>로딩 중...</LoadingText>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.commentId}
                onClick={() => handleCommentClick(comment.commentId)}
              >
                <CommentHeader>
                  {/* API에 기숙사 이름이 없으므로 '작성한 댓글' 등으로 대체하거나 생략 */}
                  <DormName>작성한 댓글</DormName>
                  <DateText>
                    {/* API 날짜 형식이 "YYYY-MM-DD HH:MM"이므로 그대로 사용하거나 포맷팅 */}
                    {comment.createdAt}
                  </DateText>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
              </CommentItem>
            ))
          ) : (
            <EmptyText>작성한 댓글이 없습니다.</EmptyText>
          )}
        </CommentList>
      </ScrollArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 10px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
  padding: 0 10px;
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
  white-space: nowrap;
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

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
`;

const CommentItem = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  /* 이동 기능이 생기면 cursor: pointer 추가 */
  /* cursor: pointer; */
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const DormName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #333;
`;

const DateText = styled.span`
  font-size: 11px;
  color: #999;
`;

const CommentContent = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  line-height: 1.5;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #666;
  font-size: 14px;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 14px;
`;
