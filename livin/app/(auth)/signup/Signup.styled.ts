// Signup.styled.ts

import styled from 'styled-components';

/* ---------------- Layout & Wrapper Components ---------------- */

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.minHeight};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 50px;
`;

export const Card = styled.div`
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

export const StepBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Step1Box = styled(StepBox)`
  gap: 16px;
`;
export const Step2Box = styled(StepBox)``;
export const Step3Box = styled(StepBox)`
  gap: 16px;
`;

export const Title = styled.h2<{ $step: number }>`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-top: 43px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ $step }) =>
    $step === 1 ? '100px' : $step === 2 ? '16px' : '100px'};
`;

/* ---------------- Input & Form Components ---------------- */

export const InputBox = styled.div`
  gap: 12px;
`;

export const Label = styled.label`
  color: var(--Black, #33384b);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
`;

export const Input = styled.input<{ $isError?: boolean }>`
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

  &:focus {
    outline: none;
    border-color: #f4f4f6;
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-align: left;
`;

/* ---------------- School Select Components ---------------- */

export const SelectWrapper = styled.div`
  position: relative;
  width: 327px;
  font-weight: 400;
  line-height: 160%;
  background: var(--Gray-Gray-4, #fafafc);
`;

export const SelectButton = styled.button<{ $open?: boolean }>`
  width: 100%;
  border: 1px solid var(--BG-BG-1, #f4f4f6);
  border-radius: 16px;
  padding: 16px;
  font-size: 16px;
  background: var(--Gray-Gray-4, #fafafc);
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;

  &:hover {
    background: #fefaff;
  }
`;

export const Arrow = styled.span<{ $open?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 12px;
  color: #b2bcc9;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center;
`;

export const SelectList = styled.ul`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  list-style: none;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 16px;
  margin: 6px 0 0 0;
  padding: 6px 0;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  z-index: 10;
  animation: fadeIn 0.15s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ListItem = styled.li`
  font-size: 15px;
  padding: 10px 16px;
  margin: 2px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
  color: #333;

  &:hover {
    background: #eeeeee;
  }
`;

/* ---------------- Email/Code Components (Step 1 & 2) ---------------- */

export const EmailBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 6px;
`;

export const EmailInput = styled.input`
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
  &:focus {
    outline: none;
    border-color: #f4f4f6;
  }

  /* Body/Regular */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

export const EmailDomain = styled.div`
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

export const CodeInformText = styled.p`
  width: 100%;
  color: var(--Black, #33384b);
  text-align: center;

  /* Body/Regular */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

export const CodeInput = styled.input<{ $isError?: boolean }>`
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

export const TimerText = styled.p`
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

export const Button = styled.button`
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

/* ---------------- Success Step Components (Step 4) ---------------- */

export const SuccessBox = styled.div`
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

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: auto;
`;
