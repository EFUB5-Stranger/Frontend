'use client';

import { useRef, useState } from 'react';
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
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);

      onAddImage(file);
    }
    // input 값 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImageClick = () => {
    console.log('Add image button clicked');
    console.log('Image count:', imageCount, 'Max images:', maxImages);
    console.log('File input ref:', fileInputRef.current);
    
    if (imageCount >= maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }
    
    if (fileInputRef.current) {
      console.log('Triggering file input click');
      fileInputRef.current.click();
    } else {
      console.error('File input ref is null');
    }
  };

  return (
    <>
      <ImageUploadSection>
        {previewImages.map((src, index) => (
          <ImagePreviewBox key={index}>
            <PreviewImage src={src} alt={`preview-${index}`} />
            <RemoveButton onClick={() => handleRemoveImage(index)}>×</RemoveButton>
          </ImagePreviewBox>
        ))}
        {imageCount < maxImages && (
          <AddImageBox 
            as="div"
            onClick={handleAddImageClick} 
            style={{ 
              pointerEvents: isUploading ? 'none' : 'auto',
              cursor: isUploading ? 'not-allowed' : 'pointer'
            }}
          >
            <PlusIcon>{isUploading ? '⏳' : '+'}</PlusIcon>
          </AddImageBox>
        )}
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

const ImagePreviewBox = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const AddImageBox = styled.div`
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
  user-select: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: #f8f8f8;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
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
