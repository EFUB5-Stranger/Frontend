// app/(auth)/signup/components/Step2.tsx

import React from 'react';
import {
  Step2Box,
  Title,
  CodeInformText,
  CodeInput,
  ErrorText,
  TimerText,
  Button,
} from '../Signup.styled';

interface Step2Props {
  emailId: string;
  code: string;
  setCode: (code: string) => void;
  isError: boolean;
  timer: number;
  handleNext: () => Promise<void>;
  handleRetry: () => void;
}

export const Step2 = ({
  emailId,
  code,
  setCode,
  isError,
  timer,
  handleNext,
  handleRetry,
}: Step2Props) => {
  const buttonText = isError ? '인증 재시도' : '인증 완료';
  const handleButtonClick = isError ? handleRetry : handleNext;

  return (
    <Step2Box>
      <Title $step={2}>인증번호 입력</Title>
      <CodeInformText>
        <strong>{emailId}@ewha.ac.kr</strong> 메일로 받은
        <p>인증번호를 입력해주세요.</p>
      </CodeInformText>
      <CodeInput
        type='text'
        placeholder='인증번호 입력'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        $isError={isError}
      />
      {isError && <ErrorText>인증번호가 일치하지 않습니다.</ErrorText>}
      <TimerText>
        We will resend the code in <span>{timer}s</span>
      </TimerText>
      <Button onClick={handleButtonClick}>{buttonText}</Button>
    </Step2Box>
  );
};
