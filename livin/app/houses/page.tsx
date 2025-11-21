"use client";
import { useState } from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import styles from '@/styles/mapPage.module.css';
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const StyledSelect = styled.select`
  background: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 1.25rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  margin-right: 0.5rem;
  appearance: none;

  &:hover {
    background: #f0f0f0;
  }
`;

interface SelectButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

function SelectButton({ value, onChange, options }: SelectButtonProps) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}

const Wrapper = styled.div`
  max-width: 22.5rem;
  height: 100vh;
  margin: 0 auto;
  background: #fff;
  position: relative;
  overflow: hidden;
  padding-top: 1rem;
`;

const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterBar = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
`;

const FilterButton = styled.button`
  background: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 1.25rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background: #f0f0f0;
  }
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  width: 8.9375rem;
  gap: 0.4375rem;
  text-decoration: none;
  color: #333;
`;

const CardImage = styled.div`
  position: relative;
  height: 8.9375rem;
  padding: 0.375rem 0.6875rem;
  border-radius: 0.9375rem;
  background: #d9d9d9;
`;

const Tag = styled.div<{ type: string }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  padding: 0.3rem 0.5rem;
  border-radius: 1.25rem;
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);

  background: ${({ type }) =>
    type === "자취방" ? "var(--main-pri, #112D4E)" : "var(--main-sec, #DBE2EF)"};
  color: ${({ type }) =>
    type === "자취방" ? "#FFFFFF" : "var(--main-pri, #112D4E)"};
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
`;
const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 13/17;
  stroke-width: 1px;
  stroke: var(--main-pri, #112D4E);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HouseName = styled.strong`
  color: #000;
  font-size: 0.875rem;
  font-weight: 600;
`;

const HouseAddress = styled.span`
  color: #868686;
  font-size: 0.625rem;
`;

const HouseRating = styled.span`
  color: #000;
  font-size: 0.8rem;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: calc(50% - 11.25rem + 1rem);
  width: 7.25rem;
  height: 2.625rem;
  border-radius: 1.25rem;
  background: #112d4e;
  color: white;
  border: none;
  font-size: 0.875rem;
`;

export default function HousesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<"rating" | "bookmark">("rating");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [districtFilter, setDistrictFilter] = useState("전체 주소");
  const [bookmarks, setBookmarks] = useState<{ [key: number]: number }>({});

  const houses = [
    { id: 1, name: "강동 하숙집", address: "서울 강동구", type: "하숙", rating: 4.5, createdAt: "2025-11-01" },
    { id: 2, name: "서대문 자취방", address: "서울 서대문구", type: "자취방", rating: 4.2, createdAt: "2025-10-15" },
    { id: 3, name: "강남 원룸", address: "서울 강남구", type: "자취방", rating: 4.8, createdAt: "2025-11-10" },
  ];
  const toggleBookmark = (id: number) => {
  setBookmarks((prev) => {
    const current = prev[id] || 0;
    return { ...prev, [id]: current === 0 ? 1 : 0 }; 
  });
};

const filteredHouses = houses
  .filter((house) =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.address.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((house) =>
    typeFilter === "전체" ? true : house.type === typeFilter
  )
  .filter((house) =>
    districtFilter === "전체 주소" ? true : house.address.includes(districtFilter)
  )
  .sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating - a.rating;
    } else {
      // 북마크 많은 순
      const aBookmarks = bookmarks[a.id] || 0;
      const bBookmarks = bookmarks[b.id] || 0;
      return bBookmarks - aBookmarks;
    }
  });

const toggleSort = () => {
  setSortOption((prev) => (prev === "rating" ? "bookmark" : "rating"));
};
  return (
    <Wrapper>
      <TopBar
        title="자취방/하숙 목록"
        showSearch={true}
        showBack={true}
        searchPlaceholder="원하는 자취방/하숙을 검색해주세요."
      />

      <FilterBar>
        {/* 정렬 토글 버튼 + SVG */}
        <FilterButton onClick={toggleSort}>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none"
            style={{ width: "10.332px", height: "9px", flexShrink: 0 }}
          >
            <path
              d="M0.840861 8.14629C0.746078 8.05797 0.620713 8.00989 0.491179 8.01218C0.361645 8.01446 0.238055 8.06694 0.146446 8.15855C0.0548378 8.25015 0.00236329 8.37374 7.78183e-05 8.50328C-0.00220765 8.63281 0.0458743 8.75818 0.134194 8.85296L1.46753 10.1863C1.56128 10.2799 1.68836 10.3325 1.82086 10.3325C1.95336 10.3325 2.08044 10.2799 2.17419 10.1863L3.50753 8.85296C3.55665 8.80718 3.59605 8.75198 3.62338 8.69065C3.65071 8.62932 3.6654 8.56311 3.66659 8.49597C3.66777 8.42884 3.65542 8.36215 3.63028 8.29989C3.60513 8.23764 3.5677 8.18108 3.52022 8.1336C3.47274 8.08612 3.41618 8.04869 3.35393 8.02354C3.29167 7.9984 3.22498 7.98605 3.15785 7.98723C3.09071 7.98842 3.0245 8.00311 2.96317 8.03044C2.90184 8.05777 2.84664 8.09717 2.80086 8.14629L2.32086 8.62629L2.32086 1.83296C2.32086 1.70035 2.26818 1.57317 2.17441 1.47941C2.08065 1.38564 1.95347 1.33296 1.82086 1.33296C1.68825 1.33296 1.56108 1.38564 1.46731 1.47941C1.37354 1.57317 1.32086 1.70035 1.32086 1.83296L1.32086 8.62629L0.840861 8.14629ZM5.46753 2.18629C5.56128 2.27993 5.68836 2.33252 5.82086 2.33252C5.95336 2.33252 6.08044 2.27993 6.17419 2.18629L6.65419 1.70629L6.65419 8.49963C6.65419 8.63223 6.70687 8.75941 6.80064 8.85318C6.89441 8.94695 7.02159 8.99963 7.15419 8.99963C7.2868 8.99963 7.41398 8.94695 7.50775 8.85318C7.60152 8.75941 7.65419 8.63223 7.65419 8.49963L7.65419 1.70629L8.13419 2.18629C8.17997 2.23542 8.23517 2.27482 8.2965 2.30215C8.35783 2.32948 8.42404 2.34417 8.49118 2.34535C8.55831 2.34654 8.625 2.33419 8.68726 2.30904C8.74952 2.28389 8.80607 2.24646 8.85355 2.19898C8.90103 2.15151 8.93846 2.09495 8.96361 2.03269C8.98876 1.97043 9.0011 1.90375 8.99992 1.83661C8.99874 1.76948 8.98404 1.70327 8.95671 1.64193C8.92939 1.5806 8.88999 1.5254 8.84086 1.47963L7.50753 0.146292C7.41378 0.0526587 7.28669 6.64387e-05 7.15419 6.64445e-05C7.02169 6.64503e-05 6.89461 0.0526587 6.80086 0.146292L5.46753 1.47963C5.37389 1.57338 5.3213 1.70046 5.3213 1.83296C5.3213 1.96546 5.37389 2.09254 5.46753 2.18629Z"
              fill="black"
            />
          </svg>
          {sortOption === "rating" ? "평점순" : "북마크순"}
        </FilterButton>

        {/* 타입 필터 */}
        <SelectButton
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          
          options={[
            { value: "전체", label: "전체" },
            { value: "자취방", label: "자취방" },
            { value: "하숙", label: "하숙" },
          ]}
          
        />
        

        {/* 주소 필터 */}
        <SelectButton
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          options={[
            { value: "전체 주소", label: "전체 주소" },
            { value: "강남구", label: "강남구" },
            { value: "강동구", label: "강동구" },
            { value: "강북구", label: "강북구" },
            { value: "강서구", label: "강서구" },
            { value: "관악구", label: "관악구" },
            { value: "광진구", label: "광진구" },
            { value: "구로구", label: "구로구" },
            { value: "금천구", label: "금천구" },
            { value: "노원구", label: "노원구" },
            { value: "도봉구", label: "도봉구" },
            { value: "동대문구", label: "동대문구" },
            { value: "동작구", label: "동작구" },
            { value: "마포구", label: "마포구" },
            { value: "서대문구", label: "서대문구" },
            { value: "서초구", label: "서초구" },
            { value: "성동구", label: "성동구" },
            { value: "성북구", label: "성북구" },
            { value: "송파구", label: "송파구" },
            { value: "양천구", label: "양천구" },
            { value: "영등포구", label: "영등포구" },
            { value: "용산구", label: "용산구" },
            { value: "은평구", label: "은평구" },
            { value: "종로구", label: "종로구" },
            { value: "중구", label: "중구" },
            { value: "중랑구", label: "중랑구" },
          ]}
        />
      </FilterBar>

      {/* 리스트 */}
      <ScrollArea>
        <CardList>
          {filteredHouses.map((house) => (
            <Card key={house.id} href={`/houses/${house.id}`}>
              <CardImage>
                <Tag type={house.type}>{house.type}</Tag>
              </CardImage>
              <CardText>
  <TitleRow>
    <HouseName>{house.name}</HouseName>
    <BookmarkButton onClick={(e) => { e.preventDefault(); toggleBookmark(house.id); }}>
                  {bookmarks[house.id] ? (
                    // 북마크 ON (채워진 아이콘)
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
  <path d="M1.85742 0.5H11.1426C11.4997 0.5 11.8444 0.643887 12.0996 0.90332C12.355 1.16311 12.4999 1.51769 12.5 1.88867V16.2363L6.7002 13.708L6.5 13.6211L6.2998 13.708L0.5 16.2363V1.88867C0.500057 1.51769 0.644966 1.16311 0.900391 0.90332C1.15556 0.643887 1.50033 0.5 1.85742 0.5Z" fill="#112D4E" stroke="#112D4E"/>
</svg>
                  ) : (
                    // 북마크 OFF (테두리만)
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
  <path d="M1.85742 0.5H11.1426C11.4997 0.5 11.8444 0.643887 12.0996 0.90332C12.355 1.16311 12.4999 1.51769 12.5 1.88867V16.2363L6.7002 13.708L6.5 13.6211L6.2998 13.708L0.5 16.2363V1.88867C0.500057 1.51769 0.644966 1.16311 0.900391 0.90332C1.15556 0.643887 1.50033 0.5 1.85742 0.5Z" stroke="#112D4E"/>
</svg>
                  )}
                </BookmarkButton>
                </TitleRow>
                <HouseAddress>{house.address}</HouseAddress>
                <HouseRating>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
  <path d="M6.18188 0L7.64123 4.49139H12.3638L8.54315 7.26722L10.0025 11.7586L6.18188 8.98278L2.36128 11.7586L3.82062 7.26722L1.7643e-05 4.49139H4.72254L6.18188 0Z" fill="#F5BF4B"/>
</svg>
                  {house.rating}</HouseRating>
              </CardText>
            </Card>

          ))}
        </CardList>
      </ScrollArea>

      <Link href="/houses/new/step1">
  <FloatingButton>+ 직접 추가</FloatingButton>
</Link>
    </Wrapper>
  );
}