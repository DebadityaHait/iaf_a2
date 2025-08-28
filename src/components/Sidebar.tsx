import React from 'react';
import { Location } from '../types/Location';
import LocationCard from './LocationCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

interface SidebarProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  locations,
  onLocationSelect,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.artStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? location.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Indian Art History Map
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Explore the rich heritage of Indian art through its most significant locations. 
          Discover the stories, artworks, and historical context that shaped India's artistic legacy.
        </p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange} 
      />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredLocations.length} Location{filteredLocations.length !== 1 ? 's' : ''} Found
        </h2>
        
        {filteredLocations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onSelect={onLocationSelect}
          />
        ))}
        
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No locations found matching your criteria.</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter settings.</p>
          </div>
        )}
        </div>
      </div>

      {/* Sticky Credits Section */}
      <div className="flex-shrink-0 bg-gray-50 p-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">Developed by</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Debaditya Hait (RA2311003011027)</p>
            <p className="text-xs text-gray-500">Saumyajit Ghosal (RA2311003011040)</p>
            <p className="text-xs text-gray-500">Kairav Shrivatsav (RA2311003011041)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;