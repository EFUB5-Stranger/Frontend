'use client';

import styled from 'styled-components';

interface EvaluationItemProps {
  icon: string;
  name: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function EvaluationItem({
  icon,
  name,
  options,
  selectedValue,
  onSelect,
}: EvaluationItemProps) {
  return (
    <EvalItem>
      <EvalHeader>
        <EvalIcon>{icon}</EvalIcon>
        <EvalName>{name}</EvalName>
      </EvalHeader>
      <ButtonGroup>
        {options.map((option) => (
          <RatingButton
            key={option}
            $selected={selectedValue === option}
            onClick={() => onSelect(option)}
          >
            {option}
          </RatingButton>
        ))}
      </ButtonGroup>
    </EvalItem>
  );
}

const EvalItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #fff;
`;

const EvalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const EvalIcon = styled.span`
  font-size: 20px;
`;

const EvalName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingButton = styled.button<{ $selected: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : '#d0d0d0')};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#666')};
  font-size: 12px;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
