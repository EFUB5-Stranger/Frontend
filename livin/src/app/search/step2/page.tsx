"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Range } from "react-range";
import TopBar from "@/components/TopBar"; 

const PRICE_MIN = 30;
const PRICE_MAX = 150;
const RATING_MIN = 0.0;
const RATING_MAX = 5.0;

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

const Section = styled.div`
  margin-bottom: 2rem;
`;

const ValueText = styled.div`
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  color: #7e7e7e;
  text-align: right;
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

export default function SearchStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([50, 120]);
  const [ratingRange, setRatingRange] = useState([1.0, 4.5]);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) setSelected(type);
  }, [searchParams]);

  const isSearchEnabled = !!selected && priceRange.length === 2 && ratingRange.length === 2;

  const handleSearch = () => {
    if (!isSearchEnabled) return;
    alert(
      `검색 조건\n타입: ${selected}\n가격대: ${priceRange[0]} ~ ${priceRange[1]}만원\n별점: ${ratingRange[0].toFixed(1)} ~ ${ratingRange[1].toFixed(1)}점`
    );
  };

  return (
    <Wrapper>
      <TopBar title="검색" showSearch={false} showBack={true} />

      <Label>검색하고자 하는 타입을 선택하세요.</Label>
      <TypeGroup>
        <TypeButton selected={selected === "자취"} onClick={() => setSelected("자취")}>자취</TypeButton>
        <TypeButton selected={selected === "기숙사"} onClick={() => setSelected("기숙사")}>기숙사</TypeButton>
        <TypeButton selected={selected === "하숙"} onClick={() => setSelected("하숙")}>하숙</TypeButton>
      </TypeGroup>

      {selected && (
        <>
          <Section>
            <Label>검색할 방의 가격대를 선택하세요.</Label>
            <Range 
            step={10} 
            min={PRICE_MIN} 
            max={PRICE_MAX} 
            values={priceRange} 
            onChange={(values) => setPriceRange(values)} 
            renderTrack={({ props, children }) => ( 
              <div {...props} 
              style={{ position: "relative", display: "flex", alignItems: "center", height: "4px", width: "100%", background: `linear-gradient( to right, #d9d9d9 ${(priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100}%, #112d4e ${(priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100}%, #112d4e ${(priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100}%, #d9d9d9 ${(priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100}% )`, borderRadius: "2px", marginBottom: "1rem", }} > {children} </div> )} renderThumb={({ props, index }) => { const { key, ...rest } = props; return ( <div key={index} {...rest} style={{ height: "20px", width: "20px", backgroundColor: "#112d4e", borderRadius: "50%", cursor: "pointer", top: "50%", transform: "translateY(-50%)", position: "absolute", marginTop: "-3px", }} /> ); }} /> <ValueText>{priceRange[0]}만원 ~ {priceRange[1]}만원</ValueText>

          </Section>

          <Section>
            <Label>검색할 방의 최소 별점을 선택하세요.</Label>
            <Range step={0.5} min={RATING_MIN} max={RATING_MAX} values={ratingRange} onChange={(values) => setRatingRange(values)} renderTrack={({ props, children }) => ( <div {...props} style={{ position: "relative", display: "flex", alignItems: "center", height: "4px", width: "100%", background: `linear-gradient( to right, #d9d9d9 ${(ratingRange[0] - RATING_MIN) / (RATING_MAX - RATING_MIN) * 100}%, #112d4e ${(ratingRange[0] - RATING_MIN) / (RATING_MAX - RATING_MIN) * 100}%, #112d4e ${(ratingRange[1] - RATING_MIN) / (RATING_MAX - RATING_MIN) * 100}%, #d9d9d9 ${(ratingRange[1] - RATING_MIN) / (RATING_MAX - RATING_MIN) * 100}% )`, borderRadius: "2px", marginBottom: "1rem", }} > {children} </div> )} renderThumb={({ props, index }) => { const { key, ...rest } = props; return ( <div key={index} {...rest} style={{ height: "20px", width: "20px", backgroundColor: "#112d4e", borderRadius: "50%", cursor: "pointer", top: "50%", transform: "translateY(-50%)", position: "absolute", marginTop: "-3px", }} /> ); }} /> <ValueText> {ratingRange[0].toFixed(1)}점 ~ {ratingRange[1].toFixed(1)}점 </ValueText>
          </Section>
        </>
      )}

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
