import React, { useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import LocationModal from './components/LocationModal';
import { artLocations } from './data/locations';
import { Location } from './types/Location';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 min-w-[400px] max-w-[500px] shadow-xl z-10">
        <Sidebar
          locations={artLocations}
          onLocationSelect={handleLocationSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Map
          locations={artLocations}
          onLocationSelect={handleLocationSelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Modal */}
      <LocationModal
        location={selectedLocation}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;