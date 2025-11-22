// app/(auth)/signup/components/Step1.tsx

import React from 'react';
import Image from 'next/image';
import ShowMoreIcon from '../../../../public/showmore.svg';
import {
  Step1Box,
  Title,
  InputBox,
  Label,
  Input,
  ErrorText,
  SelectWrapper,
  SelectButton,
  Arrow,
  SelectList,
  ListItem,
  EmailBox,
  EmailInput,
  EmailDomain,
  Button,
} from '../Signup.styled';

interface Step1Props {
  name: string;
  setName: (name: string) => void;
  isNameError: boolean;
  setIsNameError: (isError: boolean) => void;
  school: string;
  setSchool: (school: string) => void;
  schoolOpen: boolean;
  setSchoolOpen: (open: boolean) => void;
  emailId: string;
  setEmailId: (emailId: string) => void;
  handleNext: () => Promise<void>;
}

const schoolList = ['이화여자대학교']; // 실제로는 API 또는 별도 파일에서 관리

export const Step1 = ({
  name,
  setName,
  isNameError,
  setIsNameError,
  school,
  setSchool,
  schoolOpen,
  setSchoolOpen,
  emailId,
  setEmailId,
  handleNext,
}: Step1Props) => {
  return (
    <Step1Box>
      <Title $step={1}>회원가입</Title>
      <InputBox>
        <Label>닉네임 입력</Label>
        <Input
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIsNameError(false);
          }}
          $isError={isNameError}
        />
        {isNameError && <ErrorText>중복되는 닉네임입니다.</ErrorText>}
      </InputBox>
      <InputBox>
        <Label>학교 선택</Label>
        <SelectWrapper>
          <SelectButton onClick={() => setSchoolOpen(!schoolOpen)}>
            {school || '학교명'}
            <Arrow $open={schoolOpen}>
              <Image src={ShowMoreIcon} alt='arrow' priority />
            </Arrow>
          </SelectButton>

          {schoolOpen && (
            <SelectList>
              {schoolList.map((uni) => (
                <ListItem
                  key={uni}
                  onClick={() => {
                    setSchool(uni);
                    setSchoolOpen(false);
                  }}
                >
                  {uni}
                </ListItem>
              ))}
            </SelectList>
          )}
        </SelectWrapper>
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
  );
};
