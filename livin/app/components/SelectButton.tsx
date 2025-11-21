'use client';

import styled from "styled-components";

const SelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const StyledSelect = styled.select<{ isActive?: boolean }>`
  border: 1px solid ${({ isActive }) => (isActive ? "#112D4E" : "#d9d9d9")};
  border-radius: 0.5rem;
  padding: 0.4rem 2rem 0.4rem 0.8rem;
  font-size: 0.9rem;
  background: ${({ isActive }) => (isActive ? "#112D4E" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#FFFFFF" : "#333")};
  cursor: pointer;
  margin-right: 0.5rem;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    border-color: #112D4E;
  }

  option {
    background: #fff;
    color: #333;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

interface SelectButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export default function SelectButton({ value, onChange, options = [] }: SelectButtonProps) {
  const isActive = value !== options[0]?.value; // 첫 번째 옵션(전체/전체 주소)이 아닌 경우 활성화

  return (
    <SelectWrapper>
      <StyledSelect value={value} onChange={onChange} isActive={isActive}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
      <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
  <path d="M4.78037 4.88191L8.89304 0.638906C8.9617 0.56811 9 0.474051 9 0.37624C9 0.278429 8.9617 0.184371 8.89304 0.113575L8.8884 0.109006C8.85511 0.0745659 8.81505 0.0471425 8.77064 0.0284028C8.72624 0.00966313 8.67842 -9.25561e-07 8.6301 -9.21336e-07C8.58177 -9.17112e-07 8.53395 0.00966315 8.48955 0.0284028C8.44514 0.0471426 8.40508 0.0745659 8.3718 0.109006L4.49923 4.10458L0.628205 0.109007C0.594922 0.0745666 0.554859 0.0471432 0.510454 0.0284035C0.466048 0.00966385 0.418229 -2.03432e-07 0.369904 -1.99207e-07C0.32158 -1.94983e-07 0.273761 0.00966387 0.229355 0.0284036C0.18495 0.0471433 0.144887 0.0745667 0.111604 0.109007L0.106957 0.113575C0.0383001 0.184372 -4.12773e-07 0.278429 -4.04222e-07 0.376241C-3.95671e-07 0.474052 0.0383001 0.56811 0.106957 0.638907L4.21963 4.88191C4.25579 4.91923 4.29929 4.94894 4.34749 4.96924C4.39568 4.98953 4.44757 5 4.5 5C4.55243 5 4.60432 4.98953 4.65251 4.96924C4.70071 4.94894 4.74421 4.91923 4.78037 4.88191Z" fill="black"/>
</svg>
      </IconWrapper>
    </SelectWrapper>
  );
}
