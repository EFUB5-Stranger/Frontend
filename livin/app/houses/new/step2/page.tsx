'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useState } from 'react';
import axiosInstance from '@apis/axiosInstance';
import Image from 'next/image';

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 20px 0;
  display: flex;
  flex-direction: column;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;

  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 31px; /* 각 그룹 사이의 간격 */
`;

const Label = styled.label`
  color: #000;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 0.5rem 0.875rem;
  border-radius: 0.9375rem;
  border: 1px solid #b6b6b6;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
`;

const OptionButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  width: 80px;
  height: 35px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;

  /* 기본 테두리 색상 */
  border: 0.5px solid #112d4e;

  background: ${({ $isActive }) => ($isActive ? '#112d4e' : '#fff')};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#000')};

  font-family: 'Pretendard', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap; /* 줄바꿈 허용 */
`;

const RadioOption = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  color: ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#000')};

  cursor: pointer;

  /* 체크박스 숨기기 */
  input[type='checkbox'] {
    display: none;
  }

  /* 커스텀 박스 */
  .box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1.5px solid
      ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#b6b6b6')};
    background: ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : '#fff'};
    transition: 0.2s ease;
    position: relative;
  }

  .box::after {
    content: '✔';
    position: absolute;
    font-size: 12px;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: 0.15s ease;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Pretendard', sans-serif;
  color: #000;
`;

const CustomCheck = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-size: 0.875rem;
  color: ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#000')};

  input {
    display: none;
  }

  .box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1.5px solid
      ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#b6b6b6')};
    background: ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : '#fff'};
    position: relative;
    transition: 0.2s ease;
  }

  .box::after {
    content: '✔';
    position: absolute;
    font-size: 12px;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: 0.15s ease;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  width: 320px;
  height: 50px;
  padding: 4px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  color: #fff;
  font-family: 'Pretendard';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

export default function NewHouseStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const buildingName = searchParams.get('buildingName');
  const address = searchParams.get('address');
  const imageUrl = searchParams.get('image');
  const [floor, setFloor] = useState<number | null>(null);
  const [parking, setParking] = useState<boolean | null>(null);
  const [elevator, setElevator] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customOption, setCustomOption] = useState('');
  const toggleOption = (opt: string) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };
  const handleSubmit = async () => {
    try {
      const body = {
        type,
        buildingName,
        address,
        floor,
        parking,
        elevator,
        options: selectedOptions.includes('직접입력')
          ? [...selectedOptions.filter((o) => o !== '직접입력'), customOption]
          : selectedOptions,
        imageUrl,
      };
      await axiosInstance.post('/house/new', body);

      alert('새로운 건물 정보 등록에 성공했습니다!');
      router.push('/houses');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.back()}>
          <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
        </BackBtn>
        <Title>건물 등록하기</Title>
      </Header>

      <ScrollArea>
        <FormGroup>
          <Label>층수</Label>
          <InputBox
            type='number'
            placeholder='건물 층 수를 입력해주세요.'
            value={floor ?? ''}
            onChange={(e) => setFloor(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>제공 옵션</Label>
          <RadioGroup>
            {['냉장고', '에어컨', '세탁기', '직접입력'].map((opt) => (
              <RadioOption
                key={opt}
                $checked={selectedOptions.includes(opt)}
                style={
                  opt === '직접입력'
                    ? { flexBasis: '100%', marginTop: '5px' }
                    : {}
                }
              >
                <input
                  type='checkbox'
                  value={opt}
                  checked={selectedOptions.includes(opt)}
                  onChange={() => toggleOption(opt)}
                />
                <div className='box' />
                {opt}
              </RadioOption>
            ))}
          </RadioGroup>
          {selectedOptions.includes('직접입력') && (
            <InputBox
              placeholder='옵션을 직접 입력해주세요.'
              value={customOption}
              onChange={(e) => setCustomOption(e.target.value)}
            />
          )}
        </FormGroup>
        <FormGroup>
          <Label>주차 가능 여부</Label>
          <CheckboxGroup>
            <OptionButton
              $isActive={parking === true}
              onClick={() => setParking(true)}
            >
              가능
            </OptionButton>

            <OptionButton
              $isActive={parking === false}
              onClick={() => setParking(false)}
            >
              불가능
            </OptionButton>
          </CheckboxGroup>
        </FormGroup>
        <CustomCheck $checked={elevator}>
          <input
            type='checkbox'
            checked={elevator}
            onChange={(e) => setElevator(e.target.checked)}
          />
          <div className='box' />
          엘리베이터 있음
        </CustomCheck>
      </ScrollArea>

      <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
    </Wrapper>
  );
}
