'use client';
import TopBar from '@/components/TopBar';
import MapView from '@/components/MapView';
import FilterPopup from '@/components/FilterPopup';
import BottomPopup from '@/components/BottomPopup';
import { FilterProvider } from 'hooks/FilterContext';
import { MapProvider } from 'hooks/MapContext';
import styles from '@/styles/mapPage.module.css';
import { useEffect, useState } from 'react';
import axiosInstance from '@apis/axiosInstance';

export default function MapPage() {
  const [popupHeight, setPopupHeight] = useState(0);
  const [mapData, setMapData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/house/map', {
          params: {
            minLat: 37.5567,
            maxLat: 37.56,
            minLon: 126.947,
            maxLon: 126.952,
            centerLat: 37.561176,
            centerLon: 126.94638,
            radius: 500,
            showCafe: true,
            showFood: true,
            showStore: true,
            showTransport: true,
          },
        });
        setMapData(res.data);
      } catch (error) {
        console.error('지도 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  return (
    <FilterProvider>
      <MapProvider>
        <div className={styles.mapPage}>
          <TopBar
            title='지도'
            showSearch={true}
            searchPlaceholder='건물명, 주소, 키워드 검색'
          />

          <MapView
            popupHeight={popupHeight}
            mapData={mapData}
            loading={loading}
          />

          <BottomPopup onHeightChange={setPopupHeight} />
        </div>
      </MapProvider>
    </FilterProvider>
  );
}
