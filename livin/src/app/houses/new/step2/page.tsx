"use client";
import styled from "styled-components";

// ✅ Wrapper, TopBar, BackIcon, Title, SubmitButton은 이전 페이지와 동일하게 유지
const Wrapper = styled.div`
  max-width: 22.5rem;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
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
`;

export default function NewHouseStep2() {
  return (
    <Wrapper>
      <TopBar>
        <BackIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M9 1.22591L7.66147 0L0.37084 6.68119C0.253319 6.78824 0.160052 6.91555 0.0964085 7.05578C0.0327647 7.196 0 7.34638 0 7.49826C0 7.65015 0.0327647 7.80053 0.0964085 7.94075C0.160052 8.08098 0.253319 8.20829 0.37084 8.31534L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z" fill="black"/>
          </svg>
        </BackIcon>
        <Title>건물 등록하기</Title>
      </TopBar>

      <ScrollArea>
        <Label>층수</Label>
        <InputBox placeholder="건물 층 수를 입력해주세요." />

        <Label>제공 옵션</Label>
        <RadioGroup>
          <RadioOption>
            <input type="radio" name="option" value="wifi" />
            와이파이
          </RadioOption>
          <RadioOption>
            <input type="radio" name="option" value="meal" />
            식사 제공
          </RadioOption>
        </RadioGroup>

        <Label>주차 가능 여부</Label>
        <CheckboxGroup>
          <input type="checkbox" />
          주차 가능
        </CheckboxGroup>
      </ScrollArea>

      <SubmitButton>등록하기</SubmitButton>
    </Wrapper>
  );
}
