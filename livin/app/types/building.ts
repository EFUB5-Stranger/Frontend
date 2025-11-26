// types/building.ts
export type ServerBuildingType = 'PRIVATE' | 'BOARDING';
export type TagType = 'privateHouse' | 'boardingHouse';

export const mapServerTypeToTag = (type: ServerBuildingType): TagType =>
  type === 'PRIVATE' ? 'privateHouse' : 'boardingHouse';

export const mapTagToServerType = (tag: TagType): ServerBuildingType =>
  tag === 'privateHouse' ? 'PRIVATE' : 'BOARDING';

export interface Building {
  id: number;
  title: string;
  address: string;
  type: ServerBuildingType; // 서버에서 오는 값
  rate?: number;
  thumbnailUrl?: string;
  bookmarked?: boolean;
}

export interface SelectedBuilding {
  id?: number;                        // optional
  title: string;
  type: ServerBuildingType | null;    // ✅ null 허용
  address: string;
  thumbnailUrl?: string;
  rate?: number;
  bookmarked?: boolean;               // optional
}
