'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FloatingWriteButtonProps {
  href: string;
}

export default function FloatingWriteButton({ href }: FloatingWriteButtonProps) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(href)}>
      <Image src='/writing.svg' alt='리뷰 작성' width={28} height={28} />
      <span>리뷰 작성</span>
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: calc(50% - 180px + 12px);
  width: 71px;
  height: 71px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 400;

  span {
    color: #fff;
    font-size: 10px;
    font-weight: 500;
  }

  img {
    filter: brightness(0) invert(1);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  transition: transform 0.2s;
`;
