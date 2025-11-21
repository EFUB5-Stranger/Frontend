'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  #root, body {
    max-width: ${({ theme }) => theme.layout.maxWidth};
    min-height: ${({ theme }) => theme.layout.minHeight};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyle;
