'use client';

import styled from 'styled-components';
import Image from 'next/image';

interface StarDisplayProps {
  stars: number;
  score: number;
  size?: 'small' | 'medium' | 'large';
  showScore?: boolean;
}

export default function StarDisplay({ stars, score, size = 'medium', showScore = true }: StarDisplayProps) {
  const dimensions = {
    small: { width: 11, height: 11, fontSize: '9px', gap: '0px', color: '#818181' },
    medium: { width: 16, height: 16, fontSize: '14px', gap: '3px', color: '#000' },
    large: { width: 22, height: 22, fontSize: '18px', gap: '3px', color: '#000' },
  };

  const config = dimensions[size];

  return (
    <Container $gap={config.gap}>
      {Array.from({ length: stars }).map((_, i) => (
        <Image
          key={i}
          src='/star.svg'
          alt='star'
          width={config.width}
          height={config.height}
        />
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <Image
          key={`e-${i}`}
          src='/star_unfilled.svg'
          alt='star'
          width={config.width}
          height={config.height}
        />
      ))}
      {showScore && <Score $fontSize={config.fontSize} $color={config.color}>{score.toFixed(1)}</Score>}
    </Container>
  );
}

const Container = styled.div<{ $gap: string }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap};
`;

const Score = styled.span<{ $fontSize: string; $color: string }>`
  margin-left: 6px;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 400;
  color: ${({ $color }) => $color};
`;
