'use client';

import { useEffect, useState } from 'react';

let mapInstance: any = null;
let kakao: any = null;

export function useMap(mapRef?: React.RefObject<HTMLDivElement | null>) {
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  useEffect(() => {
    if (!mapRef?.current) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        kakao = window.kakao;
        const center = new kakao.maps.LatLng(37.5665, 126.9780); // 기본 서울 중심
        mapInstance = new kakao.maps.Map(mapRef.current!, {
          center,
          level: 4,
        });
      });
    };
    document.head.appendChild(script);
  }, [mapRef]);

  /** 현위치 버튼 클릭 시 실행 */
  const moveToCurrentLocation = () => {
    if (!mapInstance || !kakao) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const loc = new kakao.maps.LatLng(lat, lng);

          mapInstance.setCenter(loc);

          // 현위치 마커 표시
          new kakao.maps.Marker({
            position: loc,
            map: mapInstance,
          });
        },
        (err) => {
          console.error('현위치 가져오기 실패:', err);
          alert('현위치를 가져올 수 없습니다.');
        }
      );
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  };

  return { selectedBuilding, moveToCurrentLocation };
}
