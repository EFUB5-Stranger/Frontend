'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
interface ResidenceTypeProps {
  $isSelected?: boolean;
}

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

const InfoWrapper = styled.div`
  text-align: left;
  margin: 43px 0 29px 0;
`;

const InfoTitle = styled.p`
  color: #000;
  font-family: 'Pretendard';
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

const InfoDescription = styled.p`
  color: #6e6e6e;
  font-family: 'Pretendard';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
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

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 0.25rem;
`;

const ResidenceTypeGroup = styled.div`
  display: flex;
  gap: 0.3125rem;
`;

const ResidenceType = styled.button<ResidenceTypeProps>`
  width: flex;
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  border-radius: 1.25rem;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#112D4E' : 'transparent'};
  color: ${({ $isSelected }) => ($isSelected ? '#FFFFFF' : '#333')};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? '#112D4E' : '#d9d9d9')};
  font-size: 0.75rem;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  &:hover {
    border-color: #112d4e;
  }
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
const ImageUploadBox = styled.label`
  width: 5.5rem;
  height: 5.5rem;
  padding: 2.125rem 2.0625rem;
  border-radius: 0.625rem;
  border: 1px solid #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
  overflow: hidden;
  svg {
    width: 40px;
    height: 40px;
    fill: #7d7d7d;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const NextButton = styled.button`
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

export default function NewHouseStep1() {
  const router = useRouter();
  const [selectedResidence, setSelectedResidence] = useState<
    'PRIVATE' | 'BOARDING' | 'DORM' | null
  >(null);
  const [buildingName, setBuildingName] = useState('');
  const [address, setAddress] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleResidenceSelect = (type: string) => {
    if (type === '자취방') setSelectedResidence('PRIVATE');
    else if (type === '하숙') setSelectedResidence('BOARDING');
    else if (type === '기숙사') setSelectedResidence('DORM');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    router.push('/houses/new/step2');
  };

  return (
    <Wrapper>
      <ScrollArea>
        <Header>
          <BackBtn onClick={() => history.back()}>
            <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
          </BackBtn>
          <Title>건물 등록하기</Title>
        </Header>
        <InfoWrapper>
          <InfoTitle>정보를 직접 등록해보세요.</InfoTitle>
          <InfoDescription>
            후기를 남길 건물이 없다면, 새로운 건물을 추가할 수 있어요.
          </InfoDescription>
        </InfoWrapper>
        <FormGroup>
          <Label>
            거주 형태<Required>*</Required>
          </Label>
          <ResidenceTypeGroup>
            <ResidenceType
              $isSelected={selectedResidence === 'PRIVATE'}
              onClick={() => handleResidenceSelect('자취방')}
            >
              자취방
            </ResidenceType>

            <ResidenceType
              $isSelected={selectedResidence === 'BOARDING'}
              onClick={() => handleResidenceSelect('하숙')}
            >
              하숙
            </ResidenceType>
          </ResidenceTypeGroup>
        </FormGroup>

        <FormGroup>
          <Label>
            건물 이름<Required>*</Required>
          </Label>
          <InputBox
            placeholder='건물 이름을 입력해주세요. (ex. 이화빌라)'
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            주소<Required>*</Required>
          </Label>
          <InputBox
            placeholder='주소를 검색해주세요.'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            대표 이미지 설정<Required>*</Required>
          </Label>
          <ImageUploadBox>
            {preview ? (
              <PreviewImage src={preview} alt='preview' />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='23'
                height='21'
                viewBox='0 0 23 21'
                fill='none'
              >
                {/* SVG path 생략 (기존과 동일) */}
                <path
                  d='M11.1664 7.81641C9.35071 7.81641 7.81641 9.35071 7.81641 11.1664C7.81641 12.9821 9.35071 14.5164 11.1664 14.5164C12.9821 14.5164 14.5164 12.9821 14.5164 11.1664C14.5164 9.35071 12.9821 7.81641 11.1664 7.81641Z'
                  fill='#7D7D7D'
                />
                <path
                  d='M20.1 3.35H17.2123L14.1895 0.327183C13.9801 0.117753 13.6961 6.32451e-05 13.4 0H8.93333C8.6372 6.32451e-05 8.35322 0.117753 8.14385 0.327183L5.12103 3.35H2.23333C1.00165 3.35 0 4.35165 0 5.58333V17.8667C0 19.0984 1.00165 20.1 2.23333 20.1H20.1C21.3317 20.1 22.3333 19.0984 22.3333 17.8667V5.58333C22.3333 4.35165 21.3317 3.35 20.1 3.35ZM11.1667 16.75C8.1405 16.75 5.58333 14.1928 5.58333 11.1667C5.58333 8.1405 8.1405 5.58333 11.1667 5.58333C14.1928 5.58333 16.75 8.1405 16.75 11.1667C16.75 14.1928 14.1928 16.75 11.1667 16.75Z'
                  fill='#7D7D7D'
                />
              </svg>
            )}
            <HiddenInput
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
          </ImageUploadBox>
        </FormGroup>
      </ScrollArea>

      <NextButton
        onClick={() =>
          router.push(
            `/houses/new/step2?type=${selectedResidence}&buildingName=${buildingName}&address=${address}`
          )
        }
      >
        다음
      </NextButton>
    </Wrapper>
  );
}
