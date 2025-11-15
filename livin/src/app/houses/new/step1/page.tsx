"use client";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 22.5rem;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 1rem; // 좌우 여백 추가
  box-sizing: border-box;
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
  font-weight: 500;
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
  width: 12.625rem;
  gap: 0.3125rem;
  margin-bottom: 1rem;
`;

const ResidenceType = styled.button`
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  border-radius: 1.25rem;
  background: #dbe2ef;
  border: none;
  font-size: 0.75rem;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
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
const ImageUploadBox = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  padding: 2.125rem 2.0625rem;
  border-radius: 0.625rem;
  border: 1px solid #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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
`;

export default function NewHouseStep1() {
  return (
    <Wrapper>
      <ScrollArea>
        <TopBar>
          <BackIcon>
            {/* SVG 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
              <path d="M9 1.22591L7.66147 0L0.37084 6.68119C0.253319 6.78824 0.160052 6.91555 0.0964085 7.05578C0.0327647 7.196 0 7.34638 0 7.49826C0 7.65015 0.0327647 7.80053 0.0964085 7.94075C0.160052 8.08098 0.253319 8.20829 0.37084 8.31534L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z" fill="black"/>
            </svg>
          </BackIcon>
          <Title>건물 등록하기</Title>
        </TopBar>

        <Label>거주 형태<Required>*</Required></Label>
        <ResidenceTypeGroup>
          <ResidenceType>자취방</ResidenceType>
          <ResidenceType>하숙</ResidenceType>
          <ResidenceType>기숙사</ResidenceType>
        </ResidenceTypeGroup>

        <Label>건물 이름<Required>*</Required></Label>
        <InputBox placeholder="건물 이름을 입력해주세요. (ex. 이화빌라)" />

        <Label>주소<Required>*</Required></Label>
        <InputBox placeholder="주소를 검색해주세요." />

        <Label>대표 이미지 설정<Required>*</Required></Label>
        <ImageUploadBox>
          📷
        </ImageUploadBox>
      </ScrollArea>

      <NextButton>다음</NextButton>
    </Wrapper>
  );
}
