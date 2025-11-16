'use client';

import styles from '@/styles/mapPage.module.css';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      {/* 상단바 타이틀 */}
      <h1>지도</h1>

      {/* 검색바 */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="지역, 건물명 검색"
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '0.9rem',
          }}
        />
      </div>
    </div>
  );
}
