'use client';

import styled from 'styled-components';
import Image from 'next/image';

interface DropdownProps {
  value: string;
  placeholder: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
}

export default function Dropdown({
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}: DropdownProps) {
  return (
    <FilterDropdown onClick={onToggle}>
      <DropdownText $hasValue={!!value}>
        {value || placeholder}
      </DropdownText>
      <Image src='/showmore.svg' alt='dropdown' width={12} height={12} />
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(option);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </FilterDropdown>
  );
}

const FilterDropdown = styled.button`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownText = styled.span<{ $hasValue: boolean }>`
  font-size: 13px;
  color: ${({ $hasValue }) => ($hasValue ? '#000' : '#999')};
  font-weight: ${({ $hasValue }) => ($hasValue ? '500' : '400')};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 12px 14px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;
