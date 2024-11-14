import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { regions } from '../../data/regions';

interface RegionSelectorProps {
  selectedRegions: string[];
  onChange: (regions: string[]) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegions, onChange }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null);

  const toggleRegion = (region: string) => {
    onChange(
      selectedRegions.includes(region)
        ? selectedRegions.filter(r => r !== region)
        : [...selectedRegions, region]
    );
  };

  const renderSubregions = (subregions: string[] | Record<string, string[]>) => {
    if (Array.isArray(subregions)) {
      return (
        <div className="p-4 grid grid-cols-2 gap-2 bg-white">
          {subregions.map((region) => (
            <label key={region} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedRegions.includes(region)}
                onChange={() => toggleRegion(region)}
                className="rounded border-brown-300 text-brown-600 focus:ring-brown-500"
              />
              <span className="text-sm">{region}</span>
            </label>
          ))}
        </div>
      );
    }

    return Object.entries(subregions).map(([subcategory, regions]) => (
      <div key={subcategory} className="ml-4">
        <button
          type="button"
          onClick={() => setExpandedSubCategory(expandedSubCategory === subcategory ? null : subcategory)}
          className="w-full p-3 text-left bg-brown-50 hover:bg-brown-100 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{subcategory}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSubCategory === subcategory ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSubCategory === subcategory && (
          <div className="p-4 grid grid-cols-2 gap-2 bg-white">
            {regions.map((region) => (
              <label key={region} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  className="rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                />
                <span className="text-sm">{region}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-brown-700">
        Select Regions
      </label>
      <div className="space-y-2">
        {Object.entries(regions).map(([category, subregions]) => (
          <div key={category} className="border border-brown-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full p-4 text-left bg-brown-50 hover:bg-brown-100 flex items-center justify-between"
            >
              <span className="font-medium">{category}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedCategory === category && renderSubregions(subregions)}
          </div>
        ))}
      </div>
    </div>
  );
};