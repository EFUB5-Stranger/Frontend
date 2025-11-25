'use client';
import { useRef, useEffect} from 'react';
import Script from 'next/script';
import { useMapContext} from'hooks/MapContext';
import FilterFloating from './FilterFloating';
import FilterPopup from './FilterPopup';
import styles from '@/styles/mapPage.module.css';
import { FilterProvider } from 'hooks/FilterContext';
import NavigationBar from './NavigationBar/NavigationBar';

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
  // ✅ 마커 생성 함수 (카테고리별 아이콘 적용)
  const createMarker = (x: number, y: number, category: string, data: any) => {
    let imageSrc = '';
    switch (category) {
      case 'house':
        imageSrc = '/icons/house.png';
        break;
      case 'cafe':
        imageSrc = '/icons/cafe.png';
        break;
      case 'food':
        imageSrc = '/icons/food.png';
        break;
      case 'store':
        imageSrc = '/icons/store.png';
        break;
      case 'transport':
        imageSrc = '/icons/transport.png';
        break;
      default:
        imageSrc = '/icons/default.png';
    }
    const imageSize = new window.kakao.maps.Size(32, 32);
    const imageOption = { offset: new window.kakao.maps.Point(16, 32) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
      image: markerImage,
      map: mapInstance.current,
    });
    // 클릭 이벤트 → 하단 팝업 띄우기
    window.kakao.maps.event.addListener(marker, 'click', () => {
      setSelectedBuilding(data);
      mapInstance.current.setCenter(new window.kakao.maps.LatLng(y, x));
    });

    return marker;
  };

  useEffect(() => {
    console.log("카카오 JS 키:", process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }, []);
  

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

    // 🏠 자취/하숙
    (mapData.houses || []).forEach((house: any) =>
      createMarker(parseFloat(house.x), parseFloat(house.y), 'house', house)
    );

    // ☕ 카페
    (mapData.cafes || []).forEach((cafe: any) =>
      createMarker(cafe.x, cafe.y, 'cafe', cafe)
    );

    // 🍴 음식점
    (mapData.restaurants || []).forEach((food: any) =>
      createMarker(food.x, food.y, 'food', food)
    );

    // 🛒 마트
    (mapData.stores || []).forEach((store: any) =>
      createMarker(store.x, store.y, 'store', store)
    );

    // 🚇 교통
    (mapData.transports || []).forEach((transport: any) =>
      createMarker(transport.x, transport.y, 'transport', transport)
    );
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
          <Script
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`}
            strategy="afterInteractive"
            onLoad={() => {
              console.log('카카오 SDK 로드 완료');
              if (window.kakao && window.kakao.maps && mapRef.current) {
                window.kakao.maps.load(() => {
                  const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3,
                  };
                  const map = new window.kakao.maps.Map(mapRef.current, options);
                  mapInstance.current = map;

                  new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    map,
                  });
                });
              }
            }}
            onError={(e) => {
              console.error('카카오 SDK 로드 실패:', e);
              alert('카카오 지도 SDK 로드 실패');
            }}
          />
          <div ref={mapRef} className={styles.mapContainer} />
    


        <FilterFloating />
        <FilterPopup />

        <button
          className={styles.locationBtn}
          onClick={handleCurrentLocation}
          style={{ bottom: `${popupHeight + 80}px` }} // popup 높이에 따라 위치 조정
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
              <NavigationBar />
      </div>
      
    </FilterProvider>
    
  );
}
