'use client';
import { useRef, useEffect } from 'react';
import { useMapContext } from 'hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
import RoomInfo from '@/components/Home/Rooms/RoomInfo';
import { useRouter } from 'next/navigation';
import { getHouseReviewsApi } from '@apis/house';

interface BottomPopupProps {
  onHeightChange?: (height: number) => void;
}

export default function BottomPopup({ onHeightChange }: BottomPopupProps) {
  const { selectedBuilding } = useMapContext();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
      {selectedBuilding?.id && selectedBuilding?.type && (
        <RoomInfo
          id={selectedBuilding.id!}
          type={selectedBuilding.type!}
          title={selectedBuilding.title}
          address={selectedBuilding.address}
          rate={selectedBuilding.rate}
          thumbnailUrl={selectedBuilding.thumbnailUrl}
          variant='popup' // ✅ 팝업 레이아웃 지정
        />
      )}

      <div className={styles.bottomRow}>
        <button
  className={styles.reviewBtn}
  onClick={() => router.push(`/houses/${selectedBuilding.id}`)}
>
  리뷰 확인하기
</button>


      </div>
    </div>
  );
}
