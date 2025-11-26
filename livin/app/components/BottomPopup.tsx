'use client';
import { useRef, useEffect } from 'react';
import { useMapContext } from 'hooks/MapContext'; 
import styles from '@/styles/mapPage.module.css';
import Image from 'next/image';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { isServerBuilding, mapTagToServerType} from '@/types/building'

interface BottomPopupProps {
  onHeightChange?: (height: number) => void;
}

export default function BottomPopup({ onHeightChange }: BottomPopupProps) {
  const { selectedBuilding } = useMapContext();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) =>
  selectedBuilding?.id ? state.isBookmarked(selectedBuilding.id!) : false
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

        
<button
  className={styles.bookmarkBtn}
  disabled={!isServerBuilding(selectedBuilding)} 
  onClick={(e) => {
    e.stopPropagation();
    if (!isServerBuilding(selectedBuilding)) return; // ✅ 여기서 타입 내로잉

    if (!selectedBuilding?.id || !selectedBuilding?.type) return;

toggleBookmark({
  id: selectedBuilding.id!, // ✅ 여기서 number로 확정
  type: mapTagToServerType(selectedBuilding.type),
  title: selectedBuilding.title,
  address: selectedBuilding.address,
  rate: selectedBuilding.rate ?? 0,
});

  }}
>
  <Image
    src={isBookmarked ? '/bookmark_filled.svg' : '/bookmark_unfilled.svg'}
    width={20}
    height={24}
    alt="bookmark"
    className={styles.bookmarkIcon}
  />
</button>
      </div>

      <div className={styles.bottomRow}>
        <button className={styles.reviewBtn}>리뷰 보기</button>
      </div>
    </div>
  );
}