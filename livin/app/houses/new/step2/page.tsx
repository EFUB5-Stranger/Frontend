"use client";
import { useRouter ,useSearchParams} from "next/navigation";
import styled from "styled-components";
import { useState } from "react";
import axiosInstance from "@apis/axiosInstance";

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 20px 0;
  display: flex;
  flex-direction: column;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 1.5rem;
  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBar = styled.div`
  position: relative;
  width: 100%;
  padding: 1.25rem 0 1rem;
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

const Label = styled.label`
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: #000;
  line-height: 1.4rem;
  margin-bottom: 0.25rem;
  display: block;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 0.5rem 0.875rem;
  border-radius: 0.9375rem;
  border: 1px solid #b6b6b6;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  margin-bottom: 1rem;
  box-sizing: border-box;
   cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  color: #000;
  
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  color: #000;
`;

const SubmitButton = styled.button`
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

export default function NewHouseStep2() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const buildingName = searchParams.get("buildingName");
    const address = searchParams.get("address");
    const imageUrl = searchParams.get("image");
    const [floor, setFloor] = useState<number | null>(null);
    const [parking, setParking] = useState<boolean | null>(null);
    const [elevator, setElevator] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [customOption, setCustomOption] = useState("");
    const toggleOption = (opt: string) => {
      if (selectedOptions.includes(opt)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== opt));
      } else {
        setSelectedOptions([...selectedOptions, opt]);
      }
    };
    const handleSubmit = async () => {
      try {
        const body = {
          type,
          buildingName,
          address,
          floor,
          parking,
          elevator,
          options: selectedOptions.includes("직접입력")
            ? [...selectedOptions.filter((o) => o !== "직접입력"), customOption]
            : selectedOptions,
          imageUrl,
        };
         await axiosInstance.post("/houses/new", body);
        alert("새로운 건물 정보 등록에 성공했습니다!");
        router.push("/houses"); 
      }catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
      };
  return (
    <Wrapper>
      <TopBar>
        <BackIcon onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M9 1.22591L7.66147 0L0.37084 6.68119C0.253319 6.78824 0.160052 6.91555 0.0964085 7.05578C0.0327647 7.196 0 7.34638 0 7.49826C0 7.65015 0.0327647 7.80053 0.0964085 7.94075C0.160052 8.08098 0.253319 8.20829 0.37084 8.31534L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z" fill="black"/>
          </svg>
        </BackIcon>
        <Title>건물 등록하기</Title>
      </TopBar>

      <ScrollArea>
        <Label>층수</Label>
        <InputBox
          type="number"
          placeholder="건물 층 수를 입력해주세요."
          value={floor ?? ""}
          onChange={(e) => setFloor(Number(e.target.value))}
        />

        <Label>제공 옵션</Label>
        <RadioGroup>
        {["냉장고", "에어컨", "세탁기", "직접입력"].map((opt) => (
          <RadioOption key={opt}>
            <input
              type="checkbox"
              name="options"
              value={opt}
              checked={selectedOptions.includes(opt)}
              onChange={() => toggleOption(opt)}
            />
            {opt}
          </RadioOption>
        ))}
      </RadioGroup>

      {selectedOptions.includes("직접입력") && (
        <InputBox
          placeholder="옵션을 직접 입력해주세요."
          value={customOption}
          onChange={(e) => setCustomOption(e.target.value)}
        />
      )}

        <Label>주차 가능 여부</Label>
        <CheckboxGroup>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: parking === true ? "2px solid #112d4e" : "1px solid #ccc",
              background: parking === true ? "#112d4e" : "transparent",
              color: parking === true ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => setParking(true)}
          >
            가능
          </button>

          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: parking === false ? "2px solid #112d4e" : "1px solid #ccc",
              background: parking === false ? "#112d4e" : "transparent",
              color: parking === false ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => setParking(false)}
          >
            불가능
          </button>
        </CheckboxGroup>
        <CheckboxGroup>
          <input
            type="checkbox"
            checked={elevator}
            onChange={(e) => setElevator(e.target.checked)}
          />
          엘리베이터 있음
        </CheckboxGroup>
        
      </ScrollArea>

      <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
    </Wrapper>
  );
}
