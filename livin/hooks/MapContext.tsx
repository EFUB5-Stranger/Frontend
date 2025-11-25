'use client';
import { createContext, useContext, useState } from 'react';

interface Building {
  houseId: number;                 // 기존 id → houseId
  buildingName: string;            // 기존 name → buildingName
  type: 'PRIVATE' | 'BOARDING';    // 기존 '자취방' | '하숙집' → 서버 응답 값
  address: string;
  thumbnailUrl?: string;
  reviewScore?: number;            // 기존 rating → reviewScore
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
};
