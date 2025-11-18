'use client';
import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';
import { useMapContext } from '@/hooks/MapContext';
import FilterFloating from './FilterFloating';
import FilterPopup from './FilterPopup';
import styles from '@/styles/mapPage.module.css';
interface MapViewProps {
  popupHeight?: number;
}
export default function MapView({ popupHeight = 0 }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const { setSelectedBuilding } = useMapContext();

  // 지도 초기화
  useEffect(() => {
    if (window.kakao && mapRef.current) {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
        const map = new window.kakao.maps.Map(mapRef.current, { center, level: 4 });
        mapInstance.current = map;

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

  // 현위치 버튼 클릭 핸들러
  const handleCurrentLocation = () => {
    if (!mapInstance.current) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);
          mapInstance.current.setCenter(locPosition);

          // 현위치 마커 표시
          new window.kakao.maps.Marker({
            position: locPosition,
            map: mapInstance.current,
          });
        },
        (err) => {
          console.error('현위치 가져오기 실패:', err);
        }
      );
    } else {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
  };

  return (
    <div className={styles.mapArea}>
      {/* 카카오 지도 SDK 스크립트 */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`}
        strategy="afterInteractive"
        onLoad={() => console.log("카카오 SDK 로드 완료")}
        onError={(e) => console.error("카카오 SDK 로드 실패:", e)}
      />

      {/* 지도 영역 */}
      <div ref={mapRef} className={styles.mapContainer} />

      {/* 필터 버튼 */}
      <FilterFloating />
      <FilterPopup />

      {/* 현위치 버튼 */}
      <button
        className={styles.locationBtn}
        onClick={handleCurrentLocation}
        style={{ bottom: `${popupHeight + 16}px` }} // popup 높이에 따라 위치 조정
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4M4 12H2M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12M12 20V22M20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4M20 12H22M12 4V2"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
