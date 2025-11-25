'use client';
import { createContext, useContext, useState } from 'react';
import { TagType} from '@/types/building';

// ✅ UI에서 사용할 Building 타입
interface Building {
  id: number;
  title: string;
  type: TagType; // UI 타입으로 정의
  address: string;
  thumbnailUrl?: string;
  rate?: number;
  bookmarked?: boolean;
}

interface MapContextType {
  selectedBuilding: Building | null;
  setSelectedBuilding: (building: Building | null) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <MapContext.Provider value={{ selectedBuilding, setSelectedBuilding }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMapContext must be used within MapProvider');
  return ctx;
}