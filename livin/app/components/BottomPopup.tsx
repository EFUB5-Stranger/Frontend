'use client';
import { useRef, useEffect,useState } from 'react';
import { useMapContext } from 'hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
import Image from 'next/image';
import { useBookmarkStore } from '@/stores/useBookmarkStore';

interface BottomPopupProps {
  onHeightChange?: (height: number) => void;
}

export default function BottomPopup({ onHeightChange }: BottomPopupProps) {
  const { selectedBuilding } = useMapContext();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) =>
    selectedBuilding ? state.isBookmarked(String(selectedBuilding.houseId)) : false
  );
  const mapBuildingTypeToTag = (type: 'PRIVATE' | 'BOARDING'): '자취방' | '하숙집' => {
  return type === 'PRIVATE' ? '자취방' : '하숙집';
};

  // 선택된 건물이 있을 때: popup 높이를 전달
  useEffect(() => {
    if (selectedBuilding && popupRef.current && onHeightChange) {
      onHeightChange(popupRef.current.offsetHeight);
    }
  }, [selectedBuilding, onHeightChange]);

  // 선택된 건물이 없을 때: 높이를 0으로 전달
  useEffect(() => {
    if (!selectedBuilding && onHeightChange) {
      onHeightChange(0);
    }
  }, [selectedBuilding, onHeightChange]);

  if (!selectedBuilding) {
    return null;
  }

  return (
    <div ref={popupRef} className={styles.bottomPopup}>
      {/* 윗줄: 이미지 + 건물정보 + 북마크 */}
      <div className={styles.topRow}>
        <img
          src={selectedBuilding.thumbnailUrl || '/default.png'}
          alt={selectedBuilding.buildingName}
          className={styles.buildingImg}
        />
        <div className={styles.buildingInfo}>
          <h2 className={styles.buildingName}>{selectedBuilding.buildingName}</h2>
          <p className={styles.buildingAddress}>{selectedBuilding.address}</p>
          <p className={styles.buildingRating}>⭐ {selectedBuilding.reviewScore || '평점 없음'}</p>
        </div>
        
        <Image
          src={isBookmarked ? '/bookmark_filled.svg' : '/bookmark_unfilled.svg'}
          width={20}
          height={24}
          alt="bookmark"
          className={styles.bookmarkIcon}
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark({
              id: String(selectedBuilding.houseId), 
              type: mapBuildingTypeToTag(selectedBuilding.type), // 'PRIVATE' → '자취방' 변환
              title: selectedBuilding.buildingName, // buildingName 사용
              address: selectedBuilding.address,
              rate: selectedBuilding.reviewScore ?? 0, // reviewScore 사용
            });

          }}
        /> 
      </div>

      {/* 아랫줄: 리뷰보기 버튼 */}
      <div className={styles.bottomRow}>
        <button className={styles.reviewBtn}>리뷰 보기</button>
      </div>
    </div>
  );
}
