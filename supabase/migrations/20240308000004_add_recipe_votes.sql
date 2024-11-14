-- Create recipe_votes table to track user votes
CREATE TABLE IF NOT EXISTS public.recipe_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(recipe_id, user_id)
);

-- Create function to handle recipe votes with transaction
CREATE OR REPLACE FUNCTION handle_recipe_vote(
    p_recipe_id UUID,
    p_user_id UUID,
    p_vote_type TEXT,
    p_new_votes INTEGER,
    p_new_trust_score INTEGER
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result json;
BEGIN
    -- Start transaction
    BEGIN
        -- Update or insert vote
        INSERT INTO public.recipe_votes (recipe_id, user_id, vote_type)
        VALUES (p_recipe_id, p_user_id, p_vote_type)
        ON CONFLICT (recipe_id, user_id)
        DO UPDATE SET vote_type = p_vote_type;

        -- Update recipe scores and return full recipe data
        UPDATE public.recipes
        SET 
            votes = p_new_votes,
            trust_score = p_new_trust_score
        WHERE id = p_recipe_id
        RETURNING json_build_object(
            'id', id,
            'title', title,
            'description', description,
            'ingredients', ingredients,
            'instructions', instructions,
            'author', author,
            'image_url', image_url,
            'cuisine_type', cuisine_type,
            'prep_time', prep_time,
            'cooking_time', cooking_time,
            'servings', servings,
            'difficulty', difficulty,
            'dietary_tags', dietary_tags,
            'votes', votes,
            'trust_score', trust_score,
            'comments', comments,
            'created_at', created_at
        ) INTO v_result;

        -- Commit transaction
        RETURN v_result;
    EXCEPTION WHEN OTHERS THEN
        -- Rollback transaction on error
        RAISE;
    END;
END;
$$;