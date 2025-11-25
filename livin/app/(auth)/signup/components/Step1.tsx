// app/(auth)/signup/components/Step1.tsx

import React, { useState, useEffect } from 'react';
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
  emailDomain: string;
  setEmailDomain: (domain: string) => void;
  handleNext: () => Promise<void>;
}

const schoolList = ['이화여자대학교', '연세대학교'];

const SCHOOL_DOMAINS: Record<string, string[]> = {
  이화여자대학교: ['ewha.ac.kr', 'ewhain.net'],
  연세대학교: ['yonsei.ac.kr'],
};

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
  emailDomain,
  setEmailDomain,
  handleNext,
}: Step1Props) => {
  // 도메인 드롭다운 상태 관리
  const [domainOpen, setDomainOpen] = useState(false);

  // 선택된 학교에 따른 도메인 리스트 가져오기
  const availableDomains = school ? SCHOOL_DOMAINS[school] || [] : [];

  // 학교가 변경되면 도메인 초기화
  useEffect(() => {
    setEmailDomain('');
  }, [school, setEmailDomain]);

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
          <div style={{ position: 'relative' }}>
            <EmailDomain
              onClick={() => {
                if (availableDomains.length > 0) {
                  setDomainOpen(!domainOpen);
                } else {
                  alert('먼저 학교를 선택해주세요.');
                }
              }}
              style={{
                cursor: availableDomains.length > 0 ? 'pointer' : 'default',
                color: emailDomain ? '#000' : '#7f7f7f', // 선택되면 검은색, 아니면 회색
                display: 'flex',
                justifyContent: 'space-between', // 텍스트와 화살표(만약 넣는다면) 배치
                position: 'relative',
              }}
            >
              {emailDomain ? `@${emailDomain}` : '@'}

              {availableDomains.length > 0 && (
                <Arrow $open={domainOpen} style={{ marginLeft: '8px' }}>
                  <Image src={ShowMoreIcon} alt='arrow' priority />
                </Arrow>
              )}
            </EmailDomain>

            {/* 도메인 드롭다운 리스트 */}
            {domainOpen && availableDomains.length > 0 && (
              <SelectList style={{ width: '100%', top: '65px', zIndex: 20 }}>
                {availableDomains.map((domain) => (
                  <ListItem
                    key={domain}
                    onClick={() => {
                      setEmailDomain(domain);
                      setDomainOpen(false);
                    }}
                  >
                    @{domain}
                  </ListItem>
                ))}
              </SelectList>
            )}
          </div>
        </EmailBox>
      </InputBox>

      <Button onClick={handleNext}>인증하기</Button>
    </Step1Box>
  );
};
