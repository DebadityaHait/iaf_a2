import React from 'react';
import { MapPin, Calendar, Eye } from 'lucide-react';
import { Location } from '../types/Location';

interface LocationCardProps {
  location: Location;
  onSelect: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  const categoryColors = {
    temple: 'bg-orange-100 text-orange-800',
    cave: 'bg-blue-100 text-blue-800',
    palace: 'bg-purple-100 text-purple-800',
    fort: 'bg-red-100 text-red-800',
    sculpture: 'bg-green-100 text-green-800',
    painting: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[location.category]}`}>
            {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{location.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{location.state}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{location.period}</span>
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {location.description.length > 120 
            ? `${location.description.substring(0, 120)}...` 
            : location.description}
        </p>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-1">Art Style:</p>
          <p className="text-sm text-blue-600">{location.artStyle}</p>
        </div>
        
        <button
          onClick={() => onSelect(location)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Explore Details</span>
        </button>
      </div>
    </div>
  );
};

export default LocationCard;