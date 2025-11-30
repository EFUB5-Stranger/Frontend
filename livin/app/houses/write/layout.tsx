import { Suspense } from 'react';

export default function HouseWriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>페이지 정보 로딩 중...</div>}>{children}</Suspense>
  );
}
