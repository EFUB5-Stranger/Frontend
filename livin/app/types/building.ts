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
