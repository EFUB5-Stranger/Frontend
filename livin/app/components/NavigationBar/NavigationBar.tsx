'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();
  const isMap = pathname === '/map';

  return (
    <Wrapper>
      <InnerBar>
        {/* 왼쪽 2개 */}
        <NavItem href='/home' $active={pathname === '/home'}>
          <StyledIcon
            src='/home.svg'
            alt='홈'
            width={24}
            height={24}
            $active={pathname === '/home'}
          />
          <span>홈</span>
        </NavItem>

        <NavItem href='/houses' $active={pathname === '/houses'}>
          <StyledIcon
            src='/room.svg'
            alt='자취/하숙'
            width={26}
            height={26}
            $active={pathname === '/houses'}
          />
          <span>자취/하숙</span>
        </NavItem>

        {/* 공간 비우기: 중앙 버튼 들어갈 자리 */}
        <Space />

        {/* 오른쪽 2개 */}
        <NavItem href='/dorm' $active={pathname === '/dorm'}>
          <StyledIcon
            src='/dorm.svg'
            alt='기숙사'
            width={24}
            height={24}
            $active={pathname === '/dorm'}
          />
          <span>기숙사</span>
        </NavItem>

        <NavItem href='/mypage' $active={pathname === '/mypage'}>
          <StyledIcon
            src='/user.svg'
            alt='마이페이지'
            width={24}
            height={24}
            $active={pathname === '/mypage'}
          />
          <span>마이페이지</span>
        </NavItem>

        {/* 중앙 버튼 */}
        <NavItem href='/map' $active={pathname === '/map'}>
          <CenterButtonContainer>
            <CircleOuter>
              <Image
                src='/map.svg'
                alt='지도'
                width={24}
                height={24}
                style={{
                  opacity: isMap ? 1 : 0.75,
                }}
              />
            </CircleOuter>
          </CenterButtonContainer>
        </NavItem>
      </InnerBar>
    </Wrapper>
  );
}

/* ---------- 스타일 ---------- */

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 360px;
  height: 96px;
  display: flex;
  justify-content: center;
  z-index: 500;
`;

const InnerBar = styled.nav`
  width: 360px;
  height: 75px;

  border-radius: 32px 32px 0 0;
  border: 1px solid rgba(0, 0, 0, 0.06);

  background: #fff;

  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 10px;

  position: relative;
`;

const Space = styled.div`
  width: 84px; /* 중앙 원이 들어갈 자리 */
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 15px 0;
  padding-bottom: 10px;
  gap: 12px;

  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.fourth};

  span {
    font-size: 12px;
  }
`;

const StyledIcon = styled(Image)<{ $active: boolean }>`
  filter: ${({ theme, $active }) =>
    $active ? theme.colors.primaryFilter : theme.colors.fourthFilter};
  width: auto;
  height: auto;
  margin: 0 15px;
`;

const CenterButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -16px;
`;

const CircleOuter = styled.div`
  width: 84px;
  height: 84px;
  padding: 6px;

  border-radius: 50px;
  border: 6px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.primary};

  display: flex;
  justify-content: center;
  align-items: center;
`;
