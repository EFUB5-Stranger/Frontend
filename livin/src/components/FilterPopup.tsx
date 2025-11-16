import { useFilter } from '@/hooks/useFilter';
import styles from '@/styles/mapPage.module.css';

export default function FilterPopup() {
  const { activeFilter, subFilters, toggleSubFilter, applyFilters } = useFilter();

  if (!activeFilter) return null;

  const options =
    activeFilter === 'facility'
      ? ['카페', '편의점', '식당', '교통']
      : ['자취방', '하숙'];

  return (
    <div className={styles.filterPopup}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`${styles.subFilter} ${subFilters.includes(opt) ? styles.selected : ''}`}
          onClick={() => toggleSubFilter(opt)}
        >
          {opt}
        </button>
      ))}
      <button className={styles.applyBtn} onClick={applyFilters}>
        적용하기
      </button>
    </div>
  );
}
