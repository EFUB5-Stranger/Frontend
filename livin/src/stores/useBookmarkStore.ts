import { create } from 'zustand';
import { TagType } from '../components/Home/Rooms/TagComponents';

interface Room {
  id: string;
  type: TagType;
  title: string;
  address: string;
  rate: number;
}

interface BookmarkStore {
  bookmarks: Room[];
  toggleBookmark: (room: Room) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],

  toggleBookmark: (room) => {
    const { bookmarks } = get();
    const exists = bookmarks.find((b) => b.id === room.id);

    if (exists) {
      set({
        bookmarks: bookmarks.filter((b) => b.id !== room.id),
      });
    } else {
      set({
        bookmarks: [...bookmarks, room],
      });
    }
  },

  isBookmarked: (id) => {
    return get().bookmarks.some((b) => b.id === id);
  },
}));
