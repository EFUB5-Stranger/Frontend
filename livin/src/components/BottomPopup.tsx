'use client';
import { useMapContext } from '@/hooks/MapContext';
import styles from '@/styles/mapPage.module.css';

export default function BottomPopup() {
  const { selectedBuilding } = useMapContext();

  if (!selectedBuilding) return null;

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
