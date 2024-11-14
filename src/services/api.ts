import { supabase } from './supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  author?: string;
  image_url?: string;
  dietary_tags?: string[];
  difficulty?: string;
  prep_time?: string;
  trust_score?: number;
  votes?: number;
  comments?: number;
  created_at?: string;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  difficulty: string;
  ingredients: string[];
  alternativeIngredients: Record<string, string>;
  instructions: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  plating: string;
  history: string;
}

export const validateRecipe = async (recipeId: string | undefined, vote: 'up' | 'down') => {
  try {
    if (!recipeId) {
      throw new Error('Recipe ID is required');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error('You must be logged in to vote');
    if (!user) throw new Error('Authentication required');

    const { data: existingVote, error: voteCheckError } = await supabase
      .from('recipe_votes')
      .select('vote_type')
      .eq('recipe_id', recipeId)
      .eq('user_id', user.id)
      .single();

    if (voteCheckError && voteCheckError.code !== 'PGRST116') {
      throw voteCheckError;
    }

    if (existingVote?.vote_type === vote) {
      throw new Error('You have already voted on this recipe');
    }

    const { data: recipe, error: fetchError } = await supabase
      .from('recipes')
      .select('votes, trust_score')
      .eq('id', recipeId)
      .single();

    if (fetchError) {
      throw new Error('Recipe not found');
    }

    let voteChange = vote === 'up' ? 1 : -1;
    let trustChange = vote === 'up' ? 2 : -2;

    if (existingVote) {
      voteChange *= 2;
      trustChange *= 2;
    }

    const newVotes = (recipe.votes || 0) + voteChange;
    const newTrustScore = Math.max(0, Math.min(100, (recipe.trust_score || 50) + trustChange));

    const { data, error: updateError } = await supabase
      .rpc('handle_recipe_vote', {
        p_recipe_id: recipeId,
        p_user_id: user.id,
        p_vote_type: vote,
        p_new_votes: newVotes,
        p_new_trust_score: newTrustScore
      });

    if (updateError) {
      throw updateError;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error validating recipe:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to update vote'
    };
  }
};

export const generateRecipe = async (params: {
  ingredients: string[];
  cuisine: string;
  restrictions: string[];
  proficiency: string;
  timeAvailable: string;
}): Promise<{ success: boolean; recipe?: GeneratedRecipe; error?: string }> => {
  try {
    if (!params.ingredients.length) {
      throw new Error('No ingredients provided');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create a recipe using these parameters:
    Ingredients: ${params.ingredients.join(', ')}
    Cuisine: ${params.cuisine}
    Dietary Restrictions: ${params.restrictions.join(', ')}
    Cook's Proficiency: ${params.proficiency}
    Time Available: ${params.timeAvailable}

    Return ONLY a valid JSON object with these fields:
    {
      "title": "Recipe name",
      "description": "Brief description",
      "prepTime": "Preparation time",
      "cookTime": "Cooking time",
      "totalTime": "Total time",
      "difficulty": "Easy/Medium/Hard",
      "ingredients": ["List of ingredients with quantities"],
      "alternativeIngredients": {"ingredient": "alternative"},
      "instructions": ["Step by step instructions"],
      "nutrition": {
        "calories": "per serving",
        "protein": "grams",
        "carbs": "grams",
        "fat": "grams"
      },
      "plating": "Plating suggestions",
      "history": "Cultural background and history"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let recipe: GeneratedRecipe;
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const jsonStr = jsonMatch[0]
        .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes
        .replace(/\n\s*"([^"]+)":\s*/g, '"$1":') // Normalize property names
        .trim();
      
      recipe = JSON.parse(jsonStr);
      
      // Validate required fields
      const requiredFields = [
        'title',
        'description',
        'prepTime',
        'cookTime',
        'totalTime',
        'difficulty',
        'ingredients',
        'instructions',
        'nutrition',
        'plating',
        'history'
      ];

      const missingFields = requiredFields.filter(field => !recipe[field as keyof GeneratedRecipe]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate arrays and objects
      if (!Array.isArray(recipe.ingredients) || !Array.isArray(recipe.instructions)) {
        throw new Error('ingredients and instructions must be arrays');
      }

      if (!recipe.nutrition || typeof recipe.nutrition !== 'object') {
        throw new Error('nutrition must be an object with required fields');
      }

      // Ensure alternativeIngredients is an object
      if (!recipe.alternativeIngredients || typeof recipe.alternativeIngredients !== 'object') {
        recipe.alternativeIngredients = {};
      }

    } catch (parseError) {
      console.error('JSON parsing error:', parseError, '\nResponse text:', text);
      throw new Error('Failed to parse recipe data. Please try again.');
    }

    return { success: true, recipe };
  } catch (error) {
    console.error('Recipe generation error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate recipe'
    };
  }
};

export const analyzeImage = async (file: File): Promise<{ success: boolean; ingredients?: string[]; error?: string }> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const imageData = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const prompt = "Identify and list all ingredients visible in this image. Return ONLY a JSON array of strings, each string containing an ingredient with its approximate quantity if visible.";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: file.type
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    let ingredients: string[];
    try {
      // Extract JSON array from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON array found in response');
      }

      const jsonStr = jsonMatch[0]
        .replace(/[\u201C\u201D]/g, '"')
        .trim();
      
      ingredients = JSON.parse(jsonStr);
      if (!Array.isArray(ingredients)) {
        throw new Error('Invalid response format');
      }
    } catch (parseError) {
      throw new Error('Failed to parse ingredients from image analysis');
    }
    
    return { success: true, ingredients };
  } catch (error) {
    console.error('Image analysis error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to analyze image'
    };
  }
};