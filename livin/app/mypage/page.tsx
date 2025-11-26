'use client';

import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import DormReviewCard from '../components/Dorm/DormReviewCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getUserProfileApi, updateUserProfileApi } from '@apis/users';
import { logoutApi } from '@apis/auth';

export default function MyPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profileImage, setProfileImage] = useState('');

  // 이메일을 기준으로 이미지를 결정하는 함수
  const getProfileImageByEmail = (emailStr: string) => {
    if (!emailStr) return '/profile_white.svg'; // 이메일 없을 때 기본값

    let sum = 0;
    for (let i = 0; i < emailStr.length; i++) {
      sum += emailStr.charCodeAt(i); // 각 글자의 아스키코드 값을 더함
    }

    // 합계가 짝수면 White, 홀수면 Gray
    return sum % 2 === 0 ? '/profile_white.svg' : '/profile_gray.svg';
  };

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await logoutApi();

      // 로컬 토큰 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // 로그인 페이지로 이동
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfileApi();

        setNickname(data.nickname);
        setNewNickname(data.nickname);
        setEmail(data.email);
        setSchool(data.school);

        const deterministicImg = getProfileImageByEmail(data.email);
        setProfileImage(deterministicImg);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Wrapper>
        <ProfileCard>
          <ProfileImage
            src={profileImage || '/profile_white.svg'}
            alt='프로필 이미지'
            width={70}
            height={70}
          />
          <ProfileText>
            <NameRow>
              <Name>{nickname}</Name>
              <EditBtn onClick={() => setShowEditModal(true)}>
                <Image src='/edit.svg' width={10} height={10} alt='edit' />
              </EditBtn>
            </NameRow>
            <Email>{email}</Email>
            <School>{school}</School>
          </ProfileText>
        </ProfileCard>

        <SectionHeader>
          <SectionTitle>내가 작성한 리뷰</SectionTitle>
          <MoreBtn onClick={() => router.push('/mypage/reviews')}>
            더보기 <Image src='/more.svg' width={6} height={13} alt='more' />
          </MoreBtn>
        </SectionHeader>

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
        </ReviewList>

        <MenuSection>
          <MenuItem onClick={() => router.push('/mypage/bookmark')}>
            북마크
            <Image src='/more.svg' width={6.63} height={14.5} alt='more' />
          </MenuItem>
          <MenuItem onClick={() => router.push('/mypage/comments')}>
            댓글
            <Image src='/more.svg' width={6.63} height={14.5} alt='more' />
          </MenuItem>
          <MenuItem onClick={() => setShowLogoutModal(true)}>
            로그아웃
            <Image src='/more.svg' width={6.63} height={14.5} alt='more' />
          </MenuItem>
        </MenuSection>

        {/* 닉네임 수정 모달 */}
        {showEditModal && (
          <ModalBackground onClick={() => setShowEditModal(false)}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <ModalText>닉네임 수정</ModalText>

              <EditInput
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder='새 닉네임을 입력하세요'
              />

              <ModalButtons>
                <CancelBtn onClick={() => setShowEditModal(false)}>
                  취소
                </CancelBtn>
                <ConfirmBtn
                  onClick={async () => {
                    try {
                      const updated = await updateUserProfileApi(newNickname);
                      setNickname(updated.nickname);
                      setShowEditModal(false);
                    } catch (error) {
                      console.error('닉네임 수정 실패:', error);
                      alert('닉네임 수정에 실패했습니다.');
                    }
                  }}
                >
                  저장
                </ConfirmBtn>
              </ModalButtons>
            </ModalBox>
          </ModalBackground>
        )}

        {/* 로그아웃 모달 */}
        {showLogoutModal && (
          <ModalBackground onClick={() => setShowLogoutModal(false)}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <ModalText>정말 로그아웃하시겠습니까?</ModalText>

              <ModalButtons>
                <CancelBtn onClick={() => setShowLogoutModal(false)}>
                  취소
                </CancelBtn>
                <ConfirmBtn onClick={handleLogout}>확인</ConfirmBtn>
              </ModalButtons>
            </ModalBox>
          </ModalBackground>
        )}
      </Wrapper>
      <NavigationBar />
    </>
  );
}

/* ---------------- styled-components ---------------- */

const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.minHeight};
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 50px;
  position: relative;
  padding-bottom: 100px;
`;

const ProfileCard = styled.div`
  width: 320px;
  background: #fff;
  padding: 26px 0 23px 0;
  gap: 22px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #b6b6b6;
`;

const ProfileImage = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const EditBtn = styled.div`
  font-size: 12px;
  color: #696969;
  cursor: pointer;
`;

const Name = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Email = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const School = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SectionHeader = styled.div`
  margin-top: 18px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 5px;
`;

const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #696969;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.65px;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 23px;
  border-bottom: 1px solid #b6b6b6;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  background: #fff;
  gap: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding-left: 28px;
  padding-right: 6px;
  color: var(--main-pri, #112d4e);
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-top: 1px solid #b6b6b6;
  border-bottom: 1px solid #b6b6b6;
  cursor: pointer;
`;

/* ---------------- Modal Common Styles ---------------- */

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 280px;
  padding: 20px 20px 15px 20px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ModalText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #000;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelBtn = styled.button`
  padding: 8px 14px;
  background: #e0e0e0;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const ConfirmBtn = styled.button`
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.main};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
