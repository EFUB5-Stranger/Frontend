"use client";
import TopBar from '@/components/TopBar';
import MapView from '@/components/MapView';
import FilterPopup from '@/components/FilterPopup';
import BottomPopup from '@/components/BottomPopup';
import { FilterProvider } from '@/hooks/FilterContext';
import { MapProvider } from '@/hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
import { useState } from 'react';

export default function MapPage() {
  // BottomPopup 높이를 관리해서 버튼 위치 조정
  const [popupHeight, setPopupHeight] = useState(0);

  return (
    <FilterProvider>
      <MapProvider>
        <div className={styles.mapPage}>
          {/* 상단바 */}
          <TopBar title="지도" showSearch={true} />

          {/* 지도 뷰 (popupHeight 전달) */}
          <MapView popupHeight={popupHeight} />

          {/* 필터 팝업 */}
          <FilterPopup />

          {/* 하단 팝업 (높이 변경 시 setPopupHeight 호출) */}
          <BottomPopup onHeightChange={setPopupHeight} />
        </div>
      </MapProvider>
    </FilterProvider>
  );
}
