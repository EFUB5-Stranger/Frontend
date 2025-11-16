'use client';

import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import DormReviewCard from '../components/Dorm/DormReviewCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // 실제 로그아웃 로직 필요 시 여기서 처리 (토큰 삭제 등)
    router.push('/login');
  };

  return (
    <>
      <Wrapper>
        <ProfileCard>
          <ProfileImage />
          <ProfileText>
            <Name>퍼비</Name>
            <Email>KFB232323@ewha.ac.kr</Email>
            <School>이화여자대학교</School>
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
          <MenuItem onClick={() => setShowLogoutModal(true)}>
            로그아웃
            <Image src='/more.svg' width={6.63} height={14.5} alt='more' />
          </MenuItem>
        </MenuSection>

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

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  background: #ddd;
  border-radius: 50%;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

/* ---------------- Logout Modal ---------------- */

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
