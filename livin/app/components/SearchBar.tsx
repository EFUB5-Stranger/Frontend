'use client';
import styled from 'styled-components';
import Image from 'next/image';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchSection = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const SearchIcon = styled(Image)`
  position: absolute;
  left: 16px;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 0 16px 0 48px; /* 왼쪽 아이콘 공간 확보 */
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 13px;
  color: #000;

  &::placeholder {
    color: #b6b6b6;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function SearchBar({
  placeholder,
  value,
  onChange,
  onKeyPress,
  className,
}: SearchBarProps) {
  return (
    <SearchSection className={className}>
      <SearchInputWrapper>
        <SearchIcon src="/search.svg" alt="검색" width={20} height={20} />
        <SearchInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </SearchInputWrapper>
    </SearchSection>
  );
}
