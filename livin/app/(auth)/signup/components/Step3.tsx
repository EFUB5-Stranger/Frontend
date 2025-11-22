// app/(auth)/signup/components/Step3.tsx

import React from 'react';
import {
  Step3Box,
  Title,
  InputBox,
  Label,
  Input,
  ErrorText,
  Button,
} from '../Signup.styled';

interface Step3Props {
  password: string;
  setPassword: (password: string) => void;
  confirmPw: string;
  setConfirmPw: (confirmPw: string) => void;
  handleNext: () => Promise<void>;
}

// 비밀번호 유효성 검사 (영문, 숫자, 특수문자 포함 8자 이상)
const isValidPassword = (pw: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(pw);
};

export const Step3 = ({
  password,
  setPassword,
  confirmPw,
  setConfirmPw,
  handleNext,
}: Step3Props) => {
  const isInvalidPassword = !!password && !isValidPassword(password);
  const isPwMismatch = !!confirmPw && password !== confirmPw;

  return (
    <Step3Box>
      <Title $step={3}>회원가입</Title>
      <InputBox>
        <Label>비밀번호 입력</Label>
        <Input
          type='password'
          placeholder='비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $isError={isInvalidPassword}
        />
        {isInvalidPassword && (
          <ErrorText>
            영어, 숫자, 특수문자를 포함해 8자 이상으로 입력해주세요.
          </ErrorText>
        )}
      </InputBox>
      <InputBox>
        <Label>비밀번호 재입력</Label>
        <Input
          type='password'
          placeholder='비밀번호 재입력'
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          $isError={isPwMismatch}
        />
        {isPwMismatch && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
      </InputBox>

      <Button onClick={handleNext}>회원가입 완료</Button>
    </Step3Box>
  );
};
