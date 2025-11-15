export const theme = {
  colors: {
    primary: '#112d4e', // 브랜드 메인
    secondary: '#dbe2ef',
    third: '#3f72af',
    fourth: '#9db2ce',
    background: '#ffffff',
    text: '#000000',
    error: '#e42e00',
  },

  fonts: {
    main: "'Pretendard', sans-serif",
    accent: "'Montserrat', sans-serif",
  },

  layout: {
    maxWidth: '360px',
    minHeight: '800px',
  },

  style: {
    radiusBase: '10px',
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    shadowMd: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
} as const;

export type ThemeType = typeof theme;
