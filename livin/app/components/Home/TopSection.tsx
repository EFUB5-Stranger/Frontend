'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserProfileApi } from '@apis/users';

export default function TopSection() {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfileApi();
        setNickname(data.nickname);
      } catch (e: unknown) {
        console.error('프로필 로딩 실패:', e);
        setNickname('사용자');
      }
    };
    fetchProfile();
  }, []);

  return (
    <Wrapper>
      <Logo src='/livin_logo.svg' alt='Livin' width={77} height={50} />

      <Title>
        <PrimaryBlue>{nickname}</PrimaryBlue>
        <DarkBlue>
          님,
          <br />
          내일의 자취방을 찾아볼까요?
        </DarkBlue>
      </Title>

      {/* <SearchBox>
        <SearchIcon src='/search.svg' alt='검색' width={18} height={18} />
        <input placeholder='원하는 자취방/하숙을 검색해주세요.' />
      </SearchBox> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  height: 174px;
  padding-left: 17px;
  background-image: url('/Rectangle.svg');
`;

const Logo = styled(Image)`
  margin: 21px 0 17px 0;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  padding: 0;
`;

const PrimaryBlue = styled.span`
  color: var(--main-third, #3f72af);
  font-weight: 700;
`;

const DarkBlue = styled.span`
  color: var(--main-pri, #112d4e);
  font-weight: 600;
`;

// const SearchBox = styled.div`
//   display: flex;
//   width: 320px;
//   height: 35px;
//   margin-top: 18px;
//   padding: 10px 14px;
//   flex-direction: row;
//   align-items: flex-start;
//   gap: 10px;
//   flex-shrink: 0;
//   border-radius: 15px;
//   border: 1px solid ${({ theme }) => theme.colors.secondary};
//   background: #fff;

//   input {
//     flex: 1;
//     border: none;
//     outline: none;
//     color: var(--gray-300, #b6b6b6);
//     font-family: ${({ theme }) => theme.fonts.main};
//     font-size: 13px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 18px;
//     letter-spacing: 0.65px;
//   }
// `;

// const SearchIcon = styled(Image)`
//   width: 13px;
//   height: 13px;
//   stroke-width: 2px;
//   stroke: var(--main-pri, #112d4e);
// `;
