import { useMap } from '@/hooks/useMap';
import styles from '@/styles/mapPage.module.css';

export default function BottomPopup() {
  const { selectedBuilding } = useMap();

  if (!selectedBuilding) return null;

  return (
    <div className={styles.bottomPopup}>
      <img src={selectedBuilding.thumbnailUrl} className={styles.buildingImg} />
      <div className={styles.buildingInfo}>
        <h2 className={styles.buildingName}>{selectedBuilding.name}</h2>
        <p className={styles.buildingAddress}>{selectedBuilding.address}</p>
        <div className={styles.ratingStars}>⭐️⭐️⭐️⭐️☆</div>
        <button className={styles.reviewBtn}>리뷰 확인하기</button>
      </div>
    </div>
  );
}
