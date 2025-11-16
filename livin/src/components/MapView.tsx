import { useEffect, useRef } from 'react';
import FilterFloating from './FilterFloating';
import { useMap } from '@/hooks/useMap';
import styles from '@/styles/mapPage.module.css';

export default function MapView() {
  const mapRef = useRef<HTMLDivElement| null>(null);
  useMap(mapRef); // 지도 초기화 및 마커 렌더링

  return (
    <div className={styles.mapArea}>
      <div ref={mapRef} className={styles.mapContainer} />
      <FilterFloating />
      <button className={styles.locationBtn}>📍</button>
    </div>
  );
}
