'use client';

import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { Open_Sans } from 'next/font/google';
import { Noto_Sans_KR } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'] });
const notosansKR = Noto_Sans_KR({ subsets: ['latin'] });

export const fonts = `${opensans.className} ${notosansKR.className}`;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={fonts}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
