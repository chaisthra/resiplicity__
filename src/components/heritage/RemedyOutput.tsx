import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, Users, Heart } from 'lucide-react';
import { generateRemedy } from '../../services/heritage';
import { supabase } from '../../services/supabase';

interface Remedy {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: string;
  servings: string;
  health_benefits: string[];
  remedy_explanation: string;
  variations: string[];
  precautions: string[];
  region: string;
  tradition: string;
}

interface RemedyOutputProps {
  formData: {
    illness: string;
    age: string;
    gender: string;
    dietaryInfo: string[];
    preferences: string[];
    allergies: string[];
    timeAvailable: string;
    selectedCuisines: string[];
    selectedIndianRegions: string[];
    ingredients: string[];
  };
}

export const RemedyOutput: React.FC<RemedyOutputProps> = ({ formData }) => {
  const [showBenefits, setShowBenefits] = useState(false);
  const [showPrecautions, setShowPrecautions] = useState(false);
  const [showTradition, setShowTradition] = useState(false);
  const [remedy, setRemedy] = useState<Remedy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchRemedy = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await generateRemedy(formData);
        if (!result.success) {
          throw new Error(result.error || 'Failed to generate remedy');
        }

        setRemedy(result.remedy);
        setSaved(true); // Since saving is handled in generateRemedy
      } catch (err) {
        console.error('Remedy generation error:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate remedy');
        setRemedy(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRemedy();
  }, [formData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!remedy) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="bg-brown-100 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-display text-brown-800">{remedy.title}</h3>
          {saved && (
            <span className="text-green-600 text-sm">
              ✓ Saved to your collection
            </span>
          )}
        </div>
        <p className="text-brown-700 mb-6">{remedy.description}</p>

        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              Time: {remedy.cooking_time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              Serves: {remedy.servings}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              For: {formData.illness}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-brown-800 mb-2">Ingredients</h4>
            <ul className="list-disc list-inside space-y-1">
              {remedy.ingredients.map((ingredient, index) => (
                <li key={index} className="text-brown-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brown-800 mb-2">Instructions</h4>
            <ol className="list-decimal list-inside space-y-2">
              {remedy.instructions.map((step, index) => (
                <li key={index} className="text-brown-700">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShowBenefits(!showBenefits)}
          className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
        >
          <span>Health Benefits</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showBenefits ? 'rotate-180' : ''}`} />
        </button>
        {showBenefits && (
          <div className="p-4 bg-brown-100 rounded-lg">
            <div className="space-y-2">
              {remedy.health_benefits.map((benefit, index) => (
                <p key={index} className="text-brown-700">• {benefit}</p>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-brown-200">
              <h5 className="font-semibold text-brown-800 mb-2">How This Helps</h5>
              <p className="text-brown-700">{remedy.remedy_explanation}</p>
            </div>
          </div>
        )}

        {remedy.precautions.length > 0 && (
          <>
            <button
              onClick={() => setShowPrecautions(!showPrecautions)}
              className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
            >
              <span>Precautions & Variations</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showPrecautions ? 'rotate-180' : ''}`} />
            </button>
            {showPrecautions && (
              <div className="p-4 bg-brown-100 rounded-lg space-y-4">
                <div>
                  <h5 className="font-semibold text-brown-800 mb-2">Precautions</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {remedy.precautions.map((precaution, index) => (
                      <li key={index} className="text-brown-700">{precaution}</li>
                    ))}
                  </ul>
                </div>
                {remedy.variations.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-brown-800 mb-2">Variations</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {remedy.variations.map((variation, index) => (
                        <li key={index} className="text-brown-700">{variation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <button
          onClick={() => setShowTradition(!showTradition)}
          className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
        >
          <span>Traditional Background</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showTradition ? 'rotate-180' : ''}`} />
        </button>
        {showTradition && (
          <div className="p-4 bg-brown-100 rounded-lg">
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-brown-800 mb-2">Region</h5>
                <p className="text-brown-700">{remedy.region}</p>
              </div>
              <div>
                <h5 className="font-semibold text-brown-800 mb-2">Traditional Background</h5>
                <p className="text-brown-700">{remedy.tradition}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};