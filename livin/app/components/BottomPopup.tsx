'use client';
import { useRef, useEffect } from 'react';
import { useMapContext } from 'hooks/MapContext'; 
import styles from '@/styles/mapPage.module.css';
import Image from 'next/image';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { mapTagToServerType } from '@/app/types/building';

interface BottomPopupProps {
  onHeightChange?: (height: number) => void;
}

export default function BottomPopup({ onHeightChange }: BottomPopupProps) {
  const { selectedBuilding } = useMapContext();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) =>
    selectedBuilding ? state.isBookmarked(selectedBuilding.id) : false
  );

  useEffect(() => {
    if (selectedBuilding && popupRef.current && onHeightChange) {
      onHeightChange(popupRef.current.offsetHeight);
    } else if (!selectedBuilding && onHeightChange) {
      onHeightChange(0);
    }
  }, [selectedBuilding, onHeightChange]);

  if (!selectedBuilding) return null;
  return (
    <div ref={popupRef} className={styles.bottomPopup}>
      <div className={styles.topRow}>
        <img
          src={selectedBuilding.thumbnailUrl || '/default.png'}
          alt={selectedBuilding.title}
          className={styles.buildingImg}
        />
        <div className={styles.buildingInfo}>
          <h2 className={styles.buildingName}>{selectedBuilding.title}</h2>
          <p className={styles.buildingAddress}>{selectedBuilding.address}</p>
          <p className={styles.buildingRating}>⭐ {selectedBuilding.rate ?? '평점 없음'}</p>
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
            id: selectedBuilding.id,
            type: mapTagToServerType(selectedBuilding.type), // ✅ UI → 서버 변환
            title: selectedBuilding.title,
            address: selectedBuilding.address,
            rate: selectedBuilding.rate ?? 0,
          });
        }}
      />
      </div>

      <div className={styles.bottomRow}>
        <button className={styles.reviewBtn}>리뷰 보기</button>
      </div>
    </div>
  );
}