// types/building.ts
export type BuildingType = 'PRIVATE' | 'BOARDING';

export interface Building {
  id: number;
  title: string;
  address: string;
  type: BuildingType; // 'PRIVATE' | 'BOARDING'
  rate?: number;
  thumbnailUrl?: string;
  bookmarked?: boolean;
}
