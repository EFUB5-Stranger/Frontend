"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useState } from "react";
interface ResidenceTypeProps {
  $isSelected?: boolean;
}

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
  padding: 1rem;
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
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 1rem;
  width: 0.5625rem;
  height: 0.9375rem;
  display: flex;
  align-items: center;
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

const Required = styled.span`
  color: #fb0000;
  margin-left: 0.25rem;
`;

const ResidenceTypeGroup = styled.div`
  display: flex;
  
  gap: 0.3125rem;
  margin-bottom: 1rem;
`;

const ResidenceType = styled.button<ResidenceTypeProps>`
  width:flex;
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  border-radius: 1.25rem;
  background-color: ${({ $isSelected }) => ($isSelected ? "#112D4E" : "transparent")};
  color: ${({ $isSelected }) => ($isSelected ? "#FFFFFF" : "#333")};
  border: 1px solid ${({ $isSelected }) => ($isSelected ? "#112D4E" : "#d9d9d9")};
  font-size: 0.75rem;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  &:hover {
    border-color: #112D4E;
  }
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
`;
const ImageUploadBox = styled.label`
  width: 5.5rem;
  height: 5.5rem;
  padding: 2.125rem 2.0625rem;
  border-radius: 0.625rem;
  border: 1px solid #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
   cursor: pointer;
   overflow: hidden;
  svg {
    width: 40px;
    height: 40px;
    fill: #7d7d7d;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const NextButton = styled.button`
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
const InfoWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;      
  font-size: 0.9rem;
  line-height: 22px;
  letter-spacing: 0;
  color: #000;
`;

const InfoDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;       
  font-size: 0.65rem;
  line-height: 22px;
  letter-spacing: 0;
  color: #555;           
`;

export default function NewHouseStep1() {
  const router = useRouter();
  const [selectedResidence, setSelectedResidence] = useState<"PRIVATE" | "BOARDING" | "DORM" | null>(null);
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleResidenceSelect = (type: string) => {
    if (type === "자취방") setSelectedResidence("PRIVATE");
    else if (type === "하숙") setSelectedResidence("BOARDING");
    else if (type === "기숙사") setSelectedResidence("DORM");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleNext = () => {
    router.push("/houses/new/step2");
  };
  return (
    <Wrapper>
      <ScrollArea>
        <TopBar>
          <BackIcon onClick={() => router.back()}>
            {/* SVG 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
              <path d="M9 1.22591L7.66147 0L0.37084 6.68119C0.253319 6.78824 0.160052 6.91555 0.0964085 7.05578C0.0327647 7.196 0 7.34638 0 7.49826C0 7.65015 0.0327647 7.80053 0.0964085 7.94075C0.160052 8.08098 0.253319 8.20829 0.37084 8.31534L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z" fill="black"/>
            </svg>
          </BackIcon>
          <Title>건물 등록하기</Title>
        </TopBar>
        <InfoWrapper>
          <InfoTitle>정보를 직접 등록해보세요.</InfoTitle>
          <InfoDescription>
            후기를 남길 건물이 없다면, 새로운 건물을 추가할 수 있어요.
          </InfoDescription>
        </InfoWrapper>
        <Label>거주 형태<Required>*</Required></Label>
        <ResidenceTypeGroup>
        <ResidenceType
          $isSelected={selectedResidence === "PRIVATE"}
          onClick={() => handleResidenceSelect("자취방")}
        >
          자취방
        </ResidenceType>

        <ResidenceType
          $isSelected={selectedResidence === "BOARDING"}
          onClick={() => handleResidenceSelect("하숙")}
        >
          하숙
        </ResidenceType>

        <ResidenceType
          $isSelected={selectedResidence === "DORM"}
          onClick={() => handleResidenceSelect("기숙사")}
        >
          기숙사          </ResidenceType>
        </ResidenceTypeGroup>

        <Label>건물 이름<Required>*</Required></Label>
        <InputBox
          placeholder="건물 이름을 입력해주세요. (ex. 이화빌라)"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
        />
        <Label>주소<Required>*</Required></Label>
        <InputBox
          placeholder="주소를 검색해주세요."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Label>대표 이미지 설정<Required>*</Required></Label>
        <ImageUploadBox>
          {preview ? (
        <PreviewImage src={preview} alt="preview" />
      ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
            <path d="M11.1664 7.81641C9.35071 7.81641 7.81641 9.35071 7.81641 11.1664C7.81641 12.9821 9.35071 14.5164 11.1664 14.5164C12.9821 14.5164 14.5164 12.9821 14.5164 11.1664C14.5164 9.35071 12.9821 7.81641 11.1664 7.81641Z" fill="#7D7D7D"/>
            <path d="M20.1 3.35H17.2123L14.1895 0.327183C13.9801 0.117753 13.6961 6.32451e-05 13.4 0H8.93333C8.6372 6.32451e-05 8.35322 0.117753 8.14385 0.327183L5.12103 3.35H2.23333C1.00165 3.35 0 4.35165 0 5.58333V17.8667C0 19.0984 1.00165 20.1 2.23333 20.1H20.1C21.3317 20.1 22.3333 19.0984 22.3333 17.8667V5.58333C22.3333 4.35165 21.3317 3.35 20.1 3.35ZM11.1667 16.75C8.1405 16.75 5.58333 14.1928 5.58333 11.1667C5.58333 8.1405 8.1405 5.58333 11.1667 5.58333C14.1928 5.58333 16.75 8.1405 16.75 11.1667C16.75 14.1928 14.1928 16.75 11.1667 16.75Z" fill="#7D7D7D"/>
          </svg>)}
          <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
        </ImageUploadBox>
      </ScrollArea>

      <NextButton
        onClick={() =>
          router.push(`/houses/new/step2?type=${selectedResidence}&buildingName=${buildingName}&address=${address}`)
        }
      >
        다음
      </NextButton>
    </Wrapper>
  );
}
