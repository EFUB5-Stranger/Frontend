"use client";
import TopBar from '@/components/TopBar';
import MapView from '@/components/MapView';
import FilterPopup from '@/components/FilterPopup';
import BottomPopup from '@/components/BottomPopup';
import { FilterProvider } from '../../hooks/FilterContext';
import { MapProvider } from '../../hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
import { useState } from 'react';

export default function MapPage() {
  // BottomPopup 높이를 관리해서 버튼 위치 조정
  const [popupHeight, setPopupHeight] = useState(0);

  return (
    <FilterProvider>
      <MapProvider>
        <div className={styles.mapPage}>
          <TopBar 
            title="지도" 
            showSearch={true} 
            searchPlaceholder="건물명, 주소, 키워드 검색" 
          />


          <MapView popupHeight={popupHeight} />

          <FilterPopup />

          <BottomPopup onHeightChange={setPopupHeight} />
        </div>
      </MapProvider>
    </FilterProvider>
  );
}
