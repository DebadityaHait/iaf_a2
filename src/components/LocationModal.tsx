import React from 'react';
import { X, MapPin, Calendar, Palette, Users } from 'lucide-react';
import { Location } from '../types/Location';

interface LocationModalProps {
  location: Location | null;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, onClose }) => {
  if (!location) return null;

  const categoryColors = {
    temple: 'bg-orange-100 text-orange-800',
    cave: 'bg-blue-100 text-blue-800',
    palace: 'bg-purple-100 text-purple-800',
    fort: 'bg-red-100 text-red-800',
    sculpture: 'bg-green-100 text-green-800',
    painting: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative">
          <img
            src={location.imageUrl}
            alt={location.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{location.name}</h2>
            <div className="flex items-center text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location.state}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[location.category]}`}>
              {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Period</p>
                <p className="font-medium">{location.period}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Palette className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Art Style</p>
                <p className="font-medium">{location.artStyle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Established</p>
                <p className="font-medium">{location.established}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">About</h3>
            <p className="text-gray-700 leading-relaxed">{location.description}</p>
          </div>

          {/* Historical Context */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Historical Context</h3>
            <p className="text-gray-700 leading-relaxed">{location.historicalContext}</p>
          </div>

          {/* Key Artworks */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Key Artworks & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {location.keyArtworks.map((artwork, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-800">{artwork}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Artists */}
          {location.notableArtists.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Notable Artists & Craftsmen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {location.notableArtists.map((artist, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-800">{artist}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;