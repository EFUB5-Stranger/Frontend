'use client';
import { createContext, useContext, useState,Dispatch,SetStateAction } from 'react';

type FilterType = 'building' | 'facility' | null;

interface FilterContextType {
  activeFilter: string | null;
   setActiveFilter: Dispatch<SetStateAction<FilterType>>;
  toggleFilter: (filter: FilterType) => void;
  subFilters: string[];
  toggleSubFilter: (filter: string) => void;
  applyFilters: () => void;}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [subFilters, setSubFilters] = useState<string[]>([]);

  const toggleFilter = (type: FilterType) => {
    setActiveFilter(prev => (prev === type ? null : type));
    setSubFilters([]);
  };

  const toggleSubFilter = (name: string) => {
    setSubFilters(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const applyFilters = () => {
    console.log('적용된 필터:', activeFilter, subFilters);
    setActiveFilter(null);
  };

  return (
    <FilterContext.Provider
      value={{ 
        activeFilter,
        setActiveFilter,  
        subFilters, 
        toggleFilter, 
        toggleSubFilter, 
        applyFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilter must be used within FilterProvider');
  return ctx;
};
