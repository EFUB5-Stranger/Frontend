'use client';

import MapView from '@/components/MapView';
import FilterPopup from '@/components/FilterPopup';
import BottomPopup from '@/components/BottomPopup';
import TopBar from '@/components/TopBar';
import styles from '@/styles/mapPage.module.css';

export default function MapPage() {
  return (
    <div className={styles.mapPage}>
        <TopBar />
      <MapView />
      <FilterPopup />
      <BottomPopup />
    </div>
  );
}
