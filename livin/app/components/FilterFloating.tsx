'use client';
import { useFilter } from 'hooks/FilterContext';
import styles from '@/styles/mapPage.module.css';
import FilterPopup from './FilterPopup';

export default function FilterFloating() {
  const { activeFilter, toggleFilter } = useFilter();

  return (
    <div className={styles.floatingButtons}>
      <div className={styles.filterBtnWrapper}>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'building' ? styles.active : ''
          }`}
          onClick={() => toggleFilter('building')}
        >
          자취방/하숙
        </button>
      </div>

      <div className={styles.filterBtnWrapper}>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'facility' ? styles.active : ''
          }`}
          onClick={() => toggleFilter('facility')}
        >
          편의시설
        </button>
      </div>
      {activeFilter && <FilterPopup />}
    </div>
  );
}
