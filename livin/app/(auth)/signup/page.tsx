'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Livin_logo from '../../../public/livin_logo.svg';
import Image from 'next/image';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [emailId, setEmailId] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [timer, setTimer] = useState(59);
  const [isError, setIsError] = useState(false); // 인증번호 불일치 여부

  // 인증번호 예시 (백엔드에서 받은 값이라고 가정)
  const correctCode = '1886';

  // 비밀번호 유효성 검사 (영문, 숫자, 특수문자 포함 8자 이상)
  const isValidPassword = (pw: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pw);
  };

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  const handleNext = () => {
    if (step === 1 && (!name || !school || !emailId)) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    if (step === 3 && (password !== confirmPw || !password)) {
      alert('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (step === 2) {
      if (code !== correctCode) {
        setIsError(true);
        return;
      }
      setIsError(false);
    }

    setStep(step + 1);
  };

  const handleRetry = () => {
    setCode('');
    setIsError(false);
    setTimer(59);
  };

  return (
    <Wrapper>
      <Card>
        {/* STEP 1 */}
        {step === 1 && (
          <Step1Box>
            <Title $step={step}>회원가입</Title>
            <InputBox>
              <Label>이름/닉네임 입력</Label>
              <Input
                type='text'
                placeholder='이름'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <Label>학교 선택</Label>
              <Select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              >
                <option value=''>학교명</option>
                <option value='이화여자대학교'>이화여자대학교</option>
              </Select>
            </InputBox>

            <InputBox>
              <Label>학교 메일 인증</Label>
              <EmailBox>
                <EmailInput
                  type='text'
                  placeholder='이메일 입력'
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <EmailDomain>@ewha.ac.kr</EmailDomain>
              </EmailBox>
            </InputBox>

            <Button onClick={handleNext}>인증하기</Button>
          </Step1Box>
        )}

        {/* STEP 2: 인증번호 입력 */}
        {step === 2 && (
          <Step2Box>
            <Title $step={step}>인증번호 입력</Title>
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
            <Button onClick={isError ? handleRetry : handleNext}>
              {isError ? '인증 재시도' : '인증 완료'}
            </Button>
          </Step2Box>
        )}

        {/* STEP 3: 비밀번호 설정 */}
        {step === 3 && (
          <Step3Box>
            <Title $step={step}>회원가입</Title>
            <InputBox>
              <Label>비밀번호 입력</Label>
              <Input
                type='password'
                placeholder='********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $isError={!!password && !isValidPassword(password)} // 조건 불만족 시 빨간 테두리
              />
              {!!password && !isValidPassword(password) && (
                <ErrorText>
                  영어, 숫자, 특수문자를 포함해 8자 이상으로 입력해주세요.
                </ErrorText>
              )}
            </InputBox>
            <InputBox>
              <Label>비밀번호 재입력</Label>
              <Input
                type='password'
                placeholder='********'
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                $isError={!!confirmPw && password !== confirmPw} // 불일치 시 빨간 테두리
              />
              {!!confirmPw && password !== confirmPw && (
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
              )}
            </InputBox>

            <Button onClick={handleNext}>회원가입 완료</Button>
          </Step3Box>
        )}

        {/* STEP 4: 완료 */}
        {step === 4 && (
          <SuccessBox>
            <Logo>
              <Image
                src={Livin_logo}
                alt='Livin 로고'
                width={120}
                height={48}
                priority
              />
            </Logo>
            <p>회원가입이 완료되었습니다!</p>
            <Button onClick={() => (window.location.href = '/login')}>
              로그인
            </Button>
          </SuccessBox>
        )}
      </Card>
    </Wrapper>
  );
}

/* ---------------- styled-components ---------------- */

const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.minHeight};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 50px;
`;

const Card = styled.div`
  width: ${({ theme }) => theme.layout.maxWidth};
  min-height: ${({ theme }) => theme.layout.minHeight};
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.style.shadowMd};
  border-radius: ${({ theme }) => theme.style.radiusBase};
  padding: 50px 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step1Box = styled(StepBox)`
  gap: 16px;
`;
const Step2Box = styled(StepBox)``;
const Step3Box = styled(StepBox)`
  gap: 16px;
`;

const Title = styled.h2<{ $step: number }>`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-top: 43px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ $step }) =>
    $step === 1 ? '100px' : $step === 2 ? '16px' : '100px'};
`;

const InputBox = styled.div`
  gap: 12px;
`;

const Label = styled.label`
  color: var(--Black, #33384b);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
`;

const Input = styled.input<{ $isError?: boolean }>`
  height: 60px;
  width: 327px;
  border-radius: 16px;
  border: 1px solid
    ${({ $isError, theme }) =>
      $isError ? theme.colors.error : 'var(--BG-BG-1, #f4f4f6)'};
  background: var(--Gray-Gray-4, #fafafc);
  padding: 17px 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: #000000;
  &::placeholder {
    color: #b2bcc9;
  }
`;

const Select = styled.select`
  display: flex;
  padding: 17px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: 60px;
  width: 327px;
  border-radius: 16px;
  border: 1px solid var(--BG-BG-1, #f4f4f6);
  background: var(--Gray-Gray-4, #fafafc);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: #000000;
  &::placeholder {
    color: #b2bcc9;
  }
`;

const EmailBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 6px;
`;

const EmailInput = styled.input`
  display: inline-flex;
  width: 190px;
  height: 60px;
  padding: 17px 56px 17px 16px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid var(--BG-BG-1, #f4f4f6);
  background: #fff;
  padding: 0 14px;
  color: #000000;
  &::placeholder {
    color: #b2bcc9;
  }

  /* Body/Regular */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const EmailDomain = styled.div`
  width: 124px;
  display: inline-flex;
  height: 60px;
  padding: 17px 0 17px 16px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid var(--BG-BG-1, #f4f4f6);
  background: var(--Gray-Gray-4, #fafafc);
  color: #7f7f7f;

  /* Body/Regular */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const CodeInformText = styled.p`
  width: 100%;
  color: var(--Black, #33384b);
  text-align: center;

  /* Body/Regular */
  font-family: 'Open Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const CodeInput = styled.input<{ $isError?: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  background: var(--Gray-Gray-4, #fafafc);
  padding: 17px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border: 1.5px solid
    ${({ $isError, theme }) => ($isError ? theme.colors.error : '#2E6FF3')};
  border-radius: 16px;
  margin: 56px 0 6px 0;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  text-align: start;
  outline: none;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-align: left;
`;

const TimerText = styled.p`
  color: var(--Gray-Gray-1, #7d8a95);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  span {
    color: #2e6ff3;
    font-weight: 600;
  }
  margin: 32px 0;
`;

const Button = styled.button`
  width: 327px;
  height: 56px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 15px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  cursor: pointer;
`;

const SuccessBox = styled.div`
  display: inline-flex;
  width: 100%;
  height: 800px;
  padding: 310px 0 381px 0;
  flex-direction: column;
  align-items: center;
  gap: 37px;

  p {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: auto;
`;
