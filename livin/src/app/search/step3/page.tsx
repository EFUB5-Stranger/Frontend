"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const dormBuildings = ["E-HOUSE", "I-HOUSE", "한우리집"];
const roomTypes = ["2인실", "3인실", "4인실"];

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
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

export default function SearchStep3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) setSelectedType(type);
  }, [searchParams]);

  const isSearchEnabled =
    selectedType === "기숙사" &&
    selectedBuilding !== null &&
    selectedRoomType !== null;

  const handleSearch = () => {
    if (!isSearchEnabled) return;
    alert(
      `검색 조건\n타입: ${selectedType}\n기숙사 동: ${selectedBuilding}\n방 타입: ${selectedRoomType}`
    );
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
      <ButtonGroup>
        <TypeButton selected={selectedType === "자취"} onClick={() => setSelectedType("자취")}>자취</TypeButton>
        <TypeButton selected={selectedType === "기숙사"} onClick={() => setSelectedType("기숙사")}>기숙사</TypeButton>
        <TypeButton selected={selectedType === "하숙"} onClick={() => setSelectedType("하숙")}>하숙</TypeButton>
      </ButtonGroup>

      <Label>검색할 기숙사의 동을 선택하세요.</Label>
      <ButtonGroup>
        {["E-HOUSE", "I-HOUSE", "한우리집"].map((building) => (
          <TypeButton
            key={building}
            selected={selectedBuilding === building}
            onClick={() => setSelectedBuilding(building)}
          >
            {building}
          </TypeButton>
        ))}
      </ButtonGroup>

      <Label>검색할 기숙사의 방 타입을 선택하세요.</Label>
      <ButtonGroup>
        {["2인실", "3인실", "4인실"].map((type) => (
          <TypeButton
            key={type}
            selected={selectedRoomType === type}
            onClick={() => setSelectedRoomType(type)}
          >
            {type}
          </TypeButton>
        ))}
      </ButtonGroup>

      <SearchButton
        onClick={isSearchEnabled ? handleSearch : undefined}
        style={{
          backgroundColor: isSearchEnabled ? "#112d4e" : "#DBE2EF",
          cursor: isSearchEnabled ? "pointer" : "default",
        }}
        aria-disabled={!isSearchEnabled}
      >
        검색
      </SearchButton>
    </Wrapper>
  );
}
