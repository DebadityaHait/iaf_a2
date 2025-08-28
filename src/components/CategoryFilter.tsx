import React from 'react';
import { Mountain, Building, Castle, Hammer, Palette, Camera } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: 'temple', label: 'Temples', icon: Mountain, color: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'cave', label: 'Caves', icon: Mountain, color: 'bg-blue-500 hover:bg-blue-600' },
  { id: 'palace', label: 'Palaces', icon: Building, color: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'fort', label: 'Forts', icon: Castle, color: 'bg-red-500 hover:bg-red-600' },
  { id: 'sculpture', label: 'Sculptures', icon: Hammer, color: 'bg-green-500 hover:bg-green-600' },
  { id: 'painting', label: 'Paintings', icon: Palette, color: 'bg-yellow-500 hover:bg-yellow-600' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-gray-800 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;