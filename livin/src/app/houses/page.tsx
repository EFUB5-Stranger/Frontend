"use client";

import styled from "styled-components";


const houses = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  type: i % 2 === 0 ? "자취방" : "하숙",
  name: i % 2 === 0 ? `신촌 럭키아파트 ${i + 1}` : `이화 하숙집 ${i + 1}`,
  address: "서울 서대문구 이화여대길 50-12",
  rating: (4 + (i % 5) * 0.2).toFixed(1),
}));

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
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
`;
const SearchBar = styled.input`
  width: 100%;
  height: 2.5625rem;
  padding: 0.9375rem 1.1875rem;
  border-radius: 0.9375rem;
  background: #d9d9d9;
  border: none;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const FilterBar = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  display: flex;
  width: 4.625rem;
  height: 1.5625rem;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  border-radius: 1.25rem;
  border: 1px solid #b6b6b6;
  background: #fff;
  font-size: 0.75rem;
  color: #333;
  cursor: pointer;

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

const Tag = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  padding: 0.3rem 0.5rem; 
  border-radius: 1.25rem;
  background: #fff;
  font-size: 0.625rem; // 약 10px
  font-weight: 500;
  color: #112d4e;
  line-height: 1;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1); // 1px 3px
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
`;

const HouseName = styled.strong`
  color: #000;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.875rem; // 약 14px
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const HouseAddress = styled.span`
  color: #868686;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.625rem; // 약 10px
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HouseRating = styled.span`
  color: #000;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.5625rem; // 약 9px
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: calc(50% - 11.25rem + 1rem); // 화면 중앙 기준으로 우측 정렬
  width: 7.25rem;
  height: 2.625rem;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: #112d4e;
  color: white;
  border: none;
  font-size: 0.875rem;
`;

export default function HousesPage() {
  return (
    <Wrapper>
    <SearchBar placeholder="검색" />
        <FilterBar>
          <FilterButton>최신순</FilterButton>
          <FilterButton>가격</FilterButton>
          <FilterButton>자취방</FilterButton>
          <FilterButton>주소</FilterButton>
        </FilterBar>

      <ScrollArea>
        <CardList>
          {houses.map((house) => (
            <Card key={house.id} href={`/houses/${house.id}`}>
              <CardImage>
                <Tag>{house.type}</Tag>
              </CardImage>
                <CardText>
                <HouseName>{house.name}</HouseName>
                <HouseAddress>{house.address}</HouseAddress>
                <HouseRating>★ {house.rating}</HouseRating>
                </CardText>
            </Card>
          ))}
        </CardList>
      </ScrollArea>
      <FloatingButton>+ 직접 추가</FloatingButton>
    </Wrapper>
  );
}
