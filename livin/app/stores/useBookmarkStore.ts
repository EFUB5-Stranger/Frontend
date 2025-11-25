import { create } from 'zustand';
import { TagType } from '../components/Home/Rooms/TagComponents';
import axiosInstance from '@apis/axiosInstance';

interface Room {
  id: number;
  type: TagType;
  title: string;
  address: string;
  rate: number;
}

interface BookmarkStore {
  bookmarks: Room[];
  toggleBookmark: (room: Room) => Promise<void>;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],

  // 북마크 토글 시 서버 API 호출
  toggleBookmark: async (room: Room) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.post(
        `/bookmark/${room.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { bookmarked } = res.data;
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
