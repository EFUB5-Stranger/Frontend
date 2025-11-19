'use client';
import styled from "styled-components";
import styles from '@/styles/mapPage.module.css';
interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = styled.input`
width: 100%;
  height: 2rem;
  padding: 0 1.1875rem;       /* 좌우 패딩만 주고 */
  background: transparent;
  border: 1px solid #d9d9d9;  /* ✅ 회색 테두리 */
  margin-top: 1rem;
  margin-bottom: 1rem;

  box-sizing: border-box;
  line-height: 1.5rem;     /* ✅ 높이와 동일하게 맞추기 */
  color: #000; 
  &::placeholder {
    background: transparent;
  color: #7e7e7e; 
  }
  &:focus {
  outline: none;             
  background: transparent;    
}
  &::selection {
    background: transparent;
    color: inherit;
  }
`;

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <span className={styles.searchIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M14 14L10.8634 10.8634M10.8634 10.8634C11.3999 10.3269 11.8255 9.68995 12.1159 8.98895C12.4063 8.28795 12.5557 7.53662 12.5557 6.77786C12.5557 6.0191 12.4063 5.26777 12.1159 4.56677C11.8255 3.86577 11.3999 3.22882 10.8634 2.6923C10.3269 2.15577 9.68995 1.73018 8.98895 1.43981C8.28795 1.14945 7.53662 1 6.77786 1C6.0191 1 5.26777 1.14945 4.56677 1.43981C3.86577 1.73018 3.22882 2.15577 2.6923 2.6923C1.60874 3.77586 1 5.24548 1 6.77786C1 8.31024 1.60874 9.77987 2.6923 10.8634C3.77586 11.947 5.24548 12.5557 6.77786 12.5557C8.31024 12.5557 9.77987 11.947 10.8634 10.8634Z" stroke="#7E7E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
<Input
  id="search"
  name="search"
  placeholder={placeholder}
  value={value}
  onChange={onChange}
/>    </div>
  );
}
