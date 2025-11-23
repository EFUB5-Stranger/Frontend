'use client';

import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
}
