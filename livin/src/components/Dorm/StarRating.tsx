'use client';

import styled from 'styled-components';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  label?: string;
}

export default function StarRating({ rating, onRate, label }: StarRatingProps) {
  return (
    <StarRatingBox>
      {label && <StarRatingText>{label}</StarRatingText>}
      <StarRow>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            $filled={star <= rating}
            onClick={() => onRate(star)}
          >
            ★
          </Star>
        ))}
      </StarRow>
    </StarRatingBox>
  );
}

const StarRatingBox = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: #f0f4ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const StarRatingText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const StarRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Star = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${({ $filled }) => ($filled ? '#FFD700' : '#ddd')};
  transition: all 0.2s;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;
