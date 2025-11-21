'use client';

import { useState } from 'react';

type FilterType = 'building' | 'facility' | null;

export function useFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [subFilters, setSubFilters] = useState<string[]>([]);

  const toggleFilter = (type: FilterType) => {
    setActiveFilter((prev) => (prev === type ? null : type));
    setSubFilters([]);
  };

  const toggleSubFilter = (name: string) => {
    setSubFilters((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const applyFilters = () => {
    console.log('적용된 필터:', activeFilter, subFilters);
    // TODO: 지도 마커 필터링 로직 연결
    setActiveFilter(null);
  };

  return {
    activeFilter,
    subFilters,
    toggleFilter,
    toggleSubFilter,
    applyFilters,
  };
}
