'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserProfileApi } from '@apis/users';

const MENT_LIST = [
  { suffix: '님,', text: '내일의 자취방을 찾아볼까요?' },
  { suffix: '님,', text: '오늘보다 더 편한 내일, 함께 찾아봐요.' },
  { suffix: '님에게', text: '꼭 맞는 방, 제가 찾아드릴게요!' },
  { suffix: '님', text: '주변의 인기 자취방을 보여드릴게요.' },
  { suffix: '님,', text: '나만의 공간을 찾아봐요!' },
];

export default function TopSection() {
  const [nickname, setNickname] = useState('');
  const [currentMent, setCurrentMent] = useState(MENT_LIST[0]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MENT_LIST.length);
      setCurrentMent(MENT_LIST[randomIndex]);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Logo src='/livin_logo.svg' alt='Livin' width={77} height={50} />

      <Title>
        <PrimaryBlue>{nickname}</PrimaryBlue>
        <DarkBlue>
          {currentMent.suffix}
          <br />
          {currentMent.text}
        </DarkBlue>
      </Title>
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
