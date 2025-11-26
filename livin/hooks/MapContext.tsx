'use client';
import { createContext, useContext, useState } from 'react';
import type { SelectedBuilding,ServerBuildingType } from '@/types/building';
interface MapContextType {
  selectedBuilding: SelectedBuilding | null;
  setSelectedBuilding: (building: SelectedBuilding | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<SelectedBuilding | null>(null);

  return (
    <MapContext.Provider value={{ selectedBuilding, setSelectedBuilding }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMapContext must be used within MapProvider');
  return ctx;
};