import TopBar from '@/components/TopBar';
import MapView from '@/components/MapView';
import FilterPopup from '@/components/FilterPopup';
import BottomPopup from '@/components/BottomPopup';
import { FilterProvider } from '@/hooks/FilterContext';
import { MapProvider } from '@/hooks/MapContext';
import styles from '@/styles/mapPage.module.css';

export default function MapPage() {
  return (
    <FilterProvider>
      <MapProvider>
        <div className={styles.mapPage}>
          <TopBar />
          <MapView />
          
          <BottomPopup />
        </div>
      </MapProvider>
    </FilterProvider>
  );
}
