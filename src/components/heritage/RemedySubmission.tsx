import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Plus, X, AlertCircle, Check } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { submitSharedRemedy } from '../../services/sharedRemedies';
import { 
  timeOptions, 
  ageGroups,
  dietaryOptions 
} from '../../data/remedyOptions';

interface RemedyFormData {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  targetAge: string;
  region: string;
  subRegion: string;
  dietaryInfo: string[];
  healthBenefits: string[];
  precautions: string[];
  tradition: string;
  additionalInfo: string;
  imageUrl?: string;
}

export const RemedySubmission: React.FC = () => {
  const [formData, setFormData] = useState<RemedyFormData>({
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    prepTime: '',
    cookTime: '',
    servings: '',
    targetAge: '',
    region: '',
    subRegion: '',
    dietaryInfo: [],
    healthBenefits: [],
    precautions: [],
    tradition: '',
    additionalInfo: ''
  });

  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [currentPrecaution, setCurrentPrecaution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [customAge, setCustomAge] = useState('');

  const updatedAgeGroups = [...ageGroups, 'No Age Barrier'];

  const addListItem = (
    field: keyof Pick<RemedyFormData, 'ingredients' | 'instructions' | 'healthBenefits' | 'precautions'>,
    value: string,
    setter: (value: string) => void
  ) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setter('');
    }
  };

  const removeListItem = (
    field: keyof Pick<RemedyFormData, 'ingredients' | 'instructions' | 'healthBenefits' | 'precautions'>,
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmitSuccess(false);

    try {
      const { success, error: submitError } = await submitSharedRemedy({
        title: formData.title,
        description: formData.description,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        prep_time: formData.prepTime,
        cook_time: formData.cookTime,
        servings: formData.servings,
        target_age: formData.targetAge,
        region: formData.region,
        sub_region: formData.subRegion,
        dietary_info: formData.dietaryInfo,
        health_benefits: formData.healthBenefits,
        precautions: formData.precautions,
        tradition: formData.tradition,
        additional_info: formData.additionalInfo,
        image_url: formData.imageUrl
      });

      if (!success) {
        throw new Error(submitError || 'Failed to submit remedy');
      }

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        ingredients: [],
        instructions: [],
        prepTime: '',
        cookTime: '',
        servings: '',
        targetAge: '',
        region: '',
        subRegion: '',
        dietaryInfo: [],
        healthBenefits: [],
        precautions: [],
        tradition: '',
        additionalInfo: ''
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit remedy');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
          <Check className="w-5 h-5 flex-shrink-0" />
          <p>Remedy submitted successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Target Age Group
            </label>
            <select
              value={formData.targetAge}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAge: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
              required
            >
              <option value="">Select Age Group</option>
              {updatedAgeGroups.map(age => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 h-24"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
            placeholder="Enter the URL of your remedy image"
            className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
          />
          <p className="mt-1 text-sm text-brown-500">
            Add a URL to an image that represents your remedy
          </p>
        </div>

        {/* Region Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Region
            </label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              placeholder="e.g., North India, South Asia, Mediterranean"
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Sub Region
            </label>
            <input
              type="text"
              value={formData.subRegion}
              onChange={(e) => setFormData(prev => ({ ...prev, subRegion: e.target.value }))}
              placeholder="e.g., Punjab, Kerala, Tuscany"
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Ingredients
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addListItem('ingredients', currentIngredient, setCurrentIngredient);
                }
              }}
              placeholder="Add ingredient with quantity"
              className="flex-1 p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
            <button
              type="button"
              onClick={() => addListItem('ingredients', currentIngredient, setCurrentIngredient)}
              className="p-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-brown-100 px-3 py-1 rounded-full"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => removeListItem('ingredients', index)}
                  className="text-brown-600 hover:text-brown-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Instructions
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentInstruction}
              onChange={(e) => setCurrentInstruction(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addListItem('instructions', currentInstruction, setCurrentInstruction);
                }
              }}
              placeholder="Add instruction step"
              className="flex-1 p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
            <button
              type="button"
              onClick={() => addListItem('instructions', currentInstruction, setCurrentInstruction)}
              className="p-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {formData.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-brown-100 p-3 rounded-lg"
              >
                <span className="flex-1">{`${index + 1}. ${instruction}`}</span>
                <button
                  type="button"
                  onClick={() => removeListItem('instructions', index)}
                  className="text-brown-600 hover:text-brown-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Time and Servings */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Prep Time
            </label>
            <select
              value={formData.prepTime}
              onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
              required
            >
              <option value="">Select Time</option>
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Cook Time
            </label>
            <select
              value={formData.cookTime}
              onChange={(e) => setFormData(prev => ({ ...prev, cookTime: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
              required
            >
              <option value="">Select Time</option>
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Servings
            </label>
            <input
              type="number"
              min="1"
              value={formData.servings}
              onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
              required
            />
          </div>
        </div>

        {/* Dietary Information */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Dietary Information
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 p-2 bg-brown-100 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.dietaryInfo.includes(option)}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      dietaryInfo: e.target.checked
                        ? [...prev.dietaryInfo, option]
                        : prev.dietaryInfo.filter(item => item !== option)
                    }));
                  }}
                  className="rounded border-brown-300"
                />
                <span className="text-sm text-brown-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Health Benefits */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Health Benefits
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentBenefit}
              onChange={(e) => setCurrentBenefit(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addListItem('healthBenefits', currentBenefit, setCurrentBenefit);
                }
              }}
              placeholder="Add health benefit"
              className="flex-1 p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
            <button
              type="button"
              onClick={() => addListItem('healthBenefits', currentBenefit, setCurrentBenefit)}
              className="p-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.healthBenefits.map((benefit, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-brown-100 px-3 py-1 rounded-full"
              >
                {benefit}
                <button
                  type="button"
                  onClick={() => removeListItem('healthBenefits', index)}
                  className="text-brown-600 hover:text-brown-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Precautions */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Precautions
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentPrecaution}
              onChange={(e) => setCurrentPrecaution(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addListItem('precautions', currentPrecaution, setCurrentPrecaution);
                }
              }}
              placeholder="Add precaution"
              className="flex-1 p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
            <button
              type="button"
              onClick={() => addListItem('precautions', currentPrecaution, setCurrentPrecaution)}
              className="p-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.precautions.map((precaution, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-brown-100 px-3 py-1 rounded-full"
              >
                {precaution}
                <button
                  type="button"
                  onClick={() => removeListItem('precautions', index)}
                  className="text-brown-600 hover:text-brown-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Traditional Background */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Traditional Background
          </label>
          <textarea
            value={formData.tradition}
            onChange={(e) => setFormData(prev => ({ ...prev, tradition: e.target.value }))}
            className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 h-24"
            placeholder="Share the cultural significance and history of this remedy"
          />
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">
            Additional Information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 h-24"
            placeholder="Any additional notes or tips"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Recipe'
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </form>
    </motion.div>
  );
};