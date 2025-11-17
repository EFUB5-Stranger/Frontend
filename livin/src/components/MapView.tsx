'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';
import { useMapContext } from '@/hooks/MapContext';
import FilterFloating from './FilterFloating';
import FilterPopup from './FilterPopup';
import styles from '@/styles/mapPage.module.css';

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { setSelectedBuilding } = useMapContext();

  useEffect(() => {
    console.log("Kakao Key:", process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
        const map = new window.kakao.maps.Map(mapRef.current!, { center, level: 4 });

        // API 호출로 마커 추가
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/buildings`)
          .then(res => res.json())
          .then(data => {
            data.forEach((b: any) => {
              const markerPosition = new window.kakao.maps.LatLng(b.lat, b.lng);
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map,
              });
              window.kakao.maps.event.addListener(marker, 'click', () => {
                setSelectedBuilding(b);
                map.setCenter(markerPosition);
              });
            });
          })
          .catch(err => console.error('API 호출 실패:', err));
      });
    }
  }, [setSelectedBuilding]);

  return (
    <div className={styles.mapArea}>
      {/* 카카오 지도 SDK 스크립트 */}
        <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
            console.log("카카오 SDK 로드 완료");
            if (window.kakao) {
            window.kakao.maps.load(() => {
                const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
                new window.kakao.maps.Map(mapRef.current!, { center, level: 4 });
            });
            }
        }}
        onError={(e) => console.error("카카오 SDK 로드 실패:", e)}
      />

      {/* 지도 영역 */}
      <div ref={mapRef} className={styles.mapContainer} />

      {/* 필터 버튼 */}
      <FilterFloating />
      <FilterPopup />

      {/* 현위치 버튼 */}
      <button className={styles.locationBtn}>📍</button>
    </div>
  );
}
