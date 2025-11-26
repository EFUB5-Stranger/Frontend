import { create } from 'zustand';
import axiosInstance from '@apis/axiosInstance';
import { BuildingType } from '@/types/building'; // 서버 타입 import

// 서버로 보내는 payload 타입
interface BookmarkPayload {
  id: number;
  type: BuildingType;
  title: string;
  address: string;
  rate: number;
}

interface BookmarkStore {
  bookmarks: BookmarkPayload[];
  toggleBookmark: (room: BookmarkPayload) => Promise<void>;
  isBookmarked: (id: number) => boolean;
  setInitialBookmarks: (rooms: BookmarkPayload[]) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],

  setInitialBookmarks: (rooms: BookmarkPayload[]) => {
    set({ bookmarks: rooms });
  },

  toggleBookmark: async (room: BookmarkPayload) => {
    if (!room.id || Number.isNaN(room.id)) {
      console.error('Invalid room.id:', room.id);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.post(
        `/bookmark/${room.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('bookmark API response:', res.data);
      const bookmarked = res.data.bookmarked;
      const { bookmarks } = get();

      if (bookmarked) {
        // 북마크 추가
        set({
          bookmarks: [...bookmarks, room],
        });
      } else {
        // 북마크 해제
        set({
          bookmarks: bookmarks.filter((b) => b.id !== room.id),
        });
      }
    } catch (error) {
      console.error('북마크 처리 실패:', error);
    }
  },

  isBookmarked: (id: number) => {
    return get().bookmarks.some((b) => b.id === id);
  },
}));
