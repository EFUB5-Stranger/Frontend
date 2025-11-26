'use client';
import { TagType, mapTagToServerType } from '@/types/building';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import RoomTag from './TagComponents';

interface RoomInfoProps {
  id: number;
  type: TagType;
  title: string;
  address: string;
  rate?: number;
  thumbnailUrl?: string;
  variant?: 'popup' | 'card'; // ✅ 레이아웃 구분
}

export default function RoomInfo({
  id,
  type,
  title,
  address,
  rate = 0,
  thumbnailUrl,
  variant = 'card', // ✅ 기본값 card
}: RoomInfoProps) {
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark);
  const isBookmarked = useBookmarkStore((s) => s.isBookmarked(id));

  if (variant === 'popup') {
    // ✅ 팝업용 레이아웃
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <img
        src={thumbnailUrl || '/default.png'}
        alt={title}
        style={{ width: '120px', height: '80px', borderRadius: '8px' }}
      />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,gap:'1px'}}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button
          onClick={() =>
            toggleBookmark({
              id,
              type: mapTagToServerType(type),
              title,
              address,
              rate,
            })
          }
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img
            src={isBookmarked ? '/bookmark_filled.svg' : '/bookmark_unfilled.svg'}
            alt={isBookmarked ? '북마크 해제' : '북마크'}
            style={{ width: '1.7rem', height: '1.7rem' }}
          />
        </button>
      </div>
        <p>{address}</p>
        <p>⭐ {rate}</p>
        </div>
    </div>
    );
  }

  // ✅ 카드용 레이아웃
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={thumbnailUrl || '/default.png'}
            alt={title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <div style={{ position: 'absolute', top: 6, right: 6 }}>
            <RoomTag type={type} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <button
        onClick={() =>
          toggleBookmark({
            id,
            type: mapTagToServerType(type),
            title,
            address,
            rate,
          })
        }
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <img
          src={isBookmarked ? '/bookmark_filled.svg' : '/bookmark_unfilled.svg'}
          alt={isBookmarked ? '북마크 해제' : '북마크'}
          style={{ width: '0.8125rem', height: '0.8125rem' }}
        />
      </button>
    </div>
        <p>{address}</p>
        <p>⭐ {rate}</p>

        
      </div>
  );
}
