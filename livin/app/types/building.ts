// 서버 응답 타입 (백엔드에서 내려주는 값)
export type ServerBuildingType = 'PRIVATE' | 'BOARDING';

// UI 표시용 타입 (프론트에서 보여줄 값)
export type TagType = '자취방' | '하숙집';

// ✅ 서버 → UI 변환
export const mapServerTypeToTag = (type: ServerBuildingType): TagType => {
  return type === 'PRIVATE' ? '자취방' : '하숙집';
};

// ✅ UI → 서버 변환
export const mapTagToServerType = (tag: TagType): ServerBuildingType => {
  return tag === '자취방' ? 'PRIVATE' : 'BOARDING';
};
export interface SelectedBuilding {
  id?: number;              // 서버 데이터면 number, 외부 데이터면 undefined
  title: string;
  type: TagType | null;     // 서버 데이터면 TagType, 외부 데이터면 null
  address: string;
  thumbnailUrl?: string;
  rate?: number;
  bookmarked?: boolean;
}
export function isServerBuilding(
  b: SelectedBuilding | null | undefined
): b is SelectedBuilding & { id: number; type: TagType } {
  return !!b && typeof b.id === 'number' && b.type !== null;
}