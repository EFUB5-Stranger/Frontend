'use client';
import { useFilter } from 'hooks/FilterContext';
import styles from '@/styles/mapPage.module.css';

export default function FilterPopup() {
  const { activeFilter, subFilters, toggleSubFilter, applyFilters } =
    useFilter();

  if (!activeFilter) return null;
  console.log('현재 activeFilter:', activeFilter);

  return (
    <div className={styles.filterPopup}>
      <div className={styles.subFilterRow}>
        {activeFilter === 'building' && (
          <>
            <button
              className={`${styles.subFilter} ${
                subFilters.includes('자취방') ? styles.selected : ''
              }`}
              onClick={() => toggleSubFilter('자취방')}
            >
              자취방
            </button>
            <button
              className={`${styles.subFilter} ${
                subFilters.includes('기숙사') ? styles.selected : ''
              }`}
              onClick={() => toggleSubFilter('기숙사')}
            >
              기숙사
            </button>
            <button
              className={`${styles.subFilter} ${
                subFilters.includes('하숙') ? styles.selected : ''
              }`}
              onClick={() => toggleSubFilter('하숙')}
            >
              하숙
            </button>
          </>
        )}

        {activeFilter === 'facility' && (
          <>
            <button
              className={`${styles.subFilter} ${
                subFilters.includes('편의점') ? styles.selected : ''
              }`}
              onClick={() => toggleSubFilter('편의점')}
            >
              편의점
            </button>
            <button
              className={`${styles.subFilter} ${
                subFilters.includes('카페') ? styles.selected : ''
              }`}
              onClick={() => toggleSubFilter('카페')}
            >
              카페
            </button>
          </>
        )}
      </div>
      <div className={styles.applyRow}>
        <button className={styles.applyBtn} onClick={applyFilters}>
          적용하기
        </button>
      </div>
    </div>
  );
}
