import { Suspense } from 'react';

export default function HouseNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>건물 정보 입력 화면 로딩 중...</div>}>
      {children}
    </Suspense>
  );
}
