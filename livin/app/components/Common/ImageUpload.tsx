'use client';

import { useRef } from 'react';
import styled from 'styled-components';

interface ImageUploadProps {
  imageCount: number;
  maxImages?: number;
  onAddImage: (file: File) => void;
  isAnonymous: boolean;
  onToggleAnonymous: (value: boolean) => void;
  isUploading?: boolean;
}

export default function ImageUpload({
  imageCount,
  maxImages = 5,
  onAddImage,
  isAnonymous,
  onToggleAnonymous,
  isUploading = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하만 업로드 가능합니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      onAddImage(file);
    }
    // input 값 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddImageClick = () => {
    if (imageCount >= maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <>
      <ImageUploadSection>
        <ImageBox>
          <ImagePreview>📷</ImagePreview>
          <ImageCount>{imageCount} / {maxImages}</ImageCount>
        </ImageBox>
        <AddImageBox onClick={handleAddImageClick} disabled={isUploading}>
          <PlusIcon>{isUploading ? '⏳' : '+'}</PlusIcon>
        </AddImageBox>
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
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

const HiddenFileInput = styled.input`
  display: none;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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
