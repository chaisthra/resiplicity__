import { supabase } from './supabase';

export interface SharedRemedy {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  cook_time: string;
  servings: string;
  target_age: string;
  region: string;
  sub_region: string;
  dietary_info: string[];
  health_benefits: string[];
  precautions: string[];
  tradition: string;
  additional_info: string;
  image_url?: string;
  trust_score?: number;
  votes?: number;
  created_at?: string;
}

export const submitSharedRemedy = async (remedy: SharedRemedy) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error('You must be logged in to submit a remedy');
    if (!user) throw new Error('Authentication required');

    const { data, error: submitError } = await supabase
      .from('shared_remedies')
      .insert([{
        ...remedy,
        user_id: user.id,
        trust_score: 50,
        votes: 0
      }])
      .select()
      .single();

    if (submitError) throw submitError;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting shared remedy:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit remedy'
    };
  }
};

export const getSharedRemedies = async () => {
  try {
    const { data, error } = await supabase
      .from('shared_remedies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching shared remedies:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch remedies',
      data: [] 
    };
  }
};

export const checkUserVote = async (remedyId: string) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { vote: null };
    }

    const { data, error } = await supabase
      .from('shared_remedy_votes')
      .select('vote_type')
      .eq('remedy_id', remedyId)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return { vote: data?.vote_type as 'up' | 'down' | null };
  } catch (error) {
    console.error('Error checking user vote:', error);
    return { vote: null };
  }
};

export const validateSharedRemedy = async (remedyId: string, vote: 'up' | 'down') => {
  try {
    if (!remedyId) {
      throw new Error('Remedy ID is required');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error('You must be logged in to vote');
    if (!user) throw new Error('Authentication required');

    const { data: existingVote, error: voteCheckError } = await supabase
      .from('shared_remedy_votes')
      .select('vote_type')
      .eq('remedy_id', remedyId)
      .eq('user_id', user.id)
      .single();

    if (voteCheckError && voteCheckError.code !== 'PGRST116') {
      throw voteCheckError;
    }

    if (existingVote?.vote_type === vote) {
      throw new Error('You have already voted on this remedy');
    }

    const { data: remedy, error: fetchError } = await supabase
      .from('shared_remedies')
      .select('votes, trust_score')
      .eq('id', remedyId)
      .single();

    if (fetchError) {
      throw new Error('Remedy not found');
    }

    let voteChange = vote === 'up' ? 1 : -1;
    let trustChange = vote === 'up' ? 2 : -2;

    if (existingVote) {
      voteChange *= 2;
      trustChange *= 2;
    }

    const newVotes = (remedy.votes || 0) + voteChange;
    const newTrustScore = Math.max(0, Math.min(100, (remedy.trust_score || 50) + trustChange));

    const { data, error: updateError } = await supabase
      .rpc('handle_shared_remedy_vote', {
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
    console.error('Error validating shared remedy:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update vote'
    };
  }
};