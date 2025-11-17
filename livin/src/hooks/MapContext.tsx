'use client';
import { createContext, useContext, useState } from 'react';

interface Building {
  id: string;
  name: string;
  address: string;
  thumbnailUrl?: string;
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
