'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import Livin_logo from '../public/livin_logo.svg';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // 2.5초 후 자동으로 로그인 페이지로 이동
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SplashWrapper>
      <Card>
        <Image src={Livin_logo} alt='Livin 로고' width={150} height={80} />
      </Card>
    </SplashWrapper>
  );
}

/* ---------------- styled-components ---------------- */

const SplashWrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.minHeight};

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  width: ${({ theme }) => theme.layout.maxWidth};
  min-height: ${({ theme }) => theme.layout.minHeight};
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.style.shadowMd};
  border-radius: ${({ theme }) => theme.style.radiusBase};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
`;
