import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, Scale, ChefHat } from 'lucide-react';
import { generateRecipe, type GeneratedRecipe } from '../services/api';
import { supabase } from '../services/supabase';
import { ErrorBoundary } from './ErrorBoundary';
import { PlatingImageGenerator } from './PlatingImageGenerator';

interface Recipe extends GeneratedRecipe {
  alternativeIngredients: Record<string, string>;
}

interface RecipeOutputProps {
  formData: {
    ingredients: string[];
    selectedCuisine: string;
    dietaryRestrictions: string[];
    proficiency: string;
    timeAvailable: string;
  };
}

export const RecipeOutput: React.FC<RecipeOutputProps> = ({ formData }) => {
  const [showPlating, setShowPlating] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await generateRecipe({
          ingredients: formData.ingredients,
          cuisine: formData.selectedCuisine,
          restrictions: formData.dietaryRestrictions,
          proficiency: formData.proficiency,
          timeAvailable: formData.timeAvailable
        });

        if (!result.success || !result.recipe) {
          throw new Error(result.error || 'Failed to generate recipe');
        }

        setRecipe(result.recipe);
        await saveRecipe(result.recipe);
      } catch (err) {
        console.error('Recipe generation error:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate recipe');
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [formData]);

  const saveRecipe = async (recipeData: Recipe) => {
    if (!recipeData || saving) return;

    try {
      setSaving(true);
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      const { error: saveError } = await supabase
        .from('generated_recipes')
        .insert([{
          user_id: userData.user.id,
          title: recipeData.title,
          description: recipeData.description,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions,
          prep_time: recipeData.prepTime,
          cook_time: recipeData.cookTime,
          total_time: recipeData.totalTime,
          difficulty: recipeData.difficulty,
          nutrition: recipeData.nutrition,
          plating: recipeData.plating,
          history: recipeData.history,
          cuisine_type: formData.selectedCuisine,
          dietary_restrictions: formData.dietaryRestrictions,
          alternative_ingredients: recipeData.alternativeIngredients
        }]);

      if (saveError) throw saveError;
      setSaved(true);
    } catch (err) {
      console.error('Failed to save recipe:', err);
      setError('Failed to save recipe to your collection');
    } finally {
      setSaving(false);
    }
  };

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

  if (!recipe) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="bg-brown-100 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-display text-brown-800">{recipe.title}</h3>
          {saved && (
            <span className="text-green-600 text-sm">
              ✓ Saved to your collection
            </span>
          )}
        </div>
        <p className="text-brown-700 mb-6">{recipe.description}</p>

        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              Prep: {recipe.prepTime}<br />
              Cook: {recipe.cookTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              {recipe.difficulty} difficulty
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brown-600" />
            <span className="text-sm">
              {formData.proficiency} level
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-brown-800">Instructions</h4>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-brown-700">{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShowPlating(!showPlating)}
          className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
        >
          <span>Plating Suggestions</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showPlating ? 'rotate-180' : ''}`} />
        </button>
        {showPlating && (
          <ErrorBoundary>
            <div className="p-4 bg-brown-100 rounded-lg">
              <p className="mb-4">{recipe.plating}</p>
              <PlatingImageGenerator 
                title={recipe.title}
                platingDescription={recipe.plating}
              />
            </div>
          </ErrorBoundary>
        )}

        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
        >
          <span>Nutritional Information</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showNutrition ? 'rotate-180' : ''}`} />
        </button>
        {showNutrition && (
          <div className="p-4 bg-brown-100 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-brown-700">
                <span className="font-semibold">Calories:</span> {recipe.nutrition.calories}
              </div>
              <div className="text-brown-700">
                <span className="font-semibold">Protein:</span> {recipe.nutrition.protein}
              </div>
              <div className="text-brown-700">
                <span className="font-semibold">Carbs:</span> {recipe.nutrition.carbs}
              </div>
              <div className="text-brown-700">
                <span className="font-semibold">Fat:</span> {recipe.nutrition.fat}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full p-4 rounded-lg bg-brown-200 hover:bg-brown-300 flex items-center justify-between transition-all text-brown-800"
        >
          <span>Recipe History & Origin</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
        </button>
        {showHistory && (
          <div className="p-4 bg-brown-100 rounded-lg text-brown-700">
            {recipe.history}
          </div>
        )}
      </div>
    </div>
  );
};