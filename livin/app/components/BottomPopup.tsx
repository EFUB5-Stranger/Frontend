'use client';
import { useRef, useEffect } from 'react';
import { useMapContext } from 'hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
interface BottomPopupProps {
  onHeightChange?: (height: number) => void;
}
export default function BottomPopup({ onHeightChange }: BottomPopupProps) {
  const { selectedBuilding } = useMapContext();
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (popupRef.current && onHeightChange) {
      onHeightChange(popupRef.current.offsetHeight);
    }
  }, [selectedBuilding, onHeightChange]);

  if (!selectedBuilding) {
    if (onHeightChange) onHeightChange(0);
    return null;
  }

  return (
    <div className={styles.bottomPopup}>
      <img
        src={selectedBuilding.thumbnailUrl || '/default.png'}
        alt={selectedBuilding.name}
        className={styles.buildingImg}
      />
      <div className={styles.buildingInfo}>
        <h2 className={styles.buildingName}>{selectedBuilding.name}</h2>
        <p className={styles.buildingAddress}>{selectedBuilding.address}</p>
        <button className={styles.reviewBtn}>리뷰 보기</button>
      </div>
    </div>
  );
}
