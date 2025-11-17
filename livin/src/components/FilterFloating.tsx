'use client';
import { useFilter } from '@/hooks/FilterContext';
import styles from '@/styles/mapPage.module.css';

export default function FilterFloating() {
  const { activeFilter, toggleFilter } = useFilter();

  return (
    <div className={styles.floatingButtons}>
      <button
        className={`${styles.filterBtn} ${activeFilter === 'building' ? styles.active : ''}`}
        onClick={() => toggleFilter('building')}
      >
        자취방/하숙
      </button>
      <button
        className={`${styles.filterBtn} ${activeFilter === 'facility' ? styles.active : ''}`}
        onClick={() => toggleFilter('facility')}
      >
        편의시설
      </button>
    </div>
  );
}
