'use client';
import { useRef, useEffect} from 'react';
import Script from 'next/script';
import { useMapContext} from'hooks/MapContext';
import FilterFloating from './FilterFloating';
import FilterPopup from './FilterPopup';
import styles from '@/styles/mapPage.module.css';
import { FilterProvider } from 'hooks/FilterContext';
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapViewProps {
  popupHeight?: number;
  mapData?: any;
  loading?: boolean;
}
export default function MapView({ popupHeight = 0, mapData, loading }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const { setSelectedBuilding } = useMapContext();

  // 지도 초기화
  useEffect(() => {
    if (window.kakao && mapRef.current) {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.5665, 126.978);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 4,
        });
        mapInstance.current = map;
      });
    }
  }, []);
  useEffect(() => {
    if (!mapInstance.current || !mapData || !window.kakao) return;

    // 기존 마커 제거
    mapInstance.current && mapInstance.current.clearOverlay?.();

    // 🏠 자취/하숙
    (mapData.houses || []).forEach((house: any) => {
      const markerPosition = new window.kakao.maps.LatLng(house.y, house.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstance.current,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedBuilding(house);
        mapInstance.current.setCenter(markerPosition);
      });
    });

    // ☕ 카페
    (mapData.cafes || []).forEach((cafe: any) => {
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(cafe.y, cafe.x),
        map: mapInstance.current,
      });
    });

    // 🍴 음식점
    (mapData.restaurants || []).forEach((food: any) => {
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(food.y, food.x),
        map: mapInstance.current,
      });
    });

    // 🛒 마트
    (mapData.stores || []).forEach((store: any) => {
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(store.y, store.x),
        map: mapInstance.current,
      });
    });

    // 🚇 교통
    (mapData.transports || []).forEach((transport: any) => {
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(transport.y, transport.x),
        map: mapInstance.current,
      });
    });
  }, [mapData]);

// 현위치 버튼
  const handleCurrentLocation = () => {
    if (!mapInstance.current) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);
          mapInstance.current.setCenter(locPosition);

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
    <FilterProvider>
      <div className={styles.mapArea}>
        {/* 카카오 지도 SDK 스크립트  */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
          strategy='afterInteractive'
          onLoad={() => {
              console.log('카카오 SDK 로드 완료');
              window.kakao.maps.load(() => {
                // 지도 초기화 코드
                const container = document.getElementById('map');
                const options = {
                  center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표 예시
                  level: 3, // 확대 레벨 (1: 가장 확대, 숫자가 커질수록 축소)
                };
                const map = new window.kakao.maps.Map(container, options);
                const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
                const marker = new window.kakao.maps.Marker({
                  position: markerPosition,
                });
                marker.setMap(map);
              });
            }}
          onError={(e) => console.error('카카오 SDK 로드 실패:', e)}
        />

        <div ref={mapRef} className={styles.mapContainer} />

        <FilterFloating />
        <FilterPopup />

        <button
          className={styles.locationBtn}
          onClick={handleCurrentLocation}
          style={{ bottom: `${popupHeight + 16}px` }} // popup 높이에 따라 위치 조정
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4M4 12H2M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12M12 20V22M20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4M20 12H22M12 4V2'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </FilterProvider>
  );
}
