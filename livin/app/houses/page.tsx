'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RoomInfo from '@/components/Home/Rooms/RoomInfo';
import Image from 'next/image';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { useRouter } from 'next/navigation';
import axiosInstance from '@apis/axiosInstance';
import { BuildingType } from '@/types/building';
import { useBookmarkStore } from '@/stores/useBookmarkStore';

interface HouseData {
  houseId: number;
  buildingName: string;
  address: string;
  type: BuildingType;
  imageUrl?: string;
  rate?: number;
  bookmarked?: boolean;
}

export default function HousesPage() {
  const router = useRouter();

  const setInitialBookmarks = useBookmarkStore(
    (state) => state.setInitialBookmarks
  );
  const isBookmarked = useBookmarkStore((state) => state.isBookmarked);
  const [searchTerm, setSearchTerm] = useState('');
  const [houses, setHouses] = useState<HouseData[]>([]);

  type FilterType = '정렬' | '타입' | '주소' | null;
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [sortOption, setSortOption] = useState<'rating' | 'bookmark'>('rating');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [districtFilter, setDistrictFilter] = useState('전체 주소');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/house/search', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            keyword: '',
            sort: 'review',
            type: 'all',
            address: 'all',
            page: 0,
          },
        });
        const fetchedHouses = res.data.houses;
        setHouses(fetchedHouses);

        const myBookmarks = fetchedHouses
          .filter((h: HouseData) => h.bookmarked) // bookmarked가 true인 것만 필터링
          .map((h: HouseData) => ({
            id: h.houseId,
            type: h.type,
            title: h.buildingName,
            address: h.address,
            rate: h.rate || 0,
          }));

        setInitialBookmarks(myBookmarks);
      } catch (error) {
        console.error('건물 목록 불러오기 실패:', error);
      }
    };

    fetchHouses();
  }, [setInitialBookmarks]);

  const filteredHouses = houses
    .filter(
      (house) =>
        house.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((house) =>
      typeFilter === '전체'
        ? true
        : (typeFilter === '자취방' && house.type === 'PRIVATE') ||
          (typeFilter === '하숙집' && house.type === 'BOARDING')
    )
    .filter((house) =>
      districtFilter === '전체 주소'
        ? true
        : house.address.includes(districtFilter)
    )
    .sort((a, b) => {
      if (sortOption === 'rating') {
        return (b.rate ?? 0) - (a.rate ?? 0); // ✅ rate 사용
      } else {
        const aMarked = isBookmarked(a.houseId) ? 1 : 0;
        const bMarked = isBookmarked(b.houseId) ? 1 : 0;
        return bMarked - aMarked;
      }
    });

  return (
    <>
      <Wrapper>
        <Header>
          <BackBtn onClick={() => router.back()}>
            <Image src='/arrow_back.svg' width={9} height={15} alt='back' />
          </BackBtn>
          <Title>자취방/하숙 목록</Title>
        </Header>

        {/* 검색 */}
        <SearchSection>
          <SearchInputWrapper>
            <SearchIcon src='/search.svg' alt='검색' width={20} height={20} />
            <SearchInput
              placeholder='원하는 자취방/하숙을 검색해주세요.'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputWrapper>
        </SearchSection>

        {/* 필터 */}
        <FilterSection>
          {/* 정렬 */}
          <FilterButtonWrapper>
            <FilterButton
              $active={false}
              onClick={() =>
                setSortOption(sortOption === 'rating' ? 'bookmark' : 'rating')
              }
            >
              {sortOption === 'rating' ? '평점순' : '북마크순'}
            </FilterButton>
          </FilterButtonWrapper>

          {/* 타입 필터 */}
          <FilterButtonWrapper>
            <FilterButton
              $active={activeFilter === '타입'}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(activeFilter === '타입' ? null : '타입');
              }}
            >
              {typeFilter}
            </FilterButton>

            {activeFilter === '타입' && (
              <FilterPopupFloating>
                <PopupTitle>방 종류</PopupTitle>
                <OptionList>
                  {['전체', '자취방', '하숙집'].map((t) => (
                    <OptionButton
                      key={t}
                      $selected={typeFilter === t}
                      onClick={() => {
                        setTypeFilter(t);
                        setActiveFilter(null);
                      }}
                    >
                      {t}
                    </OptionButton>
                  ))}
                </OptionList>
              </FilterPopupFloating>
            )}
          </FilterButtonWrapper>

          {/* 주소 필터 */}
          <FilterButtonWrapper>
            <FilterButton
              $active={activeFilter === '주소'}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(activeFilter === '주소' ? null : '주소');
              }}
            >
              {districtFilter}
            </FilterButton>

            {activeFilter === '주소' && (
              <FilterPopupFloating $alignRight>
                <PopupTitle>지역 선택</PopupTitle>
                <OptionGrid>
                  {[
                    '전체 주소',
                    '강남구',
                    '강동구',
                    '마포구',
                    '서대문구',
                    '노원구',
                    '종로구',
                    '중구',
                    '송파구',
                    '용산구',
                  ].map((d) => (
                    <OptionButton
                      key={d}
                      $selected={districtFilter === d}
                      onClick={() => {
                        setDistrictFilter(d);
                        setActiveFilter(null);
                      }}
                    >
                      {d}
                    </OptionButton>
                  ))}
                </OptionGrid>
              </FilterPopupFloating>
            )}
          </FilterButtonWrapper>
        </FilterSection>

        {/* 리스트 */}
        <ScrollArea>
          <CardGrid>
            {filteredHouses.map((h) => {
              return (
                <div key={h.houseId} style={{ position: 'relative' }}>
                  <RoomInfo
                    id={h.houseId}
                    type={h.type}
                    title={h.buildingName}
                    address={h.address}
                    rate={h.rate}
                    thumbnailUrl={h.imageUrl}
                    variant='card'
                    onClick={() => router.push(`/houses/${h.houseId}`)}
                  />
                </div>
              );
            })}
          </CardGrid>
        </ScrollArea>

        <FloatingButton onClick={() => router.push('/houses/new/step1')}>
          <Image src='/writing.svg' alt='리뷰 작성' width={28} height={28} />
          <span>+직접 추가</span>
        </FloatingButton>
      </Wrapper>
      <NavigationBar />
    </>
  );
}
const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 20px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;

  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
`;

const SearchSection = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const SearchIcon = styled(Image)`
  position: absolute;
  left: 16px;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 0 16px 0 48px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 13px;
  color: #000;

  &::placeholder {
    color: #b6b6b6;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterButtonWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  width: 60px;
  height: 28px;
  padding: 6px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : '#d0d0d0')};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : '#fff'};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : '#f8f8f8'};
    border-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary : '#b0b0b0'};
  }
`;

const FilterPopupFloating = styled.div<{ $alignRight?: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: ${({ $alignRight }) => ($alignRight ? '50%' : '0')};
  right: auto;
  transform: ${({ $alignRight }) =>
    $alignRight ? 'translateX(-50%)' : 'none'};
  min-width: 200px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: ${({ $alignRight }) =>
        $alignRight ? 'translateX(-50%) translateY(-4px)' : 'translateY(-4px)'};
    }
    to {
      opacity: 1;
      transform: ${({ $alignRight }) =>
        $alignRight ? 'translateX(-50%) translateY(0)' : 'translateY(0)'};
    }
  }
`;

const PopupTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #000;
  margin: 0 0 12px 0;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const OptionButton = styled.button<{ $selected?: boolean }>`
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : '#e0e0e0')};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : '#fff'};
  color: ${({ $selected }) => ($selected ? '#fff' : '#333')};
  font-size: 11px;
  font-weight: ${({ $selected }) => ($selected ? '500' : '400')};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.primary : '#f8f8f8'};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: calc(50% - 180px + 12px);
  width: 71px;
  height: 71px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 400;

  span {
    color: #fff;
    font-size: 10px;
    font-weight: 500;
  }

  img {
    filter: brightness(0) invert(1);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  transition: transform 0.2s;
`;
