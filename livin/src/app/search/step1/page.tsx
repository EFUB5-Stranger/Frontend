"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 22.5rem;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  position: relative;
  width: 100%;
  padding-top: 1.75rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5625rem;
  height: 0.9375rem;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
`;

const Label = styled.p`
  font-size: 1rem;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: #000;
  line-height: 1.5rem;
  margin: 2rem 0 1rem;
  text-align: center;
`;

const TypeGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const TypeButton = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25rem;
  padding: 0.5625rem 1.125rem;
  border-radius: 0.9375rem;
  border: 1px solid #b6b6b6;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  background: ${({ selected }) => (selected ? "#DBE2EF" : "#fff")};
  cursor: pointer;
`;

const SearchButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: calc(50% - 11.25rem + 1rem);
  width: 20.625rem;
  height: 3.125rem;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.9375rem;
  background: #112d4e;
  color: white;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  border: none;
  cursor: pointer;
`;

export default function SearchStep1() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const isSearchEnabled = selectedType !== null;

  const handleSelectType = (selectedType: string) => {
    if (!selectedType) return alert("검색할 타입을 선택해주세요!");
    if (selectedType === "기숙사") {
      router.push(`/search/step3?type=${selectedType}`);
    } else {
      router.push(`/search/step2?type=${selectedType}`);
    }
  };

  return (
    <Wrapper>
      <TopBar>
        <BackIcon onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M9 1.22591L7.66147 0L0.37084 6.68119L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z" fill="black"/>
          </svg>
        </BackIcon>
        <Title>검색</Title>
      </TopBar>

      <Label>검색하고자 하는 타입을 선택하세요.</Label>
      <TypeGroup>
        <TypeButton selected={false} onClick={() => handleSelectType("자취")}>자취</TypeButton>
        <TypeButton selected={false} onClick={() => handleSelectType("기숙사")}>기숙사</TypeButton>
        <TypeButton selected={false} onClick={() => handleSelectType("하숙")}>하숙</TypeButton>
      </TypeGroup>

      <SearchButton
        style={{ backgroundColor: "#DBE2EF", cursor: "default" }}
        aria-disabled
      >
        검색
      </SearchButton>
    </Wrapper>
  );
}
