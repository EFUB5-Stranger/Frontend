'use client';

import styles from '@/styles/mapPage.module.css';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  title: string;
  showSearch?: boolean;
  showBack?: boolean;
  searchPlaceholder?: string; // ✅ placeholder를 prop으로 받도록 추가
  className?: string;
}

export default function TopBar({ 
  title, 
  showSearch = false, 
  showBack = false, 
  searchPlaceholder ,
   className,
}: TopBarProps) {
  const router = useRouter();  

  return (
     <div className={`${styles.topBar} ${className ?? ''}`}>
      <div className={styles.mapHeader}>
        {showBack && (
          <button className={styles.backBtn} onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15">
              <path
                d="M9 1.22591L7.66147 0L0.37084 6.68119C0.253319 6.78824 0.160052 6.91555 0.0964085 7.05578C0.0327647 7.196 0 7.34638 0 7.49826C0 7.65015 0.0327647 7.80053 0.0964085 7.94075C0.160052 8.08098 0.253319 8.20829 0.37084 8.31534L7.66147 15L8.99874 13.7741L2.15597 7.5L9 1.22591Z"
                fill="#000"
              />
            </svg>
          </button>
        )}
        <div className={styles.mapTitle}>{title}</div>      
      </div>

      {showSearch && <SearchBar placeholder={searchPlaceholder} className={className} />}
    </div>
  );
}
