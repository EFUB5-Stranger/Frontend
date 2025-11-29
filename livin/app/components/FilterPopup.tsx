'use client';
import { useEffect, useRef } from 'react';
import { useFilter } from 'hooks/FilterContext';
import styles from '@/styles/mapPage.module.css';

export default function FilterPopup() {
  const { activeFilter, subFilters, toggleSubFilter, applyFilters, closePopup,isPopupOpen } = useFilter();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      const path = event.composedPath();
      if (popupRef.current && !path.includes(popupRef.current)) {
        closePopup();
      }
    };
    document.addEventListener('pointerdown', handler, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, [closePopup]);


  if (!isPopupOpen) return null;

  return (
    <div
      ref={popupRef}
      className={styles.filterPopup}
      onPointerDownCapture={(e) => e.stopPropagation()}  // ← 캡처 단계에서 차단
      onPointerDown={(e) => e.stopPropagation()}         // ← 버블링도 안전하게 차단
    >
      <div className={styles.subFilterRow}>
        {activeFilter === 'building' && (
          <>
            <button
              className={`${styles.subFilter} ${subFilters.includes('자취방') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('자취방')}
            >
              자취방
            </button>
            <button
              className={`${styles.subFilter} ${subFilters.includes('기숙사') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('기숙사')}
            >
              기숙사
            </button>
            <button
              className={`${styles.subFilter} ${subFilters.includes('하숙') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('하숙')}
            >
              하숙
            </button>
          </>
        )}
        {activeFilter === 'facility' && (
          <>
            <button
              className={`${styles.subFilter} ${subFilters.includes('편의점') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('편의점')}
            >
              편의점
            </button>
            <button
              className={`${styles.subFilter} ${subFilters.includes('카페') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('카페')}
            >
              카페
            </button>
            <button
              className={`${styles.subFilter} ${subFilters.includes('교통') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('교통')}
            >
              교통
            </button>
            <button
              className={`${styles.subFilter} ${subFilters.includes('음식점') ? styles.selected : ''}`}
              onClick={() => toggleSubFilter('음식점')}
            >
              음식점
            </button>
          </>
        )}
      </div>
      <div className={styles.applyRow}>
        <button
          className={styles.applyBtn}
          onClick={() => {
            applyFilters();
            closePopup(); // 적용 버튼 누르면 닫기
          }}
        >
          적용
        </button>
      </div>
    </div>
  );
}
