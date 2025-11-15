'use client';

import TopSection from '../components/Home/TopSection';
import PopularRooms from '../components/Home/PopularRooms';
import DormList from '../components/Home/DormList';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export default function HomePage() {
  return (
    <Wrapper>
      <TopSection />
      <PopularRooms />
      <DormList />
      <NavigationBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.minHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 50px;
`;
