// app/(auth)/signup/components/Success.tsx

import React from 'react';
import Image from 'next/image';
import Livin_logo from '../../../../public/livin_logo.svg';
import { SuccessBox, Logo, Button } from '../Signup.styled';

export const Success = () => {
  return (
    <SuccessBox>
      <Logo>
        <Image
          src={Livin_logo}
          alt='Livin 로고'
          width={120}
          height={48}
          priority
        />
      </Logo>
      <p>회원가입이 완료되었습니다!</p>
      <Button onClick={() => (window.location.href = '/login')}>로그인</Button>
    </SuccessBox>
  );
};
