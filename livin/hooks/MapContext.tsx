'use client';
import { createContext, useContext, useState } from 'react';
import type { Building} from '@/types/building';
interface MapContextType {
  selectedBuilding: Building | null;
  setSelectedBuilding: (building: Building | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

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