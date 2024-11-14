import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabase';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface RemedyParams {
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
}

interface ParsedRemedy {
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

export const validateRemedy = async (remedyId: string, vote: 'up' | 'down') => {
  try {
    if (!remedyId) {
      throw new Error('Remedy ID is required');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error('You must be logged in to vote');
    if (!user) throw new Error('Authentication required');

    const { data: existingVote, error: voteCheckError } = await supabase
      .from('heritage_remedy_votes')
      .select('vote_type')
      .eq('remedy_id', remedyId)
      .eq('user_id', user.id)
      .single();

    if (voteCheckError && voteCheckError.code !== 'PGRST116') {
      throw voteCheckError;
    }

    const { data: remedy, error: fetchError } = await supabase
      .from('heritage_remedies')
      .select('votes, trust_score')
      .eq('id', remedyId)
      .single();

    if (fetchError) {
      throw new Error('Remedy not found');
    }

    let voteChange = vote === 'up' ? 1 : -1;
    let trustChange = vote === 'up' ? 2 : -2;

    if (existingVote) {
      if (existingVote.vote_type === vote) {
        throw new Error('You have already voted on this remedy');
      }
      voteChange *= 2;
      trustChange *= 2;
    }

    const newVotes = (remedy.votes || 0) + voteChange;
    const newTrustScore = Math.max(0, Math.min(100, (remedy.trust_score || 50) + trustChange));

    const { data, error: updateError } = await supabase
      .rpc('handle_heritage_remedy_vote', {
        p_remedy_id: remedyId,
        p_user_id: user.id,
        p_vote_type: vote,
        p_new_votes: newVotes,
        p_new_trust_score: newTrustScore
      });

    if (updateError) {
      throw updateError;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error validating remedy:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update vote'
    };
  }
};

const parseAIResponse = (text: string): ParsedRemedy => {
  const sections = {
    title: '',
    description: '',
    ingredients: [] as string[],
    instructions: [] as string[],
    cooking_time: '',
    servings: '',
    health_benefits: [] as string[],
    remedy_explanation: '',
    variations: [] as string[],
    precautions: [] as string[],
    region: '',
    tradition: ''
  };

  let currentSection: keyof typeof sections | null = null;

  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  for (const line of lines) {
    // Check for section headers
    if (line.toLowerCase().includes('title:')) {
      currentSection = 'title';
      sections.title = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('description:')) {
      currentSection = 'description';
      sections.description = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('ingredients:')) {
      currentSection = 'ingredients';
      continue;
    } else if (line.toLowerCase().includes('instructions:')) {
      currentSection = 'instructions';
      continue;
    } else if (line.toLowerCase().includes('cooking time:')) {
      sections.cooking_time = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('servings:')) {
      sections.servings = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('health benefits:')) {
      currentSection = 'health_benefits';
      continue;
    } else if (line.toLowerCase().includes('remedy explanation:')) {
      currentSection = 'remedy_explanation';
      sections.remedy_explanation = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('variations:')) {
      currentSection = 'variations';
      continue;
    } else if (line.toLowerCase().includes('precautions:')) {
      currentSection = 'precautions';
      continue;
    } else if (line.toLowerCase().includes('region:')) {
      sections.region = line.split(':')[1].trim();
      continue;
    } else if (line.toLowerCase().includes('tradition:')) {
      sections.tradition = line.split(':')[1].trim();
      continue;
    }

    // Add content to current section
    if (currentSection && line.trim()) {
      if (Array.isArray(sections[currentSection])) {
        if (line.startsWith('-') || line.startsWith('•') || /^\d+\./.test(line)) {
          (sections[currentSection] as string[]).push(line.replace(/^[-•\d.]\s*/, '').trim());
        }
      } else if (typeof sections[currentSection] === 'string') {
        sections[currentSection] += ' ' + line;
      }
    }
  }

  // Validate required fields
  if (!sections.title) throw new Error('Recipe title is required');
  if (!sections.description) throw new Error('Recipe description is required');
  if (sections.ingredients.length === 0) throw new Error('Recipe ingredients are required');
  if (sections.instructions.length === 0) throw new Error('Recipe instructions are required');

  return sections;
};

export const generateRemedy = async (params: RemedyParams) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Generate a traditional remedy or comfort food recipe for someone with the following details:
    
    Condition/Illness: ${params.illness}
    Age: ${params.age}
    Gender: ${params.gender}
    Dietary information: ${params.dietaryInfo.join(', ')}
    Preferences: ${params.preferences.join(', ')}
    Allergies to avoid: ${params.allergies.join(', ')}
    Time available: ${params.timeAvailable}
    Preferred cuisines: ${params.selectedCuisines.join(', ')}
    ${params.selectedIndianRegions.length ? `Preferred Indian regions: ${params.selectedIndianRegions.join(', ')}` : ''}
    Available ingredients: ${params.ingredients.join(', ')}
    
    Format the response with these exact sections:
    Title: [Recipe name]
    Description: [Brief description]
    Ingredients:
    - [List each ingredient with quantity]
    Instructions:
    1. [Step-by-step instructions]
    Cooking Time: [Total time needed]
    Servings: [Number of servings]
    Health Benefits:
    - [List health benefits]
    Remedy Explanation: [How this helps with the illness]
    Variations:
    - [List variations if any]
    Precautions:
    - [List precautions]
    Region: [Origin region]
    Tradition: [Cultural background]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the AI response into structured data
    const parsedRemedy = parseAIResponse(text);

    // Save to Supabase
    const { data: savedRemedy, error: saveError } = await supabase
      .from('heritage_remedies')
      .insert([{
        ...parsedRemedy,
        illness: params.illness,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        trust_score: 50,
        votes: 0
      }])
      .select()
      .single();

    if (saveError) throw saveError;

    return { success: true, remedy: savedRemedy };
  } catch (error) {
    console.error('Remedy generation error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate remedy'
    };
  }
};