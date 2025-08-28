import React, { useRef, useEffect, useState } from 'react';
import { Location } from '../types/Location';

interface MapProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  selectedCategory: string | null;
}

const Map: React.FC<MapProps> = ({ locations, onLocationSelect, selectedCategory }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const filteredLocations = selectedCategory 
    ? locations.filter(location => location.category === selectedCategory)
    : locations;

  const categoryColors = {
    temple: '#ea580c',
    cave: '#1e40af',
    palace: '#7c3aed',
    fort: '#dc2626',
    sculpture: '#059669',
    painting: '#d97706'
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      
      // Initialize map centered on India
      const leafletMap = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(leafletMap);

      // Set bounds to India
      const indiaBounds = L.latLngBounds(
        L.latLng(6.4627, 68.1097), // Southwest corner
        L.latLng(35.5044, 97.3953)  // Northeast corner
      );
      leafletMap.setMaxBounds(indiaBounds);
      leafletMap.fitBounds(indiaBounds);

      setMap(leafletMap);

      return () => {
        document.head.removeChild(link);
        document.head.removeChild(script);
      };
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!map) return;

    const L = (window as any).L;

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    setMarkers([]);

    const newMarkers: any[] = [];

    // Add markers for filtered locations
    filteredLocations.forEach((location) => {
      const color = categoryColors[location.category];
      
      // Create custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.3s ease;
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([location.coordinates[0], location.coordinates[1]], {
        icon: customIcon
      }).addTo(map);

      // Add popup
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${location.name}</h3>
          <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${location.state}</p>
          <p style="margin: 0 0 8px 0; color: ${color}; font-size: 14px; font-weight: 500;">${location.period}</p>
          <p style="margin: 0 0 12px 0; color: #4b5563; font-size: 13px; line-height: 1.4;">
            ${location.description.substring(0, 120)}...
          </p>
          <button 
            onclick="window.selectLocation('${location.id}')"
            style="
              background: linear-gradient(135deg, #3b82f6, #8b5cf6);
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 500;
              cursor: pointer;
              width: 100%;
            "
          >
            Explore Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      // Add hover effects
      marker.on('mouseover', () => {
        setHoveredLocation(location);
        const markerElement = marker.getElement();
        if (markerElement) {
          const div = markerElement.querySelector('div');
          if (div) {
            div.style.transform = 'scale(1.3)';
            div.style.boxShadow = `0 4px 16px ${color}40`;
          }
        }
      });

      marker.on('mouseout', () => {
        setHoveredLocation(null);
        const markerElement = marker.getElement();
        if (markerElement) {
          const div = markerElement.querySelector('div');
          if (div) {
            div.style.transform = 'scale(1)';
            div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
          }
        }
      });

      marker.on('click', () => {
        onLocationSelect(location);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Global function for popup buttons
    (window as any).selectLocation = (locationId: string) => {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        onLocationSelect(location);
      }
    };

  }, [map, filteredLocations, locations, onLocationSelect]);

  return (
    <div className="w-full h-full relative">
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg" style={{ zIndex: 1000 }}>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Art Categories</h4>
        <div className="space-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-700 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Custom styles */}
      <style jsx>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default Map;