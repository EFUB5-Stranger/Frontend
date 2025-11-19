'use client';

import styled from 'styled-components';

interface ImageUploadProps {
  imageCount: number;
  maxImages?: number;
  onAddImage: () => void;
  isAnonymous: boolean;
  onToggleAnonymous: (value: boolean) => void;
}

export default function ImageUpload({
  imageCount,
  maxImages = 5,
  onAddImage,
  isAnonymous,
  onToggleAnonymous,
}: ImageUploadProps) {
  return (
    <>
      <ImageUploadSection>
        <ImageBox>
          <ImagePreview>📷</ImagePreview>
          <ImageCount>{imageCount} / {maxImages}</ImageCount>
        </ImageBox>
        <AddImageBox onClick={onAddImage}>
          <PlusIcon>+</PlusIcon>
        </AddImageBox>
      </ImageUploadSection>
      <ImageFooter>
        <div></div>
        <CheckboxWrapper>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => onToggleAnonymous(e.target.checked)}
            />
            <CheckIcon $checked={isAnonymous}>✓</CheckIcon>
            익명
          </CheckboxLabel>
        </CheckboxWrapper>
      </ImageFooter>
    </>
  );
}

const ImageUploadSection = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px dashed #d0d0d0;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ImagePreview = styled.div`
  font-size: 24px;
`;

const ImageCount = styled.div`
  font-size: 10px;
  color: #999;
`;

const AddImageBox = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px dashed #d0d0d0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: #f8f8f8;
  }
`;

const PlusIcon = styled.span`
  font-size: 28px;
  color: #999;
`;

const ImageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #000;
  cursor: pointer;
`;

const CheckIcon = styled.span<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked, theme }) => $checked ? theme.colors.primary : '#d0d0d0'};
  background: ${({ $checked, theme }) => $checked ? theme.colors.primary : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ $checked }) => $checked ? '#fff' : 'transparent'};
  transition: all 0.2s;
`;
