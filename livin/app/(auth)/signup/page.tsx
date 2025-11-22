// app/(auth)/signup/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { signupRequestApi, verifyEmailApi, signupFinalApi } from '@apis/auth';
import axios, { AxiosError } from 'axios';
import { Wrapper, Card } from './Signup.styled';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Success } from './components/Success';

// 상수 정의
const INITIAL_TIMER = 59;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [emailId, setEmailId] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // UI/에러 상태
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [isCodeError, setIsCodeError] = useState(false); // 인증번호 불일치 여부
  const [schoolOpen, setSchoolOpen] = useState(false); // 학교 선택 드롭다운 상태
  const [isNameError, setIsNameError] = useState(false); // 닉네임 중복 에러

  // 닉네임 중복 체크 및 이메일 인증 요청 (Step 1 -> Step 2)
  const sendVerificationEmail = useCallback(async () => {
    if (!name || !school || !emailId) {
      alert('모든 정보를 입력해주세요.');
      return false;
    }

    try {
      // 1) 닉네임 중복 체크 및 인증번호 발송 API 호출
      await signupRequestApi(name, school, emailId);
      setStep(2);
      setTimer(INITIAL_TIMER); // 타이머 초기화 및 시작
      return true;
    } catch (error) {
      const err = error as AxiosError<{ errorCode: string }>;

      // 닉네임 중복 처리
      if (
        err.response?.status === 409 &&
        err.response?.data?.errorCode === 'NICKNAME_DUPLICATED'
      ) {
        setIsNameError(true);
        return false;
      }

      alert('이메일 전송 또는 요청 처리에 문제가 발생했습니다.');
      console.error(err);
      return false;
    }
  }, [name, school, emailId]);

  // 이메일 인증번호 재시도
  const handleRetry = () => {
    setCode('');
    setIsCodeError(false);
    sendVerificationEmail(); // 인증 이메일 재발송
  };

  // 타이머 useEffect (Step 2에서만 동작)
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  // 다음 스텝으로 이동
  const handleNext = async () => {
    // STEP 1: 닉네임, 학교, 이메일 입력 및 인증 요청
    if (step === 1) {
      await sendVerificationEmail();
    }

    // STEP 2: 인증번호 입력 및 확인
    if (step === 2) {
      try {
        await verifyEmailApi(emailId, code);
        setIsCodeError(false);
        setStep(3);
      } catch (err) {
        setIsCodeError(true);
      }
    }

    // STEP 3: 비밀번호 설정 및 최종 회원가입
    if (step === 3) {
      // 비밀번호 유효성 검사는 Step3 컴포넌트 내 `isValidPassword`에서 처리됨.
      // 여기서는 최종 불일치 여부만 체크.
      if (password !== confirmPw || !password) {
        alert('비밀번호를 다시 확인해주세요.');
        return;
      }

      try {
        await signupFinalApi(emailId, password);
        setStep(4);
      } catch (err) {
        alert('회원가입 처리에 실패했습니다.');
      }
    }
  };

  // 현재 스텝에 맞는 컴포넌트 렌더링
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            name={name}
            setName={setName}
            isNameError={isNameError}
            setIsNameError={setIsNameError}
            school={school}
            setSchool={setSchool}
            schoolOpen={schoolOpen}
            setSchoolOpen={setSchoolOpen}
            emailId={emailId}
            setEmailId={setEmailId}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2
            emailId={emailId}
            code={code}
            setCode={setCode}
            isError={isCodeError}
            timer={timer}
            handleNext={handleNext}
            handleRetry={handleRetry}
          />
        );
      case 3:
        return (
          <Step3
            password={password}
            setPassword={setPassword}
            confirmPw={confirmPw}
            setConfirmPw={setConfirmPw}
            handleNext={handleNext}
          />
        );
      case 4:
        return <Success />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Card>{renderStep()}</Card>
    </Wrapper>
  );
}
