import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  ChevronDown,
  Leaf,
  Wheat,
  Milk,
  Timer,
  Users,
  GaugeCircle,
  Loader
} from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { TrustScore } from './TrustScore';
import { validateRecipe } from '../services/api';

const DEFAULT_IMAGE = "https://static.vecteezy.com/system/resources/previews/008/660/558/non_2x/organic-food-background-hand-drawn-concept-free-vector.jpg";

interface RecipeCardProps {
  recipe: Recipe;
  onUpdate: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (vote: 'up' | 'down') => {
    if (voting || !recipe.id) return;
    
    try {
      setVoting(true);
      setError(null);
      
      const { data, error: voteError } = await validateRecipe(recipe.id, vote);

      if (voteError) {
        throw new Error(voteError);
      }

      if (data) {
        onUpdate({
          ...recipe,
          ...data,
          image_url: data.image_url || recipe.image_url
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record vote');
      console.error('Voting error:', err);
    } finally {
      setVoting(false);
    }
  };

  const shareRecipe = async () => {
    try {
      await navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } catch (err) {
      // Ignore share errors (e.g., when sharing is not supported)
    }
  };

  const getDietaryIcons = () => {
    const icons = [];
    if (recipe.dietary_tags?.includes('vegetarian')) {
      icons.push(
        <div key="veg" className="flex items-center text-green-600" title="Vegetarian">
          <Leaf className="w-4 h-4" />
        </div>
      );
    }
    if (recipe.dietary_tags?.includes('gluten-free')) {
      icons.push(
        <div key="gf" className="flex items-center text-amber-600" title="Gluten-Free">
          <Wheat className="w-4 h-4" />
        </div>
      );
    }
    if (recipe.dietary_tags?.includes('dairy-free')) {
      icons.push(
        <div key="df" className="flex items-center text-blue-600" title="Dairy-Free">
          <Milk className="w-4 h-4" />
        </div>
      );
    }
    return icons;
  };

  return (
    <div className="bg-cream rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={recipe.image_url || DEFAULT_IMAGE}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2 bg-white/90 rounded-full px-3 py-1.5">
          {getDietaryIcons()}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-display text-brown-800 mb-2">{recipe.title}</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-brown-600 mb-4">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {recipe.cooking_time}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings} servings
              </div>
              <div className="flex items-center gap-1">
                <GaugeCircle className="w-4 h-4" />
                {recipe.difficulty}
              </div>
            </div>
            <p className="text-brown-600 text-sm">By {recipe.author}</p>
          </div>
        </div>

        <TrustScore score={recipe.trust_score || 0} votes={recipe.votes || 0} />
        
        <p className="text-brown-700 my-4">{recipe.description}</p>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-brown-600">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('up')}
                disabled={voting}
                className={`p-2 rounded-full transition-colors ${
                  voting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brown-100'
                }`}
                title="Vote Up"
              >
                {voting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsUp className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => handleVote('down')}
                disabled={voting}
                className={`p-2 rounded-full transition-colors ${
                  voting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brown-100'
                }`}
                title="Vote Down"
              >
                {voting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsDown className="w-4 h-4" />
                )}
              </button>
            </div>
            <button className="flex items-center gap-1 hover:text-brown-800">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{recipe.comments}</span>
            </button>
            <button 
              onClick={shareRecipe}
              className="flex items-center gap-1 hover:text-brown-800"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-brown-600 hover:text-brown-800"
          >
            <span className="text-sm mr-1">{expanded ? 'Less' : 'More'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-brown-200">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-brown-800 mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-brown-700">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm md:text-base">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brown-800 mb-2">Instructions</h4>
                <div className="text-brown-700 whitespace-pre-line text-sm md:text-base">
                  {recipe.instructions}
                </div>
              </div>
              {recipe.cuisine_type && (
                <div className="text-brown-700">
                  <span className="font-semibold">Cuisine:</span> {recipe.cuisine_type}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};