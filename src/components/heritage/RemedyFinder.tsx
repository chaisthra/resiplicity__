import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader, Plus, X, ChevronDown } from 'lucide-react';
import { analyzeImage } from '../../services/gemini';
import { generateRemedy } from '../../services/heritage';
import { RegionSelector } from './RegionSelector';
import { RemedyOutput } from './RemedyOutput';
import {
  dietaryOptions,
  commonIllnesses,
  preferenceOptions,
  allergyOptions,
  timeOptions,
  ageGroups
} from '../../data/remedyOptions';

interface FormData {
  illness: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  dietaryInfo: string[];
  preferences: string[];
  allergies: string[];
  timeAvailable: string;
  selectedCuisines: string[];
  selectedIndianRegions: string[];
  ingredients: string[];
}

export const RemedyFinder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    illness: '',
    age: '',
    gender: 'other',
    dietaryInfo: [],
    preferences: [],
    allergies: [],
    timeAvailable: '',
    selectedCuisines: [],
    selectedIndianRegions: [],
    ingredients: []
  });

  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(file);
      if (result.success && result.ingredients) {
        setFormData(prev => ({
          ...prev,
          ingredients: [...prev.ingredients, ...result.ingredients]
        }));
      } else {
        throw new Error(result.error || 'Failed to analyze image');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleSelection = (
    field: 'dietaryInfo' | 'preferences' | 'allergies',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResults(true);
  };

  const Dropdown = ({ 
    label, 
    options, 
    value, 
    onChange, 
    multiple = false,
    selectedValues = [] 
  }: { 
    label: string;
    options: string[];
    value?: string;
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
    selectedValues?: string[];
  }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-brown-700 mb-1">
        {label}
      </label>
      {multiple ? (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedValues.map((selected) => (
              <span
                key={selected}
                className="flex items-center gap-1 bg-brown-100 px-3 py-1 rounded-full"
              >
                {selected}
                <button
                  type="button"
                  onClick={() => onChange(selectedValues.filter(v => v !== selected))}
                  className="text-brown-600 hover:text-brown-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <select
            value=""
            onChange={(e) => onChange([...selectedValues, e.target.value])}
            className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 bg-white"
          >
            <option value="">Select {label}</option>
            {options.filter(opt => !selectedValues.includes(opt)).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 bg-white"
          required
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {!showResults ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Dropdown
              label="What's troubling you?"
              options={commonIllnesses}
              value={formData.illness}
              onChange={(value) => setFormData(prev => ({ ...prev, illness: value as string }))}
            />

            <Dropdown
              label="Age Group"
              options={ageGroups}
              value={formData.age}
              onChange={(value) => setFormData(prev => ({ ...prev, age: value as string }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Gender
            </label>
            <div className="flex gap-4">
              {['male', 'female', 'other'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
                    className="mr-2"
                  />
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <Dropdown
            label="Dietary Information"
            options={dietaryOptions}
            multiple
            selectedValues={formData.dietaryInfo}
            onChange={(value) => setFormData(prev => ({ ...prev, dietaryInfo: value as string[] }))}
          />

          <Dropdown
            label="Preferences"
            options={preferenceOptions}
            multiple
            selectedValues={formData.preferences}
            onChange={(value) => setFormData(prev => ({ ...prev, preferences: value as string[] }))}
          />

          <Dropdown
            label="Allergies"
            options={allergyOptions}
            multiple
            selectedValues={formData.allergies}
            onChange={(value) => setFormData(prev => ({ ...prev, allergies: value as string[] }))}
          />

          <Dropdown
            label="Time Available"
            options={timeOptions}
            value={formData.timeAvailable}
            onChange={(value) => setFormData(prev => ({ ...prev, timeAvailable: value as string }))}
          />

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Scan Your Ingredients
            </label>
            <div className="border-2 border-dashed border-brown-200 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="ingredient-upload"
              />
              <label htmlFor="ingredient-upload" className="cursor-pointer">
                {analyzing ? (
                  <Loader className="w-8 h-8 mx-auto mb-2 animate-spin text-brown-600" />
                ) : (
                  <Upload className="w-8 h-8 mx-auto mb-2 text-brown-600" />
                )}
                <span className="text-brown-600">
                  {analyzing ? 'Analyzing...' : 'Upload image of ingredients'}
                </span>
              </label>
            </div>
            {formData.ingredients.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-brown-100 rounded-full text-brown-800"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            )}
          </div>

          <RegionSelector
            selectedRegions={formData.selectedIndianRegions}
            onChange={(regions) => setFormData(prev => ({ ...prev, selectedIndianRegions: regions }))}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Find Remedy'
            )}
          </button>
        </form>
      ) : (
        <div>
          <button
            onClick={() => setShowResults(false)}
            className="mb-6 px-4 py-2 text-brown-600 hover:text-brown-800 flex items-center gap-2"
          >
            <ChevronDown className="w-5 h-5 rotate-90" />
            Back to Form
          </button>
          <RemedyOutput formData={formData} />
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};