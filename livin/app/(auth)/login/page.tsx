'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { loginApi } from '@/apis/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const res = await loginApi(email, password);

      // JWT 토큰이 res.token 으로 오는 경우
      if (res?.token) {
        localStorage.setItem('token', res.token);
      }

      setIsError(false);
      window.location.href = '/';
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>로그인</Title>

        <Form onSubmit={handleLogin}>
          <InputBox>
            <Label>이메일 입력</Label>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요.'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputBox>

          <InputBox>
            <Label>비밀번호 입력</Label>
            <Input
              type='password'
              placeholder='비밀번호 입력'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              $isError={isError}
            />
            {isError && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
          </InputBox>

          <Button type='submit'>로그인</Button>

          <SignupText href='/signup'>회원가입</SignupText>
        </Form>
      </Card>
    </Wrapper>
  );
}

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
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-top: 43px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 100px;
`;

const Label = styled.label`
  color: var(--Black, #33384b);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const InputBox = styled.div`
  gap: 12px;
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

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 4px;
  text-align: left;
  width: 327px;
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
  margin-top: 32px;
`;

const SignupText = styled.a`
  margin-top: 24px;
  text-align: center;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
`;
