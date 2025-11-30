'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';
import { useMapContext } from 'hooks/MapContext';
import FilterFloating from './FilterFloating';
import FilterPopup from './FilterPopup';
import styles from '@/styles/mapPage.module.css';
import { FilterProvider, useFilter } from 'hooks/FilterContext';
import NavigationBar from './NavigationBar/NavigationBar';
import { BuildingType } from '@/types/building';

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

export default function MapView({
  popupHeight = 0,
  mapData,
  loading,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<{ marker: any; category: string; data: any }[]>([]);
  const lastMarkerClickTime = useRef<number>(0);
  const { setSelectedBuilding } = useMapContext();
  const { activeFilter, subFilters } = useFilter();
  // 한글 필터명 → 서버 타입/카테고리 매핑
  const filterMap: Record<string, string> = {
    자취방: 'PRIVATE',
    기숙사: 'DORMITORY',
    하숙: 'BOARDING',
    카페: 'cafe',
    음식점: 'food',
    편의점: 'store',
    교통: 'transport',
  };

  type MarkerCategory =
    | 'privateHouse'
    | 'boardingHouse'
    | 'cafe'
    | 'food'
    | 'store'
    | 'transport'
    | 'default';

  // 서버 주거지 타입 → 마커 카테고리
  const houseCategoryFromServerType = (
    type: 'PRIVATE' | 'BOARDING'
  ): MarkerCategory => (type === 'PRIVATE' ? 'privateHouse' : 'boardingHouse');

  // ✅ 마커 생성 함수
  const createMarker = (
    x: number,
    y: number,
    category: MarkerCategory,
    data: any
  ) => {
    const iconSrcMap: Record<MarkerCategory, string> = {
      privateHouse: '/icons/privateHouse.svg',
      boardingHouse: '/icons/boardingHouse.svg',
      cafe: '/icons/cafe.svg',
      food: '/icons/food.svg',
      store: '/icons/store.svg',
      transport: '/icons/transport.svg',
      default: '/icons/store.svg',
    };

    const imageSrc = iconSrcMap[category] ?? iconSrcMap.default;
    const imageSize = new window.kakao.maps.Size(20, 20);
    const imageOption = { offset: new window.kakao.maps.Point(20, 40) };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
      image: markerImage,
      map: mapInstance.current,
    });

    // 클릭 이벤트 → 하단 팝업 띄우기
    window.kakao.maps.event.addListener(marker, 'click', () => {
      lastMarkerClickTime.current = Date.now();

      if (data.houseId) {
        setSelectedBuilding({
          id: Number(data.houseId),
          title: data.buildingName,
          type: data.type as BuildingType,
          address: data.address,
          thumbnailUrl: data.imageUrl || '/default_img.jpg',
          rate: 0,
          bookmarked: data.bookmarked,
        });
      } else {
        setSelectedBuilding(null);
      }
    });

    // 생성된 마커 저장
    markersRef.current.push({ marker, category, data });
    return marker;
  };

  useEffect(() => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;

    const handleMapClick = () => {
      const now = Date.now();

      // 바로 직전에 마커를 클릭한 경우 → BottomPopup 닫히지 않도록 방지
      if (now - lastMarkerClickTime.current < 100) return;

      setSelectedBuilding(null);
    };

    window.kakao.maps.event.addListener(map, 'click', handleMapClick);

    return () => {
      window.kakao.maps.event.removeListener(map, 'click', handleMapClick);
    };
  }, [setSelectedBuilding]);

  // ✅ 지도 초기화
  useEffect(() => {
    if (window.kakao && mapRef.current) {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.564213, 126.950288);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 4,
        });
        mapInstance.current = map;
      });
    }
  }, []);

  // ✅ 데이터 들어오면 마커 생성
  useEffect(() => {
    if (!mapInstance.current || !mapData || !window.kakao) return;

    markersRef.current = []; // 초기화

    (mapData.houses || []).forEach((house: any) => {
      const category = houseCategoryFromServerType(
        house.type as 'PRIVATE' | 'BOARDING'
      );
      createMarker(parseFloat(house.x), parseFloat(house.y), category, house);
    });
    (mapData.cafes || []).forEach((cafe: any) =>
      createMarker(cafe.x, cafe.y, 'cafe', cafe)
    );
    (mapData.restaurants || []).forEach((food: any) =>
      createMarker(food.x, food.y, 'food', food)
    );
    (mapData.stores || []).forEach((store: any) =>
      createMarker(store.x, store.y, 'store', store)
    );
    (mapData.transports || []).forEach((transport: any) =>
      createMarker(transport.x, transport.y, 'transport', transport)
    );
  }, [mapData]);

  // ✅ 필터 반영 (보였다/안 보였다 처리)
  useEffect(() => {
    if (!mapInstance.current) return;

    console.log('MapView 필터 상태:', activeFilter, subFilters);

    const isBuildingFilterActive = activeFilter === 'building';
    const isFacilityFilterActive = activeFilter === 'facility';

    // 현재 subFilters에 포함된 주거지 타입 (PRIVATE, BOARDING)
    const activeHouseTypes = subFilters
      .map((f) => filterMap[f])
      .filter((t) => ['PRIVATE', 'BOARDING'].includes(t));

    // 현재 subFilters에 포함된 편의시설 카테고리 (cafe, food, store, transport)
    const activeFacilityCategories = subFilters
      .map((f) => filterMap[f])
      .filter((c) => ['cafe', 'food', 'store', 'transport'].includes(c));

    markersRef.current.forEach(({ marker, category, data }) => {
      let shouldShow = true; // 기본값: 보여주기

      const isHouseMarker = ['privateHouse', 'boardingHouse'].includes(
        category
      );
      const isFacilityMarker = ['cafe', 'food', 'store', 'transport'].includes(
        category
      );

      // 1. 주거지 마커 처리
      if (isHouseMarker) {
        // activeFilter가 'building'이거나 null일 때 주거지 필터링 로직 적용
        // 'facility'가 활성화되면 주거지 필터는 비활성화 상태로 유지되므로, 전체 subFilters를 따름

        // 마커의 서버 데이터 타입 ('PRIVATE' 또는 'BOARDING')을 가져옴
        const markerHouseType = data.type;

        // 현재 subFilters에 마커 타입이 포함되어 있는지 확인
        shouldShow = activeHouseTypes.includes(markerHouseType);

        // 2. 편의시설 마커 처리
      } else if (isFacilityMarker) {
        // activeFilter가 'facility'이거나 null일 때 시설 필터링 로직 적용
        // 'building'이 활성화되면 시설 필터는 비활성화 상태로 유지되므로, 전체 subFilters를 따름

        // 마커의 카테고리 ('cafe', 'food', 'store', 'transport')를 가져옴
        // category가 곧 filterMap의 서버/카테고리 값과 일치함
        const markerFacilityCategory = category;

        // 현재 subFilters에 마커 카테고리가 포함되어 있는지 확인
        shouldShow = activeFacilityCategories.includes(markerFacilityCategory);
      }

      // 3. activeFilter가 null이 아닌 경우, 'activeFilter'에 해당하지 않는 마커는 영향을 받지 않아야 함.
      //    (즉, 'building' 활성화 시 시설 마커는 기존 subFilters 상태를 따름)
      //    -> 위 1, 2번 로직이 activeFilter가 null일 때도 동작하도록 수정되었으므로 별도 분기 필요 없음.

      console.log(
        '마커:',
        data.buildingName || category,
        '카테고리:',
        category,
        '보임?',
        shouldShow
      );

      marker.setMap(shouldShow ? mapInstance.current : null);
    });
  }, [activeFilter, subFilters]);

  // ✅ 현위치 버튼
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
    <div className={styles.mapArea}>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`}
        strategy='afterInteractive'
        onLoad={() => {
          if (window.kakao && mapRef.current) {
            window.kakao.maps.load(() => {
              const center = new window.kakao.maps.LatLng(
                37.564213,
                126.950288
              );
              const map = new window.kakao.maps.Map(mapRef.current, {
                center,
                level: 4,
              });
              mapInstance.current = map;
            });
          }
        }}
      />
      <div ref={mapRef} className={styles.mapContainer} />

      <FilterFloating />
      <FilterPopup />

      <button
        className={styles.locationBtn}
        onClick={handleCurrentLocation}
        style={{
          bottom: `${Math.min(
            Math.max(80, popupHeight + 16), // 80px 아래로 떨어지지 않음
            200 // 200px 이상 올라가지 않음
          )}px`,
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
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
  );
}
